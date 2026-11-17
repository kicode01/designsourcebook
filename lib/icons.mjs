// Iconography & SVG specification helpers:
// detect official icon packages from npm/repo/HTML sources, measure SVG geometry,
// and derive honest system-matched inline SVG rules when no package is published.

const ICON_PACKAGES = [
  { re: /^lucide(?:-react|-vue-next|-svelte|-solid)?$/i, library: "Lucide", pkg: "lucide-react", grid: 24, style: "outline", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", url: "https://lucide.dev" },
  { re: /^@heroicons\//i, library: "Heroicons", pkg: "@heroicons/react", grid: 24, style: "outline", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", url: "https://heroicons.com" },
  { re: /^@radix-ui\/react-icons$/i, library: "Radix Icons", pkg: "@radix-ui/react-icons", grid: 15, style: "solid", strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", url: "https://www.radix-ui.com/icons" },
  { re: /^@primer\/octicons/i, library: "Octicons", pkg: "@primer/octicons-react", grid: 16, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://primer.style/foundations/icons" },
  { re: /^@carbon\/icons/i, library: "Carbon Icons", pkg: "@carbon/icons-react", grid: 16, style: "solid", strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", url: "https://carbondesignsystem.com/elements/icons/library" },
  { re: /^@fluentui\/(?:react|svg)-icons$/i, library: "Fluent System Icons", pkg: "@fluentui/react-icons", grid: 20, style: "outline", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", url: "https://fluent2.microsoft.design/iconography" },
  { re: /^@shopify\/polaris-icons$/i, library: "Polaris Icons", pkg: "@shopify/polaris-icons", grid: 20, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://polaris.shopify.com/icons" },
  { re: /^@ant-design\/icons/i, library: "Ant Design Icons", pkg: "@ant-design/icons", grid: 16, style: "outline", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", url: "https://ant.design/components/icon" },
  { re: /^@atlaskit\/icon/i, library: "Atlassian Icons", pkg: "@atlaskit/icon", grid: 16, style: "outline", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", url: "https://atlassian.design/components/icon" },
  { re: /^bootstrap-icons$/i, library: "Bootstrap Icons", pkg: "bootstrap-icons", grid: 16, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://icons.getbootstrap.com" },
  { re: /^@tabler\/icons/i, library: "Tabler Icons", pkg: "@tabler/icons-react", grid: 24, style: "outline", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", url: "https://tabler.io/icons" },
  { re: /^(?:@phosphor-icons\/|phosphor-react$)/i, library: "Phosphor Icons", pkg: "@phosphor-icons/react", grid: 24, style: "outline", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", url: "https://phosphoricons.com" },
  { re: /^@blueprintjs\/icons$/i, library: "Blueprint Icons", pkg: "@blueprintjs/icons", grid: 16, style: "solid", strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", url: "https://blueprintjs.com/docs/#icons" },
  { re: /^@patternfly\/react-icons$/i, library: "PatternFly Icons", pkg: "@patternfly/react-icons", grid: 16, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://www.patternfly.org/design-foundations/icons" },
  { re: /^@spectrum-icons\//i, library: "Spectrum Workflow Icons", pkg: "@spectrum-icons/workflow", grid: 18, style: "solid", strokeWidth: 0, strokeLinecap: "square", strokeLinejoin: "miter", url: "https://spectrum.adobe.com/page/iconography" },
  { re: /^grommet-icons$/i, library: "Grommet Icons", pkg: "grommet-icons", grid: 24, style: "outline", strokeWidth: 2, strokeLinecap: "square", strokeLinejoin: "miter", url: "https://icons.grommet.io" },
  { re: /^@douyinfe\/semi-icons$/i, library: "Semi Icons", pkg: "@douyinfe/semi-icons", grid: 24, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://semi.design/en-US/basic/icon" },
  { re: /^tdesign-icons/i, library: "TDesign Icons", pkg: "tdesign-icons-react", grid: 16, style: "outline", strokeWidth: 1.5, strokeLinecap: "square", strokeLinejoin: "miter", url: "https://tdesign.tencent.com/react/components/icon" },
  { re: /^@contentful\/f36-icons$/i, library: "Forma 36 Icons", pkg: "@contentful/f36-icons", grid: 24, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://f36.contentful.com/components/icon" },
  { re: /^@strapi\/icons$/i, library: "Strapi Icons", pkg: "@strapi/icons", grid: 24, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://design-system.strapi.io" },
  { re: /^@sanity\/icons$/i, library: "Sanity Icons", pkg: "@sanity/icons", grid: 25, style: "outline", strokeWidth: 1.2, strokeLinecap: "round", strokeLinejoin: "round", url: "https://www.sanity.io/ui" },
  { re: /^@siemens\/ix-icons$/i, library: "Siemens iX Icons", pkg: "@siemens/ix-icons", grid: 24, style: "outline", strokeWidth: 1.5, strokeLinecap: "square", strokeLinejoin: "miter", url: "https://ix.siemens.io" },
  { re: /^@duetds\/icons$/i, library: "Duet Icons", pkg: "@duetds/icons", grid: 24, style: "outline", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", url: "https://www.duetds.com/icons" },
  { re: /^@twilio-paste\/icons$/i, library: "Paste Icons", pkg: "@twilio-paste/icons", grid: 20, style: "outline", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", url: "https://paste.twilio.design/icons" },
  { re: /^@dhis2\/ui-icons$/i, library: "DHIS2 UI Icons", pkg: "@dhis2/ui-icons", grid: 24, style: "outline", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", url: "https://ui.dhis2.nu" },
  { re: /^@workday\/canvas-(?:system|accent)-icons/i, library: "Canvas System Icons", pkg: "@workday/canvas-system-icons-web", grid: 24, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://canvas.workday.com" },
  { re: /^@ui5\/webcomponents-icons$/i, library: "SAP Icons", pkg: "@ui5/webcomponents-icons", grid: 16, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://sap.github.io/ui5-webcomponents" },
  { re: /^@semcore\/icon$/i, library: "Intergalactic Icons", pkg: "@semcore/icon", grid: 16, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://developer.semrush.com/intergalactic/style/icon" },
  { re: /^@mui\/icons-material$/i, library: "Material Icons", pkg: "@mui/icons-material", grid: 24, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://mui.com/material-ui/material-icons" },
  { re: /^@vibe\/icons$|^monday-ui-react-core$/i, library: "Vibe Icons", pkg: "@vibe/icons", grid: 20, style: "outline", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", url: "https://vibe.monday.com" },
  { re: /^@elastic\/eui$/i, library: "EUI Icons", pkg: "@elastic/eui", grid: 16, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://eui.elastic.co" },
  { re: /^@coinbase\/cds-icons$/i, library: "Coinbase CDS Icons", pkg: "@coinbase/cds-icons", grid: 24, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://cds.coinbase.com" },
  { re: /^@leafygreen-ui\/icon$/i, library: "LeafyGreen Icons", pkg: "@leafygreen-ui/icon", grid: 16, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://www.mongodb.design" },
  { re: /^@salesforce-ux\/design-system$/i, library: "Salesforce SLDS Icons", pkg: "@salesforce-ux/design-system", grid: 52, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://www.lightningdesignsystem.com/icons/" },
  { re: /^@uswds\/uswds$/i, library: "USWDS Icons", pkg: "@uswds/uswds", grid: 24, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://designsystem.digital.gov/components/icon/" },
  { re: /^@cds\/core$/i, library: "Clarity Icons", pkg: "@cds/core", grid: 36, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://clarity.design/documentation/icons" },
  { re: /^@arco-design\/(?:web-react|icon)$/i, library: "Arco Design Icons", pkg: "@arco-design/web-react", grid: 48, style: "outline", strokeWidth: 4, strokeLinecap: "butt", strokeLinejoin: "miter", url: "https://arco.design/react/components/icon" },
  { re: /^@telefonica\/mistica-icons$/i, library: "Mística Icons", pkg: "@telefonica/mistica-icons", grid: 24, style: "outline", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", url: "https://mistica.telefonica.com" },
  { re: /^@nordhealth\/icons$/i, library: "Nord Icons", pkg: "@nordhealth/icons", grid: 16, style: "outline", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", url: "https://nordhealth.design/icons/" },
  { re: /^foundation-icons$/i, library: "Foundation Icons", pkg: "foundation-icons", grid: 100, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://zurb.com/playground/foundation-icon-fonts-3" },
  { re: /^nhsuk-frontend$/i, library: "NHS.UK Icons", pkg: "nhsuk-frontend", grid: 24, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://service-manual.nhs.uk/design-system/styles/icons" },
  { re: /^@ebay\/skin$/i, library: "eBay Evo Icons", pkg: "@ebay/skin", grid: 24, style: "outline", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", url: "https://opensource.ebay.com/skin/" },
  { re: /^@artsy\/icons$/i, library: "Artsy Icons", pkg: "@artsy/icons", grid: 18, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://palette.artsy.net" },
  { re: /^@vkontakte\/icons$/i, library: "VK Icons", pkg: "@vkontakte/icons", grid: 24, style: "outline", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", url: "https://vkcom.github.io/icons/" },
  { re: /^@welcome-ui\/icons$/i, library: "Welcome UI Icons", pkg: "@welcome-ui/icons", grid: 20, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://www.welcome-ui.com" },
  { re: /^evergreen-ui$/i, library: "Evergreen UI Icons", pkg: "evergreen-ui", grid: 16, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://evergreen.segment.com/components/icons" },
  { re: /^@vaadin\/icons$/i, library: "Vaadin Lumo Icons", pkg: "@vaadin/icons", grid: 16, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://vaadin.com/components" },
  { re: /^@heathmont\/moon-icons/i, library: "Moon Icons", pkg: "@heathmont/moon-icons-tw", grid: 24, style: "outline", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", url: "https://moon.io" },
  { re: /^@skyscanner\/bpk-svgs$/i, library: "Backpack Icons", pkg: "@skyscanner/bpk-svgs", grid: 24, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://www.skyscanner.design/latest/components/icon/" },
  { re: /^@gouvfr\/dsfr$/i, library: "DSFR Icons", pkg: "@gouvfr/dsfr", grid: 24, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://www.systeme-de-design.gouv.fr/version-courante/fr/fondamentaux/icone" },
  { re: /^@kiwicom\/orbit-components$/i, library: "Orbit Icons", pkg: "@kiwicom/orbit-components", grid: 24, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://orbit.kiwi/foundation/icons/" },
  { re: /^@pluralsight\/icons$/i, library: "Pluralsight Icons", pkg: "@pluralsight/icons", grid: 24, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://design.pluralsight.com" },
  { re: /^@grafana\/ui$/i, library: "Grafana Icons", pkg: "@grafana/ui", grid: 24, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://developers.grafana.com/ui/latest/index.html" },
  { re: /^feather-icons$|^react-feather$/i, library: "Feather Icons", pkg: "feather-icons", grid: 24, style: "outline", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", url: "https://feathericons.com" },
  { re: /^remixicon$/i, library: "Remix Icon", pkg: "remixicon", grid: 24, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://remixicon.com" },
  { re: /^@chakra-ui\/icons$/i, library: "Chakra UI Icons", pkg: "@chakra-ui/icons", grid: 24, style: "solid", strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", url: "https://chakra-ui.com" },
];

export function matchKnownIconPackage(depName, version = null) {
  if (!depName) return null;
  for (const entry of ICON_PACKAGES) {
    if (entry.re.test(depName)) {
      return {
        library: entry.library,
        package: entry.pkg || depName,
        ...(version ? { version } : {}),
        style: entry.style,
        grid: entry.grid,
        strokeWidth: entry.strokeWidth,
        strokeLinecap: entry.strokeLinecap,
        strokeLinejoin: entry.strokeLinejoin,
        url: entry.url || undefined,
      };
    }
  }
  return null;
}

export function detectIconFromPackageJson(pkgJson) {
  if (!pkgJson || typeof pkgJson !== "object") return null;
  const pools = [
    pkgJson.dependencies,
    pkgJson.peerDependencies,
    pkgJson.optionalDependencies,
    pkgJson.devDependencies,
  ];
  for (const pool of pools) {
    if (!pool || typeof pool !== "object") continue;
    for (const [dep, ver] of Object.entries(pool)) {
      const m = matchKnownIconPackage(dep, typeof ver === "string" ? ver : null);
      if (m) return { ...m, source: "npm" };
    }
  }
  if (pkgJson.name && /icon/i.test(pkgJson.name)) {
    const m = matchKnownIconPackage(pkgJson.name, pkgJson.version || null);
    if (m) return { ...m, source: "npm" };
  }
  return null;
}

const SAFE_SVG_TAGS = new Set(["path", "circle", "rect", "line", "polyline", "polygon"]);
const ALLOWED_ATTRS = new Set(["d", "cx", "cy", "r", "x", "y", "x1", "y1", "x2", "y2", "width", "height", "rx", "ry", "points", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin"]);

export function sanitizePrimitives(inner, { maxElements = 12, maxLength = 520 } = {}) {
  const cleaned = [];
  const tagRe = /<(path|circle|rect|line|polyline|polygon)\b([^>]*?)\s*\/?>/gi;
  let m;
  while ((m = tagRe.exec(inner))) {
    const tag = m[1].toLowerCase();
    if (!SAFE_SVG_TAGS.has(tag)) continue;
    const attrs = [];
    const attrRe = /([a-zA-Z-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
    let a;
    while ((a = attrRe.exec(m[2]))) {
      const k = a[1].toLowerCase();
      const v = (a[2] ?? a[3] ?? "").trim();
      if (!ALLOWED_ATTRS.has(k)) continue;
      if (/url\(|expression|javascript:/i.test(v)) continue;
      attrs.push(`${k}="${v.replace(/"/g, "")}"`);
    }
    if (attrs.length) cleaned.push(`<${tag} ${attrs.join(" ")}/>`);
    if (cleaned.length >= maxElements) break;
  }
  const joined = cleaned.join("");
  return joined && joined.length <= maxLength ? joined : null;
}

function inferSvgName(attrs, body, fallbackIdx) {
  const explicit =
    /<title>([^<]{2,32})<\/title>/i.exec(body)?.[1] ||
    /(?:aria-label|data-icon|data-lucide|data-testid|name|id)\s*=\s*["']([^"']{2,32})["']/i.exec(attrs)?.[1] ||
    /(?:lucide|bi|icon|fa|octicon|ri)-([a-z0-9-]{2,28})/i.exec(attrs)?.[1] ||
    /\b(menu|search|close|dismiss|lock|chevron|arrow|download|upload|external|home|check|settings|gear|bell|user|folder|code|copy|plus|minus|sun|moon|filter|edit|trash|info|warning)\b/i.exec(attrs)?.[1];
  const clean = explicit
    ? explicit.toLowerCase().replace(/^icon-|-icon$/g, "").replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "").slice(0, 24)
    : "";
  return clean && !/^(svg|icon|glyph|path|wrapper|default|default-color|fill|stroke|none|true|false|primary|secondary)$/.test(clean) ? clean : `ui-${fallbackIdx}`;
}

/** Measure UI `<svg>` specimens and return icon geometry plus up to 8 unique safe glyph samples. */
export function inspectSvgSnippets(items = [], { maxSamples = 8 } = {}) {
  const grids = [];
  const strokeWidths = [];
  const caps = [];
  const joins = [];
  let outlineVotes = 0;
  let solidVotes = 0;
  const samples = [];
  const seenNames = new Set();
  const seenBodies = new Set();

  for (const item of items) {
    const raw = typeof item === "string" ? item : item?.svg || "";
    const providedName = typeof item === "object" && item?.name ? String(item.name) : "";
    if (!raw || raw.length > 8000 || !/<(?:svg|symbol)\b/i.test(raw)) continue;

    const headMatch = /<(?:svg|symbol)\b([^>]*)>([\s\S]*?)<\/(?:svg|symbol)>/i.exec(raw);
    if (!headMatch) continue;
    const attrs = headMatch[1];
    const body = headMatch[2];
    if (/<(?:script|style|foreignObject|image|text|defs|linearGradient|filter)\b/i.test(body)) continue;

    const vbMatch = /viewBox\s*=\s*["']\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*["']/i.exec(attrs);
    const wMatch = /\bwidth\s*=\s*["']?(\d+(?:\.\d+)?)/i.exec(attrs);
    const vbX = vbMatch ? Number(vbMatch[1]) : 0;
    const vbY = vbMatch ? Number(vbMatch[2]) : 0;
    const vbW = vbMatch ? Math.round(Number(vbMatch[3])) : 0;
    const vbH = vbMatch ? Math.round(Number(vbMatch[4])) : 0;
    if (vbMatch && (vbW < 12 || vbH < 12)) continue;
    if (vbW && vbH && Math.abs(vbW - vbH) > Math.max(4, vbW * 0.25)) continue;
    const grid = vbW || (wMatch ? Math.round(Number(wMatch[1])) : 0);
    if (grid >= 12 && grid <= 64) grids.push(grid);

    const swMatch = /stroke-width\s*=\s*["']?(\d+(?:\.\d+)?)/i.exec(attrs + " " + body);
    if (swMatch && Number(swMatch[1]) > 0 && Number(swMatch[1]) <= 6) {
      strokeWidths.push(Number(swMatch[1]));
    }
    const lcMatch = /stroke-linecap\s*=\s*["']?(round|square|butt)/i.exec(attrs + " " + body);
    if (lcMatch) caps.push(lcMatch[1].toLowerCase());
    const ljMatch = /stroke-linejoin\s*=\s*["']?(round|miter|bevel)/i.exec(attrs + " " + body);
    if (ljMatch) joins.push(ljMatch[1].toLowerCase());

    const isStroke = /fill\s*=\s*["']?none/i.test(attrs) || (/\bstroke\s*=/i.test(attrs + " " + body) && !/stroke\s*=\s*["']?none/i.test(attrs));
    if (isStroke) outlineVotes++;
    else solidVotes++;

    const rawName = providedName || inferSvgName(attrs, body, samples.length + 1);
    if (samples.length < maxSamples && grid >= 12 && grid <= 64 && !/logo|brandmark|wordmark|twitter|github|discord|linkedin|youtube|facebook|instagram|slack|spinner/i.test(rawName + " " + attrs + " " + body)) {
      let cleanName = rawName.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "").slice(0, 24);
      if (seenNames.has(cleanName)) cleanName = `${cleanName}-${samples.length + 1}`;
      const normBody = body.replace(/\b(stroke|fill)=["'](?:#000(?:000)?|#1[0-9a-f]{5}|black|white|#fff(?:fff)?)["']/gi, '$1="currentColor"');
      const inner = sanitizePrimitives(normBody);
      if (cleanName && inner && !seenBodies.has(inner)) {
        seenNames.add(cleanName);
        seenBodies.add(inner);
        samples.push({
          name: cleanName,
          viewBox: vbMatch ? `${vbX} ${vbY} ${vbMatch[3]} ${vbMatch[4]}` : `0 0 ${grid} ${grid}`,
          fill: isStroke ? "none" : "currentColor",
          body: inner,
        });
      }
    }
  }

  if (!grids.length && !samples.length) return null;
  const mode = (arr, def) => {
    if (!arr.length) return def;
    const c = new Map();
    for (const v of arr) c.set(v, (c.get(v) || 0) + 1);
    return [...c.entries()].sort((a, b) => b[1] - a[1])[0][0];
  };
  const style = outlineVotes >= solidVotes ? "outline" : "solid";
  return {
    grid: mode(grids, 24),
    style,
    strokeWidth: style === "outline" ? mode(strokeWidths, 1.5) : 0,
    strokeLinecap: mode(caps, "round"),
    strokeLinejoin: mode(joins, "round"),
    samples,
  };
}

/** Detect icon ecosystem hints referenced in HTML CSS classes or font stylesheets. */
export function detectIconsFromHtml(html = "", { allowDomSvgs = true } = {}) {
  if (!html) return null;
  const signals = [
    [/class=["'][^"']*material-symbols-(?:outlined|rounded|sharp)|fonts\.googleapis\.com[^"']*Material\+Symbols/i, { library: "Material Symbols", package: "@material-symbols/svg-400", pack: "material-symbols", style: "outline", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "observed", url: "https://fonts.google.com/icons" }],
    [/class=["'][^"']*material-icons|fonts\.googleapis\.com[^"']*Material\+Icons/i, { library: "Material Icons", package: "@mui/icons-material", pack: "material", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "observed", url: "https://fonts.google.com/icons" }],
    [/class=["'][^"']*\blucide(?:-[a-z0-9-]+)?\b|(?:unpkg\.com|cdn\.jsdelivr\.net)\/[^"']*lucide/i, { library: "Lucide", package: "lucide-react", style: "outline", grid: 24, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", source: "observed", url: "https://lucide.dev" }],
    [/class=["'][^"']*\bheroicon/i, { library: "Heroicons", package: "@heroicons/react", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "observed", url: "https://heroicons.com" }],
    [/class=["'][^"']*\bocticon\b/i, { library: "Octicons", package: "@primer/octicons-react", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "observed", url: "https://primer.style/foundations/icons" }],
    [/class=["'][^"']*\bbi-[a-z0-9-]+|bootstrap-icons(?:\.css|\.svg)/i, { library: "Bootstrap Icons", package: "bootstrap-icons", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "observed", url: "https://icons.getbootstrap.com" }],
    [/class=["'][^"']*\bfa-(?:solid|regular|light|brands)\b|fontawesome\.com/i, { library: "Font Awesome", package: "@fortawesome/fontawesome-free", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "observed", url: "https://fontawesome.com" }],
  ];
  for (const [re, spec] of signals) {
    if (re.test(html)) return { ...spec };
  }
  if (!allowDomSvgs) return null;
  const svgs = [
    ...[...String(html).matchAll(/<svg\b[^>]*>[\s\S]{10,4000}?<\/svg>/gi)].slice(0, 24).map((m) => m[0]),
    ...[...String(html).matchAll(/<symbol\b[^>]*>[\s\S]{10,4000}?<\/symbol>/gi)].slice(0, 24).map((m) => m[0]),
  ];
  const measured = inspectSvgSnippets(svgs, { maxSamples: 8 });
  if (measured) {
    return {
      library: "Inline System SVGs",
      package: null,
      ...measured,
      source: "observed",
    };
  }
  return null;
}

/** Map known icon package or library identifiers to verified official SVG pack keys. */
export function inferPackId(icons) {
  if (!icons) return null;
  if (icons.pack) return icons.pack;
  const hay = `${icons.package || ""} ${icons.library || ""}`.toLowerCase();
  if (/lucide/.test(hay)) return "lucide";
  if (/octicon/.test(hay)) return "octicons";
  if (/carbon/.test(hay)) return "carbon";
  if (/bootstrap-icons|bootstrap icons/.test(hay)) return "bootstrap";
  if (/heroicon/.test(hay)) return "heroicons";
  if (/tabler/.test(hay)) return "tabler";
  if (/phosphor/.test(hay)) return "phosphor";
  if (/polaris-icons/.test(hay)) return "polaris";
  if (/ant-design\/icons|ant design icons/.test(hay)) return "antd";
  if (/fluentui/.test(hay)) return "fluent";
  if (/material-symbols|material symbols/.test(hay)) return "material-symbols";
  if (/material-design-icons|material-icons|material icons/.test(hay)) return "material";
  if (/radix-ui.*icons|radix icons/.test(hay)) return "radix";
  if (/flight-icons/.test(hay)) return "flight";
  if (/gitlab\/svgs|pajamas/.test(hay)) return "gitlab";
  if (/stacks-icons/.test(hay)) return "stacks";
  if (/blueprintjs\/icons/.test(hay)) return "blueprint";
  if (/flowbite-icons/.test(hay)) return "flowbite";
  if (/feather/.test(hay)) return "feather";
  if (/grommet-icons/.test(hay)) return "grommet";
  if (/duetds\/icons/.test(hay)) return "duet";
  if (/siemens\/ix-icons/.test(hay)) return "siemens";
  if (/vtmn\/icons/.test(hay)) return "vitamin";
  if (/dhis2\/ui-icons/.test(hay)) return "dhis2";
  if (/remixicon/.test(hay)) return "remix";
  if (/salesforce-ux|slds/.test(hay)) return "salesforce";
  if (/uswds/.test(hay)) return "uswds";
  if (/workday\/canvas/.test(hay)) return "workday";
  if (/semcore\/icon|intergalactic/.test(hay)) return "semrush";
  if (/tdesign-icons|tdesign/.test(hay)) return "tdesign";
  if (/arco-design/.test(hay)) return "arco";
  if (/elastic\/eui|eui icons/.test(hay)) return "elastic";
  if (/sanity\/icons/.test(hay)) return "sanity";
  if (/contentful\/f36-icons|forma 36/.test(hay)) return "contentful";
  if (/twilio-paste\/icons|paste icons/.test(hay)) return "paste";
  if (/coinbase\/cds-icons/.test(hay)) return "coinbase";
  if (/leafygreen-ui\/icon|leafygreen/.test(hay)) return "leafygreen";
  if (/patternfly\/react-icons|patternfly/.test(hay)) return "patternfly";
  if (/cds\/core|clarity icons/.test(hay)) return "clarity";
  if (/ui5\/webcomponents-icons|sap icons/.test(hay)) return "ui5";
  if (/telefonica\/mistica-icons|m[ií]stica/.test(hay)) return "telefonica";
  if (/nordhealth\/icons|nord icons/.test(hay)) return "nordhealth";
  if (/foundation-icons/.test(hay)) return "foundation";
  if (/nhsuk-frontend|nhs\.uk/.test(hay)) return "nhsuk";
  if (/ebay\/skin|ebay evo/.test(hay)) return "ebay";
  if (/semi-icons|semi design/.test(hay)) return "semi";
  if (/artsy\/icons|artsy/.test(hay)) return "artsy";
  if (/atlaskit\/icon|atlassian icons/.test(hay)) return "atlassian";
  if (/vkontakte\/icons|paradigm icons/.test(hay)) return "vkontakte";
  if (/welcome-ui\/icons|welcome ui icons/.test(hay)) return "welcome";
  if (/evergreen-ui|evergreen ui icons/.test(hay)) return "evergreen";
  if (/vaadin\/icons|vaadin lumo/.test(hay)) return "vaadin";
  if (/moon-icons|moon icons/.test(hay)) return "moon";
  if (/bpk-svgs|backpack icons/.test(hay)) return "backpack";
  if (/gouvfr\/dsfr|dsfr icons/.test(hay)) return "dsfr";
  if (/orbit-components|orbit icons/.test(hay)) return "orbit";
  if (/pluralsight\/icons|pluralsight/.test(hay)) return "pluralsight";
  if (/grafana\/ui|grafana icons/.test(hay)) return "grafana";
  if (/auth0\/cosmos|cosmos icons/.test(hay)) return "auth0";
  if (/wfp\/icons|wfp ui kit icons/.test(hay)) return "carbon";
  return null;
}

/** Deterministic SVG icon specification aligned with a design system's radius and surface language. */
export function deriveIconSpec({ radius = "8px", components = {}, existingIcons = null } = {}) {
  if (existingIcons && existingIcons.library) {
    const pack = inferPackId(existingIcons);
    return {
      library: existingIcons.library,
      package: existingIcons.package || null,
      ...(pack ? { pack } : {}),
      style: existingIcons.style || "outline",
      grid: Number(existingIcons.grid) || 24,
      strokeWidth: Number.isFinite(Number(existingIcons.strokeWidth)) ? Number(existingIcons.strokeWidth) : (existingIcons.style === "solid" ? 0 : 1.5),
      strokeLinecap: existingIcons.strokeLinecap || "round",
      strokeLinejoin: existingIcons.strokeLinejoin || "round",
      source: existingIcons.source || "curated",
      ...(existingIcons.url ? { url: existingIcons.url } : {}),
      ...(Array.isArray(existingIcons.samples) && existingIcons.samples.length ? { samples: existingIcons.samples } : {}),
    };
  }
  const radPx = parseFloat(radius);
  const isSharp = Number.isFinite(radPx) && radPx === 0;
  const isDense = Object.values(components || {}).some((c) => /padding:\s*[0-6]px/i.test(c?.padding || ""));
  return {
    library: "Inline System SVGs",
    package: null,
    style: "outline",
    grid: isDense ? 16 : 20,
    strokeWidth: isSharp ? 1.5 : 1.75,
    strokeLinecap: isSharp ? "square" : "round",
    strokeLinejoin: isSharp ? "miter" : "round",
    source: "derived",
  };
}
