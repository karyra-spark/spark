<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { sparkCohorts } from '$lib/community/community-model';
</script>

<div class="spark-cohort-board">
  {#each sparkCohorts as cohort}
    <SparkCard class="spark-cohort-card">
      <div class="cohort-card-top">
        <span class={`cohort-status ${cohort.status === 'Berjalan' ? 'green' : cohort.status === 'Pendaftaran Dibuka' ? 'blue' : 'orange'}`}>
          {cohort.status}
        </span>
        <SparkTrustBadge label={cohort.trustLabel} tone="local" copy="Cohort contoh untuk alur beta/frontend." />
      </div>

      <div class="cohort-icon">
        <SparkIcon name={cohort.status === 'Berjalan' ? 'layers' : cohort.status === 'Pendaftaran Dibuka' ? 'users' : 'clock'} size={20} />
      </div>

      <h3>{cohort.title}</h3>
      <p>{cohort.summary}</p>

      <div class="cohort-meta">
        <span><SparkIcon name="user-round" size={14} /> {cohort.facilitator}</span>
        <span><SparkIcon name="compass" size={14} /> {cohort.location}</span>
        <span><SparkIcon name="users" size={14} /> {cohort.members} kapasitas contoh</span>
      </div>

      <SparkButton href={cohort.relatedPath} variant="secondary">Lihat Jalur</SparkButton>
    </SparkCard>
  {/each}
</div>
