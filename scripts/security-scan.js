const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const IGNORE_DIRS = new Set([".git", "node_modules", "build", "public"]);
const IGNORE_FILES = new Set(["pnpm-lock.yaml", "package-lock.json", "resume-screenshot.jpg"]);
const MAX_FILE_SIZE_BYTES = 1024 * 1024;

const PATTERNS = [
  {
    name: "env-fallback",
    regex: /process\.env(?:\.|\[)[A-Z0-9_]+(?:\]?)\s*(\|\||\?\?)\s*["'][^"']+["']/, 
    fileTypes: new Set([".js", ".jsx", ".ts", ".tsx"]),
  },
  {
    name: "hardcoded-secret",
    regex: /(?:password|passwd|secret|token|api[_-]?key|smtp_pass)\s*[:=]\s*["'][^"']+["']/i,
    fileTypes: new Set([".js", ".jsx", ".ts", ".tsx", ".json", ".yaml", ".yml", ".toml"]),
  },
];

const issues = [];

const trackedEnvFiles = getTrackedEnvFiles();
if (trackedEnvFiles.length) {
  issues.push(`Tracked env files: ${trackedEnvFiles.join(", ")}`);
}

const files = collectFiles(ROOT);
for (const file of files) {
  const rel = path.relative(ROOT, file);
  if (shouldIgnore(rel)) continue;

  const ext = path.extname(file).toLowerCase();
  const content = readTextFile(file);
  if (content == null) continue;

  for (const pattern of PATTERNS) {
    if (!pattern.fileTypes.has(ext)) continue;
    if (pattern.regex.test(content)) {
      issues.push(`${rel}: ${pattern.name}`);
      break;
    }
  }
}

if (issues.length) {
  console.error("Security scan failed:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log("Security scan passed.");

function shouldIgnore(relPath) {
  const normalized = relPath.replace(/\\/g, "/");
  const baseName = path.basename(relPath);
  if (baseName === ".env" || (baseName.startsWith(".env.") && baseName !== ".env.example")) {
    return true;
  }
  if (IGNORE_FILES.has(baseName)) return true;
  if (normalized.startsWith("public/")) return true;
  if (normalized.startsWith("build/")) return true;
  if (normalized.startsWith("node_modules/")) return true;
  if (normalized.startsWith(".git/")) return true;
  return false;
}

function collectFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      files.push(...collectFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

function readTextFile(filePath) {
  const stat = fs.statSync(filePath);
  if (stat.size > MAX_FILE_SIZE_BYTES) return null;
  const buffer = fs.readFileSync(filePath);
  if (buffer.includes(0)) return null;
  return buffer.toString("utf8");
}

function getTrackedEnvFiles() {
  try {
    const output = execSync("git ls-files", { cwd: ROOT, encoding: "utf8" });
    return output
      .split(/\r?\n/)
      .filter(Boolean)
      .filter((file) => (file === ".env" || file.startsWith(".env.")) && file !== ".env.example");
  } catch (error) {
    return [];
  }
}