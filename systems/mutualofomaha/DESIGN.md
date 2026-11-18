---
version: alpha
name: Digital Design Guide
description: "Mutual of Omaha Digital Design Guide — read from the rendered page in a browser, not from published tokens."
colors:
  canvas-text: "#5d5d5d"
  header-bg: "#003a70"
  nav-bg: "#ffffff"
  footer-bg: "#f7f7f7"
  footer-border: "#e5e5e5"
  link-bg: "#105fa8"
  link-text: "#444444"
  css-surface-8: "#3b8070"
  css-surface-9: "#ffff00"
  css-color-10: "#000000"
  css-color-11: "#03746e"
  css-border-12: "#bababa"
  css-color-13: "#a5cff8"
  css-surface-14: "#105ea6"
  css-color-15: "#222222"
  css-surface-16: "rgba(3, 160, 173, 0.08)"
  css-color-17: "#838383"
  css-surface-18: "#19517f"
  css-surface-19: "rgba(25, 81, 127, 0.9)"
  css-color-20: "#1f96db"
  css-color-21: "#565656"
  css-color-22: "#68b631"
  css-surface-23: "rgba(0,0,0,.5)"
  css-surface-24: "#f9fffa"
  css-fill-25: "#32ae88"
  css-color-26: "#555555"
  css-color-27: "#333333"
  css-border-28: "#888888"
  css-surface-29: "#33c3f0"
  css-surface-30: "#1eaedb"
  primary: "#33c3f0"
typography:
  h1:
    fontSize: 1.5rem
    lineHeight: 1.2
  h2:
    fontSize: 1.5rem
    lineHeight: 1.25
  h3:
    fontSize: 1.5rem
    lineHeight: 1.3
  h4:
    fontSize: 1.5rem
    lineHeight: 1.35
  h5:
    fontSize: 1.5rem
    lineHeight: 1.5
  h6:
    fontSize: 1.5rem
    lineHeight: 1.6
  html:
    fontFamily: sans-serif
  body:
    fontFamily: "\"Source Sans Pro\", sans-serif"
    fontSize: 1.6rem
    fontWeight: 400
    lineHeight: 2.4rem
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
  link:
    textColor: "rgb(16, 95, 168)"
  progress:
    backgroundColor: "rgb(59, 128, 112)"
    height: 2px
    width: 0px
  progress-failed-2:
    backgroundColor: red
  select-default:
    backgroundColor: "#f7f7f7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#33c3f0"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#33c3f0"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f7f7f7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f7f7f7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#f9fffa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#f9fffa"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#f7f7f7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Digital Design Guide

## Overview

**Digital Design Guide** is a light-first design system anchored on `#f9fffa` canvas surfaces with `#0b0b0c` primary ink (19.4:1 contrast) and `#33c3f0` brand accent.

Display headlines pair `Source Sans Pro` with `System Sans` body copy (26px display down to 16px body), unified by `8px` base corner radius and stepped `#f9fffa` -> `#f7f7f7` surface layering.

Maintained by **Mutual of Omaha**. Source: live stylesheet extraction (http://design.mutualofomaha.com/digital/). Inventory: **31** colors, **8** typography steps, and **11** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#f9fffa` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f7f7f7` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.4:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#33c3f0` (2.0:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.6:1 contrast).
- **Structural Border (`border`)**: `#e5e5e5` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `header-bg` (`#003a70`), `css-surface-8` (`#3b8070`), `css-surface-9` (`#ffff00`), `css-color-11` (`#03746e`), `css-color-13` (`#a5cff8`), `css-surface-14` (`#105ea6`).
- **Neutral Ramp**: `canvas-text` (`#5d5d5d`), `nav-bg` (`#ffffff`), `footer-bg` (`#f7f7f7`), `footer-border` (`#e5e5e5`), `link-text` (`#444444`), `css-color-10` (`#000000`).
- **Semantic States**: info: `link-bg` (`#105fa8`).

## Typography

- **Primary / Display Voice**: `"Source Sans Pro", sans-serif` (top step `body`: 1.6rem, weight 400, line-height 2.4rem).
- **Body & UI Controls**: `sans-serif` (`html`: 16px, weight 400).
- **Scale Steps (8)**: `body` (1.6rem, w400), `h1` (1.5rem), `h2` (1.5rem), `h3` (1.5rem), `h4` (1.5rem), `h5` (1.5rem), `h6` (1.5rem), `html` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 11 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#f7f7f7` cards; separate sibling sections using `#e5e5e5` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#f9fffa` -> `#f7f7f7`) and `1px solid #e5e5e5` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#33c3f0` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`link` (link)**: ink `rgb(16, 95, 168)`.
- **`progress` (progress)**: bg `rgb(59, 128, 112)`.
- **`progress-failed-2` (progress)**: bg `red`.
- **`select-default` (select)**: bg `#f7f7f7`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#33c3f0`, ink `#0b0b0c`, (9.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#33c3f0`, ink `#0b0b0c`, (9.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f7f7f7`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f7f7f7`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#f9fffa`, ink `#0b0b0c`, (19.4:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#f9fffa`, (19.4:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f7f7f7`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#f9fffa` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#33c3f0` with `#0b0b0c` text (9.6:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Source Sans Pro` headings with `System Sans` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f7f7f7` surface shifts and `#e5e5e5` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
