import type { SparkApiHealth } from './api-contract';

const DEFAULT_API_BASE_URL = 'http://127.0.0.1:8787';

export const sparkApiBaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SPARK_API_BASE_URL) || DEFAULT_API_BASE_URL;

export function sparkApiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${sparkApiBaseUrl}${normalizedPath}`;
}

export async function fetchSparkApiHealth(fetcher: typeof fetch = fetch): Promise<SparkApiHealth> {
  const response = await fetcher(sparkApiUrl('/health'));
  if (!response.ok) throw new Error(`Spark API health check failed: ${response.status}`);
  return (await response.json()) as SparkApiHealth;
}
