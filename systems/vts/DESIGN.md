---
version: alpha
name: Terra
description: "VTS Terra — read from the rendered page in a browser, not from published tokens."
colors:
  tw-ring-offset-color: "#fff"
  rdp-accent-color: "#0000ff"
  rdp-background-color: "#e7edff"
  rdp-accent-color-dark: "#3003e1"
  rdp-background-color-dark: "#180270"
  rdp-selected-color: "#fff"
  brand-primary-100: "#f5f5ff"
  brand-primary-200: "#EBEBFF"
  brand-primary-300: "#CCCCFF"
  brand-primary-400: "#AEA9FE"
  brand-primary-500: "#887EFC"
  brand-primary-600: "#6253da"
  brand-primary-700: "#4837b9"
  brand-primary-800: "#280f96"
  brand-primary-900: "#130A76"
  brand-secondary-100: "#f5fcfc"
  brand-secondary-200: "#e7f8f8"
  brand-secondary-300: "#bfeded"
  brand-secondary-400: "#80dbdb"
  brand-secondary-500: "#60d2d2"
  brand-secondary-600: "#009696"
  brand-secondary-700: "#247f7e"
  brand-secondary-800: "#1c6363"
  brand-secondary-900: "#124040"
  brand-primary-inverse-text: "#ffffff"
  brand-interactive-100: "#f5f5ff"
  brand-interactive-200: "#EBEBFF"
  brand-interactive-300: "#CCCCFF"
  brand-interactive-400: "#AEA9FE"
  brand-interactive-500: "#887EFC"
  brand-interactive-600: "#6253da"
  brand-interactive-700: "#4837b9"
  brand-interactive-800: "#280f96"
  brand-interactive-900: "#130A76"
  primary: "#EBEBFF"
typography:
  rdp-caption-font-size:
    fontSize: 18px
  font-body-extra-small:
    fontFamily: "Inter, sans-serif"
    fontSize: 10px
    fontWeight: 400
    lineHeight: 14px
  html:
    fontFamily: "Inter, sans-serif"
  text-size-body-14:
    fontSize: 14px
  text-size-body-16:
    fontSize: 16px
  text-size-body-18:
    fontSize: 18px
  text-size-title-64:
    fontSize: 64px
  text-size-title-72:
    fontSize: 72px
  text-size-title-80:
    fontSize: 80px
  font-body:
    fontFamily: "Inter, sans-serif"
  font-body-large-emphasis:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    lineHeight: 24px
  font-body-medium-emphasis:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    lineHeight: 20px
  font-body-small-emphasis:
    fontFamily: "Inter, sans-serif"
    fontSize: 12px
    lineHeight: 16px
  font-display:
    fontFamily: "Inter, sans-serif"
    fontSize: 50px
    fontWeight: 700
    lineHeight: 56px
  font-subtitle-de-emphasis:
    fontFamily: "Inter, sans-serif"
    fontSize: 18px
    lineHeight: 28px
  font-title-de-emphasis:
    fontFamily: "Inter, sans-serif"
    fontSize: 24px
    lineHeight: 32px
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
  bg-text-link:
    backgroundColor: "#4837b9"
  text-text-link-2:
    textColor: "#4837b9"
  bg-text-link-darkmode-3:
    backgroundColor: "#AEA9FE"
  select-default:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: rdp-accent-color
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: rdp-accent-color
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#fff"
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
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Terra

## Overview

**Terra** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `rdp-accent-color` brand accent.

Typography centers cleanly on `Inter` (80px display down to 18px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **VTS**. Source: live stylesheet extraction (https://terra.vts.com/). Inventory: **35** colors, **16** typography steps, and **11** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `rdp-accent-color` (distinct vs canvas; pair with `#f7f7f8` foreground ink for verified contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `rdp-accent-color` (`#0000ff`), `rdp-accent-color-dark` (`#3003e1`), `rdp-background-color-dark` (`#180270`), `brand-primary-300` (`#CCCCFF`), `brand-primary-400` (`#AEA9FE`), `brand-primary-500` (`#887EFC`).
- **Neutral Ramp**: `tw-ring-offset-color` (`#fff`), `rdp-background-color` (`#e7edff`), `rdp-selected-color` (`#fff`), `brand-primary-100` (`#f5f5ff`), `brand-primary-200` (`#EBEBFF`), `brand-secondary-100` (`#f5fcfc`).

## Typography

- **Primary / Display Voice**: `Inter, sans-serif` (top step `text-size-title-80`: 80px, weight 600).
- **Body & UI Controls**: `Inter, sans-serif` (`text-size-body-18`: 18px, weight 400).
- **Scale Steps (16)**: `text-size-title-80` (80px), `text-size-title-72` (72px), `text-size-title-64` (64px), `font-display` (50px, w700), `font-title-de-emphasis` (24px), `rdp-caption-font-size` (18px), `text-size-body-18` (18px), `font-subtitle-de-emphasis` (18px).

## Layout

- **Grid & Control Spacing**: Derived from 11 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#fff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#fff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `rdp-accent-color` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`bg-text-link` (link)**: bg `#4837b9`.
- **`text-text-link-2` (link)**: ink `#4837b9`.
- **`bg-text-link-darkmode-3` (link)**: bg `#AEA9FE`.
- **`select-default` (select)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `rdp-accent-color`, ink `#000000`, radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `rdp-accent-color`, ink `#000000`, radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `rdp-accent-color` with `#f7f7f8` text (verified) for primary CTAs, active tabs, and focus outlines.
- Pair `Inter` headings with `Inter` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#fff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
