---
version: alpha
name: Flowbite Design System
description: "Crisp light (#F9FAFB) canvas, Inter typography, #79b8ff brand accent, and 8px corner geometry"
colors:
  color-shiki-fg-brand: "#79b8ff"
  color-shiki-fg-brand-subtle: "#9ecbff"
  background-color: "#fff"
  shiki-background: "#24292e"
  gray-50: "#F9FAFB"
  gray-100: "#F3F4F6"
  gray-200: "#E5E7EB"
  gray-300: "#D1D5DB"
  gray-400: "#9CA3AF"
  gray-500: "#6B7280"
  gray-600: "#4B5563"
  gray-700: "#374151"
  gray-800: "#1F2937"
  gray-900: "#111827"
  red-50: "#FDF2F2"
  red-100: "#FDE8E8"
  red-200: "#FBD5D5"
  red-300: "#F8B4B4"
  red-400: "#F98080"
  red-500: "#F05252"
  red-600: "#E02424"
  red-700: "#C81E1E"
  red-800: "#9B1C1C"
  red-900: "#771D1D"
  orange-50: "#FFF8F1"
  orange-100: "#FEECDC"
  orange-200: "#FCD9BD"
  orange-300: "#FDBA8C"
  orange-400: "#FF8A4C"
  orange-500: "#FF5A1F"
  orange-600: "#D03801"
  orange-700: "#B43403"
  orange-800: "#8A2C0D"
  orange-900: "#771D1D"
  yellow-50: "#FDFDEA"
  yellow-100: "#FDF6B2"
  yellow-200: "#FCE96A"
  yellow-300: "#FACA15"
  yellow-400: "#E3A008"
  yellow-500: "#C27803"
  yellow-600: "#9F580A"
  yellow-700: "#8E4B10"
  yellow-800: "#723B13"
  yellow-900: "#633112"
  green-50: "#F3FAF7"
  green-100: "#DEF7EC"
  green-200: "#BCF0DA"
  green-300: "#84E1BC"
  green-400: "#31C48D"
  green-500: "#0E9F6E"
  green-600: "#057A55"
  green-700: "#046C4E"
  green-800: "#03543F"
  green-900: "#014737"
  teal-50: "#EDFAFA"
  teal-100: "#D5F5F6"
  teal-200: "#AFECEF"
  teal-300: "#7EDCE2"
  teal-400: "#16BDCA"
  teal-500: "#0694A2"
  teal-600: "#047481"
  teal-700: "#036672"
  teal-800: "#05505C"
  teal-900: "#014451"
  blue-50: "#EBF5FF"
  blue-100: "#E1EFFE"
  blue-200: "#C3DDFD"
  blue-300: "#A4CAFE"
  blue-400: "#76A9FA"
  blue-500: "#3F83F8"
  blue-600: "#1C64F2"
  blue-700: "#1A56DB"
  blue-800: "#1E429F"
  blue-900: "#233876"
  indigo-50: "#F0F5FF"
  indigo-100: "#E5EDFF"
  indigo-200: "#CDDBFE"
  indigo-300: "#B4C6FC"
  indigo-400: "#8DA2FB"
  indigo-500: "#6875F5"
  indigo-600: "#5850EC"
  indigo-700: "#5145CD"
  indigo-800: "#42389D"
  indigo-900: "#362F78"
  purple-50: "#F6F5FF"
  purple-100: "#EDEBFE"
  purple-200: "#DCD7FE"
  purple-300: "#CABFFD"
  purple-400: "#AC94FA"
  purple-500: "#9061F9"
  primary: "#79b8ff"
typography:
  font-sans:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif"
  font-body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif"
  font-mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#79b8ff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#F05252"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#F3F4F6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#F3F4F6"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#79b8ff"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#057A55"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#F3F4F6"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Flowbite Design System

## Overview

**Flowbite Design System** is a light-first design system anchored on `#F9FAFB` canvas surfaces with `#0b0b0c` primary ink (18.8:1 contrast) and `#79b8ff` brand accent.

Typography centers cleanly on `Inter` (16px display down to 16px body), unified by `8px` base corner radius and stepped `#F9FAFB` -> `#F3F4F6` surface layering.

Maintained by **Flowbite**. Source: published token package (https://github.com/themesberg/flowbite), repo https://github.com/themesberg/flowbite, package `flowbite`, frameworks: css, react, vue, svelte, angular. Inventory: **91** colors, **3** typography steps, and **8** documented components (see repository license).

## Colors

- **Canvas (`canvas`)**: `#F9FAFB` — base application backdrop (light theme).
- **Surface (`surface`)**: `#F3F4F6` — elevated cards, popovers, and panels.
- **Primary Ink (`text`)**: `#0b0b0c` — body copy and primary headings (18.8:1 on canvas).
- **Muted Ink (`muted`)**: `#0b0b0c` — secondary captions, placeholders, and helper labels.
- **Brand Accent (`brand`)**: `#79b8ff` (2.0:1 vs canvas; pair with `#0b0b0c` foreground ink for 9.5:1 contrast).
- **Structural Border (`border`)**: `color-mix(in srgb, #0b0b0c 14%, transparent)` — divider rules, input strokes, and card outlines.
- **Brand & Accent Scale**: `color-shiki-fg-brand` (`#79b8ff`), `color-shiki-fg-brand-subtle` (`#9ecbff`), `gray-700` (`#374151`), `green-100` (`#DEF7EC`), `teal-100` (`#D5F5F6`), `teal-200` (`#AFECEF`).
- **Neutral Ramp**: `background-color` (`#fff`), `shiki-background` (`#24292e`), `gray-50` (`#F9FAFB`), `gray-100` (`#F3F4F6`), `gray-200` (`#E5E7EB`), `gray-300` (`#D1D5DB`).
- **Semantic States**: success: `green-200` (`#BCF0DA`) · danger: `red-200` (`#FBD5D5`) · warning: `orange-100` (`#FEECDC`).

## Typography

- **Primary / Display Voice**: `Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif` (top step `font-sans`: 16px, weight 600).
- **Body & UI Controls**: `Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif` (`font-body`: 16px, weight 400).
- **Monospace / Technical Labels**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` (`font-mono`: 16px).
- **Scale Steps (3)**: `font-sans` (16px), `font-body` (16px), `font-mono` (16px).

## Layout

- **Grid & Control Spacing**: Derived from 8 component tokens with documented paddings: `10px 18px`, `9px 13px`, `18px 20px`, `4px 10px`, `10px 16px`.
- **Hierarchy**: Group controls cleanly within `#F3F4F6` cards; separate sibling sections using `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines rather than oversized whitespace.

## Elevation

- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (`#F9FAFB` -> `#F3F4F6`) and `1px solid color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines instead of heavy drop shadows.
- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on `#79b8ff` for keyboard focus and active selection states.

## Shapes

- **Base Corner Geometry**: `8px` (Buttons `8px` · Inputs `8px` · Cards `12px` · Badges `999px` · Navigation `8px`).
- **Nested Concentricity**: Keep nested pills/badges pill-shaped (`999px`) or tighter than their parent `12px` container.

## Components

- **`button-primary` (button)**: bg `#79b8ff`, ink `#0b0b0c`, (9.5:1), radius `8px`, padding `10px 18px`.
- **`button-secondary` (button)**: bg `transparent`, ink `#0b0b0c`, radius `8px`, padding `10px 18px`.
- **`button-danger` (button)**: bg `#F05252`, ink `#0b0b0c`, (5.7:1), radius `8px`, padding `10px 18px`.
- **`input-default` (input)**: bg `#F3F4F6`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `9px 13px`.
- **`card-surface` (card)**: bg `#F3F4F6`, ink `#0b0b0c`, (17.9:1), radius `12px`, padding `18px 20px`.
- **`badge-brand` (badge)**: bg `#79b8ff`, ink `#0b0b0c`, (9.5:1), radius `999px`, padding `4px 10px`.
- **`badge-success` (badge)**: bg `#057A55`, ink `#ffffff`, (5.4:1), radius `999px`, padding `4px 10px`.
- **`nav-bar` (nav)**: bg `#F3F4F6`, ink `#0b0b0c`, (17.9:1), radius `8px`, padding `10px 16px`.

## Do's and Don'ts

### Do
- Anchor base views on `#F9FAFB` (light) with `#0b0b0c` primary text and `#0b0b0c` secondary labels.
- Use `#79b8ff` with `#0b0b0c` text (9.5:1) for primary CTAs, active tabs, and focus outlines.
- Pair `Inter` headings with `Inter` body copy using documented weights and scale steps.
- Apply `8px` base geometry across inputs and buttons (12px on outer containers).
- Separate containers via `#F3F4F6` surface shifts and `color-mix(in srgb, #0b0b0c 14%, transparent)` hairlines cleanly.

### Don't
- Do not invert the base canvas out of light polarity without explicitly switching component text tokens.
- Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.
- Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.
- Do not mix conflicting corner radii that clash with the system's `8px` baseline.
- Do not truncate or drop border contrast on `input-default` fields and secondary buttons.
