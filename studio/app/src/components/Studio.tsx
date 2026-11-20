import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Inspector } from './Inspector';
import { TopBar } from './TopBar';
import { Toolbar } from './Toolbar';
import { SocialOverlay } from './SocialOverlay';
import { ExportDialog, MarkPickerDialog, type ExportFormat, type ExportVideoOptions } from './Dialogs';
import { Icon } from './icons';
import { StudioRenderer, type RenderState } from '../engine/renderer';
import { sanitizeSvg } from '../engine/svgAnatomy';
import { allEffectIds, buildThumbnails } from '../engine/thumbs';
import { currentColors, currentParams, useStudio } from '../state/studio';
import { useProject } from '../state/project';
import {
  MOTION_PRESETS,
  applyFilterPresetToList,
  compositeLogoFxFrame,
  computeAnimationTiming,
  computeChoreographedTransform,
  type LoopMode,
  type MotionPresetId,
  type StageAspectMode,
  type StageBackdropMode,
  type StudioFxShowcase,
} from './logofx/logoFxUtils';
import { LogoFxMatrixView } from './logofx/LogoFxMatrixView';
import { LogoFxVideoStudio } from './logofx/LogoFxVideoStudio';

const STAGE = 460;

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function Studio() {
  const { state, dispatch, shader } = useStudio();
  const { theme, activeMark, setActiveMark, designSystem } = useProject();
  const { doc, ui } = state;
  const stageMode = ui.stageMode ?? 'stage';

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageTransformRef = useRef<HTMLDivElement>(null);
  const timelineSliderRef = useRef<HTMLInputElement>(null);
  const timelineLabelRef = useRef<HTMLSpanElement>(null);
  const pointerTiltRef = useRef<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const targetTiltRef = useRef<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

  const rendererRef = useRef<StudioRenderer | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef(state);
  const shaderRef = useRef(shader);
  const timeRef = useRef(0);
  const startClockRef = useRef(performance.now());
  const logoRef = useRef<HTMLImageElement | null>(null);
  const flipRef = useRef(false);
  const thumbStopRef = useRef<(() => void) | null>(null);
  const lastObjectUrlRef = useRef<string | null>(null);

  const [exportOpen, setExportOpen] = useState(false);
  const [markOpen, setMarkOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [recordProgressPct, setRecordProgressPct] = useState(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [storyboardThumbs, setStoryboardThumbs] = useState<string[]>([]);
  const [dropping, setDropping] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  stateRef.current = state;
  shaderRef.current = shader;

  const flash = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  }, []);

  const buildState = useCallback((override?: Partial<RenderState>): RenderState => {
    const { doc: d } = stateRef.current;
    const params = currentParams(d);
    const colors = currentColors(d);
    const zScale = Math.max(0.25, 1 + d.transform.z * 0.45);
    return {
      effectId: d.effectId,
      effectKey: shaderRef.current.shader,
      mode: shaderRef.current.mode,
      params,
      colors: colors.length ? colors : ['#fafafa', '#0ea5e9', '#f59e0b'],
      filters: d.filters,
      scale: (d.transform.scale / 100) * zScale,
      rotate: d.transform.rotateZ,
      offset: [d.transform.x, d.transform.y],
      background: 'transparent',
      backgroundColor: d.canvas.backgroundColor,
      animate: d.animation.animate,
      easing: d.animation.easing,
      speed: d.animation.speed,
      startTime: d.animation.startTime,
      duration: d.animation.duration,
      loopMode: d.animation.loopMode ?? 'loop',
      ...override,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let renderer: StudioRenderer;
    try {
      renderer = new StudioRenderer(canvas);
    } catch (err) {
      flash((err as Error).message);
      return;
    }
    rendererRef.current = renderer;

    let raf = 0;
    startClockRef.current = performance.now();
    const loop = () => {
      const now = performance.now();
      timeRef.current = (now - startClockRef.current) / 1000;
      const curState = stateRef.current;
      const d = curState.doc;

      // Smoothly damp interactive pointer tilt
      pointerTiltRef.current.rx += (targetTiltRef.current.rx - pointerTiltRef.current.rx) * 0.14;
      pointerTiltRef.current.ry += (targetTiltRef.current.ry - pointerTiltRef.current.ry) * 0.14;

      const timing = computeAnimationTiming(d.animation, timeRef.current);
      const choreo = computeChoreographedTransform(
        d.transform,
        d.animation,
        timing.progress,
        d.animation.interactiveTilt !== false ? pointerTiltRef.current : { rx: 0, ry: 0 },
      );
      const zScale = Math.max(0.25, 1 + choreo.z * 0.45);

      try {
        renderer.render(
          buildState({
            scale: (choreo.scale / 100) * zScale,
            rotate: choreo.rotateZ,
            offset: [choreo.x, choreo.y],
          }),
          timeRef.current,
        );
      } catch (err) {
        console.error(err);
      }

      if (stageTransformRef.current) {
        const z = curState.ui.zoom / 100;
        stageTransformRef.current.style.transform = `perspective(1100px) scale(${z}) rotateX(${choreo.rotateX.toFixed(2)}deg) rotateY(${choreo.rotateY.toFixed(2)}deg)`;
      }

      if (timelineSliderRef.current && d.animation.animate) {
        timelineSliderRef.current.value = String(Math.round(timing.rawCycle * 1000));
      }
      if (timelineLabelRef.current) {
        const curSec = (timing.rawCycle * d.animation.duration).toFixed(2);
        const totSec = d.animation.duration.toFixed(1);
        const frameNum = Math.min(
          Math.round(d.animation.duration * 60),
          Math.floor(timing.rawCycle * d.animation.duration * 60) + 1,
        );
        timelineLabelRef.current.textContent = `${curSec}s / ${totSec}s · F${String(frameNum).padStart(2, '0')}`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      thumbStopRef.current?.();
      cancelAnimationFrame(raf);
      if (lastObjectUrlRef.current) {
        URL.revokeObjectURL(lastObjectUrlRef.current);
        lastObjectUrlRef.current = null;
      }
      renderer.dispose();
      rendererRef.current = null;
    };
  }, [buildState, flash]);

  // Synchronize shared project mark into WebGL2 SDF texture
  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer || !activeMark.svg) return;
    let alive = true;
    (async () => {
      try {
        const clean = sanitizeSvg(activeMark.svg);
        const blob = new Blob([clean], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        if (lastObjectUrlRef.current) URL.revokeObjectURL(lastObjectUrlRef.current);
        lastObjectUrlRef.current = url;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = url;
        await img.decode();
        if (!alive) return;
        logoRef.current = img;
        flipRef.current = false;
        renderer.setLogo(img, false);
        thumbStopRef.current?.();
        thumbStopRef.current = buildThumbnails(renderer, allEffectIds());
        dispatch({ type: 'setUI', patch: { logoName: activeMark.name } });
      } catch (err) {
        if (alive) flash((err as Error).message);
      }
    })();
    return () => {
      alive = false;
    };
  }, [activeMark, dispatch, flash]);

  // Build 8-phase storyboard thumbnails when entering Video Studio mode or switching effect
  useEffect(() => {
    if (stageMode !== 'video') return;
    const renderer = rendererRef.current;
    if (!renderer || !renderer.logoLoaded) return;
    const thumbs: string[] = [];
    const dur = Math.max(0.5, doc.animation.duration);
    for (let i = 0; i < 8; i++) {
      const tSec = (i / 8) * dur;
      try {
        const st = buildState({
          animate: false,
          startTime: tSec,
          background: 'color',
          backgroundColor: doc.canvas.backgroundColor || '#09090b',
        });
        thumbs.push(renderer.thumbnail(st, 0, 256, 112));
      } catch {
        thumbs.push('');
      }
    }
    setStoryboardThumbs(thumbs);
  }, [stageMode, doc.effectId, doc.animation.duration, doc.canvas.backgroundColor, buildState]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        dispatch({ type: e.shiftKey ? 'redo' : 'undo' });
      } else if (!meta && e.key === ' ') {
        e.preventDefault();
        dispatch({ type: 'setAnimation', patch: { animate: !stateRef.current.doc.animation.animate } });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dispatch]);

  const applyFile = useCallback(
    async (file: File) => {
      try {
        if (file.size === 0 || file.size > 10 * 1024 * 1024) {
          throw new Error('File size must be between 1 B and 10 MB.');
        }
        const ext = file.name.split('.').pop()?.toLowerCase();
        const renderer = rendererRef.current;
        if (!renderer) return;

        if (ext === 'svg') {
          const text = sanitizeSvg(await file.text());
          setActiveMark({
            id: `upload-${Date.now()}`,
            name: file.name,
            svg: text,
            source: 'upload',
          });
          flash(`${file.name} loaded`);
          return;
        }

        if (ext === 'png' && file.type === 'image/png') {
          const url = URL.createObjectURL(file);
          if (lastObjectUrlRef.current) URL.revokeObjectURL(lastObjectUrlRef.current);
          lastObjectUrlRef.current = url;
          const img = new Image();
          img.src = url;
          await img.decode();
          logoRef.current = img;
          flipRef.current = false;
          renderer.setLogo(img);
          thumbStopRef.current?.();
          thumbStopRef.current = buildThumbnails(renderer, allEffectIds());
          dispatch({ type: 'setUI', patch: { logoName: file.name } });
          flash(`${file.name} loaded`);
          return;
        }
        throw new Error('Choose an SVG or PNG file.');
      } catch (err) {
        flash((err as Error).message);
      }
    },
    [dispatch, flash, setActiveMark],
  );

  const onFlip = useCallback(() => {
    const img = logoRef.current;
    const renderer = rendererRef.current;
    if (!img || !renderer) return;
    flipRef.current = !flipRef.current;
    renderer.setLogo(img, flipRef.current);
  }, []);

  const seekToPhase = useCallback(
    (phase01: number) => {
      const clamped = Math.min(1, Math.max(0, phase01));
      const nextStart = Number((clamped * doc.animation.duration).toFixed(3));
      startClockRef.current = performance.now();
      timeRef.current = 0;
      dispatch({
        type: 'setAnimation',
        patch: { animate: false, startTime: nextStart },
      });
      if (timelineSliderRef.current) {
        timelineSliderRef.current.value = String(Math.round(clamped * 1000));
      }
    },
    [doc.animation.duration, dispatch],
  );

  const stepFrame = (deltaFrames: number) => {
    const stepSec = deltaFrames / 60;
    const cycle = Math.max(0.2, doc.animation.duration);
    const cur = doc.animation.animate
      ? (timeRef.current * doc.animation.speed + doc.animation.startTime) % cycle
      : doc.animation.startTime;
    const next = (((cur + stepSec) % cycle) + cycle) % cycle;
    seekToPhase(next / cycle);
  };

  const applyShowcase = useCallback(
    (sc: StudioFxShowcase) => {
      dispatch({ type: 'setEffect', id: sc.effectId });
      if (sc.colors && sc.colors.length > 0) {
        setTimeout(() => {
          dispatch({ type: 'setColorsAll', colors: sc.colors! });
        }, 0);
      }
      dispatch({
        type: 'setAnimation',
        patch: {
          animate: true,
          motionPreset: sc.motionPreset,
          motionIntensity: sc.motionIntensity,
          easing: sc.easing,
          duration: sc.duration,
        },
      });
      dispatch({
        type: 'setCanvas',
        patch: {
          backdrop: sc.backdrop,
          backgroundColor: sc.backgroundColor,
          background: sc.backdrop === 'transparent' ? 'transparent' : 'color',
        },
      });
      dispatch({
        type: 'setFiltersList',
        filters: applyFilterPresetToList(doc.filters, sc.filterPresetId),
      });
      dispatch({ type: 'setUI', patch: { stageMode: 'stage' } });
      flash(`Applied "${sc.label}" showcase`);
    },
    [dispatch, doc.filters, flash],
  );

  /**
   * Exports a 4x4 (16-frame) 2048x2048 flipbook sprite sheet PNG of the complete animation cycle.
   */
  const exportSpriteSheetPng = useCallback(async () => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    setBusy(true);
    setRecordProgressPct(5);
    try {
      const cols = 4;
      const rows = 4;
      const cellPx = 512;
      const sheetPx = cellPx * cols;
      const out = document.createElement('canvas');
      out.width = sheetPx;
      out.height = sheetPx;
      const ctx = out.getContext('2d')!;

      const cellCanvas = document.createElement('canvas');
      cellCanvas.width = cellPx;
      cellCanvas.height = cellPx;
      const cellCtx = cellCanvas.getContext('2d')!;

      const dur = Math.max(0.5, doc.animation.duration);
      const colors = currentColors(doc);
      const accentHex = colors[0] ?? designSystem.primaryHex;

      for (let i = 0; i < 16; i++) {
        const rawT = i / 16;
        const tSec = rawT * dur;
        const timing = computeAnimationTiming(
          { ...doc.animation, animate: false, startTime: tSec },
          0,
        );
        const choreo = computeChoreographedTransform(
          doc.transform,
          { ...doc.animation, animate: true },
          timing.progress,
        );
        const zScale = Math.max(0.25, 1 + choreo.z * 0.45);
        const st = buildState({
          animate: false,
          startTime: tSec,
          scale: (choreo.scale / 100) * zScale,
          rotate: choreo.rotateZ,
          offset: [choreo.x, choreo.y],
          background: 'transparent',
        });

        const snapBlob = await renderer.snapshot(st, 0, cellPx, cellPx);
        const bmp = await createImageBitmap(snapBlob);

        compositeLogoFxFrame({
          ctx: cellCtx,
          width: cellPx,
          height: cellPx,
          source: bmp,
          transform: choreo,
          backdropMode: doc.canvas.backdrop ?? 'spotlight',
          bgHex: doc.canvas.backgroundColor,
          accentHex,
          effectId: doc.effectId,
          params: currentParams(doc),
          darkTheme: theme === 'dark',
          brandName: designSystem.name,
          brandHandle: designSystem.handle,
        });
        bmp.close();

        const cx = (i % cols) * cellPx;
        const cy = Math.floor(i / cols) * cellPx;
        ctx.drawImage(cellCanvas, cx, cy);

        // Frame index badge
        ctx.fillStyle = 'rgba(9, 9, 11, 0.72)';
        ctx.fillRect(cx + 10, cy + 10, 74, 22);
        ctx.fillStyle = '#fafafa';
        ctx.font = '700 11px ui-monospace, monospace';
        ctx.fillText(`F${String(i + 1).padStart(2, '0')} · ${Math.round(rawT * 100)}%`, cx + 16, cy + 25);

        setRecordProgressPct(Math.round(((i + 1) / 16) * 100));
      }

      const finalBlob = await new Promise<Blob>((resolve) => out.toBlob((b) => resolve(b!), 'image/png'));
      download(finalBlob, `logofx-${doc.effectId.replace(/[:]/g, '-')}-4x4-spritesheet.png`);
      flash('Exported 16-Frame 4×4 Flipbook Sprite Sheet (2048×2048)');
    } catch (err) {
      flash((err as Error).message);
    } finally {
      setBusy(false);
      setRecordProgressPct(0);
    }
  }, [buildState, doc, designSystem.primaryHex, designSystem.name, designSystem.handle, theme, flash]);

  /**
   * Phase-locked video recorder that starts at exact t=0.00s, composites 3D choreography,
   * studio backdrop, and SocialOverlay at target aspect ratio and framerate (30 or 60fps).
   */
  const recordPhaseLockedVideo = useCallback(
    async ({
      aspect = doc.canvas.aspect ?? '1:1',
      fps = 60,
      loops = 1,
      mbps = 16,
      baseSize = 1080,
      transparent = false,
    }: {
      aspect?: StageAspectMode;
      fps?: 30 | 60;
      loops?: 1 | 2;
      mbps?: 8 | 16;
      baseSize?: number;
      transparent?: boolean;
    }) => {
      const renderer = rendererRef.current;
      if (!renderer) return;
      setBusy(true);
      setRecordProgressPct(1);

      const width = aspect === '16:9' ? Math.round((baseSize * 16) / 9) : baseSize;
      const height = aspect === '9:16' ? Math.round((baseSize * 16) / 9) : baseSize;

      const compCanvas = document.createElement('canvas');
      compCanvas.width = width;
      compCanvas.height = height;
      const compCtx = compCanvas.getContext('2d')!;

      const stream = compCanvas.captureStream(fps);
      const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';
      const recorder = new MediaRecorder(stream, {
        mimeType: mime,
        videoBitsPerSecond: mbps * 1_000_000,
      });
      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      const done = new Promise<Blob>((resolve) => {
        recorder.onstop = () => resolve(new Blob(chunks, { type: 'video/webm' }));
      });

      const totalSec = Math.max(0.5, doc.animation.duration) * loops;
      const colors = currentColors(doc);
      const accentHex = colors[0] ?? designSystem.primaryHex;
      const backdropMode: StageBackdropMode = transparent
        ? 'transparent'
        : doc.canvas.backdrop ?? 'spotlight';

      try {
        recorder.start();
        const t0 = performance.now();

        await new Promise<void>((resolve) => {
          const tick = () => {
            const elapsedSec = (performance.now() - t0) / 1000;
            if (elapsedSec >= totalSec) {
              setRecordProgressPct(100);
              resolve();
              return;
            }

            const animState = {
              ...doc.animation,
              animate: true,
              speed: 1,
              startTime: 0,
            };
            const timing = computeAnimationTiming(animState, elapsedSec);
            const choreo = computeChoreographedTransform(
              doc.transform,
              animState,
              timing.progress,
            );
            const zScale = Math.max(0.25, 1 + choreo.z * 0.45);

            renderer.render(
              buildState({
                animate: true,
                speed: 1,
                startTime: 0,
                scale: (choreo.scale / 100) * zScale,
                rotate: choreo.rotateZ,
                offset: [choreo.x, choreo.y],
                background: 'transparent',
              }),
              elapsedSec,
            );

            compositeLogoFxFrame({
              ctx: compCtx,
              width,
              height,
              source: renderer.rawCanvas,
              transform: choreo,
              backdropMode,
              bgHex: doc.canvas.backgroundColor,
              accentHex,
              effectId: doc.effectId,
              params: currentParams(doc),
              darkTheme: theme === 'dark',
              brandName: designSystem.name,
              brandHandle: designSystem.handle,
            });

            setRecordProgressPct(Math.min(99, Math.max(1, Math.round((elapsedSec / totalSec) * 100))));
            requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });

        recorder.stop();
        const blob = await done;
        const vidUrl = URL.createObjectURL(blob);
        setRecordedVideoUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return vidUrl;
        });
        download(blob, `logofx-${doc.effectId.replace(/[:]/g, '-')}-${aspect.replace(':', 'x')}-${fps}fps.webm`);
        flash(`Phase-locked ${fps}fps WebM video exported (${width}×${height})`);
      } catch (err) {
        flash((err as Error).message);
      } finally {
        setBusy(false);
        setRecordProgressPct(0);
      }
    },
    [buildState, doc, designSystem.primaryHex, designSystem.name, designSystem.handle, theme, flash],
  );

  const handleExport = useCallback(
    async (format: ExportFormat, size: number, transparent: boolean, videoOpts?: ExportVideoOptions) => {
      const renderer = rendererRef.current;
      if (!renderer) return;
      if (format === 'spritesheet') {
        setExportOpen(false);
        await exportSpriteSheetPng();
        return;
      }
      if (format === 'webm') {
        setExportOpen(false);
        await recordPhaseLockedVideo({
          aspect: doc.canvas.aspect ?? '1:1',
          fps: videoOpts?.fps ?? 60,
          loops: videoOpts?.loops ?? 1,
          mbps: 16,
          baseSize: Math.min(1920, size),
          transparent,
        });
        return;
      }

      setBusy(true);
      try {
        const timing = computeAnimationTiming(doc.animation, timeRef.current);
        const choreo = computeChoreographedTransform(doc.transform, doc.animation, timing.progress);
        const zScale = Math.max(0.25, 1 + choreo.z * 0.45);
        const renderState = buildState({
          background: 'transparent',
          scale: (choreo.scale / 100) * zScale,
          rotate: choreo.rotateZ,
          offset: [choreo.x, choreo.y],
        });

        const baseBlob = await renderer.snapshot(renderState, timeRef.current, size, size);
        const bmp = await createImageBitmap(baseBlob);
        const out = document.createElement('canvas');
        out.width = size;
        out.height = size;
        const ctx = out.getContext('2d')!;
        const colors = currentColors(doc);

        compositeLogoFxFrame({
          ctx,
          width: size,
          height: size,
          source: bmp,
          transform: choreo,
          backdropMode: transparent ? 'transparent' : doc.canvas.backdrop ?? 'spotlight',
          bgHex: doc.canvas.backgroundColor,
          accentHex: colors[0] ?? designSystem.primaryHex,
          effectId: doc.effectId,
          params: currentParams(doc),
          darkTheme: theme === 'dark',
          brandName: designSystem.name,
          brandHandle: designSystem.handle,
        });
        bmp.close();

        const finalBlob = await new Promise<Blob>((resolve) => out.toBlob((b) => resolve(b!), 'image/png'));
        download(finalBlob, `designsourcebook-${doc.effectId.replace(/[:]/g, '-')}-${size}.png`);
        flash(`PNG exported at ${size}×${size}px`);
        setExportOpen(false);
      } catch (err) {
        flash((err as Error).message);
      } finally {
        setBusy(false);
      }
    },
    [
      buildState,
      doc,
      flash,
      theme,
      designSystem.primaryHex,
      designSystem.name,
      designSystem.handle,
      exportSpriteSheetPng,
      recordPhaseLockedVideo,
    ],
  );

  const sharePreset = async () => {
    const payload = JSON.stringify(
      {
        mark: activeMark.name,
        effectId: doc.effectId,
        colors: currentColors(doc),
        params: currentParams(doc),
        transform: doc.transform,
        animation: doc.animation,
        canvas: doc.canvas,
        filters: doc.filters.filter((f) => f.enabled),
      },
      null,
      2,
    );
    try {
      await navigator.clipboard.writeText(payload);
      flash(`Copied ${doc.effectId} FX + Motion preset JSON`);
    } catch {
      download(new Blob([payload], { type: 'application/json' }), `logofx-${doc.effectId}.json`);
      flash('Downloaded FX preset JSON');
    }
  };

  const stageAspect = doc.canvas.aspect ?? '1:1';
  const stageBackdrop = doc.canvas.backdrop ?? 'spotlight';
  const stageColors = currentColors(doc);
  const stageAccent = stageColors[0] ?? designSystem.primaryHex;

  const stageBoxDims = useMemo(() => {
    if (stageAspect === '16:9') return { w: Math.round(STAGE * 1.28), h: Math.round((STAGE * 1.28 * 9) / 16) };
    if (stageAspect === '9:16') return { w: Math.round((STAGE * 9) / 14.5), h: Math.round(STAGE * 1.05) };
    return { w: STAGE, h: STAGE };
  }, [stageAspect]);

  const stageBackdropStyle = useMemo<React.CSSProperties>(() => {
    if (stageBackdrop === 'transparent') return {};
    const bg = doc.canvas.backgroundColor || '#09090b';
    if (stageBackdrop === 'spotlight') {
      return {
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle at 50% 45%, rgba(255,255,255,0.14) 0%, ${stageAccent}22 45%, rgba(0,0,0,0.55) 100%)`,
      };
    }
    if (stageBackdrop === 'aura') {
      return {
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle at 28% 28%, ${stageAccent}48 0%, transparent 58%), radial-gradient(circle at 74% 74%, rgba(99,102,241,0.32) 0%, transparent 58%)`,
      };
    }
    if (stageBackdrop === 'grid') {
      return {
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle at 50% 50%, ${stageAccent}22 0%, transparent 62%), linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`,
        backgroundSize: '100% 100%, 24px 24px, 24px 24px',
      };
    }
    return { backgroundColor: bg };
  }, [stageBackdrop, doc.canvas.backgroundColor, stageAccent]);

  const cycleLoopMode = () => {
    const order: LoopMode[] = ['loop', 'pingpong', 'once'];
    const cur = doc.animation.loopMode ?? 'loop';
    const next = order[(order.indexOf(cur) + 1) % order.length];
    dispatch({ type: 'setAnimation', patch: { loopMode: next } });
  };

  const cycleSpeed = () => {
    const speeds = [0.5, 1, 1.5, 2];
    const idx = speeds.findIndex((s) => Math.abs(s - doc.animation.speed) < 0.1);
    const next = speeds[(idx + 1) % speeds.length];
    dispatch({ type: 'setAnimation', patch: { speed: next } });
  };

  return (
    <div className="logo-studio" data-theme={theme}>
      <TopBar current="logofx" onShare={sharePreset} />
      <div className={`studio-workspace is-createx ${ui.collapsed ? 'is-collapsed' : ''}`}>
        <section className="studio-preview-column" aria-label="Logo effect preview">
          {/* Top Stage Bar: 3 Stage Views + Quick Backdrop / Motion Choreography */}
          <div className="createx-stage-bar" role="toolbar" aria-label="LogoFX stage mode and motion controls">
            <div className="createx-stage-modes" role="tablist" aria-label="LogoFX stage view">
              {(
                [
                  ['stage', 'Live Shader Stage'],
                  ['matrix', 'Effect Matrix (40+)'],
                  ['video', 'Motion & Video Studio'],
                ] as const
              ).map(([mId, mLabel]) => (
                <button
                  key={mId}
                  type="button"
                  role="tab"
                  aria-selected={stageMode === mId}
                  className={`createx-stage-mode-btn ${stageMode === mId ? 'is-active' : ''}`}
                  onClick={() => dispatch({ type: 'setUI', patch: { stageMode: mId } })}
                >
                  {mLabel}
                </button>
              ))}
            </div>

            {stageMode === 'stage' && (
              <div className="createx-overlay-controls">
                <span className="createx-overlay-label">Motion</span>
                <div className="createx-keyline-pills" role="group" aria-label="Quick 3D motion choreography">
                  {MOTION_PRESETS.slice(0, 6).map((mp) => (
                    <button
                      key={mp.id}
                      type="button"
                      className={`createx-mini-pill ${(doc.animation.motionPreset ?? 'float-3d') === mp.id ? 'is-active' : ''}`}
                      aria-pressed={(doc.animation.motionPreset ?? 'float-3d') === mp.id}
                      title={mp.description}
                      onClick={() =>
                        dispatch({
                          type: 'setAnimation',
                          patch: { motionPreset: mp.id as MotionPresetId, animate: true },
                        })
                      }
                    >
                      {mp.shortLabel}
                    </button>
                  ))}
                </div>
                <span className="createx-overlay-label" style={{ marginLeft: 4 }}>
                  Stage
                </span>
                <div className="createx-keyline-pills" role="group" aria-label="Stage backdrop environment">
                  {(
                    [
                      ['spotlight', 'Spotlight'],
                      ['grid', 'Grid'],
                      ['aura', 'Aura'],
                      ['transparent', 'Alpha'],
                    ] as [StageBackdropMode, string][]
                  ).map(([bm, blbl]) => (
                    <button
                      key={bm}
                      type="button"
                      className={`createx-mini-pill ${stageBackdrop === bm ? 'is-active' : ''}`}
                      aria-pressed={stageBackdrop === bm}
                      onClick={() =>
                        dispatch({
                          type: 'setCanvas',
                          patch: {
                            backdrop: bm,
                            background: bm === 'transparent' ? 'transparent' : 'color',
                          },
                        })
                      }
                    >
                      {blbl}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Keep WebGL viewport mounted at all times so WebGL2 context is never lost across tabs */}
          <div
            className="studio-viewport"
            style={{
              display: stageMode === 'stage' ? 'grid' : 'none',
              paddingBottom: 112,
              paddingTop: 48,
            }}
            onPointerMove={(e) => {
              if (doc.animation.interactiveTilt === false) return;
              const r = e.currentTarget.getBoundingClientRect();
              const nx = ((e.clientX - r.left) / Math.max(1, r.width) - 0.5) * 2;
              const ny = ((e.clientY - r.top) / Math.max(1, r.height) - 0.5) * 2;
              targetTiltRef.current = { rx: -ny * 14, ry: nx * 18 };
            }}
            onPointerLeave={() => {
              targetTiltRef.current = { rx: 0, ry: 0 };
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDropping(true);
            }}
            onDragLeave={() => setDropping(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDropping(false);
              const file = e.dataTransfer.files?.[0];
              if (file) applyFile(file);
            }}
          >
            <div
              className={`lfx-backdrop-frame ${stageBackdrop === 'transparent' ? 'is-transparent' : ''}`}
              style={{
                width: stageBoxDims.w,
                height: stageBoxDims.h,
                ...stageBackdropStyle,
              }}
            >
              <div
                ref={stageTransformRef}
                className="studio-stage"
                style={{
                  width: STAGE,
                  height: STAGE,
                  transformOrigin: 'center',
                }}
              >
                <canvas ref={canvasRef} width={1024} height={1024} aria-label="Logo effect canvas" />
                <SocialOverlay
                  effectId={doc.effectId}
                  params={currentParams(doc)}
                  size={STAGE}
                  dark={theme === 'dark'}
                  brandName={designSystem.name}
                  brandHandle={designSystem.handle}
                />
              </div>
            </div>
            {dropping && <div className="drop-overlay">Drop an SVG or PNG</div>}
          </div>

          {stageMode === 'stage' && (
            <>
              {/* Interactive Video Timeline & Keyframe Scrubber Bar */}
              <div className="lfx-timeline-bar" role="region" aria-label="Animation timeline and frame scrubber">
                <button
                  type="button"
                  className="lfx-tl-btn is-play"
                  aria-label={doc.animation.animate ? 'Pause animation' : 'Play animation'}
                  title={doc.animation.animate ? 'Pause (Space)' : 'Play (Space)'}
                  onClick={() => dispatch({ type: 'setAnimation', patch: { animate: !doc.animation.animate } })}
                >
                  <Icon name={doc.animation.animate ? 'pause' : 'play'} size={13} />
                </button>
                <button
                  type="button"
                  className="lfx-tl-btn"
                  title="Step backward 1 frame"
                  aria-label="Previous frame"
                  onClick={() => stepFrame(-1)}
                >
                  −1f
                </button>
                <button
                  type="button"
                  className="lfx-tl-btn"
                  title="Step forward 1 frame"
                  aria-label="Next frame"
                  onClick={() => stepFrame(1)}
                >
                  +1f
                </button>

                <input
                  ref={timelineSliderRef}
                  type="range"
                  className="lfx-tl-scrubber"
                  aria-label="Animation cycle scrubber"
                  min={0}
                  max={1000}
                  step={1}
                  defaultValue={0}
                  onChange={(e) => seekToPhase(Number(e.target.value) / 1000)}
                />

                <span ref={timelineLabelRef} className="lfx-tl-time">
                  0.00s / {doc.animation.duration.toFixed(1)}s · F01
                </span>

                <button
                  type="button"
                  className="lfx-tl-pill"
                  title="Cycle Loop Mode (Seamless Loop / Ping-Pong / One-Shot)"
                  onClick={cycleLoopMode}
                >
                  {(doc.animation.loopMode ?? 'loop') === 'loop'
                    ? 'Loop ↻'
                    : doc.animation.loopMode === 'pingpong'
                      ? 'Bounce ⇄'
                      : 'Once →'}
                </button>

                <button
                  type="button"
                  className="lfx-tl-pill"
                  title="Cycle playback speed multiplier"
                  onClick={cycleSpeed}
                >
                  {doc.animation.speed}×
                </button>

                <button
                  type="button"
                  className="lfx-tl-pill is-record"
                  disabled={busy}
                  title="Record phase-locked 60fps WebM video loop"
                  onClick={() =>
                    void recordPhaseLockedVideo({
                      aspect: stageAspect,
                      fps: 60,
                      loops: 1,
                      mbps: 16,
                    })
                  }
                >
                  <Icon name="video" size={12} />
                  <span>{busy ? `${recordProgressPct}%` : 'Rec 60fps'}</span>
                </button>
              </div>

              <Toolbar
                onPickMark={() => setMarkOpen(true)}
                onUpload={() => fileRef.current?.click()}
                onExport={() => setExportOpen(true)}
                onFlip={onFlip}
              />
            </>
          )}

          {stageMode === 'matrix' && (
            <LogoFxMatrixView
              currentEffectId={doc.effectId}
              markName={activeMark.name}
              onSelectEffect={(id) => {
                dispatch({ type: 'setEffect', id });
                dispatch({ type: 'setUI', patch: { stageMode: 'stage' } });
              }}
              onApplyShowcase={applyShowcase}
            />
          )}

          {stageMode === 'video' && (
            <LogoFxVideoStudio
              effectId={doc.effectId}
              markName={activeMark.name}
              animation={doc.animation}
              transform={doc.transform}
              canvasState={doc.canvas}
              recording={busy}
              recordProgressPct={recordProgressPct}
              recordedVideoUrl={recordedVideoUrl}
              storyboardThumbs={storyboardThumbs}
              onPatchAnimation={(patch) => dispatch({ type: 'setAnimation', patch })}
              onPatchCanvas={(patch) => dispatch({ type: 'setCanvas', patch })}
              onRecordVideo={(opts) =>
                void recordPhaseLockedVideo({
                  aspect: opts.aspect,
                  fps: opts.fps,
                  loops: opts.loops,
                  mbps: opts.mbps,
                })
              }
              onExportSpriteSheet={() => void exportSpriteSheetPng()}
              onSeekPhase={(p01) => {
                seekToPhase(p01);
                flash(`Scrubbed to ${Math.round(p01 * 100)}% phase (${(p01 * doc.animation.duration).toFixed(2)}s)`);
              }}
            />
          )}
        </section>

        <Inspector />
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/svg+xml,image/png,.svg,.png"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) applyFile(file);
          e.target.value = '';
        }}
      />

      <ExportDialog
        open={exportOpen}
        busy={busy}
        progressPct={recordProgressPct}
        defaultSize={doc.canvas.width}
        onClose={() => setExportOpen(false)}
        onExport={handleExport}
      />
      <MarkPickerDialog
        open={markOpen}
        onClose={() => setMarkOpen(false)}
        onSelect={setActiveMark}
        onUploadFile={() => fileRef.current?.click()}
      />
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
