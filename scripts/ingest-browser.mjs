// Read a design system from a live page using a real browser.
//
// For CSS-in-JS and single-page sites, the palette never appears in a
// stylesheet as a literal — it is computed at runtime and applied to elements.
// Static reading cannot see it. A browser can: this loads the page, reads CSS
// custom properties from the document root/body, captures loaded CSS responses,
// serialises accessible CSSOM rules, and samples computed styles from real elements.
//
// Provenance is "observed" with the URL and date. If a page blocks automation
// the failure is recorded, not worked around.
//
// Usage:
//   node scripts/ingest-browser.mjs https://www.bbc.co.uk/gel --slug bbc-gel --org BBC --name "BBC GEL"

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { collectTokens, selectColors, buildSystem, writeSystem, recordFailure, formatTitle, prettify, isColor, cleanFontFamily, cleanFontSize } from "../lib/ingest.mjs";
import { parseColor, toHex } from "../lib/color.mjs";
import { detectIconsFromHtml, inspectSvgSnippets } from "../lib/icons.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

// Playwright lives in a scratch install rather than this zero-dependency repo.
const PW = path.join(os.homedir(), "pwscratch", "node_modules", "playwright", "index.mjs");
if (!fs.existsSync(PW)) {
  console.error(`playwright not found at ${PW}`);
  process.exit(4);
}
const { chromium } = await import(pathToFileURL(PW).href);

const arg = (f, d) => {
  const i = process.argv.indexOf(`--${f}`);
  return i === -1 ? d : process.argv[i + 1];
};

const FONT_HOST_RE = /fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net/i;
const CHALLENGE_TITLE_RE = /^(just a moment|attention required|access denied|security check|one more step|ddos-guard)/i;

function normComputedColor(raw) {
  if (!raw || raw === "transparent" || raw === "rgba(0, 0, 0, 0)") return null;
  const c = parseColor(raw);
  if (!c || c[3] === 0) return null;
  return c[3] >= 0.99 ? toHex(c) : raw.trim();
}

function sampleCssColors(cssText, out) {
  // Fallback for sites that ship compiled rules (no `--var` custom properties).
  const re = /\b(background-color|background|color|border-color|border-top-color|fill|stroke)\s*:\s*([^;{}!]+)/gi;
  const valRe = /(#[0-9a-f]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\))/i;
  let m;
  const seenHex = new Set(Object.values(out).map((v) => v.toLowerCase()));
  while ((m = re.exec(cssText))) {
    const cm = valRe.exec(m[2]);
    if (!cm) continue;
    const val = cm[1].trim();
    if (!isColor(val)) continue;
    const c = parseColor(val);
    if (!c || c[3] === 0) continue;
    const hex = c[3] >= 0.99 ? toHex(c) : val;
    if (seenHex.has(hex.toLowerCase())) continue;
    seenHex.add(hex.toLowerCase());
    const prop = m[1].toLowerCase().replace("background-color", "surface").replace("background", "surface").replace("-color", "");
    const key = prettify(`css-${prop}-${seenHex.size}`);
    if (key && !out[key]) out[key] = hex;
    if (Object.keys(out).length >= 90) break;
  }
}

async function main() {
  const url = process.argv[2];
  if (!url || url.startsWith("--")) {
    console.error("Usage: node scripts/ingest-browser.mjs <url> --slug <slug> --org <org> --name <name>");
    process.exit(1);
  }

  const slug = arg("slug", new URL(url).hostname.replace(/^www\./, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase());
  const org = arg("org", "");
  const name = arg("name", slug);

  const browser = await chromium.launch();
  let data;
  const cssSheets = [];
  let status = null;
  let finalUrl = url;

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.on("response", async (resp) => {
      try {
        if (resp.status() !== 200) return;
        const rUrl = resp.url();
        if (FONT_HOST_RE.test(rUrl)) return;
        const ct = (resp.headers()["content-type"] || "").toLowerCase();
        if (ct.includes("text/css") || /\.css(\?|#|$)/i.test(rUrl)) {
          const body = await resp.text();
          if (body && body.length >= 60 && cssSheets.length < 16) {
            cssSheets.push(body.slice(0, 2_000_000));
          }
        }
      } catch {
        /* response body may be unavailable on redirects/aborted loads */
      }
    });

    const resp = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    status = resp ? resp.status() : null;
    await page.waitForLoadState("networkidle", { timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(1500);
    finalUrl = page.url();

    data = await page.evaluate(() => {
      const vars = {};
      for (const el of [document.documentElement, document.body].filter(Boolean)) {
        const st = getComputedStyle(el);
        for (const prop of st) {
          if (prop.startsWith("--") && !(prop in vars)) {
            const v = st.getPropertyValue(prop).trim();
            if (v) vars[prop] = v;
          }
        }
      }

      const chunks = [];
      for (const sheet of document.styleSheets) {
        if (sheet.href && /fonts\.googleapis\.com|fonts\.gstatic\.net|use\.typekit\.net/i.test(sheet.href)) continue;
        try {
          for (const rule of sheet.cssRules || []) {
            chunks.push(rule.cssText.slice(0, 5000));
            if (chunks.length >= 1200) break;
          }
        } catch {
          /* cross-origin sheets cannot expose cssRules; captured via response listener */
        }
        if (chunks.length >= 1200) break;
      }

      const selectors = [
        ["canvas", "body"],
        ["header", "header, [role=banner]"],
        ["nav", "nav, [class*=nav]"],
        ["main", "main, section, article"],
        ["footer", "footer"],
        ["h1", "h1"],
        ["h2", "h2"],
        ["h3", "h3"],
        ["body", "p"],
        ["link", "a"],
        ["button", "button, [role=button], [class*=button], [class*=btn]"],
        ["input", "input:not([type=checkbox]):not([type=radio]), textarea"],
        ["select", "select, [role=combobox]"],
        ["checkbox", "input[type=checkbox], [role=checkbox], [class*=checkbox]"],
        ["switch", "[role=switch], [class*=toggle], [class*=switch]"],
        ["tabs", "[role=tablist], [role=tab], [class*=tab]"],
        ["table", "table, [class*=table]"],
        ["tooltip", "[role=tooltip], [class*=tooltip]"],
        ["card", "[class*=card]"],
        ["badge", "[class*=badge], [class*=tag], [class*=chip], [class*=pill]"],
        ["alert", "[class*=alert], [class*=notice], [class*=banner]"],
      ];

      const els = [];
      const typeSamples = [];
      for (const [role, sel] of selectors) {
        for (const el of [...document.querySelectorAll(sel)].slice(0, 25)) {
          const s = getComputedStyle(el);
          if (s.display === "none" || s.visibility === "hidden") continue;
          const cls = (typeof el.className === "string" ? el.className : el.tagName).trim().slice(0, 60) || el.tagName;
          els.push({
            role,
            cls,
            bg: s.backgroundColor,
            fg: s.color,
            borderColor: s.borderTopWidth !== "0px" ? s.borderTopColor : "",
            radius: s.borderRadius,
            padding: s.padding,
            border: s.borderTopWidth !== "0px" && s.borderTopStyle !== "none" ? `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}` : "",
            shadow: s.boxShadow === "none" ? "" : s.boxShadow,
            fontSize: s.fontSize,
            fontFamily: s.fontFamily,
            fontWeight: s.fontWeight,
            lineHeight: s.lineHeight,
          });
          if (["h1", "h2", "h3", "body", "button", "nav", "header"].includes(role) && typeSamples.length < 24) {
            typeSamples.push({
              role,
              fontFamily: s.fontFamily,
              fontSize: s.fontSize,
              fontWeight: s.fontWeight,
              lineHeight: s.lineHeight,
            });
          }
        }
      }

      const svgs = [...document.querySelectorAll("svg[viewBox]")].slice(0, 24).map((el) => el.outerHTML);

      return {
        vars,
        rules: chunks.join("\n"),
        els,
        typeSamples,
        svgs,
        htmlClassHint: document.documentElement.outerHTML.slice(0, 24000),
        title: document.title || "",
        text: document.body ? document.body.innerText.slice(0, 1500) : "",
      };
    });
  } catch (err) {
    await browser.close();
    const why = `browser could not read the page: ${err.message.split("\n")[0]}`;
    console.error(why);
    recordFailure(ROOT, { slug, name, org, source: url, reason: why, kind: "browser" });
    process.exit(1);
  }
  await browser.close();

  if (
    (status !== null && status >= 400) ||
    CHALLENGE_TITLE_RE.test(data.title.trim()) ||
    /__cf_chl_rt_tk=/i.test(finalUrl)
  ) {
    const why = status >= 400
      ? `HTTP ${status} — site blocked automated access (${data.title.trim() || "no content"})`
      : `bot challenge page encountered (${data.title.trim()})`;
    console.error(why);
    recordFailure(ROOT, { slug, name, org, source: url, reason: why, kind: "browser" });
    process.exit(1);
  }

  const work = path.join(os.tmpdir(), "sourcebook-browser", slug);
  fs.rmSync(work, { recursive: true, force: true });
  fs.mkdirSync(work, { recursive: true });

  // Keep custom properties separate from serialized rules so huge stylesheets do
  // not push vars.css over collectTokens' 900 KB CSS file cap.
  const varLines = Object.entries(data.vars)
    .map(([k, v]) => `${k}: ${v};`)
    .join("\n");
  if (varLines) fs.writeFileSync(path.join(work, "vars.css"), `:root{\n${varLines}\n}\n`, "utf8");
  if (data.rules) fs.writeFileSync(path.join(work, "rules.css"), `${data.rules}\n`, "utf8");
  for (const [i, css] of cssSheets.entries()) {
    fs.writeFileSync(path.join(work, `net-${i}.css`), css, "utf8");
  }

  let { colors, types, components, harvested, usedFiles } = collectTokens(work);

  // If custom properties were absent or sparse (< 12 colors), collect real
  // non-transparent colors from rendered elements and loaded stylesheet rules.
  if (Object.keys(colors).length < 12) {
    const seen = new Set(Object.values(colors).map((v) => v.toLowerCase()));
    let idx = 0;
    for (const e of data.els) {
      for (const [slot, raw] of [["bg", e.bg], ["text", e.fg], ["border", e.borderColor]]) {
        const val = normComputedColor(raw);
        if (!val || seen.has(val.toLowerCase())) continue;
        seen.add(val.toLowerCase());
        const base = e.role === "canvas" && slot === "bg" ? "bg-canvas" : `${e.role}-${slot}`;
        let k = prettify(base);
        while (!k || colors[k]) k = prettify(`${base}-${++idx}`);
        colors[k] = val;
      }
    }
    if (Object.keys(colors).length < 12) {
      for (const css of [data.rules, ...cssSheets]) {
        if (css) sampleCssColors(css, colors);
      }
    }
    colors = selectColors(colors);
    harvested = Math.max(harvested, Object.keys(colors).length);
  }

  if (!Object.keys(types).length) {
    for (const ts of data.typeSamples) {
      if (types[ts.role]) continue;
      const cs = cleanFontSize(ts.fontSize);
      const cf = cleanFontFamily(ts.fontFamily);
      if (!cs && !cf) continue;
      const t = {};
      if (cf) t.fontFamily = cf;
      if (cs) t.fontSize = cs;
      const fw = Number(ts.fontWeight);
      if (Number.isFinite(fw) && fw > 0) t.fontWeight = fw;
      const lhPx = parseFloat(ts.lineHeight);
      const fsPx = parseFloat(cs || "");
      if (Number.isFinite(lhPx) && Number.isFinite(fsPx) && fsPx > 0) {
        t.lineHeight = Number((lhPx / fsPx).toFixed(2));
      }
      types[ts.role] = t;
    }
  }

  // Supplement components from rendered interactive/surface elements if CSSOM
  // component rules returned none.
  if (!Object.keys(components).length) {
    const seenComp = new Set();
    const keepRoles = new Set(["button", "input", "select", "checkbox", "switch", "tabs", "table", "tooltip", "badge", "card", "alert"]);
    for (const e of data.els) {
      if (!keepRoles.has(e.role)) continue;
      const bg = normComputedColor(e.bg);
      const fg = normComputedColor(e.fg);
      if (!bg && !fg) continue;
      const sig = `${e.role}|${bg || ""}|${fg || ""}|${e.radius}`;
      if (seenComp.has(sig)) continue;
      seenComp.add(sig);
      const n = [...seenComp].filter((s) => s.startsWith(`${e.role}|`)).length;
      if (n > 3) continue;
      const key = n === 1 ? e.role : `${e.role}-${n}`;
      const comp = { key, kind: e.role };
      if (bg) comp.backgroundColor = bg;
      if (fg) comp.textColor = fg;
      if (e.radius && e.radius !== "0px") comp.rounded = e.radius;
      if (e.padding && e.padding !== "0px") comp.padding = e.padding;
      if (e.border) comp.border = e.border;
      if (e.shadow) comp.shadow = e.shadow;
      components[key] = comp;
    }
  }

  const domIcons = inspectSvgSnippets(data.svgs || []);
  const hintIcons = detectIconsFromHtml(data.htmlClassHint || "");
  const icons = hintIcons
    ? { ...hintIcons, ...(domIcons?.samples?.length ? { samples: domIcons.samples } : {}) }
    : domIcons
    ? { library: "Inline System SVGs", package: null, ...domIcons, source: "observed" }
    : null;

  if (!Object.keys(colors).length) {
    const why = `no colour values in computed styles (${Object.keys(data.vars).length} custom properties, ${data.els.length} elements)`;
    console.error(why);
    recordFailure(ROOT, { slug, name, org, source: url, reason: why, kind: "browser" });
    process.exit(2);
  }

  const built = buildSystem({
    slug,
    name,
    org,
    note: `${formatTitle(org, name)} — read from the rendered page in a browser, not from published tokens.`,
    colors,
    types,
    components,
    icons,
    license: "all rights reserved",
    homepage: url,
    provenance: "observed",
    sourceNote: `Computed styles read from ${url} in headless Chromium on ${new Date().toISOString().slice(0, 10)} (${Object.keys(data.vars).length} custom properties, ${data.els.length} sampled elements, ${cssSheets.length} captured CSS sheets). A rendered snapshot is not a published token package — values can change without notice. Page title: ${data.title.slice(0, 80)}.`,
  });

  if (built.preview.palette.length < 12) {
    const why = `only ${built.preview.palette.length} colour tokens from the rendered page — below the 12 needed`;
    console.error(why);
    recordFailure(ROOT, { slug, name, org, source: url, reason: why, kind: "browser" });
    process.exit(3);
  }

  writeSystem(ROOT, slug, built);
  console.log(
    `${slug.padEnd(14)} ${String(harvested).padStart(4)}\u2192${String(built.preview.palette.length).padStart(3)} colors \u00b7 ${String(built.preview.type.length).padStart(2)} type \u00b7 ${String(Object.keys(components).length).padStart(2)} comp \u00b7 ${Object.keys(data.vars).length} vars \u00b7 ${data.els.length} els`
  );
}

main();
