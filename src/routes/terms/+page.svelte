<script lang="ts">
  import SparkButton from '$ui/SparkButton.svelte';
  import SparkCard from '$ui/SparkCard.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
</script>

<svelte:head>
  <title>Terms — Karyra Spark</title>
  <meta name="description" content="Ketentuan penggunaan Karyra Spark." />
</svelte:head>

<section class="spark-info-hero">
  <div>
    <span class="spark-eyebrow">Terms & Conditions</span>
    <h1>Ketentuan sederhana untuk memakai Spark.</h1>
    <p>Baca ringkasan ini agar pengalaman belajar tetap aman, jelas, dan nyaman.</p>
    <div class="spark-info-actions">
      <SparkButton href="/help">Buka Help</SparkButton>
      <SparkButton href="/faq" variant="secondary">FAQ</SparkButton>
    </div>
  </div>
</section>


<section class="spark-terms-body">
  <SparkCard><h2>1. Penggunaan Spark</h2><p>Karyra Spark disediakan sebagai ruang belajar dan eksplorasi edukatif. Gunakan materi, Lab, Community, Passport, dan Hub untuk memahami konsep secara bertahap.</p></SparkCard>
  <SparkCard><h2>2. Keamanan wallet</h2><p>Jangan membagikan seed phrase, private key, kode pemulihan, atau data sensitif kepada siapa pun. Spark tidak meminta data tersebut untuk menyelesaikan materi awal.</p></SparkCard>
  <SparkCard><h2>3. Data dan preferensi</h2><p>Progress, tema, sesi perangkat, dan pilihan cookie dapat disimpan di browser agar pengalaman belajar bisa dilanjutkan. Data ini dapat dihapus dari pengaturan browser atau melalui fitur reset aplikasi saat tersedia.</p></SparkCard>
  <SparkCard><h2>4. Konten dan resource</h2><p>Resource di Hub dapat mengarah ke komunitas, dokumentasi, atau aplikasi lain. Baca konteks dan risiko sebelum memakai layanan pihak ketiga.</p></SparkCard>
  <SparkCard><h2>5. Perubahan layanan</h2><p>Karyra Spark dapat berkembang dari waktu ke waktu. Halaman ketentuan ini akan diperbarui saat fitur, backend, atau integrasi baru tersedia.</p></SparkCard>
</section>
