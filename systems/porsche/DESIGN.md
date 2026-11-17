---
version: alpha
name: Porsche Design System
description: "Crisp light (#fff) canvas, Porsche Next typography, #1A44EA brand accent, and 2px corner geometry"
colors:
  color-focus-dark: "#1A44EA"
  color-focus-light: "#1A44EA"
  color-canvas-light: "#fff"
  pds-theme-light-state-hover: "hsla(236, 6.4%, 51%, 0.148)"
  pds-theme-light-state-active: "hsla(236, 6.4%, 51%, 0.148)"
  pds-theme-light-state-focus: "#1a44ea"
  pds-theme-light-state-disabled: "hsla(233,6.6%,23.9%,0.412)"
  pds-theme-dark-state-hover: "hsla(240, 2.2%, 44.1%, 0.228)"
  pds-theme-dark-state-active: "hsla(240, 2.2%, 44.1%, 0.228)"
  pds-theme-dark-state-focus: "#1a44ea"
  pds-theme-dark-state-disabled: "hsla(240,1.5%,61.8%,0.302)"
  background-light: "rgba(255,255,255,.01)"
  background-dark: "rgba(0,0,0,.01)"
  color: "#fff"
  theme-color-light: "#FFF"
  theme-color-dark: "#0E1418"
  background: "rgba(0, 0, 255, 0.1)"
  primary: "#1A44EA"
typography:
  pds-font-size-display-small:
    fontSize: "clamp(1.8rem, 2.41vw + 1.32rem, 4.21rem)"
    fontFamily: null
  pds-font-size-display-medium:
    fontSize: "clamp(2.03rem, 3.58vw + 1.31rem, 5.61rem)"
    fontFamily: null
  pds-font-size-display-large:
    fontSize: "clamp(2.28rem, 5.2vw + 1.24rem, 7.48rem)"
    fontFamily: null
  pds-font-size-text-xx-small:
    fontSize: 0.75rem
  pds-font-size-text-x-small:
    fontSize: 0.875rem
  pds-font-size-text-small:
    fontSize: 1rem
  pds-font-size-text-medium:
    fontSize: "clamp(1.13rem, 0.21vw + 1.08rem, 1.33rem)"
  pds-font-size-text-large:
    fontSize: "clamp(1.27rem, 0.51vw + 1.16rem, 1.78rem)"
  pds-font-size-text-x-large:
    fontSize: "clamp(1.42rem, 0.94vw + 1.23rem, 2.37rem)"
  pds-font-size-heading-small:
    fontSize: 1rem
  pds-font-size-heading-medium:
    fontSize: "clamp(1.13rem, 0.21vw + 1.08rem, 1.33rem)"
  pds-font-size-heading-large:
    fontSize: "clamp(1.27rem, 0.51vw + 1.16rem, 1.78rem)"
  pds-font-size-heading-x-large:
    fontSize: "clamp(1.42rem, 0.94vw + 1.23rem, 2.37rem)"
  pds-font-size-heading-xx-large:
    fontSize: "clamp(1.6rem, 1.56vw + 1.29rem, 3.16rem)"
  pds-font-family:
    fontFamily: "\"Porsche Next\", \"Arial Narrow\", Arial, \"Heiti SC\", SimHei, sans-serif"
  font-sans:
    fontFamily: "\"Porsche Next\", \"Apple SD Gothic Neo\", \"Malgun Gothic\", \"Noto Sans KR\", \"Arial Narrow\", Arial, sans-serif"
rounded:
  button: 2px
  input: 2px
  card: 6px
  badge: 999px
  nav: 2px
  default: 2px
icons:
  library: Porsche Icons
  package: "@porsche-design-system/components-js"
  style: outline
  grid: 24
  strokeWidth: 1.5
  strokeLinecap: round
  strokeLinejoin: round
  source: curated
  url: "https://designsystem.porsche.com"
components:
  button-primary:
    backgroundColor: "#1A44EA"
    textColor: "#ffffff"
    rounded: 2px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 2px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 2px
    padding: 10px 18px
  input-default:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 2px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#1A44EA"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 2px
    padding: 10px 16px
  select-default:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#1A44EA"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#1A44EA"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#fff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Porsche Design System

## Overview

**Porsche Design System** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#1A44EA` brand accent.

Typography centers cleanly on `Porsche Next` (120px display down to 16px body), unified by `2px` base corner radius and hairline `1px` structural borders.

Maintained by **Porsche**. Source: published token package (https://github.com/porsche-design-system/porsche-design-system), repo https://github.com/porsche-design-system/porsche-design-system, package `@porsche-design-system/components-js`, frameworks: web-components, react, angular, vue. Inventory: **18** colors, **16** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#1A44EA` (6.9:1 vs canvas; pair with `#f7f7f8` foreground ink for 6.4:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-focus-dark` (`#1A44EA`), `color-focus-light` (`#1A44EA`), `pds-theme-light-state-focus` (`#1a44ea`), `pds-theme-dark-state-focus` (`#1a44ea`), `primary` (`#1A44EA`).
- **Neutral Ramp**: `color-canvas-light` (`#fff`), `color` (`#fff`), `theme-color-light` (`#FFF`), `theme-color-dark` (`#0E1418`).

## Typography

- **Primary / Display Voice**: `"Porsche Next", "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", "Arial Narrow", Arial, sans-serif` (top step `pds-font-size-display-large`: clamp(2.28rem, 5.2vw + 1.24rem, 7.48rem), weight 600).
- **Body & UI Controls**: `"Porsche Next", "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", "Arial Narrow", Arial, sans-serif` (`pds-font-size-text-small`: 1rem, weight 400).
- **Scale Steps (16)**: `pds-font-size-display-large` (clamp(2.28rem, 5.2vw + 1.24rem, 7.48rem)), `pds-font-size-display-medium` (clamp(2.03rem, 3.58vw + 1.31rem, 5.61rem)), `pds-font-size-display-small` (clamp(1.8rem, 2.41vw + 1.32rem, 4.21rem)), `pds-font-size-heading-xx-large` (clamp(1.6rem, 1.56vw + 1.29rem, 3.16rem)), `pds-font-size-text-x-large` (clamp(1.42rem, 0.94vw + 1.23rem, 2.37rem)), `pds-font-size-heading-x-large` (clamp(1.42rem, 0.94vw + 1.23rem, 2.37rem)), `pds-font-size-text-large` (clamp(1.27rem, 0.51vw + 1.16rem, 1.78rem)), `pds-font-size-heading-large` (clamp(1.27rem, 0.51vw + 1.16rem, 1.78rem)).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#fff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#fff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#1A44EA` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `2px` (Buttons `2px` · Inputs `2px` · Cards `6px` · Badges `999px` · Navigation `2px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `6px` container.
- **Iconography & SVGs**: Porsche Icons (`@porsche-design-system/components-js`) on a `24x24` grid (outline, stroke `1.5px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#1A44EA`, ink `#ffffff`, (6.9:1), radius `2px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `2px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `2px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `2px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `6px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#1A44EA`, ink `#ffffff`, (6.9:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `2px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#1A44EA`, ink `#f7f7f8`, (6.4:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#1A44EA`, ink `#f7f7f8`, (6.4:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#1A44EA` with `#f7f7f8` text (6.4:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Porsche Next` headings with `Porsche Next` body copy using documented weights and scale steps.
- Apply `2px` base geometry across inputs and buttons (6px on outer containers).
- Separate containers via `#fff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `2px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
