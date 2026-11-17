import { getSql, hasDatabase } from "../lib/db.mjs";

export async function GET() {
  if (!hasDatabase()) {
    return Response.json({ ok: false, error: "DATABASE_URL not configured" }, { status: 503 });
  }
  try {
    const sql = getSql();
    const [sysRows, packRows, covRows, syncMeta] = await Promise.all([
      sql`
        SELECT
          slug, name, provenance, org, style, category, theme, license,
          homepage, repo_url, package_name,
          stars, forks, npm_downloads, popularity_rank, popularity_score,
          is_design_system_repo, enterprise_rank,
          frameworks, tags, listed_names, lists, verified, warnings,
          preview, stats_synced_at
        FROM design_systems
        ORDER BY name ASC
      `,
      sql`SELECT id, package_name, version, grid, glyphs FROM icon_packs`,
      sql`SELECT sources, entries FROM coverage_meta WHERE id = 'default' LIMIT 1`,
      sql`SELECT MAX(stats_synced_at) AS synced_at FROM design_systems`,
    ]);

    const systems = sysRows.map((r) => {
      const p = r.preview || {};
      return {
        slug: r.slug,
        name: r.name,
        provenance: r.provenance,
        org: r.org,
        listedNames: r.listed_names || [],
        lists: r.lists || [],
        style: r.style,
        category: r.category,
        theme: r.theme,
        tags: r.tags || [],
        license: r.license,
        homepage: r.homepage,
        repo: r.repo_url,
        package: r.package_name,
        stars: Number(r.stars || 0),
        forks: Number(r.forks || 0),
        npmDownloads: Number(r.npm_downloads || 0),
        popularityRank: Number(r.popularity_rank || 999),
        popularityScore: Number(r.popularity_score || 0),
        isDesignSystemRepo: Boolean(r.is_design_system_repo),
        enterpriseRank: r.enterprise_rank,
        frameworks: r.frameworks || [],
        verified: Boolean(r.verified),
        warnings: Number(r.warnings || 0),
        statsSyncedAt: r.stats_synced_at || null,
        canvas: p.canvas,
        surface: p.surface,
        text: p.text,
        muted: p.muted,
        brand: p.brand,
        border: p.border,
        radius: p.radius,
        rounded: p.rounded,
        spacing: p.spacing,
        palette: p.palette || [],
        type: p.type || [],
        components: p.components || [],
        icons: p.icons,
        overview: p.overview,
        dos: p.dos,
      };
    });

    const iconPacks = {};
    for (const pk of packRows) {
      iconPacks[pk.id] = {
        package: pk.package_name,
        version: pk.version,
        grid: Number(pk.grid),
        glyphs: pk.glyphs || [],
      };
    }

    const cov = covRows[0] || { sources: [], entries: [] };
    return Response.json(
      {
        dbBacked: true,
        syncedAt: syncMeta[0]?.synced_at || null,
        systems,
        iconPacks,
        coverage: { sources: cov.sources || [], union: { entries: cov.entries || [] } },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
        },
      }
    );
  } catch (err) {
    console.error("GET /api/catalog failed:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
