---
version: alpha
name: Coinbase
description: "Clean blue identity, trust-focused, institutional feel"
colors:
  primary-coinbase-blue: "#0052ff"
  primary-pure-white: "#ffffff"
  primary-near-black: "#0a0b0d"
  primary-cool-gray-surface: "#eef0f3"
  interactive-hover-blue: "#578bfa"
  interactive-link-blue: "#0667d0"
  interactive-muted-blue: "#5b616e"
  surface-dark-card: "#282b31"
  surface-light: "rgba(247,247,247,0.88)"
  primary: "#0052ff"
typography:
  display-hero:
    fontFamily: CoinbaseDisplay
    fontSize: 80px
    fontWeight: 400
    lineHeight: 1
  display-secondary:
    fontFamily: CoinbaseDisplay
    fontSize: 64px
    fontWeight: 400
    lineHeight: 1
  display-third:
    fontFamily: CoinbaseDisplay
    fontSize: 52px
    fontWeight: 400
    lineHeight: 1
  section-heading:
    fontFamily: CoinbaseDisplay
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.11
  card-title:
    fontFamily: CoinbaseDisplay
    fontSize: 32px
    fontWeight: 400
    lineHeight: 1.13
  feature-title:
    fontFamily: CoinbaseDisplay
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.33
  body-bold:
    fontFamily: CoinbaseDisplay
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.5
  body-semibold:
    fontFamily: CoinbaseDisplay
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: CoinbaseDisplay
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.56
  body-small:
    fontFamily: CoinbaseDisplay
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: CoinbaseDisplay
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.16px
  caption:
    fontFamily: CoinbaseDisplay
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.5
  small:
    fontFamily: CoinbaseDisplay
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.23
rounded:
  button: 56px
  input: 56px
  card: 56px
  badge: 999px
  nav: 56px
  default: 56px
icons:
  library: Coinbase CDS Icons
  package: "@coinbase/cds-icons"
  pack: coinbase
  style: solid
  grid: 24
  strokeWidth: 0
  strokeLinecap: round
  strokeLinejoin: round
  source: npm
  url: "https://cds.coinbase.com"
components:
  button-primary-pill:
    backgroundColor: "#eef0f3"
    rounded: 56px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 56px
    padding: 10px 18px
  input-default:
    backgroundColor: "#eef0f3"
    textColor: "#0b0b0c"
    rounded: 56px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#eef0f3"
    textColor: "#0b0b0c"
    rounded: 56px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#0052ff"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#eef0f3"
    textColor: "#0b0b0c"
    rounded: 56px
    padding: 10px 16px
  select-default:
    backgroundColor: "#eef0f3"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 8px 12px
  switch-control:
    backgroundColor: "#0052ff"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 2px
  checkbox-control:
    backgroundColor: "#0052ff"
    textColor: "#f7f7f8"
    rounded: 4px
    padding: 2px
  tabs-nav:
    backgroundColor: "#eef0f3"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 6px 12px
  alert-info:
    backgroundColor: "#eef0f3"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 12px 14px
  table-grid:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 12px
    padding: 10px 14px
  tooltip-overlay:
    backgroundColor: "#0b0b0c"
    textColor: "#ffffff"
    rounded: 6px
    padding: 6px 10px
  icon-glyph:
    backgroundColor: "#eef0f3"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 8px
---

# Design System: Coinbase

## Overview

Coinbase's website is a clean, trustworthy crypto platform that communicates financial reliability through a blue-and-white binary palette. The design uses Coinbase Blue (`#0052ff`) — a deep, saturated blue — as the singular brand accent against white and near-black surfaces. The proprietary font family includes CoinbaseDisplay for hero headlines, CoinbaseSans for UI text, CoinbaseText for body reading, and CoinbaseIcons for iconography — a comprehensive four-font system.

The button system uses a distinctive 56px radius for pill-shaped CTAs with hover transitions to a lighter blue (`#578bfa`). The design alternates between white content sections and dark (`#0a0b0d`, `#282b31`) feature sections, creating a professional, financial-grade interface.

**Key Characteristics:**
- Coinbase Blue (`#0052ff`) as singular brand accent
- Four-font proprietary family: Display, Sans, Text, Icons
- 56px radius pill buttons with blue hover transition
- Near-black (`#0a0b0d`) dark sections + white light sections
- 1.00 line-height on display headings — ultra-tight
- Cool gray secondary surface (`#eef0f3`) with blue tint
- `text-transform: lowercase` on some button labels — unusual

## Colors

### Primary
- **Coinbase Blue** (`#0052ff`): Primary brand, links, CTA borders
- **Pure White** (`#ffffff`): Primary light surface
- **Near Black** (`#0a0b0d`): Text, dark section backgrounds
- **Cool Gray Surface** (`#eef0f3`): Secondary button background

### Interactive
- **Hover Blue** (`#578bfa`): Button hover background
- **Link Blue** (`#0667d0`): Secondary link color
- **Muted Blue** (`#5b616e`): Border color at 20% opacity

### Surface
- **Dark Card** (`#282b31`): Dark button/card backgrounds
- **Light Surface** (`rgba(247,247,247,0.88)`): Subtle surface

## Typography

### Font Families
- **Display**: `CoinbaseDisplay` — hero headlines
- **UI / Sans**: `CoinbaseSans` — buttons, headings, nav
- **Body**: `CoinbaseText` — reading text
- **Icons**: `CoinbaseIcons` — icon font

### Hierarchy

| Role | Font | Size | Weight | Line Height | Notes |
|------|------|------|--------|-------------|-------|
| Display Hero | CoinbaseDisplay | 80px | 400 | 1.00 (tight) | Maximum impact |
| Display Secondary | CoinbaseDisplay | 64px | 400 | 1.00 | Sub-hero |
| Display Third | CoinbaseDisplay | 52px | 400 | 1.00 | Third tier |
| Section Heading | CoinbaseSans | 36px | 400 | 1.11 (tight) | Feature sections |
| Card Title | CoinbaseSans | 32px | 400 | 1.13 | Card headings |
| Feature Title | CoinbaseSans | 18px | 600 | 1.33 | Feature emphasis |
| Body Bold | CoinbaseSans | 16px | 700 | 1.50 | Strong body |
| Body Semibold | CoinbaseSans | 16px | 600 | 1.25 | Buttons, nav |
| Body | CoinbaseText | 18px | 400 | 1.56 | Standard reading |
| Body Small | CoinbaseText | 16px | 400 | 1.50 | Secondary reading |
| Button | CoinbaseSans | 16px | 600 | 1.20 | +0.16px tracking |
| Caption | CoinbaseSans | 14px | 600–700 | 1.50 | Metadata |
| Small | CoinbaseSans | 13px | 600 | 1.23 | Tags |

## Layout

### Spacing System
- Base: 8px
- Scale: 1px, 3px, 4px, 5px, 6px, 8px, 10px, 12px, 15px, 16px, 20px, 24px, 25px, 32px, 48px

### Border Radius Scale
- Small (4px–8px): Article links, small cards
- Standard (12px–16px): Cards, menus
- Large (24px–32px): Feature containers
- XL (40px): Large buttons/containers
- Pill (56px): Primary CTAs
- Full (100000px): Maximum pill

## Elevation & Depth

Minimal shadow system — depth from color contrast between dark/light sections.

## Components

### Buttons

**Primary Pill (56px radius)**
- Background: `#eef0f3` or `#282b31`
- Radius: 56px
- Border: `1px solid` matching background
- Hover: `#578bfa` (light blue)
- Focus: `2px solid black` outline

**Full Pill (100000px radius)**
- Used for maximum pill shape

**Blue Bordered**
- Border: `1px solid #0052ff`
- Background: transparent

### Cards & Containers
- Radius: 8px–40px range
- Borders: `1px solid rgba(91,97,110,0.2)`

## Do's and Don'ts

### Do
- Use Coinbase Blue (#0052ff) for primary interactive elements
- Apply 56px radius for all CTA buttons
- Use CoinbaseDisplay for hero headings only
- Alternate dark (#0a0b0d) and white sections

### Don't
- Don't use the blue decoratively — it's functional only
- Don't use sharp corners on CTAs — 56px minimum

## Responsive Behavior

Breakpoints: 400px, 576px, 640px, 768px, 896px, 1280px, 1440px, 1600px

## Agent Prompt Guide

### Quick Color Reference
- Brand: Coinbase Blue (`#0052ff`)
- Background: White (`#ffffff`)
- Dark surface: `#0a0b0d`
- Secondary surface: `#eef0f3`
- Hover: `#578bfa`
- Text: `#0a0b0d`

### Example Component Prompts
- "Create hero: white background. CoinbaseDisplay 80px, line-height 1.00. Pill CTA (#eef0f3, 56px radius). Hover: #578bfa."
- "Build dark section: #0a0b0d background. CoinbaseDisplay 64px white text. Blue accent link (#0052ff)."
