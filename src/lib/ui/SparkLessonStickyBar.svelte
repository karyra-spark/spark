<script lang="ts">
  import type { SparkLesson } from '$content/spark-content';
  import SparkButton from './SparkButton.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { getNextLessonSlug } from '$lib/learning/lesson-navigation';
  import { completeLesson, learningState } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  type Props = {
    lesson: SparkLesson;
    progress: number;
  };

  let { lesson, progress }: Props = $props();

  const completed = $derived(learningState.completedLessonSlugs.includes(lesson.slug));
  const nextSlug = $derived(getNextLessonSlug(lesson.slug));

  function markComplete() {
    completeLesson(lesson.slug);
    pushToast({
      title: 'Materi selesai',
      copy: nextSlug ? 'Silakan lanjut ke lesson berikutnya.' : 'Lesson terakhir selesai. Lanjutkan ke Lab.',
      tone: 'success'
    });
  }
</script>

<div class="spark-lesson-sticky-bar">
  <div class="sticky-lesson-meta">
    <span class:done={completed}>
      <SparkIcon name={completed ? 'check' : 'book-open'} size={15} />
    </span>
    <div>
      <strong>{completed ? 'Selesai' : 'Sedang belajar'}</strong>
      <small>{progress}% path · {lesson.estimatedMinutes} menit</small>
    </div>
  </div>

  <div class="sticky-lesson-progress" aria-hidden="true">
    <span style={`width: ${progress}%`}></span>
  </div>

  <div class="sticky-lesson-actions">
    {#if completed}
      {#if nextSlug}
        <SparkButton href={`/lesson/${nextSlug}`}>Lanjutkan</SparkButton>
      {:else}
        <SparkButton href="/lab">Buka Lab</SparkButton>
      {/if}
    {:else}
      <SparkButton onclick={markComplete}>Selesai</SparkButton>
    {/if}
  </div>
</div>
