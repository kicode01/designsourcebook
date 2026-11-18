---
version: alpha
name: Klarna UI
description: "Klarna UI — tokens imported from @klarna/ui-css-components."
colors:
  klarna-blue: "#0074c8"
  morning-blue: "#1a8cdc"
  black: "#3c3c3e"
  block-hover: "#f9f9f9"
  grey-text: "#9e9ea0"
  grey-icon: "#a9a9a9"
  grey-lines: "#cbcbcd"
  grey-selector-lines: "#e5e5e6"
  light-grey: "#f5f5f7"
  modal: "#46505a"
  white: "#fff"
  cello: "#364759"
  red: "#f52727"
  orange: "#ff8932"
  non-standard-orange: "#e0a644"
  green: "#23ba73"
  brown: "#b3815f"
  purple: "#ac71ca"
  light-blue: "#61b2eb"
  ultramarine: "#2cc4b0"
  yellow: "#ffc000"
  grey-label: "#617788"
  grey-active-background: "#f6f6f6"
  blue-hover: "#66aae0"
  blue-active-background: "#f2f8fd"
  error: "#e63200"
  error-hover: "#ef8b6f"
  error-border: "#e6bebe"
  error-text: "#e63200"
  error-background: "#fff8f7"
  warning: "#ecb800"
  warning-hover: "#e2af4a"
  warning-border: "#e6c88c"
  primary: "#ff8932"
typography:
  base-font-family:
    fontFamily: "\"Open Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
rounded:
  nav: 8px
  default: 8px
icons:
  library: Repository SVGs
  package: null
  style: outline
  grid: 14
  strokeWidth: 1
  strokeLinecap: round
  strokeLinejoin: round
  source: repo
components:
  select-default:
    backgroundColor: "#f5f5f7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#ff8932"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#ff8932"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f5f5f7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f5f5f7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#fff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#f5f5f7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Klarna UI

## Overview

**Klarna UI** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#ff8932` brand accent.

Typography centers cleanly on `Open Sans` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#fff` -> `#f5f5f7` surface layering.

Maintained by **Klarna**. Source: published token package, package `@klarna/ui-css-components`. Inventory: **34** colors, **1** typography steps, and **8** documented components (SEE LICENSE IN LICENSE license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f5f5f7` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ff8932` (2.4:1 vs canvas; pair with `#0b0b0c` foreground ink for 8.3:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `klarna-blue` (`#0074c8`), `morning-blue` (`#1a8cdc`), `cello` (`#364759`), `brown` (`#b3815f`), `purple` (`#ac71ca`), `light-blue` (`#61b2eb`).
- **Neutral Ramp**: `black` (`#3c3c3e`), `block-hover` (`#f9f9f9`), `grey-text` (`#9e9ea0`), `grey-icon` (`#a9a9a9`), `grey-lines` (`#cbcbcd`), `grey-selector-lines` (`#e5e5e6`).
- **Semantic States**: success: `green` (`#23ba73`) · danger: `red` (`#f52727`) · warning: `orange` (`#ff8932`).

## Typography

- **Primary / Display Voice**: `"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif` (top step `base-font-family`: 16px, weight 600).
- **Body & UI Controls**: `"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif` (`base-font-family`: 16px, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#f5f5f7` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#f5f5f7`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ff8932` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Repository SVGs on a `14x14` grid (outline, stroke `1px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#f5f5f7`, ink `#0b0b0c`, (18.1:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#ff8932`, ink `#0b0b0c`, (8.3:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#ff8932`, ink `#0b0b0c`, (8.3:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f5f5f7`, ink `#0b0b0c`, (18.1:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f5f5f7`, ink `#0b0b0c`, (18.1:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f5f5f7`, ink `#0b0b0c`, (18.1:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ff8932` with `#0b0b0c` text (8.3:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Open Sans` headings with `Open Sans` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f5f5f7` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
