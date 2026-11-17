---
version: alpha
name: Workday Canvas
description: "Crisp light (#ffffff) canvas, Roboto typography, #0875e1 brand accent, and 8px corner geometry"
colors:
  tokens: "#fbf5ff"
  contrast: "#FFFFFF"
  blueberry600: "#004387"
  grape-soda600: "#7c3882"
  pomegranate600: "#99003a"
  cinnamon600: "#a31b12"
  cantaloupe600: "#c06c00"
  sour-lemon600: "#bd9100"
  green-apple600: "#217a37"
  jewel600: "#156973"
  blueberry500: "#005cb9"
  grape-soda500: "#97499e"
  pomegranate500: "#c70550"
  cinnamon500: "#de2e21"
  cantaloupe500: "#f38b00"
  sour-lemon500: "#ebb400"
  green-apple500: "#319c4c"
  jewel500: "#1a818c"
  blueberry400: "#0875e1"
  grape-soda400: "#c860d1"
  pomegranate400: "#f31167"
  cinnamon400: "#ff5347"
  cantaloupe400: "#ffa126"
  sour-lemon400: "#ffc629"
  green-apple400: "#43c463"
  jewel400: "#1ea4b3"
  blueberry300: "#40a0ff"
  grape-soda300: "#de8ae6"
  pomegranate300: "#ff5c9a"
  cinnamon300: "#ff867d"
  cantaloupe300: "#ffbc63"
  sour-lemon300: "#ffda61"
  green-apple300: "#5fe380"
  jewel300: "#44c8d7"
  blueberry200: "#a6d2ff"
  grape-soda200: "#fac0ff"
  pomegranate200: "#ffbdd6"
  cinnamon200: "#fcc9c5"
  cantaloupe200: "#fcd49f"
  sour-lemon200: "#ffecab"
  green-apple200: "#acf5be"
  jewel200: "#acecf3"
  blueberry100: "#d7eafc"
  grape-soda100: "#feebff"
  pomegranate100: "#ffebf3"
  cinnamon100: "#ffefee"
  cantaloupe100: "#ffeed9"
  sour-lemon100: "#fff9e6"
  green-apple100: "#ebfff0"
  jewel100: "#ebfdff"
  black-pepper600: "#000000"
  black-pepper400: "#333333"
  black-pepper300: "#494949"
  black-pepper100: "#787878"
  french-vanilla500: "#a6a6a6"
  french-vanilla400: "#bdbdbd"
  french-vanilla200: "#ebebeb"
  french-vanilla100: "#ffffff"
  focus-primary: "#0875e1"
  primary: "#0875e1"
  background-color: "#ffffff"
  color: "#333333"
  primary-lightest: "#fff"
  lightest: "#fff"
  background: "#005cb9"
  border-color: "#000000"
  border-right-color: "rgb(51,51,51)"
  border-bottom-color: "#ffffff"
  border-left-color: "#ffa126"
typography:
  cnvs-base-font-size:
    fontSize: 1rem
  cnvs-base-font-size-25:
    fontSize: 0.625rem
  cnvs-base-font-size-50:
    fontSize: 0.75rem
  cnvs-base-font-size-75:
    fontSize: 0.875rem
  cnvs-base-font-size-100:
    fontSize: 1rem
  cnvs-base-font-size-125:
    fontSize: 1.125rem
  cnvs-base-font-size-150:
    fontSize: 1.25rem
  cnvs-base-font-size-200:
    fontSize: 1.5rem
  cnvs-base-font-size-250:
    fontSize: 1.75rem
  cnvs-base-font-size-300:
    fontSize: 2rem
  cnvs-base-font-size-400:
    fontSize: 2.5rem
  cnvs-base-font-size-500:
    fontSize: 3rem
  cnvs-base-font-size-600:
    fontSize: 3.5rem
  cnvs-base-font-size-750:
    fontSize: 4.5rem
  cnvs-base-font-size-900:
    fontSize: 5.5rem
  cnvs-base-font-size-1050:
    fontSize: 6.5rem
  cnvs-base-font-family-50:
    fontFamily: Roboto
  cnvs-base-font-family-100:
    fontFamily: "\"Roboto Mono\""
  cnvs-base-font-family-200:
    fontFamily: "\"Noto Sans\""
  cnvs-base-font-family-0:
    fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Sana Serif\", Inter, system-ui, sans-serif, Avenir, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
  cnvs-sys-font-family-default:
    fontFamily: "\"Sana Sans VF\", Roboto, -apple-system, BlinkMacSystemFont, \"Sana Serif\", Inter, system-ui, sans-serif, Avenir, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
  cnvs-sys-font-family-mono:
    fontFamily: "\"IBM Plex Mono\", \"Roboto Mono\", monospace"
  cnvs-sys-font-family-fallback:
    fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Sana Serif\", Inter, system-ui, sans-serif, Avenir, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
icons:
  library: Canvas System Icons
  package: "@workday/canvas-system-icons-web"
  pack: workday
  style: solid
  grid: 24
  strokeWidth: 0
  strokeLinecap: round
  strokeLinejoin: round
  source: curated
  url: "https://canvas.workday.com"
components:
  button-primary:
    backgroundColor: "#0875e1"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#fbf5ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#fbf5ff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#0875e1"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#fbf5ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#fbf5ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#0875e1"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#0875e1"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fbf5ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#fbf5ff"
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
    backgroundColor: "#fbf5ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Workday Canvas

## Overview

**Workday Canvas** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#0875e1` brand accent.

Typography centers cleanly on `Roboto` (104px display down to 20px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#fbf5ff` surface layering.

Maintained by **Workday**. Source: published token package (https://github.com/Workday/canvas-kit), repo https://github.com/Workday/canvas-kit, package `@workday/canvas-kit-react`, frameworks: react, css. Inventory: **69** colors, **23** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fbf5ff` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#0875e1` (4.5:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.2:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `blueberry600` (`#004387`), `grape-soda600` (`#7c3882`), `pomegranate600` (`#99003a`), `cinnamon600` (`#a31b12`), `cantaloupe600` (`#c06c00`), `sour-lemon600` (`#bd9100`).
- **Neutral Ramp**: `tokens` (`#fbf5ff`), `contrast` (`#FFFFFF`), `grape-soda100` (`#feebff`), `pomegranate100` (`#ffebf3`), `cinnamon100` (`#ffefee`), `green-apple100` (`#ebfff0`).
- **Semantic States**: success: `green-apple600` (`#217a37`).

## Typography

- **Primary / Display Voice**: `Roboto` (top step `cnvs-base-font-size-1050`: 6.5rem, weight 600).
- **Body & UI Controls**: `Roboto` (`cnvs-base-font-size-150`: 1.25rem, weight 400).
- **Monospace / Technical Labels**: `"Roboto Mono"` (`cnvs-base-font-family-100`: 16px).
- **Scale Steps (23)**: `cnvs-base-font-size-1050` (6.5rem), `cnvs-base-font-size-900` (5.5rem), `cnvs-base-font-size-750` (4.5rem), `cnvs-base-font-size-600` (3.5rem), `cnvs-base-font-size-500` (3rem), `cnvs-base-font-size-400` (2.5rem), `cnvs-base-font-size-300` (2rem), `cnvs-base-font-size-250` (1.75rem).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#fbf5ff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#fbf5ff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#0875e1` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Canvas System Icons (`@workday/canvas-system-icons-web`) on a `24x24` grid (solid, stroke `0px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#0875e1`, ink `#ffffff`, (4.5:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#fbf5ff`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#fbf5ff`, ink `#0b0b0c`, (18.4:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#0875e1`, ink `#ffffff`, (4.5:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#fbf5ff`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#fbf5ff`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#0875e1`, ink `#0b0b0c`, (4.3:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#0875e1`, ink `#0b0b0c`, (4.3:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fbf5ff`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fbf5ff`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fbf5ff`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#0875e1` with `#f7f7f8` text (4.2:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Roboto` headings with `Roboto` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#fbf5ff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
