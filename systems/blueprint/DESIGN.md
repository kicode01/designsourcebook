---
version: alpha
name: Blueprint
description: "Crisp light (#ffffff) canvas, monospace typography, #FF9980 brand accent, and 3px corner geometry"
colors:
  1: "#1c2127"
  2: "#252a31"
  3: "#2f343c"
  4: "#383e47"
  5: "#404854"
  6: "#99c4ff"
  black: "#111418"
  white: "#ffffff"
  hex: "#f7d1bf"
  dark-gray1: "#1C2127"
  dark-gray2: "#252A31"
  dark-gray3: "#2F343C"
  dark-gray4: "#383E47"
  dark-gray5: "#404854"
  gray1: "#5F6B7C"
  gray2: "#738091"
  gray3: "#8F99A8"
  gray4: "#ABB3BF"
  gray5: "#C5CBD3"
  light-gray1: "#D3D8DE"
  light-gray2: "#DCE0E5"
  light-gray3: "#E5E8EB"
  light-gray4: "#EDEFF2"
  light-gray5: "#F6F7F9"
  blue1: "#184A90"
  blue2: "#215DB0"
  blue3: "#2D72D2"
  blue4: "#4C90F0"
  blue5: "#8ABBFF"
  green1: "#165A36"
  green2: "#1C6E42"
  green3: "#238551"
  green4: "#32A467"
  green5: "#72CA9B"
  orange1: "#77450D"
  orange2: "#935610"
  orange3: "#C87619"
  orange4: "#EC9A3C"
  orange5: "#FBB360"
  red1: "#8E292C"
  red2: "#AC2F33"
  red3: "#CD4246"
  red4: "#E76A6E"
  red5: "#FA999C"
  cerulean1: "#0C5174"
  cerulean2: "#0F6894"
  cerulean3: "#147EB3"
  cerulean4: "#3FA6DA"
  cerulean5: "#68C1EE"
  forest1: "#1D7324"
  forest2: "#238C2C"
  forest3: "#29A634"
  forest4: "#43BF4D"
  forest5: "#62D96B"
  gold1: "#5C4405"
  gold2: "#866103"
  gold3: "#D1980B"
  gold4: "#F0B726"
  gold5: "#FBD065"
  indigo1: "#5642A6"
  indigo2: "#634DBF"
  indigo3: "#7961DB"
  indigo4: "#9881F3"
  indigo5: "#BDADFF"
  lime1: "#43501B"
  lime2: "#5A701A"
  lime3: "#8EB125"
  lime4: "#B6D94C"
  lime5: "#D4F17E"
  rose1: "#A82255"
  rose2: "#C22762"
  rose3: "#DB2C6F"
  rose4: "#F5498B"
  rose5: "#FF66A1"
  sepia1: "#5E4123"
  sepia2: "#7A542E"
  sepia3: "#946638"
  sepia4: "#AF855A"
  sepia5: "#D0B090"
  turquoise1: "#004D46"
  turquoise2: "#007067"
  turquoise3: "#00A396"
  turquoise4: "#13C9BA"
  turquoise5: "#7AE1D8"
  vermilion1: "#96290D"
  vermilion2: "#B83211"
  vermilion3: "#D33D17"
  vermilion4: "#EB6847"
  vermilion5: "#FF9980"
  violet1: "#5C255C"
  primary: "#FF9980"
typography:
  pt-font-family-monospace:
    fontFamily: monospace
  pt-font-family:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", blueprint-icons-16, sans-serif"
  body:
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.28581
  bp6-heading:
    fontSize: 14px
  bp6-entity-title-subtitle:
    fontSize: 12px
  h6:
    fontSize: 18px
  bp6-navbar-heading:
    fontSize: 16px
  switch-indicator-text-font-size:
    fontSize: 0.7em
rounded:
  button: 3px
  input: 3px
  card: 7px
  badge: 999px
  nav: 3px
  default: 3px
icons:
  library: Blueprint Icons
  package: "@blueprintjs/icons"
  style: solid
  grid: 16
  strokeWidth: 0
  strokeLinecap: square
  strokeLinejoin: miter
  source: curated
  url: "https://blueprintjs.com/docs/#icons"
components:
  button-primary:
    backgroundColor: "#FF9980"
    textColor: "#0b0b0c"
    rounded: 3px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 3px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 3px
    padding: 10px 18px
  input-default:
    backgroundColor: "#EDEFF2"
    textColor: "#0b0b0c"
    rounded: 3px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#EDEFF2"
    textColor: "#0b0b0c"
    rounded: 7px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#FF9980"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#EDEFF2"
    textColor: "#0b0b0c"
    rounded: 3px
    padding: 10px 16px
  select-default:
    backgroundColor: "#EDEFF2"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#FF9980"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#FF9980"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#EDEFF2"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#EDEFF2"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#ffffff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#EDEFF2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Blueprint

## Overview

**Blueprint** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#FF9980` brand accent.

Typography centers cleanly on `System UI` (18px display down to 14px body), unified by `3px` base corner radius and stepped `#ffffff` -> `#EDEFF2` surface layering.

Maintained by **Palantir**. Source: published token package (https://github.com/palantir/blueprint), repo https://github.com/palantir/blueprint, package `@blueprintjs/core`, frameworks: react, css. Inventory: **91** colors, **8** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#EDEFF2` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#FF9980` (2.1:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.5:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `6` (`#99c4ff`), `hex` (`#f7d1bf`), `gray1` (`#5F6B7C`), `gray2` (`#738091`), `gray3` (`#8F99A8`), `blue1` (`#184A90`).
- **Neutral Ramp**: `1` (`#1c2127`), `2` (`#252a31`), `3` (`#2f343c`), `4` (`#383e47`), `5` (`#404854`), `black` (`#111418`).
- **Semantic States**: success: `green1` (`#165A36`) · danger: `red1` (`#8E292C`) · warning: `orange1` (`#77450D`).

## Typography

- **Primary / Display Voice**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", blueprint-icons-16, sans-serif` (top step `h6`: 18px, weight 600).
- **Body & UI Controls**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", blueprint-icons-16, sans-serif` (`body`: 14px, weight 400, line-height 1.28581).
- **Monospace / Technical Labels**: `monospace` (`pt-font-family-monospace`: 16px).
- **Scale Steps (8)**: `h6` (18px), `pt-font-family-monospace` (16px), `pt-font-family` (16px), `bp6-navbar-heading` (16px), `body` (14px, w400), `bp6-heading` (14px), `bp6-entity-title-subtitle` (12px), `switch-indicator-text-font-size` (0.7em).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#EDEFF2` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#EDEFF2`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#FF9980` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `3px` (Buttons `3px` · Inputs `3px` · Cards `7px` · Badges `999px` · Navigation `3px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `7px` container.
- **Iconography & SVGs**: Blueprint Icons (`@blueprintjs/icons`) on a `16x16` grid (solid, stroke `0px`, `square` caps).

## Components

- **`button-primary` (button)**: bg `#FF9980`, ink `#0b0b0c`, (9.5:1), radius `3px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `3px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `3px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#EDEFF2`, ink `#0b0b0c`, (17.1:1), radius `3px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#EDEFF2`, ink `#0b0b0c`, (17.1:1), radius `7px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#FF9980`, ink `#0b0b0c`, (9.5:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#EDEFF2`, ink `#0b0b0c`, (17.1:1), radius `3px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#EDEFF2`, ink `#0b0b0c`, (17.1:1), radius `4px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#FF9980`, ink `#0b0b0c`, (9.5:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#FF9980`, ink `#0b0b0c`, (9.5:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#EDEFF2`, ink `#0b0b0c`, (17.1:1), radius `4px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#EDEFF2`, ink `#0b0b0c`, (17.1:1), radius `4px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#EDEFF2`, ink `#0b0b0c`, (17.1:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#FF9980` with `#0b0b0c` text (9.5:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `3px` base geometry across inputs and buttons (7px on outer containers).
- Separate containers via `#EDEFF2` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `3px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
