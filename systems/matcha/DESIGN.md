---
version: alpha
name: Matcha.css
description: "Matcha.css — tokens imported from @lowlighter/matcha."
colors:
  ly-brand: "#e6edf3"
  ly-bg-brand: "#010409"
  light-default: "#1f2328"
  light-subtle: "#1f2328"
  light-contrast: "#e6edf3"
  light-muted: "#656d76"
  light-accent: "#0969da"
  light-active: "#8250df"
  light-variant: "#bf3989"
  light-success: "#1a7f37"
  light-attention: "#9a6700"
  light-severe: "#bc4c00"
  light-danger: "#d1242f"
  dark-default: "#e6edf3"
  dark-subtle: "#e6edf3"
  dark-contrast: "#1f2328"
  dark-muted: "#848d97"
  dark-accent: "#4493f8"
  dark-active: "#a371f7"
  dark-variant: "#db61a2"
  dark-success: "#3fb950"
  dark-attention: "#d29922"
  dark-severe: "#db6d28"
  dark-danger: "#f85149"
  light-bg-default: "#ffffff"
  light-bg-subtle: "#d0d7de"
  light-bg-contrast: "#24292f"
  light-bg-muted: "#f6f8fa"
  light-bg-accent: "#ddf4ff"
  light-bg-active: "#fbefff"
  light-bg-variant: "#ffeff7"
  light-bg-success: "#dafbe1"
  light-bg-attention: "#fff8c5"
  light-bg-severe: "#fff1e5"
  light-bg-danger: "#ffebe9"
  dark-bg-default: "#0d1117"
  dark-bg-subtle: "#30363d"
  dark-bg-contrast: "#6e7681"
  dark-bg-muted: "#161b22"
  dark-bg-accent: "#121d2f"
  dark-bg-active: "#231f39"
  dark-bg-variant: "#221926"
  dark-bg-success: "#12261e"
  dark-bg-attention: "#272115"
  dark-bg-severe: "#221a19"
  dark-bg-danger: "#25171c"
  comment: "#57606a"
  function: "#6639ba"
  language: "#0550ae"
  string: "#0a307b"
  keyword: "#cf2248"
  html: "#0550ae"
  section: "#0349b4"
  bullet: "#953800"
  primary: "#e6edf3"
typography:
  h1:
    fontSize: 2rem
  h3:
    fontSize: 1.25rem
  h5:
    fontSize: ".875rem"
  h2:
    fontSize: 1.5rem
  h4:
    fontSize: 1rem
  h6:
    fontSize: 0.85rem
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
  tag:
    textColor: "#1f2328"
  link:
    textColor: "#0a307b"
  hljs-selector-tag-2:
    textColor: "#0550ae"
  hljs-selector-tag:
    textColor: "#0550ae"
  switch-control:
    backgroundColor: ly-bg-brand
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: ly-bg-brand
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f6f8fa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f6f8fa"
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
    backgroundColor: "#f6f8fa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Matcha.css

## Overview

**Matcha.css** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `ly-bg-brand` brand accent.

Typography centers cleanly on `System UI` (32px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#f6f8fa` surface layering.

Source: published token package (https://github.com/lowlighter/matcha), package `@lowlighter/matcha`. Inventory: **55** colors, **6** typography steps, and **11** documented components (MIT License license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f6f8fa` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `ly-bg-brand` (distinct vs canvas; pair with `#f7f7f8` foreground ink for verified contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `light-accent` (`#0969da`), `light-active` (`#8250df`), `light-variant` (`#bf3989`), `light-attention` (`#9a6700`), `light-severe` (`#bc4c00`), `dark-accent` (`#4493f8`).
- **Neutral Ramp**: `ly-brand` (`#e6edf3`), `ly-bg-brand` (`#010409`), `light-default` (`#1f2328`), `light-subtle` (`#1f2328`), `light-contrast` (`#e6edf3`), `light-muted` (`#656d76`).
- **Semantic States**: success: `light-success` (`#1a7f37`) · danger: `light-danger` (`#d1242f`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `h1`: 2rem, weight 600).
- **Body & UI Controls**: `system-ui` (`h4`: 1rem, weight 400).
- **Scale Steps (6)**: `h1` (2rem), `h2` (1.5rem), `h3` (1.25rem), `h4` (1rem), `h5` (.875rem), `h6` (0.85rem).

## Layout

- **Grid & Control Spacing**: Derived from 11 component tokens with documented paddings: `2px`, `6px 12px`, `12px 14px`, `10px 14px`, `6px 10px`.
- **Hierarchy**: Group controls cleanly within `#f6f8fa` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#f6f8fa`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `ly-bg-brand` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`tag` (badge)**: ink `#1f2328`.
- **`link` (link)**: ink `#0a307b`.
- **`hljs-selector-tag-2` (select)**: ink `#0550ae`.
- **`hljs-selector-tag` (select)**: ink `#0550ae`.
- **`switch-control` (switch)**: bg `ly-bg-brand`, ink `#000000`, radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `ly-bg-brand`, ink `#000000`, radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f6f8fa`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f6f8fa`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f6f8fa`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `ly-bg-brand` with `#f7f7f8` text (verified) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f6f8fa` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
