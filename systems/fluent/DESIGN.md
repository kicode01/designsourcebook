---
version: alpha
name: Fluent 2
description: "Microsoft Fluent 2 — the design language across Windows and Microsoft 365."
colors:
  white: "#ffffff"
  black: "#000000"
  hc-hyperlink: "#ffff00"
  hc-highlight: "#1aebff"
  hc-disabled: "#3ff23f"
  hc-canvas: "#000000"
  hc-canvas-text: "#ffffff"
  hc-highlight-text: "#000000"
  hc-button-text: "#000000"
  hc-button-face: "#ffffff"
  shade50: "#130204"
  shade40: "#230308"
  shade30: "#420610"
  shade20: "#590815"
  shade10: "#690a19"
  primary: "#750b1c"
  tint10: "#861b2c"
  tint20: "#962f3f"
  tint30: "#ac4f5e"
  tint40: "#d69ca5"
  tint50: "#e9c7cd"
  tint60: "#f9f0f2"
typography:
  font-size-base100:
    fontSize: 10px
  font-size-base200:
    fontSize: 12px
  font-size-base300:
    fontSize: 14px
  font-size-base400:
    fontSize: 16px
  font-size-base500:
    fontSize: 20px
  font-size-base600:
    fontSize: 24px
  font-size-hero700:
    fontSize: 28px
  font-size-hero800:
    fontSize: 32px
  font-size-hero900:
    fontSize: 40px
  font-size-hero1000:
    fontSize: 68px
  font-family-base:
    fontFamily: "\"Segoe UI\", \"Segoe UI Web (West European)\", -apple-system, BlinkMacSystemFont, Roboto, \"Helvetica Neue\", sans-serif"
  font-family-monospace:
    fontFamily: "Consolas, \"Courier New\", Courier, monospace"
  font-family-numeric:
    fontFamily: "Bahnschrift, \"Segoe UI\", \"Segoe UI Web (West European)\", -apple-system, BlinkMacSystemFont, Roboto, \"Helvetica Neue\", sans-serif"
components:
  button-primary:
    backgroundColor: "#750b1c"
    textColor: "#ffffff"
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
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 10px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#750b1c"
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
    rounded: 6px
    padding: 10px 16px
---

# Fluent 2

## Overview

Microsoft Fluent 2 — the design language across Windows and Microsoft 365.

Tokens were read from `@fluentui/tokens@1.0.0-alpha.24`, not from a marketing site: 22 colour tokens and 13 type tokens.

## Colors

22 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `"Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif`, `Consolas, "Courier New", Courier, monospace`, `Bahnschrift, "Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif`.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#750b1c` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Segoe UI` across 13 type steps.
- **Component Geometry**: Buttons (`6px`), cards (`10px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
