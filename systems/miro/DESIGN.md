---
version: alpha
name: Miro
description: "Bright yellow accent, infinite canvas aesthetic"
colors:
  primary-near-black: "#1c1c1e"
  primary-white: "#ffffff"
  primary-blue-450: "#5b76fe"
  primary-actionable-pressed: "#2a41b6"
  light-pink: "#fde0f0"
  light-red: "#fbd4d4"
  light-dark-red: "#e3c5c5"
  status-success: "#00b473"
  neutral-slate: "#555a6a"
  neutral-input-placeholder: "#a5a8b5"
  neutral-border: "#c7cad5"
  neutral-ring: "rgb(224,226,232)"
  primary: "#1c1c1e"
typography:
  display-hero:
    fontFamily: "\"Roobert PRO Medium\""
    fontSize: 56px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-1.68px"
  section-heading:
    fontFamily: "\"Roobert PRO Medium\""
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-1.44px"
  card-title:
    fontFamily: "\"Roobert PRO Medium\""
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.72px"
  sub-heading:
    fontFamily: "\"Roobert PRO Medium\""
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-0.44px"
  feature:
    fontFamily: "\"Roobert PRO Medium\""
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "\"Roobert PRO Medium\""
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.45
  body-standard:
    fontFamily: "\"Roobert PRO Medium\""
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.16px"
  button:
    fontFamily: "\"Roobert PRO Medium\""
    fontSize: 17.5px
    fontWeight: 700
    lineHeight: 1.29
    letterSpacing: 0.175px
  caption:
    fontFamily: "\"Roobert PRO Medium\""
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.71
  small:
    fontFamily: "\"Roobert PRO Medium\""
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.36px"
  micro-uppercase:
    fontFamily: "\"Roobert PRO Medium\""
    fontSize: 10.5px
    fontWeight: 400
    lineHeight: 0.9
rounded:
  button: 8px
  input: 8px
  card: 12px
  badge: 999px
  nav: 8px
  default: 8px
components:
  button-primary:
    backgroundColor: "#1c1c1e"
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
    backgroundColor: "#1c1c1e"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#00b473"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Design System: Miro

## Overview

Miro's website is a clean, collaborative-tool-forward platform that communicates "visual thinking" through generous whitespace, pastel accent colors, and a confident geometric font. The design uses a predominantly white canvas with near-black text (`#1c1c1e`) and a distinctive pastel color palette — coral, rose, teal, orange, yellow, moss — each representing different collaboration contexts.

The typography uses Roobert PRO Medium as the primary display font with OpenType character variants (`"blwf", "cv03", "cv04", "cv09", "cv11"`) and negative letter-spacing (-1.68px at 56px). Noto Sans handles body text with its own stylistic set (`"liga" 0, "ss01", "ss04", "ss05"`). The design is built with Framer, giving it smooth animations and modern component patterns.

**Key Characteristics:**
- White canvas with near-black (`#1c1c1e`) text
- Roobert PRO Medium with multiple OpenType character variants
- Pastel accent palette: coral, rose, teal, orange, yellow, moss (light + dark pairs)
- Blue 450 (`#5b76fe`) as primary interactive color
- Success green (`#00b473`) for positive states
- Generous border-radius: 8px–50px range
- Framer-built with smooth motion patterns
- Ring shadow border: `rgb(224,226,232) 0px 0px 0px 1px`

## Colors

### Primary
- **Near Black** (`#1c1c1e`): Primary text
- **White** (`#ffffff`): `--tw-color-white`, primary surface
- **Blue 450** (`#5b76fe`): `--tw-color-blue-450`, primary interactive
- **Actionable Pressed** (`#2a41b6`): `--tw-color-actionable-pressed`

### Pastel Accents (Light/Dark pairs)
- **Coral**: Light `#ffc6c6` / Dark `#600000`
- **Rose**: Light `#ffd8f4` / Dark (implied)
- **Teal**: Light `#c3faf5` / Dark `#187574`
- **Orange**: Light `#ffe6cd`
- **Yellow**: Dark `#746019`
- **Moss**: Dark `#187574`
- **Pink** (`#fde0f0`): Soft pink surface
- **Red** (`#fbd4d4`): Light red surface
- **Dark Red** (`#e3c5c5`): Muted red

### Semantic
- **Success** (`#00b473`): `--tw-color-success-accent`

### Neutral
- **Slate** (`#555a6a`): Secondary text
- **Input Placeholder** (`#a5a8b5`): `--tw-color-input-placeholder`
- **Border** (`#c7cad5`): Button borders
- **Ring** (`rgb(224,226,232)`): Shadow-as-border

## Typography

### Font Families
- **Display**: `Roobert PRO Medium`, fallback: Placeholder — `"blwf", "cv03", "cv04", "cv09", "cv11"`
- **Display Variants**: `Roobert PRO SemiBold`, `Roobert PRO SemiBold Italic`, `Roobert PRO`
- **Body**: `Noto Sans` — `"liga" 0, "ss01", "ss04", "ss05"`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Display Hero | Roobert PRO Medium | 56px | 400 | 1.15 | -1.68px |
| Section Heading | Roobert PRO Medium | 48px | 400 | 1.15 | -1.44px |
| Card Title | Roobert PRO Medium | 24px | 400 | 1.15 | -0.72px |
| Sub-heading | Noto Sans | 22px | 400 | 1.35 | -0.44px |
| Feature | Roobert PRO Medium | 18px | 600 | 1.35 | normal |
| Body | Noto Sans | 18px | 400 | 1.45 | normal |
| Body Standard | Noto Sans | 16px | 400–600 | 1.50 | -0.16px |
| Button | Roobert PRO Medium | 17.5px | 700 | 1.29 | 0.175px |
| Caption | Roobert PRO Medium | 14px | 400 | 1.71 | normal |
| Small | Roobert PRO Medium | 12px | 400 | 1.15 | -0.36px |
| Micro Uppercase | Roobert PRO | 10.5px | 400 | 0.90 | uppercase |

## Layout

- Spacing: 1–24px base scale
- Radius: 8px (buttons), 10px–12px (cards), 20px–24px (panels), 40px–50px (large containers)
- Ring shadow: `rgb(224,226,232) 0px 0px 0px 1px`

## Elevation & Depth

Minimal — ring shadow + pastel surface contrast

## Components

### Buttons
- Outlined: transparent bg, `1px solid #c7cad5`, 8px radius, 7px 12px padding
- White circle: 50% radius, white bg with shadow
- Blue primary (implied from interactive color)

### Cards: 12px–24px radius, pastel backgrounds
### Inputs: white bg, `1px solid #e9eaef`, 8px radius, 16px padding

## Do's and Don'ts

### Do
- Use pastel light/dark pairs for feature sections
- Apply Roobert PRO with OpenType character variants
- Use Blue 450 (#5b76fe) for interactive elements
### Don't
- Don't use heavy shadows
- Don't mix more than 2 pastel accents per section

## Responsive Behavior

Breakpoints: 425px, 576px, 768px, 896px, 1024px, 1200px, 1280px, 1366px, 1700px, 1920px

## Agent Prompt Guide

### Quick Color Reference
- Text: Near Black (`#1c1c1e`)
- Background: White (`#ffffff`)
- Interactive: Blue 450 (`#5b76fe`)
- Success: `#00b473`
- Border: `#c7cad5`
### Example Component Prompts
- "Create hero: white background. Roobert PRO Medium 56px, line-height 1.15, letter-spacing -1.68px. Blue CTA (#5b76fe). Outlined secondary (1px solid #c7cad5, 8px radius)."
