# Frontend Architecture

Karyra Spark is the public frontend for the Spark readiness gateway.

Its role is to guide users through a safe, structured learning journey before they move into wallet usage, testnets, or broader Starknet ecosystem exploration.

## Repository Role

```text
spark      → public frontend application
spark-api  → backend API and deployment stack
hub        → Starknet ecosystem gateway
```

This repository contains the frontend only.

## Main Responsibilities

Spark handles:

- public landing and orientation pages;
- authentication screens;
- learning journey UI;
- Practice Lab UI;
- Readiness Passport UI;
- profile/settings surfaces;
- dashboard and inbox surfaces;
- safe navigation to the Hub;
- public copy, layout, and UX guardrails.

Spark does not handle:

- private keys;
- seed phrases;
- onchain writes;
- production secrets;
- backend persistence logic;
- public Studio/admin writing surfaces.

## Route Groups

Common public/app routes:

| Route | Role |
|---|---|
| `/` | Landing page |
| `/core` | Core curriculum |
| `/lab` | Safe practice lab |
| `/passport` | Readiness Passport |
| `/hub` | Hub bridge/gateway route |
| `/community` | Community and workshop surfaces |
| `/dashboard` | User learning overview |
| `/inbox` | Notifications and messages |
| `/profile` | User profile |
| `/settings` | Preferences and settings |
| `/login`, `/register` | Authentication |

## Shared Components

Shared UI lives under:

```text
src/lib/ui
src/lib/shell
```

The shell handles navigation, top-level layout, mobile drawer behavior, theme surfaces, beta labels, and global public UI rhythm.

## State and Models

State modules live under `src/lib` and related subfolders. They support:

- app shell state;
- session/profile state;
- learning state;
- lab/progress state;
- messaging and notification state;
- Passport/readiness state;
- Hub navigation state.

Frontend state should stay understandable and UI-oriented. Persistence and trust-critical behavior should remain backend-owned.

## Styling

Global styles are imported from `src/routes/+layout.svelte`.

Styles are intentionally named semantically, for example:

```text
learning-experience.css
gateway-surfaces.css
desktop-layout.css
beta-signal.css
passport-explainability.css
```

Avoid pass-based or patch-based public code names.

## Hub Topology

Spark supports two Hub modes:

```text
PUBLIC_SPARK_HUB_URL="/hub"
PUBLIC_SPARK_HUB_URL="http://localhost:5174"
```

The `/hub` value is used for one-domain beta deployments. A full URL can be used for local development or future split-domain production.

## Public Surface Guardrails

The frontend should remain safe for a public beta:

- no public Studio writer;
- no hidden admin editing route;
- no private credential handling;
- no wallet connection prompt unless intentionally introduced as a reviewed milestone;
- no financial advice language.

## Beta Status

Spark currently identifies itself as:

```text
BETA 0.1
```
