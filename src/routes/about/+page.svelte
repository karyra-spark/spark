<script lang="ts">
  import SparkButton from '$ui/SparkButton.svelte';
  import SparkCard from '$ui/SparkCard.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
</script>

<svelte:head>
  <title>About — Karyra Spark</title>
  <meta name="description" content="Tentang Karyra Spark." />
</svelte:head>

<section class="spark-info-hero">
  <div>
    <span class="spark-eyebrow">About</span>
    <h1>Belajar Starknet dengan jalur yang lebih manusiawi.</h1>
    <p>Spark menghubungkan Learn, Lab, Community, Passport, dan Hub dalam satu pengalaman belajar yang ramah untuk pemula.</p>
    <div class="spark-info-actions">
      <SparkButton href="/core">Mulai dari Lesson Pertama</SparkButton>
      <SparkButton href="/docs" variant="secondary">Baca docs</SparkButton>
    </div>
  </div>
</section>


<section class="spark-info-grid two">
  <SparkCard><SparkIcon name="users" size={19} /><h2>Untuk pemula dan komunitas</h2><p>Spark dirancang agar orang yang belum teknis tetap bisa memahami konsep blockchain dan Starknet tanpa merasa dipaksa masuk terlalu cepat.</p></SparkCard>
  <SparkCard><SparkIcon name="compass" size={19} /><h2>Teknis saat sudah siap</h2><p>Materi teknis, Hub, dan resource lanjutan tetap ada, tetapi dibuka dengan konteks agar eksplorasi lebih aman.</p></SparkCard>
</section>
<section class="spark-info-panel"><h2>Misi produk</h2><p>Membuat jalur belajar yang manusiawi: mulai dari bahasa sederhana, latihan aman, komunitas lokal, lalu eksplorasi Starknet yang lebih terarah.</p></section>
