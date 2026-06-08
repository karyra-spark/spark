<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { sparkMessages } from '$lib/messaging/spark-messaging-model';
  import { betaSession } from '$state/beta-session-state.svelte';
  import { gatewayState } from '$state/gateway-state.svelte';
  import { messageState } from '$state/message-state.svelte';
  import {
    getCompletedLessonCount,
    getLearningProgressPercent,
    getReadinessScore,
    getRecommendedLessonSlug,
    learningState
  } from '$state/learning-state.svelte';

  const userName = $derived(betaSession.user?.name ?? 'Karyra');
  const unreadMessages = $derived(sparkMessages.filter((message) => !messageState.readMessageIds.includes(message.id)).length);
  const readiness = $derived(getReadinessScore());
  const progress = $derived(getLearningProgressPercent());

  const daily = $derived.by(() => {
    if (getCompletedLessonCount() === 0) return { title: 'Langkah berikutnya: mulai Core Beginner', copy: 'Mulai satu lesson pendek agar tahu langkah berikutnya.', href: '/core', cta: 'Mulai Core Beginner', icon: 'book-open' };
    if (learningState.completedLabIds.length === 0) return { title: 'Coba latihan aman', copy: 'Ubah pemahaman menjadi praktik ringan tanpa risiko.', href: '/lab', cta: 'Buka Lab', icon: 'flask-conical' };
    if (gatewayState.registeredWorkshopIds.length === 0) return { title: 'Temukan komunitas', copy: 'Workshop dan cohort membantu belajar lebih terarah.', href: '/community', cta: 'Komunitas', icon: 'users' };
    return { title: 'Jelajahi Resource Saat Siap', copy: 'Simpan resource ekosistem yang sesuai dengan kesiapanmu.', href: '/hub', cta: 'Jelajahi Resource Saat Siap', icon: 'compass' };
  });

  const lanes = $derived([
    { title: 'Belajar', value: `${getCompletedLessonCount()}`, href: `/lesson/${getRecommendedLessonSlug()}`, icon: 'book-open' },
    { title: 'Lab', value: `${learningState.completedLabIds.length}`, href: '/lab', icon: 'flask-conical' },
    { title: 'Pesan', value: `${unreadMessages}`, href: '/inbox', icon: 'messages' },
    { title: 'Hub', value: `${gatewayState.savedHubResourceIds.length}`, href: '/hub', icon: 'compass' }
  ]);
</script>

<section class="ops-board spark-dashboard-board" aria-label="Dashboard harian">
  <div class="ops-main-card spark-dashboard-card">
    <div class="spark-dashboard-userline">
      <span>{userName.slice(0, 1)}</span>
      <div><small>Ringkasan hari ini</small><strong>{userName}</strong></div>
      <a href="/profile">{readiness}% Passport</a>
    </div>

    <div class="spark-dashboard-focus">
      <span><SparkIcon name={daily.icon} size={20} /></span>
      <div>
        <small>Fokus berikutnya</small>
        <h1>{daily.title}</h1>
        <p>{daily.copy}</p>
      </div>
    </div>

    <div class="spark-dashboard-lanes" aria-label="Status dan akses cepat">
      {#each lanes as lane}
        <a href={lane.href}>
          <SparkIcon name={lane.icon} size={15} />
          <strong>{lane.value}</strong>
          <small>{lane.title}</small>
        </a>
      {/each}
    </div>

    <div class="spark-dashboard-progress" aria-label="Progress">
      <span><strong>{readiness}%</strong><small>Passport</small></span>
      <span><strong>{progress}%</strong><small>Belajar</small></span>
    </div>

    <div class="ops-actions spark-dashboard-actions">
      <SparkButton href={daily.href} size="sm">{daily.cta}</SparkButton>
      <SparkButton href="/profile" variant="secondary" size="sm">Passport</SparkButton>
    </div>
  </div>
</section>
