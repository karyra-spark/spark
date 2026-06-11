import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { clearAdminSession } from '$lib/server/admin-auth';

export const POST: RequestHandler = async ({ cookies }) => {
  clearAdminSession(cookies);
  redirect(303, '/admin/login');
};
