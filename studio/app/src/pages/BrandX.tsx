import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Icon } from '../components/icons';
import { DsSelect } from '../components/DsSelect';
import { MarkPickerDialog } from '../components/Dialogs';
import {
  FONT_OPTIONS,
  exportDesignSystem,
  fontStyleFor,
  pickReadableFg,
  resolveFontOption,
  wcagContrast,
} from '../engine/dsEngine';
import { adaptSvgPaintForSurface, inspectSvgPaint } from '../engine/svgPaint';
import { useProject } from '../state/project';
import {
  BOARD_LAYOUTS,
  BRAND_ARCHETYPES,
  TILE_KINDS,
  buildAiBrandPrompt,
  buildBusinessCardSvg,
  buildOgCardSvg,
  buildPatternStyle,
  buildStandaloneBrandBookHtml,
  resolveTileSurface,
  type BoardAspect,
  type BoardLayoutId,
  type Brand,
  type PatternStyle,
  type PhotoFx,
  type SurfaceFx,
  type Tile,
  type TilePolarity,
} from '../components/brand-maker/brandMakerUtils';
import { BrandGuidelinesView } from '../components/brand-maker/BrandGuidelinesView';
import { BrandCollateralLab } from '../components/brand-maker/BrandCollateralLab';

type BrandStageMode = 'board' | 'guidelines' | 'collateral';
type BrandInspectorTab = 'tile' | 'brandfx' | 'identity' | 'kits';

interface Doc {
  brand: Brand;
  tiles: Tile[];
}

const INITIAL_TILES: Tile[] = BOARD_LAYOUTS[0].defaultTiles;

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
  tile,
  brand,
  photo,
  markSvg,
  surfaceFg,
}: {
  tile: Tile;
  brand: Brand;
  photo: string | null;
  markSvg: string;
  surfaceFg: string;
}) {
  const { kind, polarity = 'auto' } = tile;
  const fontPreset = resolveFontOption(brand.displayFont, 'display');
  const fontName = fontPreset.label;
  const displayStyle = fontStyleFor(brand.displayFont, 'display');
  const contrastRatio = wcagContrast(brand.ink, brand.background);
  const markColor = polarity === 'accent' || polarity === 'invert' ? surfaceFg : brand.accent;

  switch (kind) {
    case 'wordmark':
      return (
        <div className="bx-wordmark" style={displayStyle}>
          <span style={{ color: surfaceFg }}>{brand.name}</span>
          <small style={{ color: surfaceFg, opacity: 0.68 }}>{brand.tagline}</small>
          <div
            style={{
              marginTop: '1.5cqw',
              padding: '0.8cqw 2.6cqw',
              borderRadius: 999,
              fontSize: '3.2cqw',
              fontFamily: 'var(--font-mono)',
              background: polarity === 'accent' ? 'rgba(0,0,0,0.18)' : `${brand.accent}22`,
              color: polarity === 'accent' ? surfaceFg : brand.accent,
              fontWeight: 700,
            }}
          >
            {brand.handle} · {brand.voice.foundedYear}
          </div>
        </div>
      );

    case 'mark':
      return (
        <div
          className="bx-mark"
          style={{ width: '42cqw', height: '42cqw', maxWidth: 86, maxHeight: 86, overflow: 'hidden', color: markColor }}
          dangerouslySetInnerHTML={{
            __html: fitSvg(markSvg, markColor, `bx-mark-${tile.id}-`),
          }}
        />
      );

    case 'lockup':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.2cqw', width: '86%', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3cqw',
              padding: '2.6cqw 4cqw',
              borderRadius: Math.max(6, brand.radiusPx),
              border: `1px solid ${surfaceFg}22`,
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <div
              style={{ width: 28, height: 28, flexShrink: 0 }}
              dangerouslySetInnerHTML={{ __html: fitSvg(markSvg, markColor, `bx-lkh-${tile.id}-`) }}
            />
            <div style={{ textAlign: 'left', minWidth: 0 }}>
              <strong style={{ display: 'block', color: surfaceFg, ...displayStyle, fontSize: '6.2cqw', lineHeight: 1.05 }}>
                {brand.name}
              </strong>
              <span style={{ display: 'block', color: surfaceFg, opacity: 0.6, fontSize: '3.2cqw', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {brand.voice.domain}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '2cqw', alignItems: 'center', fontSize: '3.2cqw', color: surfaceFg, opacity: 0.72, fontFamily: 'var(--font-mono)' }}>
            <span>HORIZONTAL</span>
            <span>·</span>
            <span>STACKED</span>
            <span>·</span>
            <span>BADGE</span>
          </div>
        </div>
      );

    case 'clearspace':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2cqw' }}>
          <div
            style={{
              position: 'relative',
              padding: 14,
              border: `1px dashed ${markColor}88`,
              borderRadius: 8,
              background: `${markColor}10`,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 2,
                left: 5,
                fontSize: 8.5,
                fontFamily: 'var(--font-mono)',
                color: markColor,
                fontWeight: 700,
              }}
            >
              1X
            </span>
            <div
              style={{ width: 42, height: 42, border: `1px solid ${surfaceFg}33`, borderRadius: 4, padding: 4 }}
              dangerouslySetInnerHTML={{ __html: fitSvg(markSvg, markColor, `bx-cs-${tile.id}-`) }}
            />
          </div>
          <span style={{ fontSize: '3.4cqw', fontFamily: 'var(--font-mono)', color: surfaceFg, opacity: 0.72 }}>
            MIN 16PX · 1X EXCLUSION
          </span>
        </div>
      );

    case 'palette':
      return (
        <div className="bx-palette">
          {brand.palette.slice(0, 4).map((c, i) => (
            <div key={i} style={{ minWidth: 0, display: 'grid', gap: '2.2cqw' }}>
              <div
                className="bx-swatch"
                style={{ background: c, border: `1px solid ${surfaceFg}24` }}
                title={c}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '3.9cqw',
                  lineHeight: 1.2,
                  color: surfaceFg,
                  opacity: 0.75,
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

    case 'colorprop':
      return (
        <div style={{ width: '86%', display: 'grid', gap: '2.6cqw' }}>
          <div
            style={{
              display: 'flex',
              height: '13cqw',
              minHeight: 28,
              borderRadius: Math.max(6, brand.radiusPx),
              overflow: 'hidden',
              border: `1px solid ${surfaceFg}26`,
            }}
          >
            <div
              style={{
                flex: brand.proportion[0],
                background: brand.background,
                color: brand.ink,
                display: 'grid',
                placeItems: 'center',
                fontSize: '3.4cqw',
                fontWeight: 700,
              }}
            >
              {brand.proportion[0]}%
            </div>
            <div
              style={{
                flex: brand.proportion[1],
                background: brand.ink,
                color: brand.background,
                display: 'grid',
                placeItems: 'center',
                fontSize: '3.4cqw',
                fontWeight: 700,
              }}
            >
              {brand.proportion[1]}%
            </div>
            <div
              style={{
                flex: brand.proportion[2],
                background: brand.accent,
                color: pickReadableFg(brand.accent),
                display: 'grid',
                placeItems: 'center',
                fontSize: '3.2cqw',
                fontWeight: 700,
              }}
            >
              {brand.proportion[2]}%
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '3.2cqw', fontFamily: 'var(--font-mono)', color: surfaceFg, opacity: 0.72 }}>
            <span>CANVAS</span>
            <span>INK</span>
            <span>ACCENT</span>
          </div>
        </div>
      );

    case 'type':
      return (
        <div className="bx-type" style={{ color: surfaceFg, ...displayStyle }}>
          <span className="bx-type-a">Aa</span>
          <small>{fontName} · {contrastRatio}:1 contrast</small>
        </div>
      );

    case 'pattern': {
      const pStyle = buildPatternStyle(brand.pattern, markColor, surfaceFg);
      return <div className="bx-pattern" style={pStyle} />;
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
              border: isChromatic ? `1px solid ${surfaceFg}28` : undefined,
              display: 'grid',
              placeItems: 'center',
              padding: 12,
              overflow: 'hidden',
            }}
            dangerouslySetInnerHTML={{ __html: fitSvg(markSvg, onAccent, `bx-app-1-${tile.id}-`) }}
          />
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: brand.background,
              border: `1px solid ${surfaceFg}28`,
              display: 'grid',
              placeItems: 'center',
              padding: 6,
              overflow: 'hidden',
            }}
            dangerouslySetInnerHTML={{ __html: fitSvg(markSvg, brand.ink, `bx-app-2-${tile.id}-`) }}
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
            dangerouslySetInnerHTML={{ __html: fitSvg(markSvg, brand.background, `bx-app-3-${tile.id}-`) }}
          />
        </div>
      );
    }

    case 'ui':
      return (
        <div style={{ display: 'grid', gap: 8, width: '86%' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
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
              {brand.voice.ctaText}
            </span>
            <span
              style={{
                padding: '4px 9px',
                borderRadius: 999,
                border: `1px solid ${surfaceFg}33`,
                color: surfaceFg,
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
              border: `1px solid ${surfaceFg}28`,
              color: surfaceFg,
              opacity: 0.76,
              fontSize: 11,
              textAlign: 'center',
            }}
          >
            hello@{brand.voice.domain}
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
            <strong style={{ color: surfaceFg }}>{brand.handle}</strong>
            <small style={{ color: surfaceFg, opacity: 0.62 }}>{brand.voice.domain}</small>
          </div>
        </div>
      );

    case 'ogcard':
      return (
        <div
          style={{
            width: '86%',
            padding: 12,
            borderRadius: Math.max(6, brand.radiusPx),
            border: `1px solid ${surfaceFg}22`,
            background: `${brand.accent}18`,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            textAlign: 'left',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: markColor, fontWeight: 700 }}>
            OPEN GRAPH 1200×630
          </span>
          <strong style={{ color: surfaceFg, ...displayStyle, fontSize: 14 }}>{brand.name}</strong>
          <small style={{ color: surfaceFg, opacity: 0.68, fontSize: 11, lineHeight: 1.3 }}>
            {brand.tagline}
          </small>
        </div>
      );

    case 'bizcard':
      return (
        <div
          style={{
            width: '86%',
            padding: '10px 12px',
            borderRadius: Math.max(6, brand.radiusPx),
            border: `1px solid ${surfaceFg}26`,
            background: polarity === 'invert' ? 'rgba(255,255,255,0.04)' : `${brand.ink}0a`,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{ width: 20, height: 20 }}
              dangerouslySetInnerHTML={{ __html: fitSvg(markSvg, markColor, `bx-bc-${tile.id}-`) }}
            />
            <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: markColor, fontWeight: 700 }}>
              NFC PASS
            </span>
          </div>
          <div>
            <strong style={{ display: 'block', fontSize: 12, color: surfaceFg, ...displayStyle }}>
              {brand.name} Executive
            </strong>
            <span style={{ fontSize: 10, color: surfaceFg, opacity: 0.65, fontFamily: 'var(--font-mono)' }}>
              {brand.voice.domain}
            </span>
          </div>
        </div>
      );

    case 'voice':
      return (
        <div style={{ width: '86%', display: 'grid', gap: '2cqw', textAlign: 'left' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {brand.voice.pillars.map((p, idx) => (
              <span
                key={idx}
                style={{
                  padding: '2px 7px',
                  borderRadius: 999,
                  fontSize: '3.2cqw',
                  fontWeight: 700,
                  background: `${brand.accent}24`,
                  color: markColor,
                }}
              >
                {p}
              </span>
            ))}
          </div>
          <div style={{ fontSize: '3.5cqw', color: surfaceFg, opacity: 0.82, lineHeight: 1.35 }}>
            “{brand.voice.weAre}”
          </div>
        </div>
      );

    case 'misuse':
      return (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div
            style={{
              padding: 8,
              borderRadius: 8,
              border: '1px solid rgba(16, 185, 129, 0.45)',
              background: 'rgba(16, 185, 129, 0.1)',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <div
              style={{ width: 28, height: 28 }}
              dangerouslySetInnerHTML={{ __html: fitSvg(markSvg, markColor, `bx-ok-${tile.id}-`) }}
            />
          </div>
          <div
            style={{
              padding: 8,
              borderRadius: 8,
              border: '1px solid rgba(239, 68, 68, 0.45)',
              background: 'rgba(239, 68, 68, 0.1)',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <div
              style={{ width: 28, height: 28, transform: 'scaleX(1.45) rotate(18deg)', opacity: 0.75 }}
              dangerouslySetInnerHTML={{ __html: fitSvg(markSvg, '#ef4444', `bx-no-${tile.id}-`) }}
            />
          </div>
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
                  : brand.photoFx === 'halftone'
                    ? 'contrast(1.4) saturate(0.4)'
                    : brand.photoFx === 'warm'
                      ? 'sepia(0.22) saturate(1.25)'
                      : undefined,
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            background: `radial-gradient(circle at 75% 25%, ${brand.accent}44, transparent 60%), linear-gradient(135deg, ${brand.secondary}28, ${brand.background})`,
          }}
        >
          <div className="bx-empty" style={{ color: surfaceFg, opacity: 0.78 }}>
            <Icon name="image" size={20} />
            <span>Art Direction Scene</span>
          </div>
        </div>
      );
  }
}

export function BrandX() {
  const { theme, designSystem, compiledSystem, activeMark, setActiveMark } = useProject();
  const [markOpen, setMarkOpen] = useState(false);
  const [stageMode, setStageMode] = useState<BrandStageMode>('board');
  const [tab, setTab] = useState<BrandInspectorTab>('tile');

  const initialBrand = useMemo<Brand>(
    () => ({
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
      layoutId: 'swiss-3x2',
      aspect: '1:1',
      proportion: [60, 30, 10],
      voice: {
        pillars: ['Deterministic', 'Architectural', 'Perceptual'],
        weAre: 'Exact, high-contrast, systematic, verifiable',
        weAreNot: 'Generic, ornamental, cluttered, low-contrast',
        ctaText: 'Deploy System',
        domain: `${(designSystem.name || 'brand').toLowerCase().replace(/[^a-z0-9]/g, '')}.dev`,
        category: 'Design & Engineering',
        foundedYear: '2026',
      },
    }),
    [designSystem, compiledSystem],
  );

  const [doc, setDoc] = useState<Doc>(() => ({ brand: initialBrand, tiles: INITIAL_TILES }));
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
  const patchVoice = (vPatch: Partial<Brand['voice']>) =>
    commit({ ...doc, brand: { ...doc.brand, voice: { ...doc.brand.voice, ...vPatch } } });
  const patchTile = (index: number, patch: Partial<Tile>) =>
    commit({ ...doc, tiles: doc.tiles.map((t, i) => (i === index ? { ...t, ...patch } : t)) });

  const switchBoardLayout = (layoutId: BoardLayoutId) => {
    const preset = BOARD_LAYOUTS.find((l) => l.id === layoutId) ?? BOARD_LAYOUTS[0];
    commit({
      brand: { ...doc.brand, layoutId: preset.id },
      tiles: preset.defaultTiles.map((t) => ({ ...t })),
    });
    setSelected(0);
    flash(`${preset.label} layout active`);
  };

  const applyBrandArchetype = (archId: string) => {
    const arch = BRAND_ARCHETYPES.find((a) => a.id === archId);
    if (!arch) return;
    commit({
      brand: {
        ...doc.brand,
        ...arch.brandPatch,
        voice: {
          ...doc.brand.voice,
          ...(arch.brandPatch.voice ?? {}),
        },
      },
      tiles: doc.tiles,
    });
    flash(`Applied ${arch.label} brand archetype`);
  };

  const flipBoardPolarity = () => {
    const nextBg = doc.brand.ink;
    const nextInk = doc.brand.background;
    patchBrand({ background: nextBg, ink: nextInk });
    flash('Flipped brand surface polarity');
  };

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
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
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
    if (from === to || to < 0 || to >= doc.tiles.length) return;
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
      const nextTiles = [...doc.tiles];
      nextTiles[nextTiles.length - 1] = { id: `t${Date.now()}`, kind: 'photo', label: 'Art Photo' };
      commit({ ...doc, tiles: nextTiles });
    }
    flash('Photography applied to brand board');
  };

  useEffect(
    () => () => {
      if (photo) URL.revokeObjectURL(photo);
    },
    [photo],
  );

  const exportPng = async () => {
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      await document.fonts.ready;
    }
    const px = 1600;
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
    } catch {
      /* ignore */
    } finally {
      URL.revokeObjectURL(markUrl);
      URL.revokeObjectURL(markDarkUrl);
    }

    const pad = px * 0.055;
    const gap = px * 0.022;
    const cols = brand.layoutId === 'showcase-8' ? 4 : 3;
    const rows = 2;
    const w = (px - pad * 2 - gap * (cols - 1)) / cols;
    const h = (px - pad * 2 - gap * (rows - 1)) / rows;

    tiles.slice(0, cols * rows).forEach((tile, i) => {
      const x = pad + (i % cols) * (w + gap);
      const y = pad + Math.floor(i / cols) * (h + gap);
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, Math.max(8, brand.radiusPx * 2));
      ctx.fillStyle = tile.polarity === 'accent' ? brand.accent : brand.ink;
      ctx.globalAlpha = tile.polarity === 'accent' ? 1 : 0.06;
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

      if (tile.kind === 'wordmark' || tile.kind === 'lockup') {
        ctx.fillStyle = brand.ink;
        ctx.font = `700 ${Math.round(w * 0.12)}px "Allo", system-ui, sans-serif`;
        ctx.fillText(brand.name, cx, cy - w * 0.03);
        ctx.globalAlpha = 0.62;
        ctx.font = `400 ${Math.round(w * 0.046)}px "Allo", system-ui, sans-serif`;
        ctx.fillText(brand.tagline.slice(0, 38), cx, cy + w * 0.06);
      } else if ((tile.kind === 'mark' || tile.kind === 'clearspace') && markImg) {
        const ms = Math.min(w, h) * 0.42;
        ctx.drawImage(tile.polarity === 'accent' && markOnAccentImg ? markOnAccentImg : markImg, cx - ms / 2, cy - ms / 2, ms, ms);
      } else if (tile.kind === 'palette' || tile.kind === 'colorprop') {
        const sw = (w * 0.84) / brand.palette.length;
        brand.palette.forEach((c, k) => {
          ctx.fillStyle = c;
          ctx.beginPath();
          ctx.roundRect(x + w * 0.08 + k * sw, cy - h * 0.16, sw * 0.86, h * 0.32, 10);
          ctx.fill();
        });
      } else if (tile.kind === 'type') {
        ctx.fillStyle = brand.ink;
        ctx.font = `700 ${Math.round(w * 0.28)}px "Allo", system-ui, sans-serif`;
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
      } else if (tile.kind === 'social' || tile.kind === 'voice' || tile.kind === 'bizcard') {
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
      } else if (tile.kind === 'ui' || tile.kind === 'misuse') {
        ctx.fillStyle = brand.accent;
        ctx.beginPath();
        ctx.roundRect(cx - w * 0.25, cy - 22, w * 0.5, 44, brand.radiusPx);
        ctx.fill();
        ctx.fillStyle = wcagContrast('#09090b', brand.accent) > 4.5 ? '#09090b' : '#ffffff';
        ctx.font = `600 ${Math.round(w * 0.05)}px "Allo", system-ui, sans-serif`;
        ctx.fillText(brand.voice.ctaText, cx, cy);
      } else if (tile.kind === 'photo' && photoImg) {
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
        flash('Brand Board exported at 1600×1600');
      }
    }, 'image/png');
  };

  const exportBrandMd = () => {
    const css = exportDesignSystem(designSystem, compiledSystem, 'css');
    const promptMd = buildAiBrandPrompt(doc.brand, activeMark.name);
    const md = [
      promptMd,
      ``,
      `## 5. Production CSS Design Tokens`,
      '```css',
      css,
      '```',
      ``,
      `## 6. Logo Vector Master (SVG)`,
      '```svg',
      adaptSvgPaintForSurface(activeMark.svg, doc.brand.accent),
      '```',
    ].join('\n');
    download(
      new Blob([md], { type: 'text/markdown' }),
      `${doc.brand.name.toLowerCase().replace(/\s+/g, '-')}-BRAND.md`,
    );
    flash('Exported BRAND.md + AI Brand Prompt + SVG');
  };

  const exportHtmlBrandBook = () => {
    const css = exportDesignSystem(designSystem, compiledSystem, 'css');
    const html = buildStandaloneBrandBookHtml(doc.brand, activeMark.svg, css);
    download(
      new Blob([html], { type: 'text/html' }),
      `${doc.brand.name.toLowerCase().replace(/\s+/g, '-')}-brand-guidelines.html`,
    );
    flash('Exported Standalone HTML Brand Guidelines Book');
  };

  const exportOgSvg = () => {
    const svg = buildOgCardSvg(doc.brand, activeMark.svg);
    download(
      new Blob([svg], { type: 'image/svg+xml' }),
      `${doc.brand.name.toLowerCase().replace(/\s+/g, '-')}-og-1200x630.svg`,
    );
    flash('Exported 1200×630 Open Graph SVG');
  };

  const exportBizCardSvg = () => {
    const svg = buildBusinessCardSvg(doc.brand, activeMark.svg);
    download(
      new Blob([svg], { type: 'image/svg+xml' }),
      `${doc.brand.name.toLowerCase().replace(/\s+/g, '-')}-business-card.svg`,
    );
    flash('Exported Business Card Print Spec SVG');
  };

  const copyAiPrompt = () => {
    const promptMd = buildAiBrandPrompt(doc.brand, activeMark.name);
    void navigator.clipboard.writeText(promptMd);
    flash('Copied AI Brand System Prompt to clipboard');
  };

  const current = doc.tiles[selected] ?? doc.tiles[0];
  const boardLayoutMeta = BOARD_LAYOUTS.find((l) => l.id === doc.brand.layoutId) ?? BOARD_LAYOUTS[0];
  const textContrast = wcagContrast(doc.brand.ink, doc.brand.background);

  const aspectRatioCss =
    doc.brand.aspect === '16:10'
      ? '16 / 10'
      : doc.brand.aspect === '4:5'
        ? '4 / 5'
        : '1 / 1';

  const markThumbHtml = useMemo(
    () =>
      adaptSvgPaintForSurface(
        activeMark.svg.replace(/\swidth="[^"]*"/i, ' width="22"').replace(/\sheight="[^"]*"/i, ' height="22"'),
        doc.brand.accent,
        'bx-dock-th-',
      ),
    [activeMark.svg, doc.brand.accent],
  );

  return (
    <div className="logo-studio" data-theme={theme}>
      <TopBar current="brand" onShare={exportBrandMd} />
      <div className="page-workspace is-createx">
        <section className="studio-preview-column" aria-label="Brand Maker & BrandFx">
          {/* Stage Mode & Bento Layout Bar */}
          <div className="createx-stage-bar" role="toolbar" aria-label="Brand Maker stage view and layout controls">
            <div className="createx-stage-modes" role="tablist" aria-label="Brand Maker stage mode">
              {(
                [
                  ['board', 'Bento Board'],
                  ['guidelines', 'Guidelines Book'],
                  ['collateral', 'Collateral Lab'],
                ] as const
              ).map(([mId, mLabel]) => (
                <button
                  key={mId}
                  type="button"
                  role="tab"
                  aria-selected={stageMode === mId}
                  className={`createx-stage-mode-btn ${stageMode === mId ? 'is-active' : ''}`}
                  onClick={() => setStageMode(mId)}
                >
                  {mLabel}
                </button>
              ))}
            </div>

            {stageMode === 'board' && (
              <div className="createx-overlay-controls">
                <span className="createx-overlay-label">Layout</span>
                <div className="createx-keyline-pills" role="group" aria-label="Bento board layout preset">
                  {BOARD_LAYOUTS.map((lay) => (
                    <button
                      key={lay.id}
                      type="button"
                      className={`createx-mini-pill ${doc.brand.layoutId === lay.id ? 'is-active' : ''}`}
                      aria-pressed={doc.brand.layoutId === lay.id}
                      onClick={() => switchBoardLayout(lay.id)}
                    >
                      {lay.label}
                    </button>
                  ))}
                </div>
                <div className="createx-keyline-pills" role="group" aria-label="Board aspect ratio">
                  {(['1:1', '16:10', '4:5'] as BoardAspect[]).map((asp) => (
                    <button
                      key={asp}
                      type="button"
                      className={`createx-mini-pill ${doc.brand.aspect === asp ? 'is-active' : ''}`}
                      aria-pressed={doc.brand.aspect === asp}
                      onClick={() => patchBrand({ aspect: asp })}
                    >
                      {asp}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="createx-mini-pill"
                  title="Swap Brand Background and Ink polarity"
                  onClick={flipBoardPolarity}
                >
                  Flip Polarity
                </button>
              </div>
            )}
          </div>

          {stageMode === 'board' ? (
            <>
              <div className="page-canvas-area" style={{ paddingTop: 74, paddingBottom: 78 }}>
                <div
                  className="brandx-board"
                  style={{
                    ['--zoom' as string]: zoom / 100,
                    aspectRatio: aspectRatioCss,
                    gridTemplateColumns: `repeat(${boardLayoutMeta.cols}, 1fr)`,
                    gridTemplateRows: `repeat(${boardLayoutMeta.rows}, 1fr)`,
                    background: doc.brand.background,
                    backgroundImage:
                      doc.brand.surfaceFx === 'blueprint'
                        ? `linear-gradient(${doc.brand.ink}12 1px, transparent 1px), linear-gradient(90deg, ${doc.brand.ink}12 1px, transparent 1px)`
                        : doc.brand.surfaceFx === 'grain'
                          ? `radial-gradient(${doc.brand.ink}1a 1px, transparent 0)`
                          : doc.brand.surfaceFx === 'glass'
                            ? `radial-gradient(circle at 80% 18%, ${doc.brand.accent}2e, transparent 58%)`
                            : undefined,
                    backgroundSize:
                      doc.brand.surfaceFx === 'blueprint'
                        ? '28px 28px'
                        : doc.brand.surfaceFx === 'grain'
                          ? '6px 6px'
                          : undefined,
                  }}
                >
                  {doc.tiles.map((tile, i) => {
                    const surf = resolveTileSurface(doc.brand, tile.polarity);
                    return (
                      <div
                        key={tile.id}
                        className={`bx-tile ${i === selected ? 'is-selected' : ''}`}
                        style={{
                          gridColumn: tile.span === 2 ? 'span 2' : undefined,
                          gridRow: tile.rowSpan === 2 ? 'span 2' : undefined,
                          background: surf.bg,
                          borderRadius: Math.max(6, doc.brand.radiusPx + 4),
                          border:
                            doc.brand.surfaceFx === 'brutalist'
                              ? `2px solid ${doc.brand.ink}`
                              : `1px solid ${surf.border}`,
                          boxShadow:
                            doc.brand.surfaceFx === 'brutalist'
                              ? `4px 4px 0 0 ${doc.brand.accent}`
                              : undefined,
                        }}
                        draggable
                        onDragStart={() => {
                          dragFrom.current = i;
                        }}
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
                        <span className="bx-tile-label" style={{ color: surf.fg }}>
                          {tile.label}
                        </span>
                        <TileBody
                          tile={tile}
                          brand={doc.brand}
                          photo={photo}
                          markSvg={activeMark.svg}
                          surfaceFg={surf.fg}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="studio-toolbar">
                <div className="toolbar-pill is-plain">
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={() => setMarkOpen(true)}
                    title="Pick logo mark, UI icon, or SVG"
                  >
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
                    aria-label="Flip board polarity"
                    title="Flip Dark/Light Polarity"
                    onClick={flipBoardPolarity}
                  >
                    <Icon name="flip" size={15} />
                  </button>
                  <button
                    type="button"
                    className="toolbar-button is-icon"
                    aria-label="Reset board"
                    title="Reset Board"
                    onClick={() => commit({ brand: initialBrand, tiles: INITIAL_TILES })}
                  >
                    <Icon name="reset" size={15} />
                  </button>
                </div>

                <div className="toolbar-pill">
                  <button
                    type="button"
                    className="toolbar-button is-icon"
                    aria-label="Zoom out"
                    onClick={() => setZoom((z) => Math.max(70, z - 10))}
                  >
                    <Icon name="zoomOut" size={14} />
                  </button>
                  <span className="zoom-value">{zoom}%</span>
                  <button
                    type="button"
                    className="toolbar-button is-icon"
                    aria-label="Zoom in"
                    onClick={() => setZoom((z) => Math.min(120, z + 10))}
                  >
                    <Icon name="zoomIn" size={14} />
                  </button>
                </div>

                <div className="export-split">
                  <button type="button" className="export-main" onClick={exportPng}>
                    Export PNG
                  </button>
                  <button
                    type="button"
                    className="export-caret"
                    aria-label="Export Standalone HTML Brand Book"
                    title="Export Standalone HTML Brand Guidelines Book"
                    onClick={exportHtmlBrandBook}
                  >
                    <Icon name="globe" size={13} />
                  </button>
                  <button
                    type="button"
                    className="export-caret"
                    aria-label="Export BRAND.md Kit"
                    title="Export BRAND.md + AI Brand Prompt"
                    onClick={exportBrandMd}
                  >
                    <Icon name="code" size={13} />
                  </button>
                </div>
              </div>
            </>
          ) : stageMode === 'guidelines' ? (
            <BrandGuidelinesView
              brand={doc.brand}
              markSvg={activeMark.svg}
              markName={activeMark.name}
              onExportHtmlBook={exportHtmlBrandBook}
              onCopyAiPrompt={copyAiPrompt}
              onFlash={flash}
            />
          ) : (
            <BrandCollateralLab
              brand={doc.brand}
              markSvg={activeMark.svg}
              onExportOgSvg={exportOgSvg}
              onExportBizCardSvg={exportBizCardSvg}
              onFlash={flash}
            />
          )}
        </section>

        <aside className="page-panel" aria-label="Brand Maker Settings">
          <header className="page-panel-head">
            <span>Brand Maker</span>
            <span className="page-panel-count">{textContrast}:1 WCAG</span>
          </header>

          <div className="page-panel-body">
            {/* Always-Visible Brand Summary & Cross-Tool Dock */}
            <div className="createx-source-card" style={{ marginBottom: 10 }}>
              <div className="createx-source-row">
                <div
                  className="createx-source-thumb"
                  style={{ background: doc.brand.background }}
                  dangerouslySetInnerHTML={{ __html: markThumbHtml }}
                />
                <div className="createx-source-meta">
                  <strong>{doc.brand.name}</strong>
                  <span>
                    {doc.brand.handle} · {activeMark.name}
                  </span>
                </div>
                <button
                  type="button"
                  className="ds-action-btn"
                  style={{ padding: '4px 8px', fontSize: 11 }}
                  onClick={() => setMarkOpen(true)}
                >
                  Mark
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                <button
                  type="button"
                  className="ds-action-btn"
                  style={{ justifyContent: 'center', fontSize: 11, padding: '5px 6px' }}
                  onClick={syncFromSystemMaker}
                >
                  Sync System
                </button>
                <button
                  type="button"
                  className="ds-action-btn"
                  style={{ justifyContent: 'center', fontSize: 11, padding: '5px 6px' }}
                  onClick={flipBoardPolarity}
                >
                  Flip Polarity
                </button>
              </div>
            </div>

            {/* 4 Inspector Tabs */}
            <div
              className="page-segmented"
              role="tablist"
              aria-label="Brand Maker inspector sections"
              style={{ marginBottom: 12 }}
            >
              {(
                [
                  ['tile', 'Tile'],
                  ['brandfx', 'Board & Fx'],
                  ['identity', 'Identity'],
                  ['kits', 'Kits & Export'],
                ] as const
              ).map(([tId, tLabel]) => (
                <button
                  key={tId}
                  type="button"
                  role="tab"
                  aria-selected={tab === tId}
                  aria-pressed={tab === tId}
                  onClick={() => setTab(tId)}
                >
                  {tLabel}
                </button>
              ))}
            </div>

            {tab === 'tile' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div className="page-section-title" style={{ marginBottom: 0 }}>
                    Tile {selected + 1} of {doc.tiles.length}
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button
                      type="button"
                      className="page-chip"
                      style={{ height: 22, padding: '0 8px', fontSize: 10.5 }}
                      disabled={selected <= 0}
                      onClick={() => reorder(selected, selected - 1)}
                    >
                      ← Move
                    </button>
                    <button
                      type="button"
                      className="page-chip"
                      style={{ height: 22, padding: '0 8px', fontSize: 10.5 }}
                      disabled={selected >= doc.tiles.length - 1}
                      onClick={() => reorder(selected, selected + 1)}
                    >
                      Move →
                    </button>
                  </div>
                </div>

                <label className="page-field">
                  <span>Label</span>
                  <input
                    value={current?.label ?? ''}
                    onChange={(e) => patchTile(selected, { label: e.target.value })}
                  />
                </label>

                <div className="page-section">
                  <div className="page-section-title">Tile Surface Polarity</div>
                  <div className="page-segmented">
                    {(
                      [
                        ['auto', 'Auto'],
                        ['accent', 'Accent'],
                        ['invert', 'Invert'],
                        ['glass', 'Glass'],
                      ] as [TilePolarity, string][]
                    ).map(([pol, lbl]) => (
                      <button
                        key={pol}
                        type="button"
                        aria-pressed={(current?.polarity ?? 'auto') === pol}
                        onClick={() => patchTile(selected, { polarity: pol })}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="page-section">
                  <div className="page-section-title">Bento Column Span</div>
                  <div className="page-segmented">
                    {(
                      [
                        [1, '1×1 Standard'],
                        [2, '2×1 Wide Hero'],
                      ] as const
                    ).map(([sp, lbl]) => (
                      <button
                        key={sp}
                        type="button"
                        aria-pressed={(current?.span ?? 1) === sp}
                        onClick={() => patchTile(selected, { span: sp })}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="page-section">
                  <div className="page-section-title">Module Type ({TILE_KINDS.length})</div>
                  <div className="page-chip-row">
                    {TILE_KINDS.map((k) => (
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
                <p className="page-note">
                  Click or drag any tile on the board to inspect, span, recolor, or reorder it.
                </p>
              </>
            )}

            {tab === 'brandfx' && (
              <>
                <div className="page-section" style={{ marginTop: 4 }}>
                  <div className="page-section-title">Bento Grid Architecture</div>
                  <div className="page-chip-row">
                    {BOARD_LAYOUTS.map((lay) => (
                      <button
                        key={lay.id}
                        type="button"
                        className={`page-chip ${doc.brand.layoutId === lay.id ? 'is-active' : ''}`}
                        onClick={() => switchBoardLayout(lay.id)}
                      >
                        {lay.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="page-section">
                  <div className="page-section-title">Surface Finish</div>
                  <div className="page-chip-row">
                    {(['flat', 'blueprint', 'grain', 'brutalist', 'glass'] as SurfaceFx[]).map((fx) => (
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
                </div>

                <div className="page-section">
                  <div className="page-section-title">Pattern Geometry (8)</div>
                  <div className="page-chip-row">
                    {(
                      [
                        'dots',
                        'codex',
                        'grid',
                        'rings',
                        'isometric',
                        'waves',
                        'crosshatch',
                        'bauhaus',
                      ] as PatternStyle[]
                    ).map((pat) => (
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
                </div>

                <div className="page-section">
                  <div className="page-section-title">Photo Treatment</div>
                  <div className="page-chip-row">
                    {(['natural', 'duotone', 'mono', 'halftone', 'warm'] as PhotoFx[]).map((pfx) => (
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
                </div>

                <div className="page-section">
                  <div className="page-section-title">Color Balance Ratio (Canvas · Ink · Accent)</div>
                  <div className="page-chip-row">
                    {(
                      [
                        [[60, 30, 10], '60 · 30 · 10'],
                        [[70, 20, 10], '70 · 20 · 10'],
                        [[65, 25, 10], '65 · 25 · 10'],
                        [[55, 30, 15], '55 · 30 · 15'],
                      ] as [[number, number, number], string][]
                    ).map(([prop, lbl]) => (
                      <button
                        key={lbl}
                        type="button"
                        className={`page-chip ${doc.brand.proportion.join('-') === prop.join('-') ? 'is-active' : ''}`}
                        onClick={() => patchBrand({ proportion: prop })}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === 'identity' && (
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
                <label className="page-field">
                  <span>Domain</span>
                  <input value={doc.brand.voice.domain} onChange={(e) => patchVoice({ domain: e.target.value })} />
                </label>
                <label className="page-field">
                  <span>Category</span>
                  <input value={doc.brand.voice.category} onChange={(e) => patchVoice({ category: e.target.value })} />
                </label>
                <label className="page-field">
                  <span>Primary CTA</span>
                  <input value={doc.brand.voice.ctaText} onChange={(e) => patchVoice({ ctaText: e.target.value })} />
                </label>

                <div className="page-field">
                  <span>Display Font</span>
                  <DsSelect
                    fullWidth
                    ariaLabel="Brand display font"
                    value={resolveFontOption(doc.brand.displayFont, 'display').id}
                    onChange={(displayFont) => patchBrand({ displayFont })}
                    options={FONT_OPTIONS.map((f) => ({ value: f.id, label: f.label, meta: f.meta }))}
                  />
                </div>
                <div className="page-field">
                  <span>Body Font</span>
                  <DsSelect
                    fullWidth
                    ariaLabel="Brand body font"
                    value={resolveFontOption(doc.brand.bodyFont, 'body').id}
                    onChange={(bodyFont) => patchBrand({ bodyFont })}
                    options={FONT_OPTIONS.map((f) => ({ value: f.id, label: f.label, meta: f.meta }))}
                  />
                </div>

                <div className="page-section">
                  <div className="page-section-title">Voice Pillars &amp; Tone</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 5, marginBottom: 8 }}>
                    {doc.brand.voice.pillars.map((pil, idx) => (
                      <input
                        key={idx}
                        className="ds-text-input"
                        style={{ fontSize: 11, padding: '5px 6px', width: '100%', minWidth: 0 }}
                        value={pil}
                        aria-label={`Voice pillar ${idx + 1}`}
                        onChange={(e) => {
                          const next = [...doc.brand.voice.pillars] as [string, string, string];
                          next[idx] = e.target.value;
                          patchVoice({ pillars: next });
                        }}
                      />
                    ))}
                  </div>
                  <label className="page-field">
                    <span>We Are</span>
                    <input value={doc.brand.voice.weAre} onChange={(e) => patchVoice({ weAre: e.target.value })} />
                  </label>
                  <label className="page-field">
                    <span>We Are Not</span>
                    <input value={doc.brand.voice.weAreNot} onChange={(e) => patchVoice({ weAreNot: e.target.value })} />
                  </label>
                </div>

                <div className="page-section">
                  <div className="page-section-title">Chromatic Tokens</div>
                  <div className="page-field">
                    <span>Signal Accent</span>
                    <input
                      type="color"
                      value={doc.brand.accent}
                      onChange={(e) => patchBrand({ accent: e.target.value })}
                    />
                  </div>
                  <div className="page-field">
                    <span>Canvas Surface</span>
                    <input
                      type="color"
                      value={doc.brand.background}
                      onChange={(e) => patchBrand({ background: e.target.value })}
                    />
                  </div>
                  <div className="page-field">
                    <span>Primary Ink</span>
                    <input
                      type="color"
                      value={doc.brand.ink}
                      onChange={(e) => patchBrand({ ink: e.target.value })}
                    />
                  </div>
                  <div className="page-field is-block">
                    <span>Brand Swatches</span>
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
                </div>
              </>
            )}

            {tab === 'kits' && (
              <>
                <div className="page-section" style={{ marginTop: 4 }}>
                  <div className="page-section-title">Curated Brand Archetypes (6)</div>
                  <div style={{ display: 'grid', gap: 6 }}>
                    {BRAND_ARCHETYPES.map((arch) => (
                      <button
                        key={arch.id}
                        type="button"
                        className="bx-archetype-card"
                        onClick={() => applyBrandArchetype(arch.id)}
                      >
                        <div className="bx-archetype-top">
                          <strong>{arch.label}</strong>
                          <div className="bx-archetype-dots">
                            {(arch.brandPatch.palette ?? []).slice(0, 4).map((hex, idx) => (
                              <span key={idx} style={{ background: hex }} />
                            ))}
                          </div>
                        </div>
                        <span className="bx-archetype-sub">{arch.subtitle}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="page-section">
                  <div className="page-section-title">Press Kit &amp; Multi-Asset Exporter</div>
                  <div className="createx-export-grid">
                    <button type="button" className="ds-action-btn is-primary" onClick={exportPng}>
                      Board PNG (1600px)
                    </button>
                    <button type="button" className="ds-action-btn" onClick={exportHtmlBrandBook}>
                      HTML Brand Book
                    </button>
                    <button type="button" className="ds-action-btn" onClick={exportOgSvg}>
                      OG Card SVG
                    </button>
                    <button type="button" className="ds-action-btn" onClick={exportBizCardSvg}>
                      Business Card SVG
                    </button>
                    <button type="button" className="ds-action-btn" onClick={exportBrandMd}>
                      BRAND.md + Tokens
                    </button>
                    <button type="button" className="ds-action-btn" onClick={copyAiPrompt}>
                      Copy AI Prompt
                    </button>
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
