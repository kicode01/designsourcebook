---
version: alpha
name: Keboola UI
description: "Keboola UI — tokens imported from @keboola/tailwind-config."
colors:
  prose-code: "#c7254e"
  prose-pre-code: "#33373d"
  prose-pre-code-bg: "#f5f5f5"
  neutral-50: "#f2f4f7"
  neutral-100: "#edf0f5"
  neutral-150: "#d9dde5"
  neutral-200: "#c5cbd6"
  neutral-300: "#a2aab8"
  neutral-400: "#7c8594"
  neutral-500: "#565c66"
  neutral-600: "#454952"
  neutral-700: "#33373d"
  neutral-800: "#222529"
  neutral-900: "#101114"
  error-100: "#ffe0e6"
  error-200: "#ffc2cc"
  error-300: "#ff99aa"
  error-400: "#ff5c77"
  error-500: "#e00025"
  error-550: "#c40021"
  error-600: "#b8001f"
  error-700: "#a3001b"
  error-800: "#7a0014"
  error-900: "#52000e"
  warning-100: "#fff3e0"
  warning-200: "#ffe7c2"
  warning-300: "#ffd699"
  warning-400: "#ffbe5c"
  warning-500: "#f59300"
  warning-550: "#e38800"
  warning-600: "#d17d00"
  warning-700: "#a36200"
  warning-800: "#7a4900"
  warning-900: "#523100"
  purple-100: "#ebe0ff"
  purple-200: "#d6c2ff"
  purple-300: "#c9adff"
  purple-400: "#ad85ff"
  purple-500: "#925cff"
  purple-600: "#6f36e0"
  purple-700: "#5b2cb8"
  purple-800: "#46228f"
  purple-900: "#321866"
  cyan-100: "#e0f9ff"
  cyan-200: "#bef3ff"
  cyan-300: "#83ebff"
  cyan-400: "#00def7"
  cyan-500: "#00bbd1"
  cyan-600: "#00a0b2"
  cyan-700: "#007d8c"
  cyan-800: "#005d69"
  cyan-900: "#003f47"
  teal-100: "#cfffe6"
  teal-200: "#96ffce"
  teal-300: "#00faaf"
  teal-400: "#00e6a1"
  teal-500: "#00c287"
  teal-600: "#00a673"
  teal-700: "#008159"
  teal-800: "#006141"
  teal-900: "#00422b"
  yellow-100: "#FFFFCC"
  yellow-200: "#FFFF99"
  yellow-300: "#FFFF33"
  yellow-400: "#F5F500"
  yellow-500: "#E5E500"
  yellow-600: "#CCCC00"
  yellow-700: "#B2B200"
  yellow-800: "#999900"
  yellow-900: "#808000"
  pink-100: "#FDE8FB"
  pink-200: "#FAD1F6"
  pink-300: "#F7BBF2"
  pink-400: "#F28CE8"
  pink-500: "#ED5EDF"
  pink-600: "#E619D1"
  pink-700: "#B814A7"
  pink-800: "#8A0F7D"
  pink-900: "#5C0A54"
  white: "#fff"
  black: "#000"
  code: "#c7254e"
  pre-code: "#33373d"
  pre-code-bg: "#f5f5f5"
  primary: "#ff99aa"
typography:
  font-size:
    fontSize: "75%"
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
    backgroundColor: "#f5f5f5"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#ff99aa"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#ff99aa"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f5f5f5"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f5f5f5"
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
    backgroundColor: "#f5f5f5"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Keboola UI

## Overview

**Keboola UI** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#ff99aa` brand accent.

Typography centers cleanly on `System UI` (12px display down to 12px body), unified by `8px` base corner radius and stepped `#fff` -> `#f5f5f5` surface layering.

Maintained by **Keboola**. Source: published token package (https://github.com/keboola/ui/tree/main/packages/tailwind-config#readme), package `@keboola/tailwind-config`. Inventory: **85** colors, **1** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f5f5f5` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ff99aa` (2.0:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `prose-code` (`#c7254e`), `purple-100` (`#ebe0ff`), `purple-200` (`#d6c2ff`), `purple-300` (`#c9adff`), `purple-400` (`#ad85ff`), `purple-500` (`#925cff`).
- **Neutral Ramp**: `prose-pre-code` (`#33373d`), `prose-pre-code-bg` (`#f5f5f5`), `neutral-50` (`#f2f4f7`), `neutral-100` (`#edf0f5`), `neutral-150` (`#d9dde5`), `neutral-200` (`#c5cbd6`).
- **Semantic States**: danger: `error-100` (`#ffe0e6`) · warning: `warning-100` (`#fff3e0`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `font-size`: 75%, weight 600).
- **Body & UI Controls**: `system-ui` (`font-size`: 75%, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#f5f5f5` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#f5f5f5`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ff99aa` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#f5f5f5`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#ff99aa`, ink `#0b0b0c`, (9.7:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#ff99aa`, ink `#0b0b0c`, (9.7:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f5f5f5`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f5f5f5`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f5f5f5`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ff99aa` with `#0b0b0c` text (9.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f5f5f5` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
