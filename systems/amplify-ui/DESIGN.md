---
version: alpha
name: Amplify UI
description: "Crisp light (#FFFFFF) canvas, Inter typography, #232f3e brand accent, and 8px corner geometry"
colors:
  synthwave-theme: "#fbc6ef"
  terminal: "#C7EFCA"
  amplify-colors-font-primary: "#232f3e"
  amplify-colors-font-tertiary: "#545b64"
  amplify-colors-font-hover: "#000"
  amplify-ui-components-button-primary-background-colo: "#0057ff"
  amplify-ui-components-button-primary-hover-backgroun: "#4d89fc"
  default-carousel-color-active: "#a1a1a1"
  default-carousel-color-inactive: "#d8d8d8"
  background-color: "#0175C2"
  theme-color: "#0175C2"
  fill-style: "#0D1A26"
  preview-text-color: "#0D1A26"
  preview-background-color: "#FFFFFF"
  preview-link-color: "#5C6670"
  color: "#4668F2"
  color-black: "#000"
  color-grey: "#a1a1a1"
  color-light-grey: "#e8e8e8"
  color-light-grey-2: "#d8d8d8"
  color-white: "#fff"
  font-color: "#000000"
  primary: "#232f3e"
typography:
  display-xl:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
  heading-lg:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  heading-md:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.42
  caption:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
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
components:
  button-primary:
    backgroundColor: "#232f3e"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#232f3e"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Amplify UI

## Overview

**Amplify UI** is a light-first design system anchored on `#FFFFFF` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#232f3e` brand accent.

Typography centers cleanly on `Inter` (36px display down to 16px body), unified by `8px` base corner radius and stepped `#FFFFFF` -> `#fff` surface layering.

Maintained by **AWS**. Source: published token package (https://github.com/aws-amplify/amplify-ui), repo https://github.com/aws-amplify/amplify-ui, package `@aws-amplify/ui-react`, frameworks: react, vue, angular, css. Inventory: **23** colors, **6** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#FFFFFF` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fff` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#232f3e` (13.6:1 vs canvas; pair with `#f7f7f8` foreground ink for 12.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `synthwave-theme` (`#fbc6ef`), `terminal` (`#C7EFCA`), `amplify-colors-font-primary` (`#232f3e`), `amplify-ui-components-button-primary-background-colo` (`#0057ff`), `amplify-ui-components-button-primary-hover-backgroun` (`#4d89fc`), `background-color` (`#0175C2`).
- **Neutral Ramp**: `amplify-colors-font-tertiary` (`#545b64`), `amplify-colors-font-hover` (`#000`), `default-carousel-color-active` (`#a1a1a1`), `default-carousel-color-inactive` (`#d8d8d8`), `preview-background-color` (`#FFFFFF`), `preview-link-color` (`#5C6670`).

## Typography

- **Primary / Display Voice**: `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (top step `display-xl`: 36px, weight 700, line-height 1.2).
- **Body & UI Controls**: `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (`body`: 16px, weight 400, line-height 1.5).
- **Scale Steps (6)**: `display-xl` (36px, w700), `heading-lg` (24px, w600), `heading-md` (18px, w600), `body` (16px, w400), `body-sm` (14px, w400), `caption` (12px, w500).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#fff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#FFFFFF` -> `#fff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#232f3e` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#232f3e`, ink `#ffffff`, (13.6:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ef4444`, ink `#000000`, (5.6:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#232f3e`, ink `#f7f7f8`, (12.7:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#10b981`, ink `#000000`, (8.3:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#FFFFFF` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#232f3e` with `#f7f7f8` text (12.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Inter` headings with `Inter` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#fff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
