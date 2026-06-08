<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkPreviewToggle from '$shell/SparkPreviewToggle.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { betaSession, logoutBetaSession } from '$state/beta-session-state.svelte';
  import { learningState, resetOnboarding, setExperience } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';
  import { setThemePreference, themeState, type ThemePreference } from '$state/theme-state.svelte';

  const modes = [
    { key: 'beginner', label: 'Baru mulai', copy: 'Paling aman untuk pengguna lokal pemula.' },
    { key: 'guided', label: 'Terarah', copy: 'Lebih ringkas, tetap ada guardrail.' },
    { key: 'explorer', label: 'Penjelajah', copy: 'Cocok untuk jalur teknis bertahap.' }
  ] as const;

  const themes: { key: ThemePreference; label: string; icon: string }[] = [
    { key: 'light', label: 'Light', icon: 'sun' },
    { key: 'dark', label: 'Dark', icon: 'moon' },
    { key: 'system', label: 'System', icon: 'settings' }
  ];

  function resetLocalData() {
    if (typeof window === 'undefined') return;

    const confirmed = window.confirm('Reset semua data lokal Spark di perangkat ini?');
    if (!confirmed) return;

    [
      'karyra-spark-learning-state-v3',
      'karyra-spark-gateway-state-v1',
      'karyra-spark-beta-session-v1',
      'karyra-spark-message-state-v1'
    ].forEach((key) => window.localStorage.removeItem(key));

    logoutBetaSession();

    pushToast({
      title: 'Data lokal direset',
      copy: 'Halaman akan dimuat ulang agar state kembali bersih.',
      tone: 'warning'
    });

    window.setTimeout(() => window.location.reload(), 500);
  }

  function chooseTheme(theme: ThemePreference) {
    setThemePreference(theme);
    pushToast({
      title: 'Tema diperbarui',
      copy: `Tema Spark sekarang: ${theme}.`,
      tone: 'success'
    });
  }
</script>

<section class="settings-command-center">
  <div>
    <span class="spark-eyebrow">Settings</span>
    <h1>Kontrol aplikasi, bukan halaman preferensi kosong.</h1>
    <p>Atur tema, preview, mode belajar, session lokal, dan data perangkat dari satu pusat kendali yang mudah dipahami.</p>
  </div>

  <aside class="settings-session-card">
    <span><SparkIcon name={betaSession.user ? 'user-round' : 'login'} size={22} /></span>
    <div>
      <SparkTrustBadge label={betaSession.user ? 'Session aktif' : 'Guest'} tone={betaSession.user ? 'safe' : 'beta'} />
      <strong>{betaSession.user?.name ?? 'Belum masuk'}</strong>
      <small>{betaSession.user?.handle ?? 'Gunakan akun contoh lokal untuk mencoba Spark.'}</small>
    </div>
  </aside>
</section>

<section class="settings-grid">
  <SparkCard class="settings-panel-card large">
    <span class="spark-eyebrow">Tampilan</span>
    <h2>Preview dan tema.</h2>
    <p>Coba Spark di mode desktop/mobile dan pilih tema yang paling nyaman untuk presentasi atau penggunaan harian.</p>

    <div class="theme-choice-row">
      {#each themes as theme}
        <button type="button" class:active={themeState.preference === theme.key} onclick={() => chooseTheme(theme.key)}>
          <SparkIcon name={theme.icon} size={16} />
          <span>{theme.label}</span>
        </button>
      {/each}
    </div>

    <SparkPreviewToggle />
  </SparkCard>

  <SparkCard class="settings-panel-card">
    <span class="spark-eyebrow">Mode belajar</span>
    <h2>Jalur pengalaman.</h2>
    <p>Mode membantu rekomendasi, tetapi Spark tetap menjaga satu jalur utama agar pengguna tidak tersesat.</p>

    <div class="settings-mode-list">
      {#each modes as mode}
        <button type="button" class:active={learningState.experience === mode.key} onclick={() => setExperience(mode.key)}>
          <strong>{mode.label}</strong>
          <small>{mode.copy}</small>
        </button>
      {/each}
    </div>

    <SparkButton variant="ghost" onclick={resetOnboarding}>Tampilkan onboarding lagi</SparkButton>
  </SparkCard>

  <SparkCard class="settings-panel-card">
    <span class="spark-eyebrow">Akses cepat</span>
    <h2>Kembali ke flow utama.</h2>
    <p>Pengaturan tidak boleh membuat pengguna buntu.</p>

    <div class="settings-shortcut-list">
      <a href="/dashboard"><SparkIcon name="dashboard" size={16} /> Dashboard</a>
      <a href="/profile"><SparkIcon name="badge" size={16} /> Profile & Passport</a>
      <a href="/inbox"><SparkIcon name="messages" size={16} /> Inbox</a>
      <a href="/core"><SparkIcon name="book-open" size={16} /> Core</a>
    </div>
  </SparkCard>

  <SparkCard class="settings-panel-card danger">
    <span class="spark-eyebrow">Data lokal</span>
    <h2>Reset perangkat ini.</h2>
    <p>Gunakan ini untuk mengulang preview dari awal: session, progress, workshop, Hub resource, dan inbox lokal akan dibersihkan.</p>
    <SparkButton variant="secondary" onclick={resetLocalData}>Reset semua data lokal</SparkButton>
  </SparkCard>
</section>
