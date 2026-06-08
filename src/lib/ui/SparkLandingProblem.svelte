<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  const problems = [
    { title:'Blockchain sering terasa menakutkan', copy:'Banyak pengguna langsung bertemu wallet, transaksi, jargon, dan risiko sebelum memahami dasar.', icon:'shield' },
    { title:'Informasi terlalu teknis', copy:'Pemula butuh bahasa sederhana dan urutan belajar, bukan langsung dokumentasi developer.', icon:'help' },
    { title:'Belajar sering berhenti sendiri', copy:'Course saja belum cukup. Perlu praktik, komunitas, dan bukti kesiapan yang mudah dipahami.', icon:'users' }
  ];
</script>

<section class="landing-problem-v26">
  <div class="landing-section-intro">
    <span class="spark-eyebrow">Masalah yang diselesaikan</span>
    <h2>Pengguna lokal butuh jalan masuk yang lebih aman dan manusiawi.</h2>
    <p>Spark tidak memulai dari spekulasi, wallet, atau transaksi. Spark memulai dari pemahaman sederhana, lalu membawa pengguna ke praktik dan eksplorasi secara bertahap.</p>
  </div>

  <div class="landing-problem-grid">
    {#each problems as item}
      <SparkCard>
        <span><SparkIcon name={item.icon} size={19} /></span>
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
      </SparkCard>
    {/each}
  </div>
</section>
