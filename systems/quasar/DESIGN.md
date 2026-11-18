---
version: alpha
name: Quasar
description: "Quasar — tokens imported from quasar."
colors:
  q-primary: "#1976D2"
  q-secondary: "#26A69A"
  q-accent: "#9C27B0"
  q-positive: "#21BA45"
  q-negative: "#C10015"
  q-info: "#31CCEC"
  q-warning: "#F2C037"
  q-dark: "#1d1d1d"
  q-dark-page: "#121212"
  q-shadow-color: "#000"
  q-dark-shadow-color: "#fff"
  primary: "#9C27B0"
typography:
  q-date-header-subtitle:
    fontSize: 14px
    lineHeight: 1.75
  q-date-header-title-label:
    fontSize: 24px
    lineHeight: 1.2
  q-dialog-title:
    fontSize: 1.25rem
    fontWeight: 500
    lineHeight: 1.6
  q-stepper-title:
    fontSize: 14px
    lineHeight: 1.285714
  q-stepper-caption:
    fontSize: 12px
    lineHeight: 1.16667
  q-table-title:
    fontSize: 20px
    fontWeight: 400
  q-table-grid-item-title:
    fontSize: 12px
    fontWeight: 500
  q-timeline-subtitle:
    fontSize: 12px
    fontWeight: 700
  q-timeline-heading:
    fontSize: "200%"
  q-toolbar-title:
    fontSize: 21px
  q-uploader-title:
    fontSize: 14px
    lineHeight: 1.285714
  q-uploader-subtitle:
    fontSize: 12px
    lineHeight: 1.5
  q-notification-caption:
    fontSize: 0.9em
  body:
    fontFamily: "Roboto, -apple-system, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 14px
    lineHeight: 1.5
  h1:
    fontSize: 6rem
    fontWeight: 300
    lineHeight: 6rem
  h2:
    fontSize: 3.75rem
    fontWeight: 300
    lineHeight: 3.75rem
  h3:
    fontSize: 3rem
    fontWeight: 400
    lineHeight: 3.125rem
  h4:
    fontSize: 2.125rem
    fontWeight: 400
    lineHeight: 2.5rem
  h5:
    fontSize: 1.5rem
    fontWeight: 400
    lineHeight: 2rem
  h6:
    fontSize: 1.25rem
    fontWeight: 500
    lineHeight: 2rem
  text-subtitle1:
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.75rem
  text-subtitle2:
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.375rem
  text-body1:
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5rem
  text-body2:
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
  text-caption:
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.25rem
rounded:
  card: 4px
  badge: 16px
  default: 4px
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
  card:
    backgroundColor: "#fff"
    rounded: 4px
  chip:
    backgroundColor: "#e0e0e0"
    textColor: "rgba(0, 0, 0, 0.87)"
    typography:
      fontSize: 14px
    rounded: 16px
    padding: 0.5em 0.9em
    height: 2em
  badge-2:
    backgroundColor: "#1976D2"
    textColor: "#fff"
    typography:
      fontSize: 12px
      fontWeight: normal
    rounded: 4px
    padding: 2px 6px
  banner:
    backgroundColor: "#fff"
    padding: 8px 16px
  drawer:
    backgroundColor: "#fff"
  chip-3:
    textColor: "rgba(0, 0, 0, 0.54)"
    typography:
      fontSize: 1.5em
  tab-panels:
    backgroundColor: "#fff"
  table:
    backgroundColor: "#fff"
    textColor: "#000"
    rounded: 4px
  radio:
    textColor: "rgba(0, 0, 0, 0.54)"
    typography:
      fontSize: 40px
    rounded: "50%"
    height: 1em
    width: 1em
  q-markup-table-2:
    backgroundColor: "#fff"
  checkbox:
    textColor: "#fff"
  select:
    backgroundColor: "#fff"
  checkbox-2:
    textColor: "rgba(0, 0, 0, 0.54)"
    typography:
      fontSize: 40px
    rounded: "50%"
    height: 1em
    width: 1em
  q-linear-progress:
    textColor: "#1976D2"
    typography:
      fontSize: 4px
    height: 1em
  dialog-2:
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  select-2:
    backgroundColor: transparent
    textColor: "#1976D2"
    typography:
      fontSize: 14px
      fontWeight: 500
    padding: 0 4px
  btn:
    backgroundColor: "rgba(255, 255, 255, 0.25)"
  tooltip-style:
    backgroundColor: "#757575"
    textColor: "#fafafa"
    typography:
      fontSize: 10px
      fontWeight: normal
    rounded: 4px
  radio-truthy:
    textColor: "#1976D2"
  toggle-truthy:
    textColor: "#1976D2"
  checkbox-indet:
    textColor: "#1976D2"
  q-linear-progress-dark:
    backgroundColor: "rgba(255, 255, 255, 0.6)"
  q-linear-progress-light:
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  badge-outline:
    backgroundColor: "#0000"
  icon-glyph:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Quasar

## Overview

**Quasar** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#9C27B0` brand accent.

Typography centers cleanly on `Roboto` (96px display down to 16px body), unified by `4px` base corner radius and subtle shadow elevation.

Source: published token package (https://quasar.dev), package `quasar`. Inventory: **12** colors, **25** typography steps, and **25** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#9C27B0` (6.3:1 vs canvas; pair with `#f7f7f8` foreground ink for 5.9:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `q-primary` (`#1976D2`), `q-secondary` (`#26A69A`), `q-accent` (`#9C27B0`), `primary` (`#9C27B0`).
- **Neutral Ramp**: `q-dark` (`#1d1d1d`), `q-dark-page` (`#121212`), `q-shadow-color` (`#000`), `q-dark-shadow-color` (`#fff`).
- **Semantic States**: success: `q-positive` (`#21BA45`) · danger: `q-negative` (`#C10015`) · warning: `q-warning` (`#F2C037`) · info: `q-info` (`#31CCEC`).

## Typography

- **Primary / Display Voice**: `Roboto, -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif` (top step `h1`: 6rem, weight 300, line-height 6rem).
- **Body & UI Controls**: `Roboto, -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif` (`text-body1`: 1rem, weight 400, line-height 1.5rem).
- **Scale Steps (25)**: `h1` (6rem, w300), `h2` (3.75rem, w300), `h3` (3rem, w400), `h4` (2.125rem, w400), `q-timeline-heading` (200%), `q-date-header-title-label` (24px), `h5` (1.5rem, w400), `q-toolbar-title` (21px).

## Layout

- **Grid & Control Spacing**: Derived from 25 component tokens with documented paddings: `0.5em 0.9em`, `2px 6px`, `8px 16px`, `0 4px`, `8px`.
- **Hierarchy**: Group controls cleanly within `#fff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Layered Shadow Model**: Uses documented shadows (`0 1px 5px , 0 2px 2px , 0 3px 1px -2px`, `0 1px 5px , 0 2px 2px , 0 3px 1px -2px`) paired with `color-mix(in srgb, #0b0b0c 14%, transparent)` borders for elevated overlays.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#9C27B0` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `4px` (Cards `4px` · Badges `16px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `4px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`card` (card)**: bg `#fff`, radius `4px`.
- **`chip` (badge)**: bg `#e0e0e0`, ink `rgba(0, 0, 0, 0.87)`, (12.8:1), radius `16px`, padding `0.5em 0.9em`.
- **`badge-2` (badge)**: bg `#1976D2`, ink `#fff`, (4.6:1), radius `4px`, padding `2px 6px`.
- **`banner` (alert)**: bg `#fff`, padding `8px 16px`.
- **`drawer` (modal)**: bg `#fff`.
- **`chip-3` (badge)**: ink `rgba(0, 0, 0, 0.54)`.
- **`tab-panels` (tabs)**: bg `#fff`.
- **`table` (table)**: bg `#fff`, ink `#000`, (21.0:1), radius `4px`.
- **`radio` (radio)**: ink `rgba(0, 0, 0, 0.54)`, radius `50%`.
- **`q-markup-table-2` (table)**: bg `#fff`.
- **`checkbox` (checkbox)**: ink `#fff`.
- **`select` (select)**: bg `#fff`.
- **`checkbox-2` (checkbox)**: ink `rgba(0, 0, 0, 0.54)`, radius `50%`.
- **`q-linear-progress` (progress)**: ink `#1976D2`.
- **`dialog-2` (modal)**: bg `rgba(0, 0, 0, 0.4)`.
- **`select-2` (select)**: bg `transparent`, ink `#1976D2`, padding `0 4px`, border `0`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#9C27B0` with `#f7f7f8` text (5.9:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Roboto` headings with `Roboto` body copy using documented weights and scale steps.
- Apply `4px` base geometry across inputs and buttons (4px on outer containers).
- Separate containers via `#fff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `4px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
