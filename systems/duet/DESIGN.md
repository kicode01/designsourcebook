---
version: alpha
name: Duet
description: "Crisp light (#fffbf4) canvas, localtapiola-sans typography, #f7b228 brand accent, and 8px corner geometry"
colors:
  bg-canvas: "#0077b3"
  canvas-text: "#082a4d"
  header-text: "#ffffff"
  nav-bg: "#f5f8fa"
  footer-text: "#4d5f6c"
  footer-border: "#d4dfe5"
  body-text: "#62798a"
  link-text: "#637484"
  button-bg: "rgba(0, 0, 0, 0.3)"
  button-text: "#000000"
  css-surface-11: "#e61740"
  css-stroke-12: "#172a3b"
  css-color-13: "#004b81"
  css-color-14: "#8c001e"
  css-surface-15: "#c6e1ee"
  css-surface-16: "#f1cab2"
  css-color-17: "#5e788b"
  css-border-18: "#d4dde2"
  css-surface-19: "rgba(8, 42, 77, 0.8)"
  css-surface-20: "rgba(23, 42, 59, 0.8)"
  css-surface-21: "#f5f6f7"
  css-surface-22: "rgba(101, 119, 135, 0.15)"
  css-color-23: "#7891a4"
  css-surface-24: "#e4f1f7"
  css-surface-25: "#fbebe1"
  css-surface-26: "rgba(8, 42, 77, 0.05)"
  css-surface-27: "rgba(23, 42, 59, 0.05)"
  css-surface-28: "rgba(0, 0, 0, 0.03)"
  css-surface-29: "#308369"
  css-color-30: "#7f96a5"
  css-surface-31: "#f0f7fa"
  css-border-32: "#edeef0"
  css-color-33: "#7a01c4"
  css-color-34: "#a9457c"
  css-color-35: "#364a81"
  css-color-36: "#171c3a"
  css-color-37: "#5f7a8f"
  css-surface-38: "#ebf1f5"
  css-surface-39: "#bdc6cc"
  css-surface-40: "#c3c3c3"
  css-surface-41: "#b5c6d0"
  css-surface-42: "#b2c2cd"
  css-surface-43: "rgba(43, 40, 38, 0.1)"
  css-color-44: "rgba(255, 255, 255, 0.8)"
  css-surface-45: "rgba(255, 255, 255, 0.9)"
  css-surface-46: "#f5f9f8"
  css-surface-47: "#fdf4f6"
  css-border-48: "#d61c52"
  css-surface-49: "rgba(214, 28, 82, 0.05)"
  css-surface-50: "rgba(48, 131, 105, 0.05)"
  css-border-51: "#d1d1d1"
  css-color-52: "#a6b8c5"
  css-surface-53: "#f3f4f5"
  css-surface-54: "#fffbf4"
  css-border-55: "#f7b228"
  css-surface-56: "#e8eaeb"
  css-surface-57: "#fef3df"
  css-surface-58: "#fbe8ee"
  css-surface-59: "#eaf3f0"
  css-color-60: "#00294d"
  primary: "#f7b228"
typography:
  header:
    fontFamily: "localtapiola-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
    fontSize: 16px
    fontWeight: 800
    lineHeight: 1.5
  nav:
    fontFamily: "localtapiola-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  h1:
    fontFamily: "localtapiola-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
    fontSize: 58px
    fontWeight: 800
    lineHeight: 1.25
  h2:
    fontFamily: "localtapiola-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
    fontSize: 36px
    fontWeight: 800
    lineHeight: 1.25
  h3:
    fontFamily: "localtapiola-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "localtapiola-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "localtapiola-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
    fontSize: 12px
    fontWeight: 600
rounded:
  nav: 20rem
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  default: 8px
components:
  nav-toggle:
    backgroundColor: "rgba(0, 0, 0, 0)"
    textColor: "rgb(255, 255, 255)"
    typography:
      fontSize: 0.875rem
      fontWeight: 600
    rounded: 20rem
  button-primary:
    backgroundColor: "#f7b228"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f5f6f7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f5f6f7"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#f7b228"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
---

# Duet

## Overview

**Duet** is a light-first design system anchored on `#fffbf4` canvas surfaces with `#0b0b0c` primary ink (19.1:1 contrast) and `#f7b228` brand accent.

Typography centers cleanly on `localtapiola-sans` (58px display down to 16px body), unified by `8px` base corner radius and stepped `#fffbf4` -> `#f5f6f7` surface layering.

Maintained by **LocalTapiola**. Source: live stylesheet extraction (https://www.duetds.com), repo https://github.com/duetds/tokens, package `@duetds/tokens`, frameworks: web-components, css. Inventory: **61** colors, **7** typography steps, and **8** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#fffbf4` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f5f6f7` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.1:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#f7b228` (1.8:1 vs canvas; pair with `#0b0b0c` foreground ink for 10.6:1 contrast).
- **Structural Border (`border`)**: `#d4dfe5` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `bg-canvas` (`#0077b3`), `canvas-text` (`#082a4d`), `footer-text` (`#4d5f6c`), `body-text` (`#62798a`), `css-surface-11` (`#e61740`), `css-stroke-12` (`#172a3b`).
- **Neutral Ramp**: `header-text` (`#ffffff`), `nav-bg` (`#f5f8fa`), `footer-border` (`#d4dfe5`), `button-text` (`#000000`), `css-border-18` (`#d4dde2`), `css-surface-21` (`#f5f6f7`).
- **Semantic States**: info: `link-text` (`#637484`).

## Typography

- **Primary / Display Voice**: `localtapiola-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` (top step `h1`: 58px, weight 800, line-height 1.25).
- **Body & UI Controls**: `localtapiola-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` (`header`: 16px, weight 800, line-height 1.5).
- **Scale Steps (7)**: `h1` (58px, w800), `h2` (36px, w800), `body` (24px, w400), `h3` (20px, w600), `header` (16px, w800), `nav` (14px, w400), `button` (12px, w600).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`.
- **Hierarchy**: Group controls cleanly within `#f5f6f7` cards; separate sibling sections using `#d4dfe5` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fffbf4` -> `#f5f6f7`) and `1px solid #d4dfe5` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#f7b228` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `20rem`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`nav-toggle` (nav)**: bg `rgba(0, 0, 0, 0)`, ink `rgb(255, 255, 255)`, (1.0:1), radius `20rem`.
- **`button-primary` (button)**: bg `#f7b228`, ink `#0b0b0c`, (10.6:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ef4444`, ink `#000000`, (5.6:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f5f6f7`, ink `#0b0b0c`, (18.2:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f5f6f7`, ink `#0b0b0c`, (18.2:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#f7b228`, ink `#000000`, (11.4:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#10b981`, ink `#000000`, (8.3:1), radius `999px`, padding `4px 10px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fffbf4` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#f7b228` with `#0b0b0c` text (10.6:1) for primary CTAs, active tabs, and focus outlines.
- Pair `localtapiola-sans` headings with `localtapiola-sans` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f5f6f7` surface shifts and `#d4dfe5` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
