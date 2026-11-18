---
version: alpha
name: Web Awesome
description: "Web Awesome — tokens imported from @awesome.me/webawesome."
colors:
  wa-color-orange-95: "#ffeddb"
  wa-color-orange-90: "#ffd8b5"
  wa-color-orange-80: "#ffb384"
  wa-color-orange-70: "#ff8b57"
  wa-color-orange-40: "#953f00"
  wa-color-orange-30: "#773000"
  wa-color-orange-20: "#5b2100"
  wa-color-orange-10: "#3a1100"
  wa-color-orange-05: "#270900"
  fill: "#000"
  aliceblue: "#f0f8ff"
  antiquewhite: "#faebd7"
  aqua: "#00ffff"
  aquamarine: "#7fffd4"
  azure: "#f0ffff"
  beige: "#f5f5dc"
  bisque: "#ffe4c4"
  black: "#000000"
  blanchedalmond: "#ffebcd"
  blue: "#0000ff"
  blueviolet: "#8a2be2"
  brown: "#a52a2a"
  burlywood: "#deb887"
  cadetblue: "#5f9ea0"
  chartreuse: "#7fff00"
  chocolate: "#d2691e"
  coral: "#ff7f50"
  cornflowerblue: "#6495ed"
  cornsilk: "#fff8dc"
  crimson: "#dc143c"
  cyan: "#00ffff"
  darkblue: "#00008b"
  darkcyan: "#008b8b"
  darkgoldenrod: "#b8860b"
  darkgray: "#a9a9a9"
  darkgreen: "#006400"
  darkgrey: "#a9a9a9"
  darkkhaki: "#bdb76b"
  darkmagenta: "#8b008b"
  darkolivegreen: "#556b2f"
  darkorange: "#ff8c00"
  darkorchid: "#9932cc"
  darkred: "#8b0000"
  darksalmon: "#e9967a"
  darkseagreen: "#8fbc8f"
  darkslateblue: "#483d8b"
  darkslategray: "#2f4f4f"
  darkslategrey: "#2f4f4f"
  darkturquoise: "#00ced1"
  darkviolet: "#9400d3"
  deeppink: "#ff1493"
  deepskyblue: "#00bfff"
  dimgray: "#696969"
  dimgrey: "#696969"
  dodgerblue: "#1e90ff"
  firebrick: "#b22222"
  floralwhite: "#fffaf0"
  forestgreen: "#228b22"
  fuchsia: "#ff00ff"
  gainsboro: "#dcdcdc"
  ghostwhite: "#f8f8ff"
  goldenrod: "#daa520"
  gold: "#ffd700"
  gray: "#808080"
  green: "#008000"
  greenyellow: "#adff2f"
  grey: "#808080"
  honeydew: "#f0fff0"
  hotpink: "#ff69b4"
  indianred: "#cd5c5c"
  indigo: "#4b0082"
  ivory: "#fffff0"
  khaki: "#f0e68c"
  lavenderblush: "#fff0f5"
  lavender: "#e6e6fa"
  lawngreen: "#7cfc00"
  lemonchiffon: "#fffacd"
  lightblue: "#add8e6"
  lightcoral: "#f08080"
  lightcyan: "#e0ffff"
  lightgoldenrodyellow: "#fafad2"
  lightgray: "#d3d3d3"
  lightgreen: "#90ee90"
  lightgrey: "#d3d3d3"
  lightpink: "#ffb6c1"
  lightsalmon: "#ffa07a"
  lightseagreen: "#20b2aa"
  lightskyblue: "#87cefa"
  lightslategray: "#778899"
  lightslategrey: "#778899"
  primary: "#00bfff"
typography:
  wa-font-family-body:
    fontFamily: "Quicksand, sans-serif"
  wa-font-family-heading:
    fontFamily: "Quicksand, sans-serif"
  wa-font-family-code:
    fontFamily: "ui-monospace, monospace"
  wa-font-family-longform:
    fontFamily: "\"Crimson Pro\", serif"
rounded:
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
  select-default:
    backgroundColor: "#f0f8ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#00bfff"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#00bfff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f0f8ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f0f8ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#f8f8ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#f8f8ff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#f0f8ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Web Awesome

## Overview

**Web Awesome** is a light-first design system anchored on `#f8f8ff` canvas surfaces with `#0b0b0c` primary ink (18.6:1 contrast) and `#00bfff` brand accent.

Typography centers cleanly on `Quicksand` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#f8f8ff` -> `#f0f8ff` surface layering.

Source: published token package (https://webawesome.com/), package `@awesome.me/webawesome`. Inventory: **91** colors, **4** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#f8f8ff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f0f8ff` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (18.6:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#00bfff` (2.0:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.3:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `antiquewhite` (`#faebd7`), `aqua` (`#00ffff`), `aquamarine` (`#7fffd4`), `beige` (`#f5f5dc`), `bisque` (`#ffe4c4`), `blanchedalmond` (`#ffebcd`).
- **Neutral Ramp**: `fill` (`#000`), `aliceblue` (`#f0f8ff`), `azure` (`#f0ffff`), `black` (`#000000`), `darkgray` (`#a9a9a9`), `darkgrey` (`#a9a9a9`).
- **Semantic States**: success: `darkgreen` (`#006400`) · danger: `darkred` (`#8b0000`) · warning: `wa-color-orange-95` (`#ffeddb`).

## Typography

- **Primary / Display Voice**: `Quicksand, sans-serif` (top step `wa-font-family-body`: 16px, weight 600).
- **Body & UI Controls**: `Quicksand, sans-serif` (`wa-font-family-body`: 16px, weight 400).
- **Monospace / Technical Labels**: `ui-monospace, monospace` (`wa-font-family-code`: 16px).
- **Scale Steps (4)**: `wa-font-family-body` (16px), `wa-font-family-heading` (16px), `wa-font-family-code` (16px), `wa-font-family-longform` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#f0f8ff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#f8f8ff` -> `#f0f8ff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#00bfff` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#f0f8ff`, ink `#0b0b0c`, (18.3:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#00bfff`, ink `#0b0b0c`, (9.3:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#00bfff`, ink `#0b0b0c`, (9.3:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f0f8ff`, ink `#0b0b0c`, (18.3:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f0f8ff`, ink `#0b0b0c`, (18.3:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#f8f8ff`, ink `#0b0b0c`, (18.6:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#f8f8ff`, (18.6:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f0f8ff`, ink `#0b0b0c`, (18.3:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#f8f8ff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#00bfff` with `#0b0b0c` text (9.3:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Quicksand` headings with `Quicksand` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f0f8ff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
