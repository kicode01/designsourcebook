---
version: alpha
name: GoodBarber Design System
description: "Dark no-code studio interface, warm amber accents and slate workspace panels"
colors:
  begonia25: "#fff9f1"
  begonia30: "#fff6ea"
  begonia50: "#fff2e3"
  begonia60: "#ffe9eb"
  begonia75: "#ffe8db"
  begonia100: "#feddd2"
  begonia125: "#ffd3cc"
  begonia150: "#ffc9c5"
  begonia200: "#ffb5ba"
  begonia350: "#ff7f86"
  begonia400: "#fe6c75"
  begonia450: "#f06069"
  begonia500: "#e1545d"
  gunpowder15: "#f9fcfd"
  gunpowder20: "#f6fbfd"
  gunpowder30: "#f3f9fd"
  gunpowder40: "#eff7fc"
  gunpowder50: "#eaf4fb"
  gunpowder75: "#dfeefb"
  gunpowder100: "#d6e8f9"
  gunpowder150: "#c8ddf2"
  gunpowder200: "#b9d0e7"
  gunpowder250: "#adc3da"
  gunpowder300: "#a0b5cc"
  gunpowder350: "#96a9c0"
  gunpowder400: "#889bb2"
  gunpowder450: "#7d8ea5"
  gunpowder500: "#728198"
  gunpowder550: "#67758c"
  gunpowder600: "#59677e"
  gunpowder650: "#4e5a71"
  gunpowder700: "#424e65"
  gunpowder710: "#3f4960"
  gunpowder750: "#364156"
  gunpowder800: "#293548"
  gunpowder850: "#1c2a39"
  gunpowder900: "#0f1d2c"
  gunpowder950: "#02101f"
  cerulean15: "#f7fdff"
  cerulean20: "#f4fcff"
  cerulean25: "#f2fbff"
  cerulean30: "#effaff"
  cerulean40: "#e9f9ff"
  cerulean50: "#e4f7ff"
  cerulean60: "#dff6ff"
  cerulean75: "#d7f3ff"
  cerulean100: "#c8efff"
  cerulean200: "#93dfff"
  cerulean300: "#5ccfff"
  cerulean400: "#31bcf6"
  cerulean450: "#23aee8"
  cerulean500: "#15a0da"
  cerulean600: "#0089c2"
  cerulean700: "#006792"
  cerulean800: "#004461"
  cerulean900: "#002331"
  accent-orange: "#ffb421"
  accent-purple: "#8c83f0"
  accent-green: "#4dd35b"
  background: "#f5f7f8"
  shadowcolor: "#15a0da"
  color: "#15a0da"
  backgroundhover: "#63ffd8"
  bordercolor: "#fff"
  gbnavmain: "#f5f7f8"
  gbnavsubmain: "#f5f7f8"
  gbnavaccent: "#15a0da"
  primary: "#31bcf6"
typography:
  body:
    fontFamily: "Jakarta, Arial, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  menu-title:
    fontSize: 16px
    fontWeight: 300
  menu-info-block-title:
    fontSize: 18px
  langselector-title:
    fontSize: 12px
    fontWeight: 300
rounded:
  button: 12px
  badge: 999px
  default: 12px
components:
  banner:
    backgroundColor: "#30c7dc"
    textColor: "#0b0b0c"
    typography:
      fontSize: 14px
    padding: 12px
  banner-info:
    backgroundColor: "#1c2a39"
  link:
    textColor: "#f5f7f8"
  select:
    backgroundColor: "#3f4960"
    rounded: 12px
  button-primary:
    backgroundColor: "#31bcf6"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 12px
    padding: 10px 18px
  badge-brand:
    backgroundColor: "#31bcf6"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
---

# GoodBarber Design System

## Overview

**GoodBarber Design System** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#31bcf6` brand accent.

Typography centers cleanly on `Jakarta` (18px display down to 16px body), unified by `12px` base corner radius and stepped `#fff` -> `#f5f7f8` surface layering.

Maintained by **GoodBarber**. Source: live stylesheet extraction (https://www.goodbarber.com/uxdesign/), frameworks: css. Inventory: **68** colors, **4** typography steps, and **9** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f5f7f8` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#31bcf6` (2.2:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.0:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `begonia50` (`#fff2e3`), `begonia75` (`#ffe8db`), `begonia100` (`#feddd2`), `begonia125` (`#ffd3cc`), `begonia150` (`#ffc9c5`), `begonia200` (`#ffb5ba`).
- **Neutral Ramp**: `begonia25` (`#fff9f1`), `begonia30` (`#fff6ea`), `begonia60` (`#ffe9eb`), `gunpowder15` (`#f9fcfd`), `gunpowder20` (`#f6fbfd`), `gunpowder30` (`#f3f9fd`).
- **Semantic States**: success: `accent-green` (`#4dd35b`) · warning: `accent-orange` (`#ffb421`).

## Typography

- **Primary / Display Voice**: `Jakarta, Arial, sans-serif` (top step `menu-info-block-title`: 18px, weight 600).
- **Body & UI Controls**: `Jakarta, Arial, sans-serif` (`body`: 1rem, weight 400, line-height 1.5).
- **Scale Steps (4)**: `menu-info-block-title` (18px), `body` (1rem, w400), `menu-title` (16px, w300), `langselector-title` (12px, w300).

## Layout

- **Grid & Control Spacing**: Derived from 9 component tokens with documented paddings: `12px`, `10px 18px`, `4px 10px`.
- **Hierarchy**: Group controls cleanly within `#f5f7f8` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#f5f7f8`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#31bcf6` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `12px` (Buttons `12px` · Inputs `12px` · Badges `999px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`banner` (card)**: bg `#30c7dc`, ink `#0b0b0c`, (9.7:1), padding `12px`.
- **`banner-info` (card)**: bg `#1c2a39`.
- **`link` (nav)**: ink `#f5f7f8`.
- **`select` (input)**: bg `#3f4960`, radius `12px`.
- **`button-primary` (button)**: bg `#31bcf6`, ink `#0b0b0c`, (9.0:1), radius `12px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `12px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `12px`, padding `10px 18px`.
- **`badge-brand` (badge)**: bg `#31bcf6`, ink `#0b0b0c`, (9.0:1), radius `999px`, padding `4px 10px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#31bcf6` with `#0b0b0c` text (9.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Jakarta` headings with `Jakarta` body copy using documented weights and scale steps.
- Apply `12px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f5f7f8` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `12px` baseline.
- Do not truncate or drop border contrast on `select` fields and secondary buttons.
