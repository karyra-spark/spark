export type SparkApiErrorKind = 'unauthorized' | 'conflict' | 'validation' | 'network' | 'server' | 'unknown';

export class SparkProgressApiError extends Error {
  kind: SparkApiErrorKind;
  status: number;

  constructor(message: string, kind: SparkApiErrorKind = 'unknown', status = 0) {
    super(message);
    this.name = 'SparkProgressApiError';
    this.kind = kind;
    this.status = status;
  }
}

export type SparkBackendLevel = 'beginner' | 'intermediate' | 'advanced';

type ListResponse<T> = { items: T[] };

export type LessonProgressItem = {
  id: string;
  lesson_id: string;
  level: SparkBackendLevel;
  status: 'not_started' | 'in_progress' | 'completed' | string;
  progress_percent: number;
  completed_at: string | null;
  updated_at: string;
};

export type LabAttemptItem = {
  id: string;
  lab_id: string;
  level: SparkBackendLevel;
  status: 'started' | 'submitted' | 'passed' | 'failed' | string;
  score: number | null;
  safety_score: number | null;
  started_at: string;
  completed_at: string | null;
  updated_at: string;
};

export type LessonProgressInput = {
  level: SparkBackendLevel;
  status?: 'not_started' | 'in_progress' | 'completed';
  progress_percent?: number;
  completed?: boolean;
  payload?: Record<string, unknown>;
};

export type CheckpointResultInput = {
  lesson_id: string;
  level: SparkBackendLevel;
  score: number;
  passed?: boolean;
  payload?: Record<string, unknown>;
};

export type LabAttemptInput = {
  lab_id: string;
  level: SparkBackendLevel;
  status?: 'started' | 'submitted' | 'passed' | 'failed';
  score?: number;
  safety_score?: number;
  payload?: Record<string, unknown>;
};

function sameOriginApi(path: string) {
  return path.startsWith('/') ? path : `/${path}`;
}

function classifyError(status: number): SparkApiErrorKind {
  if (status === 401 || status === 403) return 'unauthorized';
  if (status === 409) return 'conflict';
  if (status >= 400 && status < 500) return 'validation';
  if (status >= 500) return 'server';
  return 'unknown';
}

function friendlyError(status: number, fallback: string) {
  if (status === 401 || status === 403) return 'Sesi belajar berakhir. Masuk ulang untuk menyimpan progress.';
  if (status === 409) return 'Data progress sudah ada dan sedang diselaraskan.';
  if (status >= 500) return 'Spark API belum bisa menyimpan progress. Coba lagi sebentar.';
  return fallback;
}

async function parseApiError(response: Response, fallback: string): Promise<never> {
  let message = friendlyError(response.status, fallback);

  try {
    const body = (await response.json()) as { error?: string };
    if (body.error) message = friendlyError(response.status, body.error);
  } catch {
    // Keep fallback.
  }

  throw new SparkProgressApiError(message, classifyError(response.status), response.status);
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(sameOriginApi(path), {
      ...init,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {})
      }
    });
  } catch {
    throw new SparkProgressApiError('Belum bisa terhubung ke Spark API. Progress tetap tersimpan sementara di perangkat ini.', 'network', 0);
  }

  if (!response.ok) {
    return parseApiError(response, 'Belum bisa menyimpan progress ke Spark API.');
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export async function getMyLessonProgress() {
  return requestJson<ListResponse<LessonProgressItem>>('/v1/learning/me/progress', {
    method: 'GET'
  });
}

export async function saveLessonProgress(lessonId: string, input: LessonProgressInput) {
  return requestJson<LessonProgressItem>(`/v1/learning/lessons/${encodeURIComponent(lessonId)}/progress`, {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export async function recordCoreCheckpointResult(checkpointId: string, input: CheckpointResultInput) {
  return requestJson(`/v1/learning/checkpoints/${encodeURIComponent(checkpointId)}/results`, {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export async function getMyLabAttempts() {
  return requestJson<ListResponse<LabAttemptItem>>('/v1/lab/me/attempts', {
    method: 'GET'
  });
}

export async function recordLabAttempt(input: LabAttemptInput) {
  return requestJson<LabAttemptItem>('/v1/lab/attempts', {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export function isExpectedSessionMiss(error: unknown) {
  return error instanceof SparkProgressApiError && error.kind === 'unauthorized';
}
