---
version: alpha
name: DHIS2 UI
description: "Crisp light (#ffffff) canvas, Roboto typography, #FF4785 brand accent, and 8px corner geometry"
colors:
  blue900: "#093371"
  blue800: "#0d47a1"
  blue700: "#1565c0"
  blue600: "#147cd7"
  blue500: "#2196f3"
  blue400: "#42a5f5"
  blue300: "#90caf9"
  blue200: "#c5e3fc"
  blue100: "#e3f2fd"
  blue050: "#f5fbff"
  teal900: "#00332b"
  teal800: "#004d40"
  teal700: "#00695c"
  teal600: "#00796b"
  teal500: "#00897b"
  teal400: "#009688"
  teal300: "#4db6ac"
  teal200: "#b2dfdb"
  teal100: "#e0f2f1"
  teal050: "#f1f9f9"
  red900: "#330202"
  red800: "#891515"
  red700: "#b71c1c"
  red600: "#c62828"
  red500: "#d32f2f"
  red400: "#f44336"
  red300: "#e57373"
  red200: "#ffcdd2"
  red100: "#ffe5e8"
  red050: "#fff5f6"
  yellow900: "#6f3205"
  yellow800: "#bb460d"
  yellow700: "#e56408"
  yellow600: "#ff8302"
  yellow500: "#ff9302"
  yellow400: "#ffa902"
  yellow300: "#ffc324"
  yellow200: "#ffe082"
  yellow100: "#ffecb3"
  yellow050: "#fff8e1"
  green900: "#103713"
  green800: "#1b5e20"
  green700: "#2e7d32"
  green600: "#388e3c"
  green500: "#43a047"
  green400: "#4caf50"
  green300: "#a5d6a7"
  green200: "#c8e6c9"
  green100: "#e8f5e9"
  green050: "#f4fbf4"
  grey900: "#212934"
  grey800: "#404b5a"
  grey700: "#4a5768"
  grey600: "#6C7787"
  grey500: "#a0adba"
  grey400: "#d5dde5"
  grey300: "#e8edf2"
  grey200: "#f3f5f7"
  grey100: "#f8f9fa"
  grey050: "#fbfcfd"
  white: "#ffffff"
  blue: "#0080d4"
  dark: "#212225"
  background-color: "#276696"
  color-primary: "#FF4785"
  primary: "#FF4785"
typography:
  heading-2xl:
    fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif"
    fontSize: 28px
    fontWeight: 500
    lineHeight: 1.25
  heading-xl:
    fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif"
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.3
  heading-lg:
    fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif"
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
  body-md:
    fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
  body-sm:
    fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.38
  caption-xs:
    fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
icons:
  library: DHIS2 UI Icons
  package: "@dhis2/ui-icons"
  style: outline
  grid: 24
  strokeWidth: 1.5
  strokeLinecap: round
  strokeLinejoin: round
  source: curated
  url: "https://ui.dhis2.nu"
components:
  button-primary:
    backgroundColor: "#FF4785"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f5fbff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f5fbff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#FF4785"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f5fbff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#f5fbff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#FF4785"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#FF4785"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f5fbff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f5fbff"
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
    backgroundColor: "#f5fbff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# DHIS2 UI

## Overview

**DHIS2 UI** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#FF4785` brand accent.

Typography centers cleanly on `Roboto` (28px display down to 14px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#f5fbff` surface layering.

Maintained by **DHIS2**. Source: published token package (https://github.com/dhis2/ui), repo https://github.com/dhis2/ui, package `@dhis2/ui`, frameworks: react. Inventory: **66** colors, **6** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f5fbff` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#FF4785` (3.2:1 vs canvas; pair with `#f7f7f8` foreground ink for 3.0:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `blue900` (`#093371`), `blue800` (`#0d47a1`), `blue700` (`#1565c0`), `blue600` (`#147cd7`), `blue500` (`#2196f3`), `blue400` (`#42a5f5`).
- **Neutral Ramp**: `blue050` (`#f5fbff`), `teal100` (`#e0f2f1`), `teal050` (`#f1f9f9`), `red050` (`#fff5f6`), `green100` (`#e8f5e9`), `green050` (`#f4fbf4`).
- **Semantic States**: success: `green900` (`#103713`) · danger: `red900` (`#330202`) · warning: `yellow900` (`#6f3205`).

## Typography

- **Primary / Display Voice**: `Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif` (top step `heading-2xl`: 28px, weight 500, line-height 1.25).
- **Body & UI Controls**: `Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif` (`body-md`: 14px, weight 400, line-height 1.43).
- **Scale Steps (6)**: `heading-2xl` (28px, w500), `heading-xl` (24px, w500), `heading-lg` (20px, w500), `body-md` (14px, w400), `body-sm` (13px, w400), `caption-xs` (12px, w400).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f5fbff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#f5fbff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#FF4785` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: DHIS2 UI Icons (`@dhis2/ui-icons`) on a `24x24` grid (outline, stroke `1.5px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#FF4785`, ink `#0b0b0c`, (6.1:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ef4444`, ink `#000000`, (5.6:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f5fbff`, ink `#0b0b0c`, (18.9:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f5fbff`, ink `#0b0b0c`, (18.9:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#FF4785`, ink `#000000`, (6.5:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#10b981`, ink `#000000`, (8.3:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f5fbff`, ink `#0b0b0c`, (18.9:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#f5fbff`, ink `#0b0b0c`, (18.9:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#FF4785`, ink `#0b0b0c`, (6.1:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#FF4785`, ink `#0b0b0c`, (6.1:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f5fbff`, ink `#0b0b0c`, (18.9:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f5fbff`, ink `#0b0b0c`, (18.9:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f5fbff`, ink `#0b0b0c`, (18.9:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#FF4785` with `#f7f7f8` text (3.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Roboto` headings with `Roboto` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f5fbff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
