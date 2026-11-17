---
version: alpha
name: Italia Design System
description: "Crisp light (#fff) canvas, Titillium Web typography, #06c brand accent, and 8px corner geometry"
colors:
  color-primary: "#06c"
  color-black: "#000"
  color-white: "#fff"
  color-grey-10: "#f5f5f0"
  color-grey-15: "#f6f9fc"
  color-grey-20: "#eee"
  color-grey-30: "#ddd"
  color-grey-40: "#a5abb0"
  color-grey-50: "#5a6772"
  color-grey-60: "#444e57"
  color-grey-80: "#30373d"
  color-grey-90: "#1c2024"
  color-teal-30: "#00c5ca"
  color-teal-50: "#65dcdf"
  color-teal-70: "#004a4d"
  color-focus: "#ff8c00"
  it-base-text-color: "#1c2024"
  it-base-focus-color: "#ff8c00"
  alert-error-bg: "#ffcbcb"
  alert-error-color: "#1e1212"
  alert-error-border: "#b50000"
  alert-warning-bg: "#ffef9f"
  alert-warning-color: "#4f4310"
  alert-warning-border: "#1e1212"
  alert-success-bg: "#dff0d8"
  alert-success-color: "#274d28"
  alert-success-border: "#d6e9c6"
  alert-info-bg: "#c6f3f5"
  alert-info-color: "#004446"
  alert-info-border: "#1e1212"
  button-default-bg: "#65dde0"
  button-default-color: "#004a4d"
  button-default-border: "#50d8dc"
  button-danger-bg: "#b50000"
  button-danger-color: "#fff"
  button-danger-border: "#f00"
  button-info-bg: "#fff"
  button-info-color: "#003e54"
  button-info-border: "#ccc"
  callout-color-must: "#f4e6f5"
  callout-color-should: "#d1e7ff"
  callout-color-could: "#ebf5ef"
  callout-color-example: "#e6e5e3"
  callout-border-top-color: "#aaa"
  form-input-border-color: "#ccc"
  form-state-invalid-border-color: "#b50000"
  form-state-invalid-label-color: "#1c2024"
  form-state-invalid-message-color: "#1c2024"
  form-state-warning-border-color: "#e5ce23"
  form-state-warning-label-color: "#1c2024"
  form-state-warning-message-color: "#1c2024"
  form-label-checked-background: "#c6f3f5"
  linklist-border-color: "#d8d8d8"
  table-border-color: "#d6dce3"
  table-hover-color: "#e5f1fa"
  table-stripe-color: "#f6f7f9"
  tooltip-border-color: "#b4efef"
  prose-color-text-primary: "#1c2024"
  prose-color-text-secondary: "#5a6772"
  prose-color-text-highlighted: "#b2ebed"
  prose-color-link: "#06c"
  prose-color-link-hover: "#036"
  prose-color-link-visited: "#06c"
  spid-background: "#06c"
  border-focus-color: "#ff8c00"
  border-soft-focus-color: "#00c5ca"
  text-color-text-primary: "#333"
  text-color-text-secondary: "#5a6772"
  primary: "#06c"
typography:
  pac-font-family-sans:
    fontFamily: "\"Titillium Web\", HelveticaNeue-Light, \"Helvetica Neue Light\", \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif"
  html:
    fontSize: "100%"
  document-title:
    fontSize: 2.5em
    fontWeight: 700
    lineHeight: 1.2
  h2:
    fontSize: 2em
  h3:
    fontSize: 1.6em
  tree-title:
    fontFamily: "\"Titillium Web\", HelveticaNeue-Light, \"Helvetica Neue Light\", \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif"
    fontSize: 1.2em
    fontWeight: 700
  error-page-title:
    fontSize: 11.2em
    fontWeight: 400
  error-page-subtitle:
    fontSize: 3.3em
  spid-font-family:
    fontFamily: "\"Titillium Web\""
  print-font-size:
    fontSize: "60%"
  print-font-family:
    fontFamily: "Georgia, \"Times New Roman\", Times, serif"
  body:
    fontFamily: sans-serif
    fontSize: 1em
    lineHeight: 1.5
  h1:
    fontSize: 1.5em
rounded:
  button: 8px
  input: 8px
  card: 12px
  nav: 8px
  default: 8px
components:
  label-block:
    backgroundColor: white
  button-primary:
    backgroundColor: "#06c"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#333"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ffcbcb"
    textColor: "#333"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f5f5f0"
    textColor: "#333"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f5f5f0"
    textColor: "#333"
    rounded: 12px
    padding: 18px 20px
  nav-bar:
    backgroundColor: "#f5f5f0"
    textColor: "#333"
    rounded: 8px
    padding: 10px 16px
---

# Italia Design System

## Overview

**Italia Design System** is a light-first design system anchored on `#fff` canvas surfaces with `#333` primary ink (12.6:1 contrast) and `#06c` brand accent.

Display headlines pair `Titillium Web` with `System Sans` body copy (179px display down to 16px body), unified by `8px` base corner radius and stepped `#fff` -> `#f5f5f0` surface layering.

Maintained by **Italia**. Source: published token package (https://github.com/italia/design-web-toolkit), repo https://github.com/italia/bootstrap-italia, package `bootstrap-italia`, frameworks: css, react, angular. Inventory: **69** colors, **13** typography steps, and **7** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f5f5f0` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#333` — body copy and primary headings (12.6:1 on canvas).
- **Muted Ink (`muted`)**: `#5a6772` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#06c` (5.6:1 vs canvas; pair with `#f7f7f8` foreground ink for 5.2:1 contrast).
- **Structural Border (`border`)**: `#aaa` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-primary` (`#06c`), `color-teal-30` (`#00c5ca`), `color-teal-50` (`#65dcdf`), `color-teal-70` (`#004a4d`), `color-focus` (`#ff8c00`), `it-base-focus-color` (`#ff8c00`).
- **Neutral Ramp**: `color-black` (`#000`), `color-white` (`#fff`), `color-grey-10` (`#f5f5f0`), `color-grey-15` (`#f6f9fc`), `color-grey-20` (`#eee`), `color-grey-30` (`#ddd`).
- **Semantic States**: success: `alert-success-color` (`#274d28`) · danger: `alert-error-bg` (`#ffcbcb`) · warning: `form-state-warning-border-color` (`#e5ce23`) · info: `button-info-color` (`#003e54`).

## Typography

- **Primary / Display Voice**: `"Titillium Web", HelveticaNeue-Light, "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif` (top step `error-page-title`: 11.2em, weight 400).
- **Body & UI Controls**: `sans-serif` (`body`: 1em, weight 400, line-height 1.5).
- **Scale Steps (13)**: `error-page-title` (11.2em, w400), `error-page-subtitle` (3.3em), `document-title` (2.5em, w700), `h2` (2em), `h3` (1.6em), `h1` (1.5em), `tree-title` (1.2em, w700), `pac-font-family-sans` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 7 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f5f5f0` cards; separate sibling sections using `#aaa` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#f5f5f0`) and `1px solid #aaa` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#06c` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`label-block` (badge)**: bg `white`, border `1px solid`.
- **`button-primary` (button)**: bg `#06c`, ink `#ffffff`, (5.6:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#333`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ffcbcb`, ink `#333`, (8.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f5f5f0`, ink `#333`, (11.6:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f5f5f0`, ink `#333`, (11.6:1), radius `12px`, padding `18px 20px`.
- **`nav-bar` (nav)**: bg `#f5f5f0`, ink `#333`, (11.6:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#333` primary text and `#5a6772` secondary labels.
- Use `#06c` with `#f7f7f8` text (5.2:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Titillium Web` headings with `System Sans` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f5f5f0` surface shifts and `#aaa` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
