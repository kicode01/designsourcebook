import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Icon } from '../components/icons';
import { DsSelect } from '../components/DsSelect';
import { MarkPickerDialog } from '../components/Dialogs';
import { FONT_OPTIONS, exportDesignSystem, fontStyleFor, resolveFontOption, wcagContrast } from '../engine/dsEngine';
import { adaptSvgPaintForSurface, inspectSvgPaint } from '../engine/svgPaint';
import { useProject } from '../state/project';

type TileKind =
  | 'wordmark'
  | 'mark'
  | 'palette'
  | 'type'
  | 'pattern'
  | 'social'
  | 'appicon'
  | 'ui'
  | 'ogcard'
  | 'photo';

type PatternStyle = 'dots' | 'codex' | 'grid' | 'rings';
type SurfaceFx = 'flat' | 'blueprint' | 'grain' | 'brutalist';
type PhotoFx = 'natural' | 'duotone' | 'mono';

interface Tile {
  id: string;
  kind: TileKind;
  label: string;
}

interface Brand {
  name: string;
  tagline: string;
  accent: string;
  secondary: string;
  background: string;
  ink: string;
  displayFont: string;
  bodyFont: string;
  radiusPx: number;
  palette: string[];
  handle: string;
  pattern: PatternStyle;
  surfaceFx: SurfaceFx;
  photoFx: PhotoFx;
}

interface Doc {
  brand: Brand;
  tiles: Tile[];
}

const KINDS: { id: TileKind; label: string }[] = [
  { id: 'wordmark', label: 'Wordmark' },
  { id: 'mark', label: 'Logo Mark' },
  { id: 'palette', label: 'Palette' },
  { id: 'type', label: 'Type' },
  { id: 'pattern', label: 'Pattern' },
  { id: 'appicon', label: 'App Icons' },
  { id: 'ui', label: 'UI Tokens' },
  { id: 'social', label: 'Social' },
  { id: 'ogcard', label: 'OG Card' },
  { id: 'photo', label: 'Photo' },
];

const INITIAL_TILES: Tile[] = [
  { id: 't1', kind: 'wordmark', label: 'Wordmark' },
  { id: 't2', kind: 'mark', label: 'Mark' },
  { id: 't3', kind: 'palette', label: 'Palette' },
  { id: 't4', kind: 'type', label: 'Typography' },
  { id: 't5', kind: 'pattern', label: 'BrandFx Pattern' },
  { id: 't6', kind: 'appicon', label: 'Favicon & App' },
];

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function fitSvg(svgText: string, inkHex: string, scopePrefix?: string, forceMono = false): string {
  const colored = forceMono
    ? svgText
        .replace(/currentColor/gi, inkHex)
        .replace(/fill="#?(?:ffffff|fafafa|f4f4f5|000000|09090b|111111|111113)"/gi, `fill="${inkHex}"`)
        .replace(/stroke="#?(?:ffffff|fafafa|f4f4f5|000000|09090b|111111|111113)"/gi, `stroke="${inkHex}"`)
    : adaptSvgPaintForSurface(svgText, inkHex, scopePrefix);
  let out = colored
    .replace(/\swidth="[^"]*"/i, ' width="100%"')
    .replace(/\sheight="[^"]*"/i, ' height="100%"');
  if (!/\swidth=/i.test(out)) out = out.replace(/<svg\b/i, '<svg width="100%"');
  if (!/\sheight=/i.test(out)) out = out.replace(/<svg\b/i, '<svg height="100%"');
  return out;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function TileBody({
  kind,
  brand,
  photo,
  markSvg,
}: {
  kind: TileKind;
  brand: Brand;
  photo: string | null;
  markSvg: string;
}) {
  const fontPreset = resolveFontOption(brand.displayFont, 'display');
  const fontName = fontPreset.label;
  const displayStyle = fontStyleFor(brand.displayFont, 'display');
  const contrastRatio = wcagContrast(brand.ink, brand.background);

  switch (kind) {
    case 'wordmark':
      return (
        <div className="bx-wordmark" style={displayStyle}>
          <span style={{ color: brand.ink }}>{brand.name}</span>
          <small style={{ color: brand.ink, opacity: 0.6 }}>{brand.tagline}</small>
        </div>
      );
    case 'mark':
      return (
        <div
          className="bx-mark"
          style={{ width: 72, height: 72, overflow: 'hidden', color: brand.accent }}
          dangerouslySetInnerHTML={{
            __html: fitSvg(markSvg, brand.accent, 'bx-mark-'),
          }}
        />
      );
    case 'palette':
      return (
        <div className="bx-palette">
          {brand.palette.map((c, i) => (
            <div key={i} style={{ minWidth: 0, display: 'grid', gap: '2.2cqw' }}>
              <div className="bx-swatch" style={{ background: c }} title={c} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '4.1cqw',
                  lineHeight: 1.2,
                  color: brand.ink,
                  opacity: 0.68,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {c}
              </span>
            </div>
          ))}
        </div>
      );
    case 'type':
      return (
        <div className="bx-type" style={{ color: brand.ink, ...displayStyle }}>
          <span className="bx-type-a">Aa</span>
          <small>{fontName} · {contrastRatio}:1 contrast</small>
        </div>
      );
    case 'pattern': {
      let bg = `radial-gradient(circle, ${brand.accent} 1.3px, transparent 1.7px)`;
      let bgSize = '18px 18px';
      if (brand.pattern === 'codex') {
        bg = `repeating-linear-gradient(-15deg, ${brand.accent}33 0 6px, transparent 6px 18px)`;
        bgSize = '24px 24px';
      } else if (brand.pattern === 'grid') {
        bg = `linear-gradient(${brand.accent}28 1px, transparent 1px), linear-gradient(90deg, ${brand.accent}28 1px, transparent 1px)`;
        bgSize = '20px 20px';
      } else if (brand.pattern === 'rings') {
        bg = `repeating-radial-gradient(circle at 50% 50%, ${brand.accent}38 0 1px, transparent 1px 14px)`;
        bgSize = '100% 100%';
      }
      return <div className="bx-pattern" style={{ backgroundImage: bg, backgroundSize: bgSize }} />;
    }
    case 'appicon': {
      const onAccent = wcagContrast('#09090b', brand.accent) > 4 ? '#09090b' : '#ffffff';
      const isChromatic = inspectSvgPaint(markSvg).kind !== 'monochrome';
      return (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 14,
              background: isChromatic ? brand.background : brand.accent,
              border: isChromatic ? `1px solid ${brand.ink}28` : undefined,
              display: 'grid',
              placeItems: 'center',
              padding: 12,
              overflow: 'hidden',
            }}
            dangerouslySetInnerHTML={{ __html: fitSvg(markSvg, onAccent, 'bx-app-1-') }}
          />
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: brand.background,
              border: `1px solid ${brand.ink}28`,
              display: 'grid',
              placeItems: 'center',
              padding: 6,
              overflow: 'hidden',
            }}
            dangerouslySetInnerHTML={{ __html: fitSvg(markSvg, brand.ink, 'bx-app-2-') }}
          />
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 5,
              background: brand.ink,
              display: 'grid',
              placeItems: 'center',
              padding: 3,
              overflow: 'hidden',
            }}
            dangerouslySetInnerHTML={{ __html: fitSvg(markSvg, brand.background, 'bx-app-3-') }}
          />
        </div>
      );
    }
    case 'ui':
      return (
        <div style={{ display: 'grid', gap: 8, width: '100%' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span
              style={{
                padding: '5px 11px',
                borderRadius: brand.radiusPx,
                background: brand.accent,
                color: wcagContrast('#09090b', brand.accent) > 4.5 ? '#09090b' : '#ffffff',
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              Primary Action
            </span>
            <span
              style={{
                padding: '4px 9px',
                borderRadius: 999,
                border: `1px solid ${brand.ink}33`,
                color: brand.ink,
                fontSize: 10.5,
              }}
            >
              r={brand.radiusPx}px
            </span>
          </div>
          <div
            style={{
              padding: '7px 10px',
              borderRadius: brand.radiusPx,
              border: `1px solid ${brand.ink}28`,
              color: brand.ink,
              opacity: 0.72,
              fontSize: 11,
            }}
          >
            search@{(brand.name || 'brand').toLowerCase().replace(/\s+/g, '')}.io
          </div>
        </div>
      );
    case 'social':
      return (
        <div className="bx-social">
          <span
            className="bx-avatar"
            style={{
              background: brand.accent,
              color: wcagContrast('#09090b', brand.accent) > 4.5 ? '#09090b' : '#ffffff',
            }}
          >
            <span className="bx-avatar-initial">{brand.name.charAt(0).toUpperCase()}</span>
          </span>
          <div>
            <strong style={{ color: brand.ink }}>{brand.handle}</strong>
            <small style={{ color: brand.ink, opacity: 0.55 }}>{brand.name}</small>
          </div>
        </div>
      );
    case 'ogcard':
      return (
        <div
          style={{
            width: '100%',
            padding: 12,
            borderRadius: brand.radiusPx,
            border: `1px solid ${brand.ink}22`,
            background: `${brand.accent}18`,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            textAlign: 'left',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: brand.accent }}>OPEN GRAPH 1200×630</span>
          <strong style={{ color: brand.ink, ...displayStyle, fontSize: 14 }}>{brand.name}</strong>
          <small style={{ color: brand.ink, opacity: 0.65, fontSize: 11 }}>{brand.tagline}</small>
        </div>
      );
    case 'photo':
      return photo ? (
        <img
          className="bx-photo"
          src={photo}
          alt="Brand art direction photography"
          style={{
            borderRadius: Math.max(4, brand.radiusPx),
            filter:
              brand.photoFx === 'mono'
                ? 'grayscale(1) contrast(1.22)'
                : brand.photoFx === 'duotone'
                  ? 'grayscale(1) contrast(1.25) sepia(0.35)'
                  : undefined,
          }}
        />
      ) : (
        <div className="bx-empty" style={{ color: brand.ink }}>
          <Icon name="image" size={22} />
          <span>Upload photography</span>
        </div>
      );
  }
}

export function BrandX() {
  const { theme, designSystem, compiledSystem, activeMark, setActiveMark } = useProject();
  const [markOpen, setMarkOpen] = useState(false);

  const initialBrand = useMemo<Brand>(() => ({
    name: designSystem.name,
    tagline: designSystem.tagline,
    accent: compiledSystem.semantic.brand,
    secondary: compiledSystem.semantic.secondary,
    background: compiledSystem.semantic.canvas,
    ink: compiledSystem.semantic.ink,
    displayFont: designSystem.displayFont,
    bodyFont: designSystem.bodyFont,
    radiusPx: designSystem.baseRadiusPx,
    palette: [
      compiledSystem.semantic.brand,
      compiledSystem.semantic.secondary,
      compiledSystem.semantic.accent,
      compiledSystem.semantic.ink,
    ],
    handle: designSystem.handle,
    pattern: 'codex',
    surfaceFx: 'blueprint',
    photoFx: 'natural',
  }), [designSystem, compiledSystem]);

  const [doc, setDoc] = useState<Doc>(() => ({ brand: initialBrand, tiles: INITIAL_TILES }));
  const [tab, setTab] = useState<'tile' | 'brandfx' | 'general'>('tile');
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [photo, setPhoto] = useState<string | null>(null);
  const [past, setPast] = useState<Doc[]>([]);
  const [future, setFuture] = useState<Doc[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const dragFrom = useRef<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const flash = useCallback((m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const commit = useCallback(
    (next: Doc) => {
      setPast((p) => [...p.slice(-49), doc]);
      setFuture([]);
      setDoc(next);
    },
    [doc],
  );

  const patchBrand = (patch: Partial<Brand>) => commit({ ...doc, brand: { ...doc.brand, ...patch } });
  const patchTile = (index: number, patch: Partial<Tile>) =>
    commit({ ...doc, tiles: doc.tiles.map((t, i) => (i === index ? { ...t, ...patch } : t)) });

  const syncFromSystemMaker = () => {
    patchBrand({
      name: designSystem.name,
      tagline: designSystem.tagline,
      accent: compiledSystem.semantic.brand,
      secondary: compiledSystem.semantic.secondary,
      background: compiledSystem.semantic.canvas,
      ink: compiledSystem.semantic.ink,
      displayFont: designSystem.displayFont,
      bodyFont: designSystem.bodyFont,
      radiusPx: designSystem.baseRadiusPx,
      palette: [
        compiledSystem.semantic.brand,
        compiledSystem.semantic.secondary,
        compiledSystem.semantic.accent,
        compiledSystem.semantic.ink,
      ],
      handle: designSystem.handle,
    });
    flash(`Synced "${designSystem.name}" & mark "${activeMark.name}"`);
  };

  const undo = useCallback(() => {
    setPast((p) => {
      if (!p.length) return p;
      setFuture((f) => [doc, ...f]);
      setDoc(p[p.length - 1]);
      return p.slice(0, -1);
    });
  }, [doc]);

  const redo = useCallback(() => {
    setFuture((f) => {
      if (!f.length) return f;
      setPast((p) => [...p, doc]);
      setDoc(f[0]);
      return f.slice(1);
    });
  }, [doc]);

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
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, redo]);

  const reorder = (from: number, to: number) => {
    if (from === to) return;
    const tiles = [...doc.tiles];
    const [moved] = tiles.splice(from, 1);
    tiles.splice(to, 0, moved);
    commit({ ...doc, tiles });
    setSelected(to);
  };

  const onFile = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhoto((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
    const idx = doc.tiles.findIndex((t) => t.kind === 'photo');
    if (idx === -1) {
      commit({ ...doc, tiles: [...doc.tiles, { id: `t${Date.now()}`, kind: 'photo', label: 'Photo' }] });
    }
    flash('Photo added to brand board');
  };

  useEffect(() => () => {
    if (photo) URL.revokeObjectURL(photo);
  }, [photo]);

  const exportPng = async () => {
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      await document.fonts.ready;
    }
    const px = 1500;
    const canvas = document.createElement('canvas');
    canvas.width = px;
    canvas.height = px;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { brand, tiles } = doc;

    ctx.fillStyle = brand.background;
    ctx.fillRect(0, 0, px, px);

    if (brand.surfaceFx === 'blueprint') {
      ctx.strokeStyle = brand.ink;
      ctx.globalAlpha = 0.05;
      for (let g = 0; g < px; g += 48) {
        ctx.beginPath();
        ctx.moveTo(g, 0);
        ctx.lineTo(g, px);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, g);
        ctx.lineTo(px, g);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    const markUrl = URL.createObjectURL(
      new Blob([adaptSvgPaintForSurface(activeMark.svg, brand.accent, 'bx-exp-1-')], { type: 'image/svg+xml' }),
    );
    const markDarkUrl = URL.createObjectURL(
      new Blob(
        [
          adaptSvgPaintForSurface(
            activeMark.svg,
            wcagContrast('#09090b', brand.accent) > 4 ? '#09090b' : '#ffffff',
            'bx-exp-2-',
          ),
        ],
        { type: 'image/svg+xml' },
      ),
    );
    let markImg: HTMLImageElement | null = null;
    let markOnAccentImg: HTMLImageElement | null = null;
    let photoImg: HTMLImageElement | null = null;
    try {
      markImg = await loadImage(markUrl);
      markOnAccentImg = await loadImage(markDarkUrl);
      if (photo) photoImg = await loadImage(photo);
    } catch { /* ignore */ } finally {
      URL.revokeObjectURL(markUrl);
      URL.revokeObjectURL(markDarkUrl);
    }

    const pad = px * 0.055;
    const gap = px * 0.022;
    const cols = 3;
    const rows = 2;
    const w = (px - pad * 2 - gap * (cols - 1)) / cols;
    const h = (px - pad * 2 - gap * (rows - 1)) / rows;

    tiles.slice(0, 6).forEach((tile, i) => {
      const x = pad + (i % cols) * (w + gap);
      const y = pad + Math.floor(i / cols) * (h + gap);
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, Math.max(8, brand.radiusPx * 2));
      ctx.fillStyle = brand.ink;
      ctx.globalAlpha = 0.055;
      ctx.fill();
      ctx.globalAlpha = 1;
      if (brand.surfaceFx === 'brutalist') {
        ctx.lineWidth = 3;
        ctx.strokeStyle = brand.ink;
        ctx.stroke();
      }
      ctx.clip();

      const cx = x + w / 2;
      const cy = y + h / 2;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (tile.kind === 'wordmark') {
        ctx.fillStyle = brand.ink;
        ctx.font = `600 ${Math.round(w * 0.12)}px "Allo", system-ui, sans-serif`;
        ctx.fillText(brand.name, cx, cy - w * 0.03);
        ctx.globalAlpha = 0.58;
        ctx.font = `400 ${Math.round(w * 0.048)}px "Allo", system-ui, sans-serif`;
        ctx.fillText(brand.tagline, cx, cy + w * 0.06);
      } else if (tile.kind === 'mark' && markImg) {
        const ms = Math.min(w, h) * 0.42;
        ctx.drawImage(markImg, cx - ms / 2, cy - ms / 2, ms, ms);
      } else if (tile.kind === 'palette') {
        const sw = (w * 0.84) / brand.palette.length;
        brand.palette.forEach((c, k) => {
          ctx.fillStyle = c;
          ctx.beginPath();
          ctx.roundRect(x + w * 0.08 + k * sw, cy - h * 0.16, sw * 0.86, h * 0.32, 10);
          ctx.fill();
        });
      } else if (tile.kind === 'type') {
        ctx.fillStyle = brand.ink;
        ctx.font = `600 ${Math.round(w * 0.28)}px "Allo", system-ui, sans-serif`;
        ctx.fillText('Aa', cx, cy - h * 0.05);
        ctx.globalAlpha = 0.58;
        ctx.font = `400 ${Math.round(w * 0.045)}px "Allo", system-ui, sans-serif`;
        ctx.fillText(resolveFontOption(brand.displayFont, 'display').label, cx, cy + h * 0.18);
      } else if (tile.kind === 'pattern') {
        ctx.fillStyle = brand.accent;
        const step = w * 0.055;
        for (let gx = x; gx < x + w; gx += step) {
          for (let gy = y; gy < y + h; gy += step) {
            ctx.beginPath();
            ctx.arc(gx + step / 2, gy + step / 2, 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (tile.kind === 'appicon' && markOnAccentImg) {
        const as = Math.min(w, h) * 0.36;
        ctx.fillStyle = brand.accent;
        ctx.beginPath();
        ctx.roundRect(cx - as / 2, cy - as / 2, as, as, as * 0.24);
        ctx.fill();
        ctx.drawImage(markOnAccentImg, cx - as * 0.32, cy - as * 0.32, as * 0.64, as * 0.64);
      } else if (tile.kind === 'social') {
        ctx.fillStyle = brand.accent;
        ctx.beginPath();
        ctx.arc(cx, cy - h * 0.08, w * 0.09, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = wcagContrast('#09090b', brand.accent) > 4.5 ? '#09090b' : '#ffffff';
        ctx.font = `700 ${Math.round(w * 0.1)}px "Allo", system-ui, sans-serif`;
        ctx.fillText(brand.name.charAt(0).toUpperCase(), cx, cy - h * 0.08);
        ctx.fillStyle = brand.ink;
        ctx.font = `600 ${Math.round(w * 0.07)}px "Allo", system-ui, sans-serif`;
        ctx.fillText(brand.handle, cx, cy + h * 0.14);
      } else if (tile.kind === 'ogcard') {
        ctx.fillStyle = brand.accent;
        ctx.font = `600 ${Math.round(w * 0.04)}px "Allo", system-ui, sans-serif`;
        ctx.fillText('OPEN GRAPH 1200×630', cx, cy - h * 0.12);
        ctx.fillStyle = brand.ink;
        ctx.font = `700 ${Math.round(w * 0.1)}px "Allo", system-ui, sans-serif`;
        ctx.fillText(brand.name, cx, cy + h * 0.02);
      } else if (tile.kind === 'ui') {
        ctx.fillStyle = brand.accent;
        ctx.beginPath();
        ctx.roundRect(cx - w * 0.25, cy - 22, w * 0.5, 44, brand.radiusPx);
        ctx.fill();
        ctx.fillStyle = wcagContrast('#09090b', brand.accent) > 4.5 ? '#09090b' : '#ffffff';
        ctx.font = `600 ${Math.round(w * 0.05)}px "Allo", system-ui, sans-serif`;
        ctx.fillText('Primary CTA', cx, cy);
      } else if (tile.kind === 'photo' && photoImg) {
        // Real aspect-fill cover crop of uploaded photography (fixes broken blank grey box!)
        const ratio = Math.max(w / photoImg.width, h / photoImg.height);
        const dw = photoImg.width * ratio;
        const dh = photoImg.height * ratio;
        if (brand.photoFx !== 'natural') ctx.filter = 'grayscale(1) contrast(1.22)';
        ctx.drawImage(photoImg, cx - dw / 2, cy - dh / 2, dw, dh);
        ctx.filter = 'none';
      }
      ctx.restore();
    });

    canvas.toBlob((blob) => {
      if (blob) {
        download(blob, `${brand.name.toLowerCase().replace(/\s+/g, '-')}-brand-board.png`);
        flash('Brand Board exported at 1500×1500');
      }
    }, 'image/png');
  };

  const exportBrandMd = () => {
    const css = exportDesignSystem(designSystem, compiledSystem, 'css');
    const md = [
      `# ${doc.brand.name} — Brand Kit`,
      ``,
      `- Tagline: ${doc.brand.tagline}`,
      `- Social Handle: ${doc.brand.handle}`,
      `- Active Logo Mark: ${activeMark.name}`,
      `- Pattern Style (BrandFx): ${doc.brand.pattern} · Surface Finish: ${doc.brand.surfaceFx}`,
      `- Primary Palette: ${doc.brand.palette.join(', ')}`,
      ``,
      `## Design Tokens CSS`,
      '```css',
      css,
      '```',
      ``,
      `## Logo Vector Master (SVG)`,
      '```svg',
      adaptSvgPaintForSurface(activeMark.svg, doc.brand.accent),
      '```',
    ].join('\n');
    download(new Blob([md], { type: 'text/markdown' }), `${doc.brand.name.toLowerCase().replace(/\s+/g, '-')}-BRAND.md`);
    flash('Exported BRAND.md + tokens + SVG');
  };

  const current = doc.tiles[selected];

  return (
    <div className="logo-studio" data-theme={theme}>
      <div className="page-workspace">
        <section className="studio-preview-column" aria-label="Brand Maker & BrandFx">
          <TopBar current="brand" onShare={exportBrandMd} />

          <div className="page-canvas-area">
            <div
              className="brandx-board"
              style={{
                ['--zoom' as string]: zoom / 100,
                background: doc.brand.background,
                backgroundImage:
                  doc.brand.surfaceFx === 'blueprint'
                    ? `linear-gradient(${doc.brand.ink}11 1px, transparent 1px), linear-gradient(90deg, ${doc.brand.ink}11 1px, transparent 1px)`
                    : doc.brand.surfaceFx === 'grain'
                      ? `radial-gradient(${doc.brand.ink}18 1px, transparent 0)`
                      : undefined,
                backgroundSize: doc.brand.surfaceFx === 'blueprint' ? '28px 28px' : '6px 6px',
              }}
            >
              {doc.tiles.slice(0, 6).map((tile, i) => (
                <div
                  key={tile.id}
                  className={`bx-tile ${i === selected ? 'is-selected' : ''}`}
                  style={{
                    borderRadius: Math.max(6, doc.brand.radiusPx + 4),
                    border:
                      doc.brand.surfaceFx === 'brutalist'
                        ? `2px solid ${doc.brand.ink}`
                        : undefined,
                    boxShadow:
                      doc.brand.surfaceFx === 'brutalist'
                        ? `4px 4px 0 0 ${doc.brand.accent}`
                        : undefined,
                  }}
                  draggable
                  onDragStart={() => { dragFrom.current = i; }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (dragFrom.current !== null) reorder(dragFrom.current, i);
                    dragFrom.current = null;
                  }}
                  onPointerDown={() => setSelected(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={tile.label}
                  aria-pressed={i === selected}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelected(i);
                  }}
                >
                  <span className="bx-tile-label" style={{ color: doc.brand.ink }}>
                    {tile.label}
                  </span>
                  <TileBody kind={tile.kind} brand={doc.brand} photo={photo} markSvg={activeMark.svg} />
                </div>
              ))}
            </div>
          </div>

          <div className="studio-toolbar">
            <div className="toolbar-pill is-plain">
              <button type="button" className="toolbar-button" onClick={() => setMarkOpen(true)} title="Pick logo mark, UI icon, or SVG">
                <Icon name="grid" size={14} />
                <span>Mark</span>
              </button>
              <button type="button" className="toolbar-button" onClick={syncFromSystemMaker}>
                <Icon name="sliders" size={14} />
                <span>Sync System</span>
              </button>
              <button type="button" className="toolbar-button" onClick={() => fileRef.current?.click()}>
                <Icon name="upload" size={14} />
                <span>Photo</span>
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => onFile(e.target.files?.[0])}
              />
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
              <button
                type="button"
                className="toolbar-button is-icon"
                aria-label="Reset board"
                onClick={() => commit({ brand: initialBrand, tiles: INITIAL_TILES })}
              >
                <Icon name="reset" size={15} />
              </button>
            </div>

            <div className="toolbar-pill">
              <button type="button" className="toolbar-button is-icon" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(70, z - 10))}>
                <Icon name="zoomOut" size={14} />
              </button>
              <span className="zoom-value">{zoom}%</span>
              <button type="button" className="toolbar-button is-icon" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(120, z + 10))}>
                <Icon name="zoomIn" size={14} />
              </button>
            </div>

            <div className="export-split">
              <button type="button" className="export-main" onClick={exportPng}>
                Export PNG
              </button>
              <button type="button" className="export-caret" aria-label="Export BRAND.md Kit" title="Export BRAND.md Kit" onClick={exportBrandMd}>
                <Icon name="code" size={13} />
              </button>
            </div>
          </div>
        </section>

        <aside className="page-panel" aria-label="Brand Maker Settings">
          <div className="page-tabs" role="tablist" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <button type="button" role="tab" aria-selected={tab === 'tile'} className={tab === 'tile' ? 'is-active' : ''} onClick={() => setTab('tile')}>
              Tile
            </button>
            <button type="button" role="tab" aria-selected={tab === 'brandfx'} className={tab === 'brandfx' ? 'is-active' : ''} onClick={() => setTab('brandfx')}>
              BrandFx
            </button>
            <button type="button" role="tab" aria-selected={tab === 'general'} className={tab === 'general' ? 'is-active' : ''} onClick={() => setTab('general')}>
              Identity
            </button>
          </div>

          <div className="page-panel-body">
            {tab === 'tile' && (
              <>
                <div className="page-section-title">Tile {selected + 1} of 6</div>
                <label className="page-field">
                  <span>Label</span>
                  <input value={current?.label ?? ''} onChange={(e) => patchTile(selected, { label: e.target.value })} />
                </label>
                <div className="page-field is-block">
                  <span>Module Type</span>
                  <div className="page-chip-row">
                    {KINDS.map((k) => (
                      <button
                        key={k.id}
                        type="button"
                        className={`page-chip ${current?.kind === k.id ? 'is-active' : ''}`}
                        onClick={() => patchTile(selected, { kind: k.id, label: k.label })}
                      >
                        {k.label}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="page-note">Drag any tile on the board to reorder the 6-card identity grid.</p>
              </>
            )}

            {tab === 'brandfx' && (
              <>
                <div className="page-section-title">Surface Finish</div>
                <div className="page-chip-row" style={{ marginBottom: 16 }}>
                  {(['flat', 'blueprint', 'grain', 'brutalist'] as SurfaceFx[]).map((fx) => (
                    <button
                      key={fx}
                      type="button"
                      className={`page-chip ${doc.brand.surfaceFx === fx ? 'is-active' : ''}`}
                      onClick={() => patchBrand({ surfaceFx: fx })}
                    >
                      {fx}
                    </button>
                  ))}
                </div>

                <div className="page-section-title">Pattern Geometry</div>
                <div className="page-chip-row" style={{ marginBottom: 16 }}>
                  {(['dots', 'codex', 'grid', 'rings'] as PatternStyle[]).map((pat) => (
                    <button
                      key={pat}
                      type="button"
                      className={`page-chip ${doc.brand.pattern === pat ? 'is-active' : ''}`}
                      onClick={() => patchBrand({ pattern: pat })}
                    >
                      {pat}
                    </button>
                  ))}
                </div>

                <div className="page-section-title">Photo Treatment</div>
                <div className="page-chip-row" style={{ marginBottom: 16 }}>
                  {(['natural', 'duotone', 'mono'] as PhotoFx[]).map((pfx) => (
                    <button
                      key={pfx}
                      type="button"
                      className={`page-chip ${doc.brand.photoFx === pfx ? 'is-active' : ''}`}
                      onClick={() => patchBrand({ photoFx: pfx })}
                    >
                      {pfx}
                    </button>
                  ))}
                </div>
              </>
            )}

            {tab === 'general' && (
              <>
                <label className="page-field">
                  <span>Brand</span>
                  <input value={doc.brand.name} onChange={(e) => patchBrand({ name: e.target.value })} />
                </label>
                <label className="page-field">
                  <span>Tagline</span>
                  <input value={doc.brand.tagline} onChange={(e) => patchBrand({ tagline: e.target.value })} />
                </label>
                <label className="page-field">
                  <span>Handle</span>
                  <input value={doc.brand.handle} onChange={(e) => patchBrand({ handle: e.target.value })} />
                </label>
                <div className="page-field">
                  <span>Font</span>
                  <DsSelect
                    fullWidth
                    ariaLabel="Brand display font"
                    value={resolveFontOption(doc.brand.displayFont, 'display').id}
                    onChange={(displayFont) => patchBrand({ displayFont })}
                    options={FONT_OPTIONS.map((f) => ({ value: f.id, label: f.label, meta: f.meta }))}
                  />
                </div>
                <div className="page-field">
                  <span>Accent</span>
                  <input type="color" value={doc.brand.accent} onChange={(e) => patchBrand({ accent: e.target.value })} />
                </div>
                <div className="page-field">
                  <span>Background</span>
                  <input type="color" value={doc.brand.background} onChange={(e) => patchBrand({ background: e.target.value })} />
                </div>
                <div className="page-field">
                  <span>Ink</span>
                  <input type="color" value={doc.brand.ink} onChange={(e) => patchBrand({ ink: e.target.value })} />
                </div>
                <div className="page-field is-block">
                  <span>Palette</span>
                  <div className="page-chip-row">
                    {doc.brand.palette.map((c, i) => (
                      <input
                        key={i}
                        type="color"
                        className="page-swatch-input"
                        value={c}
                        aria-label={`Palette colour ${i + 1}`}
                        onChange={(e) => {
                          const palette = [...doc.brand.palette];
                          palette[i] = e.target.value;
                          patchBrand({ palette });
                        }}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
      <MarkPickerDialog
        open={markOpen}
        onClose={() => setMarkOpen(false)}
        onSelect={(m) => {
          setActiveMark(m);
          flash(`Mark set to ${m.name}`);
        }}
        onUploadFile={() => {
          const inp = document.createElement('input');
          inp.type = 'file';
          inp.accept = 'image/svg+xml,.svg';
          inp.onchange = async () => {
            const f = inp.files?.[0];
            if (!f) return;
            const text = await f.text();
            setActiveMark({
              id: `upload-${Date.now()}`,
              name: f.name.replace(/\.svg$/i, ''),
              svg: text,
              source: 'upload',
            });
            flash(`Loaded ${f.name}`);
          };
          inp.click();
        }}
      />
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
