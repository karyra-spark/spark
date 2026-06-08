<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import { hubResources } from '$content/spark-content';
  import { getReadinessScore } from '$state/learning-state.svelte';
  import { gatewayState, toggleHubResource } from '$state/gateway-state.svelte';

  const categories = ['all', 'reading', 'apps', 'tools', 'community', 'games', 'missions'] as const;
  type Category = (typeof categories)[number];

  let activeCategory = $state<Category>('all');

  const filtered = $derived(
    activeCategory === 'all'
      ? hubResources
      : hubResources.filter((resource) => resource.category === activeCategory)
  );

  function gated(readiness: string) {
    return readiness === 'after-passport' && getReadinessScore() < 60;
  }
</script>

<div class="hub-filter-row">
  {#each categories as category}
    <button type="button" class:active={activeCategory === category} onclick={() => (activeCategory = category)}>
      {category}
    </button>
  {/each}
</div>

<div class="spark-hub-directory">
  {#each filtered as resource}
    {@const saved = gatewayState.savedHubResourceIds.includes(resource.id)}
    {@const locked = gated(resource.readiness)}

    <SparkCard tone={locked ? 'orange' : resource.riskLabel === 'technical' ? 'purple' : 'blue'} class="hub-resource-card">
      <div class="hub-resource-top">
        <span class="spark-eyebrow">{resource.category}</span>
        <span class={`risk ${resource.riskLabel}`}>{resource.riskLabel}</span>
      </div>

      <h3>{resource.title}</h3>
      <p>{resource.summary}</p>
      <small>{resource.readiness}</small>

      {#if locked}
        <div class="hub-gate">
          <strong>Disarankan setelah Passport 60%+</strong>
          <p>Resource ini tetap terlihat, tetapi Spark menyarankan menyelesaikan fondasi dulu agar eksplorasi lebih aman.</p>
        </div>
      {/if}

      <div class="hub-actions">
        <SparkButton href={locked ? '/profile' : resource.url} variant={locked ? 'secondary' : 'primary'}>
          {locked ? 'Lihat langkah agar siap' : 'Buka Resource'}
        </SparkButton>
        <button class:active={saved} class="save-resource" type="button" onclick={() => toggleHubResource(resource.id)}>
          {saved ? '✓ Tersimpan' : '+ Simpan'}
        </button>
      </div>
    </SparkCard>
  {/each}
</div>
