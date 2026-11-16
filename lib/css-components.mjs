// Recover component styling from the CSS a library actually ships.
//
// When a system publishes no component tokens, the honest option is not to
// invent padding and borders — it is to read the rules it compiles. `.govuk-button`
// has a real background, radius, padding and font-size; those are facts about the
// system, not guesses.
//
// This parses rules (including inside @media), resolves var() against the
// stylesheet's own custom properties, and emits component tokens in the same
// shape the hand-written collections use.

import { parseColor } from "./color.mjs";

const COMPONENT_WORDS =
  /(btn|button|input|tag|badge|chip|card|alert|notice|callout|label|select|textarea|checkbox|radio|toggle|switch|breadcrumb|pagination|accordion|banner|panel|table|modal|dialog|tooltip|tab|nav|link|heading|summary)/i;

const PROP_MAP = [
  [/^background(-color)?$/, "backgroundColor"],
  [/^color$/, "textColor"],
  [/^border-radius$/, "rounded"],
  [/^padding$/, "padding"],
  [/^border$/, "border"],
  [/^border-color$/, "borderColor"],
  [/^box-shadow$/, "shadow"],
  [/^font-size$/, "fontSize"],
  [/^font-weight$/, "fontWeight"],
];

const DROP_IF = /url\(|data:|gradient|calc\(|var\(/i;

// Class names differ per system; the catalog only knows a few drawing kinds.
const KIND_MAP = {
  btn: "button",
  tag: "badge",
  chip: "badge",
  pill: "badge",
  select: "input",
  textarea: "input",
  checkbox: "input",
  radio: "input",
  notice: "alert",
  callout: "alert",
  banner: "alert",
};

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function parseRules(css) {
  const rules = [];
  const walk = (text, inMedia, mediaPrelude = "") => {
    let idx = 0;
    while (idx < text.length) {
      const open = text.indexOf("{", idx);
      if (open === -1) break;
      const prelude = text.slice(idx, open).trim();
      let depth = 1;
      let j = open + 1;
      while (j < text.length && depth > 0) {
        if (text[j] === "{") depth++;
        else if (text[j] === "}") depth--;
        j++;
      }
      const body = text.slice(open + 1, j - 1);
      if (prelude.startsWith("@")) {
        if (/^@(media|supports|layer|container|document)/i.test(prelude)) {
          walk(body, true, `${mediaPrelude} ${prelude}`.trim());
        }
      } else if (prelude) {
        rules.push({ selector: prelude, body, inMedia, mediaPrelude });
      }
      idx = j;
    }
  };
  walk(css, false, "");
  return rules;
}

function parseDecls(body) {
  const out = [];
  let buf = "";
  let depth = 0;
  for (const ch of body) {
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    if (ch === ";" && depth === 0) {
      if (buf.trim()) out.push(buf.trim());
      buf = "";
    } else buf += ch;
  }
  if (buf.trim()) out.push(buf.trim());

  return out
    .map((d) => {
      const i = d.indexOf(":");
      if (i === -1) return null;
      return { prop: d.slice(0, i).trim().toLowerCase(), value: d.slice(i + 1).trim() };
    })
    .filter(Boolean);
}

// var(--x) -> value, following one level of fallback.
function resolveVars(value, vars, depth = 0) {
  if (depth > 4 || !value.includes("var(")) return value;
  return value.replace(/var\(\s*(--[a-z0-9-]+)\s*(?:,\s*([^)]*))?\)/gi, (_, name, fallback) => {
    if (vars[name]) return resolveVars(vars[name], vars, depth + 1);
    return fallback ? fallback.trim() : "";
  });
}

// `.govuk-button--secondary:hover .x` -> `govuk-button--secondary`
// Only a single compound selector counts. `.govuk-task-list .govuk-tag` is a
// contextual override, not the tag's base styling, and taking it first would
// record the wrong colour.
function classOf(selector) {
  const sel = selector.trim();
  if (/[\s>+~]/.test(sel)) return null;
  if (/[:[]/.test(sel)) return null; // skip state/attribute variants
  const m = /^\.([a-zA-Z][\w-]*)$/.exec(sel);
  return m ? m[1] : null;
}

const COMPONENT_WORD_UNIT =
  /(btn|button|input|tag|badge|chip|card|alert|notice|callout|label|select|textarea|panel|banner|summary|link|table|tab|nav)/i;

function keyOf(className) {
  // Strip single leading vendor prefix (e.g. `.govuk-button`, `.nhsuk-tag`, `.usa-button`)
  // when followed by a recognized component word so systems' own tokens keep their shape.
  const bare = className
    .replace(/^(govuk|usa|nhsuk|clr|c|pf|ds|slds|cds|t|p|uk|au|nv|mat|mdc|el|chakra|radix|gel|ontario|bbc|mc|it|o|vf)-/i, "")
    .replace(/^[a-z]{1,12}-(?=(?:btn|button|input|tag|badge|chip|card|alert|notice|callout|label|select|textarea|panel|banner|summary|link|table|tab|nav)(?:$|-|_))/i, "")
    .replace(/__.*$/, "")
    .replace(/--.*$/, "");
  return bare;
}

function variantOf(className) {
  const m = /--([\w-]+)$/.exec(className);
  return m ? m[1].replace(/-/g, " ") : null;
}

export function extractCssComponents(cssText, { max = 24 } = {}) {
  const css = stripComments(cssText);
  const rules = parseRules(css);

  // Custom properties first — component rules almost always reference them.
  // Skip dark-mode theme overrides so dark text doesn't mix onto light rules.
  const vars = {};
  for (const r of rules) {
    if (r.inMedia && /prefers-color-scheme:\s*dark/i.test(r.mediaPrelude || "")) continue;
    const hasRoot = r.selector
      .split(",")
      .some((sel) => /^(:root|html)$/i.test(sel.trim()));
    if (!hasRoot) continue;
    for (const d of parseDecls(r.body)) {
      if (d.prop.startsWith("--") && !(d.prop in vars)) vars[d.prop] = d.value;
    }
  }

  const byClass = new Map();
  for (const r of rules) {
    for (const sel of r.selector.split(",")) {
      const cls = classOf(sel.trim());
      if (!cls || !COMPONENT_WORDS.test(cls)) continue;
      const decls = parseDecls(r.body);
      const cur = byClass.get(cls) || {};
      for (const d of decls) {
        const target = PROP_MAP.find(([re]) => re.test(d.prop));
        if (!target) continue;
        const key = target[1];
        // Base rules come first in source order; keep the first real value.
        if (cur[key] !== undefined) continue;
        const raw = d.value.replace(/\s*!important\s*$/i, "").trim();
        const value = resolveVars(raw, vars).replace(/\s*!important\s*$/i, "").trim();
        if (!value || /^(inherit|initial|unset|revert)$/i.test(value) || (value === "none" && key !== "border")) continue;
        if (DROP_IF.test(value)) continue;
        if ((key === "backgroundColor" || key === "textColor" || key === "borderColor") && !parseColor(value)) continue;
        if (key === "fontSize" && !/^\.?[0-9]+(?:\.[0-9]+)?(?:px|rem|em|pt|%)$/i.test(value)) {
          const m = /^(\.?[0-9]+(?:\.[0-9]+)?(?:px|rem|em|pt|%))\b/i.exec(value);
          if (!m) continue;
          cur[key] = m[1];
          continue;
        }
        cur[key] = value;
      }
      byClass.set(cls, cur);
    }
  }

  // Prefer base classes over variants, and require something visible.
  const entries = [...byClass.entries()]
    .filter(([, v]) => (v.backgroundColor || v.textColor) && (v.backgroundColor !== "transparent" || v.textColor))
    .sort((a, b) => {
      const av = a[0].includes("--") ? 1 : 0;
      const bv = b[0].includes("--") ? 1 : 0;
      if (av !== bv) return av - bv;
      return a[0].length - b[0].length;
    });

  const out = {};
  const seenKind = new Map();
  for (const [cls, v] of entries) {
    if (Object.keys(out).length >= max) break;
    const base = keyOf(cls);
    const variant = variantOf(cls);
    const segs = base.toLowerCase().split("-");
    const rawKind = segs.find((seg) => /^(btn|button|input|tag|badge|chip|card|alert|notice|callout|label|select|textarea|panel|banner|summary|link|table|tab|nav)$/.test(seg));
    if (!rawKind) continue;

    // Normalise to the kinds the catalog knows how to draw, while keeping the
    // system's own name in the token key (`govuk-tag` stays `tag`).
    const kind = KIND_MAP[rawKind] || rawKind;

    // Cap base variants per kind so one system cannot fill the list with buttons.
    const n = seenKind.get(kind) || 0;
    if (n >= 6) continue;
    seenKind.set(kind, n + 1);

    const key = variant ? `${base}-${variant.replace(/\s+/g, "-")}` : n === 0 ? base : `${base}-${n + 1}`;
    if (out[key]) continue;

    const token = {};
    if (v.backgroundColor) token.backgroundColor = v.backgroundColor;
    if (v.textColor) token.textColor = v.textColor;
    if (v.rounded) token.rounded = v.rounded;
    if (v.padding) token.padding = v.padding;
    if (v.border) token.border = v.border;
    else if (v.borderColor) token.border = `1px solid ${v.borderColor}`;
    if (v.shadow) token.shadow = v.shadow;
    if (v.fontSize || v.fontWeight) {
      token.typography = {};
      if (v.fontSize) token.typography.fontSize = v.fontSize;
      if (v.fontWeight) token.typography.fontWeight = Number(v.fontWeight) || v.fontWeight;
    }
    token.kind = kind;
    token.key = key;
    token.selector = `.${cls}`;
    out[key] = token;
  }
  return out;
}
