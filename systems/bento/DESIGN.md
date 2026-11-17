---
version: alpha
name: Bento DS
description: "Crisp light (#FFFFFF) canvas, DM Sans typography, #242424 brand accent, and 8px corner geometry"
colors:
  white: "#FFFFFF"
  black: "#000000"
  bento-violet10: "#B3BEFF"
  bento-violet20: "#7F77FF"
  bento-violet40: "#5C17E5"
  neutral01: "#F6F8FB"
  neutral05: "#ECEFF4"
  neutral10: "#DEE4ED"
  neutral20: "#CBD4E1"
  neutral30: "#B6C2D3"
  neutral40: "#9AA8BC"
  neutral50: "#728197"
  neutral60: "#525E6F"
  neutral80: "#27313F"
  neutral90: "#1A212B"
  informative05: "#E0EDFF"
  informative30: "#5598F6"
  informative50: "#105FCE"
  positive05: "#E1FCDE"
  positive50: "#17BF33"
  positive70: "#016A1C"
  warning05: "#FFF2D2"
  warning40: "#F2930D"
  warning60: "#BA5900"
  negative05: "#FFD4D8"
  negative30: "#F14A58"
  negative40: "#E42131"
  negative60: "#B1000F"
  interactive05: "#D0DCFF"
  interactive10: "#B3BEFF"
  interactive40: "#5C17E5"
  interactive60: "#360090"
  red10: "#FFBDCB"
  red30: "#FC5275"
  orange10: "#FFD4BC"
  orange30: "#FB8951"
  yellow10: "#FFF4B2"
  yellow30: "#FFD439"
  green10: "#DBF1BC"
  green30: "#A3D65C"
  jade10: "#B7F6D7"
  jade30: "#51E098"
  blue10: "#BCF2FF"
  blue30: "#51D0FB"
  indigo10: "#C0D3F9"
  indigo30: "#5F8CE6"
  violet10: "#DABEEA"
  violet30: "#A463C7"
  pink10: "#F8B0DA"
  pink30: "#E648A4"
  informative: "#4799EB"
  positive: "#66CC66"
  warning: "#FFBB33"
  negative: "#F04B42"
  text-editor-font-color: "#000000"
  font-color: "#000000"
  ifm-color-primary: "#242424"
  ifm-color-primary-dark: "#797979"
  ifm-color-primary-darker: "#242424"
  ifm-color-primary-darkest: "#242424"
  ifm-color-primary-light: "#242424"
  ifm-color-primary-lighter: "#242424"
  ifm-color-primary-lightest: "#242424"
  ifm-background-color: "#fbfbfb"
  ifm-navbar-background-color: "#1a1a1a"
  ifm-footer-background-color: "#1a1a1a"
  primary: "#242424"
typography:
  ifm-font-family-base:
    fontFamily: "\"DM Sans\", sans-serif"
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
  style: outline
  grid: 24
  strokeWidth: 1.5
  strokeLinecap: round
  strokeLinejoin: round
  source: npm
  url: "https://phosphoricons.com"
components:
  button-primary:
    backgroundColor: "#242424"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#FFD4D8"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#F6F8FB"
    textColor: "#000000"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#F6F8FB"
    textColor: "#000000"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#242424"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#17BF33"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#F6F8FB"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#F6F8FB"
    textColor: "#000000"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#242424"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#242424"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#F6F8FB"
    textColor: "#000000"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#F6F8FB"
    textColor: "#000000"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#FFFFFF"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#000000"
    textColor: "#FFFFFF"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#F6F8FB"
    textColor: "#000000"
    rounded: 8px
    padding: 8px
---

# Bento DS

## Overview

**Bento DS** is a light-first design system anchored on `#FFFFFF` canvas surfaces with `#000000` primary ink (21.0:1 contrast) and `#242424` brand accent.

Typography centers cleanly on `DM Sans` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#FFFFFF` -> `#F6F8FB` surface layering.

Maintained by **Bento**. Source: published token package (https://github.com/buildo/bento-design-system), repo https://github.com/buildo/bento-design-system, package `@buildo/bento-design-system`, frameworks: react. Inventory: **67** colors, **1** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#FFFFFF` — base application backdrop (light theme).
- **Surface (`surface`)**: `#F6F8FB` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#000000` — body copy and primary headings (21.0:1 on canvas).
- **Muted Ink (`muted`)**: `#000000` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#242424` (15.5:1 vs canvas; pair with `#f7f7f8` foreground ink for 14.5:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #000000 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `bento-violet10` (`#B3BEFF`), `bento-violet20` (`#7F77FF`), `bento-violet40` (`#5C17E5`), `neutral30` (`#B6C2D3`), `neutral40` (`#9AA8BC`), `neutral50` (`#728197`).
- **Neutral Ramp**: `white` (`#FFFFFF`), `black` (`#000000`), `neutral01` (`#F6F8FB`), `neutral05` (`#ECEFF4`), `neutral10` (`#DEE4ED`), `neutral20` (`#CBD4E1`).
- **Semantic States**: success: `positive05` (`#E1FCDE`) · danger: `negative05` (`#FFD4D8`) · warning: `warning05` (`#FFF2D2`) · info: `informative05` (`#E0EDFF`).

## Typography

- **Primary / Display Voice**: `"DM Sans", sans-serif` (top step `ifm-font-family-base`: 16px, weight 600).
- **Body & UI Controls**: `"DM Sans", sans-serif` (`ifm-font-family-base`: 16px, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#F6F8FB` cards; separate sibling sections using `color-mix(in srgb, #000000 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#FFFFFF` -> `#F6F8FB`) and `1px solid color-mix(in srgb, #000000 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#242424` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Phosphor Icons (`@phosphor-icons/react`) on a `24x24` grid (outline, stroke `1.5px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#242424`, ink `#ffffff`, (15.5:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#000000`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#FFD4D8`, ink `#000000`, (15.7:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#F6F8FB`, ink `#000000`, (19.7:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#F6F8FB`, ink `#000000`, (19.7:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#242424`, ink `#ffffff`, (15.5:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#17BF33`, ink `#000000`, (8.5:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#F6F8FB`, ink `#000000`, (19.7:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#F6F8FB`, ink `#000000`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#242424`, ink `#f7f7f8`, (14.5:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#242424`, ink `#f7f7f8`, (14.5:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#F6F8FB`, ink `#000000`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#F6F8FB`, ink `#000000`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#FFFFFF`, ink `#000000`, (21.0:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#000000`, ink `#FFFFFF`, (21.0:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#F6F8FB`, ink `#000000`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#FFFFFF` (light) with `#000000` primary text and `#000000` secondary labels.
- Use `#242424` with `#f7f7f8` text (14.5:1) for primary CTAs, active tabs, and focus outlines.
- Pair `DM Sans` headings with `DM Sans` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#F6F8FB` surface shifts and `color-mix(in srgb, #000000 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
