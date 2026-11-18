---
version: alpha
name: BalmUI
description: "BalmJS BalmUI — tokens read from https://github.com/balmjs/balm-ui."
colors:
  primary: "#018786"
  accent: "#018786"
  background: "#fff"
  surface: "#fff"
  error: "#b00020"
  textarea-disabled-background: "rgba(249, 249, 249, 1)"
  background-color: "#db4437"
  light-focused: "rgba(255, 255, 255, 1)"
  info: "#4285f4"
  warning: "#f4b400"
  success: "#0f9d58"
  primary-color: "#2c3e50"
  red-50: "#ffebee"
  red-200: "#ef9a9a"
  red-400: "#ef5350"
  red-600: "#e53935"
  red-800: "#c62828"
  pink-50: "#fce4ec"
  pink-200: "#f48fb1"
  pink-400: "#ec407a"
  pink-600: "#d81b60"
  pink-800: "#ad1457"
  purple-50: "#f3e5f5"
  purple-200: "#ce93d8"
  purple-400: "#ab47bc"
  purple-600: "#8e24aa"
  purple-800: "#6a1b9a"
  deep-purple-50: "#ede7f6"
  deep-purple-200: "#b39ddb"
  deep-purple-400: "#7e57c2"
  deep-purple-600: "#5e35b1"
  deep-purple-800: "#4527a0"
  indigo-50: "#e8eaf6"
  indigo-200: "#9fa8da"
  indigo-400: "#5c6bc0"
  indigo-600: "#3949ab"
  indigo-800: "#283593"
  blue-50: "#e3f2fd"
  blue-200: "#90caf9"
  blue-400: "#42a5f5"
  blue-600: "#1e88e5"
  blue-800: "#1565c0"
  light-blue-50: "#e1f5fe"
  light-blue-200: "#81d4fa"
  light-blue-400: "#29b6f6"
  light-blue-600: "#039be5"
  light-blue-800: "#0277bd"
  cyan-50: "#e0f7fa"
  cyan-200: "#80deea"
  cyan-400: "#26c6da"
  cyan-600: "#00acc1"
  cyan-800: "#00838f"
  teal-50: "#e0f2f1"
  teal-200: "#80cbc4"
  teal-400: "#26a69a"
  teal-600: "#00897b"
  teal-800: "#00695c"
  green-50: "#e8f5e9"
  green-200: "#a5d6a7"
  green-400: "#66bb6a"
  green-600: "#43a047"
  green-800: "#2e7d32"
  light-green-50: "#f1f8e9"
  light-green-200: "#c5e1a5"
  light-green-400: "#9ccc65"
  light-green-600: "#7cb342"
  light-green-800: "#558b2f"
  lime-50: "#f9fbe7"
  lime-200: "#e6ee9c"
  lime-400: "#d4e157"
  lime-600: "#c0ca33"
  lime-800: "#9e9d24"
  yellow-50: "#fffde7"
  yellow-200: "#fff59d"
  yellow-400: "#ffee58"
  yellow-600: "#fdd835"
  yellow-800: "#f9a825"
  amber-50: "#fff8e1"
  amber-200: "#ffe082"
  amber-400: "#ffca28"
  amber-600: "#ffb300"
  amber-800: "#ff8f00"
  orange-50: "#fff3e0"
  orange-200: "#ffcc80"
  orange-400: "#ffa726"
  orange-600: "#fb8c00"
  orange-800: "#ef6c00"
  deep-orange-50: "#fbe9e7"
  deep-orange-200: "#ffab91"
  deep-orange-400: "#ff7043"
typography:
  font-family:
    fontFamily: "\"string.unquote('Roboto\", \"sans-serif')\""
  icon-font-size:
    fontSize: 18px
  font-size-m:
    fontSize: 14px
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
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#018786"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#018786"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#fff"
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
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# BalmUI

## Overview

**BalmUI** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#018786` brand accent.

Typography centers cleanly on `string.unquote(Roboto` (18px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **BalmJS**. Source: published token package (https://github.com/balmjs/balm-ui), repo https://github.com/balmjs/balm-ui. Inventory: **90** colors, **3** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#018786` (4.4:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.1:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `primary` (`#018786`), `accent` (`#018786`), `background-color` (`#db4437`), `primary-color` (`#2c3e50`), `pink-200` (`#f48fb1`), `pink-400` (`#ec407a`).
- **Neutral Ramp**: `background` (`#fff`), `surface` (`#fff`), `textarea-disabled-background` (`rgba(249, 249, 249, 1)`), `light-focused` (`rgba(255, 255, 255, 1)`), `red-50` (`#ffebee`), `pink-50` (`#fce4ec`).
- **Semantic States**: success: `success` (`#0f9d58`) · danger: `error` (`#b00020`) · warning: `warning` (`#f4b400`) · info: `info` (`#4285f4`).

## Typography

- **Primary / Display Voice**: `"string.unquote('Roboto", "sans-serif')"` (top step `icon-font-size`: 18px, weight 600).
- **Body & UI Controls**: `"string.unquote('Roboto", "sans-serif')"` (`font-family`: 16px, weight 400).
- **Scale Steps (3)**: `icon-font-size` (18px), `font-family` (16px), `font-size-m` (14px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#fff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#fff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#018786` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#018786`, ink `#000000`, (4.8:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#018786`, ink `#000000`, (4.8:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#018786` with `#f7f7f8` text (4.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `string.unquote(Roboto` headings with `string.unquote(Roboto` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#fff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
