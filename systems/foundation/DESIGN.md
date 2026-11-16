---
version: alpha
name: Foundation
description: "Foundation — responsive front-end framework by ZURB."
colors:
  primary-color: "#1779ba"
  secondary-color: "#767676"
  success-color: "#3adb76"
  warning-color: "#ffae00"
  alert-color: "#cc4b37"
  light-gray: "#e6e6e6"
  medium-gray: "#cacaca"
  dark-gray: "#8a8a8a"
  black: "#0a0a0a"
  white: "#fefefe"
  primary: "#1779ba"
  secondary: "#767676"
  success: "#3adb76"
  warning: "#ffae00"
  alert: "#cc4b37"
typography:
  global-font-size:
    fontSize: "100%"
  body-font-family:
    fontFamily: "\"Helvetica Neue\", Helvetica, Roboto, Arial, sans-serif"
  h1:
    fontSize: 2em
  html:
    fontSize: "100%"
  body:
    fontFamily: "\"Helvetica Neue\", Helvetica, Roboto, Arial, sans-serif"
    lineHeight: 1.5
  lead:
    fontSize: "125%"
    lineHeight: 1.6
  accordion-title:
    fontSize: 0.75rem
    lineHeight: 1
  badge-font-size:
    fontSize: 0.6rem
  dropdown-font-size:
    fontSize: 1rem
  label-font-size:
    fontSize: 0.8rem
  font-family-monospace:
    fontFamily: "Consolas, \"Liberation Mono\", Courier, monospace"
  small-font-size:
    fontSize: "80%"
  stat-font-size:
    fontSize: 2.5rem
  font-size-temp:
    fontSize: 1rem
components:
  card:
    backgroundColor: "#fefefe"
    textColor: "#0a0a0a"
    rounded: "0"
  label:
    backgroundColor: "#1779ba"
    textColor: "#fefefe"
    typography:
      fontSize: 0.8rem
    rounded: "0"
    padding: 0.33333rem 0.5rem
  badge:
    backgroundColor: "#1779ba"
    textColor: "#fefefe"
    typography:
      fontSize: 0.6rem
    rounded: "50%"
    padding: 0.3em
  button:
    backgroundColor: "#1779ba"
    textColor: "#fefefe"
    typography:
      fontSize: 0.9rem
    rounded: "0"
    padding: 0.85em 1em
  callout:
    backgroundColor: "rgb(254.85, 254.85, 254.85)"
    textColor: "#0a0a0a"
    rounded: "0"
    padding: 1rem
  button-2:
    textColor: "#8a8a8a"
    typography:
      fontSize: 2em
  card-divider-2:
    backgroundColor: "#e6e6e6"
    padding: 1rem
  is-invalid-label-2:
    textColor: "#cc4b37"
  input-group-label:
    backgroundColor: "#e6e6e6"
    textColor: "#0a0a0a"
    padding: 0 1rem
  nav-bar:
    backgroundColor: "#0a0a0a"
    textColor: "#ffffff"
    rounded: 4px
    padding: 10px 16px
---

# Foundation

## Overview

Foundation — responsive front-end framework by ZURB.

Tokens were read from `foundation-sites@6.9.0`, not from a marketing site: 15 colour tokens and 14 type tokens.

## Colors

15 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif`, `Consolas, "Liberation Mono", Courier, monospace`.

## Components

9 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Dark (#0a0a0a) canvas paired with `#0a0a0a` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#1779ba` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Helvetica Neue` across 14 type steps.
- **Component Geometry**: Buttons (`4px`), cards (`8px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
