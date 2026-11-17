---
version: alpha
name: Vibe
description: "Crisp light (#ffffff) canvas, Figtree typography, #0073ea brand accent, and 8px corner geometry"
colors:
  primary-color: "#0073ea"
  primary-hover-color: "#0060b9"
  primary-selected-color: "#cce5ff"
  primary-selected-hover-color: "#aed4fc"
  primary-highlighted-color: "#f0f7ff"
  primary-surface-color: "#eceff8"
  primary-text-color: "#323338"
  secondary-text-color: "#676879"
  text-color-on-inverted: "#ffffff"
  text-color-on-primary: "#ffffff"
  inverted-color-background: "#323338"
  primary-background-color: "#ffffff"
  secondary-background-color: "#ffffff"
  allgrey-background-color: "#f6f7fb"
  ui-border-color: "#c3c6d4"
  ui-background-color: "#e7e9ef"
  ui-background-hover-color: "#d8d9e0"
  layout-border-color: "#d0d4e4"
  disabled-background-color: "#ecedf5"
  link-color: "#1f76c2"
  brand-color: "#0073ea"
  brand-hover-color: "#0060b9"
  brand-selected-color: "#cce5ff"
  brand-selected-hover-color: "#aed4fc"
  warning-color: "#ffcb00"
  warning-color-hover: "#eaaa15"
  warning-color-selected: "#fceba1"
  warning-color-selected-hover: "#f2d973"
  grey-background-color: "#f6f7fb"
  text-color-on-brand: "#ffffff"
  color-surface: "#292f4c"
  primary-on-secondary-color: "#0073ea"
  primary-hover-on-secondary-color: "#0060b9"
  primary-selected-on-secondary-color: "#cce5ff"
  primary-text-on-secondary-color: "#323338"
  primary-background-hover-on-secondary-color: "#dcdfec"
  secondary-text-on-secondary-color: "#676879"
  link-on-secondary-color: "#1f76c2"
  modal-background-color: "#ffffff"
  dark-background-color: "#f6f7fb"
  dark-background-on-secondary-color: "#f6f7fb"
  dialog-background-color: "#ffffff"
  label-background-color: "#cce5ff"
  label-background-on-secondary-color: "#cce5ff"
  icon-on-secondary-color: "#676879"
  placeholder-on-secondary-color: "#676879"
  ui-border-on-secondary-color: "#c3c6d4"
  layout-border-on-secondary-color: "#d0d4e4"
  disabled-background-on-secondary-color: "#ecedf5"
  color-success: "#00854d"
  color-error: "#d83a52"
  color-success-hover: "#007038"
  color-success-highlight: "#bbdbc9"
  color-error-hover: "#b63546"
  color-error-highlight: "#f4c3cb"
  color-link-color: "#1f76c2"
  color-blue-links: "#007eb5"
  color-board-views-blue-secondary: "#363a52"
  color-border-light-gray: "#f5f6f8"
  color-brand-blue: "#00a9ff"
  color-brand-charcoal: "#2b2c5c"
  color-brand-gold: "#ffcc00"
  color-brand-green: "#11dd80"
  color-brand-iris: "#595ad4"
  color-brand-light-blue: "#00cff4"
  color-brand-malachite: "#00cd6f"
  color-brand-purple: "#a358d0"
  color-brand-red: "#f74875"
  color-pulse-text-color: "#333333"
  primary-selected-color-rgb: "#9f4077"
  primary-background-color-rgb: "#282a36"
  secondary-background-color-rgb: "#30324e"
  sb-link-color: "#1f76c2"
  sb-primary-background-color: "#ffffff"
  sb-primary-text-color: "#323338"
  sb-ui-border-color: "#c3c6d4"
  sb-dark-background-on-secondary-color: "#f6f7fb"
  sb-text-color-on-primary: "#ffffff"
  sb-layout-border-color: "#d0d4e4"
  sb-secondary-background-color: "#ffffff"
  sb-primary-hover-color: "#0060b9"
  sb-secondary-text-color: "#676879"
  sb-primary-color: "#0073ea"
  sb-primary-selected-color: "#cce5ff"
  sb-warning-color-selected: "#fceba1"
  sb-text-color-fixed-light: "#ffffff"
  sb-text-color-fixed-dark: "#323338"
  sb-inverted-color-background: "#323338"
  sb-disabled-background-color: "#ecedf5"
  sb-dark-background-color: "#f6f7fb"
  primary: "#0073ea"
typography:
  font-size-avatar-small:
    fontSize: 12px
  font-size-10:
    fontSize: 14px
  font-size-20:
    fontSize: 14px
  font-size-30:
    fontSize: 16px
  font-size-40:
    fontSize: 18px
  font-size-50:
    fontSize: 24px
  font-size-60:
    fontSize: 30px
  font-family:
    fontFamily: "Figtree, Roboto, \"Noto Sans Hebrew\", \"Noto Kufi Arabic\", \"Noto Sans JP\", sans-serif"
  title-font-family:
    fontFamily: "Poppins, Roboto, \"Noto Sans Hebrew\", \"Noto Kufi Arabic\", \"Noto Sans JP\", sans-serif"
  sb-h1-font-size:
    fontSize: 40px
  sb-h2-font-size:
    fontSize: 28px
  sb-h3-font-size:
    fontSize: 18px
  sb-text-font-size:
    fontSize: 16px
  sb-small-text-font-size:
    fontSize: 14px
  sb-font-family:
    fontFamily: "Figtree, Roboto, \"Noto Sans Hebrew\", \"Noto Kufi Arabic\", \"Noto Sans JP\", sans-serif"
  sb-title-font-family:
    fontFamily: "Poppins, Roboto, \"Noto Sans Hebrew\", \"Noto Kufi Arabic\", \"Noto Sans JP\", sans-serif"
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
icons:
  library: Vibe Icons
  package: "@vibe/icons"
  style: outline
  grid: 20
  strokeWidth: 1.5
  strokeLinecap: round
  strokeLinejoin: round
  source: curated
  url: "https://vibe.monday.com"
components:
  button-primary:
    backgroundColor: "#0073ea"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#d83a52"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#eceff8"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#eceff8"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#0073ea"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#00854d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#eceff8"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#eceff8"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#0073ea"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#0073ea"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#eceff8"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#eceff8"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
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
  icon-glyph:
    backgroundColor: "#eceff8"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Vibe

## Overview

**Vibe** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#0073ea` brand accent.

Typography centers cleanly on `Figtree` (40px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#eceff8` surface layering.

Source: published token package (https://github.com/mondaycom/vibe), repo https://github.com/mondaycom/vibe, package `@vibe/core`, frameworks: react, css. Inventory: **91** colors, **16** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#eceff8` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#0073ea` (4.5:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.2:1 contrast).
- **Structural Border (`border`)**: `#f5f6f8` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `primary-color` (`#0073ea`), `primary-hover-color` (`#0060b9`), `primary-selected-color` (`#cce5ff`), `primary-selected-hover-color` (`#aed4fc`), `brand-color` (`#0073ea`), `brand-hover-color` (`#0060b9`).
- **Neutral Ramp**: `primary-highlighted-color` (`#f0f7ff`), `primary-surface-color` (`#eceff8`), `primary-text-color` (`#323338`), `secondary-text-color` (`#676879`), `text-color-on-inverted` (`#ffffff`), `text-color-on-primary` (`#ffffff`).
- **Semantic States**: success: `color-success` (`#00854d`) · danger: `color-error` (`#d83a52`) · warning: `warning-color` (`#ffcb00`) · info: `link-color` (`#1f76c2`).

## Typography

- **Primary / Display Voice**: `Figtree, Roboto, "Noto Sans Hebrew", "Noto Kufi Arabic", "Noto Sans JP", sans-serif` (top step `sb-h1-font-size`: 40px, weight 600).
- **Body & UI Controls**: `Figtree, Roboto, "Noto Sans Hebrew", "Noto Kufi Arabic", "Noto Sans JP", sans-serif` (`font-size-30`: 16px, weight 400).
- **Scale Steps (16)**: `sb-h1-font-size` (40px), `font-size-60` (30px), `sb-h2-font-size` (28px), `font-size-50` (24px), `font-size-40` (18px), `sb-h3-font-size` (18px), `font-size-30` (16px), `font-family` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#eceff8` cards; separate sibling sections using `#f5f6f8` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#eceff8`) and `1px solid #f5f6f8` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#0073ea` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Vibe Icons (`@vibe/icons`) on a `20x20` grid (outline, stroke `1.5px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#0073ea`, ink `#ffffff`, (4.5:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#d83a52`, ink `#ffffff`, (4.5:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#eceff8`, ink `#0b0b0c`, (17.1:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#eceff8`, ink `#0b0b0c`, (17.1:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#0073ea`, ink `#ffffff`, (4.5:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#00854d`, ink `#ffffff`, (4.7:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#eceff8`, ink `#0b0b0c`, (17.1:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#eceff8`, ink `#0b0b0c`, (17.1:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#0073ea`, ink `#0b0b0c`, (4.3:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#0073ea`, ink `#0b0b0c`, (4.3:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#eceff8`, ink `#0b0b0c`, (17.1:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#eceff8`, ink `#0b0b0c`, (17.1:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#eceff8`, ink `#0b0b0c`, (17.1:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#0073ea` with `#f7f7f8` text (4.2:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Figtree` headings with `Figtree` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#eceff8` surface shifts and `#f5f6f8` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
