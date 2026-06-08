<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { getModeLabel } from '$lib/learning/recommendation';
  import {
    getCompletedLessonCount,
    getLearningProgressPercent,
    getReadinessScore,
    getRecommendedLessonSlug,
    getTotalLessonCount,
    learningState
  } from '$state/learning-state.svelte';

  const overviewItems = $derived([
    {
      icon: 'book-open',
      label: 'Lesson',
      value: `${getCompletedLessonCount()}/${getTotalLessonCount()}`,
      copy: 'Materi selesai'
    },
    {
      icon: 'check',
      label: 'Checkpoint',
      value: `${Object.values(learningState.checkpointAnswers).filter((answer) => answer.correct).length}`,
      copy: 'Jawaban benar'
    },
    {
      icon: 'shield',
      label: 'Readiness',
      value: `${getReadinessScore()}%`,
      copy: 'Passport awal'
    }
  ]);
</script>

<section class="spark-core-overview">
  <SparkCard class="core-continue-card">
    <div class="core-continue-main">
      <span class="spark-eyebrow">Continue learning</span>
      <h2>Langkah berikutnya: mulai Core Beginner, naik bertahap ke Starknet.</h2>
      <p>
        Spark menjaga jalur tetap sederhana: pahami konsep, jawab checkpoint, praktik aman,
        lalu kumpulkan sinyal readiness di Passport.
      </p>

      <div class="spark-stat-row">
        <span>{getLearningProgressPercent()}% belajar</span>
        <span>{getReadinessScore()}% readiness</span>
        <span>{getModeLabel()}</span>
      </div>
    </div>

    <div class="core-continue-actions">
      <SparkButton href={`/lesson/${getRecommendedLessonSlug()}`}>Lanjut Lesson</SparkButton>
      <SparkButton href="#modules" variant="secondary">Lihat Modul</SparkButton>
    </div>
  </SparkCard>

  <div class="core-overview-grid">
    {#each overviewItems as item}
      <SparkCard>
        <div class="core-overview-icon">
          <SparkIcon name={item.icon} size={18} />
        </div>
        <span>{item.label}</span>
        <strong class="big">{item.value}</strong>
        <p>{item.copy}</p>
      </SparkCard>
    {/each}
  </div>
</section>
