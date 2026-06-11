import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import {
  checkAdminLoginRateLimit,
  getAdminAuthConfig,
  resetAdminLoginRateLimit,
  setAdminSession,
  verifyAdminPassword
} from '$lib/server/admin-auth';

export const actions: Actions = {
  default: async ({ request, cookies, url, getClientAddress }) => {
    const config = getAdminAuthConfig();
    if (!config.configured) {
      return fail(503, { message: 'Admin access is not configured for this deployment.' });
    }

    let clientKey = 'unknown-client';
    try {
      clientKey = getClientAddress();
    } catch {
      // Some local adapters do not expose a client address.
    }

    const rateLimit = checkAdminLoginRateLimit(clientKey);
    if (!rateLimit.allowed) {
      return fail(429, { message: 'Too many attempts. Try again in ' + rateLimit.retryAfterSeconds + ' seconds.' });
    }

    const formData = await request.formData();
    const password = String(formData.get('password') ?? '');
    if (!verifyAdminPassword(password)) {
      return fail(401, { message: 'Admin credential was not accepted.' });
    }

    resetAdminLoginRateLimit(clientKey);
    setAdminSession(cookies, url.protocol === 'https:');
    redirect(303, '/admin');
  }
};
