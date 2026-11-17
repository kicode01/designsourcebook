---
version: alpha
name: KoliBri
description: "Crisp light (#ffffff) canvas, system-ui typography, #2547F3 brand accent, and 8px corner geometry"
colors:
  primary-v-50: "#F5F7FF"
  primary-v-100: "#D9E1FD"
  primary-v-200: "#B4C3FB"
  primary-v-300: "#8EA4F9"
  primary-v-400: "#6986F7"
  primary-v-500: "#4368F5"
  primary-v-600: "#2547F3"
  secondary-v-50: "#FFFDF2"
  secondary-v-100: "#FFF5CC"
  secondary-v-200: "#FFEA99"
  secondary-v-300: "#FFE066"
  secondary-v-400: "#FFD533"
  secondary-v-500: "#FFCB00"
  secondary-v-600: "#E5B700"
  brand-primary-v50: "#f5f7ff"
  brand-primary-v100: "#d9e1fd"
  brand-primary-v200: "#b4c3fb"
  brand-primary-v300: "#8ea4f9"
  brand-primary-v400: "#6986f7"
  brand-primary-v500: "#4368f5"
  brand-primary-v600: "#2547f3"
  brand-secondary-v50: "#fffdf2"
  brand-secondary-v100: "#fff5cc"
  brand-secondary-v200: "#ffea99"
  brand-secondary-v300: "#ffe066"
  brand-secondary-v400: "#ffd533"
  brand-secondary-v500: "#ffcb00"
  brand-secondary-v600: "#e5b700"
  tokens-primary: "#4368f5"
  tokens-primary-dark: "#2547f3"
  tokens-secondary: "#ffcb00"
  tokens-secondary-dark: "#e5b700"
  tokens-link: "#4368f5"
  tokens-focus-outline: "#33acf5"
  tokens-text: "#000000"
  tokens-text-disabled: "#cccccc"
  tokens-text-inverted: "#ffffff"
  tokens-surface: "#ffffff"
  tokens-error: "#d21e00"
  tokens-success: "#00992e"
  tokens-warning: "#ffcb00"
  secondary-text-color: "#666666"
  md-red: "#f44336"
  md-red-600: "#e53935"
  md-pink-200: "#f48fb1"
  md-pink-900: "#880e4f"
  md-purple-500: "#9c27b0"
  md-deep-purple-100: "#d1c4e9"
  md-deep-purple-800: "#4527a0"
  md-indigo-400: "#5c6bc0"
  md-blue-50: "#e3f2fd"
  md-blue-700: "#1976d2"
  md-light-blue-300: "#4fc3f7"
  md-cyan: "#00bcd4"
  md-cyan-600: "#00acc1"
  md-teal-200: "#80cbc4"
  md-teal-900: "#004d40"
  md-green-500: "#4caf50"
  md-light-green-100: "#dcedc8"
  md-light-green-800: "#558b2f"
  md-lime-400: "#d4e157"
  md-yellow-50: "#fffde7"
  md-yellow-700: "#fbc02d"
  md-amber-300: "#ffd54f"
  md-orange: "#ff9800"
  md-orange-600: "#fb8c00"
  md-deep-orange-200: "#ffab91"
  md-deep-orange-900: "#bf360c"
  md-brown-500: "#795548"
  md-grey-100: "#f5f5f5"
  md-grey-800: "#424242"
  md-blue-grey-400: "#78909c"
  md-white: "#ffffff"
  v-600: "#2547F3"
  red-v-500: "#FF4324"
  pink-v-500: "#FF7F8D"
  blue-v-500: "#4368F5"
  lightblue-v-500: "#0097F2"
  darkgreen-v-500: "#005633"
  green-v-500: "#00C73C"
  orange-v-500: "#FF7600"
  yellow-v-500: "#FFCB00"
  grey-v-700: "#666666"
  palette-red-v50: "#ffece9"
  palette-pink-v50: "#fff2f3"
  palette-blue-v50: "#f5f7ff"
  palette-lightblue-v50: "#e5f5fd"
  palette-darkgreen-v50: "#e5eeeb"
  palette-green-v50: "#e5f9eb"
  palette-orange-v50: "#fff1e5"
  primary: "#2547F3"
typography:
  ui-input-label-font-size:
    fontSize: 0.9375rem
  ui-input-text-font-size:
    fontSize: 1rem
  ui-input-feedback-font-size:
    fontSize: 0.875rem
  ui-button-font-size:
    fontSize: 0.875rem
  ui-button-font-size-small:
    fontSize: 0.875rem
  ui-button-font-size-large:
    fontSize: 1rem
  ui-dropdown-item-font-size:
    fontSize: 0.9375rem
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#2547F3"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#d21e00"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#FFFDF2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#FFFDF2"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#2547F3"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#00992e"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#FFFDF2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# KoliBri

## Overview

**KoliBri** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#2547F3` brand accent.

Typography centers cleanly on `System UI` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#FFFDF2` surface layering.

Source: published token package (https://github.com/learningequality/kolibri-design-system), repo https://github.com/learningequality/kolibri-design-system, package `kolibri-design-system`, frameworks: vue. Inventory: **91** colors, **7** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#FFFDF2` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#2547F3` (6.4:1 vs canvas; pair with `#f7f7f8` foreground ink for 6.0:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `primary-v-100` (`#D9E1FD`), `primary-v-200` (`#B4C3FB`), `primary-v-300` (`#8EA4F9`), `primary-v-400` (`#6986F7`), `primary-v-500` (`#4368F5`), `primary-v-600` (`#2547F3`).
- **Neutral Ramp**: `primary-v-50` (`#F5F7FF`), `secondary-v-50` (`#FFFDF2`), `brand-primary-v50` (`#f5f7ff`), `brand-secondary-v50` (`#fffdf2`), `tokens-text` (`#000000`), `tokens-text-disabled` (`#cccccc`).
- **Semantic States**: success: `tokens-success` (`#00992e`) · danger: `tokens-error` (`#d21e00`) · warning: `tokens-warning` (`#ffcb00`) · info: `tokens-link` (`#4368f5`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `ui-input-text-font-size`: 1rem, weight 600).
- **Body & UI Controls**: `system-ui` (`ui-input-text-font-size`: 1rem, weight 400).
- **Scale Steps (7)**: `ui-input-text-font-size` (1rem), `ui-button-font-size-large` (1rem), `ui-input-label-font-size` (0.9375rem), `ui-dropdown-item-font-size` (0.9375rem), `ui-input-feedback-font-size` (0.875rem), `ui-button-font-size` (0.875rem), `ui-button-font-size-small` (0.875rem).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#FFFDF2` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#FFFDF2`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#2547F3` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#2547F3`, ink `#ffffff`, (6.4:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#d21e00`, ink `#ffffff`, (5.3:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#FFFDF2`, ink `#0b0b0c`, (19.3:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#FFFDF2`, ink `#0b0b0c`, (19.3:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#2547F3`, ink `#ffffff`, (6.4:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#00992e`, ink `#0b0b0c`, (5.2:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#FFFDF2`, ink `#0b0b0c`, (19.3:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#2547F3` with `#f7f7f8` text (6.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#FFFDF2` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
