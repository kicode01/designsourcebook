---
version: alpha
name: Foundation
description: "Foundation — responsive front-end framework by ZURB."
colors:
  primary-color: "#1779ba"
  secondary-color: "#767676"
  success-color: "#3adb76"
  warning-color: "#ffae00"
  alert-color: "#cc4b37"
  light-gray: "#e6e6e6"
  medium-gray: "#cacaca"
  dark-gray: "#8a8a8a"
  black: "#0a0a0a"
  white: "#fefefe"
  primary: "#1779ba"
  secondary: "#767676"
  success: "#3adb76"
  warning: "#ffae00"
  alert: "#cc4b37"
typography:
  global-font-size:
    fontSize: "100%"
  body-font-family:
    fontFamily: "\"Helvetica Neue\", Helvetica, Roboto, Arial, sans-serif"
  h1:
    fontSize: 2em
  html:
    fontSize: "100%"
  body:
    fontFamily: "\"Helvetica Neue\", Helvetica, Roboto, Arial, sans-serif"
    lineHeight: 1.5
  lead:
    fontSize: "125%"
    lineHeight: 1.6
  accordion-title:
    fontSize: 0.75rem
    lineHeight: 1
  badge-font-size:
    fontSize: 0.6rem
  dropdown-font-size:
    fontSize: 1rem
  label-font-size:
    fontSize: 0.8rem
  font-family-monospace:
    fontFamily: "Consolas, \"Liberation Mono\", Courier, monospace"
  small-font-size:
    fontSize: "80%"
  stat-font-size:
    fontSize: 2.5rem
  font-size-temp:
    fontSize: 1rem
rounded:
  card: "0"
  badge: "50%"
  button: "0"
  nav: 4px
  default: "0"
icons:
  library: Foundation Icons
  package: foundation-icons
  pack: foundation
  style: solid
  grid: 24
  strokeWidth: 0
  strokeLinecap: round
  strokeLinejoin: round
  source: npm
components:
  card:
    backgroundColor: "#fefefe"
    textColor: "#0a0a0a"
    rounded: "0"
  label:
    backgroundColor: "#1779ba"
    textColor: "#fefefe"
    typography:
      fontSize: 0.8rem
    rounded: "0"
    padding: 0.33333rem 0.5rem
  badge:
    backgroundColor: "#1779ba"
    textColor: "#fefefe"
    typography:
      fontSize: 0.6rem
    rounded: "50%"
    padding: 0.3em
  button:
    backgroundColor: "#1779ba"
    textColor: "#fefefe"
    typography:
      fontSize: 0.9rem
    rounded: "0"
    padding: 0.85em 1em
  callout:
    backgroundColor: "rgb(254.85, 254.85, 254.85)"
    textColor: "#0a0a0a"
    rounded: "0"
    padding: 1rem
  button-2:
    textColor: "#8a8a8a"
    typography:
      fontSize: 2em
  card-divider-2:
    backgroundColor: "#e6e6e6"
    padding: 1rem
  is-invalid-label-2:
    textColor: "#cc4b37"
  input-group-label:
    backgroundColor: "#e6e6e6"
    textColor: "#0a0a0a"
    padding: 0 1rem
  nav-bar:
    backgroundColor: "#fefefe"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 16px
  select-default:
    backgroundColor: "#fefefe"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#1779ba"
    textColor: "#ffffff"
    rounded: 2px
    padding: 2px
  checkbox-control:
    backgroundColor: "#1779ba"
    textColor: "#ffffff"
    rounded: 0px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fefefe"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 6px 12px
  table-grid:
    backgroundColor: "#fefefe"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#fefefe"
    rounded: 0px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#fefefe"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 8px
---

# Foundation

## Overview

**Foundation** is a light-first design system anchored on `#fefefe` canvas surfaces with `#0b0b0c` primary ink (19.5:1 contrast) and `#1779ba` brand accent.

Typography centers cleanly on `Helvetica Neue` (40px display down to 16px body), unified by `0px` razor-sharp architectural corners and hairline `1px` structural borders.

Source: published token package (https://get.foundation/sites), repo https://github.com/foundation/foundation-sites, package `foundation-sites`, frameworks: css. Inventory: **15** colors, **14** typography steps, and **17** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#fefefe` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fefefe` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.5:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#1779ba` (4.6:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.4:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `primary-color` (`#1779ba`), `primary` (`#1779ba`).
- **Neutral Ramp**: `secondary-color` (`#767676`), `light-gray` (`#e6e6e6`), `medium-gray` (`#cacaca`), `dark-gray` (`#8a8a8a`), `black` (`#0a0a0a`), `white` (`#fefefe`).
- **Semantic States**: success: `success-color` (`#3adb76`) · danger: `alert-color` (`#cc4b37`) · warning: `warning-color` (`#ffae00`).

## Typography

- **Primary / Display Voice**: `"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif` (top step `stat-font-size`: 2.5rem, weight 600).
- **Body & UI Controls**: `"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif` (`body-font-family`: 16px, weight 400).
- **Monospace / Technical Labels**: `Consolas, "Liberation Mono", Courier, monospace` (`font-family-monospace`: 16px).
- **Scale Steps (14)**: `stat-font-size` (2.5rem), `h1` (2em), `lead` (125%), `global-font-size` (100%), `body-font-family` (16px), `html` (100%), `body` (16px), `dropdown-font-size` (1rem).

## Layout

- **Grid & Control Spacing**: Derived from 17 component tokens with documented paddings: `0.33333rem 0.5rem`, `0.3em`, `0.85em 1em`, `1rem`, `0 1rem`.
- **Hierarchy**: Group controls cleanly within `#fefefe` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fefefe` -> `#fefefe`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#1779ba` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `0px` (Buttons `0` · Cards `0` · Badges `0` · Navigation `4px`).
- **Strict Sharp Edges**: Maintain `0px` architectural corners across buttons, inputs, and cards.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.5px`, `square` caps).

## Components

- **`card` (card)**: bg `#fefefe`, ink `#0a0a0a`, (19.6:1), radius `0`, border `1px solid #e6e6e6`.
- **`label` (badge)**: bg `#1779ba`, ink `#fefefe`, (4.6:1), radius `0`, padding `0.33333rem 0.5rem`.
- **`badge` (badge)**: bg `#1779ba`, ink `#fefefe`, (4.6:1), radius `50%`, padding `0.3em`.
- **`button` (button)**: bg `#1779ba`, ink `#fefefe`, (4.6:1), radius `0`, padding `0.85em 1em`, border `1px solid transparent`.
- **`callout` (alert)**: bg `rgb(254.85, 254.85, 254.85)`, ink `#0a0a0a`, (19.8:1), radius `0`, padding `1rem`, border `1px solid rgba(10, 10, 10, 0.25)`.
- **`button-2` (button)**: ink `#8a8a8a`.
- **`card-divider-2` (card)**: bg `#e6e6e6`, padding `1rem`.
- **`is-invalid-label-2` (badge)**: ink `#cc4b37`.
- **`input-group-label` (input)**: bg `#e6e6e6`, ink `#0a0a0a`, (15.9:1), padding `0 1rem`, border `1px solid #cacaca`.
- **`nav-bar` (nav)**: bg `#fefefe`, ink `#0b0b0c`, (19.5:1), radius `4px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#fefefe`, ink `#0b0b0c`, (19.5:1), radius `0px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#1779ba`, ink `#f7f7f8`, (4.4:1), radius `2px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#1779ba`, ink `#f7f7f8`, (4.4:1), radius `0px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fefefe`, ink `#0b0b0c`, (19.5:1), radius `0px`, padding `6px 12px`.
- **`table-grid` (table)**: bg `#fefefe`, ink `#0b0b0c`, (19.5:1), radius `0px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fefefe`, (19.5:1), radius `0px`, padding `6px 10px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fefefe` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#1779ba` with `#f7f7f8` text (4.4:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Helvetica Neue` headings with `Helvetica Neue` body copy using documented weights and scale steps.
- Enforce `0px` border-radius consistently across cards, inputs, and primary buttons.
- Separate containers via `#fefefe` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not apply rounded corners (> 0px) to structural containers or CTA buttons.
- Do not truncate or drop border contrast on `input-group-label` fields and secondary buttons.
