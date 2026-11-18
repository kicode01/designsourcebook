---
version: alpha
name: Nebular Eva Design System
description: "Akveo Nebular Eva Design System — tokens read from https://github.com/akveo/nebular."
colors:
  variables-border: "#ffffff"
  variables-border2: "#f7f9fc"
  variables-border3: "#edf1f7"
  variables-border4: "#e4e9f2"
  variables-border5: "#c5cee0"
  variables-fg-text: "#1a2138"
  variables-primary-light: "#598bff"
  variables-success-light: "#2ce69b"
  variables-info-light: "#42aaff"
  variables-warning-light: "#ffc94d"
  variables-danger-light: "#ff708d"
  primary: "#598bff"
  success: "#5dcfe3"
  info: "#ba7fec"
  warning: "#ffa36b"
  danger: "#ff6b83"
  border: "#ffffff"
  border2: "#f7f9fc"
  border3: "#edf1f7"
  border4: "#e4e9f2"
  border5: "#c5cee0"
  fg-text: "#1a2138"
  primary-light: "#598bff"
  success-light: "#2ce69b"
  info-light: "#42aaff"
  warning-light: "#ffc94d"
  danger-light: "#ff708d"
  color-primary-100: "#faf7ff"
  color-primary-200: "#ece3ff"
  color-primary-300: "#d5bfff"
  color-primary-400: "#b18aff"
  color-primary-500: "#a16eff"
  color-primary-600: "#7b51db"
  color-primary-700: "#5a37b8"
  color-primary-800: "#3e2494"
  color-primary-900: "#29157a"
  color-success-100: "#f0fff5"
  color-success-200: "#ccfce3"
  color-success-300: "#8cfac7"
  color-success-400: "#2ce69b"
  color-success-500: "#00d68f"
  color-success-600: "#00b887"
  color-success-700: "#00997a"
  color-success-800: "#007d6c"
  color-success-900: "#004a45"
  color-info-100: "#f2f8ff"
  color-info-200: "#c7e2ff"
  color-info-300: "#94cbff"
  color-info-400: "#42aaff"
  color-info-500: "#0095ff"
  color-info-600: "#006fd6"
  color-info-700: "#0057c2"
  color-info-800: "#0041a8"
  color-info-900: "#002885"
  color-warning-100: "#fffdf2"
  color-warning-200: "#fff1c2"
  color-warning-300: "#ffe59e"
  color-warning-400: "#ffc94d"
  color-warning-500: "#ffaa00"
  color-warning-600: "#db8b00"
  color-warning-700: "#b86e00"
  color-warning-800: "#945400"
  color-warning-900: "#703c00"
  color-danger-100: "#fff2f2"
  color-danger-200: "#ffd6d9"
  color-danger-300: "#ffa8b4"
  color-danger-400: "#ff708d"
  color-danger-500: "#ff3d71"
  color-danger-600: "#db2c66"
  color-danger-700: "#b81d5b"
  color-danger-800: "#94124e"
  color-danger-900: "#700940"
  variables-bg: "#ffffff"
  variables-bg2: "#f7f9fc"
  variables-bg3: "#edf1f7"
  variables-bg4: "#e4e9f2"
  variables-fg: "#8f9bb3"
  variables-fg-heading: "#1a2138"
  variables-layout-bg: "#f7f9fc"
  variables-separator: "#edf1f7"
  bg: "#ffffff"
  bg2: "#f7f9fc"
  bg3: "#edf1f7"
  bg4: "#e4e9f2"
  fg: "#8f9bb3"
  fg-heading: "#1a2138"
  layout-bg: "#f7f9fc"
  separator: "#edf1f7"
  color-basic-100: "#ffffff"
  color-basic-200: "#f7f7fc"
typography:
  h1:
    fontSize: 2em
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
    backgroundColor: "#f7f9fc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#598bff"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#598bff"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f7f9fc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f7f9fc"
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
    backgroundColor: "#f7f9fc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Nebular Eva Design System

## Overview

**Nebular Eva Design System** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#598bff` brand accent.

Typography centers cleanly on `System UI` (32px display down to 32px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#f7f9fc` surface layering.

Maintained by **Akveo**. Source: published token package (https://github.com/akveo/nebular), repo https://github.com/akveo/nebular. Inventory: **90** colors, **1** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f7f9fc` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#598bff` (3.2:1 vs canvas; pair with `#f7f7f8` foreground ink for 3.0:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `variables-border5` (`#c5cee0`), `variables-fg-text` (`#1a2138`), `variables-primary-light` (`#598bff`), `primary` (`#598bff`), `border5` (`#c5cee0`), `fg-text` (`#1a2138`).
- **Neutral Ramp**: `variables-border` (`#ffffff`), `variables-border2` (`#f7f9fc`), `variables-border3` (`#edf1f7`), `variables-border4` (`#e4e9f2`), `border` (`#ffffff`), `border2` (`#f7f9fc`).
- **Semantic States**: success: `variables-success-light` (`#2ce69b`) · danger: `variables-danger-light` (`#ff708d`) · warning: `variables-warning-light` (`#ffc94d`) · info: `variables-info-light` (`#42aaff`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `h1`: 2em, weight 600).
- **Body & UI Controls**: `system-ui` (`h1`: 2em, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#f7f9fc` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#f7f9fc`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#598bff` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#f7f9fc`, ink `#0b0b0c`, (18.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#598bff`, ink `#000000`, (6.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#598bff`, ink `#000000`, (6.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f7f9fc`, ink `#0b0b0c`, (18.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f7f9fc`, ink `#0b0b0c`, (18.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f7f9fc`, ink `#0b0b0c`, (18.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#598bff` with `#f7f7f8` text (3.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f7f9fc` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
