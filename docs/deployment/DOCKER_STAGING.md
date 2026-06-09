# Docker Staging

Spark includes a Docker staging build for the SvelteKit Node adapter.

## Image Role

The staging image builds the Spark frontend and serves the compiled Node application on port `4173`.

## Build

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

## Run

```bash
docker run -p 4173:4173 karyra-spark:staging
```

Open:

```text
http://localhost:4173
```

## Build-Time Variables

SvelteKit public variables are embedded into the client bundle at build time.

Set these correctly when building the image:

```text
PUBLIC_SPARK_APP_URL
PUBLIC_SPARK_API_URL
PUBLIC_SPARK_HUB_URL
PUBLIC_SPARK_MODE
ORIGIN
```

Do not rely on runtime changes for browser-exposed public values.

## Staging Checks

Before building Docker images:

```bash
pnpm audit:all
pnpm check
pnpm build
```

After deployment, check:

```text
/
 /core
 /lab
 /passport
 /hub
 /community
 /dashboard
```

Also verify that Hub navigation works according to the selected topology.

## Public Surface Expectations

The staging image should not expose:

```text
/studio
/studio/content
/studio/content/api/override
```

Spark public builds should not contain public content writer surfaces.
