---
version: alpha
name: Dracula UI
description: "Dracula Theme Dracula UI — tokens imported from dracula-ui."
colors:
  entities: "#21222c"
  black: "#21222c"
  black-secondary: "#414558"
  black-ternary: "#a7abbe"
  grey: "#414558"
  grey-secondary: "#626784"
  grey-ternary: "#b6b9c9"
  white: "#f8f8f2"
  white-secondary: "#fff"
  cyan: "#80ffea"
  cyan-secondary: "#ccfff6"
  green: "#8aff80"
  green-secondary: "#d0ffcc"
  orange: "#ffca80"
  orange-secondary: "#ffeacc"
  pink: "#ff80bf"
  pink-secondary: "#ffcce6"
  purple: "#9580ff"
  purple-secondary: "#d4ccff"
  red: "#ff9580"
  red-secondary: "#ffd4cc"
  yellow: "#ffff80"
  yellow-secondary: "#ffc"
  disabled: "#6c7393"
  primary: "#ff9580"
rounded:
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
  select:
    textColor: "#f8f8f2"
    typography:
      fontSize: 1rem
    rounded: 0.5rem
  tab-link:
    textColor: "#6c7393"
  switch-control:
    backgroundColor: "#ff9580"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#ff9580"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  alert-info:
    backgroundColor: "#f8f8f2"
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
    backgroundColor: "#f8f8f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Dracula UI

## Overview

**Dracula UI** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#ff9580` brand accent.

Typography centers cleanly on `System UI` (large display down to 14px body), unified by `4px` base corner radius and stepped `#fff` -> `#f8f8f2` surface layering.

Maintained by **Dracula Theme**. Source: published token package (https://ui.draculatheme.com), package `dracula-ui`. Inventory: **25** colors, **0** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f8f8f2` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ff9580` (2.1:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.2:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `grey-secondary` (`#626784`), `cyan` (`#80ffea`), `cyan-secondary` (`#ccfff6`), `pink` (`#ff80bf`), `pink-secondary` (`#ffcce6`), `purple` (`#9580ff`).
- **Neutral Ramp**: `entities` (`#21222c`), `black` (`#21222c`), `black-secondary` (`#414558`), `black-ternary` (`#a7abbe`), `grey` (`#414558`), `grey-ternary` (`#b6b9c9`).
- **Semantic States**: success: `green` (`#8aff80`) · danger: `red` (`#ff9580`) · warning: `orange` (`#ffca80`).

## Typography

- **Primary / Display Voice**: `System UI`.
- **Body & UI Controls**: `System UI`.

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `2px`, `12px 14px`, `10px 14px`, `6px 10px`, `8px`.
- **Hierarchy**: Group controls cleanly within `#f8f8f2` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#f8f8f2`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ff9580` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `4px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `4px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select` (select)**: ink `#f8f8f2`, radius `0.5rem`, border `.3rem solid transparent`.
- **`tab-link` (tabs)**: ink `#6c7393`.
- **`switch-control` (switch)**: bg `#ff9580`, ink `#0b0b0c`, (9.2:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#ff9580`, ink `#0b0b0c`, (9.2:1), radius `4px`, padding `2px`.
- **`alert-info` (alert)**: bg `#f8f8f2`, ink `#0b0b0c`, (18.5:1), radius `4px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f8f8f2`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ff9580` with `#0b0b0c` text (9.2:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `4px` base geometry across inputs and buttons (4px on outer containers).
- Separate containers via `#f8f8f2` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `4px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
