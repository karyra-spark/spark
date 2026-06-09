# Karyra Spark

> **Learn Crypto Safely, Grow Together**

Karyra Spark is a mobile-first, open-source SvelteKit frontend for a Starknet readiness gateway — a structured educational platform that guides Indonesian-speaking users through blockchain fundamentals, safe wallet practices, and the Starknet ecosystem one step at a time.

The platform is intentionally *not* a trading tool. It begins with understanding and safety, and only opens the door to wallets, testnets, and ecosystem exploration once users have demonstrated readiness.

**Live demo:** [spark.user.cloudjkt01.com](https://spark.user.cloudjkt01.com)
**Status:** `BETA 0.1` — mobile-first, with Starknet integrations rolling out progressively

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Learning Journey](#learning-journey)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Dev Server](#running-the-dev-server)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
  - [Docker (Staging)](#docker-staging)
- [Application Routes](#application-routes)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Many blockchain beginners drop out before they even start — because they are immediately confronted with wallets, seed phrases, and live transactions before they understand the basics. Spark solves this with a clear, gated learning path:

**Understand → Practice safely → Prove readiness → Explore the ecosystem**

All content is in Bahasa Indonesia and designed around the needs of local learners and community facilitators. The platform is built mobile-first because that is how most of the target audience accesses the web.

---

## Key Features

**Core Curriculum (`/core`)**
A three-level learning track — Beginner, Intermediate, and Advanced — covering blockchain fundamentals, cryptocurrency concepts, wallet security, Web3 applications, and Starknet. Each level is gated behind a passing score (≥ 70%) on a level-end exam. Topics include:
- Why blockchain and digital trust
- How shared ledgers work
- Cryptocurrency and network fees — without speculative framing
- Seed phrases, private keys, signature hygiene, and scam awareness
- Wallet connections, transaction simulation, and block explorers
- Starknet, account abstraction, testnet, and developer tooling

**Practice Lab (`/lab`)**
A safe simulation environment with no real assets. Exercises are leveled (Beginner, Intermediate, Advanced) and include scenarios like:
- Recognising dangerous wallet requests
- Step-by-step safe-wallet checklists
- Transaction simulations and Starknet sandbox exercises

Lab results feed directly into a user's Readiness Passport.

**Readiness Passport (`/passport`)**
An aggregated proof-of-readiness record built from a user's learning progress, lab completion, and community participation. Acts as a lightweight on-platform credential before the user moves into live ecosystem exploration.

**Spark Hub (`/hub`)**
A curated gateway to Starknet resources, tools, apps, and ecosystem missions, accessible once a baseline level of readiness has been established. The Hub can run as a sub-path (`/hub`) or as a standalone service on a separate port.

**Community (`/community`)**
Workshops, cohorts, and discussion spaces moderated by local facilitators. The community layer reinforces learning with peer interaction and live events.

**Dashboard & Inbox (`/dashboard`, `/inbox`)**
Personalised progress summaries and in-app notifications to keep learners oriented and on track.

---

## Learning Journey

```
Core Beginner  →  Core Intermediate  →  Core Advanced
      ↓                   ↓                    ↓
  Lab Beginner  →  Lab Intermediate  →  Lab Advanced
                          ↓
                  Readiness Passport
                          ↓
               Hub + Community Exploration
```

Each stage is unlocked only after completing the previous level's exam with a ≥ 70% score. This progression ensures no learner is pushed into wallet or testnet interactions before they are ready.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [SvelteKit 2](https://kit.svelte.dev) + [Svelte 5](https://svelte.dev) |
| Language | [TypeScript 6](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) (Vite plugin) |
| UI Components | [bits-ui](https://www.bits-ui.com), [@lucide/svelte](https://lucide.dev) |
| Notifications | [svelte-sonner](https://svelte-sonner.vercel.app) |
| Schema Validation | [Zod](https://zod.dev) |
| Utilities | [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge), [mode-watcher](https://mode-watcher.vercel.app) |
| Build Tool | [Vite 8](https://vitejs.dev) |
| Server Adapter | [@sveltejs/adapter-node](https://kit.svelte.dev/docs/adapter-node) |
| Package Manager | [pnpm 10](https://pnpm.io) |
| Runtime | Node.js 22 |
| Containerisation | Docker (multi-stage, `node:22-alpine`) |

**Language breakdown:** Svelte 42.5% · CSS 33.1% · TypeScript 21.4% · JavaScript 3.0%

---

## Project Structure

```
spark/
├── src/
│   ├── routes/           # SvelteKit file-based routing
│   │   ├── (app)/        # Authenticated app shell
│   │   ├── core/         # Core curriculum
│   │   ├── lab/          # Practice Lab
│   │   ├── passport/     # Readiness Passport
│   │   ├── hub/          # Ecosystem Hub
│   │   ├── community/    # Community & workshops
│   │   ├── dashboard/    # User dashboard
│   │   ├── inbox/        # Notifications
│   │   ├── login/        # Authentication
│   │   └── ...
│   ├── lib/              # Shared components and utilities
│   └── scripts/          # Audit and QA scripts
├── static/               # Static assets (brand, icons)
├── .env.example          # Environment variable template
├── Dockerfile.staging    # Multi-stage Docker build
├── svelte.config.js      # SvelteKit configuration
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 22 or later
- **pnpm** 10 (`corepack enable` or `npm i -g pnpm`)
- A running instance of the Spark backend API (for authenticated features)

### Installation

```bash
# Clone the repository
git clone https://github.com/karyra-spark/spark.git
cd spark

# Install dependencies
pnpm install
```

### Environment Variables

Copy the example file and fill in the values for your environment:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|---|---|---|
| `PUBLIC_SPARK_APP_NAME` | `Karyra Spark` | Display name of the application |
| `PUBLIC_SPARK_MODE` | `beta` | App mode (`beta` or `production`) |
| `PUBLIC_SPARK_APP_URL` | `http://localhost:5173` | Frontend origin URL |
| `PUBLIC_SPARK_API_URL` | `http://localhost:8787` | Backend API base URL |
| `PUBLIC_SPARK_HUB_URL` | `/hub` | Hub sub-path or separate origin (e.g. `http://localhost:5174`) |
| `ORIGIN` | _(deployment origin)_ | Required by the Node adapter in production |

> All `PUBLIC_` variables are exposed to the browser. Do not store secrets under these keys.

### Running the Dev Server

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`. The dev server binds to `0.0.0.0` by default to support mobile testing on the local network.

---

## Available Scripts

### Development

| Command | Description |
|---|---|
| `pnpm dev` | Start the Vite development server |
| `pnpm build` | Build the production bundle |
| `pnpm preview` | Preview the production build locally |
| `pnpm start` | Run the built Node.js server |
| `pnpm check` | Type-check with `svelte-check` |
| `pnpm lint` | Check formatting and linting |
| `pnpm format` | Auto-format with Prettier |

### Audit Scripts

Spark ships with a suite of automated QA scripts for maintaining content quality, UX consistency, and code cleanliness.

| Command | What it checks |
|---|---|
| `pnpm audit:all` | Run the full audit suite |
| `pnpm audit:code-clean` | Code cleanliness and hygiene |
| `pnpm audit:public-copy` | Public-facing copy contract |
| `pnpm audit:microcopy` | UI microcopy consistency |
| `pnpm audit:journey-copy` | Learning journey copy |
| `pnpm audit:learning-flow` | Learning flow structure |
| `pnpm audit:passport-readiness` | Passport readiness signals |
| `pnpm audit:css-syntax` | Global CSS selector patterns |
| `pnpm audit:hub-topology` | Hub navigation topology |
| `pnpm audit:desktop-layout` | Desktop layout compliance |
| `pnpm audit:beta-signal` | Beta-stage feature flags |
| `pnpm audit:public-surface` | Public surface area |

---

## Deployment

### Docker (Staging)

The repository includes `Dockerfile.staging`, a multi-stage build targeting `node:22-alpine`. The resulting image runs the compiled SvelteKit Node server on port **4173**.

**Build the image:**

```bash
docker build \
  --build-arg PUBLIC_API_BASE="https://api.yourdomain.com" \
  --build-arg PUBLIC_SPARK_API_BASE="https://api.yourdomain.com" \
  --build-arg PUBLIC_SPARK_HUB_URL="/hub/" \
  --build-arg PUBLIC_SPARK_APP_URL="https://spark.yourdomain.com" \
  --build-arg PUBLIC_SPARK_MODE="production" \
  --build-arg ORIGIN="https://spark.yourdomain.com" \
  -f Dockerfile.staging \
  -t karyra-spark:staging .
```

**Run the container:**

```bash
docker run -p 4173:4173 karyra-spark:staging
```

The app will be available at `http://localhost:4173`.

> **Note:** Build-time `ARG` values are baked into the static bundle. For environment-specific deployments, pass the correct `--build-arg` values at build time rather than at runtime.

---

## Application Routes

| Route | Description |
|---|---|
| `/` | Landing page and learning path overview |
| `/core` | Core Beginner curriculum (3 levels + exams) |
| `/lab` | Practice Lab (safe simulations, 3 levels) |
| `/passport` | Readiness Passport and progress proof |
| `/hub` | Spark Hub — Starknet ecosystem gateway |
| `/community` | Workshops, cohorts, and community discussion |
| `/dashboard` | Personal learning dashboard |
| `/inbox` | In-app messages and learning notifications |
| `/login` / `/register` | Authentication |
| `/profile` / `/settings` | Account and profile management |
| `/lesson/:slug` | Individual lesson pages |
| `/about` | About Karyra Spark |
| `/help` / `/faq` / `/docs` | Support and documentation |
| `/terms` | Terms of service |

---

## Contributing

Contributions are welcome. Please open an issue before submitting a pull request for significant changes so the direction can be discussed first.

```bash
# Fork the repo, then create a feature branch
git checkout -b feat/your-feature-name

# After your changes, run the full audit and lint checks
pnpm audit:all
pnpm lint

# Open a pull request against main
```

Please keep commits focused and descriptive. The audit scripts in `src/scripts/` are a useful sanity check before opening a PR.

---

## License

This repository does not yet include an explicit license file. Until one is added, all rights remain with the contributors. If you intend to reuse or fork this project, please open an issue to discuss terms.

---

*Karyra Spark — education and readiness, not financial advice.*
*© 2026 Karyra Spark*
