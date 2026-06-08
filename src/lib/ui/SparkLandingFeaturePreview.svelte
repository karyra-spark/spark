<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { landingFeatureCards } from '$lib/landing/landing-model';
</script>

<section class="landing-feature-v26" id="fitur">
  <div class="landing-section-intro split">
    <div>
      <span class="spark-eyebrow">Preview fitur</span>
      <h2>Yang akan digunakan setelah masuk.</h2>
    </div>
    <p>Home cukup memberi preview. Detail progress dan aktivitas tetap berada di halaman aplikasi.</p>
  </div>

  <div class="landing-feature-grid">
    {#each landingFeatureCards as item}
      <a href={item.href}>
        <SparkCard tone={item.tone}>
          <span><SparkIcon name={item.icon} size={19} /></span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </SparkCard>
      </a>
    {/each}
  </div>
</section>
