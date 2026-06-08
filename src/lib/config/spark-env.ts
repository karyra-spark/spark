import { z } from 'zod';

const UrlOrPathSchema = z.string().refine(
  (value) => {
    if (value.startsWith('/')) return true;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  { message: 'Expected a valid URL or an absolute path that starts with /.' }
);

const ClientEnvSchema = z.object({
  PUBLIC_SPARK_API_URL: z.string().url().optional().default('http://localhost:8787'),
  PUBLIC_SPARK_HUB_URL: UrlOrPathSchema.optional().default('/hub'),
  PUBLIC_SPARK_APP_URL: z.string().url().optional().default('http://localhost:5173'),
  PUBLIC_SPARK_APP_NAME: z.string().optional().default('Karyra Spark'),
  PUBLIC_SPARK_MODE: z.enum(['local', 'preview', 'production']).optional().default('local')
});

export const sparkEnv = ClientEnvSchema.parse({
  PUBLIC_SPARK_API_URL: import.meta.env.PUBLIC_SPARK_API_URL,
  PUBLIC_SPARK_HUB_URL: import.meta.env.PUBLIC_SPARK_HUB_URL,
  PUBLIC_SPARK_APP_URL: import.meta.env.PUBLIC_SPARK_APP_URL,
  PUBLIC_SPARK_APP_NAME: import.meta.env.PUBLIC_SPARK_APP_NAME,
  PUBLIC_SPARK_MODE: import.meta.env.PUBLIC_SPARK_MODE
});
