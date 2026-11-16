// Color parsing + WCAG contrast. Deliberately small: hex, rgb(), rgba(), hsl().
// Anything else (oklch, named beyond a few) returns null so callers can skip
// the check rather than report a false failure.

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
  const angleRe = /^(-?(?:\d+(?:\.\d+)?|\.\d+))(deg|rad|grad|turn)?$/;

  const fn = /^(rgba?|hsla?)\(([^)]+)\)$/.exec(s);
  if (fn) {
    const parts = fn[2].split(/[,\s\/]+/).filter(Boolean);
    if (parts.length < 3 || parts.length > 4) return null;
    const parseAlpha = (p) => {
      if (p === undefined) return 1;
      if (!numPct.test(p)) return NaN;
      const v = p.endsWith("%") ? parseFloat(p) / 100 : parseFloat(p);
      return Math.max(0, Math.min(1, v));
    };
    if (fn[1].startsWith("rgb")) {
      if (!parts.slice(0, 3).every((p) => numPct.test(p))) return null;
      const [r, g, b] = parts.slice(0, 3).map((p) => (p.endsWith("%") ? (parseFloat(p) / 100) * 255 : parseFloat(p)));
      const a = parseAlpha(parts[3]);
      if ([r, g, b, a].some((n) => Number.isNaN(n))) return null;
      return [clamp255(r), clamp255(g), clamp255(b), a];
    }
    const hm = angleRe.exec(parts[0]);
    if (!hm || !numPct.test(parts[1]) || !numPct.test(parts[2])) return null;
    let h = parseFloat(hm[1]);
    if (hm[2] === "rad") h = (h * 180) / Math.PI;
    else if (hm[2] === "grad") h = h * 0.9;
    else if (hm[2] === "turn") h = h * 360;
    const sat = parseFloat(parts[1]) / 100;
    const l = parseFloat(parts[2]) / 100;
    const a = parseAlpha(parts[3]);
    if ([h, sat, l, a].some((n) => Number.isNaN(n))) return null;
    return [...hslToRgb(h, sat, l), a];
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
