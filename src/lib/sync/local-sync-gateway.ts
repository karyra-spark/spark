import { getQueuedSyncEvents, markSyncEventStatus } from './sync-event-queue.svelte';

export type LocalSyncDryRunResult = {
  queued: number;
  message: string;
};

export function inspectLocalSyncQueue(): LocalSyncDryRunResult {
  const queued = getQueuedSyncEvents().length;
  return {
    queued,
    message:
      queued === 0
        ? 'Tidak ada event lokal yang menunggu sync.'
        : `${queued} event lokal siap dikirim saat backend aktif.`
  };
}

export function markAllQueuedEventsIgnoredForLocalMode() {
  const queued = getQueuedSyncEvents();
  for (const event of queued) {
    markSyncEventStatus(event.id, 'ignored', 'Local-only mode: event belum dikirim ke backend.');
  }
  return queued.length;
}
