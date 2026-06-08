<script lang="ts">
  import SparkInboxShell from '$ui/SparkInboxShell.svelte';
  import SparkProtectedRoute from '$ui/SparkProtectedRoute.svelte';
</script>

<svelte:head>
  <title>Pesan — Karyra Spark</title>
</svelte:head>

<SparkProtectedRoute title="Masuk untuk membaca pesan belajar" copy="Pesan dan arahan pribadi hanya ditampilkan setelah kamu masuk.">
  <SparkInboxShell />
</SparkProtectedRoute>
