---
version: alpha
name: Foundation
description: undefined
colors:
  primary-color: "#1779ba"
  secondary-color: "#767676"
  success-color: "#3adb76"
  warning-color: "#ffae00"
  alert-color: "#cc4b37"
  primary: "#1779ba"
  secondary: "#767676"
  success: "#3adb76"
  warning: "#ffae00"
  alert: "#cc4b37"
  light-gray: "#e6e6e6"
  medium-gray: "#cacaca"
  dark-gray: "#8a8a8a"
  black: "#0a0a0a"
  white: "#fefefe"
typography:
  badge-font-size:
    fontSize: 0.6rem
  dropdown-font-size:
    fontSize: 1rem
  label-font-size:
    fontSize: 0.8rem
  font-size:
    fontSize: "1rem,
  $switch-height: 2rem,
  $paddle-offset: 0.25rem
) {

  $switch-width: $switch-height * 2"
  stat-font-size:
    fontSize: "2.5rem !default"
  font-size-temp:
    fontSize: 1rem
components:
  card:
    backgroundColor: "#fefefe"
    textColor: "#0a0a0a"
    rounded: "0"
  tabs:
    backgroundColor: "#fefefe"
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
  card-divider-2:
    backgroundColor: "#e6e6e6"
    padding: 1rem
  tabs-content-2:
    backgroundColor: "#fefefe"
    textColor: "#0a0a0a"
  input-group-label:
    backgroundColor: "#e6e6e6"
    textColor: "#0a0a0a"
    padding: 0 1rem
---

# Foundation

## Overview

undefined

Tokens were read from `foundation-sites@6.9.0`, not from a marketing site: 15 colour tokens and 6 type tokens.

## Colors

15 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Components

9 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.
