// Seed Neon Postgres `logos` table with the 1,432 visually classified SVG brand marks
// for educational construction anatomy inspection inside Design Sourcebook Studio.
//
// Usage:
//   node scripts/db-seed-logos.mjs [path/to/logo-library]

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ensureSchema, getSql, loadLocalEnv } from "../lib/db.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const DEFAULT_LIB_DIR = path.join(
  os.homedir(),
  ".gemini",
  "config",
  "skills",
  "logo-design",
  "assets",
  "library",
);

async function main() {
  loadLocalEnv(ROOT);
  const libDir = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_LIB_DIR;
  const catalogPath = path.join(libDir, "catalog.json");
  const svgDir = path.join(libDir, "svg");

  if (!fs.existsSync(catalogPath)) {
    throw new Error(`Logo library catalog not found: ${catalogPath}`);
  }

  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const sql = getSql();
  await ensureSchema(sql);

  let seeded = 0;
  const BATCH = 20;

  for (let i = 0; i < catalog.length; i += BATCH) {
    const slice = catalog.slice(i, i + BATCH);
    await Promise.all(
      slice.map(async (entry) => {
        const file = String(entry.file || "");
        const svgPath = path.join(svgDir, file);
        if (!file || !fs.existsSync(svgPath)) return;
        const svg = fs.readFileSync(svgPath, "utf8");
        const id = file.replace(/\.svg$/i, "");

        await sql`
          INSERT INTO logos (
            id, brand, variant, pair, width, height, aspect, aspect_class,
            bytes, shapes, anchors, colors, n_colors, color_families, primary_family,
            gradients, has_mask, has_filter, mark_type, symbol_type, subject,
            geometry, techniques, type_style, letter_case, mood, industry,
            exemplary, note, svg, updated_at
          ) VALUES (
            ${id},
            ${String(entry.brand || id)},
            ${String(entry.variant || "main")},
            ${entry.pair ? String(entry.pair) : null},
            ${Number(entry.width || 256)},
            ${Number(entry.height || 256)},
            ${Number(entry.aspect || 1)},
            ${String(entry.aspect_class || "square")},
            ${Number(entry.bytes || Buffer.byteLength(svg, "utf8"))},
            ${Number(entry.shapes || 0)},
            ${Number(entry.anchors || 0)},
            ${JSON.stringify(entry.colors || [])}::jsonb,
            ${Number(entry.n_colors || (entry.colors || []).length || 1)},
            ${JSON.stringify(entry.color_families || [])}::jsonb,
            ${String(entry.primary_family || "mono")},
            ${Number(entry.gradients || 0)},
            ${Boolean(entry.has_mask)},
            ${Boolean(entry.has_filter)},
            ${String(entry.mark_type || "abstract")},
            ${entry.symbol_type ? String(entry.symbol_type) : null},
            ${String(entry.subject || "")},
            ${JSON.stringify(entry.geometry || [])}::jsonb,
            ${JSON.stringify(entry.techniques || [])}::jsonb,
            ${entry.type_style ? String(entry.type_style) : null},
            ${entry.case ? String(entry.case) : null},
            ${JSON.stringify(entry.mood || [])}::jsonb,
            ${String(entry.industry || "other")},
            ${Boolean(entry.exemplary)},
            ${String(entry.note || "")},
            ${svg},
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            brand = EXCLUDED.brand,
            variant = EXCLUDED.variant,
            pair = EXCLUDED.pair,
            width = EXCLUDED.width,
            height = EXCLUDED.height,
            aspect = EXCLUDED.aspect,
            aspect_class = EXCLUDED.aspect_class,
            bytes = EXCLUDED.bytes,
            shapes = EXCLUDED.shapes,
            anchors = EXCLUDED.anchors,
            colors = EXCLUDED.colors,
            n_colors = EXCLUDED.n_colors,
            color_families = EXCLUDED.color_families,
            primary_family = EXCLUDED.primary_family,
            gradients = EXCLUDED.gradients,
            has_mask = EXCLUDED.has_mask,
            has_filter = EXCLUDED.has_filter,
            mark_type = EXCLUDED.mark_type,
            symbol_type = EXCLUDED.symbol_type,
            subject = EXCLUDED.subject,
            geometry = EXCLUDED.geometry,
            techniques = EXCLUDED.techniques,
            type_style = EXCLUDED.type_style,
            letter_case = EXCLUDED.letter_case,
            mood = EXCLUDED.mood,
            industry = EXCLUDED.industry,
            exemplary = EXCLUDED.exemplary,
            note = EXCLUDED.note,
            svg = EXCLUDED.svg,
            updated_at = NOW()
        `;
        seeded++;
      }),
    );
    if ((i + slice.length) % 200 === 0 || i + slice.length >= catalog.length) {
      console.log(`Seeded ${seeded}/${catalog.length} logos...`);
    }
  }

  await sql`
    INSERT INTO sync_runs (kind, updated_count, details)
    VALUES ('logos-seed', ${seeded}, ${JSON.stringify({ source: "logo-design-library" })}::jsonb)
  `;
  console.log(`Done seeding ${seeded} logos into Neon Postgres.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
