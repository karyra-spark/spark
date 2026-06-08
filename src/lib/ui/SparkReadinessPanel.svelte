<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import { getCompletedLessonCount, getLearningProgressPercent, getReadinessScore, getTotalLessonCount, learningState } from '$state/learning-state.svelte';
  import { gatewayState } from '$state/gateway-state.svelte';

  const items = $derived([
    { label: 'Learning', value: `${getCompletedLessonCount()}/${getTotalLessonCount()}`, copy: 'Materi selesai' },
    { label: 'Checkpoint', value: `${Object.values(learningState.checkpointAnswers).filter((answer) => answer.correct).length}`, copy: 'Jawaban benar' },
    { label: 'Practice', value: `${learningState.completedLabIds.length}/3`, copy: 'Lab selesai' },
    { label: 'Community', value: `${gatewayState.registeredWorkshopIds.length}`, copy: 'Workshop terdaftar' },
    { label: 'Hub', value: `${gatewayState.savedHubResourceIds.length}`, copy: 'Resource tersimpan' }
  ]);
</script>

<div class="spark-readiness-panel">
  <SparkCard class="readiness-main">
    <span class="spark-eyebrow">Readiness Passport</span>
    <div class="readiness-score">
      <div class="spark-ring large" style={`--value: ${getReadinessScore()}`}>{getReadinessScore()}%</div>
      <div>
        <h3>Belajar → Praktik → Komunitas → Hub</h3>
        <p>{getLearningProgressPercent()}% progress belajar. Passport merangkum sinyal utama perjalanan Spark.</p>
      </div>
    </div>
  </SparkCard>

  <div class="readiness-grid">
    {#each items as item}
      <SparkCard>
        <span>{item.label}</span>
        <strong class="big">{item.value}</strong>
        <p>{item.copy}</p>
      </SparkCard>
    {/each}
  </div>
</div>
