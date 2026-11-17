---
version: alpha
name: Appear Here Styleguide
description: "Crisp light (rgb(255, 255, 255)) canvas, system-ui typography, rgb(234, 155, 82) brand accent, and 8px corner geometry"
colors:
  color-white: "rgb(255, 255, 255)"
  color-black: "rgb(25, 25, 25)"
  color-gold: "rgb(186, 160, 130)"
  color-gold-light: "rgb(219, 189, 154)"
  color-blue: "rgb(25, 103, 158)"
  color-red: "rgb(213, 84, 68)"
  color-green: "rgb(72, 213, 108)"
  color-orange: "rgb(234, 155, 82)"
  color-yellow: "rgb(236, 180, 74)"
  color-focus-ring: "rgb(91, 157, 217)"
  color-red-light: "rgb(236, 94, 77)"
  color-blue-light: "rgb(41, 125, 184)"
  color-grey-lightest: "rgb(245, 245, 245)"
  color-grey-lighter: "rgb(221, 221, 221)"
  color-grey-light: "rgb(190, 190, 190)"
  color-grey: "rgb(139, 139, 139)"
  color-grey-dark: "rgb(90, 90, 90)"
  color-grey-darker: "rgb(56, 56, 56)"
  color-grey-darkest: "rgb(35, 35, 35)"
  facebook-blue: "rgb(59, 89, 152)"
  twitter-blue: "rgb(29, 161, 242)"
  pintrest-red: "rgb(190, 9, 28)"
  background-color: "#eee"
  primary: "rgb(234, 155, 82)"
typography:
  fontsize-large-v:
    fontSize: 2.75rem
  fontsize-large-iv:
    fontSize: 2rem
  fontsize-large-iii:
    fontSize: 1.75rem
  fontsize-large-ii:
    fontSize: 1.5rem
  fontsize-large-i:
    fontSize: 1.1875rem
  fontsize-regular:
    fontSize: 1rem
  fontsize-small-i:
    fontSize: 0.875rem
  fontsize-small-ii:
    fontSize: 0.6875rem
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
    backgroundColor: "rgb(234, 155, 82)"
    textColor: "#0b0b0c"
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
    backgroundColor: "rgb(245, 245, 245)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "rgb(245, 245, 245)"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "rgb(234, 155, 82)"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "rgb(245, 245, 245)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "rgb(245, 245, 245)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "rgb(234, 155, 82)"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "rgb(234, 155, 82)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "rgb(245, 245, 245)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "rgb(245, 245, 245)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "rgb(255, 255, 255)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "rgb(255, 255, 255)"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "rgb(245, 245, 245)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Appear Here Styleguide

## Overview

**Appear Here Styleguide** is a light-first design system anchored on `rgb(255, 255, 255)` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `rgb(234, 155, 82)` brand accent.

Typography centers cleanly on `System UI` (44px display down to 16px body), unified by `8px` base corner radius and stepped `rgb(255, 255, 255)` -> `rgb(245, 245, 245)` surface layering.

Maintained by **Appear Here**. Source: published token package (https://github.com/appearhere/bloom), repo https://github.com/appearhere/bloom, frameworks: css. Inventory: **24** colors, **8** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `rgb(255, 255, 255)` — base application backdrop (light theme).
- **Surface (`surface`)**: `rgb(245, 245, 245)` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `rgb(234, 155, 82)` (2.3:1 vs canvas; pair with `#0b0b0c` foreground ink for 8.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-gold` (`rgb(186, 160, 130)`), `color-gold-light` (`rgb(219, 189, 154)`), `color-blue` (`rgb(25, 103, 158)`), `color-focus-ring` (`rgb(91, 157, 217)`), `color-blue-light` (`rgb(41, 125, 184)`), `facebook-blue` (`rgb(59, 89, 152)`).
- **Neutral Ramp**: `color-white` (`rgb(255, 255, 255)`), `color-black` (`rgb(25, 25, 25)`), `color-grey-lightest` (`rgb(245, 245, 245)`), `color-grey-lighter` (`rgb(221, 221, 221)`), `color-grey-light` (`rgb(190, 190, 190)`), `color-grey` (`rgb(139, 139, 139)`).
- **Semantic States**: success: `color-green` (`rgb(72, 213, 108)`) · danger: `color-red` (`rgb(213, 84, 68)`) · warning: `color-orange` (`rgb(234, 155, 82)`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `fontsize-large-v`: 2.75rem, weight 600).
- **Body & UI Controls**: `system-ui` (`fontsize-regular`: 1rem, weight 400).
- **Scale Steps (8)**: `fontsize-large-v` (2.75rem), `fontsize-large-iv` (2rem), `fontsize-large-iii` (1.75rem), `fontsize-large-ii` (1.5rem), `fontsize-large-i` (1.1875rem), `fontsize-regular` (1rem), `fontsize-small-i` (0.875rem), `fontsize-small-ii` (0.6875rem).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `rgb(245, 245, 245)` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`rgb(255, 255, 255)` -> `rgb(245, 245, 245)`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `rgb(234, 155, 82)` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `rgb(234, 155, 82)`, ink `#0b0b0c`, (8.7:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `rgb(245, 245, 245)`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `rgb(245, 245, 245)`, ink `#0b0b0c`, (18.0:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `rgb(234, 155, 82)`, ink `#0b0b0c`, (8.7:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `rgb(245, 245, 245)`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `rgb(245, 245, 245)`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `rgb(234, 155, 82)`, ink `#0b0b0c`, (8.7:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `rgb(234, 155, 82)`, ink `#0b0b0c`, (8.7:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `rgb(245, 245, 245)`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `rgb(245, 245, 245)`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `rgb(255, 255, 255)`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `rgb(255, 255, 255)`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `rgb(245, 245, 245)`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `rgb(255, 255, 255)` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `rgb(234, 155, 82)` with `#0b0b0c` text (8.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `rgb(245, 245, 245)` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
