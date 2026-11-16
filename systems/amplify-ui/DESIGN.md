---
version: alpha
name: Amplify UI
description: "Crisp light (#FFFFFF) canvas, Inter typography, #232f3e brand accent, and 8px corner geometry"
colors:
  synthwave-theme: "#fbc6ef"
  terminal: "#C7EFCA"
  amplify-colors-font-primary: "#232f3e"
  amplify-colors-font-tertiary: "#545b64"
  amplify-colors-font-hover: "#000"
  amplify-ui-components-button-primary-background-colo: "#0057ff"
  amplify-ui-components-button-primary-hover-backgroun: "#4d89fc"
  default-carousel-color-active: "#a1a1a1"
  default-carousel-color-inactive: "#d8d8d8"
  background-color: "#0175C2"
  theme-color: "#0175C2"
  fill-style: "#0D1A26"
  preview-text-color: "#0D1A26"
  preview-background-color: "#FFFFFF"
  preview-link-color: "#5C6670"
  color: "#4668F2"
  color-black: "#000"
  color-grey: "#a1a1a1"
  color-light-grey: "#e8e8e8"
  color-light-grey-2: "#d8d8d8"
  color-white: "#fff"
  font-color: "#000000"
  primary: "#232f3e"
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
    backgroundColor: "#232f3e"
    textColor: "#ffffff"
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
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#232f3e"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Amplify UI

## Overview

AWS Amplify UI — tokens read from https://github.com/aws-amplify/amplify-ui.

Tokens were read from the project's own repository, not from a marketing site: 23 colour tokens and 0 type tokens.

## Colors

23 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Dark (#0175C2) canvas paired with `#0175C2` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#232f3e` with `#f7f7f8` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Inter` across 6 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
