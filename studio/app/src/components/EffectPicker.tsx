import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { categories, effects, labelFor } from '../data/effects';
import { subscribeThumbs, thumbFor } from '../engine/thumbs';
import { Icon } from './icons';

interface Props {
  current: string;
  onSelect: (id: string) => void;
  onClose: () => void;
  anchor: { top: number; right: number };
}

type Filter = 'all' | '2d' | '3d' | 'mockups' | 'fav';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: '2d', label: '2D' },
  { id: '3d', label: '3D' },
  { id: 'mockups', label: 'Mock' },
  { id: 'fav', label: '★ Fav' },
];

const FAV_KEY = 'ds_logofx_favorites_v1';

const GROUP_ICON: Record<string, 'layers' | 'globe' | 'sliders' | 'sparkle' | 'image' | 'lock' | 'star'> = {
  'Extruded Logo': 'layers',
  Coin: 'globe',
  '3D Wireframe': 'sliders',
  Geometry: 'sliders',
  'Pixels & Print': 'image',
  'Light & Particles': 'sparkle',
  'Surface & Refraction': 'sparkle',
  'Distortion & Flow': 'sparkle',
  'Paper & Foil': 'layers',
  'Fabric & Craft': 'lock',
  'Scenes & Displays': 'globe',
  Social: 'image',
};

export function EffectPicker({ current, onSelect, onClose, anchor }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [favs, setFavs] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      if (raw) return new Set(JSON.parse(raw));
    } catch { /* ignore */ }
    return new Set(['liquidMetal', 'holo', 'waxSeal', 'extrude:physical']);
  });
  const ref = useRef<HTMLDivElement>(null);
  const [, refresh] = useReducer((n: number) => n + 1, 0);

  useEffect(() => subscribeThumbs(refresh), []);

  useEffect(() => {
    try { localStorage.setItem(FAV_KEY, JSON.stringify([...favs])); } catch { /* ignore */ }
  }, [favs]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [onClose]);

  const toggleFav = (id: string) => {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const groups = useMemo(() => {
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const q = norm(query);
    return categories
      .filter((c) => filter === 'all' || filter === 'fav' || c.id === filter)
      .flatMap((c) =>
        c.groups
          .map((g) => ({
            ...g,
            items: g.items.filter((item) => {
              if (filter === 'fav' && !favs.has(item.id)) return false;
              if (!q) return true;
              const hay = norm(`${item.label}${item.id}${g.label}${effects[item.id]?.key ?? ''}`);
              return hay.includes(q);
            }),
          }))
          .filter((g) => g.items.length > 0),
      );
  }, [filter, query, favs]);

  return (
    <div
      ref={ref}
      className="catalog-popover"
      style={{ top: anchor.top, right: anchor.right }}
      role="dialog"
      aria-label="Switch effect"
    >
      <div className="catalog-head">
        <span>Switch effect</span>
        <button type="button" className="icon-button" aria-label="Close" onClick={onClose} style={{ width: 24, height: 24 }}>
          <Icon name="x" size={14} />
        </button>
      </div>
      <label className="catalog-search">
        <Icon name="search" size={13} />
        <input
          autoFocus
          value={query}
          placeholder="Search 40 effects or material…"
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div className="catalog-filters">
        {FILTERS.map((f) => (
          <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="catalog-list">
        {groups.map((group) => {
          const category = categories.find((c) => c.groups.some((g) => g.label === group.label));
          return (
            <div key={group.label}>
              <div className="catalog-group-title">
                <span>{category?.label}</span>
                <span>{group.label}</span>
              </div>
              {group.items.map((item) => {
                const thumb = thumbFor(item.id);
                const isFav = favs.has(item.id);
                return (
                  <div
                    key={item.id}
                    className="catalog-item"
                    data-effect-id={item.id}
                    aria-current={item.id === current}
                    style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '0 4px 0 8px' }}
                  >
                    <button
                      type="button"
                      style={{ flex: 1, minWidth: 0, height: '100%', display: 'flex', alignItems: 'center', gap: 9, textAlign: 'left' }}
                      onClick={() => {
                        onSelect(item.id);
                        onClose();
                      }}
                    >
                      <span className={`catalog-icon ${thumb ? 'has-thumb' : ''}`}>
                        {thumb ? (
                          <img src={thumb} alt="" draggable={false} />
                        ) : (
                          <Icon name={GROUP_ICON[group.label] ?? 'sparkle'} size={11} />
                        )}
                      </span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {effects[item.id]?.label ?? labelFor(item.id)}
                      </span>
                    </button>
                    <button
                      type="button"
                      className={`star-btn ${isFav ? 'is-fav' : ''}`}
                      aria-label={isFav ? `Unfavorite ${item.label}` : `Favorite ${item.label}`}
                      aria-pressed={isFav}
                      onClick={() => toggleFav(item.id)}
                    >
                      <Icon name="star" size={12} fill={isFav ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
        {groups.length === 0 && (
          <div className="catalog-empty">
            {filter === 'fav' ? 'Star any effect to pin it here.' : `No effect matches “${query}”.`}
          </div>
        )}
      </div>
    </div>
  );
}
