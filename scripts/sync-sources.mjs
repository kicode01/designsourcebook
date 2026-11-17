// Synchronize external design-system directories & registries, discover newly
// added systems, optionally ingest them end-to-end, enrich visual language,
// rebuild index/coverage/catalog, and run lint verification.
//
// External sources polled directly (no paid keys required):
//   - alexpate/awesome-design-systems (GitHub raw Markdown)
//   - Component Gallery (https://component.gallery/design-systems/)
//   - Design Systems Repo / Gallery (https://designsystemsrepo.com/design-systems/)
//   - Design Systems Surf (https://designsystems.surf/ + searchIndex JSON)
//   - npm Registry search (keywords:design-tokens)
//   - Optional custom targets (--url, --repo, --package)
//
// Usage:
//   node scripts/sync-sources.mjs [--dry-run] [--ingest] [--limit 10]
//   node scripts/sync-sources.mjs --url https://... --slug my-ds --name "My DS"
//   node scripts/sync-sources.mjs --repo https://github.com/org/ds --slug org
//   node scripts/sync-sources.mjs --package @org/design-tokens --slug org

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { listSystems, normKey, normOrg, readDesign } from "../lib/registry.mjs";
import { lint } from "../lib/lint.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const SOURCES_DIR = path.join(ROOT, "data/sources");
const UA = "Mozilla/5.0 (compatible; designsourcebook/0.1; +https://github.com/)";

const argv = process.argv.slice(2);
const hasFlag = (f) => argv.includes(`--${f}`);
function argVal(f, fallback = undefined) {
  const i = argv.indexOf(`--${f}`);
  if (i === -1) return fallback;
  const v = argv[i + 1];
  return !v || v.startsWith("--") ? fallback : v;
}

const DRY_RUN = hasFlag("dry-run");
const CUSTOM_URL = argVal("url", "");
const CUSTOM_REPO = argVal("repo", "");
const CUSTOM_PKG = argVal("package", "");
const CUSTOM_SLUG = argVal("slug", "");
const CUSTOM_NAME = argVal("name", "");
const CUSTOM_ORG = argVal("org", "");
const SHOULD_INGEST = hasFlag("ingest") || Boolean(CUSTOM_URL || CUSTOM_REPO || CUSTOM_PKG);
const RETRY_BLOCKED = hasFlag("retry-blocked");
const SKIP_BUILD = hasFlag("no-build");
const LIMIT = Math.max(1, Number(argVal("limit", 10)) || 10);

function decodeHtml(s) {
  return String(s || "")
    .replace(/&#39;|&apos;|&#x27;/gi, "'")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function repoHost(url) {
  if (!url) return null;
  if (/github\.com/i.test(url)) return "github";
  if (/gitlab\.com/i.test(url)) return "gitlab";
  if (/bitbucket\.org/i.test(url)) return "bitbucket";
  return "web";
}

function isClonableRepo(url) {
  if (!url || !/^https?:\/\/(github\.com|gitlab\.com|bitbucket\.org)\//i.test(url)) return false;
  if (/^https?:\/\/(?:www\.)?(github\.com|gitlab\.com|bitbucket\.org)\/[^/]+\/?$/i.test(url)) return false;
  return true;
}

function normUrlHost(u) {
  try {
    const parsed = new URL(u);
    return (parsed.hostname.replace(/^www\./, "") + parsed.pathname.replace(/\/+$/, "")).toLowerCase();
  } catch {
    return "";
  }
}

async function fetchText(url, timeout = 20000) {
  const res = await fetch(url, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(timeout) });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// ------------------------------------------------------------------ parsers

const SUFFIX =
  /\s*[\(\-–]\s*(design system|design language|style ?guide|pattern library|ui kit|ui framework|design guidelines|ui)\s*\)?$/i;

function deriveOrg(name) {
  const paren = /\(([^)]+)\)/.exec(name);
  const bare = name.replace(/\s*\([^)]*\)\s*$/, "").trim();
  const stripped = bare.replace(SUFFIX, "").trim();
  if (/:/.test(name)) return name.split(/:/)[0].trim();
  if (paren && !/^global experience language$/i.test(paren[1].trim())) return paren[1].trim();
  return stripped.split(/\s+/)[0].replace(/[:.]$/, "").replace(/'s$/i, "") || bare;
}

async function fetchAwesome() {
  const md = await fetchText("https://raw.githubusercontent.com/alexpate/awesome-design-systems/master/README.md");
  const rows = md
    .split(/\r?\n/)
    .filter((l) => /^\|\s*\[/.test(l))
    .map((line) => line.split("|").slice(1, -1).map((c) => c.trim()))
    .filter((cells) => cells.length >= 5);

  const link = (cell) => {
    const m = /\[([^\]]*)\]\((https?:\/\/[^)]+)\)/.exec(cell || "");
    return m ? { label: m[1].trim(), url: m[2].trim() } : null;
  };
  const systems = [];
  const seen = new Set();
  for (const cells of rows) {
    const entry = link(cells[0]);
    if (!entry) continue;
    const name = decodeHtml(entry.label);
    if (seen.has(name.toLowerCase())) continue;
    seen.add(name.toLowerCase());
    const src = link(cells[4]);
    const repo = src ? src.url : null;
    const paren = /\(([^)]+)\)/.exec(name);
    const bare = name.replace(/\s*\([^)]*\)\s*$/, "").trim();
    const stripped = bare.replace(SUFFIX, "").trim();
    const org = deriveOrg(name);
    systems.push({
      org,
      name,
      aliases: [...new Set([name, bare, stripped, paren ? paren[1].trim() : null].filter(Boolean))],
      homepage: entry.url,
      repo,
      repoHost: repoHost(repo),
      components: Boolean(cells[1]),
      voiceAndTone: Boolean(cells[2]),
      designersKit: Boolean(cells[3]),
      sourceAvailable: Boolean(cells[4]),
    });
  }
  return {
    source: "alexpate/awesome-design-systems",
    sourceUrl: "https://github.com/alexpate/awesome-design-systems",
    captured: new Date().toISOString().slice(0, 10),
    systems,
  };
}

async function fetchComponentGallery() {
  const html = await fetchText("https://component.gallery/design-systems/");
  const lis = [...html.matchAll(/<li\b[^>]*class="[^"]*link-card[^"]*"[^>]*>([\s\S]*?)<\/li>/gi)];
  const systems = [];
  const seen = new Set();

  for (const m of lis) {
    const tag = m[0];
    const body = m[1];
    const dataName = (/data-name="([^"]+)"/i.exec(tag) || [])[1];
    const primary = /<a\b[^>]*href="([^"]+)"[^>]*class="[^"]*primary-link[^"]*"[^>]*>([\s\S]*?)<\/a>/i.exec(body)
      || /<a\b[^>]*class="[^"]*primary-link[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i.exec(body);
    const name = decodeHtml(dataName || (primary ? primary[2] : ""));
    if (!name || seen.has(name.toLowerCase())) continue;
    seen.add(name.toLowerCase());

    const homepage = primary ? decodeHtml(primary[1]) : "";
    const ghMatch = /href="(https?:\/\/(?:www\.)?github\.com\/[^"]+)"/i.exec(body);
    const rawGh = ghMatch ? decodeHtml(ghMatch[1]) : null;
    const repo = isClonableRepo(rawGh) ? rawGh : null;
    const orgMatch = /<p\b[^>]*class="[^"]*text-sm[^"]*"[^>]*>([\s\S]*?)<\/p>/i.exec(body);
    const org = decodeHtml(orgMatch ? orgMatch[1] : "") || deriveOrg(name);
    const techRaw = (/data-tech="([^"]*)"/i.exec(tag) || [])[1] || "";

    systems.push({
      org,
      name,
      aliases: [...new Set([name, org].filter(Boolean))],
      homepage,
      repo,
      repoHost: repoHost(repo),
      tech: techRaw ? techRaw.split(",").map((t) => decodeHtml(t)).filter(Boolean) : [],
    });
  }
  return {
    source: "Component Gallery",
    sourceUrl: "https://component.gallery/design-systems/",
    captured: new Date().toISOString().slice(0, 10),
    note: "Structured directory synced from Component Gallery (component.gallery/design-systems).",
    systems,
  };
}

async function fetchGallery() {
  const existingPath = path.join(SOURCES_DIR, "gallery.json");
  const existing = fs.existsSync(existingPath) ? JSON.parse(fs.readFileSync(existingPath, "utf8")) : { systems: [] };
  const byName = new Map((existing.systems || []).map((s) => [normKey(s.name), s]));

  const html = await fetchText("https://designsystemsrepo.com/design-systems/");
  const cards = [...html.matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"[^>]*class="[^"]*block-ds[^"]*"[^>]*>([\s\S]*?)<\/a>/gi)];
  const merged = [];
  const seen = new Set();

  for (const m of cards) {
    const homepage = decodeHtml(m[1]);
    const inner = m[2];
    const org = decodeHtml((/<h3>([\s\S]*?)<\/h3>/i.exec(inner) || [])[1]);
    const name = decodeHtml((/<h2>([\s\S]*?)<\/h2>/i.exec(inner) || [])[1]);
    const desc = decodeHtml((/<p\b[^>]*>([\s\S]*?)<\/p>/i.exec(inner) || [])[1]);
    if (!name || seen.has(normKey(name))) continue;
    seen.add(normKey(name));
    const prev = byName.get(normKey(name)) || {};
    merged.push({
      org: org || prev.org || deriveOrg(name),
      name,
      homepage,
      desc: prev.desc || desc,
    });
  }
  for (const prev of existing.systems || []) {
    if (!seen.has(normKey(prev.name))) merged.push(prev);
  }
  return {
    source: existing.source || "Design Systems Gallery (Jad Limcaco)",
    sourceUrl: "https://designsystemsrepo.com/design-systems/",
    captured: new Date().toISOString().slice(0, 10),
    note: existing.note || "A-Z gallery of design systems synced from designsystemsrepo.com.",
    systems: merged,
  };
}

async function fetchSurf() {
  const existingPath = path.join(SOURCES_DIR, "surf.json");
  const existing = fs.existsSync(existingPath) ? JSON.parse(fs.readFileSync(existingPath, "utf8")) : { systems: [] };
  const byKey = new Map((existing.systems || []).map((s) => [`${normOrg(s.org)}:${normKey(s.name)}`, s]));

  const html = await fetchText("https://designsystems.surf/");
  const idxMatch = /https:\/\/framerusercontent\.com\/sites\/[^"'\s]+\/searchIndex-[^"'\s]+\.json/i.exec(html);
  if (!idxMatch) return existing;

  const idx = JSON.parse(await fetchText(idxMatch[0]));
  const merged = [...(existing.systems || [])];
  for (const [route, meta] of Object.entries(idx)) {
    if (!/^\/design-systems\/[^/]+$/.test(route)) continue;
    const rawSlug = route.split("/").pop();
    const title = String(meta?.title || rawSlug);
    const cleaned = title.replace(/\s*[–—-]\s*(Design System|Framework|UI Components).*$/i, "").trim();
    const org = decodeHtml(rawSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));
    const name = decodeHtml(cleaned || org);
    const k = `${normOrg(org)}:${normKey(name)}`;
    if (!byKey.has(k) && !merged.some((x) => normOrg(x.org) === normOrg(org))) {
      const entry = { org, name, surfUrl: `https://designsystems.surf${route}`, d: 0, c: 0, r: [] };
      merged.push(entry);
      byKey.set(k, entry);
    }
  }
  return {
    source: existing.source || "designsystems.surf",
    sourceUrl: "https://designsystems.surf/",
    captured: new Date().toISOString().slice(0, 10),
    note: existing.note || "Design Systems Surf directory.",
    systems: merged,
  };
}

async function resolveSurfLinks(surfUrl) {
  const html = await fetchText(surfUrl, 15000);
  const hrefs = [...html.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi)]
    .map((m) => decodeHtml(m[1]))
    .filter((u) => !/framer|designsystems\.surf|fonts\.g|chatgpt|claude|aistudio|grok|perplexity|figma\.com|twitter|x\.com|linkedin|youtube|discord|github\.com\/sponsors/i.test(u));
  const repo = hrefs.find((u) => isClonableRepo(u)) || null;
  const homepage = hrefs.find((u) => !/github\.com|gitlab\.com|bitbucket\.org/i.test(u)) || null;
  return { repo, homepage };
}

async function fetchNpmDesignTokenCandidates() {
  const url = "https://registry.npmjs.org/-/v1/search?text=keywords:design-tokens&size=60";
  const data = JSON.parse(await fetchText(url));
  return (data.objects || [])
    .filter((o) => (o.score?.detail?.popularity || 0) >= 0.08 && o.package?.name)
    .map((o) => ({
      pkg: o.package.name,
      org: (o.package.name.startsWith("@") ? o.package.name.slice(1).split("/")[0] : o.package.name).replace(/-/g, " "),
      name: o.package.name,
      repo: o.package.links?.repository || null,
      homepage: o.package.links?.homepage || null,
      desc: o.package.description || "",
      source: "npm registry",
    }));
}

// ------------------------------------------------------------------ script runners

function runNode(scriptRel, args = [], timeout = 120_000) {
  execFileSync(process.execPath, [path.join(ROOT, scriptRel), ...args], {
    cwd: ROOT,
    stdio: "inherit",
    timeout,
  });
}

function tryIngestCandidate(c) {
  const preExists = fs.existsSync(path.join(ROOT, "systems", c.slug));
  try {
    if (c.pkg) {
      runNode("scripts/ingest-npm.mjs", [c.pkg, "--slug", c.slug, "--org", c.org, "--name", c.name]);
    } else if (c.repo && isClonableRepo(c.repo)) {
      runNode("scripts/ingest-repo.mjs", [c.repo, "--slug", c.slug, "--org", c.org, "--name", c.name]);
    } else if (c.homepage) {
      runNode("scripts/ingest-site.mjs", [c.homepage, "--slug", c.slug, "--org", c.org, "--name", c.name]);
    } else {
      return { ok: false, reason: "no ingestible URL or package" };
    }
  } catch (err) {
    if (!preExists) fs.rmSync(path.join(ROOT, "systems", c.slug), { recursive: true, force: true });
    return { ok: false, reason: err.message };
  }

  const md = readDesign(c.slug);
  const manPath = path.join(ROOT, "systems", c.slug, "manifest.json");
  if (!md || !fs.existsSync(manPath)) return { ok: false, reason: "no manifest emitted" };
  const man = JSON.parse(fs.readFileSync(manPath, "utf8"));
  const report = lint(md, { name: c.slug });
  if (report.counts.errors > 0 || (man.tokens?.colors || 0) < 3) {
    if (!preExists) fs.rmSync(path.join(ROOT, "systems", c.slug), { recursive: true, force: true });
    return { ok: false, reason: `insufficient tokens (${man.tokens?.colors || 0} colors, ${report.counts.errors} lint errors)` };
  }
  return { ok: true, tokens: man.tokens };
}

// ------------------------------------------------------------------ main

async function main() {
  if (CUSTOM_URL || CUSTOM_REPO || CUSTOM_PKG) {
    const fallbackSlug = CUSTOM_PKG
      ? CUSTOM_PKG.replace(/^@[^/]+\//, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase()
      : normKey(CUSTOM_NAME || CUSTOM_ORG || new URL(CUSTOM_REPO || CUSTOM_URL).hostname.replace(/^www\./, ""));
    const slug = CUSTOM_SLUG || fallbackSlug;
    const candidate = {
      slug,
      org: CUSTOM_ORG || CUSTOM_NAME || slug,
      name: CUSTOM_NAME || CUSTOM_ORG || slug,
      pkg: CUSTOM_PKG || null,
      repo: CUSTOM_REPO || null,
      homepage: CUSTOM_URL || null,
      source: "custom",
    };
    console.log(`sync: ingesting custom target -> ${slug}`);
    const res = tryIngestCandidate(candidate);
    if (!res.ok) {
      console.error(`failed: ${res.reason}`);
      process.exit(1);
    }
    if (!SKIP_BUILD) {
      runNode("scripts/enrich-systems.mjs");
      runNode("scripts/coverage.mjs");
      runNode("bin/sourcebook.mjs", ["index"]);
      runNode("scripts/build-catalog.mjs");
      runNode("bin/sourcebook.mjs", ["lint", "--all"]);
    }
    return;
  }

  console.log("sync: fetching external directories & registries...\n");
  fs.mkdirSync(SOURCES_DIR, { recursive: true });

  const tasks = [
    ["awesome", "awesome.json", fetchAwesome],
    ["component-gallery", "component-gallery.json", fetchComponentGallery],
    ["gallery", "gallery.json", fetchGallery],
    ["surf", "surf.json", fetchSurf],
  ];

  const sourceResults = {};
  for (const [id, file, fn] of tasks) {
    try {
      const data = await fn();
      if (!DRY_RUN) fs.writeFileSync(path.join(SOURCES_DIR, file), JSON.stringify(data, null, 2) + "\n", "utf8");
      sourceResults[id] = data.systems || [];
      console.log(`  ok    ${id.padEnd(20)} ${String(sourceResults[id].length).padStart(3)} systems`);
    } catch (err) {
      const p = path.join(SOURCES_DIR, file);
      sourceResults[id] = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")).systems || [] : [];
      console.log(`  warn  ${id.padEnd(20)} fetch failed (${err.message}); using ${sourceResults[id].length} cached`);
    }
  }

  let npmCandidates = [];
  try {
    npmCandidates = await fetchNpmDesignTokenCandidates();
    console.log(`  ok    ${"npm-registry".padEnd(20)} ${String(npmCandidates.length).padStart(3)} candidate packages`);
  } catch (err) {
    console.log(`  warn  ${"npm-registry".padEnd(20)} fetch failed (${err.message})`);
  }

  // Known inventory & blocked list
  const owned = listSystems().filter((s) => s.provenance !== "listed");
  const ownedSlugs = new Set(owned.map((s) => normKey(s.slug)));
  const ownedOrgs = new Set(owned.map((s) => normOrg(s.org)).filter(Boolean));
  const ownedNames = new Set(owned.map((s) => normKey(s.displayName || s.name)).filter(Boolean));
  const ownedRepos = new Set(owned.map((s) => normUrlHost(s.source?.repo)).filter(Boolean));
  const ownedHomepages = new Set(owned.map((s) => normUrlHost(s.homepage || s.source?.url)).filter(Boolean));
  const ownedPkgs = new Set(owned.map((s) => s.source?.package).filter(Boolean));

  const blockedPath = path.join(ROOT, "data/blocked.json");
  const blocked = fs.existsSync(blockedPath) ? JSON.parse(fs.readFileSync(blockedPath, "utf8")).blocked || [] : [];
  const blockedSlugs = new Set(RETRY_BLOCKED ? [] : blocked.map((b) => normKey(b.slug)));

  const isOwned = ({ slug, org, name, aliases = [], repo, homepage, pkg }) => {
    if (pkg && ownedPkgs.has(pkg)) return true;
    if (repo && ownedRepos.has(normUrlHost(repo))) return true;
    if (homepage && ownedHomepages.has(normUrlHost(homepage))) return true;
    for (const k of [slug, name, ...aliases]) {
      if (ownedSlugs.has(normKey(k)) || ownedNames.has(normKey(k))) return true;
    }
    if (org && ownedOrgs.has(normOrg(org))) return true;
    return false;
  };

  const discovered = [];
  const seenKey = new Set();
  const addCandidate = (entry) => {
    const slug = normKey(entry.slug || entry.org || entry.name);
    if (!slug || blockedSlugs.has(slug) || seenKey.has(slug)) return;
    if (isOwned({ ...entry, slug })) return;
    seenKey.add(slug);
    discovered.push({ ...entry, slug });
  };

  for (const s of sourceResults["component-gallery"] || []) {
    addCandidate({ ...s, source: "Component Gallery" });
  }
  for (const s of sourceResults.awesome || []) {
    addCandidate({ ...s, source: "awesome-design-systems" });
  }
  for (const s of sourceResults.gallery || []) {
    if (s.homepage) addCandidate({ ...s, source: "Design Systems Gallery" });
  }
  for (const s of sourceResults.surf || []) {
    if (s.surfUrl) addCandidate({ ...s, source: "designsystems.surf" });
  }
  for (const n of npmCandidates) {
    addCandidate(n);
  }

  console.log(`\ndiscovered ${discovered.length} new uncovered system(s) across external sites`);
  for (const c of discovered.slice(0, 20)) {
    const target = c.pkg || c.repo || c.homepage || c.surfUrl;
    console.log(`  + ${c.name.padEnd(28)} [${c.source}] -> ${target}`);
  }
  if (discovered.length > 20) console.log(`  … and ${discovered.length - 20} more`);

  if (!SHOULD_INGEST || DRY_RUN) {
    if (!DRY_RUN && !SKIP_BUILD) {
      runNode("scripts/coverage.mjs");
      runNode("scripts/build-all-sources.mjs");
    }
    console.log("\nDry-run/source refresh complete. Pass `--ingest --limit 10` to automatically ingest new systems.");
    return;
  }

  let ingested = 0;
  let tried = 0;
  for (const c of discovered) {
    if (ingested >= LIMIT || tried >= LIMIT * 2) break;
    tried++;
    if (!c.pkg && !c.repo && !c.homepage && c.surfUrl) {
      try {
        const extra = await resolveSurfLinks(c.surfUrl);
        c.repo = extra.repo;
        c.homepage = extra.homepage;
      } catch {
        continue;
      }
    }
    if (!c.pkg && !isClonableRepo(c.repo) && !c.homepage) continue;

    console.log(`\n[${ingested + 1}/${LIMIT}] ingesting ${c.name} (${c.pkg || c.repo || c.homepage})`);
    const res = tryIngestCandidate(c);
    if (res.ok) {
      ingested++;
      console.log(`  added ${c.slug}: ${res.tokens?.colors || 0} colors, ${res.tokens?.typography || 0} type`);
    } else {
      console.log(`  skipped ${c.slug}: ${res.reason}`);
    }
  }

  if (!SKIP_BUILD) {
    if (ingested > 0) runNode("scripts/enrich-systems.mjs");
    runNode("scripts/coverage.mjs");
    runNode("scripts/build-all-sources.mjs");
    if (ingested > 0) {
      runNode("bin/sourcebook.mjs", ["index"]);
      runNode("scripts/build-catalog.mjs");
      runNode("bin/sourcebook.mjs", ["lint", "--all"]);
    }
  }
  console.log(`\nsync finished: ${ingested} new system(s) ingested and verified.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
