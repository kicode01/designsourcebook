---
version: alpha
name: New York State Design System
description: "Crisp light (#ffffff) canvas, Public Sans typography, #1b1b1b brand accent, and 8px corner geometry"
colors:
  10: "#f6f6f6"
  50: "#ededed"
  100: "#d0d0ce"
  200: "#bec0c1"
  300: "#a7a9ab"
  400: "#909395"
  500: "#797c7f"
  600: "#62666a"
  700: "#4a4d4f"
  800: "#323435"
  900: "#1b1b1b"
  black: "#000000"
  white: "#ffffff"
  transparent: "#ffffff00"
  color: "#0000001a"
  primary: "#1b1b1b"
typography:
  display-xl:
    fontFamily: "\"Public Sans\", \"Proxima Nova\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.2
  heading-lg:
    fontFamily: "\"Public Sans\", \"Proxima Nova\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.25
  heading-md:
    fontFamily: "\"Public Sans\", \"Proxima Nova\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
  heading-sm:
    fontFamily: "\"Public Sans\", \"Proxima Nova\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "\"Public Sans\", \"Proxima Nova\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "\"Public Sans\", \"Proxima Nova\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.42
  caption:
    fontFamily: "\"Public Sans\", \"Proxima Nova\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
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
  button-primary:
    backgroundColor: "#1b1b1b"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f6f6f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f6f6f6"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#1b1b1b"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f6f6f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#f6f6f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#1b1b1b"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#1b1b1b"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f6f6f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f6f6f6"
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
    backgroundColor: "#f6f6f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# New York State Design System

## Overview

**New York State Design System** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#1b1b1b` brand accent.

Typography centers cleanly on `Public Sans` (40px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#f6f6f6` surface layering.

Maintained by **NYS**. Source: published token package (https://github.com/ITS-HCD/nysds), repo https://github.com/ITS-HCD/nysds, frameworks: css. Inventory: **16** colors, **7** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f6f6f6` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#1b1b1b` (17.2:1 vs canvas; pair with `#f7f7f8` foreground ink for 16.1:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Neutral Ramp**: `10` (`#f6f6f6`), `50` (`#ededed`), `100` (`#d0d0ce`), `200` (`#bec0c1`), `300` (`#a7a9ab`), `400` (`#909395`).

## Typography

- **Primary / Display Voice**: `"Public Sans", "Proxima Nova", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (top step `display-xl`: 40px, weight 700, line-height 1.2).
- **Body & UI Controls**: `"Public Sans", "Proxima Nova", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (`body`: 16px, weight 400, line-height 1.5).
- **Scale Steps (7)**: `display-xl` (40px, w700), `heading-lg` (32px, w700), `heading-md` (24px, w600), `heading-sm` (20px, w600), `body` (16px, w400), `body-sm` (14px, w400), `caption` (12px, w500).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f6f6f6` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#f6f6f6`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#1b1b1b` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#1b1b1b`, ink `#ffffff`, (17.2:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f6f6f6`, ink `#0b0b0c`, (18.2:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f6f6f6`, ink `#0b0b0c`, (18.2:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#1b1b1b`, ink `#ffffff`, (17.2:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f6f6f6`, ink `#0b0b0c`, (18.2:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#f6f6f6`, ink `#0b0b0c`, (18.2:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#1b1b1b`, ink `#f7f7f8`, (16.1:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#1b1b1b`, ink `#f7f7f8`, (16.1:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f6f6f6`, ink `#0b0b0c`, (18.2:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f6f6f6`, ink `#0b0b0c`, (18.2:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f6f6f6`, ink `#0b0b0c`, (18.2:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#1b1b1b` with `#f7f7f8` text (16.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Public Sans` headings with `Public Sans` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f6f6f6` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
