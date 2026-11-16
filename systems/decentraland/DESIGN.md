---
version: alpha
name: Decentraland UI
description: "Crisp light (#ffffff) canvas, system-ui typography, #ff2d55 brand accent, and 8px corner geometry"
colors:
  background: "#18141a"
  danger: "#ffa900"
  error: "#ff0000"
  primary: "#ff2d55"
  secondary: "#242129"
  primary-hover: "#ff3d61"
  secondary-hover: "#28262c"
  text: "#ffffff"
  secondary-text: "#676370"
  text-on-primary: "#ffffff"
  text-on-secondary: "#ffffff"
  dropdown: "#716b7c"
  popup: "#676370"
  popup-text: "#ffffff"
  navbar-popup: "#242129"
  card: "#242129"
  toast: "#3d3b43"
  toast-text: "#ffffff"
  modal: "#242129"
  text-area-border: "#676370"
  clear-divider: "#a09ba8"
  navbar-icons: "#fff"
  navbar-menu-enabled: "#ecebed"
  navbar-menu-hover: "#fff"
  navbar-item-text-enabled: "#cfcdd4"
  navbar-item-text-hover: "#fff"
  navbar-item-border-enabled: "#716b7c"
  navbar-item-border-hover: "#cfcdd4"
  usermenu-item-text-enabled: "#cfcdd4"
  usermenu-item-border-enabled: "#cfcdd4"
  neon-blue: "#00d3ff"
  summer-red: "#ff2d55"
  void: "#16141a"
  luisxvi-violet: "#a524b3"
  idontfeelthatwell: "#f3f2f5"
  shadows: "#242129"
  night-time: "#691fa9"
  bluish-steel: "#676370"
  innocence: "#ffffff"
  candy-purple: "#c640cd"
  sunish: "#ffbc5b"
  millenial-orange: "#fc9965"
  oj-not-simpson: "#ff7439"
  dark: "#18141a"
  common: "#73d3d3"
  uncommon: "#ff8362"
  rare: "#34ce76"
  epic: "#438fff"
  legendary: "#a14bf3"
  mythic: "#ff4bed"
  unique: "#fea217"
  active-bar-color: "#ff2d55"
  non-active-bar-color: "#4f1414"
typography:
  font-family:
    fontFamily: "system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto"
components:
  button-primary:
    backgroundColor: "#ff2d55"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#676370"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ffa900"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f3f2f5"
    textColor: "#676370"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f3f2f5"
    textColor: "#676370"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#ff2d55"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f3f2f5"
    textColor: "#676370"
    rounded: 8px
    padding: 10px 16px
---

# Decentraland UI

## Overview

Decentraland UI — tokens read from https://github.com/decentraland/ui.

Tokens were read from the project's own repository, not from a marketing site: 53 colour tokens and 1 type tokens.

## Colors

53 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif`.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#676370` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#ff2d55` with `#000000` label contrast.
- **Typographic Voice**: Headings and UI controls set in `system-ui` across 1 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
