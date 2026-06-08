\
<script lang="ts">
  import { onMount } from 'svelte';
  import SparkCommunityCommandCenter from '$ui/SparkCommunityCommandCenter.svelte';
  import SparkCommunityTabbedSurface from '$ui/SparkCommunityTabbedSurface.svelte';
  import { hydrateGatewayStateFromBackend } from '$state/gateway-state.svelte';

  onMount(() => {
    void hydrateGatewayStateFromBackend();
  });
</script>

<svelte:head>
  <title>Community & Workshop — Karyra Spark</title>
</svelte:head>

<SparkCommunityCommandCenter />
<SparkCommunityTabbedSurface />
