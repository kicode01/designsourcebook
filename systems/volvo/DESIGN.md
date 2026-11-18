---
version: alpha
name: Volvo Cars Design System
description: "Volvo Cars Design System — tokens imported from @volvo-cars/css."
colors:
  v-color-foreground-primary: "#000"
  v-color-foreground-secondary: "#5e5e5e"
  v-color-foreground-tertiary: "#787878"
  v-color-foreground-inverted: "#fff"
  v-color-foreground-accent-blue: "#0b2ded"
  v-color-foreground-feedback-green: "#04771d"
  v-color-foreground-feedback-red: "#cd2314"
  v-color-foreground-feedback-orange: "#ce6700"
  v-color-surface-neutral: "#000"
  v-color-surface-gray: "#e3e3e3"
  v-color-surface-accent-blue: "#0b2ded"
  v-color-surface-accent-safety: "#fc6408"
  v-color-surface-feedback-green: "#048220"
  v-color-surface-feedback-orange: "#ce6700"
  v-color-surface-feedback-red: "#e52715"
  v-color-background-primary: "#fff"
  v-color-background-secondary: "#fafafa"
  v-color-background-feedback-green: "#d7f9df"
  v-color-background-feedback-red: "#fce5e3"
  v-color-background-feedback-orange: "#ffe8d1"
  v-color-background-feedback-gray: "#f0f0f0"
  v-color-always-white: "#fff"
  v-color-always-black: "#000"
  tokens: "#787878"
  primary: "#fc6408"
typography:
  v-font-sans-family:
    fontFamily: "\"Volvo Centum\", \"Helvetica Neue\", Helvetica, \"Noto Sans\", \"Segoe UI\", Arial, sans-serif"
  v-font-mono-family:
    fontFamily: monospace
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
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#fc6408"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#fc6408"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#fff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Volvo Cars Design System

## Overview

**Volvo Cars Design System** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#fc6408` brand accent.

Typography centers cleanly on `Volvo Centum` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#fff` -> `#fafafa` surface layering.

Maintained by **Volvo Cars**. Source: published token package, package `@volvo-cars/css`. Inventory: **25** colors, **2** typography steps, and **8** documented components (UNLICENSED license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fafafa` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#fc6408` (3.0:1 vs canvas; pair with `#f7f7f8` foreground ink for 2.8:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `v-color-foreground-accent-blue` (`#0b2ded`), `v-color-surface-accent-blue` (`#0b2ded`), `v-color-surface-accent-safety` (`#fc6408`), `v-color-background-feedback-red` (`#fce5e3`), `primary` (`#fc6408`).
- **Neutral Ramp**: `v-color-foreground-primary` (`#000`), `v-color-foreground-secondary` (`#5e5e5e`), `v-color-foreground-tertiary` (`#787878`), `v-color-foreground-inverted` (`#fff`), `v-color-surface-neutral` (`#000`), `v-color-surface-gray` (`#e3e3e3`).
- **Semantic States**: success: `v-color-foreground-feedback-green` (`#04771d`) · danger: `v-color-foreground-feedback-red` (`#cd2314`) · warning: `v-color-foreground-feedback-orange` (`#ce6700`).

## Typography

- **Primary / Display Voice**: `"Volvo Centum", "Helvetica Neue", Helvetica, "Noto Sans", "Segoe UI", Arial, sans-serif` (top step `v-font-sans-family`: 16px, weight 600).
- **Body & UI Controls**: `"Volvo Centum", "Helvetica Neue", Helvetica, "Noto Sans", "Segoe UI", Arial, sans-serif` (`v-font-sans-family`: 16px, weight 400).
- **Monospace / Technical Labels**: `monospace` (`v-font-mono-family`: 16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#fafafa` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#fafafa`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#fc6408` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#fc6408`, ink `#000000`, (7.0:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#fc6408`, ink `#000000`, (7.0:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#fc6408` with `#f7f7f8` text (2.8:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Volvo Centum` headings with `Volvo Centum` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#fafafa` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
