// DESIGN.md validator.
// Implements the checks a registry needs to be able to call an entry "verified".
// Findings are structured so a badge, a score, or an agent can consume them.

import { splitFrontMatter } from "./fm.mjs";
import { parseColor, contrastRatio, flatten } from "./color.mjs";
import { resolveSurfaces } from "./preview.mjs";

export const CANONICAL_SECTIONS = [
  "overview",
  "colors",
  "typography",
  "layout",
  "elevation",
  "shapes",
  "components",
  "dos",
];

const SECTION_ALIASES = {
  overview: "overview",
  "brand & style": "overview",
  "brand and style": "overview",
  colors: "colors",
  colours: "colors",
  color: "colors",
  typography: "typography",
  layout: "layout",
  "layout & spacing": "layout",
  "layout and spacing": "layout",
  "elevation & depth": "elevation",
  elevation: "elevation",
  depth: "elevation",
  shapes: "shapes",
  "shape & radius": "shapes",
  components: "components",
  "do's and don'ts": "dos",
  "dos and don'ts": "dos",
  dos: "dos",
  donts: "dos",
};

const ALLOWED_TOP_KEYS = new Set([
  "version",
  "name",
  "description",
  "omitted",
  "colors",
  "typography",
  "rounded",
  "spacing",
  "icons",
  "components",
]);

export function normalizeHeading(heading) {
  const stripped = heading
    .replace(/^\d+[\.\)]\s*/, "")
    .replace(/[*_`]/g, "")
    .trim()
    .toLowerCase();
  return SECTION_ALIASES[stripped] || null;
}

export function extractSections(body) {
  const lines = body.split(/\r?\n/);
  const sections = [];
  let current = null;
  let inFence = false;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) {
      if (current) current.lines.push(line);
      continue;
    }
    const h2 = /^##\s+(.+?)\s*$/.exec(line);
    if (h2) {
      current = { heading: h2[1], key: normalizeHeading(h2[1]), lines: [] };
      sections.push(current);
      continue;
    }
    if (current) current.lines.push(line);
  }
  return sections.map((s) => ({ ...s, text: s.lines.join("\n").trim() }));
}

export function resolveRef(ref, data) {
  // {colors.primary} -> data.colors.primary
  const path = ref.replace(/^\{|\}$/g, "").split(".");
  let cur = data;
  for (const part of path) {
    if (cur === null || typeof cur !== "object" || !(part in cur)) return undefined;
    cur = cur[part];
  }
  return cur;
}

export function collectRefs(text) {
  const refs = [];
  const re = /\{([a-zA-Z0-9_.\-]+)\}/g;
  let m;
  while ((m = re.exec(text))) refs.push(m[1]);
  return refs;
}

export function lint(markdown, { name = "DESIGN.md" } = {}) {
  const findings = [];
  const add = (severity, rule, message, extra = {}) =>
    findings.push({ severity, rule, message, ...extra });

  const { data, body } = splitFrontMatter(markdown);
  const sections = extractSections(body);

  // --- structure ---
  if (!Object.keys(data).length) {
    add("error", "missing-front-matter", "No YAML front matter block found. Tokens are not machine-readable without it.");
  }

  for (const key of Object.keys(data)) {
    if (!ALLOWED_TOP_KEYS.has(key)) {
      const suggestion = suggestKey(key);
      add(
        "warning",
        "unknown-key",
        `Unknown top-level key "${key}"${suggestion ? ` — did you mean "${suggestion}"?` : ""}.`,
        { key }
      );
    }
  }

  const seen = new Map();
  for (const s of sections) {
    const id = s.key || `raw:${s.heading.toLowerCase()}`;
    if (seen.has(id)) {
      add("error", "duplicate-section", `Duplicate section "${s.heading}" — the file must be rejected.`, {
        heading: s.heading,
      });
    }
    seen.set(id, true);
  }

  const ordered = sections.filter((s) => s.key);
  const indices = ordered.map((s) => CANONICAL_SECTIONS.indexOf(s.key));
  for (let i = 1; i < indices.length; i++) {
    if (indices[i] < indices[i - 1]) {
      add(
        "warning",
        "section-order",
        `Section "${ordered[i].heading}" appears out of canonical order (should come before "${ordered[i - 1].heading}").`,
        { heading: ordered[i].heading }
      );
      break;
    }
  }

  const present = new Set(ordered.map((s) => s.key));
  const hasTokens = Boolean(data.colors || data.typography || data.components);
  const omitted = new Set(
    Array.isArray(data.omitted) ? data.omitted : data.omitted && typeof data.omitted === "object" ? Object.keys(data.omitted) : []
  );
  if (hasTokens) {
    const missing = CANONICAL_SECTIONS.filter((k) => !present.has(k) && !omitted.has(k));
    if (missing.length) {
      add("info", "missing-sections", `Sections not present: ${missing.join(", ")}.`, { missing });
    }
  }

  // --- tokens ---
  const colors = data.colors && typeof data.colors === "object" ? data.colors : {};
  const colorNames = Object.keys(colors);

  if (colorNames.length && !("primary" in colors)) {
    add("warning", "missing-primary", "Colors are defined but there is no `primary` color token.");
  }

  if (colorNames.length && !data.typography) {
    add("warning", "missing-typography", "Colors are defined but no typography tokens exist.");
  }

  // broken references
  const allText = [body, JSON.stringify(data)].join("\n");
  for (const ref of new Set(collectRefs(allText))) {
    if (resolveRef(ref, data) === undefined) {
      add("error", "broken-ref", `Token reference {${ref}} does not resolve.`, { ref });
    }
  }

  const components = data.components && typeof data.components === "object" ? data.components : {};
  // contrast on component pairs
  // Translucent backgrounds must be composited over the system's own canvas,
  // otherwise every rgba() surface reads as failing against white.
  const canvas = parseColor(resolveSurfaces(colors, components).canvas) || [255, 255, 255, 1];
  for (const [comp, props] of Object.entries(components)) {
    if (!props || typeof props !== "object") continue;
    const bgRaw = props.backgroundColor;
    const fgRaw = props.textColor;
    const bg = typeof bgRaw === "string" ? parseColor(bgRaw.startsWith("{") ? resolveRef(bgRaw, data) : bgRaw) : null;
    const fg = typeof fgRaw === "string" ? parseColor(fgRaw.startsWith("{") ? resolveRef(fgRaw, data) : fgRaw) : null;
    if (!bg || !fg) continue;
    const bgFlat = flatten(bg, canvas);
    const ratio = contrastRatio(flatten(fg, bgFlat), bgFlat);
    if (ratio < 4.5) {
      add(
        "warning",
        "contrast-ratio",
        `Component "${comp}" has ${ratio.toFixed(2)}:1 text contrast (WCAG AA needs 4.5:1).`,
        { component: comp, ratio: Number(ratio.toFixed(2)) }
      );
    }
  }

  // orphaned color tokens
  if (colorNames.length && Object.keys(components).length) {
    const referenced = new Set();
    for (const ref of collectRefs(allText)) {
      if (ref.startsWith("colors.")) referenced.add(ref.slice(7));
    }
    for (const [comp, props] of Object.entries(components)) {
      if (!props || typeof props !== "object") continue;
      for (const v of Object.values(props)) {
        if (typeof v === "string" && v.startsWith("colors.")) referenced.add(v.slice(7));
      }
    }
    const orphans = colorNames.filter((c) => !referenced.has(c));
    if (orphans.length) {
      add("info", "orphaned-tokens", `${orphans.length} color token(s) not referenced by any component.`, {
        tokens: orphans,
      });
    }
  }

  add("info", "token-summary", summarize(data), { counts: countTokens(data) });

  const counts = { errors: 0, warnings: 0, info: 0 };
  for (const f of findings) {
    if (f.severity === "error") counts.errors++;
    else if (f.severity === "warning") counts.warnings++;
    else counts.info++;
  }

  return {
    name,
    ok: counts.errors === 0,
    verified: counts.errors === 0 && counts.warnings === 0 && hasTokens,
    counts,
    findings,
    designSystem: { data, sections: sections.map((s) => ({ heading: s.heading, key: s.key })) },
  };
}

function countTokens(data) {
  return {
    colors: Object.keys(data.colors || {}).length,
    typography: Object.keys(data.typography || {}).length,
    rounded: Object.keys(data.rounded || {}).length,
    spacing: Object.keys(data.spacing || {}).length,
    components: Object.keys(data.components || {}).length,
  };
}

function summarize(data) {
  const c = countTokens(data);
  const parts = Object.entries(c)
    .filter(([, n]) => n > 0)
    .map(([k, n]) => `${n} ${k}`);
  return parts.length ? `Tokens: ${parts.join(", ")}.` : "No tokens defined.";
}

function suggestKey(key) {
  const candidates = [...ALLOWED_TOP_KEYS];
  let best = null;
  let bestScore = Infinity;
  for (const c of candidates) {
    const d = levenshtein(key.toLowerCase(), c);
    if (d < bestScore && d <= 2) {
      bestScore = d;
      best = c;
    }
  }
  return best;
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[m][n];
}
