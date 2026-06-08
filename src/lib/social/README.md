# Social Layer module

Pass 37 membuat diskusi komunitas local-first dan backend-ready.

## Alur saat ini

```text
SparkSocialLayer.svelte
  -> local-social-gateway.ts
  -> social-state.svelte.ts
  -> localStorage snapshot
  -> social-events.ts
```

## Upgrade nanti

- `local-social-gateway.ts` dapat diganti oleh `rest-social-gateway.ts`.
- `social-state.svelte.ts` dapat dipindah dari localStorage ke Dexie/IndexedDB.
- `social-events.ts` dapat disambung ke notification bridge, WebSocket, SSE, atau queue backend.

## Safety

Composer dan comment memakai `social-policy.ts` untuk mencegah data rahasia seperti seed phrase/private key dikirim sebagai konten.
