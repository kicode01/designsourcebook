---
version: alpha
name: Help Scout Style Guide
description: "Help Scout Style Guide — read from the rendered page in a browser, not from published tokens."
colors:
  color-red-accent: "#FF4747"
  color-red-accent-rgb: "rgb(255, 71, 71)"
  color-orange-accent: "#FF8B33"
  color-orange-accent-rgb: "rgb(255, 139, 51)"
  color-yellow-accent: "#FFB83D"
  color-yellow-accent-rgb: "rgb(255, 184, 61)"
  color-green-accent: "#56F09E"
  color-green-accent-rgb: "rgb(86, 240, 158)"
  color-blue-accent: "#2E96FF"
  color-blue-accent-rgb: "rgb(46, 150, 255)"
  color-slate-accent: "#47C2FF"
  color-slate-accent-rgb: "rgb(71, 194, 255)"
  color-cobalt-accent: "#47A3FF"
  color-cobalt-accent-rgb: "rgb(71, 163, 255)"
  color-purple-accent: "#C285FF"
  color-purple-accent-rgb: "rgb(194, 133, 255)"
  color-magenta-accent: "#FF5CAA"
  color-magenta-accent-rgb: "rgb(255, 92, 170)"
  color-action-disabled: "#ABB9C7"
  color-action-disabled-rgb: "rgb(171, 185, 199)"
  color-text-headline: "#33302E"
  color-text-headline-rgb: "rgb(51, 48, 46)"
  color-text-dark: "#33302E"
  color-text-dark-rgb: "rgb(51, 48, 46)"
  color-text-default: "#4A4441"
  color-text-default-rgb: "rgb(74, 68, 65)"
  color-text-light: "#8A7B74"
  color-text-light-rgb: "rgb(138, 123, 116)"
  color-text-disabled: "#9E8F88"
  color-text-disabled-rgb: "rgb(158, 143, 136)"
  color-success-text: "#2E5940"
  color-success-text-rgb: "rgb(46, 89, 64)"
  color-success-background-dark: "#2D8556"
  color-success-background-dark-rgb: "rgb(45, 133, 86)"
  color-success-icon: "#47C47D"
  color-success-icon-rgb: "rgb(71, 196, 125)"
  color-success-border: "#47C47D"
  color-success-border-rgb: "rgb(71, 196, 125)"
  color-success-background-light: "#F2FFF0"
  color-success-background-light-rgb: "rgb(242, 255, 240)"
  color-error-text: "#B83525"
  color-error-text-rgb: "rgb(184, 53, 37)"
  color-error-background-dark: "#B83525"
  color-error-background-dark-rgb: "rgb(184, 53, 37)"
  color-error-icon: "#FF4747"
  color-error-icon-rgb: "rgb(255, 71, 71)"
  color-error-border: "#E54A32"
  color-error-border-rgb: "rgb(229, 74, 50)"
  color-error-background-light: "#feeae7"
  color-error-background-light-rgb: "rgb(254, 234, 231)"
  color-warning-text: "#A35214"
  color-warning-text-rgb: "rgb(163, 82, 20)"
  color-warning-background-dark: "#A35214"
  color-warning-background-dark-rgb: "rgb(163, 82, 20)"
  color-warning-icon: "#FFB83D"
  color-warning-icon-rgb: "rgb(255, 184, 61)"
  color-warning-border: "#FABF5A"
  color-warning-border-rgb: "rgb(250, 191, 90)"
  color-warning-background-light: "#FFF6E5"
  color-warning-background-light-rgb: "rgb(255, 246, 229)"
  color-info-text: "#263AAD"
  color-info-text-rgb: "rgb(38, 58, 173)"
  color-info-background-dark: "#304DDB"
  color-info-background-dark-rgb: "rgb(48, 77, 219)"
  color-info-icon: "#4176FA"
  color-info-icon-rgb: "rgb(65, 118, 250)"
  color-info-border: "#4176FA"
  color-info-border-rgb: "rgb(65, 118, 250)"
  color-info-background-light: "#EBF5FF"
  color-info-background-light-rgb: "rgb(235, 245, 255)"
  color-red-100: "#FFF0E8"
  color-red-700: "#822824"
  color-orange-300: "#FAC096"
  color-orange-900: "#3D2F22"
  color-yellow-500: "#E09C24"
  color-green-100: "#F2FFF0"
  color-green-700: "#28704C"
  color-blue-300: "#7ACAFF"
  color-blue-900: "#001C5A"
  color-slate-500: "#82A7BA"
  color-cobalt-100: "#EBF5FF"
  color-cobalt-700: "#263AAD"
  color-purple-300: "#D7BAF5"
  color-purple-900: "#31253D"
  color-magenta-500: "#BF5878"
  color-charcoal-100: "#f9fafa"
  color-charcoal-700: "#556575"
  color-clay-100: "#FAF8F7"
  color-clay-700: "#8A7B74"
  color-basics-white: "#ffffff"
  primary: "#FF4747"
typography:
  font-family-sans:
    fontFamily: "\"Scoutie Sans\", Helvetica, Arial, sans-serif"
  font-family-serif:
    fontFamily: "\"Victor Serif\", serif"
  font-family-mono:
    fontFamily: "\"Geist Mono\", monospace"
  font-family-hand:
    fontFamily: "\"Help Desk Hand\", Helvetica, Arial, sans-serif"
  font-family:
    fontFamily: "Graphik, Helvetica, Arial, sans-serif"
rounded:
  button: 9999px
  nav: 12px
  default: 12px
icons:
  library: Inline System SVGs
  package: null
  style: outline
  grid: 20
  strokeWidth: 1.75
  strokeLinecap: round
  strokeLinejoin: round
  source: derived
components:
  button:
    backgroundColor: "#0064F0"
    textColor: "#ffffff"
    typography:
      fontWeight: 600
    rounded: 9999px
    padding: "0"
  modal-container:
    backgroundColor: white
    padding: 30px
  button-base-text-2:
    textColor: "#fff"
  toggle-checkmark:
    backgroundColor: "rgba(255, 255, 255, 0.9)"
    height: 16px
    width: 16px
  select-default:
    backgroundColor: "#33302E"
    textColor: "#f7f7f8"
    rounded: 12px
    padding: 8px 12px
  checkbox-control:
    backgroundColor: "#FF4747"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#33302E"
    textColor: "#f7f7f8"
    rounded: 12px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#33302E"
    textColor: "#f7f7f8"
    rounded: 12px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#33302E"
    textColor: "#f7f7f8"
    rounded: 12px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#f7f7f8"
    textColor: "#33302E"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#33302E"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 8px
---

# Help Scout Style Guide

## Overview

**Help Scout Style Guide** is a dark-first design system anchored on `#33302E` canvas surfaces with `#f7f7f8` primary ink (12.2:1 contrast) and `#FF4747` brand accent.

Typography centers cleanly on `Scoutie Sans` (16px display down to 16px body), unified by `12px` base corner radius and subtle shadow elevation.

Maintained by **Help Scout**. Source: live stylesheet extraction (http://style.helpscout.com/). Inventory: **91** colors, **5** typography steps, and **11** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#33302E` — base application backdrop (dark theme).
- **Surface (`surface`)**: `#33302E` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#f7f7f8` — body copy and primary headings (12.2:1 on canvas).
- **Muted Ink (`muted`)**: `#f7f7f8` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#FF4747` (3.9:1 vs canvas; pair with `#f7f7f8` foreground ink for 3.1:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #f7f7f8 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-blue-accent` (`#2E96FF`), `color-blue-accent-rgb` (`rgb(46, 150, 255)`), `color-slate-accent` (`#47C2FF`), `color-slate-accent-rgb` (`rgb(71, 194, 255)`), `color-cobalt-accent` (`#47A3FF`), `color-cobalt-accent-rgb` (`rgb(71, 163, 255)`).
- **Neutral Ramp**: `color-text-headline` (`#33302E`), `color-text-headline-rgb` (`rgb(51, 48, 46)`), `color-text-dark` (`#33302E`), `color-text-dark-rgb` (`rgb(51, 48, 46)`), `color-text-default` (`#4A4441`), `color-text-default-rgb` (`rgb(74, 68, 65)`).
- **Semantic States**: success: `color-green-accent` (`#56F09E`) · danger: `color-red-accent` (`#FF4747`) · warning: `color-orange-accent` (`#FF8B33`) · info: `color-info-text` (`#263AAD`).

## Typography

- **Primary / Display Voice**: `"Scoutie Sans", Helvetica, Arial, sans-serif` (top step `font-family-sans`: 16px, weight 600).
- **Body & UI Controls**: `"Scoutie Sans", Helvetica, Arial, sans-serif` (`font-family-sans`: 16px, weight 400).
- **Monospace / Technical Labels**: `"Geist Mono", monospace` (`font-family-mono`: 16px).
- **Scale Steps (5)**: `font-family-sans` (16px), `font-family-serif` (16px), `font-family-mono` (16px), `font-family-hand` (16px), `font-family` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 11 component tokens with documented paddings: `0`, `30px`, `8px 12px`, `2px`, `6px 12px`.
- **Hierarchy**: Group controls cleanly within `#33302E` cards; separate sibling sections using `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Layered Shadow Model**: Uses documented shadows (`0 5px 10px rgba(0, 0, 0, 0.1)`) paired with `color-mix(in srgb, #f7f7f8 14%, transparent)` borders for elevated overlays.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#FF4747` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `12px` (Buttons `9999px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button` (button)**: bg `#0064F0`, ink `#ffffff`, (5.1:1), radius `9999px`, padding `0`.
- **`modal-container` (modal)**: bg `white`, padding `30px`.
- **`button-base-text-2` (button)**: ink `#fff`.
- **`toggle-checkmark` (switch)**: bg `rgba(255, 255, 255, 0.9)`, border `1px solid #d8d8d8`.
- **`select-default` (select)**: bg `#33302E`, ink `#f7f7f8`, (12.2:1), radius `12px`, padding `8px 12px`.
- **`checkbox-control` (checkbox)**: bg `#FF4747`, ink `#000000`, (6.2:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#33302E`, ink `#f7f7f8`, (12.2:1), radius `12px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#33302E`, ink `#f7f7f8`, (12.2:1), radius `12px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#33302E`, ink `#f7f7f8`, (12.2:1), radius `12px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#f7f7f8`, ink `#33302E`, (12.2:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#33302E`, ink `#f7f7f8`, (12.2:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#33302E` (dark) with `#f7f7f8` primary text and `#f7f7f8` secondary labels.
- Use `#FF4747` with `#f7f7f8` text (3.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Scoutie Sans` headings with `Scoutie Sans` body copy using documented weights and scale steps.
- Apply `12px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#33302E` surface shifts and `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of dark polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `12px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
