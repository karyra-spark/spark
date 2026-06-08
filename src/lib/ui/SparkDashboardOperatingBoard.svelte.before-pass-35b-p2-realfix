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
    if (getCompletedLessonCount() === 0) return { title: 'Mulai dari fondasi', copy: 'Ambil satu lesson pendek sebelum masuk ke Lab atau Hub.', href: '/core', cta: 'Buka Core', icon: 'book-open' };
    if (learningState.completedLabIds.length === 0) return { title: 'Coba latihan aman', copy: 'Ubah pemahaman menjadi praktik ringan tanpa risiko.', href: '/lab', cta: 'Buka Lab', icon: 'flask-conical' };
    if (gatewayState.registeredWorkshopIds.length === 0) return { title: 'Temukan komunitas', copy: 'Workshop dan cohort membantu belajar lebih terarah.', href: '/community', cta: 'Buka Komunitas', icon: 'users' };
    return { title: 'Jelajahi Hub', copy: 'Simpan resource ekosistem yang sesuai dengan kesiapanmu.', href: '/hub', cta: 'Buka Hub', icon: 'compass' };
  });

  const quickItems = $derived([
    { title: 'Belajar', value: `${getCompletedLessonCount()}`, copy: 'Lesson', href: `/lesson/${getRecommendedLessonSlug()}`, icon: 'book-open' },
    { title: 'Lab', value: `${learningState.completedLabIds.length}`, copy: 'Praktik', href: '/lab', icon: 'flask-conical' },
    { title: 'Pesan', value: `${unreadMessages}`, copy: 'Inbox', href: '/inbox', icon: 'messages' },
    { title: 'Hub', value: `${gatewayState.savedHubResourceIds.length}`, copy: 'Resource', href: '/hub', icon: 'compass' }
  ]);
</script>

<section class="ops-board pass35b-ops-board pass35b2-ops-board">
  <div class="ops-main-card pass35b2-daily-card">
    <div class="ops-user-line pass35b2-user-line">
      <span>{userName.slice(0, 1)}</span>
      <div><small>Hari ini</small><strong>{userName}</strong></div>
      <a href="/profile">Passport {readiness}%</a>
    </div>

    <div class="ops-focus pass35b2-focus">
      <span><SparkIcon name={daily.icon} size={21} /></span>
      <div>
        <small>Fokus berikutnya</small>
        <h1>{daily.title}</h1>
        <p>{daily.copy}</p>
      </div>
    </div>

    <div class="pass35b2-progress-row" aria-label="Progress belajar">
      <span><strong>{readiness}%</strong><small>Passport</small></span>
      <span><strong>{progress}%</strong><small>Belajar</small></span>
    </div>

    <div class="ops-actions pass35b2-actions">
      <SparkButton href={daily.href} size="sm">{daily.cta}</SparkButton>
      <SparkButton href="/profile" variant="secondary" size="sm">Passport</SparkButton>
    </div>
  </div>
</section>

<section class="pass35b2-quick-panel" aria-label="Akses cepat Spark">
  {#each quickItems as item}
    <a href={item.href}>
      <span><SparkIcon name={item.icon} size={16} /></span>
      <div>
        <strong>{item.value}</strong>
        <small>{item.title}</small>
      </div>
    </a>
  {/each}
</section>
