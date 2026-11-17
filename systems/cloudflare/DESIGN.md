---
version: alpha
name: Cloudflare Kumo
description: "Dark (#5b697c) canvas, Inter typography, #f6821f brand accent, and 8px corner geometry"
colors:
  kumo-light: "#f6821f"
  kumo-dark: "#f6821f"
  fedramp-light: "#5b697c"
  fedramp-dark: "#5b697c"
  primary: "#f6821f"
  secondary: "#9CA3AF"
  color-kumo-canvas: "#5b697c"
  color-kumo-base: "#5b697c"
  color-kumo-hairline: "#c8d4e5"
  text-color-kumo-brand: "#f6821f"
  kumo-code-highlight-bg: "rgba(0, 0, 0, 0.05)"
  disabled-gray: "#999999"
typography:
  heading-3xl:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.2
  heading-2xl:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  heading-xl:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  heading-lg:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.45
  body-base:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.45
  caption-xs:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.35
  code-mono:
    fontFamily: "\"JetBrains Mono\", ui-monospace, SFMono-Regular, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
icons:
  library: Phosphor Icons
  package: "@phosphor-icons/react"
  pack: phosphor
  style: solid
  grid: 24
  strokeWidth: 0
  strokeLinecap: round
  strokeLinejoin: round
  source: npm
  url: "https://phosphoricons.com"
components:
  button-primary:
    backgroundColor: "#f6821f"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#5b697c"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#5b697c"
    textColor: "#f7f7f8"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#f6821f"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#5b697c"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#5b697c"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#f6821f"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#f6821f"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#5b697c"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#5b697c"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#5b697c"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#f7f7f8"
    textColor: "#5b697c"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#5b697c"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 8px
---

# Cloudflare Kumo

## Overview

**Cloudflare Kumo** is a dark-first design system anchored on `#5b697c` canvas surfaces with `#f7f7f8` primary ink (5.2:1 contrast) and `#f6821f` brand accent.

Typography centers cleanly on `Inter` (30px display down to 14px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **Cloudflare**. Source: published token package (https://github.com/cloudflare/kumo), repo https://github.com/cloudflare/kumo, package `@cloudflare/component-box`, frameworks: react. Inventory: **12** colors, **8** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#5b697c` — base application backdrop (dark theme).
- **Surface (`surface`)**: `#5b697c` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#f7f7f8` — body copy and primary headings (5.2:1 on canvas).
- **Muted Ink (`muted`)**: `#f7f7f8` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#f6821f` (2.2:1 vs canvas; pair with `#0b0b0c` foreground ink for 7.6:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #f7f7f8 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `kumo-light` (`#f6821f`), `kumo-dark` (`#f6821f`), `fedramp-light` (`#5b697c`), `fedramp-dark` (`#5b697c`), `primary` (`#f6821f`), `color-kumo-canvas` (`#5b697c`).
- **Neutral Ramp**: `secondary` (`#9CA3AF`), `disabled-gray` (`#999999`).

## Typography

- **Primary / Display Voice**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` (top step `heading-3xl`: 30px, weight 600, line-height 1.2).
- **Body & UI Controls**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` (`body-base`: 14px, weight 400, line-height 1.5).
- **Monospace / Technical Labels**: `"JetBrains Mono", ui-monospace, SFMono-Regular, monospace` (`code-mono`: 13px).
- **Scale Steps (8)**: `heading-3xl` (30px, w600), `heading-2xl` (24px, w600), `heading-xl` (20px, w600), `heading-lg` (18px, w600), `body-base` (14px, w400), `body-sm` (13px, w400), `code-mono` (13px, w400), `caption-xs` (12px, w500).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#5b697c` cards; separate sibling sections using `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#5b697c` -> `#5b697c`) and `1px solid color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#f6821f` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#f6821f`, ink `#0b0b0c`, (7.6:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#f7f7f8`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ef4444`, ink `#000000`, (5.6:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#5b697c`, ink `#f7f7f8`, (5.2:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#5b697c`, ink `#f7f7f8`, (5.2:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#f6821f`, ink `#000000`, (8.1:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#10b981`, ink `#000000`, (8.3:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#5b697c`, ink `#f7f7f8`, (5.2:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#5b697c`, ink `#f7f7f8`, (5.2:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#f6821f`, ink `#0b0b0c`, (7.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#f6821f`, ink `#0b0b0c`, (7.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#5b697c`, ink `#f7f7f8`, (5.2:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#5b697c`, ink `#f7f7f8`, (5.2:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#5b697c`, ink `#f7f7f8`, (5.2:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#f7f7f8`, ink `#5b697c`, (5.2:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#5b697c`, ink `#f7f7f8`, (5.2:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#5b697c` (dark) with `#f7f7f8` primary text and `#f7f7f8` secondary labels.
- Use `#f6821f` with `#0b0b0c` text (7.6:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Inter` headings with `Inter` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#5b697c` surface shifts and `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of dark polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
