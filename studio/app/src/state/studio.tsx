import { createContext, useContext, useMemo, useReducer, type Dispatch, type ReactNode } from 'react';
import { FILTERS, colorsFor, defaultsFor, shaderFor } from '../data/effects';

export interface Transform {
  scale: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  x: number;
  y: number;
  z: number;
}

export interface AnimationState {
  animate: boolean;
  easing: string;
  speed: number;
  startTime: number;
  duration: number;
}

export interface CanvasState {
  width: number;
  height: number;
  fit: 'contain' | 'cover';
  background: 'transparent' | 'color';
  backgroundColor: string;
}

export interface FilterState {
  id: string;
  amount: number;
  enabled: boolean;
}

export interface Doc {
  effectId: string;
  params: Record<string, Record<string, number | string | boolean>>;
  colors: Record<string, string[]>;
  filters: FilterState[];
  transform: Transform;
  animation: AnimationState;
  canvas: CanvasState;
}

export interface UIState {
  theme: 'dark' | 'light';
  tab: 'effects' | 'general';
  collapsed: boolean;
  zoom: number;
  logoName: string | null;
  toast: string | null;
  showFilters: boolean;
}

export interface StudioState {
  doc: Doc;
  ui: UIState;
  past: Doc[];
  future: Doc[];
}

const BASE_DOC: Doc = {
  effectId: 'liquidMetal',
  params: { liquidMetal: defaultsFor('liquidMetal') },
  colors: { liquidMetal: colorsFor('liquidMetal') },
  filters: FILTERS.map((f) => ({ id: f.id, amount: f.initial, enabled: false })),
  transform: { scale: 100, rotateX: 0, rotateY: 0, rotateZ: 0, x: 0, y: 0, z: 0 },
  animation: { animate: true, easing: 'linear', speed: 1, startTime: 0, duration: 4 },
  canvas: { width: 1500, height: 1500, fit: 'contain', background: 'transparent', backgroundColor: '#09090b' },
};

export const INITIAL_STATE: StudioState = {
  doc: BASE_DOC,
  ui: {
    theme: 'dark',
    tab: 'effects',
    collapsed: false,
    zoom: 100,
    logoName: null,
    toast: null,
    showFilters: false,
  },
  past: [],
  future: [],
};

export type Action =
  | { type: 'setEffect'; id: string }
  | { type: 'setParam'; key: string; value: number | string | boolean; commit?: boolean }
  | { type: 'setColor'; index: number; value: string }
  | { type: 'resetEffect' }
  | { type: 'setTransform'; patch: Partial<Transform> }
  | { type: 'setAnimation'; patch: Partial<AnimationState> }
  | { type: 'setCanvas'; patch: Partial<CanvasState> }
  | { type: 'setFilter'; id: string; patch: Partial<FilterState> }
  | { type: 'resetFilters' }
  | { type: 'setUI'; patch: Partial<UIState> }
  | { type: 'undo' }
  | { type: 'redo' }
  | { type: 'commit' };

const HISTORY_LIMIT = 40;

function withHistory(state: StudioState, nextDoc: Doc): StudioState {
  return {
    ...state,
    doc: nextDoc,
    past: [...state.past.slice(-HISTORY_LIMIT), state.doc],
    future: [],
  };
}

export function reducer(state: StudioState, action: Action): StudioState {
  const { doc } = state;
  switch (action.type) {
    case 'setEffect': {
      if (action.id === doc.effectId) return state;
      const params = doc.params[action.id]
        ? doc.params
        : { ...doc.params, [action.id]: defaultsFor(action.id) };
      const colors = doc.colors[action.id] ? doc.colors : { ...doc.colors, [action.id]: colorsFor(action.id) };
      return withHistory(state, { ...doc, effectId: action.id, params, colors });
    }
    case 'setParam': {
      const current = doc.params[doc.effectId] ?? {};
      const params = { ...doc.params, [doc.effectId]: { ...current, [action.key]: action.value } };
      const next = { ...doc, params };
      return action.commit ? withHistory(state, next) : { ...state, doc: next };
    }
    case 'setColor': {
      const current = doc.colors[doc.effectId] ?? [];
      const colors = { ...doc.colors, [doc.effectId]: current.map((c, i) => (i === action.index ? action.value : c)) };
      return { ...state, doc: { ...doc, colors } };
    }
    case 'resetEffect': {
      const params = { ...doc.params, [doc.effectId]: defaultsFor(doc.effectId) };
      const colors = { ...doc.colors, [doc.effectId]: colorsFor(doc.effectId) };
      return withHistory(state, { ...doc, params, colors });
    }
    case 'setTransform': {
      return { ...state, doc: { ...doc, transform: { ...doc.transform, ...action.patch } } };
    }
    case 'setAnimation': {
      return { ...state, doc: { ...doc, animation: { ...doc.animation, ...action.patch } } };
    }
    case 'setCanvas': {
      return { ...state, doc: { ...doc, canvas: { ...doc.canvas, ...action.patch } } };
    }
    case 'setFilter': {
      const filters = doc.filters.map((f) => (f.id === action.id ? { ...f, ...action.patch } : f));
      return { ...state, doc: { ...doc, filters } };
    }
    case 'resetFilters': {
      return withHistory(state, {
        ...doc,
        filters: FILTERS.map((f) => ({ id: f.id, amount: f.initial, enabled: false })),
      });
    }
    case 'setUI':
      return { ...state, ui: { ...state.ui, ...action.patch } };
    case 'commit':
      return withHistory(state, doc);
    case 'undo': {
      if (!state.past.length) return state;
      const previous = state.past[state.past.length - 1];
      return { ...state, doc: previous, past: state.past.slice(0, -1), future: [doc, ...state.future] };
    }
    case 'redo': {
      if (!state.future.length) return state;
      const [next, ...rest] = state.future;
      return { ...state, doc: next, past: [...state.past, doc], future: rest };
    }
    default:
      return state;
  }
}

interface StudioContextValue {
  state: StudioState;
  dispatch: Dispatch<Action>;
  shader: { shader: string; mode: number };
}

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const value = useMemo(
    () => ({ state, dispatch, shader: shaderFor(state.doc.effectId) }),
    [state],
  );
  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio(): StudioContextValue {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error('useStudio must be used inside StudioProvider');
  return ctx;
}

export function currentParams(doc: Doc): Record<string, number | string | boolean> {
  return doc.params[doc.effectId] ?? defaultsFor(doc.effectId);
}

export function currentColors(doc: Doc): string[] {
  return doc.colors[doc.effectId] ?? colorsFor(doc.effectId);
}
