---
version: alpha
name: New York State Design System
description: "Crisp light (#ffffff) canvas, Public Sans typography, #f6f6f6 brand accent, and 8px corner geometry"
colors:
  10: "#f6f6f6"
  50: "#ededed"
  100: "#d0d0ce"
  200: "#bec0c1"
  300: "#a7a9ab"
  400: "#909395"
  500: "#797c7f"
  600: "#62666a"
  700: "#4a4d4f"
  800: "#323435"
  900: "#1b1b1b"
  black: "#000000"
  white: "#ffffff"
  transparent: "#ffffff00"
  color: "#0000001a"
  primary: "#f6f6f6"
typography:
  display-xl:
    fontFamily: "\"Public Sans\", \"Proxima Nova\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.2
  heading-lg:
    fontFamily: "\"Public Sans\", \"Proxima Nova\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.25
  heading-md:
    fontFamily: "\"Public Sans\", \"Proxima Nova\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
  heading-sm:
    fontFamily: "\"Public Sans\", \"Proxima Nova\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "\"Public Sans\", \"Proxima Nova\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "\"Public Sans\", \"Proxima Nova\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.42
  caption:
    fontFamily: "\"Public Sans\", \"Proxima Nova\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.35
components:
  button-primary:
    backgroundColor: "#f6f6f6"
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
    backgroundColor: "#f6f6f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f6f6f6"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#f6f6f6"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f6f6f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# New York State Design System

## Overview

New York State Design System — tokens read from https://github.com/ITS-HCD/nysds.

Tokens were read from the project's own repository, not from a marketing site: 15 colour tokens and 0 type tokens.

## Colors

15 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#f6f6f6` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Public Sans` across 7 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
