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
  { re: /^(?:@chakra-ui\/icons|feather-icons|react-feather|remixicon|@elastic\/eui)$/i, library: "System SVG Icons", pkg: null, grid: 16, style: "outline", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", url: null },
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

function sanitizePrimitives(inner) {
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
    if (cleaned.length >= 12) break;
  }
  const joined = cleaned.join("");
  return joined && joined.length <= 520 ? joined : null;
}

/** Measure UI `<svg>` specimens and return icon geometry plus up to 4 safe glyph samples. */
export function inspectSvgSnippets(items = [], { maxSamples = 4 } = {}) {
  const grids = [];
  const strokeWidths = [];
  const caps = [];
  const joins = [];
  let outlineVotes = 0;
  let solidVotes = 0;
  const samples = [];
  const seenNames = new Set();

  for (const item of items) {
    const raw = typeof item === "string" ? item : item?.svg || "";
    const label = typeof item === "object" && item?.name ? String(item.name) : `glyph-${samples.length + 1}`;
    if (!raw || raw.length > 6000 || !/<svg\b/i.test(raw)) continue;

    const headMatch = /<svg\b([^>]*)>([\s\S]*?)<\/svg>/i.exec(raw);
    if (!headMatch) continue;
    const attrs = headMatch[1];
    const body = headMatch[2];
    if (/<(?:script|style|foreignObject|image|text|defs|linearGradient|filter)\b/i.test(body)) continue;

    const vbMatch = /viewBox\s*=\s*["']\s*0\s+0\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*["']/i.exec(attrs);
    const wMatch = /\bwidth\s*=\s*["']?(\d+(?:\.\d+)?)/i.exec(attrs);
    const vbW = vbMatch ? Math.round(Number(vbMatch[1])) : 0;
    const vbH = vbMatch ? Math.round(Number(vbMatch[2])) : 0;
    if (vbW && vbH && Math.abs(vbW - vbH) > 4) continue;
    const grid = vbW || (wMatch ? Math.round(Number(wMatch[1])) : 0);
    if (grid >= 12 && grid <= 32) grids.push(grid);

    const swMatch = /stroke-width\s*=\s*["']?(\d+(?:\.\d+)?)/i.exec(attrs + " " + body);
    if (swMatch && Number(swMatch[1]) > 0 && Number(swMatch[1]) <= 4) {
      strokeWidths.push(Number(swMatch[1]));
    }
    const lcMatch = /stroke-linecap\s*=\s*["']?(round|square|butt)/i.exec(attrs + " " + body);
    if (lcMatch) caps.push(lcMatch[1].toLowerCase());
    const ljMatch = /stroke-linejoin\s*=\s*["']?(round|miter|bevel)/i.exec(attrs + " " + body);
    if (ljMatch) joins.push(ljMatch[1].toLowerCase());

    const isStroke = /fill\s*=\s*["']?none/i.test(attrs) || /\bstroke\s*=/i.test(attrs + " " + body);
    if (isStroke) outlineVotes++;
    else solidVotes++;

    if (samples.length < maxSamples && grid >= 12 && grid <= 32 && !/logo|brandmark/i.test(label + " " + attrs)) {
      const cleanName = label.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "").slice(0, 24);
      if (cleanName && !seenNames.has(cleanName)) {
        const inner = sanitizePrimitives(body);
        if (inner) {
          seenNames.add(cleanName);
          samples.push({
            name: cleanName,
            viewBox: `0 0 ${grid} ${grid}`,
            fill: isStroke ? "none" : "currentColor",
            body: inner,
          });
        }
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
export function detectIconsFromHtml(html = "") {
  if (!html) return null;
  const signals = [
    [/class=["'][^"']*material-symbols-(?:outlined|rounded|sharp)|fonts\.googleapis\.com[^"']*Material\+Symbols/i, { library: "Material Symbols", package: "material-symbols", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "observed", url: "https://fonts.google.com/icons" }],
    [/class=["'][^"']*material-icons|fonts\.googleapis\.com[^"']*Material\+Icons/i, { library: "Material Icons", package: "@mui/icons-material", style: "solid", grid: 24, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "observed", url: "https://fonts.google.com/icons" }],
    [/class=["'][^"']*\blucide(?:-[a-z0-9-]+)?\b|(?:unpkg\.com|cdn\.jsdelivr\.net)\/[^"']*lucide/i, { library: "Lucide", package: "lucide-react", style: "outline", grid: 24, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", source: "observed", url: "https://lucide.dev" }],
    [/class=["'][^"']*\bheroicon/i, { library: "Heroicons", package: "@heroicons/react", style: "outline", grid: 24, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", source: "observed", url: "https://heroicons.com" }],
    [/class=["'][^"']*\bocticon\b/i, { library: "Octicons", package: "@primer/octicons-react", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "observed", url: "https://primer.style/foundations/icons" }],
    [/class=["'][^"']*\bbi-[a-z0-9-]+|bootstrap-icons(?:\.css|\.svg)/i, { library: "Bootstrap Icons", package: "bootstrap-icons", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "observed", url: "https://icons.getbootstrap.com" }],
    [/class=["'][^"']*\bfa-(?:solid|regular|light|brands)\b|fontawesome\.com/i, { library: "Font Awesome", package: "@fortawesome/fontawesome-free", style: "solid", grid: 16, strokeWidth: 0, strokeLinecap: "round", strokeLinejoin: "round", source: "observed", url: "https://fontawesome.com" }],
  ];
  for (const [re, spec] of signals) {
    if (re.test(html)) return { ...spec };
  }
  const svgs = [...String(html).matchAll(/<svg\b[^>]*>[\s\S]{10,4000}?<\/svg>/gi)].slice(0, 24).map((m) => m[0]);
  const measured = inspectSvgSnippets(svgs);
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

/** Deterministic SVG icon specification aligned with a design system's radius and surface language. */
export function deriveIconSpec({ radius = "8px", components = {}, existingIcons = null } = {}) {
  if (existingIcons && existingIcons.library) {
    return {
      library: existingIcons.library,
      package: existingIcons.package || null,
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
