# Karyra Admin Dashboard v1

## Purpose

The Admin Dashboard is a private SvelteKit surface for operational visibility across Karyra Spark learning, Safe Practice Lab, Readiness Passport, Proof Ledger foundations, community pilots, and Starknet Hub readiness.

It is intentionally separated from the public learner shell. It does not provide wallet connection, signature, transaction, private-key, seed-phrase, or onchain write behavior.

## Routes

| Route | Purpose |
| --- | --- |
| `/admin` | Overview metrics, recent activity state, API health, and read-only Starknet status |
| `/admin/login` | Environment-gated admin login |
| `/admin/learners` | Learner search/filter contract and protected empty state |
| `/admin/learners/[id]` | Protected learner detail contract |
| `/admin/lessons` | Source-backed Core lesson inventory and public previews |
| `/admin/lab` | Safe Practice Lab module inventory and activity placeholder |
| `/admin/passport` | Passport derivation, records, and Evidence Trail contract |
| `/admin/proofs` | Proof Ledger and facilitator-verification contract |
| `/admin/pilots` | Community pilot session templates and evidence guidance |
| `/admin/starknet` | Hub route, read-only RPC status, reader status, and roadmap |
| `/admin/content` | Documentation availability map |
| `/admin/settings` | Safe environment summary, feature flags, and safety checklist |

## Security model

Admin access is fail-closed. The dashboard is disabled unless all of these private runtime variables are valid:

- `KARYRA_ADMIN_ENABLED=true`
- `KARYRA_ADMIN_PASSWORD` with at least 12 characters
- `KARYRA_ADMIN_SESSION_SECRET` with at least 32 characters

Optional variables:

- `KARYRA_ADMIN_SESSION_HOURS` between 1 and 24, defaulting to 8
- `KARYRA_STARKNET_RPC_URL` for a server-only, read-only `starknet_chainId` health request

The login action creates an HttpOnly, SameSite=Strict, signed session cookie scoped to `/admin`. Admin responses use `Cache-Control: private, no-store`, `X-Frame-Options: DENY`, and a same-origin referrer policy. Login attempts have a small in-memory rate limit.

Do not place admin credentials, session secrets, private RPC URLs, database URLs, or tokens in `PUBLIC_*` variables.

### Production TODO

The environment credential is a minimal v1 gate, not complete production RBAC. Before enabling admin writes or broader deployment, replace it with:

- identity-provider authentication and explicit admin/facilitator roles;
- revocable server-side sessions;
- per-action authorization;
- durable rate limiting;
- audit logs for sensitive reads and every write;
- field-level privacy and retention policies;
- CSRF review for future state-changing actions.

## Data behavior

Real source data is used for lesson definitions, Lab module definitions, workshop/session templates, Hub configuration, deployment mode, and safe public API configuration.

Learner collections, aggregate completion counts, Passport collections, Proof Ledger records, facilitator verification, pilot notes, and recent activity remain unavailable because this repository is frontend-only and has no protected admin endpoints. The UI uses typed empty states rather than fake production metrics.

Proposed contracts are documented in `src/lib/admin/admin-api.ts`. Backend implementations must enforce server-side authorization; hiding a frontend route is not sufficient.

## Starknet boundary

The only implemented network request is an optional server-side read-only `starknet_chainId` request. The RPC URL never reaches the browser.

Account readers, Passport anchors, badges, payments, merchant utility, wallet connection, signatures, transactions, and onchain writes are unavailable or explicitly marked as roadmap.

## Current limitations

- No protected aggregate admin endpoints are available.
- Lesson and Lab metadata remain source-controlled and read-only.
- Documentation files are checked for repository presence but are not individually rendered as public routes.
- Rate limiting is process-local and resets when the server restarts.
- The single environment credential does not provide individual administrator identity.
- No audit log is implemented yet.

## Future improvements

1. Add Spark API admin endpoints for paginated learners, progress, Passport, proof, activity, and pilot records.
2. Add production RBAC and durable audit logging.
3. Add privacy-reviewed facilitator verification workflows.
4. Add source-controlled metadata editing only after a reviewed content-write contract exists.
5. Add read-only Starknet address/account readers with strict input validation and rate limits.
6. Add operational monitoring without exposing private infrastructure details.

## Safety invariants

- No wallet auto-connect.
- No signature prompt.
- No transaction prompt.
- No seed phrase or private key handling.
- No public `/studio` route.
- No onchain Passport or badge claim.
