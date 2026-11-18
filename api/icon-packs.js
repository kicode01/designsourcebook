import { getSql, hasDatabase } from "../lib/db.mjs";

export async function GET(request) {
  if (!hasDatabase()) {
    return Response.json({ ok: false, error: "DATABASE_URL not configured" }, { status: 503 });
  }
  try {
    const url = new URL(request.url);
    const packId = (url.searchParams.get("pack") || "").trim();
    const sql = getSql();

    if (packId) {
      const [pk] = await sql`
        SELECT id, package_name, version, grid, glyphs
        FROM icon_packs
        WHERE id = ${packId}
        LIMIT 1
      `;
      if (!pk) {
        return Response.json({ ok: false, error: `Icon pack not found: ${packId}` }, { status: 404 });
      }
      return Response.json(
        {
          ok: true,
          pack: {
            id: pk.id,
            package: pk.package_name,
            version: pk.version,
            grid: Number(pk.grid),
            glyphs: pk.glyphs || [],
          },
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
          },
        },
      );
    }

    if (url.searchParams.get("meta") === "1") {
      const rows = await sql`
        SELECT id, package_name, version, grid, jsonb_array_length(COALESCE(glyphs, '[]'::jsonb)) AS glyph_count
        FROM icon_packs
        ORDER BY id ASC
      `;
      return Response.json(
        {
          ok: true,
          count: rows.length,
          packs: rows.map((r) => ({
            id: r.id,
            package: r.package_name,
            version: r.version,
            grid: Number(r.grid),
            glyphCount: Number(r.glyph_count || 0),
          })),
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
          },
        },
      );
    }

    const packRows = await sql`
      SELECT id, package_name, version, grid, glyphs
      FROM icon_packs
      ORDER BY id ASC
    `;
    const iconPacks = {};
    for (const pk of packRows) {
      iconPacks[pk.id] = {
        package: pk.package_name,
        version: pk.version,
        grid: Number(pk.grid),
        glyphs: pk.glyphs || [],
      };
    }

    return Response.json(
      {
        ok: true,
        count: packRows.length,
        iconPacks,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
        },
      },
    );
  } catch (err) {
    console.error("GET /api/icon-packs failed:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
