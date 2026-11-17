---
version: alpha
name: Grommet
description: "Accessible enterprise React framework, signature HPE purple and teal brand accents"
colors:
  brand-color: "#7D4CDB"
  text-dark: "#f8f8f8"
  text-light: "#444444"
  icon-dark: "#f8f8f8"
  icon-light: "#666666"
  critical: "#EB0000"
  error: "#B30000"
  warning: "#C27B00"
  ok: "#009E67"
  unknown: "#919191"
  disabled: "#CCCCCC"
  black: "#000000"
  placeholder: "#AAAAAA"
  white: "#FFFFFF"
  background-color: "#111111"
  control-dark: "#FFCA58"
  control-light: "#403216"
  drop-background: "#333333"
  brand: "#FD6FFF"
  focus: "#FFCA58"
  background-light: "#ffffff"
  background-dark: "#000000"
  colors-background: "#160F1D"
  colors-background-back: "#000000"
  colors-background-front: "#160F1D"
  colors-text-strong: "#FFFFFF"
  colors-text: "#E4E1E6"
  colors-text-weak: "#76717A"
  colors-grey: "#AFACB2"
  colors-lime: "#C6FC60"
  colors-pink: "#D856A7"
  colors-purple: "#7C7EF4"
  colors-teal: "#73DAFB"
  colors-yellow: "#EDD063"
  colors-dark-purple: "#291E40"
  colors-focus: "#233670"
  background-back: "#000000"
  background-front: "#160F1D"
  text-strong: "#FFFFFF"
  text: "#E4E1E6"
  text-weak: "#76717A"
  grey: "#AFACB2"
  lime: "#C6FC60"
  pink: "#D856A7"
  purple: "#7C7EF4"
  teal: "#73DAFB"
  yellow: "#EDD063"
  dark-purple: "#291E40"
  gradient-mask-color: "#ffffff"
  stroke: "#000000"
  fill: "#000"
  primary: "#7D4CDB"
typography:
  font-family:
    fontFamily: "\"JetBrains Mono\""
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#7D4CDB"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#444444"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#B30000"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#FFFFFF"
    textColor: "#444444"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#FFFFFF"
    textColor: "#444444"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#7D4CDB"
    textColor: "#f8f8f8"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#FFFFFF"
    textColor: "#444444"
    rounded: 8px
    padding: 10px 16px
---

# Grommet

## Overview

**Grommet** is a light-first design system anchored on `#ffffff` canvas surfaces with `#444444` primary ink (9.7:1 contrast) and `#7D4CDB` brand accent.

Typography centers cleanly on `JetBrains Mono` (16px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **Hewlett Packard**. Source: published token package (http://grommet.io), repo https://github.com/grommet/grommet, package `grommet`, frameworks: react. Inventory: **52** colors, **1** typography steps, and **8** documented components (Apache-2.0 license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#FFFFFF` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#444444` — body copy and primary headings (9.7:1 on canvas).
- **Muted Ink (`muted`)**: `#76717A` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#7D4CDB` (5.3:1 vs canvas; pair with `#f7f7f8` foreground ink for 5.0:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #444444 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `brand-color` (`#7D4CDB`), `ok` (`#009E67`), `control-dark` (`#FFCA58`), `control-light` (`#403216`), `brand` (`#FD6FFF`), `focus` (`#FFCA58`).
- **Neutral Ramp**: `text-dark` (`#f8f8f8`), `text-light` (`#444444`), `icon-dark` (`#f8f8f8`), `icon-light` (`#666666`), `unknown` (`#919191`), `disabled` (`#CCCCCC`).
- **Semantic States**: danger: `critical` (`#EB0000`) · warning: `warning` (`#C27B00`).

## Typography

- **Primary / Display Voice**: `"JetBrains Mono"` (top step `font-family`: 16px, weight 600).
- **Body & UI Controls**: `"JetBrains Mono"` (`font-family`: 16px, weight 400).
- **Monospace / Technical Labels**: `"JetBrains Mono"` (`font-family`: 16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#FFFFFF` cards; separate sibling sections using `color-mix(in srgb, #444444 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#FFFFFF`) and `1px solid color-mix(in srgb, #444444 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#7D4CDB` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#7D4CDB`, ink `#ffffff`, (5.3:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#444444`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#B30000`, ink `#ffffff`, (7.2:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#FFFFFF`, ink `#444444`, (9.7:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#FFFFFF`, ink `#444444`, (9.7:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#7D4CDB`, ink `#f8f8f8`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#10b981`, ink `#000000`, (8.3:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#FFFFFF`, ink `#444444`, (9.7:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#444444` primary text and `#76717A` secondary labels.
- Use `#7D4CDB` with `#f7f7f8` text (5.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `JetBrains Mono` headings with `JetBrains Mono` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#FFFFFF` surface shifts and `color-mix(in srgb, #444444 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
