---
version: alpha
name: JB Design System
description: "Crisp light (#f6f9fc) canvas, dana typography, #ff8300 brand accent, and 4px corner geometry"
colors:
  tree-node-background-hover: "#FFFFFF"
  sb-sidebar-bottom-card-background: "#FFFFFF"
  bg-canvas: "#f6f9fc"
  canvas-text: "#0e1218"
  main-bg: "#ecf2fc"
  main-text: "#5c6570"
  link-text: "#2e3338"
  css-border-7: "rgba(38, 74, 115, 0.15)"
  css-surface-8: "rgba(125, 82, 255, 0.15)"
  css-surface-9: "#eef4f9"
  css-color-10: "#7d52ff"
  css-surface-11: "rgba(125, 82, 255, 0.14)"
  css-surface-12: "#dbecff"
  css-surface-13: "#a1a7b0"
  css-border-14: "#646464"
  css-color-15: "#ff8300"
  css-color-16: "#2a0481"
  css-surface-17: "rgba(125, 82, 255, 0.07)"
  css-color-18: "#571fff"
  primary: "#ff8300"
typography:
  header:
    fontFamily: "dana, tahoma, Arial, Helvetica, sans-serif"
    fontSize: 16px
    fontWeight: 400
  nav:
    fontFamily: "dana, tahoma, Arial, Helvetica, sans-serif"
    fontSize: 16px
    fontWeight: 400
  h1:
    fontFamily: "dana, tahoma, Arial, Helvetica, sans-serif"
    fontSize: 32px
    fontWeight: 400
  h2:
    fontFamily: "dana, tahoma, Arial, Helvetica, sans-serif"
    fontSize: 24px
    fontWeight: 400
  button:
    fontFamily: "dana, tahoma, Arial, Helvetica, sans-serif"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1
rounded:
  button: 4px
  card: 8px
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
  button:
    textColor: "#5c6570"
    rounded: 4px
    padding: 0px 9px
  button-2:
    textColor: "#0e1218"
    rounded: 4px
    padding: 5px 6px 4px 8px
  input:
    textColor: "#0e1218"
  card-surface:
    backgroundColor: "#ecf2fc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#ff8300"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#ecf2fc"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 16px
  select-default:
    backgroundColor: "#ecf2fc"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#ff8300"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#ff8300"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#ecf2fc"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#ecf2fc"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#f6f9fc"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#f6f9fc"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#ecf2fc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# JB Design System

## Overview

**JB Design System** is a light-first design system anchored on `#f6f9fc` canvas surfaces with `#0b0b0c` primary ink (18.6:1 contrast) and `#ff8300` brand accent.

Typography centers cleanly on `dana` (32px display down to 16px body), unified by `4px` base corner radius and stepped `#f6f9fc` -> `#ecf2fc` surface layering.

Maintained by **JB**. Source: live stylesheet extraction (https://javadbat.github.io/design-system), repo https://github.com/javadbat/design-system, frameworks: react, css. Inventory: **20** colors, **5** typography steps, and **15** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#f6f9fc` — base application backdrop (light theme).
- **Surface (`surface`)**: `#ecf2fc` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (18.6:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ff8300` (2.3:1 vs canvas; pair with `#0b0b0c` foreground ink for 8.0:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `css-color-10` (`#7d52ff`), `css-surface-12` (`#dbecff`), `css-color-15` (`#ff8300`), `css-color-16` (`#2a0481`), `css-color-18` (`#571fff`), `primary` (`#ff8300`).
- **Neutral Ramp**: `tree-node-background-hover` (`#FFFFFF`), `sb-sidebar-bottom-card-background` (`#FFFFFF`), `bg-canvas` (`#f6f9fc`), `canvas-text` (`#0e1218`), `main-bg` (`#ecf2fc`), `main-text` (`#5c6570`).

## Typography

- **Primary / Display Voice**: `dana, tahoma, Arial, Helvetica, sans-serif` (top step `h1`: 32px, weight 400).
- **Body & UI Controls**: `dana, tahoma, Arial, Helvetica, sans-serif` (`header`: 16px, weight 400).
- **Scale Steps (5)**: `h1` (32px, w400), `h2` (24px, w400), `header` (16px, w400), `nav` (16px, w400), `button` (12px, w700).

## Layout

- **Grid & Control Spacing**: Derived from 15 component tokens with documented paddings: `0px 9px`, `5px 6px 4px 8px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#ecf2fc` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#f6f9fc` -> `#ecf2fc`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ff8300` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `4px` (Buttons `4px` · Cards `8px` · Badges `999px` · Navigation `4px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button` (button)**: ink `#5c6570`, radius `4px`, padding `0px 9px`.
- **`button-2` (button)**: ink `#0e1218`, radius `4px`, padding `5px 6px 4px 8px`.
- **`input` (input)**: ink `#0e1218`.
- **`card-surface` (card)**: bg `#ecf2fc`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#ff8300`, ink `#0b0b0c`, (8.0:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#ecf2fc`, ink `#0b0b0c`, (17.5:1), radius `4px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#ecf2fc`, ink `#0b0b0c`, (17.5:1), radius `4px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#ff8300`, ink `#0b0b0c`, (8.0:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#ff8300`, ink `#0b0b0c`, (8.0:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#ecf2fc`, ink `#0b0b0c`, (17.5:1), radius `4px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#ecf2fc`, ink `#0b0b0c`, (17.5:1), radius `4px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#f6f9fc`, ink `#0b0b0c`, (18.6:1), radius `4px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#f6f9fc`, (18.6:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#ecf2fc`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#f6f9fc` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ff8300` with `#0b0b0c` text (8.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `dana` headings with `dana` body copy using documented weights and scale steps.
- Apply `4px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#ecf2fc` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `4px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
