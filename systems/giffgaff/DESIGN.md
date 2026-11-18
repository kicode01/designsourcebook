---
version: alpha
name: giffgaff Design System
description: "giffgaff Design System — read from www.giffgaff.design's live stylesheets, not a published token package."
colors:
  white: "#fff"
  black: "#000"
  pink: "#eb5f8e"
  light-green: "#72b72a"
  light-blue: "#35adce"
  yellow: "#fcc31e"
  red: "#d60000"
  dark-blue: "#00528a"
  olive: "#b9cc3f"
  turquoise: "#00ceb3"
  light-orange: "#f39722"
  lavender: "#c380bb"
  bright-orange: "#f76908"
  dove-grey: "#666"
  graphite: "#2f2e31"
  alto: "#d0d0d0"
  gallery: "#ececec"
  wild-sand: "#f5f5f5"
  pastel-green: "#e3f1d4"
  pastel-red: "#fbe6e6"
  pastel-yellow: "#fef3d2"
  pastel-blue: "#d7eff5"
  strikethrough-color: "#666"
  primary: "#00ceb3"
typography:
  body:
    fontFamily: "Poppins, giffgaff, \"Century Gothic\", CenturyGothic, AppleGothic, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  gg-c-cards-title:
    fontSize: 16px
    fontWeight: 700
    lineHeight: 24px
  gg-c-form-error-title:
    fontSize: 16px
    fontWeight: 700
    lineHeight: 24px
  gg-c-alert-title:
    fontSize: 16px
    fontWeight: 700
    lineHeight: 24px
  gg-c-modal-main-title:
    fontSize: 24px
    fontWeight: 700
    lineHeight: 32px
  gg-c-minor-alert-title:
    fontSize: 16px
    fontWeight: 700
    lineHeight: 24px
  single-figure-caption:
    fontSize: 12px
    fontWeight: 400
    lineHeight: 18px
rounded:
  button: 24px
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
  gg-u-link:
    textColor: "#00528a"
    typography:
      fontWeight: 700
  gg-c-select:
    backgroundColor: "#fff"
    typography:
      fontSize: 16px
      fontWeight: 400
    rounded: "0"
    height: 40px
  gg-c-accordion:
    backgroundColor: "#fff"
    textColor: "#000"
  gg-c-radio:
    backgroundColor: "#fff"
    typography:
      fontWeight: 700
    padding: 8px  8px 44px
  gg-c-btn:
    backgroundColor: "#fff"
    textColor: "#000"
    rounded: 24px
    padding: 0 24px
    height: 44px
  gg-c-link-button-2:
    backgroundColor: "#fff"
    textColor: "#000"
    typography:
      fontSize: 16px
      fontWeight: 700
    padding: "0"
  gg-c-minor-alert:
    backgroundColor: "#fbe6e6"
    padding: 16px
  gg-c-radio-2:
    textColor: "#d60000"
  gg-c-tab-bar:
    backgroundColor: "#fff"
  gg-c-select-list-2:
    backgroundColor: "#fff"
    typography:
      fontSize: 16px
      fontWeight: 400
    padding: 0 16px
  gg-c-input-with-button:
    backgroundColor: "#000"
    textColor: "#fff"
  gg-o-focus-panel:
    backgroundColor: "#fff"
    textColor: "#000"
    padding: 24px
  gg-c-input-with-prefix-2:
    backgroundColor: "#fff"
    textColor: "#000"
    typography:
      fontSize: 16px
      fontWeight: 700
    padding: 0 0 0 8px
    height: 40px
  gg-c-input-with-suffix-3:
    backgroundColor: "#fff"
    typography:
      fontSize: 16px
      fontWeight: 700
    padding: 0 8px 0 0
    height: 40px
  gg-c-alert-info:
    backgroundColor: "#00528a"
    textColor: "#fff"
  gg-c-btn-loading:
    textColor: transparent
  gg-c-alert-error:
    backgroundColor: "#d60000"
    textColor: "#fff"
  gg-c-btn-loading-text:
    textColor: "#000"
    padding: "0"
  gg-o-focus-panel-black:
    backgroundColor: "#000"
  gg-o-focus-panel-light-blue:
    backgroundColor: "#35adce"
  gg-c-pagination-current-page:
    backgroundColor: "#000"
    textColor: "#fff"
  switch-control:
    backgroundColor: "#00ceb3"
    textColor: "#0b0b0c"
    rounded: 2px
    padding: 2px
  checkbox-control:
    backgroundColor: "#00ceb3"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 2px
  table-grid:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#fff"
    rounded: 0px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#f5f5f5"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 8px
---

# giffgaff Design System

## Overview

**giffgaff Design System** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#00ceb3` brand accent.

Typography centers cleanly on `Poppins` (24px display down to 16px body), unified by `0px` razor-sharp architectural corners and stepped `#fff` -> `#f5f5f5` surface layering.

Maintained by **giffgaff**. Source: live stylesheet extraction (https://www.giffgaff.design/). Inventory: **24** colors, **7** typography steps, and **26** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f5f5f5` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#00ceb3` (2.0:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.8:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `pink` (`#eb5f8e`), `light-blue` (`#35adce`), `dark-blue` (`#00528a`), `olive` (`#b9cc3f`), `turquoise` (`#00ceb3`), `lavender` (`#c380bb`).
- **Neutral Ramp**: `white` (`#fff`), `black` (`#000`), `dove-grey` (`#666`), `graphite` (`#2f2e31`), `alto` (`#d0d0d0`), `gallery` (`#ececec`).
- **Semantic States**: success: `light-green` (`#72b72a`) · danger: `red` (`#d60000`) · warning: `yellow` (`#fcc31e`).

## Typography

- **Primary / Display Voice**: `Poppins, giffgaff, "Century Gothic", CenturyGothic, AppleGothic, sans-serif` (top step `gg-c-modal-main-title`: 24px, weight 700, line-height 32px).
- **Body & UI Controls**: `Poppins, giffgaff, "Century Gothic", CenturyGothic, AppleGothic, sans-serif` (`body`: 16px, weight 400, line-height 24px).
- **Scale Steps (7)**: `gg-c-modal-main-title` (24px, w700), `body` (16px, w400), `gg-c-cards-title` (16px, w700), `gg-c-form-error-title` (16px, w700), `gg-c-alert-title` (16px, w700), `gg-c-minor-alert-title` (16px, w700), `single-figure-caption` (12px, w400).

## Layout

- **Grid & Control Spacing**: Derived from 26 component tokens with documented paddings: `8px  8px 44px`, `0 24px`, `0`, `16px`, `0 16px`.
- **Hierarchy**: Group controls cleanly within `#f5f5f5` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#f5f5f5`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#00ceb3` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `0px` (Buttons `24px`).
- **Strict Sharp Edges**: Maintain `0px` architectural corners across buttons, inputs, and cards.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.5px`, `square` caps).

## Components

- **`gg-u-link` (link)**: ink `#00528a`.
- **`gg-c-select` (select)**: bg `#fff`, radius `0`, border `2px solid #000`.
- **`gg-c-accordion` (accordion)**: bg `#fff`, ink `#000`, (21.0:1), border `2px solid #000`.
- **`gg-c-radio` (radio)**: bg `#fff`, padding `8px  8px 44px`, border `2px solid #d0d0d0`.
- **`gg-c-btn` (button)**: bg `#fff`, ink `#000`, (21.0:1), radius `24px`, padding `0 24px`, border `2px solid #000`.
- **`gg-c-link-button-2` (button)**: bg `#fff`, ink `#000`, (21.0:1), padding `0`, border `2px solid #000`.
- **`gg-c-minor-alert` (alert)**: bg `#fbe6e6`, padding `16px`.
- **`gg-c-radio-2` (radio)**: ink `#d60000`.
- **`gg-c-tab-bar` (tabs)**: bg `#fff`, border `1px solid #000`.
- **`gg-c-select-list-2` (select)**: bg `#fff`, padding `0 16px`, border `2px solid #000`.
- **`gg-c-input-with-button` (button)**: bg `#000`, ink `#fff`, (21.0:1), border `2px solid #000`.
- **`gg-o-focus-panel` (panel)**: bg `#fff`, ink `#000`, (21.0:1), padding `24px`.
- **`gg-c-input-with-prefix-2` (input)**: bg `#fff`, ink `#000`, (21.0:1), padding `0 0 0 8px`, border `2px solid #000`.
- **`gg-c-input-with-suffix-3` (input)**: bg `#fff`, padding `0 8px 0 0`, border `2px solid #000`.
- **`gg-c-alert-info` (alert)**: bg `#00528a`, ink `#fff`, (8.2:1).
- **`gg-c-btn-loading` (button)**: ink `transparent`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#00ceb3` with `#0b0b0c` text (9.8:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Poppins` headings with `Poppins` body copy using documented weights and scale steps.
- Enforce `0px` border-radius consistently across cards, inputs, and primary buttons.
- Separate containers via `#f5f5f5` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not apply rounded corners (> 0px) to structural containers or CTA buttons.
- Do not truncate or drop border contrast on `gg-c-input-with-prefix-2` fields and secondary buttons.
