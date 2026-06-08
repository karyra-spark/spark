#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const scanDirs = ['src/routes', 'src/lib/ui', 'src/lib/messaging', 'src/lib/content'];
const textExtensions = new Set(['.svelte', '.ts', '.js', '.mjs']);
const skipFileFragments = [
  'public-copy-contract.ts',
  'journey-copy.ts',
  'audit-pass68',
  '.test.',
  '.spec.'
];

const hardTechnicalTerms = [
  'sesi backend',
  'session backend',
  'evidence root',
  'proof event ledger',
  'recorded proof event',
  'local-state',
  'sync queue',
  'http://localhost:5174'
];

const legacyJourneyCopy = [
  'Mulai belajar',
  'Lihat alur',
  'Buka Core',
  'Buka ujian level',
  'Buka ujian Lab',
  'Kirim jawaban',
  'Coba Lab',
  'Pantau Passport',
  'Buka Hub',
  'Jelajahi Hub',
  'Lihat Workshop',
  'Lihat Cohort',
  'Buka Diskusi',
  'Hapus data perangkat',
  'Mulai ulang progress'
];

function exists(path) {
  try {
    statSync(path);
    return true;
  } catch {
    return false;
  }
}

function walk(dir, files = []) {
  if (!exists(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (['node_modules', '.svelte-kit', 'build', 'dist'].includes(entry)) continue;
      walk(full, files);
    } else {
      const ext = full.slice(full.lastIndexOf('.'));
      if (textExtensions.has(ext)) files.push(full);
    }
  }
  return files;
}

function lineNumber(text, index) {
  return text.slice(0, index).split('\n').length;
}

function extractUiCopyCandidates(text) {
  const candidates = [];
  const patterns = [
    />\s*([^<>{}`;]{2,120})\s*</g,
    /\b(?:aria-label|placeholder|title)=\"([^\"]{2,160})\"/g,
    /\b(?:aria-label|placeholder|title)=\'([^\']{2,160})\'/g,
    /\b(?:title|copy|preview|body|cta|label|status|sender):\s*\"([^\"]{2,220})\"/g,
    /\b(?:title|copy|preview|body|cta|label|status|sender):\s*\'([^\']{2,220})\'/g
  ];

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const copy = (match[1] ?? '').trim().replace(/\s+/g, ' ');
      if (!copy) continue;
      const index = match.index ?? 0;
      candidates.push({ copy, index });
    }
  }
  return candidates;
}

const files = scanDirs
  .flatMap((dir) => walk(join(root, dir)))
  .filter((file) => !skipFileFragments.some((fragment) => file.includes(fragment)));

const blockers = [];
const warnings = [];

for (const file of files) {
  const rel = relative(root, file);
  const text = readFileSync(file, 'utf8');
  const candidates = extractUiCopyCandidates(text);

  for (const { copy, index } of candidates) {
    const lower = copy.toLowerCase();
    for (const term of hardTechnicalTerms) {
      if (lower.includes(term.toLowerCase())) {
        blockers.push(`${rel}:${lineNumber(text, index)} public UI copy contains technical term: "${copy}"`);
      }
    }

    for (const legacy of legacyJourneyCopy) {
      if (copy === legacy || copy.includes(legacy)) {
        warnings.push(`${rel}:${lineNumber(text, index)} legacy journey copy candidate: "${copy}"`);
      }
    }
  }
}

console.log('Spark journey copy audit');
console.log('========================================');
console.log(`Files scanned: ${files.length}`);

if (warnings.length) {
  console.log('\nWarnings:');
  for (const warning of warnings.slice(0, 80)) console.log(`- ${warning}`);
  if (warnings.length > 80) console.log(`- ...and ${warnings.length - 80} more warnings`);
} else {
  console.log('\nWarnings: none');
}

if (blockers.length) {
  console.error('\nBlockers:');
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log('\nNo hard blockers found.');
