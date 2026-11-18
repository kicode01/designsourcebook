---
version: alpha
name: Nordnet UI Kit
description: "Nordnet UI Kit — tokens imported from nordnet-ui-kit."
colors:
  385-e9-d: "#00C8F5"
  3-a913-f: "#D2F500"
  ac135-a: "#FF2B83"
  complementary-blue1: "#385E9D"
  complementary-blue2: "#131F4F"
  complementary-green1: "#3A913F"
  complementary-green2: "#023C00"
  complementary-pink1: "#AC135A"
  complementary-pink2: "#78013A"
  complementary-turquoise1: "#009195"
  complementary-turquoise2: "#01424C"
  black: "#000000"
  gray0: "#282823"
  gray1: "#4B4B46"
  gray2: "#6E6E69"
  gray3: "#A0A09B"
  gray4: "#BCBCB6"
  gray5: "#D7D7D2"
  gray6: "#EBEBE8"
  gray7: "#F5F5F5"
  white: "#FFFFFF"
  2-d67-ff: "#0046FF"
  008-a00: "#00D200"
  e81700: "#FF1900"
  c15700: "#FFCF00"
  stroke: "#282823"
  fill: "#fff"
  style-fill: "#f6f6f6"
  icon-color: "#00A9EC"
  text-color: "#222222"
  stop-color: "#008c44"
  background-color: "#FFFFFF"
  primary: "#00D200"
typography:
  font-family:
    fontFamily: monospace
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
    backgroundColor: "#F5F5F5"
    textColor: "#222222"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#00D200"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#00D200"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#F5F5F5"
    textColor: "#222222"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#F5F5F5"
    textColor: "#222222"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#FFFFFF"
    textColor: "#222222"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#222222"
    textColor: "#FFFFFF"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#F5F5F5"
    textColor: "#222222"
    rounded: 8px
    padding: 8px
---

# Nordnet UI Kit

## Overview

**Nordnet UI Kit** is a light-first design system anchored on `#FFFFFF` canvas surfaces with `#222222` primary ink (15.9:1 contrast) and `#00D200` brand accent.

Typography centers cleanly on `System Mono` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#FFFFFF` -> `#F5F5F5` surface layering.

Maintained by **Nordnet**. Source: published token package (https://nordnet.github.io/nordnet-ui-kit), package `nordnet-ui-kit`. Inventory: **33** colors, **1** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#FFFFFF` — base application backdrop (light theme).
- **Surface (`surface`)**: `#F5F5F5` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#222222` — body copy and primary headings (15.9:1 on canvas).
- **Muted Ink (`muted`)**: `#222222` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#00D200` (2.1:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.6:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #222222 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `385-e9-d` (`#00C8F5`), `3-a913-f` (`#D2F500`), `ac135-a` (`#FF2B83`), `complementary-blue1` (`#385E9D`), `complementary-blue2` (`#131F4F`), `complementary-pink1` (`#AC135A`).
- **Neutral Ramp**: `black` (`#000000`), `gray0` (`#282823`), `gray1` (`#4B4B46`), `gray2` (`#6E6E69`), `gray3` (`#A0A09B`), `gray4` (`#BCBCB6`).
- **Semantic States**: success: `complementary-green1` (`#3A913F`).

## Typography

- **Primary / Display Voice**: `monospace` (top step `font-family`: 16px, weight 600).
- **Body & UI Controls**: `monospace` (`font-family`: 16px, weight 400).
- **Monospace / Technical Labels**: `monospace` (`font-family`: 16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#F5F5F5` cards; separate sibling sections using `color-mix(in srgb, #222222 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#FFFFFF` -> `#F5F5F5`) and `1px solid color-mix(in srgb, #222222 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#00D200` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#F5F5F5`, ink `#222222`, (14.6:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#00D200`, ink `#0b0b0c`, (9.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#00D200`, ink `#0b0b0c`, (9.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#F5F5F5`, ink `#222222`, (14.6:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#F5F5F5`, ink `#222222`, (14.6:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#FFFFFF`, ink `#222222`, (15.9:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#222222`, ink `#FFFFFF`, (15.9:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#F5F5F5`, ink `#222222`, (14.6:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#FFFFFF` (light) with `#222222` primary text and `#222222` secondary labels.
- Use `#00D200` with `#0b0b0c` text (9.6:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System Mono` headings with `System Mono` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#F5F5F5` surface shifts and `color-mix(in srgb, #222222 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
