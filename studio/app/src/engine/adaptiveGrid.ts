/**
 * Deterministic Adaptive Construction Grid & Best-Fit Ranking Engine (zero AI).
 * Extracts orthographic stems, slant rays, dominant angles, compass circles,
 * aspect proportions, and symmetry from any SVG logo or UI icon, synthesizes a
 * custom DCEL planar construction grid tailored to it, and ranks all 24 built-in
 * construction grids by geometric fit.
 */

import {
  arrangePlanarGrid,
  CENTER,
  CONSTRUCTION_GRIDS,
  SHEET,
  type BuiltGrid,
  type CircleIn,
  type DensityLevel,
  type GridId,
  type LineSegIn,
} from './gridArrangement';

export interface NormalizedTransform {
  viewBox: [number, number, number, number];
  inkBox: [number, number, number, number];
  sheetBox: [number, number, number, number];
  scale: number;
  ox: number;
  oy: number;
}

export interface GridFitScore {
  id: GridId;
  score: number;
  reason: string;
}

export interface MarkGridAnalysis {
  transform: NormalizedTransform;
  aspect: number;
  xStems: { pos: number; weight: number }[];
  yStems: { pos: number; weight: number }[];
  dominantAngles: { deg: number; weight: number }[];
  slantRays: { x: number; y: number; deg: number; weight: number }[];
  circles: { cx: number; cy: number; r: number; weight: number }[];
  orthoShare: number;
  diag45Share: number;
  tri60Share: number;
  iso30Share: number;
  curveShare: number;
  mirrorX: number;
  mirrorY: number;
  radialOrder: number;
  summaryChips: string[];
  summaryText: string;
}

type Mat2D = [number, number, number, number, number, number]; // [a, b, c, d, e, f]
const IDENTITY_MAT: Mat2D = [1, 0, 0, 1, 0, 0];

function mulMat(m1: Mat2D, m2: Mat2D): Mat2D {
  return [
    m1[0] * m2[0] + m1[2] * m2[1],
    m1[1] * m2[0] + m1[3] * m2[1],
    m1[0] * m2[2] + m1[2] * m2[3],
    m1[1] * m2[2] + m1[3] * m2[3],
    m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
    m1[1] * m2[4] + m1[3] * m2[5] + m1[5],
  ];
}

function applyMat(m: Mat2D, x: number, y: number): [number, number] {
  return [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
}

function matScaleFactor(m: Mat2D): number {
  return Math.sqrt(Math.max(1e-6, Math.abs(m[0] * m[3] - m[1] * m[2])));
}

function parseSvgTransform(attr: string | null | undefined): Mat2D {
  if (!attr || !attr.trim()) return IDENTITY_MAT;
  let cur: Mat2D = IDENTITY_MAT;
  const re = /([a-zA-Z]+)\s*\(([^)]*)\)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(attr)) !== null) {
    const fn = match[1].toLowerCase();
    const nums = (match[2].match(/[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g) ?? []).map(Number);
    if (!nums.length || nums.some((v) => !Number.isFinite(v))) continue;
    let next: Mat2D = IDENTITY_MAT;
    if (fn === 'matrix' && nums.length >= 6) {
      next = [nums[0], nums[1], nums[2], nums[3], nums[4], nums[5]];
    } else if (fn === 'translate') {
      next = [1, 0, 0, 1, nums[0], nums[1] ?? 0];
    } else if (fn === 'scale') {
      const sx = nums[0];
      const sy = nums[1] ?? sx;
      next = [sx, 0, 0, sy, 0, 0];
    } else if (fn === 'rotate') {
      const rad = (nums[0] * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      if (nums.length >= 3) {
        const cx = nums[1];
        const cy = nums[2];
        next = mulMat(
          mulMat([1, 0, 0, 1, cx, cy], [cos, sin, -sin, cos, 0, 0]),
          [1, 0, 0, 1, -cx, -cy],
        );
      } else {
        next = [cos, sin, -sin, cos, 0, 0];
      }
    } else if (fn === 'skewx') {
      next = [1, 0, Math.tan((nums[0] * Math.PI) / 180), 1, 0, 0];
    } else if (fn === 'skewy') {
      next = [1, Math.tan((nums[0] * Math.PI) / 180), 0, 1, 0, 0];
    }
    cur = mulMat(cur, next);
  }
  return cur;
}

interface RawShapeNode {
  tag: string;
  attrs: Record<string, string>;
  mat: Mat2D;
}

function collectSvgShapesFallback(svgText: string): {
  vb: [number, number, number, number];
  shapes: RawShapeNode[];
} {
  let vb: [number, number, number, number] = [0, 0, 256, 256];
  const svgTag = /<svg\b([^>]*)>/i.exec(svgText);
  if (svgTag) {
    const vbMatch = /viewBox\s*=\s*["']([^"']+)["']/i.exec(svgTag[1]);
    if (vbMatch) {
      const nums = vbMatch[1].trim().split(/[\s,]+/).map(Number);
      if (nums.length === 4 && nums.every(Number.isFinite) && nums[2] > 0 && nums[3] > 0) {
        vb = [nums[0], nums[1], nums[2], nums[3]];
      }
    }
  }
  const stripped = svgText
    .replace(/<(defs|clipPath|mask|pattern)\b[\s\S]*?<\/\1>/gi, ' ');
  const shapes: RawShapeNode[] = [];
  const stack: { tag: string; mat: Mat2D }[] = [];
  const tagRe = /<\/?([a-zA-Z0-9:_-]+)([^>]*?)(\/?)>/g;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(stripped)) !== null) {
    const raw = m[0];
    const isClose = raw.startsWith('</');
    const selfClose = Boolean(m[3]) || raw.endsWith('/>');
    const tag = m[1].toLowerCase().replace(/^.*:/, '');
    if (isClose) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === tag) {
          stack.length = i;
          break;
        }
      }
      continue;
    }
    const attrStr = m[2] || '';
    const attrs: Record<string, string> = {};
    const attrRe = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
    let am: RegExpExecArray | null;
    while ((am = attrRe.exec(attrStr)) !== null) {
      attrs[am[1]] = am[2] ?? am[3] ?? '';
    }
    const parentMat = stack.length ? stack[stack.length - 1].mat : IDENTITY_MAT;
    const localMat = parseSvgTransform(attrs.transform);
    const mat = mulMat(parentMat, localMat);
    if (!selfClose && (tag === 'g' || tag === 'svg' || tag === 'a')) {
      stack.push({ tag, mat });
    }
    if (
      tag === 'path' ||
      tag === 'rect' ||
      tag === 'circle' ||
      tag === 'ellipse' ||
      tag === 'polygon' ||
      tag === 'polyline' ||
      tag === 'line'
    ) {
      shapes.push({ tag, attrs, mat });
    }
  }
  return { vb, shapes };
}

function collectSvgShapes(svgText: string): {
  vb: [number, number, number, number];
  shapes: RawShapeNode[];
} {
  if (typeof DOMParser === 'undefined') {
    return collectSvgShapesFallback(svgText);
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const root = doc.documentElement;
  if (!root || root.localName !== 'svg' || doc.querySelector('parsererror')) {
    return { vb: [0, 0, 256, 256], shapes: [] };
  }
  let vb: [number, number, number, number] = [0, 0, 256, 256];
  const rawVb = (root.getAttribute('viewBox') ?? '').trim().split(/[\s,]+/).map(Number);
  if (rawVb.length === 4 && rawVb.every(Number.isFinite) && rawVb[2] > 0 && rawVb[3] > 0) {
    vb = [rawVb[0], rawVb[1], rawVb[2], rawVb[3]];
  } else {
    const w = parseFloat(root.getAttribute('width') || '256') || 256;
    const h = parseFloat(root.getAttribute('height') || '256') || 256;
    vb = [0, 0, w, h];
  }

  const shapes: RawShapeNode[] = [];
  const walk = (el: Element, parentMat: Mat2D) => {
    const tag = el.localName.toLowerCase();
    if (tag === 'defs' || tag === 'clippath' || tag === 'mask' || tag === 'pattern') return;
    const mat = mulMat(parentMat, parseSvgTransform(el.getAttribute('transform')));
    if (
      tag === 'path' ||
      tag === 'rect' ||
      tag === 'circle' ||
      tag === 'ellipse' ||
      tag === 'polygon' ||
      tag === 'polyline' ||
      tag === 'line'
    ) {
      const attrs: Record<string, string> = {};
      for (const a of Array.from(el.attributes)) attrs[a.name] = a.value;
      shapes.push({ tag, attrs, mat });
    }
    for (const child of Array.from(el.children)) {
      walk(child, mat);
    }
  };
  walk(root, IDENTITY_MAT);
  return { vb, shapes };
}

function svgArcToCenter(
  x0: number,
  y0: number,
  rxIn: number,
  ryIn: number,
  xAxisRotDeg: number,
  largeArc: number,
  sweep: number,
  x: number,
  y: number,
): {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  theta1: number;
  dTheta: number;
  rot: number;
} | null {
  if (rxIn <= 0 || ryIn <= 0 || (Math.abs(x0 - x) < 1e-6 && Math.abs(y0 - y) < 1e-6)) return null;
  const phi = (xAxisRotDeg * Math.PI) / 180;
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const dx2 = (x0 - x) / 2;
  const dy2 = (y0 - y) / 2;
  const x1p = cosPhi * dx2 + sinPhi * dy2;
  const y1p = -sinPhi * dx2 + cosPhi * dy2;

  let rx = Math.abs(rxIn);
  let ry = Math.abs(ryIn);
  const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
  if (lambda > 1) {
    const s = Math.sqrt(lambda);
    rx *= s;
    ry *= s;
  }

  const rx2 = rx * rx;
  const ry2 = ry * ry;
  const num = Math.max(0, rx2 * ry2 - rx2 * y1p * y1p - ry2 * x1p * x1p);
  const den = rx2 * y1p * y1p + ry2 * x1p * x1p;
  if (den < 1e-9) return null;
  const factor = (largeArc === sweep ? -1 : 1) * Math.sqrt(num / den);
  const cxp = factor * ((rx * y1p) / ry);
  const cyp = factor * (-(ry * x1p) / rx);

  const cx = cosPhi * cxp - sinPhi * cyp + (x0 + x) / 2;
  const cy = sinPhi * cxp + cosPhi * cyp + (y0 + y) / 2;

  const angle = (ux: number, uy: number, vx: number, vy: number) => {
    const dot = ux * vx + uy * vy;
    const len = Math.hypot(ux, uy) * Math.hypot(vx, vy);
    const ratio = Math.min(1, Math.max(-1, dot / Math.max(1e-9, len)));
    return (ux * vy - uy * vx < 0 ? -1 : 1) * Math.acos(ratio);
  };

  const v1x = (x1p - cxp) / rx;
  const v1y = (y1p - cyp) / ry;
  const v2x = (-x1p - cxp) / rx;
  const v2y = (-y1p - cyp) / ry;

  const theta1 = angle(1, 0, v1x, v1y);
  let dTheta = angle(v1x, v1y, v2x, v2y);
  if (!sweep && dTheta > 0) dTheta -= Math.PI * 2;
  if (sweep && dTheta < 0) dTheta += Math.PI * 2;

  return { cx, cy, rx, ry, theta1, dTheta, rot: phi };
}

function fitCircleThreePts(
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
): { cx: number; cy: number; r: number } | null {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const [x3, y3] = p3;
  const d = 2 * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
  if (Math.abs(d) < 1e-3) return null;
  const s1 = x1 * x1 + y1 * y1;
  const s2 = x2 * x2 + y2 * y2;
  const s3 = x3 * x3 + y3 * y3;
  const cx = (s1 * (y2 - y3) + s2 * (y3 - y1) + s3 * (y1 - y2)) / d;
  const cy = (s1 * (x3 - x2) + s2 * (x1 - x3) + s3 * (x2 - x1)) / d;
  const r = Math.hypot(x1 - cx, y1 - cy);
  if (!Number.isFinite(r) || r <= 0.5) return null;
  return { cx, cy, r };
}

function normAngle180(deg: number): number {
  let d = deg % 180;
  if (d < 0) d += 180;
  if (d >= 179.95) d = 0;
  return d;
}

function angDiff180(a: number, b: number): number {
  const d = Math.abs(normAngle180(a) - normAngle180(b));
  return Math.min(d, 180 - d);
}

interface RawExtractedFeatures {
  vb: [number, number, number, number];
  samples: [number, number][];
  vertices: { x: number; y: number; weight: number }[];
  lines: { x1: number; y1: number; x2: number; y2: number; len: number; curve: boolean }[];
  circles: { cx: number; cy: number; r: number; weight: number }[];
  straightLen: number;
  curveLen: number;
}

function extractRawFeatures(svgText: string): RawExtractedFeatures {
  const { vb, shapes } = collectSvgShapes(svgText);
  const samples: [number, number][] = [];
  const vertices: { x: number; y: number; weight: number }[] = [];
  const lines: { x1: number; y1: number; x2: number; y2: number; len: number; curve: boolean }[] = [];
  const circles: { cx: number; cy: number; r: number; weight: number }[] = [];
  let straightLen = 0;
  let curveLen = 0;

  const addPt = (x: number, y: number, w = 1) => {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    samples.push([x, y]);
    if (w > 0) vertices.push({ x, y, weight: w });
  };

  const addStraight = (x1: number, y1: number, x2: number, y2: number, isCurveChord = false) => {
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (len < 1e-4) return;
    if (isCurveChord) curveLen += len;
    else {
      straightLen += len;
      lines.push({ x1, y1, x2, y2, len, curve: false });
      vertices.push({ x: x1, y: y1, weight: len * 0.4 });
      vertices.push({ x: x2, y: y2, weight: len * 0.4 });
    }
    samples.push([x1, y1], [(x1 + x2) / 2, (y1 + y2) / 2], [x2, y2]);
  };

  for (const sh of shapes) {
    const m = sh.mat;
    const ms = matScaleFactor(m);
    const a = sh.attrs;

    if (sh.tag === 'rect') {
      const x = parseFloat(a.x || '0') || 0;
      const y = parseFloat(a.y || '0') || 0;
      const w = parseFloat(a.width || '0') || 0;
      const h = parseFloat(a.height || '0') || 0;
      const rx = Math.min(w / 2, parseFloat(a.rx || a.ry || '0') || 0);
      const ry = Math.min(h / 2, parseFloat(a.ry || a.rx || '0') || 0);
      if (w <= 0 || h <= 0) continue;
      const p = [
        applyMat(m, x, y),
        applyMat(m, x + w, y),
        applyMat(m, x + w, y + h),
        applyMat(m, x, y + h),
      ];
      for (let i = 0; i < 4; i++) addStraight(p[i][0], p[i][1], p[(i + 1) % 4][0], p[(i + 1) % 4][1]);
      if (rx >= Math.min(w, h) * 0.45 && Math.abs(rx - ry) < 0.05 * Math.max(rx, ry)) {
        const capW = Math.PI * rx * ms;
        if (w > h * 1.15) {
          const [c1x, c1y] = applyMat(m, x + rx, y + h / 2);
          const [c2x, c2y] = applyMat(m, x + w - rx, y + h / 2);
          circles.push({ cx: c1x, cy: c1y, r: rx * ms, weight: capW });
          circles.push({ cx: c2x, cy: c2y, r: rx * ms, weight: capW });
        } else if (h > w * 1.15) {
          const [c1x, c1y] = applyMat(m, x + w / 2, y + ry);
          const [c2x, c2y] = applyMat(m, x + w / 2, y + h - ry);
          circles.push({ cx: c1x, cy: c1y, r: rx * ms, weight: capW });
          circles.push({ cx: c2x, cy: c2y, r: rx * ms, weight: capW });
        } else {
          const [cx, cy] = applyMat(m, x + w / 2, y + h / 2);
          circles.push({ cx, cy, r: rx * ms, weight: capW });
        }
      }
    } else if (sh.tag === 'circle') {
      const cx0 = parseFloat(a.cx || '0') || 0;
      const cy0 = parseFloat(a.cy || '0') || 0;
      const r0 = parseFloat(a.r || '0') || 0;
      if (r0 <= 0) continue;
      const [cx, cy] = applyMat(m, cx0, cy0);
      const r = r0 * ms;
      circles.push({ cx, cy, r, weight: Math.PI * 2 * r });
      curveLen += Math.PI * 2 * r;
      for (let k = 0; k < 16; k++) {
        const th = (k * Math.PI * 2) / 16;
        const [px, py] = applyMat(m, cx0 + r0 * Math.cos(th), cy0 + r0 * Math.sin(th));
        samples.push([px, py]);
        if (k % 4 === 0) vertices.push({ x: px, y: py, weight: r * 0.5 });
      }
    } else if (sh.tag === 'ellipse') {
      const cx0 = parseFloat(a.cx || '0') || 0;
      const cy0 = parseFloat(a.cy || '0') || 0;
      const rx0 = parseFloat(a.rx || '0') || 0;
      const ry0 = parseFloat(a.ry || '0') || 0;
      if (rx0 <= 0 || ry0 <= 0) continue;
      const [cx, cy] = applyMat(m, cx0, cy0);
      if (Math.abs(rx0 - ry0) / Math.max(rx0, ry0) < 0.06) {
        const r = ((rx0 + ry0) / 2) * ms;
        circles.push({ cx, cy, r, weight: Math.PI * 2 * r });
      }
      curveLen += Math.PI * (rx0 + ry0) * ms;
      for (let k = 0; k < 16; k++) {
        const th = (k * Math.PI * 2) / 16;
        const [px, py] = applyMat(m, cx0 + rx0 * Math.cos(th), cy0 + ry0 * Math.sin(th));
        samples.push([px, py]);
        if (k % 4 === 0) vertices.push({ x: px, y: py, weight: ((rx0 + ry0) / 2) * ms * 0.4 });
      }
    } else if (sh.tag === 'line') {
      const [x1, y1] = applyMat(m, parseFloat(a.x1 || '0') || 0, parseFloat(a.y1 || '0') || 0);
      const [x2, y2] = applyMat(m, parseFloat(a.x2 || '0') || 0, parseFloat(a.y2 || '0') || 0);
      addStraight(x1, y1, x2, y2);
    } else if (sh.tag === 'polygon' || sh.tag === 'polyline') {
      const nums = (a.points || '').match(/[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g)?.map(Number) ?? [];
      const pts: [number, number][] = [];
      for (let i = 0; i + 1 < nums.length; i += 2) {
        pts.push(applyMat(m, nums[i], nums[i + 1]));
      }
      for (let i = 0; i + 1 < pts.length; i++) {
        addStraight(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]);
      }
      if (sh.tag === 'polygon' && pts.length > 2) {
        addStraight(pts[pts.length - 1][0], pts[pts.length - 1][1], pts[0][0], pts[0][1]);
      }
    } else if (sh.tag === 'path') {
      const d = a.d || '';
      const toks = d.match(/[a-zA-Z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g) || [];
      let idx = 0;
      let cx = 0;
      let cy = 0;
      let sx = 0;
      let sy = 0;
      let cmd = 'M';
      let lastOp = '';
      let lastC2: [number, number] | null = null;
      let lastQ: [number, number] | null = null;
      let curveRun: [number, number][] = [];

      const flushCurveCircleFit = () => {
        if (curveRun.length >= 9) {
          const midIdx = Math.floor(curveRun.length / 2);
          const fit = fitCircleThreePts(curveRun[0], curveRun[midIdx], curveRun[curveRun.length - 1]);
          if (fit && fit.r > 1 && fit.r < Math.max(vb[2], vb[3]) * 2.5) {
            let maxErr = 0;
            for (let k = 0; k < curveRun.length; k += Math.max(1, Math.floor(curveRun.length / 7))) {
              const err = Math.abs(Math.hypot(curveRun[k][0] - fit.cx, curveRun[k][1] - fit.cy) - fit.r);
              if (err > maxErr) maxErr = err;
            }
            if (maxErr <= fit.r * 0.03) {
              const a0 = Math.atan2(curveRun[0][1] - fit.cy, curveRun[0][0] - fit.cx);
              const a1 = Math.atan2(curveRun[midIdx][1] - fit.cy, curveRun[midIdx][0] - fit.cx);
              const a2 = Math.atan2(curveRun[curveRun.length - 1][1] - fit.cy, curveRun[curveRun.length - 1][0] - fit.cx);
              if (Math.hypot(curveRun[0][0] - curveRun[midIdx][0], curveRun[0][1] - curveRun[midIdx][1]) > fit.r * 0.35 && (Math.abs(a1 - a0) > 0.25 || Math.abs(a2 - a1) > 0.25)) {
                circles.push({ cx: fit.cx, cy: fit.cy, r: fit.r, weight: fit.r * 3 });
              }
            }
          }
        }
        curveRun = [];
      };

      const num = () => {
        const v = Number(toks[idx++]);
        return Number.isFinite(v) ? v : 0;
      };

      while (idx < toks.length) {
        if (/^[a-zA-Z]$/.test(toks[idx])) {
          cmd = toks[idx++];
          if (cmd === 'Z' || cmd === 'z') {
            flushCurveCircleFit();
            const [x1, y1] = applyMat(m, cx, cy);
            const [x2, y2] = applyMat(m, sx, sy);
            addStraight(x1, y1, x2, y2);
            cx = sx;
            cy = sy;
            lastOp = 'Z';
            lastC2 = null;
            lastQ = null;
            continue;
          }
        }
        const rel = cmd >= 'a' && cmd <= 'z';
        const op = cmd.toUpperCase();
        if (op === 'M' || op === 'L') {
          flushCurveCircleFit();
          const nx = num() + (rel ? cx : 0);
          const ny = num() + (rel ? cy : 0);
          if (op === 'L') {
            const [x1, y1] = applyMat(m, cx, cy);
            const [x2, y2] = applyMat(m, nx, ny);
            addStraight(x1, y1, x2, y2);
          } else {
            sx = nx;
            sy = ny;
            const [px, py] = applyMat(m, nx, ny);
            addPt(px, py, 0.5);
          }
          cx = nx;
          cy = ny;
          if (cmd === 'M') cmd = 'L';
          if (cmd === 'm') cmd = 'l';
          lastOp = op;
          lastC2 = null;
          lastQ = null;
        } else if (op === 'H') {
          flushCurveCircleFit();
          const nx = num() + (rel ? cx : 0);
          const [x1, y1] = applyMat(m, cx, cy);
          const [x2, y2] = applyMat(m, nx, cy);
          addStraight(x1, y1, x2, y2);
          cx = nx;
          lastOp = op;
          lastC2 = null;
          lastQ = null;
        } else if (op === 'V') {
          flushCurveCircleFit();
          const ny = num() + (rel ? cy : 0);
          const [x1, y1] = applyMat(m, cx, cy);
          const [x2, y2] = applyMat(m, cx, ny);
          addStraight(x1, y1, x2, y2);
          cy = ny;
          lastOp = op;
          lastC2 = null;
          lastQ = null;
        } else if (op === 'Q' || op === 'T') {
          const prevQ = lastQ as [number, number] | null;
          const hasQ = Boolean(prevQ && (lastOp === 'Q' || lastOp === 'T'));
          const qx = op === 'Q' ? num() + (rel ? cx : 0) : hasQ && prevQ ? 2 * cx - prevQ[0] : cx;
          const qy = op === 'Q' ? num() + (rel ? cy : 0) : hasQ && prevQ ? 2 * cy - prevQ[1] : cy;
          const nx = num() + (rel ? cx : 0);
          const ny = num() + (rel ? cy : 0);
          const [p0x, p0y] = applyMat(m, cx, cy);
          const [p1x, p1y] = applyMat(m, qx, qy);
          const [p2x, p2y] = applyMat(m, nx, ny);
          let approxLen = 0;
          let prevP: [number, number] = [p0x, p0y];
          if (!curveRun.length) curveRun.push(prevP);
          for (let s = 1; s <= 6; s++) {
            const t = s / 6;
            const mt = 1 - t;
            const px = mt * mt * p0x + 2 * mt * t * p1x + t * t * p2x;
            const py = mt * mt * p0y + 2 * mt * t * p1y + t * t * p2y;
            approxLen += Math.hypot(px - prevP[0], py - prevP[1]);
            prevP = [px, py];
            samples.push(prevP);
            curveRun.push(prevP);
          }
          curveLen += approxLen;
          vertices.push({ x: p2x, y: p2y, weight: Math.max(1, approxLen * 0.25) });
          lastQ = [qx, qy];
          lastC2 = null;
          cx = nx;
          cy = ny;
          lastOp = op;
        } else if (op === 'C' || op === 'S') {
          const prevC2 = lastC2 as [number, number] | null;
          const hasC2 = Boolean(prevC2 && (lastOp === 'C' || lastOp === 'S'));
          const x1 = op === 'C' ? num() + (rel ? cx : 0) : hasC2 && prevC2 ? 2 * cx - prevC2[0] : cx;
          const y1 = op === 'C' ? num() + (rel ? cy : 0) : hasC2 && prevC2 ? 2 * cy - prevC2[1] : cy;
          const x2 = num() + (rel ? cx : 0);
          const y2 = num() + (rel ? cy : 0);
          const nx = num() + (rel ? cx : 0);
          const ny = num() + (rel ? cy : 0);
          const [p0x, p0y] = applyMat(m, cx, cy);
          const [p1x, p1y] = applyMat(m, x1, y1);
          const [p2x, p2y] = applyMat(m, x2, y2);
          const [p3x, p3y] = applyMat(m, nx, ny);
          let approxLen = 0;
          let prevP: [number, number] = [p0x, p0y];
          if (!curveRun.length) curveRun.push(prevP);
          for (let s = 1; s <= 8; s++) {
            const t = s / 8;
            const mt = 1 - t;
            const px = mt * mt * mt * p0x + 3 * mt * mt * t * p1x + 3 * mt * t * t * p2x + t * t * t * p3x;
            const py = mt * mt * mt * p0y + 3 * mt * mt * t * p1y + 3 * mt * t * t * p2y + t * t * t * p3y;
            approxLen += Math.hypot(px - prevP[0], py - prevP[1]);
            prevP = [px, py];
            samples.push(prevP);
            curveRun.push(prevP);
          }
          // Treat near-collinear cubics as structural straight lines too
          const chordLen = Math.hypot(p3x - p0x, p3y - p0y);
          const maxHandleDev = Math.max(
            chordLen > 1e-4 ? Math.abs((p3y - p0y) * p1x - (p3x - p0x) * p1y + p3x * p0y - p3y * p0x) / chordLen : 0,
            chordLen > 1e-4 ? Math.abs((p3y - p0y) * p2x - (p3x - p0x) * p2y + p3x * p0y - p3y * p0x) / chordLen : 0,
          );
          if (chordLen > 1 && maxHandleDev < chordLen * 0.025) {
            straightLen += chordLen;
            lines.push({ x1: p0x, y1: p0y, x2: p3x, y2: p3y, len: chordLen, curve: false });
          } else {
            curveLen += approxLen;
          }
          vertices.push({ x: p3x, y: p3y, weight: Math.max(1, approxLen * 0.25) });
          lastC2 = [x2, y2];
          lastQ = null;
          cx = nx;
          cy = ny;
          lastOp = op;
        } else if (op === 'A') {
          const rx = num();
          const ry = num();
          const rot = num();
          const f1 = toks[idx] || '0';
          if (/^[01]{2,}$/.test(f1)) {
            toks.splice(idx, 1, f1[0], f1[1], ...(f1.length > 2 ? [f1.slice(2)] : []));
          }
          const largeArc = num();
          const f2 = toks[idx] || '0';
          if (/^[01].+/.test(f2) && f2.length > 1) {
            toks.splice(idx, 1, f2[0], f2.slice(1));
          }
          const sweep = num();
          const nx = num() + (rel ? cx : 0);
          const ny = num() + (rel ? cy : 0);
          const arcInfo = svgArcToCenter(cx, cy, rx, ry, rot, largeArc ? 1 : 0, sweep ? 1 : 0, nx, ny);
          if (arcInfo) {
            let approxLen = 0;
            let [prevX, prevY] = applyMat(m, cx, cy);
            for (let s = 1; s <= 10; s++) {
              const th = arcInfo.theta1 + (arcInfo.dTheta * s) / 10;
              const ux = arcInfo.rx * Math.cos(th);
              const uy = arcInfo.ry * Math.sin(th);
              const px = arcInfo.cx + ux * Math.cos(arcInfo.rot) - uy * Math.sin(arcInfo.rot);
              const py = arcInfo.cy + ux * Math.sin(arcInfo.rot) + uy * Math.cos(arcInfo.rot);
              const [tx, ty] = applyMat(m, px, py);
              approxLen += Math.hypot(tx - prevX, ty - prevY);
              prevX = tx;
              prevY = ty;
              samples.push([tx, ty]);
            }
            curveLen += approxLen;
            if (Math.abs(arcInfo.rx - arcInfo.ry) / Math.max(arcInfo.rx, arcInfo.ry) < 0.07) {
              const [tcx, tcy] = applyMat(m, arcInfo.cx, arcInfo.cy);
              const tr = ((arcInfo.rx + arcInfo.ry) / 2) * ms;
              circles.push({ cx: tcx, cy: tcy, r: tr, weight: Math.max(approxLen, tr * 1.8) });
            }
          } else {
            const [x1, y1] = applyMat(m, cx, cy);
            const [x2, y2] = applyMat(m, nx, ny);
            addStraight(x1, y1, x2, y2, true);
          }
          const [epx, epy] = applyMat(m, nx, ny);
          vertices.push({ x: epx, y: epy, weight: 2 });
          cx = nx;
          cy = ny;
          lastOp = op;
          lastC2 = null;
          lastQ = null;
        } else {
          idx++;
        }
      }
      flushCurveCircleFit();
    }
  }

  return { vb, samples, vertices, lines, circles, straightLen, curveLen };
}

function clusterValues1D(items: { v: number; w: number }[], tol: number): { pos: number; weight: number }[] {
  if (!items.length) return [];
  const sorted = [...items].sort((a, b) => a.v - b.v);
  const clusters: { sumVW: number; sumW: number }[] = [];
  for (const it of sorted) {
    const last = clusters[clusters.length - 1];
    if (last && Math.abs(it.v - last.sumVW / last.sumW) <= tol) {
      last.sumVW += it.v * it.w;
      last.sumW += it.w;
    } else {
      clusters.push({ sumVW: it.v * it.w, sumW: it.w });
    }
  }
  return clusters
    .map((c) => ({ pos: c.sumVW / c.sumW, weight: c.sumW }))
    .sort((a, b) => b.weight - a.weight);
}

function measureMirrorSymmetry(pts: [number, number][], reflect: (p: [number, number]) => [number, number]): number {
  if (pts.length < 4) return 0;
  let scoreSum = 0;
  for (const p of pts) {
    const [rx, ry] = reflect(p);
    let minD2 = Infinity;
    for (const q of pts) {
      const d2 = (q[0] - rx) ** 2 + (q[1] - ry) ** 2;
      if (d2 < minD2) minD2 = d2;
    }
    scoreSum += Math.exp(-minD2 / (11 * 11));
  }
  return scoreSum / pts.length;
}

export function analyzeMarkForGrid(svgText: string): MarkGridAnalysis {
  const raw = extractRawFeatures(svgText);
  const vb = raw.vb;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of raw.samples) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  if (!Number.isFinite(minX) || maxX - minX < 1e-4 || maxY - minY < 1e-4) {
    minX = vb[0];
    minY = vb[1];
    maxX = vb[0] + vb[2];
    maxY = vb[1] + vb[3];
  }

  const inkW = Math.max(1e-3, maxX - minX);
  const inkH = Math.max(1e-3, maxY - minY);
  const pad = 22;
  const targetSpan = SHEET - pad * 2;
  const scale = targetSpan / Math.max(inkW, inkH);
  const ox = CENTER - (minX + inkW / 2) * scale;
  const oy = CENTER - (minY + inkH / 2) * scale;
  const toSheet = (x: number, y: number): [number, number] => [ox + x * scale, oy + y * scale];

  const [sx0, sy0] = toSheet(minX, minY);
  const [sx1, sy1] = toSheet(maxX, maxY);
  const sheetBox: [number, number, number, number] = [sx0, sy0, sx1, sy1];
  const transform: NormalizedTransform = {
    viewBox: vb,
    inkBox: [minX, minY, maxX, maxY],
    sheetBox,
    scale,
    ox,
    oy,
  };

  // Transform vertices & segments into sheet space
  const xItems: { v: number; w: number }[] = [
    { v: sx0, w: 40 },
    { v: (sx0 + sx1) / 2, w: 32 },
    { v: sx1, w: 40 },
  ];
  const yItems: { v: number; w: number }[] = [
    { v: sy0, w: 40 },
    { v: (sy0 + sy1) / 2, w: 32 },
    { v: sy1, w: 40 },
  ];
  for (const vt of raw.vertices) {
    const [x, y] = toSheet(vt.x, vt.y);
    xItems.push({ v: x, w: vt.weight * scale });
    yItems.push({ v: y, w: vt.weight * scale });
  }

  // Angle histogram (1° buckets blended over 3.5°) + slant rays
  const totalLen = Math.max(1e-3, raw.straightLen + raw.curveLen);
  const curveShare = Math.min(1, raw.curveLen / totalLen);
  const angleBinsRaw = new Float64Array(180);
  const slantRayCandidates: { x: number; y: number; deg: number; weight: number }[] = [];

  for (const seg of raw.lines) {
    const [x1, y1] = toSheet(seg.x1, seg.y1);
    const [x2, y2] = toSheet(seg.x2, seg.y2);
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (len < 3) continue;
    const deg = normAngle180((Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI);
    const b = Math.round(deg) % 180;
    angleBinsRaw[b] += len;

    // Emphasize orthogonal stems separately if strict H or V
    if (angDiff180(deg, 0) < 2.2) {
      yItems.push({ v: (y1 + y2) / 2, w: len * 1.4 });
    } else if (angDiff180(deg, 90) < 2.2) {
      xItems.push({ v: (x1 + x2) / 2, w: len * 1.4 });
    } else {
      slantRayCandidates.push({
        x: (x1 + x2) / 2,
        y: (y1 + y2) / 2,
        deg,
        weight: len,
      });
    }
  }

  const xStems = clusterValues1D(xItems, 5.5);
  const yStems = clusterValues1D(yItems, 5.5);

  // Merge adjacent angle buckets
  const rawAngleList: { v: number; w: number }[] = [];
  for (let d = 0; d < 180; d++) {
    if (angleBinsRaw[d] > 0) rawAngleList.push({ v: d, w: angleBinsRaw[d] });
  }
  const mergedAngles = clusterValues1D(rawAngleList, 3.5);
  // Also merge wrap-around near 0 / 180
  const zeroEntry = mergedAngles.find((a) => a.pos < 3);
  const highEntry = mergedAngles.find((a) => a.pos > 177);
  if (zeroEntry && highEntry && zeroEntry !== highEntry) {
    zeroEntry.weight += highEntry.weight;
    zeroEntry.pos = 0;
    mergedAngles.splice(mergedAngles.indexOf(highEntry), 1);
  }
  const totalStraightSheet = Math.max(
    1e-3,
    mergedAngles.reduce((acc, a) => acc + a.weight, 0),
  );
  const dominantAngles = mergedAngles
    .map((a) => ({
      deg: Math.round(normAngle180(a.pos) * 10) / 10,
      weight: a.weight / totalStraightSheet,
    }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 8);

  // Deduplicate collinear slant rays by (angle, normal distance)
  const slantRays: { x: number; y: number; deg: number; weight: number }[] = [];
  for (const cand of [...slantRayCandidates].sort((a, b) => b.weight - a.weight)) {
    const rad = (cand.deg * Math.PI) / 180;
    const nx = -Math.sin(rad);
    const ny = Math.cos(rad);
    const dist = cand.x * nx + cand.y * ny;
    const hit = slantRays.find((r) => {
      if (angDiff180(r.deg, cand.deg) > 3.5) return false;
      const rRad = (r.deg * Math.PI) / 180;
      const rnx = -Math.sin(rRad);
      const rny = Math.cos(rRad);
      const rDist = r.x * rnx + r.y * rny;
      // Same undirected line may flip normal sign near 0/180; already filtered out H edges
      return Math.abs(Math.abs(dist) - Math.abs(rDist)) < 6 && Math.hypot(cand.x - r.x, cand.y - r.y) < 180 && (
        Math.abs(dist - rDist) < 6 || (Math.abs(r.deg - cand.deg) > 170 && Math.abs(dist + rDist) < 6)
      );
    });
    if (hit) {
      hit.weight += cand.weight;
    } else {
      slantRays.push({ ...cand });
    }
  }
  slantRays.sort((a, b) => b.weight - a.weight);

  // Deduplicate & normalize circles in sheet space
  const sheetCircles: { cx: number; cy: number; r: number; weight: number }[] = [];
  const rawCircleMapped = raw.circles
    .map((c) => {
      const [cx, cy] = toSheet(c.cx, c.cy);
      const r = c.r * scale;
      return { cx, cy, r, weight: c.weight * scale };
    })
    .filter((c) => c.r >= 5 && c.r <= 122 && c.cx > -40 && c.cx < SHEET + 40 && c.cy > -40 && c.cy < SHEET + 40)
    .sort((a, b) => b.weight - a.weight);
  for (const c of rawCircleMapped) {
    const dup = sheetCircles.find(
      (o) => Math.hypot(o.cx - c.cx, o.cy - c.cy) < 5 && Math.abs(o.r - c.r) < 5,
    );
    if (dup) dup.weight += c.weight;
    else sheetCircles.push({ ...c });
  }

  // Share of canonical angle families
  let orthoLen = 0;
  let diag45Len = 0;
  let tri60Len = 0;
  let iso30Len = 0;
  for (const a of dominantAngles) {
    if (angDiff180(a.deg, 0) <= 3 || angDiff180(a.deg, 90) <= 3) orthoLen += a.weight;
    if (angDiff180(a.deg, 45) <= 4 || angDiff180(a.deg, 135) <= 4) diag45Len += a.weight;
    if (angDiff180(a.deg, 60) <= 4 || angDiff180(a.deg, 120) <= 4 || angDiff180(a.deg, 0) <= 3) tri60Len += a.weight;
    if (angDiff180(a.deg, 30) <= 4 || angDiff180(a.deg, 150) <= 4 || angDiff180(a.deg, 90) <= 3) iso30Len += a.weight;
  }

  // Symmetry on downsampled point cloud in sheet coords
  const step = Math.max(1, Math.floor(raw.samples.length / 64));
  const cloud: [number, number][] = [];
  for (let i = 0; i < raw.samples.length && cloud.length < 64; i += step) {
    cloud.push(toSheet(raw.samples[i][0], raw.samples[i][1]));
  }
  const mCx = (sx0 + sx1) / 2;
  const mCy = (sy0 + sy1) / 2;
  const mirrorX = measureMirrorSymmetry(cloud, ([x, y]) => [2 * mCx - x, y]);
  const mirrorY = measureMirrorSymmetry(cloud, ([x, y]) => [x, 2 * mCy - y]);

  let radialOrder = 0;
  let bestRad = 0;
  for (const k of [8, 6, 4, 3]) {
    const radAngle = (Math.PI * 2) / k;
    const cos = Math.cos(radAngle);
    const sin = Math.sin(radAngle);
    const score = measureMirrorSymmetry(cloud, ([x, y]) => [
      mCx + (x - mCx) * cos - (y - mCy) * sin,
      mCy + (x - mCx) * sin + (y - mCy) * cos,
    ]);
    if (score > 0.78 && score > bestRad) {
      bestRad = score;
      radialOrder = k;
    }
  }

  const chips: string[] = [];
  if (orthoLen > 0.28) chips.push('0°/90° stems');
  if (diag45Len > 0.2) chips.push('±45° bevels');
  if (iso30Len > 0.25 && diag45Len < 0.2 && orthoLen < 0.85) chips.push('±30° iso');
  if (tri60Len > 0.28 && diag45Len < 0.2 && orthoLen < 0.8) chips.push('60° delta');
  if (sheetCircles.length > 0) chips.push(`${sheetCircles.length} ${sheetCircles.length === 1 ? 'circle' : 'circles'}`);
  else if (curveShare > 0.35) chips.push('curved ribs');
  if (radialOrder > 0) chips.push(`${radialOrder}-fold radial`);
  else if (mirrorX > 0.8 && mirrorY > 0.8) chips.push('quad symmetry');
  else if (mirrorX > 0.8) chips.push('bilateral');

  const summaryText = chips.length ? chips.slice(0, 3).join(' · ') : 'Custom proportions';

  return {
    transform,
    aspect: inkW / inkH,
    xStems,
    yStems,
    dominantAngles,
    slantRays,
    circles: sheetCircles,
    orthoShare: orthoLen * (1 - curveShare * 0.5),
    diag45Share: diag45Len * (1 - curveShare * 0.4),
    tri60Share: tri60Len * (1 - curveShare * 0.4),
    iso30Share: iso30Len * (1 - curveShare * 0.4),
    curveShare,
    mirrorX,
    mirrorY,
    radialOrder,
    summaryChips: chips,
    summaryText,
  };
}

/**
 * Synthesizes an exact Line + Circle DCEL construction grid fitted to the input logo's
 * normalized stems, diagonals, ink bounds, centerlines, and detected circles.
 */
export function buildAdaptiveGridForSvg(svgText: string, density: DensityLevel): BuiltGrid {
  const analysis = analyzeMarkForGrid(svgText);
  const [sx0, sy0, sx1, sy1] = analysis.transform.sheetBox;
  const mCx = (sx0 + sx1) / 2;
  const mCy = (sy0 + sy1) / 2;
  const minGap = density === 'low' ? 11 : density === 'high' ? 4.8 : 7.2;

  interface CanonLine { nx: number; ny: number; d: number; deg: number }
  const acceptedLines: CanonLine[] = [];
  const rawLines: LineSegIn[] = [];
  const acceptedX: number[] = [];
  const acceptedY: number[] = [];

  const tryAddInfiniteLine = (px: number, py: number, deg: number): boolean => {
    if (acceptedLines.length >= (density === 'high' ? 28 : density === 'med' ? 20 : 14)) return false;
    const nd = normAngle180(deg);
    const rad = (nd * Math.PI) / 180;
    const nx = -Math.sin(rad);
    const ny = Math.cos(rad);
    const d = px * nx + py * ny;
    for (const ex of acceptedLines) {
      if (angDiff180(ex.deg, nd) <= 2.4) {
        if (Math.abs(ex.d - d) < minGap || (Math.abs(ex.deg - nd) > 175 && Math.abs(ex.d + d) < minGap)) {
          return false;
        }
      }
    }
    acceptedLines.push({ nx, ny, d, deg: nd });
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);
    const reach = SHEET * 1.8;
    rawLines.push({
      x1: px - dx * reach,
      y1: py - dy * reach,
      x2: px + dx * reach,
      y2: py + dy * reach,
    });
    if (angDiff180(nd, 90) < 1.5) acceptedX.push(px);
    else if (angDiff180(nd, 0) < 1.5) acceptedY.push(py);
    return true;
  };

  // 1. Optical frame + core centerlines of the logo's normalized ink box
  tryAddInfiniteLine(sx0, mCy, 90);
  tryAddInfiniteLine(sx1, mCy, 90);
  tryAddInfiniteLine(mCx, mCy, 90);
  tryAddInfiniteLine(mCx, sy0, 0);
  tryAddInfiniteLine(mCx, sy1, 0);
  tryAddInfiniteLine(mCx, mCy, 0);

  // 2. Vertical & horizontal interior stems aligned directly to logo features
  const maxStems = density === 'low' ? 3 : density === 'high' ? 8 : 5;
  for (const s of analysis.xStems.slice(0, maxStems)) {
    if (s.pos > 4 && s.pos < SHEET - 4) tryAddInfiniteLine(s.pos, mCy, 90);
  }
  for (const s of analysis.yStems.slice(0, maxStems)) {
    if (s.pos > 4 && s.pos < SHEET - 4) tryAddInfiniteLine(mCx, s.pos, 0);
  }

  // 3. Exact extracted slant rays from straight diagonal segments
  const maxRays = density === 'low' ? 3 : density === 'high' ? 10 : 6;
  for (const ray of analysis.slantRays.slice(0, maxRays)) {
    tryAddInfiniteLine(ray.x, ray.y, ray.deg);
    if (analysis.mirrorX > 0.72) {
      tryAddInfiniteLine(2 * mCx - ray.x, ray.y, 180 - ray.deg);
    }
    if (analysis.mirrorY > 0.72) {
      tryAddInfiniteLine(ray.x, 2 * mCy - ray.y, 180 - ray.deg);
    }
  }

  // 4. Radial or dominant non-ortho axes through logo center if sparse
  if (analysis.radialOrder >= 6 || analysis.tri60Share > 0.3) {
    tryAddInfiniteLine(mCx, mCy, 60);
    tryAddInfiniteLine(mCx, mCy, 120);
  } else if (analysis.slantRays.length === 0 || analysis.diag45Share > 0.18 || analysis.curveShare > 0.35) {
    tryAddInfiniteLine(mCx, mCy, 45);
    tryAddInfiniteLine(mCx, mCy, 135);
  }

  // 5. Extracted compass circles + inscribed/circumscribed construction rings
  const rawCircles: CircleIn[] = [];
  const maxCircles = density === 'low' ? 3 : density === 'high' ? 8 : 5;
  for (const c of analysis.circles.slice(0, maxCircles)) {
    const dup = rawCircles.some(
      (ex) => Math.hypot(ex.cx - c.cx, ex.cy - c.cy) + Math.abs(ex.r - c.r) < minGap,
    );
    if (!dup) rawCircles.push({ cx: c.cx, cy: c.cy, r: c.r });
  }
  if (rawCircles.length === 0 && (analysis.curveShare > 0.24 || analysis.radialOrder >= 4)) {
    const halfMin = Math.min(sx1 - sx0, sy1 - sy0) / 2;
    const candidateR = density === 'high' ? [halfMin, halfMin * 0.62, halfMin * 0.32] : [halfMin, halfMin * 0.52];
    for (const r of candidateR) {
      if (r >= 8 && r <= 116) rawCircles.push({ cx: mCx, cy: mCy, r });
    }
  }

  // 6. Prevent overly large blank cells on Balanced/Fine density
  const maxSpan = density === 'high' ? 38 : density === 'med' ? 54 : 84;
  const fillGaps = (coords: number[], isX: boolean) => {
    const sorted = [0, ...coords.filter((v) => v > 2 && v < SHEET - 2), SHEET].sort((a, b) => a - b);
    for (let i = 0; i + 1 < sorted.length; i++) {
      const gap = sorted[i + 1] - sorted[i];
      if (gap > maxSpan) {
        const mid = (sorted[i] + sorted[i + 1]) / 2;
        if (isX) tryAddInfiniteLine(mid, mCy, 90);
        else tryAddInfiniteLine(mCx, mid, 0);
      }
    }
  };
  fillGaps(acceptedX, true);
  fillGaps(acceptedY, false);

  const label = analysis.summaryChips.length
    ? `Adaptive (${analysis.summaryChips[0]})`
    : 'Adaptive Logo Grid';
  const symOrder = analysis.radialOrder >= 3 ? analysis.radialOrder : 4;
  return arrangePlanarGrid('adaptive', label, density, rawLines, rawCircles, symOrder);
}

interface GridSignature {
  angles: number[];
  curveAffinity: number; // 0 = pure angular, 1 = curved/compass
  radialOrder: number;
  versatility: number;
  aspectPref?: number;
  reasonHint: string;
}

const GRID_SIGNATURES: Record<GridId, GridSignature> = {
  adaptive: { angles: [0, 30, 45, 60, 90, 120, 135, 150], curveAffinity: 0.7, radialOrder: 0, versatility: 1, reasonHint: 'Synthesized directly from logo geometry' },
  square: { angles: [0, 90], curveAffinity: 0.05, radialOrder: 4, versatility: 0.75, reasonHint: 'Clean horizontal & vertical modular axes' },
  'circle-spandrel': { angles: [0, 90], curveAffinity: 0.78, radialOrder: 4, versatility: 0.7, reasonHint: 'Inscribed cell circles inside orthogonal grid' },
  iso30: { angles: [30, 90, 150], curveAffinity: 0.05, radialOrder: 6, versatility: 0.72, reasonHint: '±30° isometric vectors & vertical stems' },
  octa4: { angles: [0, 45, 90, 135], curveAffinity: 0.1, radialOrder: 4, versatility: 0.85, reasonHint: 'Orthogonal stems + ±45° chamfer diagonals' },
  tri60: { angles: [0, 60, 120], curveAffinity: 0.08, radialOrder: 6, versatility: 0.72, reasonHint: 'Equilateral 60°/120° delta & hex planes' },
  'tri-orbital': { angles: [0, 60, 120], curveAffinity: 0.92, radialOrder: 3, versatility: 0.58, reasonHint: 'Three-center overlapping compass arcs' },
  'tri-halo': { angles: [0, 60, 120], curveAffinity: 0.65, radialOrder: 6, versatility: 0.68, reasonHint: '60° triangular axes + concentric rings' },
  'octa-rings': { angles: [0, 45, 90, 135], curveAffinity: 0.72, radialOrder: 8, versatility: 0.88, reasonHint: '±45° Octagrid fused with bulls-eye rings' },
  tri12: { angles: [30, 60, 90, 120, 150], curveAffinity: 0.1, radialOrder: 6, versatility: 0.74, reasonHint: '30°/60°/90° hexagonal & vertical facets' },
  octa8: { angles: [0, 45, 90, 135], curveAffinity: 0.12, radialOrder: 8, versatility: 0.92, reasonHint: 'Precision 0°/45°/90° subdivided octagrid' },
  rhomb45: { angles: [45, 135], curveAffinity: 0.08, radialOrder: 4, versatility: 0.66, reasonHint: 'Pure ±45° diagonal diamond lattice' },
  hex: { angles: [30, 60, 90, 120, 150], curveAffinity: 0.15, radialOrder: 6, versatility: 0.68, reasonHint: '6-fold honeycomb wedges & radial vertices' },
  brick: { angles: [0, 90], curveAffinity: 0.05, radialOrder: 2, versatility: 0.6, aspectPref: 1.4, reasonHint: 'Staggered horizontal brick modules' },
  'arc-mesh': { angles: [0, 90], curveAffinity: 0.72, radialOrder: 4, versatility: 0.66, reasonHint: 'Square lattice intersected by vertex arcs' },
  polar: { angles: [0, 30, 45, 60, 90, 120, 135, 150], curveAffinity: 0.96, radialOrder: 8, versatility: 0.78, reasonHint: 'Concentric rings + radial angular spokes' },
  vesica: { angles: [0, 60, 120], curveAffinity: 0.96, radialOrder: 6, versatility: 0.62, reasonHint: 'Seed of Life 6-fold tangent circle petals' },
  'duo-vesica': { angles: [0, 90], curveAffinity: 0.92, radialOrder: 2, versatility: 0.56, aspectPref: 1.5, reasonHint: 'Paired orbital centers for wide & curved marks' },
  'golden-construct': { angles: [0, 45, 90, 135], curveAffinity: 0.52, radialOrder: 4, versatility: 0.76, reasonHint: 'φ harmonic guides + center construction rings' },
  octagram: { angles: [0, 45, 90, 135], curveAffinity: 0.45, radialOrder: 8, versatility: 0.74, reasonHint: 'Nested 0°+45° star frames + orbital rings' },
  shield: { angles: [0, 45, 90, 135], curveAffinity: 0.55, radialOrder: 2, versatility: 0.62, reasonHint: 'Bilateral crest arcs, chamfers & centerline' },
  'pinwheel-spiral': { angles: [0, 90], curveAffinity: 0.9, radialOrder: 4, versatility: 0.54, reasonHint: 'Swept rotational spiral arcs & blades' },
  'grid-fillet': { angles: [0, 45, 90, 135], curveAffinity: 0.25, radialOrder: 4, versatility: 0.76, reasonHint: 'Beveled octagon & diamond corner hubs' },
  'iso-cube': { angles: [30, 90, 150], curveAffinity: 0.08, radialOrder: 6, versatility: 0.68, reasonHint: 'Isometric rhombic faces for 3D planes' },
  'nested-frames': { angles: [0, 45, 90, 135], curveAffinity: 0.15, radialOrder: 8, versatility: 0.72, reasonHint: 'Concentric square rails + 45° radial axes' },
};

/** Ranks every construction grid against the analyzed mark's geometric features. */
export function rankGridsForAnalysis(analysis: MarkGridAnalysis): GridFitScore[] {
  const results: GridFitScore[] = [];

  for (const g of CONSTRUCTION_GRIDS) {
    if (g.id === 'adaptive') {
      results.push({
        id: 'adaptive',
        score: 99,
        reason: analysis.summaryText,
      });
      continue;
    }

    const sig = GRID_SIGNATURES[g.id];
    // 1. Angle alignment (0..52)
    let angleMatch = 0;
    if (analysis.dominantAngles.length > 0 && sig.angles.length > 0) {
      let weightedSum = 0;
      for (const da of analysis.dominantAngles) {
        let minDiff = 90;
        for (const ga of sig.angles) {
          const d = angDiff180(da.deg, ga);
          if (d < minDiff) minDiff = d;
        }
        const closeness = Math.max(0, Math.cos((Math.min(28, minDiff) * Math.PI) / 56));
        weightedSum += da.weight * closeness * closeness;
      }
      // Slight parsimony reward when grid has the right minimal angle set (avoiding bloated ties)
      const angleSpecificity = 1 - Math.max(0, sig.angles.length - 4) * 0.025;
      angleMatch = Math.min(1, weightedSum * angleSpecificity) * (1 - analysis.curveShare * 0.35);
    } else if (analysis.curveShare > 0.55) {
      angleMatch = 0.9 * sig.curveAffinity;
    } else {
      angleMatch = 0.45;
    }

    // 2. Curvature / circle affinity (0..26)
    const targetCurve = Math.min(1, analysis.curveShare * 0.85 + (analysis.circles.length > 0 ? 0.3 : 0));
    const curveScore = 1 - Math.abs(targetCurve - sig.curveAffinity);

    // 3. Radial / Bilateral / Aspect match (0..14)
    let symScore = 0.55;
    if (analysis.radialOrder >= 6 && sig.radialOrder >= 6) symScore = 1;
    else if (analysis.radialOrder === 4 && sig.radialOrder >= 4) symScore = 0.9;
    else if (analysis.mirrorX > 0.78 && analysis.mirrorY < 0.55 && g.id === 'shield') symScore = 0.95;
    else if (sig.aspectPref && Math.abs(analysis.aspect - sig.aspectPref) < 0.35) symScore = 0.9;

    // Combine cleanly into 32..97 range
    const raw =
      angleMatch * 50 +
      curveScore * 26 +
      symScore * 14 +
      sig.versatility * 8;
    const clamped = Math.max(32, Math.min(97, Math.round(raw)));

    results.push({
      id: g.id,
      score: clamped,
      reason: sig.reasonHint,
    });
  }

  return results.sort((a, b) => b.score - a.score);
}

/**
 * Prepares normalized SVG markup centered at `pad=22` in a 240×240 sheet,
 * preserving gradients, strokes, fills, and `evenodd` rules for both Trace overlay
 * and offscreen raster hit-testing.
 */
export function buildTraceSvgInner(svgText: string, norm: NormalizedTransform): string {
  if (typeof DOMParser === 'undefined') return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const root = doc.documentElement;
  if (!root || root.localName !== 'svg' || doc.querySelector('parsererror')) return '';

  // Scope defs IDs to avoid DOM ID collisions
  const scopePrefix = 'adp-trace-';
  const defsIds = new Set<string>();
  root.querySelectorAll('[id]').forEach((el) => {
    const id = el.getAttribute('id');
    if (id) {
      defsIds.add(id);
      el.setAttribute('id', scopePrefix + id);
    }
  });
  let serialized = new XMLSerializer().serializeToString(root);
  for (const id of defsIds) {
    const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    serialized = serialized
      .replace(new RegExp(`url\\(#${esc}\\)`, 'g'), `url(#${scopePrefix}${id})`)
      .replace(new RegExp(`href="#${esc}"`, 'g'), `href="#${scopePrefix}${id}"`);
  }

  // Extract inner elements without outer <svg> tag
  const reDoc = parser.parseFromString(serialized, 'image/svg+xml');
  const reRoot = reDoc.documentElement;
  if (!reRoot) return '';
  const rootFill = reRoot.getAttribute('fill') || '#09090b';
  const rootStroke = reRoot.getAttribute('stroke') || 'none';
  const rootSw = reRoot.getAttribute('stroke-width');
  const rootCap = reRoot.getAttribute('stroke-linecap');
  const rootJoin = reRoot.getAttribute('stroke-linejoin');

  const wrapAttrs = [
    `transform="translate(${norm.ox.toFixed(3)} ${norm.oy.toFixed(3)}) scale(${norm.scale.toFixed(5)})"`,
    `fill="${rootFill === 'currentColor' ? 'currentColor' : rootFill}"`,
    rootStroke !== 'none' ? `stroke="${rootStroke}"` : '',
    rootSw ? `stroke-width="${rootSw}"` : '',
    rootCap ? `stroke-linecap="${rootCap}"` : '',
    rootJoin ? `stroke-linejoin="${rootJoin}"` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const innerHtml = Array.from(reRoot.childNodes)
    .map((n) => new XMLSerializer().serializeToString(n))
    .join('');

  return `<g ${wrapAttrs}>${innerHtml}</g>`;
}

/**
 * Rasterizes the normalized logo onto an offscreen 240×240 alpha buffer and returns
 * the subset of grid facets that sit cleanly inside the logo's visual silhouette
 * (handles fills, strokes, compound evenodd paths, gradients, and transforms identically).
 */
export async function matchMarkSilhouetteToFaces(
  svgText: string,
  grid: BuiltGrid,
  norm: NormalizedTransform,
): Promise<Set<string>> {
  const result = new Set<string>();
  if (typeof document === 'undefined' || !grid.faces.length) return result;

  const traceInner = buildTraceSvgInner(svgText, norm)
    .replace(/currentColor/gi, '#ffffff');
  if (!traceInner) return result;

  const normalizedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SHEET} ${SHEET}" width="${SHEET}" height="${SHEET}">${traceInner}</svg>`;
  const blob = new Blob([normalizedSvg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  try {
    const img = new Image();
    img.decoding = 'async';
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('svg-load-failed'));
      img.src = url;
    });

    const canvas = document.createElement('canvas');
    canvas.width = SHEET;
    canvas.height = SHEET;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return result;
    ctx.clearRect(0, 0, SHEET, SHEET);
    ctx.drawImage(img, 0, 0, SHEET, SHEET);

    const pixels = ctx.getImageData(0, 0, SHEET, SHEET).data;
    const hitCtx = ctx;

    const alphaAt = (x: number, y: number): number => {
      const ix = Math.min(SHEET - 1, Math.max(0, Math.round(x)));
      const iy = Math.min(SHEET - 1, Math.max(0, Math.round(y)));
      return pixels[(iy * SHEET + ix) * 4 + 3];
    };

    for (const face of grid.faces) {
      let path2d: Path2D | null = null;
      try {
        path2d = new Path2D(face.d);
      } catch {
        path2d = null;
      }

      // Check centroid first; if centroid lies outside (e.g. crescent), test segment midpoints slightly inward
      const centerAlpha = alphaAt(face.cx, face.cy);
      const centerInside = path2d ? hitCtx.isPointInPath(path2d, face.cx, face.cy) : true;
      if (centerInside && centerAlpha >= 90) {
        result.add(face.id);
        continue;
      }

      // Sample interior points weighted between centroid and edge anchors
      let hits = 0;
      let checked = 0;
      const stride = Math.max(1, Math.floor(face.segs.length / 6));
      for (let i = 0; i < face.segs.length && checked < 6; i += stride) {
        const s = face.segs[i];
        const mx = (s.fx + s.tx) * 0.5;
        const my = (s.fy + s.ty) * 0.5;
        const sx = face.cx * 0.6 + mx * 0.4;
        const sy = face.cy * 0.6 + my * 0.4;
        if (!path2d || hitCtx.isPointInPath(path2d, sx, sy)) {
          checked++;
          if (alphaAt(sx, sy) >= 90) hits++;
        }
      }
      if (checked > 0 && hits >= Math.ceil(checked * 0.5)) {
        result.add(face.id);
      }
    }
  } catch {
    /* ignore decode failure */
  } finally {
    URL.revokeObjectURL(url);
  }

  return result;
}
