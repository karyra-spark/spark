<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { hubMilestones } from '$lib/hub/hub-rich-model';
  import {
    getCompletedLessonCount,
    getReadinessScore,
    learningState
  } from '$state/learning-state.svelte';

  function done(index: number) {
    if (index === 0) return getCompletedLessonCount() > 0;
    if (index === 1) return learningState.completedLabIds.length > 0;
    if (index === 2) return getReadinessScore() >= 45;
    return getReadinessScore() >= 75;
  }
</script>

<div class="hub-milestone-path">
  {#each hubMilestones as item, index}
    <a href={item.href} class:done={done(index)}>
      <SparkCard>
        <span>
          <SparkIcon name={done(index) ? 'check' : item.icon} size={18} />
        </span>
        <div>
          <strong>{item.title}</strong>
          <small>{item.copy}</small>
        </div>
        <em>{index + 1}</em>
      </SparkCard>
    </a>
  {/each}
</div>
