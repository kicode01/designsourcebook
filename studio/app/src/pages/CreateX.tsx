import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { TopBar } from '../components/TopBar';
import { MarkPickerDialog } from '../components/Dialogs';
import { Icon } from '../components/icons';
import {
  CELL,
  cellKey,
  cellsToPath,
  GRID_PRESETS,
  presetCells,
  type Motif,
} from '../data/grids';
import {
  buildGridById,
  CENTER,
  COMPASS_STARTERS,
  CONSTRUCTION_GRIDS,
  gridWireframeThumb,
  SHEET,
  squareCountFor,
  type BuiltGrid,
  type DensityLevel,
  type GridCategory,
  type GridFace,
  type GridId,
  type SymmetryMode,
} from '../engine/gridArrangement';
import {
  analyzeMarkForGrid,
  buildAdaptiveContourMesh,
  buildAdaptiveGridForSvg,
  buildAdaptiveIconGrid,
  buildTraceSvgInner,
  evaluateCandidateGrids,
  evaluateGridMatch,
  getMarkRasterMask,
  rankGridsForAnalysis,
  sampleGridFaceColors,
  type MarkRasterMask,
} from '../engine/adaptiveGrid';
import {
  adaptSvgPaintForSurface,
  inspectSvgPaint,
  type GradientStopSpec,
} from '../engine/svgPaint';
import { parseSvgAnatomy, sanitizeSvg } from '../engine/svgAnatomy';
import { useProject, type ActiveMark } from '../state/project';

type Tool = 'select' | 'brush' | 'eraser';
type GridFilterCat = 'best' | 'all' | GridCategory;
type FillMode = 'solid' | 'linear' | 'radial';

interface SnapState {
  gridId: GridId;
  density: DensityLevel;
  motif: Motif;
  selected: Set<string>;
  fillMode: FillMode;
  color: string;
  gradStart: string;
  gradEnd: string;
  gradAngle: number;
  gradStops: GradientStopSpec[] | null;
  faceColors: Map<string, string>;
}

const DEFAULT_GRID: GridId = 'tri60';
const DEFAULT_DENSITY: DensityLevel = 'med';
const DEFAULT_INK = { dark: '#fafafa', light: '#09090b' } as const;
const SHEET_FILL = 0.82;
const GRAD_KEY = '__grad__';

function hasMarkQueryInHash(): boolean {
  const h = typeof window !== 'undefined' ? window.location.hash : '';
  return /[?&](logo|pack)=/.test(h);
}

const GRADIENT_PRESETS: { id: string; label: string; angle: number; stops: GradientStopSpec[] }[] = [
  { id: 'kotlin', label: 'Prism Violet', angle: 315, stops: [{ offset: 0, color: '#7f52ff' }, { offset: 0.52, color: '#c711e1' }, { offset: 1, color: '#e44857' }] },
  { id: 'ember', label: 'Solar Ember', angle: 135, stops: [{ offset: 0, color: '#ff3b5c' }, { offset: 1, color: '#ff8a00' }] },
  { id: 'glacier', label: 'Cyan Glacier', angle: 135, stops: [{ offset: 0, color: '#0ea5e9' }, { offset: 1, color: '#6366f1' }] },
  { id: 'emerald', label: 'Mint Signal', angle: 135, stops: [{ offset: 0, color: '#10b981' }, { offset: 1, color: '#06b6d4' }] },
  { id: 'slate', label: 'Obsidian Chrome', angle: 145, stops: [{ offset: 0, color: '#fafafa' }, { offset: 1, color: '#71717a' }] },
];

function computeGradientCoords(angleDeg: number): { x1: number; y1: number; x2: number; y2: number } {
  const rad = (angleDeg * Math.PI) / 180;
  const dx = Math.cos(rad) * 105;
  const dy = Math.sin(rad) * 105;
  return {
    x1: Math.round((CENTER - dx) * 10) / 10,
    y1: Math.round((CENTER - dy) * 10) / 10,
    x2: Math.round((CENTER + dx) * 10) / 10,
    y2: Math.round((CENTER + dy) * 10) / 10,
  };
}

const MOTIFS: { id: Motif; label: string }[] = [
  { id: 'square', label: 'Square' },
  { id: 'circle', label: 'Circle' },
  { id: 'diamond', label: 'Diamond' },
  { id: 'dot', label: 'Dot' },
  { id: 'diag', label: 'Slash' },
  { id: 'line', label: 'Bar' },
  { id: 'cross', label: 'Plus' },
];

const SYMMETRIES: { id: SymmetryMode; label: string }[] = [
  { id: 'none', label: 'Off' },
  { id: 'x', label: 'Mir X' },
  { id: 'y', label: 'Mir Y' },
  { id: 'quad', label: '4-Way' },
  { id: 'rot2', label: '180°' },
  { id: 'radial', label: 'Radial' },
];

const DENSITIES: { id: DensityLevel; label: string }[] = [
  { id: 'low', label: 'Coarse' },
  { id: 'med', label: 'Balanced' },
  { id: 'high', label: 'Fine' },
  { id: 'ultra', label: 'Ultra' },
];

const CATEGORIES: { id: GridFilterCat; label: string }[] = [
  { id: 'best', label: 'Best Fit' },
  { id: 'radial', label: 'Radial' },
  { id: 'icon', label: 'Icon' },
  { id: 'pixel', label: 'Pixel' },
  { id: 'angular', label: 'Angular' },
  { id: 'curved', label: 'Curved' },
  { id: 'compass', label: 'Compass' },
  { id: 'all', label: `All (${CONSTRUCTION_GRIDS.length})` },
];

function stampStarterOnGrid(built: BuiltGrid, starterIdx: number): Set<string> {
  const starter = COMPASS_STARTERS[starterIdx] ?? COMPASS_STARTERS[0];
  return new Set(built.faces.filter((f) => starter.keep(f.cx, f.cy)).map((f) => f.id));
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

interface MarkPathLayer {
  fillKey: string;
  fillAttr: string;
  d: string;
}

function buildCleanSvg(
  layers: MarkPathLayer[],
  fillMode: FillMode,
  stops: GradientStopSpec[],
  angleDeg: number,
  gradId: string,
  title = 'Design Sourcebook Custom Mark',
): string {
  const usesGrad = layers.some((l) => l.fillKey === GRAD_KEY) || (layers.length === 0 && fillMode !== 'solid');
  const gc = computeGradientCoords(angleDeg);
  const stopXml = stops
    .map((s) => `<stop offset="${Math.round(s.offset * 1000) / 10}%" stop-color="${s.color}"/>`)
    .join('');
  const defsXml = usesGrad
    ? fillMode === 'radial'
      ? `<defs><radialGradient id="${gradId}" gradientUnits="userSpaceOnUse" cx="${CENTER}" cy="${CENTER}" r="112">${stopXml}</radialGradient></defs>`
      : `<defs><linearGradient id="${gradId}" gradientUnits="userSpaceOnUse" x1="${gc.x1}" y1="${gc.y1}" x2="${gc.x2}" y2="${gc.y2}">${stopXml}</linearGradient></defs>`
    : '';
  const pathXml = layers
    .map((l) => `<path fill="${l.fillKey === GRAD_KEY ? `url(#${gradId})` : l.fillAttr}" d="${l.d}"/>`)
    .join('');
  // SHEET=240 fits cleanly inside 256x256 with an exact 8px optical margin on every side
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title">
  <title id="title">${title}</title>
  ${defsXml}<g id="symbol" transform="translate(8 8)">
    ${pathXml}
  </g>
</svg>`;
}

export function CreateX() {
  const { theme, activeMark, setActiveMark, designSystem } = useProject();
  const openedWithQuery = useMemo(() => hasMarkQueryInHash(), []);

  const [gridId, setGridId] = useState<GridId>(openedWithQuery ? 'adaptive-mesh' : DEFAULT_GRID);
  const [density, setDensity] = useState<DensityLevel>(DEFAULT_DENSITY);
  const [motif, setMotif] = useState<Motif>('square');
  const [selected, setSelected] = useState<Set<string>>(() =>
    openedWithQuery ? new Set() : stampStarterOnGrid(buildGridById(DEFAULT_GRID, DEFAULT_DENSITY), 1),
  );
  const [gridCat, setGridCat] = useState<GridFilterCat>(openedWithQuery ? 'best' : 'all');
  const [symmetry, setSymmetry] = useState<SymmetryMode>('radial');
  const [fillMode, setFillMode] = useState<FillMode>('solid');
  const [color, setColor] = useState<string>(DEFAULT_INK[theme]);
  const [gradStart, setGradStart] = useState<string>(designSystem.primaryHex);
  const [gradEnd, setGradEnd] = useState<string>(designSystem.accentHex);
  const [gradAngle, setGradAngle] = useState<number>(135);
  const [gradStops, setGradStops] = useState<GradientStopSpec[] | null>(null);
  const [faceColors, setFaceColors] = useState<Map<string, string>>(() => new Map());
  const [paintByFacet, setPaintByFacet] = useState<boolean>(false);
  const [sourcePalette, setSourcePalette] = useState<string[]>([]);
  const [tool, setTool] = useState<Tool>('brush');
  const [zoom, setZoom] = useState(100);
  const [tip, setTip] = useState(!openedWithQuery);

  const [showTrace, setShowTrace] = useState<boolean>(openedWithQuery);
  const [autoFitMark, setAutoFitMark] = useState<boolean>(true);
  const [adaptedMarkId, setAdaptedMarkId] = useState<string | null>(null);
  const [markOpen, setMarkOpen] = useState<boolean>(false);

  const [past, setPast] = useState<SnapState[]>([]);
  const [future, setFuture] = useState<SnapState[]>([]);
  const [box, setBox] = useState({ w: 1000, h: 800 });
  const [hoverFace, setHoverFace] = useState<GridFace | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const markAnalysis = useMemo(() => analyzeMarkForGrid(activeMark.svg), [activeMark.svg]);
  const [markMask, setMarkMask] = useState<MarkRasterMask>(() => markAnalysis.fallbackMask);

  useEffect(() => {
    setMarkMask(markAnalysis.fallbackMask);
    let cancelled = false;
    void getMarkRasterMask(activeMark.svg, markAnalysis.transform, markAnalysis.fallbackMask).then(
      (exact) => {
        if (!cancelled) setMarkMask(exact);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [activeMark.svg, markAnalysis.fallbackMask, markAnalysis.transform]);

  const candidateEval = useMemo(
    () => evaluateCandidateGrids(activeMark.svg, density, markMask, activeMark.source),
    [activeMark.svg, activeMark.source, density, markMask],
  );
  const rankedGrids = useMemo(
    () => rankGridsForAnalysis(markAnalysis, candidateEval.measuredIou),
    [markAnalysis, candidateEval.measuredIou],
  );
  const fitScoreMap = useMemo(() => new Map(rankedGrids.map((r) => [r.id, r])), [rankedGrids]);

  const builtGrid = useMemo(() => {
    if (gridId === 'adaptive-mesh') return candidateEval.contourGrid;
    if (gridId === 'adaptive-icon') return candidateEval.iconGrid;
    if (gridId === 'adaptive') return candidateEval.constructGrid;
    return buildGridById(gridId, density);
  }, [gridId, density, candidateEval]);

  const currentAccuracy = useMemo(
    () => evaluateGridMatch(builtGrid, markMask).iouPct,
    [builtGrid, markMask],
  );

  const hitCtx = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 1;
    c.height = 1;
    return c.getContext('2d');
  }, []);

  const hitPaths = useMemo(() => {
    const m = new Map<string, Path2D>();
    for (const f of builtGrid.faces) {
      try {
        m.set(f.id, new Path2D(f.d));
      } catch {
        /* ignore */
      }
    }
    return m;
  }, [builtGrid]);

  const adaptiveMeshThumbWire = useMemo(
    () => buildAdaptiveContourMesh(activeMark.svg, 'low', markMask).wireframe,
    [activeMark.svg, markMask],
  );

  const adaptiveIconThumbWire = useMemo(
    () => buildAdaptiveIconGrid(activeMark.svg, 'low', markMask).wireframe,
    [activeMark.svg, markMask],
  );

  const adaptiveConstructThumbWire = useMemo(
    () => buildAdaptiveGridForSvg(activeMark.svg, 'low').wireframe,
    [activeMark.svg],
  );

  const thumbPaths = useMemo(() => {
    const base = Object.fromEntries(
      CONSTRUCTION_GRIDS.map((g) => [g.id, gridWireframeThumb(g.id)]),
    ) as Record<GridId, string>;
    base['adaptive-mesh'] = adaptiveMeshThumbWire;
    base['adaptive-icon'] = adaptiveIconThumbWire;
    base.adaptive = adaptiveConstructThumbWire;
    return base;
  }, [adaptiveMeshThumbWire, adaptiveIconThumbWire, adaptiveConstructThumbWire]);

  const traceSvgHtml = useMemo(() => {
    if (!showTrace) return '';
    return adaptSvgPaintForSurface(
      buildTraceSvgInner(activeMark.svg, markAnalysis.transform),
      'currentColor',
      'cx-trace-',
    );
  }, [showTrace, activeMark.svg, markAnalysis.transform]);

  const sourceThumbHtml = useMemo(
    () =>
      adaptSvgPaintForSurface(
        activeMark.svg
          .replace(/\swidth="[^"]*"/i, ' width="24"')
          .replace(/\sheight="[^"]*"/i, ' height="24"'),
        'currentColor',
        'cx-src-',
      ),
    [activeMark.svg],
  );

  const flash = useCallback((m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  useEffect(() => {
    setColor((prev) =>
      prev === DEFAULT_INK.dark || prev === DEFAULT_INK.light ? DEFAULT_INK[theme] : prev,
    );
  }, [theme]);

  const snapRef = useRef<SnapState>({
    gridId,
    density,
    motif,
    selected,
    fillMode,
    color,
    gradStart,
    gradEnd,
    gradAngle,
    gradStops,
    faceColors,
  });
  snapRef.current = {
    gridId,
    density,
    motif,
    selected,
    fillMode,
    color,
    gradStart,
    gradEnd,
    gradAngle,
    gradStops,
    faceColors,
  };

  const areaRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const fitTokenRef = useRef(0);
  const lastExternalKeyRef = useRef('');
  const painting = useRef(false);
  const strokeDirty = useRef(false);
  const lastClientPt = useRef<{ x: number; y: number } | null>(null);
  const lastFaceId = useRef<string | null>(null);

  const commitSnapshot = useCallback((next: SnapState) => {
    snapRef.current = next;
    setGridId(next.gridId);
    setDensity(next.density);
    setMotif(next.motif);
    setSelected(next.selected);
    setFillMode(next.fillMode);
    setColor(next.color);
    setGradStart(next.gradStart);
    setGradEnd(next.gradEnd);
    setGradAngle(next.gradAngle);
    setGradStops(next.gradStops);
    setFaceColors(next.faceColors);
  }, []);

  const pushHistory = useCallback(() => {
    const cur = snapRef.current;
    setPast((p) => [
      ...p.slice(-49),
      {
        ...cur,
        selected: new Set(cur.selected),
        faceColors: new Map(cur.faceColors),
        gradStops: cur.gradStops ? [...cur.gradStops] : null,
      },
    ]);
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
    const sheet = Math.max(160, Math.round((Math.min(box.w, box.h) * SHEET_FILL * zoom) / 100));
    const scale = sheet / SHEET;
    return {
      sheet,
      scale,
      ox: Math.round((box.w - sheet) / 2),
      oy: Math.round((box.h - sheet) / 2),
    };
  }, [box, zoom]);

  const defaultFillKey = fillMode === 'solid' ? color.toLowerCase() : GRAD_KEY;
  const activeStops = useMemo<GradientStopSpec[]>(
    () =>
      gradStops && gradStops.length >= 2
        ? gradStops
        : [
            { offset: 0, color: gradStart },
            { offset: 1, color: gradEnd },
          ],
    [gradStops, gradStart, gradEnd],
  );
  const gradMeta = useMemo(() => computeGradientCoords(gradAngle), [gradAngle]);

  const markLayers = useMemo<MarkPathLayer[]>(() => {
    if (!selected.size) return [];
    const groups = new Map<string, Set<string>>();
    for (const id of selected) {
      const fk = faceColors.get(id) ?? defaultFillKey;
      let set = groups.get(fk);
      if (!set) {
        set = new Set<string>();
        groups.set(fk, set);
      }
      set.add(id);
    }

    const out: MarkPathLayer[] = [];
    for (const [fk, idSet] of groups) {
      let d = '';
      if (gridId === 'square' && motif !== 'square') {
        const n = squareCountFor(density);
        const cellSet = new Set<string>();
        for (const id of idSet) {
          const m = /^sq-(\d+)-(\d+)$/.exec(id);
          if (m) cellSet.add(cellKey(Number(m[1]), Number(m[2])));
        }
        const raw = cellsToPath(cellSet, n, motif, 'fill');
        const sFactor = SHEET / (n * CELL);
        if (raw) {
          d = raw.replace(/([MLHVAZ])([^MLHVAZ]*)/g, (_, cmd: string, args: string) => {
            const nums = (args.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number);
            if (cmd === 'A' && nums.length >= 7) {
              return `A${(nums[0] * sFactor).toFixed(2)} ${(nums[1] * sFactor).toFixed(2)} ${nums[2]} ${nums[3]} ${nums[4]} ${(nums[5] * sFactor).toFixed(2)} ${(nums[6] * sFactor).toFixed(2)}`;
            }
            return `${cmd}${nums.map((v) => (v * sFactor).toFixed(2)).join(' ')}`;
          });
        }
      } else {
        d = builtGrid.unionBoundary(idSet);
      }
      if (d.trim()) {
        out.push({
          fillKey: fk,
          fillAttr: fk === GRAD_KEY ? 'url(#createx-canvas-grad)' : fk,
          d,
        });
      }
    }
    return out;
  }, [selected, faceColors, defaultFillKey, gridId, motif, density, builtGrid]);

  const markPath = useMemo(() => markLayers.map((l) => l.d).join(''), [markLayers]);

  const cleanSvg = useMemo(
    () => buildCleanSvg(markLayers, fillMode, activeStops, gradAngle, 'ds-mk-grad', `${designSystem.name} Mark`),
    [markLayers, fillMode, activeStops, gradAngle, designSystem.name],
  );
  const craftDockSvgs = useMemo(
    () => ({
      48: buildCleanSvg(markLayers, fillMode, activeStops, gradAngle, 'ds-mk-dock-48', `${designSystem.name} Mark`),
      28: buildCleanSvg(markLayers, fillMode, activeStops, gradAngle, 'ds-mk-dock-28', `${designSystem.name} Mark`),
      16: buildCleanSvg(markLayers, fillMode, activeStops, gradAngle, 'ds-mk-dock-16', `${designSystem.name} Mark`),
    }),
    [markLayers, fillMode, activeStops, gradAngle, designSystem.name],
  );
  const anatomy = useMemo(() => parseSvgAnatomy(cleanSvg), [cleanSvg]);

  const undo = useCallback(() => {
    if (!past.length) return;
    const prev = past[past.length - 1];
    setPast((p) => p.slice(0, -1));
    setFuture((f) => [{ ...snapRef.current, selected: new Set(snapRef.current.selected) }, ...f]);
    commitSnapshot(prev);
  }, [past, commitSnapshot]);

  const redo = useCallback(() => {
    if (!future.length) return;
    setPast((p) => [...p, { ...snapRef.current, selected: new Set(snapRef.current.selected) }]);
    const next = future[0];
    setFuture((f) => f.slice(1));
    commitSnapshot(next);
  }, [future, commitSnapshot]);

  useEffect(() => {
    const up = () => {
      painting.current = false;
      strokeDirty.current = false;
      lastClientPt.current = null;
      lastFaceId.current = null;
    };
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, []);

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

  const faceAt = useCallback(
    (clientX: number, clientY: number): GridFace | null => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect || !hitCtx) return null;
      const sx = ((clientX - rect.left - geo.ox) / geo.sheet) * SHEET;
      const sy = ((clientY - rect.top - geo.oy) / geo.sheet) * SHEET;
      if (sx < 0 || sy < 0 || sx > SHEET || sy > SHEET) return null;
      for (const f of builtGrid.faces) {
        if (sx < f.bbox[0] - 0.5 || sx > f.bbox[2] + 0.5 || sy < f.bbox[1] - 0.5 || sy > f.bbox[3] + 0.5) continue;
        const p = hitPaths.get(f.id);
        if (p && hitCtx.isPointInPath(p, sx, sy)) return f;
      }
      return null;
    },
    [geo, builtGrid, hitPaths, hitCtx],
  );

  const paintFace = useCallback(
    (face: GridFace, begin: boolean) => {
      const prev = snapRef.current.selected;
      const prevColors = snapRef.current.faceColors;
      const anchorHas = prev.has(face.id);
      const want = tool === 'eraser' ? false : tool === 'select' ? (begin ? !anchorHas : anchorHas) : true;
      const targets = builtGrid.symmetricFaces(face, symmetry);
      const activeTok = snapRef.current.fillMode === 'solid' ? snapRef.current.color.toLowerCase() : GRAD_KEY;
      const willColorChange = want && (paintByFacet || prevColors.size > 0) && targets.some((tid) => (prevColors.get(tid) ?? defaultFillKey) !== activeTok);
      if (targets.every((id) => prev.has(id) === want) && !willColorChange) return;

      if (!strokeDirty.current) {
        strokeDirty.current = true;
        pushHistory();
      }
      const next = new Set(prev);
      const nextColors = new Map(prevColors);
      for (const tid of targets) {
        if (want) {
          next.add(tid);
          if (paintByFacet || nextColors.size > 0) nextColors.set(tid, activeTok);
        } else {
          next.delete(tid);
          nextColors.delete(tid);
        }
      }
      setSelected(next);
      setFaceColors(nextColors);
      snapRef.current = { ...snapRef.current, selected: next, faceColors: nextColors };
    },
    [tool, builtGrid, symmetry, pushHistory, paintByFacet, defaultFillKey],
  );

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    const f = faceAt(e.clientX, e.clientY);
    if (!f) return;
    e.preventDefault();
    svgRef.current?.setPointerCapture(e.pointerId);
    painting.current = true;
    strokeDirty.current = false;
    lastClientPt.current = { x: e.clientX, y: e.clientY };
    lastFaceId.current = f.id;
    paintFace(f, true);
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const f = faceAt(e.clientX, e.clientY);
    setHoverFace(f);
    if (!painting.current || tool === 'select') return;

    // Interpolate intermediate samples along fast drags so thin triangles are never skipped
    const prevPt = lastClientPt.current;
    lastClientPt.current = { x: e.clientX, y: e.clientY };
    if (prevPt) {
      const dist = Math.hypot(e.clientX - prevPt.x, e.clientY - prevPt.y);
      const steps = Math.min(20, Math.max(1, Math.ceil(dist / 6)));
      for (let i = 1; i <= steps; i++) {
        const px = prevPt.x + ((e.clientX - prevPt.x) * i) / steps;
        const py = prevPt.y + ((e.clientY - prevPt.y) * i) / steps;
        const hit = i === steps ? f : faceAt(px, py);
        if (hit && hit.id !== lastFaceId.current) {
          lastFaceId.current = hit.id;
          paintFace(hit, false);
        }
      }
    } else if (f && f.id !== lastFaceId.current) {
      lastFaceId.current = f.id;
      paintFace(f, false);
    }
  };

  const fitMarkAsync = useCallback(
    async (
      mark: ActiveMark,
      preferredId?: GridId,
      targetDensity: DensityLevel = density,
      switchToBestCat = true,
    ) => {
      const tok = ++fitTokenRef.current;
      const analysis = analyzeMarkForGrid(mark.svg);
      const exactMask = await getMarkRasterMask(mark.svg, analysis.transform, analysis.fallbackMask);
      if (tok !== fitTokenRef.current) return;

      setMarkMask(exactMask);
      const ev = evaluateCandidateGrids(mark.svg, targetDensity, exactMask, mark.source);
      const chosenId = preferredId ?? ev.recommendedId;
      const chosenBuilt =
        chosenId === 'adaptive-mesh'
          ? ev.contourGrid
          : chosenId === 'adaptive-icon'
            ? ev.iconGrid
            : chosenId === 'adaptive'
              ? ev.constructGrid
              : buildGridById(chosenId, targetDensity);

      const { selected: fitted } = evaluateGridMatch(chosenBuilt, exactMask);
      const { faceColors: sampledColors, palette, paintInfo } = sampleGridFaceColors(
        chosenBuilt,
        fitted,
        exactMask,
        mark.svg,
      );

      setGridId(chosenId);
      setDensity(targetDensity);
      if (chosenId !== 'square') setMotif('square');
      if (switchToBestCat) setGridCat('best');
      setAdaptedMarkId(mark.id);
      setShowTrace(true);
      setAutoFitMark(true);
      setTip(false);
      setSymmetry(analysis.mirrorX > 0.78 ? 'x' : analysis.radialOrder >= 4 ? 'radial' : 'none');
      setSelected(fitted);
      setSourcePalette(palette);

      if (paintInfo.kind === 'gradient' && paintInfo.gradient) {
        const g = paintInfo.gradient;
        setFillMode(g.mode);
        setGradAngle(g.angle);
        setGradStart(g.stops[0].color);
        setGradEnd(g.stops[g.stops.length - 1].color);
        setGradStops(g.stops);
        setColor(g.stops[0].color);
        setFaceColors(new Map());
        setPaintByFacet(false);
      } else if (paintInfo.kind === 'multicolor' && sampledColors.size > 0) {
        setFillMode('solid');
        setGradStops(null);
        setFaceColors(sampledColors);
        setPaintByFacet(true);
        setColor(palette[0] ?? paintInfo.primaryColor);
      } else if (paintInfo.kind === 'solid') {
        setFillMode('solid');
        setGradStops(null);
        setFaceColors(new Map());
        setPaintByFacet(false);
        setColor(paintInfo.primaryColor);
      } else {
        setFillMode('solid');
        setGradStops(null);
        setFaceColors(new Map());
        setPaintByFacet(false);
        setColor(DEFAULT_INK[theme]);
      }
    },
    [density, theme],
  );

  const adaptMarkToGrid = useCallback(
    (
      mark: ActiveMark,
      preferredId?: GridId,
      targetDensity: DensityLevel = density,
      switchToBestCat = true,
    ) => {
      void fitMarkAsync(mark, preferredId, targetDensity, switchToBestCat);
    },
    [fitMarkAsync, density],
  );

  const handleMarkPicked = useCallback(
    (mark: ActiveMark) => {
      lastExternalKeyRef.current = `${mark.source}:${mark.id}`;
      setActiveMark(mark);
      setPast([]);
      setFuture([]);
      adaptMarkToGrid(mark, undefined, density, true);
      flash(`Adaptive grid fitted to ${mark.name}`);
    },
    [setActiveMark, adaptMarkToGrid, density, flash],
  );

  const handleUploadSvgFile = useCallback(
    async (file: File) => {
      try {
        if (!file.name.toLowerCase().endsWith('.svg') && file.type !== 'image/svg+xml') {
          throw new Error('Choose an SVG vector file for grid adaptation.');
        }
        const text = sanitizeSvg(await file.text());
        const nextMark: ActiveMark = {
          id: `upload-${Date.now()}`,
          name: file.name.replace(/\.svg$/i, ''),
          svg: text,
          source: 'upload',
        };
        handleMarkPicked(nextMark);
      } catch (err) {
        flash((err as Error).message);
      }
    },
    [handleMarkPicked, flash],
  );

  useEffect(() => {
    const isExternal =
      activeMark.source === 'logodb' ||
      activeMark.source === 'iconpack' ||
      activeMark.source === 'upload';
    if (!isExternal) return;
    const key = `${activeMark.source}:${activeMark.id}`;
    if (lastExternalKeyRef.current === key) return;
    lastExternalKeyRef.current = key;
    setPast([]);
    setFuture([]);
    adaptMarkToGrid(activeMark, undefined, density, true);
    flash(`Adaptive grid fitted to ${activeMark.name}`);
  }, [activeMark, adaptMarkToGrid, density, flash]);

  const switchConstructionGrid = (nextId: GridId, nextDensity: DensityLevel = density) => {
    if (nextId === gridId && nextDensity === density) return;
    if ((nextId === 'adaptive' || nextId === 'adaptive-mesh' || nextId === 'adaptive-icon') && !adaptedMarkId) {
      pushHistory();
      adaptMarkToGrid(activeMark, nextId, nextDensity, false);
      flash(`Adaptive grid fitted to ${activeMark.name}`);
      return;
    }
    pushHistory();
    const nextBuilt =
      nextId === 'adaptive-mesh'
        ? buildAdaptiveContourMesh(activeMark.svg, nextDensity, markMask)
        : nextId === 'adaptive-icon'
          ? buildAdaptiveIconGrid(activeMark.svg, nextDensity, markMask)
          : nextId === 'adaptive'
            ? buildAdaptiveGridForSvg(activeMark.svg, nextDensity)
            : buildGridById(nextId, nextDensity);

    let nextSelected: Set<string>;
    let nextFaceColors = new Map<string, string>();
    if (adaptedMarkId && autoFitMark) {
      nextSelected = evaluateGridMatch(nextBuilt, markMask).selected;
      const sampled = sampleGridFaceColors(nextBuilt, nextSelected, markMask, activeMark.svg);
      if (sampled.paintInfo.kind === 'multicolor' && sampled.faceColors.size > 0) {
        nextFaceColors = sampled.faceColors;
      }
    } else {
      nextSelected = new Set<string>();
      if (markPath && hitCtx) {
        try {
          const p2d = new Path2D(markPath);
          for (const f of nextBuilt.faces) {
            if (hitCtx.isPointInPath(p2d, f.cx, f.cy)) nextSelected.add(f.id);
          }
        } catch {
          /* ignore */
        }
      }
      if (!nextSelected.size && selected.size > 0) {
        for (const id of selected) {
          const oldF = builtGrid.faceMap.get(id);
          if (!oldF) continue;
          const hits = nextBuilt.symmetricFaces(oldF, 'none');
          hits.forEach((hid) => nextSelected.add(hid));
        }
      }
    }
    setGridId(nextId);
    setDensity(nextDensity);
    if (nextId !== 'square') setMotif('square');
    setSelected(nextSelected);
    setFaceColors(nextFaceColors);
    const meta = CONSTRUCTION_GRIDS.find((g) => g.id === nextId);
    if (meta && nextId !== gridId) flash(`${meta.label} grid active`);
  };

  const applyStarter = (starterIdx: number) => {
    pushHistory();
    setSelected(stampStarterOnGrid(builtGrid, starterIdx));
  };

  const applySquarePreset = (presetId: string) => {
    const preset = GRID_PRESETS.find((p) => p.id === presetId) ?? GRID_PRESETS[0];
    const n = squareCountFor(density);
    const sqBuilt = buildGridById('square', density);
    const cells = presetCells(presetId, n);
    const nextSel = new Set<string>();
    for (const k of cells) {
      const [r, c] = k.split(':').map(Number);
      const fid = `sq-${r}-${c}`;
      if (sqBuilt.faceMap.has(fid)) nextSel.add(fid);
    }
    pushHistory();
    setGridId('square');
    setMotif(preset.motif);
    setSelected(nextSel);
  };

  const transformSelection = (mapPt: (x: number, y: number) => [number, number]) => {
    if (!selected.size) return;
    pushHistory();
    const next = new Set<string>();
    for (const id of selected) {
      const f = builtGrid.faceMap.get(id);
      if (!f) continue;
      const [tx, ty] = mapPt(f.cx, f.cy);
      let best = '';
      let bestD = Infinity;
      for (const cand of builtGrid.faces) {
        const d = (cand.cx - tx) ** 2 + (cand.cy - ty) ** 2;
        if (d < bestD) {
          bestD = d;
          best = cand.id;
        }
      }
      if (best) next.add(best);
    }
    setSelected(next);
  };

  const flip = () => transformSelection((x, y) => [SHEET - x, y]);
  const rotate90 = () => transformSelection((x, y) => [CENTER - (y - CENTER), CENTER + (x - CENTER)]);

  const clear = () => {
    pushHistory();
    setSelected(new Set());
    setFaceColors(new Map());
  };

  const exportSvg = () => {
    download(new Blob([cleanSvg], { type: 'image/svg+xml' }), `logo-${gridId}-${density}.svg`);
    flash('Vector SVG exported');
  };

  const exportPng = () => {
    const px = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = px;
    canvas.height = px;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const k = px / 256;
    ctx.scale(k, k);
    ctx.translate(8, 8);
    let gradBrush: CanvasGradient | null = null;
    if (markLayers.some((l) => l.fillKey === GRAD_KEY)) {
      if (fillMode === 'radial') {
        gradBrush = ctx.createRadialGradient(CENTER, CENTER, 0, CENTER, CENTER, 112);
      } else {
        gradBrush = ctx.createLinearGradient(gradMeta.x1, gradMeta.y1, gradMeta.x2, gradMeta.y2);
      }
      for (const st of activeStops) {
        gradBrush.addColorStop(st.offset, st.color);
      }
    }
    for (const layer of markLayers) {
      ctx.fillStyle = layer.fillKey === GRAD_KEY && gradBrush ? gradBrush : layer.fillAttr;
      ctx.fill(new Path2D(layer.d));
    }
    canvas.toBlob((blob) => {
      if (blob) {
        download(blob, `logo-${gridId}-${density}.png`);
        flash('PNG exported at 1024px');
      }
    }, 'image/png');
  };

  const pushMark = (targetRoute: '#/logofx' | '#/brand') => {
    if (!markPath.trim()) {
      flash('Draw or pick a shape before sending');
      return;
    }
    const isUniformMono =
      fillMode === 'solid' &&
      faceColors.size === 0 &&
      (color.toLowerCase() === DEFAULT_INK.dark || color.toLowerCase() === DEFAULT_INK.light);
    const outSvg = isUniformMono
      ? buildCleanSvg(
          markLayers.map((l) => ({ ...l, fillAttr: '#FFFFFF', fillKey: '#ffffff' })),
          'solid',
          activeStops,
          gradAngle,
          'ds-mk-push',
          `${gridId} custom mark`,
        )
      : buildCleanSvg(markLayers, fillMode, activeStops, gradAngle, `ds-mk-${Date.now().toString(36)}`, `${gridId} custom mark`);
    setActiveMark({
      id: `createx-${gridId}-${Date.now()}`,
      name: `${builtGrid.label}`,
      svg: outSvg,
      source: 'createx',
    });
    window.location.hash = targetRoute;
  };

  const zoomBy = (delta: number) => setZoom((z) => Math.min(180, Math.max(50, z + delta)));

  const hoverSymFaces = useMemo(() => {
    if (!hoverFace) return [];
    const ids = builtGrid.symmetricFaces(hoverFace, symmetry);
    return ids.map((id) => builtGrid.faceMap.get(id)).filter((f): f is GridFace => Boolean(f));
  }, [hoverFace, builtGrid, symmetry]);

  const filteredGrids = useMemo(() => {
    if (gridCat === 'best') {
      const orderMap = new Map(rankedGrids.map((r, i) => [r.id, i]));
      return [...CONSTRUCTION_GRIDS].sort(
        (a, b) => (orderMap.get(a.id) ?? 999) - (orderMap.get(b.id) ?? 999),
      );
    }
    if (gridCat === 'all') return CONSTRUCTION_GRIDS;
    return CONSTRUCTION_GRIDS.filter((g) => g.category === gridCat);
  }, [gridCat, rankedGrids]);
  const activeGridMeta = useMemo(
    () => CONSTRUCTION_GRIDS.find((g) => g.id === gridId) ?? CONSTRUCTION_GRIDS[0],
    [gridId],
  );
  const activeFit = fitScoreMap.get(gridId);

  return (
    <div className="logo-studio" data-theme={theme}>
      <TopBar current="create" onShare={exportSvg} />
      <div className="page-workspace is-createx">
        <section className="studio-preview-column" aria-label="Logo Maker construction grid editor">
          {tip && (
            <div className="createx-tip" role="status">
              <span>Click or drag facets on any construction grid, or load any brand logo to synthesize an adaptive grid.</span>
              <button type="button" aria-label="Dismiss tip" onClick={() => setTip(false)}>
                <Icon name="x" size={14} />
              </button>
            </div>
          )}

          <div
            className="page-canvas-area is-flush"
            ref={areaRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file) void handleUploadSvgFile(file);
            }}
          >
            <svg
              ref={svgRef}
              className="createx-canvas"
              viewBox={`0 0 ${box.w} ${box.h}`}
              role="group"
              aria-label={`${builtGrid.label} construction canvas`}
              style={{ ['--cell-color' as string]: color }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerLeave={() => setHoverFace(null)}
            >
              <rect className="createx-sheet" x="0" y="0" width={box.w} height={box.h} />

              {/* Geometric construction lines & circles */}
              <g transform={`translate(${geo.ox} ${geo.oy}) scale(${geo.scale})`}>
                <defs>
                  {fillMode === 'radial' ? (
                    <radialGradient id="createx-canvas-grad" gradientUnits="userSpaceOnUse" cx={CENTER} cy={CENTER} r={112}>
                      {activeStops.map((s, idx) => (
                        <stop key={idx} offset={`${s.offset * 100}%`} stopColor={s.color} />
                      ))}
                    </radialGradient>
                  ) : (
                    <linearGradient id="createx-canvas-grad" gradientUnits="userSpaceOnUse" x1={gradMeta.x1} y1={gradMeta.y1} x2={gradMeta.x2} y2={gradMeta.y2}>
                      {activeStops.map((s, idx) => (
                        <stop key={idx} offset={`${s.offset * 100}%`} stopColor={s.color} />
                      ))}
                    </linearGradient>
                  )}
                </defs>
                {showTrace && traceSvgHtml && (
                  <g
                    className="createx-trace"
                    dangerouslySetInnerHTML={{ __html: traceSvgHtml }}
                  />
                )}
                <path
                  className="createx-lines"
                  d={builtGrid.wireframe}
                  vectorEffect="non-scaling-stroke"
                  shapeRendering="geometricPrecision"
                />

                {(symmetry === 'x' || symmetry === 'quad') && (
                  <line
                    x1={CENTER}
                    y1={0}
                    x2={CENTER}
                    y2={SHEET}
                    stroke="var(--studio-accent)"
                    strokeOpacity="0.4"
                    strokeDasharray="4 4"
                    vectorEffect="non-scaling-stroke"
                    pointerEvents="none"
                  />
                )}
                {(symmetry === 'y' || symmetry === 'quad') && (
                  <line
                    x1={0}
                    y1={CENTER}
                    x2={SHEET}
                    y2={CENTER}
                    stroke="var(--studio-accent)"
                    strokeOpacity="0.4"
                    strokeDasharray="4 4"
                    vectorEffect="non-scaling-stroke"
                    pointerEvents="none"
                  />
                )}
                {(symmetry === 'rot2' || symmetry === 'radial') && (
                  <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={6}
                    fill="none"
                    stroke="var(--studio-accent)"
                    strokeOpacity="0.45"
                    vectorEffect="non-scaling-stroke"
                    pointerEvents="none"
                  />
                )}

                {/* Seamless unioned multi-color / gradient mark layers */}
                {markLayers.map((layer) => (
                  <path
                    key={layer.fillKey}
                    className="createx-mark"
                    style={{ fill: layer.fillAttr }}
                    d={layer.d}
                    shapeRendering="geometricPrecision"
                  />
                ))}

                {/* Hover & Symmetry target preview */}
                {hoverSymFaces.map((hf) => (
                  <path
                    key={hf.id}
                    className="createx-hover"
                    d={hf.d}
                    stroke="var(--studio-accent)"
                    strokeOpacity="0.7"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                    pointerEvents="none"
                  />
                ))}
              </g>

              {/* Outer sheet veil & artboard frame */}
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
            </svg>
          </div>

          <div className="studio-toolbar">
            <div className="toolbar-pill">
              {(
                [
                  ['select', 'cursor', 'Toggle facet (S)'],
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
              <label
                className="createx-swatch"
                aria-label="Mark colour or gradient"
                title={fillMode === 'solid' ? `Fill ${color}` : `${fillMode === 'radial' ? 'Radial' : 'Linear'} gradient`}
              >
                <span
                  className="createx-swatch-dot"
                  style={{
                    background:
                      fillMode === 'solid'
                        ? color
                        : fillMode === 'radial'
                          ? `radial-gradient(circle, ${activeStops.map((s) => `${s.color} ${Math.round(s.offset * 100)}%`).join(', ')})`
                          : `linear-gradient(${gradAngle + 90}deg, ${activeStops.map((s) => `${s.color} ${Math.round(s.offset * 100)}%`).join(', ')})`,
                  }}
                />
                <input
                  type="color"
                  value={fillMode === 'solid' ? color : gradStart}
                  onChange={(e) => {
                    const hex = e.target.value;
                    if (fillMode === 'solid') {
                      setColor(hex);
                    } else {
                      setGradStart(hex);
                      setGradStops(null);
                    }
                  }}
                />
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
              <button type="button" className="toolbar-button is-icon" aria-label="Mirror horizontally" title="Flip horizontal" onClick={flip}>
                <Icon name="flip" size={15} />
              </button>
              <button type="button" className="toolbar-button is-icon" aria-label="Rotate 90 degrees" title="Rotate 90°" onClick={rotate90}>
                <Icon name="reset" size={15} />
              </button>
              <button
                type="button"
                className={`toolbar-button is-icon ${showTrace ? 'is-active' : ''}`}
                aria-label="Toggle source logo trace overlay"
                aria-pressed={showTrace}
                title="Toggle source logo trace overlay"
                onClick={() => setShowTrace((v) => !v)}
              >
                <Icon name="eye" size={15} />
              </button>
              <button
                type="button"
                className="toolbar-button is-icon"
                aria-label="Load logo or SVG into adaptive grid"
                title="Choose brand logo, UI icon, or SVG"
                onClick={() => setMarkOpen(true)}
              >
                <Icon name="upload" size={15} />
              </button>
              <button type="button" className="toolbar-button is-icon" aria-label="Clear grid" title="Clear canvas" onClick={clear}>
                <Icon name="trash" size={15} />
              </button>
            </div>

            <div className="toolbar-pill">
              <button type="button" className="toolbar-button is-icon" aria-label="Zoom out" onClick={() => zoomBy(-10)}>
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
                {([48, 28, 16] as const).map((px) => (
                  <div key={px} className="craft-scale-item">
                    <div
                      style={{ width: px, height: px, display: 'grid', placeItems: 'center' }}
                      dangerouslySetInnerHTML={{
                        __html: craftDockSvgs[px].replace(/width="256" height="256"/, `width="${px}" height="${px}"`),
                      }}
                    />
                    <span>{px}px</span>
                  </div>
                ))}
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right', fontSize: 11, color: 'var(--studio-muted)' }}>
                <div>{selected.size} facets</div>
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

            <div className="page-section" style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div className="page-section-title" style={{ marginBottom: 0 }}>Fill &amp; Gradient</div>
                {faceColors.size > 0 && (
                  <button
                    type="button"
                    className="page-chip"
                    style={{ height: 22, padding: '0 8px', fontSize: 10.5 }}
                    title="Apply active color or gradient across every selected facet"
                    onClick={() => {
                      pushHistory();
                      setFaceColors(new Map());
                      setPaintByFacet(false);
                    }}
                  >
                    Fill All
                  </button>
                )}
              </div>

              <div className="page-segmented" role="group" aria-label="Fill type">
                {(['solid', 'linear', 'radial'] as const).map((fm) => (
                  <button
                    key={fm}
                    type="button"
                    aria-pressed={fillMode === fm}
                    onClick={() => {
                      pushHistory();
                      setFillMode(fm);
                      if (fm !== 'solid' && !paintByFacet) setFaceColors(new Map());
                    }}
                  >
                    {fm === 'solid' ? 'Solid' : fm === 'linear' ? 'Linear' : 'Radial'}
                  </button>
                ))}
              </div>

              {fillMode === 'solid' ? (
                <div className="createx-color-bar">
                  <label className="createx-hex-pill" title="Pick active brush hex color">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                    <span className="createx-mono-hex">{color.toUpperCase()}</span>
                  </label>
                  <button
                    type="button"
                    className={`page-chip ${paintByFacet || faceColors.size > 0 ? 'is-active' : ''}`}
                    aria-pressed={paintByFacet || faceColors.size > 0}
                    title="When active, brush paints individual facets with the selected swatch"
                    onClick={() => setPaintByFacet((v) => !v)}
                  >
                    {paintByFacet || faceColors.size > 0 ? 'Layer Paint' : 'Whole Mark'}
                  </button>
                </div>
              ) : (
                <div className="createx-grad-box">
                  <div className="createx-grad-stops">
                    <label className="createx-hex-pill" title="Gradient start stop">
                      <input
                        type="color"
                        value={activeStops[0]?.color ?? gradStart}
                        onChange={(e) => {
                          setGradStart(e.target.value);
                          setGradStops(null);
                        }}
                      />
                      <span className="createx-mono-hex">{(activeStops[0]?.color ?? gradStart).toUpperCase()}</span>
                    </label>
                    <span style={{ color: 'var(--studio-muted)', fontSize: 11 }}>→</span>
                    <label className="createx-hex-pill" title="Gradient end stop">
                      <input
                        type="color"
                        value={activeStops[activeStops.length - 1]?.color ?? gradEnd}
                        onChange={(e) => {
                          setGradEnd(e.target.value);
                          setGradStops(null);
                        }}
                      />
                      <span className="createx-mono-hex">{(activeStops[activeStops.length - 1]?.color ?? gradEnd).toUpperCase()}</span>
                    </label>
                  </div>
                  {fillMode === 'linear' && (
                    <label className="createx-angle-row">
                      <span>Angle {Math.round(gradAngle)}°</span>
                      <input
                        type="range"
                        min={0}
                        max={360}
                        step={5}
                        value={gradAngle}
                        onChange={(e) => setGradAngle(Number(e.target.value))}
                      />
                    </label>
                  )}
                  <div className="page-chip-row" style={{ marginTop: 6 }}>
                    <button
                      type="button"
                      className="page-chip"
                      title="Use active Design System primary and accent gradient"
                      onClick={() => {
                        pushHistory();
                        setGradStart(designSystem.primaryHex);
                        setGradEnd(designSystem.accentHex);
                        setGradStops(null);
                      }}
                    >
                      System
                    </button>
                    {GRADIENT_PRESETS.map((gp) => (
                      <button
                        key={gp.id}
                        type="button"
                        className="page-chip"
                        title={gp.label}
                        onClick={() => {
                          pushHistory();
                          setFillMode('linear');
                          setGradAngle(gp.angle);
                          setGradStart(gp.stops[0].color);
                          setGradEnd(gp.stops[gp.stops.length - 1].color);
                          setGradStops(gp.stops);
                          if (!paintByFacet) setFaceColors(new Map());
                        }}
                      >
                        <span
                          className="createx-grad-chip-dot"
                          style={{
                            background: `linear-gradient(135deg, ${gp.stops[0].color}, ${gp.stops[gp.stops.length - 1].color})`,
                          }}
                        />
                        {gp.label.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="createx-swatch-strip" aria-label="Quick brand & system color swatches">
                {[...new Set([
                  ...sourcePalette,
                  designSystem.primaryHex,
                  designSystem.secondaryHex,
                  designSystem.accentHex,
                  DEFAULT_INK[theme],
                ])]
                  .slice(0, 10)
                  .map((sw) => (
                    <button
                      key={sw}
                      type="button"
                      className={`createx-swatch-btn ${color.toLowerCase() === sw.toLowerCase() && fillMode === 'solid' ? 'is-active' : ''}`}
                      style={{ background: sw }}
                      title={`Paint ${sw.toUpperCase()}`}
                      aria-label={`Select color ${sw}`}
                      onClick={() => {
                        setFillMode('solid');
                        setColor(sw);
                      }}
                    />
                  ))}
              </div>
            </div>

            <div className="page-section">
              <div className="page-section-title">Adaptive Logo &amp; Icon Source</div>
              <div className="createx-source-card">
                <div className="createx-source-row">
                  <div
                    className="createx-source-thumb"
                    dangerouslySetInnerHTML={{ __html: sourceThumbHtml }}
                  />
                  <div className="createx-source-meta">
                    <strong>{activeMark.name}</strong>
                    <span>{currentAccuracy}% fit · {markAnalysis.summaryText}</span>
                  </div>
                  <button
                    type="button"
                    className="ds-action-btn"
                    style={{ padding: '4px 9px', fontSize: 11, flexShrink: 0 }}
                    onClick={() => setMarkOpen(true)}
                  >
                    Load SVG
                  </button>
                </div>
                <div className="createx-source-actions is-three">
                  <button
                    type="button"
                    className={`ds-action-btn ${gridId === 'adaptive-mesh' ? 'is-primary' : ''}`}
                    style={{ justifyContent: 'center', fontSize: 11, padding: '6px 4px' }}
                    title="Adaptive Logo quadtree + 45° bevel & color-seam slicing for brand marks & wordmarks"
                    onClick={() => {
                      pushHistory();
                      adaptMarkToGrid(activeMark, 'adaptive-mesh', density, true);
                      flash(`Adaptive Logo mesh fitted to ${activeMark.name}`);
                    }}
                  >
                    Adapt Logo
                  </button>
                  <button
                    type="button"
                    className={`ds-action-btn ${gridId === 'adaptive-icon' ? 'is-primary' : ''}`}
                    style={{ justifyContent: 'center', fontSize: 11, padding: '6px 4px' }}
                    title="UI-icon keyline quadtree snapped to 16/20/24/32px lattices with sub-pixel bevels"
                    onClick={() => {
                      pushHistory();
                      adaptMarkToGrid(activeMark, 'adaptive-icon', density, true);
                      flash(`Adaptive Icon grid fitted to ${activeMark.name}`);
                    }}
                  >
                    Adapt Icon
                  </button>
                  <button
                    type="button"
                    className={`ds-action-btn ${gridId === 'adaptive' ? 'is-primary' : ''}`}
                    style={{ justifyContent: 'center', fontSize: 11, padding: '6px 4px' }}
                    title="Architectural stems, bevel rays & compass circles synthesized from logo geometry"
                    onClick={() => {
                      pushHistory();
                      adaptMarkToGrid(activeMark, 'adaptive', density, true);
                      flash(`Construct grid fitted to ${activeMark.name}`);
                    }}
                  >
                    Construct
                  </button>
                </div>
                <div className="createx-source-toggles">
                  <button
                    type="button"
                    className={`page-chip ${showTrace ? 'is-active' : ''}`}
                    aria-pressed={showTrace}
                    onClick={() => setShowTrace((v) => !v)}
                  >
                    Trace {showTrace ? 'On' : 'Off'}
                  </button>
                  <button
                    type="button"
                    className={`page-chip ${autoFitMark ? 'is-active' : ''}`}
                    aria-pressed={autoFitMark}
                    title="Automatically fit the loaded logo silhouette when switching between grids"
                    onClick={() => {
                      const next = !autoFitMark;
                      setAutoFitMark(next);
                      if (next) {
                        setSelected(evaluateGridMatch(builtGrid, markMask).selected);
                      }
                    }}
                  >
                    Auto-Fit {autoFitMark ? 'On' : 'Off'}
                  </button>
                  {adaptedMarkId && (
                    <button
                      type="button"
                      className="page-chip"
                      onClick={() => {
                        pushHistory();
                        setSelected(evaluateGridMatch(builtGrid, markMask).selected);
                      }}
                    >
                      Refit Facets
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="page-section" style={{ marginTop: 8 }}>
              <div className="page-section-title">Symmetry</div>
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
              <div className="page-section-title">Grid Subdivision</div>
              <div className="page-segmented">
                {DENSITIES.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    aria-pressed={density === d.id}
                    onClick={() => switchConstructionGrid(gridId, d.id)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="page-section">
              <div className="page-section-title">Quick Form Starters</div>
              <div className="page-chip-row">
                {COMPASS_STARTERS.map((st, idx) => (
                  <button
                    key={st.id}
                    type="button"
                    className="page-chip"
                    onClick={() => applyStarter(idx)}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="page-section">
              <div className="page-section-title">Construction Grids ({CONSTRUCTION_GRIDS.length})</div>
              <p style={{ margin: '2px 0 8px', fontSize: 11, color: 'var(--studio-muted)', lineHeight: 1.4 }}>
                <strong style={{ color: 'var(--studio-ink)' }}>{activeGridMeta.label}:</strong>{' '}
                {gridCat === 'best' && activeFit ? activeFit.reason : activeGridMeta.description}
              </p>
              <div className="page-chip-row" style={{ marginBottom: 10 }}>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`page-chip ${gridCat === c.id ? 'is-active' : ''}`}
                    onClick={() => setGridCat(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="grid-picker">
                {filteredGrids.map((g) => {
                  const fit = fitScoreMap.get(g.id);
                  const showBadge = Boolean(adaptedMarkId || gridCat === 'best') && fit;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      className={`grid-thumb ${g.id === gridId ? 'is-current' : ''}`}
                      title={`${g.label} — ${fit ? `${fit.score}% match (${fit.reason})` : g.description}`}
                      aria-label={g.label}
                      aria-pressed={g.id === gridId}
                      onClick={() => switchConstructionGrid(g.id, density)}
                    >
                      <svg viewBox={`0 0 ${SHEET} ${SHEET}`} aria-hidden="true">
                        <path
                          className="grid-thumb-wire"
                          d={thumbPaths[g.id]}
                          vectorEffect="non-scaling-stroke"
                          shapeRendering="geometricPrecision"
                        />
                      </svg>
                      {showBadge && (
                        <span className="grid-thumb-score">
                          {fit.score}%
                        </span>
                      )}
                      <span className="grid-thumb-label">{g.short}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {gridId === 'square' && (
              <>
                <div className="page-section">
                  <div className="page-section-title">Square Cell Motif</div>
                  <div className="page-chip-row">
                    {MOTIFS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        className={`page-chip ${motif === m.id ? 'is-active' : ''}`}
                        onClick={() => {
                          pushHistory();
                          setMotif(m.id);
                        }}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="page-section">
                  <div className="page-section-title">Square Pattern Presets ({GRID_PRESETS.length})</div>
                  <div className="page-chip-row">
                    {GRID_PRESETS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className="page-chip"
                        onClick={() => applySquarePreset(p.id)}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/svg+xml,.svg"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleUploadSvgFile(file);
          e.target.value = '';
        }}
      />
      <MarkPickerDialog
        open={markOpen}
        onClose={() => setMarkOpen(false)}
        onSelect={handleMarkPicked}
        onUploadFile={() => fileRef.current?.click()}
      />
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
