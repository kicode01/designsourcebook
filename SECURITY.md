# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| `1.0.x` (`main`) | :white_check_mark: |

## Security Architecture

- **Zero-Eval SVG & Token Sanitization**: All uploaded and ingested SVGs pass through `sanitizeSvg()` in [`studio/app/src/engine/svgAnatomy.ts`](./studio/app/src/engine/svgAnatomy.ts), stripping `<script>`, `foreignObject`, event handler attributes (`onload`, `onerror`, etc.), and external `javascript:` URIs before DOM or WebGL2 rasterization.
- **Read-Only Serverless API**: Public endpoints under [`api/`](./api) perform parameterized read-only queries against Neon Postgres with static filesystem fallback.
- **Secret Hygiene**: Database credentials (`DATABASE_URL`), GitHub tokens (`GITHUB_TOKEN`), and cron secrets (`CRON_SECRET`) must never be committed to version control. Use `.env.local` locally and encrypted Vercel / GitHub Actions secrets in production.

## Reporting a Vulnerability

If you discover a security vulnerability in Design Sourcebook, please report it privately via [GitHub Security Advisories](https://github.com/kicode01/designsourcebook/security/advisories/new) rather than opening a public issue. We review all reports promptly and will coordinate a fix and disclosure timeline with you.
