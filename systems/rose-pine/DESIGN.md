---
version: alpha
name: Rose Pine
description: "Rose Pine — tokens imported from @rose-pine/palette."
colors:
  rp-muted: "hsl(249deg, 12%, 47%)"
  rp-subtle: "hsl(248deg, 15%, 61%)"
  rp-text: "hsl(245deg, 50%, 91%)"
  rp-love: "hsl(343deg, 76%, 68%)"
  rp-gold: "hsl(35deg, 88%, 72%)"
  rp-foam: "hsl(189deg, 43%, 73%)"
  rp-iris: "hsl(267deg, 57%, 78%)"
  rp-base: "hsl(249deg, 22%, 12%)"
  rp-surface: "hsl(247deg, 23%, 15%)"
  rp-overlay: "hsl(248deg, 25%, 18%)"
  rp-rose: "hsl(2deg, 55%, 83%)"
  rp-pine: "hsl(197deg, 49%, 38%)"
  rp-highlight-low: "hsl(244deg, 18%, 15%)"
  rp-highlight-med: "hsl(249deg, 15%, 28%)"
  rp-highlight-high: "hsl(248deg, 13%, 36%)"
  rp-moon-base: "hsl(246deg, 24%, 17%)"
  rp-moon-surface: "hsl(248deg, 24%, 20%)"
  rp-moon-overlay: "hsl(248deg, 21%, 26%)"
  rp-moon-muted: "hsl(249deg, 12%, 47%)"
  rp-moon-subtle: "hsl(248deg, 15%, 61%)"
  rp-moon-text: "hsl(245deg, 50%, 91%)"
  rp-moon-love: "hsl(343deg, 76%, 68%)"
  rp-moon-gold: "hsl(35deg, 88%, 72%)"
  rp-moon-rose: "hsl(2deg, 66%, 75%)"
  rp-moon-pine: "hsl(197deg, 48%, 47%)"
  rp-moon-foam: "hsl(189deg, 43%, 73%)"
  rp-moon-iris: "hsl(267deg, 57%, 78%)"
  rp-moon-highlight-low: "hsl(245deg, 22%, 20%)"
  rp-moon-highlight-med: "hsl(247deg, 16%, 30%)"
  rp-moon-highlight-high: "hsl(249deg, 15%, 38%)"
  rp-dawn-base: "hsl(32deg, 57%, 95%)"
  rp-dawn-surface: "hsl(35deg, 100%, 98%)"
  rp-dawn-overlay: "hsl(33deg, 43%, 91%)"
  rp-dawn-muted: "hsl(257deg, 9%, 61%)"
  rp-dawn-subtle: "hsl(248deg, 12%, 52%)"
  rp-dawn-text: "hsl(248deg, 19%, 40%)"
  rp-dawn-love: "hsl(343deg, 35%, 55%)"
  rp-dawn-gold: "hsl(35deg, 81%, 56%)"
  rp-dawn-rose: "hsl(3deg, 53%, 67%)"
  rp-dawn-pine: "hsl(197deg, 53%, 34%)"
  rp-dawn-foam: "hsl(189deg, 30%, 48%)"
  rp-dawn-iris: "hsl(268deg, 21%, 57%)"
  rp-dawn-highlight-low: "hsl(25deg, 35%, 93%)"
  rp-dawn-highlight-med: "hsl(10deg, 9%, 86%)"
  rp-dawn-highlight-high: "hsl(315deg, 4%, 80%)"
  surface: "#1f1d2e"
  overlay: "#26233a"
  muted: "#6e6a86"
  subtle: "#908caa"
  text: "#e0def4"
  love: "#eb6f92"
  gold: "#f6c177"
  rose: "#ebbcba"
  pine: "#31748f"
  foam: "#9ccfd8"
  iris: "#c4a7e7"
  highlight-low: "#21202e"
  highlight-med: "#403d52"
  highlight-high: "#524f67"
  primary: "hsl(35deg, 81%, 56%)"
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
  select-default:
    backgroundColor: "hsl(32deg, 57%, 95%)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "hsl(35deg, 81%, 56%)"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "hsl(35deg, 81%, 56%)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "hsl(32deg, 57%, 95%)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "hsl(32deg, 57%, 95%)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "hsl(35deg, 100%, 98%)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "hsl(35deg, 100%, 98%)"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "hsl(32deg, 57%, 95%)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Rose Pine

## Overview

**Rose Pine** is a light-first design system anchored on `hsl(35deg, 100%, 98%)` canvas surfaces with `#0b0b0c` primary ink (19.1:1 contrast) and `hsl(35deg, 81%, 56%)` brand accent.

Typography centers cleanly on `System UI` (large display down to 14px body), unified by `8px` base corner radius and stepped `hsl(35deg, 100%, 98%)` -> `hsl(32deg, 57%, 95%)` surface layering.

Source: published token package, package `@rose-pine/palette`. Inventory: **60** colors, **0** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `hsl(35deg, 100%, 98%)` — base application backdrop (light theme).
- **Surface (`surface`)**: `hsl(32deg, 57%, 95%)` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.1:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `hsl(35deg, 81%, 56%)` (2.2:1 vs canvas; pair with `#0b0b0c` foreground ink for 8.8:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `rp-muted` (`hsl(249deg, 12%, 47%)`), `rp-subtle` (`hsl(248deg, 15%, 61%)`), `rp-love` (`hsl(343deg, 76%, 68%)`), `rp-gold` (`hsl(35deg, 88%, 72%)`), `rp-foam` (`hsl(189deg, 43%, 73%)`), `rp-iris` (`hsl(267deg, 57%, 78%)`).
- **Neutral Ramp**: `rp-text` (`hsl(245deg, 50%, 91%)`), `rp-base` (`hsl(249deg, 22%, 12%)`), `rp-surface` (`hsl(247deg, 23%, 15%)`), `rp-overlay` (`hsl(248deg, 25%, 18%)`), `rp-highlight-low` (`hsl(244deg, 18%, 15%)`), `rp-highlight-med` (`hsl(249deg, 15%, 28%)`).

## Typography

- **Primary / Display Voice**: `System UI`.
- **Body & UI Controls**: `System UI`.

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `hsl(32deg, 57%, 95%)` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`hsl(35deg, 100%, 98%)` -> `hsl(32deg, 57%, 95%)`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `hsl(35deg, 81%, 56%)` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `hsl(32deg, 57%, 95%)`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `hsl(35deg, 81%, 56%)`, ink `#0b0b0c`, (8.8:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `hsl(35deg, 81%, 56%)`, ink `#0b0b0c`, (8.8:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `hsl(32deg, 57%, 95%)`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `hsl(32deg, 57%, 95%)`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `hsl(35deg, 100%, 98%)`, ink `#0b0b0c`, (19.1:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `hsl(35deg, 100%, 98%)`, (19.1:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `hsl(32deg, 57%, 95%)`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `hsl(35deg, 100%, 98%)` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `hsl(35deg, 81%, 56%)` with `#0b0b0c` text (8.8:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `hsl(32deg, 57%, 95%)` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
