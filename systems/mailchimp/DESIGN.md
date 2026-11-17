---
version: alpha
name: Mailchimp Content Styleguide
description: "Crisp light (#ffffff) canvas, Verdana typography, #33c3f0 brand accent, and 4px corner geometry"
colors:
  bg-canvas: "#ffffff"
  canvas-text: "#231f20"
  main-bg: "#eff3f7"
  h2-text: "#3e81ed"
  h2-text-1: "#000000"
  h3-text: "#939598"
  button-bg: "#241c15"
  button-text: "#555555"
  button-text-2: "#3860be"
  button-border: "#bbbbbb"
  input-border: "#707070"
  css-color-12: "#2c9ab7"
  css-surface-13: "#fff4d5"
  css-color-14: "#aa8d3b"
  css-surface-15: "#f9f9f9"
  css-color-16: "#3a3a3a"
  css-border-17: "#dcdcdc"
  css-surface-18: "#d0ebe5"
  css-border-19: "#72c1b0"
  css-color-20: "#4d8277"
  css-border-21: "#fed156"
  css-surface-22: "#f7c9c0"
  css-border-23: "#e85c41"
  css-color-24: "#9b3f2e"
  css-border-25: "#373737"
  css-border-26: "#8a8a8a"
  css-surface-27: "#b7b7b7"
  css-border-28: "#5d5c5d"
  css-surface-29: "#db3a1b"
  css-border-30: "#ee836e"
  css-color-31: "rgba(255,255,255,0.8)"
  css-color-32: "#52bad5"
  css-surface-33: "#d8f0f6"
  css-surface-34: "#f5b7ab"
  css-surface-35: "#ffe8aa"
  css-surface-36: "#fede88"
  css-surface-37: "#febe12"
  css-surface-38: "#c5e5de"
  css-surface-39: "#95d1c4"
  css-surface-40: "#449a88"
  css-surface-41: "#b1e0ec"
  css-surface-42: "#6dc5dc"
  css-surface-43: "#f2f2f2"
  css-surface-44: "#060808"
  css-surface-45: "#eeeeee"
  css-color-46: "#d8d9da"
  css-color-47: "#474747"
  css-surface-48: "rgba(255,255,255,0.95)"
  css-surface-49: "#e8f6f9"
  css-surface-50: "rgba(249,237,50,0.4)"
  css-surface-51: "#f9ed32"
  css-color-52: "#1f96db"
  css-color-53: "#565656"
  css-surface-54: "#468254"
  css-surface-55: "#2c6415"
  css-surface-56: "rgba(0,0,0,.5)"
  css-surface-57: "#f9fffa"
  css-fill-58: "#32ae88"
  css-color-59: "#4d4d4d"
  css-surface-60: "#68b631"
  css-color-61: "#333333"
  css-border-62: "#888888"
  css-surface-63: "#33c3f0"
  css-surface-64: "#1eaedb"
  primary: "#33c3f0"
typography:
  header:
    fontFamily: "Verdana, Arial, Helvetica, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.35
  nav:
    fontFamily: "Verdana, Arial, Helvetica, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.35
  h1:
    fontFamily: "\"Helvetica Neue\", Arial, Helvetica, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.2
rounded:
  button: 4px
  badge: 1.3em
  nav: 4px
  default: 4px
components:
  btn:
    backgroundColor: "rgb(183, 183, 183)"
    textColor: "#0b0b0c"
    typography:
      fontSize: 16px
      fontWeight: bold
    rounded: 4px
    padding: 0.5625em 1.5em
  card:
    backgroundColor: "rgb(255, 255, 255)"
    padding: 18px
  badge:
    backgroundColor: "rgb(183, 183, 183)"
    textColor: "#0b0b0c"
    typography:
      fontSize: 12px
      fontWeight: bold
    rounded: 1.3em
    padding: 0.5em 1em
  select:
    backgroundColor: "rgb(183, 183, 183)"
    textColor: "#0b0b0c"
    rounded: 4px
  btn-mini-2:
    backgroundColor: "rgb(183, 183, 183)"
    textColor: "#0b0b0c"
    typography:
      fontSize: 16px
      fontWeight: bold
    rounded: 4px
    padding: 0.5625em 1.5em
  btn-small-3:
    backgroundColor: "rgb(183, 183, 183)"
    textColor: "#0b0b0c"
    typography:
      fontSize: 16px
      fontWeight: bold
    rounded: 4px
    padding: 0.5625em 1.5em
  select-mini-2:
    backgroundColor: "rgb(183, 183, 183)"
    textColor: "#0b0b0c"
    rounded: 4px
  select-small-3:
    backgroundColor: "rgb(183, 183, 183)"
    textColor: "#0b0b0c"
    rounded: 4px
  nav-bar:
    backgroundColor: "#eff3f7"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 16px
---

# Mailchimp Content Styleguide

## Overview

**Mailchimp Content Styleguide** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#33c3f0` brand accent.

Display headlines pair `Helvetica Neue` with `Verdana` body copy (40px display down to 16px body), unified by `4px` base corner radius and stepped `#ffffff` -> `#eff3f7` surface layering.

Maintained by **Mailchimp**. Source: live stylesheet extraction (https://styleguide.mailchimp.com/), frameworks: css. Inventory: **65** colors, **3** typography steps, and **9** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#eff3f7` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#33c3f0` (2.1:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.6:1 contrast).
- **Structural Border (`border`)**: `#bbbbbb` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `h2-text` (`#3e81ed`), `button-text-2` (`#3860be`), `css-color-12` (`#2c9ab7`), `css-surface-13` (`#fff4d5`), `css-color-14` (`#aa8d3b`), `css-surface-18` (`#d0ebe5`).
- **Neutral Ramp**: `bg-canvas` (`#ffffff`), `canvas-text` (`#231f20`), `main-bg` (`#eff3f7`), `h2-text-1` (`#000000`), `h3-text` (`#939598`), `button-bg` (`#241c15`).

## Typography

- **Primary / Display Voice**: `"Helvetica Neue", Arial, Helvetica, sans-serif` (top step `h1`: 40px, weight 700, line-height 1.2).
- **Body & UI Controls**: `Verdana, Arial, Helvetica, sans-serif` (`header`: 16px, weight 400, line-height 1.35).
- **Scale Steps (3)**: `h1` (40px, w700), `header` (16px, w400), `nav` (16px, w400).

## Layout

- **Grid & Control Spacing**: Derived from 9 component tokens with documented paddings: `0.5625em 1.5em`, `18px`, `0.5em 1em`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#eff3f7` cards; separate sibling sections using `#bbbbbb` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#eff3f7`) and `1px solid #bbbbbb` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#33c3f0` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `4px` (Buttons `4px` · Inputs `4px` · Badges `1.3em` · Navigation `4px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `4px` container.

## Components

- **`btn` (button)**: bg `rgb(183, 183, 183)`, ink `#0b0b0c`, (9.8:1), radius `4px`, padding `0.5625em 1.5em`, border `0px`.
- **`card` (card)**: bg `rgb(255, 255, 255)`, padding `18px`, border `1px solid rgb(220, 220, 220)`.
- **`badge` (badge)**: bg `rgb(183, 183, 183)`, ink `#0b0b0c`, (9.8:1), radius `1.3em`, padding `0.5em 1em`.
- **`select` (input)**: bg `rgb(183, 183, 183)`, ink `#0b0b0c`, (9.8:1), radius `4px`.
- **`btn-mini-2` (button)**: bg `rgb(183, 183, 183)`, ink `#0b0b0c`, (9.8:1), radius `4px`, padding `0.5625em 1.5em`, border `0px`.
- **`btn-small-3` (button)**: bg `rgb(183, 183, 183)`, ink `#0b0b0c`, (9.8:1), radius `4px`, padding `0.5625em 1.5em`, border `0px`.
- **`select-mini-2` (input)**: bg `rgb(183, 183, 183)`, ink `#0b0b0c`, (9.8:1), radius `4px`.
- **`select-small-3` (input)**: bg `rgb(183, 183, 183)`, ink `#0b0b0c`, (9.8:1), radius `4px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#33c3f0` with `#0b0b0c` text (9.6:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Helvetica Neue` headings with `Verdana` body copy using documented weights and scale steps.
- Apply `4px` base geometry across inputs and buttons (4px on outer containers).
- Separate containers via `#eff3f7` surface shifts and `#bbbbbb` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `4px` baseline.
- Do not truncate or drop border contrast on `select` fields and secondary buttons.
