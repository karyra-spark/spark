<script lang="ts">
  import { onMount } from 'svelte';
  import SparkButton from '$ui/SparkButton.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
  import SparkLevelExamCard from '$ui/SparkLevelExamCard.svelte';
  import SparkModuleAccordion from '$ui/SparkModuleAccordion.svelte';
  import SparkTrustBadge from '$ui/SparkTrustBadge.svelte';
  import { sparkModules } from '$content/spark-content';
  import { coreLevelExams, getExam, sparkLevelDefinitions } from '$lib/leveling/leveling-model';
  import {
    getExamResult,
    getHighestPassedLevel,
    getTrackLevelStatus,
    levelingState,
    restoreLevelingSnapshot,
    setSelectedLevel
  } from '$lib/leveling/leveling-state.svelte';
  import { getCompletedLessonCount, getLearningProgressPercent, getRecommendedLessonSlug, getTotalLessonCount, learningState } from '$state/learning-state.svelte';
  import type { SparkLevel } from '$lib/leveling/leveling-types';

  const selectedLevel = $derived(levelingState.selectedCoreLevel);
  const selectedDefinition = $derived(sparkLevelDefinitions.find((level) => level.id === selectedLevel) ?? sparkLevelDefinitions[0]);
  const selectedExam = $derived(getExam('core', selectedLevel) ?? coreLevelExams[0]);
  const highestPassed = $derived(getHighestPassedLevel('core'));
  const nextLessonSlug = $derived(getRecommendedLessonSlug());
  const progressPercent = $derived(getLearningProgressPercent());
  const completedLessons = $derived(getCompletedLessonCount());
  const totalLessons = $derived(getTotalLessonCount());

  function modulesFor(level: SparkLevel) {
    const definition = sparkLevelDefinitions.find((item) => item.id === level) ?? sparkLevelDefinitions[0];
    return sparkModules.filter((module) => definition.coreModuleIds.includes(module.id));
  }

  function completedForLevel(level: SparkLevel) {
    return modulesFor(level).reduce((total, module) => {
      return total + module.lessons.filter((lesson) => learningState.completedLessonSlugs.includes(lesson.slug)).length;
    }, 0);
  }

  function totalForLevel(level: SparkLevel) {
    return modulesFor(level).reduce((total, module) => total + module.lessons.length, 0);
  }

  function progressForLevel(level: SparkLevel) {
    const total = totalForLevel(level);
    if (!total) return 0;
    return Math.round((completedForLevel(level) / total) * 100);
  }

  function isLevelComplete(level: SparkLevel) {
    const total = totalForLevel(level);
    return total > 0 && completedForLevel(level) >= total;
  }

  function remainingForLevel(level: SparkLevel) {
    return Math.max(0, totalForLevel(level) - completedForLevel(level));
  }

  function firstLessonSlugFor(level: SparkLevel) {
    return modulesFor(level)[0]?.lessons[0]?.slug ?? nextLessonSlug;
  }

  function openLevel(level: SparkLevel) {
    if (getTrackLevelStatus('core', level) === 'locked') return;
    setSelectedLevel('core', level);
  }

  onMount(() => {
    restoreLevelingSnapshot();
  });
</script>

<section class="core-leveling-page spark-section" data-karyra-core-leveling="pass42">
  <div class="core-leveling-hero">
    <div class="core-leveling-copy">
      <div class="leveling-kicker">
        <SparkTrustBadge label="Core Leveling" tone="beta" />
        <span>{completedLessons}/{totalLessons} materi selesai</span>
      </div>
      <h1>Belajar bertingkat, bukan sekadar menyelesaikan daftar materi.</h1>
      <p>
        Mulai dari lesson kecil, pahami fondasi, lalu buka ujian saat materi level sudah selesai. Core membantu kamu bergerak pelan, aman, dan jelas sebelum masuk Lab atau Hub.
      </p>
      <div class="leveling-actions">
        <SparkButton href={`/lesson/${nextLessonSlug}`}>{completedLessons > 0 ? 'Lanjutkan Lesson Berikutnya' : 'Mulai dari Lesson Pertama'}</SparkButton>
        <a href="#core-selected-level-title">Lihat materi level ini</a>
      </div>
    </div>

    <aside class="leveling-summary-card">
      <span><SparkIcon name="book-check" size={22} /></span>
      <div>
        <small>Progress Core</small>
        <strong>{progressPercent}%</strong>
        <p>{highestPassed ? `Level Core ${highestPassed} sudah lulus.` : 'Mulai dari Core Beginner untuk membuka jalur berikutnya.'}</p>
      </div>
    </aside>
  </div>

  <section class="core-level-section" aria-labelledby="core-level-map-title">
    <div class="level-section-head">
      <span class="spark-eyebrow">Peta level</span>
      <h2 id="core-level-map-title">Selesaikan level, lalu lanjut ke tahap berikutnya.</h2>
      <p>Intermediate dan Advanced terbuka setelah ujian level sebelumnya lulus.</p>
    </div>

    <div class="level-card-grid">
      {#each sparkLevelDefinitions as level}
        {@const status = getTrackLevelStatus('core', level.id)}
        {@const progress = progressForLevel(level.id)}
        <button type="button" class={`level-map-card ${level.tone}`} class:active={selectedLevel === level.id} disabled={status === 'locked'} onclick={() => openLevel(level.id)}>
          <div class="level-map-top">
            <span><SparkIcon name={level.icon} size={18} /></span>
            <SparkTrustBadge label={status === 'passed' ? 'Lulus' : status === 'locked' ? 'Terkunci' : 'Terbuka'} tone={status === 'passed' ? 'safe' : status === 'locked' ? 'target' : 'beta'} />
          </div>
          <strong>{level.label}</strong>
          <small>{level.copy}</small>
          <div class="level-mini-progress"><b style={`width: ${Math.max(4, progress)}%`}></b></div>
          <em>{completedForLevel(level.id)}/{totalForLevel(level.id)} materi</em>
        </button>
      {/each}
    </div>
  </section>

  <section class="core-level-section selected-level-section" aria-labelledby="core-selected-level-title">
    <div class="selected-level-card">
      <div>
        <span class="spark-eyebrow">Level dipilih</span>
        <h2 id="core-selected-level-title">{selectedDefinition.label}: {selectedDefinition.title}</h2>
        <p>{selectedDefinition.copy}</p>
      </div>
      <SparkButton href={`/lesson/${firstLessonSlugFor(selectedLevel)}`} variant="secondary">{isLevelComplete(selectedLevel) ? 'Review Materi Level Ini' : completedForLevel(selectedLevel) > 0 ? 'Lanjutkan Materi Level Ini' : 'Mulai Materi Level Ini'}</SparkButton>
    </div>

    <div class="level-module-list">
      {#each modulesFor(selectedLevel) as module}
        <a href={`/lesson/${module.lessons[0]?.slug ?? nextLessonSlug}`}>
          <span class={`level-node ${module.tone}`}>L{module.level}</span>
          <div>
            <strong>{module.title}</strong>
            <small>{module.subtitle}</small>
          </div>
          <SparkIcon name="chevron-right" size={15} />
        </a>
      {/each}
    </div>
  </section>

  <section class="core-level-section" id="core-level-exam" aria-labelledby="core-exam-title">
    <div class="level-section-head compact">
      <span class="spark-eyebrow">Ujian akhir Core</span>
      <h2 id="core-exam-title">Buktikan pemahaman sebelum naik level.</h2>
      <p>Ujian terbuka setelah semua materi level ini selesai. Kamu tetap bisa review materi kapan saja.</p>
    </div>
    {#if selectedExam}
      {#if getTrackLevelStatus('core', selectedLevel) === 'locked'}
        <article class="level-exam-gate locked" aria-live="polite">
          <span><SparkIcon name="lock" size={20} /></span>
          <div>
            <h3>Ujian level ini belum terbuka.</h3>
            <p>Selesaikan dan luluskan level sebelumnya dulu, lalu kembali untuk membuka ujian ini.</p>
          </div>
          <SparkButton href={`/lesson/${firstLessonSlugFor(selectedLevel)}`} variant="secondary">Lihat Materi</SparkButton>
        </article>
      {:else if !isLevelComplete(selectedLevel) && !getExamResult(selectedExam.id)?.passed}
        <article class="level-exam-gate" aria-live="polite">
          <span><SparkIcon name="book-open" size={20} /></span>
          <div>
            <h3>Selesaikan materi dulu untuk membuka ujian.</h3>
            <p>Masih ada <strong>{remainingForLevel(selectedLevel)} materi</strong> di level ini. Ujian akan lebih berguna setelah fondasinya selesai.</p>
          </div>
          <SparkButton href={`/lesson/${firstLessonSlugFor(selectedLevel)}`} variant="secondary">Lanjutkan Materi</SparkButton>
        </article>
      {:else}
        <SparkLevelExamCard exam={selectedExam} />
      {/if}
    {/if}
  </section>

  <section class="core-level-section" aria-labelledby="core-all-modules-title">
    <div class="level-section-head compact">
      <span class="spark-eyebrow">Semua materi</span>
      <h2 id="core-all-modules-title">Tetap bisa belajar runtut dari daftar lengkap.</h2>
    </div>
    <SparkModuleAccordion />
  </section>
</section>

<style>
  .core-leveling-page,
  .core-level-section,
  .core-leveling-copy,
  .level-section-head,
  .selected-level-section {
    display: grid;
    gap: 14px;
  }

  .core-leveling-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(240px, 0.34fr);
    gap: 14px;
    padding: clamp(18px, 4vw, 32px);
    border: 1px solid var(--spark-line);
    border-radius: 30px;
    background:
      radial-gradient(circle at 8% 8%, rgba(31, 117, 255, 0.1), transparent 32%),
      radial-gradient(circle at 92% 18%, rgba(255, 128, 0, 0.1), transparent 30%),
      var(--spark-card);
    box-shadow: 0 16px 44px rgba(5, 9, 78, 0.08);
  }

  .leveling-kicker,
  .leveling-actions,
  .level-map-top,
  .selected-level-card,
  .level-module-list a {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }

  .leveling-kicker > span:not(.spark-trust-badge) {
    color: var(--spark-muted);
    font-size: 11.5px;
    font-weight: 760;
  }

  .core-leveling-copy h1,
  .level-section-head h2,
  .selected-level-card h2 {
    margin: 0;
    color: var(--spark-navy);
    letter-spacing: -0.045em;
  }

  .core-leveling-copy h1 {
    max-width: 780px;
    font-size: clamp(30px, 5vw, 54px);
    line-height: 1.03;
  }

  .core-leveling-copy p,
  .level-section-head p,
  .selected-level-card p,
  .leveling-summary-card p {
    margin: 0;
    color: var(--spark-muted);
    line-height: 1.58;
  }

  .leveling-actions a {
    min-height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
    border: 1px solid var(--spark-line);
    border-radius: 999px;
    color: var(--spark-blue-strong);
    background: rgba(255, 255, 255, 0.56);
    font-size: 13px;
    font-weight: 780;
  }

  .leveling-summary-card,
  .selected-level-card,
  .level-map-card,
  .level-module-list a {
    border: 1px solid var(--spark-line);
    background: var(--spark-card);
    box-shadow: 0 10px 28px rgba(5, 9, 78, 0.06);
  }

  .leveling-summary-card {
    display: grid;
    gap: 12px;
    align-content: start;
    padding: 18px;
    border-radius: 24px;
  }

  .leveling-summary-card > span {
    width: 42px;
    height: 42px;
    display: inline-grid;
    place-items: center;
    border-radius: 16px;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, 0.1);
  }

  .leveling-summary-card small,
  .level-map-card em {
    color: var(--spark-muted);
    font-size: 12px;
    font-weight: 760;
  }

  .leveling-summary-card strong {
    display: block;
    color: var(--spark-navy);
    font-size: 30px;
    letter-spacing: -0.05em;
  }

  .level-card-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  .level-map-card {
    min-height: 210px;
    display: grid;
    gap: 10px;
    align-content: start;
    padding: 16px;
    border-radius: 24px;
    text-align: left;
  }

  .level-map-card:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  .level-map-card.active {
    outline: 2px solid rgba(31, 117, 255, 0.34);
  }

  .level-map-top {
    justify-content: space-between;
  }

  .level-map-top > span,
  .level-node {
    display: inline-grid;
    place-items: center;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, 0.1);
  }

  .level-map-top > span {
    width: 38px;
    height: 38px;
    border-radius: 14px;
  }

  .level-map-card strong {
    color: var(--spark-navy);
    font-size: 18px;
  }

  .level-map-card small {
    color: var(--spark-muted);
    line-height: 1.5;
  }

  .level-mini-progress {
    height: 7px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(31, 117, 255, 0.1);
  }

  .level-mini-progress b {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--spark-blue), var(--spark-orange));
  }

  .selected-level-card {
    justify-content: space-between;
    padding: 18px;
    border-radius: 24px;
  }

  .level-module-list {
    display: grid;
    gap: 10px;
  }

  .level-module-list a {
    padding: 12px;
    border-radius: 18px;
    color: inherit;
  }

  .level-module-list a > div {
    flex: 1 1 auto;
    min-width: 0;
  }

  .level-module-list strong,
  .level-module-list small {
    display: block;
  }

  .level-module-list strong {
    color: var(--spark-navy);
  }

  .level-module-list small {
    color: var(--spark-muted);
  }

  .level-node {
    width: 34px;
    height: 34px;
    flex: 0 0 auto;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 850;
  }

  @media (max-width: 860px) {
    .core-leveling-hero,
    .level-card-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 680px) {
    .selected-level-card {
      display: grid;
    }
  }
</style>
