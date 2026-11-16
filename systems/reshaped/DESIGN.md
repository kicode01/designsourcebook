---
version: alpha
name: Reshaped
description: "Modern cross-platform product kit, Inter typography and balanced neutral/indigo tokens"
colors:
  code-snippet-value: "#96d0ff"
  code-snippet-attr: "#d19a66"
  rs-color-brand: "#1860fa"
  rs-color-white: "#fff"
  rs-color-black: "#000"
  rs-color-on-background-primary: "#fff"
  rs-color-on-background-critical: "#fff"
  rs-color-on-background-warning: "#000"
  rs-color-on-background-positive: "#fff"
  rs-color-on-brand: "#fff"
  rs-color-background-primary: "#1860fa"
  rs-color-background-primary-faded: "#f5f9ff"
  rs-color-background-primary-highlighted: "#014ce7"
  rs-color-border-primary: "#0752ec"
  rs-color-border-primary-faded: "#e4ecf9"
  rs-color-foreground-primary: "#0c55ef"
  rs-color-background-critical: "#dc3246"
  rs-color-background-critical-faded: "#fff6f6"
  rs-color-background-critical-highlighted: "#c71335"
  rs-color-border-critical: "#ce1f3b"
  rs-color-border-critical-faded: "#f8e6e5"
  rs-color-foreground-critical: "#c30a32"
  rs-color-background-warning: "#ffb400"
  rs-color-background-warning-faded: "#fff7ea"
  rs-color-background-warning-highlighted: "#e09c00"
  rs-color-border-warning: "#eea900"
  rs-color-border-warning-faded: "#fae9ce"
  rs-color-foreground-warning: "#8a6000"
  rs-color-background-positive: "#238649"
  rs-color-background-positive-faded: "#effdf2"
  rs-color-background-positive-highlighted: "#02763a"
  rs-color-border-positive: "#0e7a3e"
  rs-color-border-positive-faded: "#e2efe5"
  rs-color-foreground-positive: "#147d41"
  rs-color-background-neutral: "#ebebeb"
  rs-color-background-neutral-highlighted: "#e2e2e2"
  rs-color-foreground-neutral: "#1f1f1f"
  rs-color-foreground-neutral-faded: "#6f6f6f"
  rs-color-background-disabled: "#eee"
  rs-color-background-disabled-faded: "#f8f8f8"
  rs-color-foreground-disabled: "#8f8f8f"
  rs-color-background-elevation-base: "#fff"
  rs-color-background-elevation-raised: "#fff"
  rs-color-background-elevation-overlay: "#fff"
  rs-color-background-page: "#fff"
  rs-color-background-page-faded: "#f8f8f8"
  rs-color-on-background-neutral: "#000"
  tw-ring-offset-color: "#fff"
  primary: "#1860fa"
typography:
  rs-font-size-headline-1:
    fontSize: 5rem
  rs-font-size-headline-2:
    fontSize: 4rem
  rs-font-size-headline-3:
    fontSize: 3rem
  rs-font-size-featured-1:
    fontSize: 2rem
  rs-font-size-featured-2:
    fontSize: 1.75rem
  rs-font-size-featured-3:
    fontSize: 1.5rem
  rs-font-size-featured-4:
    fontSize: 1.375rem
  rs-font-size-featured-5:
    fontSize: 1.25rem
  rs-font-size-featured-6:
    fontSize: 1.125rem
  rs-font-size-body-1:
    fontSize: ".8125rem"
  rs-font-size-body-2:
    fontSize: ".6875rem"
  rs-font-size-caption-1:
    fontSize: ".6875rem"
  rs-font-size-caption-2:
    fontSize: ".625rem"
  rs-font-family-headline:
    fontFamily: "Inter, BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial, sans-serif"
  rs-font-family-title:
    fontFamily: "Inter, BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial, sans-serif"
  rs-font-family-body:
    fontFamily: "Inter, BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial, sans-serif"
  rs-font-family-monospace:
    fontFamily: "\"Geist Mono\", SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
components:
  Button-module:
    backgroundColor: "#0000"
    rounded: inherit
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: inherit
    padding: 10px 18px
  input-default:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: inherit
    padding: 9px 13px
  card-surface:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: 10px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#1860fa"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#238649"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#fff"
    textColor: "#0b0b0c"
    rounded: inherit
    padding: 10px 16px
---

# Reshaped

## Overview

Reshaped — read from reshaped.so's live stylesheets, not a published token package.

Tokens were read from https://reshaped.so, not from a published token package: 49 colour tokens and 32 type tokens.

## Colors

49 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `Inter,BlinkMacSystemFont,-apple-system,Roboto,Helvetica,Arial,sans-serif`, `Geist Mono,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace`, `var(--rs-font-family-headline)`, `var(--rs-font-family-title)`, `var(--rs-font-family-body)`, `var(--font-sans)`, `var(--font-mono)`.

## Components

4 components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fff) canvas paired with `#fff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#1860fa` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Inter` across 17 type steps.
- **Component Geometry**: Buttons (`inherit`), cards (`10px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
