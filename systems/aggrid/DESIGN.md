---
version: alpha
name: AG Grid
description: "AG Grid — tokens imported from ag-grid-community."
colors:
  ag-alpine-active-color: "#2196f3"
  ag-background-color: "#fff"
  ag-foreground-color: "#181d1f"
  ag-border-color: "#babfc7"
  ag-secondary-border-color: "#dde2eb"
  ag-header-background-color: "#f8f8f8"
  ag-tooltip-background-color: "#f8f8f8"
  ag-odd-row-background-color: "#fcfcfc"
  ag-control-panel-background-color: "#f8f8f8"
  ag-subheader-background-color: "#fff"
  ag-invalid-color: "#e02525"
  ag-checkbox-unchecked-color: "#999"
  ag-advanced-filter-join-pill-color: "#f08e8d"
  ag-advanced-filter-column-pill-color: "#a6e194"
  ag-advanced-filter-option-pill-color: "#f3c08b"
  ag-advanced-filter-value-pill-color: "#85c0e4"
  ag-find-match-background-color: "#ffff00"
  ag-find-active-match-background-color: "#ffa500"
  ag-cell-batch-edit-text-color: "#f3d0b3"
  ag-formula-token-1-color: "#4da3e5"
  ag-formula-token-2-color: "#f55864"
  ag-formula-token-3-color: "#b688f2"
  ag-formula-token-4-color: "#24bb4a"
  ag-formula-token-5-color: "#e772ba"
  ag-formula-token-6-color: "#f69b5f"
  ag-formula-token-7-color: "#a3e6ff"
  ag-calculated-column-reference-color: "#4da3e5"
  ag-calculated-column-function-color: "#24bb4a"
  ag-balham-active-color: "#0091ea"
  ag-input-border-color: "#95a5a6"
  ag-material-primary-color: "#3f51b5"
  ag-material-accent-color: "#ff4081"
  ag-header-cell-hover-background-color: "#f2f2f2"
  ag-value-change-value-highlight-background-color: "#00acc1"
  ag-data-color: "#f5f5f5ff"
  ag-icon-button-hover-background-color: "#000000ff"
  ag-checkbox-background-color: "#121212ff"
  ag-input-border-color-invalid: "#e02525ff"
  ag-side-button-selected-background-color: "#2c2c2cff"
  ag-selected-tab-underline-color: "#3f51b5ff"
  ag-value-change-delta-down-color: "#e53935ff"
  ag-menu-background-color: "#2c2c2cff"
  ag-active-color: "#2196f3"
  params-background-color: "hsl(29, 10%, 17%)"
  background-color: "#fff"
  foreground-color: "#181d1f"
  accent-color: "#2196f3"
  invalid-color: "#e02525"
  calculated-column-reference-color: "#3269c6"
  calculated-column-function-color: "#007c1f"
  value-change-delta-up-color: "#43a047"
  value-change-delta-down-color: "#e53935"
  cell-batch-edit-text-color: "#422f00"
  advanced-filter-builder-join-pill-color: "#f08e8d"
  advanced-filter-builder-column-pill-color: "#a6e194"
  advanced-filter-builder-option-pill-color: "#f3c08b"
  advanced-filter-builder-value-pill-color: "#85c0e4"
  find-match-background-color: "#ffff00"
  find-active-match-background-color: "#ffa500"
  formula-token1-color: "#3269c6"
  formula-token2-color: "#c0343f"
  formula-token3-color: "#8156b8"
  formula-token4-color: "#007c1f"
  formula-token5-color: "#b03e85"
  formula-token6-color: "#b74900"
  formula-token7-color: "#247492"
  primary-color: "#3f51b5"
  ag-row-numbers-selected-color: "#bbb"
  ag-calculated-column-highlight-color: "#bbb"
  ag-column-header-edit-highlight-color: "#bbb"
  primary: "#3f51b5"
typography:
  ag-font-size:
    fontSize: 14px
  ag-font-family:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif"
  ag-icon-font-family:
    fontFamily: agGridAlpine
rounded:
  card: 4px
  nav: 4px
  default: 4px
icons:
  library: Inline System SVGs
  package: null
  style: outline
  grid: 20
  strokeWidth: 1.75
  strokeLinecap: round
  strokeLinejoin: round
  source: derived
components:
  ag-chart-settings-card-item:
    backgroundColor: "#000"
    rounded: 4px
    height: 10px
    width: 10px
  select-default:
    backgroundColor: "#f8f8f8"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#3f51b5"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#3f51b5"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f8f8f8"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f8f8f8"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#fff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#f8f8f8"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# AG Grid

## Overview

**AG Grid** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#3f51b5` brand accent.

Typography centers cleanly on `System UI` (16px display down to 16px body), unified by `4px` base corner radius and stepped `#fff` -> `#f8f8f8` surface layering.

Source: published token package (https://www.ag-grid.com/), package `ag-grid-community`. Inventory: **71** colors, **3** typography steps, and **9** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f8f8f8` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#3f51b5` (6.9:1 vs canvas; pair with `#f7f7f8` foreground ink for 6.4:1 contrast).
- **Structural Border (`border`)**: `#babfc7` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `ag-alpine-active-color` (`#2196f3`), `ag-advanced-filter-join-pill-color` (`#f08e8d`), `ag-advanced-filter-column-pill-color` (`#a6e194`), `ag-advanced-filter-option-pill-color` (`#f3c08b`), `ag-advanced-filter-value-pill-color` (`#85c0e4`), `ag-find-match-background-color` (`#ffff00`).
- **Neutral Ramp**: `ag-background-color` (`#fff`), `ag-foreground-color` (`#181d1f`), `ag-border-color` (`#babfc7`), `ag-secondary-border-color` (`#dde2eb`), `ag-header-background-color` (`#f8f8f8`), `ag-tooltip-background-color` (`#f8f8f8`).
- **Semantic States**: success: `ag-invalid-color` (`#e02525`).

## Typography

- **Primary / Display Voice**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif` (top step `ag-font-family`: 16px, weight 600).
- **Body & UI Controls**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif` (`ag-font-family`: 16px, weight 400).
- **Scale Steps (3)**: `ag-font-family` (16px), `ag-icon-font-family` (16px), `ag-font-size` (14px).

## Layout

- **Grid & Control Spacing**: Derived from 9 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#f8f8f8` cards; separate sibling sections using `#babfc7` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#f8f8f8`) and `1px solid #babfc7` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#3f51b5` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `4px` (Cards `4px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `4px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`ag-chart-settings-card-item` (card)**: bg `#000`, radius `4px`.
- **`select-default` (select)**: bg `#f8f8f8`, ink `#0b0b0c`, (18.5:1), radius `4px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#3f51b5`, ink `#f7f7f8`, (6.4:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#3f51b5`, ink `#f7f7f8`, (6.4:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f8f8f8`, ink `#0b0b0c`, (18.5:1), radius `4px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f8f8f8`, ink `#0b0b0c`, (18.5:1), radius `4px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f8f8f8`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#3f51b5` with `#f7f7f8` text (6.4:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `4px` base geometry across inputs and buttons (4px on outer containers).
- Separate containers via `#f8f8f8` surface shifts and `#babfc7` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `4px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
