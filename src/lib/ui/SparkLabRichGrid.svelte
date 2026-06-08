<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { sparkLabs } from '$content/spark-content';
  import { difficultyLabel, difficultyTone, labGuardrail, labOutcome } from '$lib/lab/lab-rich-model';
  import { completeLab, learningState } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  function markDone(id: string, title: string) {
    completeLab(id);
    pushToast({
      title: 'Lab selesai',
      copy: `${title} masuk sebagai sinyal praktik lokal.`,
      tone: 'success'
    });
  }
</script>

<div class="lab-rich-grid">
  {#each sparkLabs as lab, index}
    {@const done = learningState.completedLabIds.includes(lab.id)}
    {@const locked = lab.requiresBridge && learningState.experience !== 'explorer'}
    <SparkCard class={`lab-rich-card ${lab.difficulty} ${done ? 'done' : ''}`}>
      <div class="lab-rich-head">
        <span class={`lab-index ${lab.difficulty}`}>{index + 1}</span>
        <div class="lab-badge-row">
          <SparkTrustBadge label={done ? 'Selesai' : difficultyLabel(lab.difficulty)} tone={done ? 'safe' : difficultyTone(lab.difficulty)} />
          {#if locked}<SparkTrustBadge label="Bridge warning" tone="target" />{/if}
        </div>
      </div>

      <h3>{lab.title}</h3>
      <p>{lab.summary}</p>

      <div class="lab-proof-line">
        <span><SparkIcon name="target" size={15} /></span>
        <div>
          <strong>Outcome</strong>
          <small>{labOutcome(lab)}</small>
        </div>
      </div>

      <div class="lab-proof-line warning">
        <span><SparkIcon name="shield" size={15} /></span>
        <div>
          <strong>Guardrail</strong>
          <small>{labGuardrail(lab)}</small>
        </div>
      </div>

      <div class="lab-step-list">
        {#each lab.steps as step, stepIndex}
          <div>
            <span>{stepIndex + 1}</span>
            <small>{step}</small>
          </div>
        {/each}
      </div>

      <div class="lab-rich-actions">
        <SparkButton onclick={() => markDone(lab.id, lab.title)} disabled={done}>
          {done ? 'Praktik Tercatat' : lab.action}
        </SparkButton>
        {#if lab.id === 'cairo-preview'}
          <SparkButton href="/lesson/cairo-gentle-intro" variant="secondary">Baca Bridge</SparkButton>
        {/if}
      </div>
    </SparkCard>
  {/each}
</div>
