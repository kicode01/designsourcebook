---
version: alpha
name: Rambler
description: "Crisp light (#ffffff) canvas, Inter typography, #315efb brand accent, and 8px corner geometry"
colors:
  grey-default: "#ccc"
  grey-disabled: "#dde0e8"
  grey-background: "#f5f7f8"
  grey-light-background: "#eef2f4"
  grey-outline: "#b0b4c2"
  grey-field-outline: "#dde0e8"
  grey-icon-background: "#f3f4f7"
  grey-placeholder: "#a4a9b8"
  grey-field-icon: "#B0B4C2"
  grey-disabled-text: "#afb5c9"
  primary: "#315efb"
  primary-dark: "#274bc8"
  danger: "#ff564e"
  success: "#28bc00"
  warn: "#ffc000"
  black: "#000"
  full-dark: "#000"
  blue-dark: "#343b4c"
  blue-light: "#d9f3ff"
  arrow-blue-dark: "#6674a6"
  snackbar-blue-dark: "#3d4454"
  purple-deep: "#3e217d"
  disabled: "#dde0e8"
  background: "#f5f7f8"
  light-background: "#eef2f4"
  outline: "#b0b4c2"
  field-outline: "#dde0e8"
  icon-background: "#f3f4f7"
  placeholder: "#a4a9b8"
  field-icon: "#B0B4C2"
  disabled-text: "#afb5c9"
  colors-profile-border: "#ffffff"
  colors-default: "#8d96b2"
  badge-border: "#dcdfe7"
  badge-color: "#c6cad8"
  colors-background: "#dcdfe7"
  profile-border: "#ffffff"
  thumb: "#dcdfe7"
  color: "#c6cad8"
  character-counter-warn-color: "#ffc000"
  character-counter-error-color: "#ff564e"
typography:
  display-xl:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
  heading-lg:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  heading-md:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.42
  caption:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.35
components:
  button-primary:
    backgroundColor: "#315efb"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ff564e"
    textColor: "#0b0b0c"
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
    backgroundColor: "#315efb"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#28bc00"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Rambler

## Overview

Rambler — tokens read from https://github.com/rambler-digital-solutions/rambler-ui.

Tokens were read from the project's own repository, not from a marketing site: 41 colour tokens and 0 type tokens.

## Colors

41 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#315efb` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Inter` across 6 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
