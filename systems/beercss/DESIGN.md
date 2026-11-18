---
version: alpha
name: Beer CSS
description: "Beer CSS — tokens imported from beercss."
colors:
  primary: "#cfbcff"
  on-primary: "#381e72"
  primary-container: "#4f378a"
  on-primary-container: "#e9ddff"
  secondary: "#cbc2db"
  on-secondary: "#332d41"
  secondary-container: "#4a4458"
  on-secondary-container: "#e8def8"
  tertiary: "#efb8c8"
  on-tertiary: "#4a2532"
  tertiary-container: "#633b48"
  on-tertiary-container: "#ffd9e3"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffb4ab"
  background: "#1c1b1e"
  on-background: "#e6e1e6"
  surface: "#141316"
  on-surface: "#e6e1e6"
  surface-variant: "#49454e"
  on-surface-variant: "#cac4cf"
  outline: "#948f99"
  outline-variant: "#49454e"
  shadow: "#000000"
  scrim: "#000000"
  inverse-surface: "#e6e1e6"
  inverse-on-surface: "#313033"
  inverse-primary: "#6750a4"
  surface-dim: "#141316"
  surface-bright: "#3a383c"
  surface-container-lowest: "#0f0e11"
  surface-container-low: "#1c1b1e"
  surface-container: "#201f22"
  surface-container-high: "#2b292d"
  surface-container-highest: "#363438"
typography:
  body:
    fontSize: 0.875rem
    lineHeight: 1.5rem
rounded:
  badge: 0.5rem
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
  chip:
    backgroundColor: transparent
    textColor: "#49454e"
    typography:
      fontSize: 0.875rem
      fontWeight: 500
    rounded: 0.5rem
  link:
    textColor: "#6750a4"
  badge-2:
    backgroundColor: "#ba1a1a"
    textColor: "#ffffff"
    typography:
      fontSize: 0.6875rem
    rounded: 1rem
    padding: 0 0.25rem
  radio:
    textColor: "#1c1b1e"
    typography:
      fontSize: 0.875rem
      fontWeight: normal
    rounded: "0"
  button:
    backgroundColor: "#6750a4"
    textColor: "#ffffff"
    typography:
      fontSize: 0.875rem
      fontWeight: 500
    padding: "0"
  tooltip:
    backgroundColor: "#313033"
    textColor: "#f4eff4"
    typography:
      fontSize: 0.75rem
      fontWeight: 500
    rounded: 0.25rem
    padding: 0.5rem
  link-2:
    textColor: "#cfbcff"
  select-default:
    backgroundColor: "#141316"
    textColor: "#f7f7f8"
    rounded: 0px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#cfbcff"
    textColor: "#0b0b0c"
    rounded: 2px
    padding: 2px
  checkbox-control:
    backgroundColor: "#cfbcff"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 2px
  tabs-nav:
    backgroundColor: "#141316"
    textColor: "#f7f7f8"
    rounded: 0px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#141316"
    textColor: "#f7f7f8"
    rounded: 0px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#49454e"
    textColor: "#f7f7f8"
    rounded: 0px
    padding: 10px 14px
  icon-glyph:
    backgroundColor: "#141316"
    textColor: "#f7f7f8"
    rounded: 0px
    padding: 8px
---

# Beer CSS

## Overview

**Beer CSS** is a dark-first design system anchored on `#49454e` canvas surfaces with `#f7f7f8` primary ink (8.7:1 contrast) and `#cfbcff` brand accent.

Typography centers cleanly on `System UI` (14px display down to 14px body), unified by `0px` razor-sharp architectural corners and stepped `#49454e` -> `#141316` surface layering.

Source: published token package (https://www.beercss.com/), package `beercss`. Inventory: **36** colors, **1** typography steps, and **14** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#49454e` — base application backdrop (dark theme).
- **Surface (`surface`)**: `#141316` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#f7f7f8` — body copy and primary headings (8.7:1 on canvas).
- **Muted Ink (`muted`)**: `#f7f7f8` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#cfbcff` (5.5:1 vs canvas; pair with `#0b0b0c` foreground ink for 11.5:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #f7f7f8 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `primary` (`#cfbcff`), `on-primary` (`#381e72`), `primary-container` (`#4f378a`), `on-primary-container` (`#e9ddff`), `secondary` (`#cbc2db`), `on-secondary-container` (`#e8def8`).
- **Neutral Ramp**: `on-secondary` (`#332d41`), `secondary-container` (`#4a4458`), `background` (`#1c1b1e`), `on-background` (`#e6e1e6`), `surface` (`#141316`), `on-surface` (`#e6e1e6`).
- **Semantic States**: danger: `error` (`#ffb4ab`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `body`: 0.875rem, weight 600, line-height 1.5rem).
- **Body & UI Controls**: `system-ui` (`body`: 0.875rem, weight 400, line-height 1.5rem).

## Layout

- **Grid & Control Spacing**: Derived from 14 component tokens with documented paddings: `0 0.25rem`, `0`, `0.5rem`, `8px 12px`, `2px`.
- **Hierarchy**: Group controls cleanly within `#141316` cards; separate sibling sections using `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#49454e` -> `#141316`) and `1px solid color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#cfbcff` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `0px` (Badges `0.5rem`).
- **Strict Sharp Edges**: Maintain `0px` architectural corners across buttons, inputs, and cards.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.5px`, `square` caps).

## Components

- **`chip` (badge)**: bg `transparent`, ink `#49454e`, radius `0.5rem`, border `0.0625rem solid #cac4cf`.
- **`link` (link)**: ink `#6750a4`.
- **`badge-2` (badge)**: bg `#ba1a1a`, ink `#ffffff`, (6.5:1), radius `1rem`, padding `0 0.25rem`.
- **`radio` (radio)**: ink `#1c1b1e`, radius `0`.
- **`button` (button)**: bg `#6750a4`, ink `#ffffff`, (6.4:1), padding `0`.
- **`tooltip` (tooltip)**: bg `#313033`, ink `#f4eff4`, (11.6:1), radius `0.25rem`, padding `0.5rem`.
- **`link-2` (link)**: ink `#cfbcff`.
- **`select-default` (select)**: bg `#141316`, ink `#f7f7f8`, (17.3:1), radius `0px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#cfbcff`, ink `#0b0b0c`, (11.5:1), radius `2px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#cfbcff`, ink `#0b0b0c`, (11.5:1), radius `0px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#141316`, ink `#f7f7f8`, (17.3:1), radius `0px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#141316`, ink `#f7f7f8`, (17.3:1), radius `0px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#49454e`, ink `#f7f7f8`, (8.7:1), radius `0px`, padding `10px 14px`.
- **`icon-glyph` (icon)**: bg `#141316`, ink `#f7f7f8`, (17.3:1), radius `0px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#49454e` (dark) with `#f7f7f8` primary text and `#f7f7f8` secondary labels.
- Use `#cfbcff` with `#0b0b0c` text (11.5:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Enforce `0px` border-radius consistently across cards, inputs, and primary buttons.
- Separate containers via `#141316` surface shifts and `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of dark polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not apply rounded corners (> 0px) to structural containers or CTA buttons.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
