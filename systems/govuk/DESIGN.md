---
version: alpha
name: GOV.UK Design System
description: "GOV.UK Design System — the UK government's public-service design system."
colors:
  print-text: "#000000"
  text: "#221133"
  colour: "#a91c8e"
  contrast-safe: "#d92f14"
  primary: "#1d70b8"
  tint-25: "#5694ca"
  tint-50: "#8eb8dc"
  tint-80: "#d2e2f1"
  tint-95: "#f4f8fb"
  shade-25: "#16548a"
  shade-50: "#0f385c"
  shade-10: "#1a65a6"
  accent: "#00ffe0"
  white: "#ffffff"
  brand-colour: "#1d70b8"
  text-colour: "#0b0c0c"
  inverse-text-colour: "#fff"
  template-background-colour: "#f4f8fb"
  body-background-colour: "#fff"
  print-text-colour: "#000"
  secondary-text-colour: "#484949"
  focus-colour: "#fd0"
  focus-text-colour: "#0b0c0c"
  error-colour: "#ca3535"
  success-colour: "#0f7a52"
  border-colour: "#cecece"
  input-border-colour: "#0b0c0c"
  hover-colour: "#cecece"
  link-colour: "#1a65a6"
  link-visited-colour: "#54319f"
  link-hover-colour: "#0f385c"
  link-active-colour: "#0b0c0c"
  surface-background-colour: "#f4f8fb"
  surface-text-colour: "#0b0c0c"
  surface-border-colour: "#8eb8dc"
typography:
  heading-xl:
    fontFamily: "\"GDS Transport\", arial, sans-serif"
  heading-l:
    fontFamily: "\"GDS Transport\", arial, sans-serif"
  heading-m:
    fontFamily: "\"GDS Transport\", arial, sans-serif"
  heading-s:
    fontFamily: "\"GDS Transport\", arial, sans-serif"
  caption-xl:
    fontFamily: "\"GDS Transport\", arial, sans-serif"
  caption-l:
    fontSize: 1.3125rem
    fontWeight: 400
    lineHeight: 1.1904761905
  caption-m:
    fontFamily: "\"GDS Transport\", arial, sans-serif"
  body-s:
    fontFamily: "\"GDS Transport\", arial, sans-serif"
  error-summary-title:
    fontSize: 1.3125rem
    lineHeight: 1.1904761905
  feedback-title:
    fontFamily: "\"GDS Transport\", arial, sans-serif"
  notification-banner-title:
    fontSize: 1.1875rem
    lineHeight: 1.3157894737
  notification-banner-heading:
    fontSize: 1.3125rem
    lineHeight: 1.1904761905
  panel-title:
    fontSize: 2rem
    lineHeight: 1.09375
  summary-card-title:
    fontFamily: "\"GDS Transport\", arial, sans-serif"
  table-caption-xl:
    fontSize: 2rem
    lineHeight: 1.09375
  table-caption-l:
    fontSize: 1.6875rem
    lineHeight: 1.1111111111
  table-caption-m:
    fontSize: 1.3125rem
    lineHeight: 1.1904761905
  tabs-title:
    fontSize: 1.1875rem
    lineHeight: 1.3157894737
  font-family:
    fontFamily: "\"GDS Transport\", arial, sans-serif"
  font-family-print:
    fontFamily: sans-serif
  root-font-size:
    fontSize: 16px
components:
  tag:
    backgroundColor: "#d2e2f1"
    textColor: "#0f385c"
    typography:
      fontSize: 1.1875rem
      fontWeight: 400
    rounded: 1px
    padding: 2px 8px 3px
  label:
    textColor: "#000"
    typography:
      fontSize: 1.1875rem
      fontWeight: 400
  panel:
    textColor: "#000"
    typography:
      fontSize: 1.6875rem
      fontWeight: 400
    padding: 35px
  table:
    textColor: "#000"
    typography:
      fontSize: 1.1875rem
      fontWeight: 400
  button:
    backgroundColor: "#0f7a52"
    textColor: "#fff"
    typography:
      fontSize: 1.1875rem
      fontWeight: 400
    rounded: "0"
    padding: 8px 10px 7px
  select:
    backgroundColor: "#fff"
    textColor: "#000"
    typography:
      fontSize: 1.1875rem
      fontWeight: 400
    padding: 5px
  summary-list:
    textColor: "#000"
    typography:
      fontSize: 1.1875rem
      fontWeight: 400
  banner:
    backgroundColor: "#f4f8fb"
    textColor: "#0b0c0c"
  input-2:
    backgroundColor: "#f3f3f3"
    textColor: "#000"
    typography:
      fontSize: 1.1875rem
      fontWeight: 400
    padding: 5px
  input-3:
    backgroundColor: "#f3f3f3"
    textColor: "#000"
    typography:
      fontSize: 1.1875rem
      fontWeight: 400
    padding: 5px
  summary-2:
    textColor: "#000"
    typography:
      fontSize: 1.1875rem
      fontWeight: 400
    padding: 15px
  file-upload-button-2:
    backgroundColor: "#fff"
    padding: 18px
  card:
    textColor: "#000"
    typography:
      fontSize: 1.1875rem
      fontWeight: 700
  banner-2:
    textColor: "#000"
    typography:
      fontSize: 1rem
      fontWeight: 400
  file-upload-button-3:
    backgroundColor: "#1d70b8"
    textColor: "#fff"
    padding: 15px 10px
  card-2:
    backgroundColor: "#f3f3f3"
    padding: 15px
  banner-3:
    backgroundColor: "#fff"
    textColor: "#000"
    padding: 15px
  tag-red:
    backgroundColor: "#f4d7d7"
    textColor: "#651b1b"
  tag-teal:
    backgroundColor: "#d0e6e7"
    textColor: "#0b4144"
  tag-grey:
    backgroundColor: "#cecece"
    textColor: "#0b0c0c"
  tag-pink:
    backgroundColor: "#f4d7e5"
    textColor: "#651b3e"
  tag-green:
    backgroundColor: "#cfe4dc"
    textColor: "#083d29"
  button-warning:
    backgroundColor: "#ca3535"
    textColor: "#fff"
  button-inverse:
    backgroundColor: "#fff"
    textColor: "#1d70b8"
---

# GOV.UK Design System

## Overview

GOV.UK Design System — the UK government's public-service design system.

Tokens were read from `govuk-frontend@6.6.0`, not from a marketing site: 35 colour tokens and 21 type tokens.

## Colors

35 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `"GDS Transport", arial, sans-serif`, `sans-serif`.

## Components

24 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#f4f8fb) canvas paired with `#f4f8fb` component surfaces and `#0b0c0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#1d70b8` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `GDS Transport` across 21 type steps.
- **Component Geometry**: Buttons (`0px`), cards (`0px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
