import type { SparkApiHealth } from './api-contract';

const DEFAULT_API_BASE_PATH = '/api';

function normalizeApiBaseUrl(value: string | undefined) {
  const candidate = value?.trim();
  if (!candidate) return DEFAULT_API_BASE_PATH;
  if (candidate === '/') return '';
  return candidate.replace(/\/$/, '');
}

function joinApiPath(baseUrl: string, path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (!baseUrl) return normalizedPath;
  if (baseUrl.startsWith('/')) return `${baseUrl}${normalizedPath}`.replace(/\/+/g, '/');
  return `${baseUrl}${normalizedPath}`;
}

export const sparkApiBaseUrl = normalizeApiBaseUrl(
  import.meta.env.VITE_SPARK_API_BASE_URL || import.meta.env.PUBLIC_SPARK_API_URL
);

export function sparkApiUrl(path: string) {
  return joinApiPath(sparkApiBaseUrl, path);
}

export async function fetchSparkApiHealth(fetcher: typeof fetch = fetch): Promise<SparkApiHealth> {
  const response = await fetcher(sparkApiUrl('/health'));
  if (!response.ok) throw new Error(`Spark API health check failed: ${response.status}`);
  return (await response.json()) as SparkApiHealth;
}