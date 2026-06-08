<script lang="ts">
  import type { SparkLesson } from '$content/spark-content';
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { getNextLessonSlug } from '$lib/learning/lesson-navigation';
  import { completeLesson, learningState } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  type Props = {
    lesson: SparkLesson;
  };

  let { lesson }: Props = $props();

  const completed = $derived(learningState.completedLessonSlugs.includes(lesson.slug));
  const nextSlug = $derived(getNextLessonSlug(lesson.slug));

  function markComplete() {
    completeLesson(lesson.slug);
    pushToast({
      title: 'Materi selesai',
      copy: nextSlug ? 'Progress tersimpan lokal. Silakan lanjut ke lesson berikutnya.' : 'Semua lesson utama sudah kamu lalui.',
      tone: 'success'
    });
  }
</script>

<SparkCard class={`spark-lesson-completion-panel ${completed ? 'done' : ''}`}>
  <span class="lesson-completion-icon">
    <SparkIcon name={completed ? 'check' : 'book-open'} size={22} />
  </span>

  <div>
    <div class="lesson-completion-head">
      <span class="spark-eyebrow">{completed ? 'Materi selesai' : 'Selesaikan lesson'}</span>
      {#if completed}
        <SparkTrustBadge label="Tersimpan lokal" tone="safe" />
      {:else}
        <SparkTrustBadge label="Belum selesai" tone="target" />
      {/if}
    </div>

    <h2>{completed ? 'Pemahaman lesson ini sudah tercatat.' : 'Tandai selesai setelah kamu memahami inti lesson.'}</h2>
    <p>
      {completed
        ? 'Progress ini akan masuk ke Passport dan Dashboard. Saat backend siap, status ini bisa disinkronkan ke akun.'
        : 'Checkpoint tetap penting, tetapi tombol ini membantu pengguna menyelesaikan flow belajar secara jelas.'}
    </p>
  </div>

  <div class="lesson-completion-actions">
    {#if completed}
      {#if nextSlug}
        <SparkButton href={`/lesson/${nextSlug}`}>Lesson Berikutnya</SparkButton>
      {:else}
        <SparkButton href="/lab">Lanjut ke Lab</SparkButton>
      {/if}
      <SparkButton href="/dashboard" variant="secondary">Dashboard</SparkButton>
    {:else}
      <SparkButton onclick={markComplete}>Tandai Selesai</SparkButton>
      {#if nextSlug}
        <SparkButton href={`/lesson/${nextSlug}`} variant="ghost">Lewati ke Berikutnya</SparkButton>
      {/if}
    {/if}
  </div>
</SparkCard>
