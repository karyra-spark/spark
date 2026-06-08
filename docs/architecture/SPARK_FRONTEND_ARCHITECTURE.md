# Spark Frontend Architecture

Spark is the public readiness gateway in the Karyra Spark stack.

## Stack

- SvelteKit
- TypeScript
- pnpm
- Svelte 5
- SvelteKit adapter-node for server deployment

## Runtime role

Spark focuses on the user-facing learning and readiness journey:

1. Public landing and onboarding.
2. Learn/Core journey.
3. Lab practice and wallet-safety readiness.
4. Passport readiness view.
5. Community participation surface.
6. Hub gateway entry point.

The app should remain safe for non-technical users. It should not require wallet connection just to understand Spark or begin learning.

## Companion services

- `spark-api`: backend service for account, progress, readiness, Passport, media, community, and deployment stack.
- `hub`: guided Starknet ecosystem gateway served under `/hub` during beta.

## One-domain beta topology

During beta, the public stack uses one domain:

```text
/        -> Spark frontend
/hub     -> Karyra Hub
API path -> Spark API routing managed by spark-api deployment stack
```

This keeps the beta deployment simple while allowing future production separation into dedicated domains or subdomains.

## Configuration

Spark topology is configured through public environment variables:

```bash
PUBLIC_SPARK_APP_URL
PUBLIC_SPARK_API_URL
PUBLIC_SPARK_HUB_URL
PUBLIC_SPARK_MODE
```

`PUBLIC_SPARK_HUB_URL` may be an absolute URL or a path such as `/hub`.

## UI principle

Spark is a public app, not a developer dashboard. Internal terminology should stay in code, docs, or scripts, not in user-facing copy.
