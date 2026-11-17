---
version: alpha
name: Radix Themes
description: "Dark (#1a211e) canvas, -apple-system typography, rgba(255, 255, 255, 0.7) brand accent, and 8px corner geometry"
colors:
  color-panel-translucent: "rgba(255, 255, 255, 0.7)"
  color-surface: "rgba(255, 255, 255, 0.85)"
  color-transparent: "rgb(0 0 0 / 0)"
  amber-contrast: "#21201c"
  amber-surface: "#fefae4cc"
  blue-surface: "#f1f9ffcc"
  bronze-surface: "#fdf5f3cc"
  brown-surface: "#fbf8f4cc"
  crimson-surface: "#fef5f8cc"
  cyan-surface: "#eff9facc"
  gold-surface: "#f9f8efcc"
  grass-surface: "#f3faf3cc"
  gray-surface: "#ffffffcc"
  green-surface: "#f1faf4cc"
  indigo-surface: "#f5f8ffcc"
  iris-surface: "#f6f6ffcc"
  jade-surface: "#f1faf5cc"
  lime-contrast: "#1d211c"
  lime-surface: "#f6f9f0cc"
  mauve-surface: "#ffffffcc"
  mint-contrast: "#1a211e"
  mint-surface: "#effaf8cc"
  olive-surface: "#ffffffcc"
  orange-surface: "#fff5e9cc"
  pink-surface: "#fef5facc"
  plum-surface: "#fdf5fdcc"
  purple-surface: "#faf5fecc"
  red-surface: "#fff5f5cc"
  ruby-surface: "#fff5f6cc"
  sage-surface: "#ffffffcc"
  sand-surface: "#ffffffcc"
  sky-contrast: "#1c2024"
  sky-surface: "#eef9fdcc"
  slate-surface: "#ffffffcc"
  teal-surface: "#f0faf8cc"
  tomato-surface: "#fff6f5cc"
  violet-surface: "#f9f6ffcc"
  yellow-contrast: "#21201c"
  yellow-surface: "#fefbe4cc"
  primary: "rgba(255, 255, 255, 0.7)"
typography:
  default-font-family:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI (Custom)\", Roboto, \"Helvetica Neue\", \"Open Sans (Custom)\", system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\""
  code-font-family:
    fontFamily: "Menlo, \"Consolas (Custom)\", \"Bitstream Vera Sans Mono\", monospace, \"Apple Color Emoji\", \"Segoe UI Emoji\""
  em-font-family:
    fontFamily: "\"Times New Roman\", Times, serif"
  quote-font-family:
    fontFamily: "\"Times New Roman\", Times, serif"
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
icons:
  library: Radix Icons
  package: "@radix-ui/react-icons"
  pack: radix
  style: solid
  grid: 15
  strokeWidth: 0
  strokeLinecap: square
  strokeLinejoin: miter
  source: curated
  url: "https://www.radix-ui.com/icons"
components:
  button-primary:
    backgroundColor: "rgba(255, 255, 255, 0.7)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#1a211e"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#1a211e"
    textColor: "#f7f7f8"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "rgba(255, 255, 255, 0.7)"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#1a211e"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#1a211e"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#ef4444"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#ef4444"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#1a211e"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#1a211e"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#1a211e"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#f7f7f8"
    textColor: "#1a211e"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#1a211e"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 8px
---

# Radix Themes

## Overview

**Radix Themes** is a dark-first design system anchored on `#1a211e` canvas surfaces with `#f7f7f8` primary ink (15.3:1 contrast) and `#ef4444` brand accent.

Typography centers cleanly on `System UI` (16px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **WorkOS**. Source: published token package (https://github.com/radix-ui/themes), repo https://github.com/radix-ui/themes, package `@radix-ui/themes`, frameworks: react, css. Inventory: **40** colors, **4** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#1a211e` — base application backdrop (dark theme).
- **Surface (`surface`)**: `#1a211e` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#f7f7f8` — body copy and primary headings (15.3:1 on canvas).
- **Muted Ink (`muted`)**: `#f7f7f8` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ef4444` (4.4:1 vs canvas; pair with `#f7f7f8` foreground ink for 3.5:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #f7f7f8 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Neutral Ramp**: `color-surface` (`rgba(255, 255, 255, 0.85)`), `amber-contrast` (`#21201c`), `blue-surface` (`#f1f9ffcc`), `bronze-surface` (`#fdf5f3cc`), `brown-surface` (`#fbf8f4cc`), `crimson-surface` (`#fef5f8cc`).
- **Semantic States**: warning: `amber-surface` (`#fefae4cc`).

## Typography

- **Primary / Display Voice**: `-apple-system, BlinkMacSystemFont, "Segoe UI (Custom)", Roboto, "Helvetica Neue", "Open Sans (Custom)", system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"` (top step `default-font-family`: 16px, weight 600).
- **Body & UI Controls**: `-apple-system, BlinkMacSystemFont, "Segoe UI (Custom)", Roboto, "Helvetica Neue", "Open Sans (Custom)", system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"` (`default-font-family`: 16px, weight 400).
- **Monospace / Technical Labels**: `Menlo, "Consolas (Custom)", "Bitstream Vera Sans Mono", monospace, "Apple Color Emoji", "Segoe UI Emoji"` (`code-font-family`: 16px).
- **Scale Steps (4)**: `default-font-family` (16px), `code-font-family` (16px), `em-font-family` (16px), `quote-font-family` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#1a211e` cards; separate sibling sections using `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#1a211e` -> `#1a211e`) and `1px solid color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ef4444` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Radix Icons (`@radix-ui/react-icons`) on a `15x15` grid (solid, stroke `0px`, `square` caps).

## Components

- **`button-primary` (button)**: bg `rgba(255, 255, 255, 0.7)`, ink `#0b0b0c`, (10.3:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#f7f7f8`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ef4444`, ink `#000000`, (5.6:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#1a211e`, ink `#f7f7f8`, (15.3:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#1a211e`, ink `#f7f7f8`, (15.3:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `rgba(255, 255, 255, 0.7)`, ink `#000000`, (11.0:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#10b981`, ink `#000000`, (8.3:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#1a211e`, ink `#f7f7f8`, (15.3:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#1a211e`, ink `#f7f7f8`, (15.3:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#ef4444`, ink `#0b0b0c`, (5.2:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#ef4444`, ink `#0b0b0c`, (5.2:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#1a211e`, ink `#f7f7f8`, (15.3:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#1a211e`, ink `#f7f7f8`, (15.3:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#1a211e`, ink `#f7f7f8`, (15.3:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#f7f7f8`, ink `#1a211e`, (15.3:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#1a211e`, ink `#f7f7f8`, (15.3:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#1a211e` (dark) with `#f7f7f8` primary text and `#f7f7f8` secondary labels.
- Use `#ef4444` with `#f7f7f8` text (3.5:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#1a211e` surface shifts and `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of dark polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
