const express = require("express");
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;
const REQUIRED_ENV = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "ADMIN_EMAIL"];
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 150;
const MAX_MESSAGE_LENGTH = 2000;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map();
let lastCleanup = 0;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let cachedTransporter = null;

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use((req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  });
  next();
});

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

const sanitizeHeaderValue = (value) => value.replace(/[\r\n]+/g, " ").trim();

const isAllowedOrigin = (origin) => {
  if (!ALLOWED_ORIGINS.length) return true;
  return Boolean(origin) && ALLOWED_ORIGINS.includes(origin);
};

const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || "unknown";
};

const checkRateLimit = (ip) => {
  const now = Date.now();
  if (now - lastCleanup > RATE_LIMIT_WINDOW_MS * 6) {
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
    lastCleanup = now;
  }

  const entry = rateLimitStore.get(ip);
  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return null;
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    return Math.ceil((entry.resetAt - now) / 1000);
  }

  return null;
};

const getTransporter = () => {
  if (cachedTransporter) {
    return { transporter: cachedTransporter };
  }

  const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missingEnv.length) {
    return { missingEnv };
  }

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return { transporter: cachedTransporter };
};

app.post("/api/contact", async (req, res) => {
  const origin = req.headers.origin;
  if (!isAllowedOrigin(origin)) {
    return res.status(403).json({ ok: false, error: "Forbidden origin." });
  }

  const { name, email, subject, message, company } = req.body || {};
  const rawName = typeof name === "string" ? name : "";
  const rawEmail = typeof email === "string" ? email : "";
  const rawSubject = typeof subject === "string" ? subject : "";
  const rawMessage = typeof message === "string" ? message : "";
  const rawCompany = typeof company === "string" ? company : "";

  if (rawCompany.trim()) {
    return res.status(400).json({ ok: false, error: "Invalid submission." });
  }

  const trimmedName = sanitizeHeaderValue(rawName);
  const trimmedEmail = sanitizeHeaderValue(rawEmail);
  const trimmedSubject = sanitizeHeaderValue(rawSubject);
  const trimmedMessage = rawMessage.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({ ok: false, error: "Missing required fields." });
  }

  if (
    trimmedName.length > MAX_NAME_LENGTH ||
    trimmedEmail.length > MAX_EMAIL_LENGTH ||
    trimmedSubject.length > MAX_SUBJECT_LENGTH ||
    trimmedMessage.length > MAX_MESSAGE_LENGTH
  ) {
    return res.status(400).json({ ok: false, error: "Invalid field length." });
  }

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    return res.status(400).json({ ok: false, error: "Invalid email address." });
  }

  const retryAfter = checkRateLimit(getClientIp(req));
  if (retryAfter) {
    res.set("Retry-After", String(retryAfter));
    return res
      .status(429)
      .json({ ok: false, error: "Too many requests. Please try again later." });
  }

  const { transporter, missingEnv } = getTransporter();
  if (!transporter) {
    console.error("Missing SMTP environment variables:", missingEnv?.join(", "));
    return res.status(500).json({ ok: false, error: "Email service not configured." });
  }

  try {
    await transporter.sendMail({
      to: process.env.ADMIN_EMAIL,
      from: process.env.MAIL_FROM || process.env.ADMIN_EMAIL,
      replyTo: trimmedEmail,
      subject: trimmedSubject || "Contact Form Submission",
      text: `${trimmedName} (${trimmedEmail}): ${trimmedMessage}`,
    });
    return res.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return res.status(500).json({ ok: false, error: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`Contact API listening on port ${PORT}`);
});
