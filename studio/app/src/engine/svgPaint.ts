/**
 * Shared SVG Paint, Multi-Color & Gradient Extraction / Preservation Helpers (zero AI).
 * Works in both browser and Node environments for inline marks, icon packs, Logo Maker,
 * System Maker cards, Brand Maker board tiles, and canvas export.
 */

export interface GradientStopSpec {
  offset: number; // 0..1
  color: string;
}

export interface GradientSpec {
  mode: 'linear' | 'radial';
  angle: number; // degrees, CSS/linear gradient clockwise-like SVG direction
  stops: GradientStopSpec[];
}

export type SvgPaintKind = 'monochrome' | 'solid' | 'multicolor' | 'gradient';

export interface SvgPaintInfo {
  kind: SvgPaintKind;
  primaryColor: string;
  palette: string[]; // chromatic + distinct solid fills found in SVG
  gradient: GradientSpec | null;
}

const NAMED_COLORS: Record<string, string> = {
  black: '#000000',
  white: '#ffffff',
  red: '#ff0000',
  green: '#008000',
  blue: '#0000ff',
  yellow: '#ffff00',
  cyan: '#00ffff',
  aqua: '#00ffff',
  magenta: '#ff00ff',
  fuchsia: '#ff00ff',
  orange: '#ffa500',
  purple: '#800080',
  indigo: '#4b0082',
  violet: '#ee82ee',
  pink: '#ffc0cb',
  gray: '#808080',
  grey: '#808080',
  silver: '#c0c0c0',
  navy: '#000080',
  teal: '#008080',
  lime: '#00ff00',
  gold: '#ffd700',
  coral: '#ff7f50',
  crimson: '#dc143c',
  tomato: '#ff6347',
  rebeccapurple: '#663399',
};

export function normalizeHexColor(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const s = raw.trim().toLowerCase();
  if (!s || s === 'none' || s === 'transparent' || s === 'currentcolor' || s === 'inherit' || s.startsWith('url(')) {
    return null;
  }
  if (NAMED_COLORS[s]) return NAMED_COLORS[s];
  if (s.startsWith('#')) {
    const body = s.slice(1);
    if (body.length === 3 || body.length === 4) {
      return `#${body[0]}${body[0]}${body[1]}${body[1]}${body[2]}${body[2]}`;
    }
    if (body.length === 6 || body.length === 8) {
      return `#${body.slice(0, 6)}`;
    }
    return null;
  }
  const rgbM = /^rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/i.exec(s);
  if (rgbM) {
    const to2 = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
    return `#${to2(Number(rgbM[1]))}${to2(Number(rgbM[2]))}${to2(Number(rgbM[3]))}`;
  }
  return null;
}

export function hexToRgbTuple(hex: string): [number, number, number] {
  const norm = normalizeHexColor(hex) ?? '#000000';
  return [
    parseInt(norm.slice(1, 3), 16),
    parseInt(norm.slice(3, 5), 16),
    parseInt(norm.slice(5, 7), 16),
  ];
}

export function rgbDistance(a: string, b: string): number {
  const [r1, g1, b1] = hexToRgbTuple(a);
  const [r2, g2, b2] = hexToRgbTuple(b);
  return Math.hypot(r1 - r2, g1 - g2, b1 - b2);
}

export function isAchromaticGrayOrBW(hex: string): boolean {
  const [r, g, b] = hexToRgbTuple(hex);
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  return spread <= 16;
}

export function isChromaticHex(hex: string): boolean {
  return !isAchromaticGrayOrBW(hex);
}

function parseCoordAttr(raw: string | undefined, def: number): number {
  if (!raw) return def;
  const trimmed = raw.trim();
  if (trimmed.endsWith('%')) return parseFloat(trimmed) / 100;
  const v = parseFloat(trimmed);
  return Number.isFinite(v) ? v : def;
}

/**
 * Inspects SVG defs, fill, stroke & gradient attributes to extract faithful colors or gradients
 * without erasing multi-color or gradient brand logos into flat monochrome.
 */
export function inspectSvgPaint(svgText: string): SvgPaintInfo {
  const linearRe = /<linearGradient\b([^>]*)>([\s\S]*?)<\/linearGradient>/gi;
  const radialRe = /<radialGradient\b([^>]*)>([\s\S]*?)<\/radialGradient>/gi;
  const gradients: GradientSpec[] = [];

  const parseStops = (inner: string): GradientStopSpec[] => {
    const out: GradientStopSpec[] = [];
    const stopRe = /<stop\b([^>]*)\/?>/gi;
    let sm: RegExpExecArray | null;
    while ((sm = stopRe.exec(inner)) !== null) {
      const attrs = sm[1];
      const offM = /\boffset\s*=\s*["']([^"']+)["']/i.exec(attrs);
      const colAttrM = /\bstop-color\s*=\s*["']([^"']+)["']/i.exec(attrs);
      const styleColM = /stop-color\s*:\s*([^;"']+)/i.exec(attrs);
      const col = normalizeHexColor(colAttrM?.[1] ?? styleColM?.[1]);
      if (!col) continue;
      let offset = offM ? parseCoordAttr(offM[1], 0) : out.length === 0 ? 0 : 1;
      if (offset > 1 && offset <= 100 && offM && !offM[1].includes('%')) {
        // offset="50" in stray SVGs -> normalize if > 1
        offset = offset / 100;
      }
      offset = Math.max(0, Math.min(1, offset));
      out.push({ offset, color: col });
    }
    if (out.length === 1) return [out[0], { offset: 1, color: out[0].color }];
    return out.sort((a, b) => a.offset - b.offset);
  };

  let gm: RegExpExecArray | null;
  while ((gm = linearRe.exec(svgText)) !== null) {
    const attrs = gm[1];
    const stops = parseStops(gm[2]);
    if (stops.length >= 2) {
      const x1 = parseCoordAttr(/\bx1\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1], 0);
      const y1 = parseCoordAttr(/\by1\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1], 0);
      const x2 = parseCoordAttr(/\bx2\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1], 1);
      const y2 = parseCoordAttr(/\by2\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1], 0);
      const rad = Math.atan2(y2 - y1, x2 - x1);
      let deg = Math.round(((rad * 180) / Math.PI) * 10) / 10;
      if (deg < 0) deg += 360;
      gradients.push({ mode: 'linear', angle: deg, stops });
    }
  }
  while ((gm = radialRe.exec(svgText)) !== null) {
    const stops = parseStops(gm[2]);
    if (stops.length >= 2) {
      gradients.push({ mode: 'radial', angle: 135, stops });
    }
  }

  // Extract explicit shape & style colors (ignoring background clip/mask defs)
  const noDefs = svgText.replace(/<(defs|clipPath|mask|pattern)\b[\s\S]*?<\/\1>/gi, ' ');
  const solidPalette: string[] = [];
  const pushUnique = (hex: string | null) => {
    if (!hex) return;
    if (!solidPalette.some((p) => rgbDistance(p, hex) < 10)) {
      solidPalette.push(hex);
    }
  };

  const paintAttrRe = /\b(?:fill|stroke)\s*[:=]\s*["']?([^;"'\s>)]+)/gi;
  let pm: RegExpExecArray | null;
  while ((pm = paintAttrRe.exec(noDefs)) !== null) {
    pushUnique(normalizeHexColor(pm[1]));
  }

  const chromaticSolids = solidPalette.filter(isChromaticHex);
  const darkSolids = solidPalette.filter((c) => {
    const [r, g, b] = hexToRgbTuple(c);
    return isAchromaticGrayOrBW(c) && Math.max(r, g, b) > 28 && Math.min(r, g, b) < 220;
  });

  // Check if SVG actually uses a gradient url(...) on visible geometry
  const usesGradUrl = /url\(#/i.test(noDefs);
  if (gradients.length > 0 && (usesGradUrl || solidPalette.length === 0)) {
    const g = gradients[0];
    const gradPalette: string[] = [];
    for (const s of g.stops) {
      if (!gradPalette.some((p) => rgbDistance(p, s.color) < 10)) gradPalette.push(s.color);
    }
    for (const c of solidPalette) {
      if (!gradPalette.some((p) => rgbDistance(p, c) < 10)) gradPalette.push(c);
    }
    return {
      kind: 'gradient',
      primaryColor: g.stops[0].color,
      palette: gradPalette,
      gradient: g,
    };
  }

  // Distinct visible brand colors (counting chromatic + intentional mid-slate tones when alongside chromatic)
  const palette = chromaticSolids.length > 0
    ? [...chromaticSolids, ...darkSolids, ...solidPalette.filter((c) => !chromaticSolids.includes(c) && !darkSolids.includes(c))]
    : solidPalette;

  if (chromaticSolids.length >= 2 || (chromaticSolids.length === 1 && solidPalette.length >= 2)) {
    return {
      kind: 'multicolor',
      primaryColor: chromaticSolids[0] ?? palette[0] ?? '#fafafa',
      palette,
      gradient: null,
    };
  }

  if (chromaticSolids.length === 1) {
    return {
      kind: 'solid',
      primaryColor: chromaticSolids[0],
      palette: [chromaticSolids[0], ...solidPalette.filter((c) => c !== chromaticSolids[0])],
      gradient: null,
    };
  }

  return {
    kind: 'monochrome',
    primaryColor: solidPalette[0] ?? '#fafafa',
    palette: solidPalette,
    gradient: null,
  };
}

export function scopeSvgGradientIds(svgHtml: string, prefix: string): string {
  const idRe = /\bid\s*=\s*["']([^"']+)["']/gi;
  const ids = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = idRe.exec(svgHtml)) !== null) {
    if (m[1]) ids.add(m[1]);
  }
  if (!ids.size) return svgHtml;
  let out = svgHtml;
  for (const id of ids) {
    const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out
      .replace(new RegExp(`\\bid=(["'])${esc}\\1`, 'g'), `id="${prefix}${id}"`)
      .replace(new RegExp(`url\\(#${esc}\\)`, 'g'), `url(#${prefix}${id})`)
      .replace(new RegExp(`href=(["'])#${esc}\\1`, 'g'), `href="#${prefix}${id}"`);
  }
  return out;
}

/**
 * Recolors purely monochrome SVGs (white, black, gray, currentColor, or implicit fill)
 * while preserving genuine brand colors, multi-color SVGs, and SVG gradients intact.
 */
export function adaptSvgPaintForSurface(
  svgHtml: string,
  monoColor: string,
  scopePrefix?: string,
): string {
  const info = inspectSvgPaint(svgHtml);
  let out = svgHtml;

  if (info.kind === 'monochrome') {
    out = out
      .replace(/fill\s*=\s*["'](?:#(?:[0-9a-fA-F]{3,8})|black|white|currentColor)["']/gi, `fill="${monoColor}"`)
      .replace(/stroke\s*=\s*["'](?:#(?:[0-9a-fA-F]{3,8})|black|white|currentColor)["']/gi, `stroke="${monoColor}"`);
    if (!/\bfill\s*=/i.test(out)) {
      out = out.replace(/<svg\b([^>]*)>/i, `<svg$1 fill="${monoColor}">`);
    }
  } else {
    out = out.replace(/currentColor/gi, monoColor);
  }

  return scopePrefix ? scopeSvgGradientIds(out, scopePrefix) : out;
}
