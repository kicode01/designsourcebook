---
version: alpha
name: Thumbprint
description: "Thumbtack Thumbprint — tokens imported from @thumbtack/thumbprint-tokens."
colors:
  tp-color-blue100: "#eaf6fa"
  tp-color-blue200: "#b3ebff"
  tp-color-blue300: "#79d2f2"
  tp-color-blue: "#009fd9"
  tp-color-blue500: "#007fad"
  tp-color-blue600: "#005979"
  tp-color-indigo100: "#e8f1fd"
  tp-color-indigo200: "#cce1ff"
  tp-color-indigo300: "#96c2ff"
  tp-color-indigo: "#5968e2"
  tp-color-indigo500: "#4f54b3"
  tp-color-indigo600: "#383c80"
  tp-color-purple100: "#f5efff"
  tp-color-purple200: "#dfccff"
  tp-color-purple300: "#c9acfd"
  tp-color-purple: "#8d56eb"
  tp-color-purple500: "#6637b6"
  tp-color-purple600: "#492782"
  tp-color-green100: "#e1fdf3"
  tp-color-green200: "#c6f7da"
  tp-color-green300: "#73e4a2"
  tp-color-green: "#2db783"
  tp-color-green500: "#16855b"
  tp-color-green600: "#054e33"
  tp-color-yellow100: "#fdf7e7"
  tp-color-yellow200: "#ffebb3"
  tp-color-yellow300: "#ffdd80"
  tp-color-yellow: "#febe14"
  tp-color-yellow500: "#a77005"
  tp-color-yellow600: "#714601"
  tp-color-red100: "#ffeff0"
  tp-color-red200: "#ffd9d9"
  tp-color-red300: "#ffb0b0"
  tp-color-red: "#ff5a5f"
  tp-color-red500: "#b22d31"
  tp-color-red600: "#7d0d10"
  tp-color-black300: "#676d73"
  tp-color-black: "#2f3033"
  tp-color-gray200: "#fafafa"
  tp-color-gray300: "#e9eced"
  tp-color-gray: "#d3d4d5"
  tp-color-white: "#ffffff"
  tp-color-blue-100: "#eaf6fa"
  tp-color-blue-200: "#b3ebff"
  tp-color-blue-300: "#79d2f2"
  tp-color-blue-500: "#007fad"
  tp-color-blue-600: "#005979"
  tp-color-indigo-100: "#e8f1fd"
  tp-color-indigo-200: "#cce1ff"
  tp-color-indigo-300: "#96c2ff"
  tp-color-indigo-500: "#4f54b3"
  tp-color-indigo-600: "#383c80"
  tp-color-purple-100: "#f5efff"
  tp-color-purple-200: "#dfccff"
  tp-color-purple-300: "#c9acfd"
  tp-color-purple-500: "#6637b6"
  tp-color-purple-600: "#492782"
  tp-color-green-100: "#e1fdf3"
  tp-color-green-200: "#c6f7da"
  tp-color-green-300: "#73e4a2"
  tp-color-green-500: "#16855b"
  tp-color-green-600: "#054e33"
  tp-color-yellow-100: "#fdf7e7"
  tp-color-yellow-200: "#ffebb3"
  tp-color-yellow-300: "#ffdd80"
  tp-color-yellow-500: "#a77005"
  tp-color-yellow-600: "#714601"
  tp-color-red-100: "#ffeff0"
  tp-color-red-200: "#ffd9d9"
  tp-color-red-300: "#ffb0b0"
  tp-color-red-500: "#b22d31"
  tp-color-red-600: "#7d0d10"
  tp-color-black-300: "#676d73"
  tp-color-gray-200: "#fafafa"
  tp-color-gray-300: "#e9eced"
  primary: "#007fad"
typography:
  tp-font-family-base:
    fontFamily: "Mark, Avenir, Helvetica, Arial, sans-serif"
  tp-font-family-monospace:
    fontFamily: "\"Source Code Pro\", monospace"
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
    backgroundColor: "#eaf6fa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#007fad"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#007fad"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#eaf6fa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#eaf6fa"
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
    backgroundColor: "#eaf6fa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Thumbprint

## Overview

**Thumbprint** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#007fad` brand accent.

Typography centers cleanly on `Mark` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#eaf6fa` surface layering.

Maintained by **Thumbtack**. Source: published token package (https://thumbprint.design/tokens), package `@thumbtack/thumbprint-tokens`. Inventory: **76** colors, **2** typography steps, and **8** documented components (Apache-2.0 license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#eaf6fa` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#007fad` (4.5:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.2:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `tp-color-blue200` (`#b3ebff`), `tp-color-blue300` (`#79d2f2`), `tp-color-blue` (`#009fd9`), `tp-color-blue500` (`#007fad`), `tp-color-blue600` (`#005979`), `tp-color-indigo200` (`#cce1ff`).
- **Neutral Ramp**: `tp-color-blue100` (`#eaf6fa`), `tp-color-indigo100` (`#e8f1fd`), `tp-color-purple100` (`#f5efff`), `tp-color-yellow100` (`#fdf7e7`), `tp-color-red100` (`#ffeff0`), `tp-color-black300` (`#676d73`).
- **Semantic States**: success: `tp-color-green100` (`#e1fdf3`) · danger: `tp-color-red200` (`#ffd9d9`) · warning: `tp-color-yellow200` (`#ffebb3`).

## Typography

- **Primary / Display Voice**: `Mark, Avenir, Helvetica, Arial, sans-serif` (top step `tp-font-family-base`: 16px, weight 600).
- **Body & UI Controls**: `Mark, Avenir, Helvetica, Arial, sans-serif` (`tp-font-family-base`: 16px, weight 400).
- **Monospace / Technical Labels**: `"Source Code Pro", monospace` (`tp-font-family-monospace`: 16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#eaf6fa` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#eaf6fa`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#007fad` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#eaf6fa`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#007fad`, ink `#000000`, (4.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#007fad`, ink `#000000`, (4.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#eaf6fa`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#eaf6fa`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#eaf6fa`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#007fad` with `#f7f7f8` text (4.2:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Mark` headings with `Mark` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#eaf6fa` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
