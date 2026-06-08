<script lang="ts">
  import SparkButton from '$ui/SparkButton.svelte';
  import SparkCard from '$ui/SparkCard.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
</script>

<svelte:head>
  <title>FAQ — Karyra Spark</title>
  <meta name="description" content="Pertanyaan umum Karyra Spark." />
</svelte:head>

<section class="spark-info-hero">
  <div>
    <span class="spark-eyebrow">FAQ</span>
    <h1>Pertanyaan yang sering muncul.</h1>
    <p>Jawaban singkat tentang belajar, keamanan, progress, pesan, Passport, dan Hub.</p>
    <div class="spark-info-actions">
      <SparkButton href="/help">Buka Help</SparkButton>
      <SparkButton href="/terms" variant="secondary">Ketentuan</SparkButton>
    </div>
  </div>
</section>


<section class="spark-faq-list">
  <SparkCard><h2>Apa itu Karyra Spark?</h2><p>Karyra Spark adalah jalur belajar blockchain dan Starknet yang dibuat bertahap untuk pemula, komunitas lokal, dan pengguna yang ingin lanjut ke resource teknis dengan konteks yang lebih aman.</p></SparkCard>
  <SparkCard><h2>Apakah Spark meminta wallet?</h2><p>Tidak untuk materi awal. Spark tidak meminta seed phrase, private key, atau kode pemulihan. Jika ada latihan wallet, posisinya tetap edukatif dan bertahap.</p></SparkCard>
  <SparkCard><h2>Apa bedanya pemberitahuan dan pesan?</h2><p>Pemberitahuan adalah update singkat yang bisa dipahami cepat. Pesan di Inbox berisi penjelasan yang lebih lengkap dan bisa disimpan.</p></SparkCard>
  <SparkCard><h2>Apakah progress tersimpan?</h2><p>Progress dan preferensi saat ini tersimpan di perangkat/browser agar pengalaman bisa dilanjutkan. Struktur ini disiapkan agar kompatibel dengan backend di fase berikutnya.</p></SparkCard>
  <SparkCard><h2>Kapan membuka Hub?</h2><p>Hub cocok dibuka setelah kamu memahami dasar belajar dan keamanan. Passport membantu membaca kapan eksplorasi lanjutan mulai terasa aman.</p></SparkCard>
</section>
