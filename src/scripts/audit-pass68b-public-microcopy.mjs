#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const publicCopyDirs = [
  'src/routes',
  'src/lib/ui',
  'src/lib/shell',
  'src/lib/content',
  'src/lib/messaging'
];

const textExtensions = new Set(['.svelte', '.ts', '.js', '.mjs']);
const scanSkipFiles = new Set([
  'src/lib/content/public-copy-contract.ts'
]);

const hardUrlBlockers = [
  {
    label: 'localhost Hub URL',
    pattern: /https?:\/\/localhost:5174\b/g,
    help: 'Hub publik tidak boleh jatuh ke localhost:5174.'
  }
];

const bannedPublicTerms = [
  'sesi backend',
  'session backend',
  'evidence root',
  'proof event ledger',
  'recorded proof event',
  'local-state',
  'sync queue',
  'httponly',
  'endpoint'
];

const publicCopyKeys = [
  'title',
  'copy',
  'label',
  'shortLabel',
  'preview',
  'body',
  'cta',
  'sender',
  'status',
  'placeholder',
  'aria-label',
  'alt',
  'hint',
  'description',
  'action'
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
      if (['node_modules', '.svelte-kit', 'build', 'dist', '.pass-backups'].includes(entry)) continue;
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

function stripScriptAndStyle(svelteText) {
  return svelteText
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');
}

function stripSvelteExpressions(text) {
  return text
    .replace(/\{#[\s\S]*?\}/g, ' ')
    .replace(/\{:[\s\S]*?\}/g, ' ')
    .replace(/\{\/[\s\S]*?\}/g, ' ')
    .replace(/\{[\s\S]*?\}/g, ' ');
}

function visibleTextCandidatesFromSvelte(text) {
  const markup = stripSvelteExpressions(stripScriptAndStyle(text));
  const candidates = [];

  const tagTextRegex = />\s*([^<>{}][^<>{}]*)\s*</g;
  for (const match of markup.matchAll(tagTextRegex)) {
    const value = match[1].replace(/\s+/g, ' ').trim();
    if (value) candidates.push({ value, index: match.index ?? 0, source: 'markup text' });
  }

  const attrRegex = /(?:aria-label|placeholder|title|alt)=(["'])(.*?)\1/g;
  for (const match of markup.matchAll(attrRegex)) {
    const value = match[2].replace(/\s+/g, ' ').trim();
    if (value) candidates.push({ value, index: match.index ?? 0, source: 'public attribute' });
  }

  return candidates;
}

function objectCopyCandidates(text) {
  const candidates = [];
  const keyPattern = publicCopyKeys.map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const quoted = new RegExp(`(?:${keyPattern})\\s*:\\s*([\\'\\\"])([\\s\\S]*?)\\1`, 'g');
  for (const match of text.matchAll(quoted)) {
    const value = match[2].replace(/\s+/g, ' ').trim();
    if (value) candidates.push({ value, index: match.index ?? 0, source: 'public copy key' });
  }

  const toastObject = /pushToast\s*\(\s*\{([\s\S]*?)\}\s*\)/g;
  for (const toastMatch of text.matchAll(toastObject)) {
    const base = toastMatch.index ?? 0;
    const body = toastMatch[1];
    const inner = /(?:title|copy)\s*:\s*([\'\"])([\s\S]*?)\1/g;
    for (const match of body.matchAll(inner)) {
      const value = match[2].replace(/\s+/g, ' ').trim();
      if (value) candidates.push({ value, index: base + (match.index ?? 0), source: 'toast copy' });
    }
  }

  return candidates;
}

function candidatesForFile(rel, text) {
  if (rel.endsWith('.svelte')) {
    return [...visibleTextCandidatesFromSvelte(text), ...objectCopyCandidates(text)];
  }
  return objectCopyCandidates(text);
}

const failures = [];
const warnings = [];
const allFiles = publicCopyDirs.flatMap((dir) => walk(join(root, dir)));
const scanFiles = allFiles.filter((file) => !scanSkipFiles.has(relative(root, file)));

for (const file of scanFiles) {
  const rel = relative(root, file);
  const text = readFileSync(file, 'utf8');

  for (const blocker of hardUrlBlockers) {
    for (const match of text.matchAll(blocker.pattern)) {
      failures.push(`${rel}:${lineNumber(text, match.index ?? 0)} ${blocker.label} — ${blocker.help}`);
    }
  }

  const candidates = candidatesForFile(rel, text);
  for (const candidate of candidates) {
    const lower = candidate.value.toLowerCase();
    for (const term of bannedPublicTerms) {
      if (lower.includes(term)) {
        failures.push(
          `${rel}:${lineNumber(text, candidate.index)} contains technical public copy: "${term}" in ${candidate.source} — ganti copy yang tampil ke pengguna.`
        );
      }
    }
  }
}

const scriptFiles = walk(join(root, 'src/scripts'));
for (const file of scriptFiles) {
  const text = readFileSync(file, 'utf8');
  if (text.startsWith('\\')) {
    failures.push(`${relative(root, file)} starts with a leading backslash.`);
  }
}

console.log('Spark Pass 68B public microcopy audit');
console.log('======================================');
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
