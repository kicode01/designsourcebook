---
version: alpha
name: daisyUI
description: "daisyUI — tokens imported from daisyui."
colors:
  color-base-100: "#001e29"
  color-base-200: "#00111d"
  color-base-300: "#000611"
  color-base-content: "#ffd6a7"
  color-primary: "#bdff00"
  color-primary-content: "#427600"
  color-secondary: "#cebef4"
  color-secondary-content: "#564775"
  color-accent: "#505050"
  color-accent-content: "#f8f8f8"
  color-neutral: "#003843"
  color-neutral-content: "#ffd6a7"
  color-info: "#00bafe"
  color-info-content: "#042e49"
  color-success: "#01df72"
  color-success-content: "#022d14"
  color-warning: "#ffbf00"
  color-warning-content: "#854200"
  color-error: "#f04e4f"
  color-error-content: "#690000"
  primary: "#bdff00"
typography:
  font-size:
    fontSize: 0.75rem
  fontsize:
    fontSize: 1.375rem
  rdp-month-caption:
    fontSize: ".75rem"
  font-size-min:
    fontSize: 1.375rem
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
    backgroundColor: "#000611"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#bdff00"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#bdff00"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#000611"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#000611"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#000611"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#f7f7f8"
    textColor: "#000611"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#000611"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 8px
---

# daisyUI

## Overview

**daisyUI** is a dark-first design system anchored on `#000611` canvas surfaces with `#f7f7f8` primary ink (19.0:1 contrast) and `#bdff00` brand accent.

Typography centers cleanly on `System UI` (22px display down to 12px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Source: published token package (https://daisyui.com), package `daisyui`. Inventory: **21** colors, **4** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#000611` — base application backdrop (dark theme).
- **Surface (`surface`)**: `#000611` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#f7f7f8` — body copy and primary headings (19.0:1 on canvas).
- **Muted Ink (`muted`)**: `#f7f7f8` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#bdff00` (16.9:1 vs canvas; pair with `#0b0b0c` foreground ink for 16.4:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #f7f7f8 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-base-100` (`#001e29`), `color-base-200` (`#00111d`), `color-base-content` (`#ffd6a7`), `color-primary` (`#bdff00`), `color-primary-content` (`#427600`), `color-secondary` (`#cebef4`).
- **Neutral Ramp**: `color-base-300` (`#000611`), `color-accent` (`#505050`), `color-accent-content` (`#f8f8f8`).
- **Semantic States**: success: `color-success` (`#01df72`) · danger: `color-error` (`#f04e4f`) · warning: `color-warning` (`#ffbf00`) · info: `color-info` (`#00bafe`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `fontsize`: 1.375rem, weight 600).
- **Body & UI Controls**: `system-ui` (`rdp-month-caption`: .75rem, weight 400).
- **Scale Steps (4)**: `fontsize` (1.375rem), `font-size-min` (1.375rem), `font-size` (0.75rem), `rdp-month-caption` (.75rem).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#000611` cards; separate sibling sections using `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#000611` -> `#000611`) and `1px solid color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#bdff00` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#000611`, ink `#f7f7f8`, (19.0:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#bdff00`, ink `#0b0b0c`, (16.4:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#bdff00`, ink `#0b0b0c`, (16.4:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#000611`, ink `#f7f7f8`, (19.0:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#000611`, ink `#f7f7f8`, (19.0:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#000611`, ink `#f7f7f8`, (19.0:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#f7f7f8`, ink `#000611`, (19.0:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#000611`, ink `#f7f7f8`, (19.0:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#000611` (dark) with `#f7f7f8` primary text and `#f7f7f8` secondary labels.
- Use `#bdff00` with `#0b0b0c` text (16.4:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#000611` surface shifts and `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of dark polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
