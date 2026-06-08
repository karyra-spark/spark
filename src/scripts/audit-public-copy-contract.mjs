#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const srcRoot = join(root, 'src');
const docsContract = join(root, 'docs/content/public-copy-contract.md');
const tsContract = join(root, 'src/lib/content/public-copy-contract.ts');

const publicCopyDirs = [
  'src/routes',
  'src/lib/ui',
  'src/lib/shell',
  'src/lib/content',
  'src/lib/messaging'
];

const textExtensions = new Set(['.svelte', '.ts', '.js', '.mjs', '.md']);
const hardBlockers = [
  {
    label: 'localhost Hub URL',
    pattern: /https?:\/\/localhost:5174\b/g,
    help: 'Hub publik tidak boleh jatuh ke localhost:5174.'
  }
];

const jargonWarnings = [
  'sesi backend',
  'session backend',
  'evidence root',
  'proof event ledger',
  'recorded proof event',
  'local-state',
  'sync queue',
  'HttpOnly',
  'payload',
  'endpoint'
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

const failures = [];
const warnings = [];

if (!exists(docsContract)) failures.push(`Missing ${relative(root, docsContract)}`);
if (!exists(tsContract)) failures.push(`Missing ${relative(root, tsContract)}`);

const scriptFiles = walk(join(srcRoot, 'scripts'));
for (const file of scriptFiles) {
  const text = readFileSync(file, 'utf8');
  if (text.startsWith('\\')) {
    failures.push(`${relative(root, file)} starts with a leading backslash.`);
  }
}

const scanFiles = publicCopyDirs
  .flatMap((dir) => walk(join(root, dir)))
  .filter((file) => !file.endsWith('public-copy-contract.ts'));
for (const file of scanFiles) {
  const rel = relative(root, file);
  const text = readFileSync(file, 'utf8');

  for (const blocker of hardBlockers) {
    for (const match of text.matchAll(blocker.pattern)) {
      failures.push(`${rel}:${lineNumber(text, match.index ?? 0)} ${blocker.label} — ${blocker.help}`);
    }
  }

  const lower = text.toLowerCase();
  for (const term of jargonWarnings) {
    const needle = term.toLowerCase();
    const idx = lower.indexOf(needle);
    if (idx !== -1) {
      warnings.push(`${rel}:${lineNumber(text, idx)} contains public-copy jargon candidate: "${term}"`);
    }
  }
}

console.log('Spark public copy audit');
console.log('=======================');
console.log(`Files scanned: ${scanFiles.length}`);

if (warnings.length) {
  console.log('\nWarnings:');
  for (const warning of warnings.slice(0, 80)) console.log(`- ${warning}`);
  if (warnings.length > 80) console.log(`- ...and ${warnings.length - 80} more warnings`);
} else {
  console.log('\nWarnings: none');
}

if (failures.length) {
  console.error('\nBlockers:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('\nNo hard blockers found.');
