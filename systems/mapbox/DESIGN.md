---
version: alpha
name: Assembly
description: "Mapbox Assembly — tokens imported from @mapbox/mbx-assembly."
colors:
  gray-dark: "#0E2127"
  gray-deep: "#2E4E5D"
  gray: "#617889"
  gray-light: "#BCCBD7"
  gray-lighter: "#E0E7EB"
  gray-faint: "#F6F8F8"
  pink-dark: "#800C67"
  pink-deep: "#BA1290"
  pink: "#F141A8"
  pink-light: "#F8C6DB"
  pink-lighter: "#FAD6E2"
  pink-faint: "#FDEEF2"
  red-dark: "#760816"
  red-deep: "#B60D18"
  red: "#EB1414"
  red-light: "#F8BFBA"
  red-lighter: "#FCD6CF"
  red-faint: "#FDEDE8"
  orange-dark: "#793606"
  orange-deep: "#A55109"
  orange: "#DD7A08"
  orange-light: "#FBC997"
  orange-lighter: "#FCE3C7"
  orange-faint: "#FEF2EB"
  yellow-dark: "#644806"
  yellow-deep: "#8A7314"
  yellow: "#F3D844"
  yellow-light: "#FAE6A3"
  yellow-lighter: "#FBF4D0"
  yellow-faint: "#FDF7E7"
  green-dark: "#275B10"
  green-deep: "#327E1B"
  green: "#37AD25"
  green-light: "#AAE7A4"
  green-lighter: "#D2F0D2"
  green-faint: "#EDF7ED"
  blue-dark: "#0A2D80"
  blue-deep: "#0F38BF"
  blue: "#4264FB"
  blue-light: "#B9C5F8"
  blue-lighter: "#D5DFF8"
  blue-faint: "#ECF1FD"
  purple-dark: "#4D189D"
  purple-deep: "#7721DA"
  purple: "#A45CE2"
  purple-light: "#E3D1EA"
  purple-lighter: "#ECE1F0"
  purple-faint: "#F6F1F4"
  black: "#0E2127"
  white: "#fff"
  primary: "#DD7A08"
typography:
  font-size-h1:
    fontSize: 36px
  font-size-h2:
    fontSize: 30px
  font-size-h3:
    fontSize: 24px
  font-size-h4:
    fontSize: 20px
  font-size-h5:
    fontSize: 16px
  font-size-xl:
    fontSize: 30px
  font-size-l:
    fontSize: 20px
  font-size-m:
    fontSize: 16px
  font-size-ms:
    fontSize: 14px
  font-size-s:
    fontSize: 12px
  font-size-xs:
    fontSize: 10px
  font-stack-base:
    fontFamily: "\"Open Sans\", sans-serif"
  font-stack-mono:
    fontFamily: "Menlo, \"Bitstream Vera Sans Mono\", Monaco, Consolas, monospace"
rounded:
  button: 18px
  nav: 4px
  default: 4px
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
  btn:
    backgroundColor: "#4264FB"
    textColor: "#fff"
    typography:
      fontSize: 12px
      fontWeight: bold
    rounded: 18px
    padding: 6px 18px
  link:
    textColor: "#4264FB"
  radio:
    textColor: "#617889"
    rounded: 4px
    height: 18px
    width: 18px
  switch:
    backgroundColor: "#BCCBD7"
    rounded: 9999px
    height: 24px
    width: 36px
  toggle-2:
    backgroundColor: transparent
    textColor: "#2E4E5D"
    typography:
      fontSize: 12px
    rounded: 4px
    padding: 0 18px
    height: 24px
  checkbox:
    textColor: "#fff"
    rounded: 4px
    height: 18px
    width: 18px
  toggle-group-3:
    backgroundColor: "#F6F8F8"
    rounded: 4px
  btn-red:
    backgroundColor: "#EB1414"
  btn-gray:
    backgroundColor: "#617889"
  btn-pink:
    backgroundColor: "#F141A8"
  link-red:
    textColor: "#EB1414"
  link-gray:
    textColor: "#617889"
  radio-red:
    textColor: "#EB1414"
  table-dark:
    backgroundColor: transparent
    textColor: "#fff"
  radio-gray:
    textColor: "#617889"
  select-red:
    textColor: "#EB1414"
  select-gray:
    textColor: "#617889"
  select-pink:
    textColor: "#F141A8"
  tabs-nav:
    backgroundColor: "#F6F8F8"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#F6F8F8"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 12px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#fff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#F6F8F8"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Assembly

## Overview

**Assembly** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#DD7A08` brand accent.

Typography centers cleanly on `Open Sans` (36px display down to 16px body), unified by `4px` base corner radius and stepped `#fff` -> `#F6F8F8` surface layering.

Maintained by **Mapbox**. Source: published token package, package `@mapbox/mbx-assembly`. Inventory: **51** colors, **13** typography steps, and **22** documented components (SEE LICENSE IN LICENSE license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#F6F8F8` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#DD7A08` (3.1:1 vs canvas; pair with `#f7f7f8` foreground ink for 2.9:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `gray-dark` (`#0E2127`), `gray-deep` (`#2E4E5D`), `gray` (`#617889`), `gray-light` (`#BCCBD7`), `pink-dark` (`#800C67`), `pink-deep` (`#BA1290`).
- **Neutral Ramp**: `gray-lighter` (`#E0E7EB`), `gray-faint` (`#F6F8F8`), `pink-faint` (`#FDEEF2`), `red-faint` (`#FDEDE8`), `orange-faint` (`#FEF2EB`), `yellow-faint` (`#FDF7E7`).
- **Semantic States**: success: `green-dark` (`#275B10`) · danger: `red-dark` (`#760816`) · warning: `orange-dark` (`#793606`).

## Typography

- **Primary / Display Voice**: `"Open Sans", sans-serif` (top step `font-size-h1`: 36px, weight 600).
- **Body & UI Controls**: `"Open Sans", sans-serif` (`font-stack-base`: 16px, weight 400).
- **Monospace / Technical Labels**: `Menlo, "Bitstream Vera Sans Mono", Monaco, Consolas, monospace` (`font-stack-mono`: 16px).
- **Scale Steps (13)**: `font-size-h1` (36px), `font-size-h2` (30px), `font-size-xl` (30px), `font-size-h3` (24px), `font-size-h4` (20px), `font-size-l` (20px), `font-size-h5` (16px), `font-size-m` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 22 component tokens with documented paddings: `6px 18px`, `0 18px`, `6px 12px`, `12px 14px`, `6px 10px`.
- **Hierarchy**: Group controls cleanly within `#F6F8F8` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#F6F8F8`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#DD7A08` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `4px` (Buttons `18px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `4px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`btn` (button)**: bg `#4264FB`, ink `#fff`, (4.7:1), radius `18px`, padding `6px 18px`.
- **`link` (link)**: ink `#4264FB`.
- **`radio` (radio)**: ink `#617889`, radius `4px`, border `1px solid transparent`.
- **`switch` (switch)**: bg `#BCCBD7`, radius `9999px`.
- **`toggle-2` (switch)**: bg `transparent`, ink `#2E4E5D`, radius `4px`, padding `0 18px`.
- **`checkbox` (checkbox)**: ink `#fff`, radius `4px`, border `1px solid transparent`.
- **`toggle-group-3` (switch)**: bg `#F6F8F8`, radius `4px`.
- **`btn-red` (button)**: bg `#EB1414`.
- **`btn-gray` (button)**: bg `#617889`.
- **`btn-pink` (button)**: bg `#F141A8`.
- **`link-red` (link)**: ink `#EB1414`.
- **`link-gray` (link)**: ink `#617889`.
- **`radio-red` (radio)**: ink `#EB1414`.
- **`table-dark` (table)**: bg `transparent`, ink `#fff`, border `1px solid #fff`.
- **`radio-gray` (radio)**: ink `#617889`.
- **`select-red` (select)**: ink `#EB1414`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#DD7A08` with `#f7f7f8` text (2.9:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Open Sans` headings with `Open Sans` body copy using documented weights and scale steps.
- Apply `4px` base geometry across inputs and buttons (4px on outer containers).
- Separate containers via `#F6F8F8` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `4px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
