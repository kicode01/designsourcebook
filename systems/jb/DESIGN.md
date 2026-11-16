---
version: alpha
name: JB Design System
description: "Crisp light (#f6f9fc) canvas, dana typography, #ff8300 brand accent, and 4px corner geometry"
colors:
  tree-node-background-hover: "#FFFFFF"
  sb-sidebar-bottom-card-background: "#FFFFFF"
  bg-canvas: "#f6f9fc"
  canvas-text: "#0e1218"
  main-bg: "#ecf2fc"
  main-text: "#5c6570"
  link-text: "#2e3338"
  css-border-7: "rgba(38, 74, 115, 0.15)"
  css-surface-8: "rgba(125, 82, 255, 0.15)"
  css-surface-9: "#eef4f9"
  css-color-10: "#7d52ff"
  css-surface-11: "rgba(125, 82, 255, 0.14)"
  css-surface-12: "#dbecff"
  css-surface-13: "#a1a7b0"
  css-border-14: "#646464"
  css-color-15: "#ff8300"
  css-color-16: "#2a0481"
  css-surface-17: "rgba(125, 82, 255, 0.07)"
  css-color-18: "#571fff"
  primary: "#ff8300"
typography:
  header:
    fontFamily: "dana, tahoma, Arial, Helvetica, sans-serif"
    fontSize: 16px
    fontWeight: 400
  nav:
    fontFamily: "dana, tahoma, Arial, Helvetica, sans-serif"
    fontSize: 16px
    fontWeight: 400
  h1:
    fontFamily: "dana, tahoma, Arial, Helvetica, sans-serif"
    fontSize: 32px
    fontWeight: 400
  h2:
    fontFamily: "dana, tahoma, Arial, Helvetica, sans-serif"
    fontSize: 24px
    fontWeight: 400
  button:
    fontFamily: "dana, tahoma, Arial, Helvetica, sans-serif"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1
components:
  button:
    textColor: "#5c6570"
    rounded: 4px
    padding: 0px 9px
  button-2:
    textColor: "#0e1218"
    rounded: 4px
    padding: 5px 6px 4px 8px
  input:
    textColor: "#0e1218"
  card-surface:
    backgroundColor: "#f6f9fc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#ff8300"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f6f9fc"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 16px
---

# JB Design System

## Overview

JB Design System — read from the rendered page in a browser, not from published tokens.

Tokens were read from https://javadbat.github.io/design-system, not from a published token package: 20 colour tokens and 5 type tokens.

## Colors

20 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `dana, tahoma, Arial, Helvetica, sans-serif`.

## Components

3 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#f6f9fc) canvas paired with `#f6f9fc` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#ff8300` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `dana` across 5 type steps.
- **Component Geometry**: Buttons (`4px`), cards (`8px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
