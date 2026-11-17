---
version: alpha
name: Braid Design System
description: "Crisp light (#fff) canvas, SeekSans typography, #3b72da brand accent, and 8px corner geometry"
colors:
  background-body: "#fff"
  brand-accent: "#3b72da"
  brand-accent-light: "#bdd4ff"
  brand-accent-soft: "#f0f4fc"
  form-accent: "#767676"
  critical-light-background: "#fbe9eb"
  info: "#2c88f7"
  link: "#4c77bb"
  secondary: "#777"
  neutral: "#333"
  color-neutral-light: "#777"
  background-surface-dark: "#222"
  neutral-light: "#777"
  surface-dark: "#222"
  white: "#fff"
  critical: "#ef3e4a"
  promote: "#855be5"
  black: "#303030"
  field: "#333"
  grey-800: "#1C2330"
  grey-600: "#414C63"
  grey-400: "#838FA5"
  grey-200: "#D2D7DF"
  grey-75: "#F3F5F7"
  seek-pink-900: "#520018"
  seek-pink-700: "#A00043"
  seek-pink-500: "#E60278"
  seek-pink-300: "#F470BD"
  seek-pink-100: "#FCD9EF"
  seek-blue-900: "#00061B"
  seek-blue-700: "#051A49"
  seek-blue-500: "#0D3880"
  seek-blue-300: "#7795C2"
  seek-blue-100: "#DCE5F2"
  seek-blue-light-900: "#081C60"
  seek-blue-light-700: "#1E47A9"
  seek-blue-light-500: "#4B84E7"
  seek-blue-light-300: "#99BFF7"
  seek-blue-light-100: "#E5F0FD"
  red-900: "#750606"
  red-700: "#B91E1E"
  red-500: "#F94344"
  red-300: "#FB999A"
  red-100: "#FFE3E2"
  orange-900: "#751704"
  orange-700: "#BB4116"
  orange-500: "#FD7532"
  orange-300: "#FEBB90"
  orange-100: "#FEEEE1"
  yellow-900: "#723D02"
  yellow-700: "#B9800D"
  yellow-500: "#FDC221"
  yellow-300: "#FEE384"
  yellow-100: "#FEF8DE"
  green-900: "#073408"
  green-700: "#1E771D"
  green-500: "#3EB73D"
  green-300: "#98DE97"
  green-100: "#E3F7E3"
  mint-900: "#043820"
  mint-700: "#12784F"
  mint-500: "#28B888"
  mint-300: "#8BDEC5"
  mint-100: "#E2F7F1"
  cyan-900: "#053842"
  cyan-700: "#137D8B"
  cyan-500: "#28BFCE"
  cyan-300: "#88E2E9"
  cyan-100: "#E1F8FA"
  blue-900: "#072254"
  blue-700: "#1D559D"
  blue-500: "#3E8FE0"
  blue-300: "#98C9F1"
  blue-100: "#E3F2FB"
  indigo-900: "#08105F"
  indigo-700: "#2433A7"
  indigo-500: "#4964E9"
  indigo-300: "#9FB0F5"
  indigo-100: "#E6EAFC"
  violet-900: "#120C64"
  violet-700: "#392BA7"
  violet-500: "#6E56E6"
  violet-300: "#B5A7F4"
  violet-100: "#ECE9FC"
  purple-900: "#3E0F65"
  purple-700: "#7F35A9"
  purple-500: "#BE68E8"
  purple-300: "#E1B2F5"
  purple-100: "#F9EBFD"
  light-mode-fill: "#000"
  primary: "#3b72da"
typography:
  font-family:
    fontFamily: "SeekSans, \"SeekSans Fallback\", Arial, Tahoma, sans-serif"
  font-size:
    fontSize: "100%"
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#3b72da"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#B91E1E"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#3b72da"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#1E771D"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Braid Design System

## Overview

**Braid Design System** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#3b72da` brand accent.

Typography centers cleanly on `SeekSans` (16px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **Braid**. Source: published token package (https://github.com/seek-oss/braid-design-system), repo https://github.com/seek-oss/braid-design-system, package `braid-design-system`, frameworks: react. Inventory: **91** colors, **2** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#3b72da` (4.6:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.3:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `brand-accent` (`#3b72da`), `brand-accent-light` (`#bdd4ff`), `promote` (`#855be5`), `grey-600` (`#414C63`), `grey-400` (`#838FA5`), `seek-pink-900` (`#520018`).
- **Neutral Ramp**: `background-body` (`#fff`), `brand-accent-soft` (`#f0f4fc`), `form-accent` (`#767676`), `critical-light-background` (`#fbe9eb`), `secondary` (`#777`), `neutral` (`#333`).
- **Semantic States**: success: `green-900` (`#073408`) · danger: `critical` (`#ef3e4a`) · warning: `orange-900` (`#751704`) · info: `info` (`#2c88f7`).

## Typography

- **Primary / Display Voice**: `SeekSans, "SeekSans Fallback", Arial, Tahoma, sans-serif` (top step `font-family`: 16px, weight 600).
- **Body & UI Controls**: `SeekSans, "SeekSans Fallback", Arial, Tahoma, sans-serif` (`font-family`: 16px, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#fff` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#fff`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#3b72da` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#3b72da`, ink `#ffffff`, (4.6:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#B91E1E`, ink `#ffffff`, (6.4:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#3b72da`, ink `#ffffff`, (4.6:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#1E771D`, ink `#ffffff`, (5.7:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#fff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#3b72da` with `#f7f7f8` text (4.3:1) for primary CTAs, active tabs, and focus outlines.
- Pair `SeekSans` headings with `SeekSans` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#fff` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
