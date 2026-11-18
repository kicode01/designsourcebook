---
version: alpha
name: Intent UI
description: "Intent UI — tokens read from https://github.com/irsyadadl/intentui."
colors:
  50: "#f8fafc"
  100: "#f1f5f9"
  200: "#e2e8f0"
  300: "#cad5e2"
  400: "#90a1b9"
  500: "#62748e"
  600: "#45556c"
  700: "#314158"
  800: "#1d293d"
  900: "#0f172b"
  950: "#020618"
  background: "#ffffff"
  foreground: "#030712"
  primary: "#155dfc"
  primary-foreground: "#ffffff"
  secondary: "#e5e7eb"
  secondary-foreground: "#030712"
  overlay: "#ffffff"
  overlay-foreground: "#030712"
  accent: "#e5e7eb"
  accent-foreground: "#030712"
  muted: "#f3f4f6"
  muted-foreground: "#6a7282"
  success: "#009966"
  success-foreground: "#ffffff"
  warning: "#ffb900"
  warning-foreground: "#461901"
  danger: "#e7000b"
  danger-foreground: "#fef2f2"
  border: "#dee2e9"
  input: "#d1d5dc"
  ring: "#155dfc"
  navbar: "#fcfeff"
  navbar-foreground: "#030712"
  sidebar: "#f9fafb"
  sidebar-foreground: "#030712"
  sidebar-primary: "#155dfc"
  sidebar-primary-foreground: "#ffffff"
  sidebar-accent: "#e5e7eb"
  sidebar-accent-foreground: "#030712"
  sidebar-border: "#dbdfe5"
  sidebar-ring: "#155dfc"
  chart-1: "#155dfc"
  chart-2: "#51a2ff"
  chart-3: "#8ec5ff"
  chart-4: "#bedbff"
  chart-5: "#dbeafe"
  card: "#ffffff"
  card-foreground: "#18181b"
  primary-subtle-foreground: "#1447e6"
  success-subtle-foreground: "#007a55"
  info-subtle-foreground: "#0069a8"
  warning-subtle-foreground: "#bb4d00"
  danger-subtle-foreground: "#c10007"
  theme-color: "#ffffff"
  background-color: "#ffffff"
  shiki-da-background: "#020203"
typography:
  font-sans:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\""
  font-mono:
    fontFamily: "\"Geist Mono\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
rounded:
  nav: 8px
  default: 8px
icons:
  library: Heroicons
  package: "@heroicons/react"
  pack: heroicons
  style: outline
  grid: 24
  strokeWidth: 1.5
  strokeLinecap: round
  strokeLinejoin: round
  source: npm
  url: "https://heroicons.com"
components:
  select-default:
    backgroundColor: "#f3f4f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#155dfc"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#155dfc"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f3f4f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f3f4f6"
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
    backgroundColor: "#f3f4f6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Intent UI

## Overview

**Intent UI** is a light-first design system anchored on `#ffffff` canvas surfaces with `#0b0b0c` primary ink (19.7:1 contrast) and `#155dfc` brand accent.

Typography centers cleanly on `Inter` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#ffffff` -> `#f3f4f6` surface layering.

Source: published token package (https://github.com/irsyadadl/intentui), repo https://github.com/irsyadadl/intentui. Inventory: **57** colors, **2** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#ffffff` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f3f4f6` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (19.7:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#155dfc` (5.2:1 vs canvas; pair with `#f7f7f8` foreground ink for 4.9:1 contrast).
- **Structural Border (`border`)**: `#dee2e9` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `400` (`#90a1b9`), `500` (`#62748e`), `600` (`#45556c`), `700` (`#314158`), `800` (`#1d293d`), `900` (`#0f172b`).
- **Neutral Ramp**: `50` (`#f8fafc`), `100` (`#f1f5f9`), `200` (`#e2e8f0`), `300` (`#cad5e2`), `950` (`#020618`), `background` (`#ffffff`).
- **Semantic States**: success: `success` (`#009966`) · danger: `danger` (`#e7000b`) · warning: `warning` (`#ffb900`) · info: `info-subtle-foreground` (`#0069a8`).

## Typography

- **Primary / Display Voice**: `Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` (top step `font-sans`: 16px, weight 600).
- **Body & UI Controls**: `Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` (`font-sans`: 16px, weight 400).
- **Monospace / Technical Labels**: `"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` (`font-mono`: 16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `8px 12px`, `2px`, `6px 12px`, `12px 14px`, `10px 14px`.
- **Hierarchy**: Group controls cleanly within `#f3f4f6` cards; separate sibling sections using `#dee2e9` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#ffffff` -> `#f3f4f6`) and `1px solid #dee2e9` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#155dfc` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px`.
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `8px` container.
- **Iconography & SVGs**: Heroicons (`@heroicons/react`) on a `24x24` grid (outline, stroke `1.5px`, `round` caps).

## Components

- **`select-default` (select)**: bg `#f3f4f6`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#155dfc`, ink `#f7f7f8`, (4.9:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#155dfc`, ink `#f7f7f8`, (4.9:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f3f4f6`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f3f4f6`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#ffffff`, ink `#0b0b0c`, (19.7:1), radius `8px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#ffffff`, (19.7:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f3f4f6`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#ffffff` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#155dfc` with `#f7f7f8` text (4.9:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Inter` headings with `Inter` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (8px on outer containers).
- Separate containers via `#f3f4f6` surface shifts and `#dee2e9` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input` fields and secondary buttons.
