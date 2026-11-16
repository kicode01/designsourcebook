---
version: alpha
name: Ring UI
description: "IDE-grade web component library, JetBrains blue highlights and crisp dense controls"
colors:
  ring-borders-components: "rgb(211, 213, 219)"
  ring-border-disabled-components: "rgb(235, 236, 240)"
  ring-border-selected-disabled-components: "rgb(201, 204, 214)"
  ring-border-hover-components: "rgb(160, 189, 248)"
  ring-border-hover-success-components: "rgb(197, 229, 204)"
  ring-border-hover-error-components: "rgb(250, 212, 216)"
  ring-border-accent-components: "rgb(112, 156, 245)"
  ring-success-border-components: "rgb(137, 195, 152)"
  ring-success-border-hover-components: "rgb(85, 167, 106)"
  ring-error-border-components: "rgb(242, 182, 187)"
  ring-error-border-hover-components: "rgb(228, 106, 118)"
  ring-warning-border-components: "rgb(254, 210, 119)"
  ring-warning-border-hover-components: "rgb(253, 189, 61)"
  ring-highlight-border-components: "rgb(254, 210, 119)"
  ring-highlight-border-hover-components: "rgb(253, 189, 61)"
  ring-purple-border-components: "rgb(191, 161, 248)"
  ring-purple-border-hover-components: "rgb(161, 119, 244)"
  ring-popup-border-components: "rgb(0, 28, 54)"
  ring-button-primary-border-components: "rgb(46, 85, 163)"
  ring-link-components: "rgb(49, 95, 189)"
  ring-link-hover-components: "rgb(46, 85, 163)"
  ring-purple-text-components: "rgb(131, 77, 240)"
  ring-text-components: "rgb(39, 40, 46)"
  ring-white-text-components: "rgb(255, 255, 255)"
  ring-content-background-components: "rgb(255, 255, 255)"
  ring-popup-background-components: "rgb(255, 255, 255)"
  ring-sidebar-background-components: "rgb(247, 248, 250)"
  ring-secondary-background-components: "rgb(247, 248, 250)"
  ring-selected-background-components: "rgb(212, 226, 255)"
  ring-hover-background-components: "rgb(237, 243, 255)"
  ring-navigation-background-components: "rgb(255, 255, 255)"
  ring-tag-background-components: "rgb(235, 236, 240)"
  ring-tag-hover-background-components: "rgb(223, 225, 229)"
  ring-removed-background-components: "rgb(250, 212, 216)"
  ring-warning-background-components: "rgb(255, 241, 209)"
  ring-highlight-background-components: "rgb(255, 241, 209)"
  ring-added-background-components: "rgb(197, 229, 204)"
  ring-purple-background-components: "rgb(239, 229, 255)"
  ring-disabled-background-components: "rgb(247, 248, 250)"
  ring-disabled-selected-background-components: "rgb(235, 236, 240)"
  ring-removed-subtle-background-components: "rgb(255, 235, 236)"
  ring-warning-subtle-background-components: "rgb(255, 246, 222)"
  ring-highlight-subtle-background-components: "rgb(255, 246, 222)"
  ring-added-subtle-background-components: "rgb(230, 247, 233)"
  ring-purple-subtle-background-components: "rgb(250, 245, 255)"
  ring-highlight-fill-components: "rgb(255, 175, 15)"
  ring-grey-fill-components: "rgb(39, 40, 46)"
  ring-grey-fill-accent-components: "rgb(56, 58, 66)"
  ring-code-tag-background-components: "rgb(235, 236, 240)"
  ring-active-text-components: "rgb(255, 255, 255)"
  ring-code-background-components: "rgb(30, 31, 34)"
  ring-loader-color-1: "#3bea62"
  ring-loader-color-2: "#6b57ff"
  ring-loader-color-3: "#07c3f2"
  primary: "#07c3f2"
typography:
  ring-font-size-larger:
    fontSize: 16px
  ring-font-size:
    fontSize: 14px
  ring-font-size-smaller:
    fontSize: 12px
  ring-font-family:
    fontFamily: "system-ui, Arial, sans-serif"
  ring-font-family-monospace:
    fontFamily: "Menlo, \"Bitstream Vera Sans Mono\", \"Ubuntu Mono\", Consolas, \"Courier New\", Courier, monospace"
  font-size:
    fontSize: 26px
  title:
    fontSize: 21px
components:
  button-primary:
    backgroundColor: "#07c3f2"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 18px
  button-secondary:
    backgroundColor: transparent
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 18px
  button-danger:
    backgroundColor: "rgb(250, 212, 216)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 18px
  input-default:
    backgroundColor: "rgb(247, 248, 250)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 9px 13px
  card-surface:
    backgroundColor: "rgb(247, 248, 250)"
    textColor: "#0b0b0c"
    rounded: 8px
    padding: 18px 20px
  badge-brand:
    backgroundColor: "#07c3f2"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  badge-success:
    backgroundColor: "rgb(197, 229, 204)"
    textColor: "#0b0b0c"
    rounded: 999px
    padding: 4px 10px
  nav-bar:
    backgroundColor: "rgb(247, 248, 250)"
    textColor: "#0b0b0c"
    rounded: 4px
    padding: 10px 16px
---

# Ring UI

## Overview

JetBrains Ring UI — tokens imported from @jetbrains/ring-ui.

Tokens were read from `@jetbrains/ring-ui@7.0.133`, not from a marketing site: 55 colour tokens and 7 type tokens.

## Colors

55 colour tokens selected from the token files, weighted toward semantic roles.

## Typography

Families declared in the source: `system-ui, Arial, sans-serif`, `Menlo, "Bitstream Vera Sans Mono", "Ubuntu Mono", Consolas, "Courier New", Courier, monospace`.

## Visual Language

- **Surface & Theme Polarity**: Crisp light (rgb(255, 255, 255)) canvas paired with `rgb(255, 255, 255)` component surfaces and `#0b0b0c` primary ink.
- **Brand & Interactive Accent**: Primary actions and focus states anchor on `#07c3f2` with `#0b0b0c` label contrast.
- **Typographic Voice**: Headings and UI controls set in `system-ui` across 7 type steps.
- **Component Geometry**: Buttons (`4px`), cards (`8px`), inputs, badges, and navigation bars share consistent spacing and border contrast.
