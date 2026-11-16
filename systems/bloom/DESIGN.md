---
version: alpha
name: Appear Here Styleguide
description: "Crisp light (#eee) canvas, system-ui typography, rgb(234, 155, 82) brand accent, and 8px corner geometry"
colors:
  color-white: "rgb(255, 255, 255)"
  color-black: "rgb(25, 25, 25)"
  color-gold: "rgb(186, 160, 130)"
  color-gold-light: "rgb(219, 189, 154)"
  color-blue: "rgb(25, 103, 158)"
  color-red: "rgb(213, 84, 68)"
  color-green: "rgb(72, 213, 108)"
  color-orange: "rgb(234, 155, 82)"
  color-yellow: "rgb(236, 180, 74)"
  color-focus-ring: "rgb(91, 157, 217)"
  color-red-light: "rgb(236, 94, 77)"
  color-blue-light: "rgb(41, 125, 184)"
  color-grey-lightest: "rgb(245, 245, 245)"
  color-grey-lighter: "rgb(221, 221, 221)"
  color-grey-light: "rgb(190, 190, 190)"
  color-grey: "rgb(139, 139, 139)"
  color-grey-dark: "rgb(90, 90, 90)"
  color-grey-darker: "rgb(56, 56, 56)"
  color-grey-darkest: "rgb(35, 35, 35)"
  facebook-blue: "rgb(59, 89, 152)"
  twitter-blue: "rgb(29, 161, 242)"
  pintrest-red: "rgb(190, 9, 28)"
  background-color: "#eee"
  primary: "rgb(234, 155, 82)"
typography:
  fontsize-large-v:
    fontSize: 2.75rem
  fontsize-large-iv:
    fontSize: 2rem
  fontsize-large-iii:
    fontSize: 1.75rem
  fontsize-large-ii:
    fontSize: 1.5rem
  fontsize-large-i:
    fontSize: 1.1875rem
  fontsize-regular:
    fontSize: 1rem
  fontsize-small-i:
    fontSize: 0.875rem
  fontsize-small-ii:
    fontSize: 0.6875rem
components:
  button-primary:
    backgroundColor: "rgb(234, 155, 82)"
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
    backgroundColor: "#eee"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#eee"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "rgb(234, 155, 82)"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#eee"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Appear Here Styleguide

## Overview

Appear Here Styleguide — tokens read from https://github.com/appearhere/bloom.

Tokens were read from the project's own repository, not from a marketing site: 24 colour tokens and 8 type tokens.

## Colors

24 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#eee) canvas paired with `#eee` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `rgb(234, 155, 82)` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `system-ui` across 8 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
