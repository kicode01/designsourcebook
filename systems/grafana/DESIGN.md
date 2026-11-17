---
version: alpha
name: Grafana Saga
description: "Dark observability dashboard, Inter + Roboto Mono telemetry and high-contrast alerts"
colors:
  bg-canvas: "#111217"
  bg-surface: "#181b1f"
  text-primary: "#ccccdc"
  a04338: "#5a372a"
  color: "#f59433"
  webkit-tap-highlight-color: "rgba(0, 0, 0, 0)"
  eec97d: "#855a00"
  fd48cb: "#ff20ed"
  23a0db: "#00008b"
  default-annotation-color: "rgba(0, 211, 255, 1)"
  ok-color: "rgba(11, 237, 50, 1)"
  alerting-color: "rgba(237, 46, 24, 1)"
  no-data-color: "rgba(150, 150, 150, 1)"
  pending-color: "rgba(247, 149, 32, 1)"
  58558c: "#c9c5f4"
  2e2f35: "#bab4ca"
  transparent: "rgba(204, 204, 220, 0.04)"
  primary: "rgba(247, 149, 32, 1)"
typography:
  font-sans:
    fontFamily: "Inter, \"Helvetica Neue\", Arial, sans-serif"
  font-mono:
    fontFamily: "\"Roboto Mono\", monospace"
  font-size:
    fontSize: "80%"
rounded:
  button: 4px
  input: 4px
  card: 8px
  badge: 999px
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
  button-primary:
    backgroundColor: "rgba(247, 149, 32, 1)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#ccccdc"
    rounded: 4px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 4px
    padding: 10px 18px
  input-default:
    backgroundColor: "#181b1f"
    textColor: "#ccccdc"
    rounded: 4px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#181b1f"
    textColor: "#ccccdc"
    rounded: 8px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "rgba(247, 149, 32, 1)"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#181b1f"
    textColor: "#ccccdc"
    rounded: 4px
    padding: 10px 16px
  select-default:
    backgroundColor: "#181b1f"
    textColor: "#ccccdc"
    rounded: 4px
    padding: 8px 12px
  switch-control:
    backgroundColor: "rgba(247, 149, 32, 1)"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "rgba(247, 149, 32, 1)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#181b1f"
    textColor: "#ccccdc"
    rounded: 4px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#181b1f"
    textColor: "#ccccdc"
    rounded: 4px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#111217"
    textColor: "#ccccdc"
    rounded: 4px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#ccccdc"
    textColor: "#111217"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#181b1f"
    textColor: "#ccccdc"
    rounded: 8px
    padding: 8px
---

# Grafana Saga

## Overview

**Grafana Saga** is a dark-first design system anchored on `#111217` canvas surfaces with `#ccccdc` primary ink (11.8:1 contrast) and `rgba(247, 149, 32, 1)` brand accent.

Typography centers cleanly on `Inter` (16px display down to 16px body), unified by `4px` base corner radius and stepped `#111217` -> `#181b1f` surface layering.

Maintained by **Grafana**. Source: published token package, repo https://github.com/grafana/grafana, package `@grafana/ui`, frameworks: react. Inventory: **18** colors, **3** typography steps, and **16** documented components (Apache-2.0 license).

## Colors

- **Canvas (`canvas`)**: `#111217` — base application backdrop (dark theme).
- **Surface (`surface`)**: `#181b1f` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#ccccdc` — body copy and primary headings (11.8:1 on canvas).
- **Muted Ink (`muted`)**: `#ccccdc` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `rgba(247, 149, 32, 1)` (8.3:1 vs canvas; pair with `#0b0b0c` foreground ink for 8.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #ccccdc 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `a04338` (`#5a372a`), `color` (`#f59433`), `eec97d` (`#855a00`), `fd48cb` (`#ff20ed`), `23a0db` (`#00008b`), `default-annotation-color` (`rgba(0, 211, 255, 1)`).
- **Neutral Ramp**: `bg-canvas` (`#111217`), `bg-surface` (`#181b1f`), `text-primary` (`#ccccdc`), `no-data-color` (`rgba(150, 150, 150, 1)`), `2e2f35` (`#bab4ca`).
- **Semantic States**: danger: `alerting-color` (`rgba(237, 46, 24, 1)`).

## Typography

- **Primary / Display Voice**: `Inter, "Helvetica Neue", Arial, sans-serif` (top step `font-sans`: 16px, weight 600).
- **Body & UI Controls**: `Inter, "Helvetica Neue", Arial, sans-serif` (`font-sans`: 16px, weight 400).
- **Monospace / Technical Labels**: `"Roboto Mono", monospace` (`font-mono`: 16px).
- **Scale Steps (3)**: `font-sans` (16px), `font-mono` (16px), `font-size` (80%).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#181b1f` cards; separate sibling sections using `color-mix(in srgb, #ccccdc 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#111217` -> `#181b1f`) and `1px solid color-mix(in srgb, #ccccdc 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `rgba(247, 149, 32, 1)` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `4px` (Buttons `4px` · Inputs `4px` · Cards `8px` · Badges `999px` · Navigation `4px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `rgba(247, 149, 32, 1)`, ink `#0b0b0c`, (8.7:1), radius `4px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#ccccdc`, radius `4px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ef4444`, ink `#000000`, (5.6:1), radius `4px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#181b1f`, ink `#ccccdc`, (10.9:1), radius `4px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#181b1f`, ink `#ccccdc`, (10.9:1), radius `8px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `rgba(247, 149, 32, 1)`, ink `#000000`, (9.3:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#10b981`, ink `#000000`, (8.3:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#181b1f`, ink `#ccccdc`, (10.9:1), radius `4px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#181b1f`, ink `#ccccdc`, (10.9:1), radius `4px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `rgba(247, 149, 32, 1)`, ink `#0b0b0c`, (8.7:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `rgba(247, 149, 32, 1)`, ink `#0b0b0c`, (8.7:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#181b1f`, ink `#ccccdc`, (10.9:1), radius `4px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#181b1f`, ink `#ccccdc`, (10.9:1), radius `4px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#111217`, ink `#ccccdc`, (11.8:1), radius `4px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#ccccdc`, ink `#111217`, (11.8:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#181b1f`, ink `#ccccdc`, (10.9:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#111217` (dark) with `#ccccdc` primary text and `#ccccdc` secondary labels.
- Use `rgba(247, 149, 32, 1)` with `#0b0b0c` text (8.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Inter` headings with `Inter` body copy using documented weights and scale steps.
- Apply `4px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#181b1f` surface shifts and `color-mix(in srgb, #ccccdc 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of dark polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `4px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
