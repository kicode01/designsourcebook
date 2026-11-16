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

Meta Astryx — tokens read from https://github.com/meta/astryx.

Tokens were read from the project's own repository, not from a marketing site: 91 colour tokens and 15 type tokens.

## Colors

91 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`, `ui-monospace, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace`.

## Visual Language

- **Surface & Theme Polarity**: Dark (#ff0000) canvas paired with `#ff0000` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#0a7d55` with `#f7f7f8` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Figtree` across 15 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
