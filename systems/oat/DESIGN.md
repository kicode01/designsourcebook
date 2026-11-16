---
version: alpha
name: Oat UI
description: "Crisp light (#ffffff) canvas, system-ui typography, #008032 brand accent, and pill & expressive rounded surfaces"
colors:
  warning-foreground: "#09090b"
  bg-canvas: "#ffffff"
  canvas-text: "#262626"
  main-bg: "#fafafa"
  main-border: "#e4e4e7"
  footer-text: "#71717a"
  link-bg: "#f4f4f5"
  button-border: "rgba(255, 255, 255, 0.12)"
  input-text: "#000000"
  badge-text: "#a65b00"
  badge-text-1: "#008032"
  badge-text-2: "#d32f2f"
  primary: "#008032"
typography:
  header:
    fontFamily: "system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  nav:
    fontFamily: "system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  h1:
    fontFamily: "system-ui, sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.25
  h2:
    fontFamily: "system-ui, sans-serif"
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.25
  h3:
    fontFamily: "system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
components:
  badge:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    typography:
      fontSize: ".75rem"
      fontWeight: 500
    rounded: 9999px
    padding: 1rem
  button-primary:
    backgroundColor: "#008032"
    textColor: "#ffffff"
    rounded: 9999px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 9999px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 9999px
    padding: 10px 18px
  input-default:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 9999px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 9999px
    padding: 18px 20px
  nav-bar:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 9999px
    padding: 10px 16px
---

# Oat UI

## Overview

Oat UI — read from the rendered page in a browser, not from published tokens.

Tokens were read from https://oat.ink/, not from a published token package: 13 colour tokens and 6 type tokens.

## Colors

13 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `system-ui, sans-serif`.

## Components

1 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#008032` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `system-ui` across 6 type steps.
- **Component Geometry**: Buttons (`9999px`), cards (`9999px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
