---
version: alpha
name: Evergreen
description: "Crisp light (#F9F9FB) canvas, SF Mono typography, #3366FF brand accent, and 8px corner geometry"
colors:
  neutral-lightest: "#F9F9FB"
  neutral-light: "#E4E7EB"
  neutral-base: "#425A70"
  neutral-dark: "#234361"
  neutral-n1: "#F9F9FB"
  neutral-n2: "#F5F6F7"
  neutral-n3: "#EDF0F2"
  neutral-n4: "#E4E7EB"
  neutral-n5: "#C7CED4"
  neutral-n6: "#A6B1BB"
  neutral-n7: "#7B8B9A"
  neutral-n8: "#66788A"
  neutral-n9: "#425A70"
  neutral-n10: "#234361"
  neutral-color: "#425A70"
  neutral-background-color: "#E4E7EB"
  blue-background-color: "#ddebf7"
  red-background-color: "#fae2e2"
  orange-background-color: "#fae3cd"
  yellow-background-color: "#fbe6a2"
  green-background-color: "#d4eee2"
  teal-background-color: "#d2eef3"
  purple-background-color: "#eae7f8"
  primary-base: "#3366FF"
  primary-hover: "#2952CC"
  primary-active: "#1F3D99"
  info-background: "#F3F6FF"
  info-border: "#3366FF"
  info-text: "#2952CC"
  info-icon: "#3366FF"
  success-background: "#F5FBF8"
  success-border: "#52BD95"
  success-text: "#317159"
  success-icon: "#52BD95"
  warning-background: "#FFFAF2"
  warning-border: "#FFB020"
  warning-text: "#996A13"
  warning-icon: "#FFB020"
  danger-background: "#FDF4F4"
  danger-border: "#D14343"
  danger-text: "#A73636"
  danger-icon: "#D14343"
  disabled-icon: "#c1c4d6"
  border-default: "#E4E7EB"
  border-muted: "#EDF0F2"
  text-success: "#00783e"
  text-info: "#084b8a"
  text-danger: "#bf0e08"
  hover-background-color: "#F9F9FB"
  focus-background-color: "#F9F9FB"
  current-background-color: "#f7f9fd"
  before-background-color: "#1070ca"
  checked-background-color: "#3d8bd4"
  checked-hover-background-color: "#3d8bd4"
  checked-active-background-color: "#1070ca"
  base-style-background: "#F5F6F7"
  background: "#F3F6FF"
  border: "#3366FF"
  text: "#2952CC"
  success: "#00783e"
  info: "#084b8a"
  danger: "#bf0e08"
  background-tint1: "#F9F9FB"
  background-tint2: "#F5F6F7"
  background-yellow-tint: "#fef8e7"
  background-green-tint: "#f1faf5"
  background-orange-tint: "#fdf8f3"
  background-red-tint: "#fef6f6"
  background-blue-tint: "#f7f9fd"
  background-purple-tint: "#f8f7fc"
  background-teal-tint: "#f1fbfc"
  text-muted: "#66788A"
  text-default: "#425A70"
  text-dark: "#234361"
  text-selected: "#1070ca"
  text-warning: "#95591e"
  icon-success: "#47b881"
  icon-info: "#1070ca"
  icon-danger: "#ec4c47"
  icon-warning: "#d9822b"
  intent-success: "#47b881"
  intent-danger: "#ec4c47"
  intent-warning: "#d9822b"
  warning: "#95591e"
  awesome-blue-background-color: "#057ceb"
  warning-background-color: "#fcef79"
  does-not-exist-background-color: "#fc03f0"
  gray900: "#101840"
  yellow-light: "#fbe6a2"
  colors-orange700: "#996A13"
  primary: "#3366FF"
typography:
  mono:
    fontFamily: "\"SF Mono\", Monaco, Inconsolata, \"Fira Mono\", \"Droid Sans Mono\", \"Source Code Pro\", monospace"
  font-size:
    fontSize: 16px
  font-family:
    fontFamily: "\"SF UI Text\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#3366FF"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#425A70"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#D14343"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#F5F6F7"
    textColor: "#425A70"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#F5F6F7"
    textColor: "#425A70"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#3366FF"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#52BD95"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#F5F6F7"
    textColor: "#425A70"
    rounded: 8px
    padding: 10px 16px
---

# Evergreen

## Overview

**Evergreen** is a light-first design system anchored on `#F9F9FB` canvas surfaces with `#425A70` primary ink (6.8:1 contrast) and `#3366FF` brand accent.

Typography centers cleanly on `SF Mono` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#F9F9FB` -> `#F5F6F7` surface layering.

Source: published token package (https://github.com/segmentio/evergreen), repo https://github.com/segmentio/evergreen, package `evergreen-ui`, frameworks: react. Inventory: **91** colors, **3** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#F9F9FB` — base application backdrop (light theme).
- **Surface (`surface`)**: `#F5F6F7` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#425A70` — body copy and primary headings (6.8:1 on canvas).
- **Muted Ink (`muted`)**: `#00783e` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#3366FF` (4.5:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.4:1 contrast).
- **Structural Border (`border`)**: `#E4E7EB` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `neutral-base` (`#425A70`), `neutral-dark` (`#234361`), `neutral-n7` (`#7B8B9A`), `neutral-n8` (`#66788A`), `neutral-n9` (`#425A70`), `neutral-n10` (`#234361`).
- **Neutral Ramp**: `neutral-lightest` (`#F9F9FB`), `neutral-light` (`#E4E7EB`), `neutral-n1` (`#F9F9FB`), `neutral-n2` (`#F5F6F7`), `neutral-n3` (`#EDF0F2`), `neutral-n4` (`#E4E7EB`).
- **Semantic States**: success: `green-background-color` (`#d4eee2`) · danger: `danger-border` (`#D14343`) · warning: `orange-background-color` (`#fae3cd`) · info: `info-border` (`#3366FF`).

## Typography

- **Primary / Display Voice**: `"SF Mono", Monaco, Inconsolata, "Fira Mono", "Droid Sans Mono", "Source Code Pro", monospace` (top step `mono`: 16px, weight 600).
- **Body & UI Controls**: `"SF Mono", Monaco, Inconsolata, "Fira Mono", "Droid Sans Mono", "Source Code Pro", monospace` (`mono`: 16px, weight 400).
- **Monospace / Technical Labels**: `"SF Mono", Monaco, Inconsolata, "Fira Mono", "Droid Sans Mono", "Source Code Pro", monospace` (`mono`: 16px).
- **Scale Steps (3)**: `mono` (16px), `font-size` (16px), `font-family` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#F5F6F7` cards; separate sibling sections using `#E4E7EB` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#F9F9FB` -> `#F5F6F7`) and `1px solid #E4E7EB` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#3366FF` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#3366FF`, ink `#ffffff`, (4.7:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#425A70`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#D14343`, ink `#ffffff`, (4.6:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#F5F6F7`, ink `#425A70`, (6.6:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#F5F6F7`, ink `#425A70`, (6.6:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#3366FF`, ink `#ffffff`, (4.7:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#52BD95`, ink `#000000`, (9.1:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#F5F6F7`, ink `#425A70`, (6.6:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#F9F9FB` (light) with `#425A70` primary text and `#00783e` secondary labels.
- Use `#3366FF` with `#f7f7f8` text (4.4:1) for primary CTAs, active tabs, and focus outlines.
- Pair `SF Mono` headings with `SF Mono` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#F5F6F7` surface shifts and `#E4E7EB` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
