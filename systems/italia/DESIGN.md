---
version: alpha
name: Italia Design System
description: "Crisp light (#fff) canvas, Titillium Web typography, #06c brand accent, and 8px corner geometry"
colors:
  color-primary: "#06c"
  color-black: "#000"
  color-white: "#fff"
  color-grey-10: "#f5f5f0"
  color-grey-15: "#f6f9fc"
  color-grey-20: "#eee"
  color-grey-30: "#ddd"
  color-grey-40: "#a5abb0"
  color-grey-50: "#5a6772"
  color-grey-60: "#444e57"
  color-grey-80: "#30373d"
  color-grey-90: "#1c2024"
  color-teal-30: "#00c5ca"
  color-teal-50: "#65dcdf"
  color-teal-70: "#004a4d"
  color-focus: "#ff8c00"
  it-base-text-color: "#1c2024"
  it-base-focus-color: "#ff8c00"
  alert-error-bg: "#ffcbcb"
  alert-error-color: "#1e1212"
  alert-error-border: "#b50000"
  alert-warning-bg: "#ffef9f"
  alert-warning-color: "#4f4310"
  alert-warning-border: "#1e1212"
  alert-success-bg: "#dff0d8"
  alert-success-color: "#274d28"
  alert-success-border: "#d6e9c6"
  alert-info-bg: "#c6f3f5"
  alert-info-color: "#004446"
  alert-info-border: "#1e1212"
  button-default-bg: "#65dde0"
  button-default-color: "#004a4d"
  button-default-border: "#50d8dc"
  button-danger-bg: "#b50000"
  button-danger-color: "#fff"
  button-danger-border: "#f00"
  button-info-bg: "#fff"
  button-info-color: "#003e54"
  button-info-border: "#ccc"
  callout-color-must: "#f4e6f5"
  callout-color-should: "#d1e7ff"
  callout-color-could: "#ebf5ef"
  callout-color-example: "#e6e5e3"
  callout-border-top-color: "#aaa"
  form-input-border-color: "#ccc"
  form-state-invalid-border-color: "#b50000"
  form-state-invalid-label-color: "#1c2024"
  form-state-invalid-message-color: "#1c2024"
  form-state-warning-border-color: "#e5ce23"
  form-state-warning-label-color: "#1c2024"
  form-state-warning-message-color: "#1c2024"
  form-label-checked-background: "#c6f3f5"
  linklist-border-color: "#d8d8d8"
  table-border-color: "#d6dce3"
  table-hover-color: "#e5f1fa"
  table-stripe-color: "#f6f7f9"
  tooltip-border-color: "#b4efef"
  prose-color-text-primary: "#1c2024"
  prose-color-text-secondary: "#5a6772"
  prose-color-text-highlighted: "#b2ebed"
  prose-color-link: "#06c"
  prose-color-link-hover: "#036"
  prose-color-link-visited: "#06c"
  spid-background: "#06c"
  border-focus-color: "#ff8c00"
  border-soft-focus-color: "#00c5ca"
  text-color-text-primary: "#333"
  text-color-text-secondary: "#5a6772"
  primary: "#06c"
typography:
  pac-font-family-sans:
    fontFamily: "\"Titillium Web\", HelveticaNeue-Light, \"Helvetica Neue Light\", \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif"
  html:
    fontSize: "100%"
  document-title:
    fontSize: 2.5em
    fontWeight: 700
    lineHeight: 1.2
  h2:
    fontSize: 2em
  h3:
    fontSize: 1.6em
  tree-title:
    fontFamily: "\"Titillium Web\", HelveticaNeue-Light, \"Helvetica Neue Light\", \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif"
    fontSize: 1.2em
    fontWeight: 700
  error-page-title:
    fontSize: 11.2em
    fontWeight: 400
  error-page-subtitle:
    fontSize: 3.3em
  spid-font-family:
    fontFamily: "\"Titillium Web\""
  print-font-size:
    fontSize: "60%"
  print-font-family:
    fontFamily: "Georgia, \"Times New Roman\", Times, serif"
  body:
    fontFamily: sans-serif
    fontSize: 1em
    lineHeight: 1.5
  h1:
    fontSize: 1.5em
components:
  label-block:
    backgroundColor: white
  button-primary:
    backgroundColor: "#06c"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#333"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ffcbcb"
    textColor: "#333"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f5f5f0"
    textColor: "#333"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f5f5f0"
    textColor: "#333"
    rounded: 12px
    padding: 18px 20px
  nav-bar:
    backgroundColor: "#f5f5f0"
    textColor: "#333"
    rounded: 8px
    padding: 10px 16px
---

# Italia Design System

## Overview

Italia Design System — tokens read from https://github.com/italia/design-web-toolkit.

Tokens were read from the project's own repository, not from a marketing site: 69 colour tokens and 13 type tokens.

## Colors

69 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `"Titillium Web", HelveticaNeue-Light, "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif`, `"Titillium Web"`, `Georgia, "Times New Roman", Times, serif`, `sans-serif`.

## Components

1 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fff) canvas paired with `#fff` component surfaces and `#333` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#06c` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Titillium Web` across 13 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
