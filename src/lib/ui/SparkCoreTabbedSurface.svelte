<script lang="ts">
  import { onMount } from 'svelte';
  import SparkButton from '$ui/SparkButton.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
  import SparkModuleAccordion from '$ui/SparkModuleAccordion.svelte';
  import SparkTrustBadge from '$ui/SparkTrustBadge.svelte';
  import { sparkModules } from '$content/spark-content';
  import { learnOutcomeCards, learnPrinciples, learnTrackCards } from '$lib/core/learn-center-model';
  import {
    getCompletedLessonCount,
    getLearningProgressPercent,
    getRecommendedModuleId,
    getTotalLessonCount,
    learningState,
    setExperience,
    type ExperienceLevel
  } from '$state/learning-state.svelte';

  type CoreTab = 'ringkasan' | 'jalur' | 'modul' | 'lanjut';

  const tabs: { key: CoreTab; label: string; icon: string; copy: string }[] = [
    { key: 'ringkasan', label: 'Ringkasan', icon: 'book-open', copy: 'Fokus hari ini' },
    { key: 'jalur', label: 'Jalur', icon: 'layers', copy: 'Mode belajar' },
    { key: 'modul', label: 'Modul', icon: 'checklist', copy: 'Materi lengkap' },
    { key: 'lanjut', label: 'Lanjut', icon: 'compass', copy: 'Arah berikutnya' }
  ];

  let activeTab = $state<CoreTab>('ringkasan');

  const recommendedModule = $derived(
    sparkModules.find((module) => module.id === getRecommendedModuleId()) ?? sparkModules[0]
  );

  const nextLesson = $derived(
    recommendedModule.lessons.find((lesson) => !learningState.completedLessonSlugs.includes(lesson.slug)) ??
      recommendedModule.lessons[0]
  );

  function normalizeTab(value: string | null): CoreTab {
    if (value === 'jalur' || value === 'track') return 'jalur';
    if (value === 'modul' || value === 'modules') return 'modul';
    if (value === 'lanjut' || value === 'next') return 'lanjut';
    return 'ringkasan';
  }

  function syncFromUrl() {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    activeTab = normalizeTab(params.get('tab'));
  }

  function selectTab(tab: CoreTab) {
    activeTab = tab;
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    if (tab === 'ringkasan') {
      url.searchParams.delete('tab');
    } else {
      url.searchParams.set('tab', tab);
    }
    window.history.pushState({}, '', url);
  }

  function progressFor(moduleId: string) {
    const module = sparkModules.find((item) => item.id === moduleId);
    if (!module) return 0;
    const completed = module.lessons.filter((lesson) => learningState.completedLessonSlugs.includes(lesson.slug)).length;
    return module.lessons.length ? Math.round((completed / module.lessons.length) * 100) : 0;
  }

  function completedFor(moduleId: string) {
    const module = sparkModules.find((item) => item.id === moduleId);
    if (!module) return 0;
    return module.lessons.filter((lesson) => learningState.completedLessonSlugs.includes(lesson.slug)).length;
  }

  onMount(() => {
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  });
</script>

<section class="core-tabs-shell spark-section" data-karyra-core-tabs="pass38">
  <div class="core-tabs-hero">
    <div class="core-hero-copy">
      <div class="core-kicker-row">
        <SparkTrustBadge label="Pusat Belajar" tone="beta" />
        <span>{getCompletedLessonCount()}/{getTotalLessonCount()} materi selesai</span>
      </div>

      <h1>Belajar dari fondasi, lanjut praktik saat sudah siap.</h1>
      <p>
        Core adalah ruang utama untuk memahami blockchain, crypto, Web3, keamanan wallet, dan Starknet secara bertahap.
        Fokusnya alur yang jelas, bukan sekadar banyak pilihan.
      </p>

      <div class="core-hero-actions">
        <SparkButton href={`/lesson/${nextLesson.slug}`}>Lanjut: {nextLesson.title}</SparkButton>
        <SparkButton href="/community?tab=diskusi" variant="secondary">Tanya ke Komunitas</SparkButton>
      </div>
    </div>

    <aside class="core-next-card">
      <div class="core-next-top">
        <SparkTrustBadge label="Rekomendasi" tone="safe" />
        <span>{getLearningProgressPercent()}% progress</span>
      </div>
      <div class="core-active-module">
        <span class={`core-level-badge ${recommendedModule.tone}`}>L{recommendedModule.level}</span>
        <div>
          <small>Level aktif</small>
          <strong>{recommendedModule.title}</strong>
          <p>{recommendedModule.description}</p>
        </div>
      </div>
    </aside>
  </div>

  <div class="core-tab-row" role="tablist" aria-label="Mode halaman Core">
    {#each tabs as tab}
      <button
        type="button"
        role="tab"
        class:active={activeTab === tab.key}
        aria-selected={activeTab === tab.key}
        aria-controls={`core-panel-${tab.key}`}
        onclick={() => selectTab(tab.key)}
      >
        <span><SparkIcon name={tab.icon} size={16} /></span>
        <strong>{tab.label}</strong>
        <small>{tab.copy}</small>
      </button>
    {/each}
  </div>

  <div class="core-tab-panel" id={`core-panel-${activeTab}`} role="tabpanel">
    {#if activeTab === 'ringkasan'}
      <div class="core-overview-grid">
        <div class="core-overview-main">
          <div class="core-spotlight-card">
            <span><SparkIcon name="book-check" size={20} /></span>
            <div>
              <small>Belajar berikutnya</small>
              <strong>{nextLesson.title}</strong>
              <p>{nextLesson.summary}</p>
              <div class="core-lesson-meta">
                <span>{nextLesson.estimatedMinutes} menit</span>
                <span>{nextLesson.modeHint.join(' · ')}</span>
              </div>
              <SparkButton href={`/lesson/${nextLesson.slug}`}>Mulai materi</SparkButton>
            </div>
          </div>

          <div class="core-principle-list">
            {#each learnPrinciples as principle}
              <span><SparkIcon name="check" size={14} /> {principle}</span>
            {/each}
          </div>
        </div>

        <aside class="core-overview-actions">
          <button type="button" onclick={() => selectTab('jalur')}>
            <span><SparkIcon name="layers" size={17} /></span>
            <div><strong>Pilih jalur</strong><small>Sesuaikan ritme belajar.</small></div>
            <SparkIcon name="chevron-right" size={14} />
          </button>
          <button type="button" onclick={() => selectTab('modul')}>
            <span><SparkIcon name="checklist" size={17} /></span>
            <div><strong>Lihat modul</strong><small>Buka seluruh materi.</small></div>
            <SparkIcon name="chevron-right" size={14} />
          </button>
          <button type="button" onclick={() => selectTab('lanjut')}>
            <span><SparkIcon name="compass" size={17} /></span>
            <div><strong>Arah lanjut</strong><small>Hubungkan Core ke Lab dan Hub.</small></div>
            <SparkIcon name="chevron-right" size={14} />
          </button>
        </aside>
      </div>
    {:else if activeTab === 'jalur'}
      <section class="core-tab-content-section">
        <div class="core-section-head">
          <span class="spark-eyebrow">Pilih cara belajar</span>
          <h2>Jalur boleh berbeda, fondasinya tetap satu.</h2>
          <p>Mode belajar membantu rekomendasi dan bahasa penjelasan. Pilihan ini bisa diubah kapan saja.</p>
        </div>

        <div class="core-track-grid">
          {#each learnTrackCards as track}
            <button
              type="button"
              class={`core-track-card ${track.tone}`}
              class:active={learningState.experience === track.mode}
              onclick={() => setExperience(track.mode as ExperienceLevel)}
            >
              <span><SparkIcon name={track.icon} size={20} /></span>
              <strong>{track.title}</strong>
              <small>{track.copy}</small>
            </button>
          {/each}
        </div>

        <div class="core-path-list">
          {#each sparkModules as module}
            {@const progress = progressFor(module.id)}
            {@const completed = completedFor(module.id)}
            {@const active = module.id === recommendedModule.id}
            <a href={`/lesson/${module.lessons[0]?.slug ?? 'why-blockchain'}`} class:active>
              <span class={`core-path-node ${module.tone}`}>L{module.level}</span>
              <div>
                <div class="core-path-row">
                  <strong>{module.title}</strong>
                  <em>{completed}/{module.lessons.length}</em>
                </div>
                <p>{module.subtitle}</p>
                <div class="core-path-progress"><b style={`width: ${Math.max(4, progress)}%`}></b></div>
              </div>
            </a>
          {/each}
        </div>
      </section>
    {:else if activeTab === 'modul'}
      <section class="core-tab-content-section">
        <div class="core-section-head">
          <span class="spark-eyebrow">Semua modul</span>
          <h2>Buka materi lengkap saat butuh melihat seluruh kurikulum.</h2>
          <p>Ringkasan membantu memilih langkah cepat. Daftar modul tetap tersedia untuk belajar lebih runtut.</p>
        </div>
        <SparkModuleAccordion />
      </section>
    {:else}
      <section class="core-tab-content-section">
        <div class="core-section-head">
          <span class="spark-eyebrow">Setelah Core</span>
          <h2>Core adalah titik awal, bukan akhir perjalanan.</h2>
          <p>Setelah fondasi terbentuk, lanjutkan ke Lab, Passport, Community, dan Hub dengan arah yang lebih jelas.</p>
        </div>

        <div class="core-outcome-grid">
          {#each learnOutcomeCards as item}
            <a href={item.href}>
              <span><SparkIcon name={item.icon} size={18} /></span>
              <div>
                <strong>{item.title}</strong>
                <small>{item.copy}</small>
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/if}
  </div>
</section>

<style>
  .core-tabs-shell,
  .core-tab-panel,
  .core-tab-content-section,
  .core-overview-main,
  .core-overview-actions {
    display: grid;
    gap: 14px;
  }

  .core-tabs-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(280px, 0.42fr);
    gap: 14px;
    align-items: stretch;
    padding: clamp(18px, 4vw, 34px);
    border: 1px solid var(--spark-line);
    border-radius: 30px;
    background:
      radial-gradient(circle at 8% 8%, rgba(31,117,255,.10), transparent 32%),
      radial-gradient(circle at 92% 18%, rgba(255,128,0,.12), transparent 30%),
      var(--spark-card);
    box-shadow: 0 16px 44px rgba(5, 9, 78, 0.08);
  }

  .core-hero-copy {
    display: grid;
    align-content: center;
    gap: 12px;
    min-width: 0;
  }

  .core-kicker-row,
  .core-hero-actions,
  .core-next-top,
  .core-lesson-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .core-kicker-row > span:not(.spark-trust-badge),
  .core-next-top > span,
  .core-lesson-meta span {
    color: var(--spark-muted);
    font-size: 11.5px;
    font-weight: 680;
  }

  .core-hero-copy h1 {
    max-width: 760px;
    margin: 0;
    color: var(--spark-navy);
    font-size: clamp(30px, 5vw, 56px);
    line-height: 1.02;
    letter-spacing: -.055em;
  }

  :global([data-theme='dark']) .core-hero-copy h1 { color: #fff; }

  .core-hero-copy p,
  .core-section-head p,
  .core-active-module p,
  .core-spotlight-card p,
  .core-path-list p {
    margin: 0;
    color: var(--spark-muted);
    line-height: 1.55;
    font-size: 13.5px;
  }

  .core-next-card,
  .core-spotlight-card,
  .core-overview-actions button,
  .core-outcome-grid a,
  .core-track-card {
    border: 1px solid var(--spark-line);
    background: rgba(255,255,255,.54);
    box-shadow: 0 10px 26px rgba(5, 9, 78, 0.055);
  }

  :global([data-theme='dark']) .core-next-card,
  :global([data-theme='dark']) .core-spotlight-card,
  :global([data-theme='dark']) .core-overview-actions button,
  :global([data-theme='dark']) .core-outcome-grid a,
  :global([data-theme='dark']) .core-track-card { background: rgba(255,255,255,.045); }

  .core-next-card {
    display: grid;
    gap: 12px;
    align-content: center;
    padding: 14px;
    border-radius: 24px;
  }

  .core-active-module,
  .core-spotlight-card,
  .core-overview-actions button,
  .core-outcome-grid a,
  .core-path-list a {
    display: grid;
    grid-template-columns: 42px minmax(0, 1fr);
    gap: 12px;
    align-items: center;
  }

  .core-level-badge,
  .core-path-node,
  .core-spotlight-card > span,
  .core-overview-actions button > span,
  .core-outcome-grid a > span {
    display: grid;
    place-items: center;
    color: #fff;
    background: linear-gradient(135deg, var(--spark-blue), var(--spark-blue-strong));
  }

  .core-level-badge,
  .core-path-node {
    width: 42px;
    height: 42px;
    border-radius: 16px;
    font-weight: 820;
  }

  .core-level-badge.green,
  .core-path-node.green { background: linear-gradient(135deg, var(--spark-green), var(--spark-blue-strong)); }
  .core-level-badge.purple,
  .core-path-node.purple { background: linear-gradient(135deg, var(--spark-purple), var(--spark-blue-strong)); }
  .core-level-badge.orange,
  .core-path-node.orange { background: linear-gradient(135deg, var(--spark-orange), var(--spark-pink)); }
  .core-level-badge.pink,
  .core-path-node.pink { background: linear-gradient(135deg, var(--spark-pink), var(--spark-orange)); }

  .core-active-module small,
  .core-spotlight-card small,
  .core-outcome-grid small,
  .core-overview-actions small {
    display: block;
    color: var(--spark-muted);
    font-size: 11.5px;
    line-height: 1.35;
  }

  .core-active-module strong,
  .core-spotlight-card strong,
  .core-overview-actions strong,
  .core-outcome-grid strong,
  .core-path-row strong {
    display: block;
    color: var(--spark-navy);
    line-height: 1.15;
  }

  :global([data-theme='dark']) .core-active-module strong,
  :global([data-theme='dark']) .core-spotlight-card strong,
  :global([data-theme='dark']) .core-overview-actions strong,
  :global([data-theme='dark']) .core-outcome-grid strong,
  :global([data-theme='dark']) .core-path-row strong { color: #fff; }

  .core-tab-row {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
    padding: 8px;
    border: 1px solid var(--spark-line);
    border-radius: 22px;
    background: color-mix(in srgb, var(--spark-card) 92%, transparent);
    box-shadow: 0 10px 26px rgba(5, 9, 78, 0.055);
  }

  .core-tab-row button {
    min-width: 0;
    min-height: 54px;
    display: grid;
    grid-template-columns: 32px minmax(0, 1fr);
    grid-template-rows: auto auto;
    gap: 2px 8px;
    align-items: center;
    padding: 8px;
    border: 1px solid transparent;
    border-radius: 16px;
    background: transparent;
    color: var(--spark-muted);
    text-align: left;
  }

  .core-tab-row button > span {
    grid-row: 1 / span 2;
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 12px;
    color: var(--spark-blue-strong);
    background: rgba(31,117,255,.09);
  }

  .core-tab-row strong,
  .core-tab-row small {
    display: block;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .core-tab-row strong {
    color: var(--spark-navy);
    font-size: 12.75px;
    line-height: 1.12;
  }

  :global([data-theme='dark']) .core-tab-row strong { color: #fff; }

  .core-tab-row small {
    font-size: 10.75px;
    line-height: 1.15;
  }

  .core-tab-row button.active {
    border-color: rgba(31,117,255,.28);
    background: rgba(31,117,255,.08);
    color: var(--spark-blue-strong);
  }

  .core-tab-row button.active > span {
    color: #fff;
    background: linear-gradient(135deg, var(--spark-blue), var(--spark-blue-strong));
  }

  .core-overview-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(260px, 0.42fr);
    gap: 14px;
    align-items: start;
  }

  .core-spotlight-card,
  .core-overview-actions button,
  .core-outcome-grid a {
    padding: 14px;
    border-radius: 22px;
    color: var(--spark-muted);
    text-align: left;
  }

  .core-spotlight-card { align-items: start; }

  .core-spotlight-card > span,
  .core-overview-actions button > span,
  .core-outcome-grid a > span {
    width: 38px;
    height: 38px;
    border-radius: 14px;
  }

  .core-principle-list {
    display: grid;
    gap: 8px;
  }

  .core-principle-list span {
    display: flex;
    align-items: center;
    gap: 7px;
    min-height: 36px;
    padding: 8px 10px;
    border: 1px solid var(--spark-line);
    border-radius: 15px;
    color: var(--spark-muted);
    background: rgba(255,255,255,.44);
    font-size: 12px;
  }

  :global([data-theme='dark']) .core-principle-list span { background: rgba(255,255,255,.04); }

  .core-section-head {
    display: grid;
    gap: 7px;
    max-width: 760px;
  }

  .core-section-head h2 {
    margin: 0;
    color: var(--spark-navy);
    font-size: clamp(22px, 4vw, 34px);
    line-height: 1.08;
    letter-spacing: -.04em;
  }

  :global([data-theme='dark']) .core-section-head h2 { color: #fff; }

  .core-track-grid,
  .core-outcome-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .core-track-card {
    display: grid;
    justify-items: start;
    gap: 8px;
    min-height: 132px;
    padding: 13px;
    border-radius: 20px;
    color: var(--spark-muted);
    text-align: left;
  }

  .core-track-card > span {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 14px;
    color: var(--spark-blue-strong);
    background: rgba(31,117,255,.09);
  }

  .core-track-card strong {
    color: var(--spark-navy);
    font-size: 14px;
  }

  :global([data-theme='dark']) .core-track-card strong { color: #fff; }

  .core-track-card small {
    font-size: 11.75px;
    line-height: 1.4;
  }

  .core-track-card.active {
    border-color: rgba(31,117,255,.3);
    background: rgba(31,117,255,.08);
  }

  .core-path-list {
    display: grid;
    gap: 9px;
  }

  .core-path-list a {
    min-height: 72px;
    padding: 12px;
    border: 1px solid var(--spark-line);
    border-radius: 20px;
    background: var(--spark-card);
    box-shadow: 0 8px 22px rgba(5,9,78,.05);
  }

  .core-path-list a.active {
    border-color: rgba(31,117,255,.32);
    box-shadow: 0 12px 30px rgba(31,117,255,.08);
  }

  .core-path-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  .core-path-row em {
    color: var(--spark-blue-strong);
    font-style: normal;
    font-size: 12px;
    font-weight: 800;
  }

  .core-path-progress {
    height: 7px;
    margin-top: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(31,117,255,.12);
  }

  .core-path-progress b {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--spark-blue), var(--spark-orange), var(--spark-pink));
  }

  .core-outcome-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }

  @media (max-width: 920px) {
    .core-tabs-hero,
    .core-overview-grid,
    .core-track-grid,
    .core-outcome-grid { grid-template-columns: 1fr; }

    .core-tab-row {
      overflow-x: auto;
      grid-template-columns: repeat(4, minmax(116px, 1fr));
      scroll-snap-type: x mandatory;
    }

    .core-tab-row button { scroll-snap-align: start; }
  }

  @media (max-width: 560px) {
    .core-tabs-hero {
      padding: 16px;
      border-radius: 24px;
    }

    .core-hero-copy h1 {
      font-size: clamp(28px, 8.6vw, 38px);
    }

    .core-hero-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .core-tab-row {
      margin-inline: -2px;
      padding: 7px;
      border-radius: 20px;
    }

    .core-tab-row small { display: none; }
  }
</style>
