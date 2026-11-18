---
version: alpha
name: 98.css
description: "98.css — tokens imported from 98.css."
colors:
  text-color: "#222222"
  surface: "#c0c0c0"
  button-highlight: "#ffffff"
  button-face: "#dfdfdf"
  button-shadow: "#808080"
  window-frame: "#0a0a0a"
  dialog-blue: "#000080"
  dialog-blue-light: "#1084d0"
  dialog-gray: "#808080"
  dialog-gray-light: "#b5b5b5"
  link-blue: "#0000ff"
  primary: "#1084d0"
typography:
  body:
    fontFamily: Arial
    fontSize: 12px
  h1:
    fontSize: 5rem
  h3:
    fontSize: 2rem
  h2:
    fontSize: 2.5rem
  h4:
    fontSize: 1.5rem
rounded:
  nav: 8px
  default: 8px
icons:
  library: Repository SVGs
  package: null
  style: outline
  grid: 16
  strokeWidth: 1.5
  strokeLinecap: round
  strokeLinejoin: round
  source: repo
components:
  panel:
    backgroundColor: "#fff"
  tag:
    textColor: "#00f"
  link:
    textColor: "#00b0e8"
  hljs-selector-tag-2:
    textColor: "#00f"
  hljs-template-tag-3:
    textColor: "#a31515"
  switch-control:
    backgroundColor: "#1084d0"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#1084d0"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#ffffff"
    textColor: "#222222"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#ffffff"
    textColor: "#222222"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#ffffff"
    textColor: "#222222"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#222222"
    textColor: "#ffffff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#ffffff"
    textColor: "#222222"
    rounded: 8px
    padding: 8px
---

# 98.css

## Overview

**98.css** is a light-first design system anchored on `#ffffff` canvas surfaces with `#222222` primary ink (15.9:1 contrast) and `#1084d0` brand accent.

Typography centers cleanly on `Arial` (80px display down to 12px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Source: published token package (https://github.com/jdan/98.css), package `98.css`. Inventory: **12** colors, **5** typography steps, and **12** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#ffffff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#222222` — body copy and primary headings (15.9:1 on canvas).
- **Muted Ink (`muted`)**: `#222222` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#1084d0` (4.0:1 vs canvas; pair with `#f7f7f8` foreground ink for 3.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #222222 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `dialog-blue` (`#000080`), `dialog-blue-light` (`#1084d0`), `primary` (`#1084d0`).
- **Neutral Ramp**: `text-color` (`#222222`), `surface` (`#c0c0c0`), `button-highlight` (`#ffffff`), `button-face` (`#dfdfdf`), `button-shadow` (`#808080`), `window-frame` (`#0a0a0a`).
- **Semantic States**: info: `link-blue` (`#0000ff`).

## Typography

- **Primary / Display Voice**: `Arial` (top step `h1`: 5rem, weight 600).
- **Body & UI Controls**: `Arial` (`body`: 12px, weight 400).
- **Scale Steps (5)**: `h1` (5rem), `h2` (2.5rem), `h3` (2rem), `h4` (1.5rem), `body` (12px).

## Layout

- **Grid & Control Spacing**: Derived from 12 component tokens with documented paddings: `2px`, `6px 12px`, `12px 14px`, `10px 14px`, `6px 10px`.
- **Hierarchy**: Group controls cleanly within `#ffffff` cards; separate sibling sections using `color-mix(in srgb, #222222 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#ffffff`) and `1px solid color-mix(in srgb, #222222 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#1084d0` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Repository SVGs on a `16x16` grid (outline, stroke `1.5px`, `round` caps).

## Components

- **`panel` (panel)**: bg `#fff`, border `2px groove transparent`.
- **`tag` (badge)**: ink `#00f`.
- **`link` (link)**: ink `#00b0e8`.
- **`hljs-selector-tag-2` (select)**: ink `#00f`.
- **`hljs-template-tag-3` (badge)**: ink `#a31515`.
- **`switch-control` (switch)**: bg `#1084d0`, ink `#000000`, (5.2:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#1084d0`, ink `#000000`, (5.2:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#ffffff`, ink `#222222`, (15.9:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#ffffff`, ink `#222222`, (15.9:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#222222`, (15.9:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#222222`, ink `#ffffff`, (15.9:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#ffffff`, ink `#222222`, (15.9:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#222222` primary text and `#222222` secondary labels.
- Use `#1084d0` with `#f7f7f8` text (3.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Arial` headings with `Arial` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#ffffff` surface shifts and `color-mix(in srgb, #222222 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
