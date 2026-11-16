---
version: alpha
name: Fomantic / Semantic UI
description: "Human-friendly HTML UI vocabulary, Lato typography and named semantic color states"
colors:
  docsearch-primary-color: "#5468ff"
  docsearch-text-color: "#1c1e21"
  docsearch-muted-color: "#969faf"
  docsearch-container-background: "rgba(101,108,133,.8)"
  docsearch-logo-color: "#5468ff"
  docsearch-modal-background: "#f5f6f7"
  docsearch-searchbox-background: "#ebedf0"
  docsearch-searchbox-focus-background: "#fff"
  docsearch-hit-color: "#444950"
  docsearch-hit-active-color: "#fff"
  docsearch-hit-background: "#fff"
  docsearch-footer-background: "#fff"
  primary: "#5468ff"
typography:
  doc-search-title:
    fontSize: 1.2em
  doc-search-hit-title:
    fontSize: ".9em"
  h1:
    fontSize: 3em
    lineHeight: 1.2
    fontFamily: null
  h2:
    fontSize: 1.75em
    lineHeight: 1
    fontFamily: null
  h3:
    fontSize: 20px
    fontFamily: null
  title:
    fontSize: 1em
    lineHeight: 1
  html:
    fontSize: 14px
  body:
    fontSize: 14px
    lineHeight: 1.4285em
  h4:
    fontSize: 1.07142857rem
  h5:
    fontSize: 1rem
  font-sans:
    fontFamily: Lato
components:
  emoji-category-button:
    textColor: "rgba(0,0,0,.6)"
    typography:
      fontSize: 1.2em
    padding: ".5em"
  Link:
    textColor: "#5468ff"
    padding: "0"
  Input:
    backgroundColor: transparent
    textColor: "#1c1e21"
    typography:
      fontSize: 1.2em
    padding: 0 0 0 8px
  Label:
    textColor: "#969faf"
    typography:
      fontSize: ".75em"
  Button:
    backgroundColor: "#ebedf0"
    textColor: "#0b0b0c"
    typography:
      fontWeight: 500
    rounded: 40px
    padding: 0 8px
  Button-Key-2:
    textColor: "#969faf"
    rounded: 3px
    padding: 0 0 2px
  card-surface:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 40px
    padding: 18px 20px
---

# Fomantic / Semantic UI

## Overview

Semantic Fomantic / Semantic UI — read from fomantic-ui.com's live stylesheets, not a published token package.

Tokens were read from https://fomantic-ui.com/, not from a published token package: 13 colour tokens and 5 type tokens.

## Colors

13 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Components

6 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fff) canvas paired with `#fff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#5468ff` with `#000000` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Lato` across 11 type steps.
- **Component Geometry**: Buttons (`40px`), cards (`40px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
