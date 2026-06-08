<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { kindLabel, sparkMessageFilters, sparkMessages, type SparkMessage } from '$lib/messaging/spark-messaging-model';
  import { markAllMessagesRead, markMessageRead, messageState, setMessageFilter, toggleSavedMessage } from '$state/message-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  let search = $state('');
  let selectedId = $state(sparkMessages[0]?.id ?? '');

  const normalizedSearch = $derived(search.trim().toLowerCase());
  const filteredMessages = $derived(
    sparkMessages.filter(
      (message) =>
        (messageState.activeMessageFilter === 'semua' || message.kind === messageState.activeMessageFilter) &&
        (normalizedSearch
          ? `${message.title} ${message.preview} ${message.body} ${message.sender} ${message.tags.join(' ')}`.toLowerCase().includes(normalizedSearch)
          : true)
    )
  );
  const selectedMessage = $derived(filteredMessages.find((message) => message.id === selectedId) ?? filteredMessages[0] ?? sparkMessages[0]);
  const unreadCount = $derived(sparkMessages.filter((message) => !messageState.readMessageIds.includes(message.id)).length);
  const savedCount = $derived(messageState.savedMessageIds.length);

  function openMessage(message: SparkMessage) {
    selectedId = message.id;
    markMessageRead(message.id);
  }

  function saveToggle(message: SparkMessage) {
    const wasSaved = messageState.savedMessageIds.includes(message.id);
    toggleSavedMessage(message.id);
    pushToast({
      title: wasSaved ? 'Pesan dilepas' : 'Pesan disimpan',
      copy: wasSaved ? 'Pesan ini tidak lagi ada di simpanan.' : 'Silakan membukanya lagi nanti.',
      tone: 'info'
    });
  }

  function readAll() {
    markAllMessagesRead(sparkMessages.map((message) => message.id));
    pushToast({ title: 'Semua pesan dibaca', copy: 'Inbox sudah rapi.', tone: 'success' });
  }
</script>

<section class="spark-inbox-hero compact-inbox-hero production-inbox-hero">
  <div>
    <span class="spark-eyebrow">Inbox</span>
    <h1>Pesan yang bisa kamu baca pelan-pelan.</h1>
    <p>Inbox berisi catatan lengkap: belajar, keamanan, workshop, Hub, dan bantuan. Pemberitahuan di lonceng hanya untuk update singkat.</p>
    <div class="inbox-hero-actions">
      <SparkButton href="#messages">Baca pesan</SparkButton>
      <SparkButton href="/help" variant="secondary">Butuh bantuan?</SparkButton>
    </div>
  </div>

  <aside class="inbox-summary-card compact-summary-card">
    <div><strong>{sparkMessages.length}</strong><span>Total</span></div>
    <div><strong>{unreadCount}</strong><span>Baru</span></div>
    <div><strong>{savedCount}</strong><span>Disimpan</span></div>
  </aside>
</section>

<section id="messages" class="spark-section compact-message-section">
  <SparkCard class="spark-inbox-shell compact-inbox-shell production-inbox-shell">
    <div class="inbox-tools">
      <label><span>Cari pesan</span><input bind:value={search} type="search" placeholder="Belajar, dompet, workshop, Hub..." /></label>
      <button type="button" onclick={readAll} disabled={unreadCount === 0}>Tandai dibaca</button>
    </div>

    <div class="inbox-filter-row">
      {#each sparkMessageFilters as filter}
        <button type="button" class:active={messageState.activeMessageFilter === filter.key} onclick={() => setMessageFilter(filter.key)}>{filter.label}</button>
      {/each}
    </div>

    <div class="inbox-summary-line"><span>{sparkMessages.length} pesan</span><span>{unreadCount} baru</span><span>{savedCount} disimpan</span></div>

    <div class="inbox-layout">
      <div class="message-list" aria-label="Daftar pesan">
        {#if filteredMessages.length > 0}
          {#each filteredMessages as message}
            {@const unread = !messageState.readMessageIds.includes(message.id)}
            {@const saved = messageState.savedMessageIds.includes(message.id)}
            <button class={`message-row ${message.tone}`} class:active={selectedMessage?.id === message.id} class:unread type="button" onclick={() => openMessage(message)}>
              <span class={`message-icon ${message.tone}`}><SparkIcon name={message.icon} size={16} /></span>
              <span class="message-copy"><small>{kindLabel(message.kind)} · {message.sender} · {message.time}</small><strong>{message.title}</strong><em>{message.preview}</em></span>
              <span class="message-state">{#if unread}<i>Baru</i>{/if}{#if saved}<b>★</b>{/if}</span>
            </button>
          {/each}
        {:else}
          <div class="message-empty-state"><SparkIcon name="messages" size={24} /><h3>Pesan tidak ditemukan</h3><p>Coba kata lain atau kembali ke Semua.</p></div>
        {/if}
      </div>

      {#if selectedMessage}
        <article class={`message-detail ${selectedMessage.tone}`}>
          <div class="message-detail-head">
            <span class={`message-detail-icon ${selectedMessage.tone}`}><SparkIcon name={selectedMessage.icon} size={21} /></span>
            <div><span>{kindLabel(selectedMessage.kind)} · {selectedMessage.sender} · {selectedMessage.time}</span><h2>{selectedMessage.title}</h2></div>
          </div>
          <p>{selectedMessage.body}</p>
          <div class="message-tag-row">{#each selectedMessage.tags as tag}<span>{tag}</span>{/each}</div>
          <div class="message-detail-actions">
            <SparkButton href={selectedMessage.href}>{selectedMessage.cta}</SparkButton>
            <SparkButton variant="secondary" onclick={() => saveToggle(selectedMessage)}>{messageState.savedMessageIds.includes(selectedMessage.id) ? 'Tersimpan' : 'Simpan'}</SparkButton>
          </div>
        </article>
      {/if}
    </div>
  </SparkCard>
</section>
