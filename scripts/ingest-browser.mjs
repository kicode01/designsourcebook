// Read a design system from a live page using a real browser.
//
// For CSS-in-JS and single-page sites, the palette never appears in a
// stylesheet as a literal — it is computed at runtime and applied to elements.
// Static reading cannot see it. A browser can: this loads the page, reads CSS
// custom properties from the document root, serialises the CSSOM, and samples
// computed styles from real elements.
//
// Provenance is "observed" with the URL and date. If a page blocks automation
// the failure is recorded, not worked around.
//
// Usage:
//   node scripts/ingest-browser.mjs https://www.bbc.co.uk/gel --slug bbc-gel --org BBC --name "BBC GEL"

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { collectTokens, buildSystem, writeSystem, recordFailure } from "../lib/ingest.mjs";

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
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2500);

    data = await page.evaluate(() => {
      const vars = {};
      const rootStyle = getComputedStyle(document.documentElement);
      for (const prop of rootStyle) {
        if (prop.startsWith("--")) vars[prop] = rootStyle.getPropertyValue(prop).trim();
      }

      let rules = "";
      try {
        const chunks = [];
        for (const sheet of document.styleSheets) {
          for (const rule of sheet.cssRules || []) chunks.push(rule.cssText.slice(0, 5000));
          if (chunks.length > 600) break;
        }
        rules = chunks.join("\n");
      } catch {
        /* cross-origin sheets may be inaccessible */
      }

      const selectors = [
        "button", "a", "input", "select", "textarea", "[class*=button]", "[class*=btn]",
        "[class*=card]", "[class*=badge]", "[class*=tag]", "[class*=alert]", "[class*=nav]",
      ];
      const els = [];
      for (const sel of selectors) {
        for (const el of [...document.querySelectorAll(sel)].slice(0, 40)) {
          const s = getComputedStyle(el);
          els.push({
            cls: (typeof el.className === "string" ? el.className : el.tagName).slice(0, 80) || el.tagName,
            bg: s.backgroundColor,
            fg: s.color,
            radius: s.borderRadius,
            padding: s.padding,
            border: `1px solid ${s.borderTopColor}`,
            shadow: s.boxShadow === "none" ? "" : s.boxShadow,
          });
        }
        if (els.length > 400) break;
      }

      return { vars, rules, els, title: document.title, text: document.body.innerText.slice(0, 1500) };
    });
  } catch (err) {
    await browser.close();
    const why = `browser could not read the page: ${err.message.split("\n")[0]}`;
    console.error(why);
    recordFailure(ROOT, { slug, name, org, source: url, reason: why, kind: "browser" });
    process.exit(1);
  }
  await browser.close();

  const work = path.join(os.tmpdir(), "sourcebook-browser", slug);
  fs.rmSync(work, { recursive: true, force: true });
  fs.mkdirSync(work, { recursive: true });

  const varLines = Object.entries(data.vars)
    .map(([k, v]) => `${k}: ${v};`)
    .join("\n");
  fs.writeFileSync(path.join(work, "computed.css"), `:root{${varLines}}\n${data.rules}\n`, "utf8");
  fs.writeFileSync(
    path.join(work, "elements.json"),
    JSON.stringify(data.els.map((e) => ({ key: prettifyName(e.cls), kind: "button", ...e }))),
    "utf8"
  );

  const { colors, types, harvested, usedFiles } = collectTokens(work);
  if (!Object.keys(colors).length) {
    const why = `no colour values in computed styles (${Object.keys(data.vars).length} custom properties, ${data.els.length} elements)`;
    console.error(why);
    recordFailure(ROOT, { slug, name, org, source: url, reason: why, kind: "browser" });
    process.exit(2);
  }

  const host = new URL(url).hostname;
  const built = buildSystem({
    slug,
    name,
    org,
    note: `${org ? org + " " : ""}${name} — read from the rendered page in a browser, not from published tokens.`,
    colors,
    types,
    license: "all rights reserved",
    homepage: url,
    provenance: "observed",
    sourceNote: `Computed styles read from ${url} in headless Chromium on ${new Date().toISOString().slice(0, 10)} (${Object.keys(data.vars).length} custom properties, ${data.els.length} sampled elements, ${usedFiles} files). A rendered snapshot is not a published token package — values can change without notice. Page title: ${data.title.slice(0, 80)}.`,
  });

  if (built.preview.palette.length < 12) {
    const why = `only ${built.preview.palette.length} colour tokens from the rendered page — below the 12 needed`;
    console.error(why);
    recordFailure(ROOT, { slug, name, org, source: url, reason: why, kind: "browser" });
    process.exit(3);
  }

  writeSystem(ROOT, slug, built);
  console.log(
    `${slug.padEnd(14)} ${String(harvested).padStart(4)}\u2192${String(built.preview.palette.length).padStart(3)} colors \u00b7 ${String(built.preview.type.length).padStart(2)} type \u00b7 ${Object.keys(data.vars).length} vars \u00b7 ${data.els.length} els`
  );
}

function prettifyName(s) {
  return String(s)
    .split(/\s+/)[0]
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase()
    .slice(0, 40) || "element";
}

main();
