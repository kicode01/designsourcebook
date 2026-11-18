---
version: alpha
name: Generic Components
description: "generic-components Generic Components — read from the rendered page in a browser, not from published tokens."
colors:
  canvas-text: "#000000"
  nav-bg: "#2137d0"
  nav-text: "#ffffff"
  link-text: "#0000ee"
  badge-text: "#f92672"
  css-surface-6: "#303136"
  css-surface-7: "#f1f5ff"
  css-border-8: "#cecece"
  css-color-9: "#444444"
  css-color-10: "#f8f8f2"
  css-surface-11: "#272822"
  css-color-12: "#ae81ff"
  css-color-13: "#a6e22e"
  css-color-14: "#e6db74"
  css-color-15: "#66d9ef"
  css-color-16: "#fd971f"
  primary: "#fd971f"
typography:
  body:
    fontFamily: sans-serif
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
  nav:
    backgroundColor: "#2137d0"
    textColor: white
    padding: 40px
  select-default:
    backgroundColor: "#f1f5ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#fd971f"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#fd971f"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f1f5ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f1f5ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#f8f8f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#f8f8f2"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#f1f5ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Generic Components

## Overview

**Generic Components** is a light-first design system anchored on `#f8f8f2` canvas surfaces with `#0b0b0c` primary ink (18.5:1 contrast) and `#fd971f` brand accent.

Typography centers cleanly on `System Sans` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#f8f8f2` -> `#f1f5ff` surface layering.

Maintained by **generic-components**. Source: live stylesheet extraction (https://genericcomponents.netlify.app/index.html). Inventory: **17** colors, **1** typography steps, and **9** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#f8f8f2` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f1f5ff` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (18.5:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#fd971f` (2.0:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.0:1 contrast).
- **Structural Border (`border`)**: `#cecece` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `nav-bg` (`#2137d0`), `badge-text` (`#f92672`), `css-color-12` (`#ae81ff`), `css-color-13` (`#a6e22e`), `css-color-14` (`#e6db74`), `css-color-15` (`#66d9ef`).
- **Neutral Ramp**: `canvas-text` (`#000000`), `nav-text` (`#ffffff`), `css-surface-6` (`#303136`), `css-surface-7` (`#f1f5ff`), `css-border-8` (`#cecece`), `css-color-9` (`#444444`).
- **Semantic States**: info: `link-text` (`#0000ee`).

## Typography

- **Primary / Display Voice**: `sans-serif` (top step `body`: 16px, weight 600).
- **Body & UI Controls**: `sans-serif` (`body`: 16px, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 9 component tokens with documented paddings: `40px`, `8px 12px`, `2px`, `6px 12px`, `12px 14px`.
- **Hierarchy**: Group controls cleanly within `#f1f5ff` cards; separate sibling sections using `#cecece` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#f8f8f2` -> `#f1f5ff`) and `1px solid #cecece` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#fd971f` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`nav` (nav)**: bg `#2137d0`, ink `white`, (8.3:1), padding `40px`.
- **`select-default` (select)**: bg `#f1f5ff`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#fd971f`, ink `#0b0b0c`, (9.0:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#fd971f`, ink `#0b0b0c`, (9.0:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f1f5ff`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f1f5ff`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#f8f8f2`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#f8f8f2`, (18.5:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f1f5ff`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#f8f8f2` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#fd971f` with `#0b0b0c` text (9.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System Sans` headings with `System Sans` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f1f5ff` surface shifts and `#cecece` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
