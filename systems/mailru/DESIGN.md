---
version: alpha
name: Mail.ru Group Paradigm
description: "Crisp light (#e7e7e9) canvas, Mail_Sans typography, #1877f2 brand accent, and pill & expressive rounded surfaces"
colors:
  bg-canvas: "#e7e7e9"
  canvas-text: "#000000"
  link-text: "#0000ee"
  link-text-1: "#19191a"
  link-border: "#919399"
  link-bg: "#005ff9"
  link-text-2: "#ffffff"
  link-border-3: "#cbcbcd"
  link-bg-4: "#a5f469"
  button-text: "#2c2d2e"
  css-surface-11: "#0052d6"
  css-color-12: "#777777"
  css-surface-13: "#1877f2"
  css-surface-14: "#387bc8"
  css-surface-15: "#d95988"
  css-surface-16: "#eb3323"
  css-color-17: "#f2f2f2"
  css-color-18: "#090909"
  primary: "#1877f2"
typography:
  header:
    fontFamily: "\"Mail_Sans\", sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.44
  nav:
    fontFamily: "\"Mail_Sans\", sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.44
  h1:
    fontFamily: "MazzardH, sans-serif"
    fontSize: 82px
    fontWeight: 600
    lineHeight: 1.05
  body:
    fontFamily: "\"Mail_Sans\", sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.44
  button:
    fontFamily: "\"Mail_Sans\", sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.44
components:
  button:
    textColor: "#000000"
  button-2:
    backgroundColor: "#005ff9"
    textColor: "#ffffff"
    rounded: 16px
    padding: 0px 28px
  button-3:
    textColor: "#2c2d2e"
    rounded: 16px
  card:
    backgroundColor: "#19191a"
    textColor: "#ffffff"
    rounded: 36px
    padding: 35px 40px
  card-2:
    textColor: "#ffffff"
  card-3:
    backgroundColor: "#ffffff"
    textColor: "#000000"
    rounded: 36px
    padding: 35px 40px
  card-4:
    textColor: "#000000"
  badge:
    textColor: "#000000"
  input-default:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 16px
    padding: 9px 13px
  nav-bar:
    backgroundColor: "#f2f2f2"
    textColor: "#0b0b0c"
    rounded: 16px
    padding: 10px 16px
---

# Mail.ru Group Paradigm

## Overview

Mail.ru Group Paradigm — read from the rendered page in a browser, not from published tokens.

Tokens were read from https://design.mail.ru/, not from a published token package: 19 colour tokens and 5 type tokens.

## Colors

19 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `"Mail_Sans", sans-serif`, `MazzardH, sans-serif`.

## Components

8 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#e7e7e9) canvas paired with `#e7e7e9` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#1877f2` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Mail_Sans` across 5 type steps.
- **Component Geometry**: Buttons (`16px`), cards (`16px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
