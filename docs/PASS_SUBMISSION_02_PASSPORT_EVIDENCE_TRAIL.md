# PASS SUBMISSION-02 — Passport Evidence Trail

This pass strengthens the existing public Passport view by making the Proof Ledger read model more visible and understandable.

## What changed

- The Passport backend panel now presents recent proof events as a **Passport Evidence Trail**.
- Each event is mapped to a readable source/pillar such as Readiness Education, Safe Practice Lab, Readiness Passport, Community Participation, or Spark Proof Ledger.
- The UI explicitly states the safety boundary: off-chain learner record, no wallet connection, no signature request, no transaction, no private key, and no seed phrase.

## What did not change

- No reviewer-only route was added.
- No wallet connection was added.
- No signature or transaction flow was added.
- No onchain/SBT/minting claim was added.

## Demo path

1. Sign in.
2. Complete a lesson/lab activity that records proof.
3. Open `/passport`.
4. Click **Perbarui**.
5. Show the Passport Evidence Trail.

This is evidence hardening, not a new proof system.
