---
version: alpha
name: Orbit
description: "Kiwi.com Orbit — an open-source design system built for travel projects."
colors:
  dark-active: "#003E70"
  dark-hover: "#004F8F"
  darker: "#003866"
  light-active: "#C7E4FA"
  light-hover: "#DEF0FC"
  normal: "#0070C8"
  normal-active: "#01508E"
  normal-hover: "#0161AC"
  basic: "#D7331C"
  medium: "#3B1EB0"
  facebook: "#3B5998"
  facebook-hover: "#385490"
  facebook-active: "#354F88"
  navbar: "#1B3249"
  tab-bundle-basic-background-hover: "rgba(215, 51, 28, 0.08)"
  tab-bundle-basic-background-active: "rgba(215, 51, 28, 0.12)"
  tab-bundle-medium-background-hover: "rgba(59, 30, 176, 0.08)"
  tab-bundle-medium-background-active: "rgba(59, 30, 176, 0.12)"
  primary: "#0070C8"
typography:
  heading-display-font-size:
    fontSize: 40px
  heading-display-subtitle-font-size:
    fontSize: 22px
  heading-title0-font-size:
    fontSize: 28px
  heading-title1-font-size:
    fontSize: 24px
  heading-title2-font-size:
    fontSize: 20px
components:
  button-primary:
    backgroundColor: "#0070C8"
    textColor: "#ffffff"
    rounded: 6px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 6px
    padding: 10px 18px
  input-default:
    backgroundColor: "#DEF0FC"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#DEF0FC"
    textColor: "#0b0b0c"
    rounded: 10px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#0070C8"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#DEF0FC"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 16px
---

# Orbit

## Overview

Kiwi.com Orbit — an open-source design system built for travel projects.

Tokens were read from `@kiwicom/orbit-design-tokens@11.0.0`, not from a marketing site: 19 colour tokens and 5 type tokens.

## Colors

19 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Dark (#1B3249) canvas paired with `#1B3249` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#0070C8` with `#f7f7f8` label contrast.
- **Typographic Voice**: Headings and UI controls set in `system-ui` across 5 type steps.
- **Component Geometry**: Buttons (`6px`), cards (`10px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
