---
version: alpha
name: VTEX Styleguide
description: "Crisp light (#FFFFFF) canvas, system-ui typography, #00BBD4 brand accent, and 8px corner geometry"
colors:
  default-color-hex: "#FFFFFF"
  hex: "#FFFFFF"
  input-value: "#000000"
  alice-blue: "#eef3f7"
  blue: "#134cd8"
  gray: "#979899"
  light-gray: "#f2f4f5"
  hover-action-secondary: "#DBE9FD"
  c-on-base: "#3f3f40"
  muted-1: "#727273"
  muted-2: "#979899"
  muted-3: "#cacbcc"
  muted-4: "#e3e4e6"
  red: "#ff4c4c"
  white: "#ffffff"
  near-white: "#f0f0f0"
  near-black: "#2e2e2e"
  light-blue: "#dbe9fd"
  dark-blue: "#0c389f"
  dark-gray: "#727273"
  label-style-color: "#828282"
  color: "#828282"
  selected-row-background: "#dbe9fd"
  button-color: "#00BBD4"
  color-link: "#00BBD4"
  color-link-hover: "#0090a3"
  link: "#00BBD4"
  link-hover: "#0090a3"
  primary: "#00BBD4"
typography:
  title-font-size:
    fontSize: 20px
  font-size:
    fontSize: 16px
components:
  button-primary:
    backgroundColor: "#00BBD4"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#00BBD4"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# VTEX Styleguide

## Overview

VTEX Styleguide — tokens read from https://github.com/vtex/styleguide.

Tokens were read from the project's own repository, not from a marketing site: 29 colour tokens and 2 type tokens.

## Colors

29 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#FFFFFF) canvas paired with `#FFFFFF` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#00BBD4` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `system-ui` across 2 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
