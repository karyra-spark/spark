<script lang="ts">
  import SparkButton from '$ui/SparkButton.svelte';
  import SparkCard from '$ui/SparkCard.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
</script>

<svelte:head>
  <title>Help — Karyra Spark</title>
  <meta name="description" content="Bantuan menggunakan Karyra Spark." />
</svelte:head>

<section class="spark-info-hero">
  <div>
    <span class="spark-eyebrow">Help</span>
    <h1>Bantuan singkat untuk memakai Spark.</h1>
    <p>Temukan cara mulai belajar, membaca pesan, menjaga keamanan, dan membuka resource dengan ritme yang tenang.</p>
    <div class="spark-info-actions">
      <SparkButton href="/dashboard">Buka Dashboard</SparkButton>
      <SparkButton href="/faq" variant="secondary">Lihat FAQ</SparkButton>
    </div>
  </div>
</section>


<section class="spark-info-grid">
  <SparkCard><SparkIcon name="book-open" size={19} /><h2>Mulai dari Lesson Pertama</h2><p>Buka Learn, pilih pelajaran dasar, lalu selesaikan satu langkah kecil sebelum lanjut ke Lab.</p><a href="/core">Buka Learn</a></SparkCard>
  <SparkCard><SparkIcon name="shield" size={19} /><h2>Keamanan dulu</h2><p>Spark tidak meminta seed phrase, private key, atau akses aset. Fokus awalnya adalah pemahaman dan simulasi aman.</p><a href="/faq">Baca FAQ</a></SparkCard>
  <SparkCard><SparkIcon name="messages" size={19} /><h2>Pesan & pemberitahuan</h2><p>Lonceng berisi update singkat. Inbox menyimpan pesan yang lebih lengkap untuk dibaca nanti.</p><a href="/inbox">Buka Inbox</a></SparkCard>
</section>
<section class="spark-info-panel"><h2>Butuh arah cepat?</h2><p>Mulai dari Dashboard untuk melihat fokus hari ini. Jika baru pertama kali, buka Learn dulu, lalu Lab saat sudah nyaman.</p><SparkButton href="/dashboard">Buka Dashboard</SparkButton></section>
