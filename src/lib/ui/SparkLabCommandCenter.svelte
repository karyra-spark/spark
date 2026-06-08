<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { sparkLabs } from '$content/spark-content';
  import { getReadinessScore, learningState } from '$state/learning-state.svelte';

  const completedCount = $derived(learningState.completedLabIds.length);
  const totalCount = sparkLabs.length;
  const nextLab = $derived(sparkLabs.find((lab) => !learningState.completedLabIds.includes(lab.id)) ?? sparkLabs[0]);
</script>

<section class="lab-command-center">
  <div>
    <span class="spark-eyebrow">Praktik di Lab</span>
    <h1>Ruang praktik aman sebelum masuk teknis sungguhan.</h1>
    <p>Lab mengubah pemahaman menjadi simulasi, readiness, proof-of-practice, dan jembatan menuju Starknet tanpa memaksa pemula mengambil risiko terlalu cepat.</p>

    <div class="lab-command-actions">
      <SparkButton href="#lab-modules">Mulai Lab</SparkButton>
      <SparkButton href="/profile" variant="secondary">Lihat Passport Saya</SparkButton>
    </div>
  </div>

  <aside class="lab-command-panel">
    <div class="lab-command-badges">
      <SparkTrustBadge label="No real asset" tone="safe" />
      <SparkTrustBadge label="Testnet-first" tone="beta" />
      <SparkTrustBadge label="Siap dikembangkan" tone="local" />
    </div>

    <SparkCard class="lab-next-card">
      <span><SparkIcon name="flask-conical" size={22} /></span>
      <div>
        <small>Latihan berikutnya</small>
        <strong>{nextLab.title}</strong>
        <p>{nextLab.readinessHint}</p>
      </div>
    </SparkCard>

    <div class="lab-stat-grid">
      <div>
        <strong>{completedCount}/{totalCount}</strong>
        <span>Lab selesai</span>
      </div>
      <div>
        <strong>{getReadinessScore()}%</strong>
        <span>Readiness</span>
      </div>
    </div>
  </aside>
</section>
