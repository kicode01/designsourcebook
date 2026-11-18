// Import non-overlapping design systems from VoltAgent/awesome-design-md.
// Preserves full real tokens and prose from upstream DESIGN.md files, fixes
// malformed prose token references, and builds tokens.json / preview.json / manifest.json.

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { splitFrontMatter, buildFrontMatter } from "../lib/fm.mjs";
import { parseColor, relativeLuminance } from "../lib/color.mjs";
import { buildPreview, themeOfCanvas, truncate } from "../lib/preview.mjs";
import { lint } from "../lib/lint.mjs";
import { pickPrimary, writeSystem } from "../lib/ingest.mjs";
import { normKey, normOrg } from "../lib/registry.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO_URL = "https://github.com/VoltAgent/awesome-design-md.git";
const TMP_DIR = path.join(os.tmpdir(), "awesome-design-md");

const HOMEPAGES = {
  aljazeera: "https://www.aljazeera.com",
  binance: "https://www.binance.com",
  "bmw-m": "https://www.bmw-m.com",
  bugatti: "https://www.bugatti.com",
  "dell-1996": "https://www.dell.com",
  dji: "https://www.dji.com",
  ferrari: "https://www.ferrari.com",
  hp: "https://www.hp.com",
  jobright: "https://jobright.ai",
  lamborghini: "https://www.lamborghini.com",
  mastercard: "https://www.mastercard.com",
  mercury: "https://mercury.com",
  mydealz: "https://www.mydealz.de",
  nerdwallet: "https://www.nerdwallet.com",
  nike: "https://www.nike.com",
  "nintendo-2001": "https://www.nintendo.com",
  oura: "https://ouraring.com",
  playstation: "https://www.playstation.com",
  renault: "https://www.renault.com",
  slack: "https://slack.com",
  starbucks: "https://www.starbucks.com",
  tesla: "https://www.tesla.com",
  theverge: "https://www.theverge.com",
  vodafone: "https://www.vodafone.com",
  wired: "https://www.wired.com",
};

function ensureRepo(refresh) {
  if (refresh && fs.existsSync(TMP_DIR)) {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }
  if (!fs.existsSync(path.join(TMP_DIR, "design-md"))) {
    execSync(`git clone --depth 1 ${REPO_URL} "${TMP_DIR}"`, { stdio: "inherit" });
  }
  return TMP_DIR;
}

function parseReadmeMeta(readmePath) {
  const out = {};
  if (!fs.existsSync(readmePath)) return out;
  let section = "General";
  for (const line of fs.readFileSync(readmePath, "utf8").split(/\r?\n/)) {
    const h = /^#{2,3}\s+(.+)/.exec(line);
    if (h) section = h[1].trim();
    const m = /^-\s+\[\*\*([^\]]+)\*\*\]\((https?:\/\/[^)]+)\)\s*-\s*(.+)$/.exec(line.trim());
    if (!m) continue;
    const [, displayName, url, summary] = m;
    const slugMatch = /getdesign\.md\/([a-z0-9._-]+)\//i.exec(url);
    if (!slugMatch) continue;
    out[slugMatch[1].toLowerCase()] = {
      displayName: displayName.trim(),
      category: section,
      summary: summary.trim(),
      url,
    };
  }
  return out;
}

function existingIndex() {
  const keys = new Set();
  const orgs = new Set();
  const sysDir = path.join(ROOT, "systems");
  if (!fs.existsSync(sysDir)) return { keys, orgs };
  for (const slug of fs.readdirSync(sysDir)) {
    const mPath = path.join(sysDir, slug, "manifest.json");
    if (!fs.existsSync(mPath)) continue;
    try {
      const m = JSON.parse(fs.readFileSync(mPath, "utf8"));
      if (m.provenance === "listed") continue;
      keys.add(normKey(slug));
      if (m.org) orgs.add(normOrg(m.org));
      if (m.displayName) orgs.add(normOrg(m.displayName));
    } catch {
      /* ignore corrupt manifest */
    }
  }
  return { keys, orgs };
}

function cleanDisplayName(rawName, meta, slug) {
  if (meta?.displayName) return meta.displayName;
  const s = String(rawName || slug)
    .replace(/-design-analysis$/i, "")
    .replace(/\s+Design\s+System$/i, "")
    .replace(/\s+Analysis$/i, "")
    .replace(/\s*\(Y2K Vintage\)$/i, "")
    .trim();
  return s || slug;
}

function slugKey(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function extractSection(body, re) {
  const lines = String(body || "").split(/\r?\n/);
  const headingRe = new RegExp(`^##\\s+(?:${re.source})\\b`, "i");
  const out = [];
  let inSec = false;
  for (const line of lines) {
    if (/^##\s+/.test(line)) {
      if (inSec) break;
      if (headingRe.test(line)) {
        inSec = true;
        continue;
      }
    } else if (inSec) {
      out.push(line);
    }
  }
  return out.join("\n").trim();
}

function normalizeProseHeading(body) {
  const map = [
    [/^##\s+1\.\s+Visual Theme[^\n]*/im, "## Overview"],
    [/^##\s+2\.\s+Color Palette[^\n]*/im, "## Colors"],
    [/^##\s+3\.\s+Typography[^\n]*/im, "## Typography"],
    [/^##\s+4\.\s+Component[^\n]*/im, "## Components"],
    [/^##\s+5\.\s+Layout[^\n]*/im, "## Layout & Spacing"],
    [/^##\s+6\.\s+Depth[^\n]*/im, "## Elevation"],
    [/^##\s+7\.\s+Do'?s and Don'?ts[^\n]*/im, "## Do's and Don'ts"],
    [/^##\s+8\.\s+Responsive[^\n]*/im, "## Responsive Behavior"],
    [/^##\s+9\.\s+Agent Prompt[^\n]*/im, "## Implementation Guide"],
  ];
  let out = body;
  for (const [pat, rep] of map) out = out.replace(pat, rep);
  return out;
}

function parseProseMarkdown(rawMd, slug, meta) {
  const titleM = /^#\s+(.+)/m.exec(rawMd);
  const rawTitle = titleM ? titleM[1].replace(/^Design System Inspired by\s+/i, "").trim() : slug;
  const displayName = cleanDisplayName(rawTitle, meta, slug);

  // Extract real colors from bullet lines: - **Name** (`#HEX` or `rgba(...)`)
  const colors = {};
  const seenVal = new Map();
  const colorSec = extractSection(rawMd, /(?:2\.\s*)?Color Palette/);
  for (const line of colorSec.split(/\r?\n/)) {
    const m = /^[-*]\s+\*\*([^*]+)\*\*\s*\(`([^`]+)`\)/.exec(line.trim());
    if (!m) continue;
    const rawVal = m[2].trim();
    if (!parseColor(rawVal)) continue;
    const k = slugKey(m[1]);
    if (!k || seenVal.has(rawVal.toLowerCase()) && colors[k]) continue;
    if (!colors[k]) colors[k] = rawVal.startsWith("#") ? rawVal.toLowerCase() : rawVal;
    seenVal.set(rawVal.toLowerCase(), k);
  }
  // Fall back to scanning backticked color literals in Color Palette if bullet match sparse
  if (Object.keys(colors).length < 4) {
    let idx = 1;
    for (const m of colorSec.matchAll(/\*\*([^*]+)\*\*[^`\n]*`(#[0-9a-fA-F]{3,8}|rgba?\([^`]+\))`/g)) {
      const k = slugKey(m[1]) || `color-${idx++}`;
      if (!colors[k] && parseColor(m[2])) colors[k] = m[2].startsWith("#") ? m[2].toLowerCase() : m[2];
    }
  }
  if (Object.keys(colors).length && !colors.primary) {
    const primary = pickPrimary(colors);
    if (primary) colors.primary = primary[1];
  }

  // Extract primary sans / mono font family from Section 3
  const typeSec = extractSection(rawMd, /(?:3\.\s*)?Typography/);
  let defaultFamily = "sans-serif";
  const famM = /\*\*(?:Primary|Display(?:\s*&\s*UI)?|Font[^*]*):?\*\*:?\s*`([^`]+)`/i.exec(typeSec);
  if (famM) defaultFamily = famM[1].trim();

  // Extract typography table rows (supports 6-col Role|Size|... and 7-col Role|Font|Size|...)
  const typography = {};
  let colIdx = { role: 0, font: -1, size: 1, weight: 2, line: 3, tracking: 4 };
  for (const line of typeSec.split(/\r?\n/)) {
    if (!line.trim().startsWith("|") || /^[\s|:-]+$/.test(line)) continue;
    const cells = line.split("|").map((c) => c.trim()).slice(1, -1);
    if (cells.length < 4) continue;
    if (/^(role|token|name|style)$/i.test(cells[0])) {
      colIdx = {
        role: 0,
        font: cells.findIndex((c) => /^font$/i.test(c)),
        size: cells.findIndex((c) => /size/i.test(c)),
        weight: cells.findIndex((c) => /weight/i.test(c)),
        line: cells.findIndex((c) => /line/i.test(c)),
        tracking: cells.findIndex((c) => /track|spac/i.test(c)),
      };
      if (colIdx.size === -1) colIdx.size = 1;
      continue;
    }
    const role = slugKey(cells[colIdx.role]);
    if (!role || typography[role]) continue;
    const sizeMatch = /(\d+(?:\.\d+)?(?:px|rem|em))/i.exec(cells[colIdx.size] || "");
    if (!sizeMatch) continue;
    const wtMatch = colIdx.weight >= 0 ? /(\d{3})/.exec(cells[colIdx.weight] || "") : null;
    const lhMatch = colIdx.line >= 0 ? /(\d+(?:\.\d+)?)/.exec(cells[colIdx.line] || "") : null;
    const lsMatch = colIdx.tracking >= 0 ? /(-?\d+(?:\.\d+)?(?:px|em|rem|%))/.exec(cells[colIdx.tracking] || "") : null;
    const rowFont = colIdx.font >= 0 && cells[colIdx.font] && cells[colIdx.font] !== "—" ? cells[colIdx.font].trim() : defaultFamily;
    const tok = { fontFamily: rowFont || defaultFamily, fontSize: sizeMatch[1] };
    if (wtMatch) tok.fontWeight = Number(wtMatch[1]);
    if (lhMatch) tok.lineHeight = Number(lhMatch[1]);
    if (lsMatch) tok.letterSpacing = lsMatch[1];
    typography[role] = tok;
  }

  // Extract real component stylings from Section 4
  const compSec = extractSection(rawMd, /(?:4\.\s*)?Component/);
  const components = {};
  let current = null;
  for (const line of compSec.split(/\r?\n/)) {
    const head = /^\*\*([^*]+)\*\*/.exec(line.trim());
    if (head) {
      const cname = slugKey(head[1]);
      if (cname && !components[cname]) {
        current = cname;
        components[current] = { key: cname };
      } else {
        current = null;
      }
      continue;
    }
    if (!current || !/^[-*]\s+/.test(line.trim())) continue;
    if (/hover|focus|disabled|active/i.test(line.split(":")[0] || "")) continue;
    const bgM = /\bbg\s+`?([^`,\s)]+)`?/i.exec(line);
    const txtM = /\btext\s+`?([^`,\s)]+)`?/i.exec(line);
    const radM = /\b(?:borderRadius|radius)\s+`?([^`,\s)]+)`?/i.exec(line);
    const padM = /\bpadding\s+`?(\d+(?:\.\d+)?px(?:\s+\d+(?:\.\d+)?px)*)`?/i.exec(line);
    if (bgM && (parseColor(bgM[1]) || bgM[1] === "transparent") && !components[current].backgroundColor) {
      components[current].backgroundColor = bgM[1].toLowerCase();
    }
    if (txtM && parseColor(txtM[1]) && !components[current].textColor) {
      components[current].textColor = txtM[1].toLowerCase();
    }
    if (radM && /^\d+(?:\.\d+)?(?:px|rem|%)$/.test(radM[1]) && !components[current].rounded) {
      components[current].rounded = radM[1];
    }
    if (padM && !components[current].padding) components[current].padding = padM[1];
  }
  for (const [k, v] of Object.entries(components)) {
    if (!v.backgroundColor && !v.textColor && !v.rounded) delete components[k];
  }

  const ovSec = extractSection(rawMd, /(?:1\.\s*)?Visual Theme/);
  const firstPara = ovSec.split(/\n\n+/)[0]?.replace(/\s+/g, " ").trim() || "";
  const description = truncate(meta?.summary || firstPara, 220) || `${displayName} visual design system.`;

  const fm = { version: "alpha", name: displayName, description };
  if (Object.keys(colors).length) fm.colors = colors;
  if (Object.keys(typography).length) fm.typography = typography;
  if (Object.keys(components).length) {
    fm.components = {};
    for (const [k, v] of Object.entries(components)) {
      const { key: _k, ...rest } = v;
      fm.components[k] = rest;
    }
  }

  const cleanBody = normalizeProseHeading(rawMd);
  return { fm, body: cleanBody, metaDisplay: displayName, description };
}

function resolveTokenRef(val, fm) {
  if (typeof val !== "string") return val;
  const m = /^\{([a-z0-9_.-]+)\}$/i.exec(val.trim());
  if (!m) return val;
  const parts = m[1].split(".");
  if (parts.length === 2 && fm[parts[0]] && fm[parts[0]][parts[1]] !== undefined) {
    return fm[parts[0]][parts[1]];
  }
  return val;
}

function resolveComponentsForPreview(fm) {
  const out = {};
  for (const [k, comp] of Object.entries(fm.components || {})) {
    if (!comp || typeof comp !== "object") continue;
    const item = { key: k, kind: inferKind(k) };
    for (const [p, raw] of Object.entries(comp)) {
      let resolved = resolveTokenRef(raw, fm);
      if (typeof resolved === "string" && resolved.startsWith("{")) resolved = resolveTokenRef(resolved, fm);
      item[p] = resolved;
    }
    out[k] = item;
  }
  return out;
}

function inferKind(key) {
  if (/btn|button|cta/i.test(key)) return "button";
  if (/input|field|search|textarea/i.test(key)) return "input";
  if (/badge|tag|pill|chip/i.test(key)) return "badge";
  if (/card|panel|tile|callout/i.test(key)) return "card";
  if (/nav|header|tab/i.test(key)) return "nav";
  return "component";
}

function fixProseRefs(body, fm) {
  return body.replace(/(?<!\\)\{([a-zA-Z0-9_.-]+)\}/g, (full, ref) => {
    // Keep valid dot references if target exists in front matter
    const parts = ref.split(".");
    if (parts.length === 2) {
      const [sec, key] = parts;
      if (sec === "component" && fm.components?.[key]) return `{components.${key}}`;
      if (fm[sec]?.[key] !== undefined) return full;
    }
    // Single token name matching front-matter colors/components -> convert or code-wrap
    if (fm.colors?.[ref] !== undefined) return `{colors.${ref}}`;
    if (fm.components?.[ref] !== undefined) return `{components.${ref}}`;
    return `\`${ref}\``;
  });
}

function ensureCanonicalTypography(fm) {
  if (!fm.typography || typeof fm.typography !== "object") return fm;
  for (const tok of Object.values(fm.typography)) {
    if (!tok || typeof tok !== "object") continue;
    if (tok.lineHeight !== undefined && typeof tok.lineHeight === "string" && tok.lineHeight.includes("/")) {
      const num = parseFloat(tok.lineHeight);
      if (Number.isFinite(num)) tok.lineHeight = num;
    }
  }
  return fm;
}

function processVoltSystem(voltSlug, rawMd, meta) {
  let fm;
  let body;
  let displayName;
  let description;

  if (rawMd.trimStart().startsWith("---")) {
    const split = splitFrontMatter(rawMd);
    fm = { ...split.data };
    body = split.body;
    displayName = cleanDisplayName(fm.name, meta, voltSlug);
    fm.name = displayName;
    if (!fm.description || String(fm.description).length < 12) {
      fm.description = meta?.summary || `${displayName} visual design system.`;
    }
    description = String(fm.description);
    if (!fm.version) fm.version = "alpha";
    if (fm.colors && !fm.colors.primary) {
      const p = pickPrimary(fm.colors);
      if (p) fm.colors.primary = p[1];
    }
    ensureCanonicalTypography(fm);
    body = fixProseRefs(body, fm);
  } else {
    const parsed = parseProseMarkdown(rawMd, voltSlug, meta);
    fm = parsed.fm;
    body = fixProseRefs(parsed.body, fm);
    displayName = parsed.metaDisplay;
    description = parsed.description;
  }

  const markdown = `${buildFrontMatter(fm)}\n${body.trimStart()}`;
  const report = lint(markdown, { name: voltSlug });

  const resolvedComps = resolveComponentsForPreview(fm);
  const ovSection = extractSection(body, /(?:1\.\s*)?(?:Overview|Visual Theme)/) || description;
  const dosSection = extractSection(body, /(?:7\.\s*)?Do'?s and Don'?ts/);
  const preview = buildPreview({
    colors: fm.colors || {},
    typography: fm.typography || {},
    components: resolvedComps,
    icons: fm.icons || null,
    prose: { overview: ovSection, dos: dosSection },
  });

  const theme = themeOfCanvas(preview.canvas) || (fm.colors?.canvas && parseColor(fm.colors.canvas) && relativeLuminance(parseColor(fm.colors.canvas)) < 0.18 ? "dark" : "light");
  const homepage = HOMEPAGES[voltSlug] || "";
  const cleanNote = description;
  const tagSet = new Set(
    [meta?.category, theme, "design.md", "observed"]
      .flatMap((t) => String(t || "").toLowerCase().split(/[&,/\s]+/))
      .filter((w) => w.length >= 2 && w !== "tech")
  );
  const manifest = {
    name: voltSlug,
    displayName,
    description: cleanNote,
    style: cleanNote,
    category: meta?.category || "VoltAgent DESIGN.md",
    org: displayName,
    theme,
    tags: [...tagSet].slice(0, 6),
    homepage,
    license: "see source",
    provenance: "observed",
    provenanceNote: `Extracted from VoltAgent/awesome-design-md (${voltSlug}/DESIGN.md) real public-site analysis.`,
    source: { repo: `https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/${voltSlug}` },
    spec: "design.md@alpha",
    frameworks: ["tailwind-v4", "css-vars", "dtcg"],
    tokens: {
      colors: preview.palette.length,
      typography: preview.type.length,
      components: Object.keys(fm.components || {}).length,
    },
    checks: { errors: report.counts.errors, warnings: report.counts.warnings, verified: report.verified },
    files: { design: "DESIGN.md", tokens: "tokens.json" },
  };

  return { markdown, report, preview, manifest };
}

function main() {
  const refresh = process.argv.includes("--refresh");
  const repoDir = ensureRepo(refresh);
  const metaMap = parseReadmeMeta(path.join(repoDir, "README.md"));
  const { keys: existingKeys, orgs: existingOrgs } = existingIndex();
  const designDir = path.join(repoDir, "design-md");
  const entries = fs.readdirSync(designDir).filter((d) => fs.existsSync(path.join(designDir, d, "DESIGN.md")));

  let added = 0;
  let skippedExisting = 0;
  let failedLint = 0;
  const sourceRecords = [];

  for (const slug of entries) {
    const meta = metaMap[slug.toLowerCase()] || null;
    const baseSlug = slug.replace(/\.(app|ai)$/i, "");
    const k1 = normKey(slug);
    const k2 = normKey(baseSlug);
    const o1 = normOrg(meta?.displayName || baseSlug);

    const alreadyPresent = existingKeys.has(k1) || existingKeys.has(k2) || existingOrgs.has(normOrg(baseSlug)) || existingOrgs.has(o1);
    sourceRecords.push({
      org: cleanDisplayName(null, meta, baseSlug),
      slug,
      name: meta?.displayName || slug,
      category: meta?.category || "VoltAgent DESIGN.md",
      repo: `https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/${slug}`,
      homepage: HOMEPAGES[slug] || meta?.url || "",
      desc: meta?.summary || "",
      imported: !alreadyPresent,
    });

    if (alreadyPresent) {
      skippedExisting++;
      continue;
    }

    const rawMd = fs.readFileSync(path.join(designDir, slug, "DESIGN.md"), "utf8");
    const built = processVoltSystem(slug, rawMd, meta);
    if (built.report.counts.errors > 0) {
      failedLint++;
      console.error(`LINT FAIL ${slug}: ${built.report.counts.errors} errors ->`, built.report.findings.filter((f) => f.severity === "error").slice(0, 3));
      continue;
    }

    writeSystem(ROOT, slug, built);
    added++;
    console.log(
      `${slug.padEnd(16)} ${String(built.manifest.tokens.colors).padStart(3)} colors · ${String(built.manifest.tokens.typography).padStart(2)} type · ${String(built.manifest.tokens.components).padStart(2)} comp · ${built.manifest.checks.errors}e/${built.manifest.checks.warnings}w`
    );
  }

  fs.mkdirSync(path.join(ROOT, "data/sources"), { recursive: true });
  fs.writeFileSync(
    path.join(ROOT, "data/sources/voltagent.json"),
    JSON.stringify(
      {
        source: "VoltAgent awesome-design-md",
        sourceUrl: "https://github.com/VoltAgent/awesome-design-md",
        captured: new Date().toISOString().slice(0, 10),
        count: entries.length,
        systems: sourceRecords,
      },
      null,
      2
    ) + "\n",
    "utf8"
  );
  console.log({ totalVolt: entries.length, added, skippedExisting, failedLint });
}

main();
