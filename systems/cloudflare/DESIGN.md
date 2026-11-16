---
version: alpha
name: Cloudflare Kumo
description: "Dark (#5b697c) canvas, Inter typography, #f6821f brand accent, and 8px corner geometry"
colors:
  kumo-light: "#f6821f"
  kumo-dark: "#f6821f"
  fedramp-light: "#5b697c"
  fedramp-dark: "#5b697c"
  primary: "#f6821f"
  secondary: "#9CA3AF"
  color-kumo-canvas: "#5b697c"
  color-kumo-base: "#5b697c"
  color-kumo-hairline: "#c8d4e5"
  text-color-kumo-brand: "#f6821f"
  kumo-code-highlight-bg: "rgba(0, 0, 0, 0.05)"
  disabled-gray: "#999999"
typography:
  heading-3xl:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.2
  heading-2xl:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  heading-xl:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  heading-lg:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.45
  body-base:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.45
  caption-xs:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.35
  code-mono:
    fontFamily: "\"JetBrains Mono\", ui-monospace, SFMono-Regular, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
components:
  button-primary:
    backgroundColor: "#f6821f"
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
    backgroundColor: "#5b697c"
    textColor: "#ffffff"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#5b697c"
    textColor: "#ffffff"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#f6821f"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#5b697c"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 16px
---

# Cloudflare Kumo

## Overview

Cloudflare Kumo — tokens read from https://github.com/cloudflare/kumo.

Tokens were read from the project's own repository, not from a marketing site: 12 colour tokens and 0 type tokens.

## Colors

12 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Dark (#5b697c) canvas paired with `#5b697c` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#f6821f` with `#000000` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Inter` across 8 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
