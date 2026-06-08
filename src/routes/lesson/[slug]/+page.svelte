<script lang="ts">
  import type { PageData } from './$types';
  import SparkButton from '$ui/SparkButton.svelte';
  import SparkCard from '$ui/SparkCard.svelte';
  import SparkCheckpoint from '$ui/SparkCheckpoint.svelte';
  import SparkLearningToolkit from '$ui/SparkLearningToolkit.svelte';
  import SparkLessonCompletionPanel from '$ui/SparkLessonCompletionPanel.svelte';
  import SparkLessonNavigator from '$ui/SparkLessonNavigator.svelte';
  import SparkLessonStickyBar from '$ui/SparkLessonStickyBar.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
  import SparkTrustBadge from '$ui/SparkTrustBadge.svelte';
  import { getLessonProgressPercent, getNextLessonSlug, getPreviousLessonSlug } from '$lib/learning/lesson-navigation';
  import { learningState } from '$state/learning-state.svelte';

  let { data }: { data: PageData } = $props();

  const module = $derived(data.module);
  const lesson = $derived(data.lesson);
  const progress = $derived(getLessonProgressPercent(lesson.slug));
  const previousSlug = $derived(getPreviousLessonSlug(lesson.slug));
  const nextSlug = $derived(getNextLessonSlug(lesson.slug));
  const completed = $derived(learningState.completedLessonSlugs.includes(lesson.slug));
</script>

<svelte:head>
  <title>{lesson.title} — Karyra Spark</title>
</svelte:head>

<section class="spark-lesson-workspace pass18">
  <article class="spark-lesson-main">
    <div class="lesson-breadcrumb">
      <a href="/core"><SparkIcon name="book-open" size={15} /> Core</a>
      <span>/</span>
      <span>{module.title}</span>
    </div>

    <div class="lesson-title-block">
      <div>
        <span class="spark-eyebrow">{module.title}</span>
        <h1>{lesson.title}</h1>
        <p class="lesson-summary">{lesson.summary}</p>
      </div>

      <div class="lesson-status-badge">
        {#if completed}
          <SparkTrustBadge label="Selesai" tone="safe" />
        {:else}
          <SparkTrustBadge label="Belajar" tone="beta" />
        {/if}
      </div>
    </div>

    <div class="lesson-meta-row">
      <span>{lesson.estimatedMinutes} menit</span>
      <span>{module.subtitle}</span>
      <span>{lesson.modeHint.join(' · ')}</span>
      <span>{progress}% path</span>
    </div>

    <div class="lesson-reading-progress" aria-hidden="true">
      <span style={`width: ${progress}%`}></span>
    </div>

    <div class="lesson-block">
      <h2>Inti Pelajaran</h2>
      {#each lesson.body as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>

    <SparkCheckpoint {lesson} />

    <SparkLessonCompletionPanel {lesson} />

    <nav class="lesson-bottom-nav" aria-label="Navigasi lesson">
      {#if previousSlug}
        <SparkButton href={`/lesson/${previousSlug}`} variant="secondary">Lesson Sebelumnya</SparkButton>
      {:else}
        <SparkButton href="/core" variant="secondary">Kembali ke Core</SparkButton>
      {/if}

      {#if nextSlug}
        <SparkButton href={`/lesson/${nextSlug}`}>Lesson Berikutnya</SparkButton>
      {:else}
        <SparkButton href="/lab">Lanjut ke Lab</SparkButton>
      {/if}
    </nav>
  </article>

  <aside class="spark-lesson-sidebar">
    <SparkCard>
      <h3>Outline</h3>
      <p>{lesson.estimatedMinutes} menit · {module.subtitle}</p>
      <div class="lesson-outline-mini">
        <span class:done={completed}><SparkIcon name={completed ? 'check' : 'book-open'} size={15} /></span>
        <div>
          <strong>{completed ? 'Selesai' : 'Belum selesai'}</strong>
          <small>Progress tersimpan lokal.</small>
        </div>
      </div>
      <SparkButton href="/core" variant="secondary">Kembali ke Core</SparkButton>
    </SparkCard>

    <SparkLessonNavigator slug={lesson.slug} />

    <SparkLearningToolkit lessonSlug={lesson.slug} lessonTitle={lesson.title} terms={lesson.glossaryTerms ?? []} />
  </aside>
</section>

<SparkLessonStickyBar {lesson} {progress} />
