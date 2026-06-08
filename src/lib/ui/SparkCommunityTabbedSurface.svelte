<script lang="ts">
  import { onMount } from 'svelte';
  import SparkCohortBoardRich from '$ui/SparkCohortBoardRich.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
  import SparkLocalDataNotice from '$ui/SparkLocalDataNotice.svelte';
  import SparkSectionHeader from '$ui/SparkSectionHeader.svelte';
  import SparkSocialLayer from '$ui/social/SparkSocialLayer.svelte';
  import SparkWorkshopEventBoardRich from '$ui/SparkWorkshopEventBoardRich.svelte';

  type CommunityTab = 'ringkasan' | 'workshop' | 'cohort' | 'diskusi';

  const tabs: { key: CommunityTab; label: string; icon: string; copy: string }[] = [
    { key: 'ringkasan', label: 'Ringkasan', icon: 'sparkles', copy: 'Arah komunitas' },
    { key: 'workshop', label: 'Workshop', icon: 'calendar', copy: 'Aktivitas' },
    { key: 'cohort', label: 'Cohort', icon: 'users', copy: 'Belajar bersama' },
    { key: 'diskusi', label: 'Diskusi', icon: 'messages', copy: 'Tanya & respons' }
  ];

  let activeTab = $state<CommunityTab>('ringkasan');

  function normalizeTab(value: string | null): CommunityTab {
    if (value === 'workshop' || value === 'workshops') return 'workshop';
    if (value === 'cohort' || value === 'cohorts') return 'cohort';
    if (value === 'diskusi' || value === 'discuss' || value === 'discussion' || value === 'feed') return 'diskusi';
    return 'ringkasan';
  }

  function syncFromUrl() {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    activeTab = normalizeTab(params.get('tab'));
  }

  function selectTab(tab: CommunityTab) {
    activeTab = tab;
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    if (tab === 'ringkasan') {
      url.searchParams.delete('tab');
    } else {
      url.searchParams.set('tab', tab);
    }
    url.hash = '';
    window.history.pushState({}, '', url);
  }

  onMount(() => {
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  });
</script>

<section class="community-tabs-shell spark-section" id="community-tabs" data-karyra-community-tabs="pass37c">
  <div class="community-tabs-head" aria-label="Ringkasan mode Community">
    <span class="spark-eyebrow">Community space</span>
    <div>
      <h2>Pilih mode komunitas.</h2>
      <p>Workshop, cohort, dan diskusi tetap satu ruang, tapi tidak menumpuk di layar kecil.</p>
    </div>
  </div>

  <div class="community-tab-row" role="tablist" aria-label="Mode halaman Community">
    {#each tabs as tab}
      <button
        type="button"
        role="tab"
        class:active={activeTab === tab.key}
        aria-selected={activeTab === tab.key}
        aria-controls={`community-panel-${tab.key}`}
        onclick={() => selectTab(tab.key)}
      >
        <span><SparkIcon name={tab.icon} size={16} /></span>
        <strong>{tab.label}</strong>
        <small>{tab.copy}</small>
      </button>
    {/each}
  </div>

  <div class="community-tab-panel" id={`community-panel-${activeTab}`} role="tabpanel">
    {#if activeTab === 'ringkasan'}
      <div class="community-overview-grid">
        <div class="community-overview-main">
          <SparkLocalDataNotice />

          <div class="community-overview-card primary">
            <span><SparkIcon name="community" size={20} /></span>
            <div>
              <strong>Community tetap menjadi ruang aktivasi lokal.</strong>
              <p>Gunakan tab Workshop untuk event, Cohort untuk kelompok belajar, dan Diskusi untuk tanya jawab atau koordinasi ringan.</p>
            </div>
          </div>
        </div>

        <aside class="community-overview-actions" aria-label="Aksi cepat Community">
          <button type="button" onclick={() => selectTab('workshop')}>
            <span><SparkIcon name="calendar" size={17} /></span>
            <div>
              <strong>Jelajahi Workshop Tersedia</strong>
              <small>Aktivitas, kapasitas, dan fasilitator.</small>
            </div>
            <SparkIcon name="chevron-right" size={14} />
          </button>

          <button type="button" onclick={() => selectTab('cohort')}>
            <span><SparkIcon name="users" size={17} /></span>
            <div>
              <strong>Temukan Cohort Belajar</strong>
              <small>Kelompok belajar dan impact lokal.</small>
            </div>
            <SparkIcon name="chevron-right" size={14} />
          </button>

          <button type="button" onclick={() => selectTab('diskusi')}>
            <span><SparkIcon name="messages" size={17} /></span>
            <div>
              <strong>Masuk ke Ruang Tanya</strong>
              <small>Tanya, koordinasi workshop, dan berbagi progress.</small>
            </div>
            <SparkIcon name="chevron-right" size={14} />
          </button>
        </aside>
      </div>
    {:else if activeTab === 'workshop'}
      <section id="workshops" class="community-tab-content-section">
        <SparkSectionHeader
          eyebrow="Workshop board"
          title="Workshop dibuat terasa seperti event nyata."
          copy="Setiap workshop punya format, lokasi, fasilitator, kapasitas, progress bar, dan aksi simpan."
        />
        <SparkWorkshopEventBoardRich />
      </section>
    {:else if activeTab === 'cohort'}
      <section id="cohorts" class="community-tab-content-section">
        <SparkSectionHeader
          eyebrow="Cohort & impact"
          title="Komunitas menjadi jembatan dari belajar ke praktik nyata."
          copy="Cohort membantu pengguna bergerak bersama dari pemula, praktik, sampai eksplorasi ekosistem."
        />
        <SparkCohortBoardRich />
      </section>
    {:else}
      <section id="diskusi" class="community-tab-content-section discussion-tab-section">
        <SparkSocialLayer />
      </section>
    {/if}
  </div>
</section>

<style>
  .community-tabs-shell {
    display: grid;
    gap: 12px;
  }

  .community-tabs-head {
    display: grid;
    grid-template-columns: minmax(0, 0.38fr) minmax(0, 1fr);
    gap: 12px;
    align-items: end;
    padding: 2px 2px 0;
  }

  .community-tabs-head h2 {
    margin: 0;
    color: var(--spark-navy);
    font-size: clamp(22px, 3vw, 34px);
    line-height: 1.06;
    letter-spacing: -0.045em;
  }

  :global([data-theme='dark']) .community-tabs-head h2 { color: #fff; }

  .community-tabs-head p {
    max-width: 62ch;
    margin: 5px 0 0;
    color: var(--spark-muted);
    font-size: 13px;
    line-height: 1.45;
    font-weight: 430;
  }

  .community-tab-row {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 7px;
    padding: 7px;
    border: 1px solid var(--spark-line);
    border-radius: 22px;
    background: color-mix(in srgb, var(--spark-card) 90%, transparent);
    box-shadow: 0 10px 26px rgba(5, 9, 78, 0.055);
  }

  .community-tab-row button {
    min-width: 0;
    min-height: 50px;
    display: grid;
    grid-template-columns: 31px minmax(0, 1fr);
    grid-template-rows: auto auto;
    gap: 1px 7px;
    align-items: center;
    padding: 8px;
    border: 1px solid transparent;
    border-radius: 16px;
    background: transparent;
    color: var(--spark-muted);
    text-align: left;
  }

  .community-tab-row button > span {
    grid-row: 1 / span 2;
    display: grid;
    place-items: center;
    width: 31px;
    height: 31px;
    border-radius: 12px;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, 0.09);
  }

  .community-tab-row strong,
  .community-tab-row small {
    display: block;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .community-tab-row strong {
    color: var(--spark-navy);
    font-size: 12.5px;
    line-height: 1.12;
    font-weight: 720;
  }

  :global([data-theme='dark']) .community-tab-row strong { color: #fff; }

  .community-tab-row small {
    font-size: 10.5px;
    line-height: 1.12;
    font-weight: 480;
  }

  .community-tab-row button.active {
    border-color: rgba(31, 117, 255, 0.28);
    background: rgba(31, 117, 255, 0.08);
    color: var(--spark-blue-strong);
    box-shadow: 0 8px 18px rgba(31, 117, 255, 0.07);
  }

  .community-tab-row button.active > span {
    color: #fff;
    background: linear-gradient(135deg, var(--spark-blue), var(--spark-blue-strong));
  }

  .community-tab-panel {
    min-width: 0;
  }

  .community-overview-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(260px, 0.42fr);
    gap: 14px;
    align-items: start;
  }

  .community-overview-main,
  .community-overview-actions,
  .community-tab-content-section {
    display: grid;
    gap: 12px;
  }

  .community-overview-card,
  .community-overview-actions button {
    border: 1px solid var(--spark-line);
    background: var(--spark-card);
    box-shadow: 0 10px 26px rgba(5, 9, 78, 0.06);
  }

  .community-overview-card {
    display: grid;
    grid-template-columns: 42px minmax(0, 1fr);
    gap: 12px;
    align-items: center;
    padding: 14px;
    border-radius: 22px;
  }

  .community-overview-card > span,
  .community-overview-actions button > span {
    display: grid;
    place-items: center;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, 0.09);
  }

  .community-overview-card > span {
    width: 40px;
    height: 40px;
    border-radius: 15px;
  }

  .community-overview-card strong,
  .community-overview-actions strong {
    display: block;
    color: var(--spark-navy);
    line-height: 1.15;
  }

  :global([data-theme='dark']) .community-overview-card strong,
  :global([data-theme='dark']) .community-overview-actions strong { color: #fff; }

  .community-overview-card p,
  .community-overview-actions small {
    margin: 4px 0 0;
    color: var(--spark-muted);
    font-size: 12.5px;
    line-height: 1.45;
    font-weight: 430;
  }

  .community-overview-actions button {
    display: grid;
    grid-template-columns: 38px minmax(0, 1fr) auto;
    gap: 10px;
    align-items: center;
    min-height: 66px;
    padding: 10px;
    border-radius: 18px;
    color: var(--spark-muted);
    text-align: left;
  }

  .community-overview-actions button > span {
    width: 36px;
    height: 36px;
    border-radius: 14px;
  }

  .community-overview-actions button:hover {
    border-color: rgba(31, 117, 255, 0.24);
    transform: translateY(-1px);
  }

  .discussion-tab-section {
    min-width: 0;
  }

  @media (max-width: 920px) {
    .community-tabs-head,
    .community-overview-grid {
      grid-template-columns: 1fr;
    }

    .community-tab-row {
      position: static;
      top: auto;
      z-index: auto;
      overflow-x: auto;
      grid-template-columns: repeat(4, minmax(112px, 1fr));
      scroll-snap-type: x proximity;
      -webkit-overflow-scrolling: touch;
    }

    .community-tab-row button {
      scroll-snap-align: start;
    }
  }

  @media (max-width: 560px) {
    .community-tabs-shell {
      gap: 10px;
    }

    .community-tabs-head {
      gap: 5px;
      padding-inline: 1px;
    }

    .community-tabs-head h2 {
      font-size: 20px;
      line-height: 1.08;
    }

    .community-tabs-head p {
      font-size: 12px;
      line-height: 1.38;
    }

    .community-tab-row {
      margin-inline: 0;
      padding: 6px;
      border-radius: 18px;
      grid-template-columns: repeat(4, minmax(96px, 1fr));
      box-shadow: 0 7px 18px rgba(5, 9, 78, 0.045);
    }

    .community-tab-row button {
      min-height: 44px;
      grid-template-columns: 28px minmax(0, 1fr);
      padding: 7px;
      border-radius: 14px;
    }

    .community-tab-row button > span {
      width: 28px;
      height: 28px;
      border-radius: 11px;
    }

    .community-tab-row strong {
      font-size: 12px;
    }

    .community-tab-row small {
      display: none;
    }

    .community-overview-card,
    .community-overview-actions button {
      border-radius: 16px;
    }

    .community-overview-actions button {
      min-height: 60px;
    }
  }
</style>
