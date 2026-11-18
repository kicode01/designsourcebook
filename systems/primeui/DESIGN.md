---
version: alpha
name: PrimeUI
description: "PrimeTek PrimeUI — tokens imported from @primeuix/themes."
colors:
  focus-ring-border-color: "#ffffff"
  focus-ring-outline-color: "rgba(255, 255, 255, 0.3)"
  border-color: "#ffffff"
  background: "#ffffff"
  hover-background: "rgba(255, 255, 255, 0.2)"
  active-background: "rgba(255, 255, 255, 0.9)"
  hover-border-color: "rgba(255,255,255,0.3)"
  primary-color: "#93C5FD"
  primary-contrast-color: "hsl(213, 16%, 13%)"
  surface-0: "#ffffff"
  surface-50: "#FAFAFA"
  surface-100: "#F5F5F5"
  surface-200: "#EEEEEE"
  surface-300: "#E0E0E0"
  surface-400: "#BDBDBD"
  surface-500: "#9E9E9E"
  surface-600: "#757575"
  surface-700: "#616161"
  surface-800: "#424242"
  surface-900: "#212121"
  primary-50: "#fafcff"
  primary-100: "#e5f1ff"
  primary-200: "#d1e6fe"
  primary-300: "#bcdbfe"
  primary-400: "#a8d0fd"
  primary-500: "#93c5fd"
  primary-600: "#7da7d7"
  primary-700: "#678ab1"
  primary-800: "#516c8b"
  primary-900: "#3b4f65"
  outline-color: "rgba(255, 255, 255, 0.3)"
  color: "rgba(255,255,255,0.3)"
  blue-50: "#f5f9ff"
  blue-100: "#d0e1fd"
  blue-200: "#abc9fb"
  blue-300: "#85b2f9"
  blue-400: "#609af8"
  blue-500: "#3b82f6"
  blue-600: "#326fd1"
  blue-700: "#295bac"
  blue-800: "#204887"
  blue-900: "#183462"
  green-50: "#f4fcf7"
  green-100: "#caf1d8"
  green-200: "#a0e6ba"
  green-300: "#76db9b"
  green-400: "#4cd07d"
  green-500: "#22c55e"
  green-600: "#1da750"
  green-700: "#188a42"
  green-800: "#136c34"
  green-900: "#0e4f26"
  yellow-50: "#fefbf3"
  yellow-100: "#faedc4"
  yellow-200: "#f6de95"
  yellow-300: "#f2d066"
  yellow-400: "#eec137"
  yellow-500: "#eab308"
  yellow-600: "#c79807"
  yellow-700: "#a47d06"
  yellow-800: "#816204"
  yellow-900: "#5e4803"
  cyan-50: "#f3fbfd"
  cyan-100: "#c3edf5"
  cyan-200: "#94e0ed"
  cyan-300: "#65d2e4"
  cyan-400: "#35c4dc"
  cyan-500: "#06b6d4"
  cyan-600: "#059bb4"
  cyan-700: "#047f94"
  cyan-800: "#036475"
  cyan-900: "#024955"
  pink-50: "#fef6fa"
  pink-100: "#fad3e7"
  pink-200: "#f7b0d3"
  pink-300: "#f38ec0"
  pink-400: "#f06bac"
  pink-500: "#ec4899"
  pink-600: "#c93d82"
  pink-700: "#a5326b"
  pink-800: "#822854"
  pink-900: "#5e1d3d"
  indigo-50: "#f7f7fe"
  indigo-100: "#dadafc"
  indigo-200: "#bcbdf9"
  indigo-300: "#9ea0f6"
  indigo-400: "#8183f4"
  indigo-500: "#6366f1"
  indigo-600: "#5457cd"
  indigo-700: "#4547a9"
  primary: "#93C5FD"
typography:
  font-size:
    fontSize: 0.875rem
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
    backgroundColor: "#FAFAFA"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#93C5FD"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#93C5FD"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#FAFAFA"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#FAFAFA"
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
    backgroundColor: "#FAFAFA"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# PrimeUI

## Overview

**PrimeUI** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#93C5FD` brand accent.

Typography centers cleanly on `System UI` (14px display down to 14px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#FAFAFA` surface layering.

Maintained by **PrimeTek**. Source: published token package, package `@primeuix/themes`. Inventory: **91** colors, **1** typography steps, and **8** documented components (SEE LICENSE IN LICENSE.md license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#FAFAFA` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#93C5FD` (1.8:1 vs canvas; pair with `#0b0b0c` foreground ink for 10.9:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `primary-color` (`#93C5FD`), `primary-100` (`#e5f1ff`), `primary-200` (`#d1e6fe`), `primary-300` (`#bcdbfe`), `primary-400` (`#a8d0fd`), `primary-500` (`#93c5fd`).
- **Neutral Ramp**: `focus-ring-border-color` (`#ffffff`), `border-color` (`#ffffff`), `background` (`#ffffff`), `active-background` (`rgba(255, 255, 255, 0.9)`), `primary-contrast-color` (`hsl(213, 16%, 13%)`), `surface-0` (`#ffffff`).
- **Semantic States**: success: `green-100` (`#caf1d8`) · warning: `yellow-100` (`#faedc4`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `font-size`: 0.875rem, weight 600).
- **Body & UI Controls**: `system-ui` (`font-size`: 0.875rem, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#FAFAFA` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#FAFAFA`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#93C5FD` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#FAFAFA`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#93C5FD`, ink `#0b0b0c`, (10.9:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#93C5FD`, ink `#0b0b0c`, (10.9:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#FAFAFA`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#FAFAFA`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#FAFAFA`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#93C5FD` with `#0b0b0c` text (10.9:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#FAFAFA` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
