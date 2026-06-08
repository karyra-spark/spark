export type BackendWorkshopRegistration = {
  id: string;
  workshop_id: string;
  status: 'registered' | 'canceled';
  registered_at: string;
  canceled_at: string | null;
  payload: Record<string, unknown>;
  updated_at: string;
};

export type BackendHubResourceSave = {
  id: string;
  resource_id: string;
  status: 'saved' | 'unsaved';
  saved_at: string;
  unsaved_at: string | null;
  payload: Record<string, unknown>;
  updated_at: string;
};

type ListResponse<T> = { items: T[] };

const API_BASE = (import.meta.env.PUBLIC_API_BASE || import.meta.env.PUBLIC_SPARK_API_BASE || '').replace(/\/$/, '');

function apiUrl(path: string) {
  return `${API_BASE}${path}`;
}

async function readJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) return {} as T;
  return JSON.parse(text) as T;
}

function messageFromErrorBody(body: unknown, fallback: string) {
  if (body && typeof body === 'object' && 'error' in body && typeof body.error === 'string') {
    if (body.error.includes('unauthorized')) return 'Masuk dulu untuk menyimpan sinyal perjalanan kamu.';
    return body.error;
  }
  return fallback;
}

async function apiGet<T>(path: string, fallback: string): Promise<T | null> {
  const response = await fetch(apiUrl(path), {
    credentials: 'include',
    headers: { Accept: 'application/json' }
  });

  if (response.status === 401) return null;
  if (!response.ok) {
    const body = await readJson<unknown>(response).catch(() => null);
    throw new Error(messageFromErrorBody(body, fallback));
  }

  return readJson<T>(response);
}

async function apiPost<T>(path: string, payload: Record<string, unknown>, fallback: string): Promise<T | null> {
  const response = await fetch(apiUrl(path), {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (response.status === 401) return null;
  if (!response.ok) {
    const body = await readJson<unknown>(response).catch(() => null);
    throw new Error(messageFromErrorBody(body, fallback));
  }

  return readJson<T>(response);
}

export async function getBackendWorkshopRegistrations() {
  return apiGet<ListResponse<BackendWorkshopRegistration>>(
    '/v1/community/me/workshops',
    'Workshop tersimpan belum bisa dibaca dari Spark API.'
  );
}

export async function registerBackendWorkshop(workshopId: string) {
  return apiPost<BackendWorkshopRegistration>(
    `/v1/community/workshops/${encodeURIComponent(workshopId)}/register`,
    { payload: { source: 'spark.frontend.community' } },
    'Workshop belum bisa disimpan ke Spark API.'
  );
}

export async function cancelBackendWorkshop(workshopId: string) {
  return apiPost<BackendWorkshopRegistration>(
    `/v1/community/workshops/${encodeURIComponent(workshopId)}/cancel`,
    { payload: { source: 'spark.frontend.community' } },
    'Workshop belum bisa dibatalkan di Spark API.'
  );
}

export async function getBackendSavedHubResources() {
  return apiGet<ListResponse<BackendHubResourceSave>>(
    '/v1/hub/me/resources',
    'Resource tersimpan belum bisa dibaca dari Spark API.'
  );
}

export async function saveBackendHubResource(resourceId: string) {
  return apiPost<BackendHubResourceSave>(
    `/v1/hub/resources/${encodeURIComponent(resourceId)}/save`,
    { payload: { source: 'spark.frontend.hub' } },
    'Resource belum bisa disimpan ke Spark API.'
  );
}

export async function unsaveBackendHubResource(resourceId: string) {
  return apiPost<BackendHubResourceSave>(
    `/v1/hub/resources/${encodeURIComponent(resourceId)}/unsave`,
    { payload: { source: 'spark.frontend.hub' } },
    'Resource belum bisa dilepas dari Spark API.'
  );
}
