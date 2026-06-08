<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { communityMetrics } from '$lib/community/community-model';
</script>

<div class="spark-community-impact">
  {#each communityMetrics as metric}
    <SparkCard>
      <div class="metric-head-row">
        <span class="community-metric-icon"><SparkIcon name={metric.icon} size={18} /></span>
        <SparkTrustBadge label={metric.trustLabel} tone="target" copy="Angka ini adalah target/arah awal, bukan klaim traction final." />
      </div>
      <strong>{metric.value}</strong>
      <h3>{metric.label}</h3>
      <p>{metric.copy}</p>
    </SparkCard>
  {/each}
</div>
