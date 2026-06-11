import { sparkLabs, sparkModules, sparkWorkshops } from '$lib/content/spark-content';
import type {
  AdminLabModule,
  AdminLearner,
  AdminLesson,
  AdminMetric,
  AdminPassportRecord,
  AdminPilotSession,
  AdminProofRecord,
  AdminRoadmapModule
} from './admin-types';

export const adminLessons: AdminLesson[] = sparkModules.flatMap((module) =>
  module.lessons.map((lesson) => ({
    id: lesson.id,
    moduleId: module.id,
    moduleTitle: module.title,
    title: lesson.title,
    slug: lesson.slug,
    status: 'published',
    estimatedMinutes: lesson.estimatedMinutes,
    updatedAt: null,
    previewHref: '/lesson/' + lesson.slug
  }))
);

export const adminLabModules: AdminLabModule[] = sparkLabs.map((lab) => ({
  id: lab.id,
  title: lab.title,
  difficulty: lab.difficulty,
  estimatedMinutes: lab.estimatedMinutes,
  checkpointCount: lab.steps.length,
  enabled: null,
  guardrail: lab.requiresBridge
    ? 'Technical bridge warning required.'
    : lab.difficulty === 'safe'
      ? 'Simulation only; no live wallet or assets.'
      : 'Guided readiness checks only.'
}));

// Admin collection endpoints do not exist in this frontend repository yet.
// Keep these empty rather than presenting fabricated production records.
export const adminLearners: AdminLearner[] = [];
export const adminPassportRecords: AdminPassportRecord[] = [];
export const adminProofRecords: AdminProofRecord[] = [];

export const adminPilotSessions: AdminPilotSession[] = sparkWorkshops.map((workshop) => ({
  id: workshop.id,
  title: workshop.title,
  format: workshop.format,
  schedule: workshop.date,
  capacity: workshop.capacity,
  participantCount: null,
  status: 'planned'
}));

export const adminRoadmapModules: AdminRoadmapModule[] = [
  { id: 'network', title: 'Starknet Network Module', status: 'planned', detail: 'Read-only network orientation and status.' },
  { id: 'cairo', title: 'Cairo Intro Module', status: 'available', detail: 'Introductory lesson content is published.' },
  { id: 'scarb', title: 'Scarb Module', status: 'future', detail: 'Builder tooling track; no runtime integration.' },
  { id: 'foundry', title: 'Starknet Foundry Module', status: 'future', detail: 'Builder testing track; no runtime integration.' },
  { id: 'wallet-safety', title: 'Wallet Safety Module', status: 'available', detail: 'Safety education and simulation content is published.' },
  { id: 'passport-proof', title: 'Passport Proof / Badge Roadmap', status: 'planned', detail: 'Offchain evidence first; no onchain badge claim.' },
  { id: 'utility', title: 'Payment / Service / Merchant Utility Roadmap', status: 'future', detail: 'Roadmap only; no payment or transaction flow.' }
];

export const adminSafetyChecklist = [
  'No wallet auto-connect',
  'No signature prompt',
  'No transaction prompt',
  'No seed phrase or private key handling',
  'No public editor route'
] as const;

export const overviewMetrics: AdminMetric[] = [
  { id: 'learners', label: 'Learners / users', value: 'Unavailable', detail: 'Requires an authenticated admin collection endpoint.', state: 'unavailable' },
  { id: 'lessons', label: 'Lessons available', value: adminLessons.length, detail: 'Published lesson definitions in this build.', state: 'available' },
  { id: 'lesson-completions', label: 'Lesson completions', value: 'Unavailable', detail: 'Per-user progress exists; aggregate admin data does not.', state: 'unavailable' },
  { id: 'lab-activity', label: 'Lab activity', value: 'Unavailable', detail: 'Aggregate lab endpoint is not implemented.', state: 'unavailable' },
  { id: 'passports', label: 'Passport records', value: 'Unavailable', detail: 'Admin passport listing endpoint is not implemented.', state: 'unavailable' },
  { id: 'proofs', label: 'Proof / evidence records', value: 'Unavailable', detail: 'Admin proof ledger listing endpoint is not implemented.', state: 'unavailable' },
  { id: 'hub', label: 'Hub activity', value: 'Unavailable', detail: 'Saved-resource aggregates are not exposed to admins.', state: 'placeholder' },
  { id: 'pilot', label: 'Pilot activity', value: 'Unavailable', detail: 'Pilot tracking remains a future admin contract.', state: 'placeholder' }
];
