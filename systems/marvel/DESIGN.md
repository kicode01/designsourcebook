---
version: alpha
name: Marvel Styleguide
description: "Crisp light (#ffffff) canvas, FaktProSoft typography, #ff9e7c brand accent, and 8px corner geometry"
colors:
  bg-canvas: "#ffffff"
  canvas-text: "#3c4858"
  body-text: "#8492a6"
  link-bg: "#ff7849"
  link-text: "#0000ee"
  link-text-1: "#1fb6ff"
  link-text-2: "#c0ccda"
  css-surface-8: "#13ce66"
  css-surface-9: "#ffc82c"
  css-surface-10: "#ff49db"
  css-surface-11: "#7e5bef"
  css-surface-12: "#ff4949"
  css-surface-13: "#009eeb"
  css-surface-14: "#85d7ff"
  css-surface-15: "#0f9f4f"
  css-surface-16: "#29eb7f"
  css-surface-17: "#f8b700"
  css-surface-18: "#ffd55f"
  css-surface-19: "#ff5216"
  css-surface-20: "#ff9e7c"
  css-surface-21: "#ff16d1"
  css-surface-22: "#ff7ce5"
  css-surface-23: "#592dea"
  css-surface-24: "#a389f4"
  css-surface-25: "#ff1616"
  css-surface-26: "#ff7c7c"
  css-surface-27: "#000000"
  css-surface-28: "#1f2d3d"
  css-surface-29: "#273444"
  css-surface-30: "#f9fafc"
  css-surface-31: "#e0e6ed"
  css-surface-32: "#eff2f7"
  css-surface-33: "#e5e9f2"
  css-surface-34: "#d3dce6"
  css-surface-35: "rgba(133, 215, 255, 0.98)"
  css-surface-36: "rgba(133, 215, 255, 0.3)"
  css-surface-37: "rgba(133, 215, 255, 0.15)"
  css-surface-38: "rgba(133, 215, 255, 0.05)"
  css-surface-39: "rgba(0, 0, 0, 0.98)"
  css-surface-40: "rgba(0, 0, 0, 0.3)"
  css-surface-41: "rgba(0, 0, 0, 0.15)"
  css-surface-42: "rgba(0, 0, 0, 0.05)"
  css-surface-43: "rgba(31, 45, 61, 0.98)"
  css-surface-44: "rgba(31, 45, 61, 0.3)"
  css-surface-45: "rgba(31, 45, 61, 0.15)"
  css-surface-46: "rgba(31, 45, 61, 0.05)"
  css-surface-47: "rgba(255, 255, 255, 0.98)"
  css-surface-48: "rgba(255, 255, 255, 0.3)"
  css-surface-49: "rgba(255, 255, 255, 0.15)"
  css-surface-50: "rgba(255, 255, 255, 0.05)"
  css-surface-51: "#55acee"
  css-surface-52: "#3b5999"
  css-surface-53: "#ea4c89"
  css-surface-54: "#007ee5"
  css-surface-55: "#dc4e41"
  css-surface-56: "#3f729b"
  css-surface-57: "#0077b5"
  css-surface-58: "#ef4056"
  css-color-59: "#657b83"
  css-color-60: "#a9b6b6"
  css-color-61: "#2aa198"
  css-color-62: "#d33682"
  css-color-63: "#073642"
  css-color-64: "#cb4b16"
  css-color-65: "#dc322f"
  css-surface-66: "#eee8d5"
  css-surface-67: "#ffff00"
  primary: "#ff9e7c"
typography:
  h2:
    fontFamily: "FaktProSoft, \"Helvetica Neue\", helvetica, arial, sans-serif"
    fontSize: 38px
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "FaktProSoft, \"Helvetica Neue\", helvetica, arial, sans-serif"
    fontSize: 20px
    fontWeight: 300
    lineHeight: 1.7
rounded:
  card: 12px
  badge: 999px
  default: 12px
components:
  input:
    textColor: "rgb(60, 72, 88)"
    typography:
      fontWeight: 300
  linkedin:
    textColor: "rgb(0, 119, 181)"
  inputGroup-context:
    backgroundColor: "rgb(249, 250, 252)"
    textColor: "#0b0b0c"
    typography:
      fontWeight: 300
  link-red:
    textColor: "rgb(255, 73, 73)"
  link-pink:
    textColor: "rgb(255, 73, 219)"
  link-dark:
    textColor: "rgb(60, 72, 88)"
  link-blue:
    textColor: "rgb(31, 182, 255)"
  link-green:
    textColor: "rgb(19, 206, 102)"
  link-light:
    textColor: "rgb(132, 146, 166)"
  button-flat:
    textColor: "rgb(255, 255, 255)"
  button-ghost:
    backgroundColor: transparent
    textColor: "rgb(60, 72, 88)"
  input-default:
    backgroundColor: "#f9fafc"
    textColor: "#0b0b0c"
  button-outlined:
    textColor: "rgb(60, 72, 88)"
  card-surface:
    backgroundColor: "#f9fafc"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#ff9e7c"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
---

# Marvel Styleguide

## Overview

**Marvel Styleguide** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#ff9e7c` brand accent.

Typography centers cleanly on `FaktProSoft` (38px display down to 20px body), unified by `12px` base corner radius and subtle shadow elevation.

Maintained by **Marvel**. Source: live stylesheet extraction (https://marvelapp.com/styleguide), frameworks: css. Inventory: **68** colors, **2** typography steps, and **16** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f9fafc` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ff9e7c` (2.0:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.8:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `canvas-text` (`#3c4858`), `body-text` (`#8492a6`), `css-surface-8` (`#13ce66`), `css-surface-9` (`#ffc82c`), `css-surface-10` (`#ff49db`), `css-surface-11` (`#7e5bef`).
- **Neutral Ramp**: `bg-canvas` (`#ffffff`), `css-surface-27` (`#000000`), `css-surface-30` (`#f9fafc`), `css-surface-31` (`#e0e6ed`), `css-surface-32` (`#eff2f7`), `css-surface-33` (`#e5e9f2`).
- **Semantic States**: info: `link-bg` (`#ff7849`).

## Typography

- **Primary / Display Voice**: `FaktProSoft, "Helvetica Neue", helvetica, arial, sans-serif` (top step `h2`: 38px, weight 400, line-height 1).
- **Body & UI Controls**: `FaktProSoft, "Helvetica Neue", helvetica, arial, sans-serif` (`body`: 20px, weight 300, line-height 1.7).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `18px 20px`, `4px 10px`.
- **Hierarchy**: Group controls cleanly within `#f9fafc` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Layered Shadow Model**: Uses documented shadows (`rgb(224, 230, 237) 0px 0px 0px 1px inset`, `rgb(224, 230, 237) 0px 0px 0px 1px inset`) paired with `color-mix(in srgb, #0b0b0c 14%, transparent)` borders for elevated overlays.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ff9e7c` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `12px` (Cards `12px` · Badges `999px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`input` (input)**: ink `rgb(60, 72, 88)`.
- **`linkedin` (nav)**: ink `rgb(0, 119, 181)`.
- **`inputGroup-context` (input)**: bg `rgb(249, 250, 252)`, ink `#0b0b0c`, (18.8:1).
- **`link-red` (nav)**: ink `rgb(255, 73, 73)`.
- **`link-pink` (nav)**: ink `rgb(255, 73, 219)`.
- **`link-dark` (nav)**: ink `rgb(60, 72, 88)`.
- **`link-blue` (nav)**: ink `rgb(31, 182, 255)`.
- **`link-green` (nav)**: ink `rgb(19, 206, 102)`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ff9e7c` with `#0b0b0c` text (9.8:1) for primary CTAs, active tabs, and focus outlines.
- Pair `FaktProSoft` headings with `FaktProSoft` body copy using documented weights and scale steps.
- Apply `12px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f9fafc` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `12px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
