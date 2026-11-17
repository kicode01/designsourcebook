---
version: alpha
name: Basis Design System
description: "Crisp light (#ffffff) canvas, Rubik typography, #4693fa brand accent, and 8px corner geometry"
colors:
  background-color: "#21a637"
  black: "#000000"
  t75: "#414141"
  t65: "#595959"
  t30: "#b2b2b2"
  t16: "#d6d6d6"
  t10: "#e5e5e5"
  t07: "#ececec"
  t05: "#f2f2f2"
  t03: "#f8f8f8"
  white: "#ffffff"
  t100: "#0046aa"
  t80: "#336bbb"
  t60: "#7fa2d4"
  t25: "#d8edff"
  t15: "#eff7ff"
  t50: "#4693fa"
  graphics: "#1a8450"
  text: "#1b633c"
  theme-color: "#0046AA"
  color: "#999988"
  border-color: "#006aff"
  primary: "#4693fa"
typography:
  h1:
    fontFamily: "Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.2
  h2:
    fontFamily: "Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.25
  h3:
    fontFamily: "Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.33
  h4:
    fontFamily: "Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
  body-1:
    fontFamily: "Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-2:
    fontFamily: "Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
  legal:
    fontFamily: "Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#4693fa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#4693fa"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Basis Design System

## Overview

**Basis Design System** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#4693fa` brand accent.

Typography centers cleanly on `Rubik` (40px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#f2f2f2` surface layering.

Maintained by **Basis**. Source: published token package (https://github.com/moroshko/basis), repo https://github.com/LatitudeFinancialOSS/basis, frameworks: css. Inventory: **23** colors, **7** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f2f2f2` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#4693fa` (3.1:1 vs canvas; pair with `#f7f7f8` foreground ink for 2.9:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `background-color` (`#21a637`), `t100` (`#0046aa`), `t80` (`#336bbb`), `t60` (`#7fa2d4`), `t25` (`#d8edff`), `t50` (`#4693fa`).
- **Neutral Ramp**: `black` (`#000000`), `t75` (`#414141`), `t65` (`#595959`), `t30` (`#b2b2b2`), `t16` (`#d6d6d6`), `t10` (`#e5e5e5`).

## Typography

- **Primary / Display Voice**: `Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif` (top step `h1`: 40px, weight 700, line-height 1.2).
- **Body & UI Controls**: `Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif` (`body-1`: 16px, weight 400, line-height 1.5).
- **Scale Steps (7)**: `h1` (40px, w700), `h2` (32px, w600), `h3` (24px, w500), `h4` (20px, w500), `body-1` (16px, w400), `body-2` (14px, w400), `legal` (12px, w400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f2f2f2` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#f2f2f2`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#4693fa` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#4693fa`, ink `#0b0b0c`, (6.4:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ef4444`, ink `#000000`, (5.6:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f2f2f2`, ink `#0b0b0c`, (17.6:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f2f2f2`, ink `#0b0b0c`, (17.6:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#4693fa`, ink `#000000`, (6.8:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#10b981`, ink `#000000`, (8.3:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f2f2f2`, ink `#0b0b0c`, (17.6:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#4693fa` with `#f7f7f8` text (2.9:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Rubik` headings with `Rubik` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f2f2f2` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
