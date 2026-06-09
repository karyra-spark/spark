# Public Evidence Checklist

This checklist describes the public materials that can help people understand the current state of Karyra Spark.

It is written for users, contributors, community members, and technical readers who want to see what exists, what is still in progress, and how the project communicates its work.

The goal is simple: make the project easier to review without relying on private explanations.

## Why this checklist exists

A public project should be understandable from its own materials.

When someone opens the repository or visits the product, they should be able to answer:

- What is this project?
- Who is it for?
- What can be used today?
- What is still experimental?
- How does it handle safety?
- How does it connect to Starknet?
- Where can developers understand the system?

This checklist helps Karyra keep those answers visible and organized.

## Product evidence

### Public application

The public Spark application should show the main learning path clearly.

Recommended evidence:

- home page explains the purpose of Spark;
- lessons are available and readable;
- practice or lab areas are visible;
- Readiness Passport concept is visible;
- Hub path is available;
- no private Studio or internal editor is exposed on the public build.

### Core lessons

The public learning path should include beginner-friendly lessons that explain:

- why blockchain exists;
- what a shared ledger means;
- what tokens are;
- why wallets are not bank accounts;
- how Web3 interactions work;
- what Starknet is;
- how Cairo fits into the builder path.

The lessons should be written in simple language and should not push users toward speculation.

### Safety experience

The product should make safety visible.

Recommended evidence:

- wallet safety is explained before wallet connection;
- users are reminded not to share seed phrases;
- signing and transaction actions are treated carefully;
- learning can begin without a wallet;
- risky actions are not presented as ordinary clicks.

## Hub evidence

Karyra Hub should show a guided path into Starknet and related ecosystem resources.

Recommended evidence:

- Hub explains that it is a guided gateway;
- resources are grouped with readiness context;
- beginner resources are separated from technical paths;
- Starknet integration is visible;
- RPC status or network reading is clearly marked as read-only;
- wallet detection does not ask users to connect.

## Technical evidence

Technical readers should be able to understand the project structure without private explanation.

Recommended evidence:

- README files explain the repository purpose;
- setup commands are documented;
- build and check commands are available;
- environment examples are safe for production;
- internal-only routes are not exposed;
- important design documents are stored in `docs/`.

Useful technical documents include:

- Participation Layer;
- Proof Ledger Model;
- Readiness Passport Flow;
- architecture notes;
- deployment notes;
- API and backend notes.

## Community evidence

Community evidence should be honest and practical.

Useful signals include:

- workshop notes;
- learning session summaries;
- facilitator notes;
- user questions that shaped lessons;
- local onboarding observations;
- examples of repeated safety concerns;
- public documentation of community direction.

Community evidence should not exaggerate adoption. It should explain what has been learned and how the project responds.

## Starknet evidence

Karyra should show its Starknet direction through product behavior and documentation.

Useful evidence includes:

- Starknet introduction in lessons;
- visible Starknet Hub section;
- read-only Starknet RPC status;
- beginner-friendly Starknet resources;
- Cairo or Scarb learning path;
- future attestation notes written with privacy and consent in mind.

The project should avoid claiming full onchain features before they exist.

## Privacy and safety evidence

Karyra Spark should make its privacy and safety posture clear.

Recommended evidence:

- users can begin without connecting a wallet;
- private keys and seed phrases are never requested;
- participation records are explained carefully;
- public sharing is optional;
- future proof or attestation features are described as user-controlled;
- sensitive personal data is not required for basic learning.

## Documentation checklist

The following documents help make the project easier to understand:

```text
README.md
docs/LOCAL_COMMUNITY_SIGNAL_SUMMARY.md
docs/PUBLIC_EVIDENCE_CHECKLIST.md
docs/PARTICIPATION_LAYER_SPEC.md
docs/PROOF_LEDGER_MODEL.md
docs/READINESS_PASSPORT_FLOW.md
```

Not every repository needs every document, but the public Spark repository should include the documents that help users and contributors understand the product direction.

## Review checklist

Before sharing a public build or repository, check:

- the app builds successfully;
- public routes do not expose internal tools;
- links do not point to local development URLs;
- learning content is readable;
- Starknet references are accurate and beginner-friendly;
- safety warnings are visible where needed;
- docs do not include private strategy notes;
- docs do not speak only to developers;
- docs do not speak only to funders or reviewers;
- the project can be understood by a new public reader.

## Current focus

Karyra Spark should continue building public evidence through real product improvements:

- clearer lessons;
- safer practice flows;
- visible readiness summaries;
- better local community documentation;
- guided Hub resources;
- transparent technical docs.

The best evidence is a product that people can open, read, use, and understand.
