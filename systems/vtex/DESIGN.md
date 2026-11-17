---
version: alpha
name: VTEX Styleguide
description: "Crisp light (#FFFFFF) canvas, system-ui typography, #00BBD4 brand accent, and 8px corner geometry"
colors:
  default-color-hex: "#FFFFFF"
  hex: "#FFFFFF"
  input-value: "#000000"
  alice-blue: "#eef3f7"
  blue: "#134cd8"
  gray: "#979899"
  light-gray: "#f2f4f5"
  hover-action-secondary: "#DBE9FD"
  c-on-base: "#3f3f40"
  muted-1: "#727273"
  muted-2: "#979899"
  muted-3: "#cacbcc"
  muted-4: "#e3e4e6"
  red: "#ff4c4c"
  white: "#ffffff"
  near-white: "#f0f0f0"
  near-black: "#2e2e2e"
  light-blue: "#dbe9fd"
  dark-blue: "#0c389f"
  dark-gray: "#727273"
  label-style-color: "#828282"
  color: "#828282"
  selected-row-background: "#dbe9fd"
  button-color: "#00BBD4"
  color-link: "#00BBD4"
  color-link-hover: "#0090a3"
  link: "#00BBD4"
  link-hover: "#0090a3"
  primary: "#00BBD4"
typography:
  title-font-size:
    fontSize: 20px
  font-size:
    fontSize: 16px
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
    backgroundColor: "#00BBD4"
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
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#00BBD4"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#00BBD4"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#00BBD4"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#FFFFFF"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# VTEX Styleguide

## Overview

**VTEX Styleguide** is a light-first design system anchored on `#FFFFFF` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#00BBD4` brand accent.

Typography centers cleanly on `System UI` (20px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **VTEX**. Source: published token package (https://github.com/vtex/styleguide), repo https://github.com/vtex/styleguide, package `vtex-tachyons`, frameworks: react, css. Inventory: **29** colors, **2** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#FFFFFF` — base application backdrop (light theme).
- **Surface (`surface`)**: `#FFFFFF` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#00BBD4` (2.3:1 vs canvas; pair with `#0b0b0c` foreground ink for 8.5:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `blue` (`#134cd8`), `hover-action-secondary` (`#DBE9FD`), `light-blue` (`#dbe9fd`), `dark-blue` (`#0c389f`), `selected-row-background` (`#dbe9fd`), `button-color` (`#00BBD4`).
- **Neutral Ramp**: `default-color-hex` (`#FFFFFF`), `hex` (`#FFFFFF`), `input-value` (`#000000`), `alice-blue` (`#eef3f7`), `gray` (`#979899`), `light-gray` (`#f2f4f5`).
- **Semantic States**: danger: `red` (`#ff4c4c`) · info: `color-link` (`#00BBD4`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `title-font-size`: 20px, weight 600).
- **Body & UI Controls**: `system-ui` (`font-size`: 16px, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#FFFFFF` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#FFFFFF` -> `#FFFFFF`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#00BBD4` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#00BBD4`, ink `#0b0b0c`, (8.5:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#00BBD4`, ink `#0b0b0c`, (8.5:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#00BBD4`, ink `#0b0b0c`, (8.5:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#00BBD4`, ink `#0b0b0c`, (8.5:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#FFFFFF`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#FFFFFF` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#00BBD4` with `#0b0b0c` text (8.5:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#FFFFFF` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
