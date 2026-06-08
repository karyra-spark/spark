import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const blockers = [];
const warnings = [];

const ignoredDirs = new Set([
  '.git',
  'node_modules',
  'build',
  '.svelte-kit',
  'dist',
  'coverage'
]);

function rel(file) {
  return path.relative(root, file).replaceAll(path.sep, '/');
}

function isTextFile(file) {
  return /\.(svelte|ts|js|mjs|json|md|css|html|yml|yaml|toml|txt|env|example|gitignore)$/i.test(file);
}

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const relative = rel(full);

    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) continue;
      out.push(full);
      await walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

const entries = await walk(root);

for (const full of entries) {
  const relative = rel(full);
  const base = path.basename(relative);
  const info = await stat(full);
  const isDir = info.isDirectory();

  if (/^pass-[^/]+/.test(relative)) {
    blockers.push(`${relative} looks like a local pass folder/file. Keep pass artifacts outside the public repo.`);
  }

  if (/\.zip$/i.test(relative) && /pass|patch|helper|backup/i.test(relative)) {
    blockers.push(`${relative} looks like a local pass or patch archive.`);
  }

  if (relative === '.pass-backups' || relative.startsWith('.pass-backups/')) {
    blockers.push(`${relative} is a local backup artifact and must not be public.`);
  }

  if (relative === '.backup' || relative.startsWith('.backup/')) {
    blockers.push(`${relative} is a local backup artifact and must not be public.`);
  }

  if (/^(helper|scratch|tmp|temp)(\.|-|_)/i.test(base) || /^helper\.txt$/i.test(base)) {
    blockers.push(`${relative} looks like a helper/scratch file.`);
  }

  if (/\.log$/i.test(relative)) {
    blockers.push(`${relative} is a log file.`);
  }

  if (/^\.env(\.|$)/.test(relative) && relative !== '.env.example') {
    blockers.push(`${relative} is an environment file. Only .env.example belongs in the public repo.`);
  }

  if (/\.(pem|key|p12|pfx)$/i.test(relative)) {
    blockers.push(`${relative} looks like a credential/private key file.`);
  }

  if (/pass-\d|pass68|pass-68/i.test(relative) && !relative.includes('docs/repository/PUBLIC_REPO_CLEANUP_PLAN.md')) {
    warnings.push(`${relative} still uses pass-based naming. Consolidate or rename in a later public cleanup pass.`);
  }

  if (!isDir && isTextFile(relative)) {
    const text = await readFile(full, 'utf8').catch(() => '');
    const lower = text.toLowerCase();

    if (relative.startsWith('src/') && /localhost:5174|localhost:5175|127\.0\.0\.1:5174/.test(text)) {
      blockers.push(`${relative} contains a hard-coded local Hub URL in source code.`);
    }

    if (/api[_-]?key\s*=|secret\s*=|private[_-]?key\s*=|access[_-]?token\s*=|bearer\s+[a-z0-9._-]{20,}/i.test(text)) {
      blockers.push(`${relative} may contain a secret-like value.`);
    }

    if (lower.includes('chatgpt') || lower.includes('openai generated')) {
      warnings.push(`${relative} mentions ChatGPT/OpenAI generation. Remove meta-build notes from public docs/code if not intentional.`);
    }

    if (relative.startsWith('docs/') && /private grant|grant strategy|budget note|budget_notes|internal only/i.test(text)) {
      warnings.push(`${relative} may contain private grant planning language. Keep strategy/budget docs outside the public repo.`);
    }
  }
}

console.log('Karyra Spark public repository audit');
console.log('====================================');
console.log(`Entries scanned: ${entries.length}`);

if (warnings.length > 0) {
  console.log('\nWarnings:');
  for (const warning of warnings) console.log(`- ${warning}`);
} else {
  console.log('\nWarnings: none');
}

if (blockers.length > 0) {
  console.log('\nBlockers:');
  for (const blocker of blockers) console.log(`- ${blocker}`);
  process.exit(1);
}

console.log('\nBlockers: none');
