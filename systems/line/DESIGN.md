---
version: alpha
name: LINE Design System
description: "LINE Design System — read from the rendered page in a browser, not from published tokens."
colors:
  bg-canvas: "#ffffff"
  canvas-text: "#000000"
  footer-bg: "#fcfcfc"
  body-text: "#616161"
  body-text-1: "rgba(255, 255, 255, 0.7)"
  link-border: "#efefef"
  badge-border: "#e8e8e8"
  css-color-8: "#06c755"
  css-color-9: "rgba(6, 199, 85, 0.1)"
  css-color-10: "rgba(6, 199, 85, 0.2)"
  css-color-11: "rgba(6, 199, 85, 0.4)"
  css-color-12: "rgba(6, 199, 85, 0.6)"
  css-color-13: "rgba(6, 199, 85, 0.8)"
  css-color-14: "rgba(0, 0, 0, 0.1)"
  css-color-15: "rgba(0, 0, 0, 0.2)"
  css-color-16: "rgba(0, 0, 0, 0.4)"
  css-color-17: "rgba(0, 0, 0, 0.6)"
  css-color-18: "rgba(0, 0, 0, 0.8)"
  css-color-19: "#4d73ff"
  css-color-20: "rgba(77, 115, 255, 0.1)"
  css-color-21: "rgba(77, 115, 255, 0.2)"
  css-color-22: "rgba(77, 115, 255, 0.4)"
  css-color-23: "rgba(77, 115, 255, 0.6)"
  css-color-24: "rgba(77, 115, 255, 0.8)"
  css-color-25: "#f7f8f9"
  css-color-26: "rgba(247, 248, 249, 0.1)"
  css-color-27: "rgba(247, 248, 249, 0.2)"
  css-color-28: "rgba(247, 248, 249, 0.4)"
  css-color-29: "rgba(247, 248, 249, 0.6)"
  css-color-30: "rgba(247, 248, 249, 0.8)"
  css-color-31: "#999999"
  css-color-32: "#bbbbbb"
  css-color-33: "#2196f3"
  css-color-34: "#e02000"
  css-color-35: "#1f1f1f"
  css-color-36: "rgba(0, 0, 0, 0.15)"
  css-color-37: "#949494"
  css-surface-38: "rgba(0, 0, 0, 0.02)"
  css-surface-39: "#f7f8fb"
  css-surface-40: "rgba(204, 211, 229, 0.15)"
  css-color-41: "#555555"
  css-surface-42: "#f6f6f8"
  css-surface-43: "#f5f5f5"
  css-color-44: "#777777"
  css-color-45: "#b7b7b7"
  css-color-46: "#c8c8c8"
  css-border-top-47: "#e1e1e1"
  css-surface-48: "#dfdfdf"
  css-surface-49: "#2a2a2a"
  css-surface-50: "rgba(255, 255, 255, 0.85)"
  css-surface-51: "rgba(255, 255, 255, 0.95)"
  css-color-52: "rgba(255, 255, 255, 0.6)"
  css-surface-53: "#fafafa"
  css-surface-54: "#e5e5e5"
  css-color-55: "rgba(255, 255, 255, 0.1)"
  css-surface-56: "rgba(255, 255, 255, 0.2)"
  css-surface-57: "#cccccc"
  css-surface-58: "rgba(0, 0, 0, 0.05)"
  css-border-59: "rgba(230, 230, 230, 0.6)"
  css-color-60: "rgba(30, 30, 30, 0.2)"
  css-surface-61: "rgba(0, 0, 0, 0.3)"
  css-color-62: "#a0a0a0"
  primary: "#06c755"
typography:
  html:
    fontSize: 10px
    lineHeight: 10px
  body:
    fontSize: 15px
    fontWeight: 400
    lineHeight: 19px
  h2:
    fontSize: 17px
    fontWeight: 700
    lineHeight: 28px
  h3:
    fontSize: 20px
    lineHeight: 28px
  h4:
    fontSize: 18px
    lineHeight: 26px
  h5:
    fontSize: 16px
    lineHeight: 21px
  title:
    fontSize: 20px
    fontWeight: 700
    lineHeight: 34px
  main-title:
    fontFamily: LineSeed
    fontSize: 40px
    fontWeight: 900
    lineHeight: 54px
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
  button:
    textColor: "rgb(0, 0, 0)"
  select-default:
    backgroundColor: "#f7f8fb"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#06c755"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#06c755"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f7f8fb"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f7f8fb"
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
    backgroundColor: "#f7f8fb"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# LINE Design System

## Overview

**LINE Design System** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#06c755` brand accent.

Typography centers cleanly on `LineSeed` (40px display down to 15px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#f7f8fb` surface layering.

Maintained by **Line**. Source: live stylesheet extraction (https://designsystem.line.me/). Inventory: **63** colors, **8** typography steps, and **9** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f7f8fb` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#06c755` (2.3:1 vs canvas; pair with `#0b0b0c` foreground ink for 8.7:1 contrast).
- **Structural Border (`border`)**: `#efefef` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `css-color-8` (`#06c755`), `css-color-13` (`rgba(6, 199, 85, 0.8)`), `css-color-19` (`#4d73ff`), `css-color-24` (`rgba(77, 115, 255, 0.8)`), `css-color-33` (`#2196f3`), `css-color-34` (`#e02000`).
- **Neutral Ramp**: `bg-canvas` (`#ffffff`), `canvas-text` (`#000000`), `footer-bg` (`#fcfcfc`), `body-text` (`#616161`), `link-border` (`#efefef`), `badge-border` (`#e8e8e8`).

## Typography

- **Primary / Display Voice**: `LineSeed` (top step `main-title`: 40px, weight 900, line-height 54px).
- **Body & UI Controls**: `LineSeed` (`body`: 15px, weight 400, line-height 19px).
- **Scale Steps (8)**: `main-title` (40px, w900), `h3` (20px), `title` (20px, w700), `h4` (18px), `h2` (17px, w700), `h5` (16px), `body` (15px, w400), `html` (10px).

## Layout

- **Grid & Control Spacing**: Derived from 9 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#f7f8fb` cards; separate sibling sections using `#efefef` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#f7f8fb`) and `1px solid #efefef` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#06c755` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button` (button)**: ink `rgb(0, 0, 0)`.
- **`select-default` (select)**: bg `#f7f8fb`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#06c755`, ink `#0b0b0c`, (8.7:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#06c755`, ink `#0b0b0c`, (8.7:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f7f8fb`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f7f8fb`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f7f8fb`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#06c755` with `#0b0b0c` text (8.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `LineSeed` headings with `LineSeed` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f7f8fb` surface shifts and `#efefef` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
