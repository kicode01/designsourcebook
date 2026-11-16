---
version: alpha
name: Buildit Gravity
description: "Buildit Gravity — UI pattern library and design tokens by Wipro Digital Buildit."
colors:
  100: "#ffffff"
  neutral: "#000000"
  neutral-alt: "#000000"
  accent: "#000000"
  accent-success: "#000000"
  accent-attention: "#000000"
  accent-danger: "#000000"
  neutral-subtle: "#c3c7ce"
  neutral-emphasis: "#ffffff"
  control: "#ebecef"
  control-alt: "#b433e2"
  control-emphasis: "#ff3f00"
  control-active: "#ff663b"
  control-disabled: "#878e9d"
  shade-80: "#001333"
  shade-60: "#002666"
  shade-40: "#003a99"
  shade-20: "#004dcc"
  base: "#0060ff"
  tint-20: "#4382fb"
  tint-40: "#74a2fc"
  tint-60: "#a4c1fd"
  tint-80: "#d2e0fe"
  tint-92: "#d8e8ff"
  tint-95: "#e5efff"
  tint-97: "#f2f7ff"
  black: "#000000"
  white: "#ffffff"
  shade-7: "#000a0e"
  very-dark: "#1a1a1a"
  darker: "#404040"
  medium-dark: "#7f7f7f"
  medium: "#999999"
  medium-light: "#cccccc"
  very-light: "#f1f1f1"
  095: "#f1f1f1"
  090: "#e6e6e6"
  080: "#cccccc"
  070: "#b3b3b3"
  060: "#999999"
  050: "#7f7f7f"
  040: "#666666"
  025: "#404040"
  015: "#262626"
  010: "#1a1a1a"
  000: "#000000"
  tint-7: "#e7f2fb"
  dark: "#4d4848"
  light: "#e6e6e6"
  navy-blue: "#002d72"
  apple-green: "#6cc24a"
  sunny-yellow: "#f3d54e"
  ruby-red: "#ef3340"
  sky-blue: "#009cde"
  grav-co-grp-a-neutral: "#fff"
  grav-co-grp-a-neutral-alt: "#f2f7ff"
  grav-co-grp-a-accent: "#fff"
  grav-co-grp-a-accent-success: "#ccf4e1"
  grav-co-grp-a-accent-attention: "#ffedd1"
  grav-co-grp-a-accent-danger: "#fff"
  grav-co-grp-b-neutral: "#000"
  grav-co-grp-b-neutral-subtle: "#061434"
  grav-co-grp-b-neutral-emphasis: "#000"
  grav-co-grp-b-control: "#000"
  grav-co-grp-b-control-alt: "#8100af"
  grav-co-grp-b-control-emphasis: "#0060ff"
  grav-co-grp-b-control-active: "#0000c8"
  grav-co-grp-b-control-disabled: "#697184"
  grav-co-grp-b-accent: "#0060ff"
  grav-co-grp-b-accent-success: "#000"
  grav-co-grp-b-accent-attention: "#000"
  grav-co-grp-b-accent-danger: "#cc1e42"
  primary: "#0060ff"
typography:
  grav-font-size-smallest-viewport:
    fontSize: 1rem
  grav-font-size-largest-viewport:
    fontSize: 1.25rem
  grav-font-family-primary:
    fontFamily: "\"Helvetica Neue\""
  grav-font-family-mono:
    fontFamily: "\"Wipro Akkurat Mono TT\""
components:
  button-primary:
    backgroundColor: "#0060ff"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#cc1e42"
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
    backgroundColor: "#0060ff"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Buildit Gravity

## Overview

Buildit Gravity — UI pattern library and design tokens by Wipro Digital Buildit.

Tokens were read from `@buildit/gravity-ui-web@3.4.0`, not from a marketing site: 73 colour tokens and 4 type tokens.

## Colors

73 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `"Helvetica Neue"`, `"Wipro Akkurat Mono TT"`.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#0060ff` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Helvetica Neue` across 4 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
