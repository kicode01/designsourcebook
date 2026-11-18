---
version: alpha
name: Fishtank
description: "Bloomberg BNA Fishtank — tokens imported from @fishtank/colors."
colors:
  color-link: "#267ABD"
  color-link-visited: "#7F57B8"
  color-link-dark-bg: "#ACCCE5"
  color-disabled: "#C5CACD"
  color-error-darkest: "#B43931"
  color-error-darker: "#D5443A"
  color-error: "#E1483E"
  color-error-lighter: "#E7564A"
  color-error-lightest: "#FBECEB"
  color-warning-darkest: "#CC900D"
  color-warning-darker: "#F2AB10"
  color-warning: "#FFB511"
  color-warning-lighter: "#FFC314"
  color-warning-lightest: "#FFF7E7"
  color-background-darker: "#F2F2F2"
  color-background: "#F8F8F8"
  color-secondary-darker: "#E0E5E8"
  color-secondary: "#EDF2F5"
  color-secondary-lighter: "#F6F8FA"
  color-black: "#292E31"
  color-gray-dark: "#505558"
  color-gray: "#777C7F"
  color-gray-light: "#9EA3A6"
  color-gray-lighter: "#C5CACD"
  color-gray-lightest: "#EDF2F5"
  color-white: "#FFFFFF"
  color-blaw-blue: "#0D9DDB"
  color-btax-blue: "#2785D6"
  color-theme-antitrust: "#57534A"
  color-theme-banking: "#379851"
  color-theme-bankruptcy: "#C52700"
  color-theme-benefits: "#EA6A02"
  color-theme-corporate: "#8A5BB6"
  color-theme-ediscovery: "#F64A56"
  color-theme-environment: "#6DC470"
  color-theme-health: "#0D3B91"
  color-theme-ip: "#1E95C1"
  color-theme-labor: "#00C18C"
  color-theme-securities: "#45BDE9"
  color-theme-telecom: "#6A8C8A"
  color-action-darkest: "#30855C"
  color-action-darker: "#399E6E"
  color-action: "#3DA774"
  color-action-lighter: "#49B88B"
  color-action-lightest: "#EBF6F1"
  color-selected-darkest: "#0A7DAF"
  color-selected-darker: "#0D94CF"
  color-selected: "#0D9DDB"
  color-selected-lighter: "#0FB0E2"
  color-selected-lightest: "#E7F5FB"
  color-dataviz-1: "#63B995"
  color-dataviz-2: "#1E4882"
  color-dataviz-3: "#F87060"
  color-dataviz-4: "#1AA2AF"
  color-dataviz-5: "#FFB511"
  color-dataviz-6: "#9357C8"
  color-dataviz-7: "#F697C0"
  color-dataviz-8: "#2ECC71"
  color-dataviz-9: "#34495E"
  color-dataviz-10: "#FF6D10"
  color-dataviz-positive: "#2ECC71"
  color-dataviz-negative: "#F87060"
  color-democrat: "#0A54C2"
  color-republican: "#D3301A"
  color-independent: "#FFB00D"
  color-notification-1: "#EA60A7"
  color-notification-2: "#FFB511"
  color-notification-3: "#0D9DDB"
  color-highlight-1: "#FFF8B0"
  color-highlight-2: "#E3F7FF"
  color-highlight-3: "#E0FFE0"
  color-bna-blue: "#17509F"
  color-btax-orange: "#EA7815"
  color-bgov-navy: "#0018AB"
  color-bgov-purple: "#9933CC"
  color-btax-dark-blue: "#17509F"
  color-btax-light-blue: "#2785D6"
  color-notification1: "#EA60A7"
  color-notification2: "#FFB511"
  color-notification3: "#0D9DDB"
  color-highlight1: "#FFF8B0"
  color-highlight2: "#E3F7FF"
  color-highlight3: "#E0FFE0"
  color-dataviz1: "#63B995"
  color-dataviz2: "#1E4882"
  color-dataviz3: "#F87060"
  color-dataviz4: "#1AA2AF"
  color-dataviz5: "#FFB511"
  color-dataviz6: "#9357C8"
  color-dataviz7: "#F697C0"
  primary: "#00C18C"
rounded:
  nav: 8px
  default: 8px
icons:
  library: Inline System SVGs
  package: null
  style: outline
  grid: 20
  strokeWidth: 1.75
  strokeLinecap: round
  strokeLinejoin: round
  source: derived
components:
  select-default:
    backgroundColor: "#EDF2F5"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#00C18C"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#00C18C"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#EDF2F5"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#EDF2F5"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#FFFFFF"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#FFFFFF"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#EDF2F5"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Fishtank

## Overview

**Fishtank** is a light-first design system anchored on `#FFFFFF` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#00C18C` brand accent.

Typography centers cleanly on `System UI` (large display down to 14px body), unified by `8px` base corner radius and stepped `#FFFFFF` -> `#EDF2F5` surface layering.

Maintained by **Bloomberg BNA**. Source: published token package, package `@fishtank/colors`. Inventory: **91** colors, **0** typography steps, and **8** documented components (Apache-2.0 license).

## Colors

- **Canvas (`canvas`)**: `#FFFFFF` — base application backdrop (light theme).
- **Surface (`surface`)**: `#EDF2F5` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#00C18C` (2.3:1 vs canvas; pair with `#0b0b0c` foreground ink for 8.4:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-blaw-blue` (`#0D9DDB`), `color-btax-blue` (`#2785D6`), `color-theme-banking` (`#379851`), `color-theme-bankruptcy` (`#C52700`), `color-theme-benefits` (`#EA6A02`), `color-theme-corporate` (`#8A5BB6`).
- **Neutral Ramp**: `color-disabled` (`#C5CACD`), `color-error-lightest` (`#FBECEB`), `color-warning-lightest` (`#FFF7E7`), `color-background-darker` (`#F2F2F2`), `color-background` (`#F8F8F8`), `color-secondary-darker` (`#E0E5E8`).
- **Semantic States**: success: `color-dataviz-positive` (`#2ECC71`) · danger: `color-error-darkest` (`#B43931`) · warning: `color-warning-darkest` (`#CC900D`) · info: `color-link` (`#267ABD`).

## Typography

- **Primary / Display Voice**: `System UI`.
- **Body & UI Controls**: `System UI`.

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#EDF2F5` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#FFFFFF` -> `#EDF2F5`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#00C18C` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#EDF2F5`, ink `#0b0b0c`, (17.4:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#00C18C`, ink `#0b0b0c`, (8.4:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#00C18C`, ink `#0b0b0c`, (8.4:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#EDF2F5`, ink `#0b0b0c`, (17.4:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#EDF2F5`, ink `#0b0b0c`, (17.4:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#FFFFFF`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#FFFFFF`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#EDF2F5`, ink `#0b0b0c`, (17.4:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#FFFFFF` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#00C18C` with `#0b0b0c` text (8.4:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#EDF2F5` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
