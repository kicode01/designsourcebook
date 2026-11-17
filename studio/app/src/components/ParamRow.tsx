import { useCallback, useRef } from 'react';
import type { Control } from '../data/effects';

function formatValue(value: number, step: number | undefined, unit: string | undefined): string {
  const decimals = !step || step >= 1 ? 0 : step >= 0.1 ? 1 : 2;
  return `${value.toFixed(decimals)}${unit ?? ''}`;
}

interface SliderRowProps {
  control: Control;
  value: number;
  onChange: (value: number) => void;
  onCommit: () => void;
}

export function SliderRow({ control, value, onChange, onCommit }: SliderRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const min = control.min ?? 0;
  const max = control.max ?? 1;
  const step = control.step ?? 0.01;
  const pct = Math.min(1, Math.max(0, (value - min) / (max - min || 1)));

  const valueFromEvent = useCallback(
    (clientX: number) => {
      const el = ref.current;
      if (!el) return value;
      const rect = el.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const raw = min + ratio * (max - min);
      const snapped = Math.round(raw / step) * step;
      return Math.min(max, Math.max(min, Number(snapped.toFixed(6))));
    },
    [max, min, step, value],
  );

  return (
    <div
      ref={ref}
      className="param-row is-slider"
      role="slider"
      tabIndex={0}
      aria-label={control.label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        onChange(valueFromEvent(e.clientX));
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        onChange(valueFromEvent(e.clientX));
      }}
      onPointerUp={(e) => {
        if (!dragging.current) return;
        dragging.current = false;
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
        onCommit();
      }}
      onKeyDown={(e) => {
        const delta = e.shiftKey ? step * 10 : step;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          onChange(Math.min(max, Number((value + delta).toFixed(6))));
          onCommit();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          onChange(Math.max(min, Number((value - delta).toFixed(6))));
          onCommit();
        }
      }}
    >
      <div className="param-fill" style={{ width: `${pct * 100}%` }} />
      <span className="param-label">{control.label}</span>
      <span className="param-value">{formatValue(value, step, control.unit)}</span>
    </div>
  );
}

export function ColorRow({
  label,
  value,
  onChange,
  onCommit,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onCommit: () => void;
}) {
  return (
    <label className="param-row is-color">
      <span className="param-label">{label}</span>
      <span className="param-value">
        {value.toLowerCase()}
        <span className="param-swatch" style={{ background: value }} />
      </span>
      <input
        type="color"
        value={value}
        aria-label={label}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onCommit}
      />
    </label>
  );
}

export function ToggleRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="param-row">
      <span className="param-label">{label}</span>
      <div className="segment" role="group" aria-label={label}>
        <button type="button" aria-pressed={!value} onClick={() => onChange(false)}>
          Off
        </button>
        <button type="button" aria-pressed={value} onClick={() => onChange(true)}>
          On
        </button>
      </div>
    </div>
  );
}

export function SelectRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="param-row">
      <span className="param-label">{label}</span>
      <span className="row-select">
        <select value={value} aria-label={label} onChange={(e) => onChange(e.target.value)}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}
