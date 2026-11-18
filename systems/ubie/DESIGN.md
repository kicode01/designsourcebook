---
version: alpha
name: Ubie Design Tokens
description: "Ubie Design Tokens — tokens imported from @ubie/design-tokens."
colors:
  color-text-white: "#ffffff"
  color-text-sub: "#686a6d"
  color-text-red-darken: "#811a30"
  color-text-red: "#a1213c"
  color-text-purple-darken: "#5c1b82"
  color-text-purple: "#7322a2"
  color-text-placeholder: "#96989a"
  color-text-pink-darken: "#7c1c40"
  color-text-pink: "#da3170"
  color-text-orange-darken: "#915c0f"
  color-text-orange: "#b57212"
  color-text-main: "#32353a"
  color-text-link-sub: "#686a6d"
  color-text-link: "#3959cc"
  color-text-green-darken: "#167453"
  color-text-green: "#1c9167"
  color-text-disabled: "#dcdddd"
  color-text-button-darken: "#1a285c"
  color-text-button-alert-darken: "#a1213c"
  color-text-button-alert: "#e32e55"
  color-text-button: "#3959cc"
  color-text-blue-darken: "#203374"
  color-text-blue: "#283f91"
  color-text-black-darken: "#32353a"
  color-text-black: "#393c41"
  color-gradient-primary-accent-100: "#3959cc"
  color-gradient-primary-accent-050: "#a230e4"
  color-gradient-primary-accent-000: "#da3170"
  color-gradient-primary-100: "#aab8e9"
  color-gradient-primary-000: "#efa6c2"
  color-gradient-background-100: "#f0f2fc"
  color-gradient-background-000: "#fcf0f5"
  color-border-white: "#ffffff"
  color-border-red-darken: "#e85474"
  color-border-red: "#ed7b94"
  color-border-purple-darken: "#b355e9"
  color-border-purple: "#c47dee"
  color-border-pink-darken: "#e1568a"
  color-border-pink: "#e87da5"
  color-border-orange-darken: "#ffb243"
  color-border-orange: "#ffc46f"
  color-border-green-darken: "#4ed5a5"
  color-border-green: "#77dfba"
  color-border-blue-darken: "#5d77d5"
  color-border-blue: "#8296df"
  color-border-black-lighten: "#f6f6f6"
  color-border-black-darken: "#96989a"
  color-border-black: "#c5c6c7"
  color-background-white: "#ffffff"
  color-background-red-inverse-darken: "#a1213c"
  color-background-red-inverse: "#e32e55"
  color-background-red-darken: "#f8cdd6"
  color-background-red: "#fceff2"
  color-background-purple-inverse-darken: "#7322a2"
  color-background-purple-inverse: "#a230e4"
  color-background-purple-darken: "#e9cdf9"
  color-background-purple: "#f8effc"
  color-background-pink-inverse-darken: "#9b2350"
  color-background-pink-inverse: "#da3170"
  color-background-pink-darken: "#f6cedd"
  color-background-pink: "#fcf0f5"
  color-background-orange-inverse-darken: "#b57212"
  color-background-orange-inverse: "#ffa11a"
  color-background-orange-darken: "#ffe8c8"
  color-background-orange: "#fff9f0"
  color-background-green-inverse-darken: "#1c9167"
  color-background-green-inverse: "#27cc91"
  color-background-green-darken: "#cbf3e5"
  color-background-green: "#e9faf4"
  color-background-button-primary-darken: "#1a285c"
  color-background-button-primary: "#3959cc"
  color-background-blue-inverse-darken: "#283f91"
  color-background-blue-inverse: "#3959cc"
  color-background-blue-darken: "#cfd7f3"
  color-background-blue: "#f0f2fc"
  color-background-black-inverse-darken: "#55575b"
  color-background-black-inverse: "#686a6d"
  color-background-black-darken: "#f6f6f6"
  color-background-black: "#fafafa"
  color-gradient-background000: "#f0f2fcff"
  color-gradient-background100: "#e87da5ff"
  color-gradient-primary000: "#aab8e9ff"
  color-gradient-primary100: "#da3170ff"
  color-gradient-primary-accent000: "#a230e4ff"
  color-gradient-primary-accent050: "#3959ccff"
  color-gradient-primary-accent100: "#393c41ff"
  color-gradient-icon-100: "#c6cff1"
  color-ubie-orange-700: "#d98916"
  color-ubie-black-1000: "#16191f"
  color-ubie-orange400: "#ffb243ff"
  primary: "#3959cc"
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
    backgroundColor: "#3959cc"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#3959cc"
    textColor: "#f7f7f8"
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
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Ubie Design Tokens

## Overview

**Ubie Design Tokens** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#3959cc` brand accent.

Typography centers cleanly on `System UI` (large display down to 14px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#fafafa` surface layering.

Maintained by **Ubie**. Source: published token package (https://github.com/ubie-oss/design-tokens#readme), package `@ubie/design-tokens`. Inventory: **91** colors, **0** typography steps, and **8** documented components (Apache-2.0 license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fafafa` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#3959cc` (6.0:1 vs canvas; pair with `#f7f7f8` foreground ink for 5.6:1 contrast).
- **Structural Border (`border`)**: `#f6f6f6` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-text-purple-darken` (`#5c1b82`), `color-text-purple` (`#7322a2`), `color-text-pink-darken` (`#7c1c40`), `color-text-pink` (`#da3170`), `color-text-button-darken` (`#1a285c`), `color-text-button` (`#3959cc`).
- **Neutral Ramp**: `color-text-white` (`#ffffff`), `color-text-sub` (`#686a6d`), `color-text-placeholder` (`#96989a`), `color-text-main` (`#32353a`), `color-text-link-sub` (`#686a6d`), `color-text-disabled` (`#dcdddd`).
- **Semantic States**: success: `color-text-green-darken` (`#167453`) · danger: `color-text-red-darken` (`#811a30`) · warning: `color-text-orange-darken` (`#915c0f`) · info: `color-text-link` (`#3959cc`).

## Typography

- **Primary / Display Voice**: `System UI`.
- **Body & UI Controls**: `System UI`.

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#fafafa` cards; separate sibling sections using `#f6f6f6` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#fafafa`) and `1px solid #f6f6f6` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#3959cc` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#3959cc`, ink `#f7f7f8`, (5.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#3959cc`, ink `#f7f7f8`, (5.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#3959cc` with `#f7f7f8` text (5.6:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#fafafa` surface shifts and `#f6f6f6` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
