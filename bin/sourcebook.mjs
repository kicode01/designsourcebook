#!/usr/bin/env node
// sourcebook — a verified, installable registry of design systems.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { listSystems, loadSystem, readDesign, readPreview, search, buildIndex, ROOT } from "../lib/registry.mjs";
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

const VALUE_FLAGS = new Set(["tag", "limit", "framework", "dir", "format", "sort"]);

function flag(name, fallback = undefined) {
  const i = argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  if (!VALUE_FLAGS.has(name)) return true;
  const next = argv[i + 1];
  if (!next || next.startsWith("--")) return true;
  return next;
}

function positional() {
  const out = [];
  for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      if (VALUE_FLAGS.has(key) && i + 1 < argv.length && !argv[i + 1].startsWith("--")) i++;
      continue;
    }
    out.push(a);
  }
  return out;
}

function fail(msg) {
  console.error(`${red("error")} ${msg}`);
  process.exit(1);
}

function badge(s) {
  if (s.provenance === "listed") return dim("listed");
  if (s.checks?.verified) return green("verified");
  if (s.checks?.errors) return red(`${s.checks.errors} errors`);
  return yellow(`${s.checks?.warnings ?? "?"} warnings`);
}

// ------------------------------------------------------------------ commands

function cmdList() {
  const tag = flag("tag");
  const sort = flag("sort");
  const verifiedOnly = Boolean(flag("verified", false));
  let systems = listSystems();

  if (tag) systems = systems.filter((s) => (s.tags || []).some((t) => t.toLowerCase() === String(tag).toLowerCase()));
  if (verifiedOnly) systems = systems.filter((s) => s.checks?.verified);
  if (sort === "popular" || sort === "stars") {
    systems = systems.slice().sort((a, b) => (a.popularity?.rank || 999) - (b.popularity?.rank || 999));
  }

  if (!systems.length) {
    console.log(dim("No systems matched."));
    return;
  }

  const w = Math.max(...systems.map((s) => (s.displayName || s.name).length));
  for (const s of systems) {
    const name = (s.displayName || s.name).padEnd(w);
    const stars = s.popularity?.stars ? yellow(`★ ${s.popularity.stars.toLocaleString()}`).padEnd(12) : dim("-".padEnd(12));
    console.log(`${bold(name)}  ${stars}  ${dim((s.style || "").slice(0, 42).padEnd(42))}  ${badge(s)}`);
  }
  console.log(dim(`\n${systems.length} systems. \`sourcebook info <name>\` or \`sourcebook rank\` for popularity.`));
}

function cmdRank() {
  const limit = Number(flag("limit", 40));
  const enterprise = Boolean(flag("enterprise", false));
  let systems = listSystems().filter((s) =>
    enterprise ? Boolean(s.popularity?.enterpriseRank) : Boolean(s.popularity?.isDesignSystemRepo)
  );
  if (enterprise) {
    systems.sort((a, b) => (a.popularity?.enterpriseRank || 999) - (b.popularity?.enterpriseRank || 999));
  } else {
    systems.sort((a, b) => (b.popularity?.stars || 0) - (a.popularity?.stars || 0) || (b.popularity?.npmDownloads || 0) - (a.popularity?.npmDownloads || 0));
  }
  systems = systems.slice(0, limit);
  const w = Math.max(16, ...systems.map((s) => (s.displayName || s.name).length));
  for (const [i, s] of systems.entries()) {
    const rk = `#${i + 1}`.padEnd(4);
    const name = (s.displayName || s.name).padEnd(w);
    const org = (s.org || s.slug).slice(0, 14).padEnd(14);
    const stars = s.popularity?.stars ? `★ ${s.popularity.stars.toLocaleString()}`.padStart(10) : "       ★ -";
    const fws = (s.popularity?.frameworks || []).join(", ").padEnd(24);
    const repo = s.source?.repo || s.source?.package || "";
    console.log(`${cyan(rk)} ${bold(name)}  ${dim(org)}  ${yellow(stars)}  ${dim(fws)}  ${dim(repo)}`);
  }
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
  if (!name) fail("Usage: sourcebook info <name> [--prompt]");
  const s = resolve(name);
  if (!s) fail(`No system named "${name}". Try \`sourcebook list\`.`);

  const md = readDesign(s.slug);
  const preview = readPreview(s.slug);
  if (flag("prompt", false)) {
    process.stdout.write(EMITTERS.prompt.run(md, { preview, manifest: s }));
    return;
  }

  const report = lint(md, { name: s.slug });
  console.log(`${bold(s.displayName || s.name)}  ${dim(s.homepage || "")}`);
  console.log(`${s.style || ""}\n`);
  if (s.org && s.org !== (s.displayName || s.name)) console.log(`${dim("org")}        ${s.org}`);
  console.log(`${dim("license")}    ${s.license} ${dim(`(${s.provenance})`)}`);
  if (s.source?.repo) console.log(`${dim("repo")}       ${s.source.repo}`);
  if (s.source?.package) console.log(`${dim("package")}    ${s.source.package}`);
  if (s.popularity?.frameworks?.length) console.log(`${dim("frameworks")} ${s.popularity.frameworks.join(", ")}`);
  if (s.popularity?.stars || s.popularity?.npmDownloads) {
    console.log(
      `${dim("popular")}    #${s.popularity.rank} · ★ ${(s.popularity.stars || 0).toLocaleString()} stars · ${(s.popularity.npmDownloads || 0).toLocaleString()} npm/mo`
    );
  }
  console.log(`${dim("tags")}       ${(s.tags || []).join(", ")}`);
  console.log(`${dim("tokens")}     ${s.tokens?.colors || 0} colors · ${s.tokens?.typography || 0} type · ${s.tokens?.components || 0} components`);
  if (preview) {
    console.log(
      `${dim("surfaces")}   ${s.theme || "light"} · canvas ${preview.canvas} · surface ${preview.surface} · text ${preview.text} · brand ${preview.brand} · radius ${preview.radius}`
    );
    const fams = [...new Set((preview.type || []).map((t) => String(t.fontFamily || "").split(",")[0].replace(/['"]/g, "").trim()).filter(Boolean))].slice(0, 3);
    if (fams.length) console.log(`${dim("fonts")}      ${fams.join(" · ")}`);
    const comps = (preview.components || []).slice(0, 5).map((c) => `${c.key}(${c.backgroundColor || c.border || c.textColor || c.kind}${c.rounded ? `, ${c.rounded}` : ""})`);
    if (comps.length) console.log(`${dim("components")} ${comps.join(" · ")}`);
    if (preview.overview) {
      const ovLine = preview.overview.split(/\n+/)[0].replace(/\*\*([^*]+)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1");
      console.log(`\n${bold("Visual Language")}\n  ${ovLine}`);
    }
    if (preview.dos) {
      const ruleLines = preview.dos.split(/\n/).filter((l) => /^-\s+/.test(l.trim())).slice(0, 6);
      if (ruleLines.length) {
        console.log(`\n${bold("Guidelines")}`);
        for (const rl of ruleLines) console.log(`  ${rl.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1")}`);
      }
    }
  }
  console.log(`\n${dim("checks")}     ${badge(s)}`);
  if (s.provenance === "listed") {
    console.log(`  ${dim("· inventory-only record (no machine-readable tokens)")}`);
  } else if (!s.checks?.verified) {
    for (const f of report.findings.filter((f) => f.severity !== "info")) {
      console.log(`  ${f.severity === "error" ? red("✕") : yellow("·")} ${f.rule}: ${f.message}`);
    }
  }
  console.log(`\n${dim("prompt")}     npx sourcebook add ${s.slug} --framework prompt --print`);
  console.log(`${dim("install")}    npx sourcebook add ${s.slug} --framework tailwind-v4`);
  console.log(`${dim("mcp")}        sourcebook://systems/${s.slug}`);
  console.log(`${dim("file")}       ${path.relative(process.cwd(), path.join(s.dir, "DESIGN.md"))}`);
}

function cmdAdd() {
  const name = positional()[0];
  if (!name) fail("Usage: sourcebook add <name> [--framework tailwind-v4|css-vars|dtcg|prompt|json] [--dir <path>] [--force] [--print]");

  const s = resolve(name);
  if (!s) fail(`No system named "${name}". Try \`sourcebook search <intent>\`.`);

  const hasExplicitFramework = argv.includes("--framework");
  const framework = String(flag("framework", "tailwind-v4"));
  const emitter = EMITTERS[framework];
  if (!emitter) fail(`Unknown framework "${framework}". Options: ${Object.keys(EMITTERS).join(", ")}`);

  const targetDir = path.resolve(String(flag("dir", process.cwd())));
  const md = readDesign(s.slug);
  const ctx = { preview: readPreview(s.slug), manifest: s };
  const tokens = EMITTERS.dtcg.run(md, ctx);
  const theme = emitter.run(md, ctx);

  if (flag("print")) {
    process.stdout.write(hasExplicitFramework ? theme : md);
    return;
  }

  const outName = framework === "prompt" ? "design-prompt.md" : framework === "json" ? "design-bundle.json" : `design-theme.${emitter.ext}`;
  const files = [
    ["DESIGN.md", md],
    ["design-tokens.json", tokens],
    [outName, theme],
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
  if (s.provenance === "listed") console.log(yellow("Note: this is a listed inventory record with 0 tokens."));
  else if (!report.verified) console.log(yellow(`Note: ${report.counts.warnings} lint warning(s) on this entry.`));
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
  if (!name) fail("Usage: sourcebook export <name> --format tailwind-v4|css-vars|dtcg|prompt|json");
  const s = resolve(name);
  if (!s) fail(`No system named "${name}".`);

  const framework = String(flag("format", "dtcg"));
  const emitter = EMITTERS[framework];
  if (!emitter) fail(`Unknown format "${framework}". Options: ${Object.keys(EMITTERS).join(", ")}`);

  process.stdout.write(emitter.run(readDesign(s.slug), { preview: readPreview(s.slug), manifest: s }));
}

function cmdIndex() {
  const index = buildIndex();
  const dest = path.join(ROOT, "index.json");
  fs.writeFileSync(dest, JSON.stringify(index, null, 2) + "\n", "utf8");
  console.log(`${green("+")} index.json ${dim(`(${index.count} systems)`)}`);
}

function cmdSync() {
  const syncScript = path.join(ROOT, "scripts/sync-sources.mjs");
  try {
    execFileSync(process.execPath, [syncScript, ...argv.slice(1)], { cwd: ROOT, stdio: "inherit" });
  } catch (err) {
    process.exit(err.status || 1);
  }
}

function resolve(name) {
  const systems = listSystems();
  const n = String(name).toLowerCase();
  const sourced = systems.filter((s) => s.provenance !== "listed");
  return (
    systems.find((s) => s.slug === n) ||
    systems.find((s) => s.name === n) ||
    systems.find((s) => (s.displayName || "").toLowerCase() === n) ||
    sourced.find((s) => s.slug.includes(n) || (s.displayName || "").toLowerCase().includes(n)) ||
    systems.find((s) => s.slug.includes(n) || (s.displayName || "").toLowerCase().includes(n)) ||
    null
  );
}

function help() {
  console.log(`
${bold("sourcebook")} ${dim("— a verified, installable registry of design systems")}

${bold("Usage")}
  sourcebook list [--tag <tag>] [--verified] [--sort popular]
  sourcebook rank [--limit n] [--enterprise]
  sourcebook search <intent...> [--limit n] [--verified]
  sourcebook info <name> [--prompt]
  sourcebook add <name> [--framework tailwind-v4|css-vars|dtcg|prompt|json] [--dir <path>] [--force] [--print]
  sourcebook lint <name> | --all [--format json]
  sourcebook export <name> --format tailwind-v4|css-vars|dtcg|prompt|json
  sourcebook index
  sourcebook sync [--dry-run] [--ingest] [--limit n] [--url <url>] [--repo <url>] [--package <pkg>]
  sourcebook mcp

${bold("Connect to an agent")}
  ${dim("file drop")}   sourcebook add linear-app --dir .
  ${dim("mcp")}         sourcebook mcp   ${dim("# stdio server, works with any MCP host")}

${dim(`Spec: google-labs-code/design.md  ·  Registry: ${listSystems().length} systems`)}
`);
}

switch (cmd) {
  case "list":
  case "ls":
    cmdList();
    break;
  case "rank":
    cmdRank();
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
  case "sync":
    cmdSync();
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
