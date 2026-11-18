---
version: alpha
name: Rimble
description: "ConsenSys Rimble — tokens imported from rimble-ui."
colors:
  black: "#000"
  white: "#FFF"
  blue: "#36ADF1"
  green: "#28C081"
  yellow: "#FD9D28"
  red: "#DC2C10"
  blurple: "#4E3FCE"
  consensysblue: "#3259D6"
  text: "#3F3D4B"
  background: "#fff"
  near-black: "#111"
  dark-gray: "#333"
  mid-gray: "#555"
  grey: "#CCC"
  silver: "#999"
  light-silver: "#aaa"
  moon-gray: "#ccc"
  light-gray: "#eee"
  near-white: "#f4f4f4"
  opts-color: "#dfe"
  opts-bgcolor: "#a71"
  opts-spotcolor: "#000"
  color: "#dfe"
  bgcolor: "#a71"
  spotcolor: "#000"
  fill: "#763D16"
  base-color: "#000"
  hover-color: "#4c4c4c"
  active-color: "#999"
  foreground-color: "#FFFFFF"
  bg: "#FFF"
  bg-color: "#FFFFFF"
  fg-color: "#000000"
  primary: "#9387FF"
  fff: "#666"
  cccd64: "#0000ff"
typography:
  serif:
    fontFamily: "athelas, georgia, times, serif"
  sans-serif:
    fontFamily: "\"Source Sans Pro\", -apple-system, sans-serif"
  mono:
    fontFamily: "\"Source Code Pro\", -apple-system, monospace"
  font-size:
    fontSize: 1rem
  font-family:
    fontFamily: "monospace, monospace"
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
    backgroundColor: "#FFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#9387FF"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#9387FF"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#FFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#FFF"
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
    backgroundColor: "#FFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Rimble

## Overview

**Rimble** is a light-first design system anchored on `#FFFFFF` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#9387FF` brand accent.

Typography centers cleanly on `athelas` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#FFFFFF` -> `#FFF` surface layering.

Maintained by **ConsenSys**. Source: published token package (https://rimble.consensys.design/), package `rimble-ui`. Inventory: **36** colors, **5** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#FFFFFF` — base application backdrop (light theme).
- **Surface (`surface`)**: `#FFF` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#9387FF` (2.9:1 vs canvas; pair with `#f7f7f8` foreground ink for 2.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `blue` (`#36ADF1`), `blurple` (`#4E3FCE`), `consensysblue` (`#3259D6`), `opts-color` (`#dfe`), `opts-bgcolor` (`#a71`), `color` (`#dfe`).
- **Neutral Ramp**: `black` (`#000`), `white` (`#FFF`), `text` (`#3F3D4B`), `background` (`#fff`), `near-black` (`#111`), `dark-gray` (`#333`).
- **Semantic States**: success: `green` (`#28C081`) · danger: `red` (`#DC2C10`) · warning: `yellow` (`#FD9D28`).

## Typography

- **Primary / Display Voice**: `athelas, georgia, times, serif` (top step `serif`: 16px, weight 600).
- **Body & UI Controls**: `athelas, georgia, times, serif` (`serif`: 16px, weight 400).
- **Monospace / Technical Labels**: `"Source Code Pro", -apple-system, monospace` (`mono`: 16px).
- **Scale Steps (5)**: `serif` (16px), `sans-serif` (16px), `mono` (16px), `font-size` (1rem), `font-family` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#FFF` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#FFFFFF` -> `#FFF`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#9387FF` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#FFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#9387FF`, ink `#000000`, (7.2:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#9387FF`, ink `#000000`, (7.2:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#FFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#FFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#FFFFFF`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#FFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#FFFFFF` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#9387FF` with `#f7f7f8` text (2.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `athelas` headings with `athelas` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#FFF` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
