---
version: alpha
name: Evergreen
description: "Crisp light (#F9F9FB) canvas, SF Mono typography, #3366FF brand accent, and 8px corner geometry"
colors:
  neutral-lightest: "#F9F9FB"
  neutral-light: "#E4E7EB"
  neutral-base: "#425A70"
  neutral-dark: "#234361"
  neutral-n1: "#F9F9FB"
  neutral-n2: "#F5F6F7"
  neutral-n3: "#EDF0F2"
  neutral-n4: "#E4E7EB"
  neutral-n5: "#C7CED4"
  neutral-n6: "#A6B1BB"
  neutral-n7: "#7B8B9A"
  neutral-n8: "#66788A"
  neutral-n9: "#425A70"
  neutral-n10: "#234361"
  neutral-color: "#425A70"
  neutral-background-color: "#E4E7EB"
  blue-background-color: "#ddebf7"
  red-background-color: "#fae2e2"
  orange-background-color: "#fae3cd"
  yellow-background-color: "#fbe6a2"
  green-background-color: "#d4eee2"
  teal-background-color: "#d2eef3"
  purple-background-color: "#eae7f8"
  primary-base: "#3366FF"
  primary-hover: "#2952CC"
  primary-active: "#1F3D99"
  info-background: "#F3F6FF"
  info-border: "#3366FF"
  info-text: "#2952CC"
  info-icon: "#3366FF"
  success-background: "#F5FBF8"
  success-border: "#52BD95"
  success-text: "#317159"
  success-icon: "#52BD95"
  warning-background: "#FFFAF2"
  warning-border: "#FFB020"
  warning-text: "#996A13"
  warning-icon: "#FFB020"
  danger-background: "#FDF4F4"
  danger-border: "#D14343"
  danger-text: "#A73636"
  danger-icon: "#D14343"
  disabled-icon: "#c1c4d6"
  border-default: "#E4E7EB"
  border-muted: "#EDF0F2"
  text-success: "#00783e"
  text-info: "#084b8a"
  text-danger: "#bf0e08"
  hover-background-color: "#F9F9FB"
  focus-background-color: "#F9F9FB"
  current-background-color: "#f7f9fd"
  before-background-color: "#1070ca"
  checked-background-color: "#3d8bd4"
  checked-hover-background-color: "#3d8bd4"
  checked-active-background-color: "#1070ca"
  base-style-background: "#F5F6F7"
  background: "#F3F6FF"
  border: "#3366FF"
  text: "#2952CC"
  success: "#00783e"
  info: "#084b8a"
  danger: "#bf0e08"
  background-tint1: "#F9F9FB"
  background-tint2: "#F5F6F7"
  background-yellow-tint: "#fef8e7"
  background-green-tint: "#f1faf5"
  background-orange-tint: "#fdf8f3"
  background-red-tint: "#fef6f6"
  background-blue-tint: "#f7f9fd"
  background-purple-tint: "#f8f7fc"
  background-teal-tint: "#f1fbfc"
  text-muted: "#66788A"
  text-default: "#425A70"
  text-dark: "#234361"
  text-selected: "#1070ca"
  text-warning: "#95591e"
  icon-success: "#47b881"
  icon-info: "#1070ca"
  icon-danger: "#ec4c47"
  icon-warning: "#d9822b"
  intent-success: "#47b881"
  intent-danger: "#ec4c47"
  intent-warning: "#d9822b"
  warning: "#95591e"
  awesome-blue-background-color: "#057ceb"
  warning-background-color: "#fcef79"
  does-not-exist-background-color: "#fc03f0"
  gray900: "#101840"
  yellow-light: "#fbe6a2"
  colors-orange700: "#996A13"
  primary: "#3366FF"
typography:
  mono:
    fontFamily: "\"SF Mono\", Monaco, Inconsolata, \"Fira Mono\", \"Droid Sans Mono\", \"Source Code Pro\", monospace"
  font-size:
    fontSize: 16px
  font-family:
    fontFamily: "\"SF UI Text\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
components:
  button-primary:
    backgroundColor: "#3366FF"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#425A70"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#D14343"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#F5F6F7"
    textColor: "#425A70"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#F5F6F7"
    textColor: "#425A70"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#3366FF"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#52BD95"
    textColor: "#000000"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#F5F6F7"
    textColor: "#425A70"
    rounded: 8px
    padding: 10px 16px
---

# Evergreen

## Overview

Evergreen — tokens read from https://github.com/segmentio/evergreen.

Tokens were read from the project's own repository, not from a marketing site: 91 colour tokens and 0 type tokens.

## Colors

91 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#F9F9FB) canvas paired with `#F5F6F7` component surfaces and `#425A70` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#3366FF` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `SF Mono` across 3 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
