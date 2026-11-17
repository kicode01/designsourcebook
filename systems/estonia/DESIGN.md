---
version: alpha
name: Estonia Country Design Guidelines
description: "Nordic national digital identity, Aino headline typography and cobalt blue surfaces"
colors:
  white-a-white: "#fff"
  brand-navy: "#002d72"
  dark-main: "#0030de"
  dark-darkest: "#000087"
  dark-contrast: "#000087"
  dark-highlight: "#0062f5"
  light-main: "#cee2fd"
  light-lightest: "#fceec8"
  light-subtle: "#e8f1fe"
  accent: "#00c3ff"
  dark-focus: "#0062f5"
  badge-open-bg: "#e6f2ec"
  badge-open-text: "#067f3e"
  badge-upcoming-bg: "#e8f1fe"
  badge-upcoming-text: "#0062f5"
  fg-text-main-inverted: "#fff"
  fg-text-on-light: "#0e172a"
  fg-text-main: "#0e172a"
  fg-text-muted: "#3d4b5e"
  fg-text-muted-2: "#575a5d"
  fg-text-disabled: "#b6b8b9"
  sector-footer-text: "#323334"
  fg-text-sector-body: "#323334"
  bg-main: "#f1f5f9"
  bg-surface: "#fff"
  bg-neutral-subtle: "#f6f7f7"
  border-main: "#f1f5f9"
  border-contrast: "#cbd5e1"
  border-strong: "#64758b"
  border-checkbox: "#808284"
  ui-on-brand: "#fff"
  ui-error: "#dc2626"
  success-main: "#157934"
  error-main: "#cc1e1e"
  ui-on-neutral: "#fff"
  ui-on-neutral-subtle: "#0e172a"
  disabled-text: "#94a3b8"
  accessibility-focus-alpha: "#0062f5"
  ui-brand: "#fff"
  sector-custom-color: "#0030de"
  primary: "#002d72"
typography:
  font-sizes-text-xs:
    fontSize: ".75rem"
  font-sizes-text-sm:
    fontSize: ".875rem"
  font-sizes-text-md:
    fontSize: 1rem
  font-sizes-text-lg:
    fontSize: 1.125rem
  font-sizes-button-md:
    fontSize: 1rem
  font-sizes-text-xl:
    fontSize: 1.25rem
  font-sizes-heading-xxs:
    fontSize: 1rem
  font-sizes-heading-xs:
    fontSize: 1.125rem
  font-sizes-heading-sm:
    fontSize: 1.25rem
  font-sizes-heading-md:
    fontSize: 1.5rem
  font-sizes-heading-lg:
    fontSize: 2rem
  font-sizes-heading-xl:
    fontSize: 2.75rem
  font-sizes-heading-xxl:
    fontSize: 3.5rem
  font-sizes-heading-max:
    fontSize: 4.5rem
  ainobodyfont-f81f1637-module-8-q-ig-class-name:
    fontFamily: "ainoBodyFont, \"ainoBodyFont Fallback\""
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
  grid: 24
  strokeWidth: 2
  strokeLinecap: round
  strokeLinejoin: round
  source: observed
components:
  button-primary:
    backgroundColor: "#002d72"
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
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#002d72"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#157934"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#002d72"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#002d72"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#f1f5f9"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#f1f5f9"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Estonia Country Design Guidelines

## Overview

**Estonia Country Design Guidelines** is a light-first design system anchored on `#f1f5f9` canvas surfaces with `#0b0b0c` primary ink (18.0:1 contrast) and `#002d72` brand accent.

Typography centers cleanly on `ainoBodyFont` (72px display down to 16px body), unified by `8px` base corner radius and stepped `#f1f5f9` -> `#fff` surface layering.

Maintained by **Estonia**. Source: live stylesheet extraction (https://brand.estonia.ee), frameworks: css. Inventory: **41** colors, **15** typography steps, and **16** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#f1f5f9` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fff` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (18.0:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#002d72` (11.8:1 vs canvas; pair with `#f7f7f8` foreground ink for 12.1:1 contrast).
- **Structural Border (`border`)**: `#cbd5e1` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `brand-navy` (`#002d72`), `dark-main` (`#0030de`), `dark-darkest` (`#000087`), `dark-contrast` (`#000087`), `dark-highlight` (`#0062f5`), `light-main` (`#cee2fd`).
- **Neutral Ramp**: `white-a-white` (`#fff`), `light-subtle` (`#e8f1fe`), `badge-open-bg` (`#e6f2ec`), `badge-upcoming-bg` (`#e8f1fe`), `fg-text-main-inverted` (`#fff`), `fg-text-muted-2` (`#575a5d`).
- **Semantic States**: success: `success-main` (`#157934`) · danger: `ui-error` (`#dc2626`).

## Typography

- **Primary / Display Voice**: `ainoBodyFont, "ainoBodyFont Fallback"` (top step `font-sizes-heading-max`: 4.5rem, weight 600).
- **Body & UI Controls**: `ainoBodyFont, "ainoBodyFont Fallback"` (`ainobodyfont-f81f1637-module-8-q-ig-class-name`: 16px, weight 400).
- **Scale Steps (15)**: `font-sizes-heading-max` (4.5rem), `font-sizes-heading-xxl` (3.5rem), `font-sizes-heading-xl` (2.75rem), `font-sizes-heading-lg` (2rem), `font-sizes-heading-md` (1.5rem), `font-sizes-text-xl` (1.25rem), `font-sizes-heading-sm` (1.25rem), `font-sizes-text-lg` (1.125rem).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#fff` cards; separate sibling sections using `#cbd5e1` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#f1f5f9` -> `#fff`) and `1px solid #cbd5e1` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#002d72` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `24x24` grid (outline, stroke `2px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#002d72`, ink `#ffffff`, (13.0:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#002d72`, ink `#ffffff`, (13.0:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#157934`, ink `#ffffff`, (5.5:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#002d72`, ink `#f7f7f8`, (12.1:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#002d72`, ink `#f7f7f8`, (12.1:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#f1f5f9`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#f1f5f9`, (18.0:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#f1f5f9` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#002d72` with `#f7f7f8` text (12.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `ainoBodyFont` headings with `ainoBodyFont` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#fff` surface shifts and `#cbd5e1` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
