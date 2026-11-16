// Recompute tokens.json, preview.json, and manifest.json checks/theme/tokens
// from each entry's DESIGN.md without re-ingesting.
//
// When surface resolution, DTCG emission, or lint rules are updated, stored
// derived files go stale — re-cloning 110 repos to pick up a resolver fix is
// unnecessary when DESIGN.md already holds the canonical tokens.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildPreview, themeOfCanvas } from "../lib/preview.mjs";
import { splitFrontMatter } from "../lib/fm.mjs";
import { emitDtcg } from "../lib/emit.mjs";
import { lint } from "../lib/lint.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

function writeRetry(p, content) {
  for (let i = 0; i < 10; i++) {
    try {
      fs.writeFileSync(p, content, "utf8");
      return;
    } catch (err) {
      if (i === 9) throw err;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80);
    }
  }
}

const dirs = fs
  .readdirSync(path.join(ROOT, "systems"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let changed = 0;
const moved = [];

for (const slug of dirs) {
  const dir = path.join(ROOT, "systems", slug);
  const mdPath = path.join(dir, "DESIGN.md");
  const prevPath = path.join(dir, "preview.json");
  const manPath = path.join(dir, "manifest.json");
  if (!fs.existsSync(mdPath) || !fs.existsSync(prevPath) || !fs.existsSync(manPath)) continue;

  const md = fs.readFileSync(mdPath, "utf8");
  const old = JSON.parse(fs.readFileSync(prevPath, "utf8"));
  const manifest = JSON.parse(fs.readFileSync(manPath, "utf8"));
  const { data } = splitFrontMatter(md);

  if (manifest.provenance === "listed") {
    const report = lint(md, { name: slug });
    manifest.checks = {
      errors: report.counts.errors,
      warnings: report.counts.warnings,
      verified: false,
    };
    fs.writeFileSync(path.join(dir, "tokens.json"), emitDtcg(md), "utf8");
    fs.writeFileSync(manPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
    continue;
  }

  const isKeyword = (v) => /^(inherit|unset|initial|revert)$/i.test(String(v || "").trim());
  const classifyKind = (k, prevKind) => {
    const s = `${k} ${prevKind || ""}`.toLowerCase();
    if (/button|btn|cta|action/.test(s) && !/nav|carouselbutton/.test(s)) return "button";
    if (/input|field|textfield|search|select|textarea|control|form/.test(s)) return "input";
    if (/badge|tag|chip|pill|status|label|indicator|bubble/.test(s)) return "badge";
    if (/nav|menu|header|tab|breadcrumb|sidebar|link/.test(s)) return "nav";
    if (/card|panel|surface|tile|box|callout|alert|modal|dialog|table|well|banner|summary/.test(s)) return "card";
    if (["button", "input", "card", "badge", "nav"].includes(prevKind)) return prevKind;
    return "card";
  };
  const oldCompByKey = new Map((old.components || []).map((c) => [c.key, c]));
  const components = {};
  for (const [k, c] of Object.entries(data.components || {})) {
    const prevComp = oldCompByKey.get(k);
    const merged = {
      ...(prevComp?.border && !isKeyword(prevComp.border) ? { border: prevComp.border } : {}),
      ...(prevComp?.shadow && !isKeyword(prevComp.shadow) ? { shadow: prevComp.shadow } : {}),
      ...c,
      key: k,
      kind: classifyKind(k, prevComp?.kind),
    };
    if (isKeyword(merged.backgroundColor)) delete merged.backgroundColor;
    if (isKeyword(merged.textColor)) delete merged.textColor;
    if (isKeyword(merged.borderColor)) delete merged.borderColor;
    components[k] = merged;
  }

  const colors = data.colors || {};
  const typography = data.typography || {};
  const vlMatch = /## (?:Visual Language|Do's and Don'ts|Guidelines)\s+([\s\S]*?)(?=\n## |\s*$)/i.exec(md);
  const cleanOverview =
    old.overview && !/tokens read from|read from the rendered page|tokens imported from|read from .* live stylesheets/i.test(old.overview)
      ? old.overview
      : `${manifest.displayName || slug} — ${manifest.style || data.description || "Verified design system tokens."}`;
  const cleanDos = old.dos || (vlMatch ? vlMatch[1].trim() : "");
  const next = buildPreview({
    colors,
    typography,
    components,
    prose: { overview: cleanOverview, dos: cleanDos },
  });

  if (next.text !== old.text || next.muted !== old.muted || next.canvas !== old.canvas || next.brand !== old.brand) {
    moved.push({ slug, was: `${old.canvas}/${old.text}`, now: `${next.canvas}/${next.text}` });
    changed++;
  }

  const report = lint(md, { name: slug });
  const theme = themeOfCanvas(next.canvas);
  if (theme) {
    manifest.theme = theme;
    const tags = new Set((manifest.tags || []).filter((t) => t !== "light" && t !== "dark"));
    tags.add(theme);
    if (manifest.provenance === "observed" && tags.has("published")) {
      tags.delete("published");
      tags.add("observed");
    }
    manifest.tags = [...tags];
  }
  manifest.tokens = {
    colors: next.palette.length,
    typography: next.type.length,
    components: Object.keys(data.components || {}).length,
  };
  manifest.checks = {
    errors: report.counts.errors,
    warnings: report.counts.warnings,
    verified: report.verified,
  };

  writeRetry(path.join(dir, "tokens.json"), emitDtcg(md));
  writeRetry(prevPath, JSON.stringify(next, null, 2) + "\n");
  writeRetry(manPath, JSON.stringify(manifest, null, 2) + "\n");
}

console.log(`recomputed ${dirs.length} entries, ${changed} changed surface resolution`);
for (const m of moved.slice(0, 12)) console.log(`  ${m.slug.padEnd(18)} ${m.was}  \u2192  ${m.now}`);
