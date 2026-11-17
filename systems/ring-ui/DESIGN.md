---
version: alpha
name: Ring UI
description: "IDE-grade web component library, JetBrains blue highlights and crisp dense controls"
colors:
  ring-borders-components: "rgb(211, 213, 219)"
  ring-border-disabled-components: "rgb(235, 236, 240)"
  ring-border-selected-disabled-components: "rgb(201, 204, 214)"
  ring-border-hover-components: "rgb(160, 189, 248)"
  ring-border-hover-success-components: "rgb(197, 229, 204)"
  ring-border-hover-error-components: "rgb(250, 212, 216)"
  ring-border-accent-components: "rgb(112, 156, 245)"
  ring-success-border-components: "rgb(137, 195, 152)"
  ring-success-border-hover-components: "rgb(85, 167, 106)"
  ring-error-border-components: "rgb(242, 182, 187)"
  ring-error-border-hover-components: "rgb(228, 106, 118)"
  ring-warning-border-components: "rgb(254, 210, 119)"
  ring-warning-border-hover-components: "rgb(253, 189, 61)"
  ring-highlight-border-components: "rgb(254, 210, 119)"
  ring-highlight-border-hover-components: "rgb(253, 189, 61)"
  ring-purple-border-components: "rgb(191, 161, 248)"
  ring-purple-border-hover-components: "rgb(161, 119, 244)"
  ring-popup-border-components: "rgb(0, 28, 54)"
  ring-button-primary-border-components: "rgb(46, 85, 163)"
  ring-link-components: "rgb(49, 95, 189)"
  ring-link-hover-components: "rgb(46, 85, 163)"
  ring-purple-text-components: "rgb(131, 77, 240)"
  ring-text-components: "rgb(39, 40, 46)"
  ring-white-text-components: "rgb(255, 255, 255)"
  ring-content-background-components: "rgb(255, 255, 255)"
  ring-popup-background-components: "rgb(255, 255, 255)"
  ring-sidebar-background-components: "rgb(247, 248, 250)"
  ring-secondary-background-components: "rgb(247, 248, 250)"
  ring-selected-background-components: "rgb(212, 226, 255)"
  ring-hover-background-components: "rgb(237, 243, 255)"
  ring-navigation-background-components: "rgb(255, 255, 255)"
  ring-tag-background-components: "rgb(235, 236, 240)"
  ring-tag-hover-background-components: "rgb(223, 225, 229)"
  ring-removed-background-components: "rgb(250, 212, 216)"
  ring-warning-background-components: "rgb(255, 241, 209)"
  ring-highlight-background-components: "rgb(255, 241, 209)"
  ring-added-background-components: "rgb(197, 229, 204)"
  ring-purple-background-components: "rgb(239, 229, 255)"
  ring-disabled-background-components: "rgb(247, 248, 250)"
  ring-disabled-selected-background-components: "rgb(235, 236, 240)"
  ring-removed-subtle-background-components: "rgb(255, 235, 236)"
  ring-warning-subtle-background-components: "rgb(255, 246, 222)"
  ring-highlight-subtle-background-components: "rgb(255, 246, 222)"
  ring-added-subtle-background-components: "rgb(230, 247, 233)"
  ring-purple-subtle-background-components: "rgb(250, 245, 255)"
  ring-highlight-fill-components: "rgb(255, 175, 15)"
  ring-grey-fill-components: "rgb(39, 40, 46)"
  ring-grey-fill-accent-components: "rgb(56, 58, 66)"
  ring-code-tag-background-components: "rgb(235, 236, 240)"
  ring-active-text-components: "rgb(255, 255, 255)"
  ring-code-background-components: "rgb(30, 31, 34)"
  ring-loader-color-1: "#3bea62"
  ring-loader-color-2: "#6b57ff"
  ring-loader-color-3: "#07c3f2"
  primary: "#07c3f2"
typography:
  ring-font-size-larger:
    fontSize: 16px
  ring-font-size:
    fontSize: 14px
  ring-font-size-smaller:
    fontSize: 12px
  ring-font-family:
    fontFamily: "system-ui, Arial, sans-serif"
  ring-font-family-monospace:
    fontFamily: "Menlo, \"Bitstream Vera Sans Mono\", \"Ubuntu Mono\", Consolas, \"Courier New\", Courier, monospace"
  font-size:
    fontSize: 26px
  title:
    fontSize: 21px
rounded:
  button: 4px
  input: 4px
  card: 8px
  badge: 999px
  nav: 4px
  default: 4px
icons:
  library: Octicons
  package: "@primer/octicons-react"
  style: solid
  grid: 16
  strokeWidth: 0
  strokeLinecap: round
  strokeLinejoin: round
  source: npm
  url: "https://primer.style/foundations/icons"
components:
  button-primary:
    backgroundColor: "#07c3f2"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 18px
  button-danger:
    backgroundColor: "rgb(250, 212, 216)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 18px
  input-default:
    backgroundColor: "rgb(247, 248, 250)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 9px 13px
  card-surface:
    backgroundColor: "rgb(247, 248, 250)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#07c3f2"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "rgb(197, 229, 204)"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "rgb(247, 248, 250)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 16px
  select-default:
    backgroundColor: "rgb(247, 248, 250)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#07c3f2"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#07c3f2"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "rgb(247, 248, 250)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 6px 12px
  alert-info:
    backgroundColor: "rgb(247, 248, 250)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 12px 14px
  table-grid:
    backgroundColor: "rgb(255, 255, 255)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "rgb(255, 255, 255)"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "rgb(247, 248, 250)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Ring UI

## Overview

**Ring UI** is a light-first design system anchored on `rgb(255, 255, 255)` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#07c3f2` brand accent.

Typography centers cleanly on `System UI` (26px display down to 16px body), unified by `4px` base corner radius and stepped `rgb(255, 255, 255)` -> `rgb(247, 248, 250)` surface layering.

Maintained by **JetBrains**. Source: published token package (https://github.com/JetBrains/ring-ui#readme), repo https://github.com/JetBrains/ring-ui, package `@jetbrains/ring-ui`, frameworks: react, css. Inventory: **55** colors, **7** typography steps, and **16** documented components (Apache-2.0 license).

## Colors

- **Canvas (`canvas`)**: `rgb(255, 255, 255)` — base application backdrop (light theme).
- **Surface (`surface`)**: `rgb(247, 248, 250)` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#07c3f2` (2.1:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.5:1 contrast).
- **Structural Border (`border`)**: `rgb(235, 236, 240)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `ring-border-hover-components` (`rgb(160, 189, 248)`), `ring-border-accent-components` (`rgb(112, 156, 245)`), `ring-highlight-border-components` (`rgb(254, 210, 119)`), `ring-highlight-border-hover-components` (`rgb(253, 189, 61)`), `ring-purple-border-components` (`rgb(191, 161, 248)`), `ring-purple-border-hover-components` (`rgb(161, 119, 244)`).
- **Neutral Ramp**: `ring-borders-components` (`rgb(211, 213, 219)`), `ring-border-disabled-components` (`rgb(235, 236, 240)`), `ring-border-selected-disabled-components` (`rgb(201, 204, 214)`), `ring-text-components` (`rgb(39, 40, 46)`), `ring-white-text-components` (`rgb(255, 255, 255)`), `ring-content-background-components` (`rgb(255, 255, 255)`).
- **Semantic States**: success: `ring-border-hover-success-components` (`rgb(197, 229, 204)`) · danger: `ring-border-hover-error-components` (`rgb(250, 212, 216)`) · warning: `ring-warning-border-components` (`rgb(254, 210, 119)`) · info: `ring-link-components` (`rgb(49, 95, 189)`).

## Typography

- **Primary / Display Voice**: `system-ui, Arial, sans-serif` (top step `font-size`: 26px, weight 600).
- **Body & UI Controls**: `system-ui, Arial, sans-serif` (`ring-font-size-larger`: 16px, weight 400).
- **Monospace / Technical Labels**: `Menlo, "Bitstream Vera Sans Mono", "Ubuntu Mono", Consolas, "Courier New", Courier, monospace` (`ring-font-family-monospace`: 16px).
- **Scale Steps (7)**: `font-size` (26px), `title` (21px), `ring-font-size-larger` (16px), `ring-font-family` (16px), `ring-font-family-monospace` (16px), `ring-font-size` (14px), `ring-font-size-smaller` (12px).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `rgb(247, 248, 250)` cards; separate sibling sections using `rgb(235, 236, 240)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`rgb(255, 255, 255)` -> `rgb(247, 248, 250)`) and `1px solid rgb(235, 236, 240)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#07c3f2` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `4px` (Buttons `4px` · Inputs `4px` · Cards `8px` · Badges `999px` · Navigation `4px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Octicons (`@primer/octicons-react`) on a `16x16` grid (solid, stroke `0px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#07c3f2`, ink `#0b0b0c`, (9.5:1), radius `4px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `4px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `rgb(250, 212, 216)`, ink `#0b0b0c`, (14.5:1), radius `4px`, padding `10px 18px`.
- **`input-default` (input)**: bg `rgb(247, 248, 250)`, ink `#0b0b0c`, (18.5:1), radius `4px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `rgb(247, 248, 250)`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#07c3f2`, ink `#0b0b0c`, (9.5:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `rgb(197, 229, 204)`, ink `#0b0b0c`, (14.5:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `rgb(247, 248, 250)`, ink `#0b0b0c`, (18.5:1), radius `4px`, padding `10px 16px`.
- **`select-default` (select)**: bg `rgb(247, 248, 250)`, ink `#0b0b0c`, (18.5:1), radius `4px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#07c3f2`, ink `#0b0b0c`, (9.5:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#07c3f2`, ink `#0b0b0c`, (9.5:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `rgb(247, 248, 250)`, ink `#0b0b0c`, (18.5:1), radius `4px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `rgb(247, 248, 250)`, ink `#0b0b0c`, (18.5:1), radius `4px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `rgb(255, 255, 255)`, ink `#0b0b0c`, (19.7:1), radius `4px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `rgb(255, 255, 255)`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `rgb(247, 248, 250)`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `rgb(255, 255, 255)` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#07c3f2` with `#0b0b0c` text (9.5:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `4px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `rgb(247, 248, 250)` surface shifts and `rgb(235, 236, 240)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `4px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
