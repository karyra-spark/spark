import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';

export const ADMIN_COOKIE_NAME = 'karyra_admin_session';

const DEFAULT_SESSION_HOURS = 8;
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

type AdminSessionPayload = {
  version: 1;
  issuedAt: number;
  expiresAt: number;
  nonce: string;
};

type LoginAttempt = {
  count: number;
  resetAt: number;
};

const loginAttempts = new Map<string, LoginAttempt>();

function privateValue(key: string) {
  return env[key]?.trim() ?? '';
}

function safeSessionHours() {
  const parsed = Number(privateValue('KARYRA_ADMIN_SESSION_HOURS'));
  if (!Number.isFinite(parsed) || parsed < 1 || parsed > 24) return DEFAULT_SESSION_HOURS;
  return parsed;
}

export function getAdminAuthConfig() {
  const enabled = privateValue('KARYRA_ADMIN_ENABLED').toLowerCase() === 'true';
  const password = privateValue('KARYRA_ADMIN_PASSWORD');
  const sessionSecret = privateValue('KARYRA_ADMIN_SESSION_SECRET');
  const configured = enabled && password.length >= 12 && sessionSecret.length >= 32;

  return {
    enabled,
    configured,
    password,
    sessionSecret,
    sessionHours: safeSessionHours()
  };
}

function digest(value: string) {
  return createHash('sha256').update(value).digest();
}

export function verifyAdminPassword(candidate: string) {
  const config = getAdminAuthConfig();
  if (!config.configured) return false;
  return timingSafeEqual(digest(candidate), digest(config.password));
}

function signPayload(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function createSessionToken() {
  const config = getAdminAuthConfig();
  const issuedAt = Date.now();
  const payload: AdminSessionPayload = {
    version: 1,
    issuedAt,
    expiresAt: issuedAt + config.sessionHours * 60 * 60 * 1000,
    nonce: randomBytes(18).toString('base64url')
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return encoded + '.' + signPayload(encoded, config.sessionSecret);
}

export function hasValidAdminSession(cookies: Cookies) {
  const config = getAdminAuthConfig();
  const token = cookies.get(ADMIN_COOKIE_NAME);
  if (!config.configured || !token) return false;

  const [encoded, signature, extra] = token.split('.');
  if (!encoded || !signature || extra) return false;

  const expected = signPayload(encoded, config.sessionSecret);
  if (!timingSafeEqual(digest(signature), digest(expected))) return false;

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as AdminSessionPayload;
    return payload.version === 1 && payload.issuedAt <= Date.now() && payload.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export function setAdminSession(cookies: Cookies, secure: boolean) {
  const config = getAdminAuthConfig();
  cookies.set(ADMIN_COOKIE_NAME, createSessionToken(), {
    path: '/admin',
    httpOnly: true,
    sameSite: 'strict',
    secure,
    maxAge: config.sessionHours * 60 * 60
  });
}

export function clearAdminSession(cookies: Cookies) {
  cookies.delete(ADMIN_COOKIE_NAME, { path: '/admin' });
}

export function checkAdminLoginRateLimit(key: string) {
  const now = Date.now();
  const attempt = loginAttempts.get(key);
  if (!attempt || attempt.resetAt <= now) {
    loginAttempts.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  attempt.count += 1;
  loginAttempts.set(key, attempt);
  return {
    allowed: attempt.count <= MAX_LOGIN_ATTEMPTS,
    retryAfterSeconds: Math.max(1, Math.ceil((attempt.resetAt - now) / 1000))
  };
}

export function resetAdminLoginRateLimit(key: string) {
  loginAttempts.delete(key);
}

// TODO: Replace the single environment credential with identity-provider RBAC,
// revocable sessions, audit logging, and per-action authorization before writes.
