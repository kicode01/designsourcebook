---
version: alpha
name: Chakra UI
description: "Crisp light (#fafafa) canvas, -apple-system typography, #e6f2ff brand accent, and 6px corner geometry"
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
  primary: "#e6f2ff"
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
components:
  button-primary:
    backgroundColor: "#e6f2ff"
    textColor: "#0b0b0c"
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
    backgroundColor: "#e6f2ff"
    textColor: "#0b0b0c"
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
---

# Chakra UI

## Overview

Chakra UI — tokens read from https://github.com/chakra-ui/chakra-ui.

Tokens were read from the project's own repository, not from a marketing site: 91 colour tokens and 0 type tokens.

## Colors

91 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#fff) canvas paired with `#fff` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#e6f2ff` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `-apple-system` across 4 type steps.
- **Component Geometry**: Buttons (`6px`), cards (`10px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
