<script lang="ts">
  import SparkSettingsControlCenter from '$ui/SparkSettingsControlCenter.svelte';
  import SparkProtectedRoute from '$ui/SparkProtectedRoute.svelte';
</script>

<svelte:head>
  <title>Pengaturan — Karyra Spark</title>
</svelte:head>

<SparkProtectedRoute title="Masuk untuk membuka pengaturan akun" copy="Pengaturan menyimpan preferensi tampilan, cara belajar, dan akses akun kamu.">
  <SparkSettingsControlCenter />
</SparkProtectedRoute>
