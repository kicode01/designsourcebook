---
version: alpha
name: NES.css
description: "NES.css — tokens imported from nes.css."
colors:
  color-black: "#212529"
  color-white: "#fff"
  color-00: "#7c7c7c"
  color-01: "#0000fc"
  color-02: "#0000bc"
  color-03: "#4428bc"
  color-04: "#940084"
  color-05: "#a80020"
  color-06: "#a81000"
  color-07: "#881400"
  color-08: "#503000"
  color-09: "#007800"
  color-0-a: "#006800"
  color-0-b: "#005800"
  color-0-c: "#004058"
  color-0-d: "#000"
  color-0-e: "#000"
  color-0-f: "#000"
  color-10: "#bcbcbc"
  color-11: "#0078f8"
  color-12: "#0058f8"
  color-13: "#6844fc"
  color-14: "#d800cc"
  color-15: "#e40058"
  color-16: "#f83800"
  color-17: "#e45c10"
  color-18: "#ac7c00"
  color-19: "#00b800"
  color-1-a: "#00a800"
  color-1-b: "#00a844"
  color-1-c: "#088"
  color-1-d: "#000"
  color-1-e: "#000"
  color-1-f: "#000"
  color-20: "#f8f8f8"
  color-21: "#3cbcfc"
  color-22: "#6888fc"
  color-23: "#9878f8"
  color-24: "#f878f8"
  color-25: "#f85898"
  color-26: "#f87858"
  color-27: "#fca044"
  color-28: "#f8b800"
  color-29: "#b8f818"
  color-2-a: "#58d854"
  color-2-b: "#58f898"
  color-2-c: "#00e8d8"
  color-2-d: "#787878"
  color-2-e: "#000"
  color-2-f: "#000"
  color-30: "#fcfcfc"
  color-31: "#a4e4fc"
  color-32: "#b8b8f8"
  color-33: "#d8b8f8"
  color-34: "#f8b8f8"
  color-35: "#f8a4c0"
  color-36: "#f0d0b0"
  color-37: "#fbdfa6"
  color-38: "#f8d878"
  color-39: "#d8f878"
  color-3-a: "#b8f8b8"
  color-3-b: "#b8f8d8"
  color-3-c: "#00fcfc"
  color-3-d: "#d8d8d8"
  color-3-e: "#000"
  color-3-f: "#000"
  hover: "#e7e7e7"
  normal: "#d3d3d3"
  primary: "#3cbcfc"
typography:
  html:
    fontFamily: sans-serif
    lineHeight: 1.15
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\""
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  title:
    fontSize: 1rem
  font-size:
    fontSize: 16px
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
  btn:
    backgroundColor: "#fff"
    textColor: "#212529"
    padding: 6px 8px
  table:
    backgroundColor: "#fff"
  progress:
    backgroundColor: "#fff"
    textColor: "#212529"
    height: 48px
  select-default:
    backgroundColor: "#f8f8f8"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#3cbcfc"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#3cbcfc"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f8f8f8"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f8f8f8"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#fff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#f8f8f8"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# NES.css

## Overview

**NES.css** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#3cbcfc` brand accent.

Display headlines pair `System Sans` with `System UI` body copy (16px display down to 16px body), unified by `8px` base corner radius and stepped `#fff` -> `#f8f8f8` surface layering.

Source: published token package (https://github.com/nostalgic-css/NES.css#readme), package `nes.css`. Inventory: **69** colors, **4** typography steps, and **10** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f8f8f8` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#3cbcfc` (2.1:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.2:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-01` (`#0000fc`), `color-02` (`#0000bc`), `color-03` (`#4428bc`), `color-04` (`#940084`), `color-05` (`#a80020`), `color-06` (`#a81000`).
- **Neutral Ramp**: `color-black` (`#212529`), `color-white` (`#fff`), `color-00` (`#7c7c7c`), `color-0-d` (`#000`), `color-0-e` (`#000`), `color-0-f` (`#000`).

## Typography

- **Primary / Display Voice**: `sans-serif` (top step `html`: 16px, weight 600, line-height 1.15).
- **Body & UI Controls**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` (`body`: 1rem, weight 400, line-height 1.5).
- **Scale Steps (4)**: `html` (16px), `body` (1rem, w400), `title` (1rem), `font-size` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 10 component tokens with documented paddings: `6px 8px`, `8px 12px`, `2px`, `6px 12px`, `12px 14px`.
- **Hierarchy**: Group controls cleanly within `#f8f8f8` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#f8f8f8`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#3cbcfc` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`btn` (button)**: bg `#fff`, ink `#212529`, (15.4:1), padding `6px 8px`.
- **`table` (table)**: bg `#fff`.
- **`progress` (progress)**: bg `#fff`, ink `#212529`, (15.4:1).
- **`select-default` (select)**: bg `#f8f8f8`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#3cbcfc`, ink `#0b0b0c`, (9.2:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#3cbcfc`, ink `#0b0b0c`, (9.2:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f8f8f8`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f8f8f8`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `12px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f8f8f8`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#3cbcfc` with `#0b0b0c` text (9.2:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System Sans` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f8f8f8` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
