# Karyra Spark Pass 36 Runtime Notes

Pass 36 is a product-polish pass. It does not add a new product feature, fake user, or backend dependency.

## Intent

- Keep Spark mobile-first and readable for non-technical local users.
- Stabilize route rhythm before adding the Social Layer MVP.
- Keep the backend-ready path open by avoiding runtime demo users and hardcoded account behavior.
- Keep safety posture clear: never ask users for seed phrase, mnemonic, private key, or recovery phrase.

## UI principles locked in this pass

1. One section = one function.
2. Notification is quick update; Inbox is full message.
3. Home hero sells value, not internal feature inventory.
4. Drawer, bottom nav, and page CTA should not duplicate the same job.
5. Icons must match context: bell for notification, message for inbox, shield for safety, book for core/lesson, flask for lab, compass for hub, check/badge for readiness.
6. Product polish belongs in the active foundation CSS, not another patch import.

## After install

Run:

```bash
pnpm check
pnpm build
node scripts/karyra-pass36-audit.mjs
```

Then review mobile routes manually:

- `/`
- `/dashboard`
- `/core` or lesson route
- `/lab`
- `/community`
- `/hub`
- `/profile`
- `/inbox`
- `/settings`
- `/help`, `/faq`, `/docs`, `/terms` if present
