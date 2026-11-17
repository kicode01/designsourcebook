---
version: alpha
name: Mail.ru Group Paradigm
description: "Crisp light (#e7e7e9) canvas, Mail_Sans typography, #1877f2 brand accent, and pill & expressive rounded surfaces"
colors:
  bg-canvas: "#e7e7e9"
  canvas-text: "#000000"
  link-text: "#0000ee"
  link-text-1: "#19191a"
  link-border: "#919399"
  link-bg: "#005ff9"
  link-text-2: "#ffffff"
  link-border-3: "#cbcbcd"
  link-bg-4: "#a5f469"
  button-text: "#2c2d2e"
  css-surface-11: "#0052d6"
  css-color-12: "#777777"
  css-surface-13: "#1877f2"
  css-surface-14: "#387bc8"
  css-surface-15: "#d95988"
  css-surface-16: "#eb3323"
  css-color-17: "#f2f2f2"
  css-color-18: "#090909"
  primary: "#1877f2"
typography:
  header:
    fontFamily: "\"Mail_Sans\", sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.44
  nav:
    fontFamily: "\"Mail_Sans\", sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.44
  h1:
    fontFamily: "MazzardH, sans-serif"
    fontSize: 82px
    fontWeight: 600
    lineHeight: 1.05
  body:
    fontFamily: "\"Mail_Sans\", sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.44
  button:
    fontFamily: "\"Mail_Sans\", sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.44
rounded:
  button: 16px
  card: 36px
  input: 16px
  nav: 16px
  default: 16px
icons:
  library: Mail.ru Group Paradigm Icons
  package: "@vkontakte/icons"
  style: outline
  grid: 24
  strokeWidth: 1.5
  strokeLinecap: round
  strokeLinejoin: round
  source: npm
  url: "https://vkcom.github.io/icons/"
components:
  button:
    textColor: "#000000"
  button-2:
    backgroundColor: "#005ff9"
    textColor: "#ffffff"
    rounded: 16px
    padding: 0px 28px
  button-3:
    textColor: "#2c2d2e"
    rounded: 16px
  card:
    backgroundColor: "#19191a"
    textColor: "#ffffff"
    rounded: 36px
    padding: 35px 40px
  card-2:
    textColor: "#ffffff"
  card-3:
    backgroundColor: "#ffffff"
    textColor: "#000000"
    rounded: 36px
    padding: 35px 40px
  card-4:
    textColor: "#000000"
  badge:
    textColor: "#000000"
  input-default:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 16px
    padding: 9px 13px
  nav-bar:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 16px
    padding: 10px 16px
  select-default:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#1877f2"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#1877f2"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#e7e7e9"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#e7e7e9"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Mail.ru Group Paradigm

## Overview

**Mail.ru Group Paradigm** is a light-first design system anchored on `#e7e7e9` canvas surfaces with `#0b0b0c` primary ink (15.9:1 contrast) and `#1877f2` brand accent.

Display headlines pair `MazzardH` with `Mail_Sans` body copy (82px display down to 18px body), unified by `16px` base corner radius and subtle shadow elevation.

Maintained by **Mail.ru**. Source: live stylesheet extraction (https://design.mail.ru/), repo https://github.com/VKCOM/VKUI, package `@vkontakte/vkui`, frameworks: react, css. Inventory: **19** colors, **5** typography steps, and **18** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#e7e7e9` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f2f2f2` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (15.9:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#1877f2` (3.4:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.0:1 contrast).
- **Structural Border (`border`)**: `#919399` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `css-surface-11` (`#0052d6`), `css-surface-13` (`#1877f2`), `css-surface-14` (`#387bc8`), `css-surface-15` (`#d95988`), `css-surface-16` (`#eb3323`), `primary` (`#1877f2`).
- **Neutral Ramp**: `bg-canvas` (`#e7e7e9`), `canvas-text` (`#000000`), `link-text-1` (`#19191a`), `link-border` (`#919399`), `link-text-2` (`#ffffff`), `link-border-3` (`#cbcbcd`).
- **Semantic States**: info: `link-text` (`#0000ee`).

## Typography

- **Primary / Display Voice**: `MazzardH, sans-serif` (top step `h1`: 82px, weight 600, line-height 1.05).
- **Body & UI Controls**: `"Mail_Sans", sans-serif` (`body`: 18px, weight 400, line-height 1.44).
- **Scale Steps (5)**: `h1` (82px, w600), `header` (18px, w400), `nav` (18px, w400), `body` (18px, w400), `button` (18px, w400).

## Layout

- **Grid & Control Spacing**: Derived from 18 component tokens with documented paddings: `0px 28px`, `35px 40px`, `9px 13px`, `10px 16px`, `8px 12px`.
- **Hierarchy**: Group controls cleanly within `#f2f2f2` cards; separate sibling sections using `#919399` hairlines rather than oversized whitespace.

## Elevation

- **Layered Shadow Model**: Uses documented shadows (`rgba(15, 15, 15, 0.08) 0px 60px 80px 0px, rgba(15, 15, 15, 0.06) 0px 25.0666px 33.4221px 0px, rgba(15, 15, 15, 0.047) 0px 13.4018px 17.869px 0px, rgba(15, 15, 15, 0.04) 0px 7.51293px 10.0172px 0px, rgba(15, 15, 15, 0.03) 0px 3.99006px 5.32008px 0px, rgba(15, 15, 15, 0.024) 0px 1.66035px 2.21381px 0px`, `rgba(15, 15, 15, 0.08) 0px 60px 80px 0px, rgba(15, 15, 15, 0.06) 0px 25.0666px 33.4221px 0px, rgba(15, 15, 15, 0.047) 0px 13.4018px 17.869px 0px, rgba(15, 15, 15, 0.04) 0px 7.51293px 10.0172px 0px, rgba(15, 15, 15, 0.03) 0px 3.99006px 5.32008px 0px, rgba(15, 15, 15, 0.024) 0px 1.66035px 2.21381px 0px`) paired with `#919399` borders for elevated overlays.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#1877f2` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `16px` (Inputs `16px` · Cards `36px` · Navigation `16px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `36px` container.
- **Iconography & SVGs**: Mail.ru Group Paradigm Icons (`@vkontakte/icons`) on a `24x24` grid (outline, stroke `1.5px`, `round` caps).

## Components

- **`button` (button)**: ink `#000000`.
- **`button-2` (button)**: bg `#005ff9`, ink `#ffffff`, (5.2:1), radius `16px`, padding `0px 28px`.
- **`button-3` (button)**: ink `#2c2d2e`, radius `16px`.
- **`card` (card)**: bg `#19191a`, ink `#ffffff`, (17.6:1), radius `36px`, padding `35px 40px`.
- **`card-2` (card)**: ink `#ffffff`.
- **`card-3` (card)**: bg `#ffffff`, ink `#000000`, (21.0:1), radius `36px`, padding `35px 40px`.
- **`card-4` (card)**: ink `#000000`.
- **`badge` (badge)**: ink `#000000`.
- **`input-default` (input)**: bg `#f2f2f2`, ink `#0b0b0c`, (17.6:1), radius `16px`, padding `9px 13px`.
- **`nav-bar` (nav)**: bg `#f2f2f2`, ink `#0b0b0c`, (17.6:1), radius `16px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#f2f2f2`, ink `#0b0b0c`, (17.6:1), radius `12px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#1877f2`, ink `#0b0b0c`, (4.6:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#1877f2`, ink `#0b0b0c`, (4.6:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f2f2f2`, ink `#0b0b0c`, (17.6:1), radius `12px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f2f2f2`, ink `#0b0b0c`, (17.6:1), radius `12px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#e7e7e9`, ink `#0b0b0c`, (15.9:1), radius `12px`, padding `10px 14px`.

## Do's and Don'ts

### Do
- Anchor base views on `#e7e7e9` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#1877f2` with `#f7f7f8` text (4.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `MazzardH` headings with `Mail_Sans` body copy using documented weights and scale steps.
- Apply `16px` base geometry across inputs and buttons (36px on outer containers).
- Separate containers via `#f2f2f2` surface shifts and `#919399` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `16px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
