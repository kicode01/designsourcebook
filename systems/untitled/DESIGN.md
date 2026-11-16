---
version: alpha
name: Untitled UI
description: "Crisp light (rgb(255 255 255)) canvas, Inter typography, rgb(249 245 255) brand accent, and 8px corner geometry"
colors:
  color-transparent: "rgb(0 0 0 / 0)"
  color-alpha-white: "rgb(255 255 255)"
  color-alpha-black: "rgb(0 0 0)"
  color-brand-50: "rgb(249 245 255)"
  color-brand-100: "rgb(244 235 255)"
  color-brand-200: "rgb(233 215 254)"
  color-brand-300: "rgb(214 187 251)"
  color-brand-400: "rgb(182 146 246)"
  color-brand-500: "rgb(158 119 237)"
  color-brand-600: "rgb(127 86 217)"
  color-brand-700: "rgb(105 65 198)"
  color-brand-800: "rgb(83 56 158)"
  color-brand-900: "rgb(66 48 125)"
  color-brand-950: "rgb(44 28 95)"
  primary: "rgb(249 245 255)"
typography:
  display-2xl:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 72px
    fontWeight: 600
    lineHeight: 1.25
  display-xl:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 60px
    fontWeight: 600
    lineHeight: 1.2
  display-lg:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.25
  display-md:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.22
  display-sm:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.26
  display-xs:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
  text-xl:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.5
  text-lg:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
  text-md:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  text-sm:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.42
  text-xs:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.5
components:
  button-primary:
    backgroundColor: "rgb(249 245 255)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "rgb(249 245 255)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "rgb(249 245 255)"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "rgb(249 245 255)"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "rgb(249 245 255)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Untitled UI

## Overview

Untitled UI — tokens read from https://github.com/untitleduico/react/.

Tokens were read from the project's own repository, not from a marketing site: 15 colour tokens and 0 type tokens.

## Colors

15 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (rgb(255 255 255)) canvas paired with `rgb(255 255 255)` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `rgb(249 245 255)` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Inter` across 11 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
