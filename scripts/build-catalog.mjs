// Build a self-contained catalog page from the registry.
// Reads systems/*/manifest.json + preview.json, inlines everything into one HTML
// file so it opens from disk with no server and no build step.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const SYSTEMS = path.join(ROOT, "systems");
const OUT_DIR = path.join(ROOT, "catalog");

const template = fs.readFileSync(path.join(HERE, "catalog-template.html"), "utf8");

const systems = fs
  .readdirSync(SYSTEMS, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => {
    const dir = path.join(SYSTEMS, d.name);
    const manifestPath = path.join(dir, "manifest.json");
    const previewPath = path.join(dir, "preview.json");
    if (!fs.existsSync(manifestPath) || !fs.existsSync(previewPath)) return null;

    const m = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const p = JSON.parse(fs.readFileSync(previewPath, "utf8"));

    return {
      slug: m.name,
      name: m.displayName || m.name,
      provenance: m.provenance || "observed",
      org: m.org || "",
      listedNames: m.listedNames || [],
      lists: m.source?.lists || [],
      style: m.style || "",
      category: m.category || "",
      theme: m.theme || "dark",
      tags: m.tags || [],
      license: m.license || "unknown",
      repo: m.source?.repo || null,
      package: m.source?.package || null,
      stars: m.popularity?.stars || 0,
      forks: m.popularity?.forks || 0,
      npmDownloads: m.popularity?.npmDownloads || 0,
      popularityRank: m.popularity?.rank || 999,
      popularityScore: m.popularity?.score || 0,
      isDesignSystemRepo: Boolean(m.popularity?.isDesignSystemRepo),
      enterpriseRank: m.popularity?.enterpriseRank || null,
      frameworks: m.popularity?.frameworks || [],
      verified: Boolean(m.checks?.verified),
      warnings: m.checks?.warnings || 0,
      canvas: p.canvas,
      surface: p.surface,
      text: p.text,
      muted: p.muted,
      brand: p.brand,
      border: p.border,
      radius: p.radius,
      palette: p.palette,
      type: p.type,
      components: p.components,
      overview: p.overview,
      dos: p.dos,
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name));

const json = JSON.stringify(systems).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");

// Coverage travels with the page so the catalog can answer "do we have X?"
// without a second tool.
let coverage = { sources: [], union: { entries: [] } };
const coveragePath = path.join(ROOT, "data/coverage.json");
if (fs.existsSync(coveragePath)) coverage = JSON.parse(fs.readFileSync(coveragePath, "utf8"));

const covJson = JSON.stringify({
  sources: coverage.sources || [],
  union: coverage.union || { entries: [] },
})
  .replace(/</g, "\\u003c")
  .replace(/\u2028/g, "\\u2028")
  .replace(/\u2029/g, "\\u2029");

const html = template.replace("/*__DATA__*/ []", json).replace("/*__COVERAGE__*/ {}", covJson);

fs.mkdirSync(OUT_DIR, { recursive: true });
const dest = path.join(OUT_DIR, "index.html");
for (let i = 0; i < 8; i++) {
  try {
    fs.writeFileSync(dest, html, "utf8");
    break;
  } catch (err) {
    if (i === 7) throw err;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
  }
}

const kb = (fs.statSync(dest).size / 1024).toFixed(0);
const withComps = systems.filter((s) => s.components.length > 0).length;
const totalComps = systems.reduce((n, s) => n + s.components.length, 0);

console.log(`Built ${path.relative(ROOT, dest)} — ${systems.length} systems, ${kb} KB`);
console.log(`  ${withComps} systems have documented components (${totalComps} tokens total)`);
console.log(`  ${systems.filter((s) => s.theme === "dark").length} dark · ${systems.filter((s) => s.theme === "light").length} light`);
