import { useState, type CSSProperties } from 'react';
import { Icon } from '../icons';
import {
  fontStyleFor,
  type CompiledSystem,
  type DensityMode,
  type DesignSystemDoc,
} from '../../engine/dsEngine';

type SimState = 'live' | 'hover' | 'focus' | 'active' | 'disabled';

const SIM_STATES: { id: SimState; label: string }[] = [
  { id: 'live', label: 'Live' },
  { id: 'hover', label: 'Hover' },
  { id: 'focus', label: 'Focus Ring' },
  { id: 'active', label: 'Active' },
  { id: 'disabled', label: 'Disabled' },
];

const DENSITIES: { id: DensityMode; label: string }[] = [
  { id: 'compact', label: 'Compact' },
  { id: 'comfortable', label: 'Comfortable' },
  { id: 'spacious', label: 'Spacious' },
];

export function ComponentKitchenSink({
  doc,
  compiled,
  cvdHex,
  onChangeDensity,
  onFlash,
}: {
  doc: DesignSystemDoc;
  compiled: CompiledSystem;
  cvdHex: (hex: string) => string;
  onChangeDensity: (d: DensityMode) => void;
  onFlash: (msg: string) => void;
}) {
  const [simState, setSimState] = useState<SimState>('live');
  const [segChoice, setSegChoice] = useState<'tokens' | 'preview' | 'audit'>('tokens');
  const [tabChoice, setTabChoice] = useState<'overview' | 'specs' | 'changelog'>('overview');
  const [radioChoice, setRadioChoice] = useState<'oklch' | 'srgb' | 'p3'>('oklch');
  const [checks, setChecks] = useState({ aa: true, fluid: true, dark: false });
  const [switchA, setSwitchA] = useState(true);
  const [switchB, setSwitchB] = useState(false);
  const [sliderVal, setSliderVal] = useState(68);
  const [pageIdx, setPageIdx] = useState(2);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({ r1: true, r2: false, r3: true });
  const [inputVal, setInputVal] = useState('Northwind UI Kit');

  const { semantic: sem, radii } = compiled;
  const density = doc.density || 'comfortable';
  const borderSpec = `${sem.borderWidth} solid ${sem.border}`;
  const cardPad = Math.round(doc.baseSpacePx * 2.2 * sem.densityMult);

  const simFx = (baseShadow?: string): CSSProperties => {
    if (simState === 'disabled') {
      return { opacity: 0.45, pointerEvents: 'none', cursor: 'not-allowed', boxShadow: baseShadow };
    }
    if (simState === 'focus') {
      return {
        outline: 'none',
        boxShadow: `0 0 0 2px ${cvdHex(sem.canvas)}, 0 0 0 4px ${cvdHex(sem.ring)}`,
      };
    }
    if (simState === 'hover') {
      return {
        filter: 'brightness(1.08)',
        transform: 'translateY(-1px)',
        boxShadow: sem.shadowMd,
      };
    }
    if (simState === 'active') {
      return {
        transform: 'scale(0.97)',
        filter: 'brightness(0.94)',
        boxShadow: baseShadow,
      };
    }
    return { boxShadow: baseShadow };
  };

  const cardStyle: CSSProperties = {
    padding: cardPad,
    borderRadius: radii.lg,
    background: cvdHex(sem.surface),
    border: borderSpec,
    boxShadow: sem.shadowSm,
    display: 'grid',
    gap: 12,
    alignContent: 'start',
  };

  const sectionLabelStyle: CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: cvdHex(sem.muted),
    ...fontStyleFor(doc.monoFont, 'mono'),
  };

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div className="ds-lab-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11.5, color: 'var(--studio-muted)', fontWeight: 600 }}>State Simulator</span>
          <div className="ds-pills-row" role="group" aria-label="Component State Simulator">
            {SIM_STATES.map((st) => (
              <button
                key={st.id}
                type="button"
                className={`ds-pill-tab ${simState === st.id ? 'is-active' : ''}`}
                onClick={() => setSimState(st.id)}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11.5, color: 'var(--studio-muted)', fontWeight: 600 }}>Density</span>
          <div className="ds-pills-row" role="group" aria-label="Component Density">
            {DENSITIES.map((d) => (
              <button
                key={d.id}
                type="button"
                className={`ds-pill-tab ${density === d.id ? 'is-active' : ''}`}
                onClick={() => onChangeDensity(d.id)}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="ds-preview-frame"
        style={{
          background: cvdHex(sem.canvas),
          color: cvdHex(sem.ink),
          ...fontStyleFor(doc.bodyFont, 'body'),
          border: `${sem.borderWidth} solid ${sem.borderStrong}`,
          borderRadius: radii.xl,
          display: 'grid',
          gap: 16,
        }}
      >
        <div className="ds-kitchen-grid">
          {/* 1. Buttons & Actions */}
          <section style={cardStyle}>
            <div style={sectionLabelStyle}>01 · Buttons &amp; Actions</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <button
                type="button"
                disabled={simState === 'disabled'}
                onClick={() => onFlash('Primary Button')}
                style={{
                  height: sem.controlHeightMd,
                  padding: '0 14px',
                  borderRadius: radii.md,
                  background: cvdHex(sem.brand),
                  color: cvdHex(sem.brandFg),
                  fontWeight: 600,
                  fontSize: 12.5,
                  ...simFx(sem.shadowSm),
                }}
              >
                Primary
              </button>
              <button
                type="button"
                disabled={simState === 'disabled'}
                style={{
                  height: sem.controlHeightMd,
                  padding: '0 14px',
                  borderRadius: radii.md,
                  background: cvdHex(sem.secondary),
                  color: cvdHex(sem.secondaryFg),
                  fontWeight: 600,
                  fontSize: 12.5,
                  ...simFx(),
                }}
              >
                Secondary
              </button>
              <button
                type="button"
                disabled={simState === 'disabled'}
                style={{
                  height: sem.controlHeightMd,
                  padding: '0 14px',
                  borderRadius: radii.md,
                  background: cvdHex(sem.surfaceAlt),
                  color: cvdHex(sem.ink),
                  border: borderSpec,
                  fontWeight: 500,
                  fontSize: 12.5,
                  ...simFx(),
                }}
              >
                Outline
              </button>
              <button
                type="button"
                disabled={simState === 'disabled'}
                style={{
                  height: sem.controlHeightMd,
                  padding: '0 12px',
                  borderRadius: radii.md,
                  background: 'transparent',
                  color: cvdHex(sem.muted),
                  fontWeight: 500,
                  fontSize: 12.5,
                  ...simFx(),
                }}
              >
                Ghost
              </button>
              <button
                type="button"
                disabled={simState === 'disabled'}
                style={{
                  height: sem.controlHeightMd,
                  padding: '0 14px',
                  borderRadius: radii.md,
                  background: cvdHex(sem.danger),
                  color: cvdHex(sem.dangerFg),
                  fontWeight: 600,
                  fontSize: 12.5,
                  ...simFx(),
                }}
              >
                Destructive
              </button>
              <button
                type="button"
                disabled={simState === 'disabled'}
                style={{
                  height: sem.controlHeightMd,
                  padding: '0 16px',
                  borderRadius: radii.pill,
                  background: cvdHex(sem.accent),
                  color: cvdHex(sem.accentFg),
                  fontWeight: 600,
                  fontSize: 12.5,
                  ...simFx(),
                }}
              >
                Pill CTA
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {[
                ['SM', sem.controlHeightSm, 11.5],
                ['MD', sem.controlHeightMd, 12.5],
                ['LG', sem.controlHeightLg, 13.5],
              ].map(([lbl, h, fs]) => (
                <button
                  key={String(lbl)}
                  type="button"
                  disabled={simState === 'disabled'}
                  style={{
                    height: String(h),
                    padding: '0 12px',
                    borderRadius: radii.md,
                    background: cvdHex(sem.surfaceAlt),
                    color: cvdHex(sem.ink),
                    border: borderSpec,
                    fontSize: Number(fs),
                    fontWeight: 600,
                    ...simFx(),
                  }}
                >
                  Size {lbl}
                </button>
              ))}
              <button
                type="button"
                aria-label="Download tokens"
                disabled={simState === 'disabled'}
                style={{
                  width: sem.controlHeightMd,
                  height: sem.controlHeightMd,
                  borderRadius: radii.md,
                  background: cvdHex(sem.surfaceAlt),
                  color: cvdHex(sem.ink),
                  border: borderSpec,
                  display: 'grid',
                  placeItems: 'center',
                  ...simFx(),
                }}
              >
                <Icon name="download" size={14} />
              </button>
            </div>

            <div
              style={{
                display: 'inline-flex',
                padding: 3,
                borderRadius: radii.pill,
                background: cvdHex(sem.surfaceAlt),
                border: borderSpec,
                justifySelf: 'start',
              }}
            >
              {(['tokens', 'preview', 'audit'] as const).map((item) => {
                const active = segChoice === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSegChoice(item)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: radii.pill,
                      fontSize: 11.5,
                      fontWeight: active ? 600 : 500,
                      background: active ? cvdHex(sem.brand) : 'transparent',
                      color: active ? cvdHex(sem.brandFg) : cvdHex(sem.muted),
                      textTransform: 'capitalize',
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. Inputs, Selects & Toggles */}
          <section style={cardStyle}>
            <div style={sectionLabelStyle}>02 · Inputs, Selects &amp; Controls</div>
            <div style={{ display: 'grid', gap: 8 }}>
              <input
                value={inputVal}
                disabled={simState === 'disabled'}
                onChange={(e) => setInputVal(e.target.value)}
                aria-label="Sample text input"
                style={{
                  height: sem.controlHeightMd,
                  padding: '0 12px',
                  borderRadius: radii.md,
                  background: cvdHex(sem.canvas),
                  border: `${sem.borderWidth} solid ${simState === 'focus' ? cvdHex(sem.ring) : sem.borderStrong}`,
                  color: cvdHex(sem.ink),
                  fontSize: 12.5,
                  ...simFx(),
                }}
              />
              <div>
                <input
                  readOnly
                  value="invalid-token-format"
                  aria-label="Invalid input example"
                  style={{
                    width: '100%',
                    height: sem.controlHeightMd,
                    padding: '0 12px',
                    borderRadius: radii.md,
                    background: cvdHex(sem.canvas),
                    border: `${sem.borderWidth} solid ${cvdHex(sem.danger)}`,
                    color: cvdHex(sem.ink),
                    fontSize: 12.5,
                  }}
                />
                <div style={{ fontSize: 11, color: cvdHex(sem.danger), marginTop: 4 }}>
                  Token key must match kebab-case format.
                </div>
              </div>
              <div
                style={{
                  height: sem.controlHeightMd,
                  padding: '0 10px',
                  borderRadius: radii.md,
                  background: cvdHex(sem.canvas),
                  border: borderSpec,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                  color: cvdHex(sem.muted),
                  fontSize: 12,
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="search" size={13} /> Quick search tokens…
                </span>
                <kbd style={{ ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 10.5, padding: '1px 6px', borderRadius: radii.xs, background: cvdHex(sem.surfaceAlt), border: borderSpec }}>
                  /
                </kbd>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: 12 }}>
              {([
                ['aa', 'AA Guard'],
                ['fluid', 'Fluid Type'],
                ['dark', 'Strict Mode'],
              ] as const).map(([k, lbl]) => (
                <label key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={checks[k]}
                    disabled={simState === 'disabled'}
                    onChange={() => setChecks((p) => ({ ...p, [k]: !p[k] }))}
                    style={{ accentColor: cvdHex(sem.brand) }}
                  />
                  <span>{lbl}</span>
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: 12, alignItems: 'center' }}>
              {(['oklch', 'srgb', 'p3'] as const).map((m) => (
                <label key={m} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, cursor: 'pointer', textTransform: 'uppercase', fontSize: 11 }}>
                  <input
                    type="radio"
                    name="gamutRadio"
                    checked={radioChoice === m}
                    disabled={simState === 'disabled'}
                    onChange={() => setRadioChoice(m)}
                    style={{ accentColor: cvdHex(sem.brand) }}
                  />
                  <span>{m}</span>
                </label>
              ))}
              <button
                type="button"
                role="switch"
                aria-checked={switchA}
                disabled={simState === 'disabled'}
                onClick={() => setSwitchA((v) => !v)}
                style={{
                  marginLeft: 'auto',
                  width: 38,
                  height: 22,
                  borderRadius: radii.pill,
                  padding: 2,
                  background: switchA ? cvdHex(sem.brand) : cvdHex(sem.surfaceAlt),
                  border: borderSpec,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: switchA ? 'flex-end' : 'flex-start',
                }}
              >
                <span style={{ width: 16, height: 16, borderRadius: radii.pill, background: switchA ? cvdHex(sem.brandFg) : cvdHex(sem.muted) }} />
              </button>
              <button
                type="button"
                role="switch"
                aria-checked={switchB}
                disabled={simState === 'disabled'}
                onClick={() => setSwitchB((v) => !v)}
                style={{
                  width: 38,
                  height: 22,
                  borderRadius: radii.pill,
                  padding: 2,
                  background: switchB ? cvdHex(sem.secondary) : cvdHex(sem.surfaceAlt),
                  border: borderSpec,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: switchB ? 'flex-end' : 'flex-start',
                }}
              >
                <span style={{ width: 16, height: 16, borderRadius: radii.pill, background: switchB ? cvdHex(sem.secondaryFg) : cvdHex(sem.muted) }} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input
                type="range"
                min={0}
                max={100}
                value={sliderVal}
                disabled={simState === 'disabled'}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                style={{ flex: 1, accentColor: cvdHex(sem.brand) }}
              />
              <span style={{ ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 11, color: cvdHex(sem.muted), minWidth: 34, textAlign: 'right' }}>
                {sliderVal}%
              </span>
            </div>
          </section>

          {/* 3. Badges, Chips, Avatars & Keycaps */}
          <section style={cardStyle}>
            <div style={sectionLabelStyle}>03 · Badges, Avatars &amp; Keycaps</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <span style={{ padding: '3px 9px', borderRadius: radii.pill, background: cvdHex(sem.brand), color: cvdHex(sem.brandFg), fontSize: 11, fontWeight: 600 }}>Solid Brand</span>
              <span style={{ padding: '3px 9px', borderRadius: radii.pill, background: `${cvdHex(sem.secondary)}22`, color: cvdHex(sem.secondary), fontSize: 11, fontWeight: 600 }}>Soft Secondary</span>
              <span style={{ padding: '3px 9px', borderRadius: radii.pill, border: `${sem.borderWidth} solid ${cvdHex(sem.accent)}`, color: cvdHex(sem.accent), fontSize: 11, fontWeight: 600 }}>Outline Accent</span>
              <span style={{ padding: '3px 9px', borderRadius: radii.pill, background: `${cvdHex(sem.success)}22`, color: cvdHex(sem.success), fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: radii.pill, background: cvdHex(sem.success) }} /> Live
              </span>
              <span style={{ padding: '3px 9px', borderRadius: radii.pill, background: `${cvdHex(sem.warning)}22`, color: cvdHex(sem.warning), fontSize: 11, fontWeight: 600 }}>Beta</span>
              <span style={{ padding: '3px 9px', borderRadius: radii.pill, background: `${cvdHex(sem.danger)}22`, color: cvdHex(sem.danger), fontSize: 11, fontWeight: 600 }}>Deprecated</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {[
                  ['DS', sem.brand, sem.brandFg],
                  ['OK', sem.secondary, sem.secondaryFg],
                  ['AA', sem.accent, sem.accentFg],
                  ['+4', sem.surfaceAlt, sem.ink],
                ].map(([init, bg, fg], idx) => (
                  <span
                    key={init}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: radii.pill,
                      background: cvdHex(bg),
                      color: cvdHex(fg),
                      border: `2px solid ${cvdHex(sem.surface)}`,
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      marginLeft: idx === 0 ? 0 : -8,
                    }}
                  >
                    {init}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {['⌘', '⇧', 'K'].map((key) => (
                  <kbd
                    key={key}
                    style={{
                      ...fontStyleFor(doc.monoFont, 'mono'),
                      minWidth: 24,
                      height: 24,
                      padding: '0 6px',
                      borderRadius: radii.sm,
                      background: cvdHex(sem.surfaceAlt),
                      border: borderSpec,
                      boxShadow: `0 1px 0 ${sem.borderStrong}`,
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 11,
                    }}
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Navigation, Tabs & Pagination */}
          <section style={cardStyle}>
            <div style={sectionLabelStyle}>04 · Navigation, Tabs &amp; Pagination</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: cvdHex(sem.muted) }}>
              <span>Workspace</span>
              <span>/</span>
              <span>Systems</span>
              <span>/</span>
              <span style={{ color: cvdHex(sem.ink), fontWeight: 600 }}>{doc.name}</span>
            </div>

            <div style={{ display: 'flex', gap: 16, borderBottom: borderSpec }}>
              {(['overview', 'specs', 'changelog'] as const).map((t) => {
                const active = tabChoice === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTabChoice(t)}
                    style={{
                      padding: '6px 2px',
                      fontSize: 12.5,
                      fontWeight: active ? 600 : 500,
                      color: active ? cvdHex(sem.ink) : cvdHex(sem.muted),
                      borderBottom: active ? `2px solid ${cvdHex(sem.brand)}` : '2px solid transparent',
                      marginBottom: -1,
                      textTransform: 'capitalize',
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'grid', gap: 4 }}>
              {[
                ['Color Ramps', '88'],
                ['Fluid Scale', '9'],
                ['Contrast Pairs', '50'],
              ].map(([lbl, cnt], idx) => (
                <div
                  key={lbl}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 10px',
                    borderRadius: radii.md,
                    background: idx === 0 ? `${cvdHex(sem.brand)}1c` : 'transparent',
                    color: idx === 0 ? cvdHex(sem.brand) : cvdHex(sem.muted),
                    fontSize: 12,
                    fontWeight: idx === 0 ? 600 : 500,
                  }}
                >
                  <span>{lbl}</span>
                  <span style={{ ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 10.5 }}>{cnt}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPageIdx(n)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: radii.sm,
                    background: pageIdx === n ? cvdHex(sem.brand) : cvdHex(sem.surfaceAlt),
                    color: pageIdx === n ? cvdHex(sem.brandFg) : cvdHex(sem.ink),
                    border: borderSpec,
                    fontSize: 11.5,
                    fontWeight: 600,
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </section>

          {/* 5. Alerts, Callouts & Toast */}
          <section style={cardStyle}>
            <div style={sectionLabelStyle}>05 · Alerts, Callouts &amp; Feedback</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {[
                { key: 'info', title: 'Tokens synchronized', desc: 'Dual-polarity CSS variables ready for export.', col: sem.info },
                { key: 'success', title: 'Contrast checks passed', desc: 'All body and action pairs satisfy WCAG 2.2 AA.', col: sem.success },
                { key: 'warning', title: 'High chroma notice', desc: 'Consider checking sRGB gamut clamping on mobile.', col: sem.warning },
                { key: 'danger', title: 'Breaking schema change', desc: 'Legacy v0 spacing aliases removed from DTCG output.', col: sem.danger },
              ].map((al) => (
                <div
                  key={al.key}
                  style={{
                    padding: '9px 11px',
                    borderRadius: radii.innerNested,
                    background: `${cvdHex(al.col)}16`,
                    border: `${sem.borderWidth} solid ${cvdHex(al.col)}50`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: cvdHex(al.col) }}>{al.title}</div>
                    <div style={{ fontSize: 11, color: cvdHex(sem.muted), marginTop: 2 }}>{al.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Data Table, Progress & Skeleton */}
          <section style={cardStyle}>
            <div style={sectionLabelStyle}>06 · Table, Progress &amp; Skeletons</div>
            <div style={{ border: borderSpec, borderRadius: radii.innerNested, overflow: 'hidden' }}>
              {[
                { id: 'r1', token: '--ds-brand', val: sem.brand },
                { id: 'r2', token: '--ds-surface', val: sem.surface },
                { id: 'r3', token: '--ds-accent', val: sem.accent },
              ].map((row) => (
                <label
                  key={row.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                    padding: '7px 10px',
                    borderBottom: borderSpec,
                    background: selectedRows[row.id] ? `${cvdHex(sem.brand)}12` : cvdHex(sem.canvas),
                    fontSize: 11.5,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="checkbox"
                      checked={Boolean(selectedRows[row.id])}
                      onChange={() => setSelectedRows((p) => ({ ...p, [row.id]: !p[row.id] }))}
                      style={{ accentColor: cvdHex(sem.brand) }}
                    />
                    <code style={{ ...fontStyleFor(doc.monoFont, 'mono') }}>{row.token}</code>
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, ...fontStyleFor(doc.monoFont, 'mono'), color: cvdHex(sem.muted) }}>
                    <span style={{ width: 10, height: 10, borderRadius: radii.xs, background: cvdHex(row.val), border: borderSpec }} />
                    {row.val}
                  </span>
                </label>
              ))}
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: cvdHex(sem.muted), marginBottom: 5 }}>
                <span>Token Verification</span>
                <span style={{ ...fontStyleFor(doc.monoFont, 'mono') }}>{sliderVal}%</span>
              </div>
              <div style={{ height: 7, borderRadius: radii.pill, background: cvdHex(sem.surfaceAlt), overflow: 'hidden' }}>
                <div style={{ width: `${sliderVal}%`, height: '100%', background: cvdHex(sem.brand), borderRadius: radii.pill }} />
              </div>
            </div>

            <div style={{ display: 'grid', gap: 6 }}>
              <div style={{ height: 10, width: '72%', borderRadius: radii.sm, background: cvdHex(sem.surfaceAlt) }} />
              <div style={{ height: 10, width: '48%', borderRadius: radii.sm, background: cvdHex(sem.surfaceAlt) }} />
            </div>
          </section>
        </div>

        {/* Elevation Style Comparison Strip */}
        <div style={{ display: 'grid', gap: 8 }}>
          <div style={sectionLabelStyle}>07 · Elevation &amp; Surface Comparison (Active: {doc.elevationStyle})</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
            {([
              { id: 'flat', label: 'Flat', shadow: 'none' },
              {
                id: 'layered',
                label: 'Layered',
                shadow: doc.polarity === 'dark' ? '0 8px 24px -4px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.4)' : '0 6px 18px -3px rgba(9,9,11,0.12), 0 1px 3px rgba(9,9,11,0.08)',
              },
              {
                id: 'glass',
                label: 'Glass',
                shadow: doc.polarity === 'dark' ? 'inset 0 1px 0 rgba(255,255,255,0.16), 0 12px 28px rgba(0,0,0,0.48)' : 'inset 0 1px 0 rgba(255,255,255,0.85), 0 10px 24px rgba(9,9,11,0.1)',
              },
              {
                id: 'brutalist',
                label: 'Brutalist',
                shadow: `4px 4px 0 0 ${doc.polarity === 'dark' ? '#fafafa' : '#09090b'}`,
              },
            ] as const).map((el) => {
              const isCur = doc.elevationStyle === el.id;
              return (
                <div
                  key={el.id}
                  style={{
                    padding: 12,
                    borderRadius: radii.md,
                    background: cvdHex(sem.surface),
                    border: `${el.id === 'brutalist' ? '2px' : sem.borderWidth} solid ${isCur ? cvdHex(sem.brand) : sem.borderStrong}`,
                    boxShadow: el.shadow,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: 12 }}>{el.label}</strong>
                    {isCur && (
                      <span style={{ fontSize: 10, fontWeight: 600, color: cvdHex(sem.brand) }}>Active</span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: cvdHex(sem.muted), marginTop: 4 }}>
                    {el.id === 'flat' ? 'Border-only plane' : el.id === 'layered' ? 'Multi-pass ambient' : el.id === 'glass' ? 'Specular top edge' : 'Hard offset stroke'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
