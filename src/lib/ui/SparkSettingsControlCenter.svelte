<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkDataControlCenter from './SparkDataControlCenter.svelte';
  import { pushToast } from '$state/app-state.svelte';
  import { learningState, setExperience, type ExperienceLevel } from '$state/learning-state.svelte';
  import { setThemePreference, themeState, type ThemePreference } from '$state/theme-state.svelte';

  const themes: { key: ThemePreference; title: string; icon: string }[] = [
    { key: 'system', title: 'Ikuti perangkat', icon: 'settings' },
    { key: 'light', title: 'Terang', icon: 'sun' },
    { key: 'dark', title: 'Gelap', icon: 'moon' }
  ];

  const learningModes: { key: ExperienceLevel; title: string; copy: string; icon: string }[] = [
    { key: 'beginner', title: 'Pemula', copy: 'Penjelasan pelan dan bertahap.', icon: 'sparkles' },
    { key: 'guided', title: 'Terarah', copy: 'Langkah belajar lebih rapi.', icon: 'target' },
    { key: 'explorer', title: 'Penjelajah', copy: 'Lebih bebas membuka Lab dan Hub.', icon: 'compass' }
  ];

  let guidanceEnabled = $state(true);
  let remindersEnabled = $state(true);
  let safetyTipsEnabled = $state(true);
  let confirmResetOpen = $state(false);

  const activeTheme = $derived(themes.find((theme) => theme.key === themeState.preference)?.title ?? 'Ikuti perangkat');
  const activeMode = $derived(learningModes.find((mode) => mode.key === learningState.experience)?.title ?? 'Pemula');

  function chooseTheme(theme: ThemePreference) {
    setThemePreference(theme);
    pushToast({ title: 'Tampilan disimpan', copy: 'Spark akan mengikuti pilihan tampilanmu.', tone: 'success' });
  }

  function chooseMode(mode: ExperienceLevel) {
    setExperience(mode);
    pushToast({ title: 'Ritme belajar disimpan', copy: 'Spark akan menyesuaikan arahan belajarmu.', tone: 'success' });
  }

  function toggleGuidance(key: 'guidance' | 'reminders' | 'safety') {
    if (key === 'guidance') guidanceEnabled = !guidanceEnabled;
    if (key === 'reminders') remindersEnabled = !remindersEnabled;
    if (key === 'safety') safetyTipsEnabled = !safetyTipsEnabled;
    pushToast({ title: 'Pilihan bantuan disimpan', copy: 'Arahan belajar akan mengikuti pilihanmu.', tone: 'success' });
  }

  function resetPreferences() {
    setThemePreference('system');
    setExperience('beginner');
    guidanceEnabled = true;
    remindersEnabled = true;
    safetyTipsEnabled = true;
    confirmResetOpen = false;
    pushToast({ title: 'Pengaturan dipulihkan', copy: 'Tampilan dan ritme belajar kembali ke pilihan awal.', tone: 'success' });
  }
</script>

<section class="settings-simple-hero pass40b-settings-hero">
  <div>
    <span class="spark-eyebrow">Pengaturan</span>
    <h1>Atur pengalaman belajarmu</h1>
    <p>Pilih tampilan, ritme belajar, dan bantuan yang paling nyaman.</p>
  </div>

  <aside class="settings-current-card pass40b-settings-current">
    <span><SparkIcon name="settings" size={20} /></span>
    <div>
      <strong>{activeTheme}</strong>
      <small>{activeMode}</small>
    </div>
  </aside>
</section>

<section class="settings-simple-layout pass40b-settings-layout">
  <SparkCard class="settings-simple-card pass40b-settings-card">
    <div class="settings-section-head pass40b-section-head">
      <span class="spark-eyebrow">Tampilan</span>
      <h2>Pilih tampilan layar.</h2>
    </div>

    <div class="settings-choice-row">
      {#each themes as theme}
        <button type="button" class:active={themeState.preference === theme.key} onclick={() => chooseTheme(theme.key)}>
          <span><SparkIcon name={theme.icon} size={18} /></span>
          <strong>{theme.title}</strong>
        </button>
      {/each}
    </div>
  </SparkCard>

  <SparkCard class="settings-simple-card pass40b-settings-card">
    <div class="settings-section-head pass40b-section-head">
      <span class="spark-eyebrow">Cara belajar</span>
      <h2>Pilih ritme belajar.</h2>
    </div>

    <div class="settings-mode-list">
      {#each learningModes as mode}
        <button type="button" class:active={learningState.experience === mode.key} onclick={() => chooseMode(mode.key)}>
          <span><SparkIcon name={mode.icon} size={18} /></span>
          <div>
            <strong>{mode.title}</strong>
            <small>{mode.copy}</small>
          </div>
        </button>
      {/each}
    </div>
  </SparkCard>

  <SparkCard class="settings-simple-card pass40b-settings-card">
    <div class="settings-section-head pass40b-section-head">
      <span class="spark-eyebrow">Bantuan</span>
      <h2>Pilih bantuan belajar.</h2>
    </div>

    <div class="settings-toggle-list">
      <button type="button" onclick={() => toggleGuidance('guidance')} class:active={guidanceEnabled}>
        <span><SparkIcon name="sparkles" size={17} /></span>
        <div><strong>Saran langkah berikutnya</strong><small>{guidanceEnabled ? 'Aktif' : 'Mati'}</small></div>
      </button>
      <button type="button" onclick={() => toggleGuidance('reminders')} class:active={remindersEnabled}>
        <span><SparkIcon name="bell" size={17} /></span>
        <div><strong>Pengingat belajar</strong><small>{remindersEnabled ? 'Aktif' : 'Mati'}</small></div>
      </button>
      <button type="button" onclick={() => toggleGuidance('safety')} class:active={safetyTipsEnabled}>
        <span><SparkIcon name="shield" size={17} /></span>
        <div><strong>Tips keamanan wallet</strong><small>{safetyTipsEnabled ? 'Aktif' : 'Mati'}</small></div>
      </button>
    </div>
  </SparkCard>

  <SparkDataControlCenter />

  <SparkCard class="settings-simple-card settings-link-card pass40b-settings-card">
    <div class="settings-section-head pass40b-section-head">
      <span class="spark-eyebrow">Akses cepat</span>
      <h2>Lanjutkan dari sini.</h2>
    </div>

    <div class="settings-link-list">
      <a href="/core"><SparkIcon name="book-open" size={16} /> Mulai Belajar</a>
      <a href="/profile"><SparkIcon name="user-round" size={16} /> Lihat Profil</a>
      <a href="/dashboard"><SparkIcon name="dashboard" size={16} /> Lihat Ringkasan</a>
      <a href="/help"><SparkIcon name="help" size={16} /> Buka Bantuan</a>
    </div>

    <div class="settings-reset-box pass40b-reset-box">
      <strong>Pulihkan pengaturan awal?</strong>
      <SparkButton variant="secondary" onclick={() => (confirmResetOpen = true)}>Pulihkan Pengaturan</SparkButton>
    </div>
  </SparkCard>
</section>

{#if confirmResetOpen}
  <button class="settings-modal-scrim" type="button" aria-label="Tutup dialog" onclick={() => (confirmResetOpen = false)}></button>
  <div class="settings-confirm-dialog" role="dialog" aria-modal="true" aria-label="Pulihkan pengaturan">
    <span><SparkIcon name="shield" size={22} /></span>
    <h2>Pulihkan pengaturan?</h2>
    <p>Tampilan, cara belajar, dan bantuan akan kembali ke pilihan awal.</p>
    <div>
      <SparkButton variant="ghost" onclick={() => (confirmResetOpen = false)}>Batal</SparkButton>
      <SparkButton onclick={resetPreferences}>Ya, pulihkan pengaturan</SparkButton>
    </div>
  </div>
{/if}

<style>
  .pass40b-settings-hero {
    align-items: center;
    gap: 14px;
    min-height: 0;
    padding-block: 8px 2px;
  }

  .pass40b-settings-hero h1 {
    margin-top: 6px;
  }

  .pass40b-settings-hero p {
    max-width: 56ch;
    margin-bottom: 0;
  }

  .pass40b-settings-current {
    grid-template-columns: 40px minmax(0, 1fr);
    align-items: center;
    min-height: 0;
    padding: 13px;
  }

  .pass40b-section-head {
    margin-bottom: 10px;
  }

  .pass40b-section-head h2 {
    margin-top: 4px;
  }

  .pass40b-reset-box {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
  }

  @media (max-width: 640px) {
    .pass40b-settings-hero {
      grid-template-columns: 1fr;
    }

    .pass40b-settings-current {
      width: 100%;
    }

    .pass40b-reset-box {
      grid-template-columns: 1fr;
    }
  }
</style>
