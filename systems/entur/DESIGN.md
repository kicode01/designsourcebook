---
version: alpha
name: Entur Design System
description: "Entur Design System — tokens imported from @entur/tokens."
colors:
  brand-blue: "#181c56"
  brand-lavender: "#aeb7e2"
  brand-white: "#ffffff"
  brand-coral: "#ff5959"
  brand-peach: "#ffbf9e"
  neutral: "#f2f5f7"
  accent: "#022231"
  disabled: "#515254"
  information: "#067eb2"
  informationalt: "#64b3e7"
  informationalt2: "#acd7f1"
  neutralalt: "#b6b8ba"
  neutralalt2: "#949699"
  success: "#1a8e60"
  successalt: "#5ac39a"
  successalt2: "#9cd9c2"
  warning: "#ffca28"
  warningalt: "#ffe082"
  warningalt2: "#ffeeb3"
  disabledalt: "#b6b8ba"
  airportlinkbus-contrast: "#fbafea"
  airportlinkbus-default: "#800664"
  airportlinkrail-contrast: "#fbafea"
  airportlinkrail-default: "#800664"
  focus-contrast: "#aeb7e2"
  focus-standard: "#181c56"
  airportlinkbus: "#fbafea"
  airportlinkrail: "#fbafea"
  text: "#181c56"
  border-interactive: "#aeb7e2"
  icon-disabled: "#b6b8ba"
  text-disabled: "#b6b8ba"
  text-active: "#181c56"
  border-disabled: "#949699"
  text-selected: "#181c56"
  text-unselected: "#ffffff"
  background: "#ffffff"
  background-overflow: "#f6f6f9"
  dateborder: "#e3e6e8"
  text-accent: "#181c56"
  text-subdued: "#626493"
  border-default: "#8284ab"
  border-negative: "#ff9494"
  border-success: "#5ac39a"
  icon-disabled-beta: "#b6b8ba"
  text-content: "#181c56"
  text-content-readonly: "#ffffff"
  text-description: "#ffffff"
  text-label: "#626493"
  text-label-beta: "#ffffff"
  text-disabled-beta: "#b6b8ba"
  border-selected: "#aeb7e2"
  text-rebate: "#5ac39a"
  border-readonly: "#6e6f73"
  text-bullet: "#ffffff"
  subject-text: "#d9dae8"
  stroke-disabled: "#949699"
  stroke-success: "#5ac39a"
  text-completed: "#ffffff"
  text-uncompleted: "#aeb7e2"
  text-negative: "#181c56"
  bullet-border: "#181c56"
  backgroundfalse: "#626493"
  backgroundtrue-air: "#fbafea"
  backgroundtrue-bicycle: "#00dbb6"
  backgroundtrue-bus: "#ff6392"
  backgroundtrue-cableway: "#b482fb"
  backgroundtrue-carferry: "#6fdfff"
  backgroundtrue-citybike: "#00dbb6"
  backgroundtrue-ferry: "#6fdfff"
  backgroundtrue-funicular: "#b482fb"
  backgroundtrue-helicopter: "#fbafea"
  backgroundtrue-metro: "#f08901"
  backgroundtrue-mobility: "#00dbb6"
  backgroundtrue-plane: "#fbafea"
  backgroundtrue-rail: "#42a5f5"
  backgroundtrue-railreplacementbus: "#ffe082"
  backgroundtrue-regional-bus: "#b8db48"
  backgroundtrue-snowcoach: "#ffe082"
  backgroundtrue-taxi: "#ffe082"
  backgroundtrue-train: "#42a5f5"
  backgroundtrue-tram: "#b482fb"
  backgroundtrue-walk: "#9ea0bd"
  backgroundtrue-water: "#6fdfff"
  backgroundtrue-airportlinkbus: "#fbafea"
  backgroundtrue-airportlinkrail: "#fbafea"
  icontrue-airportlinkbus: "#800664"
  icontrue-airportlinkrail: "#800664"
  backgroundtrue-bus-regional: "#427500"
  icontrue-airportlinkbus2: "#800664"
  primary: "#181c56"
typography:
  font-family-mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, \"Liberation Mono\", monospace"
  font-family-nationale:
    fontFamily: Nationale
  font-sizes-extra-small:
    fontSize: 0.625rem
  font-sizes-small:
    fontSize: 0.75rem
  font-sizes-medium:
    fontSize: 0.875rem
  font-sizes-large:
    fontSize: 1rem
  font-sizes-extra-large:
    fontSize: 1.25rem
  font-sizes-extra-large2:
    fontSize: 1.5rem
  font-sizes-extra-large3:
    fontSize: 1.75rem
  font-sizes-extra-large4:
    fontSize: 2rem
  font-sizes-extra-large5:
    fontSize: 2.5rem
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
    backgroundColor: "#f2f5f7"
    textColor: "#181c56"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#181c56"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#181c56"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f2f5f7"
    textColor: "#181c56"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f2f5f7"
    textColor: "#181c56"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#f6f6f9"
    textColor: "#181c56"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#181c56"
    textColor: "#f6f6f9"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#f2f5f7"
    textColor: "#181c56"
    rounded: 8px
    padding: 8px
---

# Entur Design System

## Overview

**Entur Design System** is a light-first design system anchored on `#f6f6f9` canvas surfaces with `#181c56` primary ink (14.5:1 contrast) and `#181c56` brand accent.

Display headlines pair `Nationale` with `System Mono` body copy (40px display down to 16px body), unified by `8px` base corner radius and stepped `#f6f6f9` -> `#f2f5f7` surface layering.

Maintained by **Entur**. Source: published token package, package `@entur/tokens`. Inventory: **91** colors, **11** typography steps, and **8** documented components (EUPL-1.2 license).

## Colors

- **Canvas (`canvas`)**: `#f6f6f9` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f2f5f7` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#181c56` — body copy and primary headings (14.5:1 on canvas).
- **Muted Ink (`muted`)**: `#626493` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#181c56` (14.5:1 vs canvas; pair with `#f7f7f8` foreground ink for 14.6:1 contrast).
- **Structural Border (`border`)**: `#949699` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `brand-blue` (`#181c56`), `brand-lavender` (`#aeb7e2`), `brand-coral` (`#ff5959`), `brand-peach` (`#ffbf9e`), `accent` (`#022231`), `focus-contrast` (`#aeb7e2`).
- **Neutral Ramp**: `brand-white` (`#ffffff`), `neutral` (`#f2f5f7`), `disabled` (`#515254`), `neutralalt` (`#b6b8ba`), `neutralalt2` (`#949699`), `disabledalt` (`#b6b8ba`).
- **Semantic States**: success: `success` (`#1a8e60`) · danger: `border-negative` (`#ff9494`) · warning: `warning` (`#ffca28`) · info: `information` (`#067eb2`).

## Typography

- **Primary / Display Voice**: `Nationale` (top step `font-sizes-extra-large5`: 2.5rem, weight 600).
- **Body & UI Controls**: `ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace` (`font-family-mono`: 16px, weight 400).
- **Monospace / Technical Labels**: `ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace` (`font-family-mono`: 16px).
- **Scale Steps (11)**: `font-sizes-extra-large5` (2.5rem), `font-sizes-extra-large4` (2rem), `font-sizes-extra-large3` (1.75rem), `font-sizes-extra-large2` (1.5rem), `font-sizes-extra-large` (1.25rem), `font-family-mono` (16px), `font-family-nationale` (16px), `font-sizes-large` (1rem).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#f2f5f7` cards; separate sibling sections using `#949699` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#f6f6f9` -> `#f2f5f7`) and `1px solid #949699` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#181c56` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#f2f5f7`, ink `#181c56`, (14.3:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#181c56`, ink `#f7f7f8`, (14.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#181c56`, ink `#f7f7f8`, (14.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f2f5f7`, ink `#181c56`, (14.3:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f2f5f7`, ink `#181c56`, (14.3:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#f6f6f9`, ink `#181c56`, (14.5:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#181c56`, ink `#f6f6f9`, (14.5:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f2f5f7`, ink `#181c56`, (14.3:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#f6f6f9` (light) with `#181c56` primary text and `#626493` secondary labels.
- Use `#181c56` with `#f7f7f8` text (14.6:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Nationale` headings with `System Mono` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f2f5f7` surface shifts and `#949699` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
