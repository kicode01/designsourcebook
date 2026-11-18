---
version: alpha
name: A11Y Style Guide
description: "A11Y Style Guide — tokens read from https://github.com/cehfisher/a11y-style-guide."
colors:
  color-cherry: "#e00000"
  color-ruby: "#a51323"
  color-blood: "#7c0b18"
  color-sea-glass: "#7fffd4"
  color-grass: "#42dc42"
  color-cornflower: "#4083ae"
  color-navy: "#0a3055"
  color-ballet-slipper: "#ffa0e5"
  color-eggplant: "#550055"
  color-black: "#000000"
  color-charcoal: "#222222"
  color-midnight: "#464646"
  color-manatee: "#888b8d"
  color-silver: "#bbbbbb"
  color-alto: "#dddddd"
  color-gallery: "#f4f4f4"
  color-alabaster: "#f7f7f7"
  color-white: "#ffffff"
  notification-color-success: "#218003"
  tip-color-white: "#fff"
  tip-color-black: "#000"
  tip-color-gray: "#666"
  border-top-color: "#2b2b2b"
  primary: "#ffa0e5"
typography:
  h3:
    fontSize: 16px
  kss-title:
    fontSize: 24px
    fontWeight: 100
  h1:
    fontSize: 30px
  h2:
    fontSize: 24px
  body:
    fontFamily: "\"Open Sans\", Arial, sans-serif"
  atblock-title-trigger:
    fontFamily: "\"Open Sans\", Arial, sans-serif"
    fontSize: 18px
    lineHeight: 1.5
  html:
    fontFamily: "\"Open Sans\", Arial, sans-serif"
  h5:
    fontSize: 0.85rem
  h6:
    fontSize: 0.65rem
  cards-bio-list-title:
    fontSize: 1.4rem
  directory-group-title:
    fontSize: 2.2rem
    lineHeight: 1.5
  cards-title:
    fontSize: 2rem
  cards-item-title:
    fontFamily: "\"Open Sans\", Arial, sans-serif"
    fontSize: 1.2rem
    lineHeight: 1
  px-video-captions:
    fontSize: 1.1em
  kss-doc-title:
    fontSize: 20px
    lineHeight: 1.3
rounded:
  nav: 4px
  button: 4px
  card: 0 0 4px 4px
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
  nav:
    backgroundColor: "#f4f4f4"
    rounded: 4px
    padding: "0"
  button:
    backgroundColor: "#e00000"
    textColor: "#ffffff"
    typography:
      fontSize: 1rem
    rounded: 4px
    padding: 0.8rem 1rem
  card:
    backgroundColor: "#ffffff"
    padding: 1rem 1.5rem
    height: 250px
  icon:
    backgroundColor: "#e00000"
    textColor: "#ffffff"
    typography:
      fontSize: 1rem
    rounded: 4px
    padding: 0.8rem 1rem
    height: 48px
  card-2:
    backgroundColor: "rgba(0, 0, 0, 0.65)"
    rounded: 0 0 4px 4px
    padding: 2rem
  button-hover-2:
    backgroundColor: "#a51323"
  button-focus-3:
    backgroundColor: "#7c0b18"
  kss-skip-link:
    backgroundColor: "#e00000"
    textColor: "#ffffff"
    padding: 0.8rem
  button-active-4:
    backgroundColor: "#7c0b18"
  pagination-2:
    backgroundColor: "#f7f7f7"
  pagination-3:
    textColor: "#464646"
    padding: 8px 16px
    height: 40px
  accordion:
    backgroundColor: "#f7f7f7"
    textColor: "#222222"
    typography:
      fontSize: 1rem
    padding: 10px 40px 10px 16px
  pagination:
    backgroundColor: "#f7f7f7"
  pagination-is-active:
    backgroundColor: "#e00000"
    textColor: "#ffffff"
  select-default:
    backgroundColor: "#f4f4f4"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#ffa0e5"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#ffa0e5"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f4f4f4"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f4f4f4"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#ffffff"
    rounded: 6px
    padding: 6px 10px
---

# A11Y Style Guide

## Overview

**A11Y Style Guide** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#ffa0e5` brand accent.

Typography centers cleanly on `Open Sans` (35px display down to 16px body), unified by `4px` base corner radius and subtle shadow elevation.

Maintained by **A11Y**. Source: published token package (https://github.com/cehfisher/a11y-style-guide), repo https://github.com/cehfisher/a11y-style-guide. Inventory: **24** colors, **15** typography steps, and **21** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f4f4f4` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#ffa0e5` (1.8:1 vs canvas; pair with `#0b0b0c` foreground ink for 10.7:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-cherry` (`#e00000`), `color-ruby` (`#a51323`), `color-blood` (`#7c0b18`), `color-sea-glass` (`#7fffd4`), `color-grass` (`#42dc42`), `color-cornflower` (`#4083ae`).
- **Neutral Ramp**: `color-black` (`#000000`), `color-charcoal` (`#222222`), `color-midnight` (`#464646`), `color-manatee` (`#888b8d`), `color-silver` (`#bbbbbb`), `color-alto` (`#dddddd`).
- **Semantic States**: success: `notification-color-success` (`#218003`).

## Typography

- **Primary / Display Voice**: `"Open Sans", Arial, sans-serif` (top step `directory-group-title`: 2.2rem, weight 600, line-height 1.5).
- **Body & UI Controls**: `"Open Sans", Arial, sans-serif` (`body`: 16px, weight 400).
- **Scale Steps (15)**: `directory-group-title` (2.2rem), `cards-title` (2rem), `h1` (30px), `kss-title` (24px, w100), `h2` (24px), `cards-bio-list-title` (1.4rem), `kss-doc-title` (20px), `cards-item-title` (1.2rem).

## Layout

- **Grid & Control Spacing**: Derived from 21 component tokens with documented paddings: `0`, `0.8rem 1rem`, `1rem 1.5rem`, `2rem`, `0.8rem`.
- **Hierarchy**: Group controls cleanly within `#f4f4f4` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Layered Shadow Model**: Uses documented shadows (`0 0 2px rgba(0, 0, 0, 0.5)`, `0 0 2px rgba(0, 0, 0, 0.5)`) paired with `color-mix(in srgb, #0b0b0c 14%, transparent)` borders for elevated overlays.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#ffa0e5` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `4px` (Buttons `4px` · Navigation `4px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `4px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`nav` (nav)**: bg `#f4f4f4`, radius `4px`, padding `0`.
- **`button` (button)**: bg `#e00000`, ink `#ffffff`, (5.0:1), radius `4px`, padding `0.8rem 1rem`, border `3px solid #e00000`.
- **`card` (card)**: bg `#ffffff`, padding `1rem 1.5rem`.
- **`icon` (icon)**: bg `#e00000`, ink `#ffffff`, (5.0:1), radius `4px`, padding `0.8rem 1rem`, border `3px solid #e00000`.
- **`card-2` (card)**: bg `rgba(0, 0, 0, 0.65)`, radius `0 0 4px 4px`, padding `2rem`.
- **`button-hover-2` (button)**: bg `#a51323`, border `3px solid #a51323`.
- **`button-focus-3` (button)**: bg `#7c0b18`, border `3px solid #7c0b18`.
- **`kss-skip-link` (link)**: bg `#e00000`, ink `#ffffff`, (5.0:1), padding `0.8rem`, border `3px solid #a51323`.
- **`button-active-4` (button)**: bg `#7c0b18`, border `3px solid #7c0b18`.
- **`pagination-2` (nav)**: bg `#f7f7f7`, border `1px solid #bbbbbb`.
- **`pagination-3` (nav)**: ink `#464646`, padding `8px 16px`.
- **`accordion` (accordion)**: bg `#f7f7f7`, ink `#222222`, (14.9:1), padding `10px 40px 10px 16px`, border `1px solid #bbbbbb`.
- **`pagination` (nav)**: bg `#f7f7f7`, border `1px solid #bbbbbb`.
- **`pagination-is-active` (nav)**: bg `#e00000`, ink `#ffffff`, (5.0:1).
- **`select-default` (select)**: bg `#f4f4f4`, ink `#0b0b0c`, (17.9:1), radius `4px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#ffa0e5`, ink `#0b0b0c`, (10.7:1), radius `999px`, padding `2px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#ffa0e5` with `#0b0b0c` text (10.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Open Sans` headings with `Open Sans` body copy using documented weights and scale steps.
- Apply `4px` base geometry across inputs and buttons (4px on outer containers).
- Separate containers via `#f4f4f4` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `4px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
