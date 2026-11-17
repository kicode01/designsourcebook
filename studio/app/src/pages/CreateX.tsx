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
  buildTraceSvgInner,
  evaluateCandidateGrids,
  evaluateGridMatch,
  getMarkRasterMask,
  rankGridsForAnalysis,
  type MarkRasterMask,
} from '../engine/adaptiveGrid';
import { parseSvgAnatomy, sanitizeSvg } from '../engine/svgAnatomy';
import { useProject, type ActiveMark } from '../state/project';

type Tool = 'select' | 'brush' | 'eraser';
type GridFilterCat = 'best' | 'all' | GridCategory;

interface SnapState {
  gridId: GridId;
  density: DensityLevel;
  motif: Motif;
  selected: Set<string>;
}

const DEFAULT_GRID: GridId = 'tri60';
const DEFAULT_DENSITY: DensityLevel = 'med';
const DEFAULT_INK = { dark: '#fafafa', light: '#09090b' } as const;
const SHEET_FILL = 0.82;

function hasMarkQueryInHash(): boolean {
  const h = typeof window !== 'undefined' ? window.location.hash : '';
  return /[?&](logo|pack)=/.test(h);
}

function adaptMonochromeForCanvas(svgHtml: string): string {
  // Turn monochrome (white, black, dark charcoal, or implicit-black) marks into currentColor so previews & trace adapt cleanly to both themes
  const rawCols = [...svgHtml.matchAll(/(?:#([0-9a-fA-F]{3,8})\b|\b(?:black|white)\b)/gi)];
  const isMonoGrayOrNone = rawCols.every((m) => {
    const tok = m[0].toLowerCase();
    if (tok === 'black' || tok === 'white') return true;
    const hex = m[1];
    if (hex.length === 3 || hex.length === 4) {
      return hex[0] === hex[1] && hex[1] === hex[2];
    }
    if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return Math.max(r, g, b) - Math.min(r, g, b) <= 18;
    }
    return false;
  });
  if (!isMonoGrayOrNone) return svgHtml;
  let out = svgHtml
    .replace(/#[0-9a-fA-F]{3,8}\b/gi, 'currentColor')
    .replace(/\b(?:fill|stroke)="black"/gi, (s) => s.replace(/black/i, 'currentColor'));
  if (!/\bfill="/i.test(out)) {
    out = out.replace(/<svg\b([^>]*)>/i, '<svg$1 fill="currentColor">');
  }
  return out;
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
  { id: 'pixel', label: 'Pixel' },
  { id: 'all', label: `All (${CONSTRUCTION_GRIDS.length})` },
  { id: 'angular', label: 'Angular' },
  { id: 'curved', label: 'Curved' },
  { id: 'compass', label: 'Compass' },
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

function buildCleanSvg(markPath: string, fillHex: string, title = 'Design Sourcebook Custom Mark'): string {
  // SHEET=240 fits cleanly inside 256x256 with an exact 8px optical margin on every side
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title">
  <title id="title">${title}</title>
  <g id="symbol" transform="translate(8 8)">
    <path fill="${fillHex}" d="${markPath}"/>
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
  const [color, setColor] = useState<string>(DEFAULT_INK[theme]);
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
    () => evaluateCandidateGrids(activeMark.svg, density, markMask),
    [activeMark.svg, density, markMask],
  );
  const rankedGrids = useMemo(
    () => rankGridsForAnalysis(markAnalysis, candidateEval.measuredIou),
    [markAnalysis, candidateEval.measuredIou],
  );
  const fitScoreMap = useMemo(() => new Map(rankedGrids.map((r) => [r.id, r])), [rankedGrids]);

  const builtGrid = useMemo(() => {
    if (gridId === 'adaptive-mesh') return candidateEval.contourGrid;
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

  const adaptiveConstructThumbWire = useMemo(
    () => buildAdaptiveGridForSvg(activeMark.svg, 'low').wireframe,
    [activeMark.svg],
  );

  const thumbPaths = useMemo(() => {
    const base = Object.fromEntries(
      CONSTRUCTION_GRIDS.map((g) => [g.id, gridWireframeThumb(g.id)]),
    ) as Record<GridId, string>;
    base['adaptive-mesh'] = adaptiveMeshThumbWire;
    base.adaptive = adaptiveConstructThumbWire;
    return base;
  }, [adaptiveMeshThumbWire, adaptiveConstructThumbWire]);

  const traceSvgHtml = useMemo(() => {
    if (!showTrace) return '';
    return adaptMonochromeForCanvas(buildTraceSvgInner(activeMark.svg, markAnalysis.transform));
  }, [showTrace, activeMark.svg, markAnalysis.transform]);

  const sourceThumbHtml = useMemo(
    () =>
      adaptMonochromeForCanvas(
        activeMark.svg
          .replace(/\swidth="[^"]*"/i, ' width="24"')
          .replace(/\sheight="[^"]*"/i, ' height="24"'),
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

  const snapRef = useRef<SnapState>({ gridId, density, motif, selected });
  snapRef.current = { gridId, density, motif, selected };

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
  }, []);

  const pushHistory = useCallback(() => {
    const cur = snapRef.current;
    setPast((p) => [
      ...p.slice(-49),
      { ...cur, selected: new Set(cur.selected) },
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

  const markPath = useMemo(() => {
    if (gridId === 'square' && motif !== 'square') {
      const n = squareCountFor(density);
      const cellSet = new Set<string>();
      for (const id of selected) {
        const m = /^sq-(\d+)-(\d+)$/.exec(id);
        if (m) cellSet.add(cellKey(Number(m[1]), Number(m[2])));
      }
      const raw = cellsToPath(cellSet, n, motif, 'fill');
      const sFactor = SHEET / (n * CELL);
      // Scale unit cell paths smoothly to exact 240 sheet space
      if (!raw) return '';
      return raw.replace(/([MLHVAZ])([^MLHVAZ]*)/g, (_, cmd: string, args: string) => {
        const nums = (args.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number);
        if (cmd === 'A' && nums.length >= 7) {
          return `A${(nums[0] * sFactor).toFixed(2)} ${(nums[1] * sFactor).toFixed(2)} ${nums[2]} ${nums[3]} ${nums[4]} ${(nums[5] * sFactor).toFixed(2)} ${(nums[6] * sFactor).toFixed(2)}`;
        }
        return `${cmd}${nums.map((v) => (v * sFactor).toFixed(2)).join(' ')}`;
      });
    }
    return builtGrid.unionBoundary(selected);
  }, [gridId, motif, density, selected, builtGrid]);

  const cleanSvg = useMemo(
    () => buildCleanSvg(markPath, color, `${designSystem.name} Mark`),
    [markPath, color, designSystem.name],
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
      const anchorHas = prev.has(face.id);
      const want = tool === 'eraser' ? false : tool === 'select' ? (begin ? !anchorHas : anchorHas) : true;
      const targets = builtGrid.symmetricFaces(face, symmetry);
      if (targets.every((id) => prev.has(id) === want)) return;

      if (!strokeDirty.current) {
        strokeDirty.current = true;
        pushHistory();
      }
      const next = new Set(prev);
      for (const tid of targets) {
        if (want) next.add(tid);
        else next.delete(tid);
      }
      setSelected(next);
      snapRef.current = { ...snapRef.current, selected: next };
    },
    [tool, builtGrid, symmetry, pushHistory],
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
      const ev = evaluateCandidateGrids(mark.svg, targetDensity, exactMask);
      const chosenId = preferredId ?? ev.recommendedId;
      const chosenBuilt =
        chosenId === 'adaptive-mesh'
          ? ev.contourGrid
          : chosenId === 'adaptive'
            ? ev.constructGrid
            : buildGridById(chosenId, targetDensity);

      const { selected: fitted } = evaluateGridMatch(chosenBuilt, exactMask);
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
    },
    [density],
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
    if ((nextId === 'adaptive' || nextId === 'adaptive-mesh') && !adaptedMarkId) {
      pushHistory();
      adaptMarkToGrid(activeMark, nextId, nextDensity, false);
      flash(`Adaptive grid fitted to ${activeMark.name}`);
      return;
    }
    pushHistory();
    const nextBuilt =
      nextId === 'adaptive-mesh'
        ? buildAdaptiveContourMesh(activeMark.svg, nextDensity, markMask)
        : nextId === 'adaptive'
          ? buildAdaptiveGridForSvg(activeMark.svg, nextDensity)
          : buildGridById(nextId, nextDensity);

    let nextSelected: Set<string>;
    if (adaptedMarkId && autoFitMark) {
      nextSelected = evaluateGridMatch(nextBuilt, markMask).selected;
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
    ctx.fillStyle = color;
    if (markPath) ctx.fill(new Path2D(markPath));
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
    const whiteSvg = buildCleanSvg(markPath, '#FFFFFF', `${gridId} custom mark`);
    setActiveMark({
      id: `createx-${gridId}-${Date.now()}`,
      name: `${builtGrid.label}`,
      svg: whiteSvg,
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
      <div className="page-workspace is-createx">
        <section className="studio-preview-column" aria-label="Logo Maker construction grid editor">
          <TopBar current="create" onShare={exportSvg} />

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

                {/* Seamless unioned mark fill */}
                {markPath && (
                  <path className="createx-mark" d={markPath} shapeRendering="geometricPrecision" />
                )}

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
              <label className="createx-swatch" aria-label="Mark colour">
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
                {[48, 28, 16].map((px) => (
                  <div key={px} className="craft-scale-item">
                    <div
                      style={{ width: px, height: px, display: 'grid', placeItems: 'center' }}
                      dangerouslySetInnerHTML={{
                        __html: cleanSvg.replace(/width="256" height="256"/, `width="${px}" height="${px}"`),
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

            <div className="page-section">
              <div className="page-section-title">Adaptive Logo Source</div>
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
                <div className="createx-source-actions">
                  <button
                    type="button"
                    className={`ds-action-btn ${gridId === 'adaptive-mesh' ? 'is-primary' : ''}`}
                    style={{ justifyContent: 'center' }}
                    title="Variable quadtree + 45° bevel slicing fitted to exact logo curves & contours"
                    onClick={() => {
                      pushHistory();
                      adaptMarkToGrid(activeMark, 'adaptive-mesh', density, true);
                      flash(`Contour mesh fitted to ${activeMark.name}`);
                    }}
                  >
                    Adapt Contour
                  </button>
                  <button
                    type="button"
                    className={`ds-action-btn ${gridId === 'adaptive' ? 'is-primary' : ''}`}
                    style={{ justifyContent: 'center' }}
                    title="Architectural stems, bevel rays & compass circles synthesized from logo geometry"
                    onClick={() => {
                      pushHistory();
                      adaptMarkToGrid(activeMark, 'adaptive', density, true);
                      flash(`Construct grid fitted to ${activeMark.name}`);
                    }}
                  >
                    Adapt Construct
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
