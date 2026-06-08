#!/usr/bin/env node
import { readFileSync } from 'node:fs';

function read(path) {
  return readFileSync(path, 'utf8');
}

const checks = [];
function expect(path, label, predicate) {
  const text = read(path);
  if (!predicate(text)) checks.push(`${path} — ${label}`);
}

expect('package.json', 'missing audit:learning-flow script', (text) => text.includes('"audit:learning-flow"'));
expect('src/routes/+layout.svelte', 'missing core/lab flow stylesheet import', (text) => text.includes('core-lab-flow.css'));
expect('src/lib/ui/SparkCoreLevelingFlow.svelte', 'Core exam gate not installed', (text) => text.includes('level-exam-gate') && text.includes('remainingForLevel(selectedLevel)'));
expect('src/lib/ui/SparkCoreLevelingFlow.svelte', 'Core hero still points directly to exam', (text) => !text.includes('href="#core-level-exam">Kerjakan ujian'));
expect('src/lib/ui/SparkLabLevelingFlow.svelte', 'Lab exam gate not installed', (text) => text.includes('level-exam-gate') && text.includes('remainingForLevel(selectedLevel)'));
expect('src/lib/ui/SparkLabLevelingFlow.svelte', 'Lab hero still points directly to exam', (text) => !text.includes('href="#lab-level-exam">Kerjakan ujian'));
expect('src/lib/ui/SparkLevelExamCard.svelte', 'Exam retry flow not installed', (text) => text.includes('resetLevelExam') && text.includes('Ulangi Setelah Review'));

console.log('Spark core/lab flow audit');
console.log('====================================');

if (checks.length) {
  console.error('\nBlockers:');
  for (const check of checks) console.error(`- ${check}`);
  process.exit(1);
}

console.log('No hard blockers found.');
