<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { labPrinciples, labProofRoadmap } from '$lib/lab/lab-rich-model';
</script>

<div class="lab-rich-layout">
  <section>
    <div class="lab-section-head">
      <span class="spark-eyebrow">Prinsip Lab</span>
      <h2>Praktik harus aman, terarah, dan bisa dibuktikan.</h2>
      <p>Lab tidak dibuat sebagai playground kosong. Setiap latihan punya konteks, guardrail, dan outcome.</p>
    </div>

    <div class="lab-principle-grid">
      {#each labPrinciples as item}
        <SparkCard tone={item.tone}>
          <span><SparkIcon name={item.icon} size={19} /></span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </SparkCard>
      {/each}
    </div>
  </section>

  <section>
    <div class="lab-section-head">
      <span class="spark-eyebrow">Proof roadmap</span>
      <h2>Dari simulasi menuju Passport.</h2>
      <p>Setiap praktik yang selesai memperkaya readiness pengguna.</p>
    </div>

    <div class="lab-proof-roadmap">
      {#each labProofRoadmap as item}
        <div>
          <span><SparkIcon name={item.icon} size={17} /></span>
          <div>
            <strong>{item.title}</strong>
            <small>{item.copy}</small>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>
