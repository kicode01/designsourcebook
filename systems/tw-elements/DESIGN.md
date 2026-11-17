---
version: alpha
name: Tailwind Elements
description: "Tailwind-based component kit, Roboto typography and Material-inspired indigo accents"
colors:
  tw-ring-offset-color: "#fff"
  default-value: "#3B71CA"
  gradient-color: "#fbfbfb"
  primary-default: "#3B71CA"
  primary-50: "#F1F5FB"
  primary-100: "#E3EBF7"
  primary-200: "#C7D7F0"
  primary-300: "#ABC2E8"
  primary-400: "#8FAEE0"
  primary-500: "#6590D5"
  primary-600: "#3061AF"
  primary-700: "#285192"
  primary-800: "#204075"
  primary-900: "#183058"
  primary-accent-100: "#d9e4f3"
  primary-accent-200: "#cedbee"
  primary-accent-300: "#386bc0"
  secondary-default: "#9FA6B2"
  secondary-50: "#F8F9F9"
  secondary-100: "#F1F2F4"
  secondary-200: "#E4E6E9"
  secondary-300: "#D6D9DE"
  secondary-400: "#C8CCD3"
  secondary-500: "#B3B9C2"
  secondary-600: "#848D9C"
  secondary-700: "#6B7585"
  secondary-800: "#565D6B"
  secondary-900: "#404650"
  secondary-accent-300: "#979ea9"
  success-default: "#14A44D"
  success-50: "#EAFCF2"
  success-100: "#D6FAE4"
  success-200: "#ACF5C9"
  success-300: "#83F0AE"
  success-400: "#59EA93"
  success-500: "#1CE26B"
  success-600: "#118C42"
  success-700: "#0E7537"
  success-800: "#0C5D2C"
  success-900: "#094621"
  success-accent-300: "#139c49"
  danger-default: "#DC4C64"
  danger-50: "#FCF2F4"
  danger-100: "#FAE5E9"
  danger-200: "#F5CCD3"
  danger-300: "#F0B2BD"
  danger-400: "#EB99A6"
  danger-500: "#E37285"
  danger-600: "#D42A46"
  danger-700: "#B0233A"
  danger-800: "#8D1C2F"
  danger-900: "#6A1523"
  danger-accent-300: "#d1485f"
  warning-default: "#E4A11B"
  warning-50: "#FDF8EF"
  warning-100: "#FBF2DE"
  warning-200: "#F7E4BE"
  warning-300: "#F4D79D"
  warning-400: "#F0C97D"
  warning-500: "#EAB54C"
  warning-600: "#C48A17"
  warning-700: "#A37313"
  warning-800: "#825C0F"
  warning-900: "#62450B"
  warning-accent-300: "#d9991a"
  info-default: "#54B4D3"
  info-50: "#F3FAFC"
  info-100: "#E7F4F9"
  info-200: "#CEE9F2"
  info-300: "#B6DFEC"
  info-400: "#9ED4E6"
  info-500: "#79C4DC"
  info-600: "#34A4CA"
  info-700: "#2B89A8"
  info-800: "#236D86"
  info-900: "#1A5265"
  info-accent-300: "#50abc8"
  surface-default: "#4f4f4f"
  surface-dark: "#424242"
  body-default: "#fff"
  body-dark: "#303030"
  background-color: "#fcfcfd"
  accent-100: "#d9e4f3"
  accent-200: "#cedbee"
  accent-300: "#386bc0"
  flag: "rgb(1, 2, 3)"
  primary: "#d9e4f3"
typography:
  html:
    fontFamily: "Roboto, sans-serif"
    lineHeight: 1.5
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
    backgroundColor: "#d9e4f3"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#DC4C64"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#404650"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#404650"
    textColor: "#f7f7f8"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#d9e4f3"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#14A44D"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#404650"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#404650"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#d9e4f3"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#d9e4f3"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#404650"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#404650"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#4f4f4f"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#f7f7f8"
    textColor: "#4f4f4f"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#404650"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 8px
---

# Tailwind Elements

## Overview

**Tailwind Elements** is a dark-first design system anchored on `#4f4f4f` canvas surfaces with `#f7f7f8` primary ink (7.7:1 contrast) and `#d9e4f3` brand accent.

Typography centers cleanly on `Roboto` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#4f4f4f` -> `#404650` surface layering.

Maintained by **MDBootstrap**. Source: published token package (https://tw-elements.com/), repo https://github.com/mdbootstrap/TW-Elements, package `tw-elements`, frameworks: css, react. Inventory: **87** colors, **1** typography steps, and **16** documented components (SEE LICENSE IN <License.txt> license).

## Colors

- **Canvas (`canvas`)**: `#4f4f4f` — base application backdrop (dark theme).
- **Surface (`surface`)**: `#404650` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#f7f7f8` — body copy and primary headings (7.7:1 on canvas).
- **Muted Ink (`muted`)**: `#f7f7f8` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#d9e4f3` (6.4:1 vs canvas; pair with `#0b0b0c` foreground ink for 15.3:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #f7f7f8 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `default-value` (`#3B71CA`), `primary-default` (`#3B71CA`), `primary-200` (`#C7D7F0`), `primary-300` (`#ABC2E8`), `primary-400` (`#8FAEE0`), `primary-500` (`#6590D5`).
- **Neutral Ramp**: `tw-ring-offset-color` (`#fff`), `gradient-color` (`#fbfbfb`), `primary-50` (`#F1F5FB`), `primary-100` (`#E3EBF7`), `secondary-default` (`#9FA6B2`), `secondary-50` (`#F8F9F9`).
- **Semantic States**: success: `success-default` (`#14A44D`) · danger: `danger-default` (`#DC4C64`) · warning: `warning-default` (`#E4A11B`) · info: `info-default` (`#54B4D3`).

## Typography

- **Primary / Display Voice**: `Roboto, sans-serif` (top step `html`: 16px, weight 600, line-height 1.5).
- **Body & UI Controls**: `Roboto, sans-serif` (`html`: 16px, weight 400, line-height 1.5).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#404650` cards; separate sibling sections using `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#4f4f4f` -> `#404650`) and `1px solid color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#d9e4f3` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `24x24` grid (outline, stroke `2px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#d9e4f3`, ink `#0b0b0c`, (15.3:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#f7f7f8`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#DC4C64`, ink `#0b0b0c`, (4.9:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#404650`, ink `#f7f7f8`, (8.9:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#404650`, ink `#f7f7f8`, (8.9:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#d9e4f3`, ink `#0b0b0c`, (15.3:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#14A44D`, ink `#0b0b0c`, (6.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#404650`, ink `#f7f7f8`, (8.9:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#404650`, ink `#f7f7f8`, (8.9:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#d9e4f3`, ink `#0b0b0c`, (15.3:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#d9e4f3`, ink `#0b0b0c`, (15.3:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#404650`, ink `#f7f7f8`, (8.9:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#404650`, ink `#f7f7f8`, (8.9:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#4f4f4f`, ink `#f7f7f8`, (7.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#f7f7f8`, ink `#4f4f4f`, (7.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#404650`, ink `#f7f7f8`, (8.9:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#4f4f4f` (dark) with `#f7f7f8` primary text and `#f7f7f8` secondary labels.
- Use `#d9e4f3` with `#0b0b0c` text (15.3:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Roboto` headings with `Roboto` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#404650` surface shifts and `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of dark polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
