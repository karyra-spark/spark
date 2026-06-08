<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import SparkIcon from './SparkIcon.svelte';
  import { createSparkNotifications } from '$lib/messaging/spark-messaging-model';
  import { markAllNotificationsRead, markNotificationRead, messageState } from '$state/message-state.svelte';
  import { betaSession } from '$state/beta-session-state.svelte';
  import { gatewayState } from '$state/gateway-state.svelte';
  import { getCompletedLessonCount, getLearningProgressPercent, getReadinessScore, learningState } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  let open = $state(false);
  const signedIn = $derived(Boolean(betaSession.user));

  const notifications = $derived(
    signedIn
      ? createSparkNotifications({
          readiness: getReadinessScore(),
          learningProgress: getLearningProgressPercent(),
          completedLessons: getCompletedLessonCount(),
          completedLabs: learningState.completedLabIds.length,
          registeredWorkshops: gatewayState.registeredWorkshopIds.length,
          userName: betaSession.user?.name
        })
      : []
  );

  const unreadNotifications = $derived(
    notifications.filter((item) => !messageState.readNotificationIds.includes(item.id)).slice(0, 4)
  );
  const unreadCount = $derived(unreadNotifications.length);

  function closePanel() {
    open = false;
  }

  function readAll() {
    markAllNotificationsRead(notifications.map((item) => item.id));
    pushToast({ title: 'Semua kabar sudah dibaca', copy: 'Kabar baru akan muncul saat ada langkah penting.', tone: 'success' });
  }

  function openNotification(id: string) {
    markNotificationRead(id);
    closePanel();
  }
</script>

{#if signedIn}
  <div class="spark-notification-center production-notification-center pass35b7-notification-center">
    <button class="spark-icon-btn notification-trigger pass35b7-notification-trigger" type="button" aria-label="Pemberitahuan" aria-expanded={open} onclick={() => (open = !open)}>
      <SparkIcon name="bell" size={18} />
      {#if unreadCount > 0}<span class="notification-count">{unreadCount}</span>{/if}
    </button>

    {#if open}
      <button class="production-notification-scrim pass35b7-notification-scrim" transition:fade type="button" aria-label="Tutup pemberitahuan" onclick={closePanel}></button>

      <div class="production-notification-panel pass35b7-notification-panel" role="dialog" aria-label="Pemberitahuan" transition:fly={{ y: -6, duration: 150 }}>
        <div class="production-notification-head pass35b7-notification-head">
          <div>
            <span class="spark-eyebrow">Pemberitahuan</span>
            <h2>{unreadCount > 0 ? `${unreadCount} kabar baru` : 'Semua sudah tenang'}</h2>
          </div>
          <button type="button" aria-label="Tutup pemberitahuan" onclick={closePanel}><SparkIcon name="x" size={18} /></button>
        </div>

        {#if unreadCount === 0}
          <div class="pass35b7-notification-empty" aria-live="polite">
            <span><SparkIcon name="check" size={20} /></span>
            <strong>Semua kabar sudah dibaca</strong>
            <p>Belum ada langkah penting baru untukmu.</p>
          </div>
        {:else}
          <div class="pass35b7-notification-tools">
            <span>Kabar terbaru untukmu.</span>
            <button type="button" onclick={readAll}>Tandai sudah dibaca</button>
          </div>

          <div class="production-notification-list pass35b7-notification-list">
            {#each unreadNotifications as item}
              <a href={item.href} class={`production-notification-item pass35b7-notification-item ${item.tone}`} onclick={() => openNotification(item.id)}>
                <span><SparkIcon name={item.icon} size={16} /></span>
                <div>
                  <small>{item.kind}</small>
                  <strong>{item.title}</strong>
                  <p>{item.copy}</p>
                </div>
              </a>
            {/each}
          </div>

          <a class="production-notification-inbox-link pass35b7-notification-inbox-link" href="/inbox" onclick={closePanel}>
            Lihat Semua Pesan
            <SparkIcon name="chevron-right" size={15} />
          </a>
        {/if}
      </div>
    {/if}
  </div>
{/if}
