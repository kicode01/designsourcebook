import { getSql, hasDatabase } from "../../lib/db.mjs";

export async function GET(request) {
  if (!hasDatabase()) {
    return Response.json({ ok: false, error: "DATABASE_URL not configured" }, { status: 503 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").trim();
    const theme = (searchParams.get("theme") || "").trim().toLowerCase();
    const verifiedParam = searchParams.get("verified");
    const limit = Math.max(1, Math.min(250, Number(searchParams.get("limit") || 250)));

    const sql = getSql();
    const pattern = q ? `%${q}%` : null;
    const onlyTheme = theme === "dark" || theme === "light" ? theme : null;
    const onlyVerified = verifiedParam === "true" ? true : verifiedParam === "false" ? false : null;

    const rows = await sql`
      SELECT
        slug, name, provenance, org, style, category, theme, license,
        homepage, repo_url AS repo, package_name AS package,
        stars, forks, npm_downloads AS "npmDownloads",
        popularity_rank AS "popularityRank",
        is_design_system_repo AS "isDesignSystemRepo",
        frameworks, verified, warnings, icon_pack AS "iconPack",
        stats_synced_at AS "statsSyncedAt"
      FROM design_systems
      WHERE (${pattern}::text IS NULL OR name ILIKE ${pattern} OR slug ILIKE ${pattern} OR org ILIKE ${pattern} OR style ILIKE ${pattern} OR COALESCE(package_name,'') ILIKE ${pattern})
        AND (${onlyTheme}::text IS NULL OR theme = ${onlyTheme})
        AND (${onlyVerified}::boolean IS NULL OR verified = ${onlyVerified})
      ORDER BY stars DESC, name ASC
      LIMIT ${limit}
    `;

    return Response.json(
      { ok: true, count: rows.length, systems: rows },
      { headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" } }
    );
  } catch (err) {
    console.error("GET /api/systems failed:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
