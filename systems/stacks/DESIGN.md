---
version: alpha
name: Stacks
description: "Stack Overflow Stacks — consistent experiences across Stack Overflow."
colors:
  brand: "#FF5E00"
  brand-black: "#201C1D"
  brand-off-white: "#F0EFEE"
  brand-blue-light: "#C6D1E1"
  brand-blue: "#5074EF"
  brand-blue-dark: "#00165E"
  brand-brown-light: "#998B7A"
  brand-green: "#86AF25"
  brand-green-dark: "#263603"
  brand-orange-medium: "#6E1527"
  brand-orange-dark: "#31070F"
  brand-pink: "#F39FFF"
  brand-pink-dark: "#4D1955"
  brand-purple: "#9D9CFF"
  brand-purple-dark: "#390A91"
  brand-yellow: "#FFCC00"
  brand-yellow-dark: "#423101"
  white: "#ffffff"
  black-050: "#ffffff"
  black-100: "#f7f6f5"
  black-150: "#f0efed"
  black-200: "#dee0e3"
  black-225: "#d7d8db"
  black-250: "#c9ccd1"
  black-300: "#a7aab0"
  black-350: "#84878c"
  black-400: "#6b6d73"
  black-500: "#46484d"
  black-600: "#211d1e"
  black: "#000000"
  orange-100: "#fff7f2"
  orange-200: "#ffd5bd"
  orange-300: "#f59056"
  orange-400: "#e86113"
  orange-500: "#bf4904"
  orange-600: "#702d06"
  blue-100: "#f0f4ff"
  blue-200: "#c8d4fa"
  blue-300: "#88a2f7"
  blue-400: "#5076f2"
  blue-500: "#2445b3"
  blue-600: "#0f2466"
  green-100: "#f4faeb"
  green-200: "#cce6a1"
  green-300: "#9fbf67"
  green-400: "#6c991f"
  green-500: "#4d730b"
  green-600: "#324d04"
  red-100: "#fceded"
  red-200: "#f5b9b8"
  red-300: "#e67373"
  red-400: "#bf3030"
  red-500: "#8c0e0e"
  red-600: "#590404"
  yellow-100: "#fcf8e8"
  yellow-200: "#f5e39d"
  yellow-300: "#edc10e"
  yellow-400: "#ab8900"
  yellow-500: "#806600"
  yellow-600: "#4d3d00"
  purple-100: "#f0edfc"
  purple-200: "#d0c6f7"
  purple-300: "#a591f2"
  purple-400: "#6e50e6"
  purple-500: "#4526bf"
  purple-600: "#200b73"
  pink-100: "#fbedfc"
  pink-200: "#ebb6f2"
  pink-300: "#e685f2"
  pink-400: "#d34ae8"
  pink-500: "#a224b3"
  pink-600: "#670b73"
  gold-100: "hsl(46, 100%, 91%)"
  gold-200: "hsl(46, 100%, 74%)"
  gold-300: "hsl(45, 100%, 42%)"
  gold-400: "hsl(46, 92%, 26%)"
  silver-100: "hsl(0, 0%, 95%)"
  silver-200: "hsl(0, 0%, 84%)"
  silver-300: "hsl(210, 5%, 68%)"
  silver-400: "hsl(210, 2%, 40%)"
  bronze-100: "hsl(28, 40%, 92%)"
  bronze-200: "hsl(30, 47%, 83%)"
  bronze-300: "hsl(28, 43%, 65%)"
  bronze-400: "hsl(28, 43%, 39%)"
  highlight-attribute: "hsl(206, 98.5%, 29%)"
  highlight-bg: "hsl(0, 0%, 96.5%)"
  highlight-keyword: "hsl(206, 98.5%, 29%)"
  highlight-literal: "hsl(27, 99%, 36%)"
  highlight-namespace: "hsl(27, 99%, 36%)"
  highlight-symbol: "hsl(306, 43%, 35%)"
  primary: "#FF5E00"
typography:
  theme-body-font-family:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI Adjusted\", \"Segoe UI\", \"Liberation Sans\", sans-serif"
  h1:
    fontSize: 2em
  html:
    fontSize: "100%"
components:
  button-primary:
    backgroundColor: "#FF5E00"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#8c0e0e"
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
    backgroundColor: "#FF5E00"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#324d04"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#ffffff"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 10px 16px
---

# Stacks

## Overview

Stack Overflow Stacks — consistent experiences across Stack Overflow.

Tokens were read from `@stackoverflow/stacks@3.0.2`, not from a marketing site: 91 colour tokens and 3 type tokens.

## Colors

91 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `-apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif`.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#ffffff) canvas paired with `#ffffff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#FF5E00` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `-apple-system` across 3 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
