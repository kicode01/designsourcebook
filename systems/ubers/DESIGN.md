---
version: alpha
name: "Uber's Base Web"
description: "Crisp light (#F6F6F6) canvas, UberMove typography, #276EF1 brand accent, and 8px corner geometry"
colors:
  primary: "#276EF1"
  primary50: "#F6F6F6"
  primary100: "#EEEEEE"
  primary200: "#E2E2E2"
  primary300: "#CBCBCB"
  primary400: "#AFAFAF"
  primary500: "#6B6B6B"
  primary600: "#545454"
  primary700: "#333333"
  accent50: "#EFF3FE"
  accent100: "#D4E2FC"
  accent200: "#A0BFF8"
  accent300: "#5B91F5"
  accent400: "#276EF1"
  accent500: "#1E54B7"
  accent600: "#174291"
  accent700: "#102C60"
  warning50: "#FFFAF0"
  warning100: "#FFF2D9"
  warning200: "#FFE3AC"
  warning300: "#FFCF70"
  warning400: "#FFC043"
  warning500: "#BC8B2C"
  warning600: "#996F00"
  warning700: "#674D1B"
  brand-default50: "#EFF4FE"
  brand-default100: "#DEE9FE"
  brand-default200: "#CDDEFF"
  brand-default300: "#A9C9FF"
  brand-default400: "#6DAAFB"
  brand-default500: "#068BEE"
  brand-default600: "#276EF1"
  brand-default700: "#175BCC"
  brand-default800: "#1948A3"
  brand-default900: "#002661"
  brand-default50-dark: "#09152C"
  brand-default100-dark: "#182946"
  brand-default200-dark: "#22375C"
  brand-default300-dark: "#2D4775"
  brand-default400-dark: "#335BA3"
  brand-default500-dark: "#3F6EC5"
  brand-default600-dark: "#5E8BDB"
  brand-default700-dark: "#93B4EE"
  brand-default800-dark: "#B3CCF6"
  brand-default900-dark: "#D1DFF6"
  plain-background-color: "#292929"
  background-color: "#292929"
  negative50: "#FFEFED"
  negative600: "#870F00"
  positive400: "#048848"
  mono100: "#CBCBCB"
  mono700: "#1F1F1F"
  gray200: "#DDDDDD"
  gray800: "#4B4B4B"
  platinum400: "#8EA3AD"
  red100: "#FFE1DE"
  red700: "#BB032A"
  orange300: "#FFB48C"
  orange900: "#461A00"
  amber500: "#C46E00"
  yellow100: "#FBE5B6"
  yellow700: "#845201"
  lime300: "#A6D467"
  lime900: "#1B2D00"
  green500: "#009A51"
  teal100: "#CDEEF3"
  teal700: "#016974"
  blue300: "#A9C9FF"
  blue900: "#002661"
  cobalt500: "#0A1899"
  purple300: "#DDB9FF"
  purple900: "#3A1659"
  magenta500: "#E142BC"
  brown100: "#EBE0DB"
  brown700: "#3D281E"
  gray500-dark: "#717171"
  red100-dark: "#4A1216"
  red700-dark: "#EA9B98"
  orange300-dark: "#6D3715"
  orange900-dark: "#F8D6C5"
  amber500-dark: "#956724"
  yellow100-dark: "#39240A"
  yellow700-dark: "#D7AC57"
  lime300-dark: "#39501F"
  lime900-dark: "#D6E3CB"
  green500-dark: "#3D8351"
  teal100-dark: "#0C2E34"
  teal700-dark: "#72C1CD"
  blue300-dark: "#2D4775"
  blue900-dark: "#D1DFF6"
typography:
  display-hero:
    fontFamily: UberMove
    fontSize: 52px
    fontWeight: 700
    lineHeight: 1.23
  section-heading:
    fontFamily: UberMove
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.22
  card-title:
    fontFamily: UberMove
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.25
  sub-heading:
    fontFamily: UberMove
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.33
  small-heading:
    fontFamily: UberMove
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.4
  nav-ui-large:
    fontFamily: UberMove
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.33
  body-button:
    fontFamily: UberMove
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.25
  caption:
    fontFamily: UberMove
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.14
  micro:
    fontFamily: UberMove
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.67
  primary-font-family:
    fontFamily: "UberMoveText, system-ui, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
  secondary-font-family:
    fontFamily: "UberMove, UberMoveText, system-ui, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
  mono-font-family:
    fontFamily: "UberMoveMono, \"Lucida Console\", Monaco, monospace"
  font-size:
    fontSize: 10px
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
    backgroundColor: "#276EF1"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#FFEFED"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#EFF4FE"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#EFF4FE"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#276EF1"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#048848"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#EFF4FE"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#EEEEEE"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#276EF1"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#276EF1"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#EEEEEE"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#EEEEEE"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#F6F6F6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#F6F6F6"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#EEEEEE"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Uber's Base Web

## Overview

**Uber's Base Web** is a light-first design system anchored on `#F6F6F6` canvas surfaces with `#0b0b0c` primary ink (18.2:1 contrast) and `#276EF1` brand accent.

Typography centers cleanly on `UberMove` (52px display down to 16px body), unified by `8px` base corner radius and stepped `#F6F6F6` -> `#EEEEEE` surface layering.

Maintained by **Uber**. Source: published token package (https://github.com/uber-web/baseui), repo https://github.com/uber/baseweb, package `baseui`, frameworks: react. Inventory: **90** colors, **13** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#F6F6F6` — base application backdrop (light theme).
- **Surface (`surface`)**: `#EEEEEE` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (18.2:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#276EF1` (4.2:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.3:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `primary` (`#276EF1`), `accent100` (`#D4E2FC`), `accent200` (`#A0BFF8`), `accent300` (`#5B91F5`), `accent400` (`#276EF1`), `accent500` (`#1E54B7`).
- **Neutral Ramp**: `primary50` (`#F6F6F6`), `primary100` (`#EEEEEE`), `primary200` (`#E2E2E2`), `primary300` (`#CBCBCB`), `primary400` (`#AFAFAF`), `primary500` (`#6B6B6B`).
- **Semantic States**: success: `positive400` (`#048848`) · danger: `negative600` (`#870F00`) · warning: `warning100` (`#FFF2D9`).

## Typography

- **Primary / Display Voice**: `UberMove` (top step `display-hero`: 52px, weight 700, line-height 1.23).
- **Body & UI Controls**: `UberMove` (`body-button`: 16px, weight 400, line-height 1.25).
- **Monospace / Technical Labels**: `UberMoveMono, "Lucida Console", Monaco, monospace` (`mono-font-family`: 16px).
- **Scale Steps (13)**: `display-hero` (52px, w700), `section-heading` (36px, w700), `card-title` (32px, w700), `sub-heading` (24px, w700), `small-heading` (20px, w700), `nav-ui-large` (18px, w500), `body-button` (16px, w400), `primary-font-family` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#EEEEEE` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#F6F6F6` -> `#EEEEEE`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#276EF1` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#276EF1`, ink `#ffffff`, (4.6:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#FFEFED`, ink `#000000`, (18.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#EFF4FE`, ink `#0b0b0c`, (17.8:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#EFF4FE`, ink `#0b0b0c`, (17.8:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#276EF1`, ink `#ffffff`, (4.6:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#048848`, ink `#ffffff`, (4.5:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#EFF4FE`, ink `#0b0b0c`, (17.8:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#EEEEEE`, ink `#0b0b0c`, (17.0:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#276EF1`, ink `#0b0b0c`, (4.3:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#276EF1`, ink `#0b0b0c`, (4.3:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#EEEEEE`, ink `#0b0b0c`, (17.0:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#EEEEEE`, ink `#0b0b0c`, (17.0:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#F6F6F6`, ink `#0b0b0c`, (18.2:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#F6F6F6`, (18.2:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#EEEEEE`, ink `#0b0b0c`, (17.0:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#F6F6F6` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#276EF1` with `#f7f7f8` text (4.3:1) for primary CTAs, active tabs, and focus outlines.
- Pair `UberMove` headings with `UberMove` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#EEEEEE` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
