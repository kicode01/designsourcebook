---
version: alpha
name: Enel
description: "Crisp light (#ffffff) canvas, Roobert typography, #9bbdfc brand accent, and 4px corner geometry"
colors:
  color-neutral-lightest: "#f7f8fb"
  color-neutral-lighter: "#eff2f7"
  color-neutral-light: "#c2cddd"
  color-neutral-base: "#667790"
  color-neutral-dark: "#272c34"
  color-neutral-darkest: "#1c1e20"
  color-neutral-white: "#ffffff"
  color-neutral-black: "#131416"
  color-error-lightest: "#ffe9e8"
  color-error-lighter: "#ffcccf"
  color-error-light: "#ff7e85"
  color-error-base: "#ed0529"
  color-error-dark: "#8c0318"
  color-error-darkest: "#290200"
  color-info-lightest: "#f4f8ff"
  color-info-lighter: "#cbdaf6"
  color-info-light: "#7ea4e9"
  color-info-base: "#1f6cf9"
  color-info-dark: "#043b9f"
  color-info-darkest: "#001333"
  color-success-lightest: "#f5fff6"
  color-success-lighter: "#b2e6cd"
  color-success-light: "#61b78d"
  color-success-base: "#00855d"
  color-success-dark: "#004d35"
  color-success-darkest: "#001a03"
  color-secondary-lightest: "#f9bed2"
  color-secondary-lighter: "#f06292"
  color-secondary-light: "#f06292"
  color-secondary-base: "#d3135a"
  color-secondary-dark: "#c2185b"
  color-secondary-darker: "#880e4f"
  color-primary-lightest: "#9bbdfc"
  color-primary-lighter: "#387cfa"
  color-primary-light: "#0152e8"
  color-primary-base: "#0047cc"
  color-primary-dark: "#003eb3"
  color-primary-darker: "#002466"
  tree-node-background-hover: "#FFFFFF"
  yellow-sunglow-lightest: "#FFEB85"
  yellow-sunglow-lighter: "#FFDA24"
  yellow-sunglow-light: "#AF9200"
  yellow-sunglow-base: "#9D870B"
  violet-red-lightest: "#F2CAE5"
  violet-red-lighter: "#F084BA"
  violet-red-light: "#EA4E9D"
  violet-red-base: "#CD1873"
  turquoise-medium-lightest: "#AFE9E3"
  turquoise-medium-lighter: "#8FE0D8"
  turquoise-medium-light: "#53A199"
  turquoise-medium-base: "#35998F"
  sumire-violet-light-3: "#d6cde2"
  sumire-violet-light-2: "#bbadcf"
  sumire-violet-light-1: "#a08cbc"
  sumire-violet-base: "#785ba0"
  red-debian-lightest: "#F5D1FF"
  red-debian-lighter: "#F0B8FF"
  red-debian-light: "#DB57FF"
  red-debian-base: "#A800D6"
  pigment-red-lightest: "#F8C9CE"
  pigment-red-lighter: "#ED6878"
  pigment-red-light: "#E8384F"
  pigment-red-base: "#D21931"
  myrtle-green-lightest: "#05FFb8"
  myrtle-green-lighter: "#00E0A1"
  myrtle-green-light: "#00A879"
  myrtle-green-base: "#1B7D61"
  indigo-violet-lighter: "#8CAEDE"
  indigo-violet-light: "#4178BC"
  indigo-violet-base: "#3868A3"
  green-dollar-bill-lightest: "#E2E269"
  green-dollar-bill-lighter: "#D3D327"
  green-dollar-bill-light: "#829D15"
  green-dollar-bill-base: "#61750F"
  crayola-blue-lightest: "#D7E5FE"
  crayola-blue-lighter: "#9CBDFC"
  crayola-blue-light: "#5E92F5"
  crayola-blue-base: "#1F6CF9"
  business-broadband: "#C5C5C6"
  business-home: "#FF006E"
  business-industry: "#FD6600"
  business-innovability: "#FEF367"
  business-mobility: "#EF2AC1"
  business-finance: "#2CFEF9"
  business-city: "#5738FF"
  brown-tan-lightest: "#FFC7A8"
  brown-tan-lighter: "#FF9861"
  brown-tan-light: "#F56B16"
  brown-tan-base: "#F55600"
  color-alert-lightest: "#fffdf7"
  primary: "#9bbdfc"
typography:
  nav:
    fontFamily: "Roobert, Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
  button:
    fontFamily: "Roobert, Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1
components:
  button:
    textColor: "#73828c"
    rounded: 4px
    padding: 0px 7px
  button-2:
    textColor: "#5c6870"
    rounded: 4px
    padding: 0px 8px
  button-3:
    textColor: "#2e3438"
    rounded: 4px
    padding: 5px 6px 4px 8px
  input:
    textColor: "#2e3438"
  card-surface:
    backgroundColor: "#f7f8fb"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#9bbdfc"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#b2e6cd"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f7f8fb"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 16px
---

# Enel

## Overview

Enel — read from the rendered page in a browser, not from published tokens.

Tokens were read from https://dsyui.enelx.com/, not from a published token package: 91 colour tokens and 2 type tokens.

## Colors

91 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `Roobert, Helvetica, Arial, sans-serif`.

## Components

4 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#9bbdfc` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Roobert` across 2 type steps.
- **Component Geometry**: Buttons (`4px`), cards (`8px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
