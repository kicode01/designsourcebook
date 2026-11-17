---
version: alpha
name: React95
description: "React95 — a component library inspired by the Windows 95 interface."
colors:
  value-derived: "#008080"
  anchor: "rgb(0,0,128)"
  anchor-visited: "rgb(0,0,128)"
  border-dark: "rgb(211,214,217)"
  border-darkest: "rgb(65,187,241)"
  border-light: "rgb(238,244,252)"
  border-lightest: "rgb(250,254,255)"
  canvas: "rgb(255,255,255)"
  canvas-text: "rgb(0,62,1090)"
  canvas-text-disabled: "rgb(211,214,217)"
  canvas-text-disabled-shadow: "rgb(250,254,255)"
  canvas-text-invert: "rgb(0,62,109)"
  checkmark: "rgb(0,62,1090)"
  checkmark-disabled: "rgb(88,152,231)"
  desktop-background: "rgb(68,125,183)"
  flat-dark: "rgb(211,214,217)"
  flat-light: "rgb(238,244,252)"
  focus-secondary: "rgb(250,254,255)"
  header-not-active-text: "rgb(0,62,109)"
  header-text: "rgb(255,255,255)"
  hover-background: "rgb(251,211,61)"
  material: "rgb(227,238,251)"
  material-dark: "rgb(0,159,223)"
  material-text: "rgb(0,62,109)"
  material-text-disabled: "rgb(211,214,217)"
  material-text-disabled-shadow: "rgb(250,254,255)"
  material-text-invert: "rgb(0,62,109)"
  progress: "rgb(251,211,61)"
  tooltip: "rgb(255,243,185)"
  header-background: "#171123"
  header-not-active-background: "#4E6766"
  background: "#4C6663"
  primary: "rgb(65,187,241)"
typography:
  window-title:
    fontFamily: "\"ms_sans_serif\", Tahoma, \"Segoe UI\", sans-serif"
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.2
  dialog-heading:
    fontFamily: "\"ms_sans_serif\", Tahoma, \"Segoe UI\", sans-serif"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "\"ms_sans_serif\", Tahoma, \"Segoe UI\", sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.35
  button-label:
    fontFamily: "\"ms_sans_serif\", Tahoma, \"Segoe UI\", sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.2
  status-bar:
    fontFamily: "\"ms_sans_serif\", Tahoma, \"Segoe UI\", sans-serif"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.2
  dos-mono:
    fontFamily: "\"Fixedsys\", \"Courier New\", Courier, monospace"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.3
rounded:
  button: 0px
  input: 0px
  card: 0px
  badge: 999px
  nav: 0px
  default: 0px
icons:
  library: Inline System SVGs
  package: null
  style: outline
  grid: 20
  strokeWidth: 1.5
  strokeLinecap: square
  strokeLinejoin: miter
  source: derived
components:
  button-primary:
    backgroundColor: "rgb(65,187,241)"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 0px
    padding: 10px 18px
  input-default:
    backgroundColor: "rgb(238,244,252)"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 9px 13px
  card-surface:
    backgroundColor: "rgb(238,244,252)"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "rgb(65,187,241)"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "rgb(238,244,252)"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 10px 16px
  select-default:
    backgroundColor: "rgb(238,244,252)"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 8px 12px
  switch-control:
    backgroundColor: "rgb(65,187,241)"
    textColor: "#0b0b0c"
    rounded: 2px
    padding: 2px
  checkbox-control:
    backgroundColor: "rgb(65,187,241)"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 2px
  tabs-nav:
    backgroundColor: "rgb(238,244,252)"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 6px 12px
  alert-info:
    backgroundColor: "rgb(238,244,252)"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 12px 14px
  table-grid:
    backgroundColor: "rgb(255,255,255)"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "rgb(255,255,255)"
    rounded: 0px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "rgb(238,244,252)"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 8px
---

# React95

## Overview

**React95** is a light-first design system anchored on `rgb(255,255,255)` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `rgb(65,187,241)` brand accent.

Typography centers cleanly on `MS Sans Serif` (18px display down to 12px body), unified by `0px` razor-sharp architectural corners and stepped `rgb(255,255,255)` -> `rgb(238,244,252)` surface layering.

Source: published token package (https://react95.io), repo https://github.com/react95-io/React95, package `react95`, frameworks: react. Inventory: **33** colors, **6** typography steps, and **16** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `rgb(255,255,255)` — base application backdrop (light theme).
- **Surface (`surface`)**: `rgb(238,244,252)` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `rgb(65,187,241)` (2.2:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.0:1 contrast).
- **Structural Border (`border`)**: `rgb(238,244,252)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `value-derived` (`#008080`), `anchor` (`rgb(0,0,128)`), `anchor-visited` (`rgb(0,0,128)`), `border-darkest` (`rgb(65,187,241)`), `canvas-text` (`rgb(0,62,1090)`), `canvas-text-invert` (`rgb(0,62,109)`).
- **Neutral Ramp**: `border-dark` (`rgb(211,214,217)`), `border-light` (`rgb(238,244,252)`), `border-lightest` (`rgb(250,254,255)`), `canvas` (`rgb(255,255,255)`), `canvas-text-disabled` (`rgb(211,214,217)`), `canvas-text-disabled-shadow` (`rgb(250,254,255)`).

## Typography

- **Primary / Display Voice**: `"ms_sans_serif", Tahoma, "Segoe UI", sans-serif` (top step `window-title`: 18px, weight 700, line-height 1.2).
- **Body & UI Controls**: `"ms_sans_serif", Tahoma, "Segoe UI", sans-serif` (`body`: 12px, weight 400, line-height 1.35).
- **Monospace / Technical Labels**: `"Fixedsys", "Courier New", Courier, monospace` (`dos-mono`: 12px).
- **Scale Steps (6)**: `window-title` (18px, w700), `dialog-heading` (14px, w700), `body` (12px, w400), `button-label` (12px, w400), `dos-mono` (12px, w400), `status-bar` (11px, w400).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `rgb(238,244,252)` cards; separate sibling sections using `rgb(238,244,252)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`rgb(255,255,255)` -> `rgb(238,244,252)`) and `1px solid rgb(238,244,252)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `rgb(65,187,241)` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `0px` (Buttons `0px` · Inputs `0px` · Cards `0px` · Badges `999px` · Navigation `0px`).
- **Strict Sharp Edges**: Maintain `0px` architectural corners across buttons, inputs, and cards.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.5px`, `square` caps).

## Components

- **`button-primary` (button)**: bg `rgb(65,187,241)`, ink `#0b0b0c`, (9.0:1), radius `0px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `0px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `0px`, padding `10px 18px`.
- **`input-default` (input)**: bg `rgb(238,244,252)`, ink `#0b0b0c`, (17.8:1), radius `0px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `rgb(238,244,252)`, ink `#0b0b0c`, (17.8:1), radius `0px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `rgb(65,187,241)`, ink `#0b0b0c`, (9.0:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `rgb(238,244,252)`, ink `#0b0b0c`, (17.8:1), radius `0px`, padding `10px 16px`.
- **`select-default` (select)**: bg `rgb(238,244,252)`, ink `#0b0b0c`, (17.8:1), radius `0px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `rgb(65,187,241)`, ink `#0b0b0c`, (9.0:1), radius `2px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `rgb(65,187,241)`, ink `#0b0b0c`, (9.0:1), radius `0px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `rgb(238,244,252)`, ink `#0b0b0c`, (17.8:1), radius `0px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `rgb(238,244,252)`, ink `#0b0b0c`, (17.8:1), radius `0px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `rgb(255,255,255)`, ink `#0b0b0c`, (19.7:1), radius `0px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `rgb(255,255,255)`, (19.7:1), radius `0px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `rgb(238,244,252)`, ink `#0b0b0c`, (17.8:1), radius `0px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `rgb(255,255,255)` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `rgb(65,187,241)` with `#0b0b0c` text (9.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `MS Sans Serif` headings with `MS Sans Serif` body copy using documented weights and scale steps.
- Enforce `0px` border-radius consistently across cards, inputs, and primary buttons.
- Separate containers via `rgb(238,244,252)` surface shifts and `rgb(238,244,252)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not apply rounded corners (> 0px) to structural containers or CTA buttons.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
