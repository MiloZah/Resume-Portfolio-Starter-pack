const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const root = path.resolve(__dirname, "..");
const reactScriptsPath = path.join(
  root,
  "node_modules",
  "react-scripts",
  "bin",
  "react-scripts.js",
);

if (!fs.existsSync(reactScriptsPath)) {
  console.error("react-scripts is not installed. Run `pnpm install` or `npm install`.");
  process.exit(1);
}

const env = { ...process.env };
if (env.REACT_PORT) {
  env.PORT = String(env.REACT_PORT);
}

const child = spawn(process.execPath, [reactScriptsPath, "start"], {
  stdio: "inherit",
  env,
});

child.on("exit", (code) => {
  process.exit(code === null ? 1 : code);
});

child.on("error", (error) => {
  console.error("Failed to start react-scripts:", error);
  process.exit(1);
});
