---
version: alpha
name: Ray by WeWork
description: "Crisp light (#ffffff) canvas, system-ui typography, hsl(240, 100%, 40%) brand accent, and 8px corner geometry"
colors:
  ray-color-white: "#ffffff"
  ray-color-black: "#000000"
  ray-color-blue-03: "hsl(240, 100%, 97%)"
  ray-color-blue-10: "hsl(240, 100%, 90%)"
  ray-color-blue-20: "hsl(240, 100%, 80%)"
  ray-color-blue-50: "hsl(240, 100%, 50%)"
  ray-color-blue-60: "hsl(240, 100%, 40%)"
  ray-color-blue-70: "hsl(240, 100%, 30%)"
  ray-color-yellow-50: "hsl(50, 100%, 50%)"
  ray-color-red-10: "hsl(0, 100%, 90%)"
  ray-color-red-20: "hsl(0, 100%, 80%)"
  ray-color-red-50: "hsl(0, 100%, 50%)"
  ray-color-red-60: "hsl(0, 100%, 40%)"
  ray-color-red-70: "hsl(0, 100%, 30%)"
  ray-color-green-10: "hsl(132, 76%, 90%)"
  ray-color-green-20: "hsl(132, 76%, 80%)"
  ray-color-green-70: "hsl(132, 76%, 30%)"
  ray-color-green-80: "hsl(132, 76%, 20%)"
  ray-color-green-90: "hsl(132, 76%, 10%)"
  ray-color-gray-03: "hsl(0, 0%, 97%)"
  ray-color-gray-10: "hsl(0, 0%, 89%)"
  ray-color-gray-30: "hsl(0, 0%, 70%)"
  ray-color-gray-31: "hsl(0, 0%, 69%)"
  ray-color-gray-50: "hsl(0, 0%, 50%)"
  ray-color-gray-60: "hsl(0, 0%, 40%)"
  options-background-color: "#fff"
  options-theme-color: "#0000ff"
  background-color: "#fff"
  theme-color: "#0000ff"
  code-bg: "#282a36"
  avatar-background-color: "#e6e6e6"
  avatar-fill-color: "#b3b3b3"
  card-compact-inactive: "#666"
  hover-border-color: "#ccccff"
  temp-bg: "#fff"
  primary: "hsl(240, 100%, 40%)"
typography:
  ray-base-font-size:
    fontSize: 1rem
  ray-field-font-size:
    fontSize: 1rem
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "hsl(240, 100%, 40%)"
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
    backgroundColor: "hsl(0, 0%, 97%)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "hsl(0, 0%, 97%)"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "hsl(240, 100%, 40%)"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "hsl(0, 0%, 97%)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Ray by WeWork

## Overview

**Ray by WeWork** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `hsl(240, 100%, 40%)` brand accent.

Typography centers cleanly on `System UI` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `hsl(0, 0%, 97%)` surface layering.

Maintained by **Ray**. Source: published token package (https://github.com/wework/ray), repo https://github.com/wework/ray, frameworks: css. Inventory: **36** colors, **2** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `hsl(0, 0%, 97%)` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `hsl(240, 100%, 40%)` (11.2:1 vs canvas; pair with `#f7f7f8` foreground ink for 10.5:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `ray-color-blue-10` (`hsl(240, 100%, 90%)`), `ray-color-blue-20` (`hsl(240, 100%, 80%)`), `ray-color-blue-50` (`hsl(240, 100%, 50%)`), `ray-color-blue-60` (`hsl(240, 100%, 40%)`), `ray-color-blue-70` (`hsl(240, 100%, 30%)`), `options-theme-color` (`#0000ff`).
- **Neutral Ramp**: `ray-color-white` (`#ffffff`), `ray-color-black` (`#000000`), `ray-color-blue-03` (`hsl(240, 100%, 97%)`), `ray-color-gray-03` (`hsl(0, 0%, 97%)`), `ray-color-gray-10` (`hsl(0, 0%, 89%)`), `ray-color-gray-30` (`hsl(0, 0%, 70%)`).
- **Semantic States**: success: `ray-color-green-10` (`hsl(132, 76%, 90%)`) · danger: `ray-color-red-10` (`hsl(0, 100%, 90%)`) · warning: `ray-color-yellow-50` (`hsl(50, 100%, 50%)`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `ray-base-font-size`: 1rem, weight 600).
- **Body & UI Controls**: `system-ui` (`ray-base-font-size`: 1rem, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `hsl(0, 0%, 97%)` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `hsl(0, 0%, 97%)`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `hsl(240, 100%, 40%)` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `hsl(240, 100%, 40%)`, ink `#ffffff`, (11.2:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `hsl(0, 0%, 97%)`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `hsl(0, 0%, 97%)`, ink `#0b0b0c`, (18.4:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `hsl(240, 100%, 40%)`, ink `#ffffff`, (11.2:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `hsl(0, 0%, 97%)`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `hsl(240, 100%, 40%)` with `#f7f7f8` text (10.5:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `hsl(0, 0%, 97%)` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
