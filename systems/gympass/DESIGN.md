---
version: alpha
name: Gympass Yoga
description: "Crisp light (#FFFFFF) canvas, Rubik typography, #231B22 brand accent, and 8px corner geometry"
colors:
  vibin: "#D8385E"
  hope: "#1D856C"
  hope-new: "#0C8046"
  energy: "#FFC24C"
  relax: "#5340C9"
  relax-new: "#A880FF"
  neon: "#DCFF79"
  sand: "#FBF8EC"
  peace: "#FFB0A7"
  peace-new: "#FFEBF1"
  verve: "#CA4808"
  branding-verve: "#FF874C"
  uplift: "#FF4438"
  uplift-new: "#D8385E"
  deep-purple: "#710252"
  deep-purple-new: "#590931"
  yoga: "#FFEEF2"
  success: "#C1EEDB"
  success-new: "#E3EFC3"
  neutral: "#E0DFFF"
  neutral-new: "#F0E0FF"
  attention: "#FCD6C3"
  inactive: "#AE0000"
  stamina: "#231B22"
  stamina-new: "#1D1D1F"
  deep: "#6B6B78"
  deep-new: "#57544D"
  medium: "#9898A6"
  medium-new: "#A6A298"
  light: "#D7D7E0"
  light-new: "#E1DED7"
  lightest: "#EFEDE7"
  clear: "#F5F5FA"
  clear-new: "#FAF9F5"
  steady: "#8F8F8F"
  white: "#FFFFFF"
  sandy: "#F6EDDF"
  feedback-info: "#7068D4"
  info: "#7068D4"
  colors-primary: "#231B22"
  primary: "#231B22"
  text-primary: "#000"
typography:
  display-xxl:
    fontFamily: "Rubik, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.2
  heading-xl:
    fontFamily: "Rubik, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.25
  heading-lg:
    fontFamily: "Rubik, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
  heading-md:
    fontFamily: "Rubik, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
  body-regular:
    fontFamily: "Rubik, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-small:
    fontFamily: "Rubik, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.42
  caption-xs:
    fontFamily: "Rubik, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.33
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
icons:
  library: Gympass Yoga Repo SVGs
  package: "@gympass/yoga"
  style: solid
  grid: 12
  strokeWidth: 0
  strokeLinecap: round
  strokeLinejoin: round
  source: repo
components:
  button-primary:
    backgroundColor: "#231B22"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#000"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#FBF8EC"
    textColor: "#000"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#FBF8EC"
    textColor: "#000"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#231B22"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#C1EEDB"
    textColor: "#000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#FBF8EC"
    textColor: "#000"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#FBF8EC"
    textColor: "#000"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#231B22"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#231B22"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#FBF8EC"
    textColor: "#000"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#FBF8EC"
    textColor: "#000"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#FFFFFF"
    textColor: "#000"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#000"
    textColor: "#FFFFFF"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#FBF8EC"
    textColor: "#000"
    rounded: 8px
    padding: 8px
---

# Gympass Yoga

## Overview

**Gympass Yoga** is a light-first design system anchored on `#FFFFFF` canvas surfaces with `#000` primary ink (21.0:1 contrast) and `#231B22` brand accent.

Typography centers cleanly on `Rubik` (40px display down to 16px body), unified by `8px` base corner radius and stepped `#FFFFFF` -> `#FBF8EC` surface layering.

Maintained by **Gympass**. Source: published token package (https://github.com/gympass/yoga), repo https://github.com/gympass/yoga, package `@gympass/yoga`, frameworks: react. Inventory: **42** colors, **7** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#FFFFFF` — base application backdrop (light theme).
- **Surface (`surface`)**: `#FBF8EC` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#000` — body copy and primary headings (21.0:1 on canvas).
- **Muted Ink (`muted`)**: `#000` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#231B22` (16.8:1 vs canvas; pair with `#f7f7f8` foreground ink for 15.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #000 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `vibin` (`#D8385E`), `hope` (`#1D856C`), `hope-new` (`#0C8046`), `energy` (`#FFC24C`), `relax` (`#5340C9`), `relax-new` (`#A880FF`).
- **Neutral Ramp**: `sand` (`#FBF8EC`), `peace-new` (`#FFEBF1`), `yoga` (`#FFEEF2`), `stamina` (`#231B22`), `stamina-new` (`#1D1D1F`), `deep` (`#6B6B78`).
- **Semantic States**: success: `success` (`#C1EEDB`) · info: `feedback-info` (`#7068D4`).

## Typography

- **Primary / Display Voice**: `Rubik, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` (top step `display-xxl`: 40px, weight 700, line-height 1.2).
- **Body & UI Controls**: `Rubik, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` (`body-regular`: 16px, weight 400, line-height 1.5).
- **Scale Steps (7)**: `display-xxl` (40px, w700), `heading-xl` (32px, w700), `heading-lg` (24px, w600), `heading-md` (20px, w500), `body-regular` (16px, w400), `body-small` (14px, w400), `caption-xs` (12px, w500).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#FBF8EC` cards; separate sibling sections using `color-mix(in srgb, #000 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#FFFFFF` -> `#FBF8EC`) and `1px solid color-mix(in srgb, #000 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#231B22` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#231B22`, ink `#ffffff`, (16.8:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#000`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#FBF8EC`, ink `#000`, (19.7:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#FBF8EC`, ink `#000`, (19.7:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#231B22`, ink `#ffffff`, (16.8:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#C1EEDB`, ink `#000`, (16.5:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#FBF8EC`, ink `#000`, (19.7:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#FBF8EC`, ink `#000`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#231B22`, ink `#f7f7f8`, (15.7:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#231B22`, ink `#f7f7f8`, (15.7:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#FBF8EC`, ink `#000`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#FBF8EC`, ink `#000`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#FFFFFF`, ink `#000`, (21.0:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#000`, ink `#FFFFFF`, (21.0:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#FBF8EC`, ink `#000`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#FFFFFF` (light) with `#000` primary text and `#000` secondary labels.
- Use `#231B22` with `#f7f7f8` text (15.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Rubik` headings with `Rubik` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#FBF8EC` surface shifts and `color-mix(in srgb, #000 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
