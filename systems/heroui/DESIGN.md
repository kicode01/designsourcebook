---
version: alpha
name: HeroUI
description: "HeroUI — tokens read from https://github.com/heroui-inc/heroui."
colors:
  white: "#ffffff"
  black: "#000000"
  snow: "#fcfcfc"
  eclipse: "#18181b"
  accent: "#0485f7"
  success: "#17c964"
  background: "#f5f5f5"
  surface-secondary: "#efeff0"
  surface-tertiary: "#eaeaeb"
  muted: "#71717a"
  default: "#ebebec"
  field-foreground: "#18181b"
  warning: "#f5a524"
  danger: "#ff383c"
  border: "#dedee0"
  separator: "#e4e4e7"
  surface: "#18181b"
  overlay: "#18181b"
  field-background: "#18181b"
  segment: "#46464c"
  color-background: "hsl(0, 0%, 14.5%)"
  color-foreground: "hsl(0, 0%, 98.4%)"
  color-accent: "hsl(264.1, 100%, 55.1%)"
  color-danger: "hsl(25.3, 100%, 63.7%)"
  color-success: "hsl(163.2, 100%, 76.5%)"
  color-warning: "hsl(86.0, 100%, 79.5%)"
  primary: "#0485f7"
typography:
  font-sans:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
  font-mono:
    fontFamily: "ui-monospace, monospace"
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
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#0485f7"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#0485f7"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#efeff0"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#efeff0"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# HeroUI

## Overview

**HeroUI** is a light-first design system anchored on `#efeff0` canvas surfaces with `#0b0b0c` primary ink (17.1:1 contrast) and `#0485f7` brand accent.

Typography centers cleanly on `System UI` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#efeff0` -> `#ffffff` surface layering.

Source: published token package (https://github.com/heroui-inc/heroui), repo https://github.com/heroui-inc/heroui. Inventory: **27** colors, **2** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#efeff0` — base application backdrop (light theme).
- **Surface (`surface`)**: `#ffffff` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (17.1:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#0485f7` (3.2:1 vs canvas; pair with `#f7f7f8` foreground ink for 3.4:1 contrast).
- **Structural Border (`border`)**: `#dedee0` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `accent` (`#0485f7`), `color-accent` (`hsl(264.1, 100%, 55.1%)`), `primary` (`#0485f7`).
- **Neutral Ramp**: `white` (`#ffffff`), `black` (`#000000`), `snow` (`#fcfcfc`), `eclipse` (`#18181b`), `background` (`#f5f5f5`), `surface-secondary` (`#efeff0`).
- **Semantic States**: success: `success` (`#17c964`) · danger: `danger` (`#ff383c`) · warning: `warning` (`#f5a524`).

## Typography

- **Primary / Display Voice**: `ui-sans-serif, system-ui, sans-serif` (top step `font-sans`: 16px, weight 600).
- **Body & UI Controls**: `ui-sans-serif, system-ui, sans-serif` (`font-sans`: 16px, weight 400).
- **Monospace / Technical Labels**: `ui-monospace, monospace` (`font-mono`: 16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#ffffff` cards; separate sibling sections using `#dedee0` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#efeff0` -> `#ffffff`) and `1px solid #dedee0` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#0485f7` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#0485f7`, ink `#000000`, (5.7:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#0485f7`, ink `#000000`, (5.7:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#efeff0`, ink `#0b0b0c`, (17.1:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#efeff0`, (17.1:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#efeff0` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#0485f7` with `#f7f7f8` text (3.4:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#ffffff` surface shifts and `#dedee0` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
