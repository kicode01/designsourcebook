---
version: alpha
name: Morningstar Design System
description: "Crisp light (#ffffff) canvas, Times New Roman typography, #0077cf brand accent, and pill & expressive rounded surfaces"
colors:
  canvas-text: "#000000"
  header-bg: "#ffffff"
  nav-bg: "#f2f2f2"
  h2-text: "#1e1e1e"
  link-bg: "#272520"
  link-text: "#f7f5f2"
  link-text-1: "#5e5e5e"
  link-bg-2: "#0077cf"
  link-border: "#808080"
  card-border: "#cccccc"
  alert-text: "#f8fbff"
  alert-border: "#dbd8d4"
  alert-bg: "#4560db"
  primary: "#0077cf"
typography:
  header:
    fontFamily: "\"Times New Roman\""
    fontSize: 16px
    fontWeight: 400
  nav:
    fontFamily: "\"Times New Roman\""
    fontSize: 16px
    fontWeight: 400
  h1:
    fontFamily: "MorningstarIntrinsic, HelveticaNeue, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 45px
    fontWeight: 300
    lineHeight: 1.11
  h2:
    fontFamily: "MorningstarIntrinsic, HelveticaNeue, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.13
  h3:
    fontFamily: "MorningstarIntrinsic, HelveticaNeue, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 23px
    fontWeight: 500
    lineHeight: 1.17
  body:
    fontFamily: "MorningstarIntrinsic, HelveticaNeue, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 20px
    fontWeight: 300
    lineHeight: 1.3
rounded:
  button: 24px
  card: 6px
  input: 24px
  badge: 999px
  nav: 24px
  default: 24px
icons:
  library: Inline System SVGs
  package: null
  style: outline
  grid: 15
  strokeWidth: 1.5
  strokeLinecap: round
  strokeLinejoin: round
  source: observed
components:
  button:
    textColor: "#000000"
  button-2:
    textColor: "#5e5e5e"
    padding: 1px 6px
  button-3:
    backgroundColor: "#0077cf"
    textColor: "#ffffff"
    rounded: 24px
    padding: 8px 24px
  button-4:
    textColor: "#5e5e5e"
    rounded: 24px
    padding: 4px 16px
  card:
    backgroundColor: "#ffffff"
    textColor: "#000000"
    rounded: 6px
    padding: 16px
  card-2:
    textColor: "#1e1e1e"
  card-3:
    textColor: "#000000"
  alert:
    textColor: "#f8fbff"
  alert-2:
    backgroundColor: "#4560db"
    textColor: "#f8fbff"
    padding: 10px 10px 10px 16px
  alert-3:
    backgroundColor: "#272520"
    textColor: "#f7f5f2"
    padding: 10px 16px
  input-default:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 24px
    padding: 9px 13px
  badge-brand:
    backgroundColor: "#0077cf"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 24px
    padding: 10px 16px
  select-default:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#0077cf"
    textColor: "#ffffff"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#0077cf"
    textColor: "#ffffff"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 6px 12px
  table-grid:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 12px
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

# Morningstar Design System

## Overview

**Morningstar Design System** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#0077cf` brand accent.

Typography centers cleanly on `MorningstarIntrinsic` (45px display down to 20px body), unified by `24px` base corner radius and hairline `1px` structural borders.

Maintained by **Morningstar**. Source: live stylesheet extraction (http://designsystem.morningstar.com/), repo https://github.com/Morningstar/morningstar-design-system, frameworks: vue, css. Inventory: **14** colors, **6** typography steps, and **21** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#ffffff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#0077cf` (4.6:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.3:1 contrast).
- **Structural Border (`border`)**: `#cccccc` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `primary` (`#0077cf`).
- **Neutral Ramp**: `canvas-text` (`#000000`), `header-bg` (`#ffffff`), `nav-bg` (`#f2f2f2`), `h2-text` (`#1e1e1e`), `link-bg` (`#272520`), `link-text` (`#f7f5f2`).
- **Semantic States**: danger: `alert-bg` (`#4560db`) · info: `link-bg-2` (`#0077cf`).

## Typography

- **Primary / Display Voice**: `MorningstarIntrinsic, HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif` (top step `h1`: 45px, weight 300, line-height 1.11).
- **Body & UI Controls**: `MorningstarIntrinsic, HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif` (`body`: 20px, weight 300, line-height 1.3).
- **Scale Steps (6)**: `h1` (45px, w300), `h2` (32px, w500), `h3` (23px, w500), `body` (20px, w300), `header` (16px, w400), `nav` (16px, w400).

## Layout

- **Grid & Control Spacing**: Derived from 21 component tokens with documented paddings: `1px 6px`, `8px 24px`, `4px 16px`, `16px`, `10px 10px 10px 16px`.
- **Hierarchy**: Group controls cleanly within `#ffffff` cards; separate sibling sections using `#cccccc` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#ffffff`) and `1px solid #cccccc` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#0077cf` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `24px` (Inputs `24px` · Cards `6px` · Badges `999px` · Navigation `24px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `6px` container.
- **Iconography & SVGs**: Inline System SVGs on a `15x15` grid (outline, stroke `1.5px`, `round` caps).

## Components

- **`button` (button)**: ink `#000000`.
- **`button-2` (button)**: ink `#5e5e5e`, padding `1px 6px`.
- **`button-3` (button)**: bg `#0077cf`, ink `#ffffff`, (4.6:1), radius `24px`, padding `8px 24px`.
- **`button-4` (button)**: ink `#5e5e5e`, radius `24px`, padding `4px 16px`, border `1px solid rgb(128, 128, 128)`.
- **`card` (card)**: bg `#ffffff`, ink `#000000`, (21.0:1), radius `6px`, padding `16px`, border `1px solid rgb(204, 204, 204)`.
- **`card-2` (card)**: ink `#1e1e1e`, border `2px solid rgba(0, 0, 0, 0)`.
- **`card-3` (card)**: ink `#000000`.
- **`alert` (alert)**: ink `#f8fbff`, border `1px solid rgb(219, 216, 212)`.
- **`alert-2` (alert)**: bg `#4560db`, ink `#f8fbff`, (5.1:1), padding `10px 10px 10px 16px`.
- **`alert-3` (alert)**: bg `#272520`, ink `#f7f5f2`, (14.1:1), padding `10px 16px`.
- **`input-default` (input)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `24px`, padding `9px 13px`.
- **`badge-brand` (badge)**: bg `#0077cf`, ink `#ffffff`, (4.6:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `24px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `12px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#0077cf`, ink `#f7f7f8`, (4.3:1), radius `999px`, padding `2px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#0077cf` with `#f7f7f8` text (4.3:1) for primary CTAs, active tabs, and focus outlines.
- Pair `MorningstarIntrinsic` headings with `MorningstarIntrinsic` body copy using documented weights and scale steps.
- Apply `24px` base geometry across inputs and buttons (6px on outer containers).
- Separate containers via `#ffffff` surface shifts and `#cccccc` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `24px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
