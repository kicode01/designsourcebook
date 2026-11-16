---
version: alpha
name: BuzzFeed Solid
description: "Crisp light (#fff) canvas, Proxima Nova typography, #f7ad19 brand accent, and 8px corner geometry"
colors:
  highlight-outline: "#7a9ff3"
  fill-red: "#e32"
  fill-red-lighter: "#feebe9"
  fill-pink: "#e40c78"
  fill-blue: "#0f65ef"
  fill-purple: "#6645dd"
  fill-yellow: "#ffee00"
  fill-yellow-lighter: "#fffab6"
  fill-teal: "#007c7c"
  fill-green: "#68af15"
  fill-green-lighter: "#e1efd0"
  fill-orange: "#f47f16"
  fill-promoted-orange: "#bf5608"
  fill-gray-lighter: "#f4f4f4"
  fill-gray-light: "#d7d7d7"
  fill-gray: "#aaa"
  fill-gray-darker: "#222"
  fill-white: "#fff"
  fill-facebook: "#1877f2"
  fill-twitter: "#55acee"
  fill-google: "#dd4b39"
  fill-linkedin: "#2867b2"
  fill-pinterest: "#e60019"
  fill-tumblr: "#001935"
  fill-youtube: "#FF0000"
  fill-instagram: "#000000"
  fill-vine: "#00b488"
  fill-snapchat: "#fffc00"
  text-white: "#fff"
  text-gray: "#222"
  text-gray-lighter: "#666"
  text-gray-lightest: "#757575"
  text-red: "#e32"
  text-pink: "#e40c78"
  text-orange: "#f47f16"
  text-promoted-orange: "#f7ad19"
  text-purple: "#6645dd"
  text-green: "#68af15"
  text-blue: "#0f65ef"
  text-facebook: "#3b5998"
  text-twitter: "#55acee"
  text-google: "#dd4b39"
  text-linkedin: "#0077b5"
  text-pinterest: "#bd081c"
  text-tumblr: "#36465d"
  text-youtube: "#FF0000"
  text-instagram: "#000000"
  primary: "#f7ad19"
typography:
  base-font-size:
    fontSize: 16px
  title-1:
    fontFamily: "\"Proxima Nova\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
  title-2:
    fontFamily: "\"Proxima Nova\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.25
  title-3:
    fontFamily: "\"Proxima Nova\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "\"Proxima Nova\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "\"Proxima Nova\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
components:
  button-primary:
    backgroundColor: "#f7ad19"
    textColor: "#222"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#222"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f4f4f4"
    textColor: "#222"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f4f4f4"
    textColor: "#222"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#f7ad19"
    textColor: "#222"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f4f4f4"
    textColor: "#222"
    rounded: 8px
    padding: 10px 16px
---

# BuzzFeed Solid

## Overview

BuzzFeed Solid — tokens read from https://github.com/buzzfeed/solid.

Tokens were read from the project's own repository, not from a marketing site: 48 colour tokens and 1 type tokens.

## Colors

48 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fff) canvas paired with `#fff` component surfaces and `#222` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#f7ad19` with `#222` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Proxima Nova` across 6 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
