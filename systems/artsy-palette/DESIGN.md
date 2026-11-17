---
version: alpha
name: Artsy Palette
description: "Crisp light (#FFFFFF) canvas, ll-unica77 typography, #1023D7 brand accent, and 8px corner geometry"
colors:
  mono100: "#000000"
  mono60: "#707070"
  mono30: "#C2C2C2"
  mono15: "#D8D8D8"
  mono10: "#E7E7E7"
  mono5: "#F7F7F7"
  mono0: "#FFFFFF"
  blue200: "#050e3e"
  blue150: "#0A1C7B"
  blue100: "#1023D7"
  brand: "#1023D7"
  blue15: "#cacdec"
  blue10: "#E6E7F5"
  green150: "#003728"
  green100: "#00674A"
  green10: "#E8EFE2"
  yellow150: "#A47A0F"
  yellow100: "#E2B929"
  yellow10: "#FFFAE9"
  orange150: "#A8501C"
  orange100: "#DA6722"
  orange10: "#FCF7F3"
  red150: "#510B0B"
  red100: "#D71023"
  red50: "#FF1023"
  red10: "#FEF2EF"
  background: "#f0f0f0"
  primary: "#1023D7"
typography:
  sans:
    fontFamily: "ll-unica77, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
  font-size:
    fontSize: 50px
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#1023D7"
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
    backgroundColor: "#F7F7F7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#F7F7F7"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#1023D7"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#F7F7F7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Artsy Palette

## Overview

**Artsy Palette** is a light-first design system anchored on `#FFFFFF` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#1023D7` brand accent.

Typography centers cleanly on `ll-unica77` (50px display down to 16px body), unified by `8px` base corner radius and stepped `#FFFFFF` -> `#F7F7F7` surface layering.

Maintained by **Artsy**. Source: published token package (https://github.com/artsy/palette), repo https://github.com/artsy/palette, package `@artsy/palette`, frameworks: react. Inventory: **28** colors, **2** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#FFFFFF` — base application backdrop (light theme).
- **Surface (`surface`)**: `#F7F7F7` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#1023D7` (9.4:1 vs canvas; pair with `#f7f7f8` foreground ink for 8.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `blue200` (`#050e3e`), `blue150` (`#0A1C7B`), `blue100` (`#1023D7`), `brand` (`#1023D7`), `blue15` (`#cacdec`), `primary` (`#1023D7`).
- **Neutral Ramp**: `mono100` (`#000000`), `mono60` (`#707070`), `mono30` (`#C2C2C2`), `mono15` (`#D8D8D8`), `mono10` (`#E7E7E7`), `mono5` (`#F7F7F7`).
- **Semantic States**: success: `green150` (`#003728`) · danger: `red150` (`#510B0B`) · warning: `yellow150` (`#A47A0F`).

## Typography

- **Primary / Display Voice**: `ll-unica77, "Helvetica Neue", Helvetica, Arial, sans-serif` (top step `font-size`: 50px, weight 600).
- **Body & UI Controls**: `ll-unica77, "Helvetica Neue", Helvetica, Arial, sans-serif` (`sans`: 16px, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#F7F7F7` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#FFFFFF` -> `#F7F7F7`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#1023D7` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#1023D7`, ink `#ffffff`, (9.4:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#F7F7F7`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#F7F7F7`, ink `#0b0b0c`, (18.4:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#1023D7`, ink `#ffffff`, (9.4:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#F7F7F7`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#FFFFFF` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#1023D7` with `#f7f7f8` text (8.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `ll-unica77` headings with `ll-unica77` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#F7F7F7` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
