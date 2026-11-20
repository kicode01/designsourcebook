import { useMemo, useRef, useState } from 'react';
import { ColorRow, SelectRow, SliderRow, ToggleRow } from './ParamRow';
import { EffectPicker } from './EffectPicker';
import { Icon } from './icons';
import {
  FILTERS,
  colorLabelsFor,
  controlsFor,
  labelFor,
} from '../data/effects';
import { allEffectIds } from '../engine/thumbs';
import { currentColors, currentParams, useStudio } from '../state/studio';
import { useProject } from '../state/project';
import {
  CAMERA_RIG_PRESETS,
  EXTENDED_EASINGS,
  FILTER_MASTER_PRESETS,
  MOTION_PRESETS,
  STUDIO_FX_SHOWCASES,
  applyFilterPresetToList,
  type LoopMode,
  type MotionPresetId,
  type StageAspectMode,
  type StageBackdropMode,
  type StudioFxShowcase,
} from './logofx/logoFxUtils';

export function Inspector() {
  const { state, dispatch } = useStudio();
  const { theme, setTheme, compiledSystem, activeMark } = useProject();
  const { doc, ui } = state;
  const params = currentParams(doc);
  const colors = currentColors(doc);
  const controls = useMemo(() => controlsFor(doc.effectId).filter((c) => c.key !== 'scale'), [doc.effectId]);
  const labels = useMemo(() => colorLabelsFor(doc.effectId), [doc.effectId]);
  const [picker, setPicker] = useState<{ top: number; right: number } | null>(null);
  const selectRef = useRef<HTMLButtonElement>(null);

  const effectIds = useMemo(() => allEffectIds(), []);

  const setParam = (key: string, value: number | string | boolean, commit = false) =>
    dispatch({ type: 'setParam', key, value, commit });

  const openPicker = () => {
    const el = selectRef.current;
    if (!el) return;
    const parent = el.closest('.studio-inspector') as HTMLElement | null;
    const rect = el.getBoundingClientRect();
    const parentRect = parent?.getBoundingClientRect() ?? { top: 0, right: 0, width: 0 };
    setPicker({ top: rect.bottom - parentRect.top + 6, right: parentRect.right - rect.right });
  };

  const stepEffect = (delta: number) => {
    const idx = effectIds.indexOf(doc.effectId);
    const nextIdx = (idx + delta + effectIds.length) % effectIds.length;
    dispatch({ type: 'setEffect', id: effectIds[nextIdx] });
  };

  const randomizeShowcase = () => {
    const pick = STUDIO_FX_SHOWCASES[Math.floor(Math.random() * STUDIO_FX_SHOWCASES.length)];
    applyShowcase(pick);
  };

  const applyShowcase = (sc: StudioFxShowcase) => {
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
  };

  const matchSystemColors = () => {
    const pal = [
      compiledSystem.semantic.brand,
      compiledSystem.semantic.secondary,
      compiledSystem.semantic.accent,
    ];
    colors.forEach((_, idx) => {
      dispatch({ type: 'setColor', index: idx, value: pal[idx % pal.length] });
    });
    const colorControls = controls.filter((c) => c.kind === 'color');
    colorControls.forEach((c, idx) => {
      const v = c.key.toLowerCase().includes('background')
        ? compiledSystem.semantic.canvas
        : pal[idx % pal.length];
      dispatch({ type: 'setParam', key: c.key, value: v });
    });
    dispatch({ type: 'setCanvas', patch: { backgroundColor: compiledSystem.semantic.canvas } });
    dispatch({ type: 'commit' });
  };

  const activeEasingLabel =
    EXTENDED_EASINGS.find((e) => e.id === doc.animation.easing)?.label ?? doc.animation.easing;

  return (
    <aside className={`studio-inspector ${ui.collapsed ? 'is-collapsed' : ''}`} id="studio-inspector">
      <div className="studio-tabs" role="tablist" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {(
          [
            ['effects', 'Effect'],
            ['motion', 'Motion'],
            ['camera', '3D & Post'],
            ['presets', 'Presets'],
          ] as const
        ).map(([tid, tlabel]) => (
          <button
            key={tid}
            type="button"
            role="tab"
            className="studio-tab"
            aria-selected={ui.tab === tid}
            onClick={() => dispatch({ type: 'setUI', patch: { tab: tid } })}
          >
            {tlabel}
          </button>
        ))}
      </div>

      <div className="studio-panel-scroll">
        {/* Always-visible Active Shader & Quick Stepper */}
        <div className="studio-section" style={{ paddingBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div className="studio-field-label" style={{ marginBottom: 0 }}>
              Active Shader ({effectIds.indexOf(doc.effectId) + 1}/{effectIds.length})
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button
                type="button"
                className="page-chip"
                style={{ height: 21, padding: '0 7px', fontSize: 10 }}
                title="Previous shader effect"
                onClick={() => stepEffect(-1)}
              >
                ←
              </button>
              <button
                type="button"
                className="page-chip"
                style={{ height: 21, padding: '0 7px', fontSize: 10 }}
                title="Next shader effect"
                onClick={() => stepEffect(1)}
              >
                →
              </button>
              <button
                type="button"
                className="page-chip"
                style={{ height: 21, padding: '0 8px', fontSize: 10 }}
                title="Apply a curated Studio FX + Motion showcase"
                onClick={randomizeShowcase}
              >
                <Icon name="shuffle" size={10} /> Surprise
              </button>
            </div>
          </div>
          <button ref={selectRef} type="button" className="effect-select" onClick={openPicker} aria-haspopup="dialog">
            <span className="effect-icon">
              <Icon name="sparkle" size={13} />
            </span>
            <span className="effect-name">{labelFor(doc.effectId)}</span>
            <Icon name="chevronDown" size={15} />
          </button>
        </div>

        {ui.tab === 'effects' && (
          <>
            <div className="studio-section">
              <div className="studio-section-title">
                <span>Effect Parameters</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  {(colors.length > 0 || controls.some((c) => c.kind === 'color')) && (
                    <button type="button" onClick={matchSystemColors}>
                      Match System
                    </button>
                  )}
                  <button type="button" onClick={() => dispatch({ type: 'resetEffect' })}>
                    Reset
                  </button>
                </div>
              </div>
              {colors.map((color, index) => (
                <ColorRow
                  key={`${doc.effectId}-color-${index}`}
                  label={labels[index] ?? `Color ${index + 1}`}
                  value={color}
                  onChange={(value) => dispatch({ type: 'setColor', index, value })}
                  onCommit={() => dispatch({ type: 'commit' })}
                />
              ))}
              {controls.map((control) => {
                const value = params[control.key];
                if (control.kind === 'slider') {
                  return (
                    <SliderRow
                      key={control.key}
                      control={control}
                      value={typeof value === 'number' ? value : Number(control.default)}
                      onChange={(next) => setParam(control.key, next)}
                      onCommit={() => dispatch({ type: 'commit' })}
                    />
                  );
                }
                if (control.kind === 'color') {
                  return (
                    <ColorRow
                      key={control.key}
                      label={control.label}
                      value={typeof value === 'string' ? value : String(control.default)}
                      onChange={(next) => setParam(control.key, next)}
                      onCommit={() => dispatch({ type: 'commit' })}
                    />
                  );
                }
                if (control.kind === 'toggle') {
                  return (
                    <ToggleRow
                      key={control.key}
                      label={control.label}
                      value={Boolean(value)}
                      onChange={(next) => setParam(control.key, next, true)}
                    />
                  );
                }
                return (
                  <SelectRow
                    key={control.key}
                    label={control.label}
                    value={String(value ?? control.default)}
                    options={control.options ?? [String(control.default)]}
                    onChange={(next) => setParam(control.key, next, true)}
                  />
                );
              })}
            </div>
          </>
        )}

        {ui.tab === 'motion' && (
          <>
            <div className="studio-section">
              <div className="studio-section-title">
                <span>Playback &amp; Loop Engine</span>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'setAnimation',
                      patch: {
                        animate: true,
                        motionPreset: 'float-3d',
                        motionIntensity: 100,
                        easing: 'sine',
                        speed: 1,
                        startTime: 0,
                        duration: 4,
                        loopMode: 'loop',
                      },
                    })
                  }
                >
                  Reset Motion
                </button>
              </div>
              <ToggleRow
                label="Animate"
                value={doc.animation.animate}
                onChange={(value) => dispatch({ type: 'setAnimation', patch: { animate: value } })}
              />
              <ToggleRow
                label="Interactive Pointer 3D Tilt"
                value={doc.animation.interactiveTilt ?? true}
                onChange={(value) => dispatch({ type: 'setAnimation', patch: { interactiveTilt: value } })}
              />

              <div style={{ margin: '8px 0' }}>
                <div className="studio-field-label" style={{ marginBottom: 5 }}>
                  Loop Mode
                </div>
                <div className="page-segmented">
                  {(
                    [
                      ['loop', 'Seamless Loop'],
                      ['pingpong', 'Ping-Pong'],
                      ['once', 'One-Shot'],
                    ] as [LoopMode, string][]
                  ).map(([lm, lbl]) => (
                    <button
                      key={lm}
                      type="button"
                      aria-pressed={(doc.animation.loopMode ?? 'loop') === lm}
                      onClick={() => dispatch({ type: 'setAnimation', patch: { loopMode: lm } })}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              <SelectRow
                label="Easing Curve"
                value={activeEasingLabel}
                options={EXTENDED_EASINGS.map((e) => e.label)}
                onChange={(value) =>
                  dispatch({
                    type: 'setAnimation',
                    patch: {
                      easing: EXTENDED_EASINGS.find((e) => e.label === value)?.id ?? 'linear',
                    },
                  })
                }
              />
              <SliderRow
                control={{ key: 'speed', label: 'Speed', kind: 'slider', min: 0.1, max: 3, step: 0.05, default: 1, unit: '×' }}
                value={doc.animation.speed}
                onChange={(value) => dispatch({ type: 'setAnimation', patch: { speed: value } })}
                onCommit={() => dispatch({ type: 'commit' })}
              />
              <SliderRow
                control={{ key: 'duration', label: 'Loop Duration', kind: 'slider', min: 0.5, max: 15, step: 0.1, default: 4, unit: ' s' }}
                value={doc.animation.duration}
                onChange={(value) => dispatch({ type: 'setAnimation', patch: { duration: value } })}
                onCommit={() => dispatch({ type: 'commit' })}
              />
              <SliderRow
                control={{
                  key: 'start',
                  label: 'Phase Offset / Scrub',
                  kind: 'slider',
                  min: 0,
                  max: doc.animation.duration,
                  step: 0.05,
                  default: 0,
                  unit: ' s',
                }}
                value={doc.animation.startTime}
                onChange={(value) => dispatch({ type: 'setAnimation', patch: { startTime: value } })}
                onCommit={() => dispatch({ type: 'commit' })}
              />
            </div>

            <div className="studio-section">
              <div className="studio-section-title">
                <span>3D Motion Choreography (10)</span>
              </div>
              <SliderRow
                control={{
                  key: 'motionIntensity',
                  label: 'Choreography Amplitude',
                  kind: 'slider',
                  min: 0,
                  max: 200,
                  step: 5,
                  default: 100,
                  unit: '%',
                }}
                value={doc.animation.motionIntensity ?? 100}
                onChange={(value) => dispatch({ type: 'setAnimation', patch: { motionIntensity: value } })}
                onCommit={() => dispatch({ type: 'commit' })}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, marginTop: 8 }}>
                {MOTION_PRESETS.map((mp) => (
                  <button
                    key={mp.id}
                    type="button"
                    className={`page-chip ${(doc.animation.motionPreset ?? 'float-3d') === mp.id ? 'is-active' : ''}`}
                    style={{ justifyContent: 'center', fontSize: 11 }}
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
              <button
                type="button"
                className="ds-action-btn is-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}
                onClick={() => dispatch({ type: 'setUI', patch: { stageMode: 'video' } })}
              >
                Open Video Mastering Studio →
              </button>
            </div>
          </>
        )}

        {ui.tab === 'camera' && (
          <>
            <div className="studio-section">
              <div className="studio-section-title">
                <span>3D Camera &amp; Transform Rig</span>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'setTransform',
                      patch: { scale: 100, x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0 },
                    })
                  }
                >
                  Reset
                </button>
              </div>
              <div className="page-chip-row" style={{ marginBottom: 10 }}>
                {CAMERA_RIG_PRESETS.map((cam) => (
                  <button
                    key={cam.id}
                    type="button"
                    className="page-chip"
                    onClick={() => dispatch({ type: 'setTransform', patch: cam.patch })}
                  >
                    {cam.label}
                  </button>
                ))}
              </div>
              <SliderRow
                control={{ key: 'logoScale', label: 'Logo Scale', kind: 'slider', min: 10, max: 200, step: 1, default: 100, unit: '%' }}
                value={doc.transform.scale}
                onChange={(value) => dispatch({ type: 'setTransform', patch: { scale: value } })}
                onCommit={() => dispatch({ type: 'commit' })}
              />
              {(
                [
                  ['x', 'Position X', -0.5, 0.5, 0.01],
                  ['y', 'Position Y', -0.5, 0.5, 0.01],
                  ['z', 'Position Z', -1, 1, 0.01],
                  ['rotateX', 'Rotation X', -180, 180, 1],
                  ['rotateY', 'Rotation Y', -180, 180, 1],
                  ['rotateZ', 'Rotation Z', -180, 180, 1],
                ] as const
              ).map(([key, label, min, max, step]) => (
                <SliderRow
                  key={key}
                  control={{ key, label, kind: 'slider', min, max, step, default: 0 }}
                  value={doc.transform[key]}
                  onChange={(value) => dispatch({ type: 'setTransform', patch: { [key]: value } as never })}
                  onCommit={() => dispatch({ type: 'commit' })}
                />
              ))}
            </div>

            <div className="studio-section">
              <div className="studio-section-title">
                <span>Post-FX Grading Stack (11)</span>
                {doc.filters.some((f) => f.enabled) && (
                  <button type="button" onClick={() => dispatch({ type: 'resetFilters' })}>
                    Reset
                  </button>
                )}
              </div>
              <div className="page-chip-row" style={{ marginBottom: 10 }}>
                {FILTER_MASTER_PRESETS.map((fp) => (
                  <button
                    key={fp.id}
                    type="button"
                    className="page-chip"
                    onClick={() =>
                      dispatch({
                        type: 'setFiltersList',
                        filters: applyFilterPresetToList(doc.filters, fp.id),
                      })
                    }
                  >
                    {fp.label}
                  </button>
                ))}
              </div>
              {FILTERS.map((filter) => {
                const setting = doc.filters.find((f) => f.id === filter.id)!;
                return (
                  <div key={filter.id} className={`param-row ${setting.enabled ? 'is-slider' : ''}`}>
                    <button
                      type="button"
                      aria-label={`Toggle ${filter.label}`}
                      onClick={() => dispatch({ type: 'setFilter', id: filter.id, patch: { enabled: !setting.enabled } })}
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 4,
                        border: '1px solid currentColor',
                        background: setting.enabled ? 'var(--studio-accent)' : 'transparent',
                        marginRight: 8,
                        flex: 'none',
                      }}
                    />
                    <span className="param-label" style={{ flex: 1 }}>
                      {filter.label}
                    </span>
                    <input
                      type="range"
                      min={filter.min}
                      max={filter.max}
                      step={filter.step}
                      value={setting.amount}
                      aria-label={`${filter.label} amount`}
                      onChange={(e) =>
                        dispatch({
                          type: 'setFilter',
                          id: filter.id,
                          patch: { amount: Number(e.target.value), enabled: true },
                        })
                      }
                      style={{ width: 96, accentColor: 'var(--studio-accent)' }}
                    />
                    <span className="param-value" style={{ width: 38, justifyContent: 'flex-end' }}>
                      {setting.amount.toFixed(filter.step >= 1 ? 0 : 2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {ui.tab === 'presets' && (
          <>
            <div className="studio-section">
              <div className="studio-section-title">
                <span>Curated Studio Showcases (12)</span>
              </div>
              <div style={{ display: 'grid', gap: 6 }}>
                {STUDIO_FX_SHOWCASES.map((sc) => (
                  <button
                    key={sc.id}
                    type="button"
                    className="bx-archetype-card"
                    onClick={() => applyShowcase(sc)}
                  >
                    <div className="bx-archetype-top">
                      <strong>{sc.label}</strong>
                      <div className="bx-archetype-dots">
                        {(sc.colors ?? ['#ffffff']).map((hex, idx) => (
                          <span key={idx} style={{ background: hex }} />
                        ))}
                      </div>
                    </div>
                    <span className="bx-archetype-sub">
                      {sc.subtitle} ({sc.motionPreset})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="studio-section">
              <div className="studio-section-title">
                <span>Stage Backdrop &amp; Aspect</span>
              </div>
              <div className="page-chip-row" style={{ marginBottom: 10 }}>
                {(
                  [
                    ['spotlight', 'Spotlight'],
                    ['grid', 'Cyber Grid'],
                    ['aura', 'Ambient Aura'],
                    ['color', 'Solid Color'],
                    ['transparent', 'Alpha Grid'],
                  ] as [StageBackdropMode, string][]
                ).map(([bm, blbl]) => (
                  <button
                    key={bm}
                    type="button"
                    className={`page-chip ${(doc.canvas.backdrop ?? 'spotlight') === bm ? 'is-active' : ''}`}
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

              <div style={{ marginBottom: 10 }}>
                <div className="studio-field-label" style={{ marginBottom: 5 }}>
                  Stage Aspect Ratio
                </div>
                <div className="page-segmented">
                  {(['1:1', '16:9', '9:16'] as StageAspectMode[]).map((asp) => (
                    <button
                      key={asp}
                      type="button"
                      aria-pressed={(doc.canvas.aspect ?? '1:1') === asp}
                      onClick={() => dispatch({ type: 'setCanvas', patch: { aspect: asp } })}
                    >
                      {asp}
                    </button>
                  ))}
                </div>
              </div>

              <SelectRow
                label="Export Resolution"
                value={`${doc.canvas.width}`}
                options={['512', '1024', '1500', '2048', '3000']}
                onChange={(value) =>
                  dispatch({ type: 'setCanvas', patch: { width: Number(value), height: Number(value) } })
                }
              />
              <ColorRow
                label="Backdrop Color"
                value={doc.canvas.backgroundColor}
                onChange={(value) => dispatch({ type: 'setCanvas', patch: { backgroundColor: value } })}
                onCommit={() => dispatch({ type: 'commit' })}
              />
              <ToggleRow
                label="Studio Dark Theme"
                value={theme === 'dark'}
                onChange={(value) => setTheme(value ? 'dark' : 'light')}
              />
            </div>

            <div className="studio-section">
              <div className="studio-section-title">
                <span>Active Document</span>
              </div>
              <div className="param-row">
                <span className="param-label">Logo Mark</span>
                <span className="param-value">{activeMark.name}</span>
              </div>
              <div className="param-row">
                <span className="param-label">Shader</span>
                <span className="param-value">{labelFor(doc.effectId)}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {picker && (
        <EffectPicker
          current={doc.effectId}
          anchor={picker}
          onSelect={(id) => dispatch({ type: 'setEffect', id })}
          onClose={() => setPicker(null)}
        />
      )}
    </aside>
  );
}
