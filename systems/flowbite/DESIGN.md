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

Flowbite Design System — tokens read from https://github.com/themesberg/flowbite.

Tokens were read from the project's own repository, not from a marketing site: 91 colour tokens and 0 type tokens.

## Colors

91 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fff) canvas paired with `#fff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#79b8ff` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `Inter` across 3 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
