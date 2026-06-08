<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkPassportGauge from './SparkPassportGauge.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { accountUtilityRows, profileSignalRows } from '$lib/profile/profile-rich-model';
  import { betaSession } from '$state/beta-session-state.svelte';
  import { gatewayState } from '$state/gateway-state.svelte';
  import {
    getCompletedLessonCount,
    getLearningProgressPercent,
    getReadinessScore,
    getTotalLessonCount,
    learningState
  } from '$state/learning-state.svelte';

  const readiness = $derived(getReadinessScore());
  const name = $derived(betaSession.user?.name ?? 'Karyra Learner');

  function signalValue(key: string) {
    if (key === 'learning') return `${getCompletedLessonCount()}/${getTotalLessonCount()}`;
    if (key === 'practice') return `${learningState.completedLabIds.length}`;
    if (key === 'community') return `${gatewayState.registeredWorkshopIds.length}`;
    return `${gatewayState.savedHubResourceIds.length}`;
  }
</script>

<section class="profile-rich-stage">
  <div class="profile-rich-identity">
    <div class="profile-rich-avatar">{name.slice(0, 1)}</div>
    <div>
      <span class="spark-eyebrow">Profile & Passport</span>
      <h1>{name}</h1>
      <p>{betaSession.user?.handle ?? '@spark-learner'} · identitas beta, progress lokal, dan bukti perjalanan belajar.</p>
      <div class="profile-rich-badges">
        <SparkTrustBadge label="Identitas beta" tone="beta" />
        <SparkTrustBadge label="Progress lokal" tone="local" />
        <SparkTrustBadge label={readiness >= 75 ? 'Hub siap' : 'Hub bertahap'} tone={readiness >= 75 ? 'safe' : 'target'} />
      </div>
    </div>
  </div>

  <aside class="profile-rich-passport">
    <SparkPassportGauge value={readiness} label="Passport" copy="Readiness" />
    <div>
      <strong>{readiness}% readiness</strong>
      <small>{getLearningProgressPercent()}% progress belajar</small>
    </div>
  </aside>
</section>

<section class="profile-signal-grid">
  {#each profileSignalRows as row}
    <SparkCard>
      <span class="profile-signal-icon"><SparkIcon name={row.icon} size={18} /></span>
      <strong>{signalValue(row.key)}</strong>
      <h3>{row.title}</h3>
      <p>{row.copy}</p>
    </SparkCard>
  {/each}
</section>

<section class="profile-utility-grid">
  {#each accountUtilityRows as row}
    <a href={row.href}>
      <SparkCard>
        <span><SparkIcon name={row.icon} size={18} /></span>
        <div>
          <strong>{row.title}</strong>
          <small>{row.copy}</small>
        </div>
        <em>›</em>
      </SparkCard>
    </a>
  {/each}
</section>

<section class="profile-sync-panel">
  <SparkCard>
    <span><SparkIcon name="settings" size={20} /></span>
    <div>
      <span class="spark-eyebrow">Account state</span>
      <h2>Siap disambungkan ke backend session.</h2>
      <p>Saat ini akun contoh, Passport, inbox, workshop, dan resource Hub masih memakai localStorage. Struktur halaman dibuat agar mudah dipindahkan ke API.</p>
    </div>
    <SparkButton href="/settings" variant="secondary">Buka Settings</SparkButton>
  </SparkCard>
</section>
