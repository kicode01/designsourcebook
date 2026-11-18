---
version: alpha
name: Australian Government Design System
description: "Australian Government Design System — tokens imported from @gov.au/core."
colors:
  au-color-foreground-text: "#313131"
  au-color-foreground-action: "#00698f"
  au-color-foreground-focus: "#9263DE"
  au-color-foreground-hint: "#6f777b"
  au-color-background: "#ffffff"
  au-color-foreground-alt-hint: "#61696B"
  au-colordark-foreground-text: "#ffffff"
  au-colordark-foreground-action: "#61daff"
  au-colordark-foreground-focus: "#C390F9"
  au-colordark-background: "#135E70"
  au-color-error: "#d60000"
  au-color-success: "#0b996c"
  au-color-warning: "#f69900"
  au-color-info: "#00bfe9"
  primary: "#00bfe9"
typography:
  au-font-monospace:
    fontFamily: "SFMono-Regular, Consolas, \"Liberation Mono\", Menlo, Courier, monospace"
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
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#00bfe9"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#00bfe9"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#ffffff"
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
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Australian Government Design System

## Overview

**Australian Government Design System** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#00bfe9` brand accent.

Typography centers cleanly on `System Mono` (16px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **Australian Government**. Source: published token package (https://designsystem.gov.au/components/core), package `@gov.au/core`. Inventory: **15** colors, **1** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#ffffff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#00bfe9` (2.2:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.0:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `au-color-foreground-action` (`#00698f`), `au-color-foreground-focus` (`#9263DE`), `au-colordark-foreground-action` (`#61daff`), `au-colordark-foreground-focus` (`#C390F9`), `au-colordark-background` (`#135E70`), `primary` (`#00bfe9`).
- **Neutral Ramp**: `au-color-foreground-text` (`#313131`), `au-color-foreground-hint` (`#6f777b`), `au-color-background` (`#ffffff`), `au-color-foreground-alt-hint` (`#61696B`), `au-colordark-foreground-text` (`#ffffff`).
- **Semantic States**: success: `au-color-success` (`#0b996c`) · danger: `au-color-error` (`#d60000`) · warning: `au-color-warning` (`#f69900`) · info: `au-color-info` (`#00bfe9`).

## Typography

- **Primary / Display Voice**: `SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace` (top step `au-font-monospace`: 16px, weight 600).
- **Body & UI Controls**: `SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace` (`au-font-monospace`: 16px, weight 400).
- **Monospace / Technical Labels**: `SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace` (`au-font-monospace`: 16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#ffffff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#ffffff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#00bfe9` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#00bfe9`, ink `#0b0b0c`, (9.0:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#00bfe9`, ink `#0b0b0c`, (9.0:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#00bfe9` with `#0b0b0c` text (9.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System Mono` headings with `System Mono` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#ffffff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
