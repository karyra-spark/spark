# Public Security Notes

Spark is designed as a safety-first readiness gateway. The product should reduce risky behavior, not push new users into wallet or transaction flows too early.

## Current safety model

- No wallet connection is required to explore the public app.
- Readiness and Passport language should avoid implying official certification.
- Destructive actions should use explicit confirmation.
- Public UI should explain what happens before the user acts.
- Real secrets must never be committed.

## Environment files

Only `.env.example` belongs in the public repository.

Do not commit:

- `.env`
- `.env.production`
- provider secrets
- tokens
- private keys
- server credentials

## Public beta language

Spark uses a visible Beta 0.1 signal so reviewers and users understand that the product is live but still in early development.

## Starknet integration boundary

Minimal Starknet integration currently lives in Hub and remains read-only / safety-first. Wallet detection must not automatically connect, sign, or request transactions.
