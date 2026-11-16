---
version: alpha
name: React95
description: "React95 — a component library inspired by the Windows 95 interface."
colors:
  value-derived: "#008080"
  anchor: "rgb(0,0,128)"
  anchor-visited: "rgb(0,0,128)"
  border-dark: "rgb(211,214,217)"
  border-darkest: "rgb(65,187,241)"
  border-light: "rgb(238,244,252)"
  border-lightest: "rgb(250,254,255)"
  canvas: "rgb(255,255,255)"
  canvas-text: "rgb(0,62,1090)"
  canvas-text-disabled: "rgb(211,214,217)"
  canvas-text-disabled-shadow: "rgb(250,254,255)"
  canvas-text-invert: "rgb(0,62,109)"
  checkmark: "rgb(0,62,1090)"
  checkmark-disabled: "rgb(88,152,231)"
  desktop-background: "rgb(68,125,183)"
  flat-dark: "rgb(211,214,217)"
  flat-light: "rgb(238,244,252)"
  focus-secondary: "rgb(250,254,255)"
  header-not-active-text: "rgb(0,62,109)"
  header-text: "rgb(255,255,255)"
  hover-background: "rgb(251,211,61)"
  material: "rgb(227,238,251)"
  material-dark: "rgb(0,159,223)"
  material-text: "rgb(0,62,109)"
  material-text-disabled: "rgb(211,214,217)"
  material-text-disabled-shadow: "rgb(250,254,255)"
  material-text-invert: "rgb(0,62,109)"
  progress: "rgb(251,211,61)"
  tooltip: "rgb(255,243,185)"
  header-background: "#171123"
  header-not-active-background: "#4E6766"
  background: "#4C6663"
  primary: "rgb(65,187,241)"
typography:
  window-title:
    fontFamily: "\"ms_sans_serif\", Tahoma, \"Segoe UI\", sans-serif"
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.2
  dialog-heading:
    fontFamily: "\"ms_sans_serif\", Tahoma, \"Segoe UI\", sans-serif"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "\"ms_sans_serif\", Tahoma, \"Segoe UI\", sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.35
  button-label:
    fontFamily: "\"ms_sans_serif\", Tahoma, \"Segoe UI\", sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.2
  status-bar:
    fontFamily: "\"ms_sans_serif\", Tahoma, \"Segoe UI\", sans-serif"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.2
  dos-mono:
    fontFamily: "\"Fixedsys\", \"Courier New\", Courier, monospace"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.3
components:
  button-primary:
    backgroundColor: "rgb(65,187,241)"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 0px
    padding: 10px 18px
  input-default:
    backgroundColor: "rgb(255,255,255)"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 9px 13px
  card-surface:
    backgroundColor: "rgb(255,255,255)"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "rgb(65,187,241)"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "rgb(255,255,255)"
    textColor: "#0b0b0c"
    rounded: 0px
    padding: 10px 16px
---

# React95

## Overview

React95 — a component library inspired by the Windows 95 interface.

Tokens were read from `react95@4.0.0`, not from a marketing site: 33 colour tokens and 0 type tokens.

## Colors

33 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (rgb(255,255,255)) canvas paired with `rgb(255,255,255)` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `rgb(65,187,241)` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `ms_sans_serif` across 6 type steps.
- **Component Geometry**: Buttons (`0px`), cards (`0px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
