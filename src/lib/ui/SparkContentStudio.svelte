<script lang="ts">
  import { onMount } from 'svelte';
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { pushToast } from '$state/app-state.svelte';
  import type {
    ManagedCommunityEvent,
    ManagedHubResource,
    ManagedLegalPage,
    ManagedPageCopy,
    ManagedStudioMessage,
    SparkManagedContent
  } from '$lib/content-managed/spark-managed-content';
  import {
    contentStudioState,
    exportManagedContentJson,
    replaceManagedContent,
    resetManagedContent,
    restoreManagedContent,
    saveManagedContent,
    setStudioCollection,
    updateCommunityEvent,
    updateHubResource,
    updateLegalPage,
    updatePageCopy,
    updateStudioMessage,
    type StudioCollection
  } from '$state/content-studio-state.svelte';

  const studioAreas: { key: StudioCollection; label: string; copy: string; icon: string }[] = [
    { key: 'copy', label: 'Copy', copy: 'Teks halaman dan CTA', icon: 'sparkles' },
    { key: 'messages', label: 'Pesan', copy: 'Inbox dan arahan Spark', icon: 'messages' },
    { key: 'hub', label: 'Hub', copy: 'Resource Starknet', icon: 'compass' },
    { key: 'community', label: 'Event', copy: 'Workshop dan cohort', icon: 'users' },
    { key: 'legal', label: 'Legal', copy: 'FAQ, Terms, Safety', icon: 'shield' },
    { key: 'json', label: 'JSON', copy: 'Import dan export', icon: 'clipboard' }
  ];

  let activeCopyId = $state('settings-hero');
  let activeMessageId = $state('message-start-learning');
  let activeResourceId = $state('starknet-start-here');
  let activeEventId = $state('local-starknet-intro');
  let activeLegalId = $state('faq-page');
  let jsonDraft = $state('');

  const activeCopy = $derived(contentStudioState.content.appCopy.find((item) => item.id === activeCopyId) ?? contentStudioState.content.appCopy[0]);
  const activeMessage = $derived(contentStudioState.content.messages.find((item) => item.id === activeMessageId) ?? contentStudioState.content.messages[0]);
  const activeResource = $derived(contentStudioState.content.hubResources.find((item) => item.id === activeResourceId) ?? contentStudioState.content.hubResources[0]);
  const activeEvent = $derived(contentStudioState.content.communityEvents.find((item) => item.id === activeEventId) ?? contentStudioState.content.communityEvents[0]);
  const activeLegal = $derived(contentStudioState.content.legalPages.find((item) => item.id === activeLegalId) ?? contentStudioState.content.legalPages[0]);

  onMount(() => {
    restoreManagedContent();
    jsonDraft = exportManagedContentJson();
  });

  function inputValue(event: Event) {
    return (event.currentTarget as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
  }

  function inputChecked(event: Event) {
    return (event.currentTarget as HTMLInputElement).checked;
  }

  function saveDraft() {
    saveManagedContent();
    jsonDraft = exportManagedContentJson();
    pushToast({ title: 'Draft Studio tersimpan', copy: 'Konten tersimpan dan siap dipakai untuk pass berikutnya.', tone: 'success' });
  }

  function copyJson() {
    jsonDraft = exportManagedContentJson();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(jsonDraft);
    }
    pushToast({ title: 'JSON siap disalin', copy: 'Gunakan hasil export ini sebagai seed konten berikutnya.', tone: 'success' });
  }

  function downloadJson() {
    jsonDraft = exportManagedContentJson();
    const blob = new Blob([jsonDraft], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'karyra-spark-content.json';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function importJson() {
    try {
      const parsed = JSON.parse(jsonDraft) as Partial<SparkManagedContent>;
      replaceManagedContent(parsed);
      saveManagedContent();
      jsonDraft = exportManagedContentJson();
      pushToast({ title: 'Konten diimpor', copy: 'Studio memakai konten dari JSON yang kamu masukkan.', tone: 'success' });
    } catch {
      pushToast({ title: 'JSON belum valid', copy: 'Periksa tanda koma, kurung, dan struktur kontennya.', tone: 'warning' });
    }
  }

  function resetContent() {
    const confirmed = window.confirm('Pulihkan konten Studio ke bawaan awal?');
    if (!confirmed) return;
    resetManagedContent();
    saveManagedContent();
    jsonDraft = exportManagedContentJson();
    pushToast({ title: 'Konten dipulihkan', copy: 'Studio kembali ke konten awal Pass 30.', tone: 'success' });
  }

  function setActiveCollection(collection: StudioCollection) {
    setStudioCollection(collection);
    if (collection === 'json') jsonDraft = exportManagedContentJson();
  }
</script>

<section class="studio-hero">
  <div>
    <span class="spark-eyebrow">Spark Studio</span>
    <h1>Edit teks dan konten Spark tanpa membongkar kode.</h1>
    <p>
      Studio ini menjaga layout tetap rapi, sementara copy, pesan, resource, event, dan halaman trust bisa kamu poles bertahap.
    </p>
    <div class="studio-hero-actions">
      <SparkButton onclick={saveDraft}>{contentStudioState.dirty ? 'Simpan draft' : 'Tersimpan'}</SparkButton>
      <SparkButton variant="secondary" onclick={copyJson}>Export JSON</SparkButton>
    </div>
  </div>

  <aside class="studio-status-card">
    <span><SparkIcon name="clipboard" size={22} /></span>
    <div>
      <strong>{contentStudioState.dirty ? 'Ada perubahan' : 'Konten siap'}</strong>
      <small>{contentStudioState.lastSavedAt ? 'Terakhir disimpan dari Studio.' : 'Mulai edit, lalu simpan draft.'}</small>
    </div>
  </aside>
</section>

<section class="studio-layout">
  <aside class="studio-rail" aria-label="Area konten Studio">
    {#each studioAreas as area}
      <button type="button" class:active={contentStudioState.activeCollection === area.key} onclick={() => setActiveCollection(area.key)}>
        <span><SparkIcon name={area.icon} size={18} /></span>
        <div>
          <strong>{area.label}</strong>
          <small>{area.copy}</small>
        </div>
      </button>
    {/each}
  </aside>

  <div class="studio-workspace">
    {#if contentStudioState.activeCollection === 'copy'}
      <SparkCard class="studio-card">
        <div class="studio-card-head">
          <div>
            <span class="spark-eyebrow">App copy</span>
            <h2>Teks halaman dan CTA.</h2>
            <p>Pilih section, lalu ubah bahasa agar lebih natural dan siap publik.</p>
          </div>
          <select bind:value={activeCopyId} aria-label="Pilih copy halaman">
            {#each contentStudioState.content.appCopy as item}
              <option value={item.id}>{item.page} · {item.section}</option>
            {/each}
          </select>
        </div>

        {#if activeCopy}
          <div class="studio-form-grid">
            <label>Eyebrow<input value={activeCopy.eyebrow} oninput={(event) => updatePageCopy(activeCopy.id, { eyebrow: inputValue(event) })} /></label>
            <label>Status
              <select value={activeCopy.status} onchange={(event) => updatePageCopy(activeCopy.id, { status: inputValue(event) as ManagedPageCopy['status'] })}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label class="wide">Judul<input value={activeCopy.title} oninput={(event) => updatePageCopy(activeCopy.id, { title: inputValue(event) })} /></label>
            <label class="wide">Deskripsi<textarea value={activeCopy.description} oninput={(event) => updatePageCopy(activeCopy.id, { description: inputValue(event) })}></textarea></label>
            <label>CTA utama<input value={activeCopy.primaryCtaLabel} oninput={(event) => updatePageCopy(activeCopy.id, { primaryCtaLabel: inputValue(event) })} /></label>
            <label>Link CTA utama<input value={activeCopy.primaryCtaHref} oninput={(event) => updatePageCopy(activeCopy.id, { primaryCtaHref: inputValue(event) })} /></label>
            <label>CTA kedua<input value={activeCopy.secondaryCtaLabel} oninput={(event) => updatePageCopy(activeCopy.id, { secondaryCtaLabel: inputValue(event) })} /></label>
            <label>Link CTA kedua<input value={activeCopy.secondaryCtaHref} oninput={(event) => updatePageCopy(activeCopy.id, { secondaryCtaHref: inputValue(event) })} /></label>
            <label class="wide">Catatan editor<textarea value={activeCopy.note} oninput={(event) => updatePageCopy(activeCopy.id, { note: inputValue(event) })}></textarea></label>
          </div>
        {/if}
      </SparkCard>
    {:else if contentStudioState.activeCollection === 'messages'}
      <SparkCard class="studio-card">
        <div class="studio-card-head">
          <div>
            <span class="spark-eyebrow">Pesan</span>
            <h2>Inbox dan arahan Spark.</h2>
            <p>Pesan sebaiknya terasa seperti bantuan kecil, bukan log sistem.</p>
          </div>
          <select bind:value={activeMessageId} aria-label="Pilih pesan">
            {#each contentStudioState.content.messages as item}
              <option value={item.id}>{item.category} · {item.title}</option>
            {/each}
          </select>
        </div>

        {#if activeMessage}
          <div class="studio-form-grid">
            <label>Kategori
              <select value={activeMessage.category} onchange={(event) => updateStudioMessage(activeMessage.id, { category: inputValue(event) as ManagedStudioMessage['category'] })}>
                <option value="belajar">Belajar</option>
                <option value="keamanan">Keamanan</option>
                <option value="workshop">Workshop</option>
                <option value="passport">Passport</option>
                <option value="hub">Hub Spark</option>
                <option value="akun">Akun</option>
              </select>
            </label>
            <label>Status
              <select value={activeMessage.status} onchange={(event) => updateStudioMessage(activeMessage.id, { status: inputValue(event) as ManagedStudioMessage['status'] })}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label class="wide">Judul<input value={activeMessage.title} oninput={(event) => updateStudioMessage(activeMessage.id, { title: inputValue(event) })} /></label>
            <label class="wide">Preview<textarea value={activeMessage.preview} oninput={(event) => updateStudioMessage(activeMessage.id, { preview: inputValue(event) })}></textarea></label>
            <label class="wide">Isi pesan<textarea class="large" value={activeMessage.body} oninput={(event) => updateStudioMessage(activeMessage.id, { body: inputValue(event) })}></textarea></label>
            <label>CTA<input value={activeMessage.ctaLabel} oninput={(event) => updateStudioMessage(activeMessage.id, { ctaLabel: inputValue(event) })} /></label>
            <label>Link<input value={activeMessage.ctaHref} oninput={(event) => updateStudioMessage(activeMessage.id, { ctaHref: inputValue(event) })} /></label>
          </div>
        {/if}
      </SparkCard>
    {:else if contentStudioState.activeCollection === 'hub'}
      <SparkCard class="studio-card">
        <div class="studio-card-head">
          <div>
            <span class="spark-eyebrow">Hub resource</span>
            <h2>Resource Starknet bertahap.</h2>
            <p>Hub harus membantu user memilih jalur aman, bukan sekadar kumpulan link.</p>
          </div>
          <select bind:value={activeResourceId} aria-label="Pilih resource Hub">
            {#each contentStudioState.content.hubResources as item}
              <option value={item.id}>{item.category} · {item.title}</option>
            {/each}
          </select>
        </div>

        {#if activeResource}
          <div class="studio-form-grid">
            <label>Kategori
              <select value={activeResource.category} onchange={(event) => updateHubResource(activeResource.id, { category: inputValue(event) as ManagedHubResource['category'] })}>
                <option value="mulai">Mulai sekarang</option>
                <option value="wallet">Wallet</option>
                <option value="cairo">Cairo</option>
                <option value="tool">Tool</option>
                <option value="dapp">dApp</option>
                <option value="komunitas">Komunitas</option>
                <option value="keamanan">Keamanan</option>
              </select>
            </label>
            <label>Level
              <select value={activeResource.level} onchange={(event) => updateHubResource(activeResource.id, { level: inputValue(event) as ManagedHubResource['level'] })}>
                <option value="pemula">Pemula</option>
                <option value="terarah">Terarah</option>
                <option value="penjelajah">Penjelajah</option>
                <option value="builder">Builder</option>
              </select>
            </label>
            <label class="wide">Judul<input value={activeResource.title} oninput={(event) => updateHubResource(activeResource.id, { title: inputValue(event) })} /></label>
            <label class="wide">Deskripsi<textarea value={activeResource.description} oninput={(event) => updateHubResource(activeResource.id, { description: inputValue(event) })}></textarea></label>
            <label class="wide">URL<input value={activeResource.url} oninput={(event) => updateHubResource(activeResource.id, { url: inputValue(event) })} /></label>
            <label class="wide">Catatan keamanan<textarea value={activeResource.safetyNote} oninput={(event) => updateHubResource(activeResource.id, { safetyNote: inputValue(event) })}></textarea></label>
            <label class="studio-check"><input type="checkbox" checked={activeResource.featured} onchange={(event) => updateHubResource(activeResource.id, { featured: inputChecked(event) })} /> Featured</label>
          </div>
        {/if}
      </SparkCard>
    {:else if contentStudioState.activeCollection === 'community'}
      <SparkCard class="studio-card">
        <div class="studio-card-head">
          <div>
            <span class="spark-eyebrow">Community</span>
            <h2>Workshop dan cohort.</h2>
            <p>Gunakan bahasa lokal yang nyata dan mudah dipahami.</p>
          </div>
          <select bind:value={activeEventId} aria-label="Pilih event">
            {#each contentStudioState.content.communityEvents as item}
              <option value={item.id}>{item.title}</option>
            {/each}
          </select>
        </div>

        {#if activeEvent}
          <div class="studio-form-grid">
            <label class="wide">Judul<input value={activeEvent.title} oninput={(event) => updateCommunityEvent(activeEvent.id, { title: inputValue(event) })} /></label>
            <label>Lokasi<input value={activeEvent.location} oninput={(event) => updateCommunityEvent(activeEvent.id, { location: inputValue(event) })} /></label>
            <label>Jadwal<input value={activeEvent.dateLabel} oninput={(event) => updateCommunityEvent(activeEvent.id, { dateLabel: inputValue(event) })} /></label>
            <label class="wide">Deskripsi<textarea value={activeEvent.description} oninput={(event) => updateCommunityEvent(activeEvent.id, { description: inputValue(event) })}></textarea></label>
            <label>Kapasitas<input value={activeEvent.capacityLabel} oninput={(event) => updateCommunityEvent(activeEvent.id, { capacityLabel: inputValue(event) })} /></label>
            <label>CTA<input value={activeEvent.ctaLabel} oninput={(event) => updateCommunityEvent(activeEvent.id, { ctaLabel: inputValue(event) })} /></label>
          </div>
        {/if}
      </SparkCard>
    {:else if contentStudioState.activeCollection === 'legal'}
      <SparkCard class="studio-card">
        <div class="studio-card-head">
          <div>
            <span class="spark-eyebrow">Trust pages</span>
            <h2>FAQ, Terms, Privacy, Safety.</h2>
            <p>Halaman trust harus jelas, tenang, dan tidak terdengar seperti promosi investasi.</p>
          </div>
          <select bind:value={activeLegalId} aria-label="Pilih halaman legal">
            {#each contentStudioState.content.legalPages as item}
              <option value={item.id}>{item.title}</option>
            {/each}
          </select>
        </div>

        {#if activeLegal}
          <div class="studio-form-grid">
            <label>Status
              <select value={activeLegal.status} onchange={(event) => updateLegalPage(activeLegal.id, { status: inputValue(event) as ManagedLegalPage['status'] })}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label class="wide">Judul<input value={activeLegal.title} oninput={(event) => updateLegalPage(activeLegal.id, { title: inputValue(event) })} /></label>
            <label class="wide">Ringkasan<textarea value={activeLegal.summary} oninput={(event) => updateLegalPage(activeLegal.id, { summary: inputValue(event) })}></textarea></label>
            <label class="wide">Isi halaman<textarea class="large" value={activeLegal.body} oninput={(event) => updateLegalPage(activeLegal.id, { body: inputValue(event) })}></textarea></label>
          </div>
        {/if}
      </SparkCard>
    {:else}
      <SparkCard class="studio-card">
        <div class="studio-card-head">
          <div>
            <span class="spark-eyebrow">Import / Export</span>
            <h2>Pindahkan konten sebagai JSON.</h2>
            <p>Gunakan export untuk menyimpan seed konten, atau import untuk memakai hasil edit dari file lain.</p>
          </div>
          <div class="studio-json-actions">
            <button type="button" onclick={copyJson}>Salin</button>
            <button type="button" onclick={downloadJson}>Download</button>
            <button type="button" onclick={importJson}>Import</button>
          </div>
        </div>
        <textarea class="studio-json-box" bind:value={jsonDraft} aria-label="JSON konten Spark"></textarea>
        <div class="studio-danger-row">
          <button type="button" onclick={resetContent}>Pulihkan konten awal</button>
        </div>
      </SparkCard>
    {/if}
  </div>
</section>

<style>
  .studio-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(260px, 0.35fr);
    gap: 18px;
    align-items: stretch;
    padding: 30px;
    border: 1px solid var(--spark-line);
    border-radius: 32px;
    background:
      radial-gradient(circle at 86% 20%, rgba(31,117,255,.13), transparent 28%),
      linear-gradient(135deg, rgba(255,255,255,.98), rgba(244,248,255,.94));
    box-shadow: var(--spark-shadow);
  }

  :global([data-theme='dark'] .studio-hero) {
    background:
      radial-gradient(circle at 86% 20%, rgba(31,117,255,.18), transparent 28%),
      linear-gradient(135deg, rgba(9,14,48,.96), rgba(7,10,34,.92));
  }

  .studio-hero h1 {
    margin: 8px 0 0;
    max-width: 860px;
    color: var(--spark-navy);
    font-size: clamp(36px, 4vw, 64px);
    line-height: .96;
    letter-spacing: -.075em;
    font-weight: 950;
  }

  :global([data-theme='dark'] .studio-hero h1) { color: #fff; }

  .studio-hero p {
    max-width: 760px;
    color: var(--spark-muted);
    font-size: 16px;
    line-height: 1.65;
    font-weight: 650;
  }

  .studio-hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }

  .studio-status-card {
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 12px;
    align-content: center;
    padding: 18px;
    border: 1px solid var(--spark-line);
    border-radius: 26px;
    background: var(--spark-card);
  }

  .studio-status-card > span {
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    border-radius: 18px;
    background: #eff6ff;
    color: var(--spark-blue-strong);
  }

  .studio-status-card small {
    display: block;
    margin-top: 4px;
    color: var(--spark-muted);
    line-height: 1.45;
    font-weight: 700;
  }

  .studio-layout {
    display: grid;
    grid-template-columns: 280px minmax(0, 1fr);
    gap: 18px;
    margin-top: 18px;
  }

  .studio-rail {
    position: sticky;
    top: 96px;
    display: grid;
    gap: 10px;
    align-self: start;
  }

  .studio-rail button {
    display: grid;
    grid-template-columns: 42px 1fr;
    gap: 10px;
    align-items: center;
    min-height: 64px;
    padding: 10px;
    text-align: left;
    border: 1px solid var(--spark-line);
    border-radius: 22px;
    background: var(--spark-card);
    color: var(--spark-ink);
    box-shadow: 0 10px 24px rgba(5,9,78,.05);
  }

  .studio-rail button.active {
    border-color: rgba(31,117,255,.36);
    box-shadow: 0 16px 34px rgba(31,117,255,.11);
  }

  .studio-rail button > span {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 16px;
    background: #eff6ff;
    color: var(--spark-blue-strong);
  }

  .studio-rail small {
    display: block;
    margin-top: 3px;
    color: var(--spark-muted);
    font-size: 12px;
    font-weight: 700;
  }

  :global(.studio-card) {
    min-height: 560px;
  }

  .studio-card-head {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: start;
    margin-bottom: 18px;
  }

  .studio-card-head h2 {
    margin: 8px 0 0;
    color: var(--spark-navy);
    font-size: clamp(28px, 2.5vw, 42px);
    line-height: 1;
    letter-spacing: -.06em;
  }

  :global([data-theme='dark'] .studio-card-head h2) { color: #fff; }

  .studio-card-head p {
    max-width: 620px;
    color: var(--spark-muted);
    line-height: 1.55;
    font-weight: 650;
  }

  .studio-card-head select,
  .studio-json-actions button,
  .studio-danger-row button {
    min-height: 42px;
    border-radius: 16px;
    border: 1px solid var(--spark-line);
    background: rgba(248,251,255,.9);
    color: var(--spark-ink);
    padding: 0 12px;
    font-weight: 850;
  }

  :global([data-theme='dark']) .studio-card-head select,
  :global([data-theme='dark']) .studio-json-actions button,
  :global([data-theme='dark']) .studio-danger-row button {
    background: rgba(255,255,255,.07);
  }

  .studio-form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .studio-form-grid label {
    display: grid;
    gap: 7px;
    color: var(--spark-navy);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .01em;
  }

  :global([data-theme='dark']) .studio-form-grid label { color: #fff; }

  .studio-form-grid label.wide,
  .studio-form-grid .studio-check {
    grid-column: 1 / -1;
  }

  .studio-form-grid input,
  .studio-form-grid textarea,
  .studio-form-grid select,
  .studio-json-box {
    width: 100%;
    border: 1px solid var(--spark-line);
    border-radius: 18px;
    background: rgba(248,251,255,.84);
    color: var(--spark-ink);
    padding: 12px 14px;
    font: inherit;
    font-size: 14px;
    font-weight: 650;
    outline: none;
  }

  :global([data-theme='dark']) .studio-form-grid input,
  :global([data-theme='dark']) .studio-form-grid textarea,
  :global([data-theme='dark']) .studio-form-grid select,
  :global([data-theme='dark']) .studio-json-box {
    background: rgba(255,255,255,.06);
  }

  .studio-form-grid textarea {
    min-height: 98px;
  }

  .studio-form-grid textarea.large,
  .studio-json-box {
    min-height: 250px;
  }

  .studio-check {
    display: inline-flex !important;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 10px !important;
    padding: 12px;
    border-radius: 18px;
    background: rgba(239,246,255,.72);
  }

  .studio-check input {
    width: 18px;
    height: 18px;
  }

  .studio-json-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: end;
  }

  .studio-danger-row {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
  }

  .studio-danger-row button {
    color: #b45309;
    background: #fff7ed;
    border-color: rgba(255,128,0,.24);
  }

  @media (max-width: 980px) {
    .studio-hero,
    .studio-layout,
    .studio-form-grid {
      grid-template-columns: 1fr;
    }

    .studio-hero {
      padding: 22px 18px;
      border-radius: 26px;
    }

    .studio-hero h1 {
      font-size: clamp(34px, 10vw, 46px);
    }

    .studio-rail {
      position: static;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .studio-rail button {
      grid-template-columns: 36px 1fr;
      min-height: 58px;
    }

    .studio-rail button > span {
      width: 34px;
      height: 34px;
    }

    .studio-card-head {
      display: grid;
    }
  }
</style>
