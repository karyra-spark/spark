# Spark Developer Guide

Spark is the public frontend for the Karyra Spark readiness gateway. It is designed as a mobile-first SvelteKit app with a professional public surface for learners, reviewers, and future contributors.

## Requirements

- Node.js 22+
- pnpm

## Setup

```bash
pnpm install
cp .env.example .env
pnpm run dev
```

The default local topology is:

- Spark frontend: `http://localhost:5173`
- Spark API: `http://localhost:8787`
- Hub path: `/hub`

## Commands

```bash
pnpm run dev
pnpm run check
pnpm run build
pnpm run preview
pnpm run audit:public-repo
pnpm run audit:public-copy
pnpm run audit:hub-topology
```

## Public copy contract

Spark is a public end-user app. User-facing copy should be natural, human, and beginner-friendly.

Prefer:

- `Mulai`, `Lanjutkan`, `Ikuti`, `Kirim`, `Lihat`, `Temukan`, `Jelajahi`, `Selesaikan`.
- Copy that explains user value before asking for action.
- Clear confirmation for destructive actions.

Avoid public UI copy that feels like internal implementation detail, such as backend sessions, local-state queues, proof ledgers, or storage internals.

## Beta signal

Spark currently presents itself as **Beta 0.1**. This is intentional for grant reviewers and early users: the product is live, but still in active development.

## Commit checklist

Before pushing:

```bash
pnpm run audit:public-repo
pnpm run audit:public-copy
pnpm run audit:hub-topology
pnpm run check
pnpm run build
```

Do not commit:

- `.env` or real credentials
- `pass-*` folders or ZIPs
- `.pass-backups` or temporary backups
- helper logs or scratch files
- private grant strategy or budget notes
