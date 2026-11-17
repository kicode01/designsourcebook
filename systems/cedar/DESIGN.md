---
version: alpha
name: Cedar
description: "REI Cedar — the co-op's open-source design system."
colors:
  cdr-color-background-primary: "#f4f2ed"
  cdr-color-background-secondary: "#dcd6cb"
  cdr-color-border-primary: "#958e83"
  cdr-color-border-secondary: "#726d64"
  cdr-button-with-background-background-color-active: "#eae0cc"
  cdr-button-with-background-background-color-disabled: "#eeeae2"
  cdr-button-with-background-background-color-interact: "#eae0cc"
  cdr-button-with-background-background-color: "#eae0cc"
  cdr-button-with-background-box-shadow-active: "#eae0cc"
  cdr-button-with-background-box-shadow-disabled: "#eeeae2"
  cdr-button-with-background-fill-active: "#454441"
  cdr-button-with-background-fill-disabled: "#b2ab9f"
  cdr-button-with-background-icon-fill-active: "#454441"
  cdr-button-with-background-icon-fill-interaction: "#454441"
  cdr-button-with-background-icon-fill: "#454441"
  cdr-color-border-button-secondary-active-inset: "#eae0cc"
  default-value: "#F9F8F6"
  primary: "#454441"
typography:
  html:
    fontFamily: sans-serif
    fontSize: 10px
    lineHeight: 1.15
  body:
    fontFamily: "Graphik, \"Graphik fallback\", \"Helvetica Neue\", sans-serif"
    fontSize: 1.6rem
    fontWeight: 400
    lineHeight: 1.5
  cdr-caption-summary-16-3-1:
    fontFamily: "Graphik, \"Graphik fallback\", \"Helvetica Neue\", sans-serif"
    fontSize: 1.4rem
    fontWeight: 400
    lineHeight: 2.2rem
  cdr-body-16-3-1:
    fontFamily: "Graphik, \"Graphik fallback\", \"Helvetica Neue\", sans-serif"
    fontSize: 1.8rem
    fontWeight: 400
    lineHeight: 3rem
  cdr-subheading-sans-16-3-1:
    fontFamily: "Graphik, \"Graphik fallback\", \"Helvetica Neue\", sans-serif"
    fontSize: 2.4rem
    fontWeight: 500
    lineHeight: 3rem
  cdr-modal-title-16-3-1:
    fontFamily: "Stuart, \"Stuart fallback\", Georgia, serif"
    fontSize: 2.4rem
    fontWeight: 500
    lineHeight: 3rem
  cdr-popover-title-16-3-1:
    fontFamily: "Stuart, \"Stuart fallback\", Georgia, serif"
    fontSize: 1.8rem
    fontWeight: 500
    lineHeight: 2.4rem
  cdr-title-16-3-1:
    fontFamily: "Stuart, \"Stuart fallback\", Georgia, serif"
    fontSize: 5.4rem
    fontWeight: 400
    lineHeight: 6rem
  cdr-heading-display-16-3-1:
    fontFamily: "Stuart, \"Stuart fallback\", Georgia, serif"
    fontSize: 8.6rem
    fontWeight: 400
    lineHeight: 9.2rem
  cdr-heading-sans-16-3-1:
    fontFamily: "Graphik, \"Graphik fallback\", \"Helvetica Neue\", sans-serif"
    fontSize: 2.4rem
    fontWeight: 500
    lineHeight: 3rem
  cdr-heading-serif-16-3-1:
    fontFamily: "Stuart, \"Stuart fallback\", Georgia, serif"
    fontSize: 5.4rem
    fontWeight: 500
    lineHeight: 6.4rem
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
    backgroundColor: "#454441"
    textColor: "#F9F8F6"
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
    backgroundColor: "#f4f2ed"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f4f2ed"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#454441"
    textColor: "#F9F8F6"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f4f2ed"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#f4f2ed"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#454441"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#454441"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f4f2ed"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f4f2ed"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#F9F8F6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#F9F8F6"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#f4f2ed"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Cedar

## Overview

**Cedar** is a light-first design system anchored on `#F9F8F6` canvas surfaces with `#0b0b0c` primary ink (18.5:1 contrast) and `#454441` brand accent.

Display headlines pair `Stuart` with `System Sans` body copy (138px display down to 10px body), unified by `8px` base corner radius and stepped `#F9F8F6` -> `#f4f2ed` surface layering.

Maintained by **REI**. Source: published token package (https://rei.github.io/rei-cedar/), repo https://github.com/rei/rei-cedar, package `@rei/cedar`, frameworks: vue, css. Inventory: **18** colors, **11** typography steps, and **16** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#F9F8F6` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f4f2ed` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (18.5:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#454441` (9.2:1 vs canvas; pair with `#f7f7f8` foreground ink for 9.1:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `cdr-button-with-background-background-color-active` (`#eae0cc`), `cdr-button-with-background-background-color-interact` (`#eae0cc`), `cdr-button-with-background-background-color` (`#eae0cc`), `cdr-button-with-background-box-shadow-active` (`#eae0cc`), `cdr-color-border-button-secondary-active-inset` (`#eae0cc`).
- **Neutral Ramp**: `cdr-color-background-primary` (`#f4f2ed`), `cdr-color-background-secondary` (`#dcd6cb`), `cdr-color-border-primary` (`#958e83`), `cdr-color-border-secondary` (`#726d64`), `cdr-button-with-background-background-color-disabled` (`#eeeae2`), `cdr-button-with-background-box-shadow-disabled` (`#eeeae2`).

## Typography

- **Primary / Display Voice**: `Stuart, "Stuart fallback", Georgia, serif` (top step `cdr-heading-display-16-3-1`: 8.6rem, weight 400, line-height 9.2rem).
- **Body & UI Controls**: `sans-serif` (`html`: 10px, weight 400, line-height 1.15).
- **Scale Steps (11)**: `cdr-heading-display-16-3-1` (8.6rem, w400), `cdr-title-16-3-1` (5.4rem, w400), `cdr-heading-serif-16-3-1` (5.4rem, w500), `cdr-subheading-sans-16-3-1` (2.4rem, w500), `cdr-modal-title-16-3-1` (2.4rem, w500), `cdr-heading-sans-16-3-1` (2.4rem, w500), `cdr-body-16-3-1` (1.8rem, w400), `cdr-popover-title-16-3-1` (1.8rem, w500).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f4f2ed` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#F9F8F6` -> `#f4f2ed`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#454441` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#454441`, ink `#F9F8F6`, (9.2:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ef4444`, ink `#000000`, (5.6:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f4f2ed`, ink `#0b0b0c`, (17.6:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f4f2ed`, ink `#0b0b0c`, (17.6:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#454441`, ink `#F9F8F6`, (9.2:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#10b981`, ink `#000000`, (8.3:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f4f2ed`, ink `#0b0b0c`, (17.6:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#f4f2ed`, ink `#0b0b0c`, (17.6:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#454441`, ink `#f7f7f8`, (9.1:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#454441`, ink `#f7f7f8`, (9.1:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f4f2ed`, ink `#0b0b0c`, (17.6:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f4f2ed`, ink `#0b0b0c`, (17.6:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#F9F8F6`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#F9F8F6`, (18.5:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f4f2ed`, ink `#0b0b0c`, (17.6:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#F9F8F6` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#454441` with `#f7f7f8` text (9.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Stuart` headings with `System Sans` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f4f2ed` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
