---
version: alpha
name: West Midlands Network Design System
description: "Crisp light (#ffffff) canvas, system-ui typography, #3c1053 brand accent, and 8px corner geometry"
colors:
  white: "#ffffff"
  black: "#000000"
  primary: "#3c1053"
  secondary: "#9d5baf"
  bus: "#ea0029"
  metro: "#0075c9"
  railway: "#e07709"
  sus-travel: "#658d1b"
  roads: "#df1683"
  text: "#080607"
  cta: "#1d7bbf"
  error: "#d4351c"
  warning: "#b75e00"
  success: "#00703c"
  information: "#84329b"
  disable: "#676869"
  planned-disruption: "#ffdd00"
  border: "#979797"
  dark-grey: "#2b2b2b"
typography:
  base-font-size:
    fontSize: 16px
components:
  button-primary:
    backgroundColor: "#3c1053"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#d4351c"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#3c1053"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#00703c"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# West Midlands Network Design System

## Overview

West Midlands Network Design System — tokens read from https://github.com/wmcadigital/wmn-design-system.

Tokens were read from the project's own repository, not from a marketing site: 19 colour tokens and 2 type tokens.

## Colors

19 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#3c1053` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `system-ui` across 1 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
