---
version: alpha
name: Okta Odyssey Design System
description: "Crisp light (#ffffff) canvas, Inter typography, #80c7ca brand accent, and 8px corner geometry"
colors:
  50: "#0f1217"
  100: "#2b2e34"
  200: "#44484e"
  300: "#656970"
  400: "#7d8088"
  500: "#8f929a"
  600: "#a7abb3"
  700: "#c0c4cc"
  800: "#d7dbe3"
  900: "#eaeff7"
  bg-canvas: "#ffffff"
  bg-surface: "#f0f1f2"
  text-primary: "#0f1217"
  lighter: "#212947"
  primary: "#80c7ca"
  main: "#536adf"
  darker: "#556ce1"
  text: "#a2b7fe"
  heading: "#d7e0fe"
  highlight: "#2c3762"
  danger: "#993525"
  success: "#336845"
  warning: "#735529"
  white: "#191c22"
  inverse: "#ffffff"
  secondary-hue-accent-three300: "#80c7ca"
  secondary-hue-accent-three600: "#096256"
  secondary-hue-accent-three700: "#004650"
  hue-accent-three300: "#80c7ca"
  hue-accent-three600: "#096256"
  hue-accent-three700: "#004650"
  black-font-color: "#000000"
  white-font-color: "#FFFFFF"
  hue-neutral-white: "#f0f1f2"
  typography-color-body: "#123456"
  design-tokens-override-hue-neutral-white: "#f0f1f2"
  design-tokens-override-palette-neutral-surface: "#fafafa"
  palette-neutral-surface: "#f0f1f2"
  font-color: "#FFFFFF"
  foreground-hex: "#ffffff"
  as-formatted-string: "rgb(10, 20, 30)"
typography:
  font-sans:
    fontFamily: Inter
  font-mono:
    fontFamily: Roboto Mono
components:
  button-primary:
    backgroundColor: "#80c7ca"
    textColor: "#0f1217"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0f1217"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#993525"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f0f1f2"
    textColor: "#0f1217"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f0f1f2"
    textColor: "#0f1217"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#80c7ca"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#336845"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f0f1f2"
    textColor: "#0f1217"
    rounded: 8px
    padding: 10px 16px
---

# Okta Odyssey Design System

## Overview

Okta Odyssey Design System — tokens read from https://github.com/okta/odyssey.

Tokens were read from the project's own repository, not from a marketing site: 40 colour tokens and 0 type tokens.

## Colors

40 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Dark (#ff0000) canvas paired with `#000000` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#80c7ca` with `#000000` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Inter` across 2 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
