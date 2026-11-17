---
version: alpha
name: City of Boston Fleet
description: "Crisp light (#fff) canvas, Montserrat typography, #fcb61a brand accent, and 8px corner geometry"
colors:
  white: "#fff"
  black: "#000"
  yellow: "#fcb61a"
  green: "#62A744"
  gray-000: "#f3f3f3"
  gray-100: "#e0e0e0"
  gray-200: "#C8C8C8"
  gray-300: "#828282"
  gray-400: "#d2d2d2"
  charles-blue: "#091f2f"
  purple: "#681da8"
  optimistic-blue-light: "#288be4"
  optimistic-blue-dark: "#1871bd"
  freedom-red-light: "#fb4d42"
  freedom-red-dark: "#d22d23"
  default-text: "#58585b"
  freedom-red: "#fb4d42"
  optimistic-blue: "#288be4"
  background: "#f3f3f3"
  death-feedback-link-color: "#145B99"
  death-feedback-link-hover-color: "#0F4575"
  death-feedback-link-active-color: "#0B3051"
  death-feedback-email-background: "#E3F0FB"
  color: "#000"
  primary: "#fcb61a"
typography:
  display-hero:
    fontFamily: "Montserrat, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 44px
    fontWeight: 700
    lineHeight: 1.15
  section-heading:
    fontFamily: "Montserrat, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.25
  sub-heading:
    fontFamily: "Montserrat, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
  body-editorial:
    fontFamily: "Montserrat, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Montserrat, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
  ui-label:
    fontFamily: "Montserrat, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
  caption:
    fontFamily: "Montserrat, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.35
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
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
  btn-link-styled:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    padding: "0"
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f3f3f3"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f3f3f3"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#fcb61a"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f3f3f3"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#f3f3f3"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#fcb61a"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#fcb61a"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f3f3f3"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f3f3f3"
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
    backgroundColor: "#f3f3f3"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# City of Boston Fleet

## Overview

**City of Boston Fleet** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#fcb61a` brand accent.

Typography centers cleanly on `Montserrat` (44px display down to 18px body), unified by `8px` base corner radius and stepped `#fff` -> `#f3f3f3` surface layering.

Maintained by **City of Boston**. Source: published token package (https://github.com/CityOfBoston/digital), repo https://github.com/CityOfBoston/digital, frameworks: css. Inventory: **25** colors, **7** typography steps, and **15** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f3f3f3` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#fcb61a` (1.8:1 vs canvas; pair with `#0b0b0c` foreground ink for 11.1:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `charles-blue` (`#091f2f`), `purple` (`#681da8`), `optimistic-blue-light` (`#288be4`), `optimistic-blue-dark` (`#1871bd`), `optimistic-blue` (`#288be4`), `primary` (`#fcb61a`).
- **Neutral Ramp**: `white` (`#fff`), `black` (`#000`), `gray-000` (`#f3f3f3`), `gray-100` (`#e0e0e0`), `gray-200` (`#C8C8C8`), `gray-300` (`#828282`).
- **Semantic States**: success: `green` (`#62A744`) · danger: `freedom-red-light` (`#fb4d42`) · warning: `yellow` (`#fcb61a`) · info: `death-feedback-link-color` (`#145B99`).

## Typography

- **Primary / Display Voice**: `Montserrat, "Helvetica Neue", Arial, sans-serif` (top step `display-hero`: 44px, weight 700, line-height 1.15).
- **Body & UI Controls**: `Montserrat, "Helvetica Neue", Arial, sans-serif` (`body-editorial`: 18px, weight 400, line-height 1.6).
- **Scale Steps (7)**: `display-hero` (44px, w700), `section-heading` (32px, w700), `sub-heading` (24px, w600), `body-editorial` (18px, w400), `body` (16px, w400), `ui-label` (14px, w600), `caption` (12px, w500).

## Layout

- **Grid & Control Spacing**: Derived from 15 component tokens with documented paddings: `0`, `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`.
- **Hierarchy**: Group controls cleanly within `#f3f3f3` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#f3f3f3`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#fcb61a` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`btn-link-styled` (button)**: bg `transparent`, ink `#0b0b0c`, padding `0`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f3f3f3`, ink `#0b0b0c`, (17.7:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f3f3f3`, ink `#0b0b0c`, (17.7:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#fcb61a`, ink `#0b0b0c`, (11.1:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f3f3f3`, ink `#0b0b0c`, (17.7:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#f3f3f3`, ink `#0b0b0c`, (17.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#fcb61a`, ink `#0b0b0c`, (11.1:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#fcb61a`, ink `#0b0b0c`, (11.1:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f3f3f3`, ink `#0b0b0c`, (17.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f3f3f3`, ink `#0b0b0c`, (17.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f3f3f3`, ink `#0b0b0c`, (17.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#fcb61a` with `#0b0b0c` text (11.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Montserrat` headings with `Montserrat` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f3f3f3` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
