import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  compileDesignSystem,
  seedSystemFromCatalog,
  type CompiledSystem,
  type DesignSystemDoc,
} from '../engine/dsEngine';
import { useHtmlTheme } from './theme';

export interface CatalogSystemSummary {
  slug: string;
  name: string;
  org?: string;
  style?: string;
  category?: string;
  theme?: 'dark' | 'light';
  provenance?: string;
  stars?: number;
  popularityRank?: number;
  canvas?: string;
  surface?: string;
  text?: string;
  muted?: string;
  brand?: string;
  radius?: string;
  palette?: { name: string; value: string }[];
  type?: { name: string; fontFamily?: string; fontSize?: string; fontWeight?: string | number }[];
  icons?: { pack?: string; library?: string };
}

export interface IconPackRecord {
  package: string;
  version: string;
  grid: number;
  glyphs: { name: string; svg: string }[];
}

export interface ActiveMark {
  id: string;
  name: string;
  svg: string;
  source: 'default' | 'createx' | 'logodb' | 'iconpack' | 'upload';
}

export const SPLIT_CODEX_WHITE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-label="Design Sourcebook">
  <path fill="#FFFFFF" fill-rule="evenodd" d="M 26 47.18 Q 26 42.68 30.35 43.84 L 113.65 66.17 Q 118 67.33 118 71.83 L 118 208.83 Q 118 213.33 113.65 212.17 L 30.35 189.84 Q 26 188.68 26 184.18 Z M 52.43 74.76 Q 50.5 74.24 50.5 76.24 L 50.5 168.24 Q 50.5 170.24 52.43 170.76 L 91.57 181.25 Q 93.5 181.77 93.5 179.77 L 93.5 87.77 Q 93.5 85.77 91.57 85.25 Z"/>
  <path fill="#FFFFFF" d="M 138 71.83 Q 138 67.33 142.35 66.17 L 225.65 43.84 Q 230 42.68 230 47.18 L 230 70.18 Q 230 74.68 225.65 75.84 L 142.35 98.17 Q 138 99.33 138 94.83 Z"/>
  <path fill="#FFFFFF" d="M 138 128.83 Q 138 124.33 142.35 123.17 L 225.65 100.84 Q 230 99.68 230 104.18 L 230 127.18 Q 230 131.68 225.65 132.84 L 142.35 155.17 Q 138 156.33 138 151.83 Z"/>
  <path fill="#FFFFFF" d="M 138 185.83 Q 138 181.33 142.35 180.17 L 225.65 157.84 Q 230 156.68 230 161.18 L 230 184.18 Q 230 188.68 225.65 189.84 L 142.35 212.17 Q 138 213.33 138 208.83 Z"/>
</svg>`;

export const CURATED_MARKS: ActiveMark[] = [
  { id: 'split-codex', name: 'Split Codex', svg: SPLIT_CODEX_WHITE_SVG, source: 'default' },
  {
    id: 'prism-triad',
    name: 'Architectural Triad',
    source: 'default',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256"><path fill="#FFFFFF" d="M128 24 L232 208 H172 L128 128 L84 208 H24 Z M104 168 H152 L128 212 Z"/></svg>`,
  },
  {
    id: 'codex-knot',
    name: 'Modular Loop',
    source: 'default',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256"><path fill="#FFFFFF" fill-rule="evenodd" d="M40 40 H152 A64 64 0 0 1 152 168 H104 V216 H40 Z M80 80 V128 H148 A24 24 0 0 0 148 80 Z"/><rect x="148" y="148" width="68" height="68" rx="16" fill="#FFFFFF"/></svg>`,
  },
];

const DEFAULT_SYSTEM: DesignSystemDoc = {
  name: 'Northwind System',
  tagline: 'Systematic instruments engineered on verified tokens',
  handle: '@northwind',
  seedSlug: null,
  polarity: 'dark',
  primaryHex: '#0ea5e9',
  secondaryHex: '#f59e0b',
  accentHex: '#10b981',
  neutralTemp: -0.15,
  harmony: 'split',
  displayFont: "'Geist', 'Inter', system-ui, sans-serif",
  bodyFont: "'Geist', 'Inter', system-ui, sans-serif",
  monoFont: "'JetBrains Mono', ui-monospace, monospace",
  baseFontPx: 16,
  typeRatio: 1.25,
  baseSpacePx: 8,
  baseRadiusPx: 8,
  elevationStyle: 'layered',
  elevationStrength: 0.75,
};

interface ProjectContextValue {
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  toggleTheme: () => void;
  designSystem: DesignSystemDoc;
  setDesignSystem: (patch: Partial<DesignSystemDoc>) => void;
  replaceDesignSystem: (doc: DesignSystemDoc) => void;
  resetDesignSystem: () => void;
  compiledSystem: CompiledSystem;
  activeMark: ActiveMark;
  setActiveMark: (mark: ActiveMark) => void;
  catalogSystems: CatalogSystemSummary[];
  iconPacks: Record<string, IconPackRecord>;
  catalogLoading: boolean;
  seedFromSystemSlug: (slug: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

const STORAGE_KEY = 'ds_studio_project_v1';

function readInitialHashSeed(): string | null {
  const h = window.location.hash;
  const qIdx = h.indexOf('?');
  if (qIdx === -1) return null;
  const params = new URLSearchParams(h.slice(qIdx + 1));
  return params.get('seed');
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('ds_studio_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch { /* ignore */ }
    return 'dark';
  });

  useHtmlTheme(theme);

  useEffect(() => {
    try { localStorage.setItem('ds_studio_theme', theme); } catch { /* ignore */ }
  }, [theme]);

  const [designSystem, setDesignSystemState] = useState<DesignSystemDoc>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.designSystem?.primaryHex) return { ...DEFAULT_SYSTEM, ...parsed.designSystem };
      }
    } catch { /* ignore */ }
    return DEFAULT_SYSTEM;
  });

  const [activeMark, setActiveMarkState] = useState<ActiveMark>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.activeMark?.svg) return parsed.activeMark;
      }
    } catch { /* ignore */ }
    return CURATED_MARKS[0];
  });

  const [catalogSystems, setCatalogSystems] = useState<CatalogSystemSummary[]>([]);
  const [iconPacks, setIconPacks] = useState<Record<string, IconPackRecord>>({});
  const [catalogLoading, setCatalogLoading] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ designSystem, activeMark }));
    } catch { /* ignore */ }
  }, [designSystem, activeMark]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/catalog');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled && Array.isArray(data.systems)) {
          setCatalogSystems(data.systems);
          setIconPacks(data.iconPacks || {});
        }
      } catch {
        // Offline / local fallback leaves lists empty gracefully
      } finally {
        if (!cancelled) setCatalogLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const seedFromSystemSlug = useCallback(async (slug: string) => {
    try {
      const res = await fetch(`/api/systems/${encodeURIComponent(slug)}`);
      if (!res.ok) {
        const local = catalogSystems.find((s) => s.slug === slug);
        if (local) {
          const patch = seedSystemFromCatalog(local as unknown as Record<string, unknown>);
          setDesignSystemState((prev) => ({ ...prev, ...patch }));
        }
        return;
      }
      const data = await res.json();
      if (data.system) {
        const merged = { ...data.system, ...(data.system.preview || {}) };
        const patch = seedSystemFromCatalog(merged);
        setDesignSystemState((prev) => ({ ...prev, ...patch }));
      }
    } catch { /* ignore */ }
  }, [catalogSystems]);

  useEffect(() => {
    const checkSeed = () => {
      const seed = readInitialHashSeed();
      if (seed) seedFromSystemSlug(seed);
    };
    checkSeed();
    window.addEventListener('hashchange', checkSeed);
    return () => window.removeEventListener('hashchange', checkSeed);
  }, [seedFromSystemSlug]);

  const compiledSystem = useMemo(() => compileDesignSystem(designSystem), [designSystem]);

  const value = useMemo<ProjectContextValue>(() => ({
    theme,
    setTheme,
    toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    designSystem,
    setDesignSystem: (patch) => setDesignSystemState((prev) => ({ ...prev, ...patch })),
    replaceDesignSystem: (doc) => setDesignSystemState(doc),
    resetDesignSystem: () => setDesignSystemState(DEFAULT_SYSTEM),
    compiledSystem,
    activeMark,
    setActiveMark: setActiveMarkState,
    catalogSystems,
    iconPacks,
    catalogLoading,
    seedFromSystemSlug,
  }), [theme, designSystem, compiledSystem, activeMark, catalogSystems, iconPacks, catalogLoading, seedFromSystemSlug]);

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProject(): ProjectContextValue {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProject must be used inside ProjectProvider');
  return ctx;
}
