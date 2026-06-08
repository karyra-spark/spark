#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blockers = [];
const warnings = [];
let scanned = 0;

const ignoredDirs = new Set([
  '.git',
  '.svelte-kit',
  'node_modules',
  'build',
  'dist',
  '.vercel',
  '.netlify',
  'coverage'
]);

const binaryLike = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico', '.woff', '.woff2', '.ttf']);
const backupNamePattern = /(?:\.bak$|\.backup(?:-|$)|\.before(?:-|$)|\.tmp$|~$|\.orig$)/i;
const passArtifactPattern = /(^|\/)(pass-\d|pass-\d+[a-z]?[-_]|.*\.pass-\d+.*|.*backup-pass.*|.*before-pass.*)/i;
const passBasedCodePattern = /(^|\/)(?:pass-\d|audit-pass\d|audit-pass-\d)/i;
const secretFilePattern = /(^|\/)(?:\.env$|\.env\.(?!example$)[^/]+|.*secret.*|.*credential.*|.*private.*)/i;

const publicSourceRoots = ['src/', 'static/'];
const publicSourceExtensions = new Set(['.svelte', '.ts', '.js', '.mjs', '.json', '.css', '.html', '.svg']);
const hardBlockedRuntimeTerms = [
  'SPARK_STUDIO_WRITE_ENABLED',
  'studio-content-overrides.json',
  '/studio/content/api/override',
  'SparkPublicContentBuilder',
  'data-karyra-studio-content-builder'
];

function shouldSkipDir(name) {
  return ignoredDirs.has(name) || name.startsWith('pass-');
}

function isAuditScript(rel) {
  return rel.startsWith('src/scripts/audit-');
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(root, full).replaceAll(path.sep, '/');

    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) continue;
      if (passArtifactPattern.test(rel)) blockers.push(`${rel}/ looks like a pass/internal artifact directory.`);
      walk(full);
      continue;
    }

    scanned += 1;
    const ext = path.extname(entry.name).toLowerCase();

    if (backupNamePattern.test(entry.name) || passArtifactPattern.test(rel)) {
      blockers.push(`${rel} looks like a temporary, backup, or pass artifact file.`);
    }

    if (passBasedCodePattern.test(rel) && !isAuditScript(rel)) {
      blockers.push(`${rel} still uses pass-based public code naming.`);
    }

    if (secretFilePattern.test(rel) && !rel.endsWith('.env.example')) {
      blockers.push(`${rel} looks like a secret/private env file and should not be public.`);
    }

    if (binaryLike.has(ext)) continue;
    if (!publicSourceExtensions.has(ext)) continue;
    if (!publicSourceRoots.some((prefix) => rel.startsWith(prefix)) && !['package.json', '.env.example'].includes(rel)) continue;

    const text = fs.readFileSync(full, 'utf8');

    if (!isAuditScript(rel)) {
      for (const term of hardBlockedRuntimeTerms) {
        if (text.includes(term)) blockers.push(`${rel} contains removed Studio/write-surface term: ${term}`);
      }
    }

    if (rel === '.env.example' && text.includes('PUBLIC_SPARK_HUB_URL="http://localhost:5174"')) {
      warnings.push('.env.example should default PUBLIC_SPARK_HUB_URL to /hub and keep localhost only as an optional comment.');
    }
  }
}

walk(root);

console.log('Karyra Spark repository hygiene audit');
console.log('======================================');
console.log(`Entries scanned: ${scanned}`);
console.log(`Warnings: ${warnings.length}`);
console.log(`Blockers: ${blockers.length}`);

if (warnings.length) {
  console.log('\nWarnings:');
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (blockers.length) {
  console.log('\nBlockers:');
  for (const blocker of blockers) console.log(`- ${blocker}`);
  process.exit(1);
}

console.log('\nRepository hygiene looks clean.');
