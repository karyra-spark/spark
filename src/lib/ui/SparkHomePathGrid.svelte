<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { homePathCards } from '$lib/home/home-model';
  import { learningState, setExperience } from '$state/learning-state.svelte';
</script>

<div class="spark-home-path-grid">
  {#each homePathCards as card}
    <button type="button" class:selected={learningState.experience === card.key} onclick={() => setExperience(card.key)}>
      <SparkCard tone={card.tone}>
        <div class="home-path-main">
          <span><SparkIcon name={card.icon} size={20} /></span>
          <div>
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
          </div>
        </div>
        <div class="home-path-footer">
          <em>{learningState.experience === card.key ? 'Aktif' : card.meta}</em>
          <strong>›</strong>
        </div>
      </SparkCard>
    </button>
  {/each}
</div>
