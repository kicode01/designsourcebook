---
version: alpha
name: Buildit Gravity
description: "Buildit Gravity — UI pattern library and design tokens by Wipro Digital Buildit."
colors:
  100: "#ffffff"
  neutral: "#000000"
  neutral-alt: "#000000"
  accent: "#000000"
  accent-success: "#000000"
  accent-attention: "#000000"
  accent-danger: "#000000"
  neutral-subtle: "#c3c7ce"
  neutral-emphasis: "#ffffff"
  control: "#ebecef"
  control-alt: "#b433e2"
  control-emphasis: "#ff3f00"
  control-active: "#ff663b"
  control-disabled: "#878e9d"
  shade-80: "#001333"
  shade-60: "#002666"
  shade-40: "#003a99"
  shade-20: "#004dcc"
  base: "#0060ff"
  tint-20: "#4382fb"
  tint-40: "#74a2fc"
  tint-60: "#a4c1fd"
  tint-80: "#d2e0fe"
  tint-92: "#d8e8ff"
  tint-95: "#e5efff"
  tint-97: "#f2f7ff"
  black: "#000000"
  white: "#ffffff"
  shade-7: "#000a0e"
  very-dark: "#1a1a1a"
  darker: "#404040"
  medium-dark: "#7f7f7f"
  medium: "#999999"
  medium-light: "#cccccc"
  very-light: "#f1f1f1"
  095: "#f1f1f1"
  090: "#e6e6e6"
  080: "#cccccc"
  070: "#b3b3b3"
  060: "#999999"
  050: "#7f7f7f"
  040: "#666666"
  025: "#404040"
  015: "#262626"
  010: "#1a1a1a"
  000: "#000000"
  tint-7: "#e7f2fb"
  dark: "#4d4848"
  light: "#e6e6e6"
  navy-blue: "#002d72"
  apple-green: "#6cc24a"
  sunny-yellow: "#f3d54e"
  ruby-red: "#ef3340"
  sky-blue: "#009cde"
  grav-co-grp-a-neutral: "#fff"
  grav-co-grp-a-neutral-alt: "#f2f7ff"
  grav-co-grp-a-accent: "#fff"
  grav-co-grp-a-accent-success: "#ccf4e1"
  grav-co-grp-a-accent-attention: "#ffedd1"
  grav-co-grp-a-accent-danger: "#fff"
  grav-co-grp-b-neutral: "#000"
  grav-co-grp-b-neutral-subtle: "#061434"
  grav-co-grp-b-neutral-emphasis: "#000"
  grav-co-grp-b-control: "#000"
  grav-co-grp-b-control-alt: "#8100af"
  grav-co-grp-b-control-emphasis: "#0060ff"
  grav-co-grp-b-control-active: "#0000c8"
  grav-co-grp-b-control-disabled: "#697184"
  grav-co-grp-b-accent: "#0060ff"
  grav-co-grp-b-accent-success: "#000"
  grav-co-grp-b-accent-attention: "#000"
  grav-co-grp-b-accent-danger: "#cc1e42"
  primary: "#0060ff"
typography:
  grav-font-size-smallest-viewport:
    fontSize: 1rem
  grav-font-size-largest-viewport:
    fontSize: 1.25rem
  grav-font-family-primary:
    fontFamily: "\"Helvetica Neue\""
  grav-font-family-mono:
    fontFamily: "\"Wipro Akkurat Mono TT\""
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#0060ff"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#cc1e42"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f2f7ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f2f7ff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#0060ff"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f2f7ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Buildit Gravity

## Overview

**Buildit Gravity** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#0060ff` brand accent.

Typography centers cleanly on `Helvetica Neue` (20px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#f2f7ff` surface layering.

Maintained by **Buildit**. Source: published token package (https://github.com/buildit/gravity-ui-web/tree/develop/packages/gravity-ui-web#readme), repo https://github.com/buildit/gravity-ui-web, package `@buildit/gravity-ui-web`, frameworks: css, web-components. Inventory: **73** colors, **4** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f2f7ff` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#0060ff` (5.1:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.8:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `control-alt` (`#b433e2`), `control-emphasis` (`#ff3f00`), `control-active` (`#ff663b`), `shade-80` (`#001333`), `shade-60` (`#002666`), `shade-40` (`#003a99`).
- **Neutral Ramp**: `100` (`#ffffff`), `neutral` (`#000000`), `neutral-alt` (`#000000`), `accent` (`#000000`), `accent-success` (`#000000`), `accent-attention` (`#000000`).
- **Semantic States**: success: `apple-green` (`#6cc24a`) · danger: `ruby-red` (`#ef3340`) · warning: `sunny-yellow` (`#f3d54e`).

## Typography

- **Primary / Display Voice**: `"Helvetica Neue"` (top step `grav-font-size-largest-viewport`: 1.25rem, weight 600).
- **Body & UI Controls**: `"Helvetica Neue"` (`grav-font-size-smallest-viewport`: 1rem, weight 400).
- **Monospace / Technical Labels**: `"Wipro Akkurat Mono TT"` (`grav-font-family-mono`: 16px).
- **Scale Steps (4)**: `grav-font-size-largest-viewport` (1.25rem), `grav-font-size-smallest-viewport` (1rem), `grav-font-family-primary` (16px), `grav-font-family-mono` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f2f7ff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#f2f7ff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#0060ff` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#0060ff`, ink `#ffffff`, (5.1:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#cc1e42`, ink `#ffffff`, (5.5:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f2f7ff`, ink `#0b0b0c`, (18.3:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f2f7ff`, ink `#0b0b0c`, (18.3:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#0060ff`, ink `#ffffff`, (5.1:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f2f7ff`, ink `#0b0b0c`, (18.3:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#0060ff` with `#f7f7f8` text (4.8:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Helvetica Neue` headings with `Helvetica Neue` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f2f7ff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
