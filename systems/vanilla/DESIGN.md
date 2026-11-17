---
version: alpha
name: Vanilla
description: "Canonical Vanilla — an extensible Sass CSS framework by the Ubuntu Web Team."
colors:
  color-x-light: "#fff"
  color-light: "#f7f7f7"
  color-mid-x-light: "#e5e5e5"
  color-mid-light: "#d9d9d9"
  color-mid: "#999"
  color-mid-dark: "#666"
  color-dark: "#111"
  color-x-dark: "#000"
  color-negative: "#c7162b"
  color-caution: "#cc7900"
  color-positive: "#0e8420"
  color-information: "#24598f"
  color-paper: "#f3f3f3"
  color-negative-dark: "#a11223"
  color-positive-dark: "#008013"
  color-link: "#06c"
  color-link-visited: "#7d42b8"
  color-focus: "#2e96ff"
  color-link-dark: "#69c"
  color-link-visited-dark: "#a679d2"
  color-focus-dark: "#9cf"
  color-focus-positive: "#003008"
  color-label-validated: "#006b75"
  color-positive-background: "#edf8eb"
  color-positive-background-hover: "#e5f6e2"
  color-positive-background-focus: "#e0f4dc"
  color-caution-background: "#f8efe8"
  color-caution-background-hover: "#f5e7dd"
  color-caution-background-focus: "#f3e2d6"
  color-negative-background: "#f8e9e8"
  color-negative-background-hover: "#f5dfdd"
  color-negative-background-focus: "#f3d8d6"
  colors-light-theme-text-default: "#000"
  colors-light-theme-background-default: "#fff"
  colors-light-theme-background-alt: "#f7f7f7"
  colors-light-theme-border-high-contrast: "#707070"
  colors-dark-theme-text-default: "hsl(0, 0%, 100%)"
  colors-dark-theme-text-hover: "hsl(0, 0%, 76%)"
  colors-dark-theme-background-default: "#262626"
  colors-dark-theme-background-alt: "#202020"
  colors-dark-theme-background-inputs: "#2f2f2f"
  colors-dark-theme-background-active: "#373737"
  colors-dark-theme-background-hover: "#313131"
  colors-dark-theme-border-high-contrast: "#939393"
  colors-paper-theme-background-inputs: "#eaeaea"
  colors-paper-theme-background-active: "#e0e0e0"
  colors-paper-theme-background-hover: "#e7e7e7"
  color-ubuntu: "#e95420"
  color-accent: "#0f95a1"
  color-accent-dark: "#70bbc2"
  default: "#f2f2f2"
  positive: "#62a36c"
  caution: "#c48831"
  negative: "#d17b85"
  hover: "#e5f6e2"
  focus: "#e0f4dc"
  baseline-color: "#f00"
  primary: "#0f95a1"
typography:
  h1:
    fontSize: 2em
  notification-title:
    fontSize: 1rem
  font-base-family:
    fontFamily: "\"Ubuntu variable\", Ubuntu, -apple-system, \"Segoe UI\", Roboto, Oxygen, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif"
  font-monospace:
    fontFamily: "\"Ubuntu Mono variable\", \"Ubuntu Mono\", Consolas, Monaco, Courier, monospace"
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#0f95a1"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#c7162b"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f3f3f3"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f3f3f3"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#0f95a1"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#0e8420"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f3f3f3"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Vanilla

## Overview

**Vanilla** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#0f95a1` brand accent.

Typography centers cleanly on `Ubuntu variable` (32px display down to 16px body), unified by `8px` base corner radius and stepped `#fff` -> `#f3f3f3` surface layering.

Maintained by **Ubuntu**. Source: published token package (https://vanillaframework.io/), repo https://github.com/canonical/vanilla-framework, package `vanilla-framework`, frameworks: css, react. Inventory: **58** colors, **4** typography steps, and **8** documented components (LGPL-3.0 license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f3f3f3` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#0f95a1` (3.6:1 vs canvas; pair with `#f7f7f8` foreground ink for 3.4:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-focus` (`#2e96ff`), `color-focus-dark` (`#9cf`), `color-ubuntu` (`#e95420`), `color-accent` (`#0f95a1`), `color-accent-dark` (`#70bbc2`), `baseline-color` (`#f00`).
- **Neutral Ramp**: `color-x-light` (`#fff`), `color-light` (`#f7f7f7`), `color-mid-x-light` (`#e5e5e5`), `color-mid-light` (`#d9d9d9`), `color-mid` (`#999`), `color-mid-dark` (`#666`).
- **Semantic States**: success: `color-positive` (`#0e8420`) · danger: `color-negative` (`#c7162b`) · warning: `color-caution` (`#cc7900`) · info: `color-information` (`#24598f`).

## Typography

- **Primary / Display Voice**: `"Ubuntu variable", Ubuntu, -apple-system, "Segoe UI", Roboto, Oxygen, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif` (top step `h1`: 2em, weight 600).
- **Body & UI Controls**: `"Ubuntu variable", Ubuntu, -apple-system, "Segoe UI", Roboto, Oxygen, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif` (`font-base-family`: 16px, weight 400).
- **Monospace / Technical Labels**: `"Ubuntu Mono variable", "Ubuntu Mono", Consolas, Monaco, Courier, monospace` (`font-monospace`: 16px).
- **Scale Steps (4)**: `h1` (2em), `notification-title` (1rem), `font-base-family` (16px), `font-monospace` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f3f3f3` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#f3f3f3`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#0f95a1` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#0f95a1`, ink `#0b0b0c`, (5.5:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#c7162b`, ink `#ffffff`, (5.9:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f3f3f3`, ink `#0b0b0c`, (17.7:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f3f3f3`, ink `#0b0b0c`, (17.7:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#0f95a1`, ink `#0b0b0c`, (5.5:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#0e8420`, ink `#ffffff`, (4.8:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f3f3f3`, ink `#0b0b0c`, (17.7:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#0f95a1` with `#f7f7f8` text (3.4:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Ubuntu variable` headings with `Ubuntu variable` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f3f3f3` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
