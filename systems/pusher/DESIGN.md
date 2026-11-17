---
version: alpha
name: Pusher Chameleon
description: "Crisp light (#ffffff) canvas, Inter typography, #549eff brand accent, and 8px corner geometry"
colors:
  primary: "#549eff"
  secondary: "#977fda"
  developer: "#58d794"
  success: "#2bc78a"
  warning: "#ffae00"
  danger: "#b74a48"
  information: "#34495e"
  alert: "#b74a48"
  beta: "#a57cec"
  white: "#ffffff"
  black: "#2b303b"
  slate: "#414859"
  silver: "#8690a6"
  smoke: "#d3dce7"
  snow: "#f4f8fb"
  background-color: "#f7f7f7"
  highlight-color: "#b4d5fe"
  code-box-nav-bg: "#3b4a59"
  border-bottom-color: "#fff"
typography:
  display-xl:
    fontFamily: "Inter, \"Maison Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.2
  h1:
    fontFamily: "Inter, \"Maison Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.25
  h2:
    fontFamily: "Inter, \"Maison Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
  h3:
    fontFamily: "Inter, \"Maison Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Inter, \"Maison Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Inter, \"Maison Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.42
  code:
    fontFamily: "\"Fira Code\", ui-monospace, monospace"
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
components:
  button-primary:
    backgroundColor: "#549eff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#b74a48"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f4f8fb"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f4f8fb"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#549eff"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#2bc78a"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f4f8fb"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Pusher Chameleon

## Overview

**Pusher Chameleon** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#549eff` brand accent.

Typography centers cleanly on `Inter` (40px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#f4f8fb` surface layering.

Maintained by **Pusher**. Source: published token package (https://github.com/pusher/chameleon), repo https://github.com/pusher/chameleon, frameworks: css. Inventory: **19** colors, **7** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f4f8fb` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#549eff` (2.7:1 vs canvas; pair with `#f7f7f8` foreground ink for 2.5:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `primary` (`#549eff`), `secondary` (`#977fda`), `developer` (`#58d794`), `beta` (`#a57cec`), `silver` (`#8690a6`), `highlight-color` (`#b4d5fe`).
- **Neutral Ramp**: `white` (`#ffffff`), `black` (`#2b303b`), `slate` (`#414859`), `smoke` (`#d3dce7`), `snow` (`#f4f8fb`), `background-color` (`#f7f7f7`).
- **Semantic States**: success: `success` (`#2bc78a`) · danger: `danger` (`#b74a48`) · warning: `warning` (`#ffae00`) · info: `information` (`#34495e`).

## Typography

- **Primary / Display Voice**: `Inter, "Maison Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (top step `display-xl`: 40px, weight 700, line-height 1.2).
- **Body & UI Controls**: `Inter, "Maison Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (`body`: 16px, weight 400, line-height 1.5).
- **Monospace / Technical Labels**: `"Fira Code", ui-monospace, monospace` (`code`: 13px).
- **Scale Steps (7)**: `display-xl` (40px, w700), `h1` (32px, w600), `h2` (24px, w600), `h3` (18px, w600), `body` (16px, w400), `body-sm` (14px, w400), `code` (13px, w400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f4f8fb` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#f4f8fb`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#549eff` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#549eff`, ink `#0b0b0c`, (7.2:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#b74a48`, ink `#ffffff`, (5.1:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f4f8fb`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f4f8fb`, ink `#0b0b0c`, (18.4:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#549eff`, ink `#0b0b0c`, (7.2:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#2bc78a`, ink `#0b0b0c`, (9.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f4f8fb`, ink `#0b0b0c`, (18.4:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#549eff` with `#f7f7f8` text (2.5:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Inter` headings with `Inter` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f4f8fb` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
