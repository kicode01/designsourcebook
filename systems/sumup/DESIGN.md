---
version: alpha
name: Circuit UI
description: "SumUp Circuit UI — tokens imported from @sumup/design-tokens."
colors:
  cui-bg-normal: "#171d24"
  cui-bg-normal-hovered: "#212831"
  cui-bg-normal-pressed: "#28313c"
  cui-bg-subtle: "#0c0f12"
  cui-bg-subtle-hovered: "#212b31"
  cui-bg-subtle-pressed: "#36434a"
  cui-bg-highlight: "#363c41"
  cui-bg-highlight-hovered: "#3d4249"
  cui-bg-highlight-pressed: "#424950"
  cui-bg-strong: "#ffffff"
  cui-bg-strong-hovered: "#f6f8f9"
  cui-bg-strong-pressed: "#e3e7eb"
  cui-bg-accent: "#0c0f12"
  cui-bg-accent-hovered: "#20292e"
  cui-bg-accent-pressed: "#313d43"
  cui-bg-accent-strong: "#e1e7ef"
  cui-bg-accent-strong-hovered: "#ffffff"
  cui-bg-accent-strong-pressed: "#ffffff"
  cui-bg-success-strong: "#0cd368"
  cui-bg-success-strong-hovered: "#13e072"
  cui-bg-success-strong-pressed: "#25e980"
  cui-bg-warning-strong: "#f5b81c"
  cui-bg-warning-strong-hovered: "#f7c440"
  cui-bg-warning-strong-pressed: "#f7cb59"
  cui-bg-danger-strong: "#ff4e37"
  cui-bg-danger-strong-hovered: "#ff6259"
  cui-bg-danger-strong-pressed: "#ff827b"
  cui-bg-promo-strong: "#c353f7"
  cui-bg-promo-strong-hovered: "#c768f3"
  cui-bg-promo-strong-pressed: "#ce72f8"
  cui-fg-normal: "#ffffff"
  cui-fg-normal-pressed: "#e3e7eb"
  cui-fg-on-strong: "#0f131a"
  cui-fg-on-strong-hovered: "#0f131a"
  cui-fg-on-strong-pressed: "#0f131a"
  cui-fg-accent: "#e1e7ef"
  cui-fg-accent-hovered: "#ffffff"
  cui-fg-accent-pressed: "#ffffff"
  cui-fg-success: "#17db72"
  cui-fg-success-hovered: "#13e072"
  cui-fg-success-pressed: "#25e980"
  cui-fg-warning: "#f5b81c"
  cui-fg-warning-hovered: "#f7c440"
  cui-fg-warning-pressed: "#f7cb59"
  cui-fg-danger: "#ff634e"
  cui-fg-danger-hovered: "#ff5c47"
  cui-fg-danger-pressed: "#ff6a57"
  cui-fg-promo: "#cf7bf6"
  cui-fg-promo-hovered: "#c768f3"
  cui-fg-promo-pressed: "#ce72f8"
  cui-border-strong: "#ffffff"
  cui-border-strong-hovered: "#f6f8f9"
  cui-border-strong-pressed: "#e3e7eb"
  cui-border-accent: "#ffffff"
  cui-border-accent-hovered: "#f6f8f9"
  cui-border-accent-pressed: "#e3e7eb"
  cui-border-success: "#0cd368"
  cui-border-success-hovered: "#13e072"
  cui-border-success-pressed: "#25e980"
  cui-border-warning: "#f5b81c"
  cui-border-warning-hovered: "#f7c440"
  cui-border-warning-pressed: "#f7cb59"
  cui-border-danger: "#ff634e"
  cui-border-danger-hovered: "#ff5c47"
  cui-border-danger-pressed: "#ff6a57"
  cui-border-promo: "#c353f7"
  cui-border-promo-hovered: "#c768f3"
  cui-border-promo-pressed: "#ce72f8"
  cui-bg-elevated: "#2f3438"
  cui-border-focus: "#ffffff"
  primary: "#e1e7ef"
typography:
  font-size:
    fontSize: 1.25rem
  mono:
    fontFamily: "Menlo, Consolas, Monaco, \"Liberation Mono\", \"Lucida Console\", monospace"
  cui-font-stack-default:
    fontFamily: "aktiv-grotesk, Helvetica, Arial, system-ui, sans-serif, \"Segoe UI\", Roboto, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
  cui-font-stack-mono:
    fontFamily: "Menlo, Consolas, Monaco, \"Liberation Mono\", \"Lucida Console\", monospace"
  cui-typography-headline-one-font-size:
    fontSize: 2rem
  cui-typography-headline-two-font-size:
    fontSize: 1.5rem
  cui-typography-headline-three-font-size:
    fontSize: 1.25rem
  cui-typography-headline-four-font-size:
    fontSize: 1.125rem
  cui-typography-title-one-font-size:
    fontSize: 7.5rem
  cui-typography-title-two-font-size:
    fontSize: 6rem
  cui-typography-title-three-font-size:
    fontSize: 4rem
  cui-typography-title-four-font-size:
    fontSize: 3.5rem
  cui-typography-sub-headline-font-size:
    fontSize: ".875rem"
  cui-typography-body-one-font-size:
    fontSize: 1rem
  cui-typography-body-two-font-size:
    fontSize: ".875rem"
  cui-typography-body-large-font-size:
    fontSize: 1.25rem
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
    backgroundColor: "#f6f8f9"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: cui-bg-accent
    textColor: "#000000"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: cui-bg-accent
    textColor: "#000000"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f6f8f9"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f6f8f9"
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
    backgroundColor: "#f6f8f9"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Circuit UI

## Overview

**Circuit UI** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `cui-bg-accent` brand accent.

Typography centers cleanly on `aktiv-grotesk` (120px display down to 20px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#f6f8f9` surface layering.

Maintained by **SumUp**. Source: published token package (https://github.com/sumup-oss/circuit-ui/tree/main/packages/design-tokens/README.md), package `@sumup/design-tokens`. Inventory: **71** colors, **16** typography steps, and **8** documented components (Apache-2.0 license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f6f8f9` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `cui-bg-accent` (distinct vs canvas; pair with `#f7f7f8` foreground ink for verified contrast).
- **Structural Border (`border`)**: `#e3e7eb` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `cui-bg-promo-strong` (`#c353f7`), `cui-bg-promo-strong-pressed` (`#ce72f8`), `cui-fg-promo` (`#cf7bf6`), `cui-fg-promo-pressed` (`#ce72f8`), `cui-border-promo` (`#c353f7`), `cui-border-promo-pressed` (`#ce72f8`).
- **Neutral Ramp**: `cui-bg-normal` (`#171d24`), `cui-bg-normal-hovered` (`#212831`), `cui-bg-normal-pressed` (`#28313c`), `cui-bg-subtle` (`#0c0f12`), `cui-bg-subtle-hovered` (`#212b31`), `cui-bg-subtle-pressed` (`#36434a`).
- **Semantic States**: success: `cui-bg-success-strong` (`#0cd368`) · danger: `cui-bg-warning-strong-hovered` (`#f7c440`) · warning: `cui-bg-warning-strong` (`#f5b81c`).

## Typography

- **Primary / Display Voice**: `aktiv-grotesk, Helvetica, Arial, system-ui, sans-serif, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` (top step `cui-typography-title-one-font-size`: 7.5rem, weight 600).
- **Body & UI Controls**: `aktiv-grotesk, Helvetica, Arial, system-ui, sans-serif, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` (`cui-typography-body-large-font-size`: 1.25rem, weight 400).
- **Monospace / Technical Labels**: `Menlo, Consolas, Monaco, "Liberation Mono", "Lucida Console", monospace` (`mono`: 16px).
- **Scale Steps (16)**: `cui-typography-title-one-font-size` (7.5rem), `cui-typography-title-two-font-size` (6rem), `cui-typography-title-three-font-size` (4rem), `cui-typography-title-four-font-size` (3.5rem), `cui-typography-headline-one-font-size` (2rem), `cui-typography-headline-two-font-size` (1.5rem), `font-size` (1.25rem), `cui-typography-headline-three-font-size` (1.25rem).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#f6f8f9` cards; separate sibling sections using `#e3e7eb` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#f6f8f9`) and `1px solid #e3e7eb` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `cui-bg-accent` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#f6f8f9`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `cui-bg-accent`, ink `#000000`, radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `cui-bg-accent`, ink `#000000`, radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f6f8f9`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f6f8f9`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f6f8f9`, ink `#0b0b0c`, (18.5:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `cui-bg-accent` with `#f7f7f8` text (verified) for primary CTAs, active tabs, and focus outlines.
- Pair `aktiv-grotesk` headings with `aktiv-grotesk` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f6f8f9` surface shifts and `#e3e7eb` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
