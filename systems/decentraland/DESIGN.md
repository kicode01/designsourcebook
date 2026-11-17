---
version: alpha
name: Decentraland UI
description: "Crisp light (#ffffff) canvas, system-ui typography, #ff2d55 brand accent, and 8px corner geometry"
colors:
  background: "#18141a"
  danger: "#ffa900"
  error: "#ff0000"
  primary: "#ff2d55"
  secondary: "#242129"
  primary-hover: "#ff3d61"
  secondary-hover: "#28262c"
  text: "#ffffff"
  secondary-text: "#676370"
  text-on-primary: "#ffffff"
  text-on-secondary: "#ffffff"
  dropdown: "#716b7c"
  popup: "#676370"
  popup-text: "#ffffff"
  navbar-popup: "#242129"
  card: "#242129"
  toast: "#3d3b43"
  toast-text: "#ffffff"
  modal: "#242129"
  text-area-border: "#676370"
  clear-divider: "#a09ba8"
  navbar-icons: "#fff"
  navbar-menu-enabled: "#ecebed"
  navbar-menu-hover: "#fff"
  navbar-item-text-enabled: "#cfcdd4"
  navbar-item-text-hover: "#fff"
  navbar-item-border-enabled: "#716b7c"
  navbar-item-border-hover: "#cfcdd4"
  usermenu-item-text-enabled: "#cfcdd4"
  usermenu-item-border-enabled: "#cfcdd4"
  neon-blue: "#00d3ff"
  summer-red: "#ff2d55"
  void: "#16141a"
  luisxvi-violet: "#a524b3"
  idontfeelthatwell: "#f3f2f5"
  shadows: "#242129"
  night-time: "#691fa9"
  bluish-steel: "#676370"
  innocence: "#ffffff"
  candy-purple: "#c640cd"
  sunish: "#ffbc5b"
  millenial-orange: "#fc9965"
  oj-not-simpson: "#ff7439"
  dark: "#18141a"
  common: "#73d3d3"
  uncommon: "#ff8362"
  rare: "#34ce76"
  epic: "#438fff"
  legendary: "#a14bf3"
  mythic: "#ff4bed"
  unique: "#fea217"
  active-bar-color: "#ff2d55"
  non-active-bar-color: "#4f1414"
typography:
  font-family:
    fontFamily: "system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto"
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#ff2d55"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#676370"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ffa900"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f3f2f5"
    textColor: "#676370"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f3f2f5"
    textColor: "#676370"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#ff2d55"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f3f2f5"
    textColor: "#676370"
    rounded: 8px
    padding: 10px 16px
---

# Decentraland UI

## Overview

**Decentraland UI** is a light-first design system anchored on `#ffffff` canvas surfaces with `#676370` primary ink (5.8:1 contrast) and `#ff2d55` brand accent.

Typography centers cleanly on `System UI` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#f3f2f5` surface layering.

Maintained by **Decentraland**. Source: published token package (https://github.com/decentraland/ui), repo https://github.com/decentraland/ui, frameworks: css. Inventory: **53** colors, **1** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f3f2f5` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#676370` — body copy and primary headings (5.8:1 on canvas).
- **Muted Ink (`muted`)**: `#676370` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ff2d55` (3.6:1 vs canvas; pair with `#f7f7f8` foreground ink for 3.4:1 contrast).
- **Structural Border (`border`)**: `#a09ba8` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `primary` (`#ff2d55`), `primary-hover` (`#ff3d61`), `neon-blue` (`#00d3ff`), `luisxvi-violet` (`#a524b3`), `night-time` (`#691fa9`), `candy-purple` (`#c640cd`).
- **Neutral Ramp**: `background` (`#18141a`), `secondary` (`#242129`), `secondary-hover` (`#28262c`), `text` (`#ffffff`), `secondary-text` (`#676370`), `text-on-primary` (`#ffffff`).
- **Semantic States**: danger: `danger` (`#ffa900`) · warning: `millenial-orange` (`#fc9965`).

## Typography

- **Primary / Display Voice**: `system-ui, BlinkMacSystemFont, "Segoe UI", Roboto` (top step `font-family`: 16px, weight 600).
- **Body & UI Controls**: `system-ui, BlinkMacSystemFont, "Segoe UI", Roboto` (`font-family`: 16px, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f3f2f5` cards; separate sibling sections using `#a09ba8` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#f3f2f5`) and `1px solid #a09ba8` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ff2d55` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#ff2d55`, ink `#0b0b0c`, (5.4:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#676370`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ffa900`, ink `#000000`, (10.9:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f3f2f5`, ink `#676370`, (5.2:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f3f2f5`, ink `#676370`, (5.2:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#ff2d55`, ink `#000000`, (5.8:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f3f2f5`, ink `#676370`, (5.2:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#676370` primary text and `#676370` secondary labels.
- Use `#ff2d55` with `#f7f7f8` text (3.4:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f3f2f5` surface shifts and `#a09ba8` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
