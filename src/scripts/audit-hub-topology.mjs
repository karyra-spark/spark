#!/usr/bin/env node
import { readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const checks = [];
const blockers = [];

function read(path) {
  const full = join(root, path);
  statSync(full);
  return readFileSync(full, 'utf8');
}

function assert(condition, message) {
  checks.push(message);
  if (!condition) blockers.push(message);
}

const envText = read('src/lib/config/spark-env.ts');
const topologyText = read('src/lib/config/spark-topology.ts');
const packageText = read('package.json');

assert(!envText.includes('localhost:5174'), 'Spark env must not fall back to localhost Hub URL.');
assert(envText.includes("PUBLIC_SPARK_HUB_URL") && envText.includes("default('/hub')"), 'Spark Hub default should be /hub for one-domain beta topology.');
assert(topologyText.includes('normalizeHubSuffix') && topologyText.includes('joinPath'), 'Spark topology should preserve /hub base path.');
assert(topologyText.includes("if (base.startsWith('/'))"), 'Spark topology should support relative /hub base path.');
assert(packageText.includes('audit:hub-topology'), 'package.json should expose audit:hub-topology.');

console.log('Spark Hub topology audit');
console.log('========================');
for (const check of checks) console.log(`- ${check}`);

if (blockers.length) {
  console.error('\nBlockers:');
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log('\nNo hard blockers found.');
