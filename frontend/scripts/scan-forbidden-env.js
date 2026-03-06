const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const EXCLUDED_DIRS = new Set(["node_modules", "dist", "coverage", ".git"]);
const ALLOWED_FILES = new Set([
  ".env.example",
  "playwright.config.ts",
  "vite.config.ts.bak_proxy",
  "apiClient.ts.bak",
  "apiClient.ts.pre_authfix"
]);

const FORBIDDEN = [
  /http:\/\/localhost(?::\d+)?/i,
  /127\.0\.0\.1(?::\d+)?/i,
  /localhost:\d+/i
];

const ALLOWED_PATTERNS = [
  /playwright/i,
  /describe\(/,
  /test\(/,
  /vitest/i,
  /:\/\/localhost/i,
  /127\.0\.0\.1/i
];

const TEXT_EXTENSIONS = new Set([
  ".ts",".tsx",".js",".jsx",".json",".html",".css",".md",".env",".yml",".yaml"
]);

const hits = [];

function shouldSkipDir(name) {
  return EXCLUDED_DIRS.has(name);
}

function isTextFile(file) {
  return TEXT_EXTENSIONS.has(path.extname(file)) || path.basename(file).startsWith(".env");
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(ROOT, full).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      if (!shouldSkipDir(entry.name)) walk(full);
      continue;
    }

    if (!isTextFile(full)) continue;
    if (ALLOWED_FILES.has(path.basename(full))) continue;

    const content = fs.readFileSync(full, "utf8");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, idx) => {
      const forbidden = FORBIDDEN.some((re) => re.test(line));
      const allowed = ALLOWED_PATTERNS.some((re) => re.test(line));
      if (forbidden && !allowed) {
        hits.push(`${rel}:${idx + 1}: ${line.trim()}`);
      }
    });
  }
}

walk(ROOT);

if (hits.length) {
  console.error("FORBIDDEN_LOCALHOST_REFERENCES_FOUND");
  console.error(hits.join("\n"));
  process.exit(1);
}

console.log("OK_NO_FORBIDDEN_LOCALHOST_REFERENCES");
