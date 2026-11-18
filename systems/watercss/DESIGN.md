---
version: alpha
name: Water.css
description: "Water.css — tokens imported from water.css."
colors:
  background-body: "#202b38"
  background: "#161f27"
  background-alt: "#1a242f"
  selection: "#1c76c5"
  text-main: "#dbdbdb"
  text-bright: "#fff"
  text-muted: "#a9b1ba"
  links: "#41adff"
  focus: "#0096bfab"
  border: "#526980"
  code: "#ffbe85"
  button-base: "#0c151c"
  button-hover: "#040a0f"
  form-placeholder: "#a9a9a9"
  form-text: "#fff"
  variable: "#d941e2"
  highlight: "#efdb43"
  primary: "#41adff"
typography:
  h1:
    fontSize: 2.2em
  body:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", \"Segoe UI Emoji\", \"Apple Color Emoji\", \"Noto Color Emoji\", sans-serif"
    lineHeight: 1.4
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
    backgroundColor: "#1a242f"
    textColor: "#dbdbdb"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#41adff"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#41adff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#1a242f"
    textColor: "#dbdbdb"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#1a242f"
    textColor: "#dbdbdb"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#202b38"
    textColor: "#dbdbdb"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#dbdbdb"
    textColor: "#202b38"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#1a242f"
    textColor: "#dbdbdb"
    rounded: 8px
    padding: 8px
---

# Water.css

## Overview

**Water.css** is a dark-first design system anchored on `#202b38` canvas surfaces with `#dbdbdb` primary ink (10.4:1 contrast) and `#41adff` brand accent.

Typography centers cleanly on `System UI` (35px display down to 16px body), unified by `8px` base corner radius and stepped `#202b38` -> `#1a242f` surface layering.

Source: published token package (https://github.com/kognise/water.css), package `water.css`. Inventory: **18** colors, **2** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#202b38` — base application backdrop (dark theme).
- **Surface (`surface`)**: `#1a242f` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#dbdbdb` — body copy and primary headings (10.4:1 on canvas).
- **Muted Ink (`muted`)**: `#fff` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#41adff` (5.9:1 vs canvas; pair with `#0b0b0c` foreground ink for 8.1:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #dbdbdb 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `selection` (`#1c76c5`), `border` (`#526980`), `code` (`#ffbe85`), `variable` (`#d941e2`), `highlight` (`#efdb43`), `primary` (`#41adff`).
- **Neutral Ramp**: `background-body` (`#202b38`), `background` (`#161f27`), `background-alt` (`#1a242f`), `text-main` (`#dbdbdb`), `text-bright` (`#fff`), `text-muted` (`#a9b1ba`).
- **Semantic States**: info: `links` (`#41adff`).

## Typography

- **Primary / Display Voice**: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif` (top step `h1`: 2.2em, weight 600).
- **Body & UI Controls**: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif` (`body`: 16px, weight 400, line-height 1.4).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#1a242f` cards; separate sibling sections using `color-mix(in srgb, #dbdbdb 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#202b38` -> `#1a242f`) and `1px solid color-mix(in srgb, #dbdbdb 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#41adff` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#1a242f`, ink `#dbdbdb`, (11.3:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#41adff`, ink `#0b0b0c`, (8.1:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#41adff`, ink `#0b0b0c`, (8.1:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#1a242f`, ink `#dbdbdb`, (11.3:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#1a242f`, ink `#dbdbdb`, (11.3:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#202b38`, ink `#dbdbdb`, (10.4:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#dbdbdb`, ink `#202b38`, (10.4:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#1a242f`, ink `#dbdbdb`, (11.3:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#202b38` (dark) with `#dbdbdb` primary text and `#fff` secondary labels.
- Use `#41adff` with `#0b0b0c` text (8.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#1a242f` surface shifts and `color-mix(in srgb, #dbdbdb 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of dark polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
