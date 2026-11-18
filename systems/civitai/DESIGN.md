---
version: alpha
name: Civitai Design System
description: "Civitai Design System — tokens imported from @civitai/theme."
colors:
  civitai-color-text: "#C1C2C5"
  civitai-color-text-dimmed: "#8c8fa3"
  civitai-color-body: "#1A1B1E"
  civitai-color-surface: "#25262B"
  civitai-color-surface-2: "#25262B"
  civitai-color-border: "#373A40"
  civitai-color-primary: "#1971C2"
  civitai-color-primary-hover: "#1864AB"
  civitai-color-primary-fg: "#fefefe"
  civitai-color-error: "#e03131"
  civitai-color-success: "#326D5C"
  civitai-color-warning: "#e8590c"
  civitai-color-info: "#1971C2"
  civitai-color-gray-0: "#f8f9fa"
  civitai-color-gray-1: "#f1f3f5"
  civitai-color-gray-2: "#e9ecef"
  civitai-color-gray-3: "#dee2e6"
  civitai-color-gray-4: "#ced4da"
  civitai-color-gray-5: "#adb5bd"
  civitai-color-gray-6: "#868e96"
  civitai-color-gray-7: "#495057"
  civitai-color-gray-8: "#343a40"
  civitai-color-gray-9: "#212529"
  civitai-color-track: "#25262B"
  civitai-color-segmented-bg: "#25262B"
  civitai-color-media-placeholder: "#25262B"
  text: "#222"
  com-civitai-theme: "#C1C2C5"
  text-dimmed: "#868e96"
  body: "#fefefe"
  surface: "#fefefe"
  surface2: "#fefefe"
  border: "#ced4da"
  primary: "#1971C2"
  primary-hover: "#1C7ED6"
  primary-fg: "#fefefe"
  error: "#fa5252"
  success: "#299C7A"
  warning: "#fd7e14"
  info: "#228BE6"
  gray0: "#f8f9fa"
  gray1: "#f1f3f5"
  gray2: "#e9ecef"
  gray3: "#dee2e6"
  gray4: "#ced4da"
  gray5: "#adb5bd"
  gray6: "#868e96"
  gray7: "#495057"
  gray8: "#343a40"
  gray9: "#212529"
  track: "#e9ecef"
  segmented-bg: "#f1f3f5"
  media-placeholder: "#e9ecef"
  color-text: "#222"
  color-text-dimmed: "#868e96"
  color-body: "#fefefe"
  color-surface: "#fefefe"
  color-surface2: "#fefefe"
  color-border: "#ced4da"
  color-primary: "#228BE6"
  color-primary-hover: "#1C7ED6"
  color-primary-fg: "#fefefe"
  color-error: "#fa5252"
  color-success: "#299C7A"
  color-warning: "#fd7e14"
  color-info: "#228BE6"
  color-gray0: "#f8f9fa"
  color-gray1: "#f1f3f5"
  color-gray2: "#e9ecef"
  color-gray3: "#dee2e6"
  color-gray4: "#ced4da"
  color-gray5: "#adb5bd"
  color-gray6: "#868e96"
  color-gray7: "#495057"
  color-gray8: "#343a40"
  color-gray9: "#212529"
  color-track: "#e9ecef"
  color-segmented-bg: "#f1f3f5"
  color-media-placeholder: "#e9ecef"
  white: "#fefefe"
  black: "#222"
typography:
  civitai-font-mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
  font:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\""
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
  font-mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
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
    backgroundColor: "#fefefe"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#1971C2"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#1971C2"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#fefefe"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#fefefe"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#fefefe"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#fefefe"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#fefefe"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Civitai Design System

## Overview

**Civitai Design System** is a light-first design system anchored on `#fefefe` canvas surfaces with `#0b0b0c` primary ink (19.5:1 contrast) and `#1971C2` brand accent.

Typography centers cleanly on `System Mono` (16px display down to 16px body), unified by `8px` base corner radius and hairline `1px` structural borders.

Maintained by **Civitai**. Source: published token package (https://github.com/civitai/civitai-app-starters/tree/main/packages/civitai-theme#readme), package `@civitai/theme`. Inventory: **81** colors, **4** typography steps, and **8** documented components (MIT license).

## Colors

- **Canvas (`canvas`)**: `#fefefe` — base application backdrop (light theme).
- **Surface (`surface`)**: `#fefefe` — elevated cards, popovers, and panels (separated via `1px` border lines).
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.5:1 on canvas).
- **Muted Ink (`muted`)**: `#868e96` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#1971C2` (5.0:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.7:1 contrast).
- **Structural Border (`border`)**: `#ced4da` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `civitai-color-primary` (`#1971C2`), `civitai-color-primary-hover` (`#1864AB`), `primary` (`#1971C2`), `primary-hover` (`#1C7ED6`), `color-primary` (`#228BE6`), `color-primary-hover` (`#1C7ED6`).
- **Neutral Ramp**: `civitai-color-text` (`#C1C2C5`), `civitai-color-text-dimmed` (`#8c8fa3`), `civitai-color-body` (`#1A1B1E`), `civitai-color-surface` (`#25262B`), `civitai-color-surface-2` (`#25262B`), `civitai-color-border` (`#373A40`).
- **Semantic States**: success: `civitai-color-success` (`#326D5C`) · danger: `civitai-color-error` (`#e03131`) · warning: `civitai-color-warning` (`#e8590c`) · info: `civitai-color-info` (`#1971C2`).

## Typography

- **Primary / Display Voice**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` (top step `civitai-font-mono`: 16px, weight 600).
- **Body & UI Controls**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` (`civitai-font-mono`: 16px, weight 400).
- **Monospace / Technical Labels**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` (`civitai-font-mono`: 16px).
- **Scale Steps (4)**: `civitai-font-mono` (16px), `font` (16px), `mono` (16px), `font-mono` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#fefefe` cards; separate sibling sections using `#ced4da` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fefefe` -> `#fefefe`) and `1px solid #ced4da` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#1971C2` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Inline System SVGs on a `20x20` grid (outline, stroke `1.75px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#fefefe`, ink `#0b0b0c`, (19.5:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#1971C2`, ink `#f7f7f8`, (4.7:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#1971C2`, ink `#f7f7f8`, (4.7:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#fefefe`, ink `#0b0b0c`, (19.5:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#fefefe`, ink `#0b0b0c`, (19.5:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fefefe`, ink `#0b0b0c`, (19.5:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fefefe`, (19.5:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#fefefe`, ink `#0b0b0c`, (19.5:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fefefe` (light) with `#0b0b0c` primary text and `#868e96` secondary labels.
- Use `#1971C2` with `#f7f7f8` text (4.7:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System Mono` headings with `System Mono` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#fefefe` surface shifts and `#ced4da` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
