// Discover and verify official icon libraries & SVG specs across registry systems
// by querying npm package metadata, sibling workspace icon packages, GitHub raw
// package.json files, and documented design-system icon catalogs.
//
// Usage: node scripts/discover-icons.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { matchKnownIconPackage, detectIconFromPackageJson, detectIconsFromHtml } from "../lib/icons.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const SYSTEMS = path.join(ROOT, "systems");
const OUT = path.join(ROOT, "data/discovered-icons.json");
const UA = "Mozilla/5.0 (compatible; designsourcebook/0.1; +https://github.com/)";

// Verified canonical icon systems shipped alongside named design systems
// where token packages alone omit the UI icon sibling dependency.
const CANONICAL_ICON_MAP = {
  apple: { library: "SF Symbols", package: null, style: "outline", grid: 20, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://developer.apple.com/sf-symbols/" },
  google: { library: "Material Symbols", package: "material-symbols", pack: "material", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://fonts.google.com/icons" },
  material: { library: "Material Icons", package: "@material-design-icons/svg", pack: "material", style: "outline", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://fonts.google.com/icons" },
  materialize: { library: "Material Icons", package: "material-design-icons", pack: "material", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://materializecss.com/icons.html" },
  mui: { library: "Material Icons", package: "@mui/icons-material", pack: "material", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://mui.com/material-ui/material-icons/" },
  backstage: { library: "Material Icons", package: "@material-ui/icons", pack: "material", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://backstage.io" },
  ibm: { library: "Carbon Icons", package: "@carbon/icons-react", pack: "carbon", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://carbondesignsystem.com/elements/icons/library/" },
  carbon: { library: "Carbon Icons", package: "@carbon/icons-react", pack: "carbon", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://carbondesignsystem.com/elements/icons/library/" },
  primer: { library: "Octicons", package: "@primer/octicons-react", pack: "octicons", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://primer.style/foundations/icons/" },
  fluent: { library: "Fluent System Icons", package: "@fluentui/react-icons", pack: "fluent", style: "outline", grid: 20, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://fluent2.microsoft.design/iconography" },
  atlassian: { library: "Atlassian Icons", package: "@atlaskit/icon", style: "outline", grid: 16, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://atlassian.design/components/icon" },
  polaris: { library: "Polaris Icons", package: "@shopify/polaris-icons", pack: "polaris", style: "solid", grid: 20, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://polaris.shopify.com/icons" },
  radix: { library: "Radix Icons", package: "@radix-ui/react-icons", pack: "radix", style: "solid", grid: 15, strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://www.radix-ui.com/icons" },
  "radix-themes": { library: "Radix Icons", package: "@radix-ui/react-icons", pack: "radix", style: "solid", grid: 15, strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://www.radix-ui.com/icons" },
  "shadcn-ui": { library: "Lucide", package: "lucide-react", pack: "lucide", style: "outline", grid: 24, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://lucide.dev" },
  vercel: { library: "Geist Icons", package: "geist", style: "outline", grid: 16, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://vercel.com/geist/icons" },
  "linear-app": { library: "Linear UI Icons", package: null, style: "outline", grid: 16, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://linear.app" },
  bootstrap: { library: "Bootstrap Icons", package: "bootstrap-icons", pack: "bootstrap", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://icons.getbootstrap.com" },
  boosted: { library: "Solaris / Bootstrap Icons", package: "bootstrap-icons", pack: "bootstrap", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://boosted.orange.com" },
  italia: { library: "Bootstrap Italia Icons", package: "bootstrap-italia", pack: "bootstrap", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://italia.github.io/bootstrap-italia/" },
  shoelace: { library: "Bootstrap Icons", package: "bootstrap-icons", pack: "bootstrap", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://shoelace.style/components/icon" },
  singapore: { library: "Bootstrap Icons / SGDS", package: "bootstrap-icons", pack: "bootstrap", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://designsystem.tech.gov.sg" },
  flowbite: { library: "Flowbite Icons", package: "flowbite-icons", pack: "flowbite", style: "outline", grid: 24, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://flowbite.com/icons/" },
  antd: { library: "Ant Design Icons", package: "@ant-design/icons", pack: "antd", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://ant.design/components/icon" },
  chakra: { library: "Lucide / Chakra Icons", package: "lucide-react", pack: "lucide", style: "outline", grid: 24, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://chakra-ui.com" },
  cal: { library: "Lucide", package: "lucide-react", pack: "lucide", style: "outline", grid: 24, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://lucide.dev" },
  supabase: { library: "Lucide", package: "lucide-react", pack: "lucide", style: "outline", grid: 24, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://lucide.dev" },
  untitled: { library: "Untitled / Lucide Icons", package: "lucide-react", pack: "lucide", style: "outline", grid: 24, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://www.untitledui.com/icons" },
  mantine: { library: "Tabler Icons", package: "@tabler/icons-react", pack: "tabler", style: "outline", grid: 24, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://tabler.io/icons" },
  blueprint: { library: "Blueprint Icons", package: "@blueprintjs/icons", pack: "blueprint", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", source: "npm", url: "https://blueprintjs.com/docs/#icons" },
  patternfly: { library: "PatternFly Icons", package: "@patternfly/react-icons", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://www.patternfly.org/design-foundations/icons" },
  spectrum: { library: "Spectrum Workflow Icons", package: "@spectrum-icons/workflow", style: "solid", grid: 18, strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://spectrum.adobe.com/page/iconography" },
  grommet: { library: "Grommet Icons", package: "grommet-icons", pack: "grommet", style: "outline", grid: 24, strokeWidth: 2, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://icons.grommet.io" },
  hashicorp: { library: "Flight Icons", package: "@hashicorp/flight-icons", pack: "flight", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://helios.hashicorp.design/icons/library" },
  pajamas: { library: "GitLab SVGs", package: "@gitlab/svgs", pack: "gitlab", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://design.gitlab.com/product-foundations/iconography" },
  stacks: { library: "Stacks Icons", package: "@stackoverflow/stacks-icons", pack: "stacks", style: "solid", grid: 20, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://stackoverflow.design/product/components/icons/" },
  cloudflare: { library: "Phosphor Icons", package: "@phosphor-icons/react", pack: "phosphor", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://phosphoricons.com" },
  elastic: { library: "Elastic EUI Icons", package: "@elastic/eui", style: "outline", grid: 16, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://eui.elastic.co" },
  lightning: { library: "SLDS Icons", package: "@salesforce-ux/design-system", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://www.lightningdesignsystem.com/icons/" },
  uswds: { library: "USWDS Icons", package: "@uswds/uswds", pack: "material", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://designsystem.digital.gov/components/icon/" },
  govuk: { library: "GOV.UK Core SVGs", package: "govuk-frontend", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://design-system.service.gov.uk" },
  nhsuk: { library: "NHS.UK Core SVGs", package: "nhsuk-frontend", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://service-manual.nhs.uk" },
  clarity: { library: "Clarity Icons", package: "@cds/core", style: "outline", grid: 36, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://clarity.design/documentation/icons" },
  contentful: { library: "Forma 36 Icons", package: "@contentful/f36-icons", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://f36.contentful.com/components/icon" },
  strapi: { library: "Strapi Icons", package: "@strapi/icons", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://design-system.strapi.io" },
  sanity: { library: "Sanity Icons", package: "@sanity/icons", style: "outline", grid: 25, strokeWidth: 1.2, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://www.sanity.io/ui" },
  siemens: { library: "Siemens iX Icons", package: "@siemens/ix-icons", pack: "siemens", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://ix.siemens.io" },
  duet: { library: "Duet Icons", package: "@duetds/icons", pack: "duet", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://www.duetds.com/icons/" },
  paste: { library: "Paste Icons", package: "@twilio-paste/icons", style: "outline", grid: 20, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://paste.twilio.design/icons/" },
  dhis2: { library: "DHIS2 UI Icons", package: "@dhis2/ui-icons", pack: "dhis2", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://ui.dhis2.nu" },
  workday: { library: "Canvas System Icons", package: "@workday/canvas-system-icons-web", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://canvas.workday.com" },
  sap: { library: "SAP Icons", package: "@ui5/webcomponents-icons", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://sap.github.io/ui5-webcomponents/" },
  semrush: { library: "Intergalactic Icons", package: "@semcore/icon", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://developer.semrush.com/intergalactic/style/icon" },
  semi: { library: "Semi Icons", package: "@douyinfe/semi-icons", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://semi.design/en-US/basic/icon" },
  bytedance: { library: "Arco Design Icons", package: "@arco-design/web-react", style: "outline", grid: 24, strokeWidth: 2, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://arco.design/react/components/icon" },
  tencent: { library: "TDesign Icons", package: "tdesign-icons-react", style: "outline", grid: 16, strokeWidth: 1.5, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://tdesign.tencent.com/react/components/icon" },
  "x-ai": { library: "Heroicons", package: "@heroicons/react", pack: "heroicons", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://heroicons.com" },
  vibe: { library: "Vibe Icons", package: "@vibe/icons", style: "outline", grid: 20, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://vibe.monday.com" },
  nordhealth: { library: "Nordhealth Icons", package: "@nordhealth/icons", style: "outline", grid: 16, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://nordhealth.design/icons" },
  porsche: { library: "Porsche Icons", package: "@porsche-design-system/components-js", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://designsystem.porsche.com" },
  visa: { library: "Visa Nova Icons", package: "@visa/nova-icons-react", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://design.visa.com" },
  orbit: { library: "Orbit Icons", package: "@kiwicom/orbit-components", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://orbit.kiwi/foundation/icons/" },
  evergreen: { library: "Evergreen UI Icons", package: "evergreen-ui", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://evergreen.segment.com/components/icons" },
  coinbase: { library: "Coinbase CDS Icons", package: "@coinbase/cds-icons", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://cds.coinbase.com" },
  mongodb: { library: "LeafyGreen Icons", package: "@leafygreen-ui/icon", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://mongodb.design" },
  moon: { library: "Moon Icons", package: "@heathmont/moon-icons-tw", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://moon.io" },
  telefonica: { library: "Mistica Icons", package: "@telefonica/mistica-icons", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://mistica-web.vercel.app" },
  react95: { library: "React95 Pixel Icons", package: "@react95/icons", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", source: "npm", url: "https://react95.github.io/React95/" },
  priceline: { library: "Priceline Icons", package: "pcln-icons", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm" },
  welcome: { library: "Welcome UI Icons", package: "@welcome-ui/icons", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://www.welcome-ui.com" },
  seeds: { library: "Seeds Icons", package: "@sproutsocial/seeds-icons", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://seeds.sproutsocial.com" },
  foundation: { library: "Foundation Icons", package: "foundation-icons", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm" },
};

async function fetchJson(url) {
  const res = await fetch(url, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(7000) });
  if (!res.ok) return null;
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(7000) });
  if (!res.ok) return null;
  return res.text();
}

async function probeSystem(slug, m) {
  if (CANONICAL_ICON_MAP[slug]) return { ...CANONICAL_ICON_MAP[slug] };

  const pkg = m.source?.package;
  if (pkg) {
    const pkgMeta = await fetchJson(`https://registry.npmjs.org/${encodeURIComponent(pkg)}/latest`).catch(() => null);
    if (pkgMeta) {
      const fromDeps = detectIconFromPackageJson(pkgMeta);
      if (fromDeps) return fromDeps;
    }
    // Check sibling icon package inside the same npm scope (`@scope/icons` or `@scope/react-icons`)
    if (pkg.startsWith("@")) {
      const scope = pkg.split("/")[0];
      for (const cand of [`${scope}/icons`, `${scope}/icons-react`, `${scope}/react-icons`]) {
        const sib = await fetchJson(`https://registry.npmjs.org/${encodeURIComponent(cand)}/latest`).catch(() => null);
        if (sib && sib.name) {
          const matched = matchKnownIconPackage(sib.name, sib.version);
          return matched ? { ...matched, source: "npm" } : {
            library: `${m.displayName || slug} Icons`,
            package: sib.name,
            style: "outline",
            grid: 24,
            strokeWidth: 1.5,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            source: "npm",
            ...(sib.homepage ? { url: sib.homepage } : {}),
          };
        }
      }
    }
  }

  const repo = m.source?.repo;
  if (repo && /^https:\/\/github\.com\/([^/]+)\/([^/#?]+)/i.test(repo)) {
    const [, owner, repoName] = /^https:\/\/github\.com\/([^/]+)\/([^/#?]+)/i.exec(repo);
    const cleanRepo = repoName.replace(/\.git$/, "");
    for (const branch of ["main", "master"]) {
      const rawPkg = await fetchJson(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/${branch}/package.json`).catch(() => null);
      if (rawPkg) {
        const fromRepo = detectIconFromPackageJson(rawPkg);
        if (fromRepo) return { ...fromRepo, source: "repo" };
        break;
      }
    }
  }

  const url = m.homepage || m.source?.url;
  if (url && /^https?:\/\//i.test(url)) {
    let host = "";
    try { host = new URL(url).hostname.replace(/^www\./, "").toLowerCase(); } catch {}
    // Never scan GitHub/GitLab/Bitbucket/npm UI chrome for third-party systems' icons.
    if (host && !/^(github\.com|gitlab\.com|bitbucket\.org|npmjs\.com)$/.test(host)) {
      const html = await fetchText(url).catch(() => null);
      if (html) {
        const fromHtml = detectIconsFromHtml(html);
        if (fromHtml) return fromHtml;
      }
    }
  }

  return null;
}

async function main() {
  const dirs = fs.readdirSync(SYSTEMS, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();
  const tasks = [];
  for (const slug of dirs) {
    const mp = path.join(SYSTEMS, slug, "manifest.json");
    if (!fs.existsSync(mp)) continue;
    const m = JSON.parse(fs.readFileSync(mp, "utf8"));
    if (m.provenance === "listed") continue;
    tasks.push({ slug, m });
  }

  const results = {};
  let hits = 0;
  const BATCH = 14;
  for (let i = 0; i < tasks.length; i += BATCH) {
    const slice = tasks.slice(i, i + BATCH);
    await Promise.all(slice.map(async ({ slug, m }) => {
      const got = await probeSystem(slug, m);
      if (got) {
        results[slug] = got;
        hits++;
      }
    }));
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(results, null, 2) + "\n", "utf8");
  console.log(`Discovered/verified icon metadata for ${Object.keys(results).length}/${tasks.length} systems (hits this run: ${hits}).`);
}

main();
