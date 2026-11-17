import { useMemo, useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Icon } from '../components/icons';
import { DsSelect } from '../components/DsSelect';
import { adaptSvgPaintForSurface } from '../engine/svgPaint';
import {
  FONT_OPTIONS,
  MONO_OPTIONS,
  TYPE_RATIOS,
  applyCvdSimulation,
  exportDesignSystem,
  fontStyleFor,
  harmonyPair,
  resolveFontOption,
  solveReadableOnBg,
  type CvdMode,
  type ElevationStyle,
  type HarmonyMode,
} from '../engine/dsEngine';
import { useProject } from '../state/project';

type ViewTab = 'preview' | 'components' | 'contrast' | 'export';
type ExportTab = 'css' | 'tailwind' | 'dtcg' | 'designmd';

const HARMONIES: { id: HarmonyMode; label: string }[] = [
  { id: 'complementary', label: 'Complement' },
  { id: 'split', label: 'Split' },
  { id: 'triadic', label: 'Triadic' },
  { id: 'analogous', label: 'Analogous' },
  { id: 'tetradic', label: 'Tetradic' },
  { id: 'monochrome', label: 'Mono' },
];

const ELEVATIONS: { id: ElevationStyle; label: string }[] = [
  { id: 'flat', label: 'Flat' },
  { id: 'layered', label: 'Layered' },
  { id: 'glass', label: 'Glass' },
  { id: 'brutalist', label: 'Brutalist' },
];

const CVD_MODES: { id: CvdMode; label: string }[] = [
  { id: 'normal', label: 'Normal Vision' },
  { id: 'deuteranopia', label: 'Deuteranopia' },
  { id: 'protanopia', label: 'Protanopia' },
  { id: 'tritanopia', label: 'Tritanopia' },
  { id: 'achromatopsia', label: 'Monochromacy' },
];

export function SystemMaker() {
  const {
    theme,
    setTheme,
    designSystem,
    setDesignSystem,
    resetDesignSystem,
    compiledSystem,
    catalogSystems,
    seedFromSystemSlug,
    activeMark,
  } = useProject();

  const [viewTab, setViewTab] = useState<ViewTab>('preview');
  const [exportTab, setExportTab] = useState<ExportTab>('css');
  const [cvd, setCvd] = useState<CvdMode>('normal');
  const [seedQuery, setSeedQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  };

  const cvdHex = (hex: string) => applyCvdSimulation(hex, cvd);
  const { semantic, ramps, typeScale, spacingScale, radii, audits } = compiledSystem;

  const filteredSeeds = useMemo(() => {
    const q = seedQuery.trim().toLowerCase();
    const list = catalogSystems.filter((s) => s.provenance !== 'listed' && s.brand);
    if (!q) return list.slice(0, 60);
    return list.filter((s) => s.name.toLowerCase().includes(q) || (s.org || '').toLowerCase().includes(q)).slice(0, 60);
  }, [catalogSystems, seedQuery]);

  const codeText = useMemo(
    () => exportDesignSystem(designSystem, compiledSystem, exportTab),
    [designSystem, compiledSystem, exportTab],
  );

  const copyText = async (txt: string, label: string) => {
    try {
      await navigator.clipboard.writeText(txt);
      flash(`Copied ${label}`);
    } catch {
      flash('Clipboard permission blocked');
    }
  };

  const downloadFile = (txt: string, filename: string, mime = 'text/plain') => {
    const blob = new Blob([txt], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    flash(`Downloaded ${filename}`);
  };

  const applyHarmony = (mode: HarmonyMode) => {
    const { secondary, accent } = harmonyPair(designSystem.primaryHex, mode);
    setDesignSystem({ harmony: mode, secondaryHex: secondary, accentHex: accent });
  };

  const autoFixPrimary = () => {
    const fixed = solveReadableOnBg(designSystem.primaryHex, semantic.canvas, 4.5);
    setDesignSystem({ primaryHex: fixed });
    flash(`Adjusted Primary to ${fixed} (>= 4.5:1 AA)`);
  };

  return (
    <div className="logo-studio" data-theme={theme}>
      <div className="ds-shell-page">
        <div style={{ position: 'relative', minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <TopBar
            current="systems"
            onShare={() => copyText(JSON.stringify(designSystem, null, 2), 'system JSON')}
          />

          <div className="ds-main-scroll">
            <div className="ds-subhead">
              <div className="ds-title-block">
                <h1>{designSystem.name} · Design System Maker</h1>
                <p>
                  Deterministic OKLCH ramps, modular fluid typography &amp; APCA/WCAG verification (zero AI)
                  {designSystem.seedSlug ? ` · seeded from "${designSystem.seedSlug}"` : ''}
                </p>
              </div>

              <div className="ds-pills-row" role="tablist" aria-label="System Maker Views">
                {([
                  ['preview', 'UI Specimen'],
                  ['components', 'Components'],
                  ['contrast', 'OKLCH & Contrast'],
                  ['export', 'Tokens & Code'],
                ] as const).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={viewTab === id}
                    className={`ds-pill-tab ${viewTab === id ? 'is-active' : ''}`}
                    onClick={() => setViewTab(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <DsSelect
                  variant="pill"
                  ariaLabel="Color blindness vision simulator"
                  value={cvd}
                  onChange={(v) => setCvd(v as CvdMode)}
                  options={CVD_MODES.map((m) => ({ value: m.id, label: m.label }))}
                />
                <a className="ds-action-btn" href="#/create" title="Refine mark in Logo Maker">
                  <span>Logo Maker</span>
                  <Icon name="arrowUpRight" size={13} />
                </a>
                <a className="ds-action-btn is-primary" href="#/brand" onClick={() => flash('Synced to Brand Maker')}>
                  <span>Brand Maker</span>
                  <Icon name="arrowUpRight" size={13} />
                </a>
              </div>
            </div>

            {viewTab === 'preview' && (
              <div
                className="ds-preview-frame"
                style={{
                  background: cvdHex(semantic.canvas),
                  color: cvdHex(semantic.ink),
                  ...fontStyleFor(designSystem.bodyFont, 'body'),
                  borderColor: semantic.border,
                  ['--sb-accent' as string]: cvdHex(semantic.accent),
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 16,
                    marginBottom: 20,
                    borderBottom: `1px solid ${semantic.border}`,
                    flexWrap: 'wrap',
                    gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: radii.md,
                        background: cvdHex(semantic.brand),
                        color: cvdHex(semantic.brandFg),
                        display: 'grid',
                        placeItems: 'center',
                        padding: 6,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: adaptSvgPaintForSurface(activeMark.svg, cvdHex(semantic.brandFg), 'sm-mk-'),
                      }}
                    />
                    <strong style={{ ...fontStyleFor(designSystem.displayFont, 'display'), fontSize: 15 }}>{designSystem.name}</strong>
                    <span
                      style={{
                        ...fontStyleFor(designSystem.monoFont, 'mono'),
                        fontSize: 10.5,
                        padding: '2px 8px',
                        borderRadius: radii.pill,
                        background: cvdHex(semantic.surfaceAlt),
                        color: cvdHex(semantic.muted),
                      }}
                    >
                      v1.0 · OKLCH
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      type="button"
                      style={{
                        padding: `${Math.round(designSystem.baseSpacePx * 0.9)}px ${Math.round(designSystem.baseSpacePx * 1.8)}px`,
                        borderRadius: radii.md,
                        background: cvdHex(semantic.surfaceAlt),
                        color: cvdHex(semantic.ink),
                        border: `1px solid ${semantic.border}`,
                        fontSize: 12.5,
                        fontWeight: 500,
                      }}
                    >
                      Documentation
                    </button>
                    <button
                      type="button"
                      style={{
                        padding: `${Math.round(designSystem.baseSpacePx * 0.9)}px ${Math.round(designSystem.baseSpacePx * 2)}px`,
                        borderRadius: radii.md,
                        background: cvdHex(semantic.brand),
                        color: cvdHex(semantic.brandFg),
                        fontSize: 12.5,
                        fontWeight: 600,
                        boxShadow: semantic.shadowSm,
                      }}
                    >
                      Deploy System
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                  <div
                    style={{
                      padding: designSystem.baseSpacePx * 2.5,
                      borderRadius: radii.lg,
                      background: cvdHex(semantic.surface),
                      border: `1px solid ${semantic.border}`,
                      boxShadow: semantic.shadowMd,
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: 10.5,
                        fontWeight: 600,
                        padding: '3px 9px',
                        borderRadius: radii.pill,
                        background: `${cvdHex(semantic.secondary)}22`,
                        color: cvdHex(semantic.secondary),
                        marginBottom: 10,
                      }}
                    >
                      Concentric Radius Check ({radii.lg} → {radii.innerNested})
                    </span>
                    <h2
                      style={{
                        ...fontStyleFor(designSystem.displayFont, 'display'),
                        fontSize: typeScale[2].px,
                        lineHeight: typeScale[2].lineHeight,
                        letterSpacing: `${typeScale[2].trackingEm}em`,
                        margin: '0 0 8px',
                      }}
                    >
                      {designSystem.tagline}
                    </h2>
                    <p style={{ margin: '0 0 16px', fontSize: typeScale[4].px * 0.88, color: cvdHex(semantic.muted), lineHeight: 1.5 }}>
                      Outer container radius {radii.lg} minus padding computes an exact {radii.innerNested} inner inset radius automatically.
                    </p>
                    <div
                      style={{
                        padding: designSystem.baseSpacePx * 1.5,
                        borderRadius: radii.innerNested,
                        background: cvdHex(semantic.surfaceAlt),
                        border: `1px solid ${semantic.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10,
                      }}
                    >
                      <span style={{ ...fontStyleFor(designSystem.monoFont, 'mono'), fontSize: 11.5 }}>
                        Ratio {designSystem.typeRatio} · Base {designSystem.baseSpacePx}px
                      </span>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: radii.sm,
                          background: cvdHex(semantic.success),
                          color: '#09090b',
                          fontWeight: 600,
                          fontSize: 11,
                        }}
                      >
                        AA Pass
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: designSystem.baseSpacePx * 2.5,
                      borderRadius: radii.lg,
                      background: cvdHex(semantic.surface),
                      border: `1px solid ${semantic.border}`,
                      boxShadow: semantic.shadowMd,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600 }}>Interactive Controls &amp; States</div>
                    <input
                      readOnly
                      value="design-system@sourcebook.dev"
                      style={{
                        padding: '9px 12px',
                        borderRadius: radii.md,
                        background: cvdHex(semantic.canvas),
                        border: `1px solid ${semantic.borderStrong}`,
                        color: cvdHex(semantic.ink),
                        fontSize: 13,
                        outline: 'none',
                      }}
                    />
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ padding: '5px 10px', borderRadius: radii.pill, background: `${cvdHex(semantic.success)}22`, color: cvdHex(semantic.success), fontSize: 11.5, fontWeight: 600 }}>Success 500</span>
                      <span style={{ padding: '5px 10px', borderRadius: radii.pill, background: `${cvdHex(semantic.warning)}22`, color: cvdHex(semantic.warning), fontSize: 11.5, fontWeight: 600 }}>Warning 500</span>
                      <span style={{ padding: '5px 10px', borderRadius: radii.pill, background: `${cvdHex(semantic.danger)}22`, color: cvdHex(semantic.danger), fontSize: 11.5, fontWeight: 600 }}>Danger 500</span>
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
                      <button
                        type="button"
                        style={{
                          flex: 1,
                          padding: '9px 14px',
                          borderRadius: radii.md,
                          background: cvdHex(semantic.brand),
                          color: cvdHex(semantic.brandFg),
                          fontWeight: 600,
                          fontSize: 12.5,
                        }}
                      >
                        Primary CTA
                      </button>
                      <button
                        type="button"
                        style={{
                          flex: 1,
                          padding: '9px 14px',
                          borderRadius: radii.md,
                          background: cvdHex(semantic.secondary),
                          color: cvdHex(semantic.secondaryFg),
                          fontWeight: 600,
                          fontSize: 12.5,
                        }}
                      >
                        Secondary CTA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {viewTab === 'components' && (
              <div
                className="ds-preview-frame"
                style={{ background: cvdHex(semantic.canvas), color: cvdHex(semantic.ink), ...fontStyleFor(designSystem.bodyFont, 'body') }}
              >
                <div style={{ display: 'grid', gap: 18 }}>
                  <div>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.07em', color: cvdHex(semantic.muted), marginBottom: 10 }}>
                      Modular Type Ladder (Ratio {designSystem.typeRatio})
                    </div>
                    {typeScale.map((t) => (
                      <div
                        key={t.token}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '70px 92px 1fr',
                          alignItems: 'baseline',
                          gap: 12,
                          padding: '6px 0',
                          borderBottom: `1px solid ${semantic.border}`,
                        }}
                      >
                        <code style={{ ...fontStyleFor(designSystem.monoFont, 'mono'), fontSize: 11, color: cvdHex(semantic.brand) }}>{t.token}</code>
                        <span style={{ ...fontStyleFor(designSystem.monoFont, 'mono'), fontSize: 11, color: cvdHex(semantic.muted) }}>{t.px}px</span>
                        <span
                          style={{
                            ...fontStyleFor(
                              t.token === 'display' || t.token.startsWith('h') ? designSystem.displayFont : designSystem.bodyFont,
                              t.token === 'display' || t.token.startsWith('h') ? 'display' : 'body',
                            ),
                            fontSize: Math.min(t.px, 44),
                            fontWeight: t.weight,
                            lineHeight: t.lineHeight,
                            letterSpacing: `${t.trackingEm}em`,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          The quick brown fox jumps over the lazy dog
                        </span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.07em', color: cvdHex(semantic.muted), marginBottom: 10 }}>
                      Spacing Rhythm ({designSystem.baseSpacePx}px unit)
                    </div>
                    <div style={{ display: 'grid', gap: 6 }}>
                      {spacingScale.map((s) => (
                        <div key={s.token} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <code style={{ width: 64, ...fontStyleFor(designSystem.monoFont, 'mono'), fontSize: 11, color: cvdHex(semantic.muted) }}>
                            space-{s.token}
                          </code>
                          <span style={{ width: 46, ...fontStyleFor(designSystem.monoFont, 'mono'), fontSize: 11 }}>{s.px}px</span>
                          <div style={{ height: 10, width: Math.max(4, s.px * 3), borderRadius: radii.sm, background: cvdHex(semantic.brand) }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {viewTab === 'contrast' && (
              <div style={{ display: 'grid', gap: 18 }}>
                <div className="ds-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <strong style={{ fontSize: 13 }}>WCAG 2.2 + APCA Contrast Audit</strong>
                    <button type="button" className="ds-action-btn" onClick={autoFixPrimary}>
                      Auto-Fix Primary Contrast
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                    {audits.map((a) => (
                      <div
                        key={a.pair}
                        style={{
                          padding: '10px 12px',
                          borderRadius: 9,
                          background: a.bg,
                          color: a.fg,
                          border: '1px solid rgba(127,127,127,0.22)',
                        }}
                      >
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{a.pair}</div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 6, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                          <span>WCAG {a.wcag}:1</span>
                          <span>APCA Lc {a.apca}</span>
                          <span>{a.aaaPass ? 'AAA' : a.aaPass ? 'AA' : 'FAIL'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ds-card">
                  <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 12 }}>
                    Perceptual OKLCH 50–950 Ramps (click any chip to copy HEX)
                  </div>
                  {(['primary', 'secondary', 'accent', 'neutral', 'success', 'warning', 'danger'] as const).map((name) => (
                    <div key={name} className="ds-ramp-row">
                      <span className="ds-ramp-label">{name}</span>
                      {ramps[name].map((s) => {
                        const sim = cvdHex(s.hex);
                        const fg = s.onDarkContrast > s.onLightContrast ? '#fafafa' : '#09090b';
                        return (
                          <button
                            key={s.step}
                            type="button"
                            className="ds-ramp-chip"
                            style={{ background: sim, color: fg }}
                            title={`${name}-${s.step}: ${s.hex} (${s.oklch})`}
                            onClick={() => copyText(s.hex, `${name}-${s.step} ${s.hex}`)}
                          >
                            <span>{s.step}</span>
                            <span style={{ opacity: 0.78 }}>{s.hex}</span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {viewTab === 'export' && (
              <div className="ds-card">
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div className="ds-pills-row">
                    {([
                      ['css', 'CSS Variables'],
                      ['tailwind', 'Tailwind v4 @theme'],
                      ['dtcg', 'DTCG tokens.json'],
                      ['designmd', 'DESIGN.md'],
                    ] as const).map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        className={`ds-pill-tab ${exportTab === id ? 'is-active' : ''}`}
                        onClick={() => setExportTab(id)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" className="ds-action-btn" onClick={() => copyText(codeText, exportTab.toUpperCase())}>
                      <Icon name="copy" size={13} /> Copy
                    </button>
                    <button
                      type="button"
                      className="ds-action-btn is-primary"
                      onClick={() => {
                        const ext = exportTab === 'dtcg' ? 'tokens.json' : exportTab === 'designmd' ? 'DESIGN.md' : 'tokens.css';
                        downloadFile(codeText, ext);
                      }}
                    >
                      <Icon name="download" size={13} /> Download
                    </button>
                  </div>
                </div>
                <pre className="ds-code-pre">{codeText}</pre>
              </div>
            )}
          </div>
        </div>

        <aside className="studio-inspector" aria-label="Design System Parameters">
          <div className="studio-tabs">
            <button type="button" className="studio-tab" aria-selected="true">
              System Controls
            </button>
            <button
              type="button"
              className="studio-tab"
              aria-selected="false"
              onClick={() => { resetDesignSystem(); flash('Reset system defaults'); }}
            >
              Reset All
            </button>
          </div>

          <div className="studio-panel-scroll">
            <div className="studio-section">
              <div className="studio-section-title">
                <span>Seed From 208 Systems DB</span>
              </div>
              <input
                type="search"
                placeholder="Filter e.g. google, vercel, spotify..."
                value={seedQuery}
                onChange={(e) => setSeedQuery(e.target.value)}
                style={{
                  width: '100%',
                  height: 32,
                  padding: '0 10px',
                  borderRadius: 7,
                  border: '1px solid var(--studio-panel-border)',
                  background: 'var(--studio-panel-control)',
                  fontSize: 12,
                  marginBottom: 8,
                }}
              />
              <div className="page-field">
                <span>Basis System</span>
                <DsSelect
                  fullWidth
                  searchable
                  ariaLabel="Seed from verified design system"
                  value={designSystem.seedSlug || ''}
                  onChange={async (slug) => {
                    if (!slug) return;
                    await seedFromSystemSlug(slug);
                    flash(`Seeded from ${slug}`);
                  }}
                  options={[
                    { value: '', label: 'Choose system…', meta: String(filteredSeeds.length) },
                    ...filteredSeeds.map((s) => ({
                      value: s.slug,
                      label: s.name,
                      meta: s.theme,
                    })),
                  ]}
                />
              </div>
            </div>

            <div className="studio-section">
              <div className="studio-section-title"><span>Identity &amp; Polarity</span></div>
              <label className="page-field">
                <span>System Name</span>
                <input
                  value={designSystem.name}
                  onChange={(e) => setDesignSystem({ name: e.target.value })}
                />
              </label>
              <label className="page-field">
                <span>Social Handle</span>
                <input
                  value={designSystem.handle}
                  onChange={(e) => setDesignSystem({ handle: e.target.value })}
                />
              </label>
              <div className="param-row">
                <span className="param-label">Surface Mode</span>
                <div className="segment">
                  <button
                    type="button"
                    aria-pressed={designSystem.polarity === 'dark'}
                    onClick={() => {
                      setDesignSystem({ polarity: 'dark' });
                      setTheme('dark');
                    }}
                  >
                    Dark
                  </button>
                  <button
                    type="button"
                    aria-pressed={designSystem.polarity === 'light'}
                    onClick={() => {
                      setDesignSystem({ polarity: 'light' });
                      setTheme('light');
                    }}
                  >
                    Light
                  </button>
                </div>
              </div>
            </div>

            <div className="studio-section">
              <div className="studio-section-title">
                <span>OKLCH Palette &amp; Harmony</span>
                <button type="button" onClick={autoFixPrimary}>Auto-AA</button>
              </div>
              {([
                ['Primary Seed', 'primaryHex'],
                ['Secondary', 'secondaryHex'],
                ['Accent', 'accentHex'],
              ] as const).map(([label, key]) => (
                <label key={key} className="param-row is-color">
                  <span className="param-label">{label}</span>
                  <span className="param-value">
                    {designSystem[key]}
                    <span className="param-swatch" style={{ background: designSystem[key] }} />
                  </span>
                  <input
                    type="color"
                    value={designSystem[key]}
                    onChange={(e) => setDesignSystem({ [key]: e.target.value })}
                  />
                </label>
              ))}
              <div className="page-chip-row">
                {HARMONIES.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    className={`page-chip ${designSystem.harmony === h.id ? 'is-active' : ''}`}
                    onClick={() => applyHarmony(h.id)}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
              <div className="param-row" style={{ marginTop: 10 }}>
                <span className="param-label">Neutral Temp</span>
                <input
                  type="range"
                  min={-1}
                  max={1}
                  step={0.05}
                  value={designSystem.neutralTemp}
                  onChange={(e) => setDesignSystem({ neutralTemp: Number(e.target.value) })}
                  style={{ width: 110, accentColor: 'var(--studio-accent)' }}
                />
                <span className="param-value">{designSystem.neutralTemp > 0 ? 'Warm' : designSystem.neutralTemp < 0 ? 'Cool' : 'Pure'}</span>
              </div>
            </div>

            <div className="studio-section">
              <div className="studio-section-title"><span>Typography Scale</span></div>
              <div className="param-row">
                <span className="param-label">Display</span>
                <DsSelect
                  variant="row"
                  ariaLabel="Display font"
                  value={resolveFontOption(designSystem.displayFont, 'display').id}
                  onChange={(displayFont) => setDesignSystem({ displayFont })}
                  options={FONT_OPTIONS.map((f) => ({ value: f.id, label: f.label, meta: f.meta }))}
                />
              </div>
              <div className="param-row">
                <span className="param-label">Body</span>
                <DsSelect
                  variant="row"
                  ariaLabel="Body font"
                  value={resolveFontOption(designSystem.bodyFont, 'body').id}
                  onChange={(bodyFont) => setDesignSystem({ bodyFont })}
                  options={FONT_OPTIONS.map((f) => ({ value: f.id, label: f.label, meta: f.meta }))}
                />
              </div>
              <div className="param-row">
                <span className="param-label">Mono</span>
                <DsSelect
                  variant="row"
                  ariaLabel="Mono font"
                  value={resolveFontOption(designSystem.monoFont, 'mono').id}
                  onChange={(monoFont) => setDesignSystem({ monoFont })}
                  options={MONO_OPTIONS.map((f) => ({ value: f.id, label: f.label, meta: f.meta }))}
                />
              </div>
              <div className="param-row">
                <span className="param-label">Ratio</span>
                <DsSelect
                  variant="row"
                  ariaLabel="Type ratio"
                  value={String(designSystem.typeRatio)}
                  onChange={(v) => setDesignSystem({ typeRatio: Number(v) })}
                  options={TYPE_RATIOS.map((tr) => ({
                    value: String(tr.value),
                    label: tr.label,
                    meta: String(tr.value),
                  }))}
                />
              </div>
              <div className="param-row">
                <span className="param-label">Base px</span>
                <input
                  type="range"
                  min={13}
                  max={19}
                  step={1}
                  value={designSystem.baseFontPx}
                  onChange={(e) => setDesignSystem({ baseFontPx: Number(e.target.value) })}
                  style={{ width: 100, accentColor: 'var(--studio-accent)' }}
                />
                <span className="param-value">{designSystem.baseFontPx}px</span>
              </div>
            </div>

            <div className="studio-section">
              <div className="studio-section-title"><span>Spacing, Radius &amp; Elevation</span></div>
              <div className="param-row">
                <span className="param-label">Space Unit</span>
                <div className="segment">
                  {[4, 6, 8].map((u) => (
                    <button
                      key={u}
                      type="button"
                      aria-pressed={designSystem.baseSpacePx === u}
                      onClick={() => setDesignSystem({ baseSpacePx: u })}
                    >
                      {u}px
                    </button>
                  ))}
                </div>
              </div>
              <div className="param-row">
                <span className="param-label">Radius Base</span>
                <input
                  type="range"
                  min={0}
                  max={20}
                  step={1}
                  value={designSystem.baseRadiusPx}
                  onChange={(e) => setDesignSystem({ baseRadiusPx: Number(e.target.value) })}
                  style={{ width: 100, accentColor: 'var(--studio-accent)' }}
                />
                <span className="param-value">{designSystem.baseRadiusPx}px</span>
              </div>
              <div className="page-chip-row">
                {ELEVATIONS.map((el) => (
                  <button
                    key={el.id}
                    type="button"
                    className={`page-chip ${designSystem.elevationStyle === el.id ? 'is-active' : ''}`}
                    onClick={() => setDesignSystem({ elevationStyle: el.id })}
                  >
                    {el.label}
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
