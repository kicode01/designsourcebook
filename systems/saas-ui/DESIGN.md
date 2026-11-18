---
version: alpha
name: Saas UI
description: "Saas UI — tokens read from https://github.com/saas-js/saas-ui."
colors:
  gray-focus-ring: "#51555c"
  zinc-focus-ring: "#55555b"
  stone-focus-ring: "#5a5450"
  red-focus-ring: "#d40924"
  orange-focus-ring: "#d83b00"
  amber-focus-ring: "#ffa800"
  yellow-focus-ring: "#f8c500"
  lime-focus-ring: "#94d600"
  green-focus-ring: "#00910f"
  emerald-focus-ring: "#009549"
  teal-focus-ring: "#00957b"
  cyan-focus-ring: "#008dc3"
  sky-focus-ring: "#007de2"
  blue-focus-ring: "#0063eb"
  indigo-focus-ring: "#524ce3"
  violet-focus-ring: "#743ed8"
  purple-focus-ring: "#8c3cd3"
  fuchsia-focus-ring: "#a930bb"
  pink-focus-ring: "#c91b86"
  rose-focus-ring: "#d30043"
  sui-colors-gray-focusring: "#51555c"
  sui-colors-zinc-focusring: "#55555b"
  sui-colors-stone-focusring: "#5a5450"
  sui-colors-red-focusring: "#d40924"
  sui-colors-orange-focusring: "#d83b00"
  sui-colors-amber-focusring: "#ffa800"
  sui-colors-yellow-focusring: "#f8c500"
  sui-colors-lime-focusring: "#94d600"
  sui-colors-green-focusring: "#00910f"
  sui-colors-emerald-focusring: "#009549"
  sui-colors-teal-focusring: "#00957b"
  sui-colors-cyan-focusring: "#008dc3"
  sui-colors-sky-focusring: "#007de2"
  sui-colors-blue-focusring: "#0063eb"
  sui-colors-indigo-focusring: "#524ce3"
  sui-colors-violet-focusring: "#743ed8"
  sui-colors-purple-focusring: "#8c3cd3"
  sui-colors-fuchsia-focusring: "#a930bb"
  sui-colors-pink-focusring: "#c91b86"
  sui-colors-rose-focusring: "#d30043"
  sui-accent: "#4f39f6"
  black: "#000004"
  white: "#ffffff"
  gray-contrast: "#fafafb"
  gray-solid: "#51555c"
  zinc-contrast: "#fafafb"
  zinc-solid: "#55555b"
  stone-contrast: "#fbfaf9"
  stone-solid: "#5a5450"
  red-contrast: "#fff7f6"
  red-solid: "#d40924"
  orange-contrast: "#fff8f2"
  orange-solid: "#d83b00"
  amber-contrast: "#120c04"
  amber-solid: "#ffa800"
  yellow-contrast: "#100d04"
  yellow-solid: "#f8c500"
  lime-contrast: "#0a0f05"
  lime-solid: "#94d600"
  green-contrast: "#f4fdf6"
  green-solid: "#00910f"
  emerald-contrast: "#f3fdf8"
  emerald-solid: "#009549"
  teal-contrast: "#f1fdfb"
  teal-solid: "#00957b"
  cyan-contrast: "#f1fdff"
  cyan-solid: "#008dc3"
  sky-contrast: "#f2fcff"
  sky-solid: "#007de2"
  blue-contrast: "#f5faff"
  blue-solid: "#0063eb"
  indigo-contrast: "#f8faff"
  indigo-solid: "#524ce3"
  violet-contrast: "#faf9ff"
  violet-solid: "#743ed8"
  purple-contrast: "#fcf8ff"
  purple-solid: "#8c3cd3"
  fuchsia-contrast: "#fef7ff"
  fuchsia-solid: "#a930bb"
  pink-contrast: "#fff7fb"
  pink-solid: "#c91b86"
  rose-contrast: "#fff7f7"
  rose-solid: "#d30043"
  ring-offset-color: "#fff"
  sui-colors-black: "#000004"
  sui-colors-white: "#ffffff"
  sui-colors-gray-contrast: "#fafafb"
  sui-colors-gray-solid: "#51555c"
  sui-colors-zinc-contrast: "#fafafb"
  sui-colors-zinc-solid: "#55555b"
  primary: "#4f39f6"
typography:
  mono:
    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif"
  title:
    fontSize: 4rem
    lineHeight: 1.15
  h2:
    fontSize: 1.5rem
  font-size:
    fontSize: 1.5em
rounded:
  nav: 8px
  default: 8px
icons:
  library: Lucide
  package: lucide-react
  pack: lucide
  style: outline
  grid: 16
  strokeWidth: 1.5
  strokeLinecap: round
  strokeLinejoin: round
  source: npm
  url: "https://lucide.dev"
components:
  select-default:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#4f39f6"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#4f39f6"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#fff"
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
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Saas UI

## Overview

**Saas UI** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#4f39f6` brand accent.

Typography centers cleanly on `System UI` (64px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#fff` surface layering.

Source: published token package (https://github.com/saas-js/saas-ui), repo https://github.com/saas-js/saas-ui. Inventory: **91** colors, **5** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fff` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#4f39f6` (6.5:1 vs canvas; pair with `#f7f7f8` foreground ink for 6.0:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `lime-focus-ring` (`#94d600`), `emerald-focus-ring` (`#009549`), `teal-focus-ring` (`#00957b`), `cyan-focus-ring` (`#008dc3`), `sky-focus-ring` (`#007de2`), `blue-focus-ring` (`#0063eb`).
- **Neutral Ramp**: `gray-focus-ring` (`#51555c`), `zinc-focus-ring` (`#55555b`), `stone-focus-ring` (`#5a5450`), `sui-colors-gray-focusring` (`#51555c`), `sui-colors-zinc-focusring` (`#55555b`), `sui-colors-stone-focusring` (`#5a5450`).
- **Semantic States**: success: `green-focus-ring` (`#00910f`) · danger: `red-focus-ring` (`#d40924`) · warning: `orange-focus-ring` (`#d83b00`).

## Typography

- **Primary / Display Voice**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif` (top step `title`: 4rem, weight 600, line-height 1.15).
- **Body & UI Controls**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif` (`body`: 16px, weight 400).
- **Monospace / Technical Labels**: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` (`mono`: 16px).
- **Scale Steps (5)**: `title` (4rem), `h2` (1.5rem), `font-size` (1.5em), `mono` (16px), `body` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#fff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#fff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#4f39f6` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Lucide (`lucide-react`) on a `16x16` grid (outline, stroke `1.5px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#4f39f6`, ink `#f7f7f8`, (6.0:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#4f39f6`, ink `#f7f7f8`, (6.0:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#4f39f6` with `#f7f7f8` text (6.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#fff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
