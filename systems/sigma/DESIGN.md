---
version: alpha
name: Sigma Design System
description: "Sigma Design System — read from www.thesigma.co's live stylesheets, not a published token package."
colors:
  token-542f2d4c-88be-49b3-b05c-3d95ef030f89: "#ff5a00"
  token-c0602cdc-e6d3-4ea2-bf0e-e3b50e6d72b6: "#000"
  token-cd33177a-96ac-42f7-96c3-c4080e05d933: "#43424299"
  token-36295c4d-1927-454f-a468-c4dd80360e59: "#807e7d1f"
  token-c7f86029-d013-400d-a20a-2b2adfa7975d: "#f5f4f2"
  token-185f756a-d06f-429f-8bf9-177ed07262aa: "#000"
  token-29c07b23-9691-418f-9c52-a20accd3693d: "#0006"
  token-53e2bf4e-b39e-41bb-80a1-019617510c0d: "#fff"
  framer-text-color: "#000"
  border-color: "#ebebeb"
  framer-link-current-text-color: "#1f1f1f"
  framer-link-hover-text-color: "#1f1f1f"
  framer-link-text-color: "#666"
  primary: "#ff5a00"
typography:
  framer-font-size:
    fontSize: 16px
  font-family:
    fontFamily: "Inter, \"Inter Placeholder\", sans-serif"
  framer-font-family:
    fontFamily: "Inter, \"Inter Placeholder\", sans-serif"
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
    backgroundColor: "#f5f4f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#ff5a00"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#ff5a00"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f5f4f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f5f4f2"
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
    backgroundColor: "#f5f4f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Sigma Design System

## Overview

**Sigma Design System** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#ff5a00` brand accent.

Typography centers cleanly on `Inter` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#fff` -> `#f5f4f2` surface layering.

Maintained by **Sigma**. Source: live stylesheet extraction (https://www.thesigma.co/designsystem). Inventory: **14** colors, **3** typography steps, and **8** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f5f4f2` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ff5a00` (3.1:1 vs canvas; pair with `#f7f7f8` foreground ink for 2.9:1 contrast).
- **Structural Border (`border`)**: `#ebebeb` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `token-542f2d4c-88be-49b3-b05c-3d95ef030f89` (`#ff5a00`), `primary` (`#ff5a00`).
- **Neutral Ramp**: `token-c0602cdc-e6d3-4ea2-bf0e-e3b50e6d72b6` (`#000`), `token-c7f86029-d013-400d-a20a-2b2adfa7975d` (`#f5f4f2`), `token-185f756a-d06f-429f-8bf9-177ed07262aa` (`#000`), `token-53e2bf4e-b39e-41bb-80a1-019617510c0d` (`#fff`), `framer-text-color` (`#000`), `border-color` (`#ebebeb`).

## Typography

- **Primary / Display Voice**: `Inter, "Inter Placeholder", sans-serif` (top step `framer-font-size`: 16px, weight 600).
- **Body & UI Controls**: `Inter, "Inter Placeholder", sans-serif` (`framer-font-size`: 16px, weight 400).
- **Scale Steps (3)**: `framer-font-size` (16px), `font-family` (16px), `framer-font-family` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#f5f4f2` cards; separate sibling sections using `#ebebeb` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#f5f4f2`) and `1px solid #ebebeb` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ff5a00` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#f5f4f2`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#ff5a00`, ink `#000000`, (6.7:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#ff5a00`, ink `#000000`, (6.7:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f5f4f2`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f5f4f2`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f5f4f2`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ff5a00` with `#f7f7f8` text (2.9:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Inter` headings with `Inter` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f5f4f2` surface shifts and `#ebebeb` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
