---
version: alpha
name: KoliBri
description: "Crisp light (#ffffff) canvas, system-ui typography, #f5f7ff brand accent, and 8px corner geometry"
colors:
  primary-v-50: "#F5F7FF"
  primary-v-100: "#D9E1FD"
  primary-v-200: "#B4C3FB"
  primary-v-300: "#8EA4F9"
  primary-v-400: "#6986F7"
  primary-v-500: "#4368F5"
  primary-v-600: "#2547F3"
  secondary-v-50: "#FFFDF2"
  secondary-v-100: "#FFF5CC"
  secondary-v-200: "#FFEA99"
  secondary-v-300: "#FFE066"
  secondary-v-400: "#FFD533"
  secondary-v-500: "#FFCB00"
  secondary-v-600: "#E5B700"
  brand-primary-v50: "#f5f7ff"
  brand-primary-v100: "#d9e1fd"
  brand-primary-v200: "#b4c3fb"
  brand-primary-v300: "#8ea4f9"
  brand-primary-v400: "#6986f7"
  brand-primary-v500: "#4368f5"
  brand-primary-v600: "#2547f3"
  brand-secondary-v50: "#fffdf2"
  brand-secondary-v100: "#fff5cc"
  brand-secondary-v200: "#ffea99"
  brand-secondary-v300: "#ffe066"
  brand-secondary-v400: "#ffd533"
  brand-secondary-v500: "#ffcb00"
  brand-secondary-v600: "#e5b700"
  tokens-primary: "#4368f5"
  tokens-primary-dark: "#2547f3"
  tokens-secondary: "#ffcb00"
  tokens-secondary-dark: "#e5b700"
  tokens-link: "#4368f5"
  tokens-focus-outline: "#33acf5"
  tokens-text: "#000000"
  tokens-text-disabled: "#cccccc"
  tokens-text-inverted: "#ffffff"
  tokens-surface: "#ffffff"
  tokens-error: "#d21e00"
  tokens-success: "#00992e"
  tokens-warning: "#ffcb00"
  secondary-text-color: "#666666"
  md-red: "#f44336"
  md-red-600: "#e53935"
  md-pink-200: "#f48fb1"
  md-pink-900: "#880e4f"
  md-purple-500: "#9c27b0"
  md-deep-purple-100: "#d1c4e9"
  md-deep-purple-800: "#4527a0"
  md-indigo-400: "#5c6bc0"
  md-blue-50: "#e3f2fd"
  md-blue-700: "#1976d2"
  md-light-blue-300: "#4fc3f7"
  md-cyan: "#00bcd4"
  md-cyan-600: "#00acc1"
  md-teal-200: "#80cbc4"
  md-teal-900: "#004d40"
  md-green-500: "#4caf50"
  md-light-green-100: "#dcedc8"
  md-light-green-800: "#558b2f"
  md-lime-400: "#d4e157"
  md-yellow-50: "#fffde7"
  md-yellow-700: "#fbc02d"
  md-amber-300: "#ffd54f"
  md-orange: "#ff9800"
  md-orange-600: "#fb8c00"
  md-deep-orange-200: "#ffab91"
  md-deep-orange-900: "#bf360c"
  md-brown-500: "#795548"
  md-grey-100: "#f5f5f5"
  md-grey-800: "#424242"
  md-blue-grey-400: "#78909c"
  md-white: "#ffffff"
  v-600: "#2547F3"
  red-v-500: "#FF4324"
  pink-v-500: "#FF7F8D"
  blue-v-500: "#4368F5"
  lightblue-v-500: "#0097F2"
  darkgreen-v-500: "#005633"
  green-v-500: "#00C73C"
  orange-v-500: "#FF7600"
  yellow-v-500: "#FFCB00"
  grey-v-700: "#666666"
  palette-red-v50: "#ffece9"
  palette-pink-v50: "#fff2f3"
  palette-blue-v50: "#f5f7ff"
  palette-lightblue-v50: "#e5f5fd"
  palette-darkgreen-v50: "#e5eeeb"
  palette-green-v50: "#e5f9eb"
  palette-orange-v50: "#fff1e5"
  primary: "#f5f7ff"
typography:
  ui-input-label-font-size:
    fontSize: 0.9375rem
  ui-input-text-font-size:
    fontSize: 1rem
  ui-input-feedback-font-size:
    fontSize: 0.875rem
  ui-button-font-size:
    fontSize: 0.875rem
  ui-button-font-size-small:
    fontSize: 0.875rem
  ui-button-font-size-large:
    fontSize: 1rem
  ui-dropdown-item-font-size:
    fontSize: 0.9375rem
components:
  button-primary:
    backgroundColor: "#f5f7ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#d21e00"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#FFFDF2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#FFFDF2"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#f5f7ff"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#00992e"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#FFFDF2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# KoliBri

## Overview

KoliBri — tokens read from https://github.com/learningequality/kolibri-design-system.

Tokens were read from the project's own repository, not from a marketing site: 91 colour tokens and 7 type tokens.

## Colors

91 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#f5f7ff` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `system-ui` across 7 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
