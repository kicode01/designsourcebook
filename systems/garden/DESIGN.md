---
version: alpha
name: Garden
description: "Zendesk Garden — the design system behind Zendesk products."
colors:
  product-support: "#00a656"
  product-gather: "#f6c8be"
  product-chat: "#f79a3e"
  product-sell: "#c38f00"
  grey-200: "#e8eaec"
  grey-400: "#b0b8be"
  grey-600: "#848f99"
  grey-800: "#39434b"
  grey-1000: "#1c2227"
  grey-1200: "#0a0d0e"
  blue-200: "#ddecf8"
  blue-400: "#93bcdc"
  blue-600: "#2694d6"
  blue-800: "#13456d"
  blue-1000: "#0a2338"
  blue-1200: "#040d15"
  red-200: "#fee3e5"
  red-400: "#f2a1a8"
  red-600: "#eb5c69"
  red-800: "#7e1d25"
  red-1000: "#3d1418"
  red-1200: "#100b0c"
  yellow-200: "#ffe6cb"
  yellow-400: "#fca347"
  yellow-600: "#d67305"
  yellow-800: "#673515"
  yellow-1000: "#2d1e15"
  yellow-1200: "#0e0c0b"
  green-200: "#daeee6"
  green-400: "#94c1b0"
  green-600: "#26a178"
  green-800: "#104b35"
  green-1000: "#0c261c"
  green-1200: "#080d0c"
  kale-200: "#daeded"
  kale-400: "#97bfbf"
  kale-600: "#4a9999"
  kale-800: "#16494f"
  kale-1000: "#03252a"
  kale-1200: "#060e0e"
  fuschia-200: "#f7e6f1"
  fuschia-400: "#e3a4cc"
  fuschia-600: "#d16aac"
  fuschia-800: "#78116c"
  fuschia-1000: "#3f0939"
  fuschia-1200: "#1b0418"
  pink-200: "#f7e5e8"
  pink-400: "#e5a6b4"
  pink-600: "#d96b81"
  pink-800: "#75263d"
  pink-1000: "#3c141f"
  pink-1200: "#17080c"
  crimson-200: "#f7e7e4"
  crimson-400: "#e2aaa0"
  crimson-600: "#cf7464"
  crimson-800: "#811b12"
  crimson-1000: "#440e09"
  crimson-1200: "#1c0604"
  orange-200: "#fae7d8"
  orange-400: "#eda875"
  orange-600: "#d57428"
  orange-800: "#693317"
  orange-1000: "#361a0c"
  orange-1200: "#150a04"
  lemon-200: "#ffea97"
  lemon-400: "#efab00"
  lemon-600: "#b68500"
  lemon-800: "#563e00"
  lemon-1000: "#2b2000"
  lemon-1200: "#110c00"
  lime-200: "#d1f3c7"
  lime-400: "#4fd12b"
  lime-600: "#509f2d"
  lime-800: "#2c491b"
  lime-1000: "#16250e"
  lime-1200: "#090e05"
  mint-200: "#9affce"
  mint-400: "#00d26d"
  mint-600: "#16a260"
  mint-800: "#1b4b33"
  mint-1000: "#0e261a"
  mint-1200: "#050e0a"
  teal-200: "#88fdf1"
  teal-400: "#03cdb8"
  teal-600: "#2a9d8f"
  teal-800: "#254846"
  teal-1000: "#122423"
  teal-1200: "#070d0d"
  azure-200: "#d9ecfc"
  azure-400: "#82bcf4"
  primary: "#2694d6"
typography:
  font-size-xxxl:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.22
  font-size-xxl:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif"
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.23
  font-size-xl:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.27
  font-size-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.33
  font-size-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.42
  font-size-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
  font-size-xs:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif"
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.4
  font-mono:
    fontFamily: "SFMono-Regular, Consolas, \"Liberation Mono\", Menlo, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.45
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
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
  button-primary:
    backgroundColor: "#2694d6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#eb5c69"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#e8eaec"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#e8eaec"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#2694d6"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#26a178"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#e8eaec"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#e8eaec"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#2694d6"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#2694d6"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#e8eaec"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#e8eaec"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#e8eaec"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#e8eaec"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#e8eaec"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Garden

## Overview

**Garden** is a light-first design system anchored on `#e8eaec` canvas surfaces with `#0b0b0c` primary ink (16.3:1 contrast) and `#2694d6` brand accent.

Typography centers cleanly on `System UI` (36px display down to 14px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **Zendesk**. Source: published token package (https://garden.zendesk.com/), repo https://github.com/zendeskgarden/react-components, package `@zendeskgarden/react-theming`, frameworks: react, css. Inventory: **91** colors, **8** typography steps, and **16** documented components (Apache-2.0 license).

## Colors

- **Canvas (`canvas`)**: `#e8eaec` — base application backdrop (light theme).
- **Surface (`surface`)**: `#e8eaec` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (16.3:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#2694d6` (2.8:1 vs canvas; pair with `#f7f7f8` foreground ink for 3.1:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `product-support` (`#00a656`), `product-gather` (`#f6c8be`), `product-chat` (`#f79a3e`), `product-sell` (`#c38f00`), `blue-200` (`#ddecf8`), `blue-400` (`#93bcdc`).
- **Neutral Ramp**: `grey-200` (`#e8eaec`), `grey-400` (`#b0b8be`), `grey-600` (`#848f99`), `grey-800` (`#39434b`), `grey-1000` (`#1c2227`), `grey-1200` (`#0a0d0e`).
- **Semantic States**: success: `green-400` (`#94c1b0`) · danger: `red-200` (`#fee3e5`) · warning: `yellow-200` (`#ffe6cb`).

## Typography

- **Primary / Display Voice**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif` (top step `font-size-xxxl`: 36px, weight 600, line-height 1.22).
- **Body & UI Controls**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif` (`font-size-md`: 14px, weight 400, line-height 1.42).
- **Monospace / Technical Labels**: `SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace` (`font-mono`: 13px).
- **Scale Steps (8)**: `font-size-xxxl` (36px, w600), `font-size-xxl` (26px, w600), `font-size-xl` (22px, w600), `font-size-lg` (18px, w600), `font-size-md` (14px, w400), `font-mono` (13px, w400), `font-size-sm` (12px, w400), `font-size-xs` (10px, w400).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#e8eaec` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#e8eaec` -> `#e8eaec`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#2694d6` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `16x16` grid (outline, stroke `1.5px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#2694d6`, ink `#0b0b0c`, (5.9:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#eb5c69`, ink `#000000`, (6.3:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#e8eaec`, ink `#0b0b0c`, (16.3:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#e8eaec`, ink `#0b0b0c`, (16.3:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#2694d6`, ink `#000000`, (6.3:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#26a178`, ink `#000000`, (6.5:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#e8eaec`, ink `#0b0b0c`, (16.3:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#e8eaec`, ink `#0b0b0c`, (16.3:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#2694d6`, ink `#0b0b0c`, (5.9:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#2694d6`, ink `#0b0b0c`, (5.9:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#e8eaec`, ink `#0b0b0c`, (16.3:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#e8eaec`, ink `#0b0b0c`, (16.3:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#e8eaec`, ink `#0b0b0c`, (16.3:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#e8eaec`, (16.3:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#e8eaec`, ink `#0b0b0c`, (16.3:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#e8eaec` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#2694d6` with `#f7f7f8` text (3.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#e8eaec` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
