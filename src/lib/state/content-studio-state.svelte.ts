import {
  cloneDefaultManagedContent,
  normalizeManagedContent,
  type ManagedCommunityEvent,
  type ManagedHubResource,
  type ManagedLegalPage,
  type ManagedPageCopy,
  type ManagedStudioMessage,
  type SparkManagedContent
} from '$lib/content-managed/spark-managed-content';

const STORAGE_KEY = 'karyra-spark-managed-content-v1';

export type StudioCollection = 'copy' | 'messages' | 'hub' | 'community' | 'legal' | 'json';

type ContentStudioState = {
  content: SparkManagedContent;
  activeCollection: StudioCollection;
  dirty: boolean;
  lastSavedAt: string;
  restored: boolean;
};

export const contentStudioState = $state<ContentStudioState>({
  content: cloneDefaultManagedContent(),
  activeCollection: 'copy',
  dirty: false,
  lastSavedAt: '',
  restored: false
});

function updateRows<T extends { id: string }>(rows: T[], id: string, patch: Partial<T>) {
  return rows.map((item) => (item.id === id ? { ...item, ...patch } : item));
}

function markDirty() {
  contentStudioState.dirty = true;
}

export function setStudioCollection(collection: StudioCollection) {
  contentStudioState.activeCollection = collection;
}

export function restoreManagedContent() {
  if (typeof window === 'undefined') return;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      contentStudioState.content = normalizeManagedContent(JSON.parse(raw) as Partial<SparkManagedContent>);
    }
  } catch {
    contentStudioState.content = cloneDefaultManagedContent();
  }

  contentStudioState.restored = true;
}

export function saveManagedContent() {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contentStudioState.content));
  contentStudioState.lastSavedAt = new Date().toISOString();
  contentStudioState.dirty = false;
}

export function resetManagedContent() {
  contentStudioState.content = cloneDefaultManagedContent();
  markDirty();
}

export function replaceManagedContent(content: Partial<SparkManagedContent>) {
  contentStudioState.content = normalizeManagedContent(content);
  markDirty();
}

export function exportManagedContentJson() {
  return JSON.stringify(contentStudioState.content, null, 2);
}

export function updatePageCopy(id: string, patch: Partial<ManagedPageCopy>) {
  contentStudioState.content = {
    ...contentStudioState.content,
    appCopy: updateRows(contentStudioState.content.appCopy, id, patch)
  };
  markDirty();
}

export function updateStudioMessage(id: string, patch: Partial<ManagedStudioMessage>) {
  contentStudioState.content = {
    ...contentStudioState.content,
    messages: updateRows(contentStudioState.content.messages, id, patch)
  };
  markDirty();
}

export function updateHubResource(id: string, patch: Partial<ManagedHubResource>) {
  contentStudioState.content = {
    ...contentStudioState.content,
    hubResources: updateRows(contentStudioState.content.hubResources, id, patch)
  };
  markDirty();
}

export function updateCommunityEvent(id: string, patch: Partial<ManagedCommunityEvent>) {
  contentStudioState.content = {
    ...contentStudioState.content,
    communityEvents: updateRows(contentStudioState.content.communityEvents, id, patch)
  };
  markDirty();
}

export function updateLegalPage(id: string, patch: Partial<ManagedLegalPage>) {
  contentStudioState.content = {
    ...contentStudioState.content,
    legalPages: updateRows(contentStudioState.content.legalPages, id, patch)
  };
  markDirty();
}

export function getManagedCopy(id: string) {
  return contentStudioState.content.appCopy.find((item) => item.id === id);
}
