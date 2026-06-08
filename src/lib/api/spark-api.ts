import { getApiUrl } from '$lib/config/spark-topology';

type ApiResult<T> =
  | { ok: true; data: T; source: 'api' | 'fallback' }
  | { ok: false; error: string; source: 'api' | 'fallback' };

export type SparkSystemHealth = {
  service: string;
  mode: string;
  database: 'connected' | 'fallback' | 'unknown';
  version: string;
  timestamp: string;
};

export type SparkProgressPayload = {
  learnerId: string;
  completedLessons: string[];
  completedLabs: string[];
  readinessScore: number;
};

async function requestJson<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const response = await fetch(getApiUrl(path), {
      ...init,
      headers: {
        'content-type': 'application/json',
        ...(init?.headers ?? {})
      }
    });

    if (!response.ok) {
      return { ok: false, error: `API ${response.status}: ${response.statusText}`, source: 'api' };
    }

    return { ok: true, data: (await response.json()) as T, source: 'api' };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown API error',
      source: 'fallback'
    };
  }
}

export async function fetchSystemHealth(): Promise<ApiResult<SparkSystemHealth>> {
  const result = await requestJson<SparkSystemHealth>('/system/health');
  if (result.ok) return result;

  return {
    ok: true,
    source: 'fallback',
    data: {
      service: 'karyra-spark-api',
      mode: 'frontend-fallback',
      database: 'fallback',
      version: 'local-preview',
      timestamp: new Date().toISOString()
    }
  };
}

export async function syncProgress(payload: SparkProgressPayload): Promise<ApiResult<{ synced: boolean }>> {
  const result = await requestJson<{ synced: boolean }>('/progress/sync', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if (result.ok) return result;

  return {
    ok: true,
    source: 'fallback',
    data: { synced: false }
  };
}
