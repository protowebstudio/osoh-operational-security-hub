const fs = require("fs");
const path = require("path");

const mode = process.argv[2] || "production";
const envFile = mode === "production" ? ".env.production" : ".env.local";
const envPath = path.join(process.cwd(), envFile);

if (!fs.existsSync(envPath)) {
  console.error(`MISSING_ENV_FILE: ${envFile}`);
  process.exit(1);
}

const raw = fs.readFileSync(envPath, "utf8");
const lines = raw.split(/\r?\n/);

const env = {};
for (const line of lines) {
  if (!line || line.trim().startsWith("#") || !line.includes("=")) continue;
  const idx = line.indexOf("=");
  const key = line.slice(0, idx).trim();
  const value = line.slice(idx + 1).trim();
  env[key] = value;
}

if (mode === "production") {
  const expected = "https://api.protowebstudio.com";
  if (!env.VITE_API_BASE_URL) {
    console.error("MISSING_VITE_API_BASE_URL");
    process.exit(1);
  }
  if (env.VITE_API_BASE_URL !== expected) {
    console.error(`INVALID_PRODUCTION_API_BASE_URL: ${env.VITE_API_BASE_URL}`);
    process.exit(1);
  }
  if (/localhost|127\.0\.0\.1/i.test(env.VITE_API_BASE_URL)) {
    console.error(`FORBIDDEN_LOCAL_PRODUCTION_API_BASE_URL: ${env.VITE_API_BASE_URL}`);
    process.exit(1);
  }
  console.log(`OK_PRODUCTION_ENV: ${env.VITE_API_BASE_URL}`);
  process.exit(0);
}

if (mode === "local") {
  if (env.VITE_API_BASE_URL && /https:\/\/api\.protowebstudio\.com/i.test(env.VITE_API_BASE_URL)) {
    console.error(`LOCAL_ENV_POINTS_TO_PRODUCTION_API: ${env.VITE_API_BASE_URL}`);
    process.exit(1);
  }
  console.log(`OK_LOCAL_ENV: ${env.VITE_API_BASE_URL || "<empty>"}`);
  process.exit(0);
}

console.error(`UNKNOWN_MODE: ${mode}`);
process.exit(1);
