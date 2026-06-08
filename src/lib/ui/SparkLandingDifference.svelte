<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { landingDifferenceCards } from '$lib/landing/landing-model';
</script>

<section class="landing-difference-v26" id="kenapa-berbeda">
  <div class="difference-panel">
    <div>
      <span class="spark-eyebrow">Kenapa berbeda</span>
      <h2>Bukan kursus biasa. Bukan langsung wallet. Spark adalah readiness gateway.</h2>
      <p>Spark menempatkan pemahaman, keamanan, praktik, dan komunitas sebelum eksplorasi ekosistem.</p>
    </div>

    <div class="difference-list">
      {#each landingDifferenceCards as item}
        <SparkCard tone={item.tone}>
          <span><SparkIcon name={item.icon} size={18} /></span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </SparkCard>
      {/each}
    </div>
  </div>
</section>
