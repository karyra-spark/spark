export type BetaUserRole = 'learner' | 'facilitator' | 'explorer';
export type BetaUserMode = 'beginner' | 'guided' | 'explorer';
export type BetaUserStatus = 'local-session' | 'backend-session';

export type BetaUser = {
  id: string;
  name: string;
  handle: string;
  email?: string;
  role: BetaUserRole;
  mode: BetaUserMode;
  status: BetaUserStatus;
  createdAt: string;
};

export type SessionInput = {
  name?: string;
  email: string;
  password?: string;
  mode?: BetaUserMode;
};

type BackendAuthUser = {
  id: string;
  email: string;
  display_name: string;
  handle?: string | null;
};

type BackendAuthResponse = {
  user: BackendAuthUser;
};

const STORAGE_KEY = 'karyra-spark-session-v2';
const LEGACY_STORAGE_KEYS = ['karyra-spark-beta-session-v1'];
const AUTH_BASE = '/v1/auth';

export class SparkAuthError extends Error {
  status: number;
  userMessage: string;

  constructor(status: number, userMessage: string, rawMessage?: string) {
    super(rawMessage || userMessage);
    this.name = 'SparkAuthError';
    this.status = status;
    this.userMessage = userMessage;
  }
}

export const betaSession = $state({
  ready: false,
  hydrating: false,
  user: null as BetaUser | null,
  lastError: null as string | null
});

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function titleFromEmail(email: string) {
  const local = email.split('@')[0] ?? '';
  const words = local
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .map((part) => part.trim())
    .filter(Boolean);

  return words.map((part) => part.slice(0, 1).toUpperCase() + part.slice(1)).join(' ') || 'Pengguna Karyra';
}

function normalizeHandle(input: string) {
  const seed = input
    .trim()
    .toLowerCase()
    .replace(/^@/, '')
    .replace(/@.*$/, '')
    .replace(/[^a-z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 28);

  return `@${seed || 'karyra'}`;
}

function createSessionId(email: string) {
  const cryptoId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const emailSeed = normalizeHandle(email).replace('@', '');
  return `user-${emailSeed}-${cryptoId}`;
}

function isValidUser(value: Partial<BetaUser> | null): value is BetaUser {
  if (!value?.id || !value.name || !value.handle || !value.mode) return false;
  if (value.status !== 'local-session' && value.status !== 'backend-session') return false;
  if (value.id.includes('spark-local') || value.id.includes('example')) return false;
  return true;
}

function safeParseSession(raw: string | null) {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<BetaUser>;
    if (!isValidUser(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function setCurrentUser(user: BetaUser | null) {
  betaSession.user = user;
  betaSession.ready = true;
  betaSession.lastError = null;
  saveBetaSession(user);
}

function modeForBackendUser(email: string, preferredMode?: BetaUserMode) {
  if (preferredMode) return preferredMode;
  if (betaSession.user?.email && normalizeEmail(betaSession.user.email) === normalizeEmail(email)) return betaSession.user.mode;
  return 'beginner';
}

function toBetaUser(user: BackendAuthUser, preferredMode?: BetaUserMode): BetaUser {
  const email = normalizeEmail(user.email);
  const mode = modeForBackendUser(email, preferredMode);

  return {
    id: user.id,
    name: user.display_name?.trim() || titleFromEmail(email),
    handle: user.handle?.trim() || normalizeHandle(email),
    email,
    role: mode === 'explorer' ? 'explorer' : 'learner',
    mode,
    status: 'backend-session',
    createdAt: betaSession.user?.id === user.id ? betaSession.user.createdAt : new Date().toISOString()
  };
}

function mapApiError(status: number, rawMessage: string) {
  const message = rawMessage.toLowerCase();

  if (status === 401) return 'Email atau kata sandi belum cocok.';
  if (status === 409 || message.includes('already registered')) return 'Email ini sudah terdaftar. Masuk dengan akun tersebut atau gunakan email lain.';
  if (message.includes('password must be')) return 'Kata sandi minimal 8 karakter dan maksimal 128 karakter.';
  if (message.includes('valid email')) return 'Gunakan email yang valid.';
  if (status >= 500) return 'Spark API sedang belum stabil. Coba lagi sebentar.';

  return rawMessage.replace(/^bad request:\s*/i, '').replace(/^conflict:\s*/i, '') || 'Permintaan belum bisa diproses. Periksa kembali data yang kamu isi.';
}

async function requestJson<T>(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');

  let response: Response;
  try {
    response = await fetch(path, {
      ...init,
      headers,
      credentials: 'include'
    });
  } catch {
    throw new SparkAuthError(0, 'Belum bisa terhubung ke Spark API. Coba lagi sebentar.', 'network error');
  }

  if (response.status === 204) return null as T;

  const contentType = response.headers.get('content-type') ?? '';
  const body = contentType.includes('application/json') ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const rawMessage = typeof body?.error === 'string' ? body.error : response.statusText || 'request failed';
    throw new SparkAuthError(response.status, mapApiError(response.status, rawMessage), rawMessage);
  }

  return body as T;
}

export function authErrorMessage(error: unknown, fallback = 'Belum bisa terhubung ke Spark API. Coba lagi sebentar.') {
  if (error instanceof SparkAuthError) return error.userMessage;
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export function restoreBetaSession() {
  if (typeof window === 'undefined') return;

  for (const legacyKey of LEGACY_STORAGE_KEYS) {
    window.localStorage.removeItem(legacyKey);
  }

  betaSession.user = safeParseSession(window.localStorage.getItem(STORAGE_KEY));
  betaSession.ready = true;
}

export function saveBetaSession(user: BetaUser | null) {
  if (typeof window === 'undefined') return;

  if (!user) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export async function hydrateBackendSession() {
  if (typeof window === 'undefined') return betaSession.user;

  betaSession.hydrating = true;
  betaSession.lastError = null;

  try {
    const response = await requestJson<BackendAuthResponse>(`${AUTH_BASE}/me`);
    const user = toBetaUser(response.user);
    setCurrentUser(user);
    return user;
  } catch (error) {
    if (error instanceof SparkAuthError && error.status === 401) {
      setCurrentUser(null);
      return null;
    }

    betaSession.lastError = authErrorMessage(error);
    if (!betaSession.user || betaSession.user.status === 'backend-session') {
      setCurrentUser(null);
    }
    return betaSession.user;
  } finally {
    betaSession.ready = true;
    betaSession.hydrating = false;
  }
}

export async function registerBackendSession(input: SessionInput) {
  const email = normalizeEmail(input.email);
  const displayName = input.name?.trim();

  const response = await requestJson<BackendAuthResponse>(`${AUTH_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password: input.password,
      display_name: displayName
    })
  });

  const user = toBetaUser(response.user, input.mode);
  setCurrentUser(user);
  return user;
}

export async function loginBackendSession(input: SessionInput) {
  const email = normalizeEmail(input.email);

  const response = await requestJson<BackendAuthResponse>(`${AUTH_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password: input.password
    })
  });

  const user = toBetaUser(response.user, input.mode);
  setCurrentUser(user);
  return user;
}

export function startLearningSession(input: SessionInput) {
  const email = normalizeEmail(input.email);
  const name = input.name?.trim() || titleFromEmail(email);
  const mode = input.mode ?? 'beginner';

  const user: BetaUser = {
    id: createSessionId(email),
    name,
    handle: normalizeHandle(email || name),
    email,
    role: mode === 'explorer' ? 'explorer' : 'learner',
    mode,
    status: 'local-session',
    createdAt: new Date().toISOString()
  };

  setCurrentUser(user);
  return user;
}

export async function logoutBetaSession() {
  try {
    await requestJson<null>(`${AUTH_BASE}/logout`, { method: 'POST' });
  } catch {
    // Logout must remain reliable for the user even when the API is temporarily unreachable.
  } finally {
    setCurrentUser(null);
  }
}

export function clearLocalSession() {
  setCurrentUser(null);
}

export function isSignedIn() {
  return Boolean(betaSession.user);
}

export function getModeLabel(mode: BetaUserMode) {
  if (mode === 'beginner') return 'Pemula';
  if (mode === 'guided') return 'Terarah';
  return 'Penjelajah';
}
