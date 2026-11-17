---
version: alpha
name: Oat UI
description: "Crisp light (#ffffff) canvas, system-ui typography, #008032 brand accent, and pill & expressive rounded surfaces"
colors:
  warning-foreground: "#09090b"
  bg-canvas: "#ffffff"
  canvas-text: "#262626"
  main-bg: "#fafafa"
  main-border: "#e4e4e7"
  footer-text: "#71717a"
  link-bg: "#f4f4f5"
  button-border: "rgba(255, 255, 255, 0.12)"
  input-text: "#000000"
  badge-text: "#a65b00"
  badge-text-1: "#008032"
  badge-text-2: "#d32f2f"
  primary: "#008032"
typography:
  header:
    fontFamily: "system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  nav:
    fontFamily: "system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  h1:
    fontFamily: "system-ui, sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.25
  h2:
    fontFamily: "system-ui, sans-serif"
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.25
  h3:
    fontFamily: "system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  badge: 9999px
  button: 9999px
  input: 9999px
  card: 9999px
  nav: 9999px
  default: 9999px
icons:
  library: Inline System SVGs
  package: null
  style: outline
  grid: 24
  strokeWidth: 2
  strokeLinecap: round
  strokeLinejoin: round
  source: observed
components:
  badge:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    typography:
      fontSize: ".75rem"
      fontWeight: 500
    rounded: 9999px
    padding: 1rem
  button-primary:
    backgroundColor: "#008032"
    textColor: "#ffffff"
    rounded: 9999px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 9999px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 9999px
    padding: 10px 18px
  input-default:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 9999px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 9999px
    padding: 18px 20px
  nav-bar:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 9999px
    padding: 10px 16px
  select-default:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#008032"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#008032"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#ffffff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Oat UI

## Overview

**Oat UI** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#008032` brand accent.

Typography centers cleanly on `System UI` (36px display down to 16px body), unified by `12px` base corner radius and subtle shadow elevation.

Maintained by **Oat**. Source: live stylesheet extraction (https://oat.ink/), repo https://github.com/oat-ink/oat, frameworks: css. Inventory: **13** colors, **6** typography steps, and **15** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fafafa` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#008032` (5.1:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.7:1 contrast).
- **Structural Border (`border`)**: `#e4e4e7` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `badge-text` (`#a65b00`), `badge-text-1` (`#008032`), `badge-text-2` (`#d32f2f`), `primary` (`#008032`).
- **Neutral Ramp**: `warning-foreground` (`#09090b`), `bg-canvas` (`#ffffff`), `canvas-text` (`#262626`), `main-bg` (`#fafafa`), `main-border` (`#e4e4e7`), `footer-text` (`#71717a`).

## Typography

- **Primary / Display Voice**: `system-ui, sans-serif` (top step `h1`: 36px, weight 600, line-height 1.25).
- **Body & UI Controls**: `system-ui, sans-serif` (`body`: 16px, weight 400, line-height 1.5).
- **Scale Steps (6)**: `h1` (36px, w600), `h2` (30px, w600), `h3` (24px, w400), `header` (16px, w400), `body` (16px, w400), `nav` (14px, w400).

## Layout

- **Grid & Control Spacing**: Derived from 15 component tokens with documented paddings: `1rem`, `10px 18px`, `9px 13px`, `18px 20px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#fafafa` cards; separate sibling sections using `#e4e4e7` hairlines rather than oversized whitespace.

## Elevation

- **Layered Shadow Model**: Uses documented shadows (`0 1px 2px rgb(0 0 0 / .06)`) paired with `#e4e4e7` borders for elevated overlays.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#008032` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `12px` (Buttons `9999px` · Inputs `9999px` · Cards `9999px` · Badges `9999px` · Navigation `9999px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `9999px` container.
- **Iconography & SVGs**: Inline System SVGs on a `24x24` grid (outline, stroke `2px`, `round` caps).

## Components

- **`badge` (badge)**: bg `transparent`, ink `#0b0b0c`, radius `9999px`, padding `1rem`, border `1px solid light-dark(#e4e4e7, #303036)`.
- **`button-primary` (button)**: bg `#008032`, ink `#ffffff`, (5.1:1), radius `9999px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `9999px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `9999px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `9999px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `9999px`, padding `18px 20px`.
- **`nav-bar` (nav)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `9999px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `12px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#008032`, ink `#f7f7f8`, (4.7:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#008032`, ink `#f7f7f8`, (4.7:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `12px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `12px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `12px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#008032` with `#f7f7f8` text (4.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `12px` base geometry across inputs and buttons (9999px on outer containers).
- Separate containers via `#fafafa` surface shifts and `#e4e4e7` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `12px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
