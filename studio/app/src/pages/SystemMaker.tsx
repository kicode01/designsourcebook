import { useEffect, useMemo, useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Icon } from '../components/icons';
import { DsSelect } from '../components/DsSelect';
import { MarkPickerDialog } from '../components/Dialogs';
import { SpecimenShowcase } from '../components/system-maker/SpecimenShowcase';
import { ComponentKitchenSink } from '../components/system-maker/ComponentKitchenSink';
import { OklchContrastLab } from '../components/system-maker/OklchContrastLab';
import { TypeGeometryLab } from '../components/system-maker/TypeGeometryLab';
import { AppleLiquidGlassStage } from '../easter-eggs/SystemEasterEggs';
import { sanitizeSvg } from '../engine/svgAnatomy';
import {
  FONT_OPTIONS,
  MONO_OPTIONS,
  SYSTEM_ARCHETYPES,
  TYPE_RATIOS,
  applyCvdSimulation,
  exportDesignSystem,
  harmonyPair,
  isValidHexInput,
  normalizeHex,
  randomizeDesignSystem,
  resolveFontOption,
  solveReadableOnBg,
  type CvdMode,
  type DensityMode,
  type DesignSystemDoc,
  type ElevationStyle,
  type ExportFormatId,
  type HarmonyMode,
  type SurfaceContrastMode,
} from '../engine/dsEngine';
import { useProject } from '../state/project';

type ViewTab = 'preview' | 'components' | 'contrast' | 'type' | 'export';

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

const EXPORT_FORMATS: { id: ExportFormatId; label: string; filename: string }[] = [
  { id: 'css', label: 'CSS (:root + .dark)', filename: 'tokens.css' },
  { id: 'shadcn', label: 'shadcn/ui', filename: 'shadcn-theme.css' },
  { id: 'tailwind', label: 'Tailwind v4', filename: 'tailwind-theme.css' },
  { id: 'dtcg', label: 'DTCG JSON', filename: 'tokens.json' },
  { id: 'figma', label: 'Figma Variables', filename: 'figma-variables.json' },
  { id: 'ts', label: 'TypeScript', filename: 'theme.ts' },
  { id: 'designmd', label: 'DESIGN.md', filename: 'DESIGN.md' },
];

function HexColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const commit = (raw: string) => {
    if (isValidHexInput(raw)) {
      const norm = normalizeHex(raw);
      setDraft(norm);
      onChange(norm);
    } else {
      setDraft(value);
    }
  };

  return (
    <div className="param-row ds-hex-row">
      <span className="param-label">{label}</span>
      <div className="ds-hex-controls">
        <input
          type="text"
          className="ds-hex-input"
          value={draft}
          spellCheck={false}
          aria-label={`${label} hex value`}
          onChange={(e) => {
            const v = e.target.value;
            setDraft(v);
            if (isValidHexInput(v)) onChange(normalizeHex(v));
          }}
          onBlur={() => commit(draft)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit(draft);
          }}
        />
        <label className="ds-swatch-btn" title={`Pick ${label} color`}>
          <span className="param-swatch" style={{ background: value }} />
          <input
            type="color"
            value={normalizeHex(value)}
            aria-label={`${label} color picker`}
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

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
    setActiveMark,
  } = useProject();

  const [viewTab, setViewTab] = useState<ViewTab>('preview');
  const [exportTab, setExportTab] = useState<ExportFormatId>('css');
  const [tokenFilter, setTokenFilter] = useState('');
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [statusColorsOpen, setStatusColorsOpen] = useState(false);
  const [markOpen, setMarkOpen] = useState(false);
  const [cvd, setCvd] = useState<CvdMode>('normal');
  const [seedQuery, setSeedQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  };

  const cvdHex = (hex: string) => applyCvdSimulation(hex, cvd);
  const { semantic, audits } = compiledSystem;
  const aaPassCount = audits.filter((a) => a.aaPass).length;

  const filteredSeeds = useMemo(() => {
    const q = seedQuery.trim().toLowerCase();
    const list = catalogSystems.filter((s) => s.provenance !== 'listed' && s.brand);
    if (!q) return list.slice(0, 80);
    return list
      .filter((s) => s.name.toLowerCase().includes(q) || (s.org || '').toLowerCase().includes(q) || s.slug.toLowerCase().includes(q))
      .slice(0, 80);
  }, [catalogSystems, seedQuery]);

  const codeText = useMemo(
    () => exportDesignSystem(designSystem, compiledSystem, exportTab),
    [designSystem, compiledSystem, exportTab],
  );

  const filteredCode = useMemo(() => {
    const q = tokenFilter.trim().toLowerCase();
    const allLines = codeText.split('\n');
    if (!q) return { text: codeText, shown: allLines.length, total: allLines.length };
    const matched = allLines.filter((l) => l.toLowerCase().includes(q));
    return { text: matched.join('\n') || '// No tokens matched filter', shown: matched.length, total: allLines.length };
  }, [codeText, tokenFilter]);

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

  const autoFixPrimary = (targetWcag = 4.5) => {
    const fixed = solveReadableOnBg(designSystem.primaryHex, semantic.canvas, targetWcag);
    setDesignSystem({ primaryHex: fixed });
    flash(`Adjusted Primary to ${fixed} (≥ ${targetWcag}:1)`);
  };

  const applyArchetype = (patch: Partial<DesignSystemDoc>, label: string) => {
    setDesignSystem(patch);
    if (patch.polarity) setTheme(patch.polarity);
    flash(`Applied ${label}`);
  };

  const handleRandomize = () => {
    const patch = randomizeDesignSystem(designSystem.polarity);
    setDesignSystem(patch);
    flash('Generated new OKLCH harmony');
  };

  const handleImportTokens = () => {
    const raw = importText.trim();
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Partial<DesignSystemDoc>;
      if (parsed && typeof parsed === 'object' && parsed.primaryHex) {
        const patch: Partial<DesignSystemDoc> = {
          ...(parsed.name ? { name: String(parsed.name) } : {}),
          ...(parsed.tagline ? { tagline: String(parsed.tagline) } : {}),
          ...(parsed.handle ? { handle: String(parsed.handle) } : {}),
          ...(parsed.polarity === 'light' || parsed.polarity === 'dark' ? { polarity: parsed.polarity } : {}),
          primaryHex: normalizeHex(parsed.primaryHex),
          ...(parsed.secondaryHex ? { secondaryHex: normalizeHex(parsed.secondaryHex) } : {}),
          ...(parsed.accentHex ? { accentHex: normalizeHex(parsed.accentHex) } : {}),
          ...(typeof parsed.baseRadiusPx === 'number' ? { baseRadiusPx: parsed.baseRadiusPx } : {}),
        };
        setDesignSystem(patch);
        if (patch.polarity) setTheme(patch.polarity);
        setImportOpen(false);
        flash('Imported system JSON');
        return;
      }
    } catch {
      // Fall through to hex extraction
    }
    const hexes = Array.from(new Set((raw.match(/#[0-9a-fA-F]{3,6}\b/g) || []).map((h) => normalizeHex(h))));
    if (hexes.length > 0) {
      setDesignSystem({
        primaryHex: hexes[0],
        ...(hexes[1] ? { secondaryHex: hexes[1] } : {}),
        ...(hexes[2] ? { accentHex: hexes[2] } : {}),
      });
      setImportOpen(false);
      flash(`Imported ${hexes.length} hex color${hexes.length > 1 ? 's' : ''}`);
      return;
    }
    flash('Paste valid DesignSystem JSON or #hex colors');
  };

  const activeExportFormat = EXPORT_FORMATS.find((f) => f.id === exportTab) || EXPORT_FORMATS[0];

  return (
    <div className="logo-studio" data-theme={theme}>
      <TopBar
        current="systems"
        onShare={() => copyText(JSON.stringify(designSystem, null, 2), 'system JSON')}
      />
      <div className="ds-shell-page">
        <div style={{ position: 'relative', minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <div className="ds-main-scroll" style={{ flex: 1 }}>
            <div className="ds-subhead">
              <div className="ds-title-block">
                <h1>{designSystem.name} · Design System Maker</h1>
                <p>
                  Deterministic OKLCH ramps, dual-polarity tokens, Utopia fluid typography &amp; WCAG/APCA matrix
                  {designSystem.seedSlug ? ` · seeded from "${designSystem.seedSlug}"` : ''}
                </p>
              </div>

              <div className="ds-subhead-bar">
                <div className="ds-pills-row" role="tablist" aria-label="System Maker Views">
                  {([
                    ['preview', 'UI Specimen'],
                    ['components', 'Components'],
                    ['contrast', 'OKLCH & Contrast'],
                    ['type', 'Type & Geometry'],
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

                <div className="ds-subhead-actions">
                  <button
                    type="button"
                    className={`ds-health-pill ${aaPassCount === audits.length ? 'is-ok' : 'is-warn'}`}
                    onClick={() => setViewTab('contrast')}
                    title="View contrast audit details"
                  >
                    <span className="ds-health-dot" />
                    <span>{aaPassCount}/{audits.length} AA</span>
                  </button>
                  <DsSelect
                    variant="pill"
                    ariaLabel="Color blindness vision simulator"
                    value={cvd}
                    onChange={(v) => setCvd(v as CvdMode)}
                    options={CVD_MODES.map((m) => ({ value: m.id, label: m.label }))}
                  />
                  <button type="button" className="ds-action-btn" onClick={() => setMarkOpen(true)} title="Pick Brand Mark or SVG Icon">
                    <span>Mark: {activeMark.name}</span>
                  </button>
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
            </div>

            {viewTab === 'preview' && (
              <div style={{ display: 'grid', gap: 18 }}>
                {designSystem.seedSlug === 'apple' && (
                  <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${semantic.border}` }}>
                    <AppleLiquidGlassStage
                      compact
                      systemName={designSystem.name}
                      overview={designSystem.tagline}
                      defaultPolarity={theme}
                    />
                  </div>
                )}
                <SpecimenShowcase
                  doc={designSystem}
                  compiled={compiledSystem}
                  activeMark={activeMark}
                  cvdHex={cvdHex}
                  onOpenMarkPicker={() => setMarkOpen(true)}
                  onFlash={flash}
                />
              </div>
            )}

            {viewTab === 'components' && (
              <ComponentKitchenSink
                doc={designSystem}
                compiled={compiledSystem}
                cvdHex={cvdHex}
                onChangeDensity={(density) => setDesignSystem({ density })}
                onFlash={flash}
              />
            )}

            {viewTab === 'contrast' && (
              <OklchContrastLab
                compiled={compiledSystem}
                cvdHex={cvdHex}
                onAutoFixPrimary={autoFixPrimary}
                onCopyText={copyText}
              />
            )}

            {viewTab === 'type' && (
              <TypeGeometryLab
                doc={designSystem}
                compiled={compiledSystem}
                cvdHex={cvdHex}
                onCopyText={copyText}
              />
            )}

            {viewTab === 'export' && (
              <div className="ds-card" style={{ display: 'grid', gap: 12 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                  <div className="ds-pills-row">
                    {EXPORT_FORMATS.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        className={`ds-pill-tab ${exportTab === f.id ? 'is-active' : ''}`}
                        onClick={() => setExportTab(f.id)}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button type="button" className="ds-action-btn" onClick={() => setImportOpen((v) => !v)}>
                      <Icon name="upload" size={13} /> Import
                    </button>
                    <button type="button" className="ds-action-btn" onClick={() => copyText(codeText, activeExportFormat.label)}>
                      <Icon name="copy" size={13} /> Copy
                    </button>
                    <button
                      type="button"
                      className="ds-action-btn is-primary"
                      onClick={() => downloadFile(codeText, activeExportFormat.filename)}
                    >
                      <Icon name="download" size={13} /> Download
                    </button>
                  </div>
                </div>

                {importOpen && (
                  <div className="ds-import-box">
                    <textarea
                      rows={3}
                      className="ds-import-textarea"
                      placeholder="Paste DesignSystem JSON or any hex colors (e.g. #0ea5e9 #f59e0b #10b981)…"
                      value={importText}
                      onChange={(e) => setImportText(e.target.value)}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                      <button type="button" className="ds-action-btn" onClick={() => setImportOpen(false)}>Cancel</button>
                      <button type="button" className="ds-action-btn is-primary" onClick={handleImportTokens}>Apply Import</button>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <input
                    type="search"
                    className="ds-seed-input"
                    style={{ maxWidth: 280 }}
                    placeholder="Filter generated tokens (e.g. brand, radius, clamp)…"
                    value={tokenFilter}
                    onChange={(e) => setTokenFilter(e.target.value)}
                  />
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--studio-muted)' }}>
                    {filteredCode.shown} / {filteredCode.total} lines · {activeExportFormat.filename}
                  </span>
                </div>

                <pre className="ds-code-pre">{filteredCode.text}</pre>
              </div>
            )}
          </div>
        </div>

        <aside className="studio-inspector" aria-label="Design System Parameters">
          <div className="studio-tabs ds-inspector-tabs">
            <button type="button" className="studio-tab" aria-selected="true">
              System Controls
            </button>
            <div className="ds-inspector-quick">
              <button
                type="button"
                className="ds-quick-btn"
                onClick={handleRandomize}
                title="Generate harmonious OKLCH system"
              >
                <Icon name="sparkle" size={12} /> Random
              </button>
              <button
                type="button"
                className="ds-quick-btn"
                onClick={() => autoFixPrimary(4.5)}
                title="Enforce >= 4.5:1 AA contrast on primary"
              >
                AA
              </button>
              <button
                type="button"
                className="ds-quick-btn"
                onClick={() => {
                  resetDesignSystem();
                  setTheme('dark');
                  flash('Reset system defaults');
                }}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="studio-panel-scroll">
            <div className="studio-section">
              <div className="studio-section-title">
                <span>Seed From {catalogSystems.length || 208} Systems DB</span>
              </div>
              <div className="ds-seed-input-wrap">
                <input
                  className="ds-seed-input"
                  type="search"
                  placeholder="Filter e.g. apple, google, vercel, linear..."
                  value={seedQuery}
                  onChange={(e) => setSeedQuery(e.target.value)}
                />
              </div>
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
              <div className="studio-field-label" style={{ marginTop: 10 }}>Curated Archetypes</div>
              <div className="page-chip-row" style={{ marginTop: 0 }}>
                {SYSTEM_ARCHETYPES.map((arch) => (
                  <button
                    key={arch.id}
                    type="button"
                    className={`page-chip ${designSystem.name === arch.patch.name && !designSystem.seedSlug ? 'is-active' : ''}`}
                    title={arch.description}
                    onClick={() => applyArchetype(arch.patch, arch.label)}
                  >
                    {arch.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="studio-section">
              <div className="studio-section-title">
                <span>Identity, Mark &amp; Polarity</span>
                <button type="button" onClick={() => setMarkOpen(true)}>Change Mark</button>
              </div>
              <label className="page-field">
                <span>System Name</span>
                <input
                  value={designSystem.name}
                  onChange={(e) => setDesignSystem({ name: e.target.value })}
                />
              </label>
              <label className="page-field">
                <span>Tagline</span>
                <input
                  value={designSystem.tagline}
                  onChange={(e) => setDesignSystem({ tagline: e.target.value })}
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
                <button type="button" onClick={() => setStatusColorsOpen((v) => !v)}>
                  {statusColorsOpen ? 'Hide Status' : 'Status Colors'}
                </button>
              </div>
              <HexColorRow
                label="Primary Seed"
                value={designSystem.primaryHex}
                onChange={(primaryHex) => setDesignSystem({ primaryHex })}
              />
              <HexColorRow
                label="Secondary"
                value={designSystem.secondaryHex}
                onChange={(secondaryHex) => setDesignSystem({ secondaryHex })}
              />
              <HexColorRow
                label="Accent"
                value={designSystem.accentHex}
                onChange={(accentHex) => setDesignSystem({ accentHex })}
              />

              {statusColorsOpen && (
                <div style={{ marginTop: 4 }}>
                  <HexColorRow
                    label="Success"
                    value={designSystem.successHex || '#10b981'}
                    onChange={(successHex) => setDesignSystem({ successHex })}
                  />
                  <HexColorRow
                    label="Warning"
                    value={designSystem.warningHex || '#f59e0b'}
                    onChange={(warningHex) => setDesignSystem({ warningHex })}
                  />
                  <HexColorRow
                    label="Danger"
                    value={designSystem.dangerHex || '#ef4444'}
                    onChange={(dangerHex) => setDesignSystem({ dangerHex })}
                  />
                  <HexColorRow
                    label="Info"
                    value={designSystem.infoHex || '#3b82f6'}
                    onChange={(infoHex) => setDesignSystem({ infoHex })}
                  />
                </div>
              )}

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
                <span className="param-label">Chroma Boost</span>
                <input
                  type="range"
                  min={0.5}
                  max={1.35}
                  step={0.05}
                  value={designSystem.chromaBoost ?? 1}
                  onChange={(e) => setDesignSystem({ chromaBoost: Number(e.target.value) })}
                  style={{ width: 100, accentColor: 'var(--studio-accent)' }}
                />
                <span className="param-value">{(designSystem.chromaBoost ?? 1).toFixed(2)}x</span>
              </div>
              <div className="param-row">
                <span className="param-label">Neutral Temp</span>
                <input
                  type="range"
                  min={-1}
                  max={1}
                  step={0.05}
                  value={designSystem.neutralTemp}
                  onChange={(e) => setDesignSystem({ neutralTemp: Number(e.target.value) })}
                  style={{ width: 100, accentColor: 'var(--studio-accent)' }}
                />
                <span className="param-value">{designSystem.neutralTemp > 0 ? 'Warm' : designSystem.neutralTemp < 0 ? 'Cool' : 'Pure'}</span>
              </div>
              <div className="param-row">
                <span className="param-label">Contrast</span>
                <div className="segment">
                  {(['subtle', 'balanced', 'high'] as SurfaceContrastMode[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={(designSystem.surfaceContrast || 'balanced') === m}
                      onClick={() => setDesignSystem({ surfaceContrast: m })}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="studio-section">
              <div className="studio-section-title"><span>Fluid Typography</span></div>
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
              <div className="param-row">
                <span className="param-label">Heading Wt</span>
                <div className="segment">
                  {[600, 700, 800].map((w) => (
                    <button
                      key={w}
                      type="button"
                      aria-pressed={(designSystem.headingWeight ?? 700) === w}
                      onClick={() => setDesignSystem({ headingWeight: w })}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
              <div className="param-row">
                <span className="param-label">Line Height</span>
                <input
                  type="range"
                  min={1.4}
                  max={1.75}
                  step={0.05}
                  value={designSystem.bodyLineHeight ?? 1.55}
                  onChange={(e) => setDesignSystem({ bodyLineHeight: Number(e.target.value) })}
                  style={{ width: 100, accentColor: 'var(--studio-accent)' }}
                />
                <span className="param-value">{(designSystem.bodyLineHeight ?? 1.55).toFixed(2)}</span>
              </div>
              <div className="param-row">
                <span className="param-label">Fluid Scale</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={designSystem.fluidStrength ?? 1}
                  onChange={(e) => setDesignSystem({ fluidStrength: Number(e.target.value) })}
                  style={{ width: 100, accentColor: 'var(--studio-accent)' }}
                />
                <span className="param-value">{Math.round((designSystem.fluidStrength ?? 1) * 100)}%</span>
              </div>
            </div>

            <div className="studio-section">
              <div className="studio-section-title"><span>Geometry, Density &amp; Elevation</span></div>
              <div className="param-row">
                <span className="param-label">UI Density</span>
                <div className="segment">
                  {([
                    ['compact', 'Compact'],
                    ['comfortable', 'Comfort'],
                    ['spacious', 'Spacious'],
                  ] as [DensityMode, string][]).map(([id, lbl]) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={(designSystem.density || 'comfortable') === id}
                      onClick={() => setDesignSystem({ density: id })}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>
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
                  max={24}
                  step={1}
                  value={designSystem.baseRadiusPx}
                  onChange={(e) => setDesignSystem({ baseRadiusPx: Number(e.target.value) })}
                  style={{ width: 100, accentColor: 'var(--studio-accent)' }}
                />
                <span className="param-value">{designSystem.baseRadiusPx}px</span>
              </div>
              <div className="param-row">
                <span className="param-label">Border Width</span>
                <div className="segment">
                  {[1, 1.5, 2].map((bw) => (
                    <button
                      key={bw}
                      type="button"
                      aria-pressed={(designSystem.borderWidthPx ?? 1) === bw}
                      onClick={() => setDesignSystem({ borderWidthPx: bw })}
                    >
                      {bw}px
                    </button>
                  ))}
                </div>
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
              <div className="param-row" style={{ marginTop: 10 }}>
                <span className="param-label">Shadow Depth</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={designSystem.elevationStrength}
                  onChange={(e) => setDesignSystem({ elevationStrength: Number(e.target.value) })}
                  style={{ width: 100, accentColor: 'var(--studio-accent)' }}
                />
                <span className="param-value">{Math.round(designSystem.elevationStrength * 100)}%</span>
              </div>
            </div>
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
              svg: sanitizeSvg(text),
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
