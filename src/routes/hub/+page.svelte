\
<script lang="ts">
  import { onMount } from 'svelte';
  import SparkHubCommandCenter from '$ui/SparkHubCommandCenter.svelte';
  import SparkHubDirectoryRich from '$ui/SparkHubDirectoryRich.svelte';
  import SparkHubMilestonePath from '$ui/SparkHubMilestonePath.svelte';
  import SparkHubMissionBoard from '$ui/SparkHubMissionBoard.svelte';
  import SparkSectionHeader from '$ui/SparkSectionHeader.svelte';
  import { hydrateGatewayStateFromBackend } from '$state/gateway-state.svelte';

  onMount(() => {
    void hydrateGatewayStateFromBackend();
  });
</script>

<svelte:head>
  <title>Hub Gateway — Karyra Spark</title>
</svelte:head>

<SparkHubCommandCenter />

<section class="spark-section">
  <SparkSectionHeader
    eyebrow="Hub path"
    title="Eksplorasi perlu urutan, bukan sekadar daftar link."
    copy="Spark membantu pengguna bergerak dari fondasi, praktik, Passport, lalu resource ekosistem."
  />
  <SparkHubMilestonePath />
</section>

<section class="spark-section">
  <SparkSectionHeader
    eyebrow="Hub missions"
    title="Misi ringan sebelum eksplorasi lebih jauh."
    copy="Misi Hub membantu pengguna tetap terarah setelah menyelesaikan fondasi awal."
  />
  <SparkHubMissionBoard />
</section>

<section class="spark-section" id="directory">
  <SparkSectionHeader
    eyebrow="Resource directory"
    title="Resource diberi label risiko dan readiness gate."
    copy="Resource tetap bisa dilihat, tetapi Spark memberi jembatan agar pengguna pemula tidak langsung masuk bagian teknis."
  />
  <SparkHubDirectoryRich />
</section>
