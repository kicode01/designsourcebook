---
version: alpha
name: Bold
description: "Bridge Design System Bold — read from the rendered page in a browser, not from published tokens."
colors:
  canvas-text: "#24252e"
  header-bg: "#ffffff"
  footer-bg: "#f0f0f5"
  link-bg: "#0069d0"
  button-border: "#d3d4dd"
  css-surface-6: "#007af0"
  css-color-7: "#696979"
  css-surface-8: "#fcce74"
  css-surface-9: "rgba(58, 58, 71, 0.1)"
  css-color-10: "#d01e29"
  css-border-11: "#7a7b8e"
  css-surface-12: "#ecf0ff"
  css-surface-13: "rgba(122, 123, 142, 0.16)"
  css-surface-14: "rgba(0, 105, 208, 0.16)"
  css-color-15: "#aaaaaa"
  css-fill-16: "#6d7e96"
  css-fill-17: "rgba(0,0,0,.5)"
  css-surface-18: "rgba(69,142,225,.05)"
  css-color-19: "#02060c"
  css-color-20: "#174d8c"
  css-surface-21: "rgba(143,187,237,.1)"
  css-surface-22: "#dddddd"
  css-color-23: "#33363d"
  css-color-24: "#a4a7ae"
  css-color-25: "#63676d"
  css-color-26: "#222222"
  css-surface-27: "#ebebeb"
  css-color-28: "#458ee1"
  css-surface-29: "#f8f8f8"
  css-color-30: "#3f4145"
  css-color-31: "#f8f8f2"
  css-surface-32: "#272822"
  css-color-33: "#708090"
  css-color-34: "#f92672"
  css-color-35: "#ae81ff"
  css-color-36: "#a6e22e"
  css-color-37: "#e6db74"
  css-color-38: "#66d9ef"
  css-color-39: "#fd971f"
  primary: "#fd971f"
typography:
  algolia-docsearch-suggestion-title:
    fontSize: ".9em"
    fontWeight: 700
  html:
    fontSize: 16px
  body:
    fontFamily: "\"IBM Plex Sans\", sans-serif"
    fontSize: 0.8125rem
  h1:
    fontSize: 1.5rem
  h2:
    fontSize: 1.25rem
  h3:
    fontSize: 1rem
  h4:
    fontSize: 0.875rem
  h5:
    fontSize: 0.8125rem
  h6:
    fontSize: 0.75rem
rounded:
  button: 4px
  input: 2px
  nav: 4px
  default: 4px
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
  button:
    textColor: "#24252e"
    rounded: 4px
    padding: 3px 7px
  button-2:
    backgroundColor: "#f0f0f5"
    textColor: "#24252e"
    rounded: 4px
    padding: 3px 7px
  input:
    backgroundColor: "#ffffff"
    textColor: "#24252e"
    rounded: 2px
    padding: 7px 8px 7px 40px
  select:
    backgroundColor: "#ffffff"
    textColor: "#24252e"
    rounded: 2px
    padding: 7px 8px 7px 40px
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
    backgroundColor: "#ecf0ff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#ecf0ff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#ffffff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#ecf0ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Bold

## Overview

**Bold** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#fd971f` brand accent.

Typography centers cleanly on `IBM Plex Sans` (24px display down to 13px body), unified by `4px` base corner radius and stepped `#ffffff` -> `#ecf0ff` surface layering.

Maintained by **Bridge Design System**. Source: live stylesheet extraction (https://bold.bridge.ufsc.tech/). Inventory: **40** colors, **9** typography steps, and **11** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#ecf0ff` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#fd971f` (2.2:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.0:1 contrast).
- **Structural Border (`border`)**: `#d3d4dd` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `css-surface-6` (`#007af0`), `css-surface-8` (`#fcce74`), `css-color-10` (`#d01e29`), `css-fill-16` (`#6d7e96`), `css-color-20` (`#174d8c`), `css-color-28` (`#458ee1`).
- **Neutral Ramp**: `canvas-text` (`#24252e`), `header-bg` (`#ffffff`), `footer-bg` (`#f0f0f5`), `button-border` (`#d3d4dd`), `css-color-7` (`#696979`), `css-border-11` (`#7a7b8e`).
- **Semantic States**: info: `link-bg` (`#0069d0`).

## Typography

- **Primary / Display Voice**: `"IBM Plex Sans", sans-serif` (top step `h1`: 1.5rem, weight 600).
- **Body & UI Controls**: `"IBM Plex Sans", sans-serif` (`body`: 0.8125rem, weight 400).
- **Scale Steps (9)**: `h1` (1.5rem), `h2` (1.25rem), `html` (16px), `h3` (1rem), `algolia-docsearch-suggestion-title` (.9em, w700), `h4` (0.875rem), `body` (0.8125rem), `h5` (0.8125rem).

## Layout

- **Grid & Control Spacing**: Derived from 11 component tokens with documented paddings: `3px 7px`, `7px 8px 7px 40px`, `2px`, `6px 12px`, `12px 14px`.
- **Hierarchy**: Group controls cleanly within `#ecf0ff` cards; separate sibling sections using `#d3d4dd` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#ecf0ff`) and `1px solid #d3d4dd` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#fd971f` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `4px` (Buttons `4px` · Inputs `2px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `4px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button` (button)**: ink `#24252e`, radius `4px`, padding `3px 7px`, border `1px solid rgba(0, 0, 0, 0)`.
- **`button-2` (button)**: bg `#f0f0f5`, ink `#24252e`, (13.4:1), radius `4px`, padding `3px 7px`, border `1px solid rgb(211, 212, 221)`.
- **`input` (input)**: bg `#ffffff`, ink `#24252e`, (15.2:1), radius `2px`, padding `7px 8px 7px 40px`.
- **`select` (select)**: bg `#ffffff`, ink `#24252e`, (15.2:1), radius `2px`, padding `7px 8px 7px 40px`.
- **`switch-control` (switch)**: bg `#fd971f`, ink `#0b0b0c`, (9.0:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#fd971f`, ink `#0b0b0c`, (9.0:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#ecf0ff`, ink `#0b0b0c`, (17.3:1), radius `4px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#ecf0ff`, ink `#0b0b0c`, (17.3:1), radius `4px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#ecf0ff`, ink `#0b0b0c`, (17.3:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#fd971f` with `#0b0b0c` text (9.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `IBM Plex Sans` headings with `IBM Plex Sans` body copy using documented weights and scale steps.
- Apply `4px` base geometry across inputs and buttons (4px on outer containers).
- Separate containers via `#ecf0ff` surface shifts and `#d3d4dd` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `4px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
