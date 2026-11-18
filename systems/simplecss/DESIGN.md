---
version: alpha
name: Simple.css
description: "Simple.css — tokens imported from simpledotcss."
colors:
  bg: "#fff"
  accent-bg: "#f5f7ff"
  text: "#212121"
  text-light: "#585858"
  border: "#d8dae1"
  accent: "#0d47a1"
  accent-light: "#90caf9"
  code: "#d81b60"
  preformatted: "#444"
  marked: "#ffdd33"
  disabled: "#efefef"
  accent-hover: "#1266e2"
  primary: "#0d47a1"
typography:
  base-fontsize:
    fontSize: 1.15rem
  body:
    fontSize: 1.15rem
    lineHeight: 1.5
  h1:
    fontSize: 3rem
  h2:
    fontSize: 2.6rem
  h3:
    fontSize: 2rem
  h4:
    fontSize: 1.44rem
  h5:
    fontSize: 1.15rem
  h6:
    fontSize: 0.96rem
rounded:
  button: 5px
  nav: 5px
  default: 5px
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
  button:
    backgroundColor: "#0d47a1"
    textColor: "#fff"
    rounded: 5px
    padding: 0.5rem 0.9rem
  notice:
    backgroundColor: "#f5f7ff"
    rounded: 5px
    padding: 1.5rem
  select-default:
    backgroundColor: "#fff"
    textColor: "#585858"
    rounded: 5px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#0d47a1"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#0d47a1"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fff"
    textColor: "#585858"
    rounded: 5px
    padding: 6px 12px
  table-grid:
    backgroundColor: "#fff"
    textColor: "#585858"
    rounded: 5px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#585858"
    textColor: "#fff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#fff"
    textColor: "#585858"
    rounded: 8px
    padding: 8px
---

# Simple.css

## Overview

**Simple.css** is a light-first design system anchored on `#fff` canvas surfaces with `#585858` primary ink (7.1:1 contrast) and `#0d47a1` brand accent.

Typography centers cleanly on `System UI` (48px display down to 18px body), unified by `5px` base corner radius and hairline `1px` structural borders.

Source: published token package (https://github.com/kevquirk/simple.css#readme), package `simpledotcss`. Inventory: **13** colors, **8** typography steps, and **9** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#585858` — body copy and primary headings (7.1:1 on canvas).
- **Muted Ink (`muted`)**: `#585858` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#0d47a1` (8.6:1 vs canvas; pair with `#f7f7f8` foreground ink for 8.1:1 contrast).
- **Structural Border (`border`)**: `#d8dae1` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `accent` (`#0d47a1`), `accent-light` (`#90caf9`), `code` (`#d81b60`), `marked` (`#ffdd33`), `accent-hover` (`#1266e2`), `primary` (`#0d47a1`).
- **Neutral Ramp**: `bg` (`#fff`), `accent-bg` (`#f5f7ff`), `text` (`#212121`), `text-light` (`#585858`), `border` (`#d8dae1`), `preformatted` (`#444`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `h1`: 3rem, weight 600).
- **Body & UI Controls**: `system-ui` (`base-fontsize`: 1.15rem, weight 400).
- **Scale Steps (8)**: `h1` (3rem), `h2` (2.6rem), `h3` (2rem), `h4` (1.44rem), `base-fontsize` (1.15rem), `body` (1.15rem), `h5` (1.15rem), `h6` (0.96rem).

## Layout

- **Grid & Control Spacing**: Derived from 9 component tokens with documented paddings: `0.5rem 0.9rem`, `1.5rem`, `8px 12px`, `2px`, `6px 12px`.
- **Hierarchy**: Group controls cleanly within `#fff` cards; separate sibling sections using `#d8dae1` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#fff`) and `1px solid #d8dae1` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#0d47a1` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `5px` (Buttons `5px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `5px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button` (button)**: bg `#0d47a1`, ink `#fff`, (8.6:1), radius `5px`, padding `0.5rem 0.9rem`, border `1px solid #0d47a1`.
- **`notice` (alert)**: bg `#f5f7ff`, radius `5px`, padding `1.5rem`, border `1px solid #898EA4`.
- **`select-default` (select)**: bg `#fff`, ink `#585858`, (7.1:1), radius `5px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#0d47a1`, ink `#f7f7f8`, (8.1:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#0d47a1`, ink `#f7f7f8`, (8.1:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fff`, ink `#585858`, (7.1:1), radius `5px`, padding `6px 12px`.
- **`table-grid` (table)**: bg `#fff`, ink `#585858`, (7.1:1), radius `5px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#585858`, ink `#fff`, (7.1:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fff`, ink `#585858`, (7.1:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#585858` primary text and `#585858` secondary labels.
- Use `#0d47a1` with `#f7f7f8` text (8.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `5px` base geometry across inputs and buttons (5px on outer containers).
- Separate containers via `#fff` surface shifts and `#d8dae1` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `5px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
