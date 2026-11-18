---
version: alpha
name: Wedges
description: "Lemon Squeezy Wedges — tokens read from https://github.com/lmsqueezy/wedges."
colors:
  white-50: "rgba(255,255,255, 0.05)"
  white-100: "rgba(255,255,255, 0.1)"
  white-200: "rgba(255,255,255, 0.2)"
  white-300: "rgba(255,255,255, 0.3)"
  white-400: "rgba(255,255,255, 0.4)"
  white-500: "rgba(255,255,255, 0.5)"
  white-600: "rgba(255,255,255, 0.6)"
  white-700: "rgba(255,255,255, 0.8)"
  white-800: "rgba(255,255,255, 0.9)"
  white-900: "#FFFFFF"
  white-default: "#FFFFFF"
  black-default: "#000000"
  surface-overlay: "#FFFFFF"
  surface-50: "rgba(255,255,255, 0.1)"
  surface-100: "rgba(255,255,255, 0.2)"
  surface-200: "rgba(255,255,255, 0.3)"
  surface-300: "rgba(255,255,255, 0.4)"
  surface-400: "rgba(255,255,255, 0.5)"
  surface-500: "rgba(255,255,255, 0.5)"
  surface-600: "rgba(255,255,255, 0.7)"
  surface-700: "rgba(255,255,255, 0.8)"
  surface-800: "rgba(255,255,255, 0.9)"
  surface-900: "#FFFFFF"
  surface-default: "rgba(255,255,255, 0.1)"
  surface-overlay-foreground: "rgba(255,255,255, 0.8)"
  surface-overlay-focus: "rgba(255,255,255, 0.05)"
  background: "#FFFFFF"
  overlay: "#FFFFFF"
  foreground: "#FFFFFF"
  overlay-foreground: "rgba(255,255,255, 0.8)"
  overlay-focus: "rgba(255,255,255, 0.05)"
  custom-color-500: "#f0f0f0"
  custom-color-600: "#0d0d0d"
  wg-red: "#ff0000"
  primary: "#ff0000"
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
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#ff0000"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#ff0000"
    textColor: "#000000"
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

# Wedges

## Overview

**Wedges** is a light-first design system anchored on `#FFFFFF` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#ff0000` brand accent.

Typography centers cleanly on `System UI` (large display down to 14px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **Lemon Squeezy**. Source: published token package (https://github.com/lmsqueezy/wedges), repo https://github.com/lmsqueezy/wedges. Inventory: **35** colors, **0** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#FFFFFF` — base application backdrop (light theme).
- **Surface (`surface`)**: `#FFFFFF` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ff0000` (4.0:1 vs canvas; pair with `#f7f7f8` foreground ink for 3.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `primary` (`#ff0000`).
- **Neutral Ramp**: `white-700` (`rgba(255,255,255, 0.8)`), `white-800` (`rgba(255,255,255, 0.9)`), `white-900` (`#FFFFFF`), `white-default` (`#FFFFFF`), `black-default` (`#000000`), `surface-overlay` (`#FFFFFF`).
- **Semantic States**: danger: `wg-red` (`#ff0000`).

## Typography

- **Primary / Display Voice**: `System UI`.
- **Body & UI Controls**: `System UI`.

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#FFFFFF` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#FFFFFF` -> `#FFFFFF`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ff0000` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#ff0000`, ink `#000000`, (5.3:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#ff0000`, ink `#000000`, (5.3:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#FFFFFF`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#FFFFFF` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ff0000` with `#f7f7f8` text (3.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#FFFFFF` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
