---
version: alpha
name: Helsinki Design System
description: "City of Helsinki Helsinki Design System — tokens imported from hds-design-tokens."
colors:
  color-brick: "#bd2719"
  color-brick-light: "#ffeeed"
  color-brick-medium-light: "#facbc8"
  color-brick-dark: "#800e04"
  color-bus: "#0000bf"
  color-bus-light: "#f0f0ff"
  color-bus-medium-light: "#ccccff"
  color-bus-dark: "#00005e"
  color-coat-of-arms: "#0072c6"
  color-coat-of-arms-light: "#e6f4ff"
  color-coat-of-arms-medium-light: "#b5daf7"
  color-coat-of-arms-dark: "#005799"
  color-copper: "#00d7a7"
  color-copper-light: "#cffaf1"
  color-copper-medium-light: "#9ef0de"
  color-copper-dark: "#00a17d"
  color-engel: "#ffe977"
  color-engel-light: "#fff9db"
  color-engel-medium-light: "#fff3b8"
  color-engel-dark: "#dbc030"
  color-fog: "#9fc9eb"
  color-fog-light: "#e8f3fc"
  color-fog-medium-light: "#d0e6f7"
  color-fog-dark: "#72a5cf"
  color-gold: "#c2a251"
  color-gold-light: "#f7f2e4"
  color-gold-medium-light: "#e8d7a7"
  color-gold-dark: "#9e823c"
  color-metro: "#fd4f00"
  color-metro-light: "#ffeee6"
  color-metro-medium-light: "#ffcab3"
  color-metro-dark: "#bd2f00"
  color-silver: "#dedfe1"
  color-silver-light: "#f7f7f8"
  color-silver-medium-light: "#efeff0"
  color-silver-dark: "#b0b8bf"
  color-summer: "#ffc61e"
  color-summer-light: "#fff4d4"
  color-summer-medium-light: "#ffe49c"
  color-summer-dark: "#cc9200"
  color-suomenlinna: "#f5a3c7"
  color-suomenlinna-light: "#fff0f7"
  color-suomenlinna-medium-light: "#ffdbeb"
  color-suomenlinna-dark: "#e673a5"
  color-tram: "#008741"
  color-tram-light: "#dff7eb"
  color-tram-medium-light: "#a3e3c2"
  color-tram-dark: "#006631"
  color-focus-outline: "#0072c6"
  color-black: "#000000"
  color-white: "#ffffff"
  color-black-5: "#f2f2f2"
  color-black-10: "#e6e6e6"
  color-black-20: "#cccccc"
  color-black-30: "#b3b3b3"
  color-black-40: "#999999"
  color-black-50: "#808080"
  color-black-60: "#595959"
  color-black-70: "#4d4d4d"
  color-black-80: "#333333"
  color-black-90: "#1a1a1a"
  color-error: "#b01038"
  color-error-light: "#f6e2e6"
  color-error-dark: "#8d0d2d"
  color-success: "#007a64"
  color-success-light: "#e2f5f3"
  color-success-dark: "#006250"
  color-alert: "#ffda07"
  color-alert-light: "#fff4b4"
  color-alert-dark: "#c27900"
  color-info: "#0062b9"
  color-info-light: "#e5eff8"
  color-info-dark: "#004f94"
  primary: "#00d7a7"
typography:
  fontsize-heading-xxl:
    fontSize: 4rem
  fontsize-heading-xl:
    fontSize: 3rem
  fontsize-heading-xl-mobile:
    fontSize: 2.5rem
  fontsize-heading-l:
    fontSize: 2rem
  fontsize-heading-m:
    fontSize: 1.5rem
  fontsize-heading-s:
    fontSize: 1.25rem
  fontsize-heading-xs:
    fontSize: 1.125rem
  fontsize-heading-xxs:
    fontSize: 1rem
  fontsize-body-s:
    fontSize: 0.875rem
  fontsize-body-m:
    fontSize: 1rem
  fontsize-body-l:
    fontSize: 1.125rem
  fontsize-body-xl:
    fontSize: 1.25rem
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
    backgroundColor: "#ffeeed"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#00d7a7"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#00d7a7"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#ffeeed"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#ffeeed"
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
    backgroundColor: "#ffeeed"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Helsinki Design System

## Overview

**Helsinki Design System** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#00d7a7` brand accent.

Typography centers cleanly on `System UI` (64px display down to 20px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#ffeeed` surface layering.

Maintained by **City of Helsinki**. Source: published token package (https://github.com/City-of-Helsinki/helsinki-design-system#readme), package `hds-design-tokens`. Inventory: **74** colors, **12** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#ffeeed` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#00d7a7` (1.9:1 vs canvas; pair with `#0b0b0c` foreground ink for 10.6:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-brick` (`#bd2719`), `color-brick-medium-light` (`#facbc8`), `color-brick-dark` (`#800e04`), `color-bus` (`#0000bf`), `color-bus-medium-light` (`#ccccff`), `color-bus-dark` (`#00005e`).
- **Neutral Ramp**: `color-brick-light` (`#ffeeed`), `color-bus-light` (`#f0f0ff`), `color-fog-light` (`#e8f3fc`), `color-gold-light` (`#f7f2e4`), `color-silver` (`#dedfe1`), `color-silver-light` (`#f7f7f8`).
- **Semantic States**: success: `color-success` (`#007a64`) · danger: `color-error` (`#b01038`) · info: `color-info` (`#0062b9`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `fontsize-heading-xxl`: 4rem, weight 600).
- **Body & UI Controls**: `system-ui` (`fontsize-body-xl`: 1.25rem, weight 400).
- **Scale Steps (12)**: `fontsize-heading-xxl` (4rem), `fontsize-heading-xl` (3rem), `fontsize-heading-xl-mobile` (2.5rem), `fontsize-heading-l` (2rem), `fontsize-heading-m` (1.5rem), `fontsize-heading-s` (1.25rem), `fontsize-body-xl` (1.25rem), `fontsize-heading-xs` (1.125rem).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#ffeeed` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#ffeeed`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#00d7a7` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#ffeeed`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#00d7a7`, ink `#0b0b0c`, (10.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#00d7a7`, ink `#0b0b0c`, (10.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#ffeeed`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#ffeeed`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#ffeeed`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#00d7a7` with `#0b0b0c` text (10.6:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#ffeeed` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
