<script lang="ts">
  import SparkButton from '$ui/SparkButton.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
  import SparkModuleAccordion from '$ui/SparkModuleAccordion.svelte';
  import SparkTrustBadge from '$ui/SparkTrustBadge.svelte';
  import { sparkModules } from '$content/spark-content';
  import { learnOutcomeCards, learnPrinciples } from '$lib/core/learn-center-model';
  import {
    getCompletedLessonCount,
    getLearningProgressPercent,
    getRecommendedModuleId,
    getTotalLessonCount,
    learningState
  } from '$state/learning-state.svelte';

  const recommendedModule = $derived(
    sparkModules.find((module) => module.id === getRecommendedModuleId()) ?? sparkModules[0]
  );

  const nextLesson = $derived(
    recommendedModule.lessons.find((lesson) => !learningState.completedLessonSlugs.includes(lesson.slug)) ??
      recommendedModule.lessons[0]
  );

  const completedCount = $derived(getCompletedLessonCount());
  const totalCount = $derived(getTotalLessonCount());
  const progressPercent = $derived(getLearningProgressPercent());

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
</script>

<section class="core-guided-page spark-section" data-karyra-core-guided="pass38a">
  <div class="core-guided-hero" aria-labelledby="core-guided-title">
    <div class="core-guided-copy">
      <div class="core-guided-kicker">
        <SparkTrustBadge label="Core Belajar" tone="beta" />
        <span>{completedCount}/{totalCount} materi selesai</span>
      </div>

      <h1 id="core-guided-title">Mulai Core Beginner dari langkah yang paling aman.</h1>
      <p>
        Core membantu kamu memahami blockchain, crypto, Web3, keamanan wallet, dan Starknet secara bertahap.
        Fokusnya sederhana: pahami fondasi dulu, lalu praktik saat sudah siap.
      </p>

      <div class="core-guided-actions">
        <SparkButton href={`/lesson/${nextLesson.slug}`}>Mulai Core Beginner</SparkButton>
        <a class="core-link-action" href="#core-path">Lihat jalur</a>
      </div>
    </div>

    <aside class="core-resume-card" aria-label="Progres belajar">
      <div class="core-resume-top">
        <span><SparkIcon name="book-check" size={18} /></span>
        <div>
          <small>Pelajaran berikutnya</small>
          <strong>{nextLesson.title}</strong>
        </div>
      </div>

      <p>{nextLesson.summary}</p>

      <div class="core-progress-block" aria-label={`Progress belajar ${progressPercent}%`}>
        <div>
          <span>Progress</span>
          <strong>{progressPercent}%</strong>
        </div>
        <div class="core-progress-bar"><b style={`width: ${Math.max(4, progressPercent)}%`}></b></div>
      </div>

      <div class="core-resume-meta">
        <span>{nextLesson.estimatedMinutes} menit</span>
        <span>{nextLesson.modeHint.join(' · ')}</span>
      </div>
    </aside>
  </div>

  <section class="core-guided-section core-active-level" aria-labelledby="core-active-level-title">
    <div class="core-section-head compact">
      <span class="spark-eyebrow">Level aktif</span>
      <h2 id="core-active-level-title">Mulai dari level yang paling relevan.</h2>
      <p>Rekomendasi ini mengikuti progres belajar dan latihan yang sudah kamu selesaikan.</p>
    </div>

    <div class="core-active-level-card">
      <span class={`core-level-badge ${recommendedModule.tone}`}>L{recommendedModule.level}</span>
      <div>
        <strong>{recommendedModule.title}</strong>
        <p>{recommendedModule.description}</p>
      </div>
      <SparkButton href={`/lesson/${nextLesson.slug}`} variant="secondary">Buka materi</SparkButton>
    </div>
  </section>

  <section class="core-guided-section" aria-labelledby="core-principles-title">
    <div class="core-section-head compact">
      <span class="spark-eyebrow">Ritme belajar</span>
      <h2 id="core-principles-title">Belajar dibuat pelan, jelas, dan tidak memaksa teknis terlalu cepat.</h2>
    </div>

    <div class="core-principle-list">
      {#each learnPrinciples as principle}
        <span><SparkIcon name="check" size={14} /> {principle}</span>
      {/each}
    </div>
  </section>


  <section class="core-guided-section" id="core-path" aria-labelledby="core-path-title">
    <div class="core-section-head split">
      <div>
        <span class="spark-eyebrow">Peta level</span>
        <h2 id="core-path-title">Lihat posisi belajar tanpa harus membuka semua modul.</h2>
      </div>
      <p>Peta ini membantu kamu melihat urutan level, progres, dan langkah berikutnya secara ringkas.</p>
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

  <section class="core-guided-section" aria-labelledby="core-next-title">
    <div class="core-next-focus-card">
      <div>
        <span class="spark-eyebrow">Lanjutkan progres</span>
        <h2 id="core-next-title">{nextLesson.title}</h2>
        <p>{nextLesson.summary}</p>
        <div class="core-resume-meta">
          <span>{nextLesson.estimatedMinutes} menit</span>
          <span>{nextLesson.modeHint.join(' · ')}</span>
        </div>
      </div>
      <SparkButton href={`/lesson/${nextLesson.slug}`}>Lanjut ke materi ini</SparkButton>
    </div>
  </section>

  <section class="core-guided-section" aria-labelledby="core-modules-title">
    <div class="core-section-head split">
      <div>
        <span class="spark-eyebrow">Semua modul</span>
        <h2 id="core-modules-title">Buka detail modul saat butuh melihat seluruh kurikulum.</h2>
      </div>
      <p>Bagian ini tetap tersedia untuk belajar lebih runtut, tanpa menutupi langkah utama di atas.</p>
    </div>
    <SparkModuleAccordion />
  </section>

  <section class="core-guided-section" aria-labelledby="core-discussion-title">
    <div class="core-discussion-card">
      <span><SparkIcon name="messages" size={18} /></span>
      <div>
        <strong id="core-discussion-title">Masih ada yang ganjal?</strong>
        <p>Silakan bawa pertanyaan ke Diskusi. Cocok untuk minta contoh lain, bertanya soal istilah, atau membahas materi bersama komunitas.</p>
      </div>
      <SparkButton href="/community?tab=diskusi" variant="secondary">Tanya ke Komunitas</SparkButton>
    </div>
  </section>

  <section class="core-guided-section" aria-labelledby="core-after-title">
    <div class="core-section-head compact">
      <span class="spark-eyebrow">Setelah Core</span>
      <h2 id="core-after-title">Fondasi belajar membuka jalur ke praktik dan eksplorasi.</h2>
      <p>Setelah dasar terasa cukup, lanjutkan ke Lab, Passport, Community, atau Hub sesuai kesiapanmu.</p>
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
</section>

<style>
  .core-guided-page,
  .core-guided-section,
  .core-guided-copy,
  .core-resume-card,
  .core-active-level-card,
  .core-section-head,
  .core-next-focus-card,
  .core-discussion-card {
    display: grid;
    gap: 14px;
  }

  .core-guided-page {
    --core-surface-shadow: 0 16px 44px rgba(5, 9, 78, 0.08);
  }

  .core-guided-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(270px, 0.42fr);
    gap: 14px;
    align-items: stretch;
    padding: clamp(18px, 4vw, 32px);
    border: 1px solid var(--spark-line);
    border-radius: 30px;
    background:
      radial-gradient(circle at 8% 8%, rgba(31, 117, 255, 0.1), transparent 32%),
      radial-gradient(circle at 92% 18%, rgba(255, 128, 0, 0.1), transparent 30%),
      var(--spark-card);
    box-shadow: var(--core-surface-shadow);
  }

  .core-guided-copy {
    align-content: center;
    min-width: 0;
  }

  .core-guided-kicker,
  .core-guided-actions,
  .core-resume-meta,
  .core-section-head.split,
  .core-path-row,
  .core-progress-block > div:first-child {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .core-guided-kicker > span:not(.spark-trust-badge),
  .core-resume-meta span,
  .core-progress-block span,
  .core-progress-block strong,
  .core-path-row em {
    color: var(--spark-muted);
    font-size: 11.5px;
    font-weight: 700;
  }

  .core-guided-copy h1 {
    max-width: 760px;
    margin: 0;
    color: var(--spark-navy);
    font-size: clamp(30px, 5vw, 56px);
    line-height: 1.02;
    letter-spacing: -0.055em;
  }

  .core-guided-copy p,
  .core-section-head p,
  .core-active-level-card p,
  .core-next-focus-card p,
  .core-discussion-card p,
  .core-path-list p {
    margin: 0;
    color: var(--spark-muted);
    line-height: 1.58;
  }

  .core-guided-copy p {
    max-width: 68ch;
    font-size: 15.5px;
  }

  .core-link-action {
    min-height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
    border: 1px solid var(--spark-line);
    border-radius: 999px;
    color: var(--spark-blue-strong);
    font-size: 13px;
    font-weight: 760;
    background: rgba(255, 255, 255, 0.52);
  }

  .core-resume-card,
  .core-active-level-card,
  .core-next-focus-card,
  .core-discussion-card,
  .core-path-list a,
  .core-outcome-grid a {
    border: 1px solid var(--spark-line);
    background: var(--spark-card);
    box-shadow: 0 10px 26px rgba(5, 9, 78, 0.06);
  }

  .core-resume-card {
    align-content: start;
    padding: 14px;
    border-radius: 24px;
  }

  .core-resume-top,
  .core-active-level-card,
  .core-discussion-card,
  .core-outcome-grid a {
    display: grid;
    grid-template-columns: 42px minmax(0, 1fr);
    gap: 12px;
    align-items: center;
  }

  .core-resume-top > span,
  .core-discussion-card > span,
  .core-outcome-grid a > span {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 15px;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, 0.1);
  }

  .core-resume-top small {
    display: block;
    color: var(--spark-muted);
    font-size: 11px;
    font-weight: 760;
  }

  .core-resume-top strong,
  .core-active-level-card strong,
  .core-next-focus-card h2,
  .core-discussion-card strong,
  .core-outcome-grid strong,
  .core-section-head h2,
  .core-path-row strong {
    color: var(--spark-navy);
  }

  .core-resume-top strong,
  .core-active-level-card strong,
  .core-discussion-card strong,
  .core-outcome-grid strong,
  .core-path-row strong {
    display: block;
    line-height: 1.14;
  }

  .core-progress-block {
    display: grid;
    gap: 7px;
  }

  .core-progress-block > div:first-child {
    justify-content: space-between;
  }

  .core-progress-bar,
  .core-path-progress {
    height: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(148, 163, 184, 0.18);
  }

  .core-progress-bar b,
  .core-path-progress b {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--spark-blue), var(--spark-green));
  }

  .core-section-head.compact {
    max-width: 820px;
  }

  .core-section-head h2,
  .core-next-focus-card h2 {
    margin: 0;
    font-size: clamp(22px, 4vw, 34px);
    line-height: 1.08;
    letter-spacing: -0.035em;
  }

  .core-section-head.split {
    grid-template-columns: minmax(0, 0.65fr) minmax(260px, 0.35fr);
    align-items: end;
    justify-content: space-between;
  }

  .core-active-level-card {
    grid-template-columns: 52px minmax(0, 1fr) auto;
    padding: 14px;
    border-radius: 24px;
  }

  .core-level-badge,
  .core-path-node {
    display: grid;
    place-items: center;
    border-radius: 17px;
    color: #fff;
    font-weight: 900;
    background: linear-gradient(135deg, var(--spark-blue), var(--spark-blue-strong));
  }

  .core-level-badge {
    width: 48px;
    height: 48px;
  }

  .core-outcome-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  .core-outcome-grid small {
    color: var(--spark-muted);
    font-size: 12.5px;
    line-height: 1.45;
  }


  .core-principle-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .core-principle-list span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 10px;
    border: 1px solid var(--spark-line);
    border-radius: 999px;
    background: var(--spark-card);
    color: var(--spark-muted);
    font-size: 12.25px;
    font-weight: 650;
  }

  .core-path-list {
    display: grid;
    gap: 10px;
  }

  .core-path-list a {
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr);
    gap: 12px;
    align-items: center;
    padding: 12px;
    border-radius: 20px;
  }

  .core-path-list a.active {
    border-color: rgba(31, 117, 255, 0.3);
    background: rgba(31, 117, 255, 0.045);
  }

  .core-path-node {
    width: 42px;
    height: 42px;
    font-size: 13px;
  }

  .core-path-row {
    justify-content: space-between;
  }

  .core-path-progress {
    height: 6px;
    margin-top: 8px;
  }

  .core-next-focus-card {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    padding: 16px;
    border-radius: 24px;
  }

  .core-discussion-card {
    grid-template-columns: 42px minmax(0, 1fr) auto;
    padding: 14px;
    border-radius: 22px;
  }

  .core-outcome-grid a {
    padding: 13px;
    border-radius: 20px;
  }

  @media (max-width: 920px) {
    .core-guided-hero,
    .core-section-head.split,
    .core-active-level-card,
    .core-next-focus-card,
    .core-discussion-card,
    .core-outcome-grid {
      grid-template-columns: 1fr;
    }

    .core-active-level-card,
    .core-discussion-card,
    .core-outcome-grid a {
      align-items: start;
    }
  }

  @media (max-width: 560px) {
    .core-guided-page,
    .core-guided-section {
      gap: 12px;
    }

    .core-guided-hero {
      padding: 16px;
      border-radius: 24px;
    }

    .core-guided-copy h1 {
      font-size: clamp(28px, 8vw, 38px);
    }

    .core-guided-copy p {
      font-size: 13.5px;
    }

    .core-guided-actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .core-resume-card,
    .core-active-level-card,
    .core-next-focus-card,
    .core-discussion-card {
      border-radius: 20px;
      padding: 12px;
    }
  }
</style>
