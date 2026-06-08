<script lang="ts">
  import SparkAvatarPicker from './SparkAvatarPicker.svelte';
  import SparkButton from './SparkButton.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { betaSession } from '$state/beta-session-state.svelte';
  import { getHubAccessCopy, getLearnerStage, profileQuickLinks } from '$lib/profile/profile-model';
  import { gatewayState } from '$state/gateway-state.svelte';
  import {
    getCompletedLessonCount,
    getLearningProgressPercent,
    getReadinessScore,
    getTotalLessonCount,
    learningState,
    resetOnboarding
  } from '$state/learning-state.svelte';

  const displayName = $derived(betaSession.user?.name ?? 'Karyra Learner');
  const handle = $derived(betaSession.user?.handle ?? '@spark-learner');

  const modeLabel = $derived(
    learningState.experience === 'beginner'
      ? 'Baru mulai'
      : learningState.experience === 'guided'
        ? 'Sudah ada dasar'
        : learningState.experience === 'explorer'
          ? 'Siap teknis'
          : 'Belum dipilih'
  );

  const readiness = $derived(getReadinessScore());
  const stage = $derived(getLearnerStage(readiness));
  const hubAccess = $derived(getHubAccessCopy(readiness));
</script>

<section class="spark-profile-hero profile-passport-first">
  <aside class="profile-photo-panel">
    <SparkAvatarPicker />

    <a class="profile-friend-mini" href="/community">
      <span><SparkIcon name="users" size={18} /></span>
      <div>
        <strong>Partisipasi komunitas</strong>
        <small>{gatewayState.registeredWorkshopIds.length} workshop tersimpan</small>
      </div>
      <em>›</em>
    </a>
  </aside>

  <div class="profile-identity-panel">
    <div class="profile-title-row">
      <div>
        <span class="spark-eyebrow">Profile & Passport</span>
        <h1>{displayName}</h1>
      </div>
      <span class="profile-stage-chip">{stage}</span>
    </div>

    <p class="profile-subtitle">
      {handle} · {modeLabel} · halaman ini menyimpan identitas, readiness, dan bukti perjalanan belajar.
    </p>

    <div class="profile-passport-summary">
      <div>
        <span>Readiness Passport</span>
        <strong>{readiness}%</strong>
        <small>{hubAccess.unlocked ? 'Hub siap dibuka' : 'Hub masih bertahap'}</small>
      </div>
      <div>
        <span>Belajar</span>
        <strong>{getCompletedLessonCount()}/{getTotalLessonCount()}</strong>
        <small>{getLearningProgressPercent()}% progress lesson</small>
      </div>
      <div>
        <span>Practice</span>
        <strong>{learningState.completedLabIds.length}</strong>
        <small>Lab selesai lokal</small>
      </div>
      <div>
        <span>Community</span>
        <strong>{gatewayState.registeredWorkshopIds.length}</strong>
        <small>Workshop tersimpan</small>
      </div>
    </div>

    <div class="profile-progress-row">
      <div class="profile-progress-bar"><span style={`width: ${Math.max(6, readiness)}%`}></span></div>
      <strong>{readiness}%</strong>
    </div>

    <div class="profile-action-row account-first">
      <SparkButton href="/settings" variant="secondary">Edit Preferensi</SparkButton>
      <SparkButton href="/dashboard" variant="ghost">Kembali ke Dashboard</SparkButton>
      <button class="text-action" type="button" onclick={resetOnboarding}>Ulangi onboarding</button>
    </div>

    <div class="profile-meta-grid account-meta">
      <div>
        <span>Mode</span>
        <strong>{modeLabel}</strong>
      </div>
      <div>
        <span>Status Akun</span>
        <strong>{betaSession.user ? 'Akun contoh' : 'Belum masuk'}</strong>
      </div>
      <div>
        <span>Data</span>
        <strong>Lokal</strong>
      </div>
      <div>
        <span>Hub Spark</span>
        <strong>{hubAccess.unlocked ? 'Terbuka' : 'Bertahap'}</strong>
      </div>
    </div>

    <div class="profile-quick-links passport-links">
      {#each profileQuickLinks as item}
        <a href={item.href}>
          <SparkIcon name={item.icon} size={17} />
          <span>
            <strong>{item.label}</strong>
            <small>{item.copy}</small>
          </span>
        </a>
      {/each}
    </div>

    <div class="profile-trust-row">
      <SparkTrustBadge label="Identitas beta" tone="beta" />
      <SparkTrustBadge label="Progress lokal" tone="local" />
      <SparkTrustBadge label="Passport detail" tone="safe" />
    </div>
  </div>
</section>
