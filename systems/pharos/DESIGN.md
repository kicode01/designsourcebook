---
version: alpha
name: "Pharos: JSTOR's Design System"
description: "Crisp light (hsl(0, 0%, 100%)) canvas, GT America typography, hsl(37.1, 95.5%, 56.5%) brand accent, and 8px corner geometry"
colors:
  10: "hsl(60, 2%, 10%)"
  15: "hsl(219, 82%, 15%)"
  20: "hsl(30, 2%, 20%)"
  30: "hsl(190,80%,32%)"
  40: "hsl(190, 89%, 39%)"
  50: "hsl(0, 57%, 50%)"
  53: "hsl(1, 72%, 53%)"
  60: "hsl(219, 25%, 60%)"
  70: "hsl(187, 75%, 70%)"
  80: "hsl(188, 47%, 80%)"
  90: "hsl(186.3, 37.3%, 90%)"
  93: "hsl(135, 22.2%, 92.9%)"
  94: "hsl(48, 16%, 94%)"
  97: "hsl(40, 20%, 97.1%)"
  jstor-red: "hsl(0, 100%, 30%)"
  night-blue: "hsl(219, 79.4%, 24.7%)"
  glacier-blue: "hsl(187.4, 75.6%, 51.8%)"
  living-coral: "hsl(0, 95.7%, 63.3%)"
  marble-gray: "hsl(46.7, 17.6%, 90%)"
  black: "hsl(0, 0%, 0%)"
  white: "hsl(0, 0%, 100%)"
  yellow: "hsl(37.1, 95.5%, 56.5%)"
  green: "hsl(137.6, 54.8%, 32.9%)"
  engineering-orange: "hsl(0, 81%, 43%)"
  dark-garnet: "hsl(0, 100%, 19%)"
  secondary: "hsl(192.381, 71.5909%, 34.5098%)"
  tertiary: "hsl(204.9438, 64.0288%, 27.2549%)"
  background: "#FFF"
  color: "hsl(210, 98%, 43%)"
  hover: "hsl(210, 98%, 43%)"
  settings-foreground: "#7fdbca"
  foreground: "#7fdbca"
  border-bottom-color: "#9c9c9c"
  primary: "hsl(37.1, 95.5%, 56.5%)"
typography:
  font-family-sans-serif:
    fontFamily: "\"GT America\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
  font-family-serif:
    fontFamily: "\"Ivar Headline\", Georgia, serif"
  font-family-code:
    fontFamily: "consolas, monospace"
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "hsl(37.1, 95.5%, 56.5%)"
    textColor: "#0b0b0c"
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
    backgroundColor: "hsl(135, 22.2%, 92.9%)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "hsl(135, 22.2%, 92.9%)"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "hsl(37.1, 95.5%, 56.5%)"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "hsl(135, 22.2%, 92.9%)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Pharos: JSTOR's Design System

## Overview

**Pharos: JSTOR's Design System** is a light-first design system anchored on `hsl(0, 0%, 100%)` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `hsl(37.1, 95.5%, 56.5%)` brand accent.

Typography centers cleanly on `GT America` (16px display down to 16px body), unified by `8px` base corner radius and stepped `hsl(0, 0%, 100%)` -> `hsl(135, 22.2%, 92.9%)` surface layering.

Maintained by **JSTOR**. Source: published token package (https://github.com/ithaka/pharos), repo https://github.com/ithaka/pharos, package `@ithaka/pharos`, frameworks: web-components, react. Inventory: **34** colors, **3** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `hsl(0, 0%, 100%)` — base application backdrop (light theme).
- **Surface (`surface`)**: `hsl(135, 22.2%, 92.9%)` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `hsl(37.1, 95.5%, 56.5%)` (2.0:1 vs canvas; pair with `#0b0b0c` foreground ink for 10.1:1 contrast).
- **Structural Border (`border`)**: `#9c9c9c` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `15` (`hsl(219, 82%, 15%)`), `30` (`hsl(190,80%,32%)`), `40` (`hsl(190, 89%, 39%)`), `50` (`hsl(0, 57%, 50%)`), `53` (`hsl(1, 72%, 53%)`), `60` (`hsl(219, 25%, 60%)`).
- **Neutral Ramp**: `10` (`hsl(60, 2%, 10%)`), `20` (`hsl(30, 2%, 20%)`), `90` (`hsl(186.3, 37.3%, 90%)`), `93` (`hsl(135, 22.2%, 92.9%)`), `94` (`hsl(48, 16%, 94%)`), `97` (`hsl(40, 20%, 97.1%)`).
- **Semantic States**: success: `green` (`hsl(137.6, 54.8%, 32.9%)`) · danger: `jstor-red` (`hsl(0, 100%, 30%)`) · warning: `yellow` (`hsl(37.1, 95.5%, 56.5%)`).

## Typography

- **Primary / Display Voice**: `"GT America", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` (top step `font-family-sans-serif`: 16px, weight 600).
- **Body & UI Controls**: `"GT America", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` (`font-family-sans-serif`: 16px, weight 400).
- **Monospace / Technical Labels**: `consolas, monospace` (`font-family-code`: 16px).
- **Scale Steps (3)**: `font-family-sans-serif` (16px), `font-family-serif` (16px), `font-family-code` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `hsl(135, 22.2%, 92.9%)` cards; separate sibling sections using `#9c9c9c` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`hsl(0, 0%, 100%)` -> `hsl(135, 22.2%, 92.9%)`) and `1px solid #9c9c9c` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `hsl(37.1, 95.5%, 56.5%)` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `hsl(37.1, 95.5%, 56.5%)`, ink `#0b0b0c`, (10.1:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `hsl(135, 22.2%, 92.9%)`, ink `#0b0b0c`, (17.1:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `hsl(135, 22.2%, 92.9%)`, ink `#0b0b0c`, (17.1:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `hsl(37.1, 95.5%, 56.5%)`, ink `#0b0b0c`, (10.1:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `hsl(135, 22.2%, 92.9%)`, ink `#0b0b0c`, (17.1:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `hsl(0, 0%, 100%)` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `hsl(37.1, 95.5%, 56.5%)` with `#0b0b0c` text (10.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `GT America` headings with `GT America` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `hsl(135, 22.2%, 92.9%)` surface shifts and `#9c9c9c` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
