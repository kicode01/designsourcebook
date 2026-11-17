---
version: alpha
name: Fluent 2
description: "Microsoft Fluent 2 — the design language across Windows and Microsoft 365."
colors:
  white: "#ffffff"
  black: "#000000"
  hc-hyperlink: "#ffff00"
  hc-highlight: "#1aebff"
  hc-disabled: "#3ff23f"
  hc-canvas: "#000000"
  hc-canvas-text: "#ffffff"
  hc-highlight-text: "#000000"
  hc-button-text: "#000000"
  hc-button-face: "#ffffff"
  shade50: "#130204"
  shade40: "#230308"
  shade30: "#420610"
  shade20: "#590815"
  shade10: "#690a19"
  primary: "#750b1c"
  tint10: "#861b2c"
  tint20: "#962f3f"
  tint30: "#ac4f5e"
  tint40: "#d69ca5"
  tint50: "#e9c7cd"
  tint60: "#f9f0f2"
typography:
  font-size-base100:
    fontSize: 10px
  font-size-base200:
    fontSize: 12px
  font-size-base300:
    fontSize: 14px
  font-size-base400:
    fontSize: 16px
  font-size-base500:
    fontSize: 20px
  font-size-base600:
    fontSize: 24px
  font-size-hero700:
    fontSize: 28px
  font-size-hero800:
    fontSize: 32px
  font-size-hero900:
    fontSize: 40px
  font-size-hero1000:
    fontSize: 68px
  font-family-base:
    fontFamily: "\"Segoe UI\", \"Segoe UI Web (West European)\", -apple-system, BlinkMacSystemFont, Roboto, \"Helvetica Neue\", sans-serif"
  font-family-monospace:
    fontFamily: "Consolas, \"Courier New\", Courier, monospace"
  font-family-numeric:
    fontFamily: "Bahnschrift, \"Segoe UI\", \"Segoe UI Web (West European)\", -apple-system, BlinkMacSystemFont, Roboto, \"Helvetica Neue\", sans-serif"
rounded:
  button: 6px
  input: 6px
  card: 10px
  badge: 999px
  nav: 6px
  default: 6px
components:
  button-primary:
    backgroundColor: "#750b1c"
    textColor: "#ffffff"
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
    backgroundColor: "#f9f0f2"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f9f0f2"
    textColor: "#0b0b0c"
    rounded: 10px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#750b1c"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f9f0f2"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 16px
---

# Fluent 2

## Overview

**Fluent 2** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#750b1c` brand accent.

Typography centers cleanly on `Segoe UI` (68px display down to 20px body), unified by `6px` base corner radius and stepped `#ffffff` -> `#f9f0f2` surface layering.

Maintained by **Microsoft**. Source: published token package, repo https://github.com/microsoft/fluentui, package `@fluentui/tokens`, frameworks: react, web-components. Inventory: **22** colors, **13** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f9f0f2` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#750b1c` (11.5:1 vs canvas; pair with `#f7f7f8` foreground ink for 10.8:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `hc-highlight` (`#1aebff`), `hc-disabled` (`#3ff23f`), `shade40` (`#230308`), `shade30` (`#420610`), `shade20` (`#590815`), `shade10` (`#690a19`).
- **Neutral Ramp**: `white` (`#ffffff`), `black` (`#000000`), `hc-canvas` (`#000000`), `hc-canvas-text` (`#ffffff`), `hc-highlight-text` (`#000000`), `hc-button-text` (`#000000`).
- **Semantic States**: info: `hc-hyperlink` (`#ffff00`).

## Typography

- **Primary / Display Voice**: `"Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif` (top step `font-size-hero1000`: 68px, weight 600).
- **Body & UI Controls**: `"Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif` (`font-size-base500`: 20px, weight 400).
- **Monospace / Technical Labels**: `Consolas, "Courier New", Courier, monospace` (`font-family-monospace`: 16px).
- **Scale Steps (13)**: `font-size-hero1000` (68px), `font-size-hero900` (40px), `font-size-hero800` (32px), `font-size-hero700` (28px), `font-size-base600` (24px), `font-size-base500` (20px), `font-size-base400` (16px), `font-family-base` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f9f0f2` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#f9f0f2`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#750b1c` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `6px` (Buttons `6px` · Inputs `6px` · Cards `10px` · Badges `999px` · Navigation `6px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `10px` container.

## Components

- **`button-primary` (button)**: bg `#750b1c`, ink `#ffffff`, (11.5:1), radius `6px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `6px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `6px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f9f0f2`, ink `#0b0b0c`, (17.6:1), radius `6px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f9f0f2`, ink `#0b0b0c`, (17.6:1), radius `10px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#750b1c`, ink `#ffffff`, (11.5:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f9f0f2`, ink `#0b0b0c`, (17.6:1), radius `6px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#750b1c` with `#f7f7f8` text (10.8:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Segoe UI` headings with `Segoe UI` body copy using documented weights and scale steps.
- Apply `6px` base geometry across inputs and buttons (10px on outer containers).
- Separate containers via `#f9f0f2` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `6px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
