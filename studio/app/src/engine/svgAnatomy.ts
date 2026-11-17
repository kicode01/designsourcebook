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

  const pushAnchor = (x: number, y: number) => {
    if (Number.isFinite(x) && Number.isFinite(y)) anchors.push({ x, y });
  };
  const pushHandle = (ax: number, ay: number, cx: number, cy: number) => {
    if (Number.isFinite(ax) && Number.isFinite(ay) && Number.isFinite(cx) && Number.isFinite(cy)) {
      handles.push({ anchor: { x: ax, y: ay }, control: { x: cx, y: cy } });
    }
  };

  for (const el of shapesEls) {
    const tag = el.localName;
    if (tag === 'rect') {
      const x = parseFloat(el.getAttribute('x') || '0');
      const y = parseFloat(el.getAttribute('y') || '0');
      const w = parseFloat(el.getAttribute('width') || '0');
      const h = parseFloat(el.getAttribute('height') || '0');
      pushAnchor(x, y);
      pushAnchor(x + w, y);
      pushAnchor(x + w, y + h);
      pushAnchor(x, y + h);
      anglesSet.add(0);
      anglesSet.add(90);
    } else if (tag === 'circle') {
      const cx = parseFloat(el.getAttribute('cx') || '0');
      const cy = parseFloat(el.getAttribute('cy') || '0');
      const r = parseFloat(el.getAttribute('r') || '0');
      pushAnchor(cx, cy - r);
      pushAnchor(cx + r, cy);
      pushAnchor(cx, cy + r);
      pushAnchor(cx - r, cy);
    } else if (tag === 'path') {
      const d = el.getAttribute('d') || '';
      const toks = d.match(/[a-zA-Z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g) || [];
      let idx = 0;
      let cx = 0;
      let cy = 0;
      let sx = 0;
      let sy = 0;
      let cmd = 'M';
      const num = () => {
        const v = Number(toks[idx++]);
        return Number.isFinite(v) ? v : 0;
      };
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
        if (op === 'M' || op === 'L' || op === 'T') {
          const x = num() + (rel ? cx : 0);
          const y = num() + (rel ? cy : 0);
          if (op === 'L' || op === 'T') recordSegAngle({ x: cx, y: cy }, { x, y });
          else {
            sx = x;
            sy = y;
          }
          cx = x;
          cy = y;
          pushAnchor(x, y);
          if (cmd === 'M') cmd = 'L';
          if (cmd === 'm') cmd = 'l';
        } else if (op === 'H') {
          const x = num() + (rel ? cx : 0);
          recordSegAngle({ x: cx, y: cy }, { x, y: cy });
          cx = x;
          pushAnchor(cx, cy);
        } else if (op === 'V') {
          const y = num() + (rel ? cy : 0);
          recordSegAngle({ x: cx, y: cy }, { x: cx, y });
          cy = y;
          pushAnchor(cx, cy);
        } else if (op === 'Q' || op === 'S') {
          const qx = num() + (rel ? cx : 0);
          const qy = num() + (rel ? cy : 0);
          const x = num() + (rel ? cx : 0);
          const y = num() + (rel ? cy : 0);
          pushHandle(x, y, qx, qy);
          pushAnchor(x, y);
          cx = x;
          cy = y;
        } else if (op === 'C') {
          const x1 = num() + (rel ? cx : 0);
          const y1 = num() + (rel ? cy : 0);
          const x2 = num() + (rel ? cx : 0);
          const y2 = num() + (rel ? cy : 0);
          const x = num() + (rel ? cx : 0);
          const y = num() + (rel ? cy : 0);
          pushHandle(cx, cy, x1, y1);
          pushHandle(x, y, x2, y2);
          pushAnchor(x, y);
          cx = x;
          cy = y;
        } else if (op === 'A') {
          num();
          num();
          num();
          const f1 = toks[idx] || '0';
          if (/^[01]{2,}$/.test(f1)) {
            toks.splice(idx, 1, f1[0], f1[1], ...(f1.length > 2 ? [f1.slice(2)] : []));
          } else if (/^[01][01]/.test(f1) && f1.length > 1) {
            toks.splice(idx, 1, f1[0], f1.slice(1));
          }
          num();
          const f2 = toks[idx] || '0';
          if (/^[01].+/.test(f2) && f2.length > 1) {
            toks.splice(idx, 1, f2[0], f2.slice(1));
          }
          num();
          const x = num() + (rel ? cx : 0);
          const y = num() + (rel ? cy : 0);
          pushAnchor(x, y);
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
