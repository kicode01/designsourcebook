---
version: alpha
name: Grafana Saga
description: "Dark observability dashboard, Inter + Roboto Mono telemetry and high-contrast alerts"
colors:
  a04338: "#5a372a"
  color: "#f59433"
  webkit-tap-highlight-color: "rgba(0, 0, 0, 0)"
  eec97d: "#855a00"
  fd48cb: "#ff20ed"
  23a0db: "#00008b"
  default-annotation-color: "rgba(0, 211, 255, 1)"
  ok-color: "rgba(11, 237, 50, 1)"
  alerting-color: "rgba(237, 46, 24, 1)"
  no-data-color: "rgba(150, 150, 150, 1)"
  pending-color: "rgba(247, 149, 32, 1)"
  58558c: "#c9c5f4"
  2e2f35: "#bab4ca"
  transparent: "rgba(204, 204, 220, 0.04)"
  primary: "rgba(247, 149, 32, 1)"
typography:
  font-sans:
    fontFamily: "Inter, \"Helvetica Neue\", Arial, sans-serif"
  font-mono:
    fontFamily: "\"Roboto Mono\", monospace"
  font-size:
    fontSize: "80%"
components:
  button-primary:
    backgroundColor: "rgba(247, 149, 32, 1)"
    textColor: "#000000"
    rounded: 4px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#ffffff"
    rounded: 4px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 4px
    padding: 10px 18px
  input-default:
    backgroundColor: "#00008b"
    textColor: "#ffffff"
    rounded: 4px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#00008b"
    textColor: "#ffffff"
    rounded: 8px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "rgba(247, 149, 32, 1)"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#00008b"
    textColor: "#ffffff"
    rounded: 4px
    padding: 10px 16px
---

# Grafana Saga

## Overview

Grafana Saga — tokens imported from @grafana/ui.

Tokens were read from `@grafana/ui@13.3.1`, not from a marketing site: 15 colour tokens and 2 type tokens.

## Colors

15 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `"Roboto Mono"`.

## Visual Language

- **Surface & Theme Polarity**: Dark (#00008b) canvas paired with `#00008b` component surfaces and `#f7f7f8` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `rgba(247, 149, 32, 1)` with `#000000` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Inter` across 3 type steps.
- **Component Geometry**: Buttons (`4px`), cards (`8px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
