---
name: design-sourcebook
description: >-
  Retrieve and apply any of the 417 sourced design systems in Design Sourcebook
  (36,641 tokens across colors, typography, spacing/radii, component tokens, and
  usage guidelines). Use when asked to look up a design system style, extract all
  component/color/type tokens from the registry, apply a theme to an app, or
  synthesize an original UI system grounded in verified tokens.
---

# Design Sourcebook Skill

Use this skill when working with Design Sourcebook to find any of its **417 provenance-tracked design systems** (`36,641` total tokens: `22,375` colors, `7,360` typography tokens, `6,906` component specs) and extract or apply **all of its colors, typography, radii/spacing, and component tokens**.

## Registry Entry Points

Choose whichever interface fits the environment:

- **CLI**: `node bin/sourcebook.mjs ...` (or `npx designsourcebook ...`)
- **MCP (`stdio`)**: `node bin/sourcebook.mjs mcp`
  - `list_design_systems`, `search_design_systems`, `get_design_system`, `apply_design_system`, `lint_design_system`
- **Serverless REST API**:
  - `/api/systems` (`?q=`, `?slug=`, `?status=`, `?tier=`, `?theme=`)
  - `/api/logos` (`?q=`, `?id=`, `?category=`, `?mode=random`)
  - `/api/icons` (`?q=`, `?id=`, `?pack=`, `?category=`)
  - `/api/stats`
- **Catalog & 4-Tool Design Studio**:
  - `catalog/index.html` (`/`): Static catalog with **Copy agent prompt** and **Copy full JSON** on every system page.
  - `/studio/#/systems`: **Design System Maker** (OKLCH ramps, APCA/WCAG 2.1 matrix, 11 export formats).
  - `/studio/#/create`: **Logo Maker** (subdivision facet grid, 50 construction templates, 7,627 brand logos + 1,432 UI icons).
  - `/studio/#/logofx`: **LogoFX** (10 WebGL2 shaders, 10 3D motion choreographies, 60fps Video Mastering Studio).
  - `/studio/#/brand`: **Brand Maker** (6-tile interactive brand guidelines board, 10 BrandFX pattern engines, brand book export).
- **Canonical Files per System** (`systems/<slug>/`):
  - `DESIGN.md`: Full YAML token front matter (`colors`, `typography`, `rounded`, `spacing`, `components`) + guidelines prose.
  - `preview.json`: Resolved surfaces (`canvas`, `surface`, `text`, `muted`, `brand`, `border`, `radius`), `palette`, sorted `type`, and `components` with `border` and `shadow`.
  - `tokens.json`: Framework-neutral W3C DTCG tokens.

## Workflow: Get All Components, Colors, and Typography

1. **Find matching systems by intent or name**:
   - CLI: `node bin/sourcebook.mjs search "<intent>"` or `node bin/sourcebook.mjs list --verified`
   - MCP: `search_design_systems({ query: "<intent>", limit: 8 })`

2. **Extract every token category (colors + typography + components + rules)**:
   - **Full Prompt (recommended for LLM context / direct UI generation)**:
     - CLI: `node bin/sourcebook.mjs export <slug> --format prompt`
     - MCP: `apply_design_system({ name: "<slug>", framework: "prompt" })`
   - **Full Structured JSON (includes merged `preview.json` `border` / `shadow` + `surfaces` + `colors` + `typography` + `components`)**:
     - CLI: `node bin/sourcebook.mjs export <slug> --format json`
     - MCP: `apply_design_system({ name: "<slug>", framework: "json" })`
   - **CSS / Tailwind / DTCG files dropped into a target project**:
     - CLI: `node bin/sourcebook.mjs add <slug> --framework css-vars --dir <projectDir>` (emits `--ds-comp-<name>-*` CSS custom properties alongside colors, type, radius, and spacing)
     - Or `--framework tailwind-v4` / `--framework dtcg` / `--framework prompt` / `--framework json`

3. **Validate before applying or editing tokens**:
   - CLI: `node bin/sourcebook.mjs lint <slug>`
   - MCP: `lint_design_system({ name: "<slug>" })`

## Strict Token & Honesty Rules

- **Use exact extracted values**: Never invent replacement hex codes, font families, shadows, or arbitrary radii when a token is already present in `DESIGN.md` or `preview.json`.
- **When `components` has fewer variants than needed**: Check `preview.json` / `surfaces` (`canvas`, `surface`, `text`, `muted`, `brand`, `border`, `radius`) and compose missing states from the system's own palette and typography scale while keeping text contrast `>= 4.5:1`.
- **No fabricated third-party brand claims**: Only sourced entries in `systems/` exist in the registry; do not invent tokens and attribute them to an external organisation not present here.
