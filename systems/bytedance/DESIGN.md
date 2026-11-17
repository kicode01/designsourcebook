---
version: alpha
name: ByteDance Arco Design
description: "Crisp light (#FFF) canvas, NunitoSans-Bold typography, #ff7d00 brand accent, and 4px corner geometry"
colors:
  color-bg-2: "#FFF"
  color-bg-3: "#FFF"
  color-bg-4: "#FFF"
  color-bg-5: "#FFF"
  color-bg-white: "#FFF"
  dark-value: "#17171A"
  fff: "#000"
  red-value: "#f53f3f"
  orangered-value: "#F77234"
  orange-value: "#ff7d00"
  gold-value: "#F7BA1E"
  yellow-value: "#FADC19"
  lime-value: "#9FDB1D"
  green-value: "#00b42a"
  cyan-value: "#14C9C9"
  blue-value: "#3491FA"
  arcoblue-value: "#165dff"
  purple-value: "#722ed1"
  pinkpurple-value: "#D91AD9"
  magenta-value: "#F5319D"
  style-fill: "#666666"
  fill: "#666666"
  primary: "#ff7d00"
typography:
  font-size-body-2:
    fontSize: 13px
  font-size-body-1:
    fontSize: 12px
  font-size-caption:
    fontSize: 12px
  font-size-title-1:
    fontSize: 16px
  font-size-title-2:
    fontSize: 20px
  font-size-title-3:
    fontSize: 24px
  font-size-display-1:
    fontSize: 36px
  font-size-display-2:
    fontSize: 48px
  font-size-display-3:
    fontSize: 56px
  h1:
    fontSize: 2em
  body:
    fontSize: 14px
  arco-alert-title:
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
  arco-anchor-link-title:
    fontSize: 14px
    lineHeight: 1.5715
  arco-calendar-month-title:
    fontSize: 16px
    fontWeight: 500
  arco-card-meta-title:
    fontSize: 16px
  arco-panel-date-timepicker-title:
    fontSize: 14px
    fontWeight: 400
    lineHeight: 40px
  arco-descriptions-title:
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5715
  arco-drawer-header-title:
    fontSize: 16px
    fontWeight: 500
  arco-dropdown-menu-group-title:
    fontSize: 12px
    lineHeight: 20px
  arco-image-caption-title:
    fontSize: 16px
    fontWeight: 500
  arco-image-caption-description:
    fontSize: 14px
  arco-modal-title:
    fontSize: 16px
    fontWeight: 500
  arco-notification-title:
    fontSize: 16px
    fontWeight: 500
  arco-page-header-title:
    fontSize: 20px
    fontWeight: 600
  arco-page-header-sub-title:
    fontSize: 14px
  arco-popconfirm-title:
    fontSize: 14px
  arco-popconfirm-title-icon:
    fontSize: 18px
  arco-popover-title:
    fontSize: 16px
    fontWeight: 500
  arco-result-title:
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5715
  arco-result-subtitle:
    fontSize: 14px
    lineHeight: 1.5715
  arco-select-group-title:
    fontSize: 12px
    lineHeight: 20px
  arco-statistic-title:
    fontSize: 14px
  arco-steps-item-title:
    fontSize: 16px
    lineHeight: 28px
  arco-tabs-header-title:
    fontSize: 14px
    lineHeight: 1.5715
  arco-tree-node-title:
    fontSize: 14px
  font-family:
    fontFamily: "NunitoSans-Bold, \"Nunito Sans\""
  font-size:
    fontSize: 16px
rounded:
  button: 4px
  input: 4px
  card: 8px
  badge: 999px
  nav: 4px
  default: 4px
components:
  button-primary:
    backgroundColor: "#ff7d00"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 4px
    padding: 10px 18px
  input-default:
    backgroundColor: "#FFF"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#FFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#ff7d00"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#FFF"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 16px
---

# ByteDance Arco Design

## Overview

**ByteDance Arco Design** is a light-first design system anchored on `#FFF` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#ff7d00` brand accent.

Typography centers cleanly on `NunitoSans-Bold` (56px display down to 14px body), unified by `4px` base corner radius and hairline `1px` structural borders.

Maintained by **ByteDance**. Source: published token package (https://github.com/arco-design/arco-design), repo https://github.com/arco-design/arco-design, package `@arco-design/web-react`, frameworks: react, vue. Inventory: **23** colors, **37** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#FFF` — base application backdrop (light theme).
- **Surface (`surface`)**: `#FFF` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ff7d00` (2.6:1 vs canvas; pair with `#0b0b0c` foreground ink for 7.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `gold-value` (`#F7BA1E`), `lime-value` (`#9FDB1D`), `cyan-value` (`#14C9C9`), `blue-value` (`#3491FA`), `arcoblue-value` (`#165dff`), `purple-value` (`#722ed1`).
- **Neutral Ramp**: `color-bg-2` (`#FFF`), `color-bg-3` (`#FFF`), `color-bg-4` (`#FFF`), `color-bg-5` (`#FFF`), `color-bg-white` (`#FFF`), `dark-value` (`#17171A`).
- **Semantic States**: success: `green-value` (`#00b42a`) · danger: `red-value` (`#f53f3f`) · warning: `orange-value` (`#ff7d00`).

## Typography

- **Primary / Display Voice**: `NunitoSans-Bold, "Nunito Sans"` (top step `font-size-display-3`: 56px, weight 600).
- **Body & UI Controls**: `NunitoSans-Bold, "Nunito Sans"` (`body`: 14px, weight 400).
- **Scale Steps (37)**: `font-size-display-3` (56px), `font-size-display-2` (48px), `font-size-display-1` (36px), `h1` (2em), `font-size-title-3` (24px), `font-size-title-2` (20px), `arco-page-header-title` (20px, w600), `arco-popconfirm-title-icon` (18px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#FFF` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#FFF` -> `#FFF`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ff7d00` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `4px` (Buttons `4px` · Inputs `4px` · Cards `8px` · Badges `999px` · Navigation `4px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.

## Components

- **`button-primary` (button)**: bg `#ff7d00`, ink `#0b0b0c`, (7.7:1), radius `4px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `4px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `4px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#FFF`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#FFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#ff7d00`, ink `#0b0b0c`, (7.7:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#FFF`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#FFF` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ff7d00` with `#0b0b0c` text (7.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `NunitoSans-Bold` headings with `NunitoSans-Bold` body copy using documented weights and scale steps.
- Apply `4px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#FFF` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `4px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
