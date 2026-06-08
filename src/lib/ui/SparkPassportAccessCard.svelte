<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkPassportGauge from './SparkPassportGauge.svelte';
  import { getHubAccessCopy } from '$lib/profile/profile-model';
  import { gatewayState } from '$state/gateway-state.svelte';
  import { getCompletedLessonCount, getReadinessScore, getTotalLessonCount, learningState } from '$state/learning-state.svelte';

  const readiness = $derived(getReadinessScore());
  const hubAccess = $derived(getHubAccessCopy(readiness));

  const rows = $derived([
    {
      icon: 'book-open',
      title: 'Core Learning',
      value: `${getCompletedLessonCount()}/${getTotalLessonCount()} lesson`,
      copy: 'Pemahaman bertahap dari blockchain sampai Starknet.'
    },
    {
      icon: 'flask-conical',
      title: 'Praktik di Lab',
      value: `${learningState.completedLabIds.length} lab`,
      copy: 'Simulasi dan readiness sebelum aksi teknis.'
    },
    {
      icon: 'users',
      title: 'Community',
      value: `${gatewayState.registeredWorkshopIds.length} workshop`,
      copy: 'Partisipasi lokal, cohort, dan fasilitator.'
    },
    {
      icon: 'compass',
      title: 'Hub Gateway',
      value: `${gatewayState.savedHubResourceIds.length} resource`,
      copy: 'Resource yang disimpan untuk eksplorasi ekosistem.'
    }
  ]);
</script>

<section class="spark-passport-access">
  <SparkCard class="passport-access-main">
    <div class="passport-access-score">
      <SparkPassportGauge value={readiness} label="Passport" copy="Readiness Score" />
      <div>
        <span class="spark-eyebrow">Spark Passport</span>
        <h2>Kesiapan pengguna dibangun dari banyak sinyal.</h2>
        <p>Passport bukan sekadar angka. Ia merangkum pemahaman, praktik, partisipasi, dan kesiapan eksplorasi.</p>
      </div>
    </div>
  </SparkCard>

  <SparkCard class={`hub-access-card ${hubAccess.unlocked ? 'unlocked' : 'locked'}`}>
    <span><SparkIcon name={hubAccess.unlocked ? 'compass' : 'shield'} size={22} /></span>
    <div>
      <h3>{hubAccess.title}</h3>
      <p>{hubAccess.copy}</p>
      <SparkButton href={hubAccess.href} variant={hubAccess.unlocked ? 'primary' : 'secondary'}>{hubAccess.cta}</SparkButton>
    </div>
  </SparkCard>

  <div class="passport-signal-grid">
    {#each rows as row}
      <SparkCard>
        <span class="signal-icon"><SparkIcon name={row.icon} size={18} /></span>
        <h3>{row.title}</h3>
        <strong>{row.value}</strong>
        <p>{row.copy}</p>
      </SparkCard>
    {/each}
  </div>
</section>
