import { getSql, hasDatabase } from "../lib/db.mjs";

const LOGO_COLUMNS = `
  id, brand, variant, pair, width, height, aspect, aspect_class AS "aspectClass",
  bytes, shapes, anchors, colors, n_colors AS "nColors",
  color_families AS "colorFamilies", primary_family AS "primaryFamily",
  gradients, has_mask AS "hasMask", has_filter AS "hasFilter",
  mark_type AS "markType", symbol_type AS "symbolType", subject,
  geometry, techniques, type_style AS "typeStyle", letter_case AS "letterCase",
  mood, industry, exemplary, note, svg
`;

function bump(map, key) {
  if (!key) return;
  map[key] = (map[key] || 0) + 1;
}

function sortedEntries(map) {
  return Object.entries(map)
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count);
}

export async function GET(request) {
  if (!hasDatabase()) {
    return Response.json({ ok: false, error: "DATABASE_URL not configured" }, { status: 503 });
  }
  try {
    const sql = getSql();
    const url = new URL(request.url);
    const idParam = (url.searchParams.get("id") || "").trim();

    if (idParam) {
      const [logo] = await sql`
        SELECT
          id, brand, variant, pair, width, height, aspect, aspect_class AS "aspectClass",
          bytes, shapes, anchors, colors, n_colors AS "nColors",
          color_families AS "colorFamilies", primary_family AS "primaryFamily",
          gradients, has_mask AS "hasMask", has_filter AS "hasFilter",
          mark_type AS "markType", symbol_type AS "symbolType", subject,
          geometry, techniques, type_style AS "typeStyle", letter_case AS "letterCase",
          mood, industry, exemplary, note, svg
        FROM logos
        WHERE id = ${idParam}
        LIMIT 1
      `;
      if (!logo) {
        return Response.json({ ok: false, error: `Logo not found: ${idParam}` }, { status: 404 });
      }
      return Response.json(
        { ok: true, logo },
        { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900" } },
      );
    }

    if (url.searchParams.get("stats") === "1") {
      const rows = await sql`
        SELECT
          anchors, n_colors AS "nColors", gradients,
          mark_type AS "markType", primary_family AS "primaryFamily",
          geometry, techniques, industry, exemplary
        FROM logos
      `;
      const markTypes = {};
      const industries = {};
      const techniques = {};
      const geometries = {};
      const colorFamilies = {};
      const anchorList = [];
      let exemplaryCount = 0;
      let gradCount = 0;
      let maxTwoColors = 0;

      for (const r of rows) {
        anchorList.push(Number(r.anchors || 0));
        if (r.exemplary) exemplaryCount++;
        if (Number(r.gradients || 0) > 0) gradCount++;
        if (Number(r.nColors || 1) <= 2) maxTwoColors++;
        bump(markTypes, r.markType);
        bump(industries, r.industry);
        bump(colorFamilies, r.primaryFamily);
        for (const t of r.techniques || []) bump(techniques, t);
        for (const g of r.geometry || []) bump(geometries, g);
      }
      anchorList.sort((a, b) => a - b);
      const mid = Math.floor(anchorList.length / 2);
      const medianAnchors = anchorList.length ? anchorList[mid] : 0;

      return Response.json(
        {
          ok: true,
          total: rows.length,
          exemplaryCount,
          medianAnchors,
          gradientPct: rows.length ? Math.round((gradCount / rows.length) * 100) : 0,
          twoOrFewerColorsPct: rows.length ? Math.round((maxTwoColors / rows.length) * 100) : 0,
          markTypes: sortedEntries(markTypes),
          industries: sortedEntries(industries),
          techniques: sortedEntries(techniques),
          geometries: sortedEntries(geometries),
          colorFamilies: sortedEntries(colorFamilies),
        },
        { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900" } },
      );
    }

    const q = (url.searchParams.get("q") || "").trim();
    const industry = (url.searchParams.get("industry") || "").trim() || null;
    const markType = (url.searchParams.get("mark_type") || "").trim() || null;
    const primaryFamily = (url.searchParams.get("primary_family") || "").trim() || null;
    const variant = (url.searchParams.get("variant") || "").trim() || null;
    const technique = (url.searchParams.get("technique") || "").trim() || null;
    const geometry = (url.searchParams.get("geometry") || "").trim() || null;
    const onlyExemplary = url.searchParams.get("exemplary") === "1";
    const page = Math.max(1, Number(url.searchParams.get("page") || 1) || 1);
    const limit = Math.min(60, Math.max(6, Number(url.searchParams.get("limit") || 36) || 36));
    const offset = (page - 1) * limit;

    const searchPat = q ? `%${q}%` : null;
    const techJson = technique ? JSON.stringify([technique]) : null;
    const geoJson = geometry ? JSON.stringify([geometry]) : null;

    const [countRow] = await sql`
      SELECT COUNT(*)::int AS total
      FROM logos
      WHERE (${searchPat}::text IS NULL OR brand ILIKE ${searchPat} OR id ILIKE ${searchPat} OR subject ILIKE ${searchPat} OR note ILIKE ${searchPat})
        AND (${industry}::text IS NULL OR industry = ${industry})
        AND (${markType}::text IS NULL OR mark_type = ${markType})
        AND (${primaryFamily}::text IS NULL OR primary_family = ${primaryFamily})
        AND (${variant}::text IS NULL OR variant = ${variant})
        AND (${onlyExemplary}::boolean = FALSE OR exemplary = TRUE)
        AND (${techJson}::text IS NULL OR techniques @> ${techJson}::jsonb)
        AND (${geoJson}::text IS NULL OR geometry @> ${geoJson}::jsonb)
    `;

    const items = await sql`
      SELECT
        id, brand, variant, pair, width, height, aspect, aspect_class AS "aspectClass",
        bytes, shapes, anchors, colors, n_colors AS "nColors",
        color_families AS "colorFamilies", primary_family AS "primaryFamily",
        gradients, has_mask AS "hasMask", has_filter AS "hasFilter",
        mark_type AS "markType", symbol_type AS "symbolType", subject,
        geometry, techniques, type_style AS "typeStyle", letter_case AS "letterCase",
        mood, industry, exemplary, note, svg
      FROM logos
      WHERE (${searchPat}::text IS NULL OR brand ILIKE ${searchPat} OR id ILIKE ${searchPat} OR subject ILIKE ${searchPat} OR note ILIKE ${searchPat})
        AND (${industry}::text IS NULL OR industry = ${industry})
        AND (${markType}::text IS NULL OR mark_type = ${markType})
        AND (${primaryFamily}::text IS NULL OR primary_family = ${primaryFamily})
        AND (${variant}::text IS NULL OR variant = ${variant})
        AND (${onlyExemplary}::boolean = FALSE OR exemplary = TRUE)
        AND (${techJson}::text IS NULL OR techniques @> ${techJson}::jsonb)
        AND (${geoJson}::text IS NULL OR geometry @> ${geoJson}::jsonb)
      ORDER BY exemplary DESC, anchors ASC, brand ASC
      LIMIT ${limit} OFFSET ${offset}
    `;

    return Response.json(
      {
        ok: true,
        total: Number(countRow?.total || 0),
        page,
        limit,
        items,
      },
      { headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" } },
    );
  } catch (err) {
    console.error("GET /api/logos failed:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
