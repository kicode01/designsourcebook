---
version: alpha
name: Vaadin Lumo
description: "Enterprise Java/Web Component Lumo theme, clean blue accents and fluid spacing"
colors:
  lumo-base-color: "hsl(214, 35%, 21%)"
  lumo-tint: "hsl(214, 100%, 98%)"
  lumo-shade: "hsl(214, 33%, 13%)"
  lumo-primary-color: "hsl(214, 90%, 48%)"
  lumo-primary-text-color: "hsl(214, 90%, 77%)"
  lumo-primary-contrast-color: "#fff"
  lumo-error-color: "hsl(3, 79%, 49%)"
  lumo-error-text-color: "hsl(3, 100%, 80%)"
  lumo-success-color: "hsl(145, 72%, 30%)"
  lumo-success-text-color: "hsl(145, 85%, 46%)"
  lumo-warning-color: "hsl(43, 100%, 48%)"
  lumo-warning-text-color: "hsl(45, 100%, 60%)"
  vaadin-user-color-0: "#ff66c7"
  vaadin-user-color-1: "#9d8aff"
  vaadin-user-color-2: "#8aff66"
  vaadin-user-color-3: "#ffbd66"
  vaadin-user-color-4: "#dc6bff"
  vaadin-user-color-5: "#66fffa"
  vaadin-user-color-6: "#e6ff66"
  lumo-error-contrast-color: "#fff"
  lumo-success-contrast-color: "#fff"
  vaadin-charts-color-0: "#5ac2f7"
  vaadin-charts-color-1: "#1676f3"
  vaadin-charts-color-2: "#ff7d94"
  vaadin-charts-color-3: "#c5164e"
  vaadin-charts-color-4: "#15c15d"
  vaadin-charts-color-5: "#0e8151"
  vaadin-charts-color-6: "#c18ed2"
  vaadin-charts-color-7: "#9233b3"
  vaadin-charts-color-8: "#fda253"
  vaadin-charts-color-9: "#e24932"
  primary: "hsl(214, 90%, 48%)"
typography:
  lumo-font-size-xxs:
    fontSize: 0.75rem
  lumo-font-size-xs:
    fontSize: 0.8125rem
  lumo-font-size-s:
    fontSize: 0.875rem
  lumo-font-size-m:
    fontSize: 1rem
  lumo-font-size-l:
    fontSize: 1.125rem
  lumo-font-size-xl:
    fontSize: 1.375rem
  lumo-font-size-xxl:
    fontSize: 1.75rem
  lumo-font-size-xxxl:
    fontSize: 2.5rem
  lumo-font-family:
    fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
  lumo-font-size:
    fontSize: 1rem
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "hsl(214, 90%, 48%)"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "hsl(3, 79%, 49%)"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "hsl(214, 100%, 98%)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "hsl(214, 100%, 98%)"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "hsl(214, 90%, 48%)"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "hsl(145, 72%, 30%)"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "hsl(214, 100%, 98%)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Vaadin Lumo

## Overview

**Vaadin Lumo** is a light-first design system anchored on `hsl(214, 100%, 98%)` canvas surfaces with `#0b0b0c` primary ink (18.6:1 contrast) and `hsl(214, 90%, 48%)` brand accent.

Typography centers cleanly on `System UI` (40px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **Vaadin**. Source: published token package (https://vaadin.com/components), repo https://github.com/vaadin/web-components, package `@vaadin/vaadin-lumo-styles`, frameworks: web-components, react, css. Inventory: **32** colors, **10** typography steps, and **8** documented components (Apache-2.0 license).

## Colors

- **Canvas (`canvas`)**: `hsl(214, 100%, 98%)` — base application backdrop (light theme).
- **Surface (`surface`)**: `hsl(214, 100%, 98%)` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (18.6:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `hsl(214, 90%, 48%)` (4.6:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.5:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `lumo-base-color` (`hsl(214, 35%, 21%)`), `lumo-primary-color` (`hsl(214, 90%, 48%)`), `lumo-primary-text-color` (`hsl(214, 90%, 77%)`), `vaadin-user-color-0` (`#ff66c7`), `vaadin-user-color-1` (`#9d8aff`), `vaadin-user-color-2` (`#8aff66`).
- **Neutral Ramp**: `lumo-tint` (`hsl(214, 100%, 98%)`), `lumo-shade` (`hsl(214, 33%, 13%)`), `lumo-primary-contrast-color` (`#fff`), `lumo-error-contrast-color` (`#fff`), `lumo-success-contrast-color` (`#fff`).
- **Semantic States**: success: `lumo-success-color` (`hsl(145, 72%, 30%)`) · danger: `lumo-error-color` (`hsl(3, 79%, 49%)`) · warning: `lumo-warning-color` (`hsl(43, 100%, 48%)`).

## Typography

- **Primary / Display Voice**: `-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` (top step `lumo-font-size-xxxl`: 2.5rem, weight 600).
- **Body & UI Controls**: `-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` (`lumo-font-size-m`: 1rem, weight 400).
- **Scale Steps (10)**: `lumo-font-size-xxxl` (2.5rem), `lumo-font-size-xxl` (1.75rem), `lumo-font-size-xl` (1.375rem), `lumo-font-size-l` (1.125rem), `lumo-font-size-m` (1rem), `lumo-font-family` (16px), `lumo-font-size` (1rem), `lumo-font-size-s` (0.875rem).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `hsl(214, 100%, 98%)` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`hsl(214, 100%, 98%)` -> `hsl(214, 100%, 98%)`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `hsl(214, 90%, 48%)` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `hsl(214, 90%, 48%)`, ink `#ffffff`, (4.8:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `hsl(3, 79%, 49%)`, ink `#ffffff`, (4.7:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `hsl(214, 100%, 98%)`, ink `#0b0b0c`, (18.6:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `hsl(214, 100%, 98%)`, ink `#0b0b0c`, (18.6:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `hsl(214, 90%, 48%)`, ink `#ffffff`, (4.8:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `hsl(145, 72%, 30%)`, ink `#ffffff`, (4.8:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `hsl(214, 100%, 98%)`, ink `#0b0b0c`, (18.6:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `hsl(214, 100%, 98%)` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `hsl(214, 90%, 48%)` with `#f7f7f8` text (4.5:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `hsl(214, 100%, 98%)` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
