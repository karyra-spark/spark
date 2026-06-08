<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { sparkNavItems } from '$lib/content/spark-navigation';
  import { sparkMessages } from '$lib/messaging/spark-messaging-model';
  import { appState } from '$state/app-state.svelte';
  import { betaSession, getModeLabel, logoutBetaSession } from '$state/beta-session-state.svelte';
  import { messageState } from '$state/message-state.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';

  const drawerLinks = sparkNavItems.filter((item) => item.key !== 'gateway');
  const unreadMessages = $derived(sparkMessages.filter((message) => !messageState.readMessageIds.includes(message.id)).length);

  function close() {
    appState.mobileMenuOpen = false;
  }

  function logout() {
    logoutBetaSession();
    close();
  }
</script>

{#if appState.mobileMenuOpen}
  <button class="spark-mobile-scrim" transition:fade type="button" aria-label="Tutup menu" onclick={close}></button>

  <aside class="spark-mobile-drawer" transition:fly={{ x: 28, duration: 180 }}>
    <div class="drawer-head">
      <strong>Menu Spark</strong>
      <button type="button" aria-label="Tutup menu" onclick={close}><SparkIcon name="x" size={18} /></button>
    </div>

    <div class="drawer-account-card">
      {#if betaSession.user}
        <span>{betaSession.user.name.slice(0, 1)}</span>
        <div>
          <strong>{betaSession.user.name}</strong>
          <small>{betaSession.user.handle} · {getModeLabel(betaSession.user.mode)}</small>
        </div>
      {:else}
        <span><SparkIcon name="sparkles" size={18} /></span>
        <div>
          <strong>Mulai dari Spark</strong>
          <small>Belajar blockchain dan Starknet dengan jalur yang aman.</small>
        </div>
      {/if}
    </div>

    {#if !betaSession.user}
      <a href="/login" onclick={close}>
        <span><SparkIcon name="login" size={18} /></span>
        <div><strong>Masuk</strong><small>Lanjutkan perjalanan belajarmu.</small></div>
      </a>
    {:else}
      <a href="/dashboard" onclick={close}>
        <span><SparkIcon name="dashboard" size={18} /></span>
        <div><strong>Dashboard</strong><small>Ruang belajar hari ini.</small></div>
      </a>
    {/if}

    <a href="/inbox" onclick={close}>
      <span><SparkIcon name="messages" size={18} /></span>
      <div><strong>Pesan</strong><small>{unreadMessages > 0 ? `${unreadMessages} pesan belum dibaca` : 'Semua pesan sudah dibaca'}</small></div>
    </a>

    {#each drawerLinks as link}
      <a href={link.href} onclick={close}>
        <span><SparkIcon name={link.icon} size={18} /></span>
        <div><strong>{link.label}</strong><small>{link.copy}</small></div>
      </a>
    {/each}

    <a href="/studio" onclick={close}>
      <span><SparkIcon name="clipboard" size={18} /></span>
      <div><strong>Studio</strong><small>Edit teks, pesan, resource, dan halaman trust.</small></div>
    </a>

    {#if betaSession.user}
      <button class="drawer-logout" type="button" onclick={logout}>
        <span><SparkIcon name="logout" size={18} /></span>
        <div><strong>Keluar</strong><small>Tutup akses akun di perangkat ini.</small></div>
      </button>
    {/if}
  </aside>
{/if}
