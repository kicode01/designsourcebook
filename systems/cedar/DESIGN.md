---
version: alpha
name: Cedar
description: "REI Cedar — the co-op's open-source design system."
colors:
  cdr-color-background-primary: "#f4f2ed"
  cdr-color-background-secondary: "#dcd6cb"
  cdr-color-border-primary: "#958e83"
  cdr-color-border-secondary: "#726d64"
  cdr-button-with-background-background-color-active: "#eae0cc"
  cdr-button-with-background-background-color-disabled: "#eeeae2"
  cdr-button-with-background-background-color-interact: "#eae0cc"
  cdr-button-with-background-background-color: "#eae0cc"
  cdr-button-with-background-box-shadow-active: "#eae0cc"
  cdr-button-with-background-box-shadow-disabled: "#eeeae2"
  cdr-button-with-background-fill-active: "#454441"
  cdr-button-with-background-fill-disabled: "#b2ab9f"
  cdr-button-with-background-icon-fill-active: "#454441"
  cdr-button-with-background-icon-fill-interaction: "#454441"
  cdr-button-with-background-icon-fill: "#454441"
  cdr-color-border-button-secondary-active-inset: "#eae0cc"
  default-value: "#F9F8F6"
  primary: "#eae0cc"
typography:
  html:
    fontFamily: sans-serif
    fontSize: 10px
    lineHeight: 1.15
  body:
    fontFamily: "Graphik, \"Graphik fallback\", \"Helvetica Neue\", sans-serif"
    fontSize: 1.6rem
    fontWeight: 400
    lineHeight: 1.5
  cdr-caption-summary-16-3-1:
    fontFamily: "Graphik, \"Graphik fallback\", \"Helvetica Neue\", sans-serif"
    fontSize: 1.4rem
    fontWeight: 400
    lineHeight: 2.2rem
  cdr-body-16-3-1:
    fontFamily: "Graphik, \"Graphik fallback\", \"Helvetica Neue\", sans-serif"
    fontSize: 1.8rem
    fontWeight: 400
    lineHeight: 3rem
  cdr-subheading-sans-16-3-1:
    fontFamily: "Graphik, \"Graphik fallback\", \"Helvetica Neue\", sans-serif"
    fontSize: 2.4rem
    fontWeight: 500
    lineHeight: 3rem
  cdr-modal-title-16-3-1:
    fontFamily: "Stuart, \"Stuart fallback\", Georgia, serif"
    fontSize: 2.4rem
    fontWeight: 500
    lineHeight: 3rem
  cdr-popover-title-16-3-1:
    fontFamily: "Stuart, \"Stuart fallback\", Georgia, serif"
    fontSize: 1.8rem
    fontWeight: 500
    lineHeight: 2.4rem
  cdr-title-16-3-1:
    fontFamily: "Stuart, \"Stuart fallback\", Georgia, serif"
    fontSize: 5.4rem
    fontWeight: 400
    lineHeight: 6rem
  cdr-heading-display-16-3-1:
    fontFamily: "Stuart, \"Stuart fallback\", Georgia, serif"
    fontSize: 8.6rem
    fontWeight: 400
    lineHeight: 9.2rem
  cdr-heading-sans-16-3-1:
    fontFamily: "Graphik, \"Graphik fallback\", \"Helvetica Neue\", sans-serif"
    fontSize: 2.4rem
    fontWeight: 500
    lineHeight: 3rem
  cdr-heading-serif-16-3-1:
    fontFamily: "Stuart, \"Stuart fallback\", Georgia, serif"
    fontSize: 5.4rem
    fontWeight: 500
    lineHeight: 6.4rem
components:
  button-primary:
    backgroundColor: "#eae0cc"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f4f2ed"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f4f2ed"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#eae0cc"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f4f2ed"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Cedar

## Overview

REI Cedar — the co-op's open-source design system.

Tokens were read from `@rei/cedar@16.3.1`, not from a marketing site: 18 colour tokens and 11 type tokens.

## Colors

18 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `sans-serif`, `Graphik, "Graphik fallback", "Helvetica Neue", sans-serif`, `Stuart, "Stuart fallback", Georgia, serif`.

## Visual Language

- **Surface & Theme Polarity**: Dark (#454441) canvas paired with `#454441` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#eae0cc` with `#000000` label contrast.
- **Typographic Voice**: Headings and UI controls set in `sans-serif` across 11 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
