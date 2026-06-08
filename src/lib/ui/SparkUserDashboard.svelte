<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { dashboardActions, dashboardModes } from '$lib/dashboard/dashboard-model';
  import { getHubAccessCopy } from '$lib/profile/profile-model';
  import { betaSession, getModeLabel } from '$state/beta-session-state.svelte';
  import { gatewayState } from '$state/gateway-state.svelte';
  import {
    getCompletedLessonCount,
    getLearningProgressPercent,
    getReadinessScore,
    getRecommendedLessonSlug,
    getTotalLessonCount,
    learningState,
    setExperience
  } from '$state/learning-state.svelte';

  type SafeExperienceMode = 'beginner' | 'guided' | 'explorer';

  function toSafeExperienceMode(value: unknown): SafeExperienceMode {
    return value === 'beginner' || value === 'guided' || value === 'explorer' ? value : 'beginner';
  }

  const userName = $derived(betaSession.user?.name ?? 'Karyra Learner');
  const userHandle = $derived(betaSession.user?.handle ?? '@spark-learner');
  const safeMode = $derived(toSafeExperienceMode(betaSession.user?.mode ?? learningState.experience));
  const modeLabel = $derived(getModeLabel(safeMode));
  const readiness = $derived(getReadinessScore());
  const hubAccess = $derived(getHubAccessCopy(readiness));
  const recommendedLesson = $derived(getRecommendedLessonSlug());

  const nextAction = $derived.by(() => {
    if (getCompletedLessonCount() === 0) {
      return {
        href: '/core',
        title: 'Mulai lesson pertama',
        copy: 'Bangun fondasi blockchain sebelum masuk Praktik di Lab.',
        cta: 'Mulai Core',
        icon: 'book-open'
      };
    }

    if (learningState.completedLabIds.length === 0) {
      return {
        href: '/lab',
        title: 'Buka Praktik di Lab',
        copy: 'Ubah pemahaman menjadi simulasi dan proof-of-practice.',
        cta: 'Buka Lab',
        icon: 'flask-conical'
      };
    }

    if (gatewayState.registeredWorkshopIds.length === 0) {
      return {
        href: '/community',
        title: 'Masuk komunitas',
        copy: 'Hubungkan belajar dengan workshop, cohort, dan fasilitator lokal.',
        cta: 'Buka Komunitas',
        icon: 'users'
      };
    }

    if (readiness < 75) {
      return {
        href: '/profile',
        title: 'Lihat langkah agar siap',
        copy: 'Lihat detail readiness dan sinyal belajar di halaman Profile & Passport.',
        cta: 'Lihat Passport Saya',
        icon: 'badge'
      };
    }

    return {
      href: '/hub',
      title: 'Jelajahi Resource Saat Siap',
      copy: 'Readiness cukup untuk masuk gateway resource dan ekosistem.',
      cta: 'Jelajahi Resource Saat Siap',
      icon: 'compass'
    };
  });
</script>

<section class="spark-dashboard-hero action-first">
  <div class="dashboard-identity">
    <div class="dashboard-avatar">{userName.slice(0, 1)}</div>
    <div>
      <span class="spark-eyebrow">Dashboard</span>
      <h1>Halo, {userName}</h1>
      <p>{userHandle} · {modeLabel} · ini ruang kerja harian untuk lanjut belajar dan praktik.</p>
      <div class="dashboard-badges">
        <SparkTrustBadge label="Ruang kerja harian" tone="beta" />
        <SparkTrustBadge label="Catatan perangkat" tone="local" />
        <SparkTrustBadge label={hubAccess.unlocked ? 'Hub siap' : 'Hub bertahap'} tone={hubAccess.unlocked ? 'safe' : 'target'} />
      </div>
    </div>
  </div>

  <aside class="dashboard-quick-status">
    <div>
      <strong>{getLearningProgressPercent()}%</strong>
      <span>Belajar</span>
    </div>
    <div>
      <strong>{readiness}%</strong>
      <span>Readiness</span>
    </div>
    <SparkButton href="/profile" variant="secondary">Detail Passport</SparkButton>
  </aside>
</section>

<section class="spark-dashboard-next">
  <SparkCard class="dashboard-next-card focus-action">
    <span class="dashboard-next-icon"><SparkIcon name={nextAction.icon} size={24} /></span>
    <div>
      <span class="spark-eyebrow">Yang perlu dilakukan sekarang</span>
      <h2>{nextAction.title}</h2>
      <p>{nextAction.copy}</p>
    </div>
    <div class="dashboard-next-actions">
      <SparkButton href={nextAction.href}>{nextAction.cta}</SparkButton>
      <SparkButton href={`/lesson/${recommendedLesson}`} variant="secondary">Lesson Rekomendasi</SparkButton>
    </div>
  </SparkCard>
</section>

<section class="spark-dashboard-grid">
  {#each dashboardActions as action}
    <a href={action.href}>
      <SparkCard tone={action.tone}>
        <span class="dashboard-action-icon"><SparkIcon name={action.icon} size={19} /></span>
        <h3>{action.title}</h3>
        <p>{action.copy}</p>
        <em>›</em>
      </SparkCard>
    </a>
  {/each}
</section>

<section class="spark-dashboard-workflow">
  <SparkCard class="dashboard-resume-card">
    <span class="spark-eyebrow">Resume cepat</span>
    <h2>Lanjutkan dari titik terakhir tanpa membuka Profile.</h2>

    <div class="dashboard-resume-list">
      <a href={`/lesson/${recommendedLesson}`}>
        <span><SparkIcon name="book-open" size={16} /></span>
        <div>
          <strong>Lesson berikutnya</strong>
          <small>Lanjutkan jalur belajar utama</small>
        </div>
        <em>›</em>
      </a>
      <a href="/lab">
        <span><SparkIcon name="flask-conical" size={16} /></span>
        <div>
          <strong>Praktik di Lab</strong>
          <small>{learningState.completedLabIds.length} lab selesai</small>
        </div>
        <em>›</em>
      </a>
      <a href="/community">
        <span><SparkIcon name="users" size={16} /></span>
        <div>
          <strong>Workshop & cohort</strong>
          <small>{gatewayState.registeredWorkshopIds.length} workshop tersimpan</small>
        </div>
        <em>›</em>
      </a>
    </div>
  </SparkCard>

  <SparkCard class="dashboard-mode-card compact">
    <span class="spark-eyebrow">Mode hari ini</span>
    <h2>Ubah mode jika alur terasa terlalu lambat atau terlalu teknis.</h2>

    <div class="dashboard-mode-list compact">
      {#each dashboardModes as mode}
        <button type="button" class:active={learningState.experience === mode.key} onclick={() => setExperience(mode.key)}>
          <SparkIcon name={mode.icon} size={17} />
          <span>
            <strong>{mode.title}</strong>
            <small>{mode.copy}</small>
          </span>
        </button>
      {/each}
    </div>
  </SparkCard>
</section>

<section class="dashboard-passport-strip">
  <div>
    <strong>Passport detail ada di Profile.</strong>
    <span>{getCompletedLessonCount()}/{getTotalLessonCount()} lesson · {learningState.completedLabIds.length} lab · {gatewayState.savedHubResourceIds.length} resource Hub</span>
  </div>
  <SparkButton href="/profile" variant="secondary">Buka Profile & Passport</SparkButton>
</section>
