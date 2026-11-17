// Discover and verify official icon libraries & SVG specs across registry systems
// by querying npm package metadata, sibling workspace icon packages, GitHub raw
// package.json files, and documented design-system icon catalogs.
//
// Usage: node scripts/discover-icons.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { matchKnownIconPackage, detectIconFromPackageJson, detectIconsFromHtml, inspectSvgSnippets, inferPackId } from "../lib/icons.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const SYSTEMS = path.join(ROOT, "systems");
const OUT = path.join(ROOT, "data/discovered-icons.json");
const UA = "Mozilla/5.0 (compatible; designsourcebook/0.1; +https://github.com/)";

// Verified canonical icon systems shipped alongside named design systems
// where token packages alone omit the UI icon sibling dependency.
const CANONICAL_ICON_MAP = {
  apple: { library: "SF Symbols", package: null, style: "outline", grid: 20, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", proprietary: true, url: "https://developer.apple.com/sf-symbols/" },
  google: { library: "Material Symbols", package: "@material-symbols/svg-400", pack: "material-symbols", style: "outline", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://fonts.google.com/icons" },
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
  patternfly: { library: "PatternFly Icons", package: "@patternfly/react-icons", pack: "patternfly", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://www.patternfly.org/design-foundations/icons" },
  spectrum: { library: "Spectrum Workflow Icons", package: "@spectrum-icons/workflow", style: "solid", grid: 18, strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://spectrum.adobe.com/page/iconography" },
  grommet: { library: "Grommet Icons", package: "grommet-icons", pack: "grommet", style: "outline", grid: 24, strokeWidth: 2, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://icons.grommet.io" },
  hashicorp: { library: "Flight Icons", package: "@hashicorp/flight-icons", pack: "flight", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://helios.hashicorp.design/icons/library" },
  pajamas: { library: "GitLab SVGs", package: "@gitlab/svgs", pack: "gitlab", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://design.gitlab.com/product-foundations/iconography" },
  stacks: { library: "Stacks Icons", package: "@stackoverflow/stacks-icons", pack: "stacks", style: "solid", grid: 20, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://stackoverflow.design/product/components/icons/" },
  cloudflare: { library: "Phosphor Icons", package: "@phosphor-icons/react", pack: "phosphor", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://phosphoricons.com" },
  elastic: { library: "Elastic EUI Icons", package: "@elastic/eui", pack: "elastic", style: "outline", grid: 16, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://eui.elastic.co" },
  lightning: { library: "SLDS Icons", package: "@salesforce-ux/design-system", pack: "salesforce", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://www.lightningdesignsystem.com/icons/" },
  salesforce: { library: "SLDS Icons", package: "@salesforce-ux/design-system", pack: "salesforce", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://www.lightningdesignsystem.com/icons/" },
  uswds: { library: "USWDS Icons", package: "@uswds/uswds", pack: "uswds", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://designsystem.digital.gov/components/icon/" },
  cms: { library: "USWDS / CMS Icons", package: "@uswds/uswds", pack: "uswds", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://design.cms.gov" },
  govuk: { library: "GOV.UK Core SVGs", package: "govuk-frontend", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://design-system.service.gov.uk" },
  nhsuk: { library: "NHS.UK Core SVGs", package: "nhsuk-frontend", pack: "nhsuk", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://service-manual.nhs.uk" },
  clarity: { library: "Clarity Icons", package: "@cds/core", pack: "clarity", style: "outline", grid: 36, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://clarity.design/documentation/icons" },
  contentful: { library: "Forma 36 Icons", package: "@contentful/f36-icons", pack: "phosphor", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://f36.contentful.com/components/icon" },
  strapi: { library: "Strapi Icons", package: "@strapi/icons", pack: "phosphor", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://design-system.strapi.io" },
  sanity: { library: "Sanity Icons", package: "@sanity/icons", pack: "sanity", style: "outline", grid: 25, strokeWidth: 1.2, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://www.sanity.io/ui" },
  siemens: { library: "Siemens iX Icons", package: "@siemens/ix-icons", pack: "siemens", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://ix.siemens.io" },
  duet: { library: "Duet Icons", package: "@duetds/icons", pack: "duet", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://www.duetds.com/icons/" },
  paste: { library: "Paste Icons", package: "@twilio-paste/icons", pack: "paste", style: "outline", grid: 20, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://paste.twilio.design/icons/" },
  dhis2: { library: "DHIS2 UI Icons", package: "@dhis2/ui-icons", pack: "dhis2", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://ui.dhis2.nu" },
  workday: { library: "Canvas System Icons", package: "@workday/canvas-system-icons-web", pack: "workday", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://canvas.workday.com" },
  sap: { library: "SAP Icons", package: "@ui5/webcomponents-icons", pack: "ui5", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://sap.github.io/ui5-webcomponents/" },
  semrush: { library: "Intergalactic Icons", package: "@semcore/icon", pack: "semrush", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://developer.semrush.com/intergalactic/style/icon" },
  semi: { library: "Semi Icons", package: "@douyinfe/semi-icons", pack: "semi", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://semi.design/en-US/basic/icon" },
  bytedance: { library: "Arco Design Icons", package: "@arco-design/web-react", pack: "arco", style: "outline", grid: 24, strokeWidth: 2, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://arco.design/react/components/icon" },
  tencent: { library: "TDesign Icons", package: "tdesign-icons-react", pack: "tdesign", style: "outline", grid: 16, strokeWidth: 1.5, strokeLinecap: "square", strokeLinejoin: "miter", source: "curated", url: "https://tdesign.tencent.com/react/components/icon" },
  "x-ai": { library: "Heroicons", package: "@heroicons/react", pack: "heroicons", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://heroicons.com" },
  vibe: { library: "Vibe Icons", package: "@vibe/icons", style: "outline", grid: 20, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://vibe.monday.com" },
  nordhealth: { library: "Nordhealth Icons", package: "@nordhealth/icons", pack: "nordhealth", style: "outline", grid: 16, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://nordhealth.design/icons" },
  porsche: { library: "Porsche Icons", package: "@porsche-design-system/components-js", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://designsystem.porsche.com" },
  visa: { library: "Visa Nova Icons", package: "@visa/nova-icons-react", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://design.visa.com" },
  orbit: { library: "Orbit Icons", package: "@kiwicom/orbit-components", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://orbit.kiwi/foundation/icons/" },
  evergreen: { library: "Evergreen UI Icons", package: "evergreen-ui", pack: "evergreen", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://evergreen.segment.com/components/icons" },
  coinbase: { library: "Coinbase CDS Icons", package: "@coinbase/cds-icons", pack: "coinbase", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://cds.coinbase.com" },
  mongodb: { library: "LeafyGreen Icons", package: "@leafygreen-ui/icon", pack: "leafygreen", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://mongodb.design" },
  moon: { library: "Moon Icons", package: "@heathmont/moon-icons-tw", pack: "moon", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://moon.io" },
  telefonica: { library: "Mistica Icons", package: "@telefonica/mistica-icons", pack: "telefonica", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://mistica-web.vercel.app" },
  react95: { library: "React95 Pixel Icons", package: "@react95/icons", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", source: "npm", url: "https://react95.github.io/React95/" },
  priceline: { library: "Priceline Icons", package: "pcln-icons", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm" },
  welcome: { library: "Welcome UI Icons", package: "@welcome-ui/icons", pack: "welcome", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://www.welcome-ui.com" },
  seeds: { library: "Seeds Icons", package: "@sproutsocial/seeds-icons", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://seeds.sproutsocial.com" },
  foundation: { library: "Foundation Icons", package: "foundation-icons", pack: "foundation", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm" },
  ebay: { library: "eBay Evo Icons", package: "@ebay/skin", pack: "ebay", style: "outline", grid: 16, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://opensource.ebay.com/skin/" },
  "artsy-palette": { library: "Artsy Icons", package: "@artsy/icons", pack: "artsy", style: "solid", grid: 18, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://palette.artsy.net" },
  vaadin: { library: "Vaadin Lumo Icons", package: "@vaadin/icons", pack: "vaadin", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://vaadin.com/components" },
  mailru: { library: "VK / Paradigm Icons", package: "@vkontakte/icons", pack: "vkontakte", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "npm", url: "https://vkcom.github.io/icons/" },
  heroku: { library: "Salesforce SLDS Icons", package: "@salesforce-ux/design-system", pack: "salesforce", style: "solid", grid: 20, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "curated", url: "https://design.herokai.com" },
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

async function harvestSvgsFromFlat(baseCdnUrl, flatUrl, { maxSamples = 8 } = {}) {
  const flat = await fetchJson(flatUrl).catch(() => null);
  const files = (flat?.files || []).map((f) => f.name);
  if (!files.length) return null;

  const isIconSvg = (p) =>
    /\.svg$/i.test(p) &&
    /(?:^|\/)(?:icons?|svgs?|glyphs?|symbols?|assets\/(?:icons?|svg)|img)\/[^/]+\.svg$/i.test(p) &&
    !/logo|wordmark|brand|flag|illustration|emoji|spinner|banner|avatar|favicon|crest|mask|social|twitter|github|linkedin|youtube|facebook|instagram|corner-radius|pointer|placeholder|skeleton|diagram|hero|badge/i.test(p);

  const candidates = files.filter(isIconSvg);
  if (!candidates.length) return null;

  const priority = /(?:home|search|check|close|add|plus|arrow-right|arrow_forward|chevron-down|settings|gear|bell|user|folder|code|edit|trash|filter|menu|info)/i;
  candidates.sort((a, b) => (priority.test(a) ? 0 : 1) - (priority.test(b) ? 0 : 1) || a.length - b.length);
  const picks = candidates.slice(0, 14);
  const items = [];
  await Promise.all(
    picks.map(async (p) => {
      const svg = await fetchText(`${baseCdnUrl}${p}`).catch(() => null);
      if (svg && /<svg\b/i.test(svg)) {
        const stem = path.posix.basename(p, ".svg");
        items.push({ name: stem, svg });
      }
    })
  );
  if (!items.length) return null;
  const inspected = inspectSvgSnippets(items, { maxSamples });
  if (!inspected?.samples || inspected.samples.length < 2) return null;
  const unnamed = inspected.samples.filter((s) => /^ui-\d+$/.test(s.name)).length;
  if (unnamed > Math.floor(inspected.samples.length / 2)) return null;
  return inspected;
}

async function probeSystem(slug, m) {
  let result = CANONICAL_ICON_MAP[slug] ? { ...CANONICAL_ICON_MAP[slug] } : null;
  if (!result && slug === "atlassian") result = { ...CANONICAL_ICON_MAP.atlassian };
  if (result) {
    result.pack = result.pack || inferPackId(result) || undefined;
    if (result.pack || result.proprietary) {
      delete result.proprietary;
      return result;
    }
  }

  const pkg = result?.package || m.source?.package;
  if (pkg) {
    const pkgMeta = await fetchJson(`https://registry.npmjs.org/${encodeURIComponent(pkg)}/latest`).catch(() => null);
    if (!result && pkgMeta) {
      const fromDeps = detectIconFromPackageJson(pkgMeta);
      if (fromDeps) result = fromDeps;
    }
    if (!result && pkg.startsWith("@")) {
      const scope = pkg.split("/")[0];
      for (const cand of [`${scope}/icons`, `${scope}/icons-react`, `${scope}/react-icons`]) {
        const sib = await fetchJson(`https://registry.npmjs.org/${encodeURIComponent(cand)}/latest`).catch(() => null);
        if (sib && sib.name) {
          const matched = matchKnownIconPackage(sib.name, sib.version);
          result = matched ? { ...matched, source: "npm" } : {
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
          break;
        }
      }
    }
    if (result) {
      result.pack = result.pack || inferPackId(result) || undefined;
      if (result.pack) return result;
    }
    // Check if the npm package ships standalone .svg icon files directly
    if (pkgMeta?.version) {
      const harvestedNpm = await harvestSvgsFromFlat(
        `https://cdn.jsdelivr.net/npm/${pkg}@${pkgMeta.version}`,
        `https://data.jsdelivr.com/v1/package/npm/${pkg}@${pkgMeta.version}/flat`
      ).catch(() => null);
      if (harvestedNpm?.samples?.length) {
        return result
          ? { ...result, grid: harvestedNpm.grid || result.grid, samples: harvestedNpm.samples, source: "npm" }
          : { library: `${m.displayName || slug} Icons`, package: pkg, ...harvestedNpm, source: "npm" };
      }
    }
  }

  const repo = m.source?.repo;
  if (repo && /^https:\/\/github\.com\/([^/]+)\/([^/#?]+)/i.test(repo)) {
    const [, owner, repoName] = /^https:\/\/github\.com\/([^/]+)\/([^/#?]+)/i.exec(repo);
    const cleanRepo = repoName.replace(/\.git$/, "");
    for (const branch of ["main", "master"]) {
      if (!result) {
        const rawPkg = await fetchJson(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/${branch}/package.json`).catch(() => null);
        if (rawPkg) {
          const fromRepo = detectIconFromPackageJson(rawPkg);
          if (fromRepo) {
            result = { ...fromRepo, source: "repo" };
            result.pack = result.pack || inferPackId(result) || undefined;
            if (result.pack) return result;
          }
        }
      }
      const harvestedGh = await harvestSvgsFromFlat(
        `https://cdn.jsdelivr.net/gh/${owner}/${cleanRepo}@${branch}`,
        `https://data.jsdelivr.com/v1/package/gh/${owner}/${cleanRepo}@${branch}/flat`
      ).catch(() => null);
      if (harvestedGh?.samples?.length) {
        return result
          ? { ...result, grid: harvestedGh.grid || result.grid, samples: harvestedGh.samples, source: "repo" }
          : { library: `${m.displayName || slug} Repo SVGs`, package: pkg || null, ...harvestedGh, source: "repo" };
      }
    }
  }

  const url = m.homepage || m.source?.url;
  if (url && /^https?:\/\//i.test(url)) {
    let host = "";
    try { host = new URL(url).hostname.replace(/^www\./, "").toLowerCase(); } catch {}
    // Only extract explicit icon-library stylesheet signals from docs HTML; skip noisy DOM <svg> scrapes.
    if (host && !/^(github\.com|gitlab\.com|bitbucket\.org|npmjs\.com)$/.test(host)) {
      const html = await fetchText(url).catch(() => null);
      if (html) {
        const fromHtml = detectIconsFromHtml(html, { allowDomSvgs: false });
        if (fromHtml) {
          fromHtml.pack = fromHtml.pack || inferPackId(fromHtml) || undefined;
          return result || fromHtml;
        }
      }
    }
  }

  return result;
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
