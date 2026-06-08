<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { hubRailItems } from '$lib/hub/hub-rich-model';
  import { getHubAccessCopy } from '$lib/profile/profile-model';
  import { gatewayState } from '$state/gateway-state.svelte';
  import {
    getCompletedLessonCount,
    getReadinessScore,
    learningState
  } from '$state/learning-state.svelte';

  const readiness = $derived(getReadinessScore());
  const access = $derived(getHubAccessCopy(readiness));
</script>

<section class="hub-command-center">
  <div>
    <span class="spark-eyebrow">Spark Hub</span>
    <h1>Gateway eksplorasi setelah pengguna punya arah.</h1>
    <p>Hub membantu kamu menemukan resource yang tepat sesuai kesiapanmu. Hub adalah gateway berlapis untuk resource, aplikasi, tools, komunitas, dan misi yang diberi label readiness.</p>

    <div class="hub-command-actions">
      <SparkButton href={access.href}>{access.cta}</SparkButton>
      <SparkButton href="/profile" variant="secondary">Lihat langkah agar siap</SparkButton>
    </div>
  </div>

  <aside class="hub-command-panel">
    <div class="hub-command-badges">
      <SparkTrustBadge label={access.unlocked ? 'Hub terbuka' : 'Bertahap'} tone={access.unlocked ? 'safe' : 'target'} />
      <SparkTrustBadge label="Curated gateway" tone="beta" />
    </div>

    <SparkCard class="hub-readiness-card">
      <div class="hub-readiness-ring" style={`--value: ${readiness}`}>{readiness}%</div>
      <div>
        <small>Hub readiness</small>
        <strong>{access.title}</strong>
        <p>{access.copy}</p>
      </div>
    </SparkCard>

    <div class="hub-mini-grid">
      <div>
        <strong>{gatewayState.savedHubResourceIds.length}</strong>
        <span>Resource tersimpan</span>
      </div>
      <div>
        <strong>{getCompletedLessonCount()}</strong>
        <span>Materi selesai</span>
      </div>
      <div>
        <strong>{learningState.completedLabIds.length}</strong>
        <span>Lab selesai</span>
      </div>
    </div>
  </aside>
</section>

<section class="hub-rail-grid">
  {#each hubRailItems as item}
    <a href={item.href}>
      <SparkCard tone={item.tone}>
        <span><SparkIcon name={item.icon} size={19} /></span>
        <div>
          <div class="hub-rail-top">
            <strong>{item.title}</strong>
            <em>{item.gate}</em>
          </div>
          <p>{item.copy}</p>
        </div>
      </SparkCard>
    </a>
  {/each}
</section>
