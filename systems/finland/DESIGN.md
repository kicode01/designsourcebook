---
version: alpha
name: Finland Toolbox
description: "Nordic civic design toolbox, deep navy blue on high-contrast white canvas"
colors:
  wp-block-synced-color: "#7a00df"
  wp-block-synced-color-rgb: "rgb(122, 0, 223)"
  wp-editor-canvas-background: "#ddd"
  wp-admin-theme-color: "#007cba"
  wp-admin-theme-color-rgb: "rgb(0, 124, 186)"
  wp-admin-theme-color-darker-10: "#006ba1"
  wp-admin-theme-color-darker-20: "#005a87"
  wp-admin-theme-color-darker-20-rgb: "rgb(0, 90, 135)"
  wp-preset-color-black: "#060A14"
  wp-preset-color-cyan-bluish-gray: "#abb8c3"
  wp-preset-color-white: "#fff"
  wp-preset-color-pale-pink: "#f78da7"
  wp-preset-color-vivid-red: "#cf2e2e"
  wp-preset-color-luminous-vivid-orange: "#ff6900"
  wp-preset-color-luminous-vivid-amber: "#fcb900"
  wp-preset-color-light-green-cyan: "#7bdcb5"
  wp-preset-color-vivid-green-cyan: "#00d084"
  wp-preset-color-pale-cyan-blue: "#8ed1fc"
  wp-preset-color-vivid-cyan-blue: "#0693e3"
  wp-preset-color-vivid-purple: "#9b51e0"
  wp-preset-color-primary: "#002EA2"
  wp-preset-color-red: "#FE717B"
  wp-preset-color-green: "#A4D67A"
  wp-preset-color-light-blue: "#13D8E1"
  wp-preset-color-red-light: "#F8D6D8"
  wp-preset-color-green-light: "#E6F2D9"
  wp-preset-color-blue-light: "#C3F1F5"
  primary: "#002EA2"
typography:
  wp-preset-font-size-normal:
    fontSize: 16px
  wp-preset-font-size-huge:
    fontSize: 42px
  wp-preset-font-size-small:
    fontSize: 13px
  wp-preset-font-size-medium:
    fontSize: 20px
  wp-preset-font-size-large:
    fontSize: 36px
  wp-preset-font-size-x-large:
    fontSize: 42px
  html:
    fontFamily: sans-serif
  h1:
    fontSize: 2em
  h5:
    fontSize: 1rem
  hero-title:
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1
  hero-image-caption:
    fontSize: ".875rem"
  teaser-header-title:
    fontSize: 1.125rem
    fontWeight: 700
    lineHeight: 1.375
  filters-popular-title:
    fontSize: 1.375rem
  h2:
    fontSize: 1.5rem
  view-toggler-title:
    fontFamily: "Finlandica, \"Segoe UI\", sans-serif"
    fontSize: ".875rem"
    fontWeight: 700
  wp-caption:
    fontSize: ".875rem"
  h3:
    fontSize: 1rem
    lineHeight: 1.225
  whats-new-container-title:
    fontSize: 2rem
  material-data-title:
    fontSize: 2rem
  h4:
    fontSize: 14pt
  theme-calendar-title:
    fontSize: 1.25rem
components:
  button:
    backgroundColor: "#002ea2"
    textColor: "#fff"
    typography:
      fontSize: ".875rem"
      fontWeight: 700
    rounded: "0"
    padding: "0"
  tag:
    backgroundColor: "#002ea2"
    textColor: "#fff"
    typography:
      fontSize: ".875rem"
    rounded: "0"
    padding: "0"
  new-post-tag-2:
    backgroundColor: "#002ea2"
    textColor: "#fff"
    typography:
      fontSize: ".75rem"
      fontWeight: 700
    rounded: "50%"
  notice:
    backgroundColor: "#fff"
    padding: 8px 16px
  load-more-button-2:
    backgroundColor: "#002ea2"
    textColor: "#fff"
    typography:
      fontSize: ".875rem"
      fontWeight: 700
    rounded: "0"
    padding: "0"
  button-radio:
    backgroundColor: "#002ea2"
    textColor: "#fff"
    typography:
      fontSize: ".875rem"
      fontWeight: 700
    rounded: "0"
    padding: "0"
  button-radio-amount:
    backgroundColor: "#002ea2"
    textColor: "#fff"
    typography:
      fontSize: ".625rem"
    padding: ".125rem .25rem"
  input-default:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: "0"
    padding: 9px 13px
  nav-bar:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: "0"
    padding: 10px 16px
---

# Finland Toolbox

## Overview

Finland Toolbox — read from toolbox.finland.fi's live stylesheets, not a published token package.

Tokens were read from https://toolbox.finland.fi/, not from a published token package: 28 colour tokens and 21 type tokens.

## Colors

28 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `sans-serif`, `Finlandica, "Segoe UI", sans-serif`.

## Components

7 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fff) canvas paired with `#fff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#002EA2` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `sans-serif` across 21 type steps.
- **Component Geometry**: Buttons (`0`), cards (`10px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
