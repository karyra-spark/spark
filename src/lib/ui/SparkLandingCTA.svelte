<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkIcon from './SparkIcon.svelte';
</script>

<section class="landing-cta-v26 spark-home-cta">
  <div>
    <span class="spark-eyebrow">Mulai dari langkah kecil</span>
    <h2>Satu lesson cukup untuk mulai paham arahmu.</h2>
    <p>Pelajari fondasi dulu, lalu masuk ke Lab dan Passport saat kamu siap.</p>
  </div>

  <div class="spark-home-cta-actions">
    <SparkButton href="/core"><SparkIcon name="book-open" size={15} />Core Beginner</SparkButton>
    <SparkButton href="/login" variant="secondary"><SparkIcon name="login" size={15} />Masuk untuk Lanjutkan Progres</SparkButton>
  </div>
</section>
