import { useCallback, useEffect, useRef, useState } from 'react';
import { Inspector } from './Inspector';
import { TopBar } from './TopBar';
import { Toolbar } from './Toolbar';
import { SocialOverlay, paintSocialOverlay } from './SocialOverlay';
import { ExportDialog, MarkPickerDialog, type ExportFormat } from './Dialogs';
import { StudioRenderer, type RenderState } from '../engine/renderer';
import { sanitizeSvg } from '../engine/svgAnatomy';
import { allEffectIds, buildThumbnails } from '../engine/thumbs';
import { currentColors, currentParams, useStudio } from '../state/studio';
import { useProject } from '../state/project';

const STAGE = 480;

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function Studio() {
  const { state, dispatch, shader } = useStudio();
  const { theme, activeMark, setActiveMark } = useProject();
  const { doc, ui } = state;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<StudioRenderer | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef(state);
  const shaderRef = useRef(shader);
  const timeRef = useRef(0);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const flipRef = useRef(false);
  const thumbStopRef = useRef<(() => void) | null>(null);
  const lastObjectUrlRef = useRef<string | null>(null);

  const [exportOpen, setExportOpen] = useState(false);
  const [markOpen, setMarkOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [dropping, setDropping] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  stateRef.current = state;
  shaderRef.current = shader;

  const flash = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
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
      background: d.canvas.background,
      backgroundColor: d.canvas.backgroundColor,
      animate: d.animation.animate,
      easing: d.animation.easing,
      speed: d.animation.speed,
      startTime: d.animation.startTime,
      duration: d.animation.duration,
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
    const start = performance.now();
    const loop = () => {
      timeRef.current = (performance.now() - start) / 1000;
      try {
        renderer.render(buildState(), timeRef.current);
      } catch (err) {
        console.error(err);
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

  // Synchronize shared project mark (Design Sourcebook, Logo Maker, LogoDB, Upload) into WebGL2 SDF texture
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
    return () => { alive = false; };
  }, [activeMark, dispatch, flash]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      const meta = e.metaKey || e.ctrlKey;
      if (!meta) return;
      if (e.key.toLowerCase() === 'z') {
        e.preventDefault();
        dispatch({ type: e.shiftKey ? 'redo' : 'undo' });
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

  const handleExport = useCallback(
    async (format: ExportFormat, size: number, transparent: boolean) => {
      const renderer = rendererRef.current;
      if (!renderer) return;
      setBusy(true);
      const renderState = buildState({
        background: transparent ? 'transparent' : 'color',
      });
      try {
        if (format === 'png') {
          const baseBlob = await renderer.snapshot(renderState, timeRef.current, size, size);
          // Composite 3D rotation foreshortening + SocialOverlay cleanly onto export canvas
          const bmp = await createImageBitmap(baseBlob);
          const out = document.createElement('canvas');
          out.width = size;
          out.height = size;
          const ctx = out.getContext('2d')!;
          const cosX = Math.max(0.25, Math.cos((doc.transform.rotateX * Math.PI) / 180));
          const cosY = Math.max(0.25, Math.cos((doc.transform.rotateY * Math.PI) / 180));
          ctx.save();
          ctx.translate(size / 2, size / 2);
          ctx.scale(cosY, cosX);
          ctx.drawImage(bmp, -size / 2, -size / 2, size, size);
          ctx.restore();
          bmp.close();

          paintSocialOverlay(ctx, doc.effectId, currentParams(doc), size, theme === 'dark');
          const finalBlob = await new Promise<Blob>((resolve) => out.toBlob((b) => resolve(b!), 'image/png'));
          download(finalBlob, `designsourcebook-${doc.effectId.replace(/[:]/g, '-')}-${size}.png`);
          flash(`PNG exported at ${size}px`);
        } else {
          const canvas = renderer.rawCanvas;
          const stream = canvas.captureStream(30);
          const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
            ? 'video/webm;codecs=vp9'
            : 'video/webm';
          const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 8_000_000 });
          const chunks: BlobPart[] = [];
          recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
          const done = new Promise<Blob>((resolve) => {
            recorder.onstop = () => resolve(new Blob(chunks, { type: 'video/webm' }));
          });
          recorder.start();
          await new Promise((r) => window.setTimeout(r, doc.animation.duration * 1000));
          recorder.stop();
          const blob = await done;
          download(blob, `designsourcebook-${doc.effectId.replace(/[:]/g, '-')}.webm`);
          flash('WebM video recorded');
        }
        setExportOpen(false);
      } catch (err) {
        flash((err as Error).message);
      } finally {
        setBusy(false);
      }
    },
    [buildState, doc, flash, theme],
  );

  const sharePreset = async () => {
    const payload = JSON.stringify({
      mark: activeMark.name,
      effectId: doc.effectId,
      colors: currentColors(doc),
      params: currentParams(doc),
      transform: doc.transform,
      animation: doc.animation,
    }, null, 2);
    try {
      await navigator.clipboard.writeText(payload);
      flash(`Copied ${doc.effectId} FX preset JSON`);
    } catch {
      download(new Blob([payload], { type: 'application/json' }), `logofx-${doc.effectId}.json`);
      flash('Downloaded FX preset JSON');
    }
  };

  return (
    <div className="logo-studio" data-theme={theme}>
      <div className={`studio-workspace ${ui.collapsed ? 'is-collapsed' : ''}`}>
        <section className="studio-preview-column" aria-label="Logo effect preview">
          <TopBar current="logofx" onShare={sharePreset} />

          <div
            className="studio-viewport"
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
              className="studio-stage"
              style={{
                width: STAGE,
                height: STAGE,
                transform: `perspective(1100px) scale(${ui.zoom / 100}) rotateX(${doc.transform.rotateX}deg) rotateY(${doc.transform.rotateY}deg)`,
                transformOrigin: 'center',
              }}
            >
              <canvas ref={canvasRef} width={1024} height={1024} aria-label="Logo effect canvas" />
              <SocialOverlay effectId={doc.effectId} params={currentParams(doc)} size={STAGE} dark={theme === 'dark'} />
            </div>
            {dropping && <div className="drop-overlay">Drop an SVG or PNG</div>}
          </div>

          <Toolbar
            onPickMark={() => setMarkOpen(true)}
            onUpload={() => fileRef.current?.click()}
            onExport={() => setExportOpen(true)}
            onFlip={onFlip}
          />
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
