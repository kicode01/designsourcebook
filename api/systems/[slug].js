import { getSql, hasDatabase } from "../../lib/db.mjs";

export async function GET(request) {
  if (!hasDatabase()) {
    return Response.json({ ok: false, error: "DATABASE_URL not configured" }, { status: 503 });
  }
  try {
    const pathname = new URL(request.url).pathname;
    const slug = decodeURIComponent(pathname.split("/").filter(Boolean).pop() || "").trim();
    if (!slug) {
      return Response.json({ ok: false, error: "Missing design system slug" }, { status: 400 });
    }

    const sql = getSql();
    const [row] = await sql`
      SELECT
        slug, name, provenance, org, style, category, theme, license,
        homepage, repo_url AS repo, package_name AS package,
        stars, forks, npm_downloads AS "npmDownloads",
        popularity_rank AS "popularityRank", popularity_score AS "popularityScore",
        is_design_system_repo AS "isDesignSystemRepo", enterprise_rank AS "enterpriseRank",
        frameworks, tags, verified, warnings, icon_pack AS "iconPack",
        preview, tokens, design_md AS "designMd", manifest,
        stats_synced_at AS "statsSyncedAt", updated_at AS "updatedAt"
      FROM design_systems
      WHERE slug = ${slug}
      LIMIT 1
    `;

    if (!row) {
      return Response.json({ ok: false, error: `Unknown design system: ${slug}` }, { status: 404 });
    }

    let packData = null;
    if (row.iconPack) {
      const [pk] = await sql`
        SELECT id, package_name AS package, version, grid, glyphs
        FROM icon_packs WHERE id = ${row.iconPack} LIMIT 1
      `;
      if (pk) packData = pk;
    }

    return Response.json(
      { ok: true, system: { ...row, iconPackData: packData } },
      { headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" } }
    );
  } catch (err) {
    console.error("GET /api/systems/[slug] failed:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
