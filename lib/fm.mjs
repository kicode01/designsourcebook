// Minimal YAML front-matter parser / emitter.
// Covers the subset the DESIGN.md spec uses: nested maps, scalars, inline arrays.
// No dependencies, no anchors, no multi-document.

export function splitFrontMatter(text) {
  const src = text.replace(/^\uFEFF/, "");
  const m = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(src);
  if (!m) return { data: {}, raw: "", body: src };
  return { data: parseYaml(m[1]), raw: m[1], body: src.slice(m[0].length) };
}

export function parseYaml(src) {
  const root = {};
  const stack = [{ indent: -1, obj: root }];
  const lines = src.split(/\r?\n/);

  for (const rawLine of lines) {
    if (!rawLine.trim()) continue;
    const trimmed = rawLine.trim();
    if (trimmed.startsWith("#")) continue;

    const indent = rawLine.length - rawLine.trimStart().length;
    const colon = trimmed.indexOf(":");
    if (colon === -1) continue;

    const key = trimmed.slice(0, colon).trim();
    const rest = trimmed.slice(colon + 1).trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
    const parent = stack[stack.length - 1].obj;

    if (rest === "" || rest.startsWith("#")) {
      const child = {};
      parent[key] = child;
      stack.push({ indent, obj: child });
    } else {
      parent[key] = parseScalar(stripComment(rest));
    }
  }
  return root;
}

function stripComment(v) {
  if (v.startsWith('"') || v.startsWith("'")) return v;
  const i = v.indexOf(" #");
  return i === -1 ? v : v.slice(0, i).trim();
}

function parseScalar(v) {
  const s = v.trim();
  if (s === "") return null;
  if (s.length > 1 && s.startsWith('"') && s.endsWith('"')) return unescapeDouble(s.slice(1, -1));
  if (s.length > 1 && s.startsWith("'") && s.endsWith("'")) return s.slice(1, -1).replace(/''/g, "'");
  if (s === "true") return true;
  if (s === "false") return false;
  if (s === "null" || s === "~") return null;
  if (s.startsWith("[") && s.endsWith("]")) {
    const inner = s.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(",").map((x) => parseScalar(x)).filter((x) => x !== null && x !== "");
  }
  if (/^-?\d+$/.test(s)) return Number(s);
  if (/^-?\d*\.\d+$/.test(s)) return Number(s);
  return s;
}

function unescapeDouble(s) {
  return s.replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\\\/g, "\\");
}

const PLAIN_SAFE = /^[A-Za-z0-9_][A-Za-z0-9_.\-\/ ]*$/;

function emitScalar(v) {
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (v === null || v === undefined) return "null";
  const s = String(v);
  const looksNumeric = /^-?\d+(\.\d+)?$/.test(s);
  const looksBool = /^(true|false|null|~)$/i.test(s);
  if (s !== "" && PLAIN_SAFE.test(s) && !looksNumeric && !looksBool && !s.endsWith(" ")) return s;
  return '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
}

export function emitYaml(obj, indent = 0) {
  const pad = " ".repeat(indent);
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined) {
      out.push(`${pad}${k}: null`);
    } else if (Array.isArray(v)) {
      out.push(`${pad}${k}: [${v.map((x) => emitScalar(x)).join(", ")}]`);
    } else if (typeof v === "object") {
      out.push(`${pad}${k}:`);
      out.push(emitYaml(v, indent + 2));
    } else {
      out.push(`${pad}${k}: ${emitScalar(v)}`);
    }
  }
  return out.join("\n");
}

export function buildFrontMatter(obj) {
  return `---\n${emitYaml(obj)}\n---\n`;
}
