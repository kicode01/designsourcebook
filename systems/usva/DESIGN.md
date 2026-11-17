---
version: alpha
name: usva.
description: "Dark (#000) canvas, Inter typography, #8b5cf6 brand accent, and 8px corner geometry"
colors:
  usva-bg: "#0a0613"
  usva-sunken: "#0c0719"
  usva-surface: "#100b1f"
  usva-surface-2: "#181328"
  usva-overlay: "#0c0718"
  usva-ink: "#e6e3f2"
  usva-muted: "#8b85a8"
  usva-faint: "#4c4663"
  usva-on-accent: "#0a0613"
  usva-accent: "#a78bfa"
  usva-accent-2: "#8b5cf6"
  usva-accent-alt: "#52c989"
  usva-accent-tint: "#2e254b"
  usva-accent-ink: "#e6e3f2"
  usva-success: "#52c989"
  usva-warning: "#e0b341"
  usva-danger: "#e0556b"
  usva-info: "#6ea8fe"
  usva-border: "#221c30"
  usva-border-strong: "#3a3350"
  usva-ring: "#a78bfa"
  usva-code-comment: "#7c8a87"
  usva-on-sunken: "#2a1f14"
  usva-on-tint: "#234f31"
  args-default-value: "#a78bfa"
  default-value: "#a78bfa"
  bg: "#000"
  kajo: "#a78bfa"
  primary: "#8b5cf6"
typography:
  display-lg:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.2
  heading-md:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  heading-sm:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
  caption:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.35
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
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
  button-primary:
    backgroundColor: "#8b5cf6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#e0556b"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#100b1f"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#100b1f"
    textColor: "#f7f7f8"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#8b5cf6"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#52c989"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#100b1f"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#100b1f"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#8b5cf6"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#8b5cf6"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#100b1f"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#100b1f"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#000"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#f7f7f8"
    textColor: "#000"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#100b1f"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 8px
---

# usva

## Overview

**usva** is a dark-first design system anchored on `#000` canvas surfaces with `#f7f7f8` primary ink (19.6:1 contrast) and `#8b5cf6` brand accent.

Typography centers cleanly on `Inter` (36px display down to 15px body), unified by `8px` base corner radius and stepped `#000` -> `#100b1f` surface layering.

Source: published token package (https://github.com/matt-pasek/usva), repo https://github.com/matt-pasek/usva, frameworks: css. Inventory: **29** colors, **5** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#000` — base application backdrop (dark theme).
- **Surface (`surface`)**: `#100b1f` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#f7f7f8` — body copy and primary headings (19.6:1 on canvas).
- **Muted Ink (`muted`)**: `#f7f7f8` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#8b5cf6` (5.0:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.0:1 contrast).
- **Structural Border (`border`)**: `#221c30` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `usva-muted` (`#8b85a8`), `usva-faint` (`#4c4663`), `usva-accent` (`#a78bfa`), `usva-accent-2` (`#8b5cf6`), `usva-accent-alt` (`#52c989`), `usva-accent-tint` (`#2e254b`).
- **Neutral Ramp**: `usva-bg` (`#0a0613`), `usva-sunken` (`#0c0719`), `usva-surface` (`#100b1f`), `usva-surface-2` (`#181328`), `usva-overlay` (`#0c0718`), `usva-ink` (`#e6e3f2`).
- **Semantic States**: success: `usva-success` (`#52c989`) · danger: `usva-danger` (`#e0556b`) · warning: `usva-warning` (`#e0b341`) · info: `usva-info` (`#6ea8fe`).

## Typography

- **Primary / Display Voice**: `Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif` (top step `display-lg`: 36px, weight 600, line-height 1.2).
- **Body & UI Controls**: `Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif` (`body`: 15px, weight 400, line-height 1.55).
- **Scale Steps (5)**: `display-lg` (36px, w600), `heading-md` (24px, w600), `heading-sm` (18px, w500), `body` (15px, w400), `caption` (12px, w500).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#100b1f` cards; separate sibling sections using `#221c30` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#000` -> `#100b1f`) and `1px solid #221c30` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#8b5cf6` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#8b5cf6`, ink `#0b0b0c`, (4.6:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#f7f7f8`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#e0556b`, ink `#000000`, (5.7:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#100b1f`, ink `#f7f7f8`, (18.0:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#100b1f`, ink `#f7f7f8`, (18.0:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#8b5cf6`, ink `#0b0b0c`, (4.6:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#52c989`, ink `#000000`, (10.1:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#100b1f`, ink `#f7f7f8`, (18.0:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#100b1f`, ink `#f7f7f8`, (18.0:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#8b5cf6`, ink `#0b0b0c`, (4.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#8b5cf6`, ink `#0b0b0c`, (4.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#100b1f`, ink `#f7f7f8`, (18.0:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#100b1f`, ink `#f7f7f8`, (18.0:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#000`, ink `#f7f7f8`, (19.6:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#f7f7f8`, ink `#000`, (19.6:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#100b1f`, ink `#f7f7f8`, (18.0:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#000` (dark) with `#f7f7f8` primary text and `#f7f7f8` secondary labels.
- Use `#8b5cf6` with `#f7f7f8` text (4.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Inter` headings with `Inter` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#100b1f` surface shifts and `#221c30` hairlines cleanly.

### Don't
- Do not invert the base canvas out of dark polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
