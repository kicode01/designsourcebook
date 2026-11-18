---
version: alpha
name: Playbook
description: "Power Playbook — tokens read from https://github.com/powerhome/playbook."
colors:
  primary-action-dark: "#0082ff"
  text-lt-light: "#687887"
  text-dk-success-sm: "#00CA74"
  product-2-background: "#6000AC"
  product-4-background: "#007E8F"
  product-6-background: "#008540"
  product-8-background: "#144075"
  product-10-background: "#20c997"
  product-12-background: "#6F83AF"
  text-light: "#4B546B"
  text-success: "#158149"
  text-link: "#0056CF"
  text-default-dark: "#FFFFFF"
  text-lighter-dark: "#8A879A"
  text-error-dark: "#FF1A1A"
  text-disabled-dark: "#656576"
  input-text-active: "#242B42"
  input-text-error: "#DA0014"
  input-text-state-active: "#FFFFFF"
  input-text-error-dark: "#FF1A1A"
  input-background-state: "#FBFDFF"
  input-background-default-dark: "#44405A"
  input-background-disabled-dark: "#171333"
  input-border-state: "#0056CF"
  input-border-disabled: "#E4E8F0"
  input-border-state-dark: "#0E89FF"
  input-border-disabled-dark: "#6E6A84"
  status-text-primary: "#0056CF"
  status-text-error: "#BF0012"
  status-text-info: "#16747E"
  status-text-neutral-dark: "#93A8B8"
  status-text-success-dark: "#00CA74"
  status-text-warning-dark: "#F9BB00"
  status-background-neutral: "#EDEDED"
  status-background-success: "#E0F0E8"
  status-background-warning: "#FBF5E3"
  status-background-notification: "#0056CF"
  status-background-neutral-hover: "#E3E3E3"
  status-background-success-hover: "#CDEADB"
  status-background-warning-hover: "#FAEDC7"
  status-background-dark: "#231E3D"
  status-background-notification-error-dark: "#FF4A50"
  status-background-primary-hover-dark: "#0B2137"
  status-background-error-hover-dark: "#2E1F1F"
  status-background-info-hover-dark: "#212645"
  status-icon-background-primary-hover: "#E5EEFA"
  status-icon-background-error-hover: "#FBE5E7"
  status-icon-background-info-hover: "#DEF8FC"
  status-icon-background-primary-hover-dark: "#1B3956"
  status-icon-background-error-hover-dark: "#522F2F"
  status-icon-background-info-hover-dark: "#1A4662"
  status-border-primary: "#0056CF"
  status-border-error: "#BF0012"
  status-border-info: "#16747E"
  status-border-neutral-dark: "#93A8B8"
  status-border-success-dark: "#00CA74"
  status-border-warning-dark: "#F9BB00"
  status-border-focus: "#0056CF"
  border-dark: "#3b3752"
  error-secondary: "#ff0e24"
  info-secondary: "#0be9ff"
  neutral-secondary: "#e0e6ea"
  primary-action: "#0056CF"
  secondary: "#F9BB00"
  success-secondary: "#24cb75"
  text-default: "#242B42"
  text-lt-default: "#242B42"
  warning: "#F9BB00"
  border-bottom-color: "#e6e6e6"
  iti-border-color: "#ccc"
  royal: "#0056CF"
  red-dark: "#ff4a50"
  default: "#93a8b8"
  slate: "#C1CDD6"
  bg-dark-card: "#231E3D"
  product-2-highlight: "#8200E9"
  product-6-highlight: "#00A851"
  product-10-highlight: "#38d9a9"
  category-4: "#14D595"
  category-8: "#EA599F"
  category-13: "#058F9D"
  category-17: "#325B91"
  category-21: "#040830"
  card-dark: "#231e3d"
  category-3: "#F9BB00"
  data-4: "#1CA05C"
  doors: "#B85C00"
  insulation: "#96006C"
  solar: "#007E8F"
  highlight-dark: "#202850"
  primary: "#0082ff"
typography:
  font-family-base:
    fontFamily: "\"Power Centra\", \"Helvetica Neue\", Helvetica, Arial, \"sans_serif\""
  pb-message-body:
    fontSize: 15px
  attachment-caption:
    fontSize: 0.9em
    lineHeight: 1.2
rounded:
  nav: 8px
  default: 8px
icons:
  library: Repository SVGs
  package: null
  style: outline
  grid: 18
  strokeWidth: 1.5
  strokeLinecap: round
  strokeLinejoin: round
  source: repo
components:
  select-default:
    backgroundColor: "#EDEDED"
    textColor: "#242B42"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#0082ff"
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#0082ff"
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#EDEDED"
    textColor: "#242B42"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#EDEDED"
    textColor: "#242B42"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#EDEDED"
    textColor: "#242B42"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#242B42"
    textColor: "#EDEDED"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#EDEDED"
    textColor: "#242B42"
    rounded: 8px
    padding: 8px
---

# Playbook

## Overview

**Playbook** is a light-first design system anchored on `#EDEDED` canvas surfaces with `#242B42` primary ink (12.0:1 contrast) and `#0082ff` brand accent.

Typography centers cleanly on `Power Centra` (16px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **Power**. Source: published token package (https://github.com/powerhome/playbook), repo https://github.com/powerhome/playbook. Inventory: **91** colors, **3** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#EDEDED` — base application backdrop (light theme).
- **Surface (`surface`)**: `#EDEDED` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#242B42` — body copy and primary headings (12.0:1 on canvas).
- **Muted Ink (`muted`)**: `#687887` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#0082ff` (3.2:1 vs canvas; pair with `#f7f7f8` foreground ink for 3.5:1 contrast).
- **Structural Border (`border`)**: `#ccc` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `primary-action-dark` (`#0082ff`), `text-lt-light` (`#687887`), `product-2-background` (`#6000AC`), `product-4-background` (`#007E8F`), `product-6-background` (`#008540`), `product-8-background` (`#144075`).
- **Neutral Ramp**: `text-default-dark` (`#FFFFFF`), `text-lighter-dark` (`#8A879A`), `text-disabled-dark` (`#656576`), `input-text-state-active` (`#FFFFFF`), `input-background-state` (`#FBFDFF`), `input-border-disabled` (`#E4E8F0`).
- **Semantic States**: success: `text-dk-success-sm` (`#00CA74`) · danger: `text-error-dark` (`#FF1A1A`) · warning: `status-text-warning-dark` (`#F9BB00`) · info: `text-link` (`#0056CF`).

## Typography

- **Primary / Display Voice**: `"Power Centra", "Helvetica Neue", Helvetica, Arial, "sans_serif"` (top step `font-family-base`: 16px, weight 600).
- **Body & UI Controls**: `"Power Centra", "Helvetica Neue", Helvetica, Arial, "sans_serif"` (`font-family-base`: 16px, weight 400).
- **Scale Steps (3)**: `font-family-base` (16px), `pb-message-body` (15px), `attachment-caption` (0.9em).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#EDEDED` cards; separate sibling sections using `#ccc` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#EDEDED` -> `#EDEDED`) and `1px solid #ccc` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#0082ff` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Repository SVGs on a `18x18` grid (outline, stroke `1.5px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#EDEDED`, ink `#242B42`, (12.0:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#0082ff`, ink `#000000`, (5.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#0082ff`, ink `#000000`, (5.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#EDEDED`, ink `#242B42`, (12.0:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#EDEDED`, ink `#242B42`, (12.0:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#EDEDED`, ink `#242B42`, (12.0:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#242B42`, ink `#EDEDED`, (12.0:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#EDEDED`, ink `#242B42`, (12.0:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#EDEDED` (light) with `#242B42` primary text and `#687887` secondary labels.
- Use `#0082ff` with `#f7f7f8` text (3.5:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Power Centra` headings with `Power Centra` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#EDEDED` surface shifts and `#ccc` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
