<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { communityCohorts, communityImpactRows } from '$lib/community/community-rich-model';
</script>

<div class="community-impact-grid">
  {#each communityImpactRows as row}
    <SparkCard>
      <span class="community-impact-icon"><SparkIcon name={row.icon} size={18} /></span>
      <strong>{row.value}</strong>
      <h3>{row.label}</h3>
      <p>{row.copy}</p>
    </SparkCard>
  {/each}
</div>

<div class="cohort-board-rich">
  {#each communityCohorts as cohort}
    <SparkCard class="cohort-rich-card">
      <div class="cohort-rich-top">
        <SparkTrustBadge label={cohort.status} tone={cohort.status === 'Berjalan' ? 'safe' : cohort.status === 'Pendaftaran Dibuka' ? 'beta' : 'target'} />
        <span>{cohort.members} peserta contoh</span>
      </div>

      <h3>{cohort.title}</h3>
      <p>{cohort.copy}</p>

      <div class="cohort-rich-meta">
        <span><SparkIcon name="compass" size={14} /> {cohort.location}</span>
        <span><SparkIcon name="user-round" size={14} /> {cohort.facilitator}</span>
      </div>

      <a href={cohort.href}>Lihat jalur <em>›</em></a>
    </SparkCard>
  {/each}
</div>
