---
version: alpha
name: Kontur
description: "Kontur — read from the rendered page in a browser, not from published tokens."
colors:
  search-icons-input-shadow-color: "rgba(0,0,0,0.15)"
  main-text-color: "rgba(0,0,0,0.88)"
  body-background-color: "#ffffff"
  canvas-text: "rgba(0, 0, 0, 0.88)"
  nav-text: "rgba(255, 255, 255, 0.96)"
  body-text: "rgba(0, 0, 0, 0.56)"
  link-text: "rgba(255, 255, 255, 0.64)"
  input-bg: "#1e1f26"
  css-color-9: "#007f34"
  css-color-10: "#d26e00"
  css-color-11: "#c50220"
  css-surface-12: "#ffbe3d"
  css-surface-13: "#f63b40"
  css-color-14: "rgba(0,0,0,0.4)"
  css-surface-15: "#484848"
  css-color-16: "rgba(0,0,0,0.56)"
  css-surface-17: "rgba(0,0,0,0.16)"
  css-surface-18: "rgba(0,0,0,0.06)"
  css-color-19: "rgba(0,0,0,0.32)"
  css-surface-20: "#f2f2f2"
  css-surface-21: "rgba(0,0,0,0.24)"
  css-surface-22: "rgba(0,0,0,0.96)"
  css-color-23: "rgba(255,255,255,0.96)"
  css-color-24: "#d7d7d7"
  css-color-25: "rgba(255,255,255,0.64)"
  css-color-26: "#00a948"
  css-border-27: "#3d3d3d"
  css-border-28: "#292929"
  css-surface-29: "rgba(24, 24, 27, 0.92)"
  css-color-30: "#374151"
  css-color-31: "#cccccc"
  css-surface-32: "rgba(255, 255, 255, 0.1)"
  css-surface-33: "rgba(24, 24, 27, 0.9)"
  css-surface-34: "#e5e3df"
  css-border-35: "rgba(34, 213, 233, 0.96)"
  css-surface-36: "rgba(255,255,255,.1)"
  css-surface-37: "rgba(24,24,27,.9)"
  css-surface-38: "#ffff00"
  css-color-39: "#000000"
  primary: "#ffbe3d"
typography:
  glossary-list-letter-title:
    fontSize: 16px
  helper-title:
    fontSize: 20px
    fontWeight: 700
    lineHeight: 32px
  product-colors-card-title:
    fontFamily: "\"Lab Grotesque K\", \"Segoe UI\", sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 24px
  body:
    fontFamily: "\"Lab Grotesque\", -apple-system, BlinkMacSystemFont, Arial, \"Liberation Sans\", \"Nimbus Sans L\", sans-serif"
    fontSize: 14px
  nav-main-title:
    fontSize: 20px
    fontWeight: 200
    lineHeight: 22px
  h1:
    fontSize: 40px
    fontWeight: 700
    lineHeight: 48px
  h2:
    fontSize: 32px
    fontWeight: 700
    lineHeight: 40px
  h3:
    fontSize: 24px
    fontWeight: 700
    lineHeight: 32px
  h4:
    fontSize: 20px
    fontWeight: 700
    lineHeight: 28px
  menu-title:
    fontSize: 24px
    fontWeight: 600
  html:
    fontFamily: sans-serif
rounded:
  nav: 8px
  default: 8px
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
  nav:
    backgroundColor: "#f2f2f2"
    textColor: "rgba(0,0,0,0.88)"
    typography:
      fontSize: 16px
    width: 270px
  link:
    textColor: "rgba(0,0,0,0.88)"
  modal:
    backgroundColor: "rgba(0,0,0,0.24)"
  banner:
    backgroundColor: "rgb(30, 31, 38)"
    textColor: "rgba(255,255,255,0.96)"
    height: 162px
  icon-color_error:
    textColor: "#f63b40"
  icon-color_success-2:
    textColor: "#00a948"
  icon-color_warning-3:
    textColor: "#ffbe3d"
  product-colors-card:
    textColor: "rgba(0,0,0,0.88)"
    typography:
      fontSize: 18px
  select-default:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#ffbe3d"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#ffbe3d"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  table-grid:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#ffffff"
    rounded: 6px
    padding: 6px 10px
---

# Kontur

## Overview

**Kontur** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#ffbe3d` brand accent.

Display headlines pair `Lab Grotesque K` with `Lab Grotesque` body copy (40px display down to 14px body), unified by `8px` base corner radius and subtle shadow elevation.

Source: live stylesheet extraction (https://guides.kontur.ru/). Inventory: **40** colors, **11** typography steps, and **14** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f2f2f2` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ffbe3d` (1.7:1 vs canvas; pair with `#0b0b0c` foreground ink for 11.9:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `css-color-9` (`#007f34`), `css-color-10` (`#d26e00`), `css-color-11` (`#c50220`), `css-surface-12` (`#ffbe3d`), `css-surface-13` (`#f63b40`), `css-color-26` (`#00a948`).
- **Neutral Ramp**: `main-text-color` (`rgba(0,0,0,0.88)`), `body-background-color` (`#ffffff`), `canvas-text` (`rgba(0, 0, 0, 0.88)`), `nav-text` (`rgba(255, 255, 255, 0.96)`), `input-bg` (`#1e1f26`), `css-surface-15` (`#484848`).

## Typography

- **Primary / Display Voice**: `"Lab Grotesque K", "Segoe UI", sans-serif` (top step `h1`: 40px, weight 700, line-height 48px).
- **Body & UI Controls**: `"Lab Grotesque", -apple-system, BlinkMacSystemFont, Arial, "Liberation Sans", "Nimbus Sans L", sans-serif` (`body`: 14px, weight 400).
- **Scale Steps (11)**: `h1` (40px, w700), `h2` (32px, w700), `h3` (24px, w700), `menu-title` (24px, w600), `helper-title` (20px, w700), `nav-main-title` (20px, w200), `h4` (20px, w700), `product-colors-card-title` (18px, w600).

## Layout

- **Grid & Control Spacing**: Derived from 14 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `10px 14px`, `6px 10px`.
- **Hierarchy**: Group controls cleanly within `#f2f2f2` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Layered Shadow Model**: Uses documented shadows (`rgba(0, 0, 0, 0.04) 0px 16px 32px`) paired with `color-mix(in srgb, #0b0b0c 14%, transparent)` borders for elevated overlays.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ffbe3d` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`nav` (nav)**: bg `#f2f2f2`, ink `rgba(0,0,0,0.88)`, (15.1:1).
- **`link` (link)**: ink `rgba(0,0,0,0.88)`.
- **`modal` (modal)**: bg `rgba(0,0,0,0.24)`.
- **`banner` (alert)**: bg `rgb(30, 31, 38)`, ink `rgba(255,255,255,0.96)`, (15.2:1).
- **`icon-color_error` (icon)**: ink `#f63b40`.
- **`icon-color_success-2` (icon)**: ink `#00a948`.
- **`icon-color_warning-3` (icon)**: ink `#ffbe3d`.
- **`product-colors-card` (card)**: ink `rgba(0,0,0,0.88)`.
- **`select-default` (select)**: bg `#f2f2f2`, ink `#0b0b0c`, (17.6:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#ffbe3d`, ink `#0b0b0c`, (11.9:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#ffbe3d`, ink `#0b0b0c`, (11.9:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f2f2f2`, ink `#0b0b0c`, (17.6:1), radius `8px`, padding `6px 12px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ffbe3d` with `#0b0b0c` text (11.9:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Lab Grotesque K` headings with `Lab Grotesque` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f2f2f2` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
