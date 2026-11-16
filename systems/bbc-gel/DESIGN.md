---
version: alpha
name: BBC GEL
description: "Crisp light (#e6e8ea) canvas, ReithSans typography, #ffb32b brand accent, and 8px corner geometry"
colors:
  canvas-text: "#000000"
  header-text: "#3a3c3e"
  nav-bg: "#ffffff"
  footer-text: "#f8f8f8"
  h2-text: "#383838"
  h2-border: "#c8c8c8"
  h2-text-1: "#f6f6f6"
  body-text: "#545658"
  link-text: "#0000ee"
  css-surface-10: "rgba(0,0,0,.15)"
  css-surface-11: "rgba(255,255,255,.15)"
  css-surface-12: "#eb0000"
  css-surface-13: "#ffd230"
  css-surface-14: "#149edc"
  css-surface-15: "#ff4c98"
  css-surface-16: "#fa6400"
  css-surface-17: "#963ce1"
  css-surface-18: "#4023e0"
  css-surface-19: "#4505a8"
  css-surface-20: "#ffe727"
  css-surface-21: "#181818"
  css-border-22: "#cccccc"
  css-color-23: "#333333"
  css-surface-24: "#4c4c4c"
  css-surface-25: "rgba(0,0,0,.7)"
  css-border-26: "#949494"
  css-border-27: "rgba(255,255,255,.4)"
  css-border-28: "#505050"
  css-border-29: "#888888"
  css-color-30: "#a8a8a8"
  css-surface-31: "#1188bb"
  css-surface-32: "#e4e4e4"
  css-surface-33: "#e6e8ea"
  css-border-34: "#666666"
  css-surface-35: "#202224"
  css-border-36: "rgba(0,0,0,.3)"
  css-border-37: "hsla(0,0%,80%,.3)"
  css-surface-38: "#006def"
  css-surface-39: "#0178ff"
  css-surface-40: "#0071f1"
  css-surface-41: "#0064e6"
  css-surface-42: "#dbdbdb"
  css-surface-43: "#005bc8"
  css-surface-44: "#148a00"
  css-color-45: "#b0b2b4"
  css-color-46: "#141414"
  css-surface-47: "#ffb32b"
  primary: "#ffb32b"
typography:
  header:
    fontFamily: "ReithSans, Arial, Helvetica, freesans, sans-serif"
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1
  nav:
    fontFamily: "ReithSans, Arial, Helvetica, freesans, sans-serif"
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1
  h1:
    fontFamily: "ReithSans, Arial, Helvetica, freesans, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1
  h2:
    fontFamily: "ReithSans, Arial, Helvetica, freesans, sans-serif"
    fontSize: 10px
    fontWeight: 400
    lineHeight: 2
components:
  button:
    textColor: "#0000ee"
  button-2:
    textColor: "#000000"
  button-3:
    backgroundColor: "#f6f6f6"
    textColor: "#000000"
    padding: 12px
  button-4:
    textColor: "#f6f6f6"
  badge:
    backgroundColor: "#f6f6f6"
    textColor: "#3a3c3e"
    padding: 4px
  input-default:
    backgroundColor: "#e6e8ea"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#e6e8ea"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  nav-bar:
    backgroundColor: "#e6e8ea"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# BBC GEL

## Overview

BBC GEL — read from the rendered page in a browser, not from published tokens.

Tokens were read from https://www.bbc.co.uk/gel, not from a published token package: 48 colour tokens and 4 type tokens.

## Colors

48 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `ReithSans, Arial, Helvetica, freesans, sans-serif`.

## Components

5 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#ffb32b` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `ReithSans` across 4 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
