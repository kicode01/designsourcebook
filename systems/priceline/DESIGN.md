---
version: alpha
name: Priceline Design System
description: "Crisp light (#e8f2ff) canvas, Montserrat typography, #ffa0c4 brand accent, and 8px corner geometry"
colors:
  black: "#000"
  white: "#fff"
  light-blue: "#e8f2ff"
  tint-blue: "#99c3f9"
  blue: "#0068ef"
  tone-blue: "#0055c4"
  dark-blue: "#049"
  shade-blue: "#002f6d"
  light-green: "#ecf7ec"
  tint-green: "#80d580"
  green: "#0a0"
  tone-green: "#080"
  dark-green: "#060"
  shade-green: "#040"
  light-red: "#fbebeb"
  tint-red: "#eb9999"
  red: "#c00"
  tone-red: "#b80000"
  dark-red: "#800"
  shade-red: "#6d0000"
  light-orange: "#fef2e7"
  tint-orange: "#faaf69"
  orange: "#f06f20"
  tone-orange: "#b74600"
  dark-orange: "#f06f20"
  shade-orange: "#923800"
  light-yellow: "#fff3c0"
  tint-yellow: "#fee875"
  yellow: "#fedc2a"
  tone-yellow: "#cbb022"
  dark-yellow: "#806e0e"
  shade-yellow: "#665811"
  light-purple: "#f5ebfa"
  tint-purple: "#c28ce0"
  purple: "#70b"
  tone-purple: "#5f0096"
  dark-purple: "#530083"
  shade-purple: "#410067"
  light-pink: "#fff0f5"
  tint-pink: "#ffa0c4"
  pink: "#fe3e81"
  tone-pink: "#d02962"
  dark-pink: "#9e1f4b"
  shade-pink: "#701b39"
  light-gray: "#f4f6f8"
  gray: "#4f6f8f"
  dark-gray: "#364049"
  border-gray: "#c0cad5"
  button-gray: "#edf0f3"
  light-text: "#4f6f8f"
  tint-text: "#3f5972"
  text: "#001833"
  dark-text: "#001023"
  heading-text: "#003c8a"
  light-highlight: "#d0f1ac"
  tint-highlight: "#b9ea85"
  highlight: "#8cdd36"
  tone-highlight: "#66be20"
  dark-highlight: "#2e9000"
  shade-highlight: "#017000"
  light-background: "#f4f6f8"
  tint-background: "#d5dce4"
  tone-background: "#879db3"
  shade-background: "#354b60"
  darkest-background: "#001833"
  light-border: "#eceff2"
  tint-border: "#e0e5ea"
  border: "#c0cad5"
  tone-border: "#868d95"
  dark-border: "#5e6872"
  shade-border: "#1a1d20"
  background-color: "#e8f2ff"
  color: "#0068ef"
  shade: "#923800"
  tint: "#faaf69"
  tone: "#b74600"
  darkest: "#001833"
  lightest: "#fff"
  heading: "#003c8a"
  primary: "#ffa0c4"
typography:
  font-size-6:
    fontFamily: "Montserrat, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.2
  font-size-5:
    fontFamily: "Montserrat, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.25
  font-size-4:
    fontFamily: "Montserrat, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.3
  font-size-3:
    fontFamily: "Montserrat, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  font-size-2:
    fontFamily: "Montserrat, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  font-size-1:
    fontFamily: "Montserrat, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
  font-size-0:
    fontFamily: "Montserrat, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.35
components:
  button-primary:
    backgroundColor: "#ffa0c4"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#e8f2ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#e8f2ff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#ffa0c4"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#e8f2ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Priceline Design System

## Overview

Priceline Design System — tokens read from https://github.com/priceline/design-system.

Tokens were read from the project's own repository, not from a marketing site: 80 colour tokens and 0 type tokens.

## Colors

80 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#e8f2ff) canvas paired with `#e8f2ff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#ffa0c4` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Montserrat` across 7 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
