---
version: alpha
name: BuzzFeed Solid
description: "Crisp light (#fff) canvas, Proxima Nova typography, #f7ad19 brand accent, and 8px corner geometry"
colors:
  highlight-outline: "#7a9ff3"
  fill-red: "#e32"
  fill-red-lighter: "#feebe9"
  fill-pink: "#e40c78"
  fill-blue: "#0f65ef"
  fill-purple: "#6645dd"
  fill-yellow: "#ffee00"
  fill-yellow-lighter: "#fffab6"
  fill-teal: "#007c7c"
  fill-green: "#68af15"
  fill-green-lighter: "#e1efd0"
  fill-orange: "#f47f16"
  fill-promoted-orange: "#bf5608"
  fill-gray-lighter: "#f4f4f4"
  fill-gray-light: "#d7d7d7"
  fill-gray: "#aaa"
  fill-gray-darker: "#222"
  fill-white: "#fff"
  fill-facebook: "#1877f2"
  fill-twitter: "#55acee"
  fill-google: "#dd4b39"
  fill-linkedin: "#2867b2"
  fill-pinterest: "#e60019"
  fill-tumblr: "#001935"
  fill-youtube: "#FF0000"
  fill-instagram: "#000000"
  fill-vine: "#00b488"
  fill-snapchat: "#fffc00"
  text-white: "#fff"
  text-gray: "#222"
  text-gray-lighter: "#666"
  text-gray-lightest: "#757575"
  text-red: "#e32"
  text-pink: "#e40c78"
  text-orange: "#f47f16"
  text-promoted-orange: "#f7ad19"
  text-purple: "#6645dd"
  text-green: "#68af15"
  text-blue: "#0f65ef"
  text-facebook: "#3b5998"
  text-twitter: "#55acee"
  text-google: "#dd4b39"
  text-linkedin: "#0077b5"
  text-pinterest: "#bd081c"
  text-tumblr: "#36465d"
  text-youtube: "#FF0000"
  text-instagram: "#000000"
  primary: "#f7ad19"
typography:
  base-font-size:
    fontSize: 16px
  title-1:
    fontFamily: "\"Proxima Nova\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
  title-2:
    fontFamily: "\"Proxima Nova\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.25
  title-3:
    fontFamily: "\"Proxima Nova\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "\"Proxima Nova\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "\"Proxima Nova\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#f7ad19"
    textColor: "#222"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#222"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f4f4f4"
    textColor: "#222"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f4f4f4"
    textColor: "#222"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#f7ad19"
    textColor: "#222"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f4f4f4"
    textColor: "#222"
    rounded: 8px
    padding: 10px 16px
---

# BuzzFeed Solid

## Overview

**BuzzFeed Solid** is a light-first design system anchored on `#fff` canvas surfaces with `#222` primary ink (15.9:1 contrast) and `#f7ad19` brand accent.

Typography centers cleanly on `Proxima Nova` (36px display down to 16px body), unified by `8px` base corner radius and stepped `#fff` -> `#f4f4f4` surface layering.

Maintained by **BuzzFeed**. Source: published token package (https://github.com/buzzfeed/solid), repo https://github.com/buzzfeed/solid, frameworks: css. Inventory: **48** colors, **6** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f4f4f4` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#222` — body copy and primary headings (15.9:1 on canvas).
- **Muted Ink (`muted`)**: `#666` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#f7ad19` (1.9:1 vs canvas; pair with `#0b0b0c` foreground ink for 10.3:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #222 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `highlight-outline` (`#7a9ff3`), `fill-pink` (`#e40c78`), `fill-blue` (`#0f65ef`), `fill-purple` (`#6645dd`), `fill-teal` (`#007c7c`), `fill-facebook` (`#1877f2`).
- **Neutral Ramp**: `fill-red-lighter` (`#feebe9`), `fill-gray-lighter` (`#f4f4f4`), `fill-gray-light` (`#d7d7d7`), `fill-gray` (`#aaa`), `fill-gray-darker` (`#222`), `fill-white` (`#fff`).
- **Semantic States**: success: `fill-green` (`#68af15`) · danger: `fill-red` (`#e32`) · warning: `fill-yellow` (`#ffee00`) · info: `fill-linkedin` (`#2867b2`).

## Typography

- **Primary / Display Voice**: `"Proxima Nova", "Helvetica Neue", Helvetica, Arial, sans-serif` (top step `title-1`: 36px, weight 700, line-height 1.2).
- **Body & UI Controls**: `"Proxima Nova", "Helvetica Neue", Helvetica, Arial, sans-serif` (`base-font-size`: 16px, weight 400).
- **Scale Steps (6)**: `title-1` (36px, w700), `title-2` (28px, w700), `title-3` (22px, w600), `base-font-size` (16px), `body` (16px, w400), `caption` (13px, w400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f4f4f4` cards; separate sibling sections using `color-mix(in srgb, #222 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#f4f4f4`) and `1px solid color-mix(in srgb, #222 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#f7ad19` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#f7ad19`, ink `#222`, (8.3:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#222`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f4f4f4`, ink `#222`, (14.5:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f4f4f4`, ink `#222`, (14.5:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#f7ad19`, ink `#222`, (8.3:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f4f4f4`, ink `#222`, (14.5:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#222` primary text and `#666` secondary labels.
- Use `#f7ad19` with `#0b0b0c` text (10.3:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Proxima Nova` headings with `Proxima Nova` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f4f4f4` surface shifts and `color-mix(in srgb, #222 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
