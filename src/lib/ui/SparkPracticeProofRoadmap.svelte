<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { practiceProofRoadmap } from '$lib/lab/lab-model';
</script>

<div class="spark-practice-proof-roadmap">
  {#each practiceProofRoadmap as item}
    <SparkCard>
      <span><SparkIcon name={item.icon} size={18} /></span>
      <em>{item.phase}</em>
      <strong>{item.proof}</strong>
      <p>{item.status}</p>
    </SparkCard>
  {/each}
</div>
