# Project Status Summary

Karyra Spark is a beginner-friendly readiness platform for people who want to understand Web3 and Starknet before taking risky actions such as connecting a wallet, signing a message, or sending a transaction.

This document summarizes the current public state of the project.

It is written for users, contributors, community members, and technical readers who want to understand what exists today and what is still being developed.

## Current product shape

Karyra Spark is organized around five connected areas:

```text
Learn
  ↓
Practice
  ↓
Community
  ↓
Readiness Passport
  ↓
Hub
```

The product is designed to start with learning and safety. Users should be able to understand the basics before they are asked to interact with a wallet or blockchain application.

## Spark

Spark is the main public learning application.

Current public focus:

- beginner-friendly lessons;
- safe Web3 and wallet explanations;
- learning-first navigation;
- public documentation;
- readiness-oriented product structure;
- no public content studio or internal editor route.

Spark is the first entry point for users who need plain-language explanations and a safer path into Web3.

## Core lessons

The current Core lesson path introduces:

- why blockchain exists;
- what a shared ledger means;
- what tokens are;
- why a wallet is not a bank account;
- how Web3 interactions work;
- what Starknet is;
- how Cairo fits into the later builder path.

The lessons are written for beginners. They are not designed as trading content and do not push users toward speculation.

## Safety posture

Karyra Spark uses a safety-first approach.

Current safety direction:

- users can start learning without a wallet;
- wallet connection is not required for the first learning path;
- seed phrases and private keys are never requested;
- signatures and transactions are treated as actions that need attention;
- public routes should not expose internal editing tools;
- public builds should not point to local development URLs.

The goal is to help users build safer habits before they explore real applications.

## Hub

Karyra Hub is the guided ecosystem gateway.

It helps users move from Spark into Starknet resources, tools, communities, and builder paths with context.

Current public focus:

- guided Starknet resource discovery;
- beginner-friendly ecosystem navigation;
- visible read-only Starknet RPC status;
- wallet detection without wallet connection;
- Cairo and Scarb learning direction for later builder paths.

The Hub does not ask users to connect a wallet as a first step. It introduces ecosystem exploration gradually.

## Starknet integration

The current Starknet integration is intentionally read-only.

It is used to show that Hub can read public network information without asking the user for a wallet, private key, seed phrase, signature, or transaction.

Current direction:

- read-only RPC visibility;
- network status display;
- Starknet beginner path;
- Cairo and Scarb examples;
- future proof or attestation ideas handled carefully with privacy and consent.

This keeps the first Starknet touchpoint visible but safe.

## Spark API

Spark API is the backend foundation for future user accounts, sessions, progress records, participation records, and readiness-related features.

Current public direction:

- Rust and Axum backend foundation;
- PostgreSQL-backed service direction;
- httpOnly session-based auth foundation;
- Participation Layer documentation;
- Proof Ledger model documentation;
- Readiness Passport flow documentation.

The backend is expected to support the structured records behind learning, participation, and readiness features.

## Participation system

Karyra Spark documents participation through three public concepts:

- Participation Layer;
- Proof Ledger;
- Readiness Passport.

Together, these describe how learning, practice, community activity, and facilitator confirmation can become structured readiness records.

The first version should remain simple and database-backed. More advanced proof or Starknet-based attestation features can be added later, only when the safety and privacy model is clear.

## Community direction

Karyra Spark is shaped by local onboarding needs.

Important signals include:

- users need a safer starting point;
- language and tone matter;
- practice without pressure is important;
- community support still matters;
- users need a clear path after learning.

The project should communicate early community signals honestly and avoid overstating adoption.

## Public documentation

Current public documentation direction includes:

- Local Community Signal Summary;
- Public Evidence Checklist;
- Participation Layer;
- Proof Ledger Model;
- Readiness Passport Flow;
- project status summary.

These documents are meant to help public readers understand the product without needing private explanation.

## Current limits

Karyra Spark is still in active development.

Current limits:

- participation records are still a design foundation, not a complete production record system;
- proof and attestation flows are future-facing;
- facilitator workflows still need implementation;
- community evidence should remain honest and measured;
- Starknet integration is currently read-only and intentionally limited.

These limits are part of the public state of the project and should be communicated clearly.

## Current public goal

The current goal is to make Karyra Spark understandable, safe to review, and useful as a first-mile onboarding path.

The product should help people answer:

- What is Web3?
- What should I be careful about?
- What is Starknet?
- What should I practice before using a wallet?
- What have I completed?
- What is my next safe step?

Karyra Spark exists to help users enter open ecosystems with better context, safer habits, and clearer direction.
