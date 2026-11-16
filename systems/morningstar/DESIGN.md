---
version: alpha
name: Morningstar Design System
description: "Crisp light (#ffffff) canvas, Times New Roman typography, #0077cf brand accent, and pill & expressive rounded surfaces"
colors:
  canvas-text: "#000000"
  header-bg: "#ffffff"
  nav-bg: "#f2f2f2"
  h2-text: "#1e1e1e"
  link-bg: "#272520"
  link-text: "#f7f5f2"
  link-text-1: "#5e5e5e"
  link-bg-2: "#0077cf"
  link-border: "#808080"
  card-border: "#cccccc"
  alert-text: "#f8fbff"
  alert-border: "#dbd8d4"
  alert-bg: "#4560db"
  primary: "#0077cf"
typography:
  header:
    fontFamily: "\"Times New Roman\""
    fontSize: 16px
    fontWeight: 400
  nav:
    fontFamily: "\"Times New Roman\""
    fontSize: 16px
    fontWeight: 400
  h1:
    fontFamily: "MorningstarIntrinsic, HelveticaNeue, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 45px
    fontWeight: 300
    lineHeight: 1.11
  h2:
    fontFamily: "MorningstarIntrinsic, HelveticaNeue, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.13
  h3:
    fontFamily: "MorningstarIntrinsic, HelveticaNeue, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 23px
    fontWeight: 500
    lineHeight: 1.17
  body:
    fontFamily: "MorningstarIntrinsic, HelveticaNeue, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 20px
    fontWeight: 300
    lineHeight: 1.3
components:
  button:
    textColor: "#000000"
  button-2:
    textColor: "#5e5e5e"
    padding: 1px 6px
  button-3:
    backgroundColor: "#0077cf"
    textColor: "#ffffff"
    rounded: 24px
    padding: 8px 24px
  button-4:
    textColor: "#5e5e5e"
    rounded: 24px
    padding: 4px 16px
  card:
    backgroundColor: "#ffffff"
    textColor: "#000000"
    rounded: 6px
    padding: 16px
  card-2:
    textColor: "#1e1e1e"
  card-3:
    textColor: "#000000"
  alert:
    textColor: "#f8fbff"
  alert-2:
    backgroundColor: "#4560db"
    textColor: "#f8fbff"
    padding: 10px 10px 10px 16px
  alert-3:
    backgroundColor: "#272520"
    textColor: "#f7f5f2"
    padding: 10px 16px
  input-default:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 24px
    padding: 9px 13px
  badge-brand:
    backgroundColor: "#0077cf"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 24px
    padding: 10px 16px
---

# Morningstar Design System

## Overview

Morningstar Design System — read from the rendered page in a browser, not from published tokens.

Tokens were read from http://designsystem.morningstar.com/, not from a published token package: 14 colour tokens and 6 type tokens.

## Colors

14 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `"Times New Roman"`, `MorningstarIntrinsic, HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif`.

## Components

10 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#0077cf` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Times New Roman` across 6 type steps.
- **Component Geometry**: Buttons (`999px`), cards (`24px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
