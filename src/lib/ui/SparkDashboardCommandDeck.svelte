<script lang="ts">
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { dashboardCommandTiles, dailyFocusRules, dashboardHealthLabels } from '$lib/dashboard/dashboard-rich-model';
  import { sparkMessages } from '$lib/messaging/spark-messaging-model';
  import { gatewayState } from '$state/gateway-state.svelte';
  import { messageState } from '$state/message-state.svelte';
  import {
    getCompletedLessonCount,
    getReadinessScore,
    learningState
  } from '$state/learning-state.svelte';

  function healthValue(key: string) {
    if (key === 'learning') return `${getCompletedLessonCount()}`;
    if (key === 'practice') return `${learningState.completedLabIds.length}`;
    if (key === 'community') return `${gatewayState.registeredWorkshopIds.length}`;
    return `${gatewayState.savedHubResourceIds.length}`;
  }

  const unreadMessages = $derived(sparkMessages.filter((message) => !messageState.readMessageIds.includes(message.id)).length);

  const focus = $derived.by(() => {
    if (getCompletedLessonCount() === 0) return dailyFocusRules[0];
    if (learningState.completedLabIds.length === 0) return dailyFocusRules[1];
    if (gatewayState.registeredWorkshopIds.length === 0) return dailyFocusRules[2];
    return dailyFocusRules[3];
  });
</script>

<section class="dashboard-command-deck">
  <SparkCard class="dashboard-focus-card">
    <div class="focus-icon"><SparkIcon name={focus.icon} size={24} /></div>
    <div>
      <span class="spark-eyebrow">Fokus hari ini</span>
      <h2>{focus.title}</h2>
      <p>{focus.copy}</p>
      <a href={focus.href}>Lanjutkan <em>›</em></a>
    </div>
  </SparkCard>

  <div class="dashboard-command-grid">
    {#each dashboardCommandTiles as tile}
      <a href={tile.href}>
        <SparkCard tone={tile.tone}>
          <span><SparkIcon name={tile.icon} size={18} /></span>
          <strong>{tile.title}</strong>
          <small>{tile.copy}</small>
        </SparkCard>
      </a>
    {/each}
  </div>
</section>

<section class="dashboard-health-panel">
  <SparkCard class="health-main-card">
    <div>
      <span class="spark-eyebrow">Health check</span>
      <h2>Apakah perjalanan pengguna sudah seimbang?</h2>
      <p>Dashboard tidak lagi hanya menampilkan angka. Ia memberi sinyal apakah belajar, praktik, komunitas, dan Hub mulai terisi.</p>
    </div>
    <div class="health-readiness">
      <strong>{getReadinessScore()}%</strong>
      <span>Readiness</span>
    </div>
  </SparkCard>

  <div class="health-signal-grid">
    {#each dashboardHealthLabels as item}
      <SparkCard>
        <span><SparkIcon name={item.icon} size={17} /></span>
        <strong>{healthValue(item.key)}</strong>
        <small>{item.label}</small>
      </SparkCard>
    {/each}
  </div>

  <SparkCard class="dashboard-inbox-strip">
    <span><SparkIcon name="messages" size={20} /></span>
    <div>
      <strong>{unreadMessages} pesan belum dibaca</strong>
      <p>Inbox membantu pengguna tahu update, arahan belajar, dan notifikasi komunitas.</p>
    </div>
    <SparkTrustBadge label="Inbox aktif" tone="beta" />
  </SparkCard>
</section>
