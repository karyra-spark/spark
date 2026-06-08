<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { hubMissions } from '$lib/hub/hub-model';
</script>

<div class="spark-hub-mission-board">
  {#each hubMissions as mission, index}
    <SparkCard class="hub-mission-card">
      <span class="mission-index">{index + 1}</span>
      <div>
        <span class={`mission-level ${mission.level === 'Teknis' ? 'technical' : mission.level === 'Terarah' ? 'guided' : 'beginner'}`}>
          {mission.level}
        </span>
        <h3>{mission.title}</h3>
        <p>{mission.copy}</p>
        <SparkButton href={mission.href} variant="secondary">
          <SparkIcon name="chevron-right" size={15} />
          Mulai
        </SparkButton>
      </div>
    </SparkCard>
  {/each}
</div>
