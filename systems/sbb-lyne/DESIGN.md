---
version: alpha
name: Lyne Design System
description: "SBB CFF FFS Lyne Design System — tokens imported from @sbb-esta/lyne-design-tokens."
colors:
  tokens: "#000000"
  original: "#000000"
  sbb-color-black: "#000000"
  sbb-color-midnight: "#151515"
  sbb-color-blue: "#2d327d"
  sbb-color-charcoal: "#212121"
  sbb-color-iron: "#444444"
  sbb-color-anthracite: "#5a5a5a"
  sbb-color-granite: "#686868"
  sbb-color-metal: "#767676"
  sbb-color-smoke: "#8d8d8d"
  sbb-color-storm: "#a8a8a8"
  sbb-color-graphite: "#b7b7b7"
  sbb-color-cement: "#bdbdbd"
  sbb-color-platinum: "#cdcdcd"
  sbb-color-aluminium: "#d2d2d2"
  sbb-color-silver: "#dcdcdc"
  sbb-color-cloud: "#e5e5e5"
  sbb-color-milk: "#f6f6f6"
  sbb-color-red: "#eb0000"
  sbb-color-red85: "#ff3838"
  sbb-color-red125: "#c60018"
  sbb-color-red150: "#a20013"
  sbb-color-royal-light: "#06348b"
  sbb-color-royal-dark: "#0053ef"
  sbb-color-royal85-light: "#4077df"
  sbb-color-royal85-dark: "#4077df"
  sbb-color-royal125-light: "#032668"
  sbb-color-royal125-dark: "#245ecb"
  sbb-color-royal150-light: "#021c4e"
  sbb-color-royal150-dark: "#3c65b3"
  sbb-color-white: "#ffffff"
  sbb-color-sky-light: "#0074bf"
  sbb-color-sky-dark: "#128ede"
  sbb-color-night-light: "#143a85"
  sbb-color-night-dark: "#6587ca"
  sbb-color-violet-light: "#6f2282"
  sbb-color-violet-dark: "#b36cc5"
  sbb-color-pink-light: "#c7387a"
  sbb-color-pink-dark: "#e45295"
  sbb-color-autumn-light: "#cf3b00"
  sbb-color-autumn-dark: "#f05313"
  sbb-color-orange-light: "#f27e00"
  sbb-color-orange-dark: "#fb8e19"
  sbb-color-peach-light: "#fcbb00"
  sbb-color-peach-dark: "#ffc727"
  sbb-color-lemon-light: "#ffde15"
  sbb-color-lemon-dark: "#ffe547"
  sbb-color-brown-light: "#a05400"
  sbb-color-brown-dark: "#cf6f04"
  sbb-color-green-light: "#008233"
  sbb-color-green-dark: "#109d47"
  sbb-color-turquoise-light: "#007e84"
  sbb-color-turquoise-dark: "#00a59b"
  primary: "#fb8e19"
typography:
  sbb-typo-font-family:
    fontFamily: "SBB, Inter, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
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
    backgroundColor: "#f6f6f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#fb8e19"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#fb8e19"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f6f6f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f6f6f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#ffffff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#f6f6f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Lyne Design System

## Overview

**Lyne Design System** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#fb8e19` brand accent.

Typography centers cleanly on `SBB` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#f6f6f6` surface layering.

Maintained by **SBB CFF FFS**. Source: published token package (https://github.com/sbb-design-systems/lyne-design-tokens#readme), package `@sbb-esta/lyne-design-tokens`. Inventory: **55** colors, **1** typography steps, and **8** documented components (ISC license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f6f6f6` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#fb8e19` (2.3:1 vs canvas; pair with `#0b0b0c` foreground ink for 8.4:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `sbb-color-blue` (`#2d327d`), `sbb-color-royal-light` (`#06348b`), `sbb-color-royal-dark` (`#0053ef`), `sbb-color-royal85-light` (`#4077df`), `sbb-color-royal85-dark` (`#4077df`), `sbb-color-royal125-light` (`#032668`).
- **Neutral Ramp**: `tokens` (`#000000`), `original` (`#000000`), `sbb-color-black` (`#000000`), `sbb-color-midnight` (`#151515`), `sbb-color-charcoal` (`#212121`), `sbb-color-iron` (`#444444`).
- **Semantic States**: success: `sbb-color-green-light` (`#008233`) · danger: `sbb-color-red` (`#eb0000`) · warning: `sbb-color-orange-light` (`#f27e00`).

## Typography

- **Primary / Display Voice**: `SBB, Inter, "Helvetica Neue", Helvetica, Arial, sans-serif` (top step `sbb-typo-font-family`: 16px, weight 600).
- **Body & UI Controls**: `SBB, Inter, "Helvetica Neue", Helvetica, Arial, sans-serif` (`sbb-typo-font-family`: 16px, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#f6f6f6` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#f6f6f6`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#fb8e19` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#f6f6f6`, ink `#0b0b0c`, (18.2:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#fb8e19`, ink `#0b0b0c`, (8.4:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#fb8e19`, ink `#0b0b0c`, (8.4:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f6f6f6`, ink `#0b0b0c`, (18.2:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f6f6f6`, ink `#0b0b0c`, (18.2:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f6f6f6`, ink `#0b0b0c`, (18.2:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#fb8e19` with `#0b0b0c` text (8.4:1) for primary CTAs, active tabs, and focus outlines.
- Pair `SBB` headings with `SBB` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f6f6f6` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
