import { LEVEL_ORDER } from '$lib/leveling/leveling-model';
import type { LevelResult, SparkLevel } from '$lib/leveling/leveling-types';
import type {
  PassportBadgeStatus,
  PassportChainStatus,
  PassportEvidenceBundle,
  PassportEvidenceExam,
  PassportIssueStatus,
  PassportProofPreview,
  PassportVerificationTier
} from './passport-types';

const LEVEL_LABELS: Record<SparkLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
};

const LEVEL_TITLES: Record<SparkLevel, string> = {
  beginner: 'Fondasi aman',
  intermediate: 'Siap praktik',
  advanced: 'Siap eksplorasi Starknet'
};

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((item) => stableStringify(item)).join(',')}]`;

  const record = value as Record<string, unknown>;
  return `{${Object.keys(record)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`)
    .join(',')}}`;
}

function previewHash(input: unknown) {
  const text = stableStringify(input);
  let hash = 0x811c9dc5;

  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `spk_${(hash >>> 0).toString(16).padStart(8, '0')}`;
}

function sanitizeExamResult(result: LevelResult): PassportEvidenceExam {
  return {
    examId: result.examId,
    track: result.track,
    level: result.level,
    scoreBand: result.passed ? 'passed' : result.attempts > 0 ? 'retry' : 'not_started',
    passed: result.passed,
    attempts: result.attempts,
    completedAt: result.completedAt
  };
}

export function getPassportLevelLabel(level: SparkLevel | null) {
  return level ? LEVEL_LABELS[level] : 'Belum terbit';
}

export function getPassportLevelTitle(level: SparkLevel | null) {
  return level ? LEVEL_TITLES[level] : 'Lengkapi Core dan Lab';
}

export function getVerificationTier(registeredWorkshops: number): PassportVerificationTier {
  return registeredWorkshops > 0 ? 'community_verified' : 'self_attested';
}

export function getVerificationLabel(tier: PassportVerificationTier) {
  if (tier === 'community_verified') return 'Diverifikasi komunitas';
  if (tier === 'identity_verified_placeholder') return 'Identitas terverifikasi';
  return 'Belajar mandiri';
}

export function getIssueStatus(readinessLevel: SparkLevel | null): PassportIssueStatus {
  return readinessLevel ? 'eligible' : 'draft';
}

export function getChainStatus(readinessLevel: SparkLevel | null): PassportChainStatus {
  return readinessLevel ? 'ready_to_issue' : 'not_ready';
}

export function getBadgeStatus(readinessLevel: SparkLevel | null): PassportBadgeStatus {
  return readinessLevel ? 'nft_roadmap' : 'locked';
}

export function getNextPassportStep(input: {
  coreBeginnerPassed: boolean;
  labBeginnerPassed: boolean;
  readinessLevel: SparkLevel | null;
}) {
  if (!input.coreBeginnerPassed) {
    return {
      title: 'Selesaikan Core Beginner',
      copy: 'Kamu perlu lulus ujian Core Beginner agar Passport punya dasar pemahaman yang jelas.',
      href: '/core',
      cta: 'Selesaikan Core Beginner'
    };
  }

  if (!input.labBeginnerPassed) {
    return {
      title: 'Mulai Lab Beginner',
      copy: 'Latihan aman membantu Passport membaca kemampuan praktik, bukan hanya pemahaman dari bacaan.',
      href: '/lab',
      cta: 'Mulai Lab Beginner'
    };
  }

  if (input.readinessLevel === 'advanced') {
    return {
      title: 'Siap jelajahi Hub lanjutan',
      copy: 'Fondasi dan latihanmu sudah cukup untuk membuka eksplorasi Starknet yang lebih serius.',
      href: '/hub',
      cta: 'Jelajahi Hub Lanjutan'
    };
  }

  return {
    title: 'Passport siap disiapkan',
    copy: 'Bukti Core dan Lab sudah cukup untuk membangun Passport awal. Lihat rincian agar kamu tahu apa yang tercatat.',
    href: '/passport#passport-proof',
    cta: 'Lihat Rincian Bukti'
  };
}

export function getPassportEligibility(input: {
  readinessLevel: SparkLevel | null;
  verificationTier: PassportVerificationTier;
}) {
  return {
    eligible: Boolean(input.readinessLevel),
    levelLabel: getPassportLevelLabel(input.readinessLevel),
    issueStatus: getIssueStatus(input.readinessLevel),
    chainStatus: getChainStatus(input.readinessLevel),
    badgeStatus: getBadgeStatus(input.readinessLevel),
    verificationLabel: getVerificationLabel(input.verificationTier)
  };
}

export function createPassportEvidenceBundle(input: {
  holderRef: string;
  holderDisplay: string;
  handle: string;
  readinessLevel: SparkLevel | null;
  verificationTier: PassportVerificationTier;
  issueStatus: PassportIssueStatus;
  coreExamResults: LevelResult[];
  labExamResults: LevelResult[];
  completedLessons: number;
  totalLessons: number;
  registeredWorkshops: number;
  savedResources: number;
}): PassportEvidenceBundle {
  return {
    schema: 'karyra.spark.passport.evidence.v1',
    issuer: 'Karyra Spark',
    holderRef: input.holderRef,
    holderDisplay: input.holderDisplay,
    handle: input.handle,
    readinessLevel: input.readinessLevel,
    verificationTier: input.verificationTier,
    issueStatus: input.issueStatus,
    evidence: {
      core: input.coreExamResults.map(sanitizeExamResult),
      lab: input.labExamResults.map(sanitizeExamResult),
      learning: {
        completedLessons: input.completedLessons,
        totalLessons: input.totalLessons
      },
      community: {
        registeredWorkshops: input.registeredWorkshops,
        verifier: input.registeredWorkshops > 0 ? 'community' : 'none'
      },
      hub: {
        savedResources: input.savedResources
      }
    },
    policy: {
      rawAnswersIncluded: false,
      personalIdentityIncluded: false,
      kycRequired: false,
      starknetMainnetTarget: true,
      nftBadgeTarget: true
    },
    createdAt: 'local-preview'
  };
}

export function createPassportProofPreview(bundle: PassportEvidenceBundle): PassportProofPreview {
  const evidenceCount = bundle.evidence.core.length + bundle.evidence.lab.length + bundle.evidence.community.registeredWorkshops;
  const root = previewHash(bundle);
  const readableLevel = bundle.readinessLevel ? LEVEL_ORDER.indexOf(bundle.readinessLevel) + 1 : 0;

  return {
    passportId: `SPK-${readableLevel}-${root.replace('spk_', '').toUpperCase()}`,
    evidenceRoot: root,
    evidenceCount,
    schemaVersion: 'v1',
    chainStatus: getChainStatus(bundle.readinessLevel),
    badgeStatus: getBadgeStatus(bundle.readinessLevel),
    targetChain: 'Starknet Mainnet'
  };
}
