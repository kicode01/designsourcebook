---
version: alpha
name: NoStyle
description: "NoStyle — tokens read from https://github.com/adamsilver/nostyle."
colors:
  colour-gray-100: "#F7FAFC"
  colour-gray-200: "#EDF2F7"
  colour-gray-300: "#E2E8F0"
  colour-gray-400: "#CBD5E0"
  colour-gray-500: "#A0AEC0"
  colour-gray-600: "#718096"
  colour-gray-700: "#4A5568"
  colour-gray-800: "#2D3748"
  colour-gray-900: "#1A202C"
  colour-red-100: "#FFF5F5"
  colour-red-200: "#FED7D7"
  colour-red-300: "#FEB2B2"
  colour-red-400: "#FC8181"
  colour-red-500: "#F56565"
  colour-red-600: "#E53E3E"
  colour-red-700: "#C53030"
  colour-red-800: "#9B2C2C"
  colour-red-900: "#742A2A"
  colour-green-100: "#F0FFF4"
  colour-green-200: "#C6F6D5"
  colour-green-300: "#9AE6B4"
  colour-green-400: "#68D391"
  colour-green-500: "#48BB78"
  colour-green-600: "#38A169"
  colour-green-700: "#2F855A"
  colour-green-800: "#276749"
  colour-green-900: "#22543D"
  colour-yellow-100: "#FFFFF0"
  colour-yellow-200: "#FEFCBF"
  colour-yellow-300: "#FAF089"
  colour-yellow-400: "#F6E05E"
  colour-yellow-500: "#ECC94B"
  colour-yellow-600: "#D69E2E"
  colour-yellow-700: "#B7791F"
  colour-yellow-800: "#975A16"
  colour-yellow-900: "#744210"
  hex: "#F56565"
  primary: "#FC8181"
typography:
  body:
    fontFamily: "Inter, \"helvetica neue\", arial, sans-serif"
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
    backgroundColor: "#EDF2F7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#FC8181"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#FC8181"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#EDF2F7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#EDF2F7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#F7FAFC"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#F7FAFC"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#EDF2F7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# NoStyle

## Overview

**NoStyle** is a light-first design system anchored on `#F7FAFC` canvas surfaces with `#0b0b0c` primary ink (18.8:1 contrast) and `#FC8181` brand accent.

Typography centers cleanly on `Inter` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#F7FAFC` -> `#EDF2F7` surface layering.

Maintained by **No**. Source: published token package (https://github.com/adamsilver/nostyle), repo https://github.com/adamsilver/nostyle. Inventory: **38** colors, **1** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#F7FAFC` — base application backdrop (light theme).
- **Surface (`surface`)**: `#EDF2F7` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (18.8:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#FC8181` (2.3:1 vs canvas; pair with `#0b0b0c` foreground ink for 8.1:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `colour-gray-500` (`#A0AEC0`), `colour-gray-600` (`#718096`), `colour-gray-700` (`#4A5568`), `colour-gray-800` (`#2D3748`), `hex` (`#F56565`), `primary` (`#FC8181`).
- **Neutral Ramp**: `colour-gray-100` (`#F7FAFC`), `colour-gray-200` (`#EDF2F7`), `colour-gray-300` (`#E2E8F0`), `colour-gray-400` (`#CBD5E0`), `colour-gray-900` (`#1A202C`), `colour-red-100` (`#FFF5F5`).
- **Semantic States**: success: `colour-green-200` (`#C6F6D5`) · danger: `colour-red-200` (`#FED7D7`) · warning: `colour-yellow-200` (`#FEFCBF`).

## Typography

- **Primary / Display Voice**: `Inter, "helvetica neue", arial, sans-serif` (top step `body`: 16px, weight 600).
- **Body & UI Controls**: `Inter, "helvetica neue", arial, sans-serif` (`body`: 16px, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#EDF2F7` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#F7FAFC` -> `#EDF2F7`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#FC8181` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#EDF2F7`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#FC8181`, ink `#0b0b0c`, (8.1:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#FC8181`, ink `#0b0b0c`, (8.1:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#EDF2F7`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#EDF2F7`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#F7FAFC`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#F7FAFC`, (18.8:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#EDF2F7`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#F7FAFC` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#FC8181` with `#0b0b0c` text (8.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Inter` headings with `Inter` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#EDF2F7` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
