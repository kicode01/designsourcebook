---
version: alpha
name: Teambition Clarity Design
description: "Crisp light (#ffffff) canvas, -apple-system typography, #1B9AEE brand accent, and 4px corner geometry"
colors:
  primary-brand: "#1B9AEE"
  highlight-brand: "#F2FBFF"
  bright-brand: "#CCECFF"
  border-brand: "#87D2FF"
  hover-brand: "#0171C2"
  click-brand: "#004F8A"
  heavy-brand: "#002E52"
  bg-canvas: "#ffffff"
  canvas-text: "#262626"
  nav-text: "#595959"
  nav-text-1: "#383838"
  footer-text: "rgba(36, 100, 147, 0.4)"
  body-text: "#a6a6a6"
  link-text: "#8c8c8c"
  link-text-2: "#61a6d8"
  primary: "#1B9AEE"
typography:
  header:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"PingFang SC\", \"Noto Sans\", \"Noto Sans CJK SC\", \"Microsoft YaHei\", \"微软雅黑\", sans-serif"
    fontSize: 16px
    fontWeight: 400
  nav:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"PingFang SC\", \"Noto Sans\", \"Noto Sans CJK SC\", \"Microsoft YaHei\", \"微软雅黑\", sans-serif"
    fontSize: 16px
    fontWeight: 400
rounded:
  input: 4px
  card: 4px
  button: 4px
  badge: 999px
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
  input:
    textColor: "#262626"
    rounded: 4px
    padding: 0px 8px
  card:
    textColor: "#262626"
  card-2:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 40px 48px 48px
  card-3:
    textColor: "#a6a6a6"
  card-4:
    textColor: "#1b9aee"
  button-primary:
    backgroundColor: "#1B9AEE"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 4px
    padding: 10px 18px
  badge-brand:
    backgroundColor: "#1B9AEE"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 16px
  select-default:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#1B9AEE"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#1B9AEE"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#ffffff"
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
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Teambition Clarity Design

## Overview

**Teambition Clarity Design** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#1B9AEE` brand accent.

Typography centers cleanly on `System UI` (16px display down to 16px body), unified by `4px` base corner radius and subtle shadow elevation.

Maintained by **Teambition**. Source: live stylesheet extraction (https://design.teambition.com/), frameworks: css. Inventory: **16** colors, **2** typography steps, and **19** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#ffffff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#1B9AEE` (3.0:1 vs canvas; pair with `#f7f7f8` foreground ink for 2.8:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `primary-brand` (`#1B9AEE`), `bright-brand` (`#CCECFF`), `border-brand` (`#87D2FF`), `hover-brand` (`#0171C2`), `click-brand` (`#004F8A`), `heavy-brand` (`#002E52`).
- **Neutral Ramp**: `highlight-brand` (`#F2FBFF`), `bg-canvas` (`#ffffff`), `canvas-text` (`#262626`), `nav-text` (`#595959`), `nav-text-1` (`#383838`), `body-text` (`#a6a6a6`).
- **Semantic States**: info: `link-text-2` (`#61a6d8`).

## Typography

- **Primary / Display Voice**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "PingFang SC", "Noto Sans", "Noto Sans CJK SC", "Microsoft YaHei", "微软雅黑", sans-serif` (top step `header`: 16px, weight 400).
- **Body & UI Controls**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "PingFang SC", "Noto Sans", "Noto Sans CJK SC", "Microsoft YaHei", "微软雅黑", sans-serif` (`header`: 16px, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 19 component tokens with documented paddings: `0px 8px`, `40px 48px 48px`, `10px 18px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#ffffff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Layered Shadow Model**: Uses documented shadows (`rgba(0, 0, 0, 0.06) 0px 2px 8px 0px`) paired with `color-mix(in srgb, #0b0b0c 14%, transparent)` borders for elevated overlays.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#1B9AEE` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `4px` (Buttons `4px` · Inputs `4px` · Badges `999px` · Navigation `4px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `4px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`input` (input)**: ink `#262626`, radius `4px`, padding `0px 8px`.
- **`card` (card)**: ink `#262626`.
- **`card-2` (card)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `40px 48px 48px`.
- **`card-3` (card)**: ink `#a6a6a6`.
- **`card-4` (card)**: ink `#1b9aee`.
- **`button-primary` (button)**: bg `#1B9AEE`, ink `#0b0b0c`, (6.5:1), radius `4px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `4px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `4px`, padding `10px 18px`.
- **`badge-brand` (badge)**: bg `#1B9AEE`, ink `#0b0b0c`, (6.5:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#1B9AEE`, ink `#0b0b0c`, (6.5:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#1B9AEE`, ink `#0b0b0c`, (6.5:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `12px 14px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#1B9AEE` with `#f7f7f8` text (2.8:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `4px` base geometry across inputs and buttons (4px on outer containers).
- Separate containers via `#ffffff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `4px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
