---
version: alpha
name: Shadcn/ui
description: "Crisp light (#ffffff) canvas, Geist typography, #18181b brand accent, and 6px corner geometry"
colors:
  hex: "#000000"
  rgb: "rgb(0,0,0)"
  hsl: "hsl(0,0%,0%)"
  black-hex: "#000000"
  black-rgb: "rgb(0,0,0)"
  white-hex: "#ffffff"
  white-rgb: "rgb(255,255,255)"
  theme-color: "#000000"
  background-color: "#ffffff"
  extended: "#222222"
  alt-base: "#999999"
  background: "#ffffff"
  foreground: "#000000"
  primary: "#18181b"
  colors-brand: "#18181b"
  colors-primary: "#000"
  brand: "#18181b"
typography:
  display-4xl:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.11
  heading-3xl:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.2
  heading-2xl:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
  heading-xl:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  heading-lg:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.55
  body:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  body-medium:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
  muted-sm:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
  code-mono:
    fontFamily: "\"Geist Mono\", ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  button: 6px
  input: 6px
  card: 10px
  badge: 999px
  nav: 6px
  default: 6px
icons:
  library: Lucide
  package: lucide-react
  style: outline
  grid: 24
  strokeWidth: 2
  strokeLinecap: round
  strokeLinejoin: round
  source: curated
  url: "https://lucide.dev"
components:
  button-primary:
    backgroundColor: "#18181b"
    textColor: "#fafafa"
    rounded: 6px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 6px
    padding: 10px 18px
  input-default:
    backgroundColor: "rgb(255,255,255)"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 9px 13px
  card-surface:
    backgroundColor: "rgb(255,255,255)"
    textColor: "#0b0b0c"
    rounded: 10px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#18181b"
    textColor: "#fafafa"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "rgb(255,255,255)"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 16px
  select-default:
    backgroundColor: "rgb(255,255,255)"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#18181b"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#18181b"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "rgb(255,255,255)"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 6px 12px
  alert-info:
    backgroundColor: "rgb(255,255,255)"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#ffffff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "rgb(255,255,255)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Shadcn/ui

## Overview

**Shadcn/ui** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#18181b` brand accent.

Typography centers cleanly on `Geist` (36px display down to 14px body), unified by `6px` base corner radius and stepped `#ffffff` -> `rgb(255,255,255)` surface layering.

Source: published token package (https://github.com/shadcn-ui/ui), repo https://github.com/shadcn-ui/ui, package `shadcn`, frameworks: react, vue, svelte, css. Inventory: **17** colors, **9** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `rgb(255,255,255)` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#18181b` (17.7:1 vs canvas; pair with `#f7f7f8` foreground ink for 16.5:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Neutral Ramp**: `hex` (`#000000`), `rgb` (`rgb(0,0,0)`), `hsl` (`hsl(0,0%,0%)`), `black-hex` (`#000000`), `black-rgb` (`rgb(0,0,0)`), `white-hex` (`#ffffff`).

## Typography

- **Primary / Display Voice**: `Geist, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (top step `display-4xl`: 36px, weight 700, line-height 1.11).
- **Body & UI Controls**: `Geist, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (`body`: 14px, weight 400, line-height 1.5).
- **Monospace / Technical Labels**: `"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace` (`code-mono`: 13px).
- **Scale Steps (9)**: `display-4xl` (36px, w700), `heading-3xl` (30px, w600), `heading-2xl` (24px, w600), `heading-xl` (20px, w600), `heading-lg` (18px, w600), `body` (14px, w400), `body-medium` (14px, w500), `code-mono` (13px, w400).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `rgb(255,255,255)` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `rgb(255,255,255)`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#18181b` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `6px` (Buttons `6px` · Inputs `6px` · Cards `10px` · Badges `999px` · Navigation `6px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `10px` container.
- **Iconography & SVGs**: Lucide (`lucide-react`) on a `24x24` grid (outline, stroke `2px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#18181b`, ink `#fafafa`, (17.0:1), radius `6px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `6px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `6px`, padding `10px 18px`.
- **`input-default` (input)**: bg `rgb(255,255,255)`, ink `#0b0b0c`, (19.7:1), radius `6px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `rgb(255,255,255)`, ink `#0b0b0c`, (19.7:1), radius `10px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#18181b`, ink `#fafafa`, (17.0:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `rgb(255,255,255)`, ink `#0b0b0c`, (19.7:1), radius `6px`, padding `10px 16px`.
- **`select-default` (select)**: bg `rgb(255,255,255)`, ink `#0b0b0c`, (19.7:1), radius `6px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#18181b`, ink `#f7f7f8`, (16.5:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#18181b`, ink `#f7f7f8`, (16.5:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `rgb(255,255,255)`, ink `#0b0b0c`, (19.7:1), radius `6px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `rgb(255,255,255)`, ink `#0b0b0c`, (19.7:1), radius `6px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `6px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `rgb(255,255,255)`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#18181b` with `#f7f7f8` text (16.5:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Geist` headings with `Geist` body copy using documented weights and scale steps.
- Apply `6px` base geometry across inputs and buttons (10px on outer containers).
- Separate containers via `rgb(255,255,255)` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `6px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
