---
version: alpha
name: Skeleton UI
description: "Skeleton Labs Skeleton UI — tokens imported from @skeletonlabs/skeleton."
colors:
  color-primary-50: "#fafafa"
  color-primary-100: "#f5f5f5"
  color-primary-200: "#e5e5e5"
  color-primary-300: "#d4d4d4"
  color-primary-400: "#a1a1a1"
  color-primary-500: "#737373"
  color-primary-600: "#525252"
  color-primary-700: "#404040"
  color-primary-800: "#262626"
  color-primary-900: "#171717"
  color-primary-950: "#0a0a0a"
  color-secondary-50: "#fafafa"
  color-secondary-100: "#f5f5f5"
  color-secondary-200: "#e5e5e5"
  color-secondary-300: "#d4d4d4"
  color-secondary-400: "#a1a1a1"
  color-secondary-500: "#737373"
  color-secondary-600: "#525252"
  color-secondary-700: "#404040"
  color-secondary-800: "#262626"
  color-secondary-900: "#171717"
  color-secondary-950: "#0a0a0a"
  color-tertiary-50: "#fafafa"
  color-tertiary-100: "#f5f5f5"
  color-tertiary-200: "#e5e5e5"
  color-tertiary-300: "#d4d4d4"
  color-tertiary-400: "#a1a1a1"
  color-tertiary-500: "#737373"
  color-tertiary-600: "#525252"
  color-tertiary-700: "#404040"
  color-tertiary-800: "#262626"
  color-tertiary-900: "#171717"
  color-tertiary-950: "#0a0a0a"
  color-success-50: "#fafafa"
  color-success-100: "#f5f5f5"
  color-success-200: "#e5e5e5"
  color-success-300: "#d4d4d4"
  color-success-400: "#a1a1a1"
  color-success-500: "#737373"
  color-success-600: "#525252"
  color-success-700: "#404040"
  color-success-800: "#262626"
  color-success-900: "#171717"
  color-success-950: "#0a0a0a"
  color-warning-50: "#fafafa"
  color-warning-100: "#f5f5f5"
  color-warning-200: "#e5e5e5"
  color-warning-300: "#d4d4d4"
  color-warning-400: "#a1a1a1"
  color-warning-500: "#737373"
  color-warning-600: "#525252"
  color-warning-700: "#404040"
  color-warning-800: "#262626"
  color-warning-900: "#171717"
  color-warning-950: "#0a0a0a"
  color-error-50: "#fafafa"
  color-error-100: "#f5f5f5"
  color-error-200: "#e5e5e5"
  color-error-300: "#d4d4d4"
  color-error-400: "#a1a1a1"
  color-error-500: "#737373"
  color-error-600: "#525252"
  color-error-700: "#404040"
  color-error-800: "#262626"
  color-error-900: "#171717"
  color-error-950: "#0a0a0a"
  color-surface-50: "#fafafa"
  color-surface-100: "#f5f5f5"
  color-surface-200: "#e5e5e5"
  color-surface-300: "#d4d4d4"
  color-surface-400: "#a1a1a1"
  color-surface-500: "#737373"
  color-surface-600: "#525252"
  color-surface-700: "#404040"
  color-surface-800: "#262626"
  color-surface-900: "#171717"
  color-surface-950: "#0a0a0a"
  color-root-bg-light: "#ffffff"
  typo-base-color-light: "#000000"
  typo-base-color-dark: "#ffffff"
  typo-heading-color-light: "#000000"
  typo-anchor-color-light: "#ffffff"
  typo-heading-color-dark: "#ffffff"
  primary: "#fafafa"
typography:
  typo-base-font-family:
    fontFamily: "ui-rounded, \"Hiragino Maru Gothic ProN\", Quicksand, Comfortaa, Manjari, \"Arial Rounded MT\", \"Arial Rounded MT Bold\", Calibri, source-sans-pro, sans-serif"
  typo-heading-font-family:
    fontFamily: "Seravek, \"Gill Sans Nova\", Ubuntu, Calibri, \"DejaVu Sans\", source-sans-pro, sans-serif"
  typo-base-font-size:
    fontSize: 18px
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
    backgroundColor: color-primary-400
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: color-primary-400
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
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Skeleton UI

## Overview

**Skeleton UI** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `color-primary-400` brand accent.

Typography centers cleanly on `ui-rounded` (18px display down to 18px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#fafafa` surface layering.

Maintained by **Skeleton Labs**. Source: published token package, package `@skeletonlabs/skeleton`. Inventory: **84** colors, **3** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fafafa` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `color-primary-400` (distinct vs canvas; pair with `#f7f7f8` foreground ink for verified contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Neutral Ramp**: `color-primary-50` (`#fafafa`), `color-primary-100` (`#f5f5f5`), `color-primary-200` (`#e5e5e5`), `color-primary-300` (`#d4d4d4`), `color-primary-400` (`#a1a1a1`), `color-primary-500` (`#737373`).

## Typography

- **Primary / Display Voice**: `ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif` (top step `typo-base-font-size`: 18px, weight 600).
- **Body & UI Controls**: `ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif` (`typo-base-font-size`: 18px, weight 400).
- **Scale Steps (3)**: `typo-base-font-size` (18px), `typo-base-font-family` (16px), `typo-heading-font-family` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#fafafa` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#fafafa`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `color-primary-400` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `color-primary-400`, ink `#000000`, radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `color-primary-400`, ink `#000000`, radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `color-primary-400` with `#f7f7f8` text (verified) for primary CTAs, active tabs, and focus outlines.
- Pair `ui-rounded` headings with `ui-rounded` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#fafafa` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
