import { existsSync } from 'node:fs';
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
  'coverage',
  '.pnpm-store'
]);

function rel(file) {
  return path.relative(root, file).replaceAll(path.sep, '/');
}

function isTextFile(file) {
  return /(?:^|\/)(?:README|LICENSE|CONTRIBUTING)(?:\.[a-z]+)?$/i.test(file)
    || /\.(svelte|ts|js|mjs|json|md|css|html|yml|yaml|toml|txt|env|example|gitignore|dockerfile)$/i.test(file);
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

function pushUnique(list, message) {
  if (!list.includes(message)) list.push(message);
}

function checkRequiredFiles() {
  const required = ['package.json', '.gitignore', '.env.example', 'src/routes/+layout.svelte'];
  for (const file of required) {
    if (!existsSync(path.join(root, file))) {
      blockers.push(`${file} is required for a public Spark frontend repository.`);
    }
  }
}

async function checkPackageJson() {
  const packagePath = path.join(root, 'package.json');
  if (!existsSync(packagePath)) return;

  const pkg = JSON.parse(await readFile(packagePath, 'utf8'));
  if (!pkg.packageManager?.startsWith('pnpm@')) {
    blockers.push('package.json must declare packageManager with pnpm.');
  }

  const scripts = pkg.scripts ?? {};
  const requiredScripts = ['check', 'build', 'audit:repo-hygiene', 'audit:all'];
  for (const script of requiredScripts) {
    if (!scripts[script]) blockers.push(`package.json is missing script ${script}.`);
  }

  if (scripts['audit:public-repo'] && !scripts['audit:public-repo'].includes('audit-repository-hygiene.mjs')) {
    warnings.push('audit:public-repo should be an alias to audit-repository-hygiene.mjs.');
  }

  const packageJsonText = await readFile(packagePath, 'utf8');
  if (/audit:pass\d|audit-pass\d|pass-\d/i.test(packageJsonText)) {
    blockers.push('package.json still exposes pass-based script names. Use semantic audit names.');
  }
}

async function checkGitignore() {
  const gitignorePath = path.join(root, '.gitignore');
  if (!existsSync(gitignorePath)) return;

  const lines = (await readFile(gitignorePath, 'utf8')).split(/\r?\n/).map((line) => line.trim());
  const requiredPatterns = [
    '.env',
    '.env.*',
    '!.env.example',
    'pass-*/',
    'pass-*.zip',
    '.pass-backups/',
    '*.log',
    'package-lock.json',
    'yarn.lock',
    'bun.lockb'
  ];

  for (const pattern of requiredPatterns) {
    if (!lines.includes(pattern)) warnings.push(`.gitignore should include ${pattern}.`);
  }

  if (lines.includes('pnpm-lock.yaml')) {
    blockers.push('.gitignore must not ignore pnpm-lock.yaml; pnpm lockfile should be public and reproducible.');
  }
}

async function checkEnvExample() {
  const envPath = path.join(root, '.env.example');
  if (!existsSync(envPath)) return;

  const text = await readFile(envPath, 'utf8');
  if (!/PUBLIC_SPARK_HUB_URL=["']?\/hub["']?/.test(text)) {
    warnings.push('.env.example should show PUBLIC_SPARK_HUB_URL="/hub" for the one-domain beta topology.');
  }

  if (/SECRET|PRIVATE_KEY|ACCESS_TOKEN|API_KEY/i.test(text)) {
    blockers.push('.env.example must not include secret-like variable examples for public frontend configuration.');
  }
}

checkRequiredFiles();
await checkPackageJson();
await checkGitignore();
await checkEnvExample();

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

  if (/\.(bak|orig|rej|tmp|swp)$/i.test(relative)) {
    blockers.push(`${relative} looks like a temporary or backup file.`);
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

  if (/^(package-lock\.json|yarn\.lock|bun\.lockb)$/.test(relative)) {
    blockers.push(`${relative} should not be committed; this repo uses pnpm.`);
  }

  if (/^src\/scripts\/audit-pass\d/i.test(relative) || /^src\/lib\/styles\/pass-\d/i.test(relative)) {
    blockers.push(`${relative} still uses pass-based public code naming.`);
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

    if (lower.includes('openai generated')) {
      warnings.push(`${relative} mentions generated-by metadata. Remove meta-build notes from public docs/code if not intentional.`);
    }

    if (relative.startsWith('docs/') && /private grant|grant strategy|budget note|budget_notes|internal only/i.test(text)) {
      warnings.push(`${relative} may contain private grant planning language. Keep strategy/budget docs outside the public repo.`);
    }
  }
}

console.log('Karyra Spark repository hygiene audit');
console.log('======================================');
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
