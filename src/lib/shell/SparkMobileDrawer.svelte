<script lang="ts">
  import { goto } from '$app/navigation';
  import { fade, fly } from 'svelte/transition';
  import { sparkMessages } from '$lib/messaging/spark-messaging-model';
  import { appState, pushToast } from '$state/app-state.svelte';
  import { betaSession, getModeLabel, logoutBetaSession } from '$state/beta-session-state.svelte';
  import { messageState } from '$state/message-state.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
  import SparkThemeToggle from '$ui/SparkThemeToggle.svelte';

  let loggingOut = $state(false);
  const unreadMessages = $derived(sparkMessages.filter((message) => !messageState.readMessageIds.includes(message.id)).length);

  const accountLinks = $derived(
    betaSession.user
      ? [
          { href: '/passport', icon: 'passport', title: 'Lihat Passport', copy: 'Lihat bukti belajar dan langkah berikutnya' },
          { href: '/profile', icon: 'user-round', title: 'Edit Profil', copy: 'Kelola identitas belajarmu' },
          { href: '/inbox', icon: 'messages', title: 'Lihat Pesan', copy: unreadMessages > 0 ? `${unreadMessages} pesan baru` : 'Arahan belajar dan kabar penting' },
          { href: '/settings', icon: 'settings', title: 'Pengaturan Akun', copy: 'Atur tampilan dan ritme belajar' }
        ]
      : [
          { href: '/login', icon: 'login', title: 'Masuk untuk Lanjutkan', copy: 'Lanjutkan progres belajarmu' },
          { href: '/register', icon: 'user-plus', title: 'Buat Akun Gratis', copy: 'Mulai bangun Passport dari dasar' },
          { href: '/core', icon: 'book-open', title: 'Mulai Core Beginner', copy: 'Mulai dari lesson pertama' }
        ]
  );

  const utilityLinks = [
    { href: '/help', icon: 'help', title: 'Bantuan', copy: 'Panduan singkat' },
    { href: '/faq', icon: 'faq', title: 'FAQ', copy: 'Pertanyaan umum' },
    { href: '/terms', icon: 'shield', title: 'Ketentuan', copy: 'Aturan penggunaan' }
  ];

  function close() {
    appState.mobileMenuOpen = false;
  }

  async function logout() {
    if (loggingOut) return;
    loggingOut = true;
    await logoutBetaSession();
    close();
    pushToast({ title: 'Keluar dari akun', copy: 'Akunmu sudah keluar dengan aman.', tone: 'info' });
    await goto('/');
    loggingOut = false;
  }
</script>

{#if appState.mobileMenuOpen}
  <button class="spark-mobile-scrim" transition:fade type="button" aria-label="Tutup menu" onclick={close}></button>

  <aside class="spark-mobile-drawer production-drawer pass35b2-drawer" transition:fly={{ x: 24, duration: 160 }} aria-label="Menu Spark">
    <div class="drawer-head production-drawer-head pass35b2-drawer-head">
      <strong>Menu Spark</strong>
      <button type="button" aria-label="Tutup menu" onclick={close}><SparkIcon name="x" size={17} /></button>
    </div>

    <div class="drawer-account-card production-drawer-account pass35b2-drawer-account">
      {#if betaSession.user}
        <span>{betaSession.user.name.slice(0, 1)}</span>
        <div>
          <strong>{betaSession.user.name}</strong>
          <small>{getModeLabel(betaSession.user.mode)}</small>
        </div>
      {:else}
        <span><SparkIcon name="sparkles" size={17} /></span>
        <div>
          <strong>Karyra Spark</strong>
          <small>Belajar bertahap dengan ritme aman</small>
        </div>
      {/if}
    </div>

    <div class="production-drawer-theme pass35b2-drawer-theme">
      <span>Tampilan</span>
      <SparkThemeToggle />
    </div>

    <nav class="drawer-link-stack production-drawer-links pass35b2-drawer-links" aria-label="Menu utama">
      {#each accountLinks as link}
        <a href={link.href} onclick={close}>
          <span><SparkIcon name={link.icon} size={17} /></span>
          <div><strong>{link.title}</strong><small>{link.copy}</small></div>
          <SparkIcon name="chevron-right" size={14} />
        </a>
      {/each}

      {#each utilityLinks as link}
        <a href={link.href} onclick={close}>
          <span><SparkIcon name={link.icon} size={17} /></span>
          <div><strong>{link.title}</strong><small>{link.copy}</small></div>
          <SparkIcon name="chevron-right" size={14} />
        </a>
      {/each}

      {#if betaSession.user}
        <button class="drawer-logout" type="button" onclick={logout} disabled={loggingOut}>
          <span><SparkIcon name="logout" size={17} /></span>
          <div><strong>{loggingOut ? 'Mengeluarkan...' : 'Keluar dari Akun'}</strong></div>
          <SparkIcon name="chevron-right" size={14} />
        </button>
      {/if}
    </nav>
  </aside>
{/if}

<style>
  .spark-mobile-scrim {
    min-width: 0;
    min-height: 0;
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    appearance: none;
    -webkit-appearance: none;
    cursor: default;
    -webkit-tap-highlight-color: transparent;
  }

  @media (max-width: 980px) {
    .spark-mobile-scrim {
      position: fixed;
      inset: 0;
      z-index: 58;
      display: block;
      background: rgba(2, 6, 23, 0.42);
    }
  }
</style>
