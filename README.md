# Design Sourcebook

[![Live Catalog](https://img.shields.io/badge/Live_Catalog-designsourcebook.vercel.app-0ea5e9?style=flat-square)](https://designsourcebook.vercel.app)
[![Design Studio](https://img.shields.io/badge/Studio_Suite-System_·_Logo_·_LogoFX_·_Brand-6366f1?style=flat-square)](https://designsourcebook.vercel.app/studio/)
[![Sourced Systems](https://img.shields.io/badge/Design_Systems-417_Sourced_(0_Errors)-10b981?style=flat-square)](#registry--token-architecture)
[![Verified Tokens](https://img.shields.io/badge/Verified_Tokens-36,641_Tokens-f59e0b?style=flat-square)](#registry--token-architecture)
[![License: MIT](https://img.shields.io/badge/License-MIT-fafafa?style=flat-square)](./LICENSE)

**Design Sourcebook** is a provenance-tracked registry of **417 real-world design systems**, **36,641 extracted design tokens**, **7,627 brand vector logos**, and **1,432 verified UI icons** — paired with a zero-dependency **CLI & MCP Server** for coding agents and an interactive 4-tool **Design Sourcebook Studio** (`System Maker`, `Logo Maker`, `LogoFX`, and `Brand Maker`).

Every entry in the registry records where its tokens came from (`published` from official npm packages/repositories or `observed` from production CSS), passes deterministic validation, and installs into any project or AI coding agent in one command.

```bash
# Search the registry by design intent
node bin/sourcebook.mjs search "dark data-dense developer dashboard"

# Drop DESIGN.md + W3C DTCG tokens + Tailwind v4 / CSS variables into any project
node bin/sourcebook.mjs add linear-app --framework tailwind-v4 --dir .

# Export an LLM-ready design system prompt or start the stdio MCP server
node bin/sourcebook.mjs export stripe --format prompt
node bin/sourcebook.mjs mcp
```

---

## Platform Overview

| Pillar | Scale & Capabilities | Entry Point |
|---|---|---|
| **1. Design System Registry** | **417** sourced systems · **22,375** color tokens · **7,360** typography tokens · **6,906** component tokens · **0** schema errors | [`systems/*`](./systems) · [`index.json`](./index.json) |
| **2. Interactive Web Catalog** | Live token-rendered UI specimen cards, full component/palette/type sheets, popularity leaderboard, and 7,627-logo SVG anatomy inspector | [`catalog/index.html`](./catalog/index.html) · [Live Site](https://designsourcebook.vercel.app) |
| **3. Design System Maker** | Deterministic OKLCH 11-step perceptual ramps, dual-polarity compiler, WCAG 2.2 + APCA ($L_c$) 50-pair contrast matrix, CVD vision simulator, Utopia fluid `clamp()` type, and 7 code exporters | [`/studio/#/systems`](https://designsourcebook.vercel.app/studio/#/systems) |
| **4. Geometric Logo Maker** | 50 construction & adaptive quadtree grids, Golden $\varphi$ / iOS / Material / Fibonacci keylines, optical center-of-mass HUD, topological path operations, monogram stamp (`A–Z`, `0–9`), lockup composer, and 6-card perceptual stress-test lab | [`/studio/#/create`](https://designsourcebook.vercel.app/studio/#/create) |
| **5. LogoFX Shader & Video Studio** | 40+ real-time WebGL2 SDF fragment shaders (`Liquid Metal`, `3D Extrude`, `Holographic Foil`, `Neon`, `Oil Lens`, `Coin Relief`, `Wax Seal`, `Glitch`, `ASCII`), 10 3D motion choreographies, timeline scrubber, 11 post-FX filters, and phase-locked 60fps WebM video mastering | [`/studio/#/logofx`](https://designsourcebook.vercel.app/studio/#/logofx) |
| **6. Brand Maker & BrandFx** | 5 Bento grid architectures, 16 identity modules, 8 procedural BrandFx patterns, 6-section interactive Brand Guidelines Book (with `1X` clearspace & 6 misuse guardrails), Real-World Collateral Lab, and standalone HTML Brand Book exporter | [`/studio/#/brand`](https://designsourcebook.vercel.app/studio/#/brand) |
| **7. CLI, MCP Server & REST API** | Zero-dependency CLI, `stdio` Model Context Protocol (MCP) server, and Neon Postgres serverless API endpoints | [`bin/sourcebook.mjs`](./bin/sourcebook.mjs) · [`api/*`](./api) |

---

## Why This Exists

Existing design-system resources leave a gap between **inspiration** and **machine-consumable implementation**:

| Project | What It Provides | What It Lacks |
|---|---|---|
| `alexpate/awesome-design-systems` | Curated directory of ~155 design system links | No tokens, no JSON, no CLI, no API — a static link list |
| `google-labs-code/design.md` | The `DESIGN.md` specification and reference linter | Format specification only — ships without a system catalog |
| `VoltAgent/awesome-design-md` | Rich narrative prose descriptions for 54 brands | No YAML token front matter — cannot lint or compile to CSS/DTCG |
| `shadcn/ui` registries | 1-command component installation | React/Tailwind-coupled component code without multi-brand token provenance |

**Design Sourcebook** closes the loop: every system is stored as a machine-verified bundle (`DESIGN.md` + W3C DTCG `tokens.json` + resolved `preview.json` + `manifest.json`) that works equally well as an agent context file, an MCP resource, a CSS/Tailwind build input, or a seed inside **Design Sourcebook Studio**.

---

## Registry & Token Architecture

Every system in [`systems/`](./systems) is an isolated, self-contained package:

```text
systems/linear-app/
├── DESIGN.md       # Canonical YAML token front matter (colors, typography, radii, spacing, components) + guidelines prose
├── tokens.json     # W3C Design Tokens Community Group (DTCG) format ($value / $type)
├── preview.json    # Resolved semantic surfaces, sorted type ramp, and component borders/shadows
└── manifest.json   # Provenance metadata (published package/repo or observed URL), license, and lint results
```

### Registry Metrics

```text
417 sourced systems · 22,375 color tokens · 7,360 typography tokens · 6,906 component tokens
417 / 417 passing schema validation (0 errors) · 323 zero-warning verified clean
7,627 brand vector logos · 1,432 verified UI icons across 11 open-source icon packs
```

### Provenance Discipline

- **`published`**: Extracted directly from an organization's official npm token package (e.g., `@primer/primitives`, `@adobe/spectrum-tokens`) or public source repository — carrying exact package names, version strings, and open-source licenses.
- **`observed`**: Harvested from public production stylesheets, CSS custom properties, and computed DOM styles where no public token package exists — explicitly tagged so provenance is never blurred.

---

## Design Sourcebook Studio (`/studio`)

The repository includes a full React 19 + TypeScript + WebGL2 creative engineering suite in [`studio/app/`](./studio/app), compiled into [`catalog/studio/`](./catalog/studio):

### 1. Design System Maker (`/studio/#/systems`)
- **Seed from 417 Systems or 6 Curated Archetypes**: Load any registry system as an instant foundation or start from curated archetypes (`Obsidian SaaS`, `Swiss Editorial`, `Warm Consumer`, `Emerald Fintech`, `Cyber Terminal`, `Monochrome Atelier`).
- **Perceptual OKLCH Color Engine**: Generates 8 11-step Radix-role color ramps (`50–950`) with true achromatic protection and dual-polarity (`Dark` & `Light`) semantic token compilation.
- **WCAG 2.2 & APCA ($L_c$) Contrast Matrix**: Audits 50+ foreground/surface token pairs simultaneously, with 1-click **Auto-Fix AA** and a real-time **CVD Vision Simulator** (`Protanopia`, `Deuteranopia`, `Tritanopia`, `Achromatopsia`).
- **Utopia Fluid Typography & Concentric Geometry**: Interactive viewport scrubber (`320px–1920px`) for fluid `clamp()` type scales, concentric inner/outer radius math ($R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$), and 4-level elevation shadows.
- **7 Production Exporters**: `CSS Custom Properties`, `shadcn/ui Registry JSON`, `Tailwind v4 @theme`, `W3C DTCG JSON`, `Figma Variables JSON`, `TypeScript Theme SDK`, and `DESIGN.md`.

### 2. Geometric Logo Maker (`/studio/#/create`)
- **50 Construction & Adaptive Grids**: Polar, isometric, hexagonal, golden-ratio compass, and dynamic quadtree/keyline grids synthesized directly from any brand logo or UI icon silhouette.
- **Architectural Overlays & Optical Telemetry**: Real-time `Golden φ`, `iOS Squircle (R=22.5%)`, `Material`, `Fibonacci Spiral`, `6:4:3 Harmonic`, and `Safe Zone` keylines, plus an area-weighted **Optical Center-of-Gravity HUD** (`Δ(dx, dy)`) and **SVG Anchor Vertex X-Ray**.
- **6 Precision Tools & Topological Operations**: `Toggle Facet (S)`, `Paint Brush (B)`, `Flood Bucket (G)`, `Line Ray (L)`, `Eyedropper (I)`, and `Eraser (E)` — paired with `Outline Ring`, `Expand +1`, `Contract −1`, `Invert`, `Auto-Center Optically`, `Symmetrize`, and `Randomize`.
- **Container Badges, Constructive Monograms & Lockup Studio**: Wrap marks in `Squircle`, `Circle`, `Hexagon`, `Octagon`, or `Shield` badges with `evenodd` **Knock-Out** cutouts; stamp constructive `A–Z` / `0–9` monograms; compose **Horizontal**, **Stacked**, and **App Badge** wordmark lockups; and audit marks in a **6-Card Perceptual Stress-Test Lab** (Gaussian Squint Blur, 64px→12px Favicon Bar, Chromatic Polarity Matrix, 1-Bit Stamp, OS Mask Spin Check, and Vector Anatomy Telemetry).

### 3. LogoFX Shader, Motion & Video Studio (`/studio/#/logofx`)
- **40+ Real-Time WebGL2 SDF Shaders**: Fullscreen signed-distance-field fragment shaders across 3D (`Physical Extrude`, `Matcap`, `Glass Extrude`, `Metallic Coin Relief`, `3D Wireframe`), 2D (`Liquid Metal`, `Frosted Glass`, `Holographic Foil`, `Optical Oil Lens`, `Neon Gas`, `Thermal Heatmap`, `Gem Smoke`, `LED Matrix`, `Particles`, `CRT ASCII`, `Halftone`, `Bayer Dither`, `Broadcast Glitch`, `Architectural Plotter`), and Tactile Mockups (`Paper Cutout`, `Blind Emboss`, `Leather Stamp`, `Holo Print`, `Satin Embroidery`, `Wax Seal`, `Sticker Peel`, `App Glass`, `macOS Dock`).
- **10 3D Motion Choreographies & 10 Easing Curves**: Phase-locked `0 → 2π` loop engine driving both internal shader harmonics and 3D perspective choreography (`3D Gyro Float`, `360° Y-Turntable`, `Harmonic Pulse`, `360° Z-Spin`, `Isometric Pendulum`, `Kinetic Pop-In`, `Magnetic Orbit`, `Coin Toss Flip`, `Cyber Micro-Jolt`, `Shader Only`) with live **Interactive Pointer 3D Tilt**.
- **Interactive Timeline & Video Mastering Studio**: Frame-accurate scrubber (`-1f` / `+1f`), **8-Phase Loop Storyboard**, 11 post-processing filters with 6 mastering presets (`35mm Film`, `Cyber Chromatic`, `CRT Broadcast`, `Bayer Dither`, `Soft Dream`), and phase-locked **30/60fps WebM Video** & **4×4 Flipbook Sprite Sheet (`2048×2048`)** exporters.

### 4. Brand Maker & BrandFx (`/studio/#/brand`)
- **5 Bento Grid Architectures & 16 Identity Modules**: Compose interactive brand boards across `Swiss 3×2`, `Hero Bento`, `Editorial Grid`, `8-Tile Poster`, and `Masthead Split` layouts with per-tile surface polarity (`Auto`, `Accent`, `Invert`, `Glass`) and column spanning (`1×1`, `2×1 Wide`).
- **Interactive Brand Guidelines Manual**: 6-section standards book featuring **Brand Voice & Positioning Pillars**, **Logo Polarity Matrix**, **`1X` Clearspace & Minimum Scale Diagram**, **6 Visual Logo Misuse Guardrails (`DO NOT`)**, **60-30-10 Chromatic Proportions**, and **Typographic Hierarchy**.
- **Real-World Collateral Lab & Press Kit Exporter**: Live previews and 1-click exports for **SaaS Product Web Hero**, **`1200×630` Open Graph Card SVG**, **85×55mm Front/Back Executive Business Card SVG**, **Mobile OS Launcher & Notification Suite**, **Copyable HTML Email Signature**, **Standalone Zero-Dependency HTML Brand Guidelines Book**, and **AI Brand System Prompt (`BRAND.md`)**.

---

## CLI & MCP Server Usage

### Command-Line Interface (`bin/sourcebook.mjs`)

| Command | Description |
|---|---|
| `node bin/sourcebook.mjs list [--tag dark] [--verified] [--sort popular]` | List all 417 design systems with filtering and popularity sorting |
| `node bin/sourcebook.mjs rank [--limit 30] [--enterprise]` | Display the live popularity leaderboard (GitHub stars, dependents, npm downloads/mo) |
| `node bin/sourcebook.mjs search "<intent>"` | Natural-language intent search across style prose, tags, and token properties |
| `node bin/sourcebook.mjs info <slug>` | Inspect token counts, provenance, license, and lint status for a system |
| `node bin/sourcebook.mjs add <slug> [--framework tailwind-v4\|css-vars\|dtcg\|prompt\|json] [--dir .]` | Install a system's `DESIGN.md` and compiled theme files into a project |
| `node bin/sourcebook.mjs export <slug> --format dtcg\|tailwind-v4\|css-vars\|prompt\|json` | Stream compiled tokens or an LLM system prompt to `stdout` |
| `node bin/sourcebook.mjs lint [<slug> \| --all]` | Run the 8-rule structural & WCAG contrast validator |
| `node bin/sourcebook.mjs sync [--url <url> \| --repo <url> \| --package <pkg>]` | Harvest and validate new external design systems |
| `node bin/sourcebook.mjs mcp` | Start the `stdio` Model Context Protocol (MCP) server |
| `node bin/sourcebook.mjs index` | Rebuild [`index.json`](./index.json) from [`systems/`](./systems) |

### Model Context Protocol (MCP) Integration

Connect the entire 417-system registry to Claude Code, Cursor, Antigravity, Windsurf, or any MCP-compatible client:

```json
{
  "mcpServers": {
    "design-sourcebook": {
      "command": "node",
      "args": ["/absolute/path/to/designsourcebook/bin/sourcebook.mjs", "mcp"]
    }
  }
}
```

Exposes 5 tools (`list_design_systems`, `search_design_systems`, `get_design_system`, `apply_design_system`, `lint_design_system`) and every system as a direct URI resource at `sourcebook://systems/<slug>`.

---

## Serverless REST API (`/api/*`)

When deployed on Vercel (or run locally via the preview server) with Neon Postgres (`DATABASE_URL`), the following endpoints power the catalog and external integrations:

| Endpoint | Method | Description |
|---|---|---|
| `/api/catalog` | `GET` | Lightweight catalog payload of all 417 design systems with resolved preview surfaces and popularity scores |
| `/api/systems` | `GET` | Filterable list of design systems (`?q=`, `?tag=`, `?provenance=`, `?verified=1`) |
| `/api/systems/[slug]` | `GET` | Full system record including `DESIGN.md`, `tokens.json`, `preview.json`, and `manifest.json` |
| `/api/logos` | `GET` | Paginated search across 7,627 brand vector logos (`?q=`, `?page=`, `?limit=`, `?stats=1`) |
| `/api/icon-packs` | `GET` | Complete vector glyph catalog across 11 verified open-source UI icon packs (1,432 glyphs) |
| `/api/coverage` | `GET` | Cross-source coverage matrix against external design-system directories |
| `/api/health` | `GET` | Database connectivity and registry row-count health check |
| `/api/sync-popularity` | `GET` | Daily cron endpoint (`0 4 * * *`) refreshing GitHub stars and npm download metrics |

---

## Local Development & Production Build

### Prerequisites
- **Node.js** `>= 18.0.0` (Node 20 or 22 recommended)
- **npm** `>= 9.0.0`

### Build & Verify

```bash
# 1. Install root dependencies
npm install

# 2. Install Studio dependencies, typecheck, build Studio bundle, and compile catalog/index.html
npm run build:prod

# 3. Validate all 417 design systems against the 8-rule linter
npm run lint
```

### Working on Design Sourcebook Studio (`studio/app`)

```bash
# Run the Studio Vite development server
npm run studio:dev

# Run TypeScript verification and build the Studio bundle into catalog/studio/
npm run studio:build
node scripts/build-catalog.mjs
```

---

## Repository Structure

```text
designsourcebook/
├── .agents/skills/design-sourcebook/  # Portable Agent Skill (SKILL.md) for AI coding assistants
├── .github/workflows/                 # Automated CI validation (ci.yml) & weekly system discovery (sync-systems.yml)
├── api/                               # Vercel Serverless REST API endpoints (Neon Postgres + static fallback)
├── assets/brand/                      # Official Design Sourcebook Split Codex vector brand assets
├── bin/sourcebook.mjs                 # CLI entry point & stdio MCP server launcher
├── catalog/                           # Compiled production web shell (index.html) + Studio assets (catalog/studio/)
├── data/                              # External source lists, coverage matrix, and curated ingestion manifests
├── lib/                               # Core zero-dependency engine:
│   ├── color.mjs                      #   Color parsing, alpha compositing & WCAG contrast math
│   ├── css-components.mjs             #   Static stylesheet & custom-property component extractor
│   ├── db.mjs                         #   Neon Postgres serverless client & environment loader
│   ├── emit.mjs                       #   Tailwind v4, CSS variables, W3C DTCG, prompt & JSON emitters
│   ├── fm.mjs                         #   Canonical YAML front-matter parser & serializer
│   ├── ingest.mjs                     #   Multi-format token harvester (npm, Git repos, CSS, DTCG)
│   ├── lint.mjs                       #   8-rule structural & contrast validator
│   ├── mcp.mjs                        #   Model Context Protocol (MCP) JSON-RPC stdio server
│   ├── preview.mjs                    #   Semantic surface & component preview resolver
│   └── registry.mjs                   #   Registry loader, indexer & intent search ranker
├── scripts/                           # Build, ingestion, coverage & database seeding scripts
├── studio/app/                        # Design Sourcebook Studio (React 19 + TypeScript + WebGL2):
│   └── src/
│       ├── components/                #   Shared chrome, WebGL2 Studio stage, brand/logo/logofx workbenches
│       ├── data/                      #   Construction grids & WebGL2 shader effect catalog
│       ├── engine/                    #   OKLCH DS compiler, adaptive SVG grid engine, WebGL2 SDF renderer & GLSL shaders
│       ├── pages/                     #   SystemMaker.tsx, CreateX.tsx (Logo Maker), BrandX.tsx (Brand Maker)
│       └── state/                     #   Cross-tool project & WebGL studio state providers
├── systems/                           # 417 sourced design systems (DESIGN.md, tokens.json, preview.json, manifest.json)
├── index.json                         # Compiled top-level registry index
├── package.json                       # Package manifest, CLI bin & build scripts
└── vercel.json                        # Vercel deployment, caching headers & daily cron configuration
```

---

## License

Released under the [MIT License](./LICENSE). Individual design systems in [`systems/`](./systems) carry their respective upstream licenses in `manifest.json` (`MIT`, `Apache-2.0`, `BSD-3-Clause`, or proprietary observed brand guidelines — check each entry's manifest before commercial redistribution of third-party brand marks).
