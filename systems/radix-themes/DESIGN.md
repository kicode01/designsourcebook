---
version: alpha
name: Radix Themes
description: "Dark (#1a211e) canvas, -apple-system typography, rgba(255, 255, 255, 0.7) brand accent, and 8px corner geometry"
colors:
  color-panel-translucent: "rgba(255, 255, 255, 0.7)"
  color-surface: "rgba(255, 255, 255, 0.85)"
  color-transparent: "rgb(0 0 0 / 0)"
  amber-contrast: "#21201c"
  amber-surface: "#fefae4cc"
  blue-surface: "#f1f9ffcc"
  bronze-surface: "#fdf5f3cc"
  brown-surface: "#fbf8f4cc"
  crimson-surface: "#fef5f8cc"
  cyan-surface: "#eff9facc"
  gold-surface: "#f9f8efcc"
  grass-surface: "#f3faf3cc"
  gray-surface: "#ffffffcc"
  green-surface: "#f1faf4cc"
  indigo-surface: "#f5f8ffcc"
  iris-surface: "#f6f6ffcc"
  jade-surface: "#f1faf5cc"
  lime-contrast: "#1d211c"
  lime-surface: "#f6f9f0cc"
  mauve-surface: "#ffffffcc"
  mint-contrast: "#1a211e"
  mint-surface: "#effaf8cc"
  olive-surface: "#ffffffcc"
  orange-surface: "#fff5e9cc"
  pink-surface: "#fef5facc"
  plum-surface: "#fdf5fdcc"
  purple-surface: "#faf5fecc"
  red-surface: "#fff5f5cc"
  ruby-surface: "#fff5f6cc"
  sage-surface: "#ffffffcc"
  sand-surface: "#ffffffcc"
  sky-contrast: "#1c2024"
  sky-surface: "#eef9fdcc"
  slate-surface: "#ffffffcc"
  teal-surface: "#f0faf8cc"
  tomato-surface: "#fff6f5cc"
  violet-surface: "#f9f6ffcc"
  yellow-contrast: "#21201c"
  yellow-surface: "#fefbe4cc"
  primary: "rgba(255, 255, 255, 0.7)"
typography:
  default-font-family:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI (Custom)\", Roboto, \"Helvetica Neue\", \"Open Sans (Custom)\", system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\""
  code-font-family:
    fontFamily: "Menlo, \"Consolas (Custom)\", \"Bitstream Vera Sans Mono\", monospace, \"Apple Color Emoji\", \"Segoe UI Emoji\""
  em-font-family:
    fontFamily: "\"Times New Roman\", Times, serif"
  quote-font-family:
    fontFamily: "\"Times New Roman\", Times, serif"
components:
  button-primary:
    backgroundColor: "rgba(255, 255, 255, 0.7)"
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
    backgroundColor: "#1a211e"
    textColor: "#ffffff"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#1a211e"
    textColor: "#ffffff"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "rgba(255, 255, 255, 0.7)"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#1a211e"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 16px
---

# Radix Themes

## Overview

WorkOS Radix Themes — tokens read from https://github.com/radix-ui/themes.

Tokens were read from the project's own repository, not from a marketing site: 39 colour tokens and 4 type tokens.

## Colors

39 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `-apple-system, BlinkMacSystemFont, "Segoe UI (Custom)", Roboto, "Helvetica Neue", "Open Sans (Custom)", system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`, `Menlo, "Consolas (Custom)", "Bitstream Vera Sans Mono", monospace, "Apple Color Emoji", "Segoe UI Emoji"`, `"Times New Roman", Times, serif`.

## Visual Language

- **Surface & Theme Polarity**: Dark (#1a211e) canvas paired with `#1a211e` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `rgba(255, 255, 255, 0.7)` with `#000000` label contrast.
- **Typographic Voice**: Headings and UI controls set in `-apple-system` across 4 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
