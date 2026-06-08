export type SyncEntity =
  | 'learning'
  | 'lab'
  | 'community'
  | 'hub'
  | 'social'
  | 'message'
  | 'profile'
  | 'settings'
  | 'system';

export type SyncStatus = 'queued' | 'synced' | 'failed' | 'ignored';
export type SyncSource = 'local' | 'backend' | 'migration';

export type SyncEventName =
  | 'learning.lesson.completed'
  | 'learning.mode.changed'
  | 'learning.note.changed'
  | 'learning.bookmark.toggled'
  | 'learning.level.exam.submitted'
  | 'lab.simulation.completed'
  | 'lab.level.exam.submitted'
  | 'community.workshop.saved'
  | 'community.cohort.joined'
  | 'hub.resource.saved'
  | 'social.post.created'
  | 'social.comment.created'
  | 'social.reaction.toggled'
  | 'social.follow.toggled'
  | 'social.post.hidden'
  | 'social.post.reported'
  | 'social.post.shared'
  | 'message.notification.read'
  | 'message.message.read'
  | 'profile.passport.updated'
  | 'settings.preference.changed'
  | 'system.local.reset';

export type SyncEvent = {
  id: string;
  name: SyncEventName;
  entity: SyncEntity;
  action: string;
  subjectId?: string;
  payload?: Record<string, unknown>;
  source: SyncSource;
  status: SyncStatus;
  attempts: number;
  createdAt: string;
  updatedAt: string;
  lastError?: string;
  schemaVersion: 1;
};

export type SyncEventInput = {
  name: SyncEventName;
  entity: SyncEntity;
  action: string;
  subjectId?: string;
  payload?: Record<string, unknown>;
  source?: SyncSource;
};

export type LocalResetMode = 'progress-only' | 'all-local';

export type StorageAuthority = 'local-source' | 'local-cache' | 'server-source' | 'local-preference' | 'sensitive-never-store';

export type SparkStorageEntry = {
  key: string;
  owner: SyncEntity | 'auth' | 'theme' | 'content' | 'cookie';
  label: string;
  description: string;
  authority: StorageAuthority;
  resetOnProgressReset: boolean;
  resetOnAllLocalReset: boolean;
  futureBackendRole: string;
};

export type SyncSnapshot = {
  version: 1;
  events: SyncEvent[];
  lastSavedAt: string;
};
