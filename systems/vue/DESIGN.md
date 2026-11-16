---
version: alpha
name: Vue Design System
description: "Crisp light (rgb(255, 255, 255)) canvas, Fira Sans typography, rgb(230, 164, 0) brand accent, and 8px corner geometry"
colors:
  color-ucla-gold: "rgb(255, 186, 10)"
  color-ucla-gold-darker: "rgb(179, 128, 0)"
  color-vermilion-lighter: "rgb(244, 151, 138)"
  color-vermilion-darker: "rgb(154, 31, 14)"
  color-ucla-gold-lighter: "rgb(255, 219, 128)"
  color-bleu-de-france-dark: "rgb(16, 112, 209)"
  color-bleu-de-france-light: "rgb(84, 163, 242)"
  color-silver: "rgb(127, 136, 145)"
  color-white: "rgb(255, 255, 255)"
  color-bleu-de-france: "rgb(37, 138, 239)"
  color-bleu-de-france-darker: "rgb(12, 87, 161)"
  color-bleu-de-france-lighter: "rgb(132, 189, 246)"
  color-ucla-gold-dark: "rgb(230, 164, 0)"
  color-vermilion-light: "rgb(239, 101, 82)"
  color-vermilion-dark: "rgb(201, 40, 19)"
  color-ucla-gold-light: "rgb(255, 204, 77)"
  color-rich-black: "rgb(0, 17, 35)"
  color-cloud: "rgb(233, 243, 253)"
  color-oxford-blue: "rgb(0, 38, 77)"
  color-vermilion: "rgb(235, 59, 36)"
  rich-black: "#001123"
  white: "#fff"
  fallback: "#000"
  background: "#ffffff"
  primary: "rgb(230, 164, 0)"
typography:
  heading-xxl:
    fontFamily: "\"Fira Sans\", \"Source Sans 3\", -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.15
  heading-xl:
    fontFamily: "\"Fira Sans\", \"Source Sans 3\", -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.22
  heading-lg:
    fontFamily: "\"Fira Sans\", \"Source Sans 3\", -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
  heading-md:
    fontFamily: "\"Fira Sans\", \"Source Sans 3\", -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "\"Fira Sans\", \"Source Sans 3\", -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "\"Fira Sans\", \"Source Sans 3\", -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.42
  caption:
    fontFamily: "\"Fira Sans\", \"Source Sans 3\", -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.35
components:
  button-primary:
    backgroundColor: "rgb(230, 164, 0)"
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
    backgroundColor: "rgb(233, 243, 253)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "rgb(233, 243, 253)"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "rgb(230, 164, 0)"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "rgb(233, 243, 253)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Vue Design System

## Overview

Vue Design System — tokens read from https://github.com/viljamis/vue-design-system.

Tokens were read from the project's own repository, not from a marketing site: 25 colour tokens and 0 type tokens.

## Colors

25 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (rgb(255, 255, 255)) canvas paired with `rgb(255, 255, 255)` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `rgb(230, 164, 0)` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Fira Sans` across 7 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
