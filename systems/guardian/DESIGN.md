---
version: alpha
name: Source Design System
description: "The Guardian Source Design System — tokens imported from @guardian/source-foundations."
colors:
  cta-primary-hover: "#234B8A"
  cta-secondary-hover: "#ACC9F7"
  cta-tertiary-hover: "#E5E5E5"
  brand-100: "#001536"
  brand-300: "#041F4A"
  brand-400: "#052962"
  brand-500: "#0077B6"
  brand-600: "#506991"
  brand-800: "#C1D8FC"
  brand-alt-200: "#F3C100"
  brand-alt-300: "#FFD900"
  brand-alt-400: "#FFE500"
  culture-50: "#2B2625"
  culture-100: "#3E3323"
  culture-200: "#574835"
  culture-300: "#6B5840"
  culture-350: "#866D50"
  culture-400: "#866D50"
  culture-450: "#A1845C"
  culture-500: "#EACCA0"
  culture-600: "#E7D4B9"
  culture-700: "#EFE8DD"
  culture-800: "#FBF6EF"
  error-400: "#C70000"
  error-500: "#FF9081"
  focus-400: "#0077B6"
  labs-200: "#0C7A73"
  labs-300: "#65A897"
  labs-400: "#69D1CA"
  lifestyle-100: "#510043"
  lifestyle-200: "#650054"
  lifestyle-300: "#7D0068"
  lifestyle-400: "#BB3B80"
  lifestyle-450: "#F37ABC"
  lifestyle-500: "#FFABDB"
  lifestyle-600: "#FEC8D3"
  lifestyle-800: "#FEEEF7"
  neutral-0: "#000000"
  neutral-7: "#121212"
  neutral-10: "#1A1A1A"
  neutral-20: "#333333"
  neutral-38: "#545454"
  neutral-46: "#707070"
  neutral-60: "#999999"
  neutral-73: "#BABABA"
  neutral-86: "#DCDCDC"
  neutral-93: "#EDEDED"
  neutral-97: "#F6F6F6"
  neutral-100: "#FFFFFF"
  news-100: "#660505"
  news-200: "#8B0000"
  news-300: "#AB0613"
  news-400: "#C70000"
  news-500: "#FF5943"
  news-550: "#FF9081"
  news-600: "#FFBAC8"
  news-800: "#FFF4F2"
  opinion-100: "#672005"
  opinion-200: "#8D2700"
  opinion-300: "#C74600"
  opinion-400: "#C74600"
  opinion-450: "#E05E00"
  opinion-500: "#FF7F0F"
  opinion-550: "#FF9941"
  opinion-600: "#F9B376"
  opinion-800: "#FEF9F5"
  special-report-100: "#222527"
  special-report-200: "#303538"
  special-report-300: "#3F464A"
  special-report-400: "#595C5F"
  special-report-450: "#9DA0A2"
  special-report-500: "#ABC2C9"
  special-report-700: "#E4E5E8"
  special-report-800: "#EFF1F2"
  special-report-alt-100: "#2B2B2A"
  special-report-alt-200: "#B9300A"
  special-report-alt-300: "#FF663D"
  special-report-alt-700: "#EBE6E1"
  special-report-alt-800: "#F5F0EB"
  sport-100: "#003C60"
  sport-200: "#004E7C"
  sport-300: "#005689"
  sport-400: "#0077B6"
  sport-500: "#00B2FF"
  sport-600: "#90DCFF"
  sport-800: "#F1F8FC"
  success-400: "#22874D"
  success-500: "#58D08B"
  primary: "#041F4A"
typography:
  font-size:
    fontSize: 4.375rem
  font-family:
    fontFamily: "\"GH Guardian Headline\""
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
    backgroundColor: "#F5F0EB"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#041F4A"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#041F4A"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#F5F0EB"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#F5F0EB"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#FFFFFF"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#F5F0EB"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Source Design System

## Overview

**Source Design System** is a light-first design system anchored on `#FFFFFF` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#041F4A` brand accent.

Typography centers cleanly on `GH Guardian Headline` (70px display down to 16px body), unified by `8px` base corner radius and stepped `#FFFFFF` -> `#F5F0EB` surface layering.

Maintained by **The Guardian**. Source: published token package, package `@guardian/source-foundations`. Inventory: **89** colors, **2** typography steps, and **8** documented components (Apache-2.0 license).

## Colors

- **Canvas (`canvas`)**: `#FFFFFF` — base application backdrop (light theme).
- **Surface (`surface`)**: `#F5F0EB` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#041F4A` (16.2:1 vs canvas; pair with `#f7f7f8` foreground ink for 15.1:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `cta-primary-hover` (`#234B8A`), `cta-secondary-hover` (`#ACC9F7`), `brand-100` (`#001536`), `brand-300` (`#041F4A`), `brand-400` (`#052962`), `brand-500` (`#0077B6`).
- **Neutral Ramp**: `cta-tertiary-hover` (`#E5E5E5`), `culture-50` (`#2B2625`), `culture-700` (`#EFE8DD`), `culture-800` (`#FBF6EF`), `lifestyle-800` (`#FEEEF7`), `neutral-0` (`#000000`).
- **Semantic States**: success: `success-400` (`#22874D`) · danger: `error-400` (`#C70000`).

## Typography

- **Primary / Display Voice**: `"GH Guardian Headline"` (top step `font-size`: 4.375rem, weight 600).
- **Body & UI Controls**: `"GH Guardian Headline"` (`font-family`: 16px, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#F5F0EB` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#FFFFFF` -> `#F5F0EB`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#041F4A` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#F5F0EB`, ink `#0b0b0c`, (17.4:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#041F4A`, ink `#f7f7f8`, (15.1:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#041F4A`, ink `#f7f7f8`, (15.1:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#F5F0EB`, ink `#0b0b0c`, (17.4:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#F5F0EB`, ink `#0b0b0c`, (17.4:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#FFFFFF`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#F5F0EB`, ink `#0b0b0c`, (17.4:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#FFFFFF` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#041F4A` with `#f7f7f8` text (15.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `GH Guardian Headline` headings with `GH Guardian Headline` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#F5F0EB` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
