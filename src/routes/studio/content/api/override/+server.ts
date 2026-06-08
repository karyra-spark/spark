import { error, json } from '@sveltejs/kit';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import {
  makePublicContentOverride,
  normalizePublicContentOverride,
  type PublicContentOverride
} from '$lib/content-builder/public-content-builder';

const OVERRIDE_PATH = resolve(process.cwd(), 'static/studio-content-overrides.json');

function isWriteEnabled() {
  return process.env.SPARK_STUDIO_WRITE_ENABLED === 'true' || process.env.NODE_ENV === 'development';
}

async function readOverrideFile(): Promise<PublicContentOverride> {
  try {
    const raw = await readFile(OVERRIDE_PATH, 'utf-8');
    return normalizePublicContentOverride(JSON.parse(raw) as unknown);
  } catch {
    return normalizePublicContentOverride(null);
  }
}

export async function GET() {
  const content = await readOverrideFile();
  return json({
    write_enabled: isWriteEnabled(),
    path: 'static/studio-content-overrides.json',
    content
  });
}

export async function POST({ request }) {
  if (!isWriteEnabled()) {
    throw error(403, 'Studio file writer is disabled. Set SPARK_STUDIO_WRITE_ENABLED=true for local editing.');
  }

  const body = (await request.json()) as Partial<PublicContentOverride>;
  const normalized = normalizePublicContentOverride(body);
  const payload = makePublicContentOverride(normalized.blocks);

  await mkdir(dirname(OVERRIDE_PATH), { recursive: true });
  await writeFile(OVERRIDE_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf-8');

  return json({
    ok: true,
    path: 'static/studio-content-overrides.json',
    content: payload
  });
}
