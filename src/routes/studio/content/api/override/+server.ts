import { error, json } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  normalizePublicContentOverride,
  type PublicContentOverride
} from '$lib/content-builder/public-content-builder';

const OVERRIDE_PATH = resolve(process.cwd(), 'static/studio-content-overrides.json');

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
    write_enabled: false,
    path: 'static/studio-content-overrides.json',
    content
  });
}

export async function POST() {
  throw error(410, 'Studio writer is disabled in the public beta repository. Use the JSON export flow for local review.');
}
