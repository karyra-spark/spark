<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import SparkBottomNav from './SparkBottomNav.svelte';
  import SparkMobileDrawer from './SparkMobileDrawer.svelte';
  import SparkRouteProgress from '$ui/SparkRouteProgress.svelte';
  import SparkSidebar from './SparkSidebar.svelte';
  import SparkToast from './SparkToast.svelte';
  import SparkTopBar from './SparkTopBar.svelte';
  import SparkCookieNotice from '$ui/SparkCookieNotice.svelte';
  import SparkSimpleFooter from '$ui/SparkSimpleFooter.svelte';
  import { appState, markPersistenceReady } from '$lib/state/app-state.svelte';
  import { initTheme, themeState } from '$lib/state/theme-state.svelte';
  import { betaSession, hydrateBackendSession, restoreBetaSession, saveBetaSession } from '$state/beta-session-state.svelte';
  import { gatewayState, restoreGatewaySnapshot, saveGatewaySnapshot } from '$state/gateway-state.svelte';
  import { learningState, restoreLearningSnapshot, saveLearningSnapshot } from '$state/learning-state.svelte';
  import { messageState, restoreMessageState, saveMessageState } from '$state/message-state.svelte';

  type Props = { children: Snippet };
  let { children }: Props = $props();

  const signedIn = $derived(Boolean(betaSession.user));

  onMount(() => {
    initTheme();
    restoreBetaSession();
    restoreLearningSnapshot();
    restoreGatewaySnapshot();
    restoreMessageState();
    markPersistenceReady();
    void hydrateBackendSession();
  });

  $effect(() => {
    if (!appState.persistenceReady) return;
    betaSession.user?.id;
    betaSession.user?.name;
    betaSession.user?.handle;
    betaSession.user?.status;
    saveBetaSession(betaSession.user);
  });

  $effect(() => {
    if (!appState.persistenceReady) return;
    messageState.readNotificationIds.length;
    messageState.readMessageIds.length;
    messageState.savedMessageIds.length;
    messageState.activeMessageFilter;
    saveMessageState();
  });

  $effect(() => {
    if (!appState.persistenceReady) return;
    learningState.onboardingComplete;
    learningState.experience;
    learningState.activeLessonSlug;
    learningState.completedLessonSlugs.length;
    learningState.completedLabIds.length;
    learningState.expandedModuleIds.length;
    learningState.bookmarkSlugs.length;
    Object.keys(learningState.checkpointAnswers).length;
    Object.keys(learningState.notes).length;
    learningState.walletStatus;
    saveLearningSnapshot();
  });

  $effect(() => {
    if (!appState.persistenceReady) return;
    gatewayState.registeredWorkshopIds.length;
    gatewayState.savedHubResourceIds.length;
    gatewayState.dismissedBridgeIds.length;
    saveGatewaySnapshot();
  });
</script>

<div
  class="spark-app"
  data-theme={themeState.resolved}
  data-theme-preference={themeState.preference}
  data-preview={appState.previewMode}
  data-auth={signedIn ? 'user' : 'guest'}
>
  <SparkRouteProgress />
  <SparkTopBar />
  <div class="spark-shell">
    <SparkSidebar />
    <main class="spark-main">{@render children()}</main>
  </div>
  <SparkSimpleFooter />
  {#if signedIn}
    <SparkBottomNav />
  {/if}
  <SparkMobileDrawer />
  <SparkToast />
  <SparkCookieNotice />
</div>
