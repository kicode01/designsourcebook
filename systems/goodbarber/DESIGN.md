---
version: alpha
name: GoodBarber Design System
description: "Dark no-code studio interface, warm amber accents and slate workspace panels"
colors:
  begonia25: "#fff9f1"
  begonia30: "#fff6ea"
  begonia50: "#fff2e3"
  begonia60: "#ffe9eb"
  begonia75: "#ffe8db"
  begonia100: "#feddd2"
  begonia125: "#ffd3cc"
  begonia150: "#ffc9c5"
  begonia200: "#ffb5ba"
  begonia350: "#ff7f86"
  begonia400: "#fe6c75"
  begonia450: "#f06069"
  begonia500: "#e1545d"
  gunpowder15: "#f9fcfd"
  gunpowder20: "#f6fbfd"
  gunpowder30: "#f3f9fd"
  gunpowder40: "#eff7fc"
  gunpowder50: "#eaf4fb"
  gunpowder75: "#dfeefb"
  gunpowder100: "#d6e8f9"
  gunpowder150: "#c8ddf2"
  gunpowder200: "#b9d0e7"
  gunpowder250: "#adc3da"
  gunpowder300: "#a0b5cc"
  gunpowder350: "#96a9c0"
  gunpowder400: "#889bb2"
  gunpowder450: "#7d8ea5"
  gunpowder500: "#728198"
  gunpowder550: "#67758c"
  gunpowder600: "#59677e"
  gunpowder650: "#4e5a71"
  gunpowder700: "#424e65"
  gunpowder710: "#3f4960"
  gunpowder750: "#364156"
  gunpowder800: "#293548"
  gunpowder850: "#1c2a39"
  gunpowder900: "#0f1d2c"
  gunpowder950: "#02101f"
  cerulean15: "#f7fdff"
  cerulean20: "#f4fcff"
  cerulean25: "#f2fbff"
  cerulean30: "#effaff"
  cerulean40: "#e9f9ff"
  cerulean50: "#e4f7ff"
  cerulean60: "#dff6ff"
  cerulean75: "#d7f3ff"
  cerulean100: "#c8efff"
  cerulean200: "#93dfff"
  cerulean300: "#5ccfff"
  cerulean400: "#31bcf6"
  cerulean450: "#23aee8"
  cerulean500: "#15a0da"
  cerulean600: "#0089c2"
  cerulean700: "#006792"
  cerulean800: "#004461"
  cerulean900: "#002331"
  accent-orange: "#ffb421"
  accent-purple: "#8c83f0"
  accent-green: "#4dd35b"
  background: "#f5f7f8"
  shadowcolor: "#15a0da"
  color: "#15a0da"
  backgroundhover: "#63ffd8"
  bordercolor: "#fff"
  gbnavmain: "#f5f7f8"
  gbnavsubmain: "#f5f7f8"
  gbnavaccent: "#15a0da"
  primary: "#31bcf6"
typography:
  body:
    fontFamily: "Jakarta, Arial, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  menu-title:
    fontSize: 16px
    fontWeight: 300
  menu-info-block-title:
    fontSize: 18px
  langselector-title:
    fontSize: 12px
    fontWeight: 300
components:
  banner:
    backgroundColor: "#30c7dc"
    textColor: "#0b0b0c"
    typography:
      fontSize: 14px
    padding: 12px
  banner-info:
    backgroundColor: "#1c2a39"
  link:
    textColor: "#f5f7f8"
  select:
    backgroundColor: "#3f4960"
    rounded: 12px
  button-primary:
    backgroundColor: "#31bcf6"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 12px
    padding: 10px 18px
  badge-brand:
    backgroundColor: "#31bcf6"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
---

# GoodBarber Design System

## Overview

GoodBarber Design System — read from www.goodbarber.com's live stylesheets, not a published token package.

Tokens were read from https://www.goodbarber.com/uxdesign/, not from a published token package: 68 colour tokens and 4 type tokens.

## Colors

68 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `Jakarta, Arial, sans-serif`.

## Components

4 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fff) canvas paired with `#fff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#31bcf6` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Jakarta` across 4 type steps.
- **Component Geometry**: Buttons (`12px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
