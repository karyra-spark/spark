import { appState, pushToast } from '$state/app-state.svelte';
import { betaSession } from '$state/beta-session-state.svelte';
import { gatewayState } from '$state/gateway-state.svelte';
import { learningState } from '$state/learning-state.svelte';
import { messageState } from '$state/message-state.svelte';
import { themeState } from '$state/theme-state.svelte';
import { sparkModules } from '$content/spark-content';
import { resetLevelingState } from '$lib/leveling/leveling-state.svelte';
import { socialSeedComments, socialSeedPosts } from '$lib/social/social-model';
import { socialState } from '$lib/social/social-state.svelte';
import { clearSyncQueue, enqueueSyncEvent } from './sync-event-queue.svelte';
import { getAllLocalResetKeys, getProgressResetKeys } from './sync-storage-registry';
import type { LocalResetMode } from './sync-types';

function clearStorageKeys(keys: string[]) {
  if (typeof window === 'undefined') return;
  for (const key of keys) window.localStorage.removeItem(key);
}

function clearCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
}

function resetLearningMemory() {
  learningState.learnerId = '';
  learningState.onboardingComplete = false;
  learningState.experience = 'unknown';
  learningState.activeLessonSlug = sparkModules[0]?.lessons[0]?.slug ?? '';
  learningState.completedLessonSlugs = [];
  learningState.completedLabIds = [];
  learningState.expandedModuleIds = sparkModules[0]?.id ? [sparkModules[0].id] : [];
  learningState.bookmarkSlugs = [];
  learningState.checkpointAnswers = {};
  learningState.notes = {};
  learningState.walletStatus = 'not-required';
  learningState.lastSavedAt = '';
  learningState.lastSyncedAt = '';
}

function resetGatewayMemory() {
  gatewayState.registeredWorkshopIds = [];
  gatewayState.savedHubResourceIds = [];
  gatewayState.dismissedBridgeIds = [];
  gatewayState.lastSavedAt = '';
}

function resetMessageMemory() {
  messageState.readNotificationIds = [];
  messageState.readMessageIds = [];
  messageState.savedMessageIds = [];
  messageState.activeMessageFilter = 'semua';
}

function resetSocialMemory() {
  socialState.ready = true;
  socialState.activeFilter = 'all';
  socialState.followedProfileIds = [];
  socialState.mutedProfileIds = [];
  socialState.posts = structuredClone(socialSeedPosts);
  socialState.comments = structuredClone(socialSeedComments);
  socialState.events = [];
}

function resetSessionMemory() {
  betaSession.user = null;
  betaSession.ready = true;
}

function resetThemeMemory() {
  themeState.preference = 'system';
  themeState.resolved = 'light';
}

export function resetLocalSparkData(mode: LocalResetMode = 'progress-only') {
  const isAllLocal = mode === 'all-local';
  const keys = isAllLocal ? getAllLocalResetKeys() : getProgressResetKeys();

  clearStorageKeys(keys);
  if (isAllLocal) clearCookie('karyra-spark-cookie-choice-v1');

  resetLearningMemory();
  resetLevelingState();
  resetGatewayMemory();
  resetMessageMemory();
  resetSocialMemory();
  clearSyncQueue();

  if (isAllLocal) {
    resetSessionMemory();
    resetThemeMemory();
  }

  enqueueSyncEvent({
    name: 'system.local.reset',
    entity: 'system',
    action: mode,
    subjectId: mode,
    payload: { mode, clearedKeys: keys.length },
    source: 'local'
  });

  appState.mobileMenuOpen = false;
  pushToast({
    title: isAllLocal ? 'Data Spark dihapus' : 'Perjalanan belajar dimulai ulang',
    copy: isAllLocal
      ? 'Spark kembali seperti pertama kali dibuka di perangkat ini.'
      : 'Progress belajar, ujian level, diskusi, pesan, dan data belajar tersimpan sudah dikosongkan.',
    tone: 'success'
  });

  return { mode, clearedKeys: keys };
}
