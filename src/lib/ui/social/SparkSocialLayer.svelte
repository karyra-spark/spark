<script lang="ts">
  import { onMount } from 'svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
  import SparkSectionHeader from '$ui/SparkSectionHeader.svelte';
  import SparkSocialComposer from './SparkSocialComposer.svelte';
  import SparkSocialPostCard from './SparkSocialPostCard.svelte';
  import SparkSocialSafetyPanel from './SparkSocialSafetyPanel.svelte';
  import { socialPostKindLabels } from '$lib/social/social-model';
  import {
    markSocialEventsRead,
    restoreSocialState,
    saveSocialState,
    setSocialFilter,
    socialState
  } from '$lib/social/social-state.svelte';
  import type { SocialFeedFilter } from '$lib/social/social-types';

  const filters: SocialFeedFilter[] = ['all', 'progress', 'question', 'resource', 'workshop', 'lab'];

  onMount(() => {
    restoreSocialState();
  });

  $effect(() => {
    socialState.posts.length;
    socialState.events.length;
    socialState.followedProfileIds.length;
    socialState.activeFilter;
    if (socialState.ready) saveSocialState();
  });

  const socialUnreadEventCount = $derived(socialState.events.filter((event) => !event.read).length);

  const visiblePosts = $derived(
    socialState.posts
      .filter((post) => !post.viewer.hidden)
      .filter((post) => socialState.activeFilter === 'all' || post.kind === socialState.activeFilter)
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  );
</script>

<div class="social-layer" data-karyra-social-layer="pass38-discussion">
  <div class="social-layer-head">
    <SparkSectionHeader
      eyebrow="Diskusi komunitas"
      title="Tanya, koordinasi, dan berbagi progress."
      copy="Ruang diskusi lokal untuk pertanyaan, ajakan workshop, rujukan aman, catatan belajar, dan showcase Lab. Data masih tersimpan lokal dan siap disambungkan ke backend nanti."
    />

    <div class="social-event-card">
      <span><SparkIcon name="bell" size={17} /></span>
      <div>
        <strong>{socialUnreadEventCount} aktivitas baru</strong>
        <small>Aktivitas ini menjadi jalur notifikasi dan sinkronisasi backend nanti.</small>
      </div>
      <button type="button" onclick={markSocialEventsRead}>Tandai</button>
    </div>
  </div>

  <div class="social-layout">
    <aside class="social-left-rail">
      <SparkSocialSafetyPanel />

      <div class="social-filter-card">
        <strong>Filter diskusi</strong>
        <div>
          {#each filters as filter}
            <button type="button" class:active={socialState.activeFilter === filter} onclick={() => setSocialFilter(filter)}>
              {socialPostKindLabels[filter]}
            </button>
          {/each}
        </div>
      </div>
    </aside>

    <div class="social-feed-column">
      <SparkSocialComposer />

      <div class="social-feed-list" aria-live="polite">
        {#if visiblePosts.length === 0}
          <div class="social-empty-state">
            <SparkIcon name="messages" size={22} />
            <strong>Belum ada diskusi di filter ini</strong>
            <p>Silakan pilih filter lain atau mulai percakapan dari composer.</p>
          </div>
        {:else}
          {#each visiblePosts as post (post.id)}
            <SparkSocialPostCard {post} />
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .social-layer {
    display: grid;
    gap: 16px;
  }

  .social-layer-head {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(260px, 0.46fr);
    gap: 14px;
    align-items: end;
  }

  .social-event-card {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr) auto;
    gap: 10px;
    align-items: center;
    padding: 12px;
    border: 1px solid var(--spark-line);
    border-radius: 20px;
    background: var(--spark-card);
  }

  .social-event-card > span {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 14px;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, 0.1);
  }

  .social-event-card strong,
  .social-filter-card strong {
    display: block;
    color: var(--spark-navy);
    font-size: 14px;
    line-height: 1.15;
  }

  :global([data-theme='dark']) .social-event-card strong,
  :global([data-theme='dark']) .social-filter-card strong { color: #fff; }

  .social-event-card small {
    display: block;
    margin-top: 3px;
    color: var(--spark-muted);
    font-size: 11.5px;
    line-height: 1.35;
  }

  .social-event-card button {
    min-height: 32px;
    padding: 0 10px;
    border: 1px solid var(--spark-line);
    border-radius: 999px;
    background: rgba(255,255,255,.58);
    color: var(--spark-blue-strong);
    font-size: 11.5px;
    font-weight: 700;
  }

  :global([data-theme='dark']) .social-event-card button { background: rgba(255,255,255,.055); }

  .social-layout {
    display: grid;
    grid-template-columns: minmax(220px, 0.38fr) minmax(0, 1fr);
    gap: 14px;
    align-items: start;
  }

  .social-left-rail,
  .social-feed-column,
  .social-feed-list {
    display: grid;
    gap: 12px;
  }

  .social-left-rail {
    position: sticky;
    top: 92px;
  }

  .social-filter-card {
    display: grid;
    gap: 10px;
    padding: 13px;
    border: 1px solid var(--spark-line);
    border-radius: 20px;
    background: var(--spark-card);
  }

  .social-filter-card div {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .social-filter-card button {
    min-height: 31px;
    padding: 0 10px;
    border: 1px solid var(--spark-line);
    border-radius: 999px;
    background: rgba(255,255,255,.58);
    color: var(--spark-muted);
    font-size: 11.5px;
    font-weight: 680;
  }

  :global([data-theme='dark']) .social-filter-card button { background: rgba(255,255,255,.055); }

  .social-filter-card button.active {
    color: var(--spark-blue-strong);
    border-color: rgba(31,117,255,.3);
    background: rgba(31,117,255,.1);
  }

  .social-empty-state {
    display: grid;
    justify-items: center;
    gap: 8px;
    padding: 24px 16px;
    border: 1px dashed var(--spark-line);
    border-radius: 24px;
    background: rgba(255,255,255,.46);
    text-align: center;
  }

  :global([data-theme='dark']) .social-empty-state { background: rgba(255,255,255,.035); }

  .social-empty-state :global(svg) { color: var(--spark-blue-strong); }
  .social-empty-state strong { color: var(--spark-navy); }
  :global([data-theme='dark']) .social-empty-state strong { color: #fff; }
  .social-empty-state p { max-width: 34ch; margin: 0; color: var(--spark-muted); font-size: 12.5px; line-height: 1.45; }

  @media (max-width: 920px) {
    .social-layer-head,
    .social-layout { grid-template-columns: 1fr; }

    .social-left-rail { position: static; }
  }

  @media (max-width: 520px) {
    .social-event-card { grid-template-columns: 36px minmax(0, 1fr); }

    .social-event-card button {
      grid-column: 2;
      width: fit-content;
    }
  }
</style>
