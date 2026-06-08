<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { appFlowSteps } from '$lib/flow/flow-model';
  import { betaSession } from '$state/beta-session-state.svelte';
  import { gatewayState } from '$state/gateway-state.svelte';
  import { getCompletedLessonCount, getReadinessScore, learningState } from '$state/learning-state.svelte';

  function isDone(signal: string) {
    if (signal === 'account') return Boolean(betaSession.user);
    if (signal === 'core') return getCompletedLessonCount() > 0;
    if (signal === 'lesson') return getCompletedLessonCount() > 0;
    if (signal === 'lab') return learningState.completedLabIds.length > 0;
    if (signal === 'passport') return getReadinessScore() >= 45;
    if (signal === 'community') return gatewayState.registeredWorkshopIds.length > 0;
    if (signal === 'hub') return getReadinessScore() >= 75;
    return false;
  }
</script>

<SparkCard class="spark-app-flow-checklist pass35b-flow-checklist" density="compact">
  <div class="flow-checklist-head">
    <div>
      <span class="spark-eyebrow">Alur aplikasi</span>
      <h2>Jalur utama Spark.</h2>
      <p>Masuk, belajar, praktik, cek Passport, lalu jelajahi komunitas dan Hub.</p>
    </div>
    <SparkTrustBadge label="Flow aktif" tone="safe" />
  </div>

  <div class="flow-checklist-grid">
    {#each appFlowSteps as step}
      <a href={step.href} class:done={isDone(step.signal)}>
        <span>
          <SparkIcon name={isDone(step.signal) ? 'check' : step.icon} size={16} />
        </span>
        <div>
          <strong>{step.title}</strong>
          <small>{step.copy}</small>
        </div>
        <em>›</em>
      </a>
    {/each}
  </div>
</SparkCard>
