import { env as publicEnv } from '$env/dynamic/public';
import type { PageServerLoad } from './$types';
import { checkStarknetRpc } from '$lib/server/admin-status';

export const load: PageServerLoad = async ({ fetch }) => {
  return {
    starknetStatus: await checkStarknetRpc(fetch),
    hubUrl: publicEnv.PUBLIC_SPARK_HUB_URL || '/hub'
  };
};
