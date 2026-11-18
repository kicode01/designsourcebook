---
version: alpha
name: Crayons
description: "Freshworks Crayons — tokens imported from @freshworks/crayons."
colors:
  12344d: "#fff"
  color: "#000"
  color-milk: "#fff"
  color-elephant-900: "#12344d"
  color-elephant-800: "#264966"
  color-elephant-700: "#345c7c"
  color-elephant-600: "#447093"
  color-smoke-700: "#475867"
  color-smoke-300: "#92a2b1"
  color-smoke-100: "#cfd7df"
  color-smoke-50: "#ebeff3"
  color-smoke-25: "#f3f5f7"
  color-jungle-800: "#00795b"
  color-jungle-500: "#00a886"
  color-jungle-100: "#b4e5da"
  color-jungle-50: "#e0f5f1"
  color-azure-800: "#2c5cc5"
  color-azure-100: "#bbdcfe"
  color-azure-50: "#e5f2fd"
  color-persimmon-900: "#c82124"
  color-persimmon-800: "#d72d30"
  color-persimmon-100: "#ffd0d6"
  color-persimmon-50: "#ffecf0"
  color-casablanca-700: "#e86f25"
  color-casablanca-300: "#f8ab59"
  color-casablanca-100: "#fedcb3"
  color-casablanca-50: "#fef1e1"
  primary: "#f8ab59"
typography:
  font-size-10:
    fontSize: 10px
  font-size-12:
    fontSize: 12px
  font-size-14:
    fontSize: 14px
  font-size-16:
    fontSize: 16px
  font-size-18:
    fontSize: 18px
  font-size-20:
    fontSize: 20px
  font-size-24:
    fontSize: 24px
  font-stack:
    fontFamily: "-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif"
rounded:
  nav: 4px
  default: 4px
icons:
  library: Repository SVGs
  package: null
  style: outline
  grid: 14
  strokeWidth: 1
  strokeLinecap: round
  strokeLinejoin: round
  source: repo
components:
  modal:
    backgroundColor: "#fff"
    rounded: 4px
  modal-container-2:
    backgroundColor: "rgba(18, 52, 77, 0.5)"
  icon:
    backgroundColor: "#ebeff3"
    rounded: 3px
    padding: 3px 0 0 6px
    height: 25px
    width: 25px
  label:
    textColor: "#6f7c87"
    typography:
      fontWeight: 600
    rounded: 2px
  label-field:
    textColor: "#475867"
    typography:
      fontSize: 12px
      fontWeight: 400
  select-default:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#f8ab59"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#f8ab59"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#fff"
    rounded: 6px
    padding: 6px 10px
---

# Crayons

## Overview

**Crayons** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#f8ab59` brand accent.

Typography centers cleanly on `System UI` (24px display down to 16px body), unified by `4px` base corner radius and hairline `1px` structural borders.

Maintained by **Freshworks**. Source: published token package (https://github.com/freshworks/crayons#readme), package `@freshworks/crayons`. Inventory: **28** colors, **8** typography steps, and **12** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#f8ab59` (1.9:1 vs canvas; pair with `#0b0b0c` foreground ink for 10.3:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-elephant-900` (`#12344d`), `color-elephant-800` (`#264966`), `color-elephant-700` (`#345c7c`), `color-elephant-600` (`#447093`), `color-smoke-700` (`#475867`), `color-smoke-300` (`#92a2b1`).
- **Neutral Ramp**: `12344d` (`#fff`), `color` (`#000`), `color-milk` (`#fff`), `color-smoke-100` (`#cfd7df`), `color-smoke-50` (`#ebeff3`), `color-smoke-25` (`#f3f5f7`).

## Typography

- **Primary / Display Voice**: `-apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif` (top step `font-size-24`: 24px, weight 600).
- **Body & UI Controls**: `-apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif` (`font-size-16`: 16px, weight 400).
- **Scale Steps (8)**: `font-size-24` (24px), `font-size-20` (20px), `font-size-18` (18px), `font-size-16` (16px), `font-stack` (16px), `font-size-14` (14px), `font-size-12` (12px), `font-size-10` (10px).

## Layout

- **Grid & Control Spacing**: Derived from 12 component tokens with documented paddings: `3px 0 0 6px`, `8px 12px`, `2px`, `6px 12px`, `12px 14px`.
- **Hierarchy**: Group controls cleanly within `#fff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#fff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#f8ab59` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `4px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `4px` container.
- **Iconography & SVGs**: Repository SVGs on a `14x14` grid (outline, stroke `1px`, `round` caps).

## Components

- **`modal` (modal)**: bg `#fff`, radius `4px`.
- **`modal-container-2` (modal)**: bg `rgba(18, 52, 77, 0.5)`.
- **`icon` (icon)**: bg `#ebeff3`, radius `3px`, padding `3px 0 0 6px`.
- **`label` (label)**: ink `#6f7c87`, radius `2px`, border `1px solid #dadfe3`.
- **`label-field` (input)**: ink `#475867`.
- **`select-default` (select)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#f8ab59`, ink `#0b0b0c`, (10.3:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#f8ab59`, ink `#0b0b0c`, (10.3:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#f8ab59` with `#0b0b0c` text (10.3:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `4px` base geometry across inputs and buttons (4px on outer containers).
- Separate containers via `#fff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `4px` baseline.
- Do not truncate or drop border contrast on `label-field` fields and secondary buttons.
