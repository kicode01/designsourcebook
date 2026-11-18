---
version: alpha
name: Tamagui
description: "Tamagui — tokens imported from @tamagui/themes."
colors:
  neutral-50: "#fafafa"
  neutral-100: "#f5f5f5"
  neutral-200: "#e5e5e5"
  neutral-300: "#d4d4d4"
  neutral-400: "#a1a1a1"
  neutral-500: "#737373"
  neutral-600: "#525252"
  neutral-700: "#404040"
  neutral-800: "#262626"
  neutral-900: "#171717"
  neutral-950: "#0a0a0a"
  mauve-50: "#faf9fb"
  mauve-300: "#d1cdd7"
  mauve-600: "#8a8794"
  mauve-900: "#3d3a41"
  black: "#000000"
  slate-200: "#e2e8f0"
  slate-500: "#62748e"
  slate-800: "#1d293d"
  gray-50: "#f9fafb"
  gray-300: "#d1d5dc"
  gray-600: "#4a5565"
  gray-900: "#101828"
  zinc-100: "#f4f4f5"
  zinc-400: "#9f9fa9"
  zinc-700: "#3f3f46"
  zinc-950: "#09090b"
  stone-200: "#e7e5e4"
  stone-500: "#79716b"
  stone-800: "#292524"
  olive-50: "#fbfbf9"
  olive-300: "#d8d8d0"
  olive-600: "#5b5b4b"
  olive-900: "#1d1d16"
  mist-100: "#f1f3f3"
  mist-400: "#9ca8ab"
  mist-700: "#394447"
  mist-950: "#090b0c"
  taupe-200: "#e8e4e3"
  taupe-500: "#7c6d67"
  taupe-800: "#2b2422"
  red-50: "#fef2f2"
  red-300: "#ffa2a2"
  red-600: "#e7000b"
  red-900: "#82181a"
  orange-100: "#ffedd4"
  orange-400: "#ff8904"
  orange-700: "#ca3500"
  orange-950: "#441306"
  amber-200: "#fee685"
  amber-500: "#fe9a00"
  amber-800: "#973c00"
  yellow-50: "#fefce8"
  yellow-300: "#ffdf20"
  yellow-600: "#d08700"
  yellow-900: "#733e0a"
  lime-100: "#ecfcca"
  lime-400: "#9ae600"
  lime-700: "#497d00"
  lime-950: "#192e03"
  green-200: "#b9f8cf"
  green-500: "#00c950"
  green-800: "#016630"
  emerald-50: "#ecfdf5"
  emerald-300: "#5ee9b5"
  emerald-600: "#009966"
  emerald-900: "#004f3b"
  teal-100: "#cbfbf1"
  teal-400: "#00d5be"
  teal-700: "#00786f"
  teal-950: "#022f2e"
  cyan-200: "#a2f4fd"
  cyan-500: "#00b8db"
  cyan-800: "#005f78"
  sky-50: "#f0f9ff"
  sky-300: "#74d4ff"
  sky-600: "#0084d1"
  sky-900: "#024a70"
  blue-100: "#dbeafe"
  blue-400: "#51a2ff"
  blue-700: "#1447e6"
  blue-950: "#162456"
  indigo-200: "#c6d2ff"
  indigo-500: "#615fff"
  indigo-800: "#372aac"
  violet-50: "#f5f3ff"
  violet-300: "#c4b4ff"
  violet-600: "#7f22fe"
  violet-900: "#4d179a"
  purple-100: "#f3e8ff"
  primary: "#fe9a00"
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
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#fe9a00"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#fe9a00"
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
    backgroundColor: "#fbfbf9"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#fbfbf9"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Tamagui

## Overview

**Tamagui** is a light-first design system anchored on `#fbfbf9` canvas surfaces with `#0b0b0c` primary ink (19.0:1 contrast) and `#fe9a00` brand accent.

Typography centers cleanly on `System UI` (large display down to 14px body), unified by `8px` base corner radius and stepped `#fbfbf9` -> `#fafafa` surface layering.

Source: published token package, package `@tamagui/themes`. Inventory: **91** colors, **0** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#fbfbf9` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fafafa` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.0:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#fe9a00` (2.1:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.2:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `slate-500` (`#62748e`), `slate-800` (`#1d293d`), `gray-600` (`#4a5565`), `lime-100` (`#ecfcca`), `lime-400` (`#9ae600`), `lime-700` (`#497d00`).
- **Neutral Ramp**: `neutral-50` (`#fafafa`), `neutral-100` (`#f5f5f5`), `neutral-200` (`#e5e5e5`), `neutral-300` (`#d4d4d4`), `neutral-400` (`#a1a1a1`), `neutral-500` (`#737373`).
- **Semantic States**: success: `green-200` (`#b9f8cf`) · danger: `red-300` (`#ffa2a2`) · warning: `orange-100` (`#ffedd4`).

## Typography

- **Primary / Display Voice**: `System UI`.
- **Body & UI Controls**: `System UI`.

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#fafafa` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fbfbf9` -> `#fafafa`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#fe9a00` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#fe9a00`, ink `#0b0b0c`, (9.2:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#fe9a00`, ink `#0b0b0c`, (9.2:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fbfbf9`, ink `#0b0b0c`, (19.0:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fbfbf9`, (19.0:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fbfbf9` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#fe9a00` with `#0b0b0c` text (9.2:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#fafafa` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
