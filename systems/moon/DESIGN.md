---
version: alpha
name: Moon Design System
description: "Crypto & gaming product system, Averta Std typography and Piccolo purple accents"
colors:
  krillin-100: "#ffb319"
  krillin-10: "#ffe4ad"
  chi-chi-100: "#ff4e64"
  chi-chi-10: "#ffa7b2"
  roshi-100: "#0cd664"
  roshi-10: "#b6f3d0"
  dodoria-100: "#d33030"
  dodoria-10: "#e99797"
  cell-100: "#0ab758"
  cell-10: "#84dbab"
  raditz-100: "#b3804a"
  raditz-10: "#d9bfa4"
  whis-100: "#0f75bd"
  whis-10: "#87bade"
  frieza-100: "#5c33cf"
  frieza-10: "#b6a3e9"
  nappa-100: "#725550"
  nappa-10: "#b8aaa7"
  popo-100: "#000"
  krillin-60: "#ffc652"
  chi-chi-60: "#ff7687"
  roshi-60: "#64dc77"
  dodoria-60: "#db4e4e"
  cell-60: "#a2fadf"
  raditz-60: "#c1915d"
  whis-60: "#6777f8"
  frieza-60: "#734dde"
  nappa-60: "#856a66"
  piccolo-120: "#2e9468"
  piccolo-100: "#39a275"
  piccolo-80: "#46af81"
  hit-120: "#565e6c"
  hit-100: "#636b79"
  hit-80: "#6f7785"
  goten-100: "#ffffff"
  goku-100: "#070a0d"
  goku-80: "#11161d"
  goku-40: "#262f3b"
  goku-10: "#3d4957"
  gohan-100: "#272c35"
  gohan-80: "#323843"
  gohan-40: "#4a515e"
  gohan-10: "#636b79"
  beerus-100: "#4e535a"
  bulma-100: "#ffffff"
  trunks-100: "#c8d0d5"
  piccolo: "#39a275"
  hit: "#636b79"
  beerus: "#4e535a"
  goku: "#070a0d"
  gohan: "#272c35"
  bulma: "#ffffff"
  trunks: "#c8d0d5"
  goten: "#ffffff"
  popo: "#000000"
  goku-120: "#1d2229"
  whis: "#1da1f2"
  primary: "#ffa7b2"
typography:
  font-family:
    fontFamily: "\"Averta Std\""
  font-size:
    fontSize: 1rem
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
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
  button-primary:
    backgroundColor: "#ffa7b2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#ffa7b2"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#ffa7b2"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#ffa7b2"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#ffffff"
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
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Moon Design System

## Overview

**Moon Design System** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#ffa7b2` brand accent.

Typography centers cleanly on `Averta Std` (16px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **Moon**. Source: published token package, repo https://github.com/coingaming/moon-design, package `@heathmont/moon-themes`, frameworks: react, css. Inventory: **58** colors, **2** typography steps, and **16** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#ffffff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ffa7b2` (1.8:1 vs canvas; pair with `#0b0b0c` foreground ink for 10.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `krillin-100` (`#ffb319`), `krillin-10` (`#ffe4ad`), `chi-chi-100` (`#ff4e64`), `chi-chi-10` (`#ffa7b2`), `roshi-100` (`#0cd664`), `roshi-10` (`#b6f3d0`).
- **Neutral Ramp**: `nappa-10` (`#b8aaa7`), `popo-100` (`#000`), `hit-120` (`#565e6c`), `hit-100` (`#636b79`), `hit-80` (`#6f7785`), `goten-100` (`#ffffff`).

## Typography

- **Primary / Display Voice**: `"Averta Std"` (top step `font-family`: 16px, weight 600).
- **Body & UI Controls**: `"Averta Std"` (`font-family`: 16px, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#ffffff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#ffffff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ffa7b2` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#ffa7b2`, ink `#0b0b0c`, (10.7:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#ffa7b2`, ink `#0b0b0c`, (10.7:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#ffa7b2`, ink `#0b0b0c`, (10.7:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#ffa7b2`, ink `#0b0b0c`, (10.7:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ffa7b2` with `#0b0b0c` text (10.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Averta Std` headings with `Averta Std` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#ffffff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
