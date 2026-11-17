import { getSql, hasDatabase } from "../lib/db.mjs";
import { syncLivePopularityStats } from "../lib/popularity.mjs";

export async function GET(request) {
  if (!hasDatabase()) {
    return Response.json({ ok: false, error: "DATABASE_URL not configured" }, { status: 503 });
  }
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const sql = getSql();
    const result = await syncLivePopularityStats(sql, { maxGithub: 50 });
    return Response.json({ ok: true, ...result });
  } catch (err) {
    console.error("GET /api/sync-popularity failed:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
