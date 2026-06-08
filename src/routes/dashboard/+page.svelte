<script lang="ts">
  import SparkAppFlowChecklist from '$ui/SparkAppFlowChecklist.svelte';
  import SparkDashboardOperatingBoard from '$ui/SparkDashboardOperatingBoard.svelte';
  import SparkProtectedRoute from '$ui/SparkProtectedRoute.svelte';
</script>

<svelte:head>
  <title>Dashboard — Karyra Spark</title>
</svelte:head>

<SparkProtectedRoute title="Masuk untuk melihat progres" copy="Dashboard berisi fokus belajar, progress, dan langkah berikutnya yang tersimpan untuk akun kamu.">
  <SparkDashboardOperatingBoard />

  <section class="spark-section compact-flow-section">
    <SparkAppFlowChecklist />
  </section>
</SparkProtectedRoute>
