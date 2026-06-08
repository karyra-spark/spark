<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { sparkModules } from '$content/spark-content';
  import {
    getCompletedLessonCount,
    getRecommendedModuleId,
    getTotalLessonCount,
    learningState,
    setExperience
  } from '$state/learning-state.svelte';

  const recommendedModule = $derived(sparkModules.find((module) => module.id === getRecommendedModuleId()) ?? sparkModules[0]);
  const recommendedLesson = $derived(recommendedModule.lessons.find((lesson) => !learningState.completedLessonSlugs.includes(lesson.slug)) ?? recommendedModule.lessons[0]);

  const modes = [
    { key: 'beginner', label: 'Pemula', icon: 'shield' },
    { key: 'guided', label: 'Terarah', icon: 'layers' },
    { key: 'explorer', label: 'Penjelajah', icon: 'zap' }
  ] as const;

  function moduleProgress(moduleId: string) {
    const module = sparkModules.find((item) => item.id === moduleId);
    if (!module) return 0;
    const done = module.lessons.filter((lesson) => learningState.completedLessonSlugs.includes(lesson.slug)).length;
    return module.lessons.length ? Math.round((done / module.lessons.length) * 100) : 0;
  }
</script>

<section class="core-focus-board">
  <div class="core-focus-main">
    <span class="spark-eyebrow">Spark Core</span>
    <h1>Kurikulum utama dibuat seperti ruang belajar, bukan daftar card panjang.</h1>
    <p>Mulai dari level yang direkomendasikan, lalu buka level lain saat pengguna siap. Core tetap menjadi pusat seluruh perjalanan Spark.</p>

    <div class="core-focus-actions">
      <SparkButton href={`/lesson/${recommendedLesson.slug}`}>Lanjut: {recommendedLesson.title}</SparkButton>
      <SparkButton href="/lab" variant="secondary">Buka Lab</SparkButton>
    </div>
  </div>

  <aside class="core-recommend-panel">
    <div class="recommend-top">
      <SparkTrustBadge label="Direkomendasikan" tone="beta" />
      <span>{getCompletedLessonCount()}/{getTotalLessonCount()} lesson</span>
    </div>

    <SparkCard class="recommend-card">
      <span class={`level-pill ${recommendedModule.tone}`}>L{recommendedModule.level}</span>
      <div><small>Level aktif</small><strong>{recommendedModule.title}</strong><p>{recommendedModule.description}</p></div>
    </SparkCard>

    <div class="mode-switch-compact">
      {#each modes as mode}
        <button type="button" class:active={learningState.experience === mode.key} onclick={() => setExperience(mode.key)}>
          <SparkIcon name={mode.icon} size={15} />
          <span>{mode.label}</span>
        </button>
      {/each}
    </div>
  </aside>
</section>

<section class="core-level-timeline">
  {#each sparkModules as module}
    {@const progress = moduleProgress(module.id)}
    {@const active = module.id === recommendedModule.id}
    <a href={`/lesson/${module.lessons[0]?.slug ?? 'why-blockchain'}`} class:active>
      <span class={`level-node ${module.tone}`}>L{module.level}</span>
      <div>
        <div class="level-row"><strong>{module.title}</strong><em>{progress}%</em></div>
        <p>{module.subtitle}</p>
        <div class="level-progress-bar"><b style={`width:${Math.max(4, progress)}%`}></b></div>
      </div>
    </a>
  {/each}
</section>

<section class="core-lesson-spotlight">
  <SparkCard class="spotlight-card">
    <div>
      <span class="spark-eyebrow">Lesson spotlight</span>
      <h2>{recommendedLesson.title}</h2>
      <p>{recommendedLesson.summary}</p>
      <div class="spotlight-meta"><span>{recommendedLesson.estimatedMinutes} menit</span><span>{recommendedLesson.modeHint.join(' · ')}</span></div>
    </div>
    <SparkButton href={`/lesson/${recommendedLesson.slug}`}>Mulai materi</SparkButton>
  </SparkCard>
</section>
