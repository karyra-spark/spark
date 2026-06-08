<script lang="ts">
  import SparkProfileIdentityCenter from '$ui/SparkProfileIdentityCenter.svelte';
  import SparkProtectedRoute from '$ui/SparkProtectedRoute.svelte';
</script>

<svelte:head>
  <title>Profil — Karyra Spark</title>
  <meta name="description" content="Profil Karyra Spark berisi identitas akun pribadi dan preferensi dasar pengguna." />
</svelte:head>

<SparkProtectedRoute title="Masuk untuk membuka Profil" copy="Profil berisi identitas akun pribadi kamu di Spark.">
  <SparkProfileIdentityCenter />
</SparkProtectedRoute>
