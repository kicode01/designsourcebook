---
version: alpha
name: Ontario Design System
description: "Crisp light (#ffffff) canvas, Open Sans typography, #42c7ff brand accent, and 8px corner geometry"
colors:
  canvas-text: "#191919"
  nav-text: "#0066cc"
  css-surface-5: "#f2f2f2"
  css-surface-6: "#cccccc"
  css-surface-7: "#999999"
  css-surface-8: "#666666"
  css-surface-9: "#4c4c4c"
  css-surface-10: "#cba52e"
  css-surface-11: "#fcaf17"
  css-surface-12: "#c1b28f"
  css-surface-13: "#39b54a"
  css-surface-14: "#8dc63f"
  css-surface-15: "#49a7a2"
  css-surface-16: "#00b2e3"
  css-surface-17: "#3193cc"
  css-surface-18: "#b975b7"
  css-surface-19: "#f15a22"
  css-surface-20: "#f0454b"
  css-surface-21: "#f03093"
  css-surface-22: "#f0e7cc"
  css-surface-23: "#f8e5c3"
  css-surface-24: "#ebe7db"
  css-surface-25: "#d1efd4"
  css-surface-26: "#ddedc7"
  css-surface-27: "#cfeded"
  css-surface-28: "#c5eefa"
  css-surface-29: "#dbe9f5"
  css-surface-30: "#f1e3f2"
  css-surface-31: "#fee1d9"
  css-surface-32: "#ffe0e2"
  css-surface-33: "#fedff0"
  css-surface-34: "#86743d"
  css-surface-35: "#8a600d"
  css-surface-36: "#7b725c"
  css-surface-37: "#2b8737"
  css-surface-38: "#5f8129"
  css-surface-39: "#367a76"
  css-surface-40: "#1080a6"
  css-surface-41: "#0369ac"
  css-surface-42: "#92278f"
  css-surface-43: "#c64a1c"
  css-surface-44: "#d81a21"
  css-surface-45: "#c00264"
  css-surface-49: "#e2f0f4"
  css-surface-50: "#cd0000"
  css-surface-51: "#e5e5e5"
  css-surface-52: "#03713d"
  css-surface-53: "#048b4b"
  css-surface-54: "#024122"
  css-surface-55: "#3f3f3f"
  css-surface-56: "rgba(0, 0, 0, 0.6)"
  css-surface-57: "#000000"
  css-surface-58: "#262626"
  css-surface-59: "#333333"
  css-surface-60: "rgba(26, 26, 26, 0.6)"
  css-surface-61: "#42c7ff"
  css-surface-62: "#e6e6e6"
  css-surface-63: "#b2b2b2"
  css-surface-64: "#ffd440"
  css-surface-65: "#118847"
  css-surface-66: "#e0efff"
  css-surface-67: "#c1e0fe"
  css-surface-68: "#e8e8e8"
  css-surface-69: "#d1d1d1"
  css-surface-70: "rgba(0,0,0,.6)"
  css-surface-71: "hsla(0,0%,10%,.6)"
  css-surface-72: "rgba(0,0,0,.1019607843)"
  css-surface-73: "rgba(0,0,0,.0509803922)"
  css-border-74: "rgba(0,0,0,.3019607843)"
  css-surface-75: "rgba(225,145,0,.2352941176)"
  css-surface-76: "rgba(0,123,158,.1137254902)"
  css-surface-77: "rgba(0,119,160,.337254902)"
  css-surface-78: "hsla(0,0%,100%,.95)"
  css-surface-79: "hsla(0,0%,100%,.7)"
  css-surface-80: "#fef6dc"
  css-surface-81: "#e5f0e9"
  css-surface-82: "#fceff0"
  css-surface-85: "rgba(83,83,99,.05)"
  css-surface-87: "rgba(83,83,99,.075)"
  css-surface-88: "#f6f6f6"
  css-surface-91: "#f8f8f8"
  bg-canvas: "#ffffff"
  nav-bg: "rgba(83, 83, 99, 0.075)"
  css-color-46: "#551a8b"
  css-color-47: "#00478f"
  css-color-48: "#002142"
  css-color-83: "#6b0000"
  css-color-84: "#280000"
  css-color-86: "#535363"
  css-color-89: "#2288ff"
  primary: "#42c7ff"
typography:
  nav:
    fontFamily: "\"Open Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
components:
  button-primary:
    backgroundColor: "#42c7ff"
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
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#42c7ff"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Ontario Design System

## Overview

Ontario Design System — read from the rendered page in a browser, not from published tokens.

Tokens were read from https://designsystem.ontario.ca/docs/documentation/release-notes.html#latest, not from a published token package: 91 colour tokens and 1 type tokens.

## Colors

91 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif`.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#42c7ff` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Open Sans` across 1 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
