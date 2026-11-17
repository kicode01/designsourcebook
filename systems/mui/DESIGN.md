---
version: alpha
name: MUI Material UI
description: "Dark (#121212) canvas, Roboto typography, #fff brand accent, and 8px corner geometry"
colors:
  primary: "#fff"
  color: "#fff"
  background-color: "#fff"
  color-prettylights-syntax-comment: "#b2b2b2"
  color-prettylights-syntax-constant: "#f8f8f2"
  color-prettylights-syntax-constant-other-reference-l: "#a6e22e"
  color-prettylights-syntax-entity: "#a6e22e"
  color-prettylights-syntax-entity-name: "#e6db74"
  color-prettylights-syntax-entity-tag: "#fc929e"
  color-prettylights-syntax-keyword: "#66d9ef"
  color-prettylights-syntax-string: "#a6e22e"
  color-prettylights-syntax-string-regexp: "#fd971f"
  color-prettylights-syntax-variable: "#f8f8f2"
  color-prettylights-syntax-storage-modifier-import: "#f8f8f2"
  color-prettylights-syntax-brackethighlighter-angle: "#f8f8f2"
  color-prettylights-syntax-brackethighlighter-unmatch: "#fc929e"
  color-prettylights-syntax-sublimelinter-gutter-mark: "#b2b2b2"
  color-prettylights-syntax-invalid-illegal-bg: "#fc929e"
  color-prettylights-syntax-invalid-illegal-text: "#f8f8f2"
  color-prettylights-syntax-carriage-return-bg: "#fc929e"
  color-prettylights-syntax-carriage-return-text: "#f8f8f2"
  color-prettylights-syntax-markup-heading: "#66d9ef"
  color-prettylights-syntax-markup-bold: "#f8f8f2"
  color-prettylights-syntax-markup-italic: "#f8f8f2"
  color-prettylights-syntax-markup-list: "#fc929e"
  color-prettylights-syntax-markup-changed-text: "#e6db74"
  color-prettylights-syntax-markup-deleted-text: "#fc929e"
  color-prettylights-syntax-markup-inserted-text: "#a6e22e"
  color-prettylights-syntax-markup-ignored-text: "#b2b2b2"
  color-prettylights-syntax-meta-diff-range: "#b78eff"
  color-docs-infra-syntax-number: "#b78eff"
  color-docs-infra-syntax-boolean: "#b78eff"
  color-docs-infra-syntax-nullish: "#b2b2b2"
  color-docs-infra-syntax-attr-key: "#a6e22e"
  color-docs-infra-syntax-attr-value: "#e6db74"
  color-docs-infra-syntax-attr-value-quote: "#f8f8f2"
  color-docs-infra-syntax-attr-equals: "#f8f8f2"
  color-docs-infra-syntax-data-attr: "#a6e22e"
  color-docs-infra-syntax-css-property: "#fc929e"
  color-docs-infra-syntax-css-value: "#f8f8f2"
  color-docs-infra-syntax-this: "#66d9ef"
  color-docs-infra-syntax-builtin-type: "#66d9ef"
  color-docs-infra-syntax-jsx: "#e6db74"
  color-docs-infra-syntax-jsx-variable: "#fc929e"
  color-docs-infra-syntax-html-tag: "#fc929e"
  color-docs-infra-syntax-jsx-tag: "#fc929e"
  color-docs-infra-syntax-property-string: "#fc929e"
  color-docs-infra-syntax-object-property: "#fc929e"
  color-docs-infra-syntax-punctuation: "#f8f8f2"
  a100: "#ffe57f"
  a200: "#ffd740"
  a400: "#ffc400"
  a700: "#ffab00"
  black: "#000"
  white: "#fff"
  background-paper: "#121212"
  background-default: "#121212"
  paper: "#121212"
  main: "#ed6c02"
  background: "#e5e5e5"
typography:
  default-font-family:
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  font-size:
    fontSize: 20px
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#121212"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#121212"
    textColor: "#f7f7f8"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#fff"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#121212"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 16px
---

# MUI Material UI

## Overview

**MUI Material UI** is a dark-first design system anchored on `#121212` canvas surfaces with `#f7f7f8` primary ink (17.5:1 contrast) and `#fff` brand accent.

Typography centers cleanly on `Roboto` (20px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **MUI**. Source: published token package (https://github.com/mui/material-ui), repo https://github.com/mui/material-ui, package `@mui/material`, frameworks: react. Inventory: **60** colors, **2** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#121212` — base application backdrop (dark theme).
- **Surface (`surface`)**: `#121212` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#f7f7f8` — body copy and primary headings (17.5:1 on canvas).
- **Muted Ink (`muted`)**: `#f7f7f8` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#fff` (18.7:1 vs canvas; pair with `#0b0b0c` foreground ink for 19.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #f7f7f8 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-prettylights-syntax-constant-other-reference-l` (`#a6e22e`), `color-prettylights-syntax-entity` (`#a6e22e`), `color-prettylights-syntax-entity-name` (`#e6db74`), `color-prettylights-syntax-entity-tag` (`#fc929e`), `color-prettylights-syntax-keyword` (`#66d9ef`), `color-prettylights-syntax-string` (`#a6e22e`).
- **Neutral Ramp**: `primary` (`#fff`), `color` (`#fff`), `background-color` (`#fff`), `color-prettylights-syntax-comment` (`#b2b2b2`), `color-prettylights-syntax-constant` (`#f8f8f2`), `color-prettylights-syntax-variable` (`#f8f8f2`).
- **Semantic States**: success: `color-prettylights-syntax-invalid-illegal-bg` (`#fc929e`).

## Typography

- **Primary / Display Voice**: `Roboto, Helvetica, Arial, sans-serif` (top step `font-size`: 20px, weight 600).
- **Body & UI Controls**: `Roboto, Helvetica, Arial, sans-serif` (`default-font-family`: 16px, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#121212` cards; separate sibling sections using `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#121212` -> `#121212`) and `1px solid color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#fff` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#f7f7f8`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ef4444`, ink `#000000`, (5.6:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#121212`, ink `#f7f7f8`, (17.5:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#121212`, ink `#f7f7f8`, (17.5:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#fff`, ink `#000000`, (21.0:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#10b981`, ink `#000000`, (8.3:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#121212`, ink `#f7f7f8`, (17.5:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#121212` (dark) with `#f7f7f8` primary text and `#f7f7f8` secondary labels.
- Use `#fff` with `#0b0b0c` text (19.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Roboto` headings with `Roboto` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#121212` surface shifts and `color-mix(in srgb, #f7f7f8 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of dark polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
