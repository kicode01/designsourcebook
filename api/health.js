import { getSql, hasDatabase } from "../lib/db.mjs";

export async function GET() {
  if (!hasDatabase()) {
    return Response.json({ ok: false, error: "DATABASE_URL not configured" }, { status: 503 });
  }
  try {
    const sql = getSql();
    const [counts] = await sql`
      SELECT
        (SELECT COUNT(*)::int FROM design_systems) AS systems,
        (SELECT COUNT(*)::int FROM icon_packs) AS icon_packs,
        (SELECT COUNT(*)::int FROM logos) AS logos,
        (SELECT MAX(stats_synced_at) FROM design_systems) AS last_stats_sync
    `;
    const recentSyncs = await sql`
      SELECT kind, updated_count, details, ran_at
      FROM sync_runs
      ORDER BY id DESC
      LIMIT 3
    `;
    return Response.json({
      ok: true,
      database: "neon-postgres",
      counts,
      recentSyncs,
    });
  } catch (err) {
    console.error("GET /api/health failed:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
