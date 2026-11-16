---
version: alpha
name: Webflow
description: "Blue-accented, polished marketing site aesthetic"
colors:
  primary-near-black: "#080808"
  primary-webflow-blue: "#146ef5"
  primary-blue-400: "#3b89ff"
  primary-blue-300: "#006acc"
  primary-button-hover-blue: "#0055d4"
  secondary-purple: "#7a3dff"
  secondary-pink: "#ed52cb"
  secondary-green: "#00d722"
  secondary-orange: "#ff6b00"
  secondary-yellow: "#ffae13"
  secondary-red: "#ee1d36"
  neutral-gray-800: "#222222"
  neutral-gray-700: "#363636"
  neutral-gray-300: "#ababab"
  neutral-mid-gray: "#5a5a5a"
  neutral-border-gray: "#d8d8d8"
  neutral-border-hover: "#898989"
  primary: "#080808"
typography:
  display-xl:
    fontFamily: "\"WF Visual Sans Variable\", Arial, sans-serif"
    fontSize: 88px
    fontWeight: 600
    lineHeight: 1.04
  display-large:
    fontFamily: "\"WF Visual Sans Variable\", Arial, sans-serif"
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.04
  h2-section:
    fontFamily: "\"WF Visual Sans Variable\", Arial, sans-serif"
    fontSize: 35.2px
    fontWeight: 600
    lineHeight: 1.2
  h3-sub:
    fontFamily: "\"WF Visual Sans Variable\", Arial, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  body-large:
    fontFamily: "\"WF Visual Sans Variable\", Arial, sans-serif"
    fontSize: 19.2px
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "\"WF Visual Sans Variable\", Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  ui-medium:
    fontFamily: "\"WF Visual Sans Variable\", Arial, sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.3
  caption:
    fontFamily: "\"WF Visual Sans Variable\", Arial, sans-serif"
    fontSize: 14.4px
    fontWeight: 400
    lineHeight: 1.5
  small:
    fontFamily: "\"WF Visual Sans Variable\", Arial, sans-serif"
    fontSize: 12.8px
    fontWeight: 400
    lineHeight: 1.5
  label-mono:
    fontFamily: "Inconsolata, monospace"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.3
components:
  button-primary:
    backgroundColor: "#080808"
    textColor: "#f7f7f8"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#ef4444"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#080808"
    textColor: "#ffffff"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#080808"
    textColor: "#ffffff"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#080808"
    textColor: "#f7f7f8"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#10b981"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#080808"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 16px
---

# Design System: Webflow

## Overview

Webflow's website is a visually rich, tool-forward platform that communicates "design without code" through clean white surfaces, the signature Webflow Blue (`#146ef5`), and a rich secondary color palette (purple, pink, green, orange, yellow, red). The custom WF Visual Sans Variable font creates a confident, precise typographic system with weight 600 for display and 500 for body.

**Key Characteristics:**
- White canvas with near-black (`#080808`) text
- Webflow Blue (`#146ef5`) as primary brand + interactive color
- WF Visual Sans Variable — custom variable font with weight 500–600
- Rich secondary palette: purple `#7a3dff`, pink `#ed52cb`, green `#00d722`, orange `#ff6b00`, yellow `#ffae13`, red `#ee1d36`
- Conservative 4px–8px border-radius — sharp, not rounded
- Multi-layer shadow stacks (5-layer cascading shadows)
- Uppercase labels: 10px–15px, weight 500–600, wide letter-spacing (0.6px–1.5px)
- translate(6px) hover animation on buttons

## Colors

### Primary
- **Near Black** (`#080808`): Primary text
- **Webflow Blue** (`#146ef5`): `--_color---primary--webflow-blue`, primary CTA and links
- **Blue 400** (`#3b89ff`): `--_color---primary--blue-400`, lighter interactive blue
- **Blue 300** (`#006acc`): `--_color---blue-300`, darker blue variant
- **Button Hover Blue** (`#0055d4`): `--mkto-embed-color-button-hover`

### Secondary Accents
- **Purple** (`#7a3dff`): `--_color---secondary--purple`
- **Pink** (`#ed52cb`): `--_color---secondary--pink`
- **Green** (`#00d722`): `--_color---secondary--green`
- **Orange** (`#ff6b00`): `--_color---secondary--orange`
- **Yellow** (`#ffae13`): `--_color---secondary--yellow`
- **Red** (`#ee1d36`): `--_color---secondary--red`

### Neutral
- **Gray 800** (`#222222`): Dark secondary text
- **Gray 700** (`#363636`): Mid text
- **Gray 300** (`#ababab`): Muted text, placeholder
- **Mid Gray** (`#5a5a5a`): Link text
- **Border Gray** (`#d8d8d8`): Borders, dividers
- **Border Hover** (`#898989`): Hover border

### Shadows
- **5-layer cascade**: `rgba(0,0,0,0) 0px 84px 24px, rgba(0,0,0,0.01) 0px 54px 22px, rgba(0,0,0,0.04) 0px 30px 18px, rgba(0,0,0,0.08) 0px 13px 13px, rgba(0,0,0,0.09) 0px 3px 7px`

## Typography

### Font: `WF Visual Sans Variable`, fallback: `Arial`

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Display Hero | 80px | 600 | 1.04 | -0.8px | |
| Section Heading | 56px | 600 | 1.04 | normal | |
| Sub-heading | 32px | 500 | 1.30 | normal | |
| Feature Title | 24px | 500–600 | 1.30 | normal | |
| Body | 20px | 400–500 | 1.40–1.50 | normal | |
| Body Standard | 16px | 400–500 | 1.60 | -0.16px | |
| Button | 16px | 500 | 1.60 | -0.16px | |
| Uppercase Label | 15px | 500 | 1.30 | 1.5px | uppercase |
| Caption | 14px | 400–500 | 1.40–1.60 | normal | |
| Badge Uppercase | 12.8px | 550 | 1.20 | normal | uppercase |
| Micro Uppercase | 10px | 500–600 | 1.30 | 1px | uppercase |
| Code: Inconsolata (companion monospace font)

## Layout

- Spacing: fractional scale (1px, 2.4px, 3.2px, 4px, 5.6px, 6px, 7.2px, 8px, 9.6px, 12px, 16px, 24px)
- Radius: 2px, 4px, 8px, 50% — conservative, sharp
- Breakpoints: 479px, 768px, 992px

## Components

### Buttons
- Transparent: text `#080808`, translate(6px) on hover
- White circle: 50% radius, white bg
- Blue badge: `#146ef5` bg, 4px radius, weight 550

### Cards: `1px solid #d8d8d8`, 4px–8px radius
### Badges: Blue-tinted bg at 10% opacity, 4px radius

## Do's and Don'ts

- Do: Use WF Visual Sans Variable at 500–600. Blue (#146ef5) for CTAs. 4px radius. translate(6px) hover.
- Don't: Round beyond 8px for functional elements. Use secondary colors on primary CTAs.

## Agent Prompt Guide

- Text: Near Black (`#080808`)
- CTA: Webflow Blue (`#146ef5`)
- Background: White (`#ffffff`)
- Border: `#d8d8d8`
- Secondary: Purple `#7a3dff`, Pink `#ed52cb`, Green `#00d722`
