<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { gatewayState } from '$state/gateway-state.svelte';
  import { getLearningProgressPercent, getReadinessScore } from '$state/learning-state.svelte';
</script>

<SparkCard class="spark-community-bridge-panel">
  <div>
    <span class="spark-eyebrow">Community bridge</span>
    <h2>Komunitas mengubah belajar menjadi pengalaman nyata.</h2>
    <p>
      Spark tidak hanya mengandalkan layar. Workshop dan cohort membantu pengguna lokal memahami konsep,
      bertanya, praktik bersama, lalu membawa hasilnya ke Passport.
    </p>
  </div>

  <div class="community-bridge-stats">
    <div>
      <SparkIcon name="book-open" size={18} />
      <strong>{getLearningProgressPercent()}%</strong>
      <span>Learning</span>
    </div>
    <div>
      <SparkIcon name="users" size={18} />
      <strong>{gatewayState.registeredWorkshopIds.length}</strong>
      <span>Workshop</span>
    </div>
    <div>
      <SparkIcon name="shield" size={18} />
      <strong>{getReadinessScore()}%</strong>
      <span>Readiness</span>
    </div>
  </div>

  <div class="spark-hero-actions">
    <SparkButton href="/core">Lanjut Core</SparkButton>
    <SparkButton href="/profile" variant="secondary">Lihat Passport Saya</SparkButton>
  </div>
</SparkCard>
