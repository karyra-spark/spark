import { readFileSync, existsSync } from 'node:fs';

const required = [
  'src/lib/styles/pass-68k-desktop-layout-repair.css',
  'src/scripts/audit-pass68k-desktop-layout.mjs',
  'docs/content/pass-68k-desktop-layout-repair.md',
];

const blockers = [];
const warnings = [];

for (const file of required) {
  if (!existsSync(file)) blockers.push(`Missing required file: ${file}`);
}

const layoutPath = 'src/routes/+layout.svelte';
const pkgPath = 'package.json';
const cssPath = 'src/lib/styles/pass-68k-desktop-layout-repair.css';

if (existsSync(layoutPath)) {
  const layout = readFileSync(layoutPath, 'utf8');
  if (!layout.includes("import '$lib/styles/pass-68k-desktop-layout-repair.css';")) {
    blockers.push('Desktop repair stylesheet is not imported in src/routes/+layout.svelte');
  }
  const repairIndex = layout.indexOf('pass-68k-desktop-layout-repair.css');
  const priorIndex = layout.indexOf('pass-68e-passport-explainability-preview.css');
  if (priorIndex !== -1 && repairIndex !== -1 && repairIndex < priorIndex) {
    blockers.push('Desktop repair stylesheet must be imported after pass 68 styles so it can safely override desktop layout.');
  }
} else {
  blockers.push('Missing src/routes/+layout.svelte');
}

if (existsSync(pkgPath)) {
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  if (pkg.scripts?.['audit:pass68k'] !== 'node src/scripts/audit-pass68k-desktop-layout.mjs') {
    blockers.push('package.json is missing script audit:pass68k');
  }
} else {
  blockers.push('Missing package.json');
}

if (existsSync(cssPath)) {
  const css = readFileSync(cssPath, 'utf8');
  const mustContain = [
    '@media (min-width: 981px)',
    '.landing-hero-v26 h1',
    '.landing-section-intro h2',
    '.spark-hero h1',
    '.landing-flow-track',
  ];
  for (const needle of mustContain) {
    if (!css.includes(needle)) blockers.push(`Desktop repair CSS missing expected selector/token: ${needle}`);
  }
  if (css.includes(':global(')) blockers.push('Do not use Svelte :global(...) syntax inside global CSS files.');
  if (css.includes('font-size:clamp(52px,7.4vw,112px)') || css.includes('clamp(52px, 7.4vw, 112px)')) {
    blockers.push('Desktop repair CSS must not reintroduce oversized pass 26 hero typography.');
  }
  if (!css.includes('max-width: 820px !important')) warnings.push('Hero copy max width guard not found; desktop headings may become too wide.');
}

console.log('Spark Pass 68K desktop layout audit');
console.log('====================================');
console.log(`Blockers: ${blockers.length}`);
console.log(`Warnings: ${warnings.length}`);

if (warnings.length) {
  console.log('\nWarnings:');
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (blockers.length) {
  console.log('\nBlockers:');
  for (const blocker of blockers) console.log(`- ${blocker}`);
  process.exit(1);
}

console.log('\nOK: desktop layout repair is installed.');
