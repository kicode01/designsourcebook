---
version: alpha
name: Untitled UI
description: "Crisp light (rgb(255 255 255)) canvas, Inter typography, #7f56d9 brand accent, and 8px corner geometry"
colors:
  color-transparent: "rgb(0 0 0 / 0)"
  color-alpha-white: "rgb(255 255 255)"
  color-alpha-black: "rgb(0 0 0)"
  color-brand-50: "rgb(249 245 255)"
  color-brand-100: "rgb(244 235 255)"
  color-brand-200: "rgb(233 215 254)"
  color-brand-300: "rgb(214 187 251)"
  color-brand-400: "rgb(182 146 246)"
  color-brand-500: "rgb(158 119 237)"
  color-brand-600: "rgb(127 86 217)"
  color-brand-700: "rgb(105 65 198)"
  color-brand-800: "rgb(83 56 158)"
  color-brand-900: "rgb(66 48 125)"
  color-brand-950: "rgb(44 28 95)"
  primary: "#7f56d9"
typography:
  display-2xl:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 72px
    fontWeight: 600
    lineHeight: 1.25
  display-xl:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 60px
    fontWeight: 600
    lineHeight: 1.2
  display-lg:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.25
  display-md:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.22
  display-sm:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.26
  display-xs:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
  text-xl:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.5
  text-lg:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
  text-md:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  text-sm:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.42
  text-xs:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.5
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
icons:
  library: Untitled / Lucide Icons
  package: lucide-react
  style: outline
  grid: 24
  strokeWidth: 2
  strokeLinecap: round
  strokeLinejoin: round
  source: curated
  url: "https://www.untitledui.com/icons"
components:
  button-primary:
    backgroundColor: "#7f56d9"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "rgb(249 245 255)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "rgb(249 245 255)"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#7f56d9"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "rgb(249 245 255)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "rgb(255 255 255)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#7f56d9"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#7f56d9"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "rgb(255 255 255)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "rgb(255 255 255)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "rgb(255 255 255)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "rgb(255 255 255)"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "rgb(255 255 255)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Untitled UI

## Overview

**Untitled UI** is a light-first design system anchored on `rgb(255 255 255)` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#7f56d9` brand accent.

Typography centers cleanly on `Inter` (72px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **Untitled**. Source: published token package (https://github.com/untitleduico/react/), repo https://github.com/untitleduico/react, frameworks: react, css. Inventory: **15** colors, **11** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `rgb(255 255 255)` — base application backdrop (light theme).
- **Surface (`surface`)**: `rgb(255 255 255)` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#7f56d9` (5.0:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.6:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-brand-200` (`rgb(233 215 254)`), `color-brand-300` (`rgb(214 187 251)`), `color-brand-400` (`rgb(182 146 246)`), `color-brand-500` (`rgb(158 119 237)`), `color-brand-600` (`rgb(127 86 217)`), `color-brand-700` (`rgb(105 65 198)`).
- **Neutral Ramp**: `color-alpha-white` (`rgb(255 255 255)`), `color-alpha-black` (`rgb(0 0 0)`), `color-brand-50` (`rgb(249 245 255)`), `color-brand-100` (`rgb(244 235 255)`).

## Typography

- **Primary / Display Voice**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` (top step `display-2xl`: 72px, weight 600, line-height 1.25).
- **Body & UI Controls**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` (`text-md`: 16px, weight 400, line-height 1.5).
- **Scale Steps (11)**: `display-2xl` (72px, w600), `display-xl` (60px, w600), `display-lg` (48px, w600), `display-md` (36px, w600), `display-sm` (30px, w600), `display-xs` (24px, w600), `text-xl` (20px, w500), `text-lg` (18px, w400).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `rgb(255 255 255)` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`rgb(255 255 255)` -> `rgb(255 255 255)`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#7f56d9` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Untitled / Lucide Icons (`lucide-react`) on a `24x24` grid (outline, stroke `2px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#7f56d9`, ink `#ffffff`, (5.0:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `rgb(249 245 255)`, ink `#0b0b0c`, (18.3:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `rgb(249 245 255)`, ink `#0b0b0c`, (18.3:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#7f56d9`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `rgb(249 245 255)`, ink `#0b0b0c`, (18.3:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `rgb(255 255 255)`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#7f56d9`, ink `#f7f7f8`, (4.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#7f56d9`, ink `#f7f7f8`, (4.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `rgb(255 255 255)`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `rgb(255 255 255)`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `rgb(255 255 255)`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `rgb(255 255 255)`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `rgb(255 255 255)`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `rgb(255 255 255)` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#7f56d9` with `#f7f7f8` text (4.6:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Inter` headings with `Inter` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `rgb(255 255 255)` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
