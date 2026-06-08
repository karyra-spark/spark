<script lang="ts">
  import SparkIcon from './SparkIcon.svelte';
  import { sparkLabs } from '$content/spark-content';
  import { learningState } from '$state/learning-state.svelte';

  function isDone(id: string) {
    return learningState.completedLabIds.includes(id);
  }
</script>

<div class="spark-weekly-targets">
  {#each sparkLabs.slice(0, 3) as lab}
    <a href="/lab" class:done={isDone(lab.id)}>
      <span>
        {#if isDone(lab.id)}
          <SparkIcon name="check" size={15} />
        {/if}
      </span>
      <strong>{lab.title}</strong>
      <em>{lab.difficulty}</em>
      <small>{isDone(lab.id) ? 'Selesai' : '0/1'}</small>
    </a>
  {/each}
</div>
