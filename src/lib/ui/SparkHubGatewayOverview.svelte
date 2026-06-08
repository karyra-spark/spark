<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { getHubAccessCopy } from '$lib/profile/profile-model';
  import { hubCategories } from '$lib/hub/hub-model';
  import { gatewayState } from '$state/gateway-state.svelte';
  import { getReadinessScore } from '$state/learning-state.svelte';

  const readiness = $derived(getReadinessScore());
  const access = $derived(getHubAccessCopy(readiness));
</script>

<section class="spark-hub-overview">
  <SparkCard class={`hub-overview-main ${access.unlocked ? 'unlocked' : 'locked'}`}>
    <div class="hub-overview-score">
      <div class="spark-ring large" style={`--value: ${readiness}`}>{readiness}%</div>
      <div>
        <span class="spark-eyebrow">Hub readiness</span>
        <h2>{access.title}</h2>
        <p>{access.copy}</p>
        <div class="spark-hero-actions">
          <SparkButton href={access.href}>{access.cta}</SparkButton>
          <SparkButton href="/profile" variant="secondary">Lihat Passport Saya</SparkButton>
        </div>
      </div>
    </div>
  </SparkCard>

  <SparkCard class="hub-saved-card">
    <span><SparkIcon name="bookmark" size={22} /></span>
    <strong>{gatewayState.savedHubResourceIds.length}</strong>
    <p>Resource Hub tersimpan untuk eksplorasi lanjutan.</p>
  </SparkCard>

  <div class="hub-category-grid">
    {#each hubCategories as category}
      <a href={category.href} class={`hub-category-card ${category.gate}`}>
        <span><SparkIcon name={category.icon} size={18} /></span>
        <strong>{category.title}</strong>
        <small>{category.copy}</small>
        <em>{category.gate}</em>
      </a>
    {/each}
  </div>
</section>
