import type { PageServerLoad } from './$types';
import { checkSparkApiHealth, checkStarknetRpc } from '$lib/server/admin-status';

export const load: PageServerLoad = async ({ fetch, url }) => {
  const [apiStatus, starknetStatus] = await Promise.all([
    checkSparkApiHealth(fetch, url.origin),
    checkStarknetRpc(fetch)
  ]);

  return { apiStatus, starknetStatus, recentActivity: [] };
};
