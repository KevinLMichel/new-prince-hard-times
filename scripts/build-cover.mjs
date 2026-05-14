import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { exec } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const nodeCommand = process.execPath;
const astroCommand = resolve(root, "node_modules", "astro", "bin", "astro.mjs");
const vivliostyleCommand = resolve(
  root,
  "node_modules",
  "@vivliostyle",
  "cli",
  "dist",
  "cli.js"
);
const coverPath = resolve(
  root,
  "production",
  "covers",
  "output",
  "the-new-prince-hard-times-cover-wrap.pdf"
);
const coverInput = resolve(root, "dist", "cover-print", "index.html");

function run(command, args) {
  return new Promise((resolveRun, reject) => {
    const commandLine =
      process.platform === "win32"
        ? quoteWindowsCommand(command, args)
        : [command, ...args].map(quotePosixArg).join(" ");

    const child = exec(commandLine, {
      cwd: root,
      maxBuffer: 1024 * 1024 * 20,
      windowsHide: true
    });

    child.stdout?.pipe(process.stdout);
    child.stderr?.pipe(process.stderr);

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolveRun();
        return;
      }
      reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
    });
  });
}

function quoteWindowsCommand(command, args) {
  return [command, ...args].map(quoteWindowsArg).join(" ");
}

function quoteWindowsArg(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function quotePosixArg(value) {
  return `'${String(value).replace(/'/g, "'\\''")}'`;
}

await mkdir(dirname(coverPath), { recursive: true });

console.log("Building Astro cover route...");
await run(nodeCommand, [astroCommand, "build"]);

console.log("Generating KDP paperback cover PDF...");
await run(nodeCommand, [
  vivliostyleCommand,
  "build",
  coverInput,
  "-s",
  "11.6533in,8.75in",
  "-o",
  coverPath,
  "--title",
  "The New Prince of Hard Times - Paperback Cover",
  "--author",
  "Kevin L. Michel"
]);

console.log(`Cover PDF written to ${coverPath}`);
