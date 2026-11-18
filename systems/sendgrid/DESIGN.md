---
version: alpha
name: SendGrid
description: "SendGrid — tokens imported from @sendgrid/ui-components."
colors:
  slate: "#294661"
  sg-blue: "#1a82e2"
  sg-blue-80: "#489be8"
  sg-blue-60: "#76b4ee"
  sg-blue-40: "#a3cdf3"
  sg-blue-20: "#d1e6f9"
  sg-blue-10: "#e8f2fc"
  sg-blue-05: "#f3f9fd"
  sg-blue-02: "#fbfdff"
  slate-80: "#546b81"
  slate-60: "#7f90a0"
  slate-40: "#a9b5c0"
  slate-20: "#d4dadf"
  slate-10: "#e9ecef"
  slate-05: "#f4f6f7"
  slate-02: "#fbfbfc"
  logo-accent-light: "#99e1f4"
  logo-accent-medium: "#00b3e3"
  logo-accent-dark: "#009dd9"
  ron-burgundy: "#b71c1c"
  burnt-orange: "#ff5722"
  carrot: "#f90"
  mango: "#fdd835"
  mantis: "#18c96e"
  spruce: "#4cb04f"
  grass-stain: "#8ac24a"
  lime: "#cbdb39"
  cobalt: "#303f9f"
  bluebird: "#2196f3"
  seafoam: "#00bcd4"
  caribbean: "#00e5ff"
  crown: "#7b1fa2"
  screample: "#7c4dff"
  sangria: "#880e4f"
  lavender: "#dea7e8"
  wild-strawberry: "#ff4081"
  steel: "#9e9e9e"
  white: "#fff"
  black: "#000"
  sg-blue-dark: "#71ade4"
  slate-40-dark: "#9aa6b1"
  ron-burgundy-dark: "#ff5c5c"
  burnt-orange-dark: "#e87a5a"
  carrot-dark: "#e8a644"
  mango-dark: "#e3cc64"
  light-gray-dark: "#7c8b98"
  steel-dark: "#b9b9b9"
  caribbean-dark: "#00cee6"
  color-highlighter-dark: "#3b4958"
  active-line-dark: "#1f2b39"
  copy-button-dark: "#284462"
  alert-success: "#f1f7e9"
  alert-success-text: "#2e6b30"
  alert-warning: "#fefae6"
  alert-warning-text: "#8c6c15"
  alert-danger: "#f4dddd"
  alert-danger-text: "#b71c1c"
  header-tabs-hover: "#394f64"
  dropzone-hovered-bg: "#e7f9f0"
  fill: "#FFF"
  stroke: "#F4F6F7"
  color: "#294661"
  background-color: "#1A82e2"
  primary: "#f90"
typography:
  tooltip-font-size:
    fontSize: 12px
  font-size:
    fontSize: 16px
  font-family:
    fontFamily: "Colfax, \"Proxima Nova\", Helvetica, sans-serif"
  input-select-group-heading:
    fontSize: 13px
    fontWeight: 600
    lineHeight: 18px
  day-picker-keyboard-shortcuts-title:
    fontSize: 16px
    fontWeight: 700
  calendar-month-caption:
    fontSize: 18px
  meter-title:
    fontSize: 10px
  modal-title:
    fontSize: 20px
    lineHeight: 30px
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
    backgroundColor: "#f4f6f7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#f90"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#f90"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f4f6f7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f4f6f7"
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
    backgroundColor: "#f4f6f7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# SendGrid

## Overview

**SendGrid** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#f90` brand accent.

Typography centers cleanly on `Colfax` (20px display down to 16px body), unified by `8px` base corner radius and stepped `#fff` -> `#f4f6f7` surface layering.

Source: published token package, package `@sendgrid/ui-components`. Inventory: **64** colors, **8** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f4f6f7` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#f90` (2.1:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.2:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `slate` (`#294661`), `sg-blue` (`#1a82e2`), `sg-blue-80` (`#489be8`), `sg-blue-60` (`#76b4ee`), `sg-blue-40` (`#a3cdf3`), `sg-blue-20` (`#d1e6f9`).
- **Neutral Ramp**: `sg-blue-10` (`#e8f2fc`), `sg-blue-05` (`#f3f9fd`), `sg-blue-02` (`#fbfdff`), `slate-40` (`#a9b5c0`), `slate-20` (`#d4dadf`), `slate-10` (`#e9ecef`).
- **Semantic States**: success: `alert-success-text` (`#2e6b30`) · danger: `alert-warning-text` (`#8c6c15`) · warning: `burnt-orange` (`#ff5722`).

## Typography

- **Primary / Display Voice**: `Colfax, "Proxima Nova", Helvetica, sans-serif` (top step `modal-title`: 20px, weight 600, line-height 30px).
- **Body & UI Controls**: `Colfax, "Proxima Nova", Helvetica, sans-serif` (`font-size`: 16px, weight 400).
- **Scale Steps (8)**: `modal-title` (20px), `calendar-month-caption` (18px), `font-size` (16px), `font-family` (16px), `day-picker-keyboard-shortcuts-title` (16px, w700), `input-select-group-heading` (13px, w600), `tooltip-font-size` (12px), `meter-title` (10px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#f4f6f7` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#f4f6f7`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#f90` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#f4f6f7`, ink `#0b0b0c`, (18.1:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#f90`, ink `#0b0b0c`, (9.2:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#f90`, ink `#0b0b0c`, (9.2:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f4f6f7`, ink `#0b0b0c`, (18.1:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f4f6f7`, ink `#0b0b0c`, (18.1:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f4f6f7`, ink `#0b0b0c`, (18.1:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#f90` with `#0b0b0c` text (9.2:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Colfax` headings with `Colfax` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f4f6f7` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
