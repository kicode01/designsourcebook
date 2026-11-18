# What we can't get

Generated 2026-11-18 from `data/blocked.json` and `data/coverage.json`.

## 1. Attempted and failed

**35** systems. These were ingested and rejected — not skipped.

| System | Org | Source | Reason |
|---|---|---|---|
| Adyen Design | Adyen | `@adyen/adyen-web` | only 3 colour tokens extracted — below the 12 needed to represent a system |
| Beeline Design System | Beeline | `beelinedesignsystem.com/` | browser could not read the page: page.goto: net::ERR_CONNECTION_TIMED_OUT at http://beelinedesignsystem.com/ |
| Bold (Bridge Design System) | Bridge Design System | `github.com/laboratoriobridge/bold` | only 11 colour tokens extracted — below the 12 needed to represent a system |
| Brighton & Hove Pattern Library | Brighton | `design.brighton-hove.gov.uk/website-pattern-library.php?p=service-icons` | could not fetch the page: 404 |
| Solar Design System | Bulb | `design.bulb.co.uk/` | browser could not read the page: page.goto: net::ERR_NAME_NOT_RESOLVED at http://design.bulb.co.uk/ |
| Cash App Design System | Cash App | `design.cash.app/` | could not fetch the page: 403 |
| Blocks Design System | CBRE Build | `blocks.cbrebuild.com/` | browser could not read the page: page.goto: net::ERR_NAME_NOT_RESOLVED at https://blocks.cbrebuild.com/ |
| Chota | Chota | `chota` | only 10 colour tokens extracted — below the 12 needed to represent a system |
| Cockroach UI | Cockroach Labs | `@cockroachlabs/ui-components` | no colour tokens found in the package |
| Code for America Style Guide | Code for America | `style.codeforamerica.org/` | browser could not read the page: page.goto: net::ERR_NAME_NOT_RESOLVED at http://style.codeforamerica.org/ |
| elementary HIG | Elementary | `elementary.io/en/docs/human-interface-guidelines` | HTTP 404 — site blocked automated access (Page Not Found ⋅ elementary) |
| Latitude | Flexport | `flexport.com/design` | HTTP 404 — site blocked automated access (This page is off the grid. Your cargo never will be. | Flexport) |
| FutureLearn Design System | FutureLearn | `design-system.futurelearn.com/` | could not fetch the page: 403 |
| Edison Design System | General Electric | `eds.gehealthcare.com/` | browser could not read the page: page.goto: net::ERR_NAME_NOT_RESOLVED at https://eds.gehealthcare.com/ |
| Halfmoon | Halfmoon | `halfmoon` | no colour tokens found in the package |
| .pulse | Heartbeat | `pulse.heartbeat.ua/` | HTTP 526 — site blocked automated access (heartbeat.ua | 526: Invalid SSL certificate) |
| Inclusive Components | Inclusive | `inclusive-components.design` | only 2 colour tokens from the rendered page — below the 12 needed |
| Atlantis | Jobber | `atlantis.getjobber.com/` | could not fetch the page: 403 |
| Rizzo | Lonely Planet | `rizzo.lonelyplanet.com/` | browser could not read the page: page.goto: net::ERR_NAME_NOT_RESOLVED at http://rizzo.lonelyplanet.com/ |
| Maersk Design System | Maersk | `designsystem.maersk.com/foundations/colour-roles/index.html` | browser could not read the page: page.goto: Timeout 30000ms exceeded. |
| Degen Design System | Mirror | `github.com/mirror-xyz/degen` | only 3 colour tokens extracted — below the 12 needed to represent a system |
| NationBuilder Radius | NationBuilder | `nationbuilder.design/` | could not fetch the page: 403 |
| NRK Core | NRK | `@nrk/core-css` | no colour tokens found in the package |
| OPattern | OPower | `ux.opower.com/opattern/` | HTTP 503 — site blocked automated access (We're doing some work to update this site.) |
| Pure CSS | Pure.css | `purecss` | no colour tokens found in the package |
| Reach UI | Reach | `reach.tech/` | HTTP 526 — site blocked automated access (reach.tech | 526: Invalid SSL certificate) |
| RippleUI | RippleUI | `github.com/Siumauricio/rippleui` | only 4 colour tokens extracted — below the 12 needed to represent a system |
| Ruter Components | Ruter | `components.ruter.as/` | could not fetch the page: fetch failed |
| Quartz | Schneider Electric | `@quartzds/core` | no colour tokens found in the package |
| Horizon | ServiceNow | `horizon.servicenow.com/` | could not fetch the page: 403 |
| Spectre.css | PicturePan2 | `spectre.css` | only 10 colour tokens extracted — below the 12 needed to represent a system |
| Starwind UI | Starwind UI | `github.com/starwind-ui/starwind-ui` | only 1 colour tokens extracted — below the 12 needed to represent a system |
| Ahoy | Teamleader | `ahoy.teamleader.eu/` | browser could not read the page: page.goto: net::ERR_NAME_NOT_RESOLVED at https://ahoy.teamleader.eu/ |
| Uiverse | Uiverse | `uiverse.io/` | could not fetch the page: 403 |
| Wonderbly Design System | Wonderbly | `design-system.wonderbly.com/` | browser could not read the page: page.goto: net::ERR_NAME_NOT_RESOLVED at http://design-system.wonderbly.com/ |

## 2. No machine-readable source

**5** organisations publish documentation and nothing else — no npm package, no public repo. These need a human reading the site.

- **Biteable** — X (Biteable Design System)
- **Discovery Education** — Comet
- **Hellyhansen** — Design System from Helly Hansen
- **Gusto** — Workbench Design System from Gusto
- **Goldmansachs** — Design System from Goldman Sachs

## 3. Not yet attempted

**0** organisations are reachable but not done: 0 via a verified npm package, 0 via a public repo.

### Via npm package


### Via public repository only


