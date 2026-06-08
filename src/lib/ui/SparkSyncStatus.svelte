<script lang="ts">
  import SparkAsyncButton from './SparkAsyncButton.svelte';
  import { syncProgress } from '$lib/api/spark-api';
  import { createLearningSnapshot, getReadinessScore, learningState, markSynced } from '$state/learning-state.svelte';

  async function syncNow() {
    const snapshot = createLearningSnapshot();
    const result = await syncProgress({
      learnerId: snapshot.learnerId,
      completedLessons: snapshot.completedLessonSlugs,
      completedLabs: snapshot.completedLabIds,
      readinessScore: getReadinessScore()
    });

    if (result.ok) {
      markSynced();
    }
  }
</script>

<div class="spark-sync-status">
  <div>
    <span class="spark-eyebrow">Progress sync</span>
    <strong>{learningState.lastSyncedAt ? 'Terakhir sinkron' : 'Belum sinkron'}</strong>
    <p>{learningState.lastSyncedAt || 'Backend API bisa disambungkan saat service sudah aktif.'}</p>
  </div>
  <SparkAsyncButton
    id="sync-progress"
    onrun={syncNow}
    successTitle="Sinkronisasi diproses"
    successCopy="Jika API belum aktif, Spark memakai fallback lokal dan progress tetap aman di perangkat."
  >
    Sync
  </SparkAsyncButton>
</div>
