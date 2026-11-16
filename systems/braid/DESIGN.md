---
version: alpha
name: Braid Design System
description: "Crisp light (#fff) canvas, SeekSans typography, #3b72da brand accent, and 8px corner geometry"
colors:
  background-body: "#fff"
  brand-accent: "#3b72da"
  brand-accent-light: "#bdd4ff"
  brand-accent-soft: "#f0f4fc"
  form-accent: "#767676"
  critical-light-background: "#fbe9eb"
  info: "#2c88f7"
  link: "#4c77bb"
  secondary: "#777"
  neutral: "#333"
  color-neutral-light: "#777"
  background-surface-dark: "#222"
  neutral-light: "#777"
  surface-dark: "#222"
  white: "#fff"
  critical: "#ef3e4a"
  promote: "#855be5"
  black: "#303030"
  field: "#333"
  grey-800: "#1C2330"
  grey-600: "#414C63"
  grey-400: "#838FA5"
  grey-200: "#D2D7DF"
  grey-75: "#F3F5F7"
  seek-pink-900: "#520018"
  seek-pink-700: "#A00043"
  seek-pink-500: "#E60278"
  seek-pink-300: "#F470BD"
  seek-pink-100: "#FCD9EF"
  seek-blue-900: "#00061B"
  seek-blue-700: "#051A49"
  seek-blue-500: "#0D3880"
  seek-blue-300: "#7795C2"
  seek-blue-100: "#DCE5F2"
  seek-blue-light-900: "#081C60"
  seek-blue-light-700: "#1E47A9"
  seek-blue-light-500: "#4B84E7"
  seek-blue-light-300: "#99BFF7"
  seek-blue-light-100: "#E5F0FD"
  red-900: "#750606"
  red-700: "#B91E1E"
  red-500: "#F94344"
  red-300: "#FB999A"
  red-100: "#FFE3E2"
  orange-900: "#751704"
  orange-700: "#BB4116"
  orange-500: "#FD7532"
  orange-300: "#FEBB90"
  orange-100: "#FEEEE1"
  yellow-900: "#723D02"
  yellow-700: "#B9800D"
  yellow-500: "#FDC221"
  yellow-300: "#FEE384"
  yellow-100: "#FEF8DE"
  green-900: "#073408"
  green-700: "#1E771D"
  green-500: "#3EB73D"
  green-300: "#98DE97"
  green-100: "#E3F7E3"
  mint-900: "#043820"
  mint-700: "#12784F"
  mint-500: "#28B888"
  mint-300: "#8BDEC5"
  mint-100: "#E2F7F1"
  cyan-900: "#053842"
  cyan-700: "#137D8B"
  cyan-500: "#28BFCE"
  cyan-300: "#88E2E9"
  cyan-100: "#E1F8FA"
  blue-900: "#072254"
  blue-700: "#1D559D"
  blue-500: "#3E8FE0"
  blue-300: "#98C9F1"
  blue-100: "#E3F2FB"
  indigo-900: "#08105F"
  indigo-700: "#2433A7"
  indigo-500: "#4964E9"
  indigo-300: "#9FB0F5"
  indigo-100: "#E6EAFC"
  violet-900: "#120C64"
  violet-700: "#392BA7"
  violet-500: "#6E56E6"
  violet-300: "#B5A7F4"
  violet-100: "#ECE9FC"
  purple-900: "#3E0F65"
  purple-700: "#7F35A9"
  purple-500: "#BE68E8"
  purple-300: "#E1B2F5"
  purple-100: "#F9EBFD"
  light-mode-fill: "#000"
  primary: "#3b72da"
typography:
  font-family:
    fontFamily: "SeekSans, \"SeekSans Fallback\", Arial, Tahoma, sans-serif"
  font-size:
    fontSize: "100%"
components:
  button-primary:
    backgroundColor: "#3b72da"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: "#222"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#B91E1E"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#222"
    textColor: "#ffffff"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#222"
    textColor: "#ffffff"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#3b72da"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#1E771D"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#222"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 16px
---

# Braid Design System

## Overview

Braid Design System — tokens read from https://github.com/seek-oss/braid-design-system.

Tokens were read from the project's own repository, not from a marketing site: 91 colour tokens and 0 type tokens.

## Colors

91 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fff) canvas paired with `#222` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#3b72da` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `SeekSans` across 2 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
