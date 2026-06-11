import { redirect } from '@sveltejs/kit';
import { env as publicEnv } from '$env/dynamic/public';
import type { LayoutServerLoad } from './$types';
import { getAdminAuthConfig, hasValidAdminSession } from '$lib/server/admin-auth';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  const config = getAdminAuthConfig();
  const authenticated = hasValidAdminSession(cookies);
  const isLoginRoute = url.pathname === '/admin/login';

  if (isLoginRoute && authenticated) redirect(303, '/admin');
  if (!isLoginRoute && !authenticated) redirect(303, '/admin/login');

  return {
    adminConfigured: config.configured,
    adminAuthenticated: authenticated,
    deploymentMode: publicEnv.PUBLIC_SPARK_MODE || 'production',
    publicApiBaseUrl: publicEnv.PUBLIC_SPARK_API_URL || '/api',
    appVersion: '0.1.0'
  };
};
