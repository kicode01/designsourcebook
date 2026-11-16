---
version: alpha
name: Spotify Backstage
description: "Developer portal system, Spotify green highlights on neutral studio surfaces"
colors:
  background-default: "#F8F8F8"
  background-paper: "#FFFFFF"
  status-ok: "#1DB954"
  status-warning: "#FF9800"
  status-error: "#E22134"
  status-running: "#1F5493"
  status-pending: "#FFED51"
  status-aborted: "#757575"
  background-color-default: "#7C3699"
  primary-main: "#1F5493"
  banner-info: "#2E77D0"
  banner-error: "#E22134"
  banner-text: "#FFFFFF"
  banner-link: "#000000"
  banner-close-button-color: "#FFFFFF"
  banner-warning: "#FF9800"
  nav-item-hover-background: "#404040"
  submenu-background: "#404040"
  pin-sidebar-button-icon: "#181818"
  pin-sidebar-button-background: "#BDBDBD"
  tabbar-indicator: "#9BF0E1"
  primary-dark: "#82BAFD"
  secondary-main: "#FF88B2"
  paper: "#FFFFFF"
  ok: "#1DB954"
  warning: "#FF9800"
  error: "#E22134"
  running: "#1F5493"
  pending: "#FFED51"
  aborted: "#757575"
  font-color: "#FEFEFE"
  slack-channel-text: "#ddd"
  main: "#1F5493"
  info: "#2E77D0"
  text: "#FFFFFF"
  link: "#000000"
  close-button-color: "#FFFFFF"
  border: "#E6E6E6"
  text-contrast: "#000000"
  text-very-subtle: "#DDD"
  text-subtle: "#6E6E6E"
  highlight: "#FFFBCC"
  error-background: "#FFEBEE"
  warning-background: "#F59B23"
  info-background: "#ebf5ff"
  error-text: "#CA001B"
  info-text: "#004e8a"
  warning-text: "#000000"
  link-hover: "#2196F3"
  gold: "#FFD600"
  background: "#171717"
  indicator: "#9BF0E1"
  color: "#b5b5b5"
  selected-color: "#FFF"
  hover-background: "#404040"
  icon: "#181818"
  primary: "#1F5493"
typography:
  font-size:
    fontSize: 0.875rem
components:
  button-primary:
    backgroundColor: "#1F5493"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#000000"
    rounded: 8px
    padding: 10px 18px
  button-danger:
    backgroundColor: "#E22134"
    textColor: "#ffffff"
    rounded: 8px
    padding: 10px 18px
  input-default:
    backgroundColor: "#FFFFFF"
    textColor: "#000000"
    rounded: 8px
    padding: 9px 13px
  card-surface:
    backgroundColor: "#FFFFFF"
    textColor: "#000000"
    rounded: 12px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#1F5493"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "#15803d"
    textColor: "#ffffff"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "#FFFFFF"
    textColor: "#000000"
    rounded: 8px
    padding: 10px 16px
---

# Spotify Backstage

## Overview

Spotify Backstage — tokens imported from @backstage/theme.

Tokens were read from `@backstage/theme@0.7.3`, not from a marketing site: 57 colour tokens and 1 type tokens.

## Colors

57 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

No resolvable type tokens were extracted. The type scale is omitted rather than invented.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (#F8F8F8) canvas paired with `#7C3699` component surfaces and `#000000` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#1F5493` with `#ffffff` label contrast.
- **Typographic Voice**: Headings and UI controls set in `system-ui` across 1 type steps.
- **Component Geometry**: Buttons (`8px`), cards (`12px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
