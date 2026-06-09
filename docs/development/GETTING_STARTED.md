# Getting Started

This guide helps developers run the Karyra Spark frontend locally.

Spark is a SvelteKit application built with Svelte 5, TypeScript, Vite, Tailwind CSS, and pnpm.

## Prerequisites

Install:

- Node.js 22 or later
- pnpm 10
- Git

Recommended:

```bash
corepack enable
```

## Clone the Repository

```bash
git clone https://github.com/karyra-spark/spark.git
cd spark
```

## Install Dependencies

```bash
pnpm install
```

## Configure Environment

Copy the example file:

```bash
cp .env.example .env
```

Default local values:

```env
PUBLIC_SPARK_APP_NAME="Karyra Spark"
PUBLIC_SPARK_MODE="beta"
PUBLIC_SPARK_APP_URL="http://localhost:5173"
PUBLIC_SPARK_API_URL="http://localhost:8787"
PUBLIC_SPARK_HUB_URL="/hub"
```

For a separate local Hub service, use:

```env
PUBLIC_SPARK_HUB_URL="http://localhost:5174"
```

All `PUBLIC_` variables are exposed to the browser. Do not store secrets in them.

## Run the Development Server

```bash
pnpm dev
```

Spark will be available at:

```text
http://localhost:5173
```

The dev server binds to `0.0.0.0` to support local network testing on mobile devices.

## Type Check

```bash
pnpm check
```

## Build

```bash
pnpm build
```

## Preview

```bash
pnpm preview
```

## Useful Local Flow

For normal local development:

```bash
pnpm install
pnpm audit:all
pnpm check
pnpm build
pnpm dev
```

## Backend Dependency

Some authenticated features depend on the Spark backend API. Set:

```env
PUBLIC_SPARK_API_URL="http://localhost:8787"
```

Use the `spark-api` repository to run the backend locally or through Docker.

## Common Issues

### API requests fail locally

Check that:

- the backend API is running;
- `PUBLIC_SPARK_API_URL` points to the correct origin;
- browser CORS settings match the backend configuration.

### Hub links point to the wrong place

Check `PUBLIC_SPARK_HUB_URL`.

Use `/hub` for one-domain beta topology, or `http://localhost:5174` for a separate local Hub dev server.

### Build is slower than expected

The app currently includes several public routes, audit guards, and global styles. Use `pnpm check` first for quicker feedback, then `pnpm build` before committing.
