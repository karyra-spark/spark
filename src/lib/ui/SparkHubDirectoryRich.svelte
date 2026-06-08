<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { hubResources } from '$content/spark-content';
  import {
    categoryLabel,
    readinessCopy,
    readinessLabel,
    riskCopy,
    riskTone
  } from '$lib/hub/hub-rich-model';
  import { gatewayState, toggleHubResource } from '$state/gateway-state.svelte';
  import { getReadinessScore } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  const categories = ['all', 'reading', 'apps', 'tools', 'community', 'games', 'missions'] as const;
  type Category = (typeof categories)[number];

  let activeCategory = $state<Category>('all');
  let search = $state('');

  const normalizedSearch = $derived(search.trim().toLowerCase());

  function gated(readiness: string) {
    return readiness === 'after-passport' && getReadinessScore() < 60;
  }

  const filtered = $derived(
    hubResources.filter((resource) => {
      const categoryMatch = activeCategory === 'all' || resource.category === activeCategory;
      const searchMatch = normalizedSearch
        ? `${resource.title} ${resource.summary} ${resource.category} ${resource.readiness} ${resource.riskLabel}`.toLowerCase().includes(normalizedSearch)
        : true;

      return categoryMatch && searchMatch;
    })
  );

  function saveResource(id: string, title: string) {
    const already = gatewayState.savedHubResourceIds.includes(id);
    toggleHubResource(id);
    pushToast({
      title: already ? 'Resource dihapus' : 'Resource disimpan',
      copy: title,
      tone: already ? 'info' : 'success'
    });
  }
</script>

<SparkCard class="hub-directory-tools">
  <label>
    <span>Cari resource</span>
    <input bind:value={search} type="search" placeholder="Cari apps, tools, community, Starknet..." />
  </label>

  <div class="hub-filter-row rich">
    {#each categories as category}
      <button type="button" class:active={activeCategory === category} onclick={() => (activeCategory = category)}>
        {categoryLabel(category)}
      </button>
    {/each}
  </div>
</SparkCard>

<div class="hub-directory-rich">
  {#if filtered.length > 0}
    {#each filtered as resource}
      {@const saved = gatewayState.savedHubResourceIds.includes(resource.id)}
      {@const locked = gated(resource.readiness)}
      <SparkCard class={`hub-resource-rich ${resource.riskLabel} ${locked ? 'locked' : ''} ${saved ? 'saved' : ''}`}>
        <div class="hub-resource-rich-top">
          <span class="hub-resource-icon">
            <SparkIcon name={resource.category === 'tools' ? 'settings' : resource.category === 'community' ? 'users' : resource.category === 'apps' ? 'compass' : 'book-open'} size={19} />
          </span>
          <div>
            <SparkTrustBadge label={categoryLabel(resource.category)} tone="beta" />
            <SparkTrustBadge label={resource.riskLabel} tone={riskTone(resource.riskLabel)} />
          </div>
        </div>

        <h3>{resource.title}</h3>
        <p>{resource.summary}</p>

        <div class="hub-resource-info">
          <div>
            <strong>{readinessLabel(resource.readiness)}</strong>
            <small>{readinessCopy(resource.readiness)}</small>
          </div>
          <div>
            <strong>Risiko</strong>
            <small>{riskCopy(resource.riskLabel)}</small>
          </div>
        </div>

        {#if locked}
          <div class="hub-gate-rich">
            <SparkIcon name="shield" size={16} />
            <div>
              <strong>Disarankan setelah Passport 60%+</strong>
              <small>Resource tetap terlihat, tetapi Spark menyarankan menyelesaikan fondasi dulu.</small>
            </div>
          </div>
        {/if}

        <div class="hub-resource-actions">
          <SparkButton href={locked ? '/profile' : resource.url} variant={locked ? 'secondary' : 'primary'}>
            {locked ? 'Lihat langkah agar siap' : 'Buka Resource'}
          </SparkButton>
          <SparkButton variant="ghost" onclick={() => saveResource(resource.id, resource.title)}>
            {saved ? 'Tersimpan' : 'Simpan'}
          </SparkButton>
        </div>
      </SparkCard>
    {/each}
  {:else}
    <SparkCard class="hub-empty-state">
      <SparkIcon name="compass" size={28} />
      <h3>Resource tidak ditemukan</h3>
      <p>Coba filter lain atau hapus kata pencarian.</p>
    </SparkCard>
  {/if}
</div>
