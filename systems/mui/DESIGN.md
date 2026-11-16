---
version: alpha
name: MUI Material UI
description: "Dark (#121212) canvas, Roboto typography, #fff brand accent, and 8px corner geometry"
colors:
  primary: "#fff"
  color: "#fff"
  background-color: "#fff"
  color-prettylights-syntax-comment: "#b2b2b2"
  color-prettylights-syntax-constant: "#f8f8f2"
  color-prettylights-syntax-constant-other-reference-l: "#a6e22e"
  color-prettylights-syntax-entity: "#a6e22e"
  color-prettylights-syntax-entity-name: "#e6db74"
  color-prettylights-syntax-entity-tag: "#fc929e"
  color-prettylights-syntax-keyword: "#66d9ef"
  color-prettylights-syntax-string: "#a6e22e"
  color-prettylights-syntax-string-regexp: "#fd971f"
  color-prettylights-syntax-variable: "#f8f8f2"
  color-prettylights-syntax-storage-modifier-import: "#f8f8f2"
  color-prettylights-syntax-brackethighlighter-angle: "#f8f8f2"
  color-prettylights-syntax-brackethighlighter-unmatch: "#fc929e"
  color-prettylights-syntax-sublimelinter-gutter-mark: "#b2b2b2"
  color-prettylights-syntax-invalid-illegal-bg: "#fc929e"
  color-prettylights-syntax-invalid-illegal-text: "#f8f8f2"
  color-prettylights-syntax-carriage-return-bg: "#fc929e"
  color-prettylights-syntax-carriage-return-text: "#f8f8f2"
  color-prettylights-syntax-markup-heading: "#66d9ef"
  color-prettylights-syntax-markup-bold: "#f8f8f2"
  color-prettylights-syntax-markup-italic: "#f8f8f2"
  color-prettylights-syntax-markup-list: "#fc929e"
  color-prettylights-syntax-markup-changed-text: "#e6db74"
  color-prettylights-syntax-markup-deleted-text: "#fc929e"
  color-prettylights-syntax-markup-inserted-text: "#a6e22e"
  color-prettylights-syntax-markup-ignored-text: "#b2b2b2"
  color-prettylights-syntax-meta-diff-range: "#b78eff"
  color-docs-infra-syntax-number: "#b78eff"
  color-docs-infra-syntax-boolean: "#b78eff"
  color-docs-infra-syntax-nullish: "#b2b2b2"
  color-docs-infra-syntax-attr-key: "#a6e22e"
  color-docs-infra-syntax-attr-value: "#e6db74"
  color-docs-infra-syntax-attr-value-quote: "#f8f8f2"
  color-docs-infra-syntax-attr-equals: "#f8f8f2"
  color-docs-infra-syntax-data-attr: "#a6e22e"
  color-docs-infra-syntax-css-property: "#fc929e"
  color-docs-infra-syntax-css-value: "#f8f8f2"
  color-docs-infra-syntax-this: "#66d9ef"
  color-docs-infra-syntax-builtin-type: "#66d9ef"
  color-docs-infra-syntax-jsx: "#e6db74"
  color-docs-infra-syntax-jsx-variable: "#fc929e"
  color-docs-infra-syntax-html-tag: "#fc929e"
  color-docs-infra-syntax-jsx-tag: "#fc929e"
  color-docs-infra-syntax-property-string: "#fc929e"
  color-docs-infra-syntax-object-property: "#fc929e"
  color-docs-infra-syntax-punctuation: "#f8f8f2"
  a100: "#ffe57f"
  a200: "#ffd740"
  a400: "#ffc400"
  a700: "#ffab00"
  black: "#000"
  white: "#fff"
  background-paper: "#121212"
  background-default: "#121212"
  paper: "#121212"
  main: "#ed6c02"
  background: "#e5e5e5"
typography:
  default-font-family:
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  font-size:
    fontSize: 20px
components:
  button-primary:
    backgroundColor: "#fff"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#121212"
    textColor: "#ffffff"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#121212"
    textColor: "#ffffff"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#fff"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#121212"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 16px
---

# MUI Material UI

## Overview

MUI: MUI Material UI — tokens read from https://github.com/mui/material-ui.

Tokens were read from the project's own repository, not from a marketing site: 60 colour tokens and 0 type tokens.

## Colors

60 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Dark (#121212) canvas paired with `#121212` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#fff` with `#000000` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Roboto` across 2 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
