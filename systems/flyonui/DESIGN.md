---
version: alpha
name: FlyonUI
description: "ThemeSelection FlyonUI — tokens read from https://github.com/themeselection/flyonui."
colors:
  tw-prose-code: "#e83e8c"
  color-base-100: "#1d1d20"
  color-base-200: "#09090b"
  color-base-300: "#090909"
  color-base-content: "#f2f2f2"
  color-primary: "#605dff"
  color-primary-content: "#fdf9e8"
  color-secondary: "#009689"
  color-secondary-content: "#effcf9"
  color-accent: "#3c3dfc"
  color-accent-content: "#ffffff"
  color-neutral: "#f8f8f8"
  color-neutral-content: "#314157"
  color-info: "#0082ce"
  color-info-content: "#edf7fd"
  color-success: "#5ca300"
  color-success-content: "#f5fce5"
  color-warning: "#b94b00"
  color-warning-content: "#fcfae6"
  color-error: "#f82834"
  color-error-content: "#fef2f2"
  primary: "#3c3dfc"
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
    backgroundColor: "#effcf9"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#3c3dfc"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#3c3dfc"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#effcf9"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#effcf9"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#f8f8f8"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#f8f8f8"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#effcf9"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# FlyonUI

## Overview

**FlyonUI** is a light-first design system anchored on `#f8f8f8` canvas surfaces with `#0b0b0c` primary ink (18.5:1 contrast) and `#3c3dfc` brand accent.

Typography centers cleanly on `System UI` (large display down to 14px body), unified by `8px` base corner radius and stepped `#f8f8f8` -> `#effcf9` surface layering.

Maintained by **ThemeSelection**. Source: published token package (https://github.com/themeselection/flyonui), repo https://github.com/themeselection/flyonui. Inventory: **22** colors, **0** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#f8f8f8` — base application backdrop (light theme).
- **Surface (`surface`)**: `#effcf9` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (18.5:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#3c3dfc` (6.1:1 vs canvas; pair with `#f7f7f8` foreground ink for 6.0:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `tw-prose-code` (`#e83e8c`), `color-primary` (`#605dff`), `color-secondary` (`#009689`), `color-accent` (`#3c3dfc`), `color-neutral-content` (`#314157`), `primary` (`#3c3dfc`).
- **Neutral Ramp**: `color-base-100` (`#1d1d20`), `color-base-200` (`#09090b`), `color-base-300` (`#090909`), `color-base-content` (`#f2f2f2`), `color-primary-content` (`#fdf9e8`), `color-secondary-content` (`#effcf9`).
- **Semantic States**: success: `color-success` (`#5ca300`) · danger: `color-error` (`#f82834`) · warning: `color-warning` (`#b94b00`) · info: `color-info` (`#0082ce`).

## Typography

- **Primary / Display Voice**: `System UI`.
- **Body & UI Controls**: `System UI`.

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#effcf9` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#f8f8f8` -> `#effcf9`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#3c3dfc` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#effcf9`, ink `#0b0b0c`, (18.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#3c3dfc`, ink `#f7f7f8`, (6.0:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#3c3dfc`, ink `#f7f7f8`, (6.0:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#effcf9`, ink `#0b0b0c`, (18.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#effcf9`, ink `#0b0b0c`, (18.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#f8f8f8`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#f8f8f8`, (18.5:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#effcf9`, ink `#0b0b0c`, (18.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#f8f8f8` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#3c3dfc` with `#f7f7f8` text (6.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#effcf9` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
