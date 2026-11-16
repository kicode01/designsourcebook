---
version: alpha
name: Wix Style
description: "Crisp light (#fff) canvas, Arial typography, rgb(26,106,255) brand accent, and pill & expressive rounded surfaces"
colors:
  right-side-background: "#fff"
  wst-color-custom-17: "rgb(255,191,161)"
  wst-color-fill-background-primary: "rgb(255,255,255)"
  wst-color-custom-20: "rgb(201,64,1)"
  wst-color-custom-11: "rgb(242,234,231)"
  wst-color-fill-base-shade-2: "rgb(194,194,194)"
  wst-color-custom-19: "rgb(234,96,32)"
  wst-button-color-border-secondary-hover: "rgb(26,106,255)"
  wst-button-color-text-primary: "rgb(255,255,255)"
  wst-color-line: "rgb(0,0,0)"
  wst-color-custom-12: "rgb(229,206,192)"
  wst-color-custom-7: "rgb(210,228,199)"
  wst-color-custom-8: "rgb(146,176,121)"
  wst-button-color-border-primary-hover: "rgb(26,106,255)"
  c1-inner: "rgb(92, 141, 218)"
  wst-color-action: "rgb(26,106,255)"
  wst-color-fill-accent-2: "rgb(26,106,255)"
  wst-color-custom-13: "rgb(169,128,111)"
  wst-color-custom-14: "rgb(139,97,79)"
  wst-button-color-fill-secondary: "rgb(255,255,255)"
  wst-button-color-fill-secondary-hover: "rgb(255,255,255)"
  wst-button-color-fill-primary-disabled: "rgb(194,194,194)"
  wst-color-custom-16: "rgb(255,233,223)"
  wst-button-color-text-secondary: "rgb(26,106,255)"
  wst-color-custom-15: "rgb(99,60,43)"
  wst-button-color-border-primary-disabled: "rgb(194,194,194)"
  wst-color-custom-4: "rgb(9,75,204)"
  wst-color-fill-base-shade-3: "rgb(110,110,110)"
  wst-color-fill-accent-3: "rgb(26,106,255)"
  c1-outer: "rgb(74, 123, 196)"
  wst-color-custom-3: "rgb(149,185,255)"
  wst-color-fill-base-shade-1: "rgb(240,240,240)"
  wst-color-custom-18: "rgb(250,133,79)"
  wst-color-custom-6: "rgb(243,248,240)"
  wst-button-color-text-secondary-hover: "rgb(26,106,255)"
  wst-color-fill-accent-1: "rgb(26,106,255)"
  wst-button-color-border-secondary: "rgb(26,106,255)"
  wst-button-color-text-secondary-disabled: "rgb(194,194,194)"
  wst-button-color-border-secondary-disabled: "rgb(194,194,194)"
  wst-color-fill-background-secondary: "rgb(240,240,240)"
  wst-color-fill-accent-4: "rgb(26,106,255)"
  wst-color-custom-1: "rgb(194,194,194)"
  wst-color-text-secondary: "rgb(110,110,110)"
  wst-button-color-fill-primary-hover: "rgb(26,106,255)"
  c2-color: "rgb(159, 234, 255)"
  wst-color-disabled: "rgb(194,194,194)"
  wst-button-color-border-primary: "rgb(26,106,255)"
  wst-button-color-fill-primary: "rgb(26,106,255)"
  wst-color-fill-base-1: "rgb(255,255,255)"
  wst-color-custom-5: "rgb(8,47,123)"
  wst-button-color-fill-secondary-disabled: "rgb(255,255,255)"
  wst-color-custom-10: "rgb(57,100,29)"
  wst-color-text-primary: "rgb(0,0,0)"
  wst-color-subtitle: "rgb(110,110,110)"
  wst-color-custom-9: "rgb(97,135,65)"
  wst-color-fill-base-2: "rgb(0,0,0)"
  wst-color-title: "rgb(0,0,0)"
  wst-button-color-text-primary-hover: "rgb(255,255,255)"
  wst-button-color-text-primary-disabled: "rgb(255,255,255)"
  wst-color-custom-2: "rgb(220,232,255)"
  primary: "rgb(26,106,255)"
typography:
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 10px
components:
  button:
    backgroundColor: "#ffffff"
    textColor: "#166aea"
    rounded: 24px
    padding: 0px 24px
  button-2:
    textColor: "#000000"
    padding: 0px 12px
  button-3:
    backgroundColor: "#000000"
    textColor: "#fff"
    rounded: 50px
    padding: 0px 10px 0px 34px
  button-4:
    textColor: "#ffffff"
  input:
    backgroundColor: "#ffffff"
    textColor: "#000000"
    rounded: 999px
    padding: 3px 194.4px 3px 52px
  card:
    textColor: "#000000"
  card-2:
    textColor: "#000000"
    rounded: 8.64px
  card-3:
    backgroundColor: "#ffffff"
    textColor: "#000000"
  badge-brand:
    backgroundColor: "rgb(26,106,255)"
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
    rounded: 24px
    padding: 10px 16px
---

# Wix Style

## Overview

Wix Style — read from the rendered page in a browser, not from published tokens.

Tokens were read from https://www.wix.com/, not from a published token package: 61 colour tokens and 1 type tokens.

## Colors

61 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `Arial, Helvetica, sans-serif`.

## Components

8 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fff) canvas paired with `#fff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `rgb(26,106,255)` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Arial` across 1 type steps.
- **Component Geometry**: Buttons (`999px`), cards (`24px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
