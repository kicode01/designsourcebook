---
version: alpha
name: Chakra UI
description: "Crisp light (#fafafa) canvas, -apple-system typography, #0c5d56 brand accent, and 6px corner geometry"
colors:
  brand-50: "#e6f2ff"
  brand-100: "#e6f2ff"
  brand-200: "#bfdeff"
  brand-300: "#99caff"
  brand-950: "#001a33"
  brand-500: "#fff"
  gray-50: "#fafafa"
  gray-100: "#f4f4f5"
  gray-200: "#e4e4e7"
  gray-300: "#d4d4d8"
  gray-400: "#a1a1aa"
  gray-500: "#71717a"
  gray-600: "#52525b"
  gray-700: "#3f3f46"
  gray-800: "#27272a"
  gray-900: "#18181b"
  gray-950: "#111111"
  red-50: "#fef2f2"
  red-100: "#fee2e2"
  red-200: "#fecaca"
  red-300: "#fca5a5"
  red-400: "#f87171"
  red-500: "#ef4444"
  red-600: "#dc2626"
  red-700: "#991919"
  red-800: "#511111"
  red-900: "#300c0c"
  red-950: "#1f0808"
  orange-50: "#fff7ed"
  orange-100: "#ffedd5"
  orange-200: "#fed7aa"
  orange-300: "#fdba74"
  orange-400: "#fb923c"
  orange-500: "#f97316"
  orange-600: "#ea580c"
  orange-700: "#92310a"
  orange-800: "#6c2710"
  orange-900: "#3b1106"
  orange-950: "#220a04"
  yellow-50: "#fefce8"
  yellow-100: "#fef9c3"
  yellow-200: "#fef08a"
  yellow-300: "#fde047"
  yellow-400: "#facc15"
  yellow-500: "#eab308"
  yellow-600: "#ca8a04"
  yellow-700: "#845209"
  yellow-800: "#713f12"
  yellow-900: "#422006"
  yellow-950: "#281304"
  green-50: "#f0fdf4"
  green-100: "#dcfce7"
  green-200: "#bbf7d0"
  green-300: "#86efac"
  green-400: "#4ade80"
  green-500: "#22c55e"
  green-600: "#16a34a"
  green-700: "#116932"
  green-800: "#124a28"
  green-900: "#042713"
  green-950: "#03190c"
  teal-50: "#f0fdfa"
  teal-100: "#ccfbf1"
  teal-200: "#99f6e4"
  teal-300: "#5eead4"
  teal-400: "#2dd4bf"
  teal-500: "#14b8a6"
  teal-600: "#0d9488"
  teal-700: "#0c5d56"
  teal-800: "#114240"
  teal-900: "#032726"
  teal-950: "#021716"
  blue-50: "#eff6ff"
  blue-100: "#dbeafe"
  blue-200: "#bfdbfe"
  blue-300: "#a3cfff"
  blue-400: "#60a5fa"
  blue-500: "#3b82f6"
  blue-600: "#2563eb"
  blue-700: "#173da6"
  blue-800: "#1a3478"
  blue-900: "#14204a"
  blue-950: "#0c142e"
  cyan-50: "#ecfeff"
  cyan-100: "#cffafe"
  cyan-200: "#a5f3fc"
  cyan-300: "#67e8f9"
  cyan-400: "#22d3ee"
  cyan-500: "#06b6d4"
  cyan-600: "#0891b2"
  primary: "#0c5d56"
typography:
  heading:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
  mono:
    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
  font-size:
    fontSize: 0.25em
    fontFamily: null
rounded:
  button: 6px
  input: 6px
  card: 10px
  badge: 999px
  nav: 6px
  default: 6px
icons:
  library: Lucide / Chakra Icons
  package: lucide-react
  style: outline
  grid: 24
  strokeWidth: 2
  strokeLinecap: round
  strokeLinejoin: round
  source: curated
  url: "https://chakra-ui.com"
components:
  button-primary:
    backgroundColor: "#0c5d56"
    textColor: "#ffffff"
    rounded: 6px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 18px
  input-default:
    backgroundColor: "#f4f4f5"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#f4f4f5"
    textColor: "#0b0b0c"
    rounded: 10px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#0c5d56"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#16a34a"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#f4f4f5"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 16px
  select-default:
    backgroundColor: "#f4f4f5"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#0c5d56"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#0c5d56"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#f4f4f5"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#f4f4f5"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#fafafa"
    textColor: "#0b0b0c"
    rounded: 6px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#fafafa"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#f4f4f5"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Chakra UI

## Overview

**Chakra UI** is a light-first design system anchored on `#fafafa` canvas surfaces with `#0b0b0c` primary ink (18.8:1 contrast) and `#0c5d56` brand accent.

Typography centers cleanly on `System UI` (16px display down to 16px body), unified by `6px` base corner radius and stepped `#fafafa` -> `#f4f4f5` surface layering.

Source: published token package (https://github.com/chakra-ui/chakra-ui), repo https://github.com/chakra-ui/chakra-ui, package `@chakra-ui/react`, frameworks: react, vue. Inventory: **91** colors, **4** typography steps, and **16** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#fafafa` — base application backdrop (light theme).
- **Surface (`surface`)**: `#f4f4f5` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (18.8:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#0c5d56` (7.4:1 vs canvas; pair with `#f7f7f8` foreground ink for 7.2:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `brand-50` (`#e6f2ff`), `brand-100` (`#e6f2ff`), `brand-200` (`#bfdeff`), `brand-300` (`#99caff`), `brand-950` (`#001a33`), `teal-100` (`#ccfbf1`).
- **Neutral Ramp**: `brand-500` (`#fff`), `gray-50` (`#fafafa`), `gray-100` (`#f4f4f5`), `gray-200` (`#e4e4e7`), `gray-300` (`#d4d4d8`), `gray-400` (`#a1a1aa`).
- **Semantic States**: success: `green-100` (`#dcfce7`) · danger: `red-100` (`#fee2e2`) · warning: `orange-100` (`#ffedd5`).

## Typography

- **Primary / Display Voice**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` (top step `heading`: 16px, weight 600).
- **Body & UI Controls**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` (`body`: 16px, weight 400).
- **Monospace / Technical Labels**: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` (`mono`: 16px).
- **Scale Steps (4)**: `heading` (16px), `body` (16px), `mono` (16px), `font-size` (0.25em).

## Layout

- **Grid & Control Spacing**: Derived from 16 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#f4f4f5` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#fafafa` -> `#f4f4f5`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#0c5d56` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `6px` (Buttons `6px` · Inputs `6px` · Cards `10px` · Badges `999px` · Navigation `6px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `10px` container.
- **Iconography & SVGs**: Lucide / Chakra Icons (`lucide-react`) on a `24x24` grid (outline, stroke `2px`, `round` caps).

## Components

- **`button-primary` (button)**: bg `#0c5d56`, ink `#ffffff`, (7.7:1), radius `6px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `6px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#ef4444`, ink `#0b0b0c`, (5.2:1), radius `6px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#f4f4f5`, ink `#0b0b0c`, (17.9:1), radius `6px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#f4f4f5`, ink `#0b0b0c`, (17.9:1), radius `10px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#0c5d56`, ink `#ffffff`, (7.7:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#16a34a`, ink `#0b0b0c`, (6.0:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#f4f4f5`, ink `#0b0b0c`, (17.9:1), radius `6px`, padding `10px 16px`.
- **`select-default` (select)**: bg `#f4f4f5`, ink `#0b0b0c`, (17.9:1), radius `6px`, padding `8px 12px`.
- **`switch-control` (switch)**: bg `#0c5d56`, ink `#f7f7f8`, (7.2:1), radius `999px`, padding `2px`.
- **`checkbox-control` (checkbox)**: bg `#0c5d56`, ink `#f7f7f8`, (7.2:1), radius `4px`, padding `2px`.
- **`tabs-nav` (tabs)**: bg `#f4f4f5`, ink `#0b0b0c`, (17.9:1), radius `6px`, padding `6px 12px`.
- **`alert-info` (alert)**: bg `#f4f4f5`, ink `#0b0b0c`, (17.9:1), radius `6px`, padding `12px 14px`.
- **`table-grid` (table)**: bg `#fafafa`, ink `#0b0b0c`, (18.8:1), radius `6px`, padding `10px 14px`.
- **`tooltip-overlay` (tooltip)**: bg `#0b0b0c`, ink `#fafafa`, (18.8:1), radius `6px`, padding `6px 10px`.
- **`icon-glyph` (icon)**: bg `#f4f4f5`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `8px`.

## Do's and Don'ts

### Do
- Anchor base views on `#fafafa` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#0c5d56` with `#f7f7f8` text (7.2:1) for primary CTAs, active tabs, and focus outlines.
- Pair `System UI` headings with `System UI` body copy using documented weights and scale steps.
- Apply `6px` base geometry across inputs and buttons (10px on outer containers).
- Separate containers via `#f4f4f5` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `6px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
