---
version: alpha
name: Aalto University
description: "Crisp light (#fafafa) canvas, inter typography, #ff8d4f brand accent, and 8px corner geometry"
colors:
  1: "#ffffff"
  2: "#fafafa"
  3: "#f2f2f2"
  4: "#e0e0e0"
  5: "#505050"
  6: "#212121"
  7: "#1c1c1c"
  8: "#151515"
  9: "#000000"
  background: "#ffffff"
  aalto-col-surface: "#f2f2f2"
  background-tint: "#fafafa"
  surface: "#fd6360"
  aalto-red-1: "#fd6360"
  aalto-red-2: "#501f1e"
  aalto-yellow-1: "#f7e159"
  aalto-yellow-2: "#6c6227"
  aalto-blue-1: "#46a5ff"
  aalto-blue-2: "#183856"
  eng-1: "#dc6ade"
  eng-2: "#472247"
  elec-1: "#a987ff"
  elec-2: "#392d56"
  chem-1: "#5dd089"
  chem-2: "#255236"
  arts-1: "#ffc341"
  arts-2: "#6c531b"
  biz-1: "#9bd84c"
  biz-2: "#3f581f"
  sci-1: "#ff8d4f"
  sci-2: "#5f341d"
  white-tint-1: "#e5e5e5"
  white-tint-2: "#d9d9d9"
  white-tint-3: "#cccccc"
  white-tint-4: "#999999"
  black-tint-1: "#2c2c2c"
  black-tint-2: "#383838"
  black-tint-3: "#444444"
  black-tint-4: "#737373"
  aalto-red-tint-1: "#e45956"
  aalto-red-tint-2: "#d75452"
  aalto-red-tint-3: "#ca4f4d"
  aalto-red-tint-4: "#983b3a"
  aalto-yellow-tint-1: "#deca50"
  aalto-yellow-tint-2: "#d2bf4c"
  aalto-yellow-tint-3: "#c6b447"
  aalto-yellow-tint-4: "#948735"
  aalto-blue-tint-1: "#3f94e5"
  aalto-blue-tint-2: "#3c8cd9"
  aalto-blue-tint-3: "#3884cc"
  aalto-blue-tint-4: "#2a6399"
  aalto-black-tint-1: "#1a1a1a"
  aalto-black-tint-2: "#262626"
  aalto-black-tint-3: "#333333"
  aalto-black-tint-4: "#666666"
  eng-tint-1: "#c65fc8"
  eng-tint-2: "#bb5abd"
  eng-tint-3: "#b055b2"
  eng-tint-4: "#844085"
  elec-tint-1: "#987ae5"
  elec-tint-2: "#9073d9"
  elec-tint-3: "#876ccc"
  elec-tint-4: "#655199"
  chem-tint-1: "#54bb7b"
  chem-tint-2: "#4fb174"
  chem-tint-3: "#4aa66e"
  chem-tint-4: "#387d52"
  arts-tint-1: "#e5af3b"
  arts-tint-2: "#d9a637"
  arts-tint-3: "#cc9c34"
  arts-tint-4: "#997527"
  biz-tint-1: "#8bc244"
  biz-tint-2: "#84b841"
  biz-tint-3: "#7cad3d"
  biz-tint-4: "#5d822e"
  sci-tint-1: "#e57f47"
  sci-tint-2: "#d97843"
  sci-tint-3: "#cc713f"
  sci-tint-4: "#99552f"
  foreground-tint: "#6c531b"
  action-rev: "#ffffff"
  action: "#151515"
  foreground: "#151515"
  aalto-black-1: "#000000"
  aalto-black-2: "#e0e0e0"
  aalto-col-fg: "#151515"
  black: "#151515"
  aalto-col-action-rev: "#ffffff"
  aalto-col-fg-tint: "#505050"
  aalto-col-bg: "#ffffff"
  primary: "#ff8d4f"
typography:
  aalto-base-font-size-1:
    fontSize: ".875rem"
  aalto-base-font-size-2:
    fontSize: 1rem
  aalto-base-font-size-3:
    fontSize: 1.125rem
  aalto-base-font-size-4:
    fontSize: 1.25rem
  aalto-base-font-size-5:
    fontSize: 1.5rem
  aalto-base-font-size-6:
    fontSize: 2rem
  aalto-base-font-size-7:
    fontSize: 4rem
  aalto-base-font-family-primary:
    fontFamily: inter
  aalto-base-font-family-secondary:
    fontFamily: besley
  aalto-base-font-family-code:
    fontFamily: "\"source code pro\""
  aalto-base-font-family-icon:
    fontFamily: aalto-icons
  body:
    fontSize: 1rem
components:
  button:
    textColor: "#141414"
    padding: 0px 11.25px 0px 0px
  button-2:
    backgroundColor: "#ffffff"
    textColor: "#141414"
    padding: 15px
  button-3:
    backgroundColor: "#000000"
    textColor: "#ffffff"
    padding: 15px
  button-4:
    backgroundColor: "#f2f2f2"
    textColor: "#505050"
  input:
    textColor: "#141414"
  card:
    backgroundColor: "#ffffff"
    textColor: "#151515"
    padding: 0px 0px 32px
  card-2:
    backgroundColor: "#f2f2f2"
    textColor: "#505050"
  card-3:
    textColor: "#505050"
  badge-brand:
    backgroundColor: "#ff8d4f"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Aalto University

## Overview

Aalto University — read from the rendered page in a browser, not from published tokens.

Tokens were read from https://brand.aalto.fi/, not from a published token package: 91 colour tokens and 12 type tokens.

## Colors

91 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `inter`, `besley`, `"source code pro"`, `aalto-icons`.

## Components

8 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fafafa) canvas paired with `#fafafa` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#ff8d4f` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `inter` across 12 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
