import { sparkStorageRegistry } from './sync-storage-registry';
import type { SparkStorageEntry } from './sync-types';

export const backendAuthorityMatrix = [
  { area: 'Learning', owner: 'learning', backend: 'lesson_progress, checkpoint_answers, notes, bookmarks', local: 'cache, draft, optimistic update' },
  { area: 'Lab', owner: 'lab', backend: 'lab_runs, lab_completion', local: 'recent simulation cache' },
  { area: 'Community', owner: 'community', backend: 'workshop_registration, cohort_membership, saved_resources', local: 'cache and offline queue' },
  { area: 'Diskusi', owner: 'social', backend: 'posts, comments, reactions, follows, reports', local: 'draft, optimistic feed, offline queue' },
  { area: 'Notification', owner: 'message', backend: 'read_state, delivery log', local: 'UI cache' },
  { area: 'Session', owner: 'auth', backend: 'httpOnly secure session cookie', local: 'no progress authority' },
  { area: 'Theme', owner: 'theme', backend: 'optional profile setting', local: 'safe preference' }
] as const;

export function classifyStorageKey(key: string): SparkStorageEntry | undefined {
  return sparkStorageRegistry.find((entry) => entry.key === key);
}

export function explainStorageAuthority(entry: SparkStorageEntry) {
  if (entry.authority === 'server-source') return 'Nanti server menjadi sumber utama; localStorage hanya cache/draft.';
  if (entry.authority === 'local-cache') return 'Data ini cache lokal dan boleh dihapus kapan saja.';
  if (entry.authority === 'local-preference') return 'Preferensi perangkat; boleh tetap lokal.';
  if (entry.authority === 'sensitive-never-store') return 'Data sensitif tidak boleh disimpan di browser.';
  return 'Sumber lokal sementara sampai modul backend/admin tersedia.';
}
