// Seed Neon Postgres `logos` table with the curated, deduplicated supplemental marks in `data/extra-logos.json`.
// Preserves the base 1,432 marks and upserts all supplemental entries idempotently via ON CONFLICT (id) DO UPDATE.

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { ensureSchema, getSql, hasDatabase, loadLocalEnv } from "../lib/db.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EXTRA_LOGOS_PATH = path.join(ROOT, "data/extra-logos.json");
const BASE_CATALOG_PATH = path.join(os.homedir(), ".gemini/config/skills/logo-design/assets/library/catalog.json");

loadLocalEnv(ROOT);

async function main() {
  if (!hasDatabase()) {
    console.error("DATABASE_URL is not configured. Connect Neon Postgres and run `vercel env pull` first.");
    process.exit(1);
  }
  if (!fs.existsSync(EXTRA_LOGOS_PATH)) {
    throw new Error(`Supplemental logos not found at ${EXTRA_LOGOS_PATH}. Run scripts/source-more-logos.mjs first.`);
  }

  const payload = JSON.parse(fs.readFileSync(EXTRA_LOGOS_PATH, "utf8"));
  const items = Array.isArray(payload.items) ? payload.items : [];
  const sql = getSql();
  await ensureSchema(sql);

  const batchSize = 35;
  let upserted = 0;

  for (let i = 0; i < items.length; i += batchSize) {
    const slice = items.slice(i, i + batchSize);
    await Promise.all(
      slice.map(async (r) => {
        await sql`
          INSERT INTO logos (
            id, brand, variant, pair, width, height, aspect, aspect_class,
            bytes, shapes, anchors, colors, n_colors, color_families, primary_family,
            gradients, has_mask, has_filter, mark_type, symbol_type, subject,
            geometry, techniques, type_style, letter_case, mood, industry,
            exemplary, note, svg, updated_at
          ) VALUES (
            ${r.id},
            ${r.brand},
            ${r.variant || "main"},
            ${r.pair || null},
            ${Number(r.width) || 256},
            ${Number(r.height) || 256},
            ${Number(r.aspect) || 1},
            ${r.aspect_class || "square"},
            ${Number(r.bytes) || Buffer.byteLength(r.svg, "utf8")},
            ${Number(r.shapes) || 0},
            ${Number(r.anchors) || 0},
            ${JSON.stringify(r.colors || [])}::jsonb,
            ${Number(r.n_colors) || 1},
            ${JSON.stringify(r.color_families || [])}::jsonb,
            ${r.primary_family || "mono"},
            ${Number(r.gradients) || 0},
            ${Boolean(r.has_mask)},
            ${Boolean(r.has_filter)},
            ${r.mark_type || "abstract"},
            ${r.symbol_type || null},
            ${r.subject || ""},
            ${JSON.stringify(r.geometry || [])}::jsonb,
            ${JSON.stringify(r.techniques || [])}::jsonb,
            ${r.type_style || null},
            ${r.letter_case || null},
            ${JSON.stringify(r.mood || [])}::jsonb,
            ${r.industry || "other"},
            ${Boolean(r.exemplary)},
            ${r.note || ""},
            ${r.svg},
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
        upserted++;
      })
    );
    if ((i + batchSize) % 350 === 0 || i + batchSize >= items.length) {
      console.log(`Seeded ${upserted} / ${items.length} supplemental logos...`);
    }
  }

  if (fs.existsSync(BASE_CATALOG_PATH)) {
    const base = JSON.parse(fs.readFileSync(BASE_CATALOG_PATH, "utf8"));
    const keepIds = [...new Set([...base.map((x) => x.file.replace(/\.svg$/i, "")), ...items.map((x) => x.id)])];
    const delRes = await sql`DELETE FROM logos WHERE NOT (id = ANY(${keepIds})) RETURNING id`;
    if (delRes.length) console.log(`Pruned ${delRes.length} stale/redundant logos from Postgres.`);
  }

  const [totals] = await sql`SELECT COUNT(*)::int AS total, COUNT(DISTINCT brand)::int AS brands FROM logos`;
  await sql`INSERT INTO sync_runs (kind, updated_count, details) VALUES ('seed-extra-logos', ${upserted}, ${JSON.stringify({ total: totals.total, brands: totals.brands })}::jsonb)`;
  console.log(`Done! Neon Postgres logos table now has ${totals.total} unique marks across ${totals.brands} distinct brands.`);
}

main().catch((err) => {
  console.error("db-seed-extra-logos error:", err);
  process.exit(1);
});
