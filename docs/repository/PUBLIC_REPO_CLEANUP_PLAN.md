# Public Repository Cleanup Plan

This repository is being prepared for public review, grant evaluation, and future developer contribution.

## What should stay public

- Source code required to build Spark.
- Public product documentation.
- Developer setup and architecture docs.
- Public copy contract and audit scripts.
- Safe `.env.example` values.
- Deployment references that do not expose secrets.

## What should not be public

- Private grant strategy, budget, or negotiation notes.
- Real credentials or provider-specific secrets.
- Local pass ZIPs or installer folders.
- Backup folders such as `.pass-backups`.
- Helper logs, scratch files, and temporary patches.
- Internal analysis dumps that are not public developer documentation.

## Current known cleanup debt

Some older style and audit files still use pass-based names from the iterative build process. They are not dangerous, but they should be consolidated or renamed in a later cleanup pass to make the repository easier for public contributors to navigate.

Recommended follow-up:

1. Consolidate old pass-based style imports into public style modules.
2. Rename pass-specific audit scripts into stable public audit names.
3. Keep only developer-facing docs that explain the current product and architecture.
4. Remove obsolete transition notes after they are no longer useful.

## Audit

Run:

```bash
pnpm run audit:public-repo
```

The audit blocks dangerous public-repo issues and warns about cleanup debt that can be addressed gradually.
