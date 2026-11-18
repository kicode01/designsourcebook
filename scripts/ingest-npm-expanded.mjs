// Batch-ingest verified real npm token & UI framework packages without duplicating existing systems.
// Reuses scripts/ingest-npm.mjs and registers verified new sources in data/published-sources.json.

import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { normKey, normOrg } from "../lib/registry.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUB_PATH = path.join(ROOT, "data/published-sources.json");

// [slug, pkg, org, name, extra?]
const TARGETS = [
  // Curated directory gaps with real npm packages
  ["wanda", "@wonderflow/tokens", "Wonderflow", "Wanda Design System", "@wonderflow/react-components"],
  ["hubspot", "@hubspot/canvas", "Hubspot", "Canvas Design System"],
  ["heroui", "@heroui/theme", "HeroUI", "HeroUI"],
  ["just", "@justeat/pie-design-tokens", "Just", "PIE Design System", "@justeattakeaway/pie-css"],
  ["wikimedia", "@wikimedia/codex-design-tokens", "Wikimedia", "Codex"],
  ["esri", "@esri/calcite-design-tokens", "Esri", "Calcite Design System", "@esri/calcite-components"],
  ["razorpay", "@razorpay/blade", "Razorpay", "Blade"],
  ["sumup", "@sumup/design-tokens", "SumUp", "Circuit UI"],
  ["lemonsqueezy", "@lemonsqueezy/wedges", "Lemon Squeezy", "Wedges"],
  ["thumbtack", "@thumbtack/thumbprint-tokens", "Thumbtack", "Thumbprint"],
  ["rivet", "rivet-core", "Indiana University", "Rivet Design System"],
  ["freshworks", "@freshworks/crayons", "Freshworks", "Crayons"],
  ["fremtind", "@fremtind/jkl-core", "Fremtind Forsikring", "Jokul"],
  ["webawesome", "@awesome.me/webawesome", "Web Awesome", "Web Awesome"],
  ["bulma", "bulma", "Bulma", "Bulma CSS"],
  ["quasar", "quasar", "Quasar", "Quasar"],
  ["98css", "98.css", "98.css", "98.css"],
  ["guardian", "@guardian/source-foundations", "The Guardian", "Source Design System"],
  ["westpac", "@westpac/ui", "Westpac", "GEL"],
  ["nsw", "nsw-design-system", "State of New South Wales", "Digital NSW"],
  ["seb", "@sebgroup/green-core", "Skandinaviska Enskilda Banken", "SEB Green Design System"],
  ["alfa-bank", "@alfalab/core-components-vars", "Alfa-Bank", "Alfa Design System"],
  ["cisco", "@momentum-ui/tokens", "Cisco", "Momentum Design"],
  ["helsinki", "hds-design-tokens", "City of Helsinki", "Helsinki Design System"],
  ["washingtonpost", "@washingtonpost/wpds-ui-kit", "Washington Post", "WPDS"],
  ["instructure", "@instructure/ui-themes", "Instructure", "InstUI"],
  ["coop", "@coopdigital/foundations-vars", "Co-op", "Co-op Experience Library"],
  ["merck", "@emdgroup-liquid/liquid", "Merck", "Liquid"],
  ["rimble", "rimble-ui", "ConsenSys", "Rimble"],
  ["fishtank", "@fishtank/colors", "Bloomberg BNA", "Fishtank"],
  ["catho", "@catho/quantum", "Catho", "Quantum"],
  ["meetup", "swarm-constants", "Meetup", "Swarm Design System"],
  ["teamleader", "@teamleader/ui-colors", "Teamleader", "Ahoy"],
  ["brainly", "brainly-style-guide", "Brainly", "Pencil"],
  ["ons", "@ons/design-system", "Office for National Statistics", "ONS Design System"],
  ["nordnet", "nordnet-ui-kit", "Nordnet", "Nordnet UI Kit"],
  ["at", "at-ui-style", "AT", "AT UIKIT"],
  ["arbetsformedlingen", "@designsystem-se/af", "Arbetsformedlingen", "Arbetsformedlingen Design System"],
  ["mapbox", "@mapbox/mbx-assembly", "Mapbox", "Assembly"],
  ["deque", "@deque/cauldron-react", "Deque", "Cauldron"],
  ["dynatrace", "@dynatrace/strato-design-tokens", "Dynatrace", "Strato Design System"],
  ["ausgov", "@gov.au/core", "Australian Government", "Australian Government Design System"],
  ["ft-origami", "@financial-times/o3-foundation", "Financial Times", "Origami v3"],

  // Major OSS UI & design-token frameworks across the internet
  ["vuetify", "vuetify", "Vuetify", "Vuetify"],
  ["primeui", "@primeuix/themes", "PrimeTek", "PrimeUI", "primeflex"],
  ["element-plus", "element-plus", "Element Plus", "Element Plus"],
  ["open-props", "open-props", "Open Props", "Open Props"],
  ["catppuccin", "@catppuccin/palette", "Catppuccin", "Catppuccin"],
  ["nord", "nord", "Arctic Ice Studio", "Nord"],
  ["dracula", "dracula-ui", "Dracula Theme", "Dracula UI"],
  ["rose-pine", "@rose-pine/palette", "Rose Pine", "Rose Pine"],
  ["picocss", "@picocss/pico", "Pico.css", "Pico CSS"],
  ["skeleton-ui", "@skeletonlabs/skeleton", "Skeleton Labs", "Skeleton UI"],
  ["tamagui", "@tamagui/themes", "Tamagui", "Tamagui"],
  ["park-ui", "@park-ui/panda-preset", "Park UI", "Park UI"],
  ["nescss", "nes.css", "NES.css", "NES.css"],
  ["ariakit", "@ariakit/react", "Ariakit", "Ariakit"],
  ["db-ux", "@db-ui/core", "Deutsche Bahn", "DB UI"],
  ["telekom", "@telekom/design-tokens", "Deutsche Telekom", "Scale Design System", "@telekom/scale-components"],
  ["salt-ds", "@salt-ds/theme", "J.P. Morgan", "Salt Design System"],
  ["sbb-lyne", "@sbb-esta/lyne-design-tokens", "SBB CFF FFS", "Lyne Design System"],
  ["digdir", "@digdir/designsystemet-theme", "Norwegian Digitalisation Agency", "Designsystemet"],
  ["nav-aksel", "@navikt/ds-tokens", "NAV Norway", "Aksel"],
  ["vy-spor", "@vygruppen/spor-design-tokens", "Vy Group", "Spor"],
  ["entur", "@entur/tokens", "Entur", "Entur Design System"],
  ["nrk", "@nrk/core-css", "NRK", "NRK Core"],
  ["trimble-modus", "@trimble-oss/modus-bootstrap", "Trimble", "Modus Design System"],
  ["ionic", "@ionic/core", "Ionic", "Ionic Framework"],
  ["tabler", "@tabler/core", "Tabler", "Tabler UI"],
  ["uikit", "uikit", "YOOtheme", "UIkit"],
  ["purecss", "purecss", "Pure.css", "Pure CSS"],
  ["tachyons", "tachyons", "Tachyons", "Tachyons"],
  ["beercss", "beercss", "Beer CSS", "Beer CSS"],
  ["newskit", "newskit", "News UK", "NewsKit"],
  ["naive-ui", "naive-ui", "TuSimple", "Naive UI"],
  ["vant", "vant", "Youzan", "Vant"],
  ["nutui", "@nutui/nutui", "JD.com", "NutUI"],
  ["spectre", "spectre.css", "PicturePan2", "Spectre.css"],
  ["watercss", "water.css", "Water.css", "Water.css"],
  ["simplecss", "simpledotcss", "Simple.css", "Simple.css"],
  ["matcha", "@lowlighter/matcha", "Matcha.css", "Matcha.css"],
  ["chota", "chota", "Chota", "Chota"],
  ["halfmoon", "halfmoon", "Halfmoon", "Halfmoon"],
  ["alberta", "@abgov/design-tokens", "Government of Alberta", "Alberta Design System"],
  ["wordpress", "@wordpress/theme", "WordPress", "WordPress Design System"],
  ["hanzo", "@hanzo/tokens", "Hanzo AI", "Hanzo Design System"],
  ["putio", "@putdotio/design", "Put.io", "Put.io Design System"],
  ["civitai", "@civitai/theme", "Civitai", "Civitai Design System"],
  ["plexui", "@plexui/styles", "Plex UI", "Plex UI"],
  ["keboola", "@keboola/tailwind-config", "Keboola", "Keboola UI"],
  ["tailwindcss", "tailwindcss", "Tailwind Labs", "Tailwind CSS"],
  ["deque", "@deque/cauldron-styles", "Deque", "Cauldron", "@deque/cauldron-react"],
  ["infor", "ids-enterprise", "Infor", "Infor Design System"],
  ["servicetitan", "@servicetitan/anvil2", "ServiceTitan", "Anvil"],
  ["talend", "@talend/design-tokens", "Talend", "Talend Design System", "@talend/design-system"],
  ["sendgrid", "@sendgrid/ui-components", "SendGrid", "SendGrid"],
  ["cisco", "@momentum-design/tokens", "Cisco", "Momentum Design"],
  ["databricks", "@databricks/design-system", "Databricks", "Databricks"],
  ["reach", "@reach/dialog", "Reach", "Reach UI"],
  ["massachusetts", "@massds/mds-tokens", "Massachusetts", "Mayflower Design System"],
  ["decathlon", "@vtmn/css", "Decathlon", "Vitamin Design System"],
  ["volvo", "@volvo-cars/css", "Volvo Cars", "Volvo Cars Design System"],
  ["okta", "@okta/odyssey-design-tokens", "Okta", "Odyssey Design System", "@okta/odyssey-react-mui"],
  ["adyen", "@adyen/adyen-web", "Adyen", "Adyen Design"],
  ["klarna", "@klarna/ui-css-components", "Klarna", "Klarna UI"],
  ["axa", "@axa-fr/react-toolkit-all", "AXA", "AXA Slash Design System", "@axa-ch/patterns-library-polyfill"],
  ["toss", "@toss/tds-colors", "Toss", "Toss Design System"],
  ["kern", "@kern-ux/native", "Germany Federal Government", "KERN UX"],
  ["swiss-post", "@swisspost/design-system-styles", "Swiss Post", "Swiss Post Design System"],
  ["khan", "@khanacademy/wonder-blocks-tokens", "Khan Academy", "Wonder Blocks"],
  ["audi", "@audi/audi-ui", "Audi", "Audi UI"],
  ["schneider", "@quartzds/core", "Schneider Electric", "Quartz"],
  ["kendo", "@progress/kendo-theme-default", "Progress Telerik", "Kendo UI"],
  ["aggrid", "ag-grid-community", "AG Grid", "AG Grid"],
  ["auth0", "@auth0/cosmos", "Auth0", "Cosmos"],
  ["cockroach", "@cockroachlabs/ui-components", "Cockroach Labs", "Cockroach UI"],
  ["storybook-ds", "@storybook/design-system", "Storybook", "Storybook Design System"],
  ["ubie", "@ubie/design-tokens", "Ubie", "Ubie Design Tokens"],
];

function currentInventory() {
  const slugs = new Set();
  const orgs = new Set();
  const pkgs = new Set();
  const sysDir = path.join(ROOT, "systems");
  if (!fs.existsSync(sysDir)) return { slugs, orgs, pkgs };
  for (const s of fs.readdirSync(sysDir)) {
    const mPath = path.join(sysDir, s, "manifest.json");
    if (!fs.existsSync(mPath)) continue;
    try {
      const m = JSON.parse(fs.readFileSync(mPath, "utf8"));
      if (m.provenance === "listed") continue;
      if ((m.tokens?.colors || 0) === 0 && (m.tokens?.typography || 0) === 0 && (m.tokens?.components || 0) === 0) continue;
      slugs.add(normKey(s));
      if (m.org) orgs.add(normOrg(m.org));
      if (m.source?.package) pkgs.add(m.source.package);
    } catch {
      /* ignore */
    }
  }
  return { slugs, orgs, pkgs };
}

function runIngest([slug, pkg, org, name, extra]) {
  return new Promise((resolve) => {
    const args = ["scripts/ingest-npm.mjs", pkg, "--slug", slug, "--org", org, "--name", name];
    if (extra) args.push("--extra", extra);
    const child = spawn(process.execPath, args, { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
    let out = "";
    let err = "";
    child.stdout.on("data", (d) => (out += d.toString()));
    child.stderr.on("data", (d) => (err += d.toString()));
    child.on("close", (code) => {
      resolve({ slug, pkg, org, name, extra, code, out: out.trim(), err: err.trim() });
    });
  });
}

function syncPublishedJson() {
  const doc = JSON.parse(fs.readFileSync(PUB_PATH, "utf8"));
  doc.sources = Array.isArray(doc.sources) ? doc.sources : [];
  const bySlug = new Map(doc.sources.map((s) => [s.slug, s]));

  // Upgrade @wonderflow/react-components -> @wonderflow/tokens if present
  const wanda = bySlug.get("wanda");
  if (wanda) {
    wanda.pkg = "@wonderflow/tokens";
    wanda.extra = ["@wonderflow/react-components"];
  }

  // Register every verified published TARGET that succeeded in systems/
  for (const [slug, pkg, org, name, extra] of TARGETS) {
    const mp = path.join(ROOT, "systems", slug, "manifest.json");
    if (!fs.existsSync(mp)) continue;
    let m;
    try {
      m = JSON.parse(fs.readFileSync(mp, "utf8"));
    } catch {
      continue;
    }
    if (m.provenance !== "published" || m.source?.package !== pkg) continue;
    if (bySlug.has(slug)) continue;
    const entry = {
      pkg,
      slug,
      org,
      name,
      note: m.description || `${org} ${name} — published design tokens.`,
      ...(extra ? { extra: extra.split(",") } : {}),
    };
    doc.sources.push(entry);
    bySlug.set(slug, entry);
  }
  fs.writeFileSync(PUB_PATH, JSON.stringify(doc, null, 2) + "\n", "utf8");
}

async function main() {
  const { slugs, orgs, pkgs } = currentInventory();
  const queue = [];
  let skipped = 0;

  for (const t of TARGETS) {
    const [slug, pkg, org] = t;
    if (slugs.has(normKey(slug)) || orgs.has(normOrg(org)) || pkgs.has(pkg)) {
      skipped++;
      continue;
    }
    queue.push(t);
  }

  console.log(`Queued ${queue.length} real npm packages (${skipped} already present in systems/). Running concurrency=4...`);

  const succeeded = [];
  const failed = [];
  let idx = 0;

  async function worker() {
    while (idx < queue.length) {
      const target = queue[idx++];
      const res = await runIngest(target);
      const manifestPath = path.join(ROOT, "systems", res.slug, "manifest.json");
      let ok = false;
      if (res.code === 0 && fs.existsSync(manifestPath)) {
        try {
          const m = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
          ok = (m.tokens?.colors || 0) > 0 || (m.tokens?.typography || 0) > 0 || (m.tokens?.components || 0) > 0;
        } catch {
          ok = false;
        }
      }
      if (ok) {
        succeeded.push(res);
        console.log(`[OK] ${res.out.split("\n").pop()}`);
      } else {
        failed.push({ slug: res.slug, pkg: res.pkg, code: res.code, msg: (res.out || res.err).split("\n").pop() });
        console.log(`[--] ${res.slug} (${res.pkg}): ${(res.out || res.err).split("\n").pop()}`);
      }
    }
  }

  await Promise.all(Array.from({ length: 4 }, worker));
  syncPublishedJson();
  console.log({ attempted: queue.length, skipped, succeeded: succeeded.length, failed: failed.length });
  if (failed.length) {
    console.log("Failed items:", failed.map((f) => `${f.slug}(${f.pkg}): ${f.msg}`).join("; "));
  }
}

main();
