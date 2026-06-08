<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { landingAudienceCards } from '$lib/landing/landing-model';
</script>

<section class="landing-audience-v26" id="untuk-siapa">
  <div class="landing-section-intro">
    <span class="spark-eyebrow">Untuk siapa</span>
    <h2>Dibuat untuk pengguna nyata, proses nyata, dan komunitas nyata.</h2>
    <p>Spark menyeimbangkan jalur pemula dan penjelajah teknis agar pengguna tidak dipaksa masuk tahap yang belum siap.</p>
  </div>

  <div class="landing-audience-grid">
    {#each landingAudienceCards as item}
      <a href={item.href}>
        <SparkCard tone={item.tone}>
          <span><SparkIcon name={item.icon} size={20} /></span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
          <em>›</em>
        </SparkCard>
      </a>
    {/each}
  </div>
</section>
