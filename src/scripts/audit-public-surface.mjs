#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blockers = [];
const warnings = [];

const forbiddenPaths = [
  'src/routes/studio',
  'src/lib/content-builder',
  'src/lib/ui/SparkPublicContentBuilder.svelte',
  'static/studio-content-overrides.json'
];

for (const rel of forbiddenPaths) {
  if (fs.existsSync(path.join(root, rel))) {
    blockers.push(`${rel} should not exist in the public Spark frontend repo.`);
  }
}

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

const sourceExtensions = new Set(['.svelte', '.ts', '.js', '.mjs', '.json', '.css', '.html']);
const forbiddenTextRules = [
  { label: 'studio route', value: '/studio' },
  { label: 'studio content API', value: '/studio/content/api/override' },
  { label: 'studio override file', value: 'studio-content-overrides.json' },
  { label: 'studio writer env', value: 'SPARK_STUDIO_WRITE_ENABLED' },
  { label: 'public content builder component', value: 'SparkPublicContentBuilder' },
  { label: 'studio content builder marker', value: 'data-karyra-studio-content-builder' }
];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(root, full).replaceAll(path.sep, '/');
    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) continue;
      if (entry.name.startsWith('pass-')) continue;
      walk(full);
      continue;
    }
    if (!sourceExtensions.has(path.extname(entry.name))) continue;
    if (!rel.startsWith('src/') && !rel.startsWith('static/') && rel !== 'package.json') continue;
    if (rel.startsWith('src/scripts/audit-')) continue;

    const text = fs.readFileSync(full, 'utf8');
    for (const rule of forbiddenTextRules) {
      if (text.includes(rule.value)) {
        blockers.push(`${rel} still references ${rule.label}: ${rule.value}`);
      }
    }
  }
}

walk(root);

console.log('Karyra Spark public surface audit');
console.log('==================================');
console.log(`Warnings: ${warnings.length}`);
console.log(`Blockers: ${blockers.length}`);

if (warnings.length) {
  console.log('\nWarnings:');
  for (const item of warnings) console.log(`- ${item}`);
}

if (blockers.length) {
  console.log('\nBlockers:');
  for (const item of blockers) console.log(`- ${item}`);
  process.exit(1);
}

console.log('\nPublic surface is clean: Studio UI/API writer surface is not present.');
