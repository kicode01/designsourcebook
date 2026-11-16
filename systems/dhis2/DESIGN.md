---
version: alpha
name: DHIS2 UI
description: "Crisp light (#ffffff) canvas, Roboto typography, #FF4785 brand accent, and 8px corner geometry"
colors:
  blue900: "#093371"
  blue800: "#0d47a1"
  blue700: "#1565c0"
  blue600: "#147cd7"
  blue500: "#2196f3"
  blue400: "#42a5f5"
  blue300: "#90caf9"
  blue200: "#c5e3fc"
  blue100: "#e3f2fd"
  blue050: "#f5fbff"
  teal900: "#00332b"
  teal800: "#004d40"
  teal700: "#00695c"
  teal600: "#00796b"
  teal500: "#00897b"
  teal400: "#009688"
  teal300: "#4db6ac"
  teal200: "#b2dfdb"
  teal100: "#e0f2f1"
  teal050: "#f1f9f9"
  red900: "#330202"
  red800: "#891515"
  red700: "#b71c1c"
  red600: "#c62828"
  red500: "#d32f2f"
  red400: "#f44336"
  red300: "#e57373"
  red200: "#ffcdd2"
  red100: "#ffe5e8"
  red050: "#fff5f6"
  yellow900: "#6f3205"
  yellow800: "#bb460d"
  yellow700: "#e56408"
  yellow600: "#ff8302"
  yellow500: "#ff9302"
  yellow400: "#ffa902"
  yellow300: "#ffc324"
  yellow200: "#ffe082"
  yellow100: "#ffecb3"
  yellow050: "#fff8e1"
  green900: "#103713"
  green800: "#1b5e20"
  green700: "#2e7d32"
  green600: "#388e3c"
  green500: "#43a047"
  green400: "#4caf50"
  green300: "#a5d6a7"
  green200: "#c8e6c9"
  green100: "#e8f5e9"
  green050: "#f4fbf4"
  grey900: "#212934"
  grey800: "#404b5a"
  grey700: "#4a5768"
  grey600: "#6C7787"
  grey500: "#a0adba"
  grey400: "#d5dde5"
  grey300: "#e8edf2"
  grey200: "#f3f5f7"
  grey100: "#f8f9fa"
  grey050: "#fbfcfd"
  white: "#ffffff"
  blue: "#0080d4"
  dark: "#212225"
  background-color: "#276696"
  color-primary: "#FF4785"
  primary: "#FF4785"
typography:
  heading-2xl:
    fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif"
    fontSize: 28px
    fontWeight: 500
    lineHeight: 1.25
  heading-xl:
    fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif"
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.3
  heading-lg:
    fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif"
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
  body-md:
    fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
  body-sm:
    fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.38
  caption-xs:
    fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
components:
  button-primary:
    backgroundColor: "#FF4785"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f5fbff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f5fbff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#FF4785"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f5fbff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# DHIS2 UI

## Overview

DHIS2 UI — tokens read from https://github.com/dhis2/ui.

Tokens were read from the project's own repository, not from a marketing site: 66 colour tokens and 0 type tokens.

## Colors

66 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Dark (#276696) canvas paired with `#276696` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#FF4785` with `#000000` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Roboto` across 6 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
