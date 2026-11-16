---
version: alpha
name: Blueprint
description: "Crisp light (#ffffff) canvas, monospace typography, #FF9980 brand accent, and 3px corner geometry"
colors:
  1: "#1c2127"
  2: "#252a31"
  3: "#2f343c"
  4: "#383e47"
  5: "#404854"
  6: "#99c4ff"
  black: "#111418"
  white: "#ffffff"
  hex: "#f7d1bf"
  dark-gray1: "#1C2127"
  dark-gray2: "#252A31"
  dark-gray3: "#2F343C"
  dark-gray4: "#383E47"
  dark-gray5: "#404854"
  gray1: "#5F6B7C"
  gray2: "#738091"
  gray3: "#8F99A8"
  gray4: "#ABB3BF"
  gray5: "#C5CBD3"
  light-gray1: "#D3D8DE"
  light-gray2: "#DCE0E5"
  light-gray3: "#E5E8EB"
  light-gray4: "#EDEFF2"
  light-gray5: "#F6F7F9"
  blue1: "#184A90"
  blue2: "#215DB0"
  blue3: "#2D72D2"
  blue4: "#4C90F0"
  blue5: "#8ABBFF"
  green1: "#165A36"
  green2: "#1C6E42"
  green3: "#238551"
  green4: "#32A467"
  green5: "#72CA9B"
  orange1: "#77450D"
  orange2: "#935610"
  orange3: "#C87619"
  orange4: "#EC9A3C"
  orange5: "#FBB360"
  red1: "#8E292C"
  red2: "#AC2F33"
  red3: "#CD4246"
  red4: "#E76A6E"
  red5: "#FA999C"
  cerulean1: "#0C5174"
  cerulean2: "#0F6894"
  cerulean3: "#147EB3"
  cerulean4: "#3FA6DA"
  cerulean5: "#68C1EE"
  forest1: "#1D7324"
  forest2: "#238C2C"
  forest3: "#29A634"
  forest4: "#43BF4D"
  forest5: "#62D96B"
  gold1: "#5C4405"
  gold2: "#866103"
  gold3: "#D1980B"
  gold4: "#F0B726"
  gold5: "#FBD065"
  indigo1: "#5642A6"
  indigo2: "#634DBF"
  indigo3: "#7961DB"
  indigo4: "#9881F3"
  indigo5: "#BDADFF"
  lime1: "#43501B"
  lime2: "#5A701A"
  lime3: "#8EB125"
  lime4: "#B6D94C"
  lime5: "#D4F17E"
  rose1: "#A82255"
  rose2: "#C22762"
  rose3: "#DB2C6F"
  rose4: "#F5498B"
  rose5: "#FF66A1"
  sepia1: "#5E4123"
  sepia2: "#7A542E"
  sepia3: "#946638"
  sepia4: "#AF855A"
  sepia5: "#D0B090"
  turquoise1: "#004D46"
  turquoise2: "#007067"
  turquoise3: "#00A396"
  turquoise4: "#13C9BA"
  turquoise5: "#7AE1D8"
  vermilion1: "#96290D"
  vermilion2: "#B83211"
  vermilion3: "#D33D17"
  vermilion4: "#EB6847"
  vermilion5: "#FF9980"
  violet1: "#5C255C"
  primary: "#FF9980"
typography:
  pt-font-family-monospace:
    fontFamily: monospace
  pt-font-family:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", blueprint-icons-16, sans-serif"
  body:
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.28581
  bp6-heading:
    fontSize: 14px
  bp6-entity-title-subtitle:
    fontSize: 12px
  h6:
    fontSize: 18px
  bp6-navbar-heading:
    fontSize: 16px
  switch-indicator-text-font-size:
    fontSize: 0.7em
components:
  button-primary:
    backgroundColor: "#FF9980"
    textColor: "#0b0b0c"
    rounded: 3px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 3px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 3px
    padding: 10px 18px
  input-default:
    backgroundColor: "#EDEFF2"
    textColor: "#0b0b0c"
    rounded: 3px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#EDEFF2"
    textColor: "#0b0b0c"
    rounded: 7px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#FF9980"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#EDEFF2"
    textColor: "#0b0b0c"
    rounded: 3px
    padding: 10px 16px
---

# Blueprint

## Overview

Blueprint — tokens read from https://github.com/palantir/blueprint.

Tokens were read from the project's own repository, not from a marketing site: 91 colour tokens and 0 type tokens.

## Colors

91 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#FF9980` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `monospace` across 8 type steps.
- **Component Geometry**: Buttons (`3px`), cards (`7px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
