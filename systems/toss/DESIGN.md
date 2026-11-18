---
version: alpha
name: Toss Design System
description: "Toss Design System — tokens imported from @toss/tds-colors."
colors:
  background: "#ffffff"
  dark-background: "#17171c"
  dark-float-background: "#2c2c35"
  dark-grey-background: "#101013"
  dark-layered-background: "#202027"
  dark-theme-background: "#17171c"
  dark-theme-background-level01: "#202027"
  dark-theme-background-level02: "#2c2c35"
  dark-theme-background-level-b01: "#101013"
  dark-theme-hairline-border: "#3c3c47"
  float-background: "#ffffff"
  grey-background: "#f2f4f6"
  layered-background: "#ffffff"
  light-theme-background: "#ffffff"
  light-theme-background-level01: "#ffffff"
  light-theme-background-level02: "#ffffff"
  light-theme-background-level-b01: "#f2f4f6"
  light-theme-hairline-border: "#e5e8eb"
  adaptive-background: "#17171c"
  adaptive-background-level01: "#202027"
  adaptive-background-level02: "#2c2c35"
  adaptive-background-level-b01: "#101013"
  adaptive-float-background: "#2c2c35"
  adaptive-grey-background: "#101013"
  adaptive-hairline-border: "#3c3c47"
  adaptive-layered-background: "#202027"
  background-level01: "#ffffff"
  background-level02: "#ffffff"
  background-level-b01: "#f2f4f6"
  disabled-blue500: "#c9e2ff"
  hairline-border: "#e5e8eb"
  t-radio-indicator-background-color: "#ffffff"
  t-dark-fill-button-background: "#4e5968"
  t-primary-weak-button-background: "#e8f3ff"
  t-danger-weak-button-background: "#ffeeee"
  t-dark-weak-button-background: "#f2f4f6"
  black: "#000000"
  blue500: "#3182f6"
  dark-theme-blue200: "#25478c"
  dark-theme-blue700: "#61b0ff"
  dark-theme-green400: "#13a065"
  dark-theme-green900: "#ccffea"
  dark-theme-grey500: "#7e7e87"
  dark-theme-orange200: "#804600"
  dark-theme-orange700: "#ffa861"
  dark-theme-purple300: "#7b2595"
  dark-theme-purple800: "#eaacfc"
  dark-theme-red50: "#3c2020"
  dark-theme-teal100: "#224e51"
  dark-theme-teal600: "#43bec7"
  dark-theme-yellow300: "#eb8b1e"
  dark-theme-yellow800: "#ffe5b2"
  green50: "#f0faf6"
  grey100: "#f2f4f6"
  grey600: "#6b7684"
  inverse-grey300: "#4d4d59"
  inverse-grey800: "#e4e4e5"
  light-theme-blue50: "#e8f3ff"
  light-theme-green100: "#aeefd5"
  light-theme-green600: "#02a262"
  light-theme-grey300: "#d1d6db"
  light-theme-grey800: "#333d4b"
  light-theme-orange50: "#fff3e0"
  light-theme-pc-screen-bg: "#f6f7f9"
  light-theme-purple500: "#a234c7"
  light-theme-red200: "#feafb4"
  light-theme-red700: "#d22030"
  light-theme-teal400: "#30b6b6"
  light-theme-teal900: "#076565"
  light-theme-yellow500: "#ffc342"
  orange200: "#ffcd80"
  orange700: "#f57800"
  purple400: "#b44bd7"
  purple900: "#65237b"
  red500: "#f04452"
  teal200: "#89d8d8"
  teal700: "#0c8585"
  yellow200: "#ffe69b"
  yellow700: "#faa131"
  adaptive-blue400: "#2970d9"
  adaptive-blue900: "#c8e7ff"
  adaptive-green500: "#16bb76"
  adaptive-grey200: "#3c3c47"
  adaptive-grey700: "#c3c3c6"
  adaptive-orange200: "#804600"
  adaptive-orange700: "#ffa861"
  adaptive-purple300: "#7b2595"
  adaptive-purple800: "#eaacfc"
  adaptive-red50: "#3c2020"
  adaptive-teal100: "#224e51"
  primary: "#faa131"
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
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#faa131"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#faa131"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#ffffff"
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
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Toss Design System

## Overview

**Toss Design System** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#faa131` brand accent.

Typography centers cleanly on `System UI` (large display down to 14px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **Toss**. Source: published token package, package `@toss/tds-colors`. Inventory: **91** colors, **0** typography steps, and **8** documented components (see package license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#ffffff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#faa131` (2.1:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.6:1 contrast).
- **Structural Border (`border`)**: `#e5e8eb` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `disabled-blue500` (`#c9e2ff`), `t-dark-fill-button-background` (`#4e5968`), `blue500` (`#3182f6`), `dark-theme-blue200` (`#25478c`), `dark-theme-blue700` (`#61b0ff`), `dark-theme-purple300` (`#7b2595`).
- **Neutral Ramp**: `background` (`#ffffff`), `dark-background` (`#17171c`), `dark-float-background` (`#2c2c35`), `dark-grey-background` (`#101013`), `dark-layered-background` (`#202027`), `dark-theme-background` (`#17171c`).
- **Semantic States**: success: `dark-theme-green400` (`#13a065`) · danger: `dark-theme-red50` (`#3c2020`) · warning: `dark-theme-orange200` (`#804600`).

## Typography

- **Primary / Display Voice**: `System UI`.
- **Body & UI Controls**: `System UI`.

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#ffffff` cards; separate sibling sections using `#e5e8eb` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#ffffff`) and `1px solid #e5e8eb` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#faa131` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#faa131`, ink `#0b0b0c`, (9.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#faa131`, ink `#0b0b0c`, (9.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#faa131` with `#0b0b0c` text (9.6:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#ffffff` surface shifts and `#e5e8eb` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
