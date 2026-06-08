# Karyra Spark

Karyra Spark is a live beta readiness gateway for local, non-technical users who want to enter Starknet and Web3 more safely. Spark focuses on learning, wallet-safety practice, readiness tracking, and a guided path toward the Karyra Hub ecosystem gateway.

Spark is intentionally **mobile-first**, public-facing, and beginner-friendly. It does not push users to connect a wallet too early. Instead, it helps users build confidence through structured learning, safe practice, Passport readiness, and guided exploration.

## Current status

- **Version:** Beta 0.1
- **Frontend:** SvelteKit + pnpm
- **Public app:** Spark readiness gateway
- **Companion services:** `spark-api` backend and `hub` ecosystem gateway
- **Starknet scope:** onboarding, wallet safety, readiness education, Hub discovery, and minimal Starknet integration through Hub

## Product pillars

- **Learn:** beginner-friendly lessons, checkpoints, glossary, and learning paths.
- **Practice:** safe labs and wallet-readiness simulations before real wallet interaction.
- **Passport:** learner progress, readiness state, and evidence of learning activity.
- **Community:** workshop, cohort, local facilitation, and participation signals.
- **Hub:** guided discovery of Starknet resources, missions, tools, community paths, and builder-later resources.

## Repository role

This repository contains the public Spark frontend. It should stay safe for reviewers and external contributors to inspect.

Related repositories:

- `karyra-spark/spark-api` — backend, storage, deployment stack, and server integration.
- `karyra-spark/hub` — Starknet ecosystem gateway and minimal Starknet integration surface.

## Local development

Requirements:

- Node.js 22+
- pnpm

Install and run:

```bash
pnpm install
pnpm run dev
```

Check before committing:

```bash
pnpm run audit:public-repo
pnpm run audit:public-copy
pnpm run audit:hub-topology
pnpm run check
pnpm run build
```

## Environment

Copy the example file and adjust values for your local workspace:

```bash
cp .env.example .env
```

Common local values:

```bash
PUBLIC_SPARK_APP_NAME="Karyra Spark"
PUBLIC_SPARK_MODE="local"
PUBLIC_SPARK_APP_URL="http://localhost:5173"
PUBLIC_SPARK_API_URL="http://localhost:8787"
PUBLIC_SPARK_HUB_URL="/hub"
```

For one-domain beta deployment, Hub is served under `/hub`.

## Public repository policy

This repository must not contain private grant strategy, real credentials, server secrets, local pass folders, backup folders, or scratch files. Public developer documentation is allowed and encouraged.

Run the repository audit before pushing:

```bash
pnpm run audit:public-repo
```

See:

- [`docs/development/DEVELOPER_GUIDE.md`](docs/development/DEVELOPER_GUIDE.md)
- [`docs/architecture/SPARK_FRONTEND_ARCHITECTURE.md`](docs/architecture/SPARK_FRONTEND_ARCHITECTURE.md)
- [`docs/security/PUBLIC_SECURITY_NOTES.md`](docs/security/PUBLIC_SECURITY_NOTES.md)
- [`docs/repository/PUBLIC_REPO_CLEANUP_PLAN.md`](docs/repository/PUBLIC_REPO_CLEANUP_PLAN.md)

## License

License will be finalized before production release. Until then, external usage should follow the repository owner’s explicit permission.
