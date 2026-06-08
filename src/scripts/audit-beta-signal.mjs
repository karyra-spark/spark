import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blockers = [];

const componentPath = path.join(root, 'src/lib/ui/SparkBetaBanner.svelte');
const shellPath = path.join(root, 'src/lib/shell/SparkAppShell.svelte');
const layoutPath = path.join(root, 'src/routes/+layout.svelte');
const cssPath = path.join(root, 'src/lib/styles/beta-signal.css');
const pkgPath = path.join(root, 'package.json');

if (!fs.existsSync(componentPath)) blockers.push('Missing SparkBetaBanner component.');
if (!fs.existsSync(cssPath)) blockers.push('Missing beta signal CSS.');

const shell = fs.existsSync(shellPath) ? fs.readFileSync(shellPath, 'utf8') : '';
if (!shell.includes('SparkBetaBanner')) blockers.push('SparkAppShell must import/render SparkBetaBanner.');

const layout = fs.existsSync(layoutPath) ? fs.readFileSync(layoutPath, 'utf8') : '';
if (!layout.includes('beta-signal.css')) blockers.push('Root layout must import beta signal CSS.');

const component = fs.existsSync(componentPath) ? fs.readFileSync(componentPath, 'utf8') : '';
if (!component.includes('BETA 0.1')) blockers.push('Spark beta banner must show BETA 0.1.');
if (!component.includes('Starknet')) blockers.push('Spark beta banner must mention staged Starknet integration.');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
if (!pkg.scripts?.['audit:beta-signal']) blockers.push('package.json must include audit:beta-signal script.');

if (blockers.length) {
  console.error('Spark beta signal audit failed:');
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log('Spark beta signal audit OK.');
