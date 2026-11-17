import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface DsSelectOption {
  value: string;
  label: string;
  meta?: string;
}

interface DsSelectProps {
  value: string;
  options: (DsSelectOption | string)[];
  onChange: (value: string) => void;
  ariaLabel?: string;
  variant?: 'default' | 'pill' | 'row';
  fullWidth?: boolean;
  searchable?: boolean;
  placeholder?: string;
}

function splitMeta(rawLabel: string): { label: string; meta?: string } {
  const m = rawLabel.match(/^(.*?)\s*\(([^()]+)\)\s*$/);
  return m ? { label: m[1], meta: m[2] } : { label: rawLabel };
}

export function DsSelect({
  value,
  options,
  onChange,
  ariaLabel,
  variant = 'default',
  fullWidth = false,
  searchable,
  placeholder = 'Select…',
}: DsSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; minWidth: number }>({
    top: -9999,
    left: -9999,
    minWidth: 210,
  });

  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const normalized = useMemo<DsSelectOption[]>(
    () =>
      options.map((o) => {
        if (typeof o === 'string') {
          const parsed = splitMeta(o);
          return { value: o, label: parsed.label, meta: parsed.meta };
        }
        if (o.meta === undefined) {
          const parsed = splitMeta(o.label);
          return { value: o.value, label: parsed.label, meta: parsed.meta };
        }
        return o;
      }),
    [options],
  );

  const selected = normalized.find((o) => o.value === value) ?? normalized[0];
  const showSearch = searchable ?? normalized.length > 8;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return normalized;
    return normalized.filter(
      (o) => o.label.toLowerCase().includes(q) || (o.meta ?? '').toLowerCase().includes(q),
    );
  }, [normalized, query]);

  const reposition = () => {
    const btn = btnRef.current;
    const menu = menuRef.current;
    if (!btn || !menu) return;
    const rect = btn.getBoundingClientRect();
    const minW = Math.max(210, Math.round(rect.width));
    const mh = menu.offsetHeight || 260;
    const mw = Math.max(minW, menu.offsetWidth || minW);
    const spaceBelow = window.innerHeight - rect.bottom - 10;
    const spaceAbove = rect.top - 10;
    const openUp = spaceBelow < Math.min(mh, 220) && spaceAbove > spaceBelow;
    const top = openUp
      ? Math.max(8, rect.top - mh - 6)
      : Math.min(window.innerHeight - mh - 8, rect.bottom + 6);
    const left = Math.min(Math.max(8, rect.left), Math.max(8, window.innerWidth - mw - 8));
    setMenuStyle({ top: Math.round(top), left: Math.round(left), minWidth: minW });
  };

  useLayoutEffect(() => {
    if (!open) return;
    reposition();
  }, [open, filtered.length]);

  useEffect(() => {
    if (!open) return;
    const selIdx = Math.max(
      0,
      normalized.findIndex((o) => o.value === value),
    );
    setActiveIndex(selIdx);
    if (showSearch) {
      requestAnimationFrame(() => searchRef.current?.focus({ preventScroll: true }));
    }

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (wrapRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onScroll = (e: Event) => {
      const t = e.target as Node | null;
      if (t && menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', reposition);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', reposition);
    };
  }, [open, normalized, showSearch, value]);

  const choose = (opt: DsSelectOption) => {
    setOpen(false);
    setQuery('');
    if (opt.value !== value) onChange(opt.value);
    btnRef.current?.focus({ preventScroll: true });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      setQuery('');
      btnRef.current?.focus({ preventScroll: true });
    } else if (e.key === 'ArrowDown' && filtered.length) {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === 'ArrowUp' && filtered.length) {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Home' && filtered.length) {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === 'End' && filtered.length) {
      e.preventDefault();
      setActiveIndex(filtered.length - 1);
    } else if (e.key === 'Enter' && filtered.length) {
      e.preventDefault();
      choose(filtered[Math.min(activeIndex, filtered.length - 1)]);
    }
  };

  const portalRoot =
    (wrapRef.current?.closest('.logo-studio') as HTMLElement | null) ?? document.body;

  const variantCls = variant === 'pill' ? 'is-pill' : variant === 'row' ? 'is-row' : '';

  return (
    <div
      ref={wrapRef}
      className={`ds-select ${variantCls} ${fullWidth ? 'is-full' : ''}`.trim()}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={btnRef}
        type="button"
        className="ds-select-btn"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setQuery('');
          setOpen((v) => !v);
        }}
      >
        <span className="ds-select-main">
          <span className="ds-select-label">{selected?.label ?? placeholder}</span>
          {selected?.meta && variant !== 'row' && <span className="ds-select-meta">{selected.meta}</span>}
        </span>
        <svg
          className="ds-select-chev"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            className="ds-select-menu"
            role="listbox"
            style={{ top: menuStyle.top, left: menuStyle.left, minWidth: menuStyle.minWidth }}
            onKeyDown={handleKeyDown}
          >
            {showSearch && (
              <div className="ds-select-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  placeholder="Filter options…"
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                />
              </div>
            )}
            <div className="ds-select-list">
              {filtered.length === 0 ? (
                <div className="ds-select-empty">No matching options</div>
              ) : (
                filtered.map((opt, idx) => {
                  const isResetFirst =
                    idx === 1 &&
                    !query.trim() &&
                    (normalized[0]?.value === '' || normalized[0]?.value === 'all');
                  return (
                    <div key={`${opt.value}-${idx}`}>
                      {isResetFirst && <div className="ds-select-sep" />}
                      <button
                        type="button"
                        role="option"
                        aria-selected={opt.value === value}
                        className={`ds-select-opt ${idx === activeIndex ? 'is-active' : ''}`}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => choose(opt)}
                      >
                        <span className="ds-select-opt-label">{opt.label}</span>
                        <span className="ds-select-opt-right">
                          {opt.meta && <span className="ds-select-opt-cnt">{opt.meta}</span>}
                          <svg
                            className="ds-select-opt-chk"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 8.5l3.2 3.2L13 5" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>,
          portalRoot,
        )}
    </div>
  );
}
