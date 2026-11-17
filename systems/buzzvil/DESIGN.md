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
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
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

**Buzzvil Design System** is a light-first design system anchored on `#fff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#191b1d` brand accent.

Display headlines pair `Inter` with `Anonymous Pro` body copy (96px display down to 16px body), unified by `8px` base corner radius and stepped `#fff` -> `#f5f5f2` surface layering.

Maintained by **Buzzvil**. Source: live stylesheet extraction (https://design.buzzvil.com/), frameworks: css. Inventory: **15** colors, **15** typography steps, and **8** documented components (all rights reserved license).

## Colors

- **Canvas (`canvas`)**: `#fff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f5f5f2` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#191b1d` (17.3:1 vs canvas; pair with `#f7f7f8` foreground ink for 16.1:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Neutral Ramp**: `bzv-color-contact-surface` (`#191b1d`), `bzv-color-contact-well` (`#24272a`), `bzv-color-contact-answer` (`#eceeea`), `bzv-color-contact-answer-ink` (`#181a1c`), `bzv-color-contact-ink` (`#f5f5f2`), `bzv-color-contact-ink-muted` (`#b2b5b8`).

## Typography

- **Primary / Display Voice**: `Inter, "Noto Sans KR", -apple-system, BlinkMacSystemFont, system-ui, sans-serif` (top step `hero-title-iac43`: clamp(64px,6.4vw,96px), weight 700, line-height 1.04).
- **Body & UI Controls**: `"Anonymous Pro", "Anonymous Pro Fallback"` (`font-mono-en`: 16px, weight 400).
- **Monospace / Technical Labels**: `"Anonymous Pro", "Anonymous Pro Fallback"` (`font-mono-en`: 16px).
- **Scale Steps (15)**: `hero-title-iac43` (clamp(64px,6.4vw,96px), w700), `h1` (2rem), `h2` (1.5rem), `hero-subtitle-k63-rl` (clamp(17px,1.5vw,21px), w500), `h3` (1.25rem), `h4` (1.1rem), `font-mono-en` (16px), `font-mono-kr` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f5f5f2` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fff` -> `#f5f5f2`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#191b1d` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#191b1d`, ink `#ffffff`, (17.3:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#dc2626`, ink `#ffffff`, (4.8:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f5f5f2`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f5f5f2`, ink `#0b0b0c`, (18.0:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#191b1d`, ink `#ffffff`, (17.3:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f5f5f2`, ink `#0b0b0c`, (18.0:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#191b1d` with `#f7f7f8` text (16.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Inter` headings with `Anonymous Pro` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f5f5f2` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
