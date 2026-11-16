# Design Sourcebook

A verified, installable registry of design systems for coding agents. Every entry records where its tokens came from, what version, and whether it is merely listed.

Not another link list. Every entry is machine-checked, ships real design tokens, and installs with one command.

```bash
# from a clone (not published to npm yet)
node bin/sourcebook.mjs search "dark data-dense dashboard"
node bin/sourcebook.mjs add kraken --framework tailwind-v4
```

Once published, every `node bin/sourcebook.mjs` below becomes `npx sourcebook`.

---

## Why this exists

Four projects already occupy adjacent ground. None of them close the loop.

| Project | What it has | What it doesn't |
|---|---|---|
| `alexpate/awesome-design-systems` (26.4k★) | ~155 systems, 4 boolean columns | no JSON, no API, no install commands, no descriptions — a link list |
| `google-labs-code/design.md` | the spec + a real CLI (`lint`, `diff`, `export`, `spec`) | no content. A format with no catalog |
| `VoltAgent/awesome-design-md` (54 files) | rich prose per brand | zero YAML front matter, non-canonical sections — cannot lint, cannot export tokens |
| shadcn registries | one-command install | React code only, framework-locked, no design intent |

The gap is the **distribution layer**: something that verifies entries, and gets them into a project in one command, without caring which agent you use.

## What's in the box

206 sourced systems with extracted token data (all empty/blocked `listed` inventory records have been removed from `systems/`).

| Provenance | Count | Where the tokens come from |
|---|---|---|
| `observed` | 91 | read from public marketing sites or live CSS — exact values, no published source |
| `published` | 115 | imported from the team's own npm package or repository — exact values, a version, a licence |

`scripts/coverage.mjs` still measures these 206 sourced systems honestly against external design system lists (`data/sources/*.json`). Empty `listed` directories can be regenerated with `node scripts/add-listed.mjs` if needed, or omitted so the registry stays strictly sourced.

```text
206 sourced systems · 10,942 colour tokens · 3,616 type tokens · 1,960 component tokens
206 systems carry component tokens · 205 verified clean · 0 errors
```

Published entries carry `source: { package, version }` or `source: { repo }` and a real licence (`Apache-2.0` for Spectrum, `MIT` for Radix). Observed entries say so. A registry that blurs those two is lying about how much you can trust it.

Every entry is a directory:

```
systems/linear-app/
  DESIGN.md       # YAML tokens + prose: the agent reads this
  tokens.json     # W3C DTCG, framework-neutral
  preview.json    # resolved surfaces + component styling for the catalog
  manifest.json   # registry metadata + check results
```

## See it, not just read it

`catalog/index.html` is a browsable page built from the tokens — one file, no server, no build step.

```bash
node scripts/build-catalog.mjs   # → catalog/index.html (1171 KB, self-contained)
```

Every card renders live UI on the system's own canvas: its real button tokens, its badge colours, its palette strip. Open a system and you get a specimen sheet — hero type, the full component inventory with each variant drawn at its real radius, padding, border and shadow, every colour with its token name and hex, and the type scale at actual sizes.

Preview data is richer than the spec allows: `DESIGN.md` stays schema-clean, while `preview.json` carries border and shadow, which the spec has no slot for. That is where a preview gets its fidelity.

Three rules keep the previews honest:

- **Nothing is invented.** Where a system documents a component, its exact values are used. Where it documents none (110 of 205), four standard surfaces are composed from the palette and type scale, and the page says so.
- **Nothing goes invisible.** If a token pair would render under 2:1 on the surface it sits on, the preview falls back to readable ink. A transparent-black button on a black canvas is a real token, but showing it as blank space teaches nothing. The caption still lists the true values.
- **Fonts are substituted, and admitted.** Most of these brands ship proprietary typefaces (`sohne-var`, `Roobert`, `NVIDIA-EMEA`). Each is mapped to the closest freely available match — Inter, IBM Plex, Plus Jakarta, Source Serif — and declared first in the stack so the real font wins if installed.

## Coverage, measured

Three external lists live in `data/sources/`, and the coverage report checks the registry against all of them:

| Source | Held | Total |
|---|---|---|
| awesome-design-systems (alexpate) | 146 | 160 |
| Design Systems Gallery (Jad Limcaco) | 56 | 104 |
| designsystems.surf | 48 | 90 |
| **union, distinct organisations** | **148** | **243 (61%)** |

```bash
node scripts/coverage.mjs   # → data/coverage.json
```

Per-source percentages flatter the result, because the lists overlap with each other as much as with us. The union is the honest headline.

The same data is browsable in the catalog — the **Coverage** toggle lists every organisation, marks the ones we hold (click through to the specimen), and tags the rest `npm`, `repo` or `docs` so the next move is obvious.

Of the 95 missing organisations: **2** have a verified npm package that resisted extraction, **9** have a public repo that resisted extraction, and **84** are docs-only.

## What we can't get

Three different things get called "can't get", and conflating them hides the real problem. `node scripts/report-blocked.mjs` → `data/blocked-report.md`.

| Bucket | Count | Meaning |
|---|---|---|
| Attempted and failed | **16** | Ingested and rejected (11 below token floor / missing tokens / failed clone, 5 HTTP 403 / Cloudflare). |
| No machine-readable source | **79** | Docs only without a curated URL, or needs human review. |
| Not yet attempted | **0** | Every reachable source has been attempted. |

The failures cluster into four causes, and only one is a wall:

**Several were my mistakes, not the systems.** Malformed URLs (`github.com/italia`, `github.com/shadcn-ui`, a GitHub *tree* path for Grafana) and a wrong package — HeroUI ships its tokens in `@heroui/theme`, not `@heroui/react`. Fixing those, plus packages I had not probed, recovered:

```
Tencent 68c/19t · Singapore 91c/18t · Telefónica 90c/23t · Foundation 15c/6t
Grafana 15c · Buildit Gravity · Shadcn/ui 17c · Italia Design System
```

`writeSystem` now removes the `listed` inventory record for the same organisation, so a recovered system never appears twice — once sourced, once as "not sourced".

```
 5  could not fetch the page        403 — bot protection (Co-op, FutureLearn, Jobber, NationBuilder, Nordnet)
10  no colour values in N sheets    CSS-in-JS: the palette is applied by JS, never written as a literal
 3  no stylesheets found            single-page app, styles injected at runtime
 6  below the 12-colour floor       partially readable (Bolt 6, Oracle 2, Yelp 1, Wanda 3, Chakra-adjacent)
```

The first three are the same problem wearing different hats: **the colours exist but are never written down as literals.** Reading them needs a headless browser that executes the page and reads computed styles — a different tool, not a better regex.

**What the live-site reader does get: 15 of 35.** Every URL came from the curated awesome-design-systems table rather than a guessed domain, and each entry records whether the page actually names the organisation, so a wrong landing shows up as a warning instead of silently importing someone else's palette.

The readings are verifiable against known ground truth:

```
NHS.UK     nhsuk-blue-colour   #005eb8   ← NHS Blue, token name preserved
Monzo      color-brand         #ff4f40   ← Monzo coral
Adjust     ifm-color-primary   #3578e5
```

NHS.UK arrived with 88 colours and 33 component tokens, Monzo with 33 components, Intuit with 38 type steps.

Failures are written to `data/blocked.json` by the ingest drivers, and a later success clears the entry — so this list can't quietly go stale. That matters because **it shrinks as the harvester improves, not as the ecosystem changes.** This pass alone:

- **USWDS** — 1 colour → 28. Its palette is an SCSS *map* (`('blue-60v': #1a4480,)`), not variables, so a `$var: #hex` matcher saw nothing.
- **Chakra UI** — 6 → 91. Panda tokens are `{ value: "#3182ce" }` nested one level under a hue, and a flat key match read only `"500"`.
- **Aalto University** — docs-only, now 76 colours, read from its live stylesheets.
- **Microsoft Fluent 2** — 11 → 22 once the CSS component pass landed.
- **Astro UXDS** — cloned fine once `core.longpaths=true` got past Windows' 260-character limit.

None of those was ever unavailable. They were unread.



## The full sweep

`scripts/parallel.mjs` runs any ingest driver across a source file with bounded concurrency; static reading is cheap, so 6 workers is fine. Browser reading is heavier, so 3.

```bash
node scripts/build-all-sources.mjs      # every missing org with a curated URL
node scripts/parallel.mjs repo 6        # 51/72 ingested
node scripts/parallel.mjs browser 3     # 3/20 ingested — Firefox, Foyer, Oracle
```

Browser reading (`scripts/ingest-browser.mjs`) is the last-resort driver. For sites where the palette is applied by JavaScript and never written as a literal, it loads the page in Chromium, reads every CSS custom property from the document root, serialises the CSSOM, and samples computed styles from real buttons, inputs, cards and badges.

```
Oracle   2,009 computed CSS variables  →  91 colours, 81 type steps
Firefox    376 computed variables      →  91 colours, 15 type
```

This is what moved union coverage from 27% to **51%** in one pass. The remaining 40 failures are recorded with reasons; 17 of them still have no curated URL at all.

The honest boundary: 89 organisations have no URL in any source list I hold, and guessing domains would import the wrong company's palette. Those need either a URL supplied or a search step with human review.

## Discovery: can you just scan GitHub?

Not all of it, and it's worth being precise about why:

- `topic:design-system` alone is **9,492 repositories** (643 with ≥40 stars).
- GitHub's search API returns **at most 1,000 results per query**, so no single sweep can enumerate even one topic.
- The useful signal isn't the repo — it's whether it contains token files. Most repos tagged `design-system` are component libraries with no tokens at all.

So `scripts/discover-github.mjs` does the bounded version: 12 overlapping queries, dedupe, a relevance filter, then **a file-tree probe per candidate** to see whether tokens actually exist.

```bash
node scripts/discover-github.mjs --pages 2 --probe 120
```

One sweep of that size:

```
3,334 query hits (overlapping) → 929 unique repos read → 638 relevant
120 probed → 79 with token files → 2 ingested (Elastic UI, Radix Themes)
```

Two filters do the heavy lifting, and both were learned the hard way:

- **Relevance, not stars.** Without it, `microsoft/playwright` and AI-agent repos outrank real design systems because "design tokens" appears somewhere in their README.
- **`token` means auth token too.** The first run ranked `auth-token.ts` as evidence of a design system. The probe now requires token-specific paths (`tokens/`, `*.tokens.json`, `theme/`, `colors.scss`) and excludes `auth|jwt|session|tokenizer`.

Output lands in `data/discovered-github.json` with a `tokenSample` per repo, so a candidate can be eyeballed before cloning.

**Known noise:** star-inflated repos that name-drop design systems still slip through (`nexu-io/open-design` at 107k stars is not a design system). The `tokenSample` column is the check — a real system shows `tokens/`, not `agent-skills/`.

## When there are no component tokens: read the CSS

Inventing padding and radius to fill a gap produces a preview that looks plausible and is wrong. The accurate alternative is to parse the rules the library actually compiles — `.govuk-button` has a real background, radius, padding, border and shadow whether or not a token file exists.

`lib/css-components.mjs` does that: it flattens `@media`, resolves `var()` against the stylesheet's own custom properties, and keeps only single-compound selectors — because `.govuk-task-list .govuk-tag` is a contextual override, not the tag's base styling, and taking it first records the wrong colour.

Three rules keep it honest:

- **Base rules only.** Descendant and pseudo selectors are skipped; `.X:hover` is not `.X`.
- **Never fake a shape.** A panel is not a button. Kinds the catalog cannot draw (panel, table, label, tabs) render as the surface they are — real background, border, radius, padding — labelled with the kind, instead of being forced into a button.
- **Transparent means the page.** A component with no `background-color` shows the canvas, not the surface token.

It earned its keep by being verifiably right where memory was wrong:

```
GOV.UK 6.6.0  .govuk-button
  extracted:   bg #0f7a52 · border 2px solid transparent · shadow 0 2px 0 #083d29
  my assumption: #00703c
```

`#00703c` does not appear anywhere in GOV.UK Frontend 6.6.0 — it rebranded. The extractor read the shipped version; my recollection was a v4 value. That is the whole argument for reading source over recalling it.

Yield: **GOV.UK 22 components**, **Clarity 19** (and 42 type tokens it never published as tokens), **Vanilla** and **Zendesk Garden** crossed the 12-colour floor. 45 of 90 systems now carry real component tokens — up from 43, with 214 tokens instead of 173.

Still genuinely blocked: **USWDS** expresses everything as SCSS maps and variable references, so there are no literals to read.
## Ingesting a published system

Four drivers, one harvest core (`lib/ingest.mjs`) — because the problem is identical once the files are on disk:

```bash
# npm token package
node scripts/ingest-npm.mjs @primer/primitives --slug primer --org GitHub --name Primer

# public repository (this is how the 81 repo-only orgs get reached)
node scripts/ingest-repo.mjs https://github.com/artsy/palette --slug artsy-palette --org Artsy --name "Artsy Palette"

# live site CSS — the only route for docs-only organisations
node scripts/ingest-site.mjs https://brand.aalto.fi/ --slug aalto --org "Aalto University" --name "Aalto University"

# in bulk
node scripts/ingest-batch.mjs          # data/published-sources.json
node scripts/ingest-repo-batch.mjs     # data/repo-sources.json
```

It handles the token shapes that actually appear in the wild: `name`/`value` pairs (PatternFly ships one module per token), nested `sets.desktop.value` (Spectrum), DTCG `$value`/`$type`, `export const blue60 = "#0043ce"`, theme objects like `{ brand: "#7D4CDB" }`, SCSS variables (`$color-primary: #0057b8`), and `.tsx` token files — the last only when the path scores as a token/theme file, so component files full of one-off colours stay out.

**Selection matters more than harvesting.** Spectrum ships 835 colours, Atlassian 1,521, Salesforce 1,307. Dumping them produces a useless swatch wall, so the ingester keeps semantic roles first (`background`, `text`, `border`, `brand`, `danger`…) and fills the remainder with a spread of the primitive scales — capped at 90.

Nine sources failed and are **excluded rather than faked**: Microsoft Fluent 2 (11 colours), Zendesk Garden (minified bundle only), U.S. Web Design System (SCSS settings), Wonderflow Wanda (3 colours), Hubspot Canvas, VMware Clarity, Ubuntu Vanilla (no machine-readable tokens), Rocket Communications Astro (clone fails), AT UIKIT (1 colour). A two-colour "Carbon" would misrepresent Carbon, so any entry under 12 colours is rejected outright.

## Three ways to connect it to an agent

**1. File drop** — works with every agent, no protocol required.

```bash
node bin/sourcebook.mjs add linear-app --dir .
# writes DESIGN.md, design-tokens.json, design-theme.css
```

`DESIGN.md` sits next to `AGENTS.md`: one says how to build, the other says how it should look.

**2. MCP server** — one connection, whole catalog, nothing to copy.

```json
{
  "mcpServers": {
    "design-sourcebook": {
      "command": "node",
      "args": ["<abs-path>/designsourcebook/bin/sourcebook.mjs", "mcp"]
    }
  }
}
```

Swap `command`/`args` for `"command": "npx", "args": ["sourcebook", "mcp"]` after publishing.

Exposes five tools (`list_design_systems`, `search_design_systems`, `get_design_system`, `apply_design_system`, `lint_design_system`) and every system as a resource at `sourcebook://systems/<slug>`.

**3. Direct export** — for build pipelines.

```bash
npx sourcebook export stripe --format dtcg > tokens.json
npx sourcebook export stripe --format tailwind-v4 > theme.css
```

## Commands

| Command | Does |
|---|---|
| `sourcebook list [--tag dark] [--verified] [--sort popular]` | browse |
| `sourcebook rank [--limit n] [--enterprise]` | internet popularity leaderboard (live GitHub stars, repos & npm/mo) |
| `sourcebook search <intent...>` | intent search — "warm editorial serif", not brand names |
| `sourcebook info <name>` | tokens, tags, licence, failing checks |
| `sourcebook add <name>` | write files (`DESIGN.md`, `design-tokens.json`, plus `tailwind-v4`, `css-vars`, `dtcg`, `prompt`, or `json`) |
| `sourcebook lint <name> \| --all` | validate against the spec |
| `sourcebook export <name> --format dtcg\|tailwind-v4\|css-vars\|prompt\|json` | emit tokens, agent prompt, or full bundle |
| `sourcebook mcp` | stdio MCP server (`apply_design_system` also accepts `prompt` / `json`) |
| `sourcebook index` | rebuild `index.json` |

### Agent Skill

`.agents/skills/design-sourcebook/SKILL.md` packages the CLI, MCP, and file-reading workflow so any compatible agent can extract all colors, typography, and component tokens cleanly (copy into `~/.gemini/config/skills/design-sourcebook/` for global use across workspaces).

## What "verified" means

`lint` runs eight rules: duplicate sections, canonical section order, unknown top-level keys, broken `{token.ref}`s, missing `primary`, missing typography, orphaned color tokens, and WCAG AA contrast on component background/text pairs.

`verified` = zero errors, zero warnings, and extracted tokens. 205 of 206 sourced systems clear it. The rest ship with their warnings visible — a badge you can't inspect is worthless.

**What it does not mean.** `verified` is a *structural* claim: the file parses, references resolve, contrast passes. It says nothing about whether a value is semantically right. Repos that mix a design system with a code-syntax theme or test fixtures leak placeholder colours — Meta Astryx currently carries 6 (a `color-accent` of `#FF0000` sitting next to a real `accent` of `#0064E0`). The lint cannot catch that; only a human reading the palette can.

**One deliberate divergence.** Translucent backgrounds must be composited over the system's own canvas before measuring contrast. The reference linter composites over white instead, which cuts both ways on dark systems:

```
components.button-ghost          rgba(255,255,255,0.02) on #010102
  reference linter:  1.27:1   fails
  sourcebook:        15.89:1   passes      <- false failure

components.button-small-toolbar  rgba(255,255,255,0.05) on #010102
  reference linter:  no finding
  sourcebook:         3.35:1   fails       <- false pass
```

On Linear that is 5 of its 6 contrast findings being artefacts of a white backdrop, plus one genuine AA failure it misses. Both linters agree on the opaque ones — e.g. `badge-success-pill` at 2.38:1, a real miss in the source design.

Interop is not asserted, it's tested: `npx @google/design.md lint systems/*/DESIGN.md` parses every file with **zero errors**.

## Adding a system

`scripts/import.mjs` converts a prose collection into spec format — it extracts colours from `**Name** (\`#hex\`)` patterns grouped by subsection, type scales from markdown tables, component pairs from bold-name blocks, then reorders sections canonically and measures each canvas to derive `theme`.

```bash
node scripts/import.mjs <sourceDir> systems/
node bin/sourcebook.mjs lint --all
node bin/sourcebook.mjs index
```

To add a published system, drop a `DESIGN.md` into `systems/<slug>/` and set `provenance: "published"` in the manifest.

## Honest status

- Spec is `alpha`; the format will move.
- 115 of 206 entries are `published` and 91 are `observed` from public sites. Check licences before commercial use — most of the observed brands are proprietary.
- Published entries have strong colour data and **weak type scales**: most packages express type as DTCG aliases (`{fontStack.sansSerif}`) that cannot resolve outside the package. Those are dropped rather than emitted as broken references, so the type section is simply missing.
- Component tokens cover buttons, inputs, cards, badges and nav — all 206 of 206 sourced systems carry component tokens (1,960 tokens total). Modals, tables and tooltips are not extracted yet.
- Catalog previews are rendered from tokens, not screenshots. They show the visual language faithfully; they are not pixel copies of the live sites.
- `lint` is a reimplementation, not the reference implementation. Where they disagree, both numbers are in the finding.

## Layout

```
bin/sourcebook.mjs        CLI
lib/fm.mjs               YAML front-matter parse + emit
lib/color.mjs            colour parsing, alpha compositing, WCAG contrast
lib/lint.mjs             the validator
lib/emit.mjs             tailwind-v4 / css-vars / DTCG emitters
lib/registry.mjs         load, index, intent search
lib/preview.mjs          surface resolution shared by every importer
lib/ingest.mjs           harvest core shared by npm + repo drivers
lib/mcp.mjs              stdio MCP server
scripts/import.mjs       prose → spec converter (+ preview.json)
scripts/ingest-npm.mjs   published npm tokens → spec
scripts/ingest-repo.mjs  public repo → spec
scripts/ingest-site.mjs  live site CSS → spec (observed)
scripts/ingest-site-batch.mjs  every site in data/site-sources.json
scripts/ingest-browser.mjs     rendered CSS → spec (observed)
scripts/parallel.mjs           run any driver with bounded concurrency
scripts/build-site-sources.mjs  curated URLs → data/site-sources.json
scripts/ingest-batch.mjs       every source in data/published-sources.json
scripts/ingest-repo-batch.mjs  every repo in data/repo-sources.json
scripts/parse-awesome.mjs      alexpate/awesome-design-systems → data/sources/awesome.json
scripts/coverage.mjs     registry vs data/sources/*.json
scripts/build-catalog.mjs  → catalog/index.html
data/sources/            external lists (surf, gallery, awesome)
data/site-sources.json   docs-only orgs with a curated URL
scripts/add-listed.mjs   docs-only orgs → inventory records
.agents/skills/design-sourcebook/  agent skill for extracting colors, types & components
catalog/index.html       the browsable catalog + coverage view + copyable prompts
systems/                 206 sourced systems (115 published + 91 observed)
```

Zero dependencies. Node 18+.
