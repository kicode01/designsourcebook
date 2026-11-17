---
version: alpha
name: Pluralsight Design System
description: "Pluralsight Design System — a cohesive design language for Pluralsight products."
colors:
  ps-action-background: "#3C28B1"
  ps-action-background-hover: "#30208D"
  ps-action-background-active: "#24186A"
  ps-action-background-weak: "#E5E8EB"
  ps-action-background-weak-hover: "#F4F5F6"
  ps-action-background-weak-active: "#D1DFEF"
  ps-action-border: "#0969DA"
  ps-action-border-focus: "#3895FF"
  ps-action-text: "#F4F7FA"
  ps-action-text-weak: "#24186A"
  ps-action-text-medium: "#3C28B1"
  ps-action-text-inverse: "#1A2737"
  ps-danger-background: "#B9004B"
  ps-danger-background-hover: "#8B0038"
  ps-danger-background-active: "#5C0026"
  ps-danger-border: "#FF4591"
  ps-danger-surface: "#FFD0E3"
  ps-danger-text: "#5C0026"
  ps-danger-text-weak: "#B9004B"
  ps-danger-text-medium: "#E7005E"
  ps-danger-text-inverse: "#F4F7FA"
  ps-background: "#D9E4F2"
  ps-background-hover: "#DAE3EE"
  ps-background-active: "#D1DFEF"
  ps-border: "#C2D1E2"
  ps-border-weak: "#DAE3EE"
  ps-border-strong: "#89A4C7"
  ps-surface: "#FFFFFF"
  ps-surface-weak: "#f4f7fa"
  ps-surface-medium: "#e8ecf2"
  ps-surface-strong: "#e5e8eb"
  ps-surface-inverse: "#1A2737"
  ps-text: "#3E5674"
  ps-text-weak: "#546F92"
  ps-text-medium: "#4E6583"
  ps-text-strong: "#1A2737"
  ps-text-inverse: "#FFFFFF"
  ps-info-border: "#00A3FF"
  ps-info-surface: "#AAE0FF"
  ps-info-text: "#003655"
  ps-info-text-weak: "#005180"
  ps-info-text-medium: "#0088D5"
  ps-success-border: "#02BB71"
  ps-success-surface: "#A1FED9"
  ps-success-text: "#002517"
  ps-success-text-weak: "#017044"
  ps-success-text-medium: "#01955B"
  ps-warning-border: "#FFBA0D"
  ps-warning-surface: "#FFEDC0"
  ps-warning-text: "#352600"
  ps-warning-text-weak: "#A17300"
  ps-warning-text-medium: "#D69900"
  ps-action-background-light: "#3C28B1"
  ps-action-background-hover-light: "#30208D"
  ps-action-background-active-light: "#24186A"
  ps-action-background-weak-light: "#E5E8EB"
  ps-action-background-weak-hover-light: "#F4F5F6"
  ps-action-background-weak-active-light: "#D1DFEF"
  ps-action-border-light: "#0969DA"
  ps-action-border-focus-light: "#3895FF"
  ps-action-text-light: "#F4F7FA"
  ps-action-text-weak-light: "#24186A"
  ps-action-text-medium-light: "#3C28B1"
  ps-action-text-inverse-light: "#1A2737"
  ps-danger-background-light: "#B9004B"
  ps-danger-background-hover-light: "#8B0038"
  ps-danger-background-active-light: "#5C0026"
  ps-danger-border-light: "#FF4591"
  ps-danger-surface-light: "#FFD0E3"
  ps-danger-text-light: "#5C0026"
  ps-danger-text-weak-light: "#B9004B"
  ps-danger-text-medium-light: "#E7005E"
  ps-danger-text-inverse-light: "#F4F7FA"
  ps-background-light: "#D9E4F2"
  ps-background-hover-light: "#DAE3EE"
  ps-background-active-light: "#D1DFEF"
  ps-border-light: "#C2D1E2"
  ps-border-weak-light: "#DAE3EE"
  ps-border-strong-light: "#89A4C7"
  ps-surface-light: "#FFFFFF"
  ps-surface-weak-light: "#f4f7fa"
  ps-surface-medium-light: "#e8ecf2"
  ps-surface-strong-light: "#e5e8eb"
  ps-surface-inverse-light: "#1A2737"
  ps-text-light: "#3E5674"
  ps-text-weak-light: "#546F92"
  ps-text-medium-light: "#4E6583"
  ps-text-strong-light: "#1A2737"
  ps-text-inverse-light: "#FFFFFF"
  ps-info-border-light: "#00A3FF"
  primary: "#D69900"
typography:
  html:
    fontFamily: "\"PS Commons\", \"Gotham SSm A\", \"Gotham SSm B\", Arial, sans-serif"
    fontSize: 1em
    fontWeight: 500
    lineHeight: 1.5
  h1:
    fontSize: 2.5rem
    lineHeight: 1.1
  h2:
    fontSize: 2rem
  h3:
    fontSize: 1.5rem
  h4:
    fontSize: 1.125rem
  h5:
    fontSize: 1rem
    lineHeight: 1.5
  h6:
    fontSize: 0.875rem
    lineHeight: 1.5
  display-l:
    fontSize: 5.5rem
  display-m:
    fontSize: 4.5rem
  display-s:
    fontSize: 3.5rem
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
icons:
  library: Pluralsight Design System Icons
  package: "@pluralsight/icons"
  style: outline
  grid: 24
  strokeWidth: 1.5
  strokeLinecap: round
  strokeLinejoin: round
  source: npm
  url: "https://design.pluralsight.com/"
components:
  button-primary:
    backgroundColor: "#D69900"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#B9004B"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f4f7fa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f4f7fa"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#D69900"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#02BB71"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f4f7fa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#f4f7fa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#D69900"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#D69900"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f4f7fa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f4f7fa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#FFFFFF"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#f4f7fa"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Pluralsight Design System

## Overview

**Pluralsight Design System** is a light-first design system anchored on `#FFFFFF` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#D69900` brand accent.

Typography centers cleanly on `PS Commons` (88px display down to 16px body), unified by `8px` base corner radius and stepped `#FFFFFF` -> `#f4f7fa` surface layering.

Maintained by **Pluralsight**. Source: published token package (https://design.pluralsight.com/), repo https://github.com/pluralsight/pando, package `@pluralsight/design-tokens`, frameworks: react, css. Inventory: **91** colors, **10** typography steps, and **16** documented components (Apache 2.0 license).

## Colors

- **Canvas (`canvas`)**: `#FFFFFF` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f4f7fa` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#D69900` (2.5:1 vs canvas; pair with `#0b0b0c` foreground ink for 7.9:1 contrast).
- **Structural Border (`border`)**: `#C2D1E2` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `ps-action-background` (`#3C28B1`), `ps-action-background-hover` (`#30208D`), `ps-action-background-active` (`#24186A`), `ps-action-background-weak-active` (`#D1DFEF`), `ps-action-border` (`#0969DA`), `ps-action-border-focus` (`#3895FF`).
- **Neutral Ramp**: `ps-action-background-weak` (`#E5E8EB`), `ps-action-background-weak-hover` (`#F4F5F6`), `ps-action-text` (`#F4F7FA`), `ps-danger-text-inverse` (`#F4F7FA`), `ps-background-hover` (`#DAE3EE`), `ps-border-weak` (`#DAE3EE`).
- **Semantic States**: success: `ps-success-border` (`#02BB71`) · danger: `ps-danger-background` (`#B9004B`) · warning: `ps-warning-border` (`#FFBA0D`) · info: `ps-info-border` (`#00A3FF`).

## Typography

- **Primary / Display Voice**: `"PS Commons", "Gotham SSm A", "Gotham SSm B", Arial, sans-serif` (top step `display-l`: 5.5rem, weight 600).
- **Body & UI Controls**: `"PS Commons", "Gotham SSm A", "Gotham SSm B", Arial, sans-serif` (`html`: 1em, weight 500, line-height 1.5).
- **Scale Steps (10)**: `display-l` (5.5rem), `display-m` (4.5rem), `display-s` (3.5rem), `h1` (2.5rem), `h2` (2rem), `h3` (1.5rem), `h4` (1.125rem), `html` (1em, w500).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f4f7fa` cards; separate sibling sections using `#C2D1E2` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#FFFFFF` -> `#f4f7fa`) and `1px solid #C2D1E2` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#D69900` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Pluralsight Design System Icons (`@pluralsight/icons`) on a `24x24` grid (outline, stroke `1.5px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#D69900`, ink `#0b0b0c`, (7.9:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#B9004B`, ink `#ffffff`, (6.6:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f4f7fa`, ink `#0b0b0c`, (18.3:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f4f7fa`, ink `#0b0b0c`, (18.3:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#D69900`, ink `#0b0b0c`, (7.9:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#02BB71`, ink `#0b0b0c`, (7.8:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f4f7fa`, ink `#0b0b0c`, (18.3:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#f4f7fa`, ink `#0b0b0c`, (18.3:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#D69900`, ink `#0b0b0c`, (7.9:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#D69900`, ink `#0b0b0c`, (7.9:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f4f7fa`, ink `#0b0b0c`, (18.3:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f4f7fa`, ink `#0b0b0c`, (18.3:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#FFFFFF`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f4f7fa`, ink `#0b0b0c`, (18.3:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#FFFFFF` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#D69900` with `#0b0b0c` text (7.9:1) for primary CTAs, active tabs, and focus outlines.
- Pair `PS Commons` headings with `PS Commons` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f4f7fa` surface shifts and `#C2D1E2` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
