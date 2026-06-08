<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { sparkWorkshops } from '$content/spark-content';
  import { formatWorkshopFormat, workshopCapacityPercent } from '$lib/community/community-rich-model';
  import { gatewayState, toggleWorkshopRegistration } from '$state/gateway-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  function toggle(id: string, title: string) {
    const already = gatewayState.registeredWorkshopIds.includes(id);
    toggleWorkshopRegistration(id);
    pushToast({
      title: already ? 'Workshop dibatalkan' : 'Workshop tersimpan',
      copy: title,
      tone: already ? 'info' : 'success'
    });
  }
</script>

<div class="workshop-event-grid">
  {#each sparkWorkshops as workshop}
    {@const registered = gatewayState.registeredWorkshopIds.includes(workshop.id)}
    {@const percent = workshopCapacityPercent(workshop, registered)}
    <SparkCard class={`workshop-event-card ${registered ? 'registered' : ''}`}>
      <div class="workshop-event-top">
        <div class="workshop-date-badge">
          <strong>{workshop.date === 'Akan dijadwalkan' ? 'TBD' : workshop.date.slice(0, 2)}</strong>
          <span>{workshop.date === 'Akan dijadwalkan' ? 'Jadwal' : 'Event'}</span>
        </div>
        <div class="workshop-top-copy">
          <SparkTrustBadge label={formatWorkshopFormat(workshop.format)} tone="beta" />
          {#if registered}<SparkTrustBadge label="Tersimpan" tone="safe" />{/if}
        </div>
      </div>

      <h3>{workshop.title}</h3>
      <p>{workshop.summary}</p>

      <div class="workshop-meta-grid">
        <span><SparkIcon name="compass" size={14} /> {workshop.location}</span>
        <span><SparkIcon name="user-round" size={14} /> {workshop.facilitator}</span>
        <span><SparkIcon name="users" size={14} /> {workshop.registered + (registered ? 1 : 0)}/{workshop.capacity} kapasitas</span>
      </div>

      <div class="workshop-capacity-bar">
        <span style={`width: ${percent}%`}></span>
      </div>

      <div class="workshop-event-actions">
        <SparkButton onclick={() => toggle(workshop.id, workshop.title)}>
          {registered ? 'Batalkan Simpanan' : 'Simpan Workshop'}
        </SparkButton>
        <SparkButton href={`/core#curriculum`} variant="secondary">Materi Terkait</SparkButton>
      </div>
    </SparkCard>
  {/each}
</div>
