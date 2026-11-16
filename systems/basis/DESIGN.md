---
version: alpha
name: Basis Design System
description: "Dark (#21a637) canvas, Rubik typography, #4693fa brand accent, and 8px corner geometry"
colors:
  background-color: "#21a637"
  black: "#000000"
  t75: "#414141"
  t65: "#595959"
  t30: "#b2b2b2"
  t16: "#d6d6d6"
  t10: "#e5e5e5"
  t07: "#ececec"
  t05: "#f2f2f2"
  t03: "#f8f8f8"
  white: "#ffffff"
  t100: "#0046aa"
  t80: "#336bbb"
  t60: "#7fa2d4"
  t25: "#d8edff"
  t15: "#eff7ff"
  t50: "#4693fa"
  graphics: "#1a8450"
  text: "#1b633c"
  theme-color: "#0046AA"
  color: "#999988"
  border-color: "#006aff"
  primary: "#4693fa"
typography:
  h1:
    fontFamily: "Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.2
  h2:
    fontFamily: "Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.25
  h3:
    fontFamily: "Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.33
  h4:
    fontFamily: "Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
  body-1:
    fontFamily: "Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-2:
    fontFamily: "Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
  legal:
    fontFamily: "Rubik, Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
components:
  button-primary:
    backgroundColor: "#4693fa"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#21a637"
    textColor: "#000000"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#21a637"
    textColor: "#000000"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#4693fa"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#21a637"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 16px
---

# Basis Design System

## Overview

Basis Design System — tokens read from https://github.com/moroshko/basis.

Tokens were read from the project's own repository, not from a marketing site: 23 colour tokens and 0 type tokens.

## Colors

23 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Dark (#21a637) canvas paired with `#21a637` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#4693fa` with `#000000` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Rubik` across 7 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
