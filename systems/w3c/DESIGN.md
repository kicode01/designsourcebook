---
version: alpha
name: W3C Design System
description: "W3C Design System — tokens read from https://github.com/w3c/w3c-website-templates-bundle."
colors:
  black: "#000"
  off-black: "#111"
  white: "#fff"
  off-white: "#fafafa"
  maroon: "#85144b"
  red: "#ff4136"
  orange: "#ff851b"
  yellow: "#ffdc00"
  olive: "#3d9970"
  green: "#2ecc40"
  lime: "#01ff70"
  teal: "#39cccc"
  aqua: "#7fdbff"
  blue: "#0073d8"
  navy: "#001f3f"
  purple: "#75336c"
  fuchsia: "#f012be"
  grey: "#aaa"
  mercury-grey: "#e5e5e5"
  silver: "#ddd"
  light-red: "#ec7070"
  coral: "#fc7750"
  light-coral: "#fea78d"
  deep-green: "#0a4343"
  teal-green: "#237978"
  light-blue: "#cbe0fb"
  w3c-blue: "#005a9c"
  deep-blue: "#002a56"
  pink: "#ddb0c8"
  light-pink: "#eeccdc"
  storm-gray: "#545454"
  twiki-gray: "#cac9c9"
  mist-gray: "#f8f8fb"
  success-color: "#046704"
  warning-color: "#c28605"
  error-color: "#a82615"
  facebook: "#3b5998"
  instagram: "#405de6"
  linkedin: "#0077b5"
  pinterest: "#bd081c"
  twitter: "#1da1f2"
  whatsapp: "#25d366"
  youtube: "#ff0000"
  border-bottom-color: "#bbb"
  primary: "#fea78d"
typography:
  font-family:
    fontFamily: "\"Trebuchet MS\", Geneva, sans-serif"
  h1:
    fontSize: 24pt
  h2:
    fontSize: 20pt
  h3:
    fontSize: 18pt
  h4:
    fontSize: 16pt
  h5:
    fontSize: 15pt
  h6:
    fontSize: 14pt
rounded:
  nav: 8px
  default: 8px
icons:
  library: Repository SVGs
  package: null
  style: solid
  grid: 15
  strokeWidth: 0
  strokeLinecap: round
  strokeLinejoin: round
  source: repo
components:
  select-default:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#fea78d"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#fea78d"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#fff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# W3C Design System

## Overview

**W3C Design System** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#fea78d` brand accent.

Typography centers cleanly on `Trebuchet MS` (32px display down to 16px body), unified by `8px` base corner radius and stepped `#fff` -> `#fafafa` surface layering.

Maintained by **W3C**. Source: published token package (https://github.com/w3c/w3c-website-templates-bundle), repo https://github.com/w3c/w3c-website-templates-bundle. Inventory: **45** colors, **7** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fafafa` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#fea78d` (1.9:1 vs canvas; pair with `#0b0b0c` foreground ink for 10.4:1 contrast).
- **Structural Border (`border`)**: `#bbb` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `maroon` (`#85144b`), `olive` (`#3d9970`), `lime` (`#01ff70`), `teal` (`#39cccc`), `aqua` (`#7fdbff`), `blue` (`#0073d8`).
- **Neutral Ramp**: `black` (`#000`), `off-black` (`#111`), `white` (`#fff`), `off-white` (`#fafafa`), `grey` (`#aaa`), `mercury-grey` (`#e5e5e5`).
- **Semantic States**: success: `green` (`#2ecc40`) · danger: `red` (`#ff4136`) · warning: `orange` (`#ff851b`) · info: `linkedin` (`#0077b5`).

## Typography

- **Primary / Display Voice**: `"Trebuchet MS", Geneva, sans-serif` (top step `h1`: 24pt, weight 600).
- **Body & UI Controls**: `"Trebuchet MS", Geneva, sans-serif` (`font-family`: 16px, weight 400).
- **Scale Steps (7)**: `h1` (24pt), `h2` (20pt), `h3` (18pt), `h4` (16pt), `h5` (15pt), `h6` (14pt), `font-family` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#fafafa` cards; separate sibling sections using `#bbb` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#fafafa`) and `1px solid #bbb` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#fea78d` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Repository SVGs on a `15x15` grid (solid, stroke `0px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#fea78d`, ink `#0b0b0c`, (10.4:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#fea78d`, ink `#0b0b0c`, (10.4:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#fea78d` with `#0b0b0c` text (10.4:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Trebuchet MS` headings with `Trebuchet MS` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#fafafa` surface shifts and `#bbb` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
