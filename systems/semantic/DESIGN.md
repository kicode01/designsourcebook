---
version: alpha
name: Fomantic / Semantic UI
description: "Human-friendly HTML UI vocabulary, Lato typography and named semantic color states"
colors:
  docsearch-primary-color: "#5468ff"
  docsearch-text-color: "#1c1e21"
  docsearch-muted-color: "#969faf"
  docsearch-container-background: "rgba(101,108,133,.8)"
  docsearch-logo-color: "#5468ff"
  docsearch-modal-background: "#f5f6f7"
  docsearch-searchbox-background: "#ebedf0"
  docsearch-searchbox-focus-background: "#fff"
  docsearch-hit-color: "#444950"
  docsearch-hit-active-color: "#fff"
  docsearch-hit-background: "#fff"
  docsearch-footer-background: "#fff"
  primary: "#5468ff"
typography:
  doc-search-title:
    fontSize: 1.2em
  doc-search-hit-title:
    fontSize: ".9em"
  h1:
    fontSize: 3em
    lineHeight: 1.2
    fontFamily: null
  h2:
    fontSize: 1.75em
    lineHeight: 1
    fontFamily: null
  h3:
    fontSize: 20px
    fontFamily: null
  title:
    fontSize: 1em
    lineHeight: 1
  html:
    fontSize: 14px
  body:
    fontSize: 14px
    lineHeight: 1.4285em
  h4:
    fontSize: 1.07142857rem
  h5:
    fontSize: 1rem
  font-sans:
    fontFamily: Lato
rounded:
  button: 40px
  card: 40px
  default: 40px
components:
  emoji-category-button:
    textColor: "rgba(0,0,0,.6)"
    typography:
      fontSize: 1.2em
    padding: ".5em"
  Link:
    textColor: "#5468ff"
    padding: "0"
  Input:
    backgroundColor: transparent
    textColor: "#1c1e21"
    typography:
      fontSize: 1.2em
    padding: 0 0 0 8px
  Label:
    textColor: "#969faf"
    typography:
      fontSize: ".75em"
  Button:
    backgroundColor: "#ebedf0"
    textColor: "#0b0b0c"
    typography:
      fontWeight: 500
    rounded: 40px
    padding: 0 8px
  Button-Key-2:
    textColor: "#969faf"
    rounded: 3px
    padding: 0 0 2px
  card-surface:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 40px
    padding: 18px 20px
---

# Fomantic / Semantic UI

## Overview

**Fomantic / Semantic UI** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#5468ff` brand accent.

Typography centers cleanly on `Lato` (48px display down to 14px body), unified by `40px` base corner radius and subtle shadow elevation.

Maintained by **Semantic**. Source: live stylesheet extraction (https://fomantic-ui.com/), repo https://github.com/fomantic/Fomantic-UI, package `fomantic-ui-css`, frameworks: css, react. Inventory: **13** colors, **11** typography steps, and **7** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#5468ff` (4.4:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.1:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `docsearch-primary-color` (`#5468ff`), `docsearch-muted-color` (`#969faf`), `docsearch-container-background` (`rgba(101,108,133,.8)`), `docsearch-logo-color` (`#5468ff`), `primary` (`#5468ff`).
- **Neutral Ramp**: `docsearch-text-color` (`#1c1e21`), `docsearch-modal-background` (`#f5f6f7`), `docsearch-searchbox-background` (`#ebedf0`), `docsearch-searchbox-focus-background` (`#fff`), `docsearch-hit-color` (`#444950`), `docsearch-hit-active-color` (`#fff`).

## Typography

- **Primary / Display Voice**: `Lato` (top step `h1`: 3em, weight 600, line-height 1.2).
- **Body & UI Controls**: `Lato` (`body`: 14px, weight 400, line-height 1.4285em).
- **Scale Steps (11)**: `h1` (3em), `h2` (1.75em), `h3` (20px), `doc-search-title` (1.2em), `h4` (1.07142857rem), `title` (1em), `h5` (1rem), `font-sans` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 7 component tokens with documented paddings: `.5em`, `0`, `0 0 0 8px`, `0 8px`, `0 0 2px`.
- **Hierarchy**: Group controls cleanly within `#fff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Layered Shadow Model**: Uses documented shadows (`inset 0 -2px 0 0 #cdcde6,inset 0 0 1px 1px #fff,0 1px 2px 1px rgba(30,35,90,.4)`) paired with `color-mix(in srgb, #0b0b0c 14%, transparent)` borders for elevated overlays.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#5468ff` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `40px` (Cards `40px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `40px` container.

## Components

- **`emoji-category-button` (button)**: ink `rgba(0,0,0,.6)`, padding `.5em`.
- **`Link` (nav)**: ink `#5468ff`, padding `0`, border `0`.
- **`Input` (input)**: bg `transparent`, ink `#1c1e21`, padding `0 0 0 8px`, border `0`.
- **`Label` (badge)**: ink `#969faf`.
- **`Button` (button)**: bg `#ebedf0`, ink `#0b0b0c`, (16.8:1), radius `40px`, padding `0 8px`, border `0`.
- **`Button-Key-2` (button)**: ink `#969faf`, radius `3px`, padding `0 0 2px`, border `0`.
- **`card-surface` (card)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `40px`, padding `18px 20px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#5468ff` with `#f7f7f8` text (4.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Lato` headings with `Lato` body copy using documented weights and scale steps.
- Apply `40px` base geometry across inputs and buttons (40px on outer containers).
- Separate containers via `#fff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `40px` baseline.
- Do not truncate or drop border contrast on `Input` fields and secondary buttons.
