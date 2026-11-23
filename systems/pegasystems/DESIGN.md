---
version: alpha
name: Pega Cosmos
description: "Pegasystems Pega Cosmos — read from design.pega.com's live stylesheets, not a published token package."
colors:
  wp-block-synced-color: "#7a00df"
  wp-block-synced-color-rgb: "rgb(122, 0, 223)"
  wp-editor-canvas-background: "#ddd"
  wp-admin-theme-color: "#007cba"
  wp-admin-theme-color-rgb: "rgb(0, 124, 186)"
  wp-admin-theme-color-darker-10: "#006ba1"
  wp-admin-theme-color-darker-20: "#005a87"
  wp-admin-theme-color-darker-20-rgb: "rgb(0, 90, 135)"
  wp-preset-color-black: "#000000"
  wp-preset-color-cyan-bluish-gray: "#abb8c3"
  wp-preset-color-white: "#ffffff"
  wp-preset-color-pale-pink: "#f78da7"
  wp-preset-color-vivid-red: "#cf2e2e"
  wp-preset-color-luminous-vivid-orange: "#ff6900"
  wp-preset-color-luminous-vivid-amber: "#fcb900"
  wp-preset-color-light-green-cyan: "#7bdcb5"
  wp-preset-color-vivid-green-cyan: "#00d084"
  wp-preset-color-pale-cyan-blue: "#8ed1fc"
  wp-preset-color-vivid-cyan-blue: "#0693e3"
  wp-preset-color-vivid-purple: "#9b51e0"
  color-primary: "#1a3a5c"
  color-primary-dark: "#0f2540"
  color-accent: "#0B6DD3"
  color-accent-hover: "#005fa3"
  color-accent-light: "#e8f3fb"
  color-text: "#050505"
  color-text-muted: "#444"
  color-border: "rgb(207, 207, 207)"
  color-bg: "#ffffff"
  color-sidebar-bg: "#f8fafc"
  color-header-bg: "#1a3a5c"
  color-footer-bg: "#111827"
  color-footer-text: "#d1d5db"
  color-hex-f1f5f9: "#f1f5f9"
  color-hex-0f1117: "#0f1117"
  color-hex-fafbfc: "#fafbfc"
  color-hex-dbeafe: "#dbeafe"
  color-hex-374151: "#374151"
  color-hex-93c5fd: "#93c5fd"
  color-rgb-3-32-92: "rgb(3,32,92)"
  color-rgb-0-0-71: "rgb(0,0,71)"
  primary: "#0B6DD3"
typography:
  wp-preset-font-size-normal:
    fontSize: 16px
  wp-preset-font-size-huge:
    fontSize: 42px
  wp-preset-font-size-small:
    fontSize: 13px
  wp-preset-font-size-medium:
    fontSize: 20px
  wp-preset-font-size-large:
    fontSize: 36px
  wp-preset-font-size-x-large:
    fontSize: 42px
  font-heading:
    fontFamily: "\"Roboto Flex\", sans-serif"
  font-body:
    fontFamily: "\"Roboto Flex\", sans-serif"
  font-mono:
    fontFamily: monospace
  h1:
    fontSize: 2.4rem
    fontWeight: 500
  h3:
    fontSize: 1.35rem
    fontWeight: 400
  site-title:
    fontSize: 1.1rem
    fontWeight: 700
  widget-title:
    fontSize: ".65rem"
    fontWeight: 700
  entry-title:
    fontSize: 1.2rem
  comment-body:
    fontSize: ".9rem"
  pega-footer-heading:
    fontSize: 12px
    fontWeight: 700
rounded:
  button: 2px
  nav: 4px
  default: 4px
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
  link:
    backgroundColor: "#1a3a5c"
    typography:
      fontSize: ".875rem"
    rounded: 0.375rem
    padding: ".5rem 1rem"
  notice-box:
    backgroundColor: "#e8f3fb"
    typography:
      fontSize: ".9rem"
    rounded: 0.375rem
    padding: 1rem 1.25rem
  btn:
    backgroundColor: "#fff0"
    textColor: "#fff"
    typography:
      fontSize: 1.1rem
      fontWeight: 700
    rounded: 2px
    padding: 6px 12px
  toggle:
    textColor: "rgb(255 255 255 / .9)"
    rounded: 0.375rem
    height: 2rem
    width: 2rem
  wp-block-button:
    backgroundColor: "#32373c"
    textColor: "#fff"
    typography:
      fontSize: 1.125em
    rounded: 9999px
  select-default:
    backgroundColor: "#111827"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 8px 12px
  checkbox-control:
    backgroundColor: "#0B6DD3"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#111827"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 6px 12px
  table-grid:
    backgroundColor: "#000000"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#f7f7f8"
    textColor: "#000000"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#111827"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 8px
---

# Pega Cosmos

## Overview

**Pega Cosmos** is a dark-first design system anchored on `#000000` canvas surfaces with `#f7f7f8` primary ink (19.6:1 contrast) and `#0B6DD3` brand accent.

Display headlines pair `System Mono` with `Roboto Flex` body copy (42px display down to 16px body), unified by `4px` base corner radius and stepped `#000000` -> `#111827` surface layering.

Maintained by **Pegasystems**. Source: live stylesheet extraction (https://design.pega.com/). Inventory: **42** colors, **16** typography steps, and **11** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#000000` — base application backdrop (dark theme).
- **Surface (`surface`)**: `#111827` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#f7f7f8` — body copy and primary headings (19.6:1 on canvas).
- **Muted Ink (`muted`)**: `#f7f7f8` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#0B6DD3` (4.1:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #f7f7f8 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `wp-block-synced-color` (`#7a00df`), `wp-block-synced-color-rgb` (`rgb(122, 0, 223)`), `wp-admin-theme-color` (`#007cba`), `wp-admin-theme-color-rgb` (`rgb(0, 124, 186)`), `wp-admin-theme-color-darker-10` (`#006ba1`), `wp-admin-theme-color-darker-20` (`#005a87`).
- **Neutral Ramp**: `wp-editor-canvas-background` (`#ddd`), `wp-preset-color-black` (`#000000`), `wp-preset-color-cyan-bluish-gray` (`#abb8c3`), `wp-preset-color-white` (`#ffffff`), `color-accent-light` (`#e8f3fb`), `color-text` (`#050505`).
- **Semantic States**: success: `wp-preset-color-light-green-cyan` (`#7bdcb5`) · danger: `wp-preset-color-vivid-red` (`#cf2e2e`) · warning: `wp-preset-color-luminous-vivid-orange` (`#ff6900`).

## Typography

- **Primary / Display Voice**: `monospace` (top step `wp-preset-font-size-huge`: 42px, weight 600).
- **Body & UI Controls**: `"Roboto Flex", sans-serif` (`font-body`: 16px, weight 400).
- **Monospace / Technical Labels**: `monospace` (`wp-preset-font-size-huge`: 42px).
- **Scale Steps (16)**: `wp-preset-font-size-huge` (42px), `wp-preset-font-size-x-large` (42px), `h1` (2.4rem, w500), `wp-preset-font-size-large` (36px), `h3` (1.35rem, w400), `wp-preset-font-size-medium` (20px), `entry-title` (1.2rem), `site-title` (1.1rem, w700).

## Layout

- **Grid & Control Spacing**: Derived from 11 component tokens with documented paddings: `.5rem 1rem`, `1rem 1.25rem`, `6px 12px`, `8px 12px`, `2px`.
- **Hierarchy**: Group controls cleanly within `#111827` cards; separate sibling sections using `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#000000` -> `#111827`) and `1px solid color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#0B6DD3` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `4px` (Buttons `2px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `4px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`link` (link)**: bg `#1a3a5c`, radius `0.375rem`, padding `.5rem 1rem`.
- **`notice-box` (alert)**: bg `#e8f3fb`, radius `0.375rem`, padding `1rem 1.25rem`.
- **`btn` (button)**: bg `#fff0`, ink `#fff`, (21.0:1), radius `2px`, padding `6px 12px`.
- **`toggle` (switch)**: ink `rgb(255 255 255 / .9)`, radius `0.375rem`.
- **`wp-block-button` (button)**: bg `#32373c`, ink `#fff`, (12.0:1), radius `9999px`.
- **`select-default` (select)**: bg `#111827`, ink `#f7f7f8`, (16.6:1), radius `4px`, padding `8px 12px`.
- **`checkbox-control` (checkbox)**: bg `#0B6DD3`, ink `#f7f7f8`, (4.7:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#111827`, ink `#f7f7f8`, (16.6:1), radius `4px`, padding `6px 12px`.
- **`table-grid` (table)**: bg `#000000`, ink `#f7f7f8`, (19.6:1), radius `4px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#f7f7f8`, ink `#000000`, (19.6:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#111827`, ink `#f7f7f8`, (16.6:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#000000` (dark) with `#f7f7f8` primary text and `#f7f7f8` secondary labels.
- Use `#0B6DD3` with `#f7f7f8` text (4.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System Mono` headings with `Roboto Flex` body copy using documented weights and scale steps.
- Apply `4px` base geometry across inputs and buttons (4px on outer containers).
- Separate containers via `#111827` surface shifts and `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of dark polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `4px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
