---
version: alpha
name: Swiss Post Design System
description: "Swiss Post Design System — tokens imported from @swisspost/design-system-styles."
colors:
  post-core-color-brand-postyellow: "#ffcc00"
  post-core-color-brand-black: "#000000"
  post-core-color-brand-white: "#ffffff"
  post-core-color-notification-green: "#107800"
  post-core-color-notification-red: "#b20000"
  post-core-color-notification-orange: "#d93d00"
  post-core-color-notification-blue: "#0050a1"
  post-core-color-notification-green-light: "#c3ddbf"
  post-core-color-notification-red-light: "#ebbfbf"
  post-core-color-notification-orange-light: "#f5cebf"
  post-core-color-notification-blue-light: "#bfd3e7"
  post-core-color-notification-green-night: "#55e543"
  post-core-color-notification-red-night: "#ff7575"
  post-core-color-notification-blue-night: "#d6edff"
  post-core-color-notification-orange-night: "#ff8d13"
  post-core-color-sandgrey-100: "#050400"
  post-core-color-sandgrey-000: "#fcfcfc"
  post-core-color-sandgrey-002: "#fafafa"
  post-core-color-sandgrey-006: "#f0efed"
  post-core-color-sandgrey-012: "#e1e0dc"
  post-core-color-sandgrey-020: "#cdccc8"
  post-core-color-sandgrey-030: "#b4b3af"
  post-core-color-sandgrey-040: "#9b9a96"
  post-core-color-sandgrey-050: "#82817d"
  post-core-color-sandgrey-060: "#696864"
  post-core-color-sandgrey-070: "#504f4b"
  post-core-color-sandgrey-080: "#373632"
  post-core-color-sandgrey-090: "#1e1d19"
  post-core-color-cargo-green: "#00411c"
  post-core-color-cargo-blue: "#aadcff"
  gray-10: "hsl(0, 0%, 90%)"
  gray-20: "hsl(0, 0%, 80%)"
  gray-40: "hsl(0, 0%, 60%)"
  gray-60: "hsl(0, 0%, 40%)"
  gray-80: "hsl(0, 0%, 20%)"
  yellow: "#fc0"
  white: "#fff"
  lighter: "#fafafa"
  light: "#faf9f8"
  gray: "#f4f3f1"
  black: "#000"
  sandgray-80: "#373632"
  focus-light: "#1976c8"
  success: "#2c871d"
  error: "#a51728"
  warning: "#f49e00"
  info: "#cce4ee"
  success-background: "#c0debb"
  error-background: "#ffdade"
  warning-background: "#fce2b2"
  outline-color: "#1976c8"
  table-active-bg: "#fc0"
  webkit-text-fill-color: "#000"
  light-color: "#fff"
  dark-color: "#000"
  enabled-light: "#050400"
  enabled-dark: "#050400"
  hover-light: "#504f4b"
  hover-dark: "#504f4b"
  selected-light: "#050400"
  selected-dark: "#050400"
  disabled-light: "#696864"
  enabled-hcm-light: "#050400"
  enabled-hcm-dark: "#fff"
  selected-hcm-dark: "#fff"
  hover-hcm-dark: "#fff"
  hover-hcm-light: "#050400"
  primary: "#ffcc00"
typography:
  post-core-font-size-10:
    fontSize: 0.625rem
  post-core-font-size-12:
    fontSize: 0.75rem
  post-core-font-size-14:
    fontSize: 0.875rem
  post-core-font-size-16:
    fontSize: 1rem
  post-core-font-size-18:
    fontSize: 1.125rem
  post-core-font-size-20:
    fontSize: 1.25rem
  post-core-font-size-24:
    fontSize: 1.5rem
  post-core-font-size-28:
    fontSize: 1.75rem
  post-core-font-size-32:
    fontSize: 2rem
  post-core-font-size-36:
    fontSize: 2.25rem
  post-core-font-size-40:
    fontSize: 2.5rem
  post-core-font-family-swiss-post:
    fontFamily: "\"Swiss Post Sans\""
  post-device-font-family-default:
    fontFamily: "\"Swiss Post Sans\""
  badge-font-size:
    fontSize: 0.75rem
  badge-font-size-sm:
    fontSize: 10px
  font-size-base:
    fontSize: 1rem
  font-family-monospace:
    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
  post-megadropdown-list-title:
    fontSize: 1.25rem
rounded:
  button: 100px
  card: 8px
  nav: 12px
  default: 12px
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
  btn:
    backgroundColor: "rgba(0,0,0,0)"
    typography:
      fontSize: 0.875rem
      fontWeight: 700
    rounded: 100px
    padding: 0 12px
  card:
    backgroundColor: "#f0efed"
    textColor: "#000000"
    rounded: 8px
  select-default:
    backgroundColor: "#fcfcfc"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#ffcc00"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#ffcc00"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fcfcfc"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#fcfcfc"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#fff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#fcfcfc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Swiss Post Design System

## Overview

**Swiss Post Design System** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#ffcc00` brand accent.

Typography centers cleanly on `Swiss Post Sans` (40px display down to 16px body), unified by `12px` base corner radius and stepped `#fff` -> `#fcfcfc` surface layering.

Maintained by **Swiss Post**. Source: published token package (https://design-system.post.ch), package `@swisspost/design-system-styles`. Inventory: **68** colors, **18** typography steps, and **10** documented components (Apache-2.0 license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fcfcfc` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ffcc00` (1.5:1 vs canvas; pair with `#0b0b0c` foreground ink for 13.0:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `post-core-color-notification-blue` (`#0050a1`), `post-core-color-notification-blue-light` (`#bfd3e7`), `post-core-color-notification-blue-night` (`#d6edff`), `post-core-color-cargo-blue` (`#aadcff`), `focus-light` (`#1976c8`), `outline-color` (`#1976c8`).
- **Neutral Ramp**: `post-core-color-brand-black` (`#000000`), `post-core-color-brand-white` (`#ffffff`), `post-core-color-sandgrey-100` (`#050400`), `post-core-color-sandgrey-000` (`#fcfcfc`), `post-core-color-sandgrey-002` (`#fafafa`), `post-core-color-sandgrey-006` (`#f0efed`).
- **Semantic States**: success: `post-core-color-notification-green` (`#107800`) · danger: `post-core-color-notification-red` (`#b20000`) · warning: `post-core-color-brand-postyellow` (`#ffcc00`) · info: `info` (`#cce4ee`).

## Typography

- **Primary / Display Voice**: `"Swiss Post Sans"` (top step `post-core-font-size-40`: 2.5rem, weight 600).
- **Body & UI Controls**: `"Swiss Post Sans"` (`post-device-font-family-default`: 16px, weight 400).
- **Monospace / Technical Labels**: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` (`font-family-monospace`: 16px).
- **Scale Steps (18)**: `post-core-font-size-40` (2.5rem), `post-core-font-size-36` (2.25rem), `post-core-font-size-32` (2rem), `post-core-font-size-28` (1.75rem), `post-core-font-size-24` (1.5rem), `post-core-font-size-20` (1.25rem), `post-megadropdown-list-title` (1.25rem), `post-core-font-size-18` (1.125rem).

## Layout

- **Grid & Control Spacing**: Derived from 10 component tokens with documented paddings: `0 12px`, `8px 12px`, `2px`, `6px 12px`, `12px 14px`.
- **Hierarchy**: Group controls cleanly within `#fcfcfc` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#fcfcfc`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ffcc00` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `12px` (Buttons `100px` · Cards `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`btn` (button)**: bg `rgba(0,0,0,0)`, radius `100px`, padding `0 12px`, border `1px solid rgba(0,0,0,0)`.
- **`card` (card)**: bg `#f0efed`, ink `#000000`, (18.3:1), radius `8px`, border `1px solid  #b4b3af)`.
- **`select-default` (select)**: bg `#fcfcfc`, ink `#0b0b0c`, (19.2:1), radius `12px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#ffcc00`, ink `#0b0b0c`, (13.0:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#ffcc00`, ink `#0b0b0c`, (13.0:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fcfcfc`, ink `#0b0b0c`, (19.2:1), radius `12px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fcfcfc`, ink `#0b0b0c`, (19.2:1), radius `12px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `12px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fcfcfc`, ink `#0b0b0c`, (19.2:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ffcc00` with `#0b0b0c` text (13.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Swiss Post Sans` headings with `Swiss Post Sans` body copy using documented weights and scale steps.
- Apply `12px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#fcfcfc` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `12px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
