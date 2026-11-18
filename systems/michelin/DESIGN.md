---
version: alpha
name: Motion
description: "Michelin Motion — read from designsystem.michelin.com's live stylesheets, not a published token package."
colors:
  color-mic-blue: "#27509b"
  color-mic-yellow: "#fce500"
  color-mic-blue-900: "#3a5fa2"
  color-mic-blue-800: "#4d6eaa"
  color-mic-blue-700: "#607db1"
  color-mic-blue-600: "#607db1"
  color-mic-blue-500: "#859abf"
  color-mic-blue-400: "#99a9c7"
  color-mic-blue-300: "#99a9c7"
  color-mic-blue-200: "#abcdf5"
  color-mic-blue-100: "#d4e7fa"
  color-gray-dark-900: "#0d0d0d"
  color-gray-dark-800: "#1a1a1a"
  color-gray-dark-700: "#333"
  color-gray-dark-600: "#404040"
  color-gray-dark-500: "#4d4d4d"
  color-gray-dark-400: "#666"
  color-gray-light-500: "#7f7f7f"
  color-gray-light-400: "#999"
  color-gray-light-300: "#b2b2b2"
  color-gray-light-200: "#ccc"
  color-gray-light-100: "#e5e5e5"
  color-gray-light-050: "#f2f2f2"
  color-status: "#2e7d32"
  color-status-lighten: "#e8f5e5"
  color-danger: "#b71c1c"
  color-danger-lighten: "#f4cec2"
  primary: "#607db1"
typography:
  font-body-lg:
    fontFamily: "\"1.125rem / 1.5 \"Noto Sans\", ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif"
  font-body-md:
    fontFamily: "\"1rem / 1.5 \"Noto Sans\", ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif"
  font-body-sm:
    fontFamily: "\".875rem / 1.5 \"Noto Sans\", ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif"
  font-body-xs:
    fontFamily: "\".75rem / 1.5 \"Noto Sans\", ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Ubuntu, Cantarell, \"Noto Sans\", sans-serif"
  font-code:
    fontFamily: "\".875rem / 1.5 \"Noto Sans Mono\", ui-monospace, monospace"
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
    backgroundColor: "#e8f5e5"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#607db1"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#607db1"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#e8f5e5"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#e8f5e5"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#f2f2f2"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#e8f5e5"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Motion

## Overview

**Motion** is a light-first design system anchored on `#f2f2f2` canvas surfaces with `#0b0b0c` primary ink (17.6:1 contrast) and `#607db1` brand accent.

Typography centers cleanly on `1.125rem / 1.5 Noto Sans` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#f2f2f2` -> `#e8f5e5` surface layering.

Maintained by **Michelin**. Source: live stylesheet extraction (https://designsystem.michelin.com/). Inventory: **28** colors, **5** typography steps, and **8** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#f2f2f2` — base application backdrop (light theme).
- **Surface (`surface`)**: `#e8f5e5` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (17.6:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#607db1` (3.7:1 vs canvas; pair with `#f7f7f8` foreground ink for 3.9:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-mic-blue` (`#27509b`), `color-mic-blue-900` (`#3a5fa2`), `color-mic-blue-800` (`#4d6eaa`), `color-mic-blue-700` (`#607db1`), `color-mic-blue-600` (`#607db1`), `color-mic-blue-500` (`#859abf`).
- **Neutral Ramp**: `color-gray-dark-900` (`#0d0d0d`), `color-gray-dark-800` (`#1a1a1a`), `color-gray-dark-700` (`#333`), `color-gray-dark-600` (`#404040`), `color-gray-dark-500` (`#4d4d4d`), `color-gray-dark-400` (`#666`).
- **Semantic States**: danger: `color-danger` (`#b71c1c`) · warning: `color-mic-yellow` (`#fce500`).

## Typography

- **Primary / Display Voice**: `"1.125rem / 1.5 "Noto Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif` (top step `font-body-lg`: 16px, weight 600).
- **Body & UI Controls**: `"1.125rem / 1.5 "Noto Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif` (`font-body-lg`: 16px, weight 400).
- **Monospace / Technical Labels**: `".875rem / 1.5 "Noto Sans Mono", ui-monospace, monospace` (`font-code`: 16px).
- **Scale Steps (5)**: `font-body-lg` (16px), `font-body-md` (16px), `font-body-sm` (16px), `font-body-xs` (16px), `font-code` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#e8f5e5` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#f2f2f2` -> `#e8f5e5`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#607db1` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#e8f5e5`, ink `#0b0b0c`, (17.4:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#607db1`, ink `#000000`, (5.1:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#607db1`, ink `#000000`, (5.1:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#e8f5e5`, ink `#0b0b0c`, (17.4:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#e8f5e5`, ink `#0b0b0c`, (17.4:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#f2f2f2`, ink `#0b0b0c`, (17.6:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#f2f2f2`, (17.6:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#e8f5e5`, ink `#0b0b0c`, (17.4:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#f2f2f2` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#607db1` with `#f7f7f8` text (3.9:1) for primary CTAs, active tabs, and focus outlines.
- Pair `1.125rem / 1.5 Noto Sans` headings with `1.125rem / 1.5 Noto Sans` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#e8f5e5` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
