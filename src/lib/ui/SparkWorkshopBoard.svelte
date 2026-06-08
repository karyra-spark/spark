<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkAsyncButton from './SparkAsyncButton.svelte';
  import { sparkWorkshops } from '$content/spark-content';
  import { gatewayState, toggleWorkshopRegistration } from '$state/gateway-state.svelte';

  async function toggle(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 480));
    toggleWorkshopRegistration(id);
  }
</script>

<div class="spark-workshop-board">
  {#each sparkWorkshops as workshop}
    {@const registered = gatewayState.registeredWorkshopIds.includes(workshop.id)}
    {@const current = workshop.registered + (registered ? 1 : 0)}
    {@const remaining = Math.max(0, workshop.capacity - current)}

    <SparkCard tone="pink" class="workshop-card">
      <div class="workshop-top">
        <span class="spark-eyebrow">{workshop.format}</span>
        <span class="workshop-capacity">{current}/{workshop.capacity}</span>
      </div>

      <h3>{workshop.title}</h3>
      <p>{workshop.summary}</p>

      <div class="workshop-meta">
        <span>{workshop.date}</span>
        <span>{workshop.location}</span>
        <span>{workshop.facilitator}</span>
      </div>

      <div class="workshop-meter">
        <span style={`width: ${(current / workshop.capacity) * 100}%`}></span>
      </div>

      <small>{remaining} slot tersisa · terkait modul {workshop.relatedModuleId}</small>

      <SparkAsyncButton
        id={`workshop-${workshop.id}`}
        onrun={() => toggle(workshop.id)}
        successTitle={registered ? 'Registrasi dibatalkan' : 'Workshop tersimpan'}
        successCopy={registered ? 'Workshop dihapus dari profil komunitas.' : 'Workshop masuk ke profil komunitas lokal.'}
      >
        {registered ? 'Batalkan' : 'Daftar / Simpan'}
      </SparkAsyncButton>
    </SparkCard>
  {/each}
</div>
