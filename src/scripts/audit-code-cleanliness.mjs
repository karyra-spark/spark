#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const blockers = [];
const warnings = [];

function exists(path) {
  return existsSync(join(root, path));
}

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

function walk(dir, files = []) {
  const fullDir = join(root, dir);
  if (!existsSync(fullDir)) return files;
  for (const entry of readdirSync(fullDir)) {
    const full = join(fullDir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (['node_modules', '.svelte-kit', 'build', 'dist'].includes(entry)) continue;
      walk(relative(root, full), files);
    } else {
      files.push(relative(root, full));
    }
  }
  return files;
}

if (!exists('package.json')) blockers.push('Missing package.json');
if (!exists('src/routes/+layout.svelte')) blockers.push('Missing src/routes/+layout.svelte');

if (exists('package.json')) {
  const pkg = JSON.parse(read('package.json'));
  for (const [name, command] of Object.entries(pkg.scripts ?? {})) {
    if (name.includes('pass')) blockers.push(`package.json script should not use pass-based name: ${name}`);
    if (String(command).includes('audit-pass')) blockers.push(`package.json script should not call pass-based audit file: ${name}`);
  }
  const expected = [
    'audit:public-copy',
    'audit:microcopy',
    'audit:journey-copy',
    'audit:learning-flow',
    'audit:passport',
    'audit:css-syntax',
    'audit:hub-topology',
    'audit:desktop-layout',
    'audit:beta-signal',
    'audit:code-clean',
    'audit:all'
  ];
  for (const script of expected) {
    if (!pkg.scripts?.[script]) blockers.push(`Missing semantic audit script: ${script}`);
  }
}

if (exists('src/routes/+layout.svelte')) {
  const layout = read('src/routes/+layout.svelte');
  if (layout.includes('$lib/styles/pass-')) blockers.push('Root layout still imports pass-based stylesheet names.');
  for (const style of ['desktop-layout.css', 'beta-signal.css', 'passport-explainability.css', 'core-lab-flow.css']) {
    if (!layout.includes(`$lib/styles/${style}`)) blockers.push(`Root layout is missing semantic stylesheet import: ${style}`);
  }
}

for (const file of walk('src/lib/styles')) {
  if (/src\/lib\/styles\/pass-.*\.css$/.test(file)) blockers.push(`Pass-based stylesheet remains: ${file}`);
}

for (const file of walk('src/scripts')) {
  if (/src\/scripts\/audit-pass.*\.mjs$/.test(file)) blockers.push(`Pass-based audit script remains: ${file}`);
  const text = read(file);
  if (text.charCodeAt(0) === 92) blockers.push(`${file} starts with a leading backslash.`);
}

for (const file of walk('src/lib/content')) {
  if (/src\/lib\/content\/pass-.*\.(ts|js)$/.test(file)) blockers.push(`Pass-based content module remains: ${file}`);
  const text = read(file);
  if (/pass\d+[a-z]?/i.test(text)) warnings.push(`${file} still contains pass-like identifier text.`);
}

console.log('Spark code cleanliness audit');
console.log('============================');
console.log(`Blockers: ${blockers.length}`);
console.log(`Warnings: ${warnings.length}`);

if (warnings.length) {
  console.log('\nWarnings:');
  for (const warning of warnings.slice(0, 80)) console.log(`- ${warning}`);
  if (warnings.length > 80) console.log(`- ...and ${warnings.length - 80} more warnings`);
}

if (blockers.length) {
  console.error('\nBlockers:');
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log('\nNo hard blockers found.');
