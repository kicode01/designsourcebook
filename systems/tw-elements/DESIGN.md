---
version: alpha
name: Tailwind Elements
description: "Tailwind-based component kit, Roboto typography and Material-inspired indigo accents"
colors:
  tw-ring-offset-color: "#fff"
  default-value: "#3B71CA"
  gradient-color: "#fbfbfb"
  primary-default: "#3B71CA"
  primary-50: "#F1F5FB"
  primary-100: "#E3EBF7"
  primary-200: "#C7D7F0"
  primary-300: "#ABC2E8"
  primary-400: "#8FAEE0"
  primary-500: "#6590D5"
  primary-600: "#3061AF"
  primary-700: "#285192"
  primary-800: "#204075"
  primary-900: "#183058"
  primary-accent-100: "#d9e4f3"
  primary-accent-200: "#cedbee"
  primary-accent-300: "#386bc0"
  secondary-default: "#9FA6B2"
  secondary-50: "#F8F9F9"
  secondary-100: "#F1F2F4"
  secondary-200: "#E4E6E9"
  secondary-300: "#D6D9DE"
  secondary-400: "#C8CCD3"
  secondary-500: "#B3B9C2"
  secondary-600: "#848D9C"
  secondary-700: "#6B7585"
  secondary-800: "#565D6B"
  secondary-900: "#404650"
  secondary-accent-300: "#979ea9"
  success-default: "#14A44D"
  success-50: "#EAFCF2"
  success-100: "#D6FAE4"
  success-200: "#ACF5C9"
  success-300: "#83F0AE"
  success-400: "#59EA93"
  success-500: "#1CE26B"
  success-600: "#118C42"
  success-700: "#0E7537"
  success-800: "#0C5D2C"
  success-900: "#094621"
  success-accent-300: "#139c49"
  danger-default: "#DC4C64"
  danger-50: "#FCF2F4"
  danger-100: "#FAE5E9"
  danger-200: "#F5CCD3"
  danger-300: "#F0B2BD"
  danger-400: "#EB99A6"
  danger-500: "#E37285"
  danger-600: "#D42A46"
  danger-700: "#B0233A"
  danger-800: "#8D1C2F"
  danger-900: "#6A1523"
  danger-accent-300: "#d1485f"
  warning-default: "#E4A11B"
  warning-50: "#FDF8EF"
  warning-100: "#FBF2DE"
  warning-200: "#F7E4BE"
  warning-300: "#F4D79D"
  warning-400: "#F0C97D"
  warning-500: "#EAB54C"
  warning-600: "#C48A17"
  warning-700: "#A37313"
  warning-800: "#825C0F"
  warning-900: "#62450B"
  warning-accent-300: "#d9991a"
  info-default: "#54B4D3"
  info-50: "#F3FAFC"
  info-100: "#E7F4F9"
  info-200: "#CEE9F2"
  info-300: "#B6DFEC"
  info-400: "#9ED4E6"
  info-500: "#79C4DC"
  info-600: "#34A4CA"
  info-700: "#2B89A8"
  info-800: "#236D86"
  info-900: "#1A5265"
  info-accent-300: "#50abc8"
  surface-default: "#4f4f4f"
  surface-dark: "#424242"
  body-default: "#fff"
  body-dark: "#303030"
  background-color: "#fcfcfd"
  accent-100: "#d9e4f3"
  accent-200: "#cedbee"
  accent-300: "#386bc0"
  flag: "rgb(1, 2, 3)"
  primary: "#d9e4f3"
typography:
  html:
    fontFamily: "Roboto, sans-serif"
    lineHeight: 1.5
components:
  button-primary:
    backgroundColor: "#d9e4f3"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: "#4f4f4f"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#DC4C64"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#4f4f4f"
    textColor: "#ffffff"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#4f4f4f"
    textColor: "#ffffff"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#d9e4f3"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#14A44D"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#4f4f4f"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 16px
---

# Tailwind Elements

## Overview

MDBootstrap Tailwind Elements — tokens imported from tw-elements.

Tokens were read from `tw-elements@2.0.0`, not from a marketing site: 87 colour tokens and 1 type tokens.

## Colors

87 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `Roboto, sans-serif`.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fcfcfd) canvas paired with `#4f4f4f` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#d9e4f3` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Roboto` across 1 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
