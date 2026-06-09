# Contributing to Karyra Spark

Thank you for your interest in Karyra Spark.

Spark is a beta-stage public frontend for a Starknet readiness gateway. The project focuses on safe onboarding, local-first education, and a guided learning journey for Indonesian-speaking users.

## Before You Start

Please keep these principles in mind:

- Spark is education-first, not trading-first.
- Public UI copy should be clear, human, and beginner-friendly.
- Avoid developer jargon in user-facing text.
- Do not add wallet prompts, transaction prompts, or speculative financial framing without discussion.
- Treat the repository as public-facing: do not commit secrets, local backup files, pass artifacts, or private grant notes.

## Development Setup

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Run the main checks before submitting changes:

```bash
pnpm audit:all
pnpm check
pnpm build
```

## Branch and Commit Style

Use focused branches:

```bash
git checkout -b feat/add-learning-card
git checkout -b fix/passport-empty-state
git checkout -b docs/update-security-notes
```

Prefer clear commit messages:

```text
feat: add learning progress summary
fix: improve passport empty state
docs: document public copy principles
```

## Pull Request Checklist

Before opening a pull request, please confirm:

- [ ] The change is scoped and easy to review.
- [ ] `pnpm audit:all` passes.
- [ ] `pnpm check` passes.
- [ ] `pnpm build` passes.
- [ ] No secrets or local files were committed.
- [ ] Public copy follows the beginner-friendly language guidelines.
- [ ] The change does not introduce public Studio/admin surfaces.
- [ ] The change does not introduce wallet connection or onchain writes without explicit discussion.

## Public UI Copy

When changing public-facing copy, prefer action-oriented language:

```text
Mulai Belajar
Lanjutkan Perjalanan
Lihat Passport
Jelajahi Hub
```

Avoid making buttons or empty states sound like internal systems:

```text
Core
Runtime Sync
Evidence Root
Backend Session
```

Technical terms may be used in developer documentation, but public UI should remain accessible.

## Reporting Issues

When opening an issue, include:

- What you expected to happen.
- What actually happened.
- Steps to reproduce.
- Browser/device information if relevant.
- Screenshots for UI issues when possible.

## License

This repository currently has no explicit license file. Until one is added, all rights remain with the contributors.
