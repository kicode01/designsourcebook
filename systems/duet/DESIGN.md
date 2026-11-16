---
version: alpha
name: Duet
description: "Dark (#0077b3) canvas, localtapiola-sans typography, #f7b228 brand accent, and 8px corner geometry"
colors:
  bg-canvas: "#0077b3"
  canvas-text: "#082a4d"
  header-text: "#ffffff"
  nav-bg: "#f5f8fa"
  footer-text: "#4d5f6c"
  footer-border: "#d4dfe5"
  body-text: "#62798a"
  link-text: "#637484"
  button-bg: "rgba(0, 0, 0, 0.3)"
  button-text: "#000000"
  css-surface-11: "#e61740"
  css-stroke-12: "#172a3b"
  css-color-13: "#004b81"
  css-color-14: "#8c001e"
  css-surface-15: "#c6e1ee"
  css-surface-16: "#f1cab2"
  css-color-17: "#5e788b"
  css-border-18: "#d4dde2"
  css-surface-19: "rgba(8, 42, 77, 0.8)"
  css-surface-20: "rgba(23, 42, 59, 0.8)"
  css-surface-21: "#f5f6f7"
  css-surface-22: "rgba(101, 119, 135, 0.15)"
  css-color-23: "#7891a4"
  css-surface-24: "#e4f1f7"
  css-surface-25: "#fbebe1"
  css-surface-26: "rgba(8, 42, 77, 0.05)"
  css-surface-27: "rgba(23, 42, 59, 0.05)"
  css-surface-28: "rgba(0, 0, 0, 0.03)"
  css-surface-29: "#308369"
  css-color-30: "#7f96a5"
  css-surface-31: "#f0f7fa"
  css-border-32: "#edeef0"
  css-color-33: "#7a01c4"
  css-color-34: "#a9457c"
  css-color-35: "#364a81"
  css-color-36: "#171c3a"
  css-color-37: "#5f7a8f"
  css-surface-38: "#ebf1f5"
  css-surface-39: "#bdc6cc"
  css-surface-40: "#c3c3c3"
  css-surface-41: "#b5c6d0"
  css-surface-42: "#b2c2cd"
  css-surface-43: "rgba(43, 40, 38, 0.1)"
  css-color-44: "rgba(255, 255, 255, 0.8)"
  css-surface-45: "rgba(255, 255, 255, 0.9)"
  css-surface-46: "#f5f9f8"
  css-surface-47: "#fdf4f6"
  css-border-48: "#d61c52"
  css-surface-49: "rgba(214, 28, 82, 0.05)"
  css-surface-50: "rgba(48, 131, 105, 0.05)"
  css-border-51: "#d1d1d1"
  css-color-52: "#a6b8c5"
  css-surface-53: "#f3f4f5"
  css-surface-54: "#fffbf4"
  css-border-55: "#f7b228"
  css-surface-56: "#e8eaeb"
  css-surface-57: "#fef3df"
  css-surface-58: "#fbe8ee"
  css-surface-59: "#eaf3f0"
  css-color-60: "#00294d"
  primary: "#f7b228"
typography:
  header:
    fontFamily: "localtapiola-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
    fontSize: 16px
    fontWeight: 800
    lineHeight: 1.5
  nav:
    fontFamily: "localtapiola-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  h1:
    fontFamily: "localtapiola-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
    fontSize: 58px
    fontWeight: 800
    lineHeight: 1.25
  h2:
    fontFamily: "localtapiola-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
    fontSize: 36px
    fontWeight: 800
    lineHeight: 1.25
  h3:
    fontFamily: "localtapiola-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "localtapiola-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "localtapiola-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
    fontSize: 12px
    fontWeight: 600
components:
  nav-toggle:
    backgroundColor: "rgba(0, 0, 0, 0)"
    textColor: "rgb(255, 255, 255)"
    typography:
      fontSize: 0.875rem
      fontWeight: 600
    rounded: 20rem
  button-primary:
    backgroundColor: "#f7b228"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#0077b3"
    textColor: "#ffffff"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#0077b3"
    textColor: "#ffffff"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#f7b228"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
---

# Duet

## Overview

LocalTapiola Duet — read from the rendered page in a browser, not from published tokens.

Tokens were read from https://www.duetds.com, not from a published token package: 61 colour tokens and 7 type tokens.

## Colors

61 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `localtapiola-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`.

## Components

1 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Dark (#0077b3) canvas paired with `#0077b3` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#f7b228` with `#000000` label contrast.
- **Typographic Voice**: Headings and UI controls set in `localtapiola-sans` across 7 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
