// Color parsing + WCAG contrast: hex, rgb(), rgba(), hsl(), hsla(), oklch(), oklab(), lch(), lab(), color(display-p3|srgb ...).

const NAMED = {
  white: [255, 255, 255, 1],
  black: [0, 0, 0, 1],
  transparent: [0, 0, 0, 0],
  red: [255, 0, 0, 1],
  green: [0, 128, 0, 1],
  blue: [0, 0, 255, 1],
  gray: [128, 128, 128, 1],
  grey: [128, 128, 128, 1],
};

function parseAngleDeg(raw) {
  const m = /^(-?(?:\d+(?:\.\d+)?|\.\d+))(deg|rad|grad|turn)?$/i.exec(raw);
  if (!m) return NaN;
  let deg = parseFloat(m[1]);
  const unit = (m[2] || "deg").toLowerCase();
  if (unit === "rad") deg = (deg * 180) / Math.PI;
  else if (unit === "grad") deg = deg * 0.9;
  else if (unit === "turn") deg = deg * 360;
  return deg;
}

function parseAlphaComp(p) {
  if (p === undefined) return 1;
  if (!/^-?(?:\d+(?:\.\d+)?|\.\d+)%?$/.test(p)) return NaN;
  const v = p.endsWith("%") ? parseFloat(p) / 100 : parseFloat(p);
  return Math.max(0, Math.min(1, v));
}

function linToSrgb255(c) {
  const clamped = Math.max(0, Math.min(1, c));
  const gamma = clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  return clamp255(gamma * 255);
}

function srgbToLin(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function oklabToSrgb(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  const rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
  return [linToSrgb255(rLin), linToSrgb255(gLin), linToSrgb255(bLin)];
}

function labToSrgb(L, a, b) {
  const fy = (L + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;
  const e = 216 / 24389;
  const k = 24389 / 27;
  const xr = fx * fx * fx > e ? fx * fx * fx : (116 * fx - 16) / k;
  const yr = L > k * e ? Math.pow((L + 16) / 116, 3) : L / k;
  const zr = fz * fz * fz > e ? fz * fz * fz : (116 * fz - 16) / k;
  // D50 reference white -> D65 Bradford adapted XYZ -> sRGB linear
  const X = xr * 0.3457 / 0.3585; // normalized with Y=1 D50 whitepoint X=0.96422, Z=0.82521
  const X50 = xr * 0.96422;
  const Y50 = yr * 1.0;
  const Z50 = zr * 0.82521;
  const X65 = 0.9554734527 * X50 - 0.0230985368 * Y50 + 0.0632593086 * Z50;
  const Y65 = -0.0283697069 * X50 + 1.0099954580 * Y50 + 0.0210413989 * Z50;
  const Z65 = 0.0123140016 * X50 - 0.0205076964 * Y50 + 1.3303659366 * Z50;
  void X;
  const rLin = 3.2404542 * X65 - 1.5371385 * Y65 - 0.4985314 * Z65;
  const gLin = -0.9692660 * X65 + 1.8760108 * Y65 + 0.0415560 * Z65;
  const bLin = 0.0556434 * X65 - 0.2040259 * Y65 + 1.0572252 * Z65;
  return [linToSrgb255(rLin), linToSrgb255(gLin), linToSrgb255(bLin)];
}

export function parseColor(input) {
  if (typeof input !== "string") return null;
  const s = input.trim().toLowerCase();

  if (s.startsWith("#")) {
    const h = s.slice(1);
    if (!/^[0-9a-f]+$/.test(h)) return null;
    if (h.length === 3) return [hx(h[0] + h[0]), hx(h[1] + h[1]), hx(h[2] + h[2]), 1];
    if (h.length === 4) return [hx(h[0] + h[0]), hx(h[1] + h[1]), hx(h[2] + h[2]), hx(h[3] + h[3]) / 255];
    if (h.length === 6) return [hx(h.slice(0, 2)), hx(h.slice(2, 4)), hx(h.slice(4, 6)), 1];
    if (h.length === 8) return [hx(h.slice(0, 2)), hx(h.slice(2, 4)), hx(h.slice(4, 6)), hx(h.slice(6, 8)) / 255];
    return null;
  }

  const numPct = /^-?(?:\d+(?:\.\d+)?|\.\d+)%?$/;

  const fn = /^(rgba?|hsla?|oklch|oklab|lch|lab)\(([^)]+)\)$/.exec(s);
  if (fn) {
    const kind = fn[1];
    const parts = fn[2].split(/[,\s\/]+/).filter(Boolean);
    if (parts.length < 3 || parts.length > 4) return null;
    const a = parseAlphaComp(parts[3]);
    if (Number.isNaN(a)) return null;

    if (kind.startsWith("rgb")) {
      if (!parts.slice(0, 3).every((p) => numPct.test(p))) return null;
      const [r, g, b] = parts.slice(0, 3).map((p) => (p.endsWith("%") ? (parseFloat(p) / 100) * 255 : parseFloat(p)));
      return [r, g, b].some((n) => Number.isNaN(n)) ? null : [clamp255(r), clamp255(g), clamp255(b), a];
    }

    if (kind.startsWith("hsl")) {
      const h = parseAngleDeg(parts[0]);
      if (Number.isNaN(h) || !numPct.test(parts[1]) || !numPct.test(parts[2])) return null;
      const sat = parseFloat(parts[1]) / 100;
      const l = parseFloat(parts[2]) / 100;
      return [h, sat, l].some((n) => Number.isNaN(n)) ? null : [...hslToRgb(h, sat, l), a];
    }

    if (kind === "oklch") {
      if (!numPct.test(parts[0]) || !numPct.test(parts[1])) return null;
      const L = parts[0].endsWith("%") ? parseFloat(parts[0]) / 100 : parseFloat(parts[0]);
      const C = parts[1].endsWith("%") ? (parseFloat(parts[1]) / 100) * 0.4 : parseFloat(parts[1]);
      const h = parseAngleDeg(parts[2]);
      if ([L, C, h].some((n) => Number.isNaN(n))) return null;
      const rad = (h * Math.PI) / 180;
      return [...oklabToSrgb(L, C * Math.cos(rad), C * Math.sin(rad)), a];
    }

    if (kind === "oklab") {
      if (!parts.slice(0, 3).every((p) => numPct.test(p))) return null;
      const L = parts[0].endsWith("%") ? parseFloat(parts[0]) / 100 : parseFloat(parts[0]);
      const oa = parts[1].endsWith("%") ? (parseFloat(parts[1]) / 100) * 0.4 : parseFloat(parts[1]);
      const ob = parts[2].endsWith("%") ? (parseFloat(parts[2]) / 100) * 0.4 : parseFloat(parts[2]);
      return [L, oa, ob].some((n) => Number.isNaN(n)) ? null : [...oklabToSrgb(L, oa, ob), a];
    }

    if (kind === "lch") {
      if (!numPct.test(parts[0]) || !numPct.test(parts[1])) return null;
      const L = parts[0].endsWith("%") ? parseFloat(parts[0]) : parseFloat(parts[0]);
      const C = parts[1].endsWith("%") ? (parseFloat(parts[1]) / 100) * 150 : parseFloat(parts[1]);
      const h = parseAngleDeg(parts[2]);
      if ([L, C, h].some((n) => Number.isNaN(n))) return null;
      const rad = (h * Math.PI) / 180;
      return [...labToSrgb(L, C * Math.cos(rad), C * Math.sin(rad)), a];
    }

    if (kind === "lab") {
      if (!parts.slice(0, 3).every((p) => numPct.test(p))) return null;
      const L = parseFloat(parts[0]);
      const la = parts[1].endsWith("%") ? (parseFloat(parts[1]) / 100) * 125 : parseFloat(parts[1]);
      const lb = parts[2].endsWith("%") ? (parseFloat(parts[2]) / 100) * 125 : parseFloat(parts[2]);
      return [L, la, lb].some((n) => Number.isNaN(n)) ? null : [...labToSrgb(L, la, lb), a];
    }
  }

  const cs = /^color\(\s*(srgb|display-p3)\s+([^)]+)\)$/.exec(s);
  if (cs) {
    const space = cs[1];
    const parts = cs[2].split(/[\s\/]+/).filter(Boolean);
    if (parts.length < 3 || parts.length > 4) return null;
    if (!parts.slice(0, 3).every((p) => numPct.test(p))) return null;
    const a = parseAlphaComp(parts[3]);
    if (Number.isNaN(a)) return null;
    const vals = parts.slice(0, 3).map((p) => (p.endsWith("%") ? parseFloat(p) / 100 : parseFloat(p)));
    if (space === "srgb") {
      return [clamp255(vals[0] * 255), clamp255(vals[1] * 255), clamp255(vals[2] * 255), a];
    }
    const [pr, pg, pb] = vals.map(srgbToLin);
    // Display P3 linear -> XYZ D65 -> sRGB linear
    const X = 0.4865709486 * pr + 0.2656676932 * pg + 0.1982172852 * pb;
    const Y = 0.2289745641 * pr + 0.6917385218 * pg + 0.0792869141 * pb;
    const Z = 0.0000000000 * pr + 0.0451133819 * pg + 1.0439443689 * pb;
    const rLin = 3.2404542 * X - 1.5371385 * Y - 0.4985314 * Z;
    const gLin = -0.9692660 * X + 1.8760108 * Y + 0.0415560 * Z;
    const bLin = 0.0556434 * X - 0.2040259 * Y + 1.0572252 * Z;
    return [linToSrgb255(rLin), linToSrgb255(gLin), linToSrgb255(bLin), a];
  }

  if (NAMED[s]) return [...NAMED[s]];
  return null;
}

const hx = (s) => parseInt(s, 16);
const clamp255 = (n) => Math.max(0, Math.min(255, Math.round(n)));

function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = ((h % 360) + 360) % 360 / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let rgb = [0, 0, 0];
  if (hp < 1) rgb = [c, x, 0];
  else if (hp < 2) rgb = [x, c, 0];
  else if (hp < 3) rgb = [0, c, x];
  else if (hp < 4) rgb = [0, x, c];
  else if (hp < 5) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  const m = l - c / 2;
  return rgb.map((v) => clamp255((v + m) * 255));
}

// Composite a translucent color over a backdrop before measuring.
export function flatten(rgba, backdrop = [255, 255, 255, 1]) {
  const a = rgba[3];
  if (a >= 1) return rgba;
  return [
    rgba[0] * a + backdrop[0] * (1 - a),
    rgba[1] * a + backdrop[1] * (1 - a),
    rgba[2] * a + backdrop[2] * (1 - a),
    1,
  ];
}

export function relativeLuminance(rgb) {
  const [r, g, b] = rgb.slice(0, 3).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a, b) {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

export function toHex(rgb) {
  return "#" + rgb.slice(0, 3).map((v) => clamp255(v).toString(16).padStart(2, "0")).join("");
}

export function saturation(rgb) {
  const [r, g, b] = rgb.slice(0, 3).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return 0;
  return l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
}
