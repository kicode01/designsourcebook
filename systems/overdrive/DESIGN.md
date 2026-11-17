---
version: alpha
name: AutoGuru Overdrive
description: "Crisp light (#ffffff) canvas, AvertaStandard typography, #01c68c brand accent, and 8px corner geometry"
colors:
  background-subtle: "#e1edfe"
  white: "#ffffff"
  default-colour: "#ec4040"
  default-value: "#000000"
  text: "#212338"
  background: "#ffffff"
  color: "#212338"
  background-colour: "#ffffff"
  colour: "#000000"
  theme-color: "#000000"
  background-color: "#ffffff"
  color-primary: "#01c68c"
  color-secondary: "#00dd95"
  bar-hover-color: "#01c68c"
  bar-selected-color: "#05987a"
  bar-text-color: "#34384c"
  text-color: "#d4d9dd"
  brand: "#6d39a8"
  bright: "#e5bc01"
  light-brand: "#ffc001"
  edge: "#fff0f0"
  pastel: "#affff5"
  primary-foreground: "#ffffff"
  primary-border: "#000000"
  primary-background-mild: "#eeeeee"
  primary-background-strong: "#111111"
  primary-background: "#ff6d00"
  primary: "#01c68c"
  colour2: "#ffffff"
  gray900: "#212338"
  reverse: "#212338"
  emphasis-inactive: "#eef0f2"
  danger: "#d42b26"
typography:
  font-size:
    fontSize: 18px
  font-family:
    fontFamily: "AvertaStandard, system-ui, sans-serif"
  font-family-mono:
    fontFamily: "\"Courier New\", Courier, monospace"
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
icons:
  library: AutoGuru Overdrive Icons
  package: "@autoguru/icons"
  style: outline
  grid: 24
  strokeWidth: 1.5
  strokeLinecap: round
  strokeLinejoin: round
  source: npm
  url: "https://github.com/autoguru-au/icons#readme"
components:
  button-primary:
    backgroundColor: "#01c68c"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#d42b26"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#01c68c"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#01c68c"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#01c68c"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#ffffff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# AutoGuru Overdrive

## Overview

**AutoGuru Overdrive** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#01c68c` brand accent.

Typography centers cleanly on `AvertaStandard` (18px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **AutoGuru**. Source: published token package (https://github.com/autoguru-au/overdrive), repo https://github.com/autoguru-au/overdrive, package `@autoguru/overdrive`, frameworks: react. Inventory: **33** colors, **3** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#ffffff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#01c68c` (2.2:1 vs canvas; pair with `#0b0b0c` foreground ink for 8.9:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `background-subtle` (`#e1edfe`), `default-colour` (`#ec4040`), `color-primary` (`#01c68c`), `color-secondary` (`#00dd95`), `bar-hover-color` (`#01c68c`), `bar-selected-color` (`#05987a`).
- **Neutral Ramp**: `white` (`#ffffff`), `default-value` (`#000000`), `text` (`#212338`), `background` (`#ffffff`), `color` (`#212338`), `background-colour` (`#ffffff`).
- **Semantic States**: danger: `danger` (`#d42b26`).

## Typography

- **Primary / Display Voice**: `AvertaStandard, system-ui, sans-serif` (top step `font-size`: 18px, weight 600).
- **Body & UI Controls**: `AvertaStandard, system-ui, sans-serif` (`font-family`: 16px, weight 400).
- **Monospace / Technical Labels**: `"Courier New", Courier, monospace` (`font-family-mono`: 16px).
- **Scale Steps (3)**: `font-size` (18px), `font-family` (16px), `font-family-mono` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#ffffff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#ffffff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#01c68c` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: AutoGuru Overdrive Icons (`@autoguru/icons`) on a `24x24` grid (outline, stroke `1.5px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#01c68c`, ink `#0b0b0c`, (8.9:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#d42b26`, ink `#ffffff`, (5.0:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#01c68c`, ink `#0b0b0c`, (8.9:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#01c68c`, ink `#0b0b0c`, (8.9:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#01c68c`, ink `#0b0b0c`, (8.9:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#01c68c` with `#0b0b0c` text (8.9:1) for primary CTAs, active tabs, and focus outlines.
- Pair `AvertaStandard` headings with `AvertaStandard` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#ffffff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
