<script lang="ts">
  import type { SparkLab } from '$content/spark-content';
  import SparkAsyncButton from './SparkAsyncButton.svelte';
  import SparkBridgeWarning from './SparkBridgeWarning.svelte';
  import SparkCard from './SparkCard.svelte';
  import { completeLab, getReadinessScore, learningState } from '$state/learning-state.svelte';

  type Props = {
    lab: SparkLab;
  };

  let { lab }: Props = $props();

  const completed = $derived(learningState.completedLabIds.includes(lab.id));
  const needsBridge = $derived(Boolean(lab.requiresBridge && learningState.experience !== 'explorer'));
  const readinessLow = $derived(lab.difficulty === 'technical' && getReadinessScore() < 40);

  async function runLab() {
    await new Promise((resolve) => setTimeout(resolve, 900));
    completeLab(lab.id);
  }
</script>

<SparkCard tone={lab.difficulty === 'technical' ? 'purple' : lab.difficulty === 'guided' ? 'blue' : 'green'} class="spark-lab-console">
  <div class="lab-console-head">
    <span class="spark-eyebrow">{lab.difficulty}</span>
    <span class:done={completed} class="lab-status">{completed ? 'Selesai' : `${lab.estimatedMinutes} menit`}</span>
  </div>

  <h3>{lab.title}</h3>
  <p>{lab.summary}</p>

  {#if needsBridge || readinessLow}
    <SparkBridgeWarning copy={lab.readinessHint} />
  {/if}

  <div class="lab-step-list">
    {#each lab.steps as step, index}
      <span>{index + 1}. {step}</span>
    {/each}
  </div>

  <SparkAsyncButton
    id={`lab-${lab.id}`}
    onrun={runLab}
    successTitle={completed ? 'Lab sudah selesai' : 'Lab selesai'}
    successCopy={`${lab.title} masuk ke readiness Passport.`}
  >
    {completed ? 'Jalankan Lagi' : lab.action}
  </SparkAsyncButton>
</SparkCard>
