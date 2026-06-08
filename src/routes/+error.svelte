<script lang="ts">
  import { page } from '$app/state';
  import SparkAppFallback from '$ui/SparkAppFallback.svelte';

  const status = $derived(page.status);
  const message = $derived(page.error?.message ?? 'Halaman tidak tersedia.');
</script>

<svelte:head>
  <title>{status} — Karyra Spark</title>
</svelte:head>

<SparkAppFallback {status} {message} />
