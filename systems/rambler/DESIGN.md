---
version: alpha
name: Rambler
description: "Crisp light (#f5f7f8) canvas, Inter typography, #315efb brand accent, and 8px corner geometry"
colors:
  grey-default: "#ccc"
  grey-disabled: "#dde0e8"
  grey-background: "#f5f7f8"
  grey-light-background: "#eef2f4"
  grey-outline: "#b0b4c2"
  grey-field-outline: "#dde0e8"
  grey-icon-background: "#f3f4f7"
  grey-placeholder: "#a4a9b8"
  grey-field-icon: "#B0B4C2"
  grey-disabled-text: "#afb5c9"
  primary: "#315efb"
  primary-dark: "#274bc8"
  danger: "#ff564e"
  success: "#28bc00"
  warn: "#ffc000"
  black: "#000"
  full-dark: "#000"
  blue-dark: "#343b4c"
  blue-light: "#d9f3ff"
  arrow-blue-dark: "#6674a6"
  snackbar-blue-dark: "#3d4454"
  purple-deep: "#3e217d"
  disabled: "#dde0e8"
  background: "#f5f7f8"
  light-background: "#eef2f4"
  outline: "#b0b4c2"
  field-outline: "#dde0e8"
  icon-background: "#f3f4f7"
  placeholder: "#a4a9b8"
  field-icon: "#B0B4C2"
  disabled-text: "#afb5c9"
  colors-profile-border: "#ffffff"
  colors-default: "#8d96b2"
  badge-border: "#dcdfe7"
  badge-color: "#c6cad8"
  colors-background: "#dcdfe7"
  profile-border: "#ffffff"
  thumb: "#dcdfe7"
  color: "#c6cad8"
  character-counter-warn-color: "#ffc000"
  character-counter-error-color: "#ff564e"
typography:
  display-xl:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
  heading-lg:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  heading-md:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.42
  caption:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.35
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
    backgroundColor: "#315efb"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ff564e"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#eef2f4"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#eef2f4"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#315efb"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#28bc00"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#eef2f4"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#eef2f4"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#315efb"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#315efb"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#eef2f4"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#eef2f4"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#f5f7f8"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#f5f7f8"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#eef2f4"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Rambler

## Overview

**Rambler** is a light-first design system anchored on `#f5f7f8` canvas surfaces with `#0b0b0c` primary ink (18.3:1 contrast) and `#315efb` brand accent.

Typography centers cleanly on `Inter` (36px display down to 16px body), unified by `8px` base corner radius and stepped `#f5f7f8` -> `#eef2f4` surface layering.

Source: published token package (https://github.com/rambler-digital-solutions/rambler-ui), repo https://github.com/rambler-digital-solutions/rambler-ui, frameworks: css. Inventory: **41** colors, **6** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#f5f7f8` — base application backdrop (light theme).
- **Surface (`surface`)**: `#eef2f4` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (18.3:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#315efb` (4.7:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.8:1 contrast).
- **Structural Border (`border`)**: `#dcdfe7` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `grey-disabled-text` (`#afb5c9`), `primary` (`#315efb`), `primary-dark` (`#274bc8`), `blue-light` (`#d9f3ff`), `arrow-blue-dark` (`#6674a6`), `purple-deep` (`#3e217d`).
- **Neutral Ramp**: `grey-default` (`#ccc`), `grey-disabled` (`#dde0e8`), `grey-background` (`#f5f7f8`), `grey-light-background` (`#eef2f4`), `grey-outline` (`#b0b4c2`), `grey-field-outline` (`#dde0e8`).
- **Semantic States**: success: `success` (`#28bc00`) · danger: `danger` (`#ff564e`) · warning: `warn` (`#ffc000`).

## Typography

- **Primary / Display Voice**: `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (top step `display-xl`: 36px, weight 700, line-height 1.2).
- **Body & UI Controls**: `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (`body`: 16px, weight 400, line-height 1.5).
- **Scale Steps (6)**: `display-xl` (36px, w700), `heading-lg` (24px, w600), `heading-md` (18px, w600), `body` (16px, w400), `body-sm` (14px, w400), `caption` (12px, w500).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#eef2f4` cards; separate sibling sections using `#dcdfe7` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#f5f7f8` -> `#eef2f4`) and `1px solid #dcdfe7` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#315efb` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#315efb`, ink `#ffffff`, (5.1:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ff564e`, ink `#0b0b0c`, (6.3:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#eef2f4`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#eef2f4`, ink `#0b0b0c`, (17.5:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#315efb`, ink `#ffffff`, (5.1:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#28bc00`, ink `#0b0b0c`, (7.8:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#eef2f4`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#eef2f4`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#315efb`, ink `#f7f7f8`, (4.8:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#315efb`, ink `#f7f7f8`, (4.8:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#eef2f4`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#eef2f4`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#f5f7f8`, ink `#0b0b0c`, (18.3:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#f5f7f8`, (18.3:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#eef2f4`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#f5f7f8` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#315efb` with `#f7f7f8` text (4.8:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Inter` headings with `Inter` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#eef2f4` surface shifts and `#dcdfe7` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
