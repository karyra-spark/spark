export type BackendProfileVisibility = 'private' | 'community' | 'public';
export type BackendProfileAvatarPreset = 'spark' | 'trophy' | 'coffee' | 'explorer' | 'mentor';

export type BackendProfile = {
  user_id: string;
  email: string;
  display_name: string;
  handle: string | null;
  bio: string;
  location: string;
  visibility: BackendProfileVisibility;
  avatar_preset: BackendProfileAvatarPreset;
  avatar_url: string | null;
  updated_at: string;
};

export type BackendProfileUpdate = {
  display_name?: string;
  handle?: string;
  bio?: string;
  location?: string;
  visibility?: BackendProfileVisibility;
  avatar_preset?: BackendProfileAvatarPreset;
  avatar_url?: string;
};

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
    if (body.error.includes('unauthorized')) return 'Sesi kamu sudah berakhir. Masuk lagi untuk menyimpan profil.';
    if (body.error.includes('handle')) return 'Handle hanya boleh berisi huruf, angka, titik, strip, dan underscore.';
    if (body.error.includes('display_name')) return 'Nama profil terlalu pendek atau terlalu panjang.';
    if (body.error.includes('visibility')) return 'Pilihan visibilitas profil tidak valid.';
    return body.error;
  }
  return fallback;
}

export async function getBackendProfile(): Promise<BackendProfile | null> {
  const response = await fetch(apiUrl('/v1/profile/me'), {
    credentials: 'include',
    headers: { Accept: 'application/json' }
  });

  if (response.status === 401) return null;

  if (!response.ok) {
    const body = await readJson<unknown>(response).catch(() => null);
    throw new Error(messageFromErrorBody(body, 'Profil belum bisa dibaca dari Spark API.'));
  }

  return readJson<BackendProfile>(response);
}

export async function updateBackendProfile(payload: BackendProfileUpdate): Promise<BackendProfile> {
  const response = await fetch(apiUrl('/v1/profile/me'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await readJson<unknown>(response).catch(() => null);
    throw new Error(messageFromErrorBody(body, 'Profil belum bisa disimpan ke Spark API.'));
  }

  return readJson<BackendProfile>(response);
}
