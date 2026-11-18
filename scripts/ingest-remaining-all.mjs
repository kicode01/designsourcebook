// Ingest remaining uncovered GitHub repos, static docs sites, and JS-rendered docs sites (Playwright).
// Strictly authentic: extracts real tokens from public sources, respects HTTP 403/WAF blocks cleanly,
// and avoids duplicate slugs or organisations already present in systems/.

import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { normKey, normOrg } from "../lib/registry.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// [slug, repoUrl, org, name, extraUrls...]
const REPOS = [
  // Curated directory & failed-npm repos
  ["wanda", "https://github.com/wonderflow-bv/wanda", "Wonderflow", "Wanda Design System"],
  ["heroui", "https://github.com/heroui-inc/heroui", "HeroUI", "HeroUI"],
  ["razorpay", "https://github.com/razorpay/blade", "Razorpay", "Blade"],
  ["lemonsqueezy", "https://github.com/lmsqueezy/wedges", "Lemon Squeezy", "Wedges"],
  ["westpac", "https://github.com/WestpacGEL/GEL-next", "Westpac", "GEL"],
  ["seb", "https://github.com/seb-oss/green", "Skandinaviska Enskilda Banken", "SEB Green Design System"],
  ["teamleader", "https://github.com/teamleadercrm/ui-colors", "Teamleader", "Ahoy"],
  ["inps", "https://github.com/INPS-it/sirio-design-token", "INPS", "Sirio"],
  ["power", "https://github.com/powerhome/playbook", "Power", "Playbook"],
  ["uae", "https://github.com/TDRA-ae/aegov-dls", "UAE", "UAE Design System"],
  ["designsystemau", "https://github.com/designsystemau/gold-design-system", "Design System AU", "GOLD Design System"],
  ["agds", "https://github.com/agriculturegovau/agds-next", "Australian Government", "Agriculture Design System"],
  ["bridge", "https://github.com/laboratoriobridge/bold", "Bridge Design System", "Bold"],
  ["w3c", "https://github.com/w3c/w3c-website-templates-bundle", "W3C", "W3C Design System"],
  ["kontur", "https://github.com/skbkontur/retail-ui", "Kontur", "Kontur"],
  ["nasa", "https://github.com/nasa/nasawds", "NASA", "NASA Web Design System"],
  ["uiverse", "https://github.com/uiverse-io/galaxy", "Uiverse", "Uiverse"],
  ["generic-components", "https://github.com/thepassle/generic-components", "generic-components", "Generic Components"],
  ["uswitch", "https://github.com/uswitch/ustyle", "uSwitch", "uStyle"],
  ["no", "https://github.com/adamsilver/nostyle", "No", "NoStyle"],
  ["a11y", "https://github.com/cehfisher/a11y-style-guide", "A11Y", "A11Y Style Guide"],
  ["hubspot-canvas", "https://github.com/HubSpot/canvas-color", "Hubspot", "Canvas Design System"],

  // High-star authentic design systems discovered via GitHub
  ["xiaomi-hiui", "https://github.com/XiaoMi/hiui", "Xiaomi", "HIUI"],
  ["box", "https://github.com/box/box-ui-elements", "Box", "Box UI Elements"],
  ["mirror-degen", "https://github.com/mirror-xyz/degen", "Mirror", "Degen Design System"],
  ["pivotal", "https://github.com/pivotal-cf/pivotal-ui", "Pivotal", "Pivotal UI"],
  ["seed-design", "https://github.com/daangn/seed-design", "Daangn", "SEED Design System"],
  ["teradata", "https://github.com/Teradata/covalent", "Teradata", "Covalent"],
  ["nebular", "https://github.com/akveo/nebular", "Akveo", "Nebular Eva Design System"],
  ["saas-ui", "https://github.com/saas-js/saas-ui", "Saas UI", "Saas UI"],
  ["lobe-ui", "https://github.com/lobehub/lobe-ui", "LobeHub", "Lobe UI"],
  ["inkline", "https://github.com/uxfront-com/inkline", "Inkline", "Inkline"],
  ["dotui", "https://github.com/mehdibha/dotUI", "dotUI", "dotUI"],
  ["flyonui", "https://github.com/themeselection/flyonui", "ThemeSelection", "FlyonUI"],
  ["rippleui", "https://github.com/Siumauricio/rippleui", "RippleUI", "RippleUI"],
  ["balm-ui", "https://github.com/balmjs/balm-ui", "BalmJS", "BalmUI"],
  ["intentui", "https://github.com/irsyadadl/intentui", "Intent UI", "Intent UI"],
  ["starwind-ui", "https://github.com/starwind-ui/starwind-ui", "Starwind UI", "Starwind UI"],
];

// [slug, urls[], org, name]
const SITES = [
  ["heroui", ["https://www.heroui.com/"], "HeroUI", "HeroUI"],
  ["lemonsqueezy", ["https://www.lemonsqueezy.com/wedges"], "Lemon Squeezy", "Wedges"],
  ["wanda", ["https://design.wonderflow.ai/"], "Wonderflow", "Wanda Design System"],
  ["westpac", ["https://gel.westpacgroup.com.au/"], "Westpac", "GEL"],
  ["seb", ["https://designlibrary.sebgroup.com/", "https://storybook.seb.io/latest/core/"], "Skandinaviska Enskilda Banken", "SEB Green Design System"],
  ["deque", ["https://cauldron.dequelabs.com/"], "Deque", "Cauldron"],
  ["razorpay", ["https://blade.razorpay.com/"], "Razorpay", "Blade"],
  ["cisco", ["https://momentum.design/"], "Cisco", "Momentum Design"],
  ["teamleader", ["https://ahoy.teamleader.eu/"], "Teamleader", "Ahoy"],
  ["hubspot", ["https://canvas.hubspot.com/"], "Hubspot", "Canvas Design System"],
  ["servicenow", ["https://horizon.servicenow.com/"], "ServiceNow", "Horizon"],
  ["audi", ["https://styleguide.audi.com/document/1811#/-/colours"], "Audi", "Audi UI"],
  ["biings", ["https://biings.design/#/color", "https://biings.design/#/"], "Biings", "Biings Design System"],
  ["generalelectric", ["https://eds.gehealthcare.com/", "https://www.predix-ui.com/"], "General Electric", "Edison Design System"],
  ["maersk", ["https://designsystem.maersk.com/", "https://designsystem.maersk.com/foundations/colour-roles/index.html"], "Maersk", "Maersk Design System"],
  ["aviva", ["https://standards.aviva.com/", "https://standards.aviva.com/mobile/design-tokens/colour/"], "Aviva", "Aviva Standards"],
  ["carrefour", ["https://carrefour.design/"], "Carrefour", "Marcel"],
  ["cashapp", ["https://design.cash.app/", "https://design.cash.app/color"], "Cash App", "Cash App Design System"],
  ["datadog", ["https://druids.datadoghq.com/", "https://druids.datadoghq.com/foundations/color"], "Datadog", "Druids"],
  ["dell", ["https://www.delldesignsystem.com/", "https://vanilla.delldesignsystem.com/2.32.0/index.html"], "Dell", "Dell Design System"],
  ["denmark", ["https://designsystem.dk/", "https://designsystem.dk/styleguide/farver/"], "Denmark", "Det Fælles Designsystem"],
  ["docplanner", ["https://watson.docplanner.design/", "https://watson.docplanner.design/foundations/color"], "Docplanner", "Watson"],
  ["ideagen", ["https://www.helixui.com/9904796d6/p/19ace3-helix"], "Ideagen", "Helix"],
  ["line", ["https://designsystem.line.me/", "https://designsystem.line.me/LDSG/foundation/color-en/"], "Line", "LINE Design System"],
  ["michelin", ["https://designsystem.michelin.com/", "https://designsystem.michelin.com/colors"], "Michelin", "Motion"],
  ["motorway", ["https://thc.motorway.co.uk/0566ad526/p/652544-the-highway-code"], "Motorway", "Highway Code"],
  ["samsung", ["https://developer.samsung.com/one-ui", "https://developer.samsung.com/one-ui/color/system.html"], "Samsung", "One UI"],
  ["sigma", ["https://www.thesigma.co/designsystem", "https://www.thesigma.co/designsystem-library/foundation/colors"], "Sigma", "Sigma Design System"],
  ["skoda", ["https://skodaflow-web.azurewebsites.net/", "https://flow.skoda-brand.com/d/6aQMrmD6PhWL"], "Skoda", "Flow"],
  ["sunrise", ["https://solar.sunrise.net/"], "Sunrise", "Solar"],
  ["vts", ["https://terra.vts.com/", "https://terra.vts.com/foundation/color/overview"], "VTS", "Terra"],
  ["elisa", ["https://designsystem.elisa.fi/", "https://storybook.elisa.fi/"], "Elisa", "Elisa Design System"],
  ["ns", ["https://tractie.ns.nl/2e23992f3/p/226ce1-tractie--ns-design-system", "https://blue-water-08c39b403.5.azurestaticapps.net/"], "Nederlandse Spoorwegen", "Tractie"],
  ["sainsbury", ["https://design-systems.sainsburys.co.uk/", "https://luna.sainsburys.co.uk/guidelines"], "Sainsbury", "Luna"],
  ["giffgaff", ["https://www.giffgaff.design/"], "giffgaff", "giffgaff Design System"],
  ["axisbank", ["https://www.subzero.axis.bank.in/"], "Axis Bank", "SubZero"],
  ["ruter", ["https://components.ruter.as/"], "Ruter", "Ruter Components"],
  ["gojek", ["https://asphalt.gojek.io/"], "GO-JEK", "Asphalt"],
  ["cbre", ["https://blocks.cbrebuild.com/"], "CBRE Build", "Blocks Design System"],
  ["codeforamerica", ["http://style.codeforamerica.org/"], "Code for America", "Code for America Style Guide"],
  ["beeline", ["http://beelinedesignsystem.com/"], "Beeline", "Beeline Design System"],
  ["mutualofomaha", ["http://design.mutualofomaha.com/digital/"], "Mutual of Omaha", "Digital Design Guide"],
  ["etrade", ["http://etrade.design/"], "E-Trade", "E-Trade Design Language"],
  ["elementary", ["https://elementary.io/en/docs/human-interface-guidelines"], "Elementary", "elementary HIG"],
  ["myob", ["http://feelix.myob.com/"], "MYOB", "Feelix"],
  ["helpscout", ["http://style.helpscout.com/"], "Help Scout", "Help Scout Style Guide"],
  ["flexport", ["https://www.flexport.com/design"], "Flexport", "Latitude"],
  ["trello", ["https://design.trello.com/"], "Trello", "Nachos"],
  ["opower", ["https://ux.opower.com/opattern/"], "OPower", "OPattern"],
  ["lonelyplanet", ["http://rizzo.lonelyplanet.com/"], "Lonely Planet", "Rizzo"],
  ["benevity", ["https://skyline.benevity.org/"], "Benevity", "Skyline"],
  ["bulb", ["http://design.bulb.co.uk/"], "Bulb", "Solar Design System"],
  ["hudl", ["http://uniform.hudl.com/"], "Hudl", "Uniform"],
  ["wonderbly", ["http://design-system.wonderbly.com/"], "Wonderbly", "Wonderbly Design System"],
  ["biteable", ["https://x.biteable.com/"], "Biteable", "X Design System"],
  ["heartbeat", ["https://pulse.heartbeat.ua/"], "Heartbeat", ".pulse"],
  ["inclusive", ["https://inclusive-components.design"], "Inclusive", "Inclusive Components"],
  ["axa", ["https://design.axa.com/"], "AXA", "AXA Digital Guidelines"],
  ["bbc-gel", ["https://www.bbc.co.uk/gel"], "BBC", "BBC GEL"],
  ["bolt", ["https://boltdesignsystem.com/"], "Bolt", "Bolt Design System"],
  ["futurelearn", ["https://design-system.futurelearn.com/", "https://www.futurelearn.com/pattern-library"], "FutureLearn", "FutureLearn Design System"],
  ["jobber", ["https://atlantis.getjobber.com/"], "Jobber", "Atlantis"],
  ["nationbuilder", ["https://www.nationbuilder.design/"], "NationBuilder", "NationBuilder Radius"],
  ["ariakit", ["https://ariakit.org/"], "Ariakit", "Ariakit"],
  ["reach", ["https://reach.tech/"], "Reach", "Reach UI"],
  ["tailwind-headless", ["https://headlessui.com/"], "Tailwind Labs", "Headless UI"],
  ["bridge", ["https://bold.bridge.ufsc.tech/"], "Bridge Design System", "Bold"],
  ["nasa", ["https://nasa.github.io/nasawds-site/"], "NASA", "NASA Web Design System"],
  ["kontur", ["https://guides.kontur.ru/"], "Kontur", "Kontur"],
  ["uiverse", ["https://uiverse.io/"], "Uiverse", "Uiverse"],
  ["generic-components", ["https://genericcomponents.netlify.app/index.html"], "generic-components", "Generic Components"],
  ["uswitch", ["https://ustyle.guide/"], "uSwitch", "uStyle"],
];

function currentInventory() {
  const slugs = new Set();
  const orgs = new Set();
  const sysDir = path.join(ROOT, "systems");
  if (!fs.existsSync(sysDir)) return { slugs, orgs };
  for (const s of fs.readdirSync(sysDir)) {
    const mp = path.join(sysDir, s, "manifest.json");
    if (!fs.existsSync(mp)) continue;
    try {
      const m = JSON.parse(fs.readFileSync(mp, "utf8"));
      if (m.provenance === "listed") continue;
      if ((m.tokens?.colors || 0) === 0 && (m.tokens?.typography || 0) === 0 && (m.tokens?.components || 0) === 0) continue;
      slugs.add(normKey(s));
      if (m.org) orgs.add(normOrg(m.org));
    } catch {
      /* ignore */
    }
  }
  return { slugs, orgs };
}

function isPresent(slug, org) {
  const { slugs, orgs } = currentInventory();
  return slugs.has(normKey(slug)) || orgs.has(normOrg(org));
}

function runScript(script, args, timeoutMs = 120000) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [script, ...args], { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
    let out = "";
    let err = "";
    const timer = setTimeout(() => {
      try { child.kill(); } catch {}
      resolve({ code: 124, out: out.trim(), err: "timeout" });
    }, timeoutMs);
    child.stdout.on("data", (d) => (out += d.toString()));
    child.stderr.on("data", (d) => (err += d.toString()));
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, out: out.trim(), err: err.trim() });
    });
  });
}

function checkSucceeded(slug) {
  const mp = path.join(ROOT, "systems", slug, "manifest.json");
  if (!fs.existsSync(mp)) return false;
  try {
    const m = JSON.parse(fs.readFileSync(mp, "utf8"));
    return m.provenance !== "listed" && ((m.tokens?.colors || 0) > 0 || (m.tokens?.typography || 0) > 0);
  } catch {
    return false;
  }
}

async function main() {
  const skipRepos = process.argv.includes("--sites-only");
  const skipSites = process.argv.includes("--repos-only");

  let repoOk = 0;
  let repoFail = 0;
  let siteOk = 0;
  let browserOk = 0;
  let siteBlocked = 0;

  if (!skipRepos) {
    console.log(`\n=== Phase A: Public GitHub/GitLab Repos (${REPOS.length} candidates) ===`);
    for (const [slug, url, org, name] of REPOS) {
      if (isPresent(slug, org)) continue;
      const res = await runScript("scripts/ingest-repo.mjs", [url, "--slug", slug, "--org", org, "--name", name], 150000);
      if (checkSucceeded(slug)) {
        repoOk++;
        console.log(`[REPO OK] ${res.out.split("\n").pop()}`);
      } else {
        repoFail++;
        const msg = (res.out || res.err || "").split("\n").pop();
        console.log(`[REPO --] ${slug}: ${msg}`);
      }
    }
  }

  if (!skipSites) {
    console.log(`\n=== Phase B: Live Docs Sites (HTTP static -> Playwright fallback) ===`);
    for (const [slug, urls, org, name] of SITES) {
      if (isPresent(slug, org)) continue;
      let done = false;
      for (const u of urls) {
        const staticRes = await runScript("scripts/ingest-site.mjs", [u, "--slug", slug, "--org", org, "--name", name, "--max", "8"], 45000);
        if (checkSucceeded(slug)) {
          siteOk++;
          console.log(`[SITE OK] ${staticRes.out.split("\n").pop()}`);
          done = true;
          break;
        }
        const staticMsg = (staticRes.out || staticRes.err || "").toLowerCase();
        // Do not retry WAF/Cloudflare HTTP 403 challenges
        if (/403|blocked|cloudflare|forbidden/.test(staticMsg)) {
          console.log(`[BLOCKED] ${slug} (${u}): ${(staticRes.out || staticRes.err).split("\n").pop()}`);
          done = true;
          siteBlocked++;
          break;
        }
      }
      if (done) continue;

      // JS-rendered or style-in-DOM site: run single Playwright Chromium pass on primary URL
      for (const u of urls.slice(0, 2)) {
        const pwRes = await runScript("scripts/ingest-browser.mjs", [u, "--slug", slug, "--org", org, "--name", name], 65000);
        if (checkSucceeded(slug)) {
          browserOk++;
          console.log(`[PLAYWRIGHT OK] ${pwRes.out.split("\n").pop()}`);
          done = true;
          break;
        }
        const pwMsg = (pwRes.out || pwRes.err || "").split("\n").pop();
        console.log(`[SITE --] ${slug} (${u}): ${pwMsg}`);
        if (/403|blocked|just a moment|cloudflare/i.test(pwMsg)) {
          siteBlocked++;
          break;
        }
      }
    }
  }

  console.log({ repoOk, repoFail, siteOk, browserOk, siteBlocked });
}

main();
