#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const stylesRoot = join(root, 'src/lib/styles');
const failures = [];

function walk(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (full.endsWith('.css')) files.push(full);
  }
  return files;
}

for (const file of walk(stylesRoot)) {
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    if (line.includes(':global(')) {
      failures.push(`${relative(root, file)}:${index + 1} contains :global(...) in global CSS. Use a normal global selector instead.`);
    }
  });
}

console.log('Spark CSS global selector audit');
console.log('===========================================');
console.log(`CSS files scanned: ${walk(stylesRoot).length}`);

if (failures.length) {
  console.error('\nBlockers:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('\nNo :global(...) selector found in global CSS files.');
