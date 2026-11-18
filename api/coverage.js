import { getSql, hasDatabase } from "../lib/db.mjs";

export async function GET() {
  if (!hasDatabase()) {
    return Response.json({ ok: false, error: "DATABASE_URL not configured" }, { status: 503 });
  }
  try {
    const sql = getSql();
    const [row] = await sql`
      SELECT sources, entries, updated_at AS "updatedAt"
      FROM coverage_meta
      WHERE id = 'default'
      LIMIT 1
    `;
    const cov = row || { sources: [], entries: [], updatedAt: null };
    return Response.json(
      {
        ok: true,
        updatedAt: cov.updatedAt || null,
        coverage: {
          sources: cov.sources || [],
          union: { entries: cov.entries || [] },
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
        },
      },
    );
  } catch (err) {
    console.error("GET /api/coverage failed:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
