<script lang="ts">
  import SparkButton from '$ui/SparkButton.svelte';
  import SparkCard from '$ui/SparkCard.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
</script>

<svelte:head>
  <title>Docs — Karyra Spark</title>
  <meta name="description" content="Dokumentasi Karyra Spark." />
</svelte:head>

<section class="spark-info-hero">
  <div>
    <span class="spark-eyebrow">Docs</span>
    <h1>Dokumentasi singkat untuk pengguna dan pengembang.</h1>
    <p>Halaman ini menjelaskan cara memakai Spark dan catatan teknis ringan tentang struktur aplikasi.</p>
    <div class="spark-info-actions">
      <SparkButton href="/help">Buka Help</SparkButton>
      <SparkButton href="/about" variant="secondary">Tentang Spark</SparkButton>
    </div>
  </div>
</section>


<section class="spark-docs-layout">
  <SparkCard><span class="spark-eyebrow">Non-teknis</span><h2>Cara memakai Spark</h2><p>Mulai dari Dashboard atau Learn. Selesaikan pelajaran dasar, gunakan Lab untuk latihan, lalu lihat Passport untuk membaca kesiapan. Hub dibuka sebagai ruang eksplorasi lanjutan.</p><ul><li>Learn: fondasi belajar</li><li>Lab: latihan aman</li><li>Community: workshop dan cohort</li><li>Passport: tanda perkembangan</li><li>Hub: resource lanjutan</li></ul></SparkCard>
  <SparkCard><span class="spark-eyebrow">Teknis ringan</span><h2>Struktur aplikasi</h2><p>Spark memakai SvelteKit dengan route modular, state lokal untuk preferensi/progress, asset brand di <code>/assets/brand</code>, dan cache policy ringan untuk menjaga HTML tetap segar.</p><ul><li>Theme: system/light/dark</li><li>Cookie notice: consent penting dan preferensi</li><li>Static assets: long-lived cache</li><li>HTML app shell: revalidate</li></ul></SparkCard>
</section>
<section class="spark-info-panel"><h2>Catatan keamanan</h2><p>Spark tidak menyimpan seed phrase, private key, atau kode pemulihan. Semua latihan awal harus tetap edukatif dan tidak meminta akses aset pribadi.</p></section>
