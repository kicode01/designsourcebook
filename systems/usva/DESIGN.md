---
version: alpha
name: usva.
description: "Dark (#000) canvas, Inter typography, #0a0613 brand accent, and 8px corner geometry"
colors:
  usva-bg: "#0a0613"
  usva-sunken: "#0c0719"
  usva-surface: "#100b1f"
  usva-surface-2: "#181328"
  usva-overlay: "#0c0718"
  usva-ink: "#e6e3f2"
  usva-muted: "#8b85a8"
  usva-faint: "#4c4663"
  usva-on-accent: "#0a0613"
  usva-accent: "#a78bfa"
  usva-accent-2: "#8b5cf6"
  usva-accent-alt: "#52c989"
  usva-accent-tint: "#2e254b"
  usva-accent-ink: "#e6e3f2"
  usva-success: "#52c989"
  usva-warning: "#e0b341"
  usva-danger: "#e0556b"
  usva-info: "#6ea8fe"
  usva-border: "#221c30"
  usva-border-strong: "#3a3350"
  usva-ring: "#a78bfa"
  usva-code-comment: "#7c8a87"
  usva-on-sunken: "#2a1f14"
  usva-on-tint: "#234f31"
  args-default-value: "#a78bfa"
  default-value: "#a78bfa"
  bg: "#000"
  kajo: "#a78bfa"
  primary: "#0a0613"
typography:
  display-lg:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.2
  heading-md:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  heading-sm:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
  caption:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.35
components:
  button-primary:
    backgroundColor: "#0a0613"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#e0556b"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#000"
    textColor: "#ffffff"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#000"
    textColor: "#ffffff"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#0a0613"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#52c989"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#000"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 16px
---

# usva.

## Overview

usva. — tokens read from https://github.com/matt-pasek/usva.

Tokens were read from the project's own repository, not from a marketing site: 29 colour tokens and 0 type tokens.

## Colors

29 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Dark (#000) canvas paired with `#000` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#0a0613` with `#f7f7f8` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Inter` across 5 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
