# Contributing to Design Sourcebook

Thank you for contributing to **Design Sourcebook**! This document covers how to add or update design systems, develop on **Design Sourcebook Studio**, and run the verification suite before opening a Pull Request.

---

## 1. Repository Setup

```bash
# Clone the repository
git clone https://github.com/kicode01/designsourcebook.git
cd designsourcebook

# Install root and Studio dependencies
npm install
npm --prefix studio/app install
```

---

## 2. Adding or Updating a Design System

Every system in [`systems/<slug>/`](./systems) must include:

- `DESIGN.md` — Canonical YAML front matter (`colors`, `typography`, `rounded`, `spacing`, `components`) + narrative guidelines.
- `tokens.json` — W3C DTCG token tree (`$value` / `$type`).
- `preview.json` — Resolved semantic surfaces (`canvas`, `surface`, `text`, `muted`, `brand`, `border`, `radius`), `palette`, `type`, and `components`.
- `manifest.json` — Provenance record (`published` with `package`/`repo` or `observed` with `homepage`) and lint results.

### Ingestion Drivers

You can harvest a new system using one of the four deterministic drivers:

```bash
# 1. From an official npm token package (provenance: published)
node scripts/ingest-npm.mjs @primer/primitives --slug primer --org GitHub --name Primer

# 2. From a public Git repository (provenance: published)
node scripts/ingest-repo.mjs https://github.com/artsy/palette --slug artsy-palette --org Artsy --name "Artsy Palette"

# 3. From a live production site's CSS (provenance: observed)
node scripts/ingest-site.mjs https://brand.aalto.fi/ --slug aalto --org "Aalto University" --name "Aalto University"

# 4. Validate and rebuild the registry index + catalog
npm run lint
node bin/sourcebook.mjs index
npm run build:prod
```

### Quality & Honesty Rules

1. **Minimum Token Floor**: Systems with fewer than 12 distinct color tokens are rejected by the ingester so incomplete stubs never pollute the registry.
2. **No Invented Tokens**: Never fabricate hex codes, font stacks, or radii that do not appear in the upstream package, repository, or stylesheet.
3. **Zero Schema Errors**: Every system must pass `node bin/sourcebook.mjs lint <slug>` with **0 errors**.

---

## 3. Developing on Design Sourcebook Studio (`studio/app`)

**Design Sourcebook Studio** is a React 19 + TypeScript + WebGL2 application located in [`studio/app/`](./studio/app) with four workbenches:

- **Design System Maker**: [`studio/app/src/pages/SystemMaker.tsx`](./studio/app/src/pages/SystemMaker.tsx) & [`studio/app/src/engine/dsEngine.ts`](./studio/app/src/engine/dsEngine.ts)
- **Logo Maker**: [`studio/app/src/pages/CreateX.tsx`](./studio/app/src/pages/CreateX.tsx) & [`studio/app/src/components/logo-maker/`](./studio/app/src/components/logo-maker)
- **LogoFX Shader & Video Studio**: [`studio/app/src/components/Studio.tsx`](./studio/app/src/components/Studio.tsx), [`studio/app/src/engine/renderer.ts`](./studio/app/src/engine/renderer.ts), & [`studio/app/src/components/logofx/`](./studio/app/src/components/logofx)
- **Brand Maker & BrandFx**: [`studio/app/src/pages/BrandX.tsx`](./studio/app/src/pages/BrandX.tsx) & [`studio/app/src/components/brand-maker/`](./studio/app/src/components/brand-maker)

After editing files in `studio/app/src/`, always run the production build so [`catalog/studio/`](./catalog/studio) stays synchronized:

```bash
npm run build:prod
```

---

## 4. Pre-PR Verification Checklist

Before submitting a Pull Request, run:

```bash
npm run verify
```

This executes:
1. `node bin/sourcebook.mjs lint --all` (validates all 417 design systems with 0 errors)
2. `npm --prefix studio/app run build` (`tsc -b && vite build` with 0 TypeScript or bundle errors)
3. `node scripts/build-catalog.mjs` (syncs `catalog/studio/` and compiles `catalog/index.html`)
