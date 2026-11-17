---
version: alpha
name: Aurora
description: "Crisp light (#fff) canvas, -apple-system typography, #002D42 brand accent, and 8px corner geometry"
colors:
  blue: "#007bff"
  indigo: "#6610f2"
  purple: "#6f42c1"
  pink: "#e83e8c"
  red: "#dc3545"
  orange: "#fd7e14"
  yellow: "#ffc107"
  green: "#28a745"
  teal: "#20c997"
  cyan: "#17a2b8"
  white: "#fff"
  gray: "#6c757d"
  gray-dark: "#343a40"
  primary: "#002D42"
  secondary: "#4D5D6C"
  success: "#278400"
  info: "#269abc"
  warning: "#ff9900"
  danger: "#d3080c"
  light: "#FFFFFF"
  dark: "#343a40"
typography:
  font-family-sans-serif:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\""
  font-family-monospace:
    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#002D42"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#d3080c"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#002D42"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#278400"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Aurora

## Overview

**Aurora** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#002D42` brand accent.

Typography centers cleanly on `System UI` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#fff` -> `#FFFFFF` surface layering.

Maintained by **Government of Canada**. Source: published token package (https://github.com/gctools-outilsgc/design-system), repo https://github.com/gctools-outilsgc/aurora-design-system, frameworks: css. Inventory: **21** colors, **2** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#FFFFFF` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#002D42` (14.4:1 vs canvas; pair with `#f7f7f8` foreground ink for 13.5:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `blue` (`#007bff`), `indigo` (`#6610f2`), `purple` (`#6f42c1`), `pink` (`#e83e8c`), `teal` (`#20c997`), `cyan` (`#17a2b8`).
- **Neutral Ramp**: `white` (`#fff`), `gray` (`#6c757d`), `gray-dark` (`#343a40`), `light` (`#FFFFFF`), `dark` (`#343a40`).
- **Semantic States**: success: `green` (`#28a745`) · danger: `red` (`#dc3545`) · warning: `orange` (`#fd7e14`) · info: `info` (`#269abc`).

## Typography

- **Primary / Display Voice**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` (top step `font-family-sans-serif`: 16px, weight 600).
- **Body & UI Controls**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` (`font-family-sans-serif`: 16px, weight 400).
- **Monospace / Technical Labels**: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` (`font-family-monospace`: 16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#FFFFFF` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#FFFFFF`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#002D42` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#002D42`, ink `#ffffff`, (14.4:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#d3080c`, ink `#ffffff`, (5.5:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#002D42`, ink `#ffffff`, (14.4:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#278400`, ink `#ffffff`, (4.8:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#002D42` with `#f7f7f8` text (13.5:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#FFFFFF` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
