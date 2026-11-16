---
name: design-sourcebook
description: >-
  Retrieve and apply any of the 205 sourced design systems in Design Sourcebook
  (colors, typography, spacing/radii, component tokens, and usage guidelines).
  Use when asked to look up a design system style, extract all component/color/type
  tokens from the registry, apply a theme to an app, or synthesize an original UI
  system grounded in verified tokens.
---

# Design Sourcebook Skill

Use this skill when working with Design Sourcebook (`c:\Users\PC\Desktop\designsourcebook`) to find a design system and extract **all of its colors, typography, radii/spacing, and component tokens**.

## Registry Entry Points

Choose whichever interface fits the environment:

- **CLI**: `node bin/sourcebook.mjs ...`
- **MCP (`stdio`)**: `node bin/sourcebook.mjs mcp`
  - `list_design_systems`, `search_design_systems`, `get_design_system`, `apply_design_system`, `lint_design_system`
- **Catalog Web UI**: `catalog/index.html` (or live site) has **Copy agent prompt** and **Copy full JSON** buttons on every system page.
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
     - CLI: `node bin/sourcebook.mjs add <slug> --framework css-vars --dir <projectDir>` (now emits `--ds-comp-<name>-*` CSS custom properties alongside colors, type, radius, and spacing)
     - Or `--framework tailwind-v4` / `--framework dtcg` / `--framework prompt` / `--framework json`

3. **Validate before applying or editing tokens**:
   - CLI: `node bin/sourcebook.mjs lint <slug>`
   - MCP: `lint_design_system({ name: "<slug>" })`

## Strict Token & Honesty Rules

- **Use exact extracted values**: Never invent replacement hex codes, font families, shadows, or arbitrary radii when a token is already present in `DESIGN.md` or `preview.json`.
- **When `components` has fewer variants than needed**: Check `preview.json` / `surfaces` (`canvas`, `surface`, `text`, `muted`, `brand`, `border`, `radius`) and compose missing states from the system's own palette and typography scale while keeping text contrast `>= 4.5:1`.
- **No fabricated third-party brand claims**: Only sourced entries in `systems/` exist in the registry; do not invent tokens and attribute them to an external organisation not present here.
