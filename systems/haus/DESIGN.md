---
version: alpha
name: haus
description: "Dark (rgb(0, 31, 63)) canvas, Inter typography, rgb(204, 0, 0) brand accent, and 8px corner geometry"
colors:
  hex: "#4e83bd"
  code: "#f6f3fc"
  figma: "#f6f3fc"
  effective-bg: "rgb(255, 255, 255)"
  raw-color: "rgb(255, 255, 255)"
  raw-background-color: "rgb(0, 31, 63)"
  raw-effective-background-color: "rgb(0, 31, 63)"
  raw-border-top-color: "rgb(0, 31, 63)"
  raw-border-right-color: "rgb(0, 31, 63)"
  raw-border-bottom-color: "rgb(0, 31, 63)"
  raw-border-left-color: "rgb(204, 0, 0)"
  styles-color: "#ffffff"
  styles-background-color: "#001f3f"
  styles-effective-background-color: "#001f3f"
  color: "rgb(255, 255, 255)"
  background-color: "rgb(0, 31, 63)"
  effective-background-color: "rgb(0, 31, 63)"
  border-top-color: "rgb(0, 31, 63)"
  border-right-color: "rgb(0, 31, 63)"
  border-bottom-color: "rgb(0, 31, 63)"
  border-left-color: "rgb(204, 0, 0)"
  primary: "rgb(204, 0, 0)"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
  h1:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.28
  h2:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.42
  caption:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.35
components:
  button-primary:
    backgroundColor: "rgb(204, 0, 0)"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f6f3fc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f6f3fc"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "rgb(204, 0, 0)"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f6f3fc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# haus

## Overview

haus — tokens read from https://github.com/hipuku/haus.

Tokens were read from the project's own repository, not from a marketing site: 22 colour tokens and 0 type tokens.

## Colors

22 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Dark (rgb(0, 31, 63)) canvas paired with `rgb(0, 31, 63)` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `rgb(204, 0, 0)` with `#f7f7f8` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Inter` across 6 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
