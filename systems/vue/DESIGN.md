---
version: alpha
name: Vue Design System
description: "Crisp light (rgb(255, 255, 255)) canvas, Fira Sans typography, rgb(230, 164, 0) brand accent, and 8px corner geometry"
colors:
  color-ucla-gold: "rgb(255, 186, 10)"
  color-ucla-gold-darker: "rgb(179, 128, 0)"
  color-vermilion-lighter: "rgb(244, 151, 138)"
  color-vermilion-darker: "rgb(154, 31, 14)"
  color-ucla-gold-lighter: "rgb(255, 219, 128)"
  color-bleu-de-france-dark: "rgb(16, 112, 209)"
  color-bleu-de-france-light: "rgb(84, 163, 242)"
  color-silver: "rgb(127, 136, 145)"
  color-white: "rgb(255, 255, 255)"
  color-bleu-de-france: "rgb(37, 138, 239)"
  color-bleu-de-france-darker: "rgb(12, 87, 161)"
  color-bleu-de-france-lighter: "rgb(132, 189, 246)"
  color-ucla-gold-dark: "rgb(230, 164, 0)"
  color-vermilion-light: "rgb(239, 101, 82)"
  color-vermilion-dark: "rgb(201, 40, 19)"
  color-ucla-gold-light: "rgb(255, 204, 77)"
  color-rich-black: "rgb(0, 17, 35)"
  color-cloud: "rgb(233, 243, 253)"
  color-oxford-blue: "rgb(0, 38, 77)"
  color-vermilion: "rgb(235, 59, 36)"
  rich-black: "#001123"
  white: "#fff"
  fallback: "#000"
  background: "#ffffff"
  primary: "rgb(230, 164, 0)"
typography:
  heading-xxl:
    fontFamily: "\"Fira Sans\", \"Source Sans 3\", -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.15
  heading-xl:
    fontFamily: "\"Fira Sans\", \"Source Sans 3\", -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.22
  heading-lg:
    fontFamily: "\"Fira Sans\", \"Source Sans 3\", -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
  heading-md:
    fontFamily: "\"Fira Sans\", \"Source Sans 3\", -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "\"Fira Sans\", \"Source Sans 3\", -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "\"Fira Sans\", \"Source Sans 3\", -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.42
  caption:
    fontFamily: "\"Fira Sans\", \"Source Sans 3\", -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.35
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "rgb(230, 164, 0)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "rgb(233, 243, 253)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "rgb(233, 243, 253)"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "rgb(230, 164, 0)"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "rgb(233, 243, 253)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Vue Design System

## Overview

**Vue Design System** is a light-first design system anchored on `rgb(255, 255, 255)` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `rgb(230, 164, 0)` brand accent.

Typography centers cleanly on `Fira Sans` (48px display down to 16px body), unified by `8px` base corner radius and stepped `rgb(255, 255, 255)` -> `rgb(233, 243, 253)` surface layering.

Maintained by **Vue**. Source: published token package (https://github.com/viljamis/vue-design-system), repo https://github.com/arielsalminen/vue-design-system, frameworks: vue. Inventory: **25** colors, **7** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `rgb(255, 255, 255)` — base application backdrop (light theme).
- **Surface (`surface`)**: `rgb(233, 243, 253)` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `rgb(230, 164, 0)` (2.2:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.1:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-ucla-gold` (`rgb(255, 186, 10)`), `color-ucla-gold-darker` (`rgb(179, 128, 0)`), `color-vermilion-lighter` (`rgb(244, 151, 138)`), `color-vermilion-darker` (`rgb(154, 31, 14)`), `color-ucla-gold-lighter` (`rgb(255, 219, 128)`), `color-bleu-de-france-dark` (`rgb(16, 112, 209)`).
- **Neutral Ramp**: `color-silver` (`rgb(127, 136, 145)`), `color-white` (`rgb(255, 255, 255)`), `color-cloud` (`rgb(233, 243, 253)`), `white` (`#fff`), `fallback` (`#000`), `background` (`#ffffff`).

## Typography

- **Primary / Display Voice**: `"Fira Sans", "Source Sans 3", -apple-system, BlinkMacSystemFont, sans-serif` (top step `heading-xxl`: 48px, weight 700, line-height 1.15).
- **Body & UI Controls**: `"Fira Sans", "Source Sans 3", -apple-system, BlinkMacSystemFont, sans-serif` (`body`: 16px, weight 400, line-height 1.5).
- **Scale Steps (7)**: `heading-xxl` (48px, w700), `heading-xl` (36px, w600), `heading-lg` (24px, w600), `heading-md` (20px, w600), `body` (16px, w400), `body-sm` (14px, w400), `caption` (12px, w400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `rgb(233, 243, 253)` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`rgb(255, 255, 255)` -> `rgb(233, 243, 253)`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `rgb(230, 164, 0)` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `rgb(230, 164, 0)`, ink `#0b0b0c`, (9.1:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `rgb(233, 243, 253)`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `rgb(233, 243, 253)`, ink `#0b0b0c`, (17.5:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `rgb(230, 164, 0)`, ink `#0b0b0c`, (9.1:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `rgb(233, 243, 253)`, ink `#0b0b0c`, (17.5:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `rgb(255, 255, 255)` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `rgb(230, 164, 0)` with `#0b0b0c` text (9.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Fira Sans` headings with `Fira Sans` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `rgb(233, 243, 253)` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
