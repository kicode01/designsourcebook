---
version: alpha
name: Persona Design System
description: "Crisp light (#FBFCFD) canvas, system-ui typography, #0060df brand accent, and 8px corner geometry"
colors:
  border-color: "#BFBFBF"
  text-primary-color: "#15141a"
  text-secondary-color: "#5b5b66"
  link-fg-color: "#0060df"
  link-hover-fg-color: "#0250bb"
  textarea-border-color: "#8f8f9d"
  radio-border-color: "#8f8f9d"
  radio-checked-border-color: "#0060df"
  button-primary-bg-color: "#0060df"
  button-primary-fg-color: "#fbfbfe"
  button-primary-active-bg-color: "#054096"
  button-primary-hover-bg-color: "#0250bb"
  dialog-border-color: "#1c1b22"
  textarea-bg-color: "#42414d"
  input-text-bg-color: "#42414d"
  color-accent-primary: "#0060df"
  color-accent-primary-hover: "#0250bb"
  color-accent-primary-active: "#054096"
  border-color-interactive: "#8f8f9d"
  clear-signature-button-bg-focus: "#f0f0f4"
  primary-color: "#fbfbfe"
  secondary-color: "#cfcfd8"
  alt-text-done-color: "#2ac3a2"
  alt-text-warning-color: "#0090ed"
  alt-text-tooltip-bg: "#f0f0f4"
  alt-text-tooltip-fg: "#15141a"
  alt-text-tooltip-border: "#8f8f9d"
  no-alt-text-badge-border-color: "#f0f0f4"
  no-alt-text-badge-bg-color: "#cfcfd8"
  no-alt-text-badge-fg-color: "#5b5b66"
  swatch-border-color: "#cfcfd8"
  focus-ring-color: "#0060df"
  pspdfkit-signatures-sidebar-icon-warning-fill: "#ffb864"
  pspdfkit-signatures-sidebar-icon-error-fill: "#ffb6ac"
  pspdfkit-electronic-signatures-modal-background: "#22252b"
  background-color: "#408bdd"
  code-bg-color: "#0b2138"
  gray-0: "#FBFCFD"
  gray-20: "#CBD1D8"
  gray-40: "#939EAE"
  gray-60: "#5B6778"
  gray-80: "#383F4A"
  gray-100: "#191C21"
  blue-20: "#75C0FF"
  blue-60: "#0061B3"
  blue-100: "#001526"
  green-20: "#91E1A5"
  green-60: "#248C3E"
  green-100: "#081E0D"
  lightblue-20: "#75E6FF"
  lightblue-60: "#0093B3"
  lightblue-100: "#001F26"
  orange-20: "#FFCA75"
  orange-60: "#B36F00"
  orange-100: "#261800"
  red-20: "#F08E8D"
  red-60: "#9F201F"
  red-100: "#220707"
  gold-20: "#FFD675"
  gold-60: "#B37E00"
  gold-100: "#261B00"
  yellow-20: "#FFE975"
  yellow-60: "#B39700"
  yellow-100: "#262000"
  lime-20: "#CDFF75"
  lime-60: "#72B300"
  lime-100: "#182600"
  teal-20: "#75E1D0"
  teal-60: "#008C77"
  teal-100: "#001E19"
  purple-20: "#BA75FF"
  purple-60: "#5A00B3"
  purple-100: "#130026"
  violet-20: "#C975FF"
  violet-60: "#6D00B3"
  violet-100: "#170026"
  pink-20: "#F895FF"
  pink-60: "#AA29B3"
  pink-100: "#240926"
  color: "#0065d1"
  separator-color: "#f0f0f4"
  message-bar-fg-color: "#15141a"
  button-signature-active-bg: "#cfcfd8"
  tab-top-line-hover-color: "#8f8f9d"
  outline-around-color: "#f0f0f4"
  divider-color: "#d7d7db"
  color-blue900: "#0a0167"
  primary: "#0060df"
typography:
  pspdfkit-font-size-1:
    fontSize: 1rem
  pspdfkit-font-size-2:
    fontSize: 0.75rem
  pspdfkit-font-size-3:
    fontSize: 0.875rem
  pspdfkit-font-size-4:
    fontSize: 1.125rem
  pspdfkit-font-size-5:
    fontSize: 1.25rem
  pspdfkit-font-size-6:
    fontSize: 1.5rem
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
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
  button-primary:
    backgroundColor: "#0060df"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#15141a"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ffb6ac"
    textColor: "#15141a"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#fbfbfe"
    textColor: "#15141a"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#fbfbfe"
    textColor: "#15141a"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#0060df"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#15141a"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#fbfbfe"
    textColor: "#15141a"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#fbfbfe"
    textColor: "#15141a"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#0060df"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#0060df"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fbfbfe"
    textColor: "#15141a"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#fbfbfe"
    textColor: "#15141a"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#FBFCFD"
    textColor: "#15141a"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#15141a"
    textColor: "#FBFCFD"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#fbfbfe"
    textColor: "#15141a"
    rounded: 8px
    padding: 8px
---

# Persona Design System

## Overview

**Persona Design System** is a light-first design system anchored on `#FBFCFD` canvas surfaces with `#15141a` primary ink (17.8:1 contrast) and `#0060df` brand accent.

Typography centers cleanly on `System UI` (24px display down to 16px body), unified by `8px` base corner radius and stepped `#FBFCFD` -> `#fbfbfe` surface layering.

Maintained by **Persona**. Source: published token package (https://github.com/privy-open-source/design-system), repo https://github.com/privy-open-source/design-system, frameworks: css. Inventory: **88** colors, **6** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#FBFCFD` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fbfbfe` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#15141a` — body copy and primary headings (17.8:1 on canvas).
- **Muted Ink (`muted`)**: `#5b5b66` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#0060df` (5.5:1 vs canvas; pair with `#f7f7f8` foreground ink for 5.2:1 contrast).
- **Structural Border (`border`)**: `#BFBFBF` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `radio-checked-border-color` (`#0060df`), `button-primary-bg-color` (`#0060df`), `button-primary-active-bg-color` (`#054096`), `button-primary-hover-bg-color` (`#0250bb`), `color-accent-primary` (`#0060df`), `color-accent-primary-hover` (`#0250bb`).
- **Neutral Ramp**: `border-color` (`#BFBFBF`), `text-primary-color` (`#15141a`), `text-secondary-color` (`#5b5b66`), `textarea-border-color` (`#8f8f9d`), `radio-border-color` (`#8f8f9d`), `button-primary-fg-color` (`#fbfbfe`).
- **Semantic States**: success: `green-20` (`#91E1A5`) · danger: `pspdfkit-signatures-sidebar-icon-error-fill` (`#ffb6ac`) · warning: `alt-text-warning-color` (`#0090ed`) · info: `link-fg-color` (`#0060df`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `pspdfkit-font-size-6`: 1.5rem, weight 600).
- **Body & UI Controls**: `system-ui` (`pspdfkit-font-size-1`: 1rem, weight 400).
- **Scale Steps (6)**: `pspdfkit-font-size-6` (1.5rem), `pspdfkit-font-size-5` (1.25rem), `pspdfkit-font-size-4` (1.125rem), `pspdfkit-font-size-1` (1rem), `pspdfkit-font-size-3` (0.875rem), `pspdfkit-font-size-2` (0.75rem).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#fbfbfe` cards; separate sibling sections using `#BFBFBF` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#FBFCFD` -> `#fbfbfe`) and `1px solid #BFBFBF` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#0060df` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#0060df`, ink `#ffffff`, (5.6:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#15141a`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ffb6ac`, ink `#15141a`, (10.9:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#fbfbfe`, ink `#15141a`, (17.7:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#fbfbfe`, ink `#15141a`, (17.7:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#0060df`, ink `#ffffff`, (5.6:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#10b981`, ink `#15141a`, (7.2:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#fbfbfe`, ink `#15141a`, (17.7:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#fbfbfe`, ink `#15141a`, (17.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#0060df`, ink `#f7f7f8`, (5.2:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#0060df`, ink `#f7f7f8`, (5.2:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fbfbfe`, ink `#15141a`, (17.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fbfbfe`, ink `#15141a`, (17.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#FBFCFD`, ink `#15141a`, (17.8:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#15141a`, ink `#FBFCFD`, (17.8:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fbfbfe`, ink `#15141a`, (17.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#FBFCFD` (light) with `#15141a` primary text and `#5b5b66` secondary labels.
- Use `#0060df` with `#f7f7f8` text (5.2:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#fbfbfe` surface shifts and `#BFBFBF` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
