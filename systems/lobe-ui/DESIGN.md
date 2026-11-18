---
version: alpha
name: Lobe UI
description: "LobeHub Lobe UI — tokens read from https://github.com/lobehub/lobe-ui."
colors:
  error: "#f4416c"
  info: "#60b1ff"
  success: "#c4f042"
  warning: "#ffb224"
  color-bg-base: "#000"
  color-bg-solid-hover: "rgb(255,255,255)"
  color-border-disabled: "#424242"
  color-error-bg-active: "#5b2526"
  color-error-bg-filled-hover: "#441e1f"
  color-shadow: "#000"
  color-text-base: "#fff"
  pink1: "#291321"
  pink10: "#fad2e3"
  pink2: "#40162f"
  pink3: "#551c3b"
  pink4: "#75204f"
  pink5: "#a02669"
  pink6: "#cb2b83"
  pink7: "#e0529c"
  pink8: "#f37fb7"
  pink9: "#f8a8cc"
  pink-active: "#e0529c"
  pink-hover: "#a02669"
  color-text-light-solid: "#fff"
  color-white: "#fff"
  pink: "#EB2F96"
  dark-a: "#000000"
  light-a: "#ffffff"
  alpha-dark-background-color: "#000"
  alpha-light-background-color: "#fff"
  background-color: "#000"
  default-color: "#000000"
  thumb-border-color: "#fff"
  border-color: "#fff"
  add-color: "#fff"
  color: "#fff"
  settings-background: "#212121"
  background: "#212121"
  bg: "#FFFFFF"
  fg: "#27272A"
  accent: "#7aa2f7"
  line: "#3d59a1"
  muted: "#565f89"
  loading-color: "#fff"
  aside-kicker-color: "#fff"
  aside-line-color: "#fff"
  color-primary: "#fff"
  overlay-color: "#080808"
  refresh-background-color: "#080808"
  refresh-color: "#fff"
  root-background-color: "#fff"
  spin-color: "#666"
  mark-color: "#000"
  chrome-bar: "#151515"
  center-play-color: "#fff"
  controls-color: "#fff"
  error-background-color: "#000"
  error-color: "#ccc"
  frame-background-color: "#000"
  frame-no-color: "#8a8a8a"
  head-background-color: "#fff"
  preview-canvas-border-color: "#333"
  preview-canvas-background-color: "#000"
  preview-time-color: "#ddd"
  color-default: "#bbb"
  color-hover: "#fff"
  section-chip-active-color: "#fff"
  section-list-background-color: "#151515"
  segment-played-fill-background-color: "#fff"
  time-color: "#ddd"
  primary: "#7aa2f7"
typography:
  font-size:
    fontSize: 0.9em
  lobe-markdown-font-size:
    fontSize: 14px
rounded:
  nav: 8px
  default: 8px
icons:
  library: Lucide
  package: lucide-react
  pack: lucide
  style: outline
  grid: 24
  strokeWidth: 2
  strokeLinecap: round
  strokeLinejoin: round
  source: npm
  url: "https://lucide.dev"
components:
  select-default:
    backgroundColor: "#000000"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#7aa2f7"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#7aa2f7"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#000000"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#000000"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#000"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#f7f7f8"
    textColor: "#000"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#000000"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 8px
---

# Lobe UI

## Overview

**Lobe UI** is a dark-first design system anchored on `#000` canvas surfaces with `#f7f7f8` primary ink (19.6:1 contrast) and `#7aa2f7` brand accent.

Typography centers cleanly on `System UI` (14px display down to 14px body), unified by `8px` base corner radius and stepped `#000` -> `#000000` surface layering.

Maintained by **LobeHub**. Source: published token package (https://github.com/lobehub/lobe-ui), repo https://github.com/lobehub/lobe-ui. Inventory: **71** colors, **2** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#000` — base application backdrop (dark theme).
- **Surface (`surface`)**: `#000000` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#f7f7f8` — body copy and primary headings (19.6:1 on canvas).
- **Muted Ink (`muted`)**: `#f7f7f8` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#7aa2f7` (8.3:1 vs canvas; pair with `#0b0b0c` foreground ink for 7.8:1 contrast).
- **Structural Border (`border`)**: `#424242` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `pink10` (`#fad2e3`), `pink2` (`#40162f`), `pink3` (`#551c3b`), `pink4` (`#75204f`), `pink5` (`#a02669`), `pink6` (`#cb2b83`).
- **Neutral Ramp**: `color-bg-base` (`#000`), `color-bg-solid-hover` (`rgb(255,255,255)`), `color-border-disabled` (`#424242`), `color-shadow` (`#000`), `color-text-base` (`#fff`), `pink1` (`#291321`).
- **Semantic States**: success: `success` (`#c4f042`) · danger: `error` (`#f4416c`) · warning: `warning` (`#ffb224`) · info: `info` (`#60b1ff`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `font-size`: 0.9em, weight 600).
- **Body & UI Controls**: `system-ui` (`font-size`: 0.9em, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#000000` cards; separate sibling sections using `#424242` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#000` -> `#000000`) and `1px solid #424242` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#7aa2f7` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Lucide (`lucide-react`) on a `24x24` grid (outline, stroke `2px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#000000`, ink `#f7f7f8`, (19.6:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#7aa2f7`, ink `#0b0b0c`, (7.8:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#7aa2f7`, ink `#0b0b0c`, (7.8:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#000000`, ink `#f7f7f8`, (19.6:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#000000`, ink `#f7f7f8`, (19.6:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#000`, ink `#f7f7f8`, (19.6:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#f7f7f8`, ink `#000`, (19.6:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#000000`, ink `#f7f7f8`, (19.6:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#000` (dark) with `#f7f7f8` primary text and `#f7f7f8` secondary labels.
- Use `#7aa2f7` with `#0b0b0c` text (7.8:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#000000` surface shifts and `#424242` hairlines cleanly.

### Don't
- Do not invert the base canvas out of dark polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
