---
version: alpha
name: Teambition Clarity Design
description: "Crisp light (#ffffff) canvas, -apple-system typography, #1B9AEE brand accent, and 4px corner geometry"
colors:
  primary-brand: "#1B9AEE"
  highlight-brand: "#F2FBFF"
  bright-brand: "#CCECFF"
  border-brand: "#87D2FF"
  hover-brand: "#0171C2"
  click-brand: "#004F8A"
  heavy-brand: "#002E52"
  bg-canvas: "#ffffff"
  canvas-text: "#262626"
  nav-text: "#595959"
  nav-text-1: "#383838"
  footer-text: "rgba(36, 100, 147, 0.4)"
  body-text: "#a6a6a6"
  link-text: "#8c8c8c"
  link-text-2: "#61a6d8"
  primary: "#1B9AEE"
typography:
  header:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"PingFang SC\", \"Noto Sans\", \"Noto Sans CJK SC\", \"Microsoft YaHei\", \"微软雅黑\", sans-serif"
    fontSize: 16px
    fontWeight: 400
  nav:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"PingFang SC\", \"Noto Sans\", \"Noto Sans CJK SC\", \"Microsoft YaHei\", \"微软雅黑\", sans-serif"
    fontSize: 16px
    fontWeight: 400
components:
  input:
    textColor: "#262626"
    rounded: 4px
    padding: 0px 8px
  card:
    textColor: "#262626"
  card-2:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 40px 48px 48px
  card-3:
    textColor: "#a6a6a6"
  card-4:
    textColor: "#1b9aee"
  button-primary:
    backgroundColor: "#1B9AEE"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 4px
    padding: 10px 18px
  badge-brand:
    backgroundColor: "#1B9AEE"
    textColor: "#0b0b0c"
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
    rounded: 4px
    padding: 10px 16px
---

# Teambition Clarity Design

## Overview

Teambition Clarity Design — read from the rendered page in a browser, not from published tokens.

Tokens were read from https://design.teambition.com/, not from a published token package: 16 colour tokens and 2 type tokens.

## Colors

16 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "PingFang SC", "Noto Sans", "Noto Sans CJK SC", "Microsoft YaHei", "微软雅黑", sans-serif`.

## Components

5 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#1B9AEE` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `-apple-system` across 2 type steps.
- **Component Geometry**: Buttons (`4px`), cards (`8px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
