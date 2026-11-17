// Seed Neon Postgres with all verified official icon packs, full design system tokens,
// full DESIGN.md guidelines, coverage metadata, and optional live GitHub/npm popularity stats.
//
// Usage:
//   node scripts/db-seed.mjs          # Seed schema + all 208 systems + 51 packs
//   node scripts/db-seed.mjs --sync   # Also refresh live GitHub stars & npm downloads

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ensureSchema, getSql, loadLocalEnv } from "../lib/db.mjs";
import { syncLivePopularityStats } from "../lib/popularity.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const SYSTEMS_DIR = path.join(ROOT, "systems");

async function main() {
  loadLocalEnv(ROOT);
  const doSync = process.argv.includes("--sync");
  const sql = getSql();

  await ensureSchema(sql);
  console.log("Postgres schema ready.");

  // 1. Seed verified official icon packs
  const packsPath = path.join(ROOT, "data/icon-packs.json");
  const iconPacks = fs.existsSync(packsPath) ? JSON.parse(fs.readFileSync(packsPath, "utf8")) : {};
  for (const [id, pack] of Object.entries(iconPacks)) {
    await sql`
      INSERT INTO icon_packs (id, package_name, version, grid, glyphs, updated_at)
      VALUES (${id}, ${pack.package}, ${String(pack.version || "latest")}, ${Number(pack.grid || 24)}, ${JSON.stringify(pack.glyphs || [])}::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE SET
        package_name = EXCLUDED.package_name,
        version = EXCLUDED.version,
        grid = EXCLUDED.grid,
        glyphs = EXCLUDED.glyphs,
        updated_at = NOW()
    `;
  }
  console.log(`Seeded ${Object.keys(iconPacks).length} verified icon packs.`);

  // 2. Seed coverage metadata
  const covPath = path.join(ROOT, "data/coverage.json");
  if (fs.existsSync(covPath)) {
    const cov = JSON.parse(fs.readFileSync(covPath, "utf8"));
    await sql`
      INSERT INTO coverage_meta (id, sources, entries, updated_at)
      VALUES ('default', ${JSON.stringify(cov.sources || [])}::jsonb, ${JSON.stringify(cov.union?.entries || [])}::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE SET
        sources = EXCLUDED.sources,
        entries = EXCLUDED.entries,
        updated_at = NOW()
    `;
    console.log(`Seeded coverage index (${(cov.union?.entries || []).length} entries).`);
  }

  // 3. Seed all systems with complete tokens.json, preview.json, manifest.json, and DESIGN.md
  const dirs = fs.readdirSync(SYSTEMS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();
  let seeded = 0;
  const BATCH = 10;

  for (let i = 0; i < dirs.length; i += BATCH) {
    const slice = dirs.slice(i, i + BATCH);
    await Promise.all(
      slice.map(async (slug) => {
        const dir = path.join(SYSTEMS_DIR, slug);
        const mp = path.join(dir, "manifest.json");
        const pp = path.join(dir, "preview.json");
        const tp = path.join(dir, "tokens.json");
        const dp = path.join(dir, "DESIGN.md");
        if (!fs.existsSync(mp) || !fs.existsSync(pp)) return;

        const m = JSON.parse(fs.readFileSync(mp, "utf8"));
        const p = JSON.parse(fs.readFileSync(pp, "utf8"));
        const t = fs.existsSync(tp) ? JSON.parse(fs.readFileSync(tp, "utf8")) : {};
        const dmd = fs.existsSync(dp) ? fs.readFileSync(dp, "utf8") : "";

        const stars = Number(m.popularity?.stars || 0);
        const forks = Number(m.popularity?.forks || 0);
        const npmDl = Number(m.popularity?.npmDownloads || 0);
        const popRank = Number(m.popularity?.rank || 999);
        const popScore = Number(m.popularity?.score || 0);
        const isDs = Boolean(m.popularity?.isDesignSystemRepo);
        const entRank = m.popularity?.enterpriseRank ?? null;
        const verified = Boolean(m.checks?.verified);
        const warnings = Number(m.checks?.warnings || 0);
        const iconPack = p.icons?.pack && iconPacks[p.icons.pack] ? p.icons.pack : null;

        await sql`
          INSERT INTO design_systems (
            slug, name, provenance, org, style, category, theme, license,
            homepage, repo_url, package_name,
            stars, forks, npm_downloads, popularity_rank, popularity_score,
            is_design_system_repo, enterprise_rank,
            frameworks, tags, listed_names, lists,
            verified, warnings, icon_pack,
            preview, tokens, design_md, manifest, updated_at
          ) VALUES (
            ${m.name || slug},
            ${m.displayName || m.name || slug},
            ${m.provenance || "observed"},
            ${m.org || ""},
            ${m.style || ""},
            ${m.category || ""},
            ${m.theme || "dark"},
            ${m.license || "unknown"},
            ${m.homepage || m.source?.url || null},
            ${m.source?.repo || null},
            ${m.source?.package || null},
            ${stars}, ${forks}, ${npmDl}, ${popRank}, ${popScore},
            ${isDs}, ${entRank},
            ${JSON.stringify(m.popularity?.frameworks || [])}::jsonb,
            ${JSON.stringify(m.tags || [])}::jsonb,
            ${JSON.stringify(m.listedNames || [])}::jsonb,
            ${JSON.stringify(m.source?.lists || [])}::jsonb,
            ${verified}, ${warnings}, ${iconPack},
            ${JSON.stringify(p)}::jsonb,
            ${JSON.stringify(t)}::jsonb,
            ${dmd},
            ${JSON.stringify(m)}::jsonb,
            NOW()
          )
          ON CONFLICT (slug) DO UPDATE SET
            name = EXCLUDED.name,
            provenance = EXCLUDED.provenance,
            org = EXCLUDED.org,
            style = EXCLUDED.style,
            category = EXCLUDED.category,
            theme = EXCLUDED.theme,
            license = EXCLUDED.license,
            homepage = EXCLUDED.homepage,
            repo_url = EXCLUDED.repo_url,
            package_name = EXCLUDED.package_name,
            popularity_rank = EXCLUDED.popularity_rank,
            popularity_score = EXCLUDED.popularity_score,
            is_design_system_repo = EXCLUDED.is_design_system_repo,
            enterprise_rank = EXCLUDED.enterprise_rank,
            frameworks = EXCLUDED.frameworks,
            tags = EXCLUDED.tags,
            listed_names = EXCLUDED.listed_names,
            lists = EXCLUDED.lists,
            verified = EXCLUDED.verified,
            warnings = EXCLUDED.warnings,
            icon_pack = EXCLUDED.icon_pack,
            preview = EXCLUDED.preview,
            tokens = EXCLUDED.tokens,
            design_md = EXCLUDED.design_md,
            manifest = EXCLUDED.manifest,
            updated_at = NOW()
        `;
        seeded++;
      })
    );
  }
  console.log(`Seeded ${seeded} design systems with full tokens and DESIGN.md.`);

  if (doSync) {
    const syncRes = await syncLivePopularityStats(sql, { maxGithub: 50 });
    console.log("Live popularity stats refreshed:", syncRes);
  }

  await sql`INSERT INTO sync_runs (kind, updated_count, details) VALUES ('seed', ${seeded}, ${JSON.stringify({ packs: Object.keys(iconPacks).length })}::jsonb)`;
  console.log("Database seed complete.");
}

main().catch((err) => {
  console.error("db-seed error:", err);
  process.exit(1);
});
