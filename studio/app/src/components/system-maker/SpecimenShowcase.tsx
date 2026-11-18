import { useState } from 'react';
import { Icon } from '../icons';
import {
  fontStyleFor,
  type CompiledSystem,
  type DesignSystemDoc,
  type SemanticTokens,
} from '../../engine/dsEngine';
import { adaptSvgPaintForSurface, inspectSvgPaint } from '../../engine/svgPaint';
import type { ActiveMark } from '../../state/project';

type SpecimenScene = 'bento' | 'analytics' | 'editorial' | 'auth';

const SCENES: { id: SpecimenScene; label: string }[] = [
  { id: 'bento', label: 'Bento Overview' },
  { id: 'analytics', label: 'Analytics SaaS' },
  { id: 'editorial', label: 'Editorial & Pricing' },
  { id: 'auth', label: 'Auth & Settings' },
];

const BAR_DATA = [
  { day: 'Mon', val: 42, label: '$14.2k' },
  { day: 'Tue', val: 64, label: '$19.8k' },
  { day: 'Wed', val: 58, label: '$17.4k' },
  { day: 'Thu', val: 82, label: '$24.6k' },
  { day: 'Fri', val: 94, label: '$28.1k' },
  { day: 'Sat', val: 71, label: '$21.3k' },
  { day: 'Sun', val: 88, label: '$26.4k' },
];

const DEPLOY_ROWS = [
  { id: 'd1', env: 'production', commit: '8a4f2c1', branch: 'main', status: 'Ready', tone: 'success' as const, age: '2m ago' },
  { id: 'd2', env: 'preview', commit: 'e3b91d4', branch: 'feat/tokens', status: 'Building', tone: 'info' as const, age: '48s ago' },
  { id: 'd3', env: 'staging', commit: 'c702fa9', branch: 'fix/contrast', status: 'Audit Warn', tone: 'warning' as const, age: '14m ago' },
  { id: 'd4', env: 'sandbox', commit: '19d04a2', branch: 'exp/grid', status: 'Failed', tone: 'danger' as const, age: '1h ago' },
];

export function SpecimenShowcase({
  doc,
  compiled,
  activeMark,
  cvdHex,
  onOpenMarkPicker,
  onFlash,
}: {
  doc: DesignSystemDoc;
  compiled: CompiledSystem;
  activeMark: ActiveMark;
  cvdHex: (hex: string) => string;
  onOpenMarkPicker: () => void;
  onFlash: (msg: string) => void;
}) {
  const [scene, setScene] = useState<SpecimenScene>('bento');
  const [splitMode, setSplitMode] = useState(false);
  const [activeNav, setActiveNav] = useState<'Overview' | 'Tokens' | 'Usage' | 'Billing'>('Overview');
  const [emailInput, setEmailInput] = useState('design-system@sourcebook.dev');
  const [emailFocused, setEmailFocused] = useState(false);
  const [autoAaOn, setAutoAaOn] = useState(true);
  const [fluidOn, setFluidOn] = useState(true);
  const [selectedBar, setSelectedBar] = useState(4);
  const [tableFilter, setTableFilter] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'enterprise'>('pro');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [notifDeploy, setNotifDeploy] = useState(true);
  const [notifContrast, setNotifContrast] = useState(false);

  const { radii, typeScale } = compiled;
  const displayScale = typeScale[2] || typeScale[0];
  const heroScale = typeScale[1] || typeScale[0];
  const bodyScale = typeScale.find((t) => t.token === 'body') || typeScale[4];

  const renderSpecimenFrame = (sem: SemanticTokens, polarityLabel: string, compactSplit: boolean) => {
    const padCard = Math.round(doc.baseSpacePx * 2.25 * sem.densityMult);
    const padInner = Math.round(doc.baseSpacePx * 1.4 * sem.densityMult);
    const borderSpec = `${sem.borderWidth} solid ${sem.border}`;
    const chromaticMark = inspectSvgPaint(activeMark.svg).kind !== 'monochrome';

    const toneColor = (tone: 'success' | 'warning' | 'danger' | 'info') => cvdHex(sem[tone]);

    const filteredDeploys = DEPLOY_ROWS.filter(
      (r) =>
        !tableFilter.trim() ||
        r.env.includes(tableFilter.toLowerCase()) ||
        r.branch.toLowerCase().includes(tableFilter.toLowerCase()) ||
        r.status.toLowerCase().includes(tableFilter.toLowerCase()),
    );

    return (
      <div
        className="ds-preview-frame"
        style={{
          background: cvdHex(sem.canvas),
          color: cvdHex(sem.ink),
          ...fontStyleFor(doc.bodyFont, 'body'),
          border: `${sem.borderWidth} solid ${sem.borderStrong}`,
          borderRadius: radii.xl,
          padding: compactSplit ? 16 : 22,
          ['--sb-accent' as string]: cvdHex(sem.accent),
        }}
      >
        {/* Top App Bar inside Specimen */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 14,
            marginBottom: 18,
            borderBottom: borderSpec,
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onOpenMarkPicker}
              title="Change Brand Mark"
              className="ds-sys-mark-badge"
              style={{
                borderRadius: radii.md,
                background: chromaticMark ? cvdHex(sem.surfaceAlt) : cvdHex(sem.brand),
                border: chromaticMark ? borderSpec : undefined,
                color: chromaticMark ? cvdHex(sem.ink) : cvdHex(sem.brandFg),
                cursor: 'pointer',
              }}
              dangerouslySetInnerHTML={{
                __html: adaptSvgPaintForSurface(
                  activeMark.svg,
                  chromaticMark ? cvdHex(sem.ink) : cvdHex(sem.brandFg),
                  `sm-${polarityLabel}-`,
                ),
              }}
            />
            <strong style={{ ...fontStyleFor(doc.displayFont, 'display'), fontSize: 15 }}>{doc.name}</strong>
            <span
              style={{
                ...fontStyleFor(doc.monoFont, 'mono'),
                fontSize: 10.5,
                padding: '2px 8px',
                borderRadius: radii.pill,
                background: cvdHex(sem.surfaceAlt),
                color: cvdHex(sem.muted),
                border: borderSpec,
              }}
            >
              {polarityLabel} · OKLCH
            </span>
          </div>

          {!compactSplit && (
            <nav style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }} aria-label="Specimen Navigation">
              {(['Overview', 'Tokens', 'Usage', 'Billing'] as const).map((item) => {
                const active = activeNav === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setActiveNav(item)}
                    style={{
                      height: 30,
                      padding: '0 11px',
                      borderRadius: radii.pill,
                      fontSize: 12,
                      fontWeight: active ? 600 : 500,
                      background: active ? cvdHex(sem.surfaceAlt) : 'transparent',
                      color: active ? cvdHex(sem.ink) : cvdHex(sem.muted),
                      border: active ? borderSpec : '1px solid transparent',
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>
          )}

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => onFlash('Opened Documentation preview')}
              style={{
                height: sem.controlHeightSm,
                padding: `0 ${Math.round(doc.baseSpacePx * 1.6)}px`,
                borderRadius: radii.md,
                background: cvdHex(sem.surfaceAlt),
                color: cvdHex(sem.ink),
                border: borderSpec,
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              Docs
            </button>
            <button
              type="button"
              onClick={() => onFlash(`Deployed ${doc.name} (${polarityLabel})`)}
              style={{
                height: sem.controlHeightSm,
                padding: `0 ${Math.round(doc.baseSpacePx * 1.8)}px`,
                borderRadius: radii.md,
                background: cvdHex(sem.brand),
                color: cvdHex(sem.brandFg),
                fontSize: 12,
                fontWeight: 600,
                boxShadow: sem.shadowSm,
              }}
            >
              Deploy
            </button>
          </div>
        </div>

        {/* SCENE 1: BENTO OVERVIEW */}
        {scene === 'bento' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: compactSplit ? '1fr' : 'repeat(auto-fit, minmax(265px, 1fr))',
              gap: Math.round(doc.baseSpacePx * 1.8),
            }}
          >
            {/* Card 1: Concentric Hero */}
            <div
              style={{
                padding: padCard,
                borderRadius: radii.lg,
                background: cvdHex(sem.surface),
                border: borderSpec,
                boxShadow: sem.shadowMd,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  alignSelf: 'flex-start',
                  fontSize: 10.5,
                  fontWeight: 600,
                  padding: '3px 9px',
                  borderRadius: radii.pill,
                  background: `${cvdHex(sem.secondary)}24`,
                  color: cvdHex(sem.secondary),
                  marginBottom: 10,
                }}
              >
                Concentric Radius ({radii.lg} → {radii.innerNested})
              </span>
              <h2
                style={{
                  ...fontStyleFor(doc.displayFont, 'display'),
                  fontSize: compactSplit ? Math.min(displayScale.px, 22) : Math.min(displayScale.px, 28),
                  fontWeight: displayScale.weight,
                  lineHeight: displayScale.lineHeight,
                  letterSpacing: `${displayScale.trackingEm}em`,
                  margin: '0 0 8px',
                }}
              >
                {doc.tagline}
              </h2>
              <p style={{ margin: '0 0 16px', fontSize: Math.max(12.5, bodyScale.px * 0.88), color: cvdHex(sem.muted), lineHeight: bodyScale.lineHeight }}>
                Outer radius {radii.lg} minus padding computes an exact {radii.innerNested} inner inset radius automatically.
              </p>
              <div
                style={{
                  marginTop: 'auto',
                  padding: padInner,
                  borderRadius: radii.innerNested,
                  background: cvdHex(sem.surfaceAlt),
                  border: borderSpec,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                }}
              >
                <span style={{ ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 11.5 }}>
                  Ratio {doc.typeRatio} · Base {doc.baseSpacePx}px
                </span>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: radii.sm,
                    background: cvdHex(sem.success),
                    color: cvdHex(sem.successFg),
                    fontWeight: 600,
                    fontSize: 11,
                  }}
                >
                  AA Pass
                </span>
              </div>
            </div>

            {/* Card 2: Interactive Controls & States */}
            <div
              style={{
                padding: padCard,
                borderRadius: radii.lg,
                background: cvdHex(sem.surface),
                border: borderSpec,
                boxShadow: sem.shadowMd,
                display: 'flex',
                flexDirection: 'column',
                gap: 11,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Interactive Controls</span>
                <span style={{ ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 10.5, color: cvdHex(sem.muted) }}>{doc.handle}</span>
              </div>
              <input
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                aria-label="Design system contact email"
                style={{
                  height: sem.controlHeightMd,
                  padding: '0 12px',
                  borderRadius: radii.md,
                  background: cvdHex(sem.canvas),
                  border: `${sem.borderWidth} solid ${emailFocused ? cvdHex(sem.ring) : sem.borderStrong}`,
                  boxShadow: emailFocused ? `0 0 0 2px ${cvdHex(sem.ring)}33` : 'none',
                  color: cvdHex(sem.ink),
                  fontSize: 12.5,
                  outline: 'none',
                }}
              />
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {(['success', 'warning', 'danger', 'info'] as const).map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: '4px 9px',
                      borderRadius: radii.pill,
                      background: `${toneColor(t)}22`,
                      color: toneColor(t),
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'capitalize',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, cursor: 'pointer' }}>
                  <span>Auto-AA Enforcement</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={autoAaOn}
                    onClick={() => setAutoAaOn((v) => !v)}
                    style={{
                      width: 36,
                      height: 20,
                      borderRadius: radii.pill,
                      padding: 2,
                      background: autoAaOn ? cvdHex(sem.brand) : cvdHex(sem.surfaceAlt),
                      border: borderSpec,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: autoAaOn ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <span style={{ width: 14, height: 14, borderRadius: radii.pill, background: autoAaOn ? cvdHex(sem.brandFg) : cvdHex(sem.muted) }} />
                  </button>
                </label>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, cursor: 'pointer' }}>
                  <span>Fluid Clamp Typography</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={fluidOn}
                    onClick={() => setFluidOn((v) => !v)}
                    style={{
                      width: 36,
                      height: 20,
                      borderRadius: radii.pill,
                      padding: 2,
                      background: fluidOn ? cvdHex(sem.secondary) : cvdHex(sem.surfaceAlt),
                      border: borderSpec,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: fluidOn ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <span style={{ width: 14, height: 14, borderRadius: radii.pill, background: fluidOn ? cvdHex(sem.secondaryFg) : cvdHex(sem.muted) }} />
                  </button>
                </label>
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => onFlash('Primary action triggered')}
                  style={{
                    flex: 1,
                    height: sem.controlHeightMd,
                    borderRadius: radii.md,
                    background: cvdHex(sem.brand),
                    color: cvdHex(sem.brandFg),
                    fontWeight: 600,
                    fontSize: 12.5,
                    boxShadow: sem.shadowSm,
                  }}
                >
                  Primary CTA
                </button>
                <button
                  type="button"
                  onClick={() => onFlash('Secondary action triggered')}
                  style={{
                    flex: 1,
                    height: sem.controlHeightMd,
                    borderRadius: radii.md,
                    background: cvdHex(sem.secondary),
                    color: cvdHex(sem.secondaryFg),
                    fontWeight: 600,
                    fontSize: 12.5,
                  }}
                >
                  Secondary
                </button>
              </div>
            </div>

            {/* Card 3: KPI & Interactive Spark Bar Chart */}
            <div
              style={{
                padding: padCard,
                borderRadius: radii.lg,
                background: cvdHex(sem.surface),
                border: borderSpec,
                boxShadow: sem.shadowMd,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: cvdHex(sem.muted) }}>Token Adoption</span>
                <span style={{ ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 11, color: cvdHex(sem.success), fontWeight: 600 }}>+24.8%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                <strong style={{ ...fontStyleFor(doc.displayFont, 'display'), fontSize: 26, letterSpacing: '-0.03em' }}>
                  {BAR_DATA[selectedBar].label}
                </strong>
                <span style={{ ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 11, color: cvdHex(sem.muted) }}>
                  {BAR_DATA[selectedBar].day} peak
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, alignItems: 'end', height: 82, paddingTop: 6 }}>
                {BAR_DATA.map((b, idx) => {
                  const isSel = idx === selectedBar;
                  return (
                    <button
                      key={b.day}
                      type="button"
                      onClick={() => setSelectedBar(idx)}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}
                      title={`${b.day}: ${b.label}`}
                    >
                      <span
                        style={{
                          width: '100%',
                          height: `${b.val}%`,
                          borderRadius: radii.sm,
                          background: isSel ? cvdHex(sem.brand) : idx % 2 === 0 ? cvdHex(sem.secondary) : cvdHex(sem.accent),
                          opacity: isSel ? 1 : 0.42,
                          transition: 'opacity 140ms ease, transform 140ms ease',
                        }}
                      />
                      <span style={{ ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 9.5, color: isSel ? cvdHex(sem.ink) : cvdHex(sem.muted) }}>
                        {b.day[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Card 4: Recent Deployments */}
            <div
              style={{
                padding: padCard,
                borderRadius: radii.lg,
                background: cvdHex(sem.surface),
                border: borderSpec,
                boxShadow: sem.shadowMd,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Release Pipeline</span>
                <span style={{ ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 10.5, color: cvdHex(sem.muted) }}>4 builds</span>
              </div>
              {DEPLOY_ROWS.map((r) => (
                <div
                  key={r.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                    padding: '6px 9px',
                    borderRadius: radii.innerNested,
                    background: cvdHex(sem.surfaceAlt),
                    border: borderSpec,
                    fontSize: 11.5,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
                    <span style={{ width: 7, height: 7, borderRadius: radii.pill, background: toneColor(r.tone), flex: 'none' }} />
                    <span style={{ fontWeight: 600 }}>{r.env}</span>
                    <code style={{ ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 10.5, color: cvdHex(sem.muted) }}>{r.commit}</code>
                  </div>
                  <span style={{ ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 10.5, color: toneColor(r.tone), fontWeight: 600 }}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Card 5: Pro Plan / Concentric Accent Highlight */}
            <div
              style={{
                padding: padCard,
                borderRadius: radii.lg,
                background: cvdHex(sem.surface),
                border: `${sem.borderWidth} solid ${cvdHex(sem.brand)}`,
                boxShadow: sem.shadowMd,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Studio Pro Tier</span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: radii.pill,
                    background: cvdHex(sem.accent),
                    color: cvdHex(sem.accentFg),
                    fontSize: 10.5,
                    fontWeight: 600,
                  }}
                >
                  Recommended
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <strong style={{ ...fontStyleFor(doc.displayFont, 'display'), fontSize: 28, letterSpacing: '-0.03em' }}>$29</strong>
                <span style={{ fontSize: 12, color: cvdHex(sem.muted) }}>/ seat · monthly</span>
              </div>
              <div
                style={{
                  padding: padInner,
                  borderRadius: radii.innerNested,
                  background: cvdHex(sem.surfaceAlt),
                  display: 'grid',
                  gap: 5,
                  fontSize: 11.5,
                  color: cvdHex(sem.muted),
                }}
              >
                <div>✓ Dual-polarity OKLCH token export</div>
                <div>✓ WCAG 2.2 + APCA continuous audit</div>
                <div>✓ Fluid clamp() &amp; Figma sync JSON</div>
              </div>
              <button
                type="button"
                onClick={() => onFlash('Selected Studio Pro Tier')}
                style={{
                  marginTop: 'auto',
                  height: sem.controlHeightMd,
                  borderRadius: radii.md,
                  background: cvdHex(sem.brand),
                  color: cvdHex(sem.brandFg),
                  fontWeight: 600,
                  fontSize: 12.5,
                }}
              >
                Upgrade Workspace
              </button>
            </div>

            {/* Card 6: Surface Hierarchy & Token Summary */}
            <div
              style={{
                padding: padCard,
                borderRadius: radii.lg,
                background: cvdHex(sem.surface),
                border: borderSpec,
                boxShadow: sem.shadowMd,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600 }}>Surface &amp; Elevation Stack</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  ['Canvas', sem.canvas],
                  ['Surface', sem.surface],
                  ['Surface Alt', sem.surfaceAlt],
                  ['Elevated', sem.surfaceElevated],
                ].map(([label, hex]) => (
                  <div
                    key={label}
                    style={{
                      padding: 10,
                      borderRadius: radii.innerNested,
                      background: cvdHex(hex),
                      border: borderSpec,
                      boxShadow: label === 'Elevated' ? sem.shadowLg : 'none',
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 600 }}>{label}</div>
                    <div style={{ ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 10, color: cvdHex(sem.muted), marginTop: 2 }}>{hex}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap', ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 10.5, color: cvdHex(sem.muted) }}>
                <span>Elevation: {doc.elevationStyle}</span>
                <span>·</span>
                <span>Border: {sem.borderWidth}</span>
                <span>·</span>
                <span>Density: {doc.density || 'comfortable'}</span>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 2: ANALYTICS SAAS */}
        {scene === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: compactSplit ? '1fr' : '180px 1fr', gap: 16 }}>
            <aside
              style={{
                padding: 12,
                borderRadius: radii.lg,
                background: cvdHex(sem.surface),
                border: borderSpec,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <div style={{ fontSize: 10.5, fontWeight: 600, color: cvdHex(sem.muted), textTransform: 'uppercase', letterSpacing: '0.06em', padding: '4px 8px' }}>
                Workspace
              </div>
              {['Telemetry', 'Tokens', 'Deployments', 'Audits', 'Team'].map((item, idx) => (
                <div
                  key={item}
                  style={{
                    padding: '7px 10px',
                    borderRadius: radii.md,
                    fontSize: 12,
                    fontWeight: idx === 0 ? 600 : 500,
                    background: idx === 0 ? `${cvdHex(sem.brand)}20` : 'transparent',
                    color: idx === 0 ? cvdHex(sem.brand) : cvdHex(sem.muted),
                  }}
                >
                  {item}
                </div>
              ))}
            </aside>

            <div style={{ display: 'grid', gap: 14, minWidth: 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
                {[
                  ['Monthly Events', '2.48M', '+18.2%', sem.brand],
                  ['AA Compliance', '99.4%', '6/6 core', sem.success],
                  ['Bundle Budget', '14.2 KB', '-1.4 KB', sem.secondary],
                ].map(([label, val, delta, col]) => (
                  <div key={label} style={{ padding: 14, borderRadius: radii.lg, background: cvdHex(sem.surface), border: borderSpec, boxShadow: sem.shadowSm }}>
                    <div style={{ fontSize: 11, color: cvdHex(sem.muted) }}>{label}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 6 }}>
                      <strong style={{ ...fontStyleFor(doc.displayFont, 'display'), fontSize: 20 }}>{val}</strong>
                      <span style={{ ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 10.5, color: cvdHex(col), fontWeight: 600 }}>{delta}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: 14, borderRadius: radii.lg, background: cvdHex(sem.surface), border: borderSpec, boxShadow: sem.shadowSm }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                  <strong style={{ fontSize: 13 }}>Deployment Activity</strong>
                  <input
                    type="search"
                    placeholder="Filter branch or status…"
                    value={tableFilter}
                    onChange={(e) => setTableFilter(e.target.value)}
                    style={{
                      height: 30,
                      padding: '0 10px',
                      borderRadius: radii.md,
                      background: cvdHex(sem.canvas),
                      border: borderSpec,
                      color: cvdHex(sem.ink),
                      fontSize: 12,
                    }}
                  />
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                    <thead>
                      <tr style={{ textAlign: 'left', color: cvdHex(sem.muted), borderBottom: borderSpec }}>
                        <th style={{ padding: '6px 8px' }}>Environment</th>
                        <th style={{ padding: '6px 8px' }}>Branch</th>
                        <th style={{ padding: '6px 8px' }}>Commit</th>
                        <th style={{ padding: '6px 8px' }}>Status</th>
                        <th style={{ padding: '6px 8px', textAlign: 'right' }}>Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDeploys.map((r) => (
                        <tr key={r.id} style={{ borderBottom: borderSpec }}>
                          <td style={{ padding: '8px', fontWeight: 600 }}>{r.env}</td>
                          <td style={{ padding: '8px', color: cvdHex(sem.muted) }}>{r.branch}</td>
                          <td style={{ padding: '8px', ...fontStyleFor(doc.monoFont, 'mono') }}>{r.commit}</td>
                          <td style={{ padding: '8px' }}>
                            <span
                              style={{
                                padding: '2px 8px',
                                borderRadius: radii.pill,
                                background: `${toneColor(r.tone)}22`,
                                color: toneColor(r.tone),
                                fontSize: 11,
                                fontWeight: 600,
                              }}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td style={{ padding: '8px', textAlign: 'right', color: cvdHex(sem.muted) }}>{r.age}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 3: EDITORIAL & PRICING */}
        {scene === 'editorial' && (
          <div style={{ display: 'grid', gap: 18 }}>
            <div
              style={{
                padding: padCard * 1.15,
                borderRadius: radii.lg,
                background: cvdHex(sem.surface),
                border: borderSpec,
                boxShadow: sem.shadowMd,
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: radii.pill,
                  background: `${cvdHex(sem.brand)}20`,
                  color: cvdHex(sem.brand),
                  fontSize: 11,
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                Fluid Scale · Ratio {doc.typeRatio}
              </span>
              <h2
                style={{
                  ...fontStyleFor(doc.displayFont, 'display'),
                  fontSize: compactSplit ? 24 : Math.min(heroScale.px, 34),
                  fontWeight: heroScale.weight,
                  lineHeight: heroScale.lineHeight,
                  letterSpacing: `${heroScale.trackingEm}em`,
                  margin: '0 auto 10px',
                  maxWidth: '24ch',
                }}
              >
                {doc.tagline}
              </h2>
              <p style={{ margin: '0 auto 16px', maxWidth: '52ch', fontSize: 13.5, color: cvdHex(sem.muted), lineHeight: bodyScale.lineHeight }}>
                Every surface, border, and semantic pair is deterministically verified in perceptual OKLCH space for WCAG 2.2 AA and APCA legibility.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  style={{ height: sem.controlHeightMd, padding: '0 18px', borderRadius: radii.md, background: cvdHex(sem.brand), color: cvdHex(sem.brandFg), fontWeight: 600, fontSize: 12.5 }}
                >
                  Start Building
                </button>
                <button
                  type="button"
                  style={{ height: sem.controlHeightMd, padding: '0 18px', borderRadius: radii.md, background: cvdHex(sem.surfaceAlt), color: cvdHex(sem.ink), border: borderSpec, fontWeight: 600, fontSize: 12.5 }}
                >
                  Read Specification
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: compactSplit ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
              {[
                { id: 'starter' as const, name: 'Starter', price: '$0', desc: 'Open-source token baseline & CSS variables.' },
                { id: 'pro' as const, name: 'Pro', price: '$29', desc: 'Multi-brand OKLCH ramps, Figma & shadcn exports.' },
                { id: 'enterprise' as const, name: 'Enterprise', price: '$99', desc: 'Strict AAA contrast enforcement & audit pipelines.' },
              ].map((tier) => {
                const isSel = selectedPlan === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedPlan(tier.id)}
                    style={{
                      padding: padCard,
                      borderRadius: radii.lg,
                      background: cvdHex(sem.surface),
                      border: `${sem.borderWidth} solid ${isSel ? cvdHex(sem.brand) : sem.border}`,
                      boxShadow: isSel ? sem.shadowMd : sem.shadowSm,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: 13.5 }}>{tier.name}</strong>
                      {isSel && (
                        <span style={{ padding: '2px 7px', borderRadius: radii.pill, background: cvdHex(sem.brand), color: cvdHex(sem.brandFg), fontSize: 10, fontWeight: 600 }}>
                          Active
                        </span>
                      )}
                    </div>
                    <strong style={{ ...fontStyleFor(doc.displayFont, 'display'), fontSize: 24 }}>{tier.price}</strong>
                    <p style={{ margin: 0, fontSize: 12, color: cvdHex(sem.muted), lineHeight: 1.45 }}>{tier.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SCENE 4: AUTH & SETTINGS */}
        {scene === 'auth' && (
          <div style={{ display: 'grid', gridTemplateColumns: compactSplit ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            <div style={{ padding: padCard, borderRadius: radii.lg, background: cvdHex(sem.surface), border: borderSpec, boxShadow: sem.shadowMd, display: 'grid', gap: 10 }}>
              <div>
                <strong style={{ ...fontStyleFor(doc.displayFont, 'display'), fontSize: 16 }}>Sign in to {doc.name}</strong>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: cvdHex(sem.muted) }}>Passkey or single sign-on authentication</p>
              </div>
              <label style={{ display: 'grid', gap: 5, fontSize: 12 }}>
                <span style={{ fontWeight: 500 }}>Work Email</span>
                <input
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  style={{ height: sem.controlHeightMd, padding: '0 12px', borderRadius: radii.md, background: cvdHex(sem.canvas), border: `${sem.borderWidth} solid ${sem.borderStrong}`, color: cvdHex(sem.ink), fontSize: 12.5 }}
                />
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, cursor: 'pointer' }}>
                <input type="checkbox" checked={rememberDevice} onChange={(e) => setRememberDevice(e.target.checked)} style={{ accentColor: cvdHex(sem.brand) }} />
                <span>Trust this workstation for 30 days</span>
              </label>
              <button
                type="button"
                onClick={() => onFlash('Passkey sign-in verified')}
                style={{ height: sem.controlHeightMd, borderRadius: radii.md, background: cvdHex(sem.brand), color: cvdHex(sem.brandFg), fontWeight: 600, fontSize: 12.5 }}
              >
                Continue with Passkey
              </button>
            </div>

            <div style={{ padding: padCard, borderRadius: radii.lg, background: cvdHex(sem.surface), border: borderSpec, boxShadow: sem.shadowMd, display: 'grid', gap: 10 }}>
              <strong style={{ fontSize: 13.5 }}>Notification &amp; Safety Controls</strong>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, cursor: 'pointer' }}>
                <span>Deployment webhooks</span>
                <input type="checkbox" checked={notifDeploy} onChange={(e) => setNotifDeploy(e.target.checked)} style={{ accentColor: cvdHex(sem.brand) }} />
              </label>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, cursor: 'pointer' }}>
                <span>Fail build on WCAG &lt; 4.5:1</span>
                <input type="checkbox" checked={notifContrast} onChange={(e) => setNotifContrast(e.target.checked)} style={{ accentColor: cvdHex(sem.brand) }} />
              </label>
              <div
                style={{
                  padding: padInner,
                  borderRadius: radii.innerNested,
                  background: `${cvdHex(sem.danger)}18`,
                  border: `${sem.borderWidth} solid ${cvdHex(sem.danger)}55`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: cvdHex(sem.danger) }}>Revoke API Tokens</div>
                  <div style={{ fontSize: 11, color: cvdHex(sem.muted) }}>Immediately invalidate active keys</div>
                </div>
                <button
                  type="button"
                  onClick={() => onFlash('Danger action simulated')}
                  style={{ height: sem.controlHeightSm, padding: '0 10px', borderRadius: radii.md, background: cvdHex(sem.danger), color: cvdHex(sem.dangerFg), fontSize: 11.5, fontWeight: 600 }}
                >
                  Revoke
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div className="ds-lab-toolbar">
        <div className="ds-pills-row" role="group" aria-label="Specimen Scene">
          {SCENES.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`ds-pill-tab ${scene === s.id ? 'is-active' : ''}`}
              onClick={() => setScene(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="ds-pills-row" role="group" aria-label="Specimen Polarity Comparison">
          <button
            type="button"
            className={`ds-pill-tab ${!splitMode ? 'is-active' : ''}`}
            onClick={() => setSplitMode(false)}
          >
            Active ({doc.polarity})
          </button>
          <button
            type="button"
            className={`ds-pill-tab ${splitMode ? 'is-active' : ''}`}
            onClick={() => setSplitMode(true)}
          >
            <Icon name="flip" size={12} /> Split Light · Dark
          </button>
        </div>
      </div>

      {splitMode ? (
        <div className="ds-split-grid">
          {doc.polarity === 'light' ? (
            <>
              {renderSpecimenFrame(compiled.semantic, 'light', true)}
              {renderSpecimenFrame(compiled.semanticOpposite, 'dark', true)}
            </>
          ) : (
            <>
              {renderSpecimenFrame(compiled.semanticOpposite, 'light', true)}
              {renderSpecimenFrame(compiled.semantic, 'dark', true)}
            </>
          )}
        </div>
      ) : (
        renderSpecimenFrame(compiled.semantic, doc.polarity, false)
      )}
    </div>
  );
}
