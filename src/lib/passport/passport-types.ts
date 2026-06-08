import type { SparkLevel } from '$lib/leveling/leveling-types';

export type PassportVerificationTier = 'self_attested' | 'community_verified' | 'identity_verified_placeholder';
export type PassportIssueStatus = 'draft' | 'eligible' | 'issued_offchain' | 'anchored_starknet' | 'revoked' | 'expired';
export type PassportChainStatus = 'not_ready' | 'ready_to_issue' | 'sepolia_planned' | 'mainnet_planned' | 'anchored';
export type PassportBadgeStatus = 'locked' | 'nft_ready' | 'nft_roadmap';

export type PassportEvidenceExam = {
  examId: string;
  track: 'core' | 'lab';
  level: SparkLevel;
  scoreBand: 'not_started' | 'retry' | 'passed';
  passed: boolean;
  attempts: number;
  completedAt?: string;
};

export type PassportEvidenceBundle = {
  schema: 'karyra.spark.passport.evidence.v1';
  issuer: 'Karyra Spark';
  holderRef: string;
  holderDisplay: string;
  handle: string;
  readinessLevel: SparkLevel | null;
  verificationTier: PassportVerificationTier;
  issueStatus: PassportIssueStatus;
  evidence: {
    core: PassportEvidenceExam[];
    lab: PassportEvidenceExam[];
    learning: {
      completedLessons: number;
      totalLessons: number;
    };
    community: {
      registeredWorkshops: number;
      verifier: 'none' | 'community';
    };
    hub: {
      savedResources: number;
    };
  };
  policy: {
    rawAnswersIncluded: false;
    personalIdentityIncluded: false;
    kycRequired: false;
    starknetMainnetTarget: true;
    nftBadgeTarget: true;
  };
  createdAt: string;
};

export type PassportProofPreview = {
  passportId: string;
  evidenceRoot: string;
  evidenceCount: number;
  schemaVersion: 'v1';
  chainStatus: PassportChainStatus;
  badgeStatus: PassportBadgeStatus;
  targetChain: 'Starknet Mainnet';
};
