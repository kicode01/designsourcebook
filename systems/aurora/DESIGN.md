---
version: alpha
name: Aurora
description: "Crisp light (#fff) canvas, -apple-system typography, #002D42 brand accent, and 8px corner geometry"
colors:
  blue: "#007bff"
  indigo: "#6610f2"
  purple: "#6f42c1"
  pink: "#e83e8c"
  red: "#dc3545"
  orange: "#fd7e14"
  yellow: "#ffc107"
  green: "#28a745"
  teal: "#20c997"
  cyan: "#17a2b8"
  white: "#fff"
  gray: "#6c757d"
  gray-dark: "#343a40"
  primary: "#002D42"
  secondary: "#4D5D6C"
  success: "#278400"
  info: "#269abc"
  warning: "#ff9900"
  danger: "#d3080c"
  light: "#FFFFFF"
  dark: "#343a40"
typography:
  font-family-sans-serif:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\""
  font-family-monospace:
    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
components:
  button-primary:
    backgroundColor: "#002D42"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#d3080c"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#002D42"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#278400"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Aurora

## Overview

Government of Canada Aurora — tokens read from https://github.com/gctools-outilsgc/design-system.

Tokens were read from the project's own repository, not from a marketing site: 21 colour tokens and 2 type tokens.

## Colors

21 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji`, `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fff) canvas paired with `#fff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#002D42` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `-apple-system` across 2 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
