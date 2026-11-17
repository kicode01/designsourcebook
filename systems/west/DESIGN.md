---
version: alpha
name: West Midlands Network Design System
description: "Crisp light (#ffffff) canvas, system-ui typography, #3c1053 brand accent, and 8px corner geometry"
colors:
  white: "#ffffff"
  black: "#000000"
  primary: "#3c1053"
  secondary: "#9d5baf"
  bus: "#ea0029"
  metro: "#0075c9"
  railway: "#e07709"
  sus-travel: "#658d1b"
  roads: "#df1683"
  text: "#080607"
  cta: "#1d7bbf"
  error: "#d4351c"
  warning: "#b75e00"
  success: "#00703c"
  information: "#84329b"
  disable: "#676869"
  planned-disruption: "#ffdd00"
  border: "#979797"
  dark-grey: "#2b2b2b"
typography:
  base-font-size:
    fontSize: 16px
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#3c1053"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#d4351c"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#3c1053"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#00703c"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# West Midlands Network Design System

## Overview

**West Midlands Network Design System** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#3c1053` brand accent.

Typography centers cleanly on `System UI` (16px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **West Midlands Network**. Source: published token package (https://github.com/wmcadigital/wmn-design-system), repo https://github.com/wmcadigital/wmn-design-system, frameworks: css. Inventory: **19** colors, **1** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#ffffff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#3c1053` (15.1:1 vs canvas; pair with `#f7f7f8` foreground ink for 14.1:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `primary` (`#3c1053`), `secondary` (`#9d5baf`), `bus` (`#ea0029`), `metro` (`#0075c9`), `railway` (`#e07709`), `sus-travel` (`#658d1b`).
- **Neutral Ramp**: `white` (`#ffffff`), `black` (`#000000`), `text` (`#080607`), `disable` (`#676869`), `border` (`#979797`), `dark-grey` (`#2b2b2b`).
- **Semantic States**: success: `success` (`#00703c`) · danger: `error` (`#d4351c`) · warning: `warning` (`#b75e00`) · info: `information` (`#84329b`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `base-font-size`: 16px, weight 600).
- **Body & UI Controls**: `system-ui` (`base-font-size`: 16px, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#ffffff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#ffffff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#3c1053` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#3c1053`, ink `#ffffff`, (15.1:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#d4351c`, ink `#ffffff`, (4.9:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#3c1053`, ink `#ffffff`, (15.1:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#00703c`, ink `#ffffff`, (6.2:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#3c1053` with `#f7f7f8` text (14.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#ffffff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
