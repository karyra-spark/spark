export type AdminAvailability = 'available' | 'unavailable' | 'placeholder' | 'error';
export type AdminProofSource = 'system' | 'lesson' | 'lab' | 'workshop' | 'cohort' | 'facilitator';

export type AdminMetric = {
  id: string;
  label: string;
  value: number | string;
  detail: string;
  state: AdminAvailability;
};

export type AdminServiceStatus = {
  state: AdminAvailability;
  label: string;
  detail: string;
};

export type AdminLearner = {
  id: string;
  name: string | null;
  email: string | null;
  status: 'active' | 'inactive' | 'unknown';
  lessonCompletionCount: number;
  labCompletionCount: number;
  passportStatus: string | null;
  evidenceCount: number;
};

export type AdminLesson = {
  id: string;
  moduleId: string;
  moduleTitle: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  estimatedMinutes: number;
  updatedAt: string | null;
  previewHref: string;
};

export type AdminLabModule = {
  id: string;
  title: string;
  difficulty: 'safe' | 'guided' | 'technical';
  estimatedMinutes: number;
  checkpointCount: number;
  enabled: boolean | null;
  guardrail: string;
};

export type AdminPassportRecord = {
  id: string;
  learnerId: string;
  readinessLevel: string | null;
  issueStatus: string;
  evidenceCount: number;
  updatedAt: string | null;
};

export type AdminProofRecord = {
  id: string;
  learnerId: string;
  source: AdminProofSource;
  subject: string;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  verifiedAt: string | null;
};

export type AdminPilotSession = {
  id: string;
  title: string;
  format: 'offline' | 'online' | 'hybrid';
  schedule: string;
  capacity: number | null;
  participantCount: number | null;
  status: 'planned' | 'active' | 'complete';
};

export type AdminRoadmapModule = {
  id: string;
  title: string;
  status: 'available' | 'planned' | 'future';
  detail: string;
};

export type AdminDocLink = {
  id: string;
  label: string;
  repositoryPath: string | null;
  publicHref: string | null;
  exists: boolean;
};
