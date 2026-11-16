---
version: alpha
name: Vanilla
description: "Canonical Vanilla — an extensible Sass CSS framework by the Ubuntu Web Team."
colors:
  color-x-light: "#fff"
  color-light: "#f7f7f7"
  color-mid-x-light: "#e5e5e5"
  color-mid-light: "#d9d9d9"
  color-mid: "#999"
  color-mid-dark: "#666"
  color-dark: "#111"
  color-x-dark: "#000"
  color-negative: "#c7162b"
  color-caution: "#cc7900"
  color-positive: "#0e8420"
  color-information: "#24598f"
  color-paper: "#f3f3f3"
  color-negative-dark: "#a11223"
  color-positive-dark: "#008013"
  color-link: "#06c"
  color-link-visited: "#7d42b8"
  color-focus: "#2e96ff"
  color-link-dark: "#69c"
  color-link-visited-dark: "#a679d2"
  color-focus-dark: "#9cf"
  color-focus-positive: "#003008"
  color-label-validated: "#006b75"
  color-positive-background: "#edf8eb"
  color-positive-background-hover: "#e5f6e2"
  color-positive-background-focus: "#e0f4dc"
  color-caution-background: "#f8efe8"
  color-caution-background-hover: "#f5e7dd"
  color-caution-background-focus: "#f3e2d6"
  color-negative-background: "#f8e9e8"
  color-negative-background-hover: "#f5dfdd"
  color-negative-background-focus: "#f3d8d6"
  colors-light-theme-text-default: "#000"
  colors-light-theme-background-default: "#fff"
  colors-light-theme-background-alt: "#f7f7f7"
  colors-light-theme-border-high-contrast: "#707070"
  colors-dark-theme-text-default: "hsl(0, 0%, 100%)"
  colors-dark-theme-text-hover: "hsl(0, 0%, 76%)"
  colors-dark-theme-background-default: "#262626"
  colors-dark-theme-background-alt: "#202020"
  colors-dark-theme-background-inputs: "#2f2f2f"
  colors-dark-theme-background-active: "#373737"
  colors-dark-theme-background-hover: "#313131"
  colors-dark-theme-border-high-contrast: "#939393"
  colors-paper-theme-background-inputs: "#eaeaea"
  colors-paper-theme-background-active: "#e0e0e0"
  colors-paper-theme-background-hover: "#e7e7e7"
  color-ubuntu: "#e95420"
  color-accent: "#0f95a1"
  color-accent-dark: "#70bbc2"
  default: "#f2f2f2"
  positive: "#62a36c"
  caution: "#c48831"
  negative: "#d17b85"
  hover: "#e5f6e2"
  focus: "#e0f4dc"
  baseline-color: "#f00"
  primary: "#0f95a1"
typography:
  h1:
    fontSize: 2em
  notification-title:
    fontSize: 1rem
  font-base-family:
    fontFamily: "\"Ubuntu variable\", Ubuntu, -apple-system, \"Segoe UI\", Roboto, Oxygen, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif"
  font-monospace:
    fontFamily: "\"Ubuntu Mono variable\", \"Ubuntu Mono\", Consolas, Monaco, Courier, monospace"
components:
  button-primary:
    backgroundColor: "#0f95a1"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: "#262626"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#c7162b"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#262626"
    textColor: "#ffffff"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#262626"
    textColor: "#ffffff"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#0f95a1"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#0e8420"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#262626"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 16px
---

# Vanilla

## Overview

Canonical Vanilla — an extensible Sass CSS framework by the Ubuntu Web Team.

Tokens were read from `vanilla-framework@4.61.0`, not from a marketing site: 58 colour tokens and 5 type tokens.

## Colors

58 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `"Ubuntu variable", Ubuntu, -apple-system, "Segoe UI", Roboto, Oxygen, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`, `"Ubuntu Mono variable", "Ubuntu Mono", Consolas, Monaco, Courier, monospace`, `fallback`.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fff) canvas paired with `#262626` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#0f95a1` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Ubuntu variable` across 4 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
