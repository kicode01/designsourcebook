---
version: alpha
name: Porsche Design System
description: "Crisp light (#fff) canvas, Porsche Next typography, #1A44EA brand accent, and 2px corner geometry"
colors:
  color-focus-dark: "#1A44EA"
  color-focus-light: "#1A44EA"
  color-canvas-light: "#fff"
  pds-theme-light-state-hover: "hsla(236, 6.4%, 51%, 0.148)"
  pds-theme-light-state-active: "hsla(236, 6.4%, 51%, 0.148)"
  pds-theme-light-state-focus: "#1a44ea"
  pds-theme-light-state-disabled: "hsla(233,6.6%,23.9%,0.412)"
  pds-theme-dark-state-hover: "hsla(240, 2.2%, 44.1%, 0.228)"
  pds-theme-dark-state-active: "hsla(240, 2.2%, 44.1%, 0.228)"
  pds-theme-dark-state-focus: "#1a44ea"
  pds-theme-dark-state-disabled: "hsla(240,1.5%,61.8%,0.302)"
  background-light: "rgba(255,255,255,.01)"
  background-dark: "rgba(0,0,0,.01)"
  color: "#fff"
  theme-color-light: "#FFF"
  theme-color-dark: "#0E1418"
  background: "rgba(0, 0, 255, 0.1)"
  primary: "#1A44EA"
typography:
  pds-font-size-display-small:
    fontSize: "clamp(1.8rem, 2.41vw + 1.32rem, 4.21rem)"
    fontFamily: null
  pds-font-size-display-medium:
    fontSize: "clamp(2.03rem, 3.58vw + 1.31rem, 5.61rem)"
    fontFamily: null
  pds-font-size-display-large:
    fontSize: "clamp(2.28rem, 5.2vw + 1.24rem, 7.48rem)"
    fontFamily: null
  pds-font-size-text-xx-small:
    fontSize: 0.75rem
  pds-font-size-text-x-small:
    fontSize: 0.875rem
  pds-font-size-text-small:
    fontSize: 1rem
  pds-font-size-text-medium:
    fontSize: "clamp(1.13rem, 0.21vw + 1.08rem, 1.33rem)"
  pds-font-size-text-large:
    fontSize: "clamp(1.27rem, 0.51vw + 1.16rem, 1.78rem)"
  pds-font-size-text-x-large:
    fontSize: "clamp(1.42rem, 0.94vw + 1.23rem, 2.37rem)"
  pds-font-size-heading-small:
    fontSize: 1rem
  pds-font-size-heading-medium:
    fontSize: "clamp(1.13rem, 0.21vw + 1.08rem, 1.33rem)"
  pds-font-size-heading-large:
    fontSize: "clamp(1.27rem, 0.51vw + 1.16rem, 1.78rem)"
  pds-font-size-heading-x-large:
    fontSize: "clamp(1.42rem, 0.94vw + 1.23rem, 2.37rem)"
  pds-font-size-heading-xx-large:
    fontSize: "clamp(1.6rem, 1.56vw + 1.29rem, 3.16rem)"
  pds-font-family:
    fontFamily: "\"Porsche Next\", \"Arial Narrow\", Arial, \"Heiti SC\", SimHei, sans-serif"
  font-sans:
    fontFamily: "\"Porsche Next\", \"Apple SD Gothic Neo\", \"Malgun Gothic\", \"Noto Sans KR\", \"Arial Narrow\", Arial, sans-serif"
components:
  button-primary:
    backgroundColor: "#1A44EA"
    textColor: "#ffffff"
    rounded: 2px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 2px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 2px
    padding: 10px 18px
  input-default:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 2px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#1A44EA"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 2px
    padding: 10px 16px
---

# Porsche Design System

## Overview

Porsche Design System — tokens read from https://github.com/porsche-design-system/porsche-design-system.

Tokens were read from the project's own repository, not from a marketing site: 18 colour tokens and 3 type tokens.

## Colors

18 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fff) canvas paired with `#fff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#1A44EA` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Porsche Next` across 16 type steps.
- **Component Geometry**: Buttons (`2px`), cards (`6px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
