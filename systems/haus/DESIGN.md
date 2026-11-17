---
version: alpha
name: haus
description: "Dark (rgb(0, 31, 63)) canvas, Inter typography, rgb(204, 0, 0) brand accent, and 8px corner geometry"
colors:
  hex: "#4e83bd"
  code: "#f6f3fc"
  figma: "#f6f3fc"
  effective-bg: "rgb(255, 255, 255)"
  raw-color: "rgb(255, 255, 255)"
  raw-background-color: "rgb(0, 31, 63)"
  raw-effective-background-color: "rgb(0, 31, 63)"
  raw-border-top-color: "rgb(0, 31, 63)"
  raw-border-right-color: "rgb(0, 31, 63)"
  raw-border-bottom-color: "rgb(0, 31, 63)"
  raw-border-left-color: "rgb(204, 0, 0)"
  styles-color: "#ffffff"
  styles-background-color: "#001f3f"
  styles-effective-background-color: "#001f3f"
  color: "rgb(255, 255, 255)"
  background-color: "rgb(0, 31, 63)"
  effective-background-color: "rgb(0, 31, 63)"
  border-top-color: "rgb(0, 31, 63)"
  border-right-color: "rgb(0, 31, 63)"
  border-bottom-color: "rgb(0, 31, 63)"
  border-left-color: "rgb(204, 0, 0)"
  primary: "rgb(204, 0, 0)"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
  h1:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.28
  h2:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.42
  caption:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
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
    backgroundColor: "rgb(204, 0, 0)"
    textColor: "#ffffff"
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
    backgroundColor: "#f6f3fc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f6f3fc"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "rgb(204, 0, 0)"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f6f3fc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#f6f3fc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "rgb(204, 0, 0)"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "rgb(204, 0, 0)"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f6f3fc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f6f3fc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "rgb(255, 255, 255)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "rgb(255, 255, 255)"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#f6f3fc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# haus

## Overview

**haus** is a light-first design system anchored on `rgb(255, 255, 255)` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `rgb(204, 0, 0)` brand accent.

Typography centers cleanly on `Inter` (36px display down to 16px body), unified by `8px` base corner radius and stepped `rgb(255, 255, 255)` -> `#f6f3fc` surface layering.

Source: published token package (https://github.com/hipuku/haus), repo https://github.com/hipuku/haus, frameworks: css. Inventory: **22** colors, **6** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `rgb(255, 255, 255)` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f6f3fc` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `rgb(204, 0, 0)` (5.9:1 vs canvas; pair with `#f7f7f8` foreground ink for 5.5:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `hex` (`#4e83bd`), `raw-background-color` (`rgb(0, 31, 63)`), `raw-effective-background-color` (`rgb(0, 31, 63)`), `raw-border-top-color` (`rgb(0, 31, 63)`), `raw-border-right-color` (`rgb(0, 31, 63)`), `raw-border-bottom-color` (`rgb(0, 31, 63)`).
- **Neutral Ramp**: `code` (`#f6f3fc`), `figma` (`#f6f3fc`), `effective-bg` (`rgb(255, 255, 255)`), `raw-color` (`rgb(255, 255, 255)`), `styles-color` (`#ffffff`), `color` (`rgb(255, 255, 255)`).

## Typography

- **Primary / Display Voice**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (top step `display`: 36px, weight 700, line-height 1.2).
- **Body & UI Controls**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (`body`: 16px, weight 400, line-height 1.5).
- **Scale Steps (6)**: `display` (36px, w700), `h1` (28px, w600), `h2` (22px, w600), `body` (16px, w400), `body-sm` (14px, w400), `caption` (12px, w500).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f6f3fc` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`rgb(255, 255, 255)` -> `#f6f3fc`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `rgb(204, 0, 0)` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `rgb(204, 0, 0)`, ink `#ffffff`, (5.9:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ef4444`, ink `#000000`, (5.6:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f6f3fc`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f6f3fc`, ink `#0b0b0c`, (17.9:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `rgb(204, 0, 0)`, ink `#f7f7f8`, (5.5:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#10b981`, ink `#000000`, (8.3:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f6f3fc`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#f6f3fc`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `rgb(204, 0, 0)`, ink `#f7f7f8`, (5.5:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `rgb(204, 0, 0)`, ink `#f7f7f8`, (5.5:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f6f3fc`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f6f3fc`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `rgb(255, 255, 255)`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `rgb(255, 255, 255)`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f6f3fc`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `rgb(255, 255, 255)` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `rgb(204, 0, 0)` with `#f7f7f8` text (5.5:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Inter` headings with `Inter` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f6f3fc` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
