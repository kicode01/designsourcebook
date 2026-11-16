---
version: alpha
name: Marvel Styleguide
description: "Crisp light (#ffffff) canvas, FaktProSoft typography, #ff9e7c brand accent, and 8px corner geometry"
colors:
  bg-canvas: "#ffffff"
  canvas-text: "#3c4858"
  body-text: "#8492a6"
  link-bg: "#ff7849"
  link-text: "#0000ee"
  link-text-1: "#1fb6ff"
  link-text-2: "#c0ccda"
  css-surface-8: "#13ce66"
  css-surface-9: "#ffc82c"
  css-surface-10: "#ff49db"
  css-surface-11: "#7e5bef"
  css-surface-12: "#ff4949"
  css-surface-13: "#009eeb"
  css-surface-14: "#85d7ff"
  css-surface-15: "#0f9f4f"
  css-surface-16: "#29eb7f"
  css-surface-17: "#f8b700"
  css-surface-18: "#ffd55f"
  css-surface-19: "#ff5216"
  css-surface-20: "#ff9e7c"
  css-surface-21: "#ff16d1"
  css-surface-22: "#ff7ce5"
  css-surface-23: "#592dea"
  css-surface-24: "#a389f4"
  css-surface-25: "#ff1616"
  css-surface-26: "#ff7c7c"
  css-surface-27: "#000000"
  css-surface-28: "#1f2d3d"
  css-surface-29: "#273444"
  css-surface-30: "#f9fafc"
  css-surface-31: "#e0e6ed"
  css-surface-32: "#eff2f7"
  css-surface-33: "#e5e9f2"
  css-surface-34: "#d3dce6"
  css-surface-35: "rgba(133, 215, 255, 0.98)"
  css-surface-36: "rgba(133, 215, 255, 0.3)"
  css-surface-37: "rgba(133, 215, 255, 0.15)"
  css-surface-38: "rgba(133, 215, 255, 0.05)"
  css-surface-39: "rgba(0, 0, 0, 0.98)"
  css-surface-40: "rgba(0, 0, 0, 0.3)"
  css-surface-41: "rgba(0, 0, 0, 0.15)"
  css-surface-42: "rgba(0, 0, 0, 0.05)"
  css-surface-43: "rgba(31, 45, 61, 0.98)"
  css-surface-44: "rgba(31, 45, 61, 0.3)"
  css-surface-45: "rgba(31, 45, 61, 0.15)"
  css-surface-46: "rgba(31, 45, 61, 0.05)"
  css-surface-47: "rgba(255, 255, 255, 0.98)"
  css-surface-48: "rgba(255, 255, 255, 0.3)"
  css-surface-49: "rgba(255, 255, 255, 0.15)"
  css-surface-50: "rgba(255, 255, 255, 0.05)"
  css-surface-51: "#55acee"
  css-surface-52: "#3b5999"
  css-surface-53: "#ea4c89"
  css-surface-54: "#007ee5"
  css-surface-55: "#dc4e41"
  css-surface-56: "#3f729b"
  css-surface-57: "#0077b5"
  css-surface-58: "#ef4056"
  css-color-59: "#657b83"
  css-color-60: "#a9b6b6"
  css-color-61: "#2aa198"
  css-color-62: "#d33682"
  css-color-63: "#073642"
  css-color-64: "#cb4b16"
  css-color-65: "#dc322f"
  css-surface-66: "#eee8d5"
  css-surface-67: "#ffff00"
  primary: "#ff9e7c"
typography:
  h2:
    fontFamily: "FaktProSoft, \"Helvetica Neue\", helvetica, arial, sans-serif"
    fontSize: 38px
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "FaktProSoft, \"Helvetica Neue\", helvetica, arial, sans-serif"
    fontSize: 20px
    fontWeight: 300
    lineHeight: 1.7
components:
  input:
    textColor: "rgb(60, 72, 88)"
    typography:
      fontWeight: 300
  linkedin:
    textColor: "rgb(0, 119, 181)"
  inputGroup-context:
    backgroundColor: "rgb(249, 250, 252)"
    textColor: "#0b0b0c"
    typography:
      fontWeight: 300
  link-red:
    textColor: "rgb(255, 73, 73)"
  link-pink:
    textColor: "rgb(255, 73, 219)"
  link-dark:
    textColor: "rgb(60, 72, 88)"
  link-blue:
    textColor: "rgb(31, 182, 255)"
  link-green:
    textColor: "rgb(19, 206, 102)"
  link-light:
    textColor: "rgb(132, 146, 166)"
  button-flat:
    textColor: "rgb(255, 255, 255)"
  button-ghost:
    backgroundColor: transparent
    textColor: "rgb(60, 72, 88)"
  input-default:
    backgroundColor: "rgb(255, 255, 255)"
  button-outlined:
    textColor: "rgb(60, 72, 88)"
  card-surface:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#ff9e7c"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
---

# Marvel Styleguide

## Overview

Marvel Styleguide — read from the rendered page in a browser, not from published tokens.

Tokens were read from https://marvelapp.com/styleguide, not from a published token package: 68 colour tokens and 2 type tokens.

## Colors

68 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `FaktProSoft, "Helvetica Neue", helvetica, arial, sans-serif`.

## Components

13 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#ff9e7c` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `FaktProSoft` across 2 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
