// Run an ingest driver across a source file with bounded concurrency.
//
// Usage:
//   node scripts/parallel.mjs repo 6
//   node scripts/parallel.mjs site 6
//   node scripts/parallel.mjs browser 4

import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const run = promisify(execFile);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const kind = process.argv[2] || "repo";
const workers = Number(process.argv[3] || 6);

const CONFIG = {
  repo: { file: "data/repo-sources.json", script: "ingest-repo.mjs", urlKey: "repo" },
  site: { file: "data/site-sources.json", script: "ingest-site.mjs", urlKey: "url" },
  browser: { file: "data/browser-sources.json", script: "ingest-browser.mjs", urlKey: "url" },
};

const cfg = CONFIG[kind];
if (!cfg) {
  console.error(`unknown kind: ${kind}`);
  process.exit(1);
}

const { sources } = JSON.parse(fs.readFileSync(path.join(ROOT, cfg.file), "utf8"));
const have = new Set(fs.readdirSync(path.join(ROOT, "systems")));
const todo = sources.filter((s) => !have.has(s.slug));

console.log(`${kind}: ${todo.length} pending, ${workers} workers\n`);

let ok = 0;
let fail = 0;
let next = 0;

async function worker(id) {
  while (next < todo.length) {
    const s = todo[next++];
    const args = [
      path.join(HERE, cfg.script),
      s[cfg.urlKey],
      "--slug", s.slug,
      "--org", s.org,
      "--name", s.name,
    ];
    try {
      const { stdout } = await run(process.execPath, args, {
        cwd: ROOT,
        encoding: "utf8",
        timeout: 240_000,
        maxBuffer: 1_000_000,
      });
      ok++;
      console.log(`  [${id}] ok   ${stdout.trim().split(/\r?\n/).pop()}`);
    } catch (err) {
      fail++;
      const msg = String(err.stderr || err.message).split(/\r?\n/).filter(Boolean).pop() || "failed";
      console.log(`  [${id}] FAIL ${String(s.slug).padEnd(16)} ${msg.slice(0, 70)}`);
    }
  }
}

await Promise.all(Array.from({ length: Math.min(workers, todo.length) }, (_, i) => worker(i + 1)));
console.log(`\n${ok}/${todo.length} ingested, ${fail} failed`);
