---
version: alpha
name: BBC GEL
description: "Crisp light (#e6e8ea) canvas, ReithSans typography, #ffb32b brand accent, and 8px corner geometry"
colors:
  canvas-text: "#000000"
  header-text: "#3a3c3e"
  nav-bg: "#ffffff"
  footer-text: "#f8f8f8"
  h2-text: "#383838"
  h2-border: "#c8c8c8"
  h2-text-1: "#f6f6f6"
  body-text: "#545658"
  link-text: "#0000ee"
  css-surface-10: "rgba(0,0,0,.15)"
  css-surface-11: "rgba(255,255,255,.15)"
  css-surface-12: "#eb0000"
  css-surface-13: "#ffd230"
  css-surface-14: "#149edc"
  css-surface-15: "#ff4c98"
  css-surface-16: "#fa6400"
  css-surface-17: "#963ce1"
  css-surface-18: "#4023e0"
  css-surface-19: "#4505a8"
  css-surface-20: "#ffe727"
  css-surface-21: "#181818"
  css-border-22: "#cccccc"
  css-color-23: "#333333"
  css-surface-24: "#4c4c4c"
  css-surface-25: "rgba(0,0,0,.7)"
  css-border-26: "#949494"
  css-border-27: "rgba(255,255,255,.4)"
  css-border-28: "#505050"
  css-border-29: "#888888"
  css-color-30: "#a8a8a8"
  css-surface-31: "#1188bb"
  css-surface-32: "#e4e4e4"
  css-surface-33: "#e6e8ea"
  css-border-34: "#666666"
  css-surface-35: "#202224"
  css-border-36: "rgba(0,0,0,.3)"
  css-border-37: "hsla(0,0%,80%,.3)"
  css-surface-38: "#006def"
  css-surface-39: "#0178ff"
  css-surface-40: "#0071f1"
  css-surface-41: "#0064e6"
  css-surface-42: "#dbdbdb"
  css-surface-43: "#005bc8"
  css-surface-44: "#148a00"
  css-color-45: "#b0b2b4"
  css-color-46: "#141414"
  css-surface-47: "#ffb32b"
  primary: "#ffb32b"
typography:
  header:
    fontFamily: "ReithSans, Arial, Helvetica, freesans, sans-serif"
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1
  nav:
    fontFamily: "ReithSans, Arial, Helvetica, freesans, sans-serif"
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1
  h1:
    fontFamily: "ReithSans, Arial, Helvetica, freesans, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1
  h2:
    fontFamily: "ReithSans, Arial, Helvetica, freesans, sans-serif"
    fontSize: 10px
    fontWeight: 400
    lineHeight: 2
rounded:
  input: 8px
  card: 12px
  nav: 8px
  default: 8px
icons:
  library: Inline System SVGs
  package: null
  style: solid
  grid: 32
  strokeWidth: 0
  strokeLinecap: round
  strokeLinejoin: round
  source: observed
components:
  button:
    textColor: "#0000ee"
  button-2:
    textColor: "#000000"
  button-3:
    backgroundColor: "#f6f6f6"
    textColor: "#000000"
    padding: 12px
  button-4:
    textColor: "#f6f6f6"
  badge:
    backgroundColor: "#f6f6f6"
    textColor: "#3a3c3e"
    padding: 4px
  input-default:
    backgroundColor: "#e6e8ea"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#e6e8ea"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  nav-bar:
    backgroundColor: "#e6e8ea"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#e6e8ea"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#ffb32b"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#ffb32b"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#e6e8ea"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#e6e8ea"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#e6e8ea"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#e6e8ea"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#e6e8ea"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# BBC GEL

## Overview

**BBC GEL** is a light-first design system anchored on `#e6e8ea` canvas surfaces with `#0b0b0c` primary ink (16.0:1 contrast) and `#ffb32b` brand accent.

Typography centers cleanly on `ReithSans` (20px display down to 10px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **BBC**. Source: live stylesheet extraction (https://www.bbc.co.uk/gel), repo https://github.com/bbc/gel, frameworks: react, css. Inventory: **48** colors, **4** typography steps, and **16** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#e6e8ea` — base application backdrop (light theme).
- **Surface (`surface`)**: `#e6e8ea` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (16.0:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ffb32b` (1.5:1 vs canvas; pair with `#0b0b0c` foreground ink for 11.0:1 contrast).
- **Structural Border (`border`)**: `#c8c8c8` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `css-surface-12` (`#eb0000`), `css-surface-13` (`#ffd230`), `css-surface-14` (`#149edc`), `css-surface-15` (`#ff4c98`), `css-surface-16` (`#fa6400`), `css-surface-17` (`#963ce1`).
- **Neutral Ramp**: `canvas-text` (`#000000`), `header-text` (`#3a3c3e`), `nav-bg` (`#ffffff`), `footer-text` (`#f8f8f8`), `h2-text` (`#383838`), `h2-border` (`#c8c8c8`).
- **Semantic States**: info: `link-text` (`#0000ee`).

## Typography

- **Primary / Display Voice**: `ReithSans, Arial, Helvetica, freesans, sans-serif` (top step `h1`: 20px, weight 700, line-height 1).
- **Body & UI Controls**: `ReithSans, Arial, Helvetica, freesans, sans-serif` (`h2`: 10px, weight 400, line-height 2).
- **Scale Steps (4)**: `h1` (20px, w700), `header` (10px, w400), `nav` (10px, w400), `h2` (10px, w400).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `12px`, `4px`, `9px 13px`, `18px 20px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#e6e8ea` cards; separate sibling sections using `#c8c8c8` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#e6e8ea` -> `#e6e8ea`) and `1px solid #c8c8c8` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ffb32b` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Inputs `8px` · Cards `12px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `32x32` grid (solid, stroke `0px`, `round` caps).

## Components

- **`button` (button)**: ink `#0000ee`.
- **`button-2` (button)**: ink `#000000`.
- **`button-3` (button)**: bg `#f6f6f6`, ink `#000000`, (19.4:1), padding `12px`.
- **`button-4` (button)**: ink `#f6f6f6`.
- **`badge` (badge)**: bg `#f6f6f6`, ink `#3a3c3e`, (10.2:1), padding `4px`.
- **`input-default` (input)**: bg `#e6e8ea`, ink `#0b0b0c`, (16.0:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#e6e8ea`, ink `#0b0b0c`, (16.0:1), radius `12px`, padding `18px 20px`.
- **`nav-bar` (nav)**: bg `#e6e8ea`, ink `#0b0b0c`, (16.0:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#e6e8ea`, ink `#0b0b0c`, (16.0:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#ffb32b`, ink `#0b0b0c`, (11.0:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#ffb32b`, ink `#0b0b0c`, (11.0:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#e6e8ea`, ink `#0b0b0c`, (16.0:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#e6e8ea`, ink `#0b0b0c`, (16.0:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#e6e8ea`, ink `#0b0b0c`, (16.0:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#e6e8ea`, (16.0:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#e6e8ea`, ink `#0b0b0c`, (16.0:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#e6e8ea` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ffb32b` with `#0b0b0c` text (11.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `ReithSans` headings with `ReithSans` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#e6e8ea` surface shifts and `#c8c8c8` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
