<script lang="ts">
  import { onMount } from 'svelte';
  import SparkButton from './SparkButton.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { pushToast } from '$state/app-state.svelte';
  import { learningState, resetOnboarding, setExperience, type ExperienceLevel } from '$state/learning-state.svelte';
  import { setThemePreference, themeState, type ThemePreference } from '$state/theme-state.svelte';

  type GuidanceKey = 'nextStep' | 'gentleReminder' | 'inboxPriority' | 'safetyCue';
  type ResetIntent = 'preferences' | 'progress' | null;
  type ExperienceChoice = Exclude<ExperienceLevel, 'unknown'>;

  const GUIDANCE_KEY = 'karyra-spark-guidance-preferences-v1';
  const resetProgressKeys = [
    'karyra-spark-learning-state-v3',
    'karyra-spark-gateway-state-v1',
    'karyra-spark-message-state-v1'
  ];

  const defaultGuidance: Record<GuidanceKey, boolean> = {
    nextStep: true,
    gentleReminder: true,
    inboxPriority: true,
    safetyCue: true
  };

  const themes: { key: ThemePreference; label: string; icon: string; copy: string; signal: string }[] = [
    {
      key: 'system',
      label: 'Ikuti perangkat',
      icon: 'settings',
      copy: 'Spark menyesuaikan tampilan dengan pengaturan layar kamu.',
      signal: 'Fleksibel'
    },
    {
      key: 'light',
      label: 'Terang',
      icon: 'sun',
      copy: 'Nyaman untuk belajar di ruang terang atau saat presentasi.',
      signal: 'Siang'
    },
    {
      key: 'dark',
      label: 'Gelap',
      icon: 'moon',
      copy: 'Lebih nyaman untuk malam, layar redup, atau sesi panjang.',
      signal: 'Malam'
    }
  ];

  const modes: { key: ExperienceChoice; label: string; icon: string; copy: string; signal: string }[] = [
    {
      key: 'beginner',
      label: 'Pemula',
      icon: 'sparkles',
      copy: 'Penjelasan dibuat lebih pelan dan istilah baru dibuka bertahap.',
      signal: 'Non-teknikal first'
    },
    {
      key: 'guided',
      label: 'Terarah',
      icon: 'target',
      copy: 'Spark membantu menjaga urutan belajar tetap rapi dan tidak melompat terlalu jauh.',
      signal: 'Jalur rapi'
    },
    {
      key: 'explorer',
      label: 'Penjelajah',
      icon: 'compass',
      copy: 'Lebih bebas mengeksplor modul, Lab, Community, dan Hub.',
      signal: 'Eksplorasi'
    }
  ];

  const guidanceOptions: { key: GuidanceKey; title: string; icon: string; copy: string }[] = [
    {
      key: 'nextStep',
      title: 'Saran langkah berikutnya',
      icon: 'target',
      copy: 'Tampilkan arahan kecil setelah kamu menyelesaikan materi atau latihan.'
    },
    {
      key: 'gentleReminder',
      title: 'Pengingat ringan',
      icon: 'bell',
      copy: 'Bantu kamu kembali ke jalur belajar tanpa terasa memaksa.'
    },
    {
      key: 'inboxPriority',
      title: 'Pesan penting di Inbox',
      icon: 'messages',
      copy: 'Prioritaskan update belajar, workshop, dan arahan penting.'
    },
    {
      key: 'safetyCue',
      title: 'Isyarat keamanan',
      icon: 'shield',
      copy: 'Tampilkan pengingat aman saat materi menyentuh wallet, aset, atau transaksi.'
    }
  ];

  const safetySignals = [
    {
      icon: 'shield',
      title: 'Seed phrase tetap pribadi',
      copy: 'Spark tidak pernah meminta seed phrase, private key, atau akses wallet pribadi untuk menyelesaikan materi belajar.'
    },
    {
      icon: 'flask-conical',
      title: 'Latihan sebelum aset nyata',
      copy: 'Materi wallet dan transaksi diarahkan sebagai ruang latihan sebelum kamu masuk ke pengalaman on-chain yang sebenarnya.'
    },
    {
      icon: 'lock',
      title: 'Kontrol ada di tanganmu',
      copy: 'Preferensi, arahan, dan progres latihan bisa kamu atur ulang kapan saja dari halaman ini.'
    }
  ];

  let guidance = $state<Record<GuidanceKey, boolean>>({ ...defaultGuidance });
  let resetIntent = $state<ResetIntent>(null);

  onMount(() => {
    restoreGuidancePreferences();
  });

  const activeTheme = $derived(themes.find((theme) => theme.key === themeState.preference) ?? themes[0]);
  const activeMode = $derived(modes.find((mode) => mode.key === learningState.experience));
  const activeModeLabel = $derived(activeMode?.label ?? 'Pemula');
  const guidanceActiveCount = $derived(Object.values(guidance).filter(Boolean).length);
  const guidanceLabel = $derived(guidanceActiveCount === guidanceOptions.length ? 'Aktif penuh' : `${guidanceActiveCount}/${guidanceOptions.length} aktif`);

  function restoreGuidancePreferences() {
    if (typeof window === 'undefined') return;

    try {
      const saved = window.localStorage.getItem(GUIDANCE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved) as Partial<Record<GuidanceKey, boolean>>;
      (Object.keys(defaultGuidance) as GuidanceKey[]).forEach((key) => {
        if (typeof parsed[key] === 'boolean') guidance[key] = parsed[key] ?? defaultGuidance[key];
      });
    } catch {
      guidance = { ...defaultGuidance };
    }
  }

  function saveGuidancePreferences() {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(GUIDANCE_KEY, JSON.stringify(guidance));
  }

  function chooseTheme(theme: ThemePreference) {
    setThemePreference(theme);
    const label = themes.find((item) => item.key === theme)?.label ?? 'Ikuti perangkat';
    pushToast({
      title: 'Tampilan diperbarui',
      copy: `Spark sekarang memakai mode ${label.toLowerCase()}.`,
      tone: 'success'
    });
  }

  function chooseMode(mode: ExperienceChoice) {
    setExperience(mode);
    const label = modes.find((item) => item.key === mode)?.label ?? 'Pemula';
    pushToast({
      title: 'Mode belajar diperbarui',
      copy: `Spark menyesuaikan arahan untuk mode ${label}.`,
      tone: 'success'
    });
  }

  function toggleGuidance(key: GuidanceKey) {
    guidance[key] = !guidance[key];
    saveGuidancePreferences();
    const option = guidanceOptions.find((item) => item.key === key);
    pushToast({
      title: guidance[key] ? 'Arahan diaktifkan' : 'Arahan dijeda',
      copy: option ? `${option.title} ${guidance[key] ? 'aktif' : 'tidak aktif'} sekarang.` : 'Preferensi arahan diperbarui.',
      tone: 'success'
    });
  }

  function replayIntro() {
    resetOnboarding();
    pushToast({
      title: 'Pengenalan Spark siap diulang',
      copy: 'Saat kamu kembali ke alur belajar, Spark akan membuka arahan awal lagi.',
      tone: 'success'
    });
  }

  function resetPreferences() {
    guidance = { ...defaultGuidance };
    saveGuidancePreferences();
    setThemePreference('system');
    setExperience('beginner');
    resetIntent = null;
    pushToast({
      title: 'Preferensi diatur ulang',
      copy: 'Tampilan, mode belajar, dan arahan kembali ke pengaturan nyaman.',
      tone: 'success'
    });
  }

  function resetLearningProgress() {
    if (typeof window === 'undefined') return;
    resetProgressKeys.forEach((key) => window.localStorage.removeItem(key));
    resetIntent = null;
    pushToast({
      title: 'Progres latihan dimulai ulang',
      copy: 'Spark menyiapkan perjalanan belajar dari awal.',
      tone: 'warning'
    });
    window.setTimeout(() => window.location.reload(), 650);
  }
</script>

<section class="settings-page" aria-labelledby="settings-title">
  <section class="settings-command-center">
    <div class="settings-command-copy">
      <span class="spark-eyebrow">Settings</span>
      <h1 id="settings-title">Atur Spark sesuai cara belajarmu.</h1>
      <p>
        Pilih tampilan, ritme arahan, mode belajar, dan kontrol keamanan agar pengalaman Spark terasa nyaman dari langkah pertama sampai siap menjelajah Hub.
      </p>
      <div class="settings-badge-row" aria-label="Fokus pengaturan Spark">
        <SparkTrustBadge label="Kontrol pengalaman" tone="safe" />
        <SparkTrustBadge label="Belajar aman" tone="target" />
        <SparkTrustBadge label="Siap digunakan" tone="local" />
      </div>
    </div>

    <aside class="settings-summary-card" aria-label="Pengaturan aktif">
      <div class="summary-card-head">
        <span><SparkIcon name="settings" size={20} /></span>
        <div>
          <small>Pengaturan aktif</small>
          <strong>Ringkasan pengalaman</strong>
        </div>
      </div>

      <div class="summary-list">
        <div>
          <span>Tampilan</span>
          <strong>{activeTheme.label}</strong>
        </div>
        <div>
          <span>Mode belajar</span>
          <strong>{activeModeLabel}</strong>
        </div>
        <div>
          <span>Arahan Spark</span>
          <strong>{guidanceLabel}</strong>
        </div>
      </div>
    </aside>
  </section>

  <section class="settings-layout">
    <aside class="settings-side-rail" aria-label="Navigasi ringkas settings">
      <a href="#appearance"><SparkIcon name="sun" size={16} /> Tampilan</a>
      <a href="#learning"><SparkIcon name="book-open" size={16} /> Pengalaman belajar</a>
      <a href="#guidance"><SparkIcon name="bell" size={16} /> Arahan</a>
      <a href="#safety"><SparkIcon name="shield" size={16} /> Keamanan</a>
      <a href="#reset"><SparkIcon name="lock" size={16} /> Pulihkan</a>
    </aside>

    <div class="settings-content-stack">
      <section id="appearance" class="settings-card settings-card-large">
        <div class="settings-section-head">
          <span class="settings-icon"><SparkIcon name="sun" size={18} /></span>
          <div>
            <span class="spark-eyebrow">Tampilan</span>
            <h2>Pilih suasana belajar yang paling nyaman.</h2>
            <p>Mode tampilan membantu Spark tetap enak dibaca di ruang terang, malam hari, atau mengikuti pengaturan layar kamu.</p>
          </div>
        </div>

        <div class="theme-choice-grid">
          {#each themes as theme}
            <button type="button" class:active={themeState.preference === theme.key} onclick={() => chooseTheme(theme.key)}>
              <span class="choice-icon"><SparkIcon name={theme.icon} size={18} /></span>
              <span>
                <strong>{theme.label}</strong>
                <small>{theme.copy}</small>
              </span>
              <em>{theme.signal}</em>
            </button>
          {/each}
        </div>
      </section>

      <section id="learning" class="settings-card">
        <div class="settings-section-head compact">
          <span class="settings-icon"><SparkIcon name="book-open" size={18} /></span>
          <div>
            <span class="spark-eyebrow">Pengalaman belajar</span>
            <h2>Sesuaikan ritme Spark.</h2>
            <p>Mode belajar memengaruhi cara Spark memberi arahan, membuka istilah baru, dan menghubungkan Core, Lab, Community, dan Hub.</p>
          </div>
        </div>

        <div class="mode-choice-list">
          {#each modes as mode}
            <button type="button" class:active={learningState.experience === mode.key || (learningState.experience === 'unknown' && mode.key === 'beginner')} onclick={() => chooseMode(mode.key)}>
              <span class="choice-icon"><SparkIcon name={mode.icon} size={18} /></span>
              <span>
                <strong>{mode.label}</strong>
                <small>{mode.copy}</small>
              </span>
              <em>{mode.signal}</em>
            </button>
          {/each}
        </div>

        <div class="settings-inline-action">
          <div>
            <strong>Ingin mengulang pengenalan awal?</strong>
            <small>Gunakan ini saat kamu ingin melihat kembali arahan pertama Spark.</small>
          </div>
          <SparkButton variant="secondary" onclick={replayIntro}>Ulangi pengenalan</SparkButton>
        </div>
      </section>

      <section id="guidance" class="settings-card">
        <div class="settings-section-head compact">
          <span class="settings-icon"><SparkIcon name="bell" size={18} /></span>
          <div>
            <span class="spark-eyebrow">Arahan & notifikasi</span>
            <h2>Pilih bantuan yang tetap terasa ringan.</h2>
            <p>Spark dapat memberi sinyal kecil agar kamu tidak bingung melanjutkan, tanpa membuat proses belajar terasa ramai.</p>
          </div>
        </div>

        <div class="guidance-list">
          {#each guidanceOptions as option}
            <div class="guidance-row">
              <span class="choice-icon"><SparkIcon name={option.icon} size={17} /></span>
              <div>
                <strong>{option.title}</strong>
                <small>{option.copy}</small>
              </div>
              <button
                type="button"
                class="settings-switch"
                class:active={guidance[option.key]}
                role="switch"
                aria-checked={guidance[option.key]}
                aria-label={`${option.title}: ${guidance[option.key] ? 'aktif' : 'tidak aktif'}`}
                onclick={() => toggleGuidance(option.key)}
              >
                <span class="switch-track"><span></span></span>
                <em>{guidance[option.key] ? 'Aktif' : 'Jeda'}</em>
              </button>
            </div>
          {/each}
        </div>
      </section>

      <section id="safety" class="settings-card safety-card">
        <div class="settings-section-head compact">
          <span class="settings-icon"><SparkIcon name="shield" size={18} /></span>
          <div>
            <span class="spark-eyebrow">Privasi & keamanan belajar</span>
            <h2>Belajar Web3 tanpa rasa terburu-buru.</h2>
            <p>Settings juga menjadi tempat untuk memastikan pengalaman belajar tetap aman, jelas, dan berada dalam kendalimu.</p>
          </div>
        </div>

        <div class="safety-signal-grid">
          {#each safetySignals as item}
            <article>
              <span><SparkIcon name={item.icon} size={17} /></span>
              <strong>{item.title}</strong>
              <small>{item.copy}</small>
            </article>
          {/each}
        </div>
      </section>

      <section class="settings-profile-bridge">
        <span class="settings-icon"><SparkIcon name="user-round" size={18} /></span>
        <div>
          <strong>Profile & Passport tetap punya ruang sendiri.</strong>
          <small>Identitas, avatar, koneksi teman, badge, dan readiness dikelola dari halaman Profile agar Settings tetap fokus pada kontrol pengalaman.</small>
        </div>
        <SparkButton href="/profile" variant="secondary">Buka Profile</SparkButton>
      </section>

      <section id="reset" class="settings-card reset-card">
        <div class="settings-section-head compact">
          <span class="settings-icon"><SparkIcon name="lock" size={18} /></span>
          <div>
            <span class="spark-eyebrow">Pulihkan pengalaman</span>
            <h2>Atur ulang hanya saat kamu benar-benar perlu.</h2>
            <p>Pilihan ini dipisahkan dari kontrol utama agar kamu tidak menekan aksi besar secara tidak sengaja.</p>
          </div>
        </div>

        <div class="reset-action-grid">
          <article>
            <div>
              <strong>Atur ulang preferensi</strong>
              <small>Mengembalikan tampilan, mode belajar, dan arahan ke pengaturan nyaman. Progres belajar tidak ikut terhapus.</small>
            </div>
            <SparkButton variant="secondary" onclick={() => (resetIntent = 'preferences')}>Atur ulang</SparkButton>
          </article>

          <article>
            <div>
              <strong>Mulai ulang progres latihan</strong>
              <small>Mengosongkan progres belajar, Lab, dan arahan perjalanan agar kamu bisa mengulang Spark dari awal.</small>
            </div>
            <SparkButton variant="ghost" onclick={() => (resetIntent = 'progress')}>Mulai ulang</SparkButton>
          </article>
        </div>
      </section>
    </div>
  </section>
</section>

{#if resetIntent}
  <div class="settings-modal-backdrop" role="presentation" onclick={() => (resetIntent = null)}>
    <section class="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-reset-title" onclick={(event) => event.stopPropagation()}>
      <span class="settings-icon modal-icon"><SparkIcon name={resetIntent === 'progress' ? 'lock' : 'settings'} size={20} /></span>

      {#if resetIntent === 'preferences'}
        <h2 id="settings-reset-title">Atur ulang preferensi?</h2>
        <p>Tampilan, mode belajar, dan arahan Spark akan kembali ke pengaturan nyaman. Progres belajar tetap tersimpan.</p>
        <div class="modal-actions">
          <SparkButton variant="ghost" onclick={() => (resetIntent = null)}>Batal</SparkButton>
          <SparkButton variant="secondary" onclick={resetPreferences}>Atur ulang</SparkButton>
        </div>
      {:else}
        <h2 id="settings-reset-title">Mulai ulang progres latihan?</h2>
        <p>Progres belajar, Lab, dan arahan perjalanan akan dikosongkan agar kamu bisa mengulang Spark dari awal. Profile dan Passport tetap punya ruang sendiri.</p>
        <div class="modal-actions">
          <SparkButton variant="ghost" onclick={() => (resetIntent = null)}>Batal</SparkButton>
          <SparkButton variant="secondary" onclick={resetLearningProgress}>Mulai ulang</SparkButton>
        </div>
      {/if}
    </section>
  </div>
{/if}

<style>
  .settings-page {
    display: grid;
    gap: 18px;
  }

  .settings-command-center {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
    gap: 20px;
    align-items: stretch;
    padding: clamp(24px, 4vw, 42px);
    border: 1px solid var(--spark-line);
    border-radius: 34px;
    background:
      radial-gradient(circle at 88% 18%, rgba(255, 128, 0, 0.16), transparent 28%),
      radial-gradient(circle at 12% 0%, rgba(31, 117, 255, 0.18), transparent 32%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(244, 248, 255, 0.94));
    box-shadow: var(--spark-shadow);
  }

  :global([data-theme='dark']) .settings-command-center {
    background:
      radial-gradient(circle at 88% 18%, rgba(255, 128, 0, 0.16), transparent 28%),
      radial-gradient(circle at 12% 0%, rgba(31, 117, 255, 0.18), transparent 32%),
      linear-gradient(135deg, rgba(9, 14, 48, 0.96), rgba(7, 10, 34, 0.92));
  }

  .settings-command-copy {
    position: relative;
    z-index: 1;
    max-width: 760px;
  }

  .settings-command-copy h1,
  .settings-card h2,
  .settings-modal h2 {
    margin: 8px 0 0;
    color: var(--spark-navy);
    letter-spacing: -0.065em;
    line-height: 0.98;
    font-weight: 950;
  }

  :global([data-theme='dark']) .settings-command-copy h1,
  :global([data-theme='dark']) .settings-card h2,
  :global([data-theme='dark']) .settings-modal h2 {
    color: #fff;
  }

  .settings-command-copy h1 {
    font-size: clamp(38px, 5vw, 70px);
  }

  .settings-command-copy p,
  .settings-section-head p,
  .settings-modal p {
    margin: 14px 0 0;
    max-width: 700px;
    color: var(--spark-muted);
    font-size: 16px;
    line-height: 1.7;
    font-weight: 600;
  }

  .settings-badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;
  }

  .settings-summary-card,
  .settings-card,
  .settings-side-rail,
  .settings-profile-bridge,
  .settings-modal {
    border: 1px solid var(--spark-line);
    background: var(--spark-card);
    box-shadow: 0 16px 40px rgba(5, 9, 78, 0.08);
  }

  .settings-summary-card {
    position: relative;
    z-index: 1;
    display: grid;
    align-content: space-between;
    gap: 18px;
    padding: 18px;
    border-radius: 28px;
  }

  .summary-card-head,
  .settings-section-head,
  .settings-profile-bridge,
  .guidance-row,
  .settings-inline-action,
  .reset-action-grid article {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
    align-items: start;
  }

  .summary-card-head > span,
  .settings-icon,
  .choice-icon {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 17px;
    color: var(--spark-blue-strong);
    background: #eff6ff;
  }

  :global([data-theme='dark']) .summary-card-head > span,
  :global([data-theme='dark']) .settings-icon,
  :global([data-theme='dark']) .choice-icon {
    color: #dbeafe;
    background: rgba(255, 255, 255, 0.08);
  }

  .summary-card-head small,
  .summary-list span,
  .choice-icon + span small,
  .guidance-row small,
  .settings-inline-action small,
  .settings-profile-bridge small,
  .reset-action-grid small,
  .safety-signal-grid small {
    color: var(--spark-muted);
    font-size: 12px;
    line-height: 1.45;
    font-weight: 650;
  }

  .summary-card-head strong,
  .summary-list strong,
  .settings-inline-action strong,
  .settings-profile-bridge strong,
  .reset-action-grid strong,
  .guidance-row strong,
  .safety-signal-grid strong {
    display: block;
    color: var(--spark-navy);
    font-weight: 920;
    letter-spacing: -0.035em;
  }

  :global([data-theme='dark']) .summary-card-head strong,
  :global([data-theme='dark']) .summary-list strong,
  :global([data-theme='dark']) .settings-inline-action strong,
  :global([data-theme='dark']) .settings-profile-bridge strong,
  :global([data-theme='dark']) .reset-action-grid strong,
  :global([data-theme='dark']) .guidance-row strong,
  :global([data-theme='dark']) .safety-signal-grid strong {
    color: #fff;
  }

  .summary-list {
    display: grid;
    gap: 10px;
  }

  .summary-list div {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    align-items: center;
    padding: 12px 13px;
    border-radius: 18px;
    background: rgba(248, 251, 255, 0.88);
    border: 1px solid rgba(148, 163, 184, 0.16);
  }

  :global([data-theme='dark']) .summary-list div {
    background: rgba(255, 255, 255, 0.05);
  }

  .settings-layout {
    display: grid;
    grid-template-columns: 230px minmax(0, 1fr);
    gap: 18px;
    align-items: start;
  }

  .settings-side-rail {
    position: sticky;
    top: 96px;
    display: grid;
    gap: 8px;
    padding: 12px;
    border-radius: 26px;
  }

  .settings-side-rail a {
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0 12px;
    border-radius: 16px;
    color: var(--spark-muted);
    font-size: 13px;
    font-weight: 850;
  }

  .settings-side-rail a:hover {
    color: var(--spark-blue-strong);
    background: #eff6ff;
  }

  :global([data-theme='dark']) .settings-side-rail a:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
  }

  .settings-content-stack {
    display: grid;
    gap: 16px;
    min-width: 0;
  }

  .settings-card,
  .settings-profile-bridge {
    padding: clamp(18px, 3vw, 24px);
    border-radius: 30px;
  }

  .settings-section-head.compact {
    align-items: start;
  }

  .settings-card h2 {
    font-size: clamp(28px, 3vw, 40px);
  }

  .theme-choice-grid,
  .mode-choice-list,
  .guidance-list,
  .reset-action-grid,
  .safety-signal-grid {
    display: grid;
    gap: 12px;
    margin-top: 18px;
  }

  .theme-choice-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .theme-choice-grid button,
  .mode-choice-list button {
    min-height: 118px;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
    align-items: start;
    position: relative;
    padding: 16px;
    text-align: left;
    border: 1px solid var(--spark-line);
    border-radius: 24px;
    color: inherit;
    background: rgba(248, 251, 255, 0.76);
    box-shadow: 0 10px 24px rgba(5, 9, 78, 0.06);
  }

  :global([data-theme='dark']) .theme-choice-grid button,
  :global([data-theme='dark']) .mode-choice-list button {
    background: rgba(255, 255, 255, 0.05);
  }

  .theme-choice-grid button.active,
  .mode-choice-list button.active {
    border-color: rgba(31, 117, 255, 0.46);
    background: rgba(239, 246, 255, 0.92);
    box-shadow: 0 18px 38px rgba(31, 117, 255, 0.14);
  }

  :global([data-theme='dark']) .theme-choice-grid button.active,
  :global([data-theme='dark']) .mode-choice-list button.active {
    background: rgba(31, 117, 255, 0.15);
  }

  .theme-choice-grid strong,
  .mode-choice-list strong {
    display: block;
    color: var(--spark-navy);
    font-size: 17px;
    font-weight: 930;
    letter-spacing: -0.04em;
  }

  :global([data-theme='dark']) .theme-choice-grid strong,
  :global([data-theme='dark']) .mode-choice-list strong {
    color: #fff;
  }

  .theme-choice-grid small,
  .mode-choice-list small {
    display: block;
    margin-top: 6px;
    color: var(--spark-muted);
    line-height: 1.45;
    font-weight: 650;
  }

  .theme-choice-grid em,
  .mode-choice-list em {
    grid-column: 1 / -1;
    justify-self: start;
    margin-top: 2px;
    padding: 6px 9px;
    border-radius: 999px;
    background: rgba(31, 117, 255, 0.1);
    color: var(--spark-blue-strong);
    font-size: 11px;
    font-style: normal;
    font-weight: 900;
  }

  .mode-choice-list button {
    min-height: 104px;
  }

  .settings-inline-action {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    margin-top: 16px;
    padding: 14px;
    border-radius: 22px;
    border: 1px solid rgba(31, 117, 255, 0.18);
    background: rgba(239, 246, 255, 0.74);
  }

  :global([data-theme='dark']) .settings-inline-action {
    background: rgba(255, 255, 255, 0.05);
  }

  .guidance-list {
    gap: 10px;
  }

  .guidance-row {
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    padding: 13px;
    border: 1px solid rgba(148, 163, 184, 0.16);
    border-radius: 22px;
    background: rgba(248, 251, 255, 0.76);
  }

  :global([data-theme='dark']) .guidance-row {
    background: rgba(255, 255, 255, 0.05);
  }

  .settings-switch {
    min-width: 94px;
    min-height: 42px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 0 10px;
    border: 1px solid var(--spark-line);
    border-radius: 999px;
    background: #fff;
    color: var(--spark-muted);
    font-weight: 900;
  }

  :global([data-theme='dark']) .settings-switch {
    background: rgba(255, 255, 255, 0.07);
  }

  .settings-switch em {
    font-style: normal;
    font-size: 12px;
  }

  .switch-track {
    display: inline-flex;
    align-items: center;
    width: 34px;
    height: 20px;
    padding: 2px;
    border-radius: 999px;
    background: rgba(148, 163, 184, 0.45);
  }

  .switch-track span {
    width: 16px;
    height: 16px;
    border-radius: 999px;
    background: #fff;
    box-shadow: 0 4px 10px rgba(5, 9, 78, 0.18);
    transition: transform 0.16s ease;
  }

  .settings-switch.active {
    color: var(--spark-blue-strong);
    border-color: rgba(31, 117, 255, 0.28);
  }

  .settings-switch.active .switch-track {
    background: var(--spark-blue-strong);
  }

  .settings-switch.active .switch-track span {
    transform: translateX(14px);
  }

  .safety-card {
    background:
      radial-gradient(circle at 88% 10%, rgba(34, 183, 122, 0.12), transparent 28%),
      var(--spark-card);
  }

  .safety-signal-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .safety-signal-grid article {
    min-height: 150px;
    padding: 16px;
    border: 1px solid rgba(34, 183, 122, 0.18);
    border-radius: 24px;
    background: rgba(240, 253, 244, 0.62);
  }

  :global([data-theme='dark']) .safety-signal-grid article {
    background: rgba(34, 183, 122, 0.08);
  }

  .safety-signal-grid article span {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 15px;
    color: var(--spark-green);
    background: rgba(34, 183, 122, 0.12);
  }

  .safety-signal-grid article strong {
    margin-top: 12px;
  }

  .safety-signal-grid article small {
    display: block;
    margin-top: 7px;
  }

  .settings-profile-bridge {
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
  }

  .reset-card {
    border-color: rgba(255, 128, 0, 0.22);
  }

  .reset-action-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .reset-action-grid article {
    grid-template-columns: minmax(0, 1fr);
    align-content: space-between;
    min-height: 158px;
    padding: 16px;
    border: 1px solid rgba(255, 128, 0, 0.18);
    border-radius: 24px;
    background: rgba(255, 247, 237, 0.68);
  }

  :global([data-theme='dark']) .reset-action-grid article {
    background: rgba(255, 128, 0, 0.08);
  }

  .reset-action-grid :global(.spark-btn) {
    justify-self: start;
  }

  .settings-modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 90;
    display: grid;
    place-items: center;
    padding: 18px;
    background: rgba(2, 6, 23, 0.55);
    backdrop-filter: blur(10px);
  }

  .settings-modal {
    width: min(460px, 100%);
    padding: 22px;
    border-radius: 28px;
  }

  .modal-icon {
    width: 48px;
    height: 48px;
  }

  .settings-modal h2 {
    font-size: 30px;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }

  @media (max-width: 980px) {
    .settings-page {
      gap: 14px;
    }

    .settings-command-center,
    .settings-layout,
    .theme-choice-grid,
    .safety-signal-grid,
    .reset-action-grid {
      grid-template-columns: 1fr;
    }

    .settings-command-center {
      padding: 24px 18px;
      border-radius: 28px;
    }

    .settings-command-copy h1 {
      font-size: clamp(34px, 10vw, 48px);
    }

    .settings-side-rail {
      position: static;
      display: flex;
      overflow-x: auto;
      padding: 8px;
      border-radius: 22px;
      scrollbar-width: none;
    }

    .settings-side-rail::-webkit-scrollbar {
      display: none;
    }

    .settings-side-rail a {
      flex: 0 0 auto;
      white-space: nowrap;
    }

    .settings-card,
    .settings-profile-bridge {
      padding: 18px;
      border-radius: 26px;
    }

    .settings-section-head,
    .settings-section-head.compact,
    .settings-profile-bridge,
    .settings-inline-action,
    .guidance-row {
      grid-template-columns: 1fr;
    }

    .guidance-row {
      align-items: start;
    }

    .settings-switch {
      justify-self: start;
    }

    .settings-profile-bridge :global(.spark-btn),
    .settings-inline-action :global(.spark-btn) {
      justify-self: start;
    }

    .summary-list div {
      align-items: flex-start;
      flex-direction: column;
      gap: 4px;
    }
  }
</style>
