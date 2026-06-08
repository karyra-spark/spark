import { sparkModules } from '$content/spark-content';
import {
  getMyLabAttempts,
  getMyLessonProgress,
  isExpectedSessionMiss,
  recordCoreCheckpointResult,
  recordLabAttempt,
  saveLessonProgress,
  type SparkBackendLevel
} from '$lib/api/spark-progress-api';
import { enqueueSyncEvent } from '$lib/sync/sync-event-queue.svelte';

export type ExperienceLevel = 'unknown' | 'beginner' | 'guided' | 'explorer';
export type BackendSyncStatus = 'idle' | 'hydrating' | 'saving' | 'synced' | 'offline' | 'error';

const STORAGE_KEY = 'karyra-spark-learning-state-v3';

export const learningState = $state({
  learnerId: '',
  onboardingComplete: false,
  experience: 'unknown' as ExperienceLevel,
  activeLessonSlug: sparkModules[0].lessons[0].slug,
  completedLessonSlugs: [] as string[],
  completedLabIds: [] as string[],
  expandedModuleIds: [sparkModules[0].id] as string[],
  bookmarkSlugs: [] as string[],
  checkpointAnswers: {} as Record<string, { optionId: string; correct: boolean }>,
  notes: {} as Record<string, string>,
  walletStatus: 'not-required' as 'not-required' | 'ready' | 'connected',
  lastSavedAt: '',
  lastSyncedAt: '',
  backendHydrated: false,
  backendSyncStatus: 'idle' as BackendSyncStatus,
  backendSyncMessage: ''
});

export type LearningSnapshot = typeof learningState;

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function currentBackendLevel(): SparkBackendLevel {
  if (learningState.experience === 'explorer') return 'advanced';
  if (learningState.experience === 'guided') return 'intermediate';
  return 'beginner';
}

function setBackendSync(status: BackendSyncStatus, message = '') {
  learningState.backendSyncStatus = status;
  learningState.backendSyncMessage = message;
}

function handleSyncError(error: unknown) {
  if (isExpectedSessionMiss(error)) {
    setBackendSync('idle', 'Masuk untuk menyimpan progress ke akun Spark.');
    return;
  }

  const message = error instanceof Error ? error.message : 'Progress belum bisa disinkronkan ke Spark API.';
  setBackendSync('offline', message);
}

async function syncLessonCompletion(slug: string, wasCompleted: boolean) {
  setBackendSync('saving');
  try {
    await saveLessonProgress(slug, {
      level: currentBackendLevel(),
      status: 'completed',
      progress_percent: 100,
      completed: true,
      payload: {
        source: 'spark-web.learning.completeLesson',
        slug,
        was_completed_before: wasCompleted,
        synced_at: new Date().toISOString()
      }
    });
    markSynced();
    setBackendSync('synced');
  } catch (error) {
    handleSyncError(error);
  }
}

async function syncCheckpointAnswer(slug: string, optionId: string, correct: boolean) {
  setBackendSync('saving');
  try {
    await recordCoreCheckpointResult(`${slug}-checkpoint`, {
      lesson_id: slug,
      level: currentBackendLevel(),
      score: correct ? 100 : 0,
      passed: correct,
      payload: {
        source: 'spark-web.learning.answerCheckpoint',
        lesson_slug: slug,
        option_id: optionId,
        correct,
        synced_at: new Date().toISOString()
      }
    });
    markSynced();
    setBackendSync('synced');
  } catch (error) {
    handleSyncError(error);
  }
}

async function syncLabCompletion(id: string, wasCompleted: boolean) {
  setBackendSync('saving');
  try {
    await recordLabAttempt({
      lab_id: id,
      level: currentBackendLevel(),
      status: 'passed',
      score: 100,
      safety_score: 100,
      payload: {
        source: 'spark-web.lab.completeLab',
        lab_id: id,
        was_completed_before: wasCompleted,
        synced_at: new Date().toISOString()
      }
    });
    markSynced();
    setBackendSync('synced');
  } catch (error) {
    handleSyncError(error);
  }
}

export async function hydrateLearningBackendSnapshot() {
  if (typeof window === 'undefined') return;

  setBackendSync('hydrating');
  try {
    const [progress, labs] = await Promise.all([getMyLessonProgress(), getMyLabAttempts()]);

    const completedLessons = progress.items
      .filter((item) => item.status === 'completed' || item.completed_at)
      .map((item) => item.lesson_id);

    const completedLabs = labs.items
      .filter((item) => item.status === 'passed' || item.completed_at)
      .map((item) => item.lab_id);

    learningState.completedLessonSlugs = unique([...learningState.completedLessonSlugs, ...completedLessons]);
    learningState.completedLabIds = unique([...learningState.completedLabIds, ...completedLabs]);
    learningState.backendHydrated = true;
    markSynced();
    saveLearningSnapshot();
    setBackendSync('synced');
  } catch (error) {
    learningState.backendHydrated = true;
    handleSyncError(error);
  }
}

export function setLearnerIdentity(learnerId: string) {
  learningState.learnerId = learnerId;
}

export function setExperience(level: ExperienceLevel) {
  learningState.experience = level;
  enqueueSyncEvent({
    name: 'learning.mode.changed',
    entity: 'learning',
    action: 'mode.changed',
    subjectId: level,
    payload: { mode: level }
  });
}

export function completeOnboarding() {
  learningState.onboardingComplete = true;
}

export function resetOnboarding() {
  learningState.onboardingComplete = false;
  learningState.experience = 'unknown';
}

export function toggleModule(moduleId: string) {
  if (learningState.expandedModuleIds.includes(moduleId)) {
    learningState.expandedModuleIds = learningState.expandedModuleIds.filter((id) => id !== moduleId);
  } else {
    learningState.expandedModuleIds = [...learningState.expandedModuleIds, moduleId];
  }
}

export function completeLesson(slug: string) {
  const wasCompleted = learningState.completedLessonSlugs.includes(slug);
  if (!wasCompleted) {
    learningState.completedLessonSlugs = [...learningState.completedLessonSlugs, slug];
  }
  learningState.activeLessonSlug = slug;
  enqueueSyncEvent({
    name: 'learning.lesson.completed',
    entity: 'learning',
    action: 'lesson.completed',
    subjectId: slug,
    payload: { slug, wasCompleted }
  });
  void syncLessonCompletion(slug, wasCompleted);
}

export function completeLab(id: string) {
  const wasCompleted = learningState.completedLabIds.includes(id);
  if (!wasCompleted) {
    learningState.completedLabIds = [...learningState.completedLabIds, id];
  }
  enqueueSyncEvent({
    name: 'lab.simulation.completed',
    entity: 'lab',
    action: 'simulation.completed',
    subjectId: id,
    payload: { id, wasCompleted }
  });
  void syncLabCompletion(id, wasCompleted);
}

export function toggleBookmark(slug: string) {
  const wasSaved = learningState.bookmarkSlugs.includes(slug);
  if (wasSaved) {
    learningState.bookmarkSlugs = learningState.bookmarkSlugs.filter((item) => item !== slug);
  } else {
    learningState.bookmarkSlugs = [...learningState.bookmarkSlugs, slug];
  }
  enqueueSyncEvent({
    name: 'learning.bookmark.toggled',
    entity: 'learning',
    action: 'bookmark.toggled',
    subjectId: slug,
    payload: { slug, saved: !wasSaved }
  });
}

export function setLessonNote(slug: string, note: string) {
  learningState.notes = { ...learningState.notes, [slug]: note };
  enqueueSyncEvent({
    name: 'learning.note.changed',
    entity: 'learning',
    action: 'note.changed',
    subjectId: slug,
    payload: { slug, hasNote: Boolean(note.trim()) }
  });
}

export function answerCheckpoint(slug: string, optionId: string, correct: boolean) {
  learningState.checkpointAnswers = {
    ...learningState.checkpointAnswers,
    [slug]: { optionId, correct }
  };

  void syncCheckpointAnswer(slug, optionId, correct);
  if (correct) completeLesson(slug);
}

export function getCompletedLessonCount() {
  return learningState.completedLessonSlugs.length;
}

export function getTotalLessonCount() {
  return sparkModules.reduce((total, module) => total + module.lessons.length, 0);
}

export function getLearningProgressPercent() {
  const total = getTotalLessonCount();
  if (total === 0) return 0;
  return Math.round((getCompletedLessonCount() / total) * 100);
}

export function getReadinessScore() {
  const lessonScore = Math.min(50, getCompletedLessonCount() * 8);
  const checkpointScore = Math.min(20, Object.values(learningState.checkpointAnswers).filter((answer) => answer.correct).length * 5);
  const labScore = Math.min(20, learningState.completedLabIds.length * 8);
  const walletScore = learningState.walletStatus === 'connected' ? 10 : learningState.walletStatus === 'ready' ? 5 : 0;
  return Math.min(100, lessonScore + checkpointScore + labScore + walletScore);
}

export function getRecommendedModuleId() {
  if (learningState.experience === 'explorer' && getCompletedLessonCount() >= 2) return 'starknet-entry';
  if (learningState.experience === 'guided' && getCompletedLessonCount() >= 1) return 'wallet-security';
  if (learningState.completedLabIds.length > 0) return 'starknet-entry';
  return 'blockchain-foundation';
}

export function getRecommendedLessonSlug() {
  for (const module of sparkModules) {
    for (const lesson of module.lessons) {
      if (!learningState.completedLessonSlugs.includes(lesson.slug)) {
        return lesson.slug;
      }
    }
  }
  return sparkModules[0].lessons[0].slug;
}

export function createLearningSnapshot() {
  return {
    learnerId: learningState.learnerId,
    onboardingComplete: learningState.onboardingComplete,
    experience: learningState.experience,
    activeLessonSlug: learningState.activeLessonSlug,
    completedLessonSlugs: learningState.completedLessonSlugs,
    completedLabIds: learningState.completedLabIds,
    expandedModuleIds: learningState.expandedModuleIds,
    bookmarkSlugs: learningState.bookmarkSlugs,
    checkpointAnswers: learningState.checkpointAnswers,
    notes: learningState.notes,
    walletStatus: learningState.walletStatus,
    lastSavedAt: new Date().toISOString(),
    lastSyncedAt: learningState.lastSyncedAt,
    backendHydrated: learningState.backendHydrated,
    backendSyncStatus: learningState.backendSyncStatus,
    backendSyncMessage: learningState.backendSyncMessage
  };
}

export function restoreLearningSnapshot() {
  if (typeof window === 'undefined') return;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const snapshot = JSON.parse(raw) as Partial<ReturnType<typeof createLearningSnapshot>>;

    if (snapshot.learnerId && snapshot.learnerId !== 'local-learner') learningState.learnerId = snapshot.learnerId;
    if (typeof snapshot.onboardingComplete === 'boolean') learningState.onboardingComplete = snapshot.onboardingComplete;
    if (snapshot.experience) learningState.experience = snapshot.experience;
    if (snapshot.activeLessonSlug) learningState.activeLessonSlug = snapshot.activeLessonSlug;
    if (Array.isArray(snapshot.completedLessonSlugs)) learningState.completedLessonSlugs = snapshot.completedLessonSlugs;
    if (Array.isArray(snapshot.completedLabIds)) learningState.completedLabIds = snapshot.completedLabIds;
    if (Array.isArray(snapshot.expandedModuleIds)) learningState.expandedModuleIds = snapshot.expandedModuleIds;
    if (Array.isArray(snapshot.bookmarkSlugs)) learningState.bookmarkSlugs = snapshot.bookmarkSlugs;
    if (snapshot.checkpointAnswers) learningState.checkpointAnswers = snapshot.checkpointAnswers;
    if (snapshot.notes) learningState.notes = snapshot.notes;
    if (snapshot.walletStatus) learningState.walletStatus = snapshot.walletStatus;
    if (snapshot.lastSavedAt) learningState.lastSavedAt = snapshot.lastSavedAt;
    if (snapshot.lastSyncedAt) learningState.lastSyncedAt = snapshot.lastSyncedAt;
    if (typeof snapshot.backendHydrated === 'boolean') learningState.backendHydrated = snapshot.backendHydrated;
  } catch {
    // Ignore corrupted local snapshot.
  }
}

export function saveLearningSnapshot() {
  if (typeof window === 'undefined') return;
  const snapshot = createLearningSnapshot();
  learningState.lastSavedAt = snapshot.lastSavedAt;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

export function markSynced() {
  learningState.lastSyncedAt = new Date().toISOString();
}
