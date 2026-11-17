import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Icon } from '../components/icons';
import {
  CELL,
  cellKey,
  cellsToPath,
  gridLines,
  GRID_PRESETS,
  presetCells,
  type Cells,
  type Motif,
} from '../data/grids';
import { parseSvgAnatomy } from '../engine/svgAnatomy';
import { useProject } from '../state/project';

type Tool = 'select' | 'brush' | 'eraser';
type Symmetry = 'none' | 'x' | 'y' | 'quad';

const SIZES = [8, 10, 12, 16];
const MOTIFS: { id: Motif; label: string }[] = [
  { id: 'square', label: 'Square' },
  { id: 'circle', label: 'Circle' },
  { id: 'diamond', label: 'Diamond' },
  { id: 'dot', label: 'Dot' },
  { id: 'diag', label: 'Slash' },
  { id: 'line', label: 'Bar' },
  { id: 'cross', label: 'Plus' },
];
const SYMMETRIES: { id: Symmetry; label: string }[] = [
  { id: 'none', label: 'Off' },
  { id: 'x', label: 'Mirror X' },
  { id: 'y', label: 'Mirror Y' },
  { id: 'quad', label: '4-Way' },
];

const DEFAULT_PRESET = 'pinwheel';
const DEFAULT_INK = { dark: '#fafafa', light: '#09090b' } as const;
const SHEET_FILL = 0.78;

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function buildCleanSvg(markPath: string, size: number, fillHex: string, title = 'Design Sourcebook Custom Mark'): string {
  const dim = size * CELL;
  const k = 224 / dim;
  const pad = 16;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title">
  <title id="title">${title}</title>
  <g id="symbol" transform="translate(${pad} ${pad}) scale(${k.toFixed(4)})">
    <path fill="${fillHex}" d="${markPath}"/>
  </g>
</svg>`;
}

export function CreateX() {
  const { theme, setActiveMark, designSystem } = useProject();
  const [size, setSize] = useState(12);
  const [preset, setPreset] = useState(DEFAULT_PRESET);
  const [cells, setCells] = useState<Cells>(() => presetCells(DEFAULT_PRESET, 12));
  const [motifOverride, setMotifOverride] = useState<Motif | 'preset'>('preset');
  const [symmetry, setSymmetry] = useState<Symmetry>('quad');
  const [color, setColor] = useState<string>(DEFAULT_INK[theme]);
  const [tool, setTool] = useState<Tool>('brush');
  const [zoom, setZoom] = useState(100);
  const [tip, setTip] = useState(true);
  const [past, setPast] = useState<Cells[]>([]);
  const [future, setFuture] = useState<Cells[]>([]);
  const [box, setBox] = useState({ w: 1000, h: 800 });
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const flash = useCallback((m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  useEffect(() => {
    setColor((prev) =>
      prev === DEFAULT_INK.dark || prev === DEFAULT_INK.light ? DEFAULT_INK[theme] : prev,
    );
  }, [theme]);

  const cellsRef = useRef<Cells>(cells);
  const areaRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const painting = useRef(false);
  const strokeDirty = useRef(false);
  const lastCell = useRef<string | null>(null);

  const commit = useCallback((next: Cells) => {
    cellsRef.current = next;
    setCells(next);
  }, []);

  const snapshot = useCallback(() => {
    const now = cellsRef.current;
    setPast((p) => [...p.slice(-49), now]);
    setFuture([]);
  }, []);

  useLayoutEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const read = () => {
      const r = el.getBoundingClientRect();
      setBox({ w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) });
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const geo = useMemo(() => {
    const pitch = Math.max(4, Math.round((Math.min(box.w, box.h) * SHEET_FILL * zoom) / 100 / size));
    const sheet = pitch * size;
    return { pitch, sheet, ox: Math.round((box.w - sheet) / 2), oy: Math.round((box.h - sheet) / 2) };
  }, [box, size, zoom]);

  const ruling = useMemo(() => {
    const { pitch, ox, oy } = geo;
    let d = '';
    for (let k = Math.floor(-ox / pitch); ox + k * pitch <= box.w; k++) {
      const x = ox + k * pitch;
      if (x >= 0) d += `M${x} 0V${box.h}`;
    }
    for (let k = Math.floor(-oy / pitch); oy + k * pitch <= box.h; k++) {
      const y = oy + k * pitch;
      if (y >= 0) d += `M0 ${y}H${box.w}`;
    }
    return d;
  }, [geo, box]);

  const presetMotif = useMemo(
    () => (GRID_PRESETS.find((p) => p.id === preset) ?? GRID_PRESETS[0]).motif,
    [preset],
  );
  const motif: Motif = motifOverride === 'preset' ? presetMotif : motifOverride;

  const markPath = useMemo(() => cellsToPath(cells, size, motif, 'fill'), [cells, size, motif]);
  const cleanSvg = useMemo(() => buildCleanSvg(markPath, size, color, `${designSystem.name} Mark`), [markPath, size, color, designSystem.name]);
  const anatomy = useMemo(() => parseSvgAnatomy(cleanSvg), [cleanSvg]);

  const previewPath = useMemo(
    () =>
      Object.fromEntries(
        GRID_PRESETS.map((p) => [p.id, cellsToPath(presetCells(p.id, size), size, p.motif, 'stroke')]),
      ),
    [size],
  );

  const previewRuling = useMemo(() => gridLines(size), [size]);

  useEffect(() => {
    const up = () => {
      painting.current = false;
      strokeDirty.current = false;
      lastCell.current = null;
    };
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, []);

  const undo = useCallback(() => {
    if (!past.length) return;
    const prev = past[past.length - 1];
    setPast((p) => p.slice(0, -1));
    setFuture((f) => [cellsRef.current, ...f]);
    commit(prev);
  }, [past, commit]);

  const redo = useCallback(() => {
    if (!future.length) return;
    setPast((p) => [...p, cellsRef.current]);
    const next = future[0];
    setFuture((f) => f.slice(1));
    commit(next);
  }, [future, commit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if (meta && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      } else if (!meta && e.key.toLowerCase() === 'b') {
        setTool('brush');
      } else if (!meta && e.key.toLowerCase() === 'e') {
        setTool('eraser');
      } else if (!meta && e.key.toLowerCase() === 's') {
        setTool('select');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, redo]);

  const symmetricTargets = useCallback(
    (r: number, c: number): [number, number][] => {
      const mr = size - 1 - r;
      const mc = size - 1 - c;
      if (symmetry === 'x') return [[r, c], [r, mc]];
      if (symmetry === 'y') return [[r, c], [mr, c]];
      if (symmetry === 'quad') return [[r, c], [r, mc], [mr, c], [mr, mc]];
      return [[r, c]];
    },
    [size, symmetry],
  );

  const cellAt = useCallback(
    (clientX: number, clientY: number) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return null;
      const c = Math.floor((clientX - rect.left - geo.ox) / geo.pitch);
      const r = Math.floor((clientY - rect.top - geo.oy) / geo.pitch);
      if (r < 0 || c < 0 || r >= size || c >= size) return null;
      return { r, c };
    },
    [geo, size],
  );

  const paint = useCallback(
    (r: number, c: number, begin: boolean) => {
      const prev = cellsRef.current;
      const anchorHas = prev.has(cellKey(r, c));
      const want = tool === 'eraser' ? false : tool === 'select' ? (begin ? !anchorHas : anchorHas) : true;
      const coords = symmetricTargets(r, c);
      if (coords.every(([rr, cc]) => prev.has(cellKey(rr, cc)) === want)) return;

      if (!strokeDirty.current) {
        strokeDirty.current = true;
        snapshot();
      }
      const next = new Set(prev);
      for (const [rr, cc] of coords) {
        const k = cellKey(rr, cc);
        if (want) next.add(k);
        else next.delete(k);
      }
      commit(next);
    },
    [tool, symmetricTargets, snapshot, commit],
  );

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    const hit = cellAt(e.clientX, e.clientY);
    if (!hit) return;
    e.preventDefault();
    svgRef.current?.setPointerCapture(e.pointerId);
    painting.current = true;
    strokeDirty.current = false;
    lastCell.current = cellKey(hit.r, hit.c);
    paint(hit.r, hit.c, true);
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const hit = cellAt(e.clientX, e.clientY);
    setHover(hit);
    if (!painting.current || tool === 'select' || !hit) return;
    const key = cellKey(hit.r, hit.c);
    if (key === lastCell.current) return;
    lastCell.current = key;
    paint(hit.r, hit.c, false);
  };

  const applyPreset = (id: string) => {
    snapshot();
    setPreset(id);
    setMotifOverride('preset');
    commit(presetCells(id, size));
  };

  const changeSize = (n: number) => {
    if (n === size) return;
    snapshot();
    setSize(n);
    commit(presetCells(preset, n));
  };

  const flip = () => {
    snapshot();
    const next: Cells = new Set();
    for (const key of cellsRef.current) {
      const [r, c] = key.split(':').map(Number);
      next.add(cellKey(r, size - 1 - c));
    }
    commit(next);
  };

  const clear = () => {
    snapshot();
    commit(new Set());
  };

  const exportSvg = () => {
    download(new Blob([cleanSvg], { type: 'image/svg+xml' }), `logo-${preset}-${size}.svg`);
    flash('Vector SVG exported');
  };

  const exportPng = () => {
    const px = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = px;
    canvas.height = px;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const k = px / (size * CELL);
    ctx.scale(k, k);
    ctx.fillStyle = color;
    ctx.fill(new Path2D(markPath));
    canvas.toBlob((blob) => {
      if (blob) {
        download(blob, `logo-${preset}-${size}.png`);
        flash('PNG exported at 1024px');
      }
    }, 'image/png');
  };

  const pushMark = (targetRoute: '#/logofx' | '#/brand') => {
    // Export opaque white fill for WebGL2 SDF shaders while storing real color cleanly
    const whiteSvg = buildCleanSvg(markPath, size, '#FFFFFF', `${preset} custom mark`);
    setActiveMark({
      id: `createx-${preset}-${Date.now()}`,
      name: `${preset} (${size}×${size})`,
      svg: whiteSvg,
      source: 'createx',
    });
    window.location.hash = targetRoute;
  };

  const zoomBy = (delta: number) => setZoom((z) => Math.min(180, Math.max(50, z + delta)));

  return (
    <div className="logo-studio" data-theme={theme}>
      <div className="page-workspace is-createx">
        <section className="studio-preview-column" aria-label="Logo Maker grid editor">
          <TopBar
            current="create"
            onShare={exportSvg}
          />

          {tip && (
            <div className="createx-tip" role="status">
              <span>Click or drag cells to sculpt vectors. Symmetry mirrors across axes automatically.</span>
              <button type="button" aria-label="Dismiss tip" onClick={() => setTip(false)}>
                <Icon name="x" size={14} />
              </button>
            </div>
          )}

          <div className="page-canvas-area is-flush" ref={areaRef}>
            <svg
              ref={svgRef}
              className="createx-canvas"
              viewBox={`0 0 ${box.w} ${box.h}`}
              role="group"
              aria-label={`Square grid, ${size} by ${size}`}
              style={{ ['--cell-color' as string]: color }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerLeave={() => setHover(null)}
            >
              <rect className="createx-sheet" x="0" y="0" width={box.w} height={box.h} />
              <path className="createx-lines" d={ruling} shapeRendering="crispEdges" />
              {(symmetry === 'x' || symmetry === 'quad') && (
                <line
                  x1={geo.ox + geo.sheet / 2}
                  y1={geo.oy}
                  x2={geo.ox + geo.sheet / 2}
                  y2={geo.oy + geo.sheet}
                  stroke="var(--studio-accent)"
                  strokeOpacity="0.35"
                  strokeDasharray="4 4"
                  pointerEvents="none"
                />
              )}
              {(symmetry === 'y' || symmetry === 'quad') && (
                <line
                  x1={geo.ox}
                  y1={geo.oy + geo.sheet / 2}
                  x2={geo.ox + geo.sheet}
                  y2={geo.oy + geo.sheet / 2}
                  stroke="var(--studio-accent)"
                  strokeOpacity="0.35"
                  strokeDasharray="4 4"
                  pointerEvents="none"
                />
              )}
              <path
                className="createx-veil"
                fillRule="evenodd"
                d={
                  `M0 0H${box.w}V${box.h}H0Z` +
                  `M${geo.ox} ${geo.oy}H${geo.ox + geo.sheet}V${geo.oy + geo.sheet}H${geo.ox}Z`
                }
              />
              <rect
                className="createx-sheet-edge"
                x={geo.ox}
                y={geo.oy}
                width={geo.sheet}
                height={geo.sheet}
                shapeRendering="crispEdges"
              />
              <path
                className="createx-mark"
                d={markPath}
                transform={`translate(${geo.ox} ${geo.oy}) scale(${geo.pitch / CELL})`}
              />
              {hover && symmetricTargets(hover.r, hover.c).map(([hr, hc]) => (
                <rect
                  key={`${hr}-${hc}`}
                  className="createx-hover"
                  x={geo.ox + hc * geo.pitch}
                  y={geo.oy + hr * geo.pitch}
                  width={geo.pitch}
                  height={geo.pitch}
                  pointerEvents="none"
                />
              ))}
            </svg>
          </div>

          <div className="studio-toolbar">
            <div className="toolbar-pill">
              {(
                [
                  ['select', 'cursor', 'Toggle cell (S)'],
                  ['brush', 'brush', 'Fill (B)'],
                  ['eraser', 'eraser', 'Erase (E)'],
                ] as const
              ).map(([id, icon, label]) => (
                <button
                  key={id}
                  type="button"
                  className={`toolbar-button is-icon ${tool === id ? 'is-active' : ''}`}
                  aria-label={label}
                  title={label}
                  aria-pressed={tool === id}
                  onClick={() => setTool(id)}
                >
                  <Icon name={icon} size={15} />
                </button>
              ))}
              <label className="createx-swatch" aria-label="Cell colour">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
              </label>
            </div>

            <div className="toolbar-pill">
              <button
                type="button"
                className="toolbar-button is-icon"
                aria-label="Undo"
                disabled={past.length === 0}
                onClick={undo}
              >
                <Icon name="undo" size={15} />
              </button>
              <button
                type="button"
                className="toolbar-button is-icon"
                aria-label="Redo"
                disabled={future.length === 0}
                onClick={redo}
              >
                <Icon name="redo" size={15} />
              </button>
              <button type="button" className="toolbar-button is-icon" aria-label="Mirror horizontally" onClick={flip}>
                <Icon name="flip" size={15} />
              </button>
              <button type="button" className="toolbar-button is-icon" aria-label="Clear grid" onClick={clear}>
                <Icon name="trash" size={15} />
              </button>
            </div>

            <div className="toolbar-pill">
              <button
                type="button"
                className="toolbar-button is-icon"
                aria-label="Zoom out"
                onClick={() => zoomBy(-10)}
              >
                <Icon name="zoomOut" size={14} />
              </button>
              <span className="zoom-value">{zoom}%</span>
              <button type="button" className="toolbar-button is-icon" aria-label="Zoom in" onClick={() => zoomBy(10)}>
                <Icon name="zoomIn" size={14} />
              </button>
            </div>

            <div className="export-split">
              <button type="button" className="export-main" onClick={exportSvg}>
                Export SVG
              </button>
              <button type="button" className="export-caret" aria-label="Export PNG" title="Export 1024px PNG" onClick={exportPng}>
                <Icon name="image" size={13} />
              </button>
            </div>
          </div>
        </section>

        <aside className="page-panel" aria-label="Logo Maker Settings">
          <header className="page-panel-head">
            <span>Logo Maker</span>
            <span className="page-panel-count">Score {anatomy.score}/100</span>
          </header>
          <div className="page-panel-body">
            <div className="craft-dock">
              <div className="craft-scales">
                {[48, 28, 16].map((px) => (
                  <div key={px} className="craft-scale-item">
                    <div
                      style={{
                        width: px,
                        height: px,
                        display: 'grid',
                        placeItems: 'center',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: cleanSvg.replace(/width="256" height="256"/, `width="${px}" height="${px}"`),
                      }}
                    />
                    <span>{px}px</span>
                  </div>
                ))}
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right', fontSize: 11, color: 'var(--studio-muted)' }}>
                <div>{cells.size} cells</div>
                <div>{anatomy.anchors.length} anchors</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 }}>
              <button
                type="button"
                className="ds-action-btn is-primary"
                style={{ justifyContent: 'center' }}
                onClick={() => pushMark('#/logofx')}
              >
                Send to LogoFX
              </button>
              <button
                type="button"
                className="ds-action-btn"
                style={{ justifyContent: 'center' }}
                onClick={() => pushMark('#/brand')}
              >
                Use in Brand
              </button>
            </div>

            <div className="page-section" style={{ marginTop: 8 }}>
              <div className="page-section-title">Live Symmetry</div>
              <div className="page-segmented">
                {SYMMETRIES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={symmetry === s.id}
                    onClick={() => setSymmetry(s.id)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="page-section">
              <div className="page-section-title">Cell Primitive Shape</div>
              <div className="page-chip-row">
                {MOTIFS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`page-chip ${motif === m.id ? 'is-active' : ''}`}
                    onClick={() => setMotifOverride(m.id)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="page-section">
              <div className="page-section-title">Grid Resolution</div>
              <div className="page-segmented">
                {SIZES.map((n) => (
                  <button key={n} type="button" aria-pressed={n === size} onClick={() => changeSize(n)}>
                    {n}×{n}
                  </button>
                ))}
              </div>
            </div>

            <div className="page-section">
              <div className="page-section-title">Geometric Presets ({GRID_PRESETS.length})</div>
              <div className="grid-picker">
                {GRID_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`grid-thumb ${p.id === preset ? 'is-current' : ''}`}
                    title={p.label}
                    aria-label={p.label}
                    aria-pressed={p.id === preset}
                    onClick={() => applyPreset(p.id)}
                  >
                    <svg viewBox={`0 0 ${size * CELL} ${size * CELL}`} aria-hidden="true">
                      <path
                        className="grid-thumb-paper"
                        d={previewRuling}
                        vectorEffect="non-scaling-stroke"
                        shapeRendering="crispEdges"
                      />
                      <path
                        className="grid-thumb-mark"
                        d={previewPath[p.id]}
                        vectorEffect="non-scaling-stroke"
                        shapeRendering="geometricPrecision"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
