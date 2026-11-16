#!/usr/bin/env node
// sourcebook — a verified, installable registry of design systems.

import fs from "node:fs";
import path from "node:path";
import { listSystems, loadSystem, readDesign, search, buildIndex, ROOT } from "../lib/registry.mjs";
import { lint } from "../lib/lint.mjs";
import { EMITTERS } from "../lib/emit.mjs";
import { startMcpServer } from "../lib/mcp.mjs";

const argv = process.argv.slice(2);
const cmd = argv[0];

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code) => (s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : String(s));
const dim = paint("2");
const bold = paint("1");
const green = paint("32");
const yellow = paint("33");
const red = paint("31");
const cyan = paint("36");

function flag(name, fallback = undefined) {
  const i = argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const next = argv[i + 1];
  if (!next || next.startsWith("--")) return true;
  return next;
}

function positional() {
  return argv.slice(1).filter((a, i, arr) => !a.startsWith("--") && !(i > 0 && arr[i - 1].startsWith("--")));
}

function fail(msg) {
  console.error(`${red("error")} ${msg}`);
  process.exit(1);
}

function badge(s) {
  if (s.checks?.verified) return green("verified");
  if (s.checks?.errors) return red(`${s.checks.errors} errors`);
  return yellow(`${s.checks?.warnings ?? "?"} warnings`);
}

// ------------------------------------------------------------------ commands

function cmdList() {
  const tag = flag("tag");
  const verifiedOnly = Boolean(flag("verified", false));
  let systems = listSystems();

  if (tag) systems = systems.filter((s) => (s.tags || []).some((t) => t.toLowerCase() === String(tag).toLowerCase()));
  if (verifiedOnly) systems = systems.filter((s) => s.checks?.verified);

  if (!systems.length) {
    console.log(dim("No systems matched."));
    return;
  }

  const w = Math.max(...systems.map((s) => (s.displayName || s.name).length));
  for (const s of systems) {
    const name = (s.displayName || s.name).padEnd(w);
    console.log(`${bold(name)}  ${dim((s.style || "").slice(0, 46).padEnd(46))}  ${badge(s)}`);
  }
  console.log(dim(`\n${systems.length} systems. \`sourcebook info <name>\` for details.`));
}

function cmdSearch() {
  const query = positional().join(" ");
  if (!query) fail("Usage: sourcebook search <intent...>   e.g. search dark data-dense dashboard");
  const results = search(query, { limit: Number(flag("limit", 8)), verifiedOnly: Boolean(flag("verified", false)) });

  if (!results.length) {
    console.log(dim(`Nothing matched "${query}".`));
    return;
  }

  console.log(dim(`intent: "${query}"\n`));
  for (const r of results) {
    console.log(`${bold(r.displayName || r.name)}  ${dim("·")}  ${r.style || ""}`);
    console.log(`  ${dim("tags")}  ${(r.tags || []).join(", ")}`);
    console.log(`  ${dim("install")} npx sourcebook add ${r.slug} --framework tailwind-v4`);
    console.log(`  ${dim("checks")}  ${badge(r)} ${dim(`· ${r.tokens?.colors || 0} colors, ${r.tokens?.typography || 0} type tokens`)}`);
    console.log("");
  }
}

function cmdInfo() {
  const name = positional()[0];
  if (!name) fail("Usage: sourcebook info <name>");
  const s = resolve(name);
  if (!s) fail(`No system named "${name}". Try \`sourcebook list\`.`);

  const md = readDesign(s.slug);
  const report = lint(md, { name: s.slug });

  console.log(`${bold(s.displayName || s.name)}  ${dim(s.homepage || "")}`);
  console.log(`${s.style || ""}\n`);
  console.log(`${dim("license")}    ${s.license} ${dim(`(${s.provenance})`)}`);
  console.log(`${dim("tags")}       ${(s.tags || []).join(", ")}`);
  console.log(`${dim("tokens")}     ${s.tokens?.colors || 0} colors · ${s.tokens?.typography || 0} type · ${s.tokens?.components || 0} components`);
  console.log(`${dim("checks")}     ${badge(s)}`);
  if (!s.checks?.verified) {
    for (const f of report.findings.filter((f) => f.severity === "warning")) {
      console.log(`  ${yellow("·")} ${f.rule}: ${f.message}`);
    }
  }
  console.log(`\n${dim("install")}    npx sourcebook add ${s.slug} --framework tailwind-v4`);
  console.log(`${dim("mcp")}        sourcebook://systems/${s.slug}`);
  console.log(`\n${dim("file")}       ${path.relative(process.cwd(), path.join(s.dir, "DESIGN.md"))}`);
}

function cmdAdd() {
  const name = positional()[0];
  if (!name) fail("Usage: sourcebook add <name> [--framework tailwind-v4|css-vars|dtcg] [--dir <path>] [--force]");

  const s = resolve(name);
  if (!s) fail(`No system named "${name}". Try \`sourcebook search <intent>\`.`);

  const framework = String(flag("framework", "tailwind-v4"));
  const emitter = EMITTERS[framework];
  if (!emitter) fail(`Unknown framework "${framework}". Options: ${Object.keys(EMITTERS).join(", ")}`);

  const targetDir = path.resolve(String(flag("dir", process.cwd())));
  const md = readDesign(s.slug);
  const tokens = EMITTERS.dtcg.run(md);
  const theme = emitter.run(md);

  if (flag("print")) {
    console.log(md);
    return;
  }

  const files = [
    ["DESIGN.md", md],
    ["design-tokens.json", tokens],
    [`design-theme.${emitter.ext}`, theme],
  ];

  fs.mkdirSync(targetDir, { recursive: true });
  const written = [];
  const skipped = [];

  for (const [file, content] of files) {
    const dest = path.join(targetDir, file);
    if (fs.existsSync(dest) && !flag("force")) {
      skipped.push(file);
      continue;
    }
    fs.writeFileSync(dest, content, "utf8");
    written.push(file);
  }

  const report = lint(md, { name: s.slug });
  console.log(`${bold(s.displayName || s.name)} → ${dim(targetDir)}`);
  for (const f of written) console.log(`  ${green("+")} ${f}`);
  for (const f of skipped) console.log(`  ${yellow("=")} ${f} ${dim("(exists, use --force)")}`);
  console.log("");
  console.log(dim("The agent reads DESIGN.md for intent, design-tokens.json for exact values."));
  console.log(dim(`Next: keep AGENTS.md next to it, or run \`sourcebook mcp\` for live access.`));
  if (!report.verified) console.log(yellow(`Note: ${report.counts.warnings} lint warning(s) on this entry.`));
}

function cmdLint() {
  const all = Boolean(flag("all", false));
  const json = String(flag("format", "text")) === "json";
  const name = positional()[0];

  const targets = all ? listSystems() : [name ? resolve(name) : null].filter(Boolean);
  if (!targets.length) fail("Usage: sourcebook lint <name> | --all [--format json]");

  let errors = 0;
  let warnings = 0;
  const out = [];

  for (const s of targets) {
    const md = readDesign(s.slug);
    const report = lint(md, { name: s.slug });
    errors += report.counts.errors;
    warnings += report.counts.warnings;
    out.push(report);

    if (!json) {
      const line = `${(s.displayName || s.slug).padEnd(18)} ${report.ok ? green("pass") : red("fail")}  ${dim(
        `${report.counts.errors} errors, ${report.counts.warnings} warnings`
      )}`;
      console.log(line);
      for (const f of report.findings.filter((f) => f.severity !== "info")) {
        console.log(`  ${f.severity === "error" ? red("✕") : yellow("!")} ${f.rule}: ${f.message}`);
      }
    }
  }

  if (json) {
    console.log(JSON.stringify(out, null, 2));
  } else {
    console.log(dim(`\n${targets.length} files · ${errors} errors · ${warnings} warnings`));
  }
  if (errors > 0) process.exit(1);
}

function cmdExport() {
  const name = positional()[0];
  if (!name) fail("Usage: sourcebook export <name> --format tailwind-v4|css-vars|dtcg");
  const s = resolve(name);
  if (!s) fail(`No system named "${name}".`);

  const framework = String(flag("format", "dtcg"));
  const emitter = EMITTERS[framework];
  if (!emitter) fail(`Unknown format "${framework}". Options: ${Object.keys(EMITTERS).join(", ")}`);

  process.stdout.write(emitter.run(readDesign(s.slug)));
}

function cmdIndex() {
  const index = buildIndex();
  const dest = path.join(ROOT, "index.json");
  fs.writeFileSync(dest, JSON.stringify(index, null, 2) + "\n", "utf8");
  console.log(`${green("+")} index.json ${dim(`(${index.count} systems)`)}`);
}

function resolve(name) {
  const systems = listSystems();
  const n = String(name).toLowerCase();
  return (
    systems.find((s) => s.slug === n) ||
    systems.find((s) => s.name === n) ||
    systems.find((s) => (s.displayName || "").toLowerCase() === n) ||
    systems.find((s) => s.slug.includes(n) || (s.displayName || "").toLowerCase().includes(n)) ||
    null
  );
}

function help() {
  console.log(`
${bold("sourcebook")} ${dim("— a verified, installable registry of design systems")}

${bold("Usage")}
  sourcebook list [--tag <tag>] [--verified]
  sourcebook search <intent...> [--limit n] [--verified]
  sourcebook info <name>
  sourcebook add <name> [--framework tailwind-v4|css-vars|dtcg] [--dir <path>] [--force] [--print]
  sourcebook lint <name> | --all [--format json]
  sourcebook export <name> --format tailwind-v4|css-vars|dtcg
  sourcebook index
  sourcebook mcp

${bold("Connect to an agent")}
  ${dim("file drop")}   sourcebook add linear-app --dir .
  ${dim("mcp")}         sourcebook mcp   ${dim("# stdio server, works with any MCP host")}

${dim("Spec: google-labs-code/design.md  ·  Registry: 54 systems")}
`);
}

switch (cmd) {
  case "list":
  case "ls":
    cmdList();
    break;
  case "search":
  case "s":
    cmdSearch();
    break;
  case "info":
    cmdInfo();
    break;
  case "add":
  case "install":
    cmdAdd();
    break;
  case "lint":
    cmdLint();
    break;
  case "export":
    cmdExport();
    break;
  case "index":
    cmdIndex();
    break;
  case "mcp":
    startMcpServer();
    break;
  case "--version":
  case "-v":
    console.log("sourcebook 0.1.0");
    break;
  case undefined:
  case "help":
  case "--help":
  case "-h":
    help();
    break;
  default:
    fail(`Unknown command "${cmd}". Run \`sourcebook help\`.`);
}
