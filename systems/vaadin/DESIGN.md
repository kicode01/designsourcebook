---
version: alpha
name: Vaadin Lumo
description: "Enterprise Java/Web Component Lumo theme, clean blue accents and fluid spacing"
colors:
  lumo-base-color: "hsl(214, 35%, 21%)"
  lumo-tint: "hsl(214, 100%, 98%)"
  lumo-shade: "hsl(214, 33%, 13%)"
  lumo-primary-color: "hsl(214, 90%, 48%)"
  lumo-primary-text-color: "hsl(214, 90%, 77%)"
  lumo-primary-contrast-color: "#fff"
  lumo-error-color: "hsl(3, 79%, 49%)"
  lumo-error-text-color: "hsl(3, 100%, 80%)"
  lumo-success-color: "hsl(145, 72%, 30%)"
  lumo-success-text-color: "hsl(145, 85%, 46%)"
  lumo-warning-color: "hsl(43, 100%, 48%)"
  lumo-warning-text-color: "hsl(45, 100%, 60%)"
  vaadin-user-color-0: "#ff66c7"
  vaadin-user-color-1: "#9d8aff"
  vaadin-user-color-2: "#8aff66"
  vaadin-user-color-3: "#ffbd66"
  vaadin-user-color-4: "#dc6bff"
  vaadin-user-color-5: "#66fffa"
  vaadin-user-color-6: "#e6ff66"
  lumo-error-contrast-color: "#fff"
  lumo-success-contrast-color: "#fff"
  vaadin-charts-color-0: "#5ac2f7"
  vaadin-charts-color-1: "#1676f3"
  vaadin-charts-color-2: "#ff7d94"
  vaadin-charts-color-3: "#c5164e"
  vaadin-charts-color-4: "#15c15d"
  vaadin-charts-color-5: "#0e8151"
  vaadin-charts-color-6: "#c18ed2"
  vaadin-charts-color-7: "#9233b3"
  vaadin-charts-color-8: "#fda253"
  vaadin-charts-color-9: "#e24932"
  primary: "hsl(214, 90%, 48%)"
typography:
  lumo-font-size-xxs:
    fontSize: 0.75rem
  lumo-font-size-xs:
    fontSize: 0.8125rem
  lumo-font-size-s:
    fontSize: 0.875rem
  lumo-font-size-m:
    fontSize: 1rem
  lumo-font-size-l:
    fontSize: 1.125rem
  lumo-font-size-xl:
    fontSize: 1.375rem
  lumo-font-size-xxl:
    fontSize: 1.75rem
  lumo-font-size-xxxl:
    fontSize: 2.5rem
  lumo-font-family:
    fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
  lumo-font-size:
    fontSize: 1rem
components:
  button-primary:
    backgroundColor: "hsl(214, 90%, 48%)"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "hsl(3, 79%, 49%)"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "hsl(214, 100%, 98%)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "hsl(214, 100%, 98%)"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "hsl(214, 90%, 48%)"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "hsl(145, 72%, 30%)"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "hsl(214, 100%, 98%)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Vaadin Lumo

## Overview

Vaadin Lumo — tokens imported from @vaadin/vaadin-lumo-styles.

Tokens were read from `@vaadin/vaadin-lumo-styles@25.3.6`, not from a marketing site: 32 colour tokens and 10 type tokens.

## Colors

32 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fff) canvas paired with `#fff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `hsl(214, 90%, 48%)` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `-apple-system` across 10 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
