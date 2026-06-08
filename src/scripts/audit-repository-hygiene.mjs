#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, join, relative } from 'node:path';

const root = process.cwd();
const blockers = [];
const warnings = [];

const ignoredDirs = new Set(['.git', 'node_modules', '.svelte-kit', 'build', 'dist', '.vite']);

function exists(path) {
  return existsSync(join(root, path));
}

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

function walk(dir = '.', files = []) {
  const fullDir = join(root, dir);
  if (!existsSync(fullDir)) return files;

  for (const entry of readdirSync(fullDir)) {
    if (ignoredDirs.has(entry)) continue;
    const full = join(fullDir, entry);
    const stat = statSync(full);
    const rel = relative(root, full);
    if (stat.isDirectory()) {
      walk(rel, files);
    } else {
      files.push(rel);
    }
  }
  return files;
}

function isBackupOrTempArtifact(file) {
  const name = basename(file);
  return (
    name.endsWith('.bak') ||
    name.endsWith('.tmp') ||
    name.endsWith('.orig') ||
    name.endsWith('.rej') ||
    name.includes('.backup-pass') ||
    name.includes('.before-pass') ||
    /\.pass-[^/]+/.test(name) ||
    /\.pass\d/i.test(name) ||
    /^pass-.*\.zip$/i.test(name) ||
    /helper\.txt$/i.test(name)
  );
}

function isPassStyleCode(file) {
  return /^src\/lib\/styles\/pass-.*\.css$/i.test(file);
}

function hasUncommentedLocalHub(text) {
  return text
    .split(/\r?\n/)
    .some((line) => !line.trimStart().startsWith('#') && /localhost:5174/.test(line));
}

const files = walk();

for (const file of files) {
  if (isBackupOrTempArtifact(file)) blockers.push(`${file} looks like a temporary or backup file.`);
  if (isPassStyleCode(file)) blockers.push(`${file} still uses pass-based public code naming.`);
}

for (const entry of readdirSync(root)) {
  const full = join(root, entry);
  const stat = statSync(full);
  if (stat.isDirectory() && /^pass-/i.test(entry)) blockers.push(`${entry}/ looks like a pass installer folder in repo root.`);
  if (stat.isFile() && /^pass-.*\.zip$/i.test(entry)) blockers.push(`${entry} looks like a pass archive in repo root.`);
}

if (exists('.env')) blockers.push('.env must not be committed or kept in the public repo working tree.');
if (exists('package-lock.json')) blockers.push('package-lock.json should not be present in the pnpm-based Spark repo.');
if (exists('yarn.lock')) blockers.push('yarn.lock should not be present in the pnpm-based Spark repo.');
if (exists('npm-shrinkwrap.json')) blockers.push('npm-shrinkwrap.json should not be present in the pnpm-based Spark repo.');
if (!exists('pnpm-lock.yaml')) warnings.push('pnpm-lock.yaml is missing. Commit it for reproducible public builds.');

if (exists('.gitignore')) {
  const gitignore = read('.gitignore');
  if (/^\s*\/?pnpm-lock\.yaml\s*$/m.test(gitignore)) blockers.push('.gitignore must not ignore pnpm-lock.yaml.');
  for (const required of ['pass-*/', 'pass-*.zip', '.pass-backups/', '*.bak', '*.tmp']) {
    if (!gitignore.includes(required)) warnings.push(`.gitignore should include ${required}`);
  }
}

if (exists('.env.example')) {
  const env = read('.env.example');
  if (!/PUBLIC_SPARK_HUB_URL\s*=\s*["']\/hub["']/.test(env)) {
    blockers.push('.env.example should default PUBLIC_SPARK_HUB_URL to "/hub" for one-domain beta topology.');
  }
  if (hasUncommentedLocalHub(env)) blockers.push('.env.example contains an uncommented localhost Hub URL.');
}

const runtimeFiles = files.filter((file) => {
  if (!/\.(svelte|ts|js|mjs|json|css|html|md|env|example)$/i.test(file)) return false;
  if (file.startsWith('src/scripts/')) return false;
  if (file === '.env.example') return false;
  return true;
});

for (const file of runtimeFiles) {
  const text = read(file);
  if (/localhost:5174/.test(text)) blockers.push(`${file} contains a hard-coded local Hub URL.`);
  if (/SPARK_STUDIO_WRITE_ENABLED\s*=\s*true/.test(text)) blockers.push(`${file} enables studio write mode in public source.`);
}

console.log('Karyra Spark repository hygiene audit');
console.log('======================================');
console.log(`Entries scanned: ${files.length}`);
console.log(`Warnings: ${warnings.length}`);
console.log(`Blockers: ${blockers.length}`);

if (warnings.length) {
  console.log('\nWarnings:');
  for (const warning of warnings.slice(0, 80)) console.log(`- ${warning}`);
  if (warnings.length > 80) console.log(`- ...and ${warnings.length - 80} more warnings`);
}

if (blockers.length) {
  console.error('\nBlockers:');
  for (const blocker of blockers.slice(0, 120)) console.error(`- ${blocker}`);
  if (blockers.length > 120) console.error(`- ...and ${blockers.length - 120} more blockers`);
  process.exit(1);
}

console.log('\nNo hard blockers found.');

