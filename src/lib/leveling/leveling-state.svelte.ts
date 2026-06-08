import { enqueueSyncEvent } from '$lib/sync/sync-event-queue.svelte';
import { coreLevelExams, getLevelIndex, labLevelExams, LEVEL_ORDER } from './leveling-model';
import type { LevelExam, LevelResult, LevelStatus, SparkLevel, SparkTrack } from './leveling-types';

const STORAGE_KEY = 'karyra-spark-leveling-state-v1';

export const levelingState = $state({
  ready: false,
  selectedCoreLevel: 'beginner' as SparkLevel,
  selectedLabLevel: 'beginner' as SparkLevel,
  draftAnswers: {} as Record<string, Record<string, string>>,
  results: {} as Record<string, LevelResult>
});

function examList(track: SparkTrack) {
  return track === 'core' ? coreLevelExams : labLevelExams;
}

export function setSelectedLevel(track: SparkTrack, level: SparkLevel) {
  if (track === 'core') levelingState.selectedCoreLevel = level;
  if (track === 'lab') levelingState.selectedLabLevel = level;
}

export function answerLevelExam(examId: string, questionId: string, optionId: string) {
  levelingState.draftAnswers = {
    ...levelingState.draftAnswers,
    [examId]: {
      ...(levelingState.draftAnswers[examId] ?? {}),
      [questionId]: optionId
    }
  };
}

export function getDraftAnswers(examId: string) {
  return levelingState.draftAnswers[examId] ?? {};
}

export function calculateExamScore(exam: LevelExam, answers: Record<string, string>) {
  const correct = exam.questions.filter((question) => {
    const selected = answers[question.id];
    return question.options.some((option) => option.id === selected && option.correct);
  }).length;

  return exam.questions.length ? Math.round((correct / exam.questions.length) * 100) : 0;
}

export function getExamResult(examId: string) {
  return levelingState.results[examId];
}

export function submitLevelExam(exam: LevelExam) {
  const answers = getDraftAnswers(exam.id);
  const score = calculateExamScore(exam, answers);
  const previous = levelingState.results[exam.id];
  const result: LevelResult = {
    examId: exam.id,
    track: exam.track,
    level: exam.level,
    answers,
    score,
    passed: score >= exam.passingScore,
    attempts: (previous?.attempts ?? 0) + 1,
    completedAt: new Date().toISOString()
  };

  levelingState.results = { ...levelingState.results, [exam.id]: result };

  enqueueSyncEvent({
    name: exam.track === 'core' ? 'learning.level.exam.submitted' : 'lab.level.exam.submitted',
    entity: exam.track === 'core' ? 'learning' : 'lab',
    action: 'level.exam.submitted',
    subjectId: exam.id,
    payload: {
      examId: exam.id,
      track: exam.track,
      level: exam.level,
      score,
      passed: result.passed,
      attempts: result.attempts
    }
  });

  saveLevelingSnapshot();
  return result;
}

export function resetLevelExam(examId: string) {
  const nextDrafts = { ...levelingState.draftAnswers };
  const nextResults = { ...levelingState.results };
  delete nextDrafts[examId];
  delete nextResults[examId];
  levelingState.draftAnswers = nextDrafts;
  levelingState.results = nextResults;
  saveLevelingSnapshot();
}

export function hasPassedExam(track: SparkTrack, level: SparkLevel) {
  const exam = examList(track).find((item) => item.level === level);
  return Boolean(exam && levelingState.results[exam.id]?.passed);
}

export function getTrackLevelStatus(track: SparkTrack, level: SparkLevel): LevelStatus {
  if (hasPassedExam(track, level)) return 'passed';

  const index = getLevelIndex(level);
  if (index <= 0) return 'available';

  const previousLevel = LEVEL_ORDER[index - 1];
  if (!previousLevel) return 'locked';
  return hasPassedExam(track, previousLevel) ? 'available' : 'locked';
}

export function getHighestPassedLevel(track: SparkTrack): SparkLevel | null {
  const passed = LEVEL_ORDER.filter((level) => hasPassedExam(track, level));
  return passed.length ? passed[passed.length - 1] : null;
}

export function getReadinessLevelFromExams(): SparkLevel | null {
  const bothPassed = LEVEL_ORDER.filter((level) => hasPassedExam('core', level) && hasPassedExam('lab', level));
  return bothPassed.length ? bothPassed[bothPassed.length - 1] : null;
}

export function createLevelingSnapshot() {
  return {
    selectedCoreLevel: levelingState.selectedCoreLevel,
    selectedLabLevel: levelingState.selectedLabLevel,
    draftAnswers: levelingState.draftAnswers,
    results: levelingState.results
  };
}

export function restoreLevelingSnapshot() {
  if (typeof window === 'undefined' || levelingState.ready) return;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const snapshot = JSON.parse(raw) as Partial<ReturnType<typeof createLevelingSnapshot>>;
      if (snapshot.selectedCoreLevel) levelingState.selectedCoreLevel = snapshot.selectedCoreLevel;
      if (snapshot.selectedLabLevel) levelingState.selectedLabLevel = snapshot.selectedLabLevel;
      if (snapshot.draftAnswers) levelingState.draftAnswers = snapshot.draftAnswers;
      if (snapshot.results) levelingState.results = snapshot.results;
    }
  } catch {
    // Keep default leveling state when local data cannot be read.
  }

  levelingState.ready = true;
}

export function saveLevelingSnapshot() {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(createLevelingSnapshot()));
}

export function resetLevelingState() {
  levelingState.selectedCoreLevel = 'beginner';
  levelingState.selectedLabLevel = 'beginner';
  levelingState.draftAnswers = {};
  levelingState.results = {};
  saveLevelingSnapshot();
}
