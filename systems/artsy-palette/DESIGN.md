---
version: alpha
name: Artsy Palette
description: "Crisp light (#FFFFFF) canvas, ll-unica77 typography, #1023D7 brand accent, and 8px corner geometry"
colors:
  mono100: "#000000"
  mono60: "#707070"
  mono30: "#C2C2C2"
  mono15: "#D8D8D8"
  mono10: "#E7E7E7"
  mono5: "#F7F7F7"
  mono0: "#FFFFFF"
  blue200: "#050e3e"
  blue150: "#0A1C7B"
  blue100: "#1023D7"
  brand: "#1023D7"
  blue15: "#cacdec"
  blue10: "#E6E7F5"
  green150: "#003728"
  green100: "#00674A"
  green10: "#E8EFE2"
  yellow150: "#A47A0F"
  yellow100: "#E2B929"
  yellow10: "#FFFAE9"
  orange150: "#A8501C"
  orange100: "#DA6722"
  orange10: "#FCF7F3"
  red150: "#510B0B"
  red100: "#D71023"
  red50: "#FF1023"
  red10: "#FEF2EF"
  background: "#f0f0f0"
  primary: "#1023D7"
typography:
  sans:
    fontFamily: "ll-unica77, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
  font-size:
    fontSize: 50px
components:
  button-primary:
    backgroundColor: "#1023D7"
    textColor: "#ffffff"
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
    backgroundColor: "#F7F7F7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#F7F7F7"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#1023D7"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#F7F7F7"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Artsy Palette

## Overview

Artsy Palette — tokens read from https://github.com/artsy/palette.

Tokens were read from the project's own repository, not from a marketing site: 28 colour tokens and 0 type tokens.

## Colors

28 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#FFFFFF) canvas paired with `#FFFFFF` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#1023D7` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `ll-unica77` across 2 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
