// Cross-reference the registry against every source list in data/sources/.
// Answers "do we have all of these?" with a number instead of a feeling.
//
// Two units matter and they are not the same:
//   - per source: how many of *this* list's entries we hold
//   - union:      how many distinct organisations across *all* lists we hold
// The union is the honest headline, because the lists overlap heavily with
// each other as well as with us.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normKey, normOrg } from "../lib/registry.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const SOURCES_DIR = path.join(ROOT, "data/sources");

// npm packages verified to exist that ship design tokens, keyed by "org name".
const PUBLISHED = {
  "Adobe Spectrum": "@adobe/spectrum-tokens",
  "Amazon Cloudscape": "@cloudscape-design/design-tokens",
  "Ant Financial Ant Design": "antd",
  "Atlassian Atlassian Design Language": "@atlaskit/tokens",
  "CA Technologies Mineral UI": "mineral-ui",
  "GitHub Primer": "@primer/primitives",
  "Gitlab Pajamas": "@gitlab/ui",
  "GOV.UK GOV.UK Design System": "govuk-frontend",
  "Hewlett Packard Grommet": "grommet",
  "Hubspot Canvas Design System": "@hubspot/canvas",
  "IBM Carbon Design System": "@carbon/themes",
  "Kiwi.com Orbit": "@kiwicom/orbit-design-tokens",
  "Microsoft Office UI Fabric": "@fluentui/tokens",
  "Mozilla Protocol": "@mozilla-protocol/core",
  "Pluralsight Pluralsight Design System": "@pluralsight/design-tokens",
  "React95 React95": "react95",
  "Red Hat PatternFly": "@patternfly/react-tokens",
  "REI Cedar": "@rei/cedar",
  "Salesforce Lightning Design System": "@salesforce-ux/design-system",
  "Shopify Polaris": "@shopify/polaris-tokens",
  "Sprout Social Seeds": "@sproutsocial/seeds-color",
  "Stack Overflow Stacks": "@stackoverflow/stacks",
  "Twilio Paste": "@twilio-paste/design-tokens",
  "Ubuntu Vanilla": "vanilla-framework",
  "U.S. Government U.S. Web Design System": "@uswds/uswds",
  "VMware Clarity Design System": "@clr/ui",
  "Wonderflow Wanda Design System": "@wonderflow/react-components",
  "WorkOS Radix": "@radix-ui/colors",
  "Zendesk Zendesk Garden": "@zendeskgarden/react-theming",
  "Tencent TDesign": "tdesign-react",
  "Singapore Government Design System": "@govtechsg/sgds",
  "Telefónica Mística": "@telefonica/mistica",
  "Foundation Foundation": "foundation-sites",
  "Grafana Grafana UI": "@grafana/ui",
  "Buildit Buildit Gravity": "@buildit/gravity-ui-web",
};

function isClonableRepo(entry) {
  if (!entry.repo || entry.repoHost === "web") return false;
  // GitHub/GitLab/Bitbucket org profile URLs (e.g. github.com/shadcn-ui) are not repos.
  if (/^https?:\/\/(?:www\.)?(github\.com|gitlab\.com|bitbucket\.org)\/[^/]+\/?$/i.test(entry.repo)) return false;
  return true;
}

const systems = fs
  .readdirSync(path.join(ROOT, "systems"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => JSON.parse(fs.readFileSync(path.join(ROOT, "systems", d.name, "manifest.json"), "utf8")))
  // Inventory records carry no tokens. Counting them as "covered" would be the
  // exact dishonesty this report exists to prevent.
  .filter((s) => s.provenance !== "listed");

const bySlug = new Map(systems.map((s) => [normKey(s.name), s]));
const byDisplay = new Map(systems.map((s) => [normKey(s.displayName || ""), s]));
const byOrg = new Map();
for (const s of systems) {
  if (!s.org) continue;
  const k = normOrg(s.org);
  if (!byOrg.has(k)) byOrg.set(k, s);
}

function lookup(key) {
  if (!key) return null;
  return byOrg.get(normOrg(key)) || bySlug.get(normOrg(key)) || byDisplay.get(normOrg(key)) || null;
}

function findCovered(entry) {
  // Exact matches only — prefix matching pairs "Line" with "linear-app".
  // A published ingest carries an explicit org, which is the strongest signal,
  // so it is tried first; then whatever aliases the source list provides.
  const candidates = [entry.org, ...(entry.aliases || []), entry.name];
  for (const c of candidates) {
    const hit = lookup(c);
    if (hit) return hit;
  }
  return null;
}

const files = fs.readdirSync(SOURCES_DIR).filter((f) => f.endsWith(".json")).sort();
const reports = [];
const union = new Map(); // normOrg -> { org, entries: [], covered: system|null, npm: string|null }

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(SOURCES_DIR, file), "utf8"));
  const rows = [];
  for (const e of data.systems) {
    const hit = findCovered(e);
    const pkg = PUBLISHED[`${e.org} ${e.name}`] || null;
    rows.push({ ...e, covered: hit ? hit.slug || hit.name : null, npm: pkg });

    const key = normOrg(e.org);
    if (!union.has(key)) union.set(key, { org: e.org, entries: [], covered: null, npm: null, repo: null });
    const u = union.get(key);
    u.entries.push({
      name: e.name,
      source: data.source,
      sourceId: path.basename(file, ".json"),
      covered: Boolean(hit),
    });
    if (hit) u.covered = hit.slug || hit.name;
    if (pkg) u.npm = pkg;
    if (isClonableRepo(e)) u.repo = e.repo;
  }

  const covered = rows.filter((r) => r.covered);
  reports.push({
    id: path.basename(file, ".json"),
    name: data.source,
    total: rows.length,
    covered: covered.length,
    missing: rows.length - covered.length,
    rows,
  });
}

const unionList = [...union.values()];
const unionCovered = unionList.filter((u) => u.covered);

// ------------------------------------------------------------------ report

const pct = (a, b) => (b ? `${((a / b) * 100).toFixed(0)}%` : "—");
const pad = (s, n) => String(s).padEnd(n);

console.log("coverage by source\n");
for (const r of reports) {
  console.log(`  ${pad(r.name, 42)} ${String(r.covered).padStart(3)}/${String(r.total).padEnd(4)} ${pct(r.covered, r.total).padStart(4)}`);
}
console.log(`\n  ${pad("union (distinct organisations)", 42)} ${String(unionCovered.length).padStart(3)}/${String(unionList.length).padEnd(4)} ${pct(unionCovered.length, unionList.length).padStart(4)}`);

const missingOrgs = unionList.filter((u) => !u.covered);
const reachable = missingOrgs.filter((u) => u.npm);
const repoOnly = missingOrgs.filter((u) => !u.npm && u.repo);

console.log(`\n  registry holds ${systems.length} systems across ${unionCovered.length} of these organisations`);
console.log(`  missing organisations: ${missingOrgs.length}`);
console.log(`    ${reachable.length} have a verified npm token package`);
console.log(`    ${repoOnly.length} have a public repo but no npm package`);
console.log(`    ${missingOrgs.length - reachable.length - repoOnly.length} are docs-only`);

console.log("\nnext ingest targets (npm package verified, not yet in registry):");
for (const u of reachable.slice(0, 14)) {
  console.log(`  ${pad(u.org, 26)} ${pad(u.npm, 40)} ${u.entries.map((e) => e.name).join(", ").slice(0, 34)}`);
}

console.log("\norganisations with no machine-readable source:");
const docsOnly = missingOrgs.filter((u) => !u.npm);
for (const u of docsOnly.slice(0, 10)) console.log(`  ${pad(u.org, 26)} ${u.entries.map((e) => e.name).join(", ").slice(0, 46)}`);
if (docsOnly.length > 10) console.log(`  … and ${docsOnly.length - 10} more`);

const out = {
  generated: new Date().toISOString(),
  registry: { systems: systems.length },
  sources: reports.map((r) => ({
    id: r.id,
    name: r.name,
    total: r.total,
    covered: r.covered,
    missing: r.missing,
    missingEntries: r.rows.filter((x) => !x.covered).map((x) => ({ org: x.org, name: x.name, npm: x.npm })),
  })),
  union: {
    organisations: unionList.length,
    covered: unionCovered.length,
    missing: missingOrgs.length,
    reachableViaNpm: reachable.length,
    reachableViaRepo: repoOnly.length,
    entries: unionList.map((u) => ({
      org: u.org,
      covered: u.covered,
      npm: u.npm,
      repo: u.repo,
      systems: u.entries.map((e) => ({ name: e.name, source: e.source, sourceId: e.sourceId })),
    })),
  },
};

fs.writeFileSync(path.join(ROOT, "data/coverage.json"), JSON.stringify(out, null, 2) + "\n", "utf8");
console.log("\n\u2192 data/coverage.json");
