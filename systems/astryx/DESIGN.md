---
version: alpha
name: Astryx
description: "Crisp light (#ffffff) canvas, Figtree typography, #0a7d55 brand accent, and 8px corner geometry"
colors:
  bg-canvas: "#ffffff"
  bg-surface: "#f3f4f6"
  default-accent-seed: "#0064E0"
  accent: "#0064E0"
  neutral: "#c1c6d5"
  error: "#ffb3a5"
  warning: "#f7be00"
  success: "#91D143"
  border-color: "#8F9296"
  color-accent: "#FF0000"
  color-on-warning: "#111111"
  color-warning: "#ffce2f"
  background: "#f3f4f6"
  color-on-success: "#141010"
  color-on-error: "#141010"
  color-background-body: "rgb(0, 32, 16)"
  color-text-primary: "rgb(240, 255, 0)"
  color-border: "rgb(0, 224, 255)"
  color-text-blue: "#0074E2"
  color-text-info: "#6D9CFE"
  color-text-purple: "#123456"
  focus-outline-color: "#00FF00"
  color-success: "#3FB950"
  color-text-success: "#123456"
  default-accent: "#0064E0"
  default-accent-dark: "#0171E3"
  color-on-accent: "#FFFFFF"
  color-background-surface: "#ffffff"
  color-background-card: "#ffffff"
  color-text-secondary: "#a3a3a3"
  color-background: "#fff"
  color-surface: "#eee"
  color-text-red: "#123456"
  color-text-green: "#200002"
  color-text-yellow: "#200003"
  color-error: "#FF0000"
  color-text: "#111"
  theme-duplicate-local-theme-color-accent: "#0077b6"
  color-border-emphasized: "#D4D4D4"
  yx-theme-local-child-color-surface-raised: "#fedcba"
  color-background-inverted: "#0a1317"
  color-background-error-inverted: "#aa071e"
  brand: "#0a7d55"
  brand-accent: "#ff0000"
  brand-x: "#0a7"
  my-accent: "#0000ff"
  color-text-accent: "#888888"
  ffffff: "#1C1C1E"
  palette-white: "#ffffff"
  aquamarine: "#7fffd4"
  black: "#000000"
  brown: "#a52a2a"
  chocolate: "#d2691e"
  crimson: "#dc143c"
  darkgoldenrod: "#b8860b"
  darkkhaki: "#bdb76b"
  darkorchid: "#9932cc"
  darkslateblue: "#483d8b"
  darkviolet: "#9400d3"
  dimgrey: "#696969"
  forestgreen: "#228b22"
  gold: "#ffd700"
  greenyellow: "#adff2f"
  indianred: "#cd5c5c"
  lavender: "#e6e6fa"
  lightblue: "#add8e6"
  lightgray: "#d3d3d3"
  lightsalmon: "#ffa07a"
  lightslategrey: "#778899"
  limegreen: "#32cd32"
  mediumaquamarine: "#66cdaa"
  mediumseagreen: "#3cb371"
  mediumvioletred: "#c71585"
  moccasin: "#ffe4b5"
  olive: "#808000"
  orchid: "#da70d6"
  palevioletred: "#db7093"
  pink: "#ffc0cb"
  rebeccapurple: "#663399"
  saddlebrown: "#8b4513"
  seashell: "#fff5ee"
  slateblue: "#6a5acd"
  springgreen: "#00ff7f"
  thistle: "#d8bfd8"
  wheat: "#f5deb3"
  yellowgreen: "#9acd32"
  color-on-light: "#111111"
  data-override-dark: "rgb(4, 5, 6)"
  amber: "#f59e0b"
  cream: "#fef3c7"
  color-data-categorical-blue: "#00A3FF"
  primary: "#0a7d55"
typography:
  font-family-body:
    fontFamily: "Figtree, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
  font-family-heading:
    fontFamily: "Figtree, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
  font-family-code:
    fontFamily: "ui-monospace, \"SF Mono\", Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
  font-size-4xs:
    fontSize: 0.375rem
  font-size-3xs:
    fontSize: 0.4375rem
  font-size-2xs:
    fontSize: 0.5rem
  font-size-xs:
    fontSize: 0.625rem
  font-size-sm:
    fontSize: 0.75rem
  font-size-base:
    fontSize: 0.875rem
  font-size-lg:
    fontSize: 1.0625rem
  font-size-xl:
    fontSize: 1.25rem
  font-size-2xl:
    fontSize: 1.5rem
  font-size-3xl:
    fontSize: 1.8125rem
  font-size-4xl:
    fontSize: 2.1875rem
  font-size-5xl:
    fontSize: 2.625rem
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#0a7d55"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ffb3a5"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f3f4f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f3f4f6"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#0a7d55"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#91D143"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f3f4f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Astryx

## Overview

**Astryx** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#0a7d55` brand accent.

Typography centers cleanly on `Figtree` (42px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#f3f4f6` surface layering.

Maintained by **Meta**. Source: published token package (https://github.com/meta/astryx), repo https://github.com/meta/astryx, frameworks: css. Inventory: **92** colors, **15** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f3f4f6` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#0a7d55` (5.2:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.8:1 contrast).
- **Structural Border (`border`)**: `#D4D4D4` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `default-accent-seed` (`#0064E0`), `accent` (`#0064E0`), `color-accent` (`#FF0000`), `color-background-body` (`rgb(0, 32, 16)`), `color-text-primary` (`rgb(240, 255, 0)`), `color-border` (`rgb(0, 224, 255)`).
- **Neutral Ramp**: `bg-canvas` (`#ffffff`), `bg-surface` (`#f3f4f6`), `neutral` (`#c1c6d5`), `border-color` (`#8F9296`), `color-on-warning` (`#111111`), `background` (`#f3f4f6`).
- **Semantic States**: success: `success` (`#91D143`) · danger: `error` (`#ffb3a5`) · warning: `warning` (`#f7be00`) · info: `color-text-info` (`#6D9CFE`).

## Typography

- **Primary / Display Voice**: `Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` (top step `font-size-5xl`: 2.625rem, weight 600).
- **Body & UI Controls**: `Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` (`font-family-body`: 16px, weight 400).
- **Monospace / Technical Labels**: `ui-monospace, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace` (`font-family-code`: 16px).
- **Scale Steps (15)**: `font-size-5xl` (2.625rem), `font-size-4xl` (2.1875rem), `font-size-3xl` (1.8125rem), `font-size-2xl` (1.5rem), `font-size-xl` (1.25rem), `font-size-lg` (1.0625rem), `font-family-body` (16px), `font-family-heading` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f3f4f6` cards; separate sibling sections using `#D4D4D4` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#f3f4f6`) and `1px solid #D4D4D4` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#0a7d55` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#0a7d55`, ink `#ffffff`, (5.2:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ffb3a5`, ink `#000000`, (12.2:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f3f4f6`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f3f4f6`, ink `#0b0b0c`, (17.9:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#0a7d55`, ink `#f7f7f8`, (4.8:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#91D143`, ink `#000000`, (11.4:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f3f4f6`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#0a7d55` with `#f7f7f8` text (4.8:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Figtree` headings with `Figtree` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f3f4f6` surface shifts and `#D4D4D4` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
