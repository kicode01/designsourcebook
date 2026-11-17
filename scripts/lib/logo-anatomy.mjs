// Shared deterministic SVG construction anatomy & taxonomy helpers.
// Mirrors `logo-design` Python analyzer (`svglib.py` / `build_catalog.py`) cleanly in Node.js.

import crypto from "node:crypto";

const NAMED_COLORS = {
  black: "#000000", white: "#ffffff", red: "#ff0000", green: "#008000", blue: "#0000ff",
  yellow: "#ffff00", orange: "#ffa500", purple: "#800080", gray: "#808080", grey: "#808080",
  silver: "#c0c0c0", navy: "#000080", teal: "#008080", maroon: "#800000", lime: "#00ff00",
  aqua: "#00ffff", cyan: "#00ffff", fuchsia: "#ff00ff", magenta: "#ff00ff", olive: "#808000",
  pink: "#ffc0cb", brown: "#a52a2a", gold: "#ffd700", indigo: "#4b0082", violet: "#ee82ee",
};

const SHAPE_RE = /<(path|circle|ellipse|rect|polygon|polyline|line)\b([^>]*)>/gi;

export function normalizeColor(val) {
  if (!val) return null;
  const v = String(val).trim().toLowerCase();
  if (!v || v === "none" || v === "transparent" || v === "currentcolor" || v === "inherit" || v.startsWith("url(")) {
    return null;
  }
  if (v.startsWith("#")) {
    const h = v.slice(1);
    if (/^[0-9a-f]{6}$/.test(h)) return `#${h}`;
    if (/^[0-9a-f]{3}$/.test(h)) return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
    if (/^[0-9a-f]{8}$/.test(h)) return `#${h.slice(0, 6)}`;
    return null;
  }
  if (NAMED_COLORS[v]) return NAMED_COLORS[v];
  const rgb = /^rgba?\(\s*([\d.]+%?)\s*[,\s]\s*([\d.]+%?)\s*[,\s]\s*([\d.]+%?)/.exec(v);
  if (rgb) {
    const comp = [rgb[1], rgb[2], rgb[3]].map((c) => {
      const n = c.endsWith("%") ? Math.round(parseFloat(c) * 2.55) : Math.round(parseFloat(c));
      return Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0");
    });
    return `#${comp.join("")}`;
  }
  return null;
}

export function hueFamily(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  if (s < 0.15 || l < 0.08 || l > 0.95) {
    if (l < 0.2) return "black";
    if (l > 0.9) return "white";
    return "gray";
  }
  const deg = h * 360;
  if (deg < 15 || deg >= 335) return "red";
  if (deg < 40) return "orange";
  if (deg < 65) return "yellow";
  if (deg < 165) return "green";
  if (deg < 195) return "cyan";
  if (deg < 255) return "blue";
  if (deg < 290) return "purple";
  return "pink";
}

export function aspectClass(aspect) {
  if (!aspect || !Number.isFinite(aspect)) return "unknown";
  if (aspect < 0.8) return "tall";
  if (aspect <= 1.25) return "square";
  if (aspect <= 2.5) return "wide";
  if (aspect <= 4.5) return "horizontal";
  return "extra-wide";
}

function countPathAnchors(d) {
  if (!d) return 0;
  const cmdMatches = d.match(/[MmLlHhVvCcSsQqTtAa]/g);
  return cmdMatches ? cmdMatches.length + 1 : 0;
}

/** Sanitize inline SVG markup: strips unsafe tags/handlers, ensures xmlns & viewBox, replaces currentColor for light card visibility. */
export function sanitizeLogoSvg(raw) {
  if (!raw || typeof raw !== "string") return null;
  if (/<(?:script|foreignObject|iframe|object|embed|image|audio|video)\b/i.test(raw)) return null;
  if (/data:image\/|\bon[a-z]+\s*=|javascript:/i.test(raw)) return null;
  // Drop XML decl / doctype / comments
  let cleaned = raw
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();
  const svgMatch = /<svg\b([^>]*)>([\s\S]*?)<\/svg>/i.exec(cleaned);
  if (!svgMatch) return null;

  let attrs = svgMatch[1];
  let inner = svgMatch[2];
  // Remove CSS class <style> blocks that could bleed across cards unless inline
  if (/<style\b/i.test(inner)) return null;
  // Reject <text>-only SVGs (not outlined vector geometry)
  if (/<text\b/i.test(inner) && !SHAPE_RE.test(inner)) return null;
  SHAPE_RE.lastIndex = 0;

  let vbMatch = /\bviewBox\s*=\s*["']\s*(-?[\d.]+)\s+(-?[\d.]+)\s+([\d.]+)\s+([\d.]+)\s*["']/i.exec(attrs);
  if (!vbMatch) {
    const wM = /\bwidth\s*=\s*["']?([\d.]+)/i.exec(attrs);
    const hM = /\bheight\s*=\s*["']?([\d.]+)/i.exec(attrs);
    if (!wM || !hM) return null;
    const w = parseFloat(wM[1]);
    const h = parseFloat(hM[1]);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return null;
    attrs = `${attrs} viewBox="0 0 ${w} ${h}"`;
    vbMatch = [null, "0", "0", String(w), String(h)];
  }
  if (!/\bxmlns=/.test(attrs)) attrs = ` xmlns="http://www.w3.org/2000/svg"${attrs}`;
  // Replace currentColor with #111111 so logo stays visible on light (#fff) catalog card tiles
  cleaned = `<svg${attrs}>${inner}</svg>`.replace(/\bcurrentColor\b/gi, "#111111");
  return cleaned;
}

/** Generate normalized viewBox-scaled structural hash to block exact or near-identical clones across sources. */
export function computeGeomHash(svgText) {
  const vbM = /viewBox=["']\s*(-?[\d.]+)\s+(-?[\d.]+)\s+([\d.]+)\s+([\d.]+)["']/i.exec(svgText);
  const w = vbM ? parseFloat(vbM[3]) || 24 : 24;
  const h = vbM ? parseFloat(vbM[4]) || 24 : 24;
  const scale = 100 / Math.max(w, h, 1);
  const ox = vbM ? parseFloat(vbM[1]) || 0 : 0;
  const oy = vbM ? parseFloat(vbM[2]) || 0 : 0;
  const body = svgText
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<svg\b[^>]*>|<\/svg>/gi, "")
    .replace(/<title>[\s\S]*?<\/title>/gi, "")
    .replace(/\b(?:fill|stroke|stop-color|id|class|data-[a-z0-9-]+|xmlns[:a-z0-9-]*)=["'][^"']*["']/gi, "")
    .replace(/-?\d+(?:\.\d+)?/g, (n) => String(Math.round(parseFloat(n) * scale)))
    .replace(/\s+/g, "");
  return crypto.createHash("sha1").update(`${Math.round((w / Math.max(h, 0.01)) * 10)}:${Math.round(ox)}:${Math.round(oy)}:${body}`).digest("hex").slice(0, 16);
}

/** Measure quantitative geometry and colors from cleaned SVG string. */
export function measureLogoSvg(svgText) {
  const vbM = /\bviewBox\s*=\s*["']\s*(-?[\d.]+)\s+(-?[\d.]+)\s+([\d.]+)\s+([\d.]+)\s*["']/i.exec(svgText);
  const width = vbM ? Number(parseFloat(vbM[3]).toFixed(2)) : 24;
  const height = vbM ? Number(parseFloat(vbM[4]).toFixed(2)) : 24;
  const aspect = width > 0 && height > 0 ? Number((width / height).toFixed(3)) : 1;

  // Strip defs blocks when counting visible painted shapes & colors
  const visibleXml = svgText.replace(/<(?:clipPath|mask|pattern|symbol|marker)\b[\s\S]*?<\/(?:clipPath|mask|pattern|symbol|marker)>/gi, "");

  let shapes = 0;
  let anchors = 0;
  let circles = 0;
  let rects = 0;
  let hasStrokeOnly = false;
  const colors = [];
  const seenCols = new Set();
  const pushCol = (raw) => {
    const c = normalizeColor(raw);
    if (c && !seenCols.has(c)) {
      seenCols.add(c);
      colors.push(c);
    }
  };

  for (const m of visibleXml.matchAll(/(?:fill|stroke|stop-color)\s*[:=]\s*["']?([^"';>\s]+)/gi)) {
    pushCol(m[1]);
  }

  SHAPE_RE.lastIndex = 0;
  let sm;
  while ((sm = SHAPE_RE.exec(visibleXml))) {
    const tag = sm[1].toLowerCase();
    const a = sm[2];
    shapes++;
    if (tag === "path") {
      const dm = /\bd=["']([^"']+)["']/i.exec(a);
      anchors += dm ? countPathAnchors(dm[1]) : 2;
    } else if (tag === "circle" || tag === "ellipse") {
      circles++;
      anchors += 4;
    } else if (tag === "rect") {
      rects++;
      anchors += 4;
    } else if (tag === "polygon" || tag === "polyline") {
      const pm = /\bpoints=["']([^"']+)["']/i.exec(a);
      const nums = pm ? (pm[1].match(/-?[\d.]+/g) || []).length : 6;
      anchors += Math.max(3, Math.floor(nums / 2));
    } else {
      anchors += 2;
    }
    if (/\bfill=["']none["']/i.test(a) && /\bstroke=/i.test(a)) hasStrokeOnly = true;
  }

  if (colors.length === 0 && shapes > 0) colors.push("#000000");

  const fams = [...new Set(colors.map(hueFamily))].sort();
  const chroma = fams.filter((f) => f !== "black" && f !== "white" && f !== "gray");
  const primary_family = chroma.length === 1 ? chroma[0] : (chroma.length > 1 ? "multi" : "mono");
  const gradients = (svgText.match(/<(?:linearGradient|radialGradient)\b/gi) || []).length;
  const has_mask = /<mask\b/i.test(svgText);
  const has_filter = /<filter\b/i.test(svgText);
  const hasOpacity = /\b(?:fill-opacity|opacity)=["']0\.[1-8]/i.test(svgText);

  return {
    width,
    height,
    aspect,
    aspect_class: aspectClass(aspect),
    bytes: Buffer.byteLength(svgText, "utf8"),
    shapes,
    anchors,
    circles,
    rects,
    hasStrokeOnly,
    hasOpacity,
    colors,
    n_colors: colors.length,
    color_families: fams,
    primary_family,
    gradients,
    has_mask,
    has_filter,
  };
}

const INDUSTRY_MAP = [
  [/\b(ai|ml|llm|artificial\s*intelligence|machine\s*learning|neural|agent|diffusion|voice|vision)\b/i, "ai-ml"],
  [/\b(cloud|kubernetes|k8s|docker|infra|devops|serverless|container|networking|network|app\s*services)\b/i, "cloud-infrastructure"],
  [/\b(database|sql|nosql|storage|vector\s*db|data|warehouse|etl)\b/i, "database-data"],
  [/\b(design|adobe|figma|creative|ui\/ux|icon|font|typography|3d|illustration|photo|theme)\b/i, "design-creative"],
  [/\b(devtool|developer|ide|editor|compiler|monorepo|cli|git|terminal|code|sdk|api|canonical)\b/i, "developer-tools"],
  [/\b(ecommerce|shop|shopping|retail|store|marketplace|fashion|commerce|merch|food)\b/i, "ecommerce-retail"],
  [/\b(education|learning|university|school|course|docs|academic)\b/i, "education"],
  [/\b(finance|bank|trading|invest|accounting|insurance)\b/i, "finance-banking"],
  [/\b(framework|library|nuxt|vue|react|next|svelte|angular|tailwind|ui\s*library|cms)\b/i, "framework-library"],
  [/\b(game|gaming|esports|console|arcade|sports)\b/i, "gaming"],
  [/\b(hardware|chip|semiconductor|iot|embedded|device|phone|robotics|energy)\b/i, "hardware-devices"],
  [/\b(health|medical|bio|fitness|pharma|wellness)\b/i, "health"],
  [/\b(hosting|cdn|vercel|netlify|deploy|domain|dns|server|self-?hosted|web)\b/i, "hosting-cdn"],
  [/\b(analytics|marketing|seo|advertising|metrics|growth|crm)\b/i, "marketing-analytics"],
  [/\b(media|music|audio|video|streaming|entertainment|news|broadcast|photography)\b/i, "media-entertainment"],
  [/\b(open\s*source|community|foundation|linux|foss)\b/i, "open-source-community"],
  [/\b(os|operating\s*system|browser|desktop|mobile|android|linux|windows|macos|microsoft|google)\b/i, "os-platform"],
  [/\b(payment|fintech|crypto|blockchain|wallet|billing|checkout|stripe)\b/i, "payments-fintech"],
  [/\b(productivity|workspace|notes|calendar|task|collaboration|project|automation|sync|saas|business|management|dashboard|hr|software|platform)\b/i, "productivity-collaboration"],
  [/\b(language|runtime|rust|python|typescript|javascript|go|java|swift)\b/i, "programming-language"],
  [/\b(security|privacy|auth|authentication|cybersecurity|vpn|password|encryption|identity|secrets)\b/i, "security-identity"],
  [/\b(social|chat|communications?|messaging|email|forum|network)\b/i, "social-communication"],
  [/\b(testing|monitoring|observability|logging|qa|ci\/cd)\b/i, "testing-monitoring"],
  [/\b(automotive|aviation|travel|transport|transportation|mobility|delivery|logistics|maps|booking|hospitality)\b/i, "travel-transport"],
];

export function mapIndustry(categories = [], fallbackText = "") {
  const hay = [...categories, fallbackText].join(" ");
  for (const [re, target] of INDUSTRY_MAP) {
    if (re.test(hay)) return target;
  }
  return "other";
}

export function classifyLogoMetadata({ id, variant, metrics, categories = [], title = "" }) {
  const industry = mapIndustry(categories, `${title} ${id}`);
  const { aspect, shapes, anchors, circles, rects, hasStrokeOnly, hasOpacity, gradients, n_colors } = metrics;

  let mark_type = "abstract";
  let symbol_type = "geometric";
  if (variant === "main" && aspect > 2.0) {
    mark_type = shapes >= 5 ? "combination" : "wordmark";
    symbol_type = mark_type === "combination" ? "geometric" : null;
  } else if (variant === "main" && aspect > 1.35) {
    mark_type = "combination";
    symbol_type = "geometric";
  } else if (shapes === 1 && anchors <= 16) {
    mark_type = id.length <= 3 ? "letterform" : "abstract";
  } else if (circles >= 1 && shapes >= 3 && anchors <= 40) {
    mark_type = "pictorial";
    symbol_type = "pictorial";
  }

  const geometry = [];
  if (circles > 0) geometry.push("circular");
  if (rects > 0) geometry.push("rectangular");
  if (anchors <= 20 && shapes <= 4) geometry.push("minimal-geometric");
  if (!geometry.length) geometry.push(shapes > 6 ? "compound-vector" : "bezier-path");

  const techniques = [];
  if (gradients > 0) techniques.push("gradient");
  if (hasStrokeOnly) techniques.push("line-monoline");
  if (n_colors >= 3 && shapes >= 3) techniques.push("color-segments");
  if (hasOpacity) techniques.push("overlap-transparency");
  if (anchors <= 32 && shapes <= 6) techniques.push("geometric-construction");
  if (shapes >= 4 && circles >= 2) techniques.push("modular-repetition");
  if (!techniques.length) techniques.push("flat-solid");

  const mood = [];
  if (anchors <= 24) mood.push("minimal");
  if (gradients > 0 || n_colors >= 3) mood.push("vibrant");
  if (!mood.length) mood.push("technical");

  const ratioStr = aspect ? `${aspect}:1` : "1:1";
  const colorLabel = gradients > 0 ? `${n_colors}-stop gradient` : n_colors === 1 ? "monochrome" : `${n_colors}-color palette`;
  const note = `Vector mark with ${shapes} ${shapes === 1 ? "shape" : "shapes"} (${anchors} anchors), ${colorLabel}, ${ratioStr} aspect.`;

  return {
    mark_type,
    symbol_type,
    subject: [title, ...categories].filter(Boolean).join(", "),
    geometry: geometry.slice(0, 3),
    techniques: techniques.slice(0, 3),
    type_style: mark_type === "wordmark" || mark_type === "combination" ? "sans" : null,
    letter_case: null,
    mood,
    industry,
    exemplary: false,
    note,
  };
}
