---
version: alpha
name: U.S. Web Design System
description: "U.S. Government U.S. Web Design System — tokens read from https://github.com/uswds/uswds."
colors:
  1: "#fbfcfd"
  2: "#f7f9fa"
  3: "#f5f6f7"
  4: "#f1f3f6"
  5: "#e7f2f5"
  10: "#dae9ee"
  20: "#adcfdc"
  30: "#82b4c9"
  40: "#6499af"
  50: "#3a7d95"
  60: "#2e6276"
  70: "#224a58"
  80: "#14333d"
  90: "#0f191c"
  100: "#000000"
  props: "#e7f2f5"
  red-5v: "#fff3f2"
  red-10v: "#fde0db"
  red-20v: "#fdb8ae"
  red-30v: "#ff8d7b"
  red-40v: "#fb5a47"
  red-50v: "#e52207"
  red-60v: "#b50909"
  red-70v: "#8b0a03"
  red-80v: "#5c1111"
  outline-color: "#fee685"
  text-decoration-color: "#e52207"
  primary: "#ff8d7b"
typography:
  root-font-size-equiv:
    fontSize: "if(
  sass($theme-respect-user-font-size): 16px"
  theme-root-font-size:
    fontSize: "10px !default"
  theme-banner-font-family:
    fontFamily: "var(--usa-font-ui, system-ui, sans-serif)"
  half-of-font-size:
    fontSize: "-0.4rem"
---

# U.S. Web Design System

## Overview

U.S. Government U.S. Web Design System — tokens read from https://github.com/uswds/uswds.

Tokens were read from the project's own repository, not from a marketing site: 28 colour tokens and 4 type tokens.

## Colors

28 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `var(--usa-font-ui, system-ui, sans-serif)`.
