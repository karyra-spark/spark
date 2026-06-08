<script lang="ts">
  import { goto } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import SparkButton from './SparkButton.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { betaSession, getModeLabel, logoutBetaSession } from '$state/beta-session-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  let open = $state(false);
  let loggingOut = $state(false);

  function close() {
    open = false;
  }

  async function logout() {
    if (loggingOut) return;
    loggingOut = true;
    await logoutBetaSession();
    close();
    pushToast({
      title: 'Kamu sudah keluar',
      copy: 'Progress yang tersimpan di akun tetap aman.',
      tone: 'info'
    });
    await goto('/');
    loggingOut = false;
  }
</script>

<div class="spark-account-menu">
  {#if betaSession.user}
    <button class="spark-account-trigger" type="button" aria-label="Buka menu akun" onclick={() => (open = !open)}>
      <span>{betaSession.user.name.slice(0, 1)}</span>
      <strong>{betaSession.user.name}</strong>
    </button>
  {:else}
    <SparkButton href="/login" variant="secondary">
      <SparkIcon name="login" size={16} />
      Masuk untuk Lanjutkan
    </SparkButton>
  {/if}

  {#if open && betaSession.user}
    <button class="account-menu-scrim" transition:fade type="button" aria-label="Tutup menu akun" onclick={close}></button>
    <div class="account-menu-panel" transition:fly={{ y: 8, duration: 160 }}>
      <div class="account-menu-head">
        <span>{betaSession.user.name.slice(0, 1)}</span>
        <div>
          <strong>{betaSession.user.name}</strong>
          <small>{betaSession.user.handle}</small>
        </div>
      </div>

      <div class="account-menu-badges">
        <SparkTrustBadge label="Akun aktif" tone="safe" />
        <SparkTrustBadge label={getModeLabel(betaSession.user.mode)} tone="beta" />
      </div>

      <nav class="account-menu-links" aria-label="Menu akun">
        <a href="/passport" onclick={close}><SparkIcon name="passport" size={16} /> Lihat Passport Saya</a>
        <a href="/profile" onclick={close}><SparkIcon name="user-round" size={16} /> Kelola Profil</a>
        <a href="/settings" onclick={close}><SparkIcon name="settings" size={16} /> Atur Spark</a>
        <button type="button" onclick={logout} disabled={loggingOut}><SparkIcon name="logout" size={16} /> {loggingOut ? 'Menutup akun...' : 'Keluar dari Akun'}</button>
      </nav>
    </div>
  {/if}
</div>
