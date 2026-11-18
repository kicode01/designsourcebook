---
version: alpha
name: Ariakit
description: "Ariakit — read from the rendered page in a browser, not from published tokens."
colors:
  tw-ring-offset-color: "#fff"
  tw-ring-color: "rgba(41,169,255,.5)"
  border-color: "rgb(0 0 0/0.1)"
  border: "rgba(0,0,0,.1)"
  highlight: "hsla(0,0%,100%,.2)"
  shadow-color: "rgb(0 0 0/0.15)"
  shadow: "rgba(0,0,0,.1)"
  stroke-color: "#e3e3e3"
  bg-canvas: "#fcfdfd"
  canvas-text: "#000000"
  nav-text: "rgba(0, 0, 0, 0.8)"
  footer-bg: "#edf0f3"
  link-bg: "#007acc"
  link-text: "#ffffff"
  link-text-1: "#006bb3"
  primary: "#007acc"
typography:
  html:
    fontFamily: "ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\""
    lineHeight: 1.5
rounded:
  button: 8px
  input: 6px
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
  button:
    backgroundColor: "#ffffff"
    textColor: "rgba(0, 0, 0, 0.8)"
    rounded: 8px
    padding: 0px 12px
  button-2:
    textColor: "#000000"
    rounded: 8px
    padding: 0px 16px
  button-3:
    backgroundColor: "#007acc"
    textColor: "#ffffff"
    rounded: 6px
    padding: 0px 16px
  input:
    backgroundColor: "#ffffff"
    textColor: "#000000"
    rounded: 6px
    padding: 0px 16px
  select:
    backgroundColor: "#ffffff"
    textColor: "rgba(0, 0, 0, 0.8)"
    rounded: 8px
    padding: 0px 12px
  switch-control:
    backgroundColor: "#007acc"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#007acc"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#fcfdfd"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#fcfdfd"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Ariakit

## Overview

**Ariakit** is a light-first design system anchored on `#fcfdfd` canvas surfaces with `#0b0b0c` primary ink (19.3:1 contrast) and `#007acc` brand accent.

Typography centers cleanly on `System UI` (16px display down to 16px body), unified by `8px` base corner radius and subtle shadow elevation.

Source: live stylesheet extraction (https://ariakit.org/). Inventory: **16** colors, **1** typography steps, and **12** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#fcfdfd` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fff` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.3:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#007acc` (4.4:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.2:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `primary` (`#007acc`).
- **Neutral Ramp**: `tw-ring-offset-color` (`#fff`), `stroke-color` (`#e3e3e3`), `bg-canvas` (`#fcfdfd`), `canvas-text` (`#000000`), `nav-text` (`rgba(0, 0, 0, 0.8)`), `footer-bg` (`#edf0f3`).
- **Semantic States**: info: `link-bg` (`#007acc`).

## Typography

- **Primary / Display Voice**: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` (top step `html`: 16px, weight 600, line-height 1.5).
- **Body & UI Controls**: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` (`html`: 16px, weight 400, line-height 1.5).

## Layout

- **Grid & Control Spacing**: Derived from 12 component tokens with documented paddings: `0px 12px`, `0px 16px`, `2px`, `6px 12px`, `12px 14px`.
- **Hierarchy**: Group controls cleanly within `#fff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Layered Shadow Model**: Uses documented shadows (`rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.2) 0px 2px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 1px 1px 0px`, `rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.08) 0px 2px 5px 0px inset`) paired with `color-mix(in srgb, #0b0b0c 14%, transparent)` borders for elevated overlays.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#007acc` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `6px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button` (button)**: bg `#ffffff`, ink `rgba(0, 0, 0, 0.8)`, (12.6:1), radius `8px`, padding `0px 12px`.
- **`button-2` (button)**: ink `#000000`, radius `8px`, padding `0px 16px`.
- **`button-3` (button)**: bg `#007acc`, ink `#ffffff`, (4.5:1), radius `6px`, padding `0px 16px`.
- **`input` (input)**: bg `#ffffff`, ink `#000000`, (21.0:1), radius `6px`, padding `0px 16px`.
- **`select` (select)**: bg `#ffffff`, ink `rgba(0, 0, 0, 0.8)`, (12.6:1), radius `8px`, padding `0px 12px`.
- **`switch-control` (switch)**: bg `#007acc`, ink `#000000`, (4.7:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#007acc`, ink `#000000`, (4.7:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fcfdfd`, ink `#0b0b0c`, (19.3:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fcfdfd`, (19.3:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fcfdfd` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#007acc` with `#f7f7f8` text (4.2:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#fff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
