---
version: alpha
name: Okta Odyssey Design System
description: "Crisp light (#ffffff) canvas, Inter typography, #80c7ca brand accent, and 8px corner geometry"
colors:
  50: "#0f1217"
  100: "#2b2e34"
  200: "#44484e"
  300: "#656970"
  400: "#7d8088"
  500: "#8f929a"
  600: "#a7abb3"
  700: "#c0c4cc"
  800: "#d7dbe3"
  900: "#eaeff7"
  bg-canvas: "#ffffff"
  bg-surface: "#f0f1f2"
  text-primary: "#0f1217"
  lighter: "#212947"
  primary: "#80c7ca"
  main: "#536adf"
  darker: "#556ce1"
  text: "#a2b7fe"
  heading: "#d7e0fe"
  highlight: "#2c3762"
  danger: "#993525"
  success: "#336845"
  warning: "#735529"
  white: "#191c22"
  inverse: "#ffffff"
  secondary-hue-accent-three300: "#80c7ca"
  secondary-hue-accent-three600: "#096256"
  secondary-hue-accent-three700: "#004650"
  hue-accent-three300: "#80c7ca"
  hue-accent-three600: "#096256"
  hue-accent-three700: "#004650"
  black-font-color: "#000000"
  white-font-color: "#FFFFFF"
  hue-neutral-white: "#f0f1f2"
  typography-color-body: "#123456"
  design-tokens-override-hue-neutral-white: "#f0f1f2"
  design-tokens-override-palette-neutral-surface: "#fafafa"
  palette-neutral-surface: "#f0f1f2"
  font-color: "#FFFFFF"
  foreground-hex: "#ffffff"
  as-formatted-string: "rgb(10, 20, 30)"
typography:
  font-sans:
    fontFamily: Inter
  font-mono:
    fontFamily: Roboto Mono
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
icons:
  library: Material Icons
  package: "@mui/icons-material"
  pack: material
  style: solid
  grid: 24
  strokeWidth: 0
  strokeLinecap: round
  strokeLinejoin: round
  source: npm
  url: "https://mui.com/material-ui/material-icons"
components:
  button-primary:
    backgroundColor: "#80c7ca"
    textColor: "#0f1217"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0f1217"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#993525"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f0f1f2"
    textColor: "#0f1217"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f0f1f2"
    textColor: "#0f1217"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#80c7ca"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#336845"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f0f1f2"
    textColor: "#0f1217"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#f0f1f2"
    textColor: "#0f1217"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#80c7ca"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#80c7ca"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f0f1f2"
    textColor: "#0f1217"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f0f1f2"
    textColor: "#0f1217"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#ffffff"
    textColor: "#0f1217"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0f1217"
    textColor: "#ffffff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#f0f1f2"
    textColor: "#0f1217"
    rounded: 8px
    padding: 8px
---

# Okta Odyssey Design System

## Overview

**Okta Odyssey Design System** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0f1217` primary ink (18.8:1 contrast) and `#80c7ca` brand accent.

Typography centers cleanly on `Inter` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#f0f1f2` surface layering.

Maintained by **Okta**. Source: published token package (https://github.com/okta/odyssey), repo https://github.com/okta/odyssey, package `@okta/odyssey-react-mui`, frameworks: react. Inventory: **41** colors, **2** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f0f1f2` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0f1217` — body copy and primary headings (18.8:1 on canvas).
- **Muted Ink (`muted`)**: `#0f1217` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#80c7ca` (1.9:1 vs canvas; pair with `#0b0b0c` foreground ink for 10.2:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0f1217 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `lighter` (`#212947`), `primary` (`#80c7ca`), `main` (`#536adf`), `darker` (`#556ce1`), `text` (`#a2b7fe`), `heading` (`#d7e0fe`).
- **Neutral Ramp**: `50` (`#0f1217`), `100` (`#2b2e34`), `200` (`#44484e`), `300` (`#656970`), `400` (`#7d8088`), `500` (`#8f929a`).
- **Semantic States**: success: `success` (`#336845`) · danger: `danger` (`#993525`) · warning: `warning` (`#735529`).

## Typography

- **Primary / Display Voice**: `Inter` (top step `font-sans`: 16px, weight 600).
- **Body & UI Controls**: `Inter` (`font-sans`: 16px, weight 400).
- **Monospace / Technical Labels**: `Roboto Mono` (`font-mono`: 16px).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f0f1f2` cards; separate sibling sections using `color-mix(in srgb, #0f1217 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#f0f1f2`) and `1px solid color-mix(in srgb, #0f1217 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#80c7ca` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Material Icons (`@mui/icons-material`) on a `24x24` grid (solid, stroke `0px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#80c7ca`, ink `#0f1217`, (9.8:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0f1217`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#993525`, ink `#ffffff`, (7.3:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f0f1f2`, ink `#0f1217`, (16.6:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f0f1f2`, ink `#0f1217`, (16.6:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#80c7ca`, ink `#000000`, (10.9:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#336845`, ink `#ffffff`, (6.5:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f0f1f2`, ink `#0f1217`, (16.6:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#f0f1f2`, ink `#0f1217`, (16.6:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#80c7ca`, ink `#0b0b0c`, (10.2:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#80c7ca`, ink `#0b0b0c`, (10.2:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f0f1f2`, ink `#0f1217`, (16.6:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f0f1f2`, ink `#0f1217`, (16.6:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0f1217`, (18.8:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0f1217`, ink `#ffffff`, (18.8:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f0f1f2`, ink `#0f1217`, (16.6:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0f1217` primary text and `#0f1217` secondary labels.
- Use `#80c7ca` with `#0b0b0c` text (10.2:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Inter` headings with `Inter` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f0f1f2` surface shifts and `color-mix(in srgb, #0f1217 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
