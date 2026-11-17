import { useMemo, useRef, useState } from 'react';
import { ColorRow, SelectRow, SliderRow, ToggleRow } from './ParamRow';
import { EffectPicker } from './EffectPicker';
import { Icon } from './icons';
import {
  EASING_LABELS,
  EASINGS,
  FILTERS,
  colorLabelsFor,
  colorsFor,
  controlsFor,
  labelFor,
} from '../data/effects';
import { currentColors, currentParams, useStudio } from '../state/studio';
import { useProject } from '../state/project';

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

  return (
    <aside className={`studio-inspector ${ui.collapsed ? 'is-collapsed' : ''}`} id="studio-inspector">
      <div className="studio-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          className="studio-tab"
          aria-selected={ui.tab === 'effects'}
          onClick={() => dispatch({ type: 'setUI', patch: { tab: 'effects' } })}
        >
          Effects
        </button>
        <button
          type="button"
          role="tab"
          className="studio-tab"
          aria-selected={ui.tab === 'general'}
          onClick={() => dispatch({ type: 'setUI', patch: { tab: 'general' } })}
        >
          General
        </button>
      </div>

      <div className="studio-panel-scroll">
        {ui.tab === 'effects' ? (
          <>
            <div className="studio-section">
              <div className="studio-field-label">Effect</div>
              <button ref={selectRef} type="button" className="effect-select" onClick={openPicker} aria-haspopup="dialog">
                <span className="effect-icon">
                  <Icon name="sparkle" size={13} />
                </span>
                <span className="effect-name">{labelFor(doc.effectId)}</span>
                <Icon name="chevronDown" size={15} />
              </button>
            </div>

            <div className="studio-section">
              <div className="studio-section-title">
                <span>Effect Settings</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  {colors.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const pal = [compiledSystem.semantic.brand, compiledSystem.semantic.secondary, compiledSystem.semantic.accent];
                        colors.forEach((_, idx) => {
                          dispatch({ type: 'setColor', index: idx, value: pal[idx % pal.length] });
                        });
                        dispatch({ type: 'commit' });
                      }}
                    >
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

            <div className="studio-section">
              <div className="studio-section-title">
                <span>Animation</span>
              </div>
              <ToggleRow
                label="Animate"
                value={doc.animation.animate}
                onChange={(value) => dispatch({ type: 'setAnimation', patch: { animate: value } })}
              />
              <SelectRow
                label="Easing"
                value={EASING_LABELS[doc.animation.easing] ?? doc.animation.easing}
                options={EASINGS.map((e) => EASING_LABELS[e])}
                onChange={(value) =>
                  dispatch({
                    type: 'setAnimation',
                    patch: { easing: EASINGS.find((e) => EASING_LABELS[e] === value) ?? 'linear' },
                  })
                }
              />
              <SliderRow
                control={{ key: 'speed', label: 'Speed', kind: 'slider', min: 0.1, max: 3, step: 0.05, default: 1 }}
                value={doc.animation.speed}
                onChange={(value) => dispatch({ type: 'setAnimation', patch: { speed: value } })}
                onCommit={() => dispatch({ type: 'commit' })}
              />
              <SliderRow
                control={{ key: 'start', label: 'Start Time', kind: 'slider', min: 0, max: 5, step: 0.1, default: 0 }}
                value={doc.animation.startTime}
                onChange={(value) => dispatch({ type: 'setAnimation', patch: { startTime: value } })}
                onCommit={() => dispatch({ type: 'commit' })}
              />
              <SliderRow
                control={{ key: 'duration', label: 'Duration', kind: 'slider', min: 0.5, max: 15, step: 0.1, default: 4, unit: ' s' }}
                value={doc.animation.duration}
                onChange={(value) => dispatch({ type: 'setAnimation', patch: { duration: value } })}
                onCommit={() => dispatch({ type: 'commit' })}
              />
            </div>

            <div className="studio-section">
              <div className="studio-section-title">
                <span>Transform</span>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'setTransform',
                      patch: { scale: 100, x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0 },
                    })
                  }
                >
                  Reset Transform
                </button>
              </div>
              <SliderRow
                control={{ key: 'logoScale', label: 'Logo Scale', kind: 'slider', min: 10, max: 200, step: 1, default: 100, unit: '%' }}
                value={doc.transform.scale}
                onChange={(value) => dispatch({ type: 'setTransform', patch: { scale: value } })}
                onCommit={() => dispatch({ type: 'commit' })}
              />
              {([
                ['x', 'Position X', -0.5, 0.5, 0.01],
                ['y', 'Position Y', -0.5, 0.5, 0.01],
                ['z', 'Position Z', -1, 1, 0.01],
                ['rotateX', 'Rotation X', -180, 180, 1],
                ['rotateY', 'Rotation Y', -180, 180, 1],
                ['rotateZ', 'Rotation Z', -180, 180, 1],
              ] as const).map(([key, label, min, max, step]) => (
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
                <span>Filters</span>
                <button type="button" onClick={() => dispatch({ type: 'setUI', patch: { showFilters: !ui.showFilters } })}>
                  {ui.showFilters ? 'Hide' : 'Show'}
                </button>
              </div>
              {ui.showFilters &&
                FILTERS.map((filter) => {
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
                          dispatch({ type: 'setFilter', id: filter.id, patch: { amount: Number(e.target.value), enabled: true } })
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
        ) : (
          <>
            <div className="studio-section">
              <div className="studio-section-title">
                <span>Canvas</span>
              </div>
              <SelectRow
                label="Size"
                value={`${doc.canvas.width}`}
                options={['512', '1024', '1500', '2048', '3000']}
                onChange={(value) =>
                  dispatch({ type: 'setCanvas', patch: { width: Number(value), height: Number(value) } })
                }
              />
              <SelectRow
                label="Fit"
                value={doc.canvas.fit}
                options={['contain', 'cover']}
                onChange={(value) => dispatch({ type: 'setCanvas', patch: { fit: value as 'contain' | 'cover' } })}
              />
              <SelectRow
                label="Background"
                value={doc.canvas.background}
                options={['transparent', 'color']}
                onChange={(value) =>
                  dispatch({ type: 'setCanvas', patch: { background: value as 'transparent' | 'color' } })
                }
              />
              <ColorRow
                label="Canvas Color"
                value={doc.canvas.backgroundColor}
                onChange={(value) => dispatch({ type: 'setCanvas', patch: { backgroundColor: value } })}
                onCommit={() => dispatch({ type: 'commit' })}
              />
            </div>
            <div className="studio-section">
              <div className="studio-section-title">
                <span>Appearance</span>
              </div>
              <ToggleRow
                label="Dark Mode"
                value={theme === 'dark'}
                onChange={(value) => setTheme(value ? 'dark' : 'light')}
              />
              <SliderRow
                control={{ key: 'zoom', label: 'Zoom', kind: 'slider', min: 25, max: 200, step: 1, default: 100, unit: '%' }}
                value={ui.zoom}
                onChange={(value) => dispatch({ type: 'setUI', patch: { zoom: value } })}
                onCommit={() => dispatch({ type: 'commit' })}
              />
            </div>
            <div className="studio-section">
              <div className="studio-section-title">
                <span>Document</span>
              </div>
              <div className="param-row">
                <span className="param-label">Logo</span>
                <span className="param-value">{activeMark.name}</span>
              </div>
              <div className="param-row">
                <span className="param-label">Effect</span>
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
