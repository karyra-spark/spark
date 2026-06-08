export type SparkApiErrorBody = {
  error?: string;
  message?: string;
};

export class SparkApiError extends Error {
  status: number;
  body: SparkApiErrorBody | null;

  constructor(status: number, message: string, body: SparkApiErrorBody | null = null) {
    super(message);
    this.name = 'SparkApiError';
    this.status = status;
    this.body = body;
  }
}

const apiBase = (import.meta.env.PUBLIC_SPARK_API_BASE || import.meta.env.PUBLIC_API_BASE || '').replace(/\/$/, '');

export function sparkApiPath(path: string) {
  if (!path.startsWith('/')) return `${apiBase}/${path}`;
  return `${apiBase}${path}`;
}

async function parseErrorBody(response: Response) {
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) return null;

  try {
    return (await response.json()) as SparkApiErrorBody;
  } catch {
    return null;
  }
}

export async function sparkApiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const hasBody = typeof init.body !== 'undefined' && init.body !== null;

  if (hasBody && !headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }

  const response = await fetch(sparkApiPath(path), {
    ...init,
    credentials: 'include',
    headers
  });

  if (!response.ok) {
    const body = await parseErrorBody(response);
    const message = body?.error || body?.message || `Spark API request failed (${response.status})`;
    throw new SparkApiError(response.status, message, body);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export type BackendAuthUser = {
  id: string;
  email: string;
  display_name: string;
  handle?: string | null;
};

export type BackendAuthResponse = {
  user: BackendAuthUser;
};

export function isUnauthorized(error: unknown) {
  return error instanceof SparkApiError && error.status === 401;
}

export async function registerWithBackend(input: { email: string; password: string; display_name?: string }) {
  return sparkApiFetch<BackendAuthResponse>('/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export async function loginWithBackend(input: { email: string; password: string }) {
  return sparkApiFetch<BackendAuthResponse>('/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export async function currentBackendUser() {
  return sparkApiFetch<BackendAuthResponse>('/v1/auth/me');
}

export async function logoutFromBackend() {
  return sparkApiFetch<void>('/v1/auth/logout', {
    method: 'POST'
  });
}
