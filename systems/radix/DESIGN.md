---
version: alpha
name: Radix
description: "WorkOS Radix — open-source colour system and unstyled component primitives."
colors:
  amber-1: "#16120c"
  amber-9: "#ffc53d"
  blue-5: "#004074"
  bronze-1: "#141110"
  bronze-9: "#a18072"
  brown-5: "#3e3128"
  crimson-1: "#191114"
  crimson-9: "#e93d82"
  cyan-5: "#004558"
  gold-1: "#121211"
  gold-9: "#978365"
  grass-5: "#25482d"
  gray-1: "#111111"
  gray-9: "#6e6e6e"
  green-5: "#174933"
  gray1: "#111111"
  gray9: "#6e6e6e"
  mauve5: "#323035"
  slate1: "#111113"
  slate9: "#696e77"
  sage5: "#2e3130"
  olive1: "#111210"
  olive9: "#687066"
  sand5: "#31312e"
  tomato1: "#181111"
  tomato9: "#e54d2e"
  red5: "#611623"
  ruby1: "#191113"
  ruby9: "#e54666"
  crimson5: "#5c1839"
  pink1: "#191117"
  pink9: "#d6409f"
  plum5: "#512454"
  purple1: "#18111b"
  purple9: "#8e4ec6"
  violet5: "#3c2e69"
  iris1: "#13131e"
  iris9: "#5b5bd6"
  indigo5: "#253974"
  blue1: "#0d1520"
  blue9: "#0090ff"
  cyan5: "#004558"
  teal1: "#0d1514"
  teal9: "#12a594"
  jade5: "#114837"
  green1: "#0e1512"
  green9: "#30a46c"
  grass5: "#25482d"
  brown1: "#12110f"
  brown9: "#ad7f58"
  bronze5: "#3b3330"
  gold1: "#121211"
  gold9: "#978365"
  sky5: "#154467"
  mint1: "#0e1515"
  mint9: "#86ead4"
  lime5: "#334423"
  yellow1: "#14120b"
  yellow9: "#ffe629"
  amber5: "#4d3000"
  orange1: "#17120e"
  orange9: "#f76b15"
  indigo-5: "#253974"
  iris-1: "#13131e"
  iris-9: "#5b5bd6"
  jade-5: "#114837"
  lime-1: "#11130c"
  lime-9: "#bdee63"
  mauve-5: "#323035"
  mint-1: "#0e1515"
  mint-9: "#86ead4"
  olive-5: "#2f312e"
  orange-1: "#17120e"
  orange-9: "#f76b15"
  pink-5: "#591c47"
  plum-1: "#181118"
  plum-9: "#ab4aba"
  purple-5: "#48295c"
  red-1: "#191111"
  red-9: "#e5484d"
  ruby-5: "#5e1a2e"
  sage-1: "#101211"
  sage-9: "#63706b"
  sand-5: "#31312e"
  sky-1: "#0d141f"
  sky-9: "#7ce2fe"
  slate-5: "#2e3135"
  teal-1: "#0d1514"
  teal-9: "#12a594"
  tomato-5: "#5e1c16"
  primary: "#ffc53d"
typography:
  default-font-family:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI (Custom)\", Roboto, \"Helvetica Neue\", \"Open Sans (Custom)\", system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\""
  code-font-family:
    fontFamily: "Menlo, \"Consolas (Custom)\", \"Bitstream Vera Sans Mono\", monospace, \"Apple Color Emoji\", \"Segoe UI Emoji\""
  em-font-family:
    fontFamily: "\"Times New Roman\", Times, serif"
  quote-font-family:
    fontFamily: "\"Times New Roman\", Times, serif"
components:
  button-primary:
    backgroundColor: "#ffc53d"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#f7f7f8"
    rounded: 6px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#e93d82"
    textColor: "#000000"
    rounded: 6px
    padding: 10px 18px
  input-default:
    backgroundColor: "#141110"
    textColor: "#f7f7f8"
    rounded: 6px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#141110"
    textColor: "#f7f7f8"
    rounded: 10px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#ffc53d"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#141110"
    textColor: "#f7f7f8"
    rounded: 6px
    padding: 10px 16px
---

# Radix

## Overview

WorkOS Radix — open-source colour system and unstyled component primitives.

Tokens were read from `@radix-ui/colors@3.0.0`, not from a marketing site: 91 colour tokens and 0 type tokens.

## Colors

91 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Dark (#111111) canvas paired with `#111111` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#ffc53d` with `#000000` label contrast.
- **Typographic Voice**: Headings and UI controls set in `-apple-system` across 4 type steps.
- **Component Geometry**: Buttons (`6px`), cards (`10px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
