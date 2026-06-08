export type PassportLevel = 'beginner' | 'intermediate' | 'advanced';

export type LevelEvidenceCounts = {
  lesson_completed_count: number;
  core_checkpoint_passed_count: number;
  lab_checkpoint_passed_count: number;
  core_exam_passed_count: number;
  lab_exam_passed_count: number;
  lab_attempt_passed_count: number;
  safety_passed_count: number;
};

export type PassportLevelEligibility = {
  level: PassportLevel;
  eligible: boolean;
  proof_of_learning: boolean;
  proof_of_practice: boolean;
  proof_of_safety: boolean;
  proof_of_readiness: boolean;
  counts: LevelEvidenceCounts;
  evidence_root: string | null;
  evidence_event_count: number;
  missing: string[];
};

export type PassportEligibilityResponse = {
  user_id: string;
  eligible: boolean;
  highest_eligible_level: PassportLevel | null;
  evidence_root: string | null;
  evidence_event_count: number;
  levels: PassportLevelEligibility[];
  note: string;
};

export type PassportCredential = {
  id: string;
  user_id: string;
  readiness_level: PassportLevel;
  verification_tier: string;
  issue_status: 'issued' | 'revoked' | 'superseded' | string;
  evidence_root: string | null;
  evidence_event_count: number;
  starknet_anchor_status: string;
  schema_version: string;
  issuer: string;
  credential_hash: string | null;
  issued_at: string | null;
  revoked_at: string | null;
  created_at: string;
  updated_at: string;
  nft_ready: boolean;
  on_chain: boolean;
};

export type CurrentPassportResponse = {
  credential: PassportCredential | null;
};

export type EvidenceRootResponse = {
  user_id: string;
  event_count: number;
  evidence_root: string | null;
  schema_version: string;
  ready_for_starknet_anchor: boolean;
  note: string;
};

export type ProofEvent = {
  id: string;
  event_type: string;
  subject_type: string;
  subject_id: string;
  level: string | null;
  track: string | null;
  source_table: string | null;
  source_id: string | null;
  event_hash: string | null;
  previous_event_hash: string | null;
  evidence_root: string | null;
  issuer: string;
  schema_version: string;
  payload: Record<string, unknown>;
  created_at: string;
};

export type ListResponse<T> = {
  items: T[];
};

export class SparkApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'SparkApiError';
    this.status = status;
  }
}

function normalizeApiError(status: number, body: unknown) {
  if (body && typeof body === 'object' && 'error' in body) {
    const raw = String((body as { error?: unknown }).error ?? '');
    if (raw.includes('unauthorized')) return 'Sesi kamu sudah berakhir. Silakan masuk lagi.';
    if (raw.includes('not eligible')) return 'Passport belum memenuhi syarat untuk diterbitkan.';
    if (raw.includes('evidence root')) return 'Passport memerlukan evidence root dari aktivitas belajar dan lab.';
    if (raw.trim()) return raw;
  }

  if (status === 401) return 'Sesi kamu sudah berakhir. Silakan masuk lagi.';
  if (status === 404) return 'Endpoint Passport belum tersedia di backend.';
  if (status >= 500) return 'Spark API sedang bermasalah. Coba lagi sebentar.';
  return 'Permintaan Passport belum berhasil diproses.';
}

async function readJson(response: Response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function sparkApiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');

  const response = await fetch(path, {
    ...init,
    headers,
    credentials: 'include'
  });

  const body = await readJson(response);

  if (!response.ok) {
    throw new SparkApiError(response.status, normalizeApiError(response.status, body));
  }

  return body as T;
}

export function getPassportEligibility() {
  return sparkApiFetch<PassportEligibilityResponse>('/v1/passport/me/eligibility');
}

export function getCurrentPassport() {
  return sparkApiFetch<CurrentPassportResponse>('/v1/passport/me');
}

export function getEvidenceRoot() {
  return sparkApiFetch<EvidenceRootResponse>('/v1/proof/me/evidence-root');
}

export function getProofEvents(limit = 8) {
  return sparkApiFetch<ListResponse<ProofEvent>>(`/v1/proof/me/events?limit=${limit}`);
}

export function issuePassport(readinessLevel?: PassportLevel | null) {
  return sparkApiFetch<PassportCredential>('/v1/passport/me/issue', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ readiness_level: readinessLevel ?? undefined })
  });
}
