<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { communityActivations } from '$lib/community/community-model';
</script>

<div class="spark-activation-grid">
  {#each communityActivations as item}
    <a href={item.href}>
      <SparkCard tone={item.tone}>
        <span class="activation-icon"><SparkIcon name={item.icon} size={19} /></span>
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
      </SparkCard>
    </a>
  {/each}
</div>
