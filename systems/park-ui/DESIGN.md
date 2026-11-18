---
version: alpha
name: Park UI
description: "Park UI — tokens imported from @park-ui/panda-preset."
colors:
  a1: "#c0800004"
  a2: "#f4d10016"
  a3: "#ffde003d"
  a4: "#ffd40063"
  a5: "#f8cf0088"
  a6: "#eab5008c"
  a7: "#dc9b009d"
  a8: "#da8a00c9"
  a9: "#ffb300c2"
  a10: "#ffb300e7"
  a11: "#ab6400"
  a12: "#341500dd"
  black-default: "#000000"
  black-a1: "rgba(0, 0, 0, 0.05)"
  black-a2: "rgba(0, 0, 0, 0.1)"
  black-a3: "rgba(0, 0, 0, 0.15)"
  black-a4: "rgba(0, 0, 0, 0.2)"
  black-a5: "rgba(0, 0, 0, 0.3)"
  black-a6: "rgba(0, 0, 0, 0.4)"
  black-a7: "rgba(0, 0, 0, 0.5)"
  black-a8: "rgba(0, 0, 0, 0.6)"
  black-a9: "rgba(0, 0, 0, 0.7)"
  black-a10: "rgba(0, 0, 0, 0.8)"
  black-a11: "rgba(0, 0, 0, 0.9)"
  black-a12: "rgba(0, 0, 0, 0.95)"
  white-default: "#ffffff"
  white-a1: "rgba(255, 255, 255, 0.05)"
  white-a2: "rgba(255, 255, 255, 0.1)"
  white-a3: "rgba(255, 255, 255, 0.15)"
  white-a4: "rgba(255, 255, 255, 0.2)"
  white-a5: "rgba(255, 255, 255, 0.3)"
  white-a6: "rgba(255, 255, 255, 0.4)"
  white-a7: "rgba(255, 255, 255, 0.5)"
  white-a8: "rgba(255, 255, 255, 0.6)"
  white-a9: "rgba(255, 255, 255, 0.7)"
  white-a10: "rgba(255, 255, 255, 0.8)"
  white-a11: "rgba(255, 255, 255, 0.9)"
  white-a12: "rgba(255, 255, 255, 0.95)"
  transparent: "rgb(0 0 0 / 0)"
  primary: "#ab6400"
typography:
  font-size:
    fontSize: 1.1em
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
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#ab6400"
    textColor: "#ffffff"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#ab6400"
    textColor: "#ffffff"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#ffffff"
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
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Park UI

## Overview

**Park UI** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#ab6400` brand accent.

Typography centers cleanly on `System UI` (18px display down to 18px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Source: published token package (https://park-ui.com), package `@park-ui/panda-preset`. Inventory: **40** colors, **1** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#ffffff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ab6400` (4.6:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.3:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `a8` (`#da8a00c9`), `a9` (`#ffb300c2`), `a10` (`#ffb300e7`), `a11` (`#ab6400`), `a12` (`#341500dd`), `primary` (`#ab6400`).
- **Neutral Ramp**: `black-default` (`#000000`), `black-a10` (`rgba(0, 0, 0, 0.8)`), `black-a11` (`rgba(0, 0, 0, 0.9)`), `black-a12` (`rgba(0, 0, 0, 0.95)`), `white-default` (`#ffffff`), `white-a10` (`rgba(255, 255, 255, 0.8)`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `font-size`: 1.1em, weight 600).
- **Body & UI Controls**: `system-ui` (`font-size`: 1.1em, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#ffffff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#ffffff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ab6400` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#ab6400`, ink `#ffffff`, (4.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#ab6400`, ink `#ffffff`, (4.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ab6400` with `#f7f7f8` text (4.3:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#ffffff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
