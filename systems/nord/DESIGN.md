---
version: alpha
name: Nord
description: "Arctic Ice Studio Nord — tokens imported from nord."
colors:
  nord0: "#2E3440"
  nord1: "#3B4252"
  nord2: "#434C5E"
  nord3: "#4C566A"
  nord4: "#D8DEE9"
  nord5: "#E5E9F0"
  nord6: "#ECEFF4"
  nord7: "#8FBCBB"
  nord8: "#88C0D0"
  nord9: "#81A1C1"
  nord10: "#5E81AC"
  nord11: "#BF616A"
  nord12: "#D08770"
  nord13: "#EBCB8B"
  nord14: "#A3BE8C"
  nord15: "#B48EAD"
  primary: "#EBCB8B"
rounded:
  nav: 8px
  default: 8px
icons:
  library: Repository SVGs
  package: null
  style: solid
  grid: 48
  strokeWidth: 0
  strokeLinecap: round
  strokeLinejoin: round
  source: repo
components:
  select-default:
    backgroundColor: "#ECEFF4"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#EBCB8B"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#EBCB8B"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#ECEFF4"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#ECEFF4"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#ECEFF4"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#ECEFF4"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#ECEFF4"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Nord

## Overview

**Nord** is a light-first design system anchored on `#ECEFF4` canvas surfaces with `#0b0b0c` primary ink (17.1:1 contrast) and `#EBCB8B` brand accent.

Typography centers cleanly on `System UI` (large display down to 14px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **Arctic Ice Studio**. Source: published token package (https://github.com/arcticicestudio/nord), package `nord`. Inventory: **17** colors, **0** typography steps, and **8** documented components ((Apache-2.0 AND CC-BY-SA-4.0) license).

## Colors

- **Canvas (`canvas`)**: `#ECEFF4` — base application backdrop (light theme).
- **Surface (`surface`)**: `#ECEFF4` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (17.1:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#EBCB8B` (1.4:1 vs canvas; pair with `#0b0b0c` foreground ink for 12.6:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `nord2` (`#434C5E`), `nord3` (`#4C566A`), `nord7` (`#8FBCBB`), `nord8` (`#88C0D0`), `nord9` (`#81A1C1`), `nord10` (`#5E81AC`).
- **Neutral Ramp**: `nord0` (`#2E3440`), `nord1` (`#3B4252`), `nord4` (`#D8DEE9`), `nord5` (`#E5E9F0`), `nord6` (`#ECEFF4`).

## Typography

- **Primary / Display Voice**: `System UI`.
- **Body & UI Controls**: `System UI`.

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#ECEFF4` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ECEFF4` -> `#ECEFF4`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#EBCB8B` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Repository SVGs on a `48x48` grid (solid, stroke `0px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#ECEFF4`, ink `#0b0b0c`, (17.1:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#EBCB8B`, ink `#0b0b0c`, (12.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#EBCB8B`, ink `#0b0b0c`, (12.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#ECEFF4`, ink `#0b0b0c`, (17.1:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#ECEFF4`, ink `#0b0b0c`, (17.1:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ECEFF4`, ink `#0b0b0c`, (17.1:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ECEFF4`, (17.1:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#ECEFF4`, ink `#0b0b0c`, (17.1:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ECEFF4` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#EBCB8B` with `#0b0b0c` text (12.6:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#ECEFF4` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
