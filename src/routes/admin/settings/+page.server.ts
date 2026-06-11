import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
  starknetRpcConfigured: Boolean(env.KARYRA_STARKNET_RPC_URL?.trim() || env.STARKNET_RPC_URL?.trim()),
  featureFlags: []
});
