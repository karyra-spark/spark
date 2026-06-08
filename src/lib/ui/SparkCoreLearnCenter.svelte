<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { sparkModules } from '$content/spark-content';
  import { learnOutcomeCards, learnPrinciples, learnTrackCards } from '$lib/core/learn-center-model';
  import {
    getCompletedLessonCount,
    getLearningProgressPercent,
    getRecommendedModuleId,
    getTotalLessonCount,
    learningState,
    setExperience
  } from '$state/learning-state.svelte';

  const recommendedModule = $derived(
    sparkModules.find((module) => module.id === getRecommendedModuleId()) ?? sparkModules[0]
  );

  const nextLesson = $derived(
    recommendedModule.lessons.find((lesson) => !learningState.completedLessonSlugs.includes(lesson.slug)) ??
      recommendedModule.lessons[0]
  );

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

<section class="learn-center-hero">
  <div class="learn-hero-copy">
    <div class="learn-kicker-row">
      <SparkTrustBadge label="Pusat Belajar" tone="beta" />
      <span>{getCompletedLessonCount()}/{getTotalLessonCount()} materi selesai</span>
    </div>

    <h1>Pusat belajar Spark: mulai dari fondasi, lanjut praktik saat sudah siap.</h1>

    <p>
      Core/Learn adalah ruang utama untuk memahami blockchain, cryptocurrency, Web3, wallet safety,
      dan Starknet secara bertahap. Fokusnya bukan banyak tombol, tetapi alur belajar yang jelas.
    </p>

    <div class="learn-hero-actions">
      <SparkButton href={`/lesson/${nextLesson.slug}`}>Lanjut: {nextLesson.title}</SparkButton>
      <SparkButton href="#jalur-belajar" variant="secondary">Lihat Jalur</SparkButton>
    </div>
  </div>

  <aside class="learn-next-panel">
    <div class="learn-next-top">
      <SparkTrustBadge label="Rekomendasi" tone="safe" />
      <span>{getLearningProgressPercent()}% progress</span>
    </div>

    <SparkCard class="learn-active-module-card">
      <span class={`learn-level-badge ${recommendedModule.tone}`}>L{recommendedModule.level}</span>
      <div>
        <small>Level aktif</small>
        <strong>{recommendedModule.title}</strong>
        <p>{recommendedModule.description}</p>
      </div>
    </SparkCard>

    <div class="learn-principle-list">
      {#each learnPrinciples as principle}
        <span><SparkIcon name="check" size={14} /> {principle}</span>
      {/each}
    </div>
  </aside>
</section>

<section class="learn-track-section" id="jalur-belajar">
  <div class="learn-section-head">
    <span class="spark-eyebrow">Pilih cara belajar</span>
    <h2>Jalur boleh berbeda, tetapi fondasinya tetap satu.</h2>
    <p>
      Mode belajar membantu rekomendasi dan bahasa penjelasan. Pengguna tetap bisa berpindah jalur jika pilihan awal kurang tepat.
    </p>
  </div>

  <div class="learn-track-grid">
    {#each learnTrackCards as track}
      <button
        type="button"
        class={`learn-track-card ${track.tone}`}
        class:active={learningState.experience === track.mode}
        onclick={() => setExperience(track.mode)}
      >
        <span><SparkIcon name={track.icon} size={20} /></span>
        <strong>{track.title}</strong>
        <small>{track.copy}</small>
      </button>
    {/each}
  </div>
</section>

<section class="learn-path-section">
  <div class="learn-section-head split">
    <div>
      <span class="spark-eyebrow">Peta kurikulum</span>
      <h2>Level dibuat compact agar tidak melelahkan di mobile.</h2>
    </div>
    <p>
      Buka level yang direkomendasikan dulu. Detail lengkap tetap tersedia di bawah lewat modul terbuka.
    </p>
  </div>

  <div class="learn-path-list">
    {#each sparkModules as module}
      {@const progress = progressFor(module.id)}
      {@const completed = completedFor(module.id)}
      {@const active = module.id === recommendedModule.id}
      <a href={`/lesson/${module.lessons[0]?.slug ?? 'why-blockchain'}`} class:active>
        <span class={`learn-path-node ${module.tone}`}>L{module.level}</span>
        <div>
          <div class="learn-path-row">
            <strong>{module.title}</strong>
            <em>{completed}/{module.lessons.length}</em>
          </div>
          <p>{module.subtitle}</p>
          <div class="learn-path-progress"><b style={`width: ${Math.max(4, progress)}%`}></b></div>
        </div>
      </a>
    {/each}
  </div>
</section>

<section class="learn-spotlight-section">
  <SparkCard class="learn-lesson-spotlight">
    <div>
      <span class="spark-eyebrow">Belajar berikutnya</span>
      <h2>{nextLesson.title}</h2>
      <p>{nextLesson.summary}</p>
      <div class="learn-lesson-meta">
        <span>{nextLesson.estimatedMinutes} menit</span>
        <span>{nextLesson.modeHint.join(' · ')}</span>
      </div>
    </div>

    <SparkButton href={`/lesson/${nextLesson.slug}`}>Mulai materi</SparkButton>
  </SparkCard>
</section>

<section class="learn-outcome-section">
  <div class="learn-section-head">
    <span class="spark-eyebrow">Setelah Core</span>
    <h2>Core adalah pusat belajar, bukan akhir perjalanan.</h2>
    <p>Setelah fondasi terbentuk, pengguna bergerak ke Lab, Passport, Community, dan Hub.</p>
  </div>

  <div class="learn-outcome-grid">
    {#each learnOutcomeCards as item}
      <a href={item.href}>
        <SparkCard>
          <span><SparkIcon name={item.icon} size={18} /></span>
          <div>
            <strong>{item.title}</strong>
            <small>{item.copy}</small>
          </div>
        </SparkCard>
      </a>
    {/each}
  </div>
</section>
