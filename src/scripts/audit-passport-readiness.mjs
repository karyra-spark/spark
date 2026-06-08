#!/usr/bin/env node
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const checks = [];
const failures = [];

function exists(path) {
  try {
    statSync(path);
    return true;
  } catch {
    return false;
  }
}

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

function requireFile(path) {
  if (!exists(join(root, path))) failures.push(`Missing ${path}`);
}

function requireIncludes(path, text, label = text) {
  const content = read(path);
  if (!content.includes(text)) failures.push(`${path} missing ${label}`);
}

function requireNotIncludes(path, text, label = text) {
  const content = read(path);
  if (content.includes(text)) failures.push(`${path} still contains ${label}`);
}

requireFile('src/lib/ui/SparkPassportGuestPreview.svelte');
requireFile('src/lib/styles/passport-explainability.css');
requireFile('src/scripts/audit-passport-explainability.mjs');

checks.push('passport route exposes guest preview');
requireIncludes('src/routes/passport/+page.svelte', 'SparkPassportGuestPreview', 'guest Passport preview component');
requireNotIncludes('src/routes/passport/+page.svelte', 'SparkProtectedRoute', 'protected-only Passport gate');

checks.push('passport preview uses public value copy');
requireIncludes('src/lib/ui/SparkPassportGuestPreview.svelte', 'Daftar Gratis & Mulai Bangun Passport');
requireIncludes('src/lib/ui/SparkPassportGuestPreview.svelte', 'Contoh ini hanya preview');

checks.push('passport explainability checklist is installed');
requireIncludes('src/lib/ui/SparkPassportReadinessCenter.svelte', 'passport-explainability-card');
requireIncludes('src/lib/ui/SparkPassportReadinessCenter.svelte', 'Kenapa belum terbit?');
requireIncludes('src/lib/ui/SparkPassportReadinessCenter.svelte', 'Selesaikan Core Beginner');
requireIncludes('src/lib/ui/SparkPassportReadinessCenter.svelte', 'Mulai Lab Beginner');

checks.push('public labels avoid unnecessary technical terms');
for (const path of [
  'src/lib/ui/SparkPassportReadinessCenter.svelte',
  'src/lib/ui/SparkPassportBackendPanel.svelte',
  'src/lib/passport/passport-proof-model.ts'
]) {
  requireNotIncludes(path, 'Self-attested', 'Self-attested public label');
  requireNotIncludes(path, 'Community-verified', 'Community-verified public label');
  requireNotIncludes(path, 'Target chain', 'Target chain public label');
  requireNotIncludes(path, 'Badge NFT', 'Badge NFT public label');
  requireNotIncludes(path, 'Eligible', 'Eligible public label');
  requireNotIncludes(path, 'proof-of-readiness', 'proof-of-readiness public copy');
}

checks.push('layout imports Passport explainability style');
requireIncludes('src/routes/+layout.svelte', "passport-explainability.css");

console.log('Spark Passport explainability audit');
console.log('====================');
for (const check of checks) console.log(`- ${check}`);

if (failures.length) {
  console.error('\nBlockers:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('\nNo hard blockers found.');
