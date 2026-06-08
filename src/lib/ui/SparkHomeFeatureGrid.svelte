<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { homeQuickCards } from '$lib/home/home-model';
</script>

<div class="spark-home-feature-grid">
  {#each homeQuickCards as card}
    <a href={card.href}>
      <SparkCard tone={card.tone}>
        <span class="home-feature-icon"><SparkIcon name={card.icon} size={19} /></span>
        <div>
          <h3>{card.title}</h3>
          <p>{card.copy}</p>
        </div>
        <em>›</em>
      </SparkCard>
    </a>
  {/each}
</div>
