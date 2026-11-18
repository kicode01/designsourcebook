---
version: alpha
name: Tachyons
description: "Tachyons — tokens imported from tachyons."
colors:
  black: "#000"
  near-black: "#111"
  dark-gray: "#333"
  mid-gray: "#555"
  gray: "#777"
  silver: "#999"
  light-silver: "#aaa"
  moon-gray: "#ccc"
  light-gray: "#eee"
  near-white: "#f4f4f4"
  white: "#fff"
  dark-red: "#e7040f"
  red: "#ff4136"
  light-red: "#ff725c"
  orange: "#ff6300"
  gold: "#ffb700"
  yellow: "#ffd700"
  light-yellow: "#fbf1a9"
  purple: "#5e2ca5"
  light-purple: "#a463f2"
  dark-pink: "#d5008f"
  hot-pink: "#ff41b4"
  pink: "#ff80cc"
  light-pink: "#ffa3d7"
  dark-green: "#137752"
  green: "#19a974"
  light-green: "#9eebcf"
  navy: "#001b44"
  dark-blue: "#00449e"
  blue: "#357edd"
  light-blue: "#96ccff"
  lightest-blue: "#cdecff"
  washed-blue: "#f6fffe"
  washed-green: "#e8fdf5"
  washed-yellow: "#fffceb"
  washed-red: "#ffdfdf"
  primary: "#ff80cc"
typography:
  h1:
    fontSize: 2em
rounded:
  nav: 8px
  default: 8px
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
  select-default:
    backgroundColor: "#eee"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#ff80cc"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#ff80cc"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#eee"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#eee"
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
    backgroundColor: "#eee"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Tachyons

## Overview

**Tachyons** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#ff80cc` brand accent.

Typography centers cleanly on `System UI` (32px display down to 32px body), unified by `8px` base corner radius and stepped `#fff` -> `#eee` surface layering.

Source: published token package, package `tachyons`. Inventory: **37** colors, **1** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#eee` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ff80cc` (2.3:1 vs canvas; pair with `#0b0b0c` foreground ink for 8.6:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `gold` (`#ffb700`), `purple` (`#5e2ca5`), `light-purple` (`#a463f2`), `dark-pink` (`#d5008f`), `hot-pink` (`#ff41b4`), `pink` (`#ff80cc`).
- **Neutral Ramp**: `black` (`#000`), `near-black` (`#111`), `dark-gray` (`#333`), `mid-gray` (`#555`), `gray` (`#777`), `silver` (`#999`).
- **Semantic States**: success: `dark-green` (`#137752`) · danger: `dark-red` (`#e7040f`) · warning: `orange` (`#ff6300`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `h1`: 2em, weight 600).
- **Body & UI Controls**: `system-ui` (`h1`: 2em, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#eee` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#eee`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ff80cc` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#eee`, ink `#0b0b0c`, (17.0:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#ff80cc`, ink `#0b0b0c`, (8.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#ff80cc`, ink `#0b0b0c`, (8.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#eee`, ink `#0b0b0c`, (17.0:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#eee`, ink `#0b0b0c`, (17.0:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#eee`, ink `#0b0b0c`, (17.0:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ff80cc` with `#0b0b0c` text (8.6:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#eee` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
