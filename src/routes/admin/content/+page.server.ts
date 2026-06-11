import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { PageServerLoad } from './$types';
import type { AdminDocLink } from '$lib/admin/admin-types';

const definitions = [
  { id: 'participation-layer', label: 'Participation Layer Spec', repositoryPath: 'docs/PARTICIPATION_LAYER_SPEC.md' },
  { id: 'proof-ledger', label: 'Proof Ledger Model', repositoryPath: 'docs/PROOF_LEDGER_MODEL.md' },
  { id: 'passport-flow', label: 'Readiness Passport Flow', repositoryPath: 'docs/PASS_SUBMISSION_02_PASSPORT_EVIDENCE_TRAIL.md' },
  { id: 'community-signal', label: 'Community Signal Summary', repositoryPath: 'docs/LOCAL_COMMUNITY_SIGNAL_SUMMARY.md' },
  { id: 'project-status', label: 'Project Status Summary', repositoryPath: 'docs/PROJECT_STATUS_SUMMARY.md' }
] as const;

export const load: PageServerLoad = async () => {
  const docs: AdminDocLink[] = definitions.map((document) => {
    const exists = existsSync(resolve(process.cwd(), document.repositoryPath));
    return { ...document, exists, publicHref: exists ? '/docs' : null };
  });
  return { docs };
};
