import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import type { AdminServiceStatus } from '$lib/admin/admin-types';

function unavailableDetail(error: unknown) {
  if (error instanceof DOMException && error.name === 'TimeoutError') return 'Health check timed out.';
  return 'Health check is unavailable.';
}

function safeApiHealthUrl(origin: string) {
  const base = publicEnv.PUBLIC_SPARK_API_URL?.trim() || '/api';
  const url = new URL(base, origin);
  url.pathname = url.pathname.replace(/\/$/, '') + '/health';
  return url;
}

export async function checkSparkApiHealth(fetcher: typeof fetch, origin: string): Promise<AdminServiceStatus> {
  try {
    const response = await fetcher(safeApiHealthUrl(origin), {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(3500)
    });
    if (!response.ok) {
      return { state: 'error', label: 'Unavailable', detail: 'Spark API returned HTTP ' + response.status + '.' };
    }

    const body = (await response.json().catch(() => null)) as { version?: unknown } | null;
    const version = typeof body?.version === 'string' ? body.version : null;
    return {
      state: 'available',
      label: 'Operational',
      detail: version ? 'Spark API version ' + version + '.' : 'Spark API health endpoint responded.'
    };
  } catch (error) {
    return { state: 'unavailable', label: 'Not connected', detail: unavailableDetail(error) };
  }
}

function chainLabel(chainId: unknown) {
  if (chainId === '0x534e5f4d41494e') return 'Starknet Mainnet';
  if (chainId === '0x534e5f5345504f4c4941') return 'Starknet Sepolia';
  return typeof chainId === 'string' && chainId ? 'Chain ' + chainId : 'Unknown Starknet chain';
}

export async function checkStarknetRpc(fetcher: typeof fetch = fetch): Promise<AdminServiceStatus> {
  const rpcUrl = privateEnv.KARYRA_STARKNET_RPC_URL?.trim() || privateEnv.STARKNET_RPC_URL?.trim();
  if (!rpcUrl) {
    return {
      state: 'unavailable',
      label: 'Not configured',
      detail: 'Set a private read-only RPC URL to enable this health check.'
    };
  }

  try {
    const response = await fetcher(rpcUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'starknet_chainId', params: [] }),
      signal: AbortSignal.timeout(3500)
    });
    if (!response.ok) {
      return { state: 'error', label: 'Unavailable', detail: 'Read-only RPC returned HTTP ' + response.status + '.' };
    }

    const body = (await response.json().catch(() => null)) as { result?: unknown; error?: unknown } | null;
    if (!body || body.error || !body.result) {
      return { state: 'error', label: 'Invalid response', detail: 'Read-only RPC did not return a chain ID.' };
    }

    return { state: 'available', label: 'Connected', detail: chainLabel(body.result) };
  } catch (error) {
    return { state: 'error', label: 'Unavailable', detail: unavailableDetail(error) };
  }
}
