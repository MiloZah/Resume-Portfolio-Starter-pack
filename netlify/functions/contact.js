const nodemailer = require("nodemailer");

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

const securityHeaders = {
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
};

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: securityHeaders,
  body: JSON.stringify(body),
});

const sanitizeHeaderValue = (value) => value.replace(/[\r\n]+/g, " ").trim();

const isAllowedOrigin = (origin) => {
  if (!ALLOWED_ORIGINS.length) return true;
  return Boolean(origin) && ALLOWED_ORIGINS.includes(origin);
};

const getClientIp = (headers) => {
  const forwarded = headers["x-forwarded-for"] || headers["x-nf-client-connection-ip"];
  if (forwarded) {
    return String(forwarded).split(",")[0].trim();
  }
  return "unknown";
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

exports.handler = async (event) => {
  const headers = Object.fromEntries(
    Object.entries(event.headers || {}).map(([key, value]) => [key.toLowerCase(), value]),
  );
  const origin = headers.origin;

  if (!isAllowedOrigin(origin)) {
    return jsonResponse(403, { ok: false, error: "Forbidden origin." });
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { ok: false, error: "Method not allowed." });
  }

  let payload = {};
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    return jsonResponse(400, { ok: false, error: "Invalid JSON." });
  }

  const rawName = typeof payload.name === "string" ? payload.name : "";
  const rawEmail = typeof payload.email === "string" ? payload.email : "";
  const rawSubject = typeof payload.subject === "string" ? payload.subject : "";
  const rawMessage = typeof payload.message === "string" ? payload.message : "";
  const rawCompany = typeof payload.company === "string" ? payload.company : "";

  if (rawCompany.trim()) {
    return jsonResponse(400, { ok: false, error: "Invalid submission." });
  }

  const trimmedName = sanitizeHeaderValue(rawName);
  const trimmedEmail = sanitizeHeaderValue(rawEmail);
  const trimmedSubject = sanitizeHeaderValue(rawSubject);
  const trimmedMessage = rawMessage.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return jsonResponse(400, { ok: false, error: "Missing required fields." });
  }

  if (
    trimmedName.length > MAX_NAME_LENGTH ||
    trimmedEmail.length > MAX_EMAIL_LENGTH ||
    trimmedSubject.length > MAX_SUBJECT_LENGTH ||
    trimmedMessage.length > MAX_MESSAGE_LENGTH
  ) {
    return jsonResponse(400, { ok: false, error: "Invalid field length." });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmedEmail)) {
    return jsonResponse(400, { ok: false, error: "Invalid email address." });
  }

  const retryAfter = checkRateLimit(getClientIp(headers));
  if (retryAfter) {
    return {
      statusCode: 429,
      headers: {
        ...securityHeaders,
        "Retry-After": String(retryAfter),
      },
      body: JSON.stringify({ ok: false, error: "Too many requests. Please try again later." }),
    };
  }

  const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missingEnv.length) {
    console.error("Missing SMTP environment variables:", missingEnv.join(", "));
    return jsonResponse(500, { ok: false, error: "Email service not configured." });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      to: process.env.ADMIN_EMAIL,
      from: process.env.MAIL_FROM || process.env.ADMIN_EMAIL,
      replyTo: trimmedEmail,
      subject: trimmedSubject || "Contact Form Submission",
      text: `${trimmedName} (${trimmedEmail}): ${trimmedMessage}`,
    });
    return jsonResponse(200, { ok: true });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return jsonResponse(500, { ok: false, error: "Failed to send email." });
  }
};