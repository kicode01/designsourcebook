---
version: alpha
name: HIUI
description: "Xiaomi HIUI — tokens read from https://github.com/XiaoMi/hiui."
colors:
  50: "#edf2ff"
  100: "#e5ecff"
  200: "#b1cafc"
  300: "#74a2ff"
  400: "#4d82ff"
  500: "#2660ff"
  600: "#1843d2"
  700: "#0c2ba6"
  800: "#051879"
  900: "#000a4d"
  white: "#fff"
  black: "#000"
  bg-color: "#f5f8fc"
  var-value: "#fff"
  color-brand: "#ff6700"
  color-palette-brandblue-50: "#e2f3fe"
  color-palette-brandblue-100: "#bde2ff"
  color-palette-brandblue-200: "#96ceff"
  color-palette-brandblue-300: "#70b8ff"
  color-palette-brandblue-400: "#4a9eff"
  color-palette-brandblue-500: "#237ffa"
  color-palette-brandblue-600: "#1360d4"
  color-palette-brandblue-700: "#0744ad"
  color-palette-brandblue-800: "#002d87"
  color-palette-brandblue-900: "#001d61"
  color-palette-gray-50: "#f5f7fa"
  color-palette-gray-100: "#f2f4f7"
  color-palette-gray-200: "#ebedf0"
  color-palette-gray-300: "#dfe2e8"
  color-palette-gray-400: "#c9ced6"
  color-palette-gray-500: "#929aa6"
  color-palette-gray-600: "#5f6a7a"
  color-palette-gray-700: "#1f2733"
  color-palette-gray-800: "#1f2937"
  color-palette-gray-900: "#111827"
  color-palette-primary-normal: "#237ffa"
  color-palette-success-normal: "#14ca64"
  color-palette-warning-normal: "#fab007"
  color-palette-danger-normal: "#ff5959"
  color-danger-20: "#fee9e5"
  color-danger-30: "#ffd1c9"
  color-danger-40: "#ffb6ad"
  color-danger-50: "#ff7a75"
  color-danger-60: "#d94146"
  color-white: "#fff"
  color-gray-80: "#5f6a7a"
  color-gray-70: "#929aa6"
  color-gray-50: "#c9ced6"
  color-gray-30: "#dfe2e8"
  color-gray-20: "#ebedf0"
  color-gray-10: "#f5f7fa"
  color-success-20: "#e5feeb"
  color-success-30: "#b3f2c6"
  color-success-40: "#8bf0ad"
  color-success-50: "#38d677"
  color-success-60: "#08a351"
  color-warning-20: "#fefae0"
  color-warning-30: "#fef2b4"
  color-warning-40: "#fee789"
  color-warning-50: "#fec833"
  color-warning-60: "#d99100"
  color-primary-10: "#e2f3fe"
  color-primary-20: "#e2f3fe"
  color-primary-30: "#bde2ff"
  color-primary-40: "#96ceff"
  color-primary-50: "#70b8ff"
  color-primary-60: "#1360d4"
  color-primary-70: "#0744ad"
  color-primary-80: "#002d87"
  color-primary-90: "#001d61"
  color-danger: "#ff5959"
  color-black: "#1f2733"
  color-success: "#14ca64"
  color-warning: "#fab007"
  color-primary: "#237ffa"
  sider-primary-color: "#2b64ff"
  primary: "#ff6700"
typography:
  font-stack-sans:
    fontFamily: "\"('Helvetica Neue\", helvetica, \"arial)\""
  font-stack-serif:
    fontFamily: "\"('Times New Roman\", \"times)\""
  font-stack-mono:
    fontFamily: "\"('SFMono-Regular\", consolas, \"Liberation Mono\", menlo, \"courier)\""
  font-stack-symbol:
    fontFamily: "\"('Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol')\""
  font-size-normal:
    fontSize: 14px
  font-size-x-small:
    fontSize: 11px
  font-size-small:
    fontSize: 12px
  font-size-large:
    fontSize: 16px
  font-size-x-large:
    fontSize: 18px
  font-size-h1:
    fontSize: 32px
  font-size-h2:
    fontSize: 24px
  font-size-h3:
    fontSize: 20px
  font-size-h4:
    fontSize: 16px
  font-size-h5:
    fontSize: 14px
  font-size-h6:
    fontSize: 12px
  hi-popover-title:
    fontSize: 16px
    fontWeight: 500
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
  modal:
    backgroundColor: "#000"
  select-default:
    backgroundColor: "#edf2ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#ff6700"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#ff6700"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#edf2ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#edf2ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#f5f8fc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#f5f8fc"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#edf2ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# HIUI

## Overview

**HIUI** is a light-first design system anchored on `#f5f8fc` canvas surfaces with `#0b0b0c` primary ink (18.5:1 contrast) and `#ff6700` brand accent.

Typography centers cleanly on `(Helvetica Neue` (32px display down to 16px body), unified by `8px` base corner radius and stepped `#f5f8fc` -> `#edf2ff` surface layering.

Maintained by **Xiaomi**. Source: published token package (https://github.com/XiaoMi/hiui), repo https://github.com/XiaoMi/hiui. Inventory: **77** colors, **16** typography steps, and **9** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#f5f8fc` — base application backdrop (light theme).
- **Surface (`surface`)**: `#edf2ff` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (18.5:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ff6700` (2.7:1 vs canvas; pair with `#f7f7f8` foreground ink for 2.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `100` (`#e5ecff`), `200` (`#b1cafc`), `300` (`#74a2ff`), `400` (`#4d82ff`), `500` (`#2660ff`), `600` (`#1843d2`).
- **Neutral Ramp**: `50` (`#edf2ff`), `white` (`#fff`), `black` (`#000`), `bg-color` (`#f5f8fc`), `var-value` (`#fff`), `color-palette-gray-50` (`#f5f7fa`).
- **Semantic States**: success: `color-palette-success-normal` (`#14ca64`) · danger: `color-palette-danger-normal` (`#ff5959`) · warning: `color-palette-warning-normal` (`#fab007`).

## Typography

- **Primary / Display Voice**: `"('Helvetica Neue", helvetica, "arial)"` (top step `font-size-h1`: 32px, weight 600).
- **Body & UI Controls**: `"('Helvetica Neue", helvetica, "arial)"` (`font-stack-sans`: 16px, weight 400).
- **Monospace / Technical Labels**: `"('SFMono-Regular", consolas, "Liberation Mono", menlo, "courier)"` (`font-stack-mono`: 16px).
- **Scale Steps (16)**: `font-size-h1` (32px), `font-size-h2` (24px), `font-size-h3` (20px), `font-size-x-large` (18px), `font-stack-sans` (16px), `font-stack-serif` (16px), `font-stack-mono` (16px), `font-stack-symbol` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 9 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#edf2ff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#f5f8fc` -> `#edf2ff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ff6700` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`modal` (modal)**: bg `#000`.
- **`select-default` (select)**: bg `#edf2ff`, ink `#0b0b0c`, (17.6:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#ff6700`, ink `#000000`, (7.2:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#ff6700`, ink `#000000`, (7.2:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#edf2ff`, ink `#0b0b0c`, (17.6:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#edf2ff`, ink `#0b0b0c`, (17.6:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#f5f8fc`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#f5f8fc`, (18.5:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#edf2ff`, ink `#0b0b0c`, (17.6:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#f5f8fc` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ff6700` with `#f7f7f8` text (2.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `(Helvetica Neue` headings with `(Helvetica Neue` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#edf2ff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
