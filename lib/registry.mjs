// Registry: load, index, and query the catalog.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(HERE, "..");
export const SYSTEMS_DIR = path.join(ROOT, "systems");

export function listSystems() {
  if (!fs.existsSync(SYSTEMS_DIR)) return [];
  return fs
    .readdirSync(SYSTEMS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => loadSystem(d.name))
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function loadSystem(slug) {
  const dir = path.join(SYSTEMS_DIR, slug);
  const manifestPath = path.join(dir, "manifest.json");
  if (!fs.existsSync(manifestPath)) return null;
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch {
    return null;
  }
  return { ...manifest, slug, dir };
}

export function readDesign(slug) {
  const p = path.join(SYSTEMS_DIR, slug, "DESIGN.md");
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
}

// Intent search. The whole point is that you can ask for a feeling
// ("dark, data-dense, fintech") rather than a brand name.
export function search(query, { tags = [], limit = 10, verifiedOnly = false } = {}) {
  const systems = listSystems();
  const terms = String(query || "")
    .toLowerCase()
    .split(/[^a-z0-9\u4e00-\u9fa5]+/)
    .filter((t) => t.length > 1);

  const scored = systems.map((s) => {
    let score = 0;
    const name = s.name.toLowerCase();
    const display = (s.displayName || "").toLowerCase();
    const haystack = [s.style, s.description, ...(s.tags || [])].join(" ").toLowerCase();
    const body = readDesign(s.slug) || "";

    for (const t of terms) {
      if (display === t || name === t) score += 100;
      else if (name.startsWith(t)) score += 50;
      else if (name.includes(t)) score += 30;
      if ((s.tags || []).some((tag) => tag.toLowerCase() === t)) score += 20;
      else if ((s.tags || []).some((tag) => tag.toLowerCase().includes(t))) score += 10;
      if (haystack.includes(t)) score += 8;
      const bodyHits = countOccurrences(body.toLowerCase(), t);
      if (bodyHits) score += Math.min(6, bodyHits);
    }

    for (const tag of tags) {
      if ((s.tags || []).some((x) => x.toLowerCase() === tag.toLowerCase())) score += 15;
    }

    if (verifiedOnly && !(s.checks && s.checks.verified)) score = 0;
    if (!terms.length && !tags.length) score = 1;

    return { system: s, score };
  });

  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => ({ ...x.system, score: x.score }));
}

function countOccurrences(haystack, needle) {
  let count = 0;
  let i = 0;
  while ((i = haystack.indexOf(needle, i)) !== -1) {
    count++;
    i += needle.length;
  }
  return count;
}

export function buildIndex() {
  const systems = listSystems().map((s) => ({
    name: s.name,
    displayName: s.displayName,
    style: s.style,
    tags: s.tags,
    license: s.license,
    homepage: s.homepage,
    checks: s.checks,
  }));
  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    count: systems.length,
    systems,
  };
}
