---
version: alpha
name: Storybook Design System
description: "Storybook Design System — tokens imported from @storybook/design-system."
colors:
  fill: "#A849FF"
  stop-color: "#35C1F1"
  stroke: "#1EA7FD"
  app: "#F6F9FC"
  app-inverse: "#7A8997"
  positive: "#E1FFD4"
  negative: "#FEDED2"
  warning: "#FFF5CF"
  calm-blue: "#E3F3FF"
  primary: "#FF4785"
  secondary: "#029CFD"
  tertiary: "#E3E6E8"
  orange: "#FC521F"
  gold: "#FFAE00"
  green: "#66BF3C"
  seafoam: "#37D5D3"
  purple: "#6F2CAC"
  ultraviolet: "#2A0481"
  red: "#ff4400"
  bluelight: "#E3F3FF"
  bluelighter: "#F5FBFF"
  lighter: "#F7FAFC"
  mediumlight: "#ECF4F9"
  medium: "#D9E8F2"
  mediumdark: "#73828C"
  darker: "#454E54"
  darkest: "#2E3438"
  selected: "#0271B6"
  style-fill: "#db4437"
  style-stop-color: "#3e2723"
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
    backgroundColor: "#F6F9FC"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#FF4785"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#FF4785"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#F6F9FC"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#F6F9FC"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#F5FBFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#F5FBFF"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#F6F9FC"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Storybook Design System

## Overview

**Storybook Design System** is a light-first design system anchored on `#F5FBFF` canvas surfaces with `#0b0b0c` primary ink (18.9:1 contrast) and `#FF4785` brand accent.

Typography centers cleanly on `System UI` (large display down to 14px body), unified by `8px` base corner radius and stepped `#F5FBFF` -> `#F6F9FC` surface layering.

Maintained by **Storybook**. Source: published token package, package `@storybook/design-system`. Inventory: **30** colors, **0** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#F5FBFF` — base application backdrop (light theme).
- **Surface (`surface`)**: `#F6F9FC` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (18.9:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#FF4785` (3.1:1 vs canvas; pair with `#f7f7f8` foreground ink for 3.0:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `fill` (`#A849FF`), `stop-color` (`#35C1F1`), `stroke` (`#1EA7FD`), `app-inverse` (`#7A8997`), `calm-blue` (`#E3F3FF`), `primary` (`#FF4785`).
- **Neutral Ramp**: `app` (`#F6F9FC`), `tertiary` (`#E3E6E8`), `bluelighter` (`#F5FBFF`), `lighter` (`#F7FAFC`), `mediumlight` (`#ECF4F9`), `darker` (`#454E54`).
- **Semantic States**: success: `positive` (`#E1FFD4`) · danger: `negative` (`#FEDED2`) · warning: `warning` (`#FFF5CF`).

## Typography

- **Primary / Display Voice**: `System UI`.
- **Body & UI Controls**: `System UI`.

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#F6F9FC` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#F5FBFF` -> `#F6F9FC`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#FF4785` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#F6F9FC`, ink `#0b0b0c`, (18.6:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#FF4785`, ink `#000000`, (6.5:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#FF4785`, ink `#000000`, (6.5:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#F6F9FC`, ink `#0b0b0c`, (18.6:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#F6F9FC`, ink `#0b0b0c`, (18.6:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#F5FBFF`, ink `#0b0b0c`, (18.9:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#F5FBFF`, (18.9:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#F6F9FC`, ink `#0b0b0c`, (18.6:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#F5FBFF` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#FF4785` with `#f7f7f8` text (3.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#F6F9FC` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
