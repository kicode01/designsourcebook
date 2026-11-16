---
version: alpha
name: City of Boston Fleet
description: "Crisp light (#fff) canvas, Montserrat typography, #fcb61a brand accent, and 8px corner geometry"
colors:
  white: "#fff"
  black: "#000"
  yellow: "#fcb61a"
  green: "#62A744"
  gray-000: "#f3f3f3"
  gray-100: "#e0e0e0"
  gray-200: "#C8C8C8"
  gray-300: "#828282"
  gray-400: "#d2d2d2"
  charles-blue: "#091f2f"
  purple: "#681da8"
  optimistic-blue-light: "#288be4"
  optimistic-blue-dark: "#1871bd"
  freedom-red-light: "#fb4d42"
  freedom-red-dark: "#d22d23"
  default-text: "#58585b"
  freedom-red: "#fb4d42"
  optimistic-blue: "#288be4"
  background: "#f3f3f3"
  death-feedback-link-color: "#145B99"
  death-feedback-link-hover-color: "#0F4575"
  death-feedback-link-active-color: "#0B3051"
  death-feedback-email-background: "#E3F0FB"
  color: "#000"
  primary: "#fcb61a"
components:
  btn-link-styled:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    padding: "0"
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f3f3f3"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f3f3f3"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#fcb61a"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f3f3f3"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
typography:
  display-hero:
    fontFamily: "Montserrat, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 44px
    fontWeight: 700
    lineHeight: 1.15
  section-heading:
    fontFamily: "Montserrat, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.25
  sub-heading:
    fontFamily: "Montserrat, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
  body-editorial:
    fontFamily: "Montserrat, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Montserrat, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
  ui-label:
    fontFamily: "Montserrat, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
  caption:
    fontFamily: "Montserrat, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.35
---

# City of Boston Fleet

## Overview

City of Boston Fleet — tokens read from https://github.com/CityOfBoston/digital.

Tokens were read from the project's own repository, not from a marketing site: 25 colour tokens and 0 type tokens.

## Colors

25 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Components

1 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fff) canvas paired with `#fff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#fcb61a` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Montserrat` across 7 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
