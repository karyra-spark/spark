import { SYNC_QUEUE_STORAGE_KEY } from './sync-storage-registry';
import type { SyncEvent, SyncEventInput, SyncSnapshot } from './sync-types';

const MAX_QUEUE_EVENTS = 160;

export const syncQueueState = $state({
  ready: false,
  events: [] as SyncEvent[],
  lastSavedAt: '',
  backendMode: 'local-only' as 'local-only' | 'backend-ready' | 'backend-connected'
});

function createSyncId(name: string) {
  const cryptoId = globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return `sync-${name.replace(/[^a-z0-9]+/gi, '-')}-${cryptoId}`.toLowerCase();
}

function now() {
  return new Date().toISOString();
}

export function restoreSyncQueue() {
  if (typeof window === 'undefined' || syncQueueState.ready) return;

  try {
    const raw = window.localStorage.getItem(SYNC_QUEUE_STORAGE_KEY);
    if (raw) {
      const snapshot = JSON.parse(raw) as Partial<SyncSnapshot>;
      if (Array.isArray(snapshot.events)) syncQueueState.events = snapshot.events.slice(0, MAX_QUEUE_EVENTS) as SyncEvent[];
      if (snapshot.lastSavedAt) syncQueueState.lastSavedAt = snapshot.lastSavedAt;
    }
  } catch {
    syncQueueState.events = [];
  }

  syncQueueState.ready = true;
}

export function saveSyncQueue() {
  if (typeof window === 'undefined') return;
  syncQueueState.lastSavedAt = now();
  window.localStorage.setItem(
    SYNC_QUEUE_STORAGE_KEY,
    JSON.stringify({ version: 1, events: syncQueueState.events.slice(0, MAX_QUEUE_EVENTS), lastSavedAt: syncQueueState.lastSavedAt })
  );
}

export function enqueueSyncEvent(input: SyncEventInput) {
  restoreSyncQueue();
  const timestamp = now();
  const event: SyncEvent = {
    id: createSyncId(input.name),
    name: input.name,
    entity: input.entity,
    action: input.action,
    subjectId: input.subjectId,
    payload: input.payload,
    source: input.source ?? 'local',
    status: 'queued',
    attempts: 0,
    createdAt: timestamp,
    updatedAt: timestamp,
    schemaVersion: 1
  };

  syncQueueState.events = [event, ...syncQueueState.events].slice(0, MAX_QUEUE_EVENTS);
  saveSyncQueue();
  return event;
}

export function markSyncEventStatus(id: string, status: SyncEvent['status'], lastError = '') {
  restoreSyncQueue();
  syncQueueState.events = syncQueueState.events.map((event) =>
    event.id === id ? { ...event, status, lastError: lastError || undefined, attempts: event.attempts + 1, updatedAt: now() } : event
  );
  saveSyncQueue();
}

export function clearSyncQueue() {
  syncQueueState.events = [];
  syncQueueState.lastSavedAt = '';
  syncQueueState.ready = true;
  if (typeof window !== 'undefined') window.localStorage.removeItem(SYNC_QUEUE_STORAGE_KEY);
}

export function getQueuedSyncEvents() {
  restoreSyncQueue();
  return syncQueueState.events.filter((event) => event.status === 'queued');
}

export function getSyncSummary() {
  restoreSyncQueue();
  return {
    total: syncQueueState.events.length,
    queued: syncQueueState.events.filter((event) => event.status === 'queued').length,
    failed: syncQueueState.events.filter((event) => event.status === 'failed').length,
    synced: syncQueueState.events.filter((event) => event.status === 'synced').length,
    ignored: syncQueueState.events.filter((event) => event.status === 'ignored').length
  };
}
