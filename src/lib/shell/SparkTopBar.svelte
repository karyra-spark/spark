<script lang="ts">
  import SparkAccountMenu from '$ui/SparkAccountMenu.svelte';
  import SparkBrand from '$lib/ui/SparkBrand.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
  import SparkNotificationCenter from '$ui/SparkNotificationCenter.svelte';
  import SparkThemeToggle from '$ui/SparkThemeToggle.svelte';
  import { sparkMessages } from '$lib/messaging/spark-messaging-model';
  import { appState } from '$lib/state/app-state.svelte';
  import { betaSession } from '$state/beta-session-state.svelte';
  import { messageState } from '$state/message-state.svelte';

  const signedIn = $derived(Boolean(betaSession.user));
  const unreadMessages = $derived(signedIn ? sparkMessages.filter((message) => !messageState.readMessageIds.includes(message.id)).length : 0);
</script>

<header class="spark-topbar production-topbar topbar-v35b1">
  <SparkBrand />

  <a class="spark-topbar-center production-search-hint production-next-action" href="/core" aria-label="Mulai dari Core Beginner">
    <SparkIcon name="book-open" size={16} />
    <span>Mulai dari Core Beginner</span>
  </a>

  <div class="spark-topbar-actions">
    {#if signedIn}
      <SparkNotificationCenter />
      <a class="spark-icon-btn inbox-trigger" href="/inbox" aria-label="Pesan">
        <SparkIcon name="messages" size={18} />
        {#if unreadMessages > 0}<span class="inbox-count">{unreadMessages}</span>{/if}
      </a>
      <div class="desktop-only"><SparkThemeToggle compact /></div>
      <a class="spark-icon-btn desktop-only" href="/settings" aria-label="Pengaturan"><SparkIcon name="settings" size={18} /></a>
      <div class="desktop-only"><SparkAccountMenu /></div>
    {:else}
      <div class="desktop-only"><SparkThemeToggle compact /></div>
      <a class="spark-btn secondary desktop-only" href="/login">Masuk untuk Lanjutkan</a>
    {/if}

    <button class="spark-icon-btn mobile-only" type="button" aria-label="Menu" aria-expanded={appState.mobileMenuOpen} onclick={() => (appState.mobileMenuOpen = !appState.mobileMenuOpen)}>
      <SparkIcon name="menu" size={20} />
    </button>
  </div>
</header>
