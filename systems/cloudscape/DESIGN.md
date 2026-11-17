---
version: alpha
name: Cloudscape
description: "Amazon Cloudscape — the design system for AWS console experiences."
colors:
  color-charts-status-info: "#3184c2"
  color-charts-threshold-neutral: "#656871"
  color-background-notification-severity-high: "#ce3311"
  color-background-notification-severity-neutral: "#656871"
  color-text-notification-severity-medium: "#0f141a"
  color-text-badge-severity-critical: "#f9f9fa"
  color-text-badge-severity-low: "#0f141a"
  color-background-button-link-active: "#d1f1ff"
  color-background-button-normal-default: "#ffffff"
  color-background-toggle-button-normal-pressed: "#d1f1ff"
  color-background-button-primary-active: "#002b66"
  color-background-button-primary-hover: "#002b66"
  color-background-container-content: "#ffffff"
  color-background-control-default: "#ffffff"
  color-background-dropdown-item-filter-match: "#f0fbff"
  color-background-home-header: "#0f141a"
  color-background-item-selected: "#f0fbff"
  color-background-layout-panel-content: "#ffffff"
  color-background-layout-toggle-default: "#424650"
  color-background-layout-toggle-selected-default: "#006ce0"
  color-background-notification-green: "#00802f"
  color-background-notification-yellow: "#ffe347"
  color-background-flashbar-info: "#006ce0"
  color-background-progress-bar-value-default: "#006ce0"
  color-background-segment-default: "#ffffff"
  color-background-segment-wrapper: "#ffffff"
  color-background-slider-handle-default: "#006ce0"
  color-background-status-error: "#fff5f5"
  color-background-status-success: "#effff1"
  color-background-toggle-checked-disabled: "#b8e7ff"
  color-text-avatar: "#ffffff"
  color-text-chat-bubble-incoming: "#0f141a"
  color-border-toggle-button-normal-pressed: "#006ce0"
  color-border-button-normal-disabled: "#b4b4bb"
  color-text-button-icon-disabled: "#8c8c94"
  color-border-button-primary-disabled: "#ebebf0"
  color-text-side-navigation-item-active: "#006ce0"
  color-border-divider-default: "#c6c6cd"
  color-border-dropdown-item-hover: "#8c8c94"
  color-border-item-focused: "#006ce0"
  color-border-layout-side-navigation: "#c6c6cd"
  color-border-segment-default: "#424650"
  color-border-segment-hover: "#424650"
  color-border-status-info: "#006ce0"
  color-border-dialog: "#006ce0"
  color-text-body-default: "#0f141a"
  color-text-breadcrumb-icon: "#8c8c94"
  color-text-button-inline-icon-hover: "#002b66"
  color-text-button-normal-default: "#006ce0"
  color-text-button-link-default: "#006ce0"
  color-text-button-primary-active: "#ffffff"
  color-text-calendar-date-selected: "#ffffff"
  color-text-dropdown-item-disabled: "#b4b4bb"
  color-text-dropdown-item-secondary: "#656871"
  color-text-expandable-section-hover: "#006ce0"
  color-text-form-secondary: "#656871"
  color-text-heading-default: "#0f141a"
  color-text-home-header-secondary: "#c6c6cd"
  color-text-input-placeholder: "#656871"
  color-text-interactive-disabled: "#b4b4bb"
  color-text-interactive-inverted-default: "#dedee3"
  color-text-layout-toggle: "#ffffff"
  color-text-layout-toggle-selected: "#ffffff"
  color-text-link-secondary-default: "#006ce0"
  color-text-link-info-hover: "#002b66"
  color-text-segment-active: "#ffffff"
  color-text-status-error: "#db0000"
  color-text-status-success: "#00802f"
  color-dropzone-background-default: "#ffffff"
  color-dropzone-text-hover: "#424650"
  color-background-action-card-default: "#ffffff"
  color-border-action-card-default: "#006ce0"
  color-border-action-card-disabled: "#b4b4bb"
  color-text-action-card-icon-default: "#006ce0"
  color-text-action-card-icon-disabled: "#b4b4bb"
  color-background-badge-red: "#db0000"
  color-text-badge-grey: "#f9f9fa"
  color-text-badge-red: "#f9f9fa"
  color-charts-red-300: "#ea7158"
  color-charts-orange-600: "#a84401"
  color-charts-yellow-900: "#5d4503"
  color-charts-green-1200: "#0d4000"
  color-charts-blue-1-500: "#0273bb"
  color-charts-blue-2-800: "#2c46b1"
  color-charts-purple-1100: "#4a238b"
  color-charts-status-high: "#ba2e0f"
  color-charts-palette-categorical-5: "#e07941"
  color-charts-palette-categorical-18: "#003e38"
  color-charts-palette-categorical-31: "#1f3191"
  color-charts-palette-categorical-44: "#59309d"
  primary: "#002b66"
typography:
  font-family-base:
    fontFamily: "\"Open Sans\", \"Helvetica Neue\", Roboto, Arial, sans-serif"
  font-family-display:
    fontFamily: "\"Open Sans\", \"Helvetica Neue\", Roboto, Arial, sans-serif"
  font-family-heading:
    fontFamily: "\"Open Sans\", \"Helvetica Neue\", Roboto, Arial, sans-serif"
  font-family-monospace:
    fontFamily: "Monaco, Menlo, Consolas, \"Courier Prime\", Courier, \"Courier New\", monospace"
  font-size-body-m:
    fontSize: 14px
  font-size-body-s:
    fontSize: 12px
  font-size-display-l:
    fontSize: 42px
  font-size-display-xl:
    fontSize: 64px
  font-size-heading-l:
    fontSize: 20px
  font-size-heading-m:
    fontSize: 18px
  font-size-heading-s:
    fontSize: 16px
  font-size-heading-xl:
    fontSize: 24px
  font-size-heading-xs:
    fontSize: 14px
  font-size-tabs:
    fontSize: 16px
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
icons:
  library: Cloudscape Repo SVGs
  package: "@cloudscape-design/design-tokens"
  style: solid
  grid: 16
  strokeWidth: 0
  strokeLinecap: round
  strokeLinejoin: round
  source: repo
components:
  button-primary:
    backgroundColor: "#002b66"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#db0000"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#002b66"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#00802f"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
  select-default:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#002b66"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#002b66"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#ffffff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Cloudscape

## Overview

**Cloudscape** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#002b66` brand accent.

Typography centers cleanly on `Open Sans` (64px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **Amazon**. Source: published token package (https://cloudscape.design), repo https://github.com/cloudscape-design/components, package `@cloudscape-design/design-tokens`, frameworks: react, css. Inventory: **91** colors, **14** typography steps, and **16** documented components (Apache-2.0 license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#ffffff` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#002b66` (13.7:1 vs canvas; pair with `#f7f7f8` foreground ink for 12.8:1 contrast).
- **Structural Border (`border`)**: `#ebebf0` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-background-notification-severity-high` (`#ce3311`), `color-background-toggle-button-normal-pressed` (`#d1f1ff`), `color-background-button-primary-active` (`#002b66`), `color-background-button-primary-hover` (`#002b66`), `color-background-layout-toggle-selected-default` (`#006ce0`), `color-background-progress-bar-value-default` (`#006ce0`).
- **Neutral Ramp**: `color-charts-threshold-neutral` (`#656871`), `color-background-notification-severity-neutral` (`#656871`), `color-text-notification-severity-medium` (`#0f141a`), `color-text-badge-severity-critical` (`#f9f9fa`), `color-text-badge-severity-low` (`#0f141a`), `color-background-button-normal-default` (`#ffffff`).
- **Semantic States**: success: `color-background-notification-green` (`#00802f`) · danger: `color-text-status-error` (`#db0000`) · warning: `color-background-notification-yellow` (`#ffe347`) · info: `color-charts-status-info` (`#3184c2`).

## Typography

- **Primary / Display Voice**: `"Open Sans", "Helvetica Neue", Roboto, Arial, sans-serif` (top step `font-size-display-xl`: 64px, weight 600).
- **Body & UI Controls**: `"Open Sans", "Helvetica Neue", Roboto, Arial, sans-serif` (`font-family-base`: 16px, weight 400).
- **Monospace / Technical Labels**: `Monaco, Menlo, Consolas, "Courier Prime", Courier, "Courier New", monospace` (`font-family-monospace`: 16px).
- **Scale Steps (14)**: `font-size-display-xl` (64px), `font-size-display-l` (42px), `font-size-heading-xl` (24px), `font-size-heading-l` (20px), `font-size-heading-m` (18px), `font-family-base` (16px), `font-family-display` (16px), `font-family-heading` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#ffffff` cards; separate sibling sections using `#ebebf0` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#ffffff`) and `1px solid #ebebf0` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#002b66` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.
- **Iconography & SVGs**: Inline System SVGs on a `16x16` grid (solid, stroke `0px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#002b66`, ink `#ffffff`, (13.7:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#db0000`, ink `#ffffff`, (5.2:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#002b66`, ink `#ffffff`, (13.7:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#00802f`, ink `#ffffff`, (5.1:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#002b66`, ink `#f7f7f8`, (12.8:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#002b66`, ink `#f7f7f8`, (12.8:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#002b66` with `#f7f7f8` text (12.8:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Open Sans` headings with `Open Sans` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#ffffff` surface shifts and `#ebebf0` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
