---
version: alpha
name: Auth0 Cosmos
description: "Developer identity platform, FaktPro typography and high-contrast indigo accents"
colors:
  text-default: "#212121"
  text-inputs: "#555"
  text-secondary: "#757575"
  text-subtle: "#BDBDBD"
  text-error: "#FF0000"
  form-background: "#f9f9f9"
  input-background: "#FFF"
  input-background-read-only: "#F3F4F4"
  input-border: "#CCCCCC"
  input-border-hover: "#B7B7B7"
  input-border-focus: "#0a84ae"
  input-border-error: "#FF0000"
  input-text: "#333"
  input-placeholder-disabled: "#C1C1C1"
  input-label-disabled: "#C6C6C6"
  link-default: "#0a84ae"
  link-default-hover: "#053b4e"
  link-default-focus: "#053b4e"
  link-sidebar: "#333"
  link-sidebar-hover: "#FF3E00"
  link-sidebar-focus: "#FF3E00"
  tooltip-background: "#1A1A1A"
  tooltip-text: "#FFF"
  primary-background: "#44C7F4"
  primary-background-hover: "#13B7ED"
  primary-background-focus: "#13B7ED"
  primary-background-active: "#11A7D9"
  primary-text: "#FAFAFA"
  primary-border: "#44C7F4"
  primary-border-hover: "#13B7ED"
  primary-border-focus: "#13B7ED"
  primary-border-active: "#11A7D9"
  secondary-background-active: "#DADADA"
  secondary-text: "#333"
  secondary-border: "#D0D2D3"
  secondary-border-hover: "#B5B7B8"
  secondary-border-focus: "#B5B7B8"
  secondary-border-active: "#DADADA"
  cta-background: "#EB5424"
  cta-background-hover: "#D94514"
  cta-background-focus: "#D94514"
  cta-background-active: "#BF3A11"
  cta-text: "#FAFAFA"
  cta-border: "#EB5424"
  cta-border-hover: "#D94514"
  cta-border-focus: "#D94514"
  cta-border-active: "#BF3A11"
  destructive-background: "#FF0000"
  destructive-background-hover: "#E40002"
  destructive-background-focus: "#E40002"
  destructive-background-active: "#BE0001"
  destructive-text: "#FAFAFA"
  destructive-border: "#FF0000"
  destructive-border-hover: "#E40002"
  destructive-border-focus: "#E40002"
  destructive-border-active: "#BE0001"
  success-background: "#4CD964"
  success-background-hover: "#4CD964"
  success-background-focus: "#4CD964"
  success-text: "#FAFAFA"
  success-border: "#4CD964"
  success-border-hover: "#4CD964"
  success-border-focus: "#4CD964"
  success-border-active: "#4CD964"
  link-text: "#0a84ae"
  link-hover: "#0a84ae"
  link-focus: "#0a84ae"
  list-background-hover: "#FAFAFA"
  list-border-color: "#DDD"
  information-background: "#DBF4FC"
  information-text: "#097093"
  warning-background: "#FFF6CB"
  warning-text: "#786600"
  danger-background: "#FFD8CC"
  danger-text: "#801F00"
  radio-background: "#FFF"
  radio-border: "#BEBEBE"
  radio-background-selected: "#3B99FC"
  radio-border-selected: "#2C90FC"
  radio-background-disabled: "#F6F6F6"
  radio-border-disabled: "#CCC"
  status-information: "#3BC0F2"
  status-success: "#73CD1F"
  status-warning: "#F49C20"
  status-danger: "#D14B49"
  tag-background: "#DBF4FD"
  tag-border: "#3BC0F2"
  tag-text: "#3BC0F2"
  secondary: "#757575"
  error: "#FF0000"
  primary: "#44C7F4"
typography:
  font-sans:
    fontFamily: "FaktPro, \"Helvetica Neue\", Helvetica, Arial, sans-serif"
  font-code:
    fontFamily: "\"Roboto Mono\", monospace"
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#44C7F4"
    textColor: "#212121"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#212121"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#FF0000"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f9f9f9"
    textColor: "#212121"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f9f9f9"
    textColor: "#212121"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#44C7F4"
    textColor: "#212121"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#4CD964"
    textColor: "#212121"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f9f9f9"
    textColor: "#212121"
    rounded: 8px
    padding: 10px 16px
---

# Auth0 Cosmos

## Overview

**Auth0 Cosmos** is a light-first design system anchored on `#f9f9f9` canvas surfaces with `#212121` primary ink (15.3:1 contrast) and `#44C7F4` brand accent.

Typography centers cleanly on `FaktPro` (16px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **Auth0**. Source: published token package, repo https://github.com/auth0/cosmos, package `@auth0/cosmos`, frameworks: react. Inventory: **91** colors, **2** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#f9f9f9` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f9f9f9` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#212121` — body copy and primary headings (15.3:1 on canvas).
- **Muted Ink (`muted`)**: `#757575` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#44C7F4` (1.9:1 vs canvas; pair with `#0b0b0c` foreground ink for 10.0:1 contrast).
- **Structural Border (`border`)**: `#CCCCCC` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `input-border-focus` (`#0a84ae`), `primary-background` (`#44C7F4`), `primary-background-hover` (`#13B7ED`), `primary-background-focus` (`#13B7ED`), `primary-background-active` (`#11A7D9`), `primary-border` (`#44C7F4`).
- **Neutral Ramp**: `text-default` (`#212121`), `text-inputs` (`#555`), `text-secondary` (`#757575`), `text-subtle` (`#BDBDBD`), `form-background` (`#f9f9f9`), `input-background` (`#FFF`).
- **Semantic States**: success: `success-background` (`#4CD964`) · danger: `text-error` (`#FF0000`) · warning: `warning-background` (`#FFF6CB`) · info: `link-default` (`#0a84ae`).

## Typography

- **Primary / Display Voice**: `FaktPro, "Helvetica Neue", Helvetica, Arial, sans-serif` (top step `font-sans`: 16px, weight 600).
- **Body & UI Controls**: `FaktPro, "Helvetica Neue", Helvetica, Arial, sans-serif` (`font-sans`: 16px, weight 400).
- **Monospace / Technical Labels**: `"Roboto Mono", monospace` (`font-code`: 16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f9f9f9` cards; separate sibling sections using `#CCCCCC` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#f9f9f9` -> `#f9f9f9`) and `1px solid #CCCCCC` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#44C7F4` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#44C7F4`, ink `#212121`, (8.2:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#212121`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#FF0000`, ink `#000000`, (5.3:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f9f9f9`, ink `#212121`, (15.3:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f9f9f9`, ink `#212121`, (15.3:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#44C7F4`, ink `#212121`, (8.2:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#4CD964`, ink `#212121`, (8.8:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f9f9f9`, ink `#212121`, (15.3:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#f9f9f9` (light) with `#212121` primary text and `#757575` secondary labels.
- Use `#44C7F4` with `#0b0b0c` text (10.0:1) for primary CTAs, active tabs, and focus outlines.
- Pair `FaktPro` headings with `FaktPro` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#f9f9f9` surface shifts and `#CCCCCC` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
