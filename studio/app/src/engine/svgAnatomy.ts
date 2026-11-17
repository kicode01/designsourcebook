/**
 * Deterministic SVG Path & Construction Anatomy Inspector (zero AI).
 * Parses SVG shapes and path commands in the browser to overlay anchors,
 * Bézier handles, clean-angle alignment audits, and 16px survivability checks.
 */

export interface Point {
  x: number;
  y: number;
}

export interface HandlePair {
  anchor: Point;
  control: Point;
}

export interface AuditFinding {
  level: 'pass' | 'warn' | 'fail';
  code: string;
  message: string;
}

export interface SvgAnatomy {
  viewBox: [number, number, number, number];
  shapes: number;
  anchors: Point[];
  handles: HandlePair[];
  anglesDeg: number[];
  colors: string[];
  score: number;
  findings: AuditFinding[];
}

const CLEAN_ANGLES = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180];

export function parseSvgAnatomy(svgText: string): SvgAnatomy {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const root = doc.documentElement;
  let vb: [number, number, number, number] = [0, 0, 256, 256];
  if (root && !doc.querySelector('parsererror')) {
    const rawVb = (root.getAttribute('viewBox') ?? '').trim().split(/[\s,]+/).map(Number);
    if (rawVb.length === 4 && rawVb.every(Number.isFinite) && rawVb[2] > 0 && rawVb[3] > 0) {
      vb = [rawVb[0], rawVb[1], rawVb[2], rawVb[3]];
    } else {
      const w = parseFloat(root.getAttribute('width') || '256') || 256;
      const h = parseFloat(root.getAttribute('height') || '256') || 256;
      vb = [0, 0, w, h];
    }
  }

  const anchors: Point[] = [];
  const handles: HandlePair[] = [];
  const anglesSet = new Set<number>();
  const colorSet = new Set<string>();
  const findings: AuditFinding[] = [];

  if (!root || root.localName !== 'svg' || doc.querySelector('parsererror')) {
    return {
      viewBox: vb,
      shapes: 0,
      anchors,
      handles,
      anglesDeg: [],
      colors: [],
      score: 0,
      findings: [{ level: 'fail', code: 'invalid-svg', message: 'Could not parse SVG document.' }],
    };
  }

  const shapesEls = [...root.querySelectorAll('path,rect,circle,ellipse,polygon,polyline,line')];
  const hasText = root.querySelectorAll('text,tspan').length > 0;
  const hasFilter = root.querySelectorAll('filter').length > 0;
  const hasRaster = root.querySelectorAll('image').length > 0;

  root.querySelectorAll('[fill],[stroke],stop').forEach((el) => {
    const f = el.getAttribute('fill');
    const s = el.getAttribute('stroke');
    const sc = el.getAttribute('stop-color');
    [f, s, sc].forEach((c) => {
      if (c && /^#|^rgb|^hsl/i.test(c.trim()) && !/^(none|transparent|currentcolor)$/i.test(c.trim())) {
        colorSet.add(c.trim().toLowerCase());
      }
    });
  });

  const recordSegAngle = (a: Point, b: Point) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    if (Math.hypot(dx, dy) < 1e-2) return;
    let deg = Math.abs((Math.atan2(dy, dx) * 180) / Math.PI);
    if (deg > 180) deg -= 180;
    anglesSet.add(Math.round(deg * 10) / 10);
  };

  for (const el of shapesEls) {
    const tag = el.localName;
    if (tag === 'rect') {
      const x = parseFloat(el.getAttribute('x') || '0');
      const y = parseFloat(el.getAttribute('y') || '0');
      const w = parseFloat(el.getAttribute('width') || '0');
      const h = parseFloat(el.getAttribute('height') || '0');
      anchors.push({ x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h });
      anglesSet.add(0);
      anglesSet.add(90);
    } else if (tag === 'circle') {
      const cx = parseFloat(el.getAttribute('cx') || '0');
      const cy = parseFloat(el.getAttribute('cy') || '0');
      const r = parseFloat(el.getAttribute('r') || '0');
      anchors.push({ x: cx, y: cy - r }, { x: cx + r, y: cy }, { x: cx, y: cy + r }, { x: cx - r, y: cy });
    } else if (tag === 'path') {
      const d = el.getAttribute('d') || '';
      const toks = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
      let idx = 0;
      let cx = 0;
      let cy = 0;
      let sx = 0;
      let sy = 0;
      let cmd = 'M';
      const num = () => Number(toks[idx++] || 0);
      while (idx < toks.length) {
        if (/^[a-zA-Z]$/.test(toks[idx])) {
          cmd = toks[idx++];
          if (cmd === 'Z' || cmd === 'z') {
            recordSegAngle({ x: cx, y: cy }, { x: sx, y: sy });
            cx = sx;
            cy = sy;
            continue;
          }
        }
        const rel = cmd >= 'a' && cmd <= 'z';
        const op = cmd.toUpperCase();
        if (op === 'M' || op === 'L') {
          const x = num() + (rel ? cx : 0);
          const y = num() + (rel ? cy : 0);
          if (op === 'L') recordSegAngle({ x: cx, y: cy }, { x, y });
          else {
            sx = x;
            sy = y;
          }
          cx = x;
          cy = y;
          anchors.push({ x, y });
          if (cmd === 'M') cmd = 'L';
          if (cmd === 'm') cmd = 'l';
        } else if (op === 'H') {
          const x = num() + (rel ? cx : 0);
          recordSegAngle({ x: cx, y: cy }, { x, y: cy });
          cx = x;
          anchors.push({ x: cx, y: cy });
        } else if (op === 'V') {
          const y = num() + (rel ? cy : 0);
          recordSegAngle({ x: cx, y: cy }, { x: cx, y });
          cy = y;
          anchors.push({ x: cx, y: cy });
        } else if (op === 'Q') {
          const qx = num() + (rel ? cx : 0);
          const qy = num() + (rel ? cy : 0);
          const x = num() + (rel ? cx : 0);
          const y = num() + (rel ? cy : 0);
          handles.push({ anchor: { x, y }, control: { x: qx, y: qy } });
          anchors.push({ x, y });
          cx = x;
          cy = y;
        } else if (op === 'C') {
          const x1 = num() + (rel ? cx : 0);
          const y1 = num() + (rel ? cy : 0);
          const x2 = num() + (rel ? cx : 0);
          const y2 = num() + (rel ? cy : 0);
          const x = num() + (rel ? cx : 0);
          const y = num() + (rel ? cy : 0);
          handles.push({ anchor: { x: cx, y: cy }, control: { x: x1, y: y1 } });
          handles.push({ anchor: { x, y }, control: { x: x2, y: y2 } });
          anchors.push({ x, y });
          cx = x;
          cy = y;
        } else if (op === 'A') {
          num();
          num();
          num();
          num();
          num();
          const x = num() + (rel ? cx : 0);
          const y = num() + (rel ? cy : 0);
          anchors.push({ x, y });
          cx = x;
          cy = y;
        } else {
          idx++;
        }
      }
    }
  }

  let score = 100;
  if (hasText) {
    score -= 25;
    findings.push({ level: 'fail', code: 'live-text', message: 'Contains <text>: final logos should use outlined geometry.' });
  }
  if (hasRaster) {
    score -= 30;
    findings.push({ level: 'fail', code: 'raster', message: 'Contains embedded raster <image> rather than pure vectors.' });
  }
  if (hasFilter) {
    score -= 10;
    findings.push({ level: 'warn', code: 'filter', message: 'Uses SVG filter effects; maintain a flat vector master alongside.' });
  }
  if (colorSet.size > 4) {
    score -= 10;
    findings.push({ level: 'warn', code: 'many-colors', message: `${colorSet.size} colours detected (~75% of enduring logos use <= 3).` });
  }
  if (anchors.length > 160) {
    score -= 10;
    findings.push({ level: 'warn', code: 'complexity', message: `${anchors.length} anchors may plug counters at 16px favicon scale.` });
  }

  const nearMiss = [...anglesSet].filter((a) =>
    CLEAN_ANGLES.some((clean) => {
      const diff = Math.abs(a - clean);
      return diff >= 0.4 && diff <= 2.5;
    }),
  );
  if (nearMiss.length) {
    score -= 6;
    findings.push({
      level: 'warn',
      code: 'near-miss-angle',
      message: `Near-miss angles (${nearMiss.slice(0, 3).map((d) => `${d}°`).join(', ')}): snap toward clean 15°/30°/45°/90° axes.`,
    });
  }
  if (!findings.length) {
    findings.push({
      level: 'pass',
      code: 'clean',
      message: `${shapesEls.length} vector element(s), ${anchors.length} anchors, clean geometry.`,
    });
  }

  return {
    viewBox: vb,
    shapes: shapesEls.length,
    anchors,
    handles,
    anglesDeg: [...anglesSet].sort((a, b) => a - b),
    colors: [...colorSet],
    score: Math.max(0, score),
    findings,
  };
}
