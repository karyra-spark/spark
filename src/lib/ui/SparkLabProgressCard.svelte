<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import { sparkLabs } from '$content/spark-content';
  import { learningState } from '$state/learning-state.svelte';

  const completedCount = $derived(learningState.completedLabIds.length);
  const labPercent = $derived(Math.round((completedCount / sparkLabs.length) * 100));
  const nextLab = $derived(sparkLabs.find((lab) => !learningState.completedLabIds.includes(lab.id)) ?? sparkLabs[sparkLabs.length - 1]);
</script>

<SparkCard class="spark-lab-progress-card">
  <div>
    <span class="spark-eyebrow">Progres Lab</span>
    <h2>{completedCount === sparkLabs.length ? 'Semua lab utama selesai.' : `Lanjutkan: ${nextLab.title}`}</h2>
    <p>{completedCount} dari {sparkLabs.length} lab selesai. Progress ini tersimpan lokal dan siap disinkronkan saat fitur akun aktif.</p>
    <div class="lab-progress-bar"><span style={`width: ${Math.max(8, labPercent)}%`}></span></div>
  </div>

  <div class="lab-progress-score">
    <div class="spark-ring large" style={`--value: ${labPercent}`}>{labPercent}%</div>
    <strong>{labPercent >= 100 ? 'Siap Lanjut' : labPercent >= 50 ? 'Teruskan' : 'Mulai Bertahap'}</strong>
    <p>{labPercent >= 100 ? 'Practice readiness selesai.' : 'Selesaikan lab secara bertahap.'}</p>
  </div>
</SparkCard>
