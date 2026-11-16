---
version: alpha
name: GOV.UK Design System
description: "GOV.UK Design System — the UK government's public-service design system."
colors:
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
  primary: "#1d70b8"
typography:
  root-font-size:
    fontSize: "16px !default"
  context-font-size:
    fontSize: "$context-font-size * 1px"
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
  tabs:
    textColor: "#000"
    typography:
      fontSize: 1.1875rem
      fontWeight: 400
  summary-list:
    textColor: "#000"
    typography:
      fontSize: 1.1875rem
      fontWeight: 400
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
  summary-card-2:
    textColor: "#000"
    typography:
      fontSize: 1.1875rem
      fontWeight: 700
  summary-card-3:
    backgroundColor: "#f3f3f3"
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
  button-secondary:
    backgroundColor: "#f3f3f3"
    textColor: "#0b0c0c"
  panel-confirmation:
    backgroundColor: "#0f7a52"
  panel-interruption:
    backgroundColor: "#1d70b8"
---

# GOV.UK Design System

## Overview

GOV.UK Design System — the UK government's public-service design system.

Tokens were read from `govuk-frontend@6.6.0`, not from a marketing site: 21 colour tokens and 2 type tokens.

## Colors

21 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Components

22 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.
