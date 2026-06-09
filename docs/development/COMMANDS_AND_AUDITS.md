# Commands and Audits

Spark includes development, build, formatting, and audit commands.

## Core Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Start the Vite development server |
| `pnpm check` | Run Svelte/TypeScript checks |
| `pnpm build` | Build the production bundle |
| `pnpm preview` | Preview the production build locally |
| `pnpm start` | Run the built Node server |
| `pnpm lint` | Run formatting and lint checks |
| `pnpm format` | Format the project |

## Audit Commands

| Command | Purpose |
|---|---|
| `pnpm audit:all` | Run the full audit suite |
| `pnpm audit:code-clean` | Check public code/script naming and cleanup hygiene |
| `pnpm audit:repo-hygiene` | Check public repository hygiene |
| `pnpm audit:public-copy` | Check public copy contract |
| `pnpm audit:microcopy` | Check microcopy consistency |
| `pnpm audit:journey-copy` | Check journey copy |
| `pnpm audit:learning-flow` | Check learning flow structure |
| `pnpm audit:passport-readiness` | Check Passport readiness copy/surface |
| `pnpm audit:css-syntax` | Check global CSS selector safety |
| `pnpm audit:hub-topology` | Check Hub URL topology |
| `pnpm audit:desktop-layout` | Check desktop layout guardrails |
| `pnpm audit:beta-signal` | Check beta-stage UI signals |
| `pnpm audit:public-surface` | Check removed public surfaces do not return |

## Recommended Pre-Commit Check

```bash
pnpm audit:all
pnpm check
pnpm build
```

## Why Audits Exist

Spark is a public learning product for beginners. The audit suite helps keep the repo aligned with product principles:

- public UI should not feel like a developer dashboard;
- internal pass/backup artifacts should not enter the repo;
- removed surfaces should not be accidentally restored;
- Hub topology should remain stable;
- beta status should remain visible;
- risky technical language should not leak into beginner-facing flows.

## Audit Failures

When an audit fails:

1. Read the blocker message.
2. Fix the source of the issue.
3. Run the specific audit again.
4. Run `pnpm audit:all`.
5. Run `pnpm check` and `pnpm build`.

Do not bypass audits unless the audit itself is clearly wrong. If the audit is wrong, update the audit with a narrow fix instead of weakening the rule globally.
