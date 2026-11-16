---
version: alpha
name: Finastra Design System
description: "Financial services UI kit, deep violet and magenta fintech gradients"
colors:
  fds-primary: "#694ed6"
  fds-secondary: "#c137a2"
  fds-background: "#fafafa"
  fds-surface: "#ffffff"
  fds-surface-hover: "#ffffff"
  fds-surface-selected: "rgba(105, 78, 214, 0.08)"
  fds-surface-selected-secondary: "rgba(193, 55, 162, 0.08)"
  fds-surface-disabled: "rgba(0, 0, 0, 0.12)"
  fds-surface-success: "rgba(0, 135, 68, 0.03)"
  fds-surface-error: "rgba(214, 0, 64, 0.03)"
  fds-surface-info: "rgba(105, 78, 214, 0.03)"
  fds-surface-warning: "rgba(255, 96, 10, 0.02)"
  fds-outline: "rgba(0, 0, 0, 0.12)"
  fds-outline-success: "rgba(0, 135, 68, 0.5)"
  fds-outline-error: "rgba(214, 0, 64, 0.5)"
  fds-outline-info: "rgba(105, 78, 214, 0.4)"
  fds-outline-warning: "rgba(255, 96, 10, 0.3)"
  fds-success: "#008744"
  fds-error: "#d60040"
  fds-warning: "#ff600a"
  fds-info: "#694ed6"
  fds-on-primary: "#ffffff"
  fds-on-secondary: "#ffffff"
  fds-on-background: "rgba(0, 0, 0, 0.75)"
  fds-on-surface: "#000000"
  fds-on-surface-medium: "rgba(0, 0, 0, 0.54)"
  fds-on-surface-disabled: "rgba(0, 0, 0, 0.29)"
  fds-on-error: "#ffffff"
  fds-on-success: "#ffffff"
  fds-on-gradient: "#ffffff"
  fds-on-light: "#000000"
  fds-on-dark: "#ffffff"
  primary: "#694ed6"
typography:
  fds-headline-1-font-size:
    fontSize: 3.1875rem
  fds-headline-2-font-size:
    fontSize: 2.5625rem
  fds-headline-3-font-size:
    fontSize: 1.75rem
  fds-headline-4-font-size:
    fontSize: 1.3125rem
  fds-headline-5-font-size:
    fontSize: 1rem
  fds-headline-6-font-size:
    fontSize: 0.8125rem
  fds-subtitle-1-font-size:
    fontSize: 1rem
  fds-subtitle-2-font-size:
    fontSize: 0.875rem
  fds-subtitle-3-font-size:
    fontSize: 0.75rem
  fds-subtitle-4-font-size:
    fontSize: 0.625rem
  fds-body-1-font-size:
    fontSize: 1rem
  fds-body-2-font-size:
    fontSize: 0.875rem
  fds-body-3-font-size:
    fontSize: 0.75rem
  fds-body-4-font-size:
    fontSize: 0.625rem
  fds-button-1-font-size:
    fontSize: 1rem
  fds-button-2-font-size:
    fontSize: 0.875rem
  fds-button-3-font-size:
    fontSize: 0.75rem
  fds-caption-font-size:
    fontSize: 0.75rem
  fds-overline-font-size:
    fontSize: 0.625rem
  fds-font-family:
    fontFamily: Roboto
  mdc-typography-font-family:
    fontFamily: Roboto
  fds-headline-font-family:
    fontFamily: Spartan
  mdc-typography-headline-font-family:
    fontFamily: Spartan
  fds-headline-1-font-family:
    fontFamily: Spartan
  fds-headline-2-font-family:
    fontFamily: Spartan
  fds-headline-3-font-family:
    fontFamily: Spartan
  fds-headline-4-font-family:
    fontFamily: Spartan
  fds-headline-5-font-family:
    fontFamily: Spartan
  fds-headline-6-font-family:
    fontFamily: Spartan
  fds-subtitle-1-font-family:
    fontFamily: Roboto
  fds-subtitle-2-font-family:
    fontFamily: Roboto
  fds-subtitle-3-font-family:
    fontFamily: Roboto
  fds-subtitle-4-font-family:
    fontFamily: Roboto
  fds-body-1-font-family:
    fontFamily: Roboto
  fds-body-2-font-family:
    fontFamily: Roboto
  fds-body-3-font-family:
    fontFamily: Roboto
  fds-body-4-font-family:
    fontFamily: Roboto
  fds-button-1-font-family:
    fontFamily: Roboto
  fds-button-2-font-family:
    fontFamily: Roboto
  fds-button-3-font-family:
    fontFamily: Roboto
  fds-caption-font-family:
    fontFamily: Roboto
  fds-overline-font-family:
    fontFamily: Roboto
components:
  button-primary:
    backgroundColor: "#694ed6"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "rgba(214, 0, 64, 0.5)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#694ed6"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "rgba(0, 135, 68, 0.5)"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Finastra Design System

## Overview

Finastra Design System — tokens imported from @finastra/fds-theme.

Tokens were read from `@finastra/fds-theme@1.8.1`, not from a marketing site: 33 colour tokens and 42 type tokens.

## Colors

33 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `Roboto`, `Spartan`.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#694ed6` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Roboto` across 42 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
