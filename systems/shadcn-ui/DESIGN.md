---
version: alpha
name: Shadcn/ui
description: "Crisp light (#ffffff) canvas, Geist typography, #ff0000 brand accent, and 6px corner geometry"
colors:
  hex: "#000000"
  rgb: "rgb(0,0,0)"
  hsl: "hsl(0,0%,0%)"
  black-hex: "#000000"
  black-rgb: "rgb(0,0,0)"
  white-hex: "#ffffff"
  white-rgb: "rgb(255,255,255)"
  theme-color: "#000000"
  background-color: "#ffffff"
  extended: "#222222"
  alt-base: "#999999"
  background: "#ffffff"
  foreground: "#000000"
  primary: "#ff0000"
  colors-brand: "#ff0000"
  colors-primary: "#000"
  brand: "#ff0000"
typography:
  display-4xl:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.11
  heading-3xl:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.2
  heading-2xl:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
  heading-xl:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  heading-lg:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.55
  body:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  body-medium:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
  muted-sm:
    fontFamily: "Geist, Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
  code-mono:
    fontFamily: "\"Geist Mono\", ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
components:
  button-primary:
    backgroundColor: "#ff0000"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 6px
    padding: 10px 18px
  input-default:
    backgroundColor: "rgb(255,255,255)"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 9px 13px
  card-surface:
    backgroundColor: "rgb(255,255,255)"
    textColor: "#0b0b0c"
    rounded: 10px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#ff0000"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "rgb(255,255,255)"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 16px
---

# Shadcn/ui

## Overview

Shadcn/ui — tokens read from https://github.com/shadcn-ui/ui.

Tokens were read from the project's own repository, not from a marketing site: 17 colour tokens and 0 type tokens.

## Colors

17 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#ff0000` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Geist` across 9 type steps.
- **Component Geometry**: Buttons (`6px`), cards (`10px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
