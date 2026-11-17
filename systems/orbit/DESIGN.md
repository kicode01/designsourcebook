---
version: alpha
name: Orbit
description: "Kiwi.com Orbit — an open-source design system built for travel projects."
colors:
  dark-active: "#003E70"
  dark-hover: "#004F8F"
  darker: "#003866"
  light-active: "#C7E4FA"
  light-hover: "#DEF0FC"
  normal: "#0070C8"
  normal-active: "#01508E"
  normal-hover: "#0161AC"
  basic: "#D7331C"
  medium: "#3B1EB0"
  facebook: "#3B5998"
  facebook-hover: "#385490"
  facebook-active: "#354F88"
  navbar: "#1B3249"
  tab-bundle-basic-background-hover: "rgba(215, 51, 28, 0.08)"
  tab-bundle-basic-background-active: "rgba(215, 51, 28, 0.12)"
  tab-bundle-medium-background-hover: "rgba(59, 30, 176, 0.08)"
  tab-bundle-medium-background-active: "rgba(59, 30, 176, 0.12)"
  primary: "#0070C8"
typography:
  heading-display-font-size:
    fontSize: 40px
  heading-display-subtitle-font-size:
    fontSize: 22px
  heading-title0-font-size:
    fontSize: 28px
  heading-title1-font-size:
    fontSize: 24px
  heading-title2-font-size:
    fontSize: 20px
rounded:
  button: 6px
  input: 6px
  card: 10px
  badge: 999px
  nav: 6px
  default: 6px
components:
  button-primary:
    backgroundColor: "#0070C8"
    textColor: "#ffffff"
    rounded: 6px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 6px
    padding: 10px 18px
  input-default:
    backgroundColor: "#DEF0FC"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#DEF0FC"
    textColor: "#0b0b0c"
    rounded: 10px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#0070C8"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#DEF0FC"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 16px
---

# Orbit

## Overview

**Orbit** is a light-first design system anchored on `#DEF0FC` canvas surfaces with `#0b0b0c` primary ink (16.8:1 contrast) and `#0070C8` brand accent.

Typography centers cleanly on `System UI` (40px display down to 20px body), unified by `6px` base corner radius and hairline `1px` structural borders.

Maintained by **Kiwi.com**. Source: published token package, repo https://github.com/kiwicom/orbit, package `@kiwicom/orbit-design-tokens`, frameworks: react, css. Inventory: **19** colors, **5** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#DEF0FC` — base application backdrop (light theme).
- **Surface (`surface`)**: `#DEF0FC` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (16.8:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#0070C8` (4.3:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `dark-active` (`#003E70`), `dark-hover` (`#004F8F`), `darker` (`#003866`), `light-active` (`#C7E4FA`), `light-hover` (`#DEF0FC`), `normal` (`#0070C8`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `heading-display-font-size`: 40px, weight 600).
- **Body & UI Controls**: `system-ui` (`heading-title2-font-size`: 20px, weight 400).
- **Scale Steps (5)**: `heading-display-font-size` (40px), `heading-title0-font-size` (28px), `heading-title1-font-size` (24px), `heading-display-subtitle-font-size` (22px), `heading-title2-font-size` (20px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#DEF0FC` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#DEF0FC` -> `#DEF0FC`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#0070C8` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `6px` (Buttons `6px` · Inputs `6px` · Cards `10px` · Badges `999px` · Navigation `6px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `10px` container.

## Components

- **`button-primary` (button)**: bg `#0070C8`, ink `#ffffff`, (5.1:1), radius `6px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `6px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ef4444`, ink `#000000`, (5.6:1), radius `6px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#DEF0FC`, ink `#0b0b0c`, (16.8:1), radius `6px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#DEF0FC`, ink `#0b0b0c`, (16.8:1), radius `10px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#0070C8`, ink `#f7f7f8`, (4.7:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#10b981`, ink `#000000`, (8.3:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#DEF0FC`, ink `#0b0b0c`, (16.8:1), radius `6px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#DEF0FC` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#0070C8` with `#f7f7f8` text (4.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `6px` base geometry across inputs and buttons (10px on outer containers).
- Separate containers via `#DEF0FC` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `6px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
