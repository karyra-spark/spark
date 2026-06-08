<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { readinessSteps } from '$lib/home/home-model';
  import { gatewayState } from '$state/gateway-state.svelte';
  import {
    getCompletedLessonCount,
    getLearningProgressPercent,
    getReadinessScore,
    learningState
  } from '$state/learning-state.svelte';

  function isDone(key: string) {
    if (key === 'core') return getCompletedLessonCount() > 0;
    if (key === 'checkpoint') return Object.values(learningState.checkpointAnswers).some((answer) => answer.correct);
    if (key === 'lab') return learningState.completedLabIds.length > 0;
    if (key === 'community') return gatewayState.registeredWorkshopIds.length > 0;
    if (key === 'passport') return getReadinessScore() >= 45;
    if (key === 'hub') return getReadinessScore() >= 75;
    return false;
  }
</script>

<section class="spark-home-readiness-map">
  <SparkCard class="readiness-map-main">
    <div>
      <span class="spark-eyebrow">Peta kesiapanmu</span>
      <h2>Belajar → Praktik → Komunitas → Passport → Hub</h2>
      <p>{getCompletedLessonCount() > 0 ? 'Fondasi mulai terbentuk. Lanjutkan sampai readiness cukup.' : 'Mulai dari Core untuk membangun Passport.'}</p>

      <div class="readiness-map-bar">
        <span style={`width: ${Math.max(8, getReadinessScore())}%`}></span>
      </div>

      <small>{getLearningProgressPercent()}% progress belajar · {getReadinessScore()}% readiness</small>
    </div>

    <div class="readiness-map-score">
      <div class="spark-ring large" style={`--value: ${getReadinessScore()}`}>{getReadinessScore()}%</div>
      <strong>Passport</strong>
      <p>{getReadinessScore() >= 75 ? 'Hub siap dibuka.' : 'Bangun readiness sebelum eksplorasi penuh.'}</p>
    </div>
  </SparkCard>

  <div class="readiness-step-row">
    {#each readinessSteps as step}
      <a href={step.href} class:done={isDone(step.key)}>
        <span>
          {#if isDone(step.key)}
            <SparkIcon name="check" size={15} />
          {:else}
            <SparkIcon name={step.icon} size={15} />
          {/if}
        </span>
        <strong>{step.label}</strong>
      </a>
    {/each}
  </div>
</section>
