---
version: alpha
name: Quantum
description: "Catho Quantum — tokens imported from @catho/quantum."
colors:
  brand1-50: "#E0EBF4"
  brand1-100: "#B3CEE3"
  brand1-200: "#80ADD1"
  brand1-300: "#4D8CBE"
  brand1-400: "#2674B0"
  brand1-500: "#005BA2"
  brand1-600: "#00539A"
  brand1-700: "#004990"
  brand1-800: "#004086"
  brand1-900: "#002f75"
  brand2-50: "#E1E6EA"
  brand2-100: "#B3C0CB"
  brand2-200: "#8096A9"
  brand2-300: "#4D6B86"
  brand2-400: "#274C6C"
  brand2-500: "#012C52"
  brand2-600: "#01274B"
  brand2-700: "#012141"
  brand2-800: "#011B38"
  brand2-900: "#001028"
  primary-50: "#e1f5fe"
  primary-100: "#b3e5fc"
  primary-200: "#81d4fa"
  primary-300: "#4fc3f7"
  primary-400: "#29b6f6"
  primary-500: "#03a9f4"
  primary-600: "#03a2f3"
  primary-700: "#0298f1"
  primary-800: "#028fef"
  primary-900: "#017eec"
  secondary-50: "#eceff1"
  secondary-100: "#d1d8dc"
  secondary-200: "#b2bec5"
  secondary-300: "#93a3ad"
  secondary-400: "#7b909c"
  secondary-500: "#647c8a"
  secondary-600: "#5c7482"
  secondary-700: "#526977"
  secondary-800: "#485f6d"
  secondary-900: "#364c5a"
  success-50: "#f0fae4"
  success-100: "#d8f2bc"
  success-200: "#bfe990"
  success-300: "#a5e064"
  success-400: "#91da42"
  success-500: "#7ed321"
  success-600: "#76ce1d"
  success-700: "#6bc818"
  success-800: "#61c214"
  success-900: "#4eb70b"
  warning-50: "#fef8e2"
  warning-100: "#fcecb6"
  warning-200: "#fae085"
  warning-300: "#f7d454"
  warning-400: "#f6ca30"
  warning-500: "#f4c10b"
  warning-600: "#f3bb0a"
  warning-700: "#f1b308"
  warning-800: "#efab06"
  warning-900: "#ec9e03"
  danger-50: "#fee7eb"
  danger-100: "#fcc3ce"
  danger-200: "#fa9bad"
  danger-300: "#f7728c"
  danger-400: "#f65474"
  danger-500: "#f4365b"
  danger-600: "#f33053"
  danger-700: "#f12949"
  danger-800: "#ef2240"
  danger-900: "#ec162f"
  info-50: "#e0fbfd"
  info-100: "#b3f5fb"
  info-200: "#80eff9"
  info-300: "#4de9f6"
  info-400: "#26e4f4"
  info-500: "#00dff2"
  info-600: "#00dbf0"
  info-700: "#00d7ee"
  info-800: "#00d2ec"
  info-900: "#00cae8"
  error-100: "#fff5f5"
  error-300: "#f88e86"
  error-500: "#ec584e"
  error-700: "#e91b0c"
  error-900: "#ac001a"
  neutral-0: "#ffffff"
  neutral-100: "#f2f2f2"
  neutral-300: "#e0e0e0"
  neutral-500: "#999999"
  neutral-700: "#424242"
  primary: "#b3e5fc"
typography:
  font-family:
    fontFamily: "\"Nunito Sans\""
  font-size:
    fontSize: 18px
rounded:
  nav: 8px
  default: 8px
icons:
  library: Material Icons
  package: "@mui/icons-material"
  pack: material
  style: solid
  grid: 24
  strokeWidth: 0
  strokeLinecap: round
  strokeLinejoin: round
  source: npm
  url: "https://mui.com/material-ui/material-icons"
components:
  select-default:
    backgroundColor: "#eceff1"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#b3e5fc"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#b3e5fc"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#eceff1"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#eceff1"
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
    backgroundColor: "#eceff1"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Quantum

## Overview

**Quantum** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#b3e5fc` brand accent.

Typography centers cleanly on `Nunito Sans` (18px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#eceff1` surface layering.

Maintained by **Catho**. Source: published token package, package `@catho/quantum`. Inventory: **91** colors, **2** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#eceff1` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#b3e5fc` (1.4:1 vs canvas; pair with `#0b0b0c` foreground ink for 14.5:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `brand1-100` (`#B3CEE3`), `brand1-200` (`#80ADD1`), `brand1-300` (`#4D8CBE`), `brand1-400` (`#2674B0`), `brand1-500` (`#005BA2`), `brand1-600` (`#00539A`).
- **Neutral Ramp**: `brand1-50` (`#E0EBF4`), `brand2-50` (`#E1E6EA`), `brand2-100` (`#B3C0CB`), `secondary-50` (`#eceff1`), `secondary-100` (`#d1d8dc`), `secondary-200` (`#b2bec5`).
- **Semantic States**: success: `success-100` (`#d8f2bc`) · danger: `danger-100` (`#fcc3ce`) · warning: `warning-50` (`#fef8e2`) · info: `info-50` (`#e0fbfd`).

## Typography

- **Primary / Display Voice**: `"Nunito Sans"` (top step `font-size`: 18px, weight 600).
- **Body & UI Controls**: `"Nunito Sans"` (`font-family`: 16px, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#eceff1` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#eceff1`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#b3e5fc` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Material Icons (`@mui/icons-material`) on a `24x24` grid (solid, stroke `0px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#eceff1`, ink `#0b0b0c`, (17.0:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#b3e5fc`, ink `#0b0b0c`, (14.5:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#b3e5fc`, ink `#0b0b0c`, (14.5:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#eceff1`, ink `#0b0b0c`, (17.0:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#eceff1`, ink `#0b0b0c`, (17.0:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#eceff1`, ink `#0b0b0c`, (17.0:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#b3e5fc` with `#0b0b0c` text (14.5:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Nunito Sans` headings with `Nunito Sans` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#eceff1` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
