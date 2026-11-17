---
version: alpha
name: Spotify Backstage
description: "Developer portal system, Spotify green highlights on neutral studio surfaces"
colors:
  background-default: "#F8F8F8"
  background-paper: "#FFFFFF"
  status-ok: "#1DB954"
  status-warning: "#FF9800"
  status-error: "#E22134"
  status-running: "#1F5493"
  status-pending: "#FFED51"
  status-aborted: "#757575"
  background-color-default: "#7C3699"
  primary-main: "#1F5493"
  banner-info: "#2E77D0"
  banner-error: "#E22134"
  banner-text: "#FFFFFF"
  banner-link: "#000000"
  banner-close-button-color: "#FFFFFF"
  banner-warning: "#FF9800"
  nav-item-hover-background: "#404040"
  submenu-background: "#404040"
  pin-sidebar-button-icon: "#181818"
  pin-sidebar-button-background: "#BDBDBD"
  tabbar-indicator: "#9BF0E1"
  primary-dark: "#82BAFD"
  secondary-main: "#FF88B2"
  paper: "#FFFFFF"
  ok: "#1DB954"
  warning: "#FF9800"
  error: "#E22134"
  running: "#1F5493"
  pending: "#FFED51"
  aborted: "#757575"
  font-color: "#FEFEFE"
  slack-channel-text: "#ddd"
  main: "#1F5493"
  info: "#2E77D0"
  text: "#FFFFFF"
  link: "#000000"
  close-button-color: "#FFFFFF"
  border: "#E6E6E6"
  text-contrast: "#000000"
  text-very-subtle: "#DDD"
  text-subtle: "#6E6E6E"
  highlight: "#FFFBCC"
  error-background: "#FFEBEE"
  warning-background: "#F59B23"
  info-background: "#ebf5ff"
  error-text: "#CA001B"
  info-text: "#004e8a"
  warning-text: "#000000"
  link-hover: "#2196F3"
  gold: "#FFD600"
  background: "#171717"
  indicator: "#9BF0E1"
  color: "#b5b5b5"
  selected-color: "#FFF"
  hover-background: "#404040"
  icon: "#181818"
  primary: "#1F5493"
typography:
  font-size:
    fontSize: 0.875rem
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#1F5493"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#E22134"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#FFFFFF"
    textColor: "#000000"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#FFFFFF"
    textColor: "#000000"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#1F5493"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#FFFFFF"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 16px
---

# Spotify Backstage

## Overview

**Spotify Backstage** is a light-first design system anchored on `#F8F8F8` canvas surfaces with `#000000` primary ink (19.8:1 contrast) and `#1F5493` brand accent.

Typography centers cleanly on `System UI` (14px display down to 14px body), unified by `8px` base corner radius and stepped `#F8F8F8` -> `#FFFFFF` surface layering.

Maintained by **Spotify**. Source: published token package (https://backstage.io), repo https://github.com/backstage/backstage, package `@backstage/theme`, frameworks: react. Inventory: **57** colors, **1** typography steps, and **8** documented components (Apache-2.0 license).

## Colors

- **Canvas (`canvas`)**: `#F8F8F8` — base application backdrop (light theme).
- **Surface (`surface`)**: `#FFFFFF` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#000000` — body copy and primary headings (19.8:1 on canvas).
- **Muted Ink (`muted`)**: `#6E6E6E` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#1F5493` (7.2:1 vs canvas; pair with `#f7f7f8` foreground ink for 7.1:1 contrast).
- **Structural Border (`border`)**: `#E6E6E6` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `status-ok` (`#1DB954`), `status-running` (`#1F5493`), `status-pending` (`#FFED51`), `background-color-default` (`#7C3699`), `primary-main` (`#1F5493`), `tabbar-indicator` (`#9BF0E1`).
- **Neutral Ramp**: `background-default` (`#F8F8F8`), `background-paper` (`#FFFFFF`), `status-aborted` (`#757575`), `banner-text` (`#FFFFFF`), `banner-link` (`#000000`), `banner-close-button-color` (`#FFFFFF`).
- **Semantic States**: danger: `status-error` (`#E22134`) · warning: `status-warning` (`#FF9800`) · info: `banner-info` (`#2E77D0`).

## Typography

- **Primary / Display Voice**: `system-ui` (top step `font-size`: 0.875rem, weight 600).
- **Body & UI Controls**: `system-ui` (`font-size`: 0.875rem, weight 400).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#FFFFFF` cards; separate sibling sections using `#E6E6E6` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#F8F8F8` -> `#FFFFFF`) and `1px solid #E6E6E6` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#1F5493` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#1F5493`, ink `#ffffff`, (7.6:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#000000`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#E22134`, ink `#ffffff`, (4.7:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#FFFFFF`, ink `#000000`, (21.0:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#FFFFFF`, ink `#000000`, (21.0:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#1F5493`, ink `#ffffff`, (7.6:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#15803d`, ink `#ffffff`, (5.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#FFFFFF`, ink `#000000`, (21.0:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#F8F8F8` (light) with `#000000` primary text and `#6E6E6E` secondary labels.
- Use `#1F5493` with `#f7f7f8` text (7.1:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#FFFFFF` surface shifts and `#E6E6E6` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
