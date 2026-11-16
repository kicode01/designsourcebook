// Recompute the resolved surfaces for every existing entry without re-ingesting.
//
// preview.json stores canvas / surface / text / muted / brand / border as decided
// at ingest time. When that logic is fixed, every stored entry is stale — and
// re-cloning 110 repos to pick up a two-line change is not reasonable.
//
// This rebuilds those fields from each entry's own palette, using the current
// resolver, so a fix applies everywhere at once.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildPreview } from "../lib/preview.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const dirs = fs
  .readdirSync(path.join(ROOT, "systems"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let changed = 0;
const moved = [];

for (const slug of dirs) {
  const file = path.join(ROOT, "systems", slug, "preview.json");
  if (!fs.existsSync(file)) continue;
  const old = JSON.parse(fs.readFileSync(file, "utf8"));

  const colors = Object.fromEntries(old.palette.map((c) => [c.name, c.value]));
  const components = Object.fromEntries((old.components || []).map((c) => [c.key, c]));
  const typography = Object.fromEntries(
    (old.type || []).map((t) => [
      t.name,
      {
        fontFamily: t.fontFamily,
        fontSize: t.fontSize,
        fontWeight: t.fontWeight,
        lineHeight: t.lineHeight,
        letterSpacing: t.letterSpacing,
      },
    ])
  );

  const next = buildPreview({
    colors,
    typography,
    components,
    prose: { overview: old.overview, dos: old.dos },
  });

  if (next.text !== old.text || next.muted !== old.muted || next.canvas !== old.canvas || next.brand !== old.brand) {
    moved.push({ slug, was: `${old.canvas}/${old.text}`, now: `${next.canvas}/${next.text}` });
    changed++;
  }

  fs.writeFileSync(file, JSON.stringify(next, null, 2) + "\n", "utf8");
}

console.log(`recomputed ${dirs.length} previews, ${changed} changed surface resolution`);
for (const m of moved.slice(0, 12)) console.log(`  ${m.slug.padEnd(18)} ${m.was}  \u2192  ${m.now}`);
