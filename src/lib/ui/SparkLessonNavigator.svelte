<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { getFlatLessons, getLessonPosition, getLessonProgressPercent } from '$lib/learning/lesson-navigation';
  import { learningState } from '$state/learning-state.svelte';

  type Props = {
    slug: string;
  };

  let { slug }: Props = $props();

  const lessons = $derived(getFlatLessons());
  const position = $derived(getLessonPosition(slug));
  const progress = $derived(getLessonProgressPercent(slug));

  function isComplete(lessonSlug: string) {
    return learningState.completedLessonSlugs.includes(lessonSlug);
  }
</script>

{#if position}
  <SparkCard class="lesson-navigation-card">
    <span class="spark-eyebrow">Lesson path</span>
    <div class="lesson-progress-head">
      <strong>{position.index + 1}/{position.total}</strong>
      <small>{progress}% jalur lesson</small>
    </div>

    <div class="lesson-progress-bar">
      <span style={`width: ${progress}%`}></span>
    </div>

    <div class="lesson-mini-list">
      {#each lessons as item}
        <a
          href={`/lesson/${item.lesson.slug}`}
          class:active={item.lesson.slug === slug}
          class:complete={isComplete(item.lesson.slug)}
        >
          <span>
            {#if isComplete(item.lesson.slug)}
              <SparkIcon name="check" size={14} />
            {:else}
              {item.index + 1}
            {/if}
          </span>
          <strong>{item.lesson.title}</strong>
        </a>
      {/each}
    </div>

    <div class="lesson-nav-actions">
      {#if position.previousSlug}
        <SparkButton href={`/lesson/${position.previousSlug}`} variant="secondary">Sebelumnya</SparkButton>
      {/if}
      {#if position.nextSlug}
        <SparkButton href={`/lesson/${position.nextSlug}`}>Berikutnya</SparkButton>
      {:else}
        <SparkButton href="/lab">Lanjut ke Lab</SparkButton>
      {/if}
    </div>
  </SparkCard>
{/if}
