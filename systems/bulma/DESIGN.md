---
version: alpha
name: Bulma CSS
description: "Bulma CSS — tokens imported from bulma."
colors:
  black: "hsl(221, 14%, 4%)"
  black-bis: "hsl(221, 14%, 9%)"
  black-ter: "hsl(221, 14%, 14%)"
  grey-darker: "hsl(221, 14%, 21%)"
  grey-dark: "hsl(221, 14%, 29%)"
  grey: "hsl(221, 14%, 48%)"
  grey-light: "hsl(221, 14%, 71%)"
  grey-lighter: "hsl(221, 14%, 86%)"
  grey-lightest: "hsl(221, 14%, 93%)"
  white-ter: "hsl(221, 14%, 96%)"
  white-bis: "hsl(221, 14%, 98%)"
  white: "hsl(221, 14%, 100%)"
  orange: "hsl(14, 100%, 53%)"
  yellow: "hsl(42, 100%, 53%)"
  green: "hsl(153, 53%, 53%)"
  turquoise: "hsl(171, 100%, 41%)"
  cyan: "hsl(198, 100%, 70%)"
  blue: "hsl(233, 100%, 63%)"
  purple: "hsl(271, 100%, 71%)"
  red: "hsl(348, 100%, 70%)"
  bulma-white-invert: "hsl(221, 14%, 4%)"
  bulma-black-invert: "hsl(221, 14%, 100%)"
  bulma-light-invert: "hsl(221, 14%, 21%)"
  bulma-dark-invert: "hsl(221, 14%, 96%)"
  bulma-black-bis: "hsl(221, 14%, 9%)"
  bulma-black-ter: "hsl(221, 14%, 14%)"
  bulma-grey-darker: "hsl(221, 14%, 21%)"
  bulma-grey-dark: "hsl(221, 14%, 29%)"
  bulma-grey: "hsl(221, 14%, 48%)"
  bulma-grey-light: "hsl(221, 14%, 71%)"
  bulma-grey-lighter: "hsl(221, 14%, 86%)"
  bulma-white-ter: "hsl(221, 14%, 96%)"
  bulma-white-bis: "hsl(221, 14%, 98%)"
  primary: "hsl(171, 100%, 41%)"
typography:
  bulma-body-font-size:
    fontSize: 1em
  bulma-small-font-size:
    fontSize: 0.875em
  bulma-pre-font-size:
    fontSize: 0.875em
  bulma-pre-code-font-size:
    fontSize: 1em
  bulma-menu-label-font-size:
    fontSize: 0.75em
  bulma-pagination-item-font-size:
    fontSize: 1em
  bulma-panel-tabs-font-size:
    fontSize: 1em
  h6:
    fontSize: "100%"
  h1:
    fontSize: 2em
  h2:
    fontSize: 1.75em
  h3:
    fontSize: 1.5em
  h4:
    fontSize: 1.25em
  h5:
    fontSize: 1.125em
  body-font-size:
    fontSize: 1em
  small-font-size:
    fontSize: 0.875em
  pre-font-size:
    fontSize: 0.875em
  pre-code-font-size:
    fontSize: 1em
  menu-label-font-size:
    fontSize: 0.75em
  pagination-item-font-size:
    fontSize: 1em
  panel-tabs-font-size:
    fontSize: 1em
rounded:
  nav: 0.5em
  default: 4px
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
  label:
    textColor: "hsl(221deg, 14%, 21%)"
    typography:
      fontSize: 1rem
      fontWeight: 600
  navbar-burger:
    textColor: "hsl(233deg, 100%, 63%)"
    typography:
      fontSize: 1em
    rounded: 0.5em
    padding: "0"
    height: 2.5rem
    width: 2.5rem
  bulma-has-text-link:
    textColor: "hsl(233deg, 100%, 63%)"
  bulma-has-text-link-00-2:
    textColor: "hsl(233deg, 100%, 0%)"
  bulma-has-text-link-05-3:
    textColor: "hsl(233deg, 100%, 3%)"
  has-text-link:
    textColor: "hsl(233deg, 100%, 63%)"
  has-text-link-00-2:
    textColor: "hsl(233deg, 100%, 0%)"
  has-text-link-05-3:
    textColor: "hsl(233deg, 100%, 3%)"
  select-default:
    backgroundColor: "hsl(221, 14%, 96%)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 8px 12px
  switch-control:
    backgroundColor: "hsl(171, 100%, 41%)"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "hsl(171, 100%, 41%)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "hsl(221, 14%, 96%)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 6px 12px
  alert-info:
    backgroundColor: "hsl(221, 14%, 96%)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 12px 14px
  table-grid:
    backgroundColor: "hsl(221, 14%, 100%)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "hsl(221, 14%, 100%)"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "hsl(221, 14%, 96%)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Bulma CSS

## Overview

**Bulma CSS** is a light-first design system anchored on `hsl(221, 14%, 100%)` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `hsl(171, 100%, 41%)` brand accent.

Typography centers cleanly on `System UI` (32px display down to 16px body), unified by `4px` base corner radius and stepped `hsl(221, 14%, 100%)` -> `hsl(221, 14%, 96%)` surface layering.

Maintained by **Bulma**. Source: published token package (https://bulma.io), package `bulma`. Inventory: **34** colors, **20** typography steps, and **16** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `hsl(221, 14%, 100%)` — base application backdrop (light theme).
- **Surface (`surface`)**: `hsl(221, 14%, 96%)` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `hsl(171, 100%, 41%)` (2.0:1 vs canvas; pair with `#0b0b0c` foreground ink for 10.1:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `grey` (`hsl(221, 14%, 48%)`), `turquoise` (`hsl(171, 100%, 41%)`), `cyan` (`hsl(198, 100%, 70%)`), `blue` (`hsl(233, 100%, 63%)`), `purple` (`hsl(271, 100%, 71%)`), `bulma-grey` (`hsl(221, 14%, 48%)`).
- **Neutral Ramp**: `black` (`hsl(221, 14%, 4%)`), `black-bis` (`hsl(221, 14%, 9%)`), `black-ter` (`hsl(221, 14%, 14%)`), `grey-darker` (`hsl(221, 14%, 21%)`), `grey-dark` (`hsl(221, 14%, 29%)`), `grey-light` (`hsl(221, 14%, 71%)`).
- **Semantic States**: success: `green` (`hsl(153, 53%, 53%)`) · danger: `red` (`hsl(348, 100%, 70%)`) · warning: `orange` (`hsl(14, 100%, 53%)`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `h1`: 2em, weight 600).
- **Body & UI Controls**: `system-ui` (`bulma-body-font-size`: 1em, weight 400).
- **Monospace / Technical Labels**: `system-ui` (`bulma-pre-code-font-size`: 1em).
- **Scale Steps (20)**: `h1` (2em), `h2` (1.75em), `h3` (1.5em), `h4` (1.25em), `h5` (1.125em), `bulma-body-font-size` (1em), `bulma-pre-code-font-size` (1em), `bulma-pagination-item-font-size` (1em).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `0`, `8px 12px`, `2px`, `6px 12px`, `12px 14px`.
- **Hierarchy**: Group controls cleanly within `hsl(221, 14%, 96%)` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`hsl(221, 14%, 100%)` -> `hsl(221, 14%, 96%)`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `hsl(171, 100%, 41%)` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `4px` (Navigation `0.5em`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `4px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`label` (label)**: ink `hsl(221deg, 14%, 21%)`.
- **`navbar-burger` (nav)**: ink `hsl(233deg, 100%, 63%)`, radius `0.5em`, padding `0`.
- **`bulma-has-text-link` (link)**: ink `hsl(233deg, 100%, 63%)`.
- **`bulma-has-text-link-00-2` (link)**: ink `hsl(233deg, 100%, 0%)`.
- **`bulma-has-text-link-05-3` (link)**: ink `hsl(233deg, 100%, 3%)`.
- **`has-text-link` (link)**: ink `hsl(233deg, 100%, 63%)`.
- **`has-text-link-00-2` (link)**: ink `hsl(233deg, 100%, 0%)`.
- **`has-text-link-05-3` (link)**: ink `hsl(233deg, 100%, 3%)`.
- **`select-default` (select)**: bg `hsl(221, 14%, 96%)`, ink `#0b0b0c`, (17.9:1), radius `4px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `hsl(171, 100%, 41%)`, ink `#0b0b0c`, (10.1:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `hsl(171, 100%, 41%)`, ink `#0b0b0c`, (10.1:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `hsl(221, 14%, 96%)`, ink `#0b0b0c`, (17.9:1), radius `4px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `hsl(221, 14%, 96%)`, ink `#0b0b0c`, (17.9:1), radius `4px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `hsl(221, 14%, 100%)`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `hsl(221, 14%, 100%)`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `hsl(221, 14%, 96%)`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `hsl(221, 14%, 100%)` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `hsl(171, 100%, 41%)` with `#0b0b0c` text (10.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `4px` base geometry across inputs and buttons (4px on outer containers).
- Separate containers via `hsl(221, 14%, 96%)` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `4px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
