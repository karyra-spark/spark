<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { createSparkNotifications } from '$lib/messaging/spark-messaging-model';
  import { markAllNotificationsRead, markNotificationRead, messageState } from '$state/message-state.svelte';
  import { betaSession } from '$state/beta-session-state.svelte';
  import { gatewayState } from '$state/gateway-state.svelte';
  import { getCompletedLessonCount, getLearningProgressPercent, getReadinessScore, learningState } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  let open = $state(false);

  const notifications = $derived(
    createSparkNotifications({
      readiness: getReadinessScore(),
      learningProgress: getLearningProgressPercent(),
      completedLessons: getCompletedLessonCount(),
      completedLabs: learningState.completedLabIds.length,
      registeredWorkshops: gatewayState.registeredWorkshopIds.length,
      userName: betaSession.user?.name
    })
  );

  const unreadCount = $derived(notifications.filter((item) => !messageState.readNotificationIds.includes(item.id)).length);

  function readAll() {
    markAllNotificationsRead(notifications.map((item) => item.id));
    pushToast({ title: 'Pesan dibaca', copy: 'Semua pemberitahuan Spark sudah ditandai dibaca.', tone: 'success' });
  }
</script>

<div class="spark-notification-center">
  <button class="spark-icon-btn notification-trigger" type="button" aria-label="Pemberitahuan" aria-expanded={open} onclick={() => (open = !open)}>
    <SparkIcon name="bell" size={18} />
    {#if unreadCount > 0}<span class="notification-count">{unreadCount}</span>{:else}<span class="notification-dot"></span>{/if}
  </button>

  {#if open}
    <button class="notification-scrim" transition:fade type="button" aria-label="Tutup pemberitahuan" onclick={() => (open = false)}></button>
    <section class="notification-panel" transition:fly={{ y: 8, duration: 160 }} aria-label="Panel pemberitahuan">
      <div class="notification-panel-head">
        <div>
          <span class="spark-eyebrow">Pesan Spark</span>
          <h2>Arahan untuk langkah berikutnya</h2>
          <p>{unreadCount > 0 ? `${unreadCount} belum dibaca` : 'Semua pesan sudah dibaca'}</p>
        </div>
        <button type="button" aria-label="Tutup pemberitahuan" onclick={() => (open = false)}><SparkIcon name="x" size={18} /></button>
      </div>

      <div class="notification-score-card">
        <div class="mini-readiness-ring" style={`--value: ${getReadinessScore()}`}>{getReadinessScore()}%</div>
        <div>
          <strong>{getReadinessScore() >= 75 ? 'Kamu mulai siap menjelajah Hub' : 'Perjalananmu masih bertahap'}</strong>
          <p>{getCompletedLessonCount()} lesson selesai. Lihat Dashboard untuk langkah yang paling aman hari ini.</p>
        </div>
      </div>

      <div class="notification-tools">
        <SparkTrustBadge label={`${notifications.length} pesan`} tone="safe" />
        <button type="button" onclick={readAll} disabled={unreadCount === 0}>Tandai dibaca</button>
      </div>

      <div class="notification-feed">
        {#each notifications as item}
          {@const read = messageState.readNotificationIds.includes(item.id)}
          <a href={item.href} class={`notification-item ${item.tone} ${item.priority}`} class:read onclick={() => markNotificationRead(item.id)}>
            <span class={`notification-item-icon ${item.tone}`}><SparkIcon name={item.icon} size={17} /></span>
            <span class="notification-copy"><small>{item.kind}</small><strong>{item.title}</strong><em>{item.copy}</em></span>
            <span class="notification-meta">{#if !read}<i>Baru</i>{/if}<b>{item.status}</b></span>
          </a>
        {/each}
      </div>
    </section>
  {/if}
</div>
