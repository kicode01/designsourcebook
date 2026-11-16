---
version: alpha
name: Mailchimp Content Styleguide
description: "Crisp light (#ffffff) canvas, Verdana typography, #33c3f0 brand accent, and 4px corner geometry"
colors:
  bg-canvas: "#ffffff"
  canvas-text: "#231f20"
  main-bg: "#eff3f7"
  h2-text: "#3e81ed"
  h2-text-1: "#000000"
  h3-text: "#939598"
  button-bg: "#241c15"
  button-text: "#555555"
  button-text-2: "#3860be"
  button-border: "#bbbbbb"
  input-border: "#707070"
  css-color-12: "#2c9ab7"
  css-surface-13: "#fff4d5"
  css-color-14: "#aa8d3b"
  css-surface-15: "#f9f9f9"
  css-color-16: "#3a3a3a"
  css-border-17: "#dcdcdc"
  css-surface-18: "#d0ebe5"
  css-border-19: "#72c1b0"
  css-color-20: "#4d8277"
  css-border-21: "#fed156"
  css-surface-22: "#f7c9c0"
  css-border-23: "#e85c41"
  css-color-24: "#9b3f2e"
  css-border-25: "#373737"
  css-border-26: "#8a8a8a"
  css-surface-27: "#b7b7b7"
  css-border-28: "#5d5c5d"
  css-surface-29: "#db3a1b"
  css-border-30: "#ee836e"
  css-color-31: "rgba(255,255,255,0.8)"
  css-color-32: "#52bad5"
  css-surface-33: "#d8f0f6"
  css-surface-34: "#f5b7ab"
  css-surface-35: "#ffe8aa"
  css-surface-36: "#fede88"
  css-surface-37: "#febe12"
  css-surface-38: "#c5e5de"
  css-surface-39: "#95d1c4"
  css-surface-40: "#449a88"
  css-surface-41: "#b1e0ec"
  css-surface-42: "#6dc5dc"
  css-surface-43: "#f2f2f2"
  css-surface-44: "#060808"
  css-surface-45: "#eeeeee"
  css-color-46: "#d8d9da"
  css-color-47: "#474747"
  css-surface-48: "rgba(255,255,255,0.95)"
  css-surface-49: "#e8f6f9"
  css-surface-50: "rgba(249,237,50,0.4)"
  css-surface-51: "#f9ed32"
  css-color-52: "#1f96db"
  css-color-53: "#565656"
  css-surface-54: "#468254"
  css-surface-55: "#2c6415"
  css-surface-56: "rgba(0,0,0,.5)"
  css-surface-57: "#f9fffa"
  css-fill-58: "#32ae88"
  css-color-59: "#4d4d4d"
  css-surface-60: "#68b631"
  css-color-61: "#333333"
  css-border-62: "#888888"
  css-surface-63: "#33c3f0"
  css-surface-64: "#1eaedb"
  primary: "#33c3f0"
typography:
  header:
    fontFamily: "Verdana, Arial, Helvetica, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.35
  nav:
    fontFamily: "Verdana, Arial, Helvetica, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.35
  h1:
    fontFamily: "\"Helvetica Neue\", Arial, Helvetica, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.2
components:
  btn:
    backgroundColor: "rgb(183, 183, 183)"
    textColor: "#0b0b0c"
    typography:
      fontSize: 16px
      fontWeight: bold
    rounded: 4px
    padding: 0.5625em 1.5em
  card:
    backgroundColor: "rgb(255, 255, 255)"
    padding: 18px
  badge:
    backgroundColor: "rgb(183, 183, 183)"
    textColor: "#0b0b0c"
    typography:
      fontSize: 12px
      fontWeight: bold
    rounded: 1.3em
    padding: 0.5em 1em
  select:
    backgroundColor: "rgb(183, 183, 183)"
    textColor: "#0b0b0c"
    rounded: 4px
  btn-mini-2:
    backgroundColor: "rgb(183, 183, 183)"
    textColor: "#0b0b0c"
    typography:
      fontSize: 16px
      fontWeight: bold
    rounded: 4px
    padding: 0.5625em 1.5em
  btn-small-3:
    backgroundColor: "rgb(183, 183, 183)"
    textColor: "#0b0b0c"
    typography:
      fontSize: 16px
      fontWeight: bold
    rounded: 4px
    padding: 0.5625em 1.5em
  select-mini-2:
    backgroundColor: "rgb(183, 183, 183)"
    textColor: "#0b0b0c"
    rounded: 4px
  select-small-3:
    backgroundColor: "rgb(183, 183, 183)"
    textColor: "#0b0b0c"
    rounded: 4px
  nav-bar:
    backgroundColor: "#eff3f7"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 16px
---

# Mailchimp Content Styleguide

## Overview

Mailchimp Content Styleguide — read from the rendered page in a browser, not from published tokens.

Tokens were read from https://styleguide.mailchimp.com/, not from a published token package: 65 colour tokens and 3 type tokens.

## Colors

65 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `Verdana, Arial, Helvetica, sans-serif`, `"Helvetica Neue", Arial, Helvetica, sans-serif`.

## Components

8 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#33c3f0` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Verdana` across 3 type steps.
- **Component Geometry**: Buttons (`4px`), cards (`8px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
