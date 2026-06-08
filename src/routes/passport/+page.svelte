<script lang="ts">
  import SparkPassportReadinessCenter from '$ui/SparkPassportReadinessCenter.svelte';
  import SparkPassportBackendPanel from '$ui/SparkPassportBackendPanel.svelte';
  import SparkPassportGuestPreview from '$ui/SparkPassportGuestPreview.svelte';
  import { betaSession } from '$state/beta-session-state.svelte';

  const signedIn = $derived(Boolean(betaSession.user));
</script>

<svelte:head>
  <title>Passport — Karyra Spark</title>
  <meta
    name="description"
    content="Passport Spark membantu pengguna melihat kesiapan belajar, latihan aman, dan langkah berikutnya sebelum menjelajahi blockchain dan Starknet secara bertahap."
  />
</svelte:head>

{#if signedIn}
  <SparkPassportReadinessCenter />
  <SparkPassportBackendPanel />
{:else}
  <SparkPassportGuestPreview />
{/if}
