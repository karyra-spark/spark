import type { AdminLearner, AdminPassportRecord, AdminProofRecord } from './admin-types';

export type AdminListResponse<T> = {
  items: T[];
  total: number;
  nextCursor: string | null;
};

export type AdminApiContract = {
  learners: AdminListResponse<AdminLearner>;
  passports: AdminListResponse<AdminPassportRecord>;
  proofs: AdminListResponse<AdminProofRecord>;
};

export const adminApiContractPaths = {
  learners: '/v1/admin/learners',
  learnerDetail: (learnerId: string) => '/v1/admin/learners/' + encodeURIComponent(learnerId),
  passports: '/v1/admin/passports',
  proofs: '/v1/admin/proofs',
  proofVerification: (proofId: string) => '/v1/admin/proofs/' + encodeURIComponent(proofId) + '/verification',
  pilots: '/v1/admin/pilots',
  activity: '/v1/admin/activity'
} as const;

// Contract-only in this frontend repository. Production endpoints must enforce
// server-side RBAC and audit every read/write; a hidden UI is not authorization.
