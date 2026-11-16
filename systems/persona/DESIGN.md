---
version: alpha
name: Persona Design System
description: "Crisp light (#FBFCFD) canvas, system-ui typography, #0060df brand accent, and 8px corner geometry"
colors:
  border-color: "#BFBFBF"
  text-primary-color: "#15141a"
  text-secondary-color: "#5b5b66"
  link-fg-color: "#0060df"
  link-hover-fg-color: "#0250bb"
  textarea-border-color: "#8f8f9d"
  radio-border-color: "#8f8f9d"
  radio-checked-border-color: "#0060df"
  button-primary-bg-color: "#0060df"
  button-primary-fg-color: "#fbfbfe"
  button-primary-active-bg-color: "#054096"
  button-primary-hover-bg-color: "#0250bb"
  dialog-border-color: "#1c1b22"
  textarea-bg-color: "#42414d"
  input-text-bg-color: "#42414d"
  color-accent-primary: "#0060df"
  color-accent-primary-hover: "#0250bb"
  color-accent-primary-active: "#054096"
  border-color-interactive: "#8f8f9d"
  clear-signature-button-bg-focus: "#f0f0f4"
  primary-color: "#fbfbfe"
  secondary-color: "#cfcfd8"
  alt-text-done-color: "#2ac3a2"
  alt-text-warning-color: "#0090ed"
  alt-text-tooltip-bg: "#f0f0f4"
  alt-text-tooltip-fg: "#15141a"
  alt-text-tooltip-border: "#8f8f9d"
  no-alt-text-badge-border-color: "#f0f0f4"
  no-alt-text-badge-bg-color: "#cfcfd8"
  no-alt-text-badge-fg-color: "#5b5b66"
  swatch-border-color: "#cfcfd8"
  focus-ring-color: "#0060df"
  pspdfkit-signatures-sidebar-icon-warning-fill: "#ffb864"
  pspdfkit-signatures-sidebar-icon-error-fill: "#ffb6ac"
  pspdfkit-electronic-signatures-modal-background: "#22252b"
  background-color: "#408bdd"
  code-bg-color: "#0b2138"
  gray-0: "#FBFCFD"
  gray-20: "#CBD1D8"
  gray-40: "#939EAE"
  gray-60: "#5B6778"
  gray-80: "#383F4A"
  gray-100: "#191C21"
  blue-20: "#75C0FF"
  blue-60: "#0061B3"
  blue-100: "#001526"
  green-20: "#91E1A5"
  green-60: "#248C3E"
  green-100: "#081E0D"
  lightblue-20: "#75E6FF"
  lightblue-60: "#0093B3"
  lightblue-100: "#001F26"
  orange-20: "#FFCA75"
  orange-60: "#B36F00"
  orange-100: "#261800"
  red-20: "#F08E8D"
  red-60: "#9F201F"
  red-100: "#220707"
  gold-20: "#FFD675"
  gold-60: "#B37E00"
  gold-100: "#261B00"
  yellow-20: "#FFE975"
  yellow-60: "#B39700"
  yellow-100: "#262000"
  lime-20: "#CDFF75"
  lime-60: "#72B300"
  lime-100: "#182600"
  teal-20: "#75E1D0"
  teal-60: "#008C77"
  teal-100: "#001E19"
  purple-20: "#BA75FF"
  purple-60: "#5A00B3"
  purple-100: "#130026"
  violet-20: "#C975FF"
  violet-60: "#6D00B3"
  violet-100: "#170026"
  pink-20: "#F895FF"
  pink-60: "#AA29B3"
  pink-100: "#240926"
  color: "#0065d1"
  separator-color: "#f0f0f4"
  message-bar-fg-color: "#15141a"
  button-signature-active-bg: "#cfcfd8"
  tab-top-line-hover-color: "#8f8f9d"
  outline-around-color: "#f0f0f4"
  divider-color: "#d7d7db"
  color-blue900: "#0a0167"
  primary: "#0060df"
typography:
  pspdfkit-font-size-1:
    fontSize: 1rem
  pspdfkit-font-size-2:
    fontSize: 0.75rem
  pspdfkit-font-size-3:
    fontSize: 0.875rem
  pspdfkit-font-size-4:
    fontSize: 1.125rem
  pspdfkit-font-size-5:
    fontSize: 1.25rem
  pspdfkit-font-size-6:
    fontSize: 1.5rem
components:
  button-primary:
    backgroundColor: "#0060df"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#15141a"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ffb6ac"
    textColor: "#15141a"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#fbfbfe"
    textColor: "#15141a"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#fbfbfe"
    textColor: "#15141a"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#0060df"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#15141a"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#fbfbfe"
    textColor: "#15141a"
    rounded: 8px
    padding: 10px 16px
---

# Persona Design System

## Overview

Persona Design System — tokens read from https://github.com/privy-open-source/design-system.

Tokens were read from the project's own repository, not from a marketing site: 88 colour tokens and 7 type tokens.

## Colors

88 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `theme(fontFamily.sans)`.

## Visual Language

- **Surface & Theme Polarity**: Dark (#408bdd) canvas paired with `#408bdd` component surfaces and `#15141a` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#0060df` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `system-ui` across 6 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
