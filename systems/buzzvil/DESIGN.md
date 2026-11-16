---
version: alpha
name: Buzzvil Design System
description: "Clean Korean ad-tech interface, vibrant coral-red accents on crisp white cards"
colors:
  bzv-color-contact-surface: "#191b1d"
  bzv-color-contact-well: "#24272a"
  bzv-color-contact-answer: "#eceeea"
  bzv-color-contact-answer-ink: "#181a1c"
  bzv-color-contact-ink: "#f5f5f2"
  bzv-color-contact-ink-muted: "#b2b5b8"
  bzv-color-contact-ink-subtle: "#a5a9ad"
  bzv-color-contact-hairline: "rgba(225,230,235,.12)"
  bzv-color-contact-hairline-strong: "rgba(225,230,235,.25)"
  bzv-hljs-bg: "#1a1b26"
  bzv-hljs-fg: "#ffffff"
  tw-ring-offset-color: "#fff"
  tw-ring-color: "rgb(59 130 246/0.5)"
  tw-shadow-color: "rgb(0 0 0/0.5)"
  primary: "#191b1d"
typography:
  font-mono-en:
    fontFamily: "\"Anonymous Pro\", \"Anonymous Pro Fallback\""
  font-mono-kr:
    fontFamily: "\"Nanum Gothic Coding\", \"Nanum Gothic Coding Fallback\""
  bzv-font-sans:
    fontFamily: "Inter, \"Noto Sans KR\", -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
  bzv-font-mono:
    fontFamily: "\"Anonymous Pro\", \"Nanum Gothic Coding\", ui-monospace, monospace"
  lib-font-sans:
    fontFamily: "Inter, \"Noto Sans KR\", -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
  lib-font-mono:
    fontFamily: "\"Anonymous Pro\", \"Nanum Gothic Coding\", ui-monospace, monospace"
  typo-caption1:
    fontSize: 14px
  typo-caption0:
    fontSize: 13px
  bzv-menu-heading:
    fontSize: 10px
    fontWeight: 500
  h1:
    fontSize: 2rem
  h2:
    fontSize: 1.5rem
  h3:
    fontSize: 1.25rem
  h4:
    fontSize: 1.1rem
  hero-title-iac43:
    fontSize: "clamp(64px,6.4vw,96px)"
    fontWeight: 700
    lineHeight: 1.04
  hero-subtitle-k63-rl:
    fontSize: "clamp(17px,1.5vw,21px)"
    fontWeight: 500
    lineHeight: 1.55
components:
  button-primary:
    backgroundColor: "#191b1d"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#dc2626"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f5f5f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f5f5f2"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#191b1d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f5f5f2"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Buzzvil Design System

## Overview

Buzzvil Design System — read from design.buzzvil.com's live stylesheets, not a published token package.

Tokens were read from https://design.buzzvil.com/, not from a published token package: 14 colour tokens and 15 type tokens.

## Colors

14 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `"Anonymous Pro", "Anonymous Pro Fallback"`, `"Nanum Gothic Coding", "Nanum Gothic Coding Fallback"`, `Inter, "Noto Sans KR", -apple-system, BlinkMacSystemFont, system-ui, sans-serif`, `"Anonymous Pro", "Nanum Gothic Coding", ui-monospace, monospace`.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#191b1d` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Anonymous Pro` across 15 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
