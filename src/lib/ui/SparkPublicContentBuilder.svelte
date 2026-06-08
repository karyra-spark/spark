<script lang="ts">
  import { onMount } from 'svelte';
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import { pushToast } from '$state/app-state.svelte';
  import {
    PUBLIC_CONTENT_SLOT_DEFINITIONS,
    createDefaultPublicContentBlocks,
    isSlotVisible,
    makePublicContentOverride,
    normalizePublicContentOverride,
    slotHref,
    slotText,
    type PublicContentBlock,
    type PublicContentOverride,
    type PublicContentSlotKey
  } from '$lib/content-builder/public-content-builder';

  let blocks = $state<PublicContentBlock[]>(createDefaultPublicContentBlocks());
  let activeId = $state('settings-hero');
  let selectedPage = $state('all');
  let loading = $state(true);
  let saving = $state(false);
  let dirty = $state(false);
  let writeEnabled = $state(false);
  let sourcePath = $state('static/studio-content-overrides.json');
  let lastSavedAt = $state('');

  const pages = $derived(['all', ...Array.from(new Set(blocks.map((block) => block.page)))]);
  const visibleBlocks = $derived(
    selectedPage === 'all' ? blocks : blocks.filter((block) => block.page === selectedPage)
  );
  const activeBlock = $derived(blocks.find((block) => block.id === activeId) ?? blocks[0]);
  const defaultBlocks = createDefaultPublicContentBlocks();

  onMount(() => {
    void loadContentOverride();
  });

  async function loadContentOverride() {
    loading = true;
    try {
      const response = await fetch('/studio/content/api/override', { cache: 'no-store' });
      if (!response.ok) throw new Error('Studio content endpoint belum bisa dibaca.');
      const payload = (await response.json()) as {
        write_enabled?: boolean;
        path?: string;
        content?: PublicContentOverride;
      };
      const normalized = normalizePublicContentOverride(payload.content);
      blocks = normalized.blocks;
      writeEnabled = Boolean(payload.write_enabled);
      sourcePath = payload.path ?? sourcePath;
      lastSavedAt = normalized.updated_at;
      if (!blocks.some((block) => block.id === activeId) && blocks[0]) activeId = blocks[0].id;
    } catch (error) {
      pushToast({
        title: 'Studio memakai bawaan awal',
        copy: error instanceof Error ? error.message : 'Konten override belum bisa dibaca.',
        tone: 'warning'
      });
    } finally {
      loading = false;
    }
  }

  async function saveToFile() {
    saving = true;
    try {
      const payload = makePublicContentOverride(blocks);
      const response = await fetch('/studio/content/api/override', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Studio belum bisa menyimpan file override.');
      }
      const saved = (await response.json()) as { content?: PublicContentOverride; path?: string };
      const normalized = normalizePublicContentOverride(saved.content);
      blocks = normalized.blocks;
      sourcePath = saved.path ?? sourcePath;
      lastSavedAt = normalized.updated_at;
      dirty = false;
      pushToast({ title: 'Konten tersimpan', copy: 'Perubahan slot tersimpan ke file override Studio.', tone: 'success' });
    } catch (error) {
      pushToast({
        title: 'Belum bisa menyimpan',
        copy: error instanceof Error ? error.message : 'Aktifkan SPARK_STUDIO_WRITE_ENABLED=true untuk menulis file.',
        tone: 'warning'
      });
    } finally {
      saving = false;
    }
  }

  function setActiveFromPage(page: string) {
    selectedPage = page;
    const firstBlock = page === 'all' ? blocks[0] : blocks.find((block) => block.page === page);
    if (firstBlock) activeId = firstBlock.id;
  }

  function updateBlock(blockId: string, patcher: (block: PublicContentBlock) => PublicContentBlock) {
    blocks = blocks.map((block) => (block.id === blockId ? patcher(block) : block));
    dirty = true;
  }

  function updateSlot(blockId: string, key: PublicContentSlotKey, patch: Partial<PublicContentBlock['slots'][PublicContentSlotKey]>) {
    updateBlock(blockId, (block) => ({
      ...block,
      slots: {
        ...block.slots,
        [key]: {
          ...block.slots[key],
          ...patch
        }
      }
    }));
  }

  function clearSlot(blockId: string, key: PublicContentSlotKey) {
    updateBlock(blockId, (block) => ({
      ...block,
      slots: {
        ...block.slots,
        [key]: {
          ...block.slots[key],
          enabled: false,
          text: '',
          href: key === 'primaryCta' || key === 'secondaryCta' ? '' : block.slots[key].href
        }
      }
    }));
  }

  function restoreSlot(blockId: string, key: PublicContentSlotKey) {
    const defaultBlock = defaultBlocks.find((block) => block.id === blockId);
    const defaultSlot = defaultBlock?.slots[key];
    if (!defaultSlot) return;
    updateSlot(blockId, key, { ...defaultSlot });
  }

  function restoreBlock(blockId: string) {
    const defaultBlock = defaultBlocks.find((block) => block.id === blockId);
    if (!defaultBlock) return;
    updateBlock(blockId, () => structuredClone(defaultBlock));
  }

  function resetAll() {
    const confirmed = window.confirm('Pulihkan semua slot ke bawaan awal? Perubahan yang belum disimpan akan hilang.');
    if (!confirmed) return;
    blocks = createDefaultPublicContentBlocks();
    dirty = true;
  }

  function exportJson() {
    const payload = JSON.stringify(makePublicContentOverride(blocks), null, 2);
    if (navigator.clipboard) navigator.clipboard.writeText(payload);
    pushToast({ title: 'JSON disalin', copy: 'Override content siap ditempel ke file atau dibagikan.', tone: 'success' });
  }
</script>

<section class="content-builder-shell" data-karyra-studio-content-builder="pass67">
  <section class="content-builder-hero">
    <div>
      <span class="spark-eyebrow">Spark Studio</span>
      <h1>Rapikan teks publik tanpa membuka source code.</h1>
      <p>
        Edit, sembunyikan, atau hapus slot seperti label kecil, judul, copy, CTA, dan catatan. Saat slot dimatikan,
        elemen itu tidak dirender sehingga tidak menyisakan ruang kosong.
      </p>
      <div class="builder-actions">
        <SparkButton onclick={saveToFile} disabled={!writeEnabled || saving}>{saving ? 'Menyimpan...' : dirty ? 'Simpan ke file' : 'Tersimpan'}</SparkButton>
        <SparkButton variant="secondary" onclick={exportJson}>Salin JSON</SparkButton>
        <SparkButton variant="ghost" onclick={resetAll}>Reset semua</SparkButton>
      </div>
      <small>
        {writeEnabled ? `Writer aktif · ${sourcePath}` : 'Writer nonaktif. Jalankan dengan SPARK_STUDIO_WRITE_ENABLED=true untuk menyimpan file.'}
      </small>
    </div>

    <aside>
      <strong>{dirty ? 'Ada perubahan' : 'Tidak ada perubahan'}</strong>
      <span>{lastSavedAt ? `Terakhir disimpan ${new Date(lastSavedAt).toLocaleString('id-ID')}` : 'Belum ada override tersimpan.'}</span>
    </aside>
  </section>

  <section class="builder-layout">
    <aside class="builder-sidebar" aria-label="Pilih halaman dan blok">
      <label>
        <span>Halaman</span>
        <select value={selectedPage} onchange={(event) => setActiveFromPage((event.currentTarget as HTMLSelectElement).value)}>
          {#each pages as page}
            <option value={page}>{page === 'all' ? 'Semua halaman' : page}</option>
          {/each}
        </select>
      </label>

      <div class="block-list">
        {#if loading}
          <p>Memuat slot...</p>
        {:else}
          {#each visibleBlocks as block}
            <button type="button" class:active={activeBlock?.id === block.id} onclick={() => (activeId = block.id)}>
              <strong>{block.section}</strong>
              <small>{block.page} · {block.id}</small>
            </button>
          {/each}
        {/if}
      </div>
    </aside>

    {#if activeBlock}
      <div class="builder-editor">
        <div class="editor-card">
          <SparkCard>
          <div class="editor-head">
            <div>
              <span class="spark-eyebrow">{activeBlock.page}</span>
              <h2>{activeBlock.section}</h2>
              <p>Matikan slot yang tidak perlu agar halaman terasa lebih bersih untuk pengguna publik.</p>
            </div>
            <SparkButton variant="secondary" onclick={() => restoreBlock(activeBlock.id)}>Restore blok</SparkButton>
          </div>

          <div class="slot-grid">
            {#each PUBLIC_CONTENT_SLOT_DEFINITIONS as definition}
              {@const slot = activeBlock.slots[definition.key]}
              <article class:disabled={!slot.enabled}>
                <header>
                  <div>
                    <strong>{definition.label}</strong>
                    <small>{definition.hint}</small>
                  </div>
                  <label class="slot-toggle">
                    <input
                      type="checkbox"
                      checked={slot.enabled}
                      onchange={(event) => updateSlot(activeBlock.id, definition.key, { enabled: (event.currentTarget as HTMLInputElement).checked })}
                    />
                    <span>{slot.enabled ? 'Tampil' : 'Hilang'}</span>
                  </label>
                </header>

                {#if definition.kind === 'textarea' || definition.kind === 'note'}
                  <textarea
                    value={slot.text}
                    placeholder="Kosongkan atau matikan slot ini jika tidak dibutuhkan."
                    oninput={(event) => updateSlot(activeBlock.id, definition.key, { text: (event.currentTarget as HTMLTextAreaElement).value })}
                  ></textarea>
                {:else}
                  <input
                    value={slot.text}
                    placeholder="Kosongkan atau matikan slot ini jika tidak dibutuhkan."
                    oninput={(event) => updateSlot(activeBlock.id, definition.key, { text: (event.currentTarget as HTMLInputElement).value })}
                  />
                {/if}

                {#if definition.kind === 'cta'}
                  <input
                    value={slot.href ?? ''}
                    placeholder="Link CTA, contoh: /core"
                    oninput={(event) => updateSlot(activeBlock.id, definition.key, { href: (event.currentTarget as HTMLInputElement).value })}
                  />
                {/if}

                <footer>
                  <button type="button" onclick={() => clearSlot(activeBlock.id, definition.key)}>Hapus slot</button>
                  <button type="button" onclick={() => restoreSlot(activeBlock.id, definition.key)}>Restore</button>
                </footer>
              </article>
            {/each}
          </div>
          </SparkCard>
        </div>

        <div class="preview-card">
          <SparkCard>
          <span class="spark-eyebrow">Preview</span>
          <div class="public-preview">
            {#if isSlotVisible(activeBlock, 'eyebrow')}
              <small>{slotText(activeBlock, 'eyebrow')}</small>
            {/if}
            {#if isSlotVisible(activeBlock, 'title')}
              <h2>{slotText(activeBlock, 'title')}</h2>
            {/if}
            {#if isSlotVisible(activeBlock, 'copy')}
              <p>{slotText(activeBlock, 'copy')}</p>
            {/if}
            {#if isSlotVisible(activeBlock, 'primaryCta') || isSlotVisible(activeBlock, 'secondaryCta')}
              <div class="preview-actions">
                {#if isSlotVisible(activeBlock, 'primaryCta')}
                  <a href={slotHref(activeBlock, 'primaryCta')}>{slotText(activeBlock, 'primaryCta')}</a>
                {/if}
                {#if isSlotVisible(activeBlock, 'secondaryCta')}
                  <a href={slotHref(activeBlock, 'secondaryCta')} class="secondary">{slotText(activeBlock, 'secondaryCta')}</a>
                {/if}
              </div>
            {/if}
            {#if isSlotVisible(activeBlock, 'note')}
              <em>{slotText(activeBlock, 'note')}</em>
            {/if}
          </div>
          </SparkCard>
        </div>
      </div>
    {/if}
  </section>
</section>

<style>
  .content-builder-shell,
  .builder-editor,
  .slot-grid {
    display: grid;
    gap: 16px;
  }

  .content-builder-hero,
  .builder-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 16px;
    align-items: stretch;
  }

  .content-builder-hero {
    padding: clamp(18px, 4vw, 34px);
    border: 1px solid var(--spark-line);
    border-radius: 30px;
    background: var(--spark-card);
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
  }

  .content-builder-hero h1,
  .editor-head h2,
  .public-preview h2 {
    margin: 0;
    color: var(--spark-navy);
    letter-spacing: -0.045em;
    line-height: 1.03;
  }

  :global([data-theme='dark']) .content-builder-hero h1,
  :global([data-theme='dark']) .editor-head h2,
  :global([data-theme='dark']) .public-preview h2,
  :global([data-theme='dark']) .content-builder-hero aside strong,
  :global([data-theme='dark']) .block-list button strong,
  :global([data-theme='dark']) .slot-grid article strong {
    color: #fff;
  }

  .content-builder-hero h1 {
    max-width: 780px;
    font-size: clamp(34px, 6vw, 64px);
  }

  .content-builder-hero p,
  .editor-head p,
  .public-preview p,
  .content-builder-hero small,
  .content-builder-hero aside span,
  .slot-grid article small,
  .block-list p,
  .block-list button small {
    color: var(--spark-muted);
    line-height: 1.55;
  }

  .builder-actions,
  .preview-actions,
  .slot-grid article footer,
  .editor-head {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }

  .builder-actions {
    margin-top: 18px;
  }

  .content-builder-hero aside,
  .builder-sidebar,
  :global(.editor-card),
  :global(.preview-card) {
    border: 1px solid var(--spark-line);
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.55);
  }

  :global([data-theme='dark']) .content-builder-hero aside,
  :global([data-theme='dark']) .builder-sidebar,
  :global([data-theme='dark'] .editor-card),
  :global([data-theme='dark'] .preview-card) {
    background: rgba(255, 255, 255, 0.045);
  }

  .content-builder-hero aside {
    display: grid;
    align-content: center;
    gap: 6px;
    padding: 16px;
  }

  .builder-layout {
    grid-template-columns: 280px minmax(0, 1fr);
  }

  .builder-sidebar {
    display: grid;
    align-content: start;
    gap: 14px;
    padding: 14px;
  }

  .builder-sidebar label,
  .slot-grid article {
    display: grid;
    gap: 8px;
  }

  .builder-sidebar select,
  .slot-grid input,
  .slot-grid textarea {
    width: 100%;
    border: 1px solid var(--spark-line);
    border-radius: 14px;
    padding: 10px 12px;
    color: var(--spark-navy);
    background: var(--spark-card);
    font: inherit;
  }

  .slot-grid textarea {
    min-height: 92px;
    resize: vertical;
  }

  .block-list {
    display: grid;
    gap: 8px;
    max-height: 58vh;
    overflow: auto;
  }

  .block-list button {
    display: grid;
    gap: 4px;
    width: 100%;
    border: 1px solid var(--spark-line);
    border-radius: 16px;
    padding: 12px;
    text-align: left;
    background: transparent;
    cursor: pointer;
  }

  .block-list button.active {
    border-color: rgba(31, 117, 255, 0.55);
    background: rgba(31, 117, 255, 0.1);
  }

  :global(.editor-card),
  :global(.preview-card) {
    padding: 16px;
  }

  .editor-head {
    justify-content: space-between;
    margin-bottom: 14px;
  }

  .slot-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .slot-grid article {
    padding: 14px;
    border: 1px solid var(--spark-line);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.45);
  }

  .slot-grid article.disabled {
    opacity: 0.62;
    background: rgba(148, 163, 184, 0.1);
  }

  .slot-grid article header {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: start;
  }

  .slot-toggle {
    display: inline-flex;
    gap: 6px;
    align-items: center;
    color: var(--spark-muted);
    font-size: 12px;
    white-space: nowrap;
  }

  .slot-grid article footer button {
    border: 0;
    border-radius: 999px;
    padding: 7px 10px;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, 0.1);
    font-weight: 700;
    cursor: pointer;
  }

  .public-preview {
    display: grid;
    gap: 10px;
    padding: 20px;
    border-radius: 22px;
    border: 1px dashed var(--spark-line);
  }

  .public-preview small,
  .public-preview em {
    color: var(--spark-muted);
  }

  .preview-actions a {
    display: inline-flex;
    min-height: 38px;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
    border-radius: 999px;
    color: #fff;
    background: var(--spark-blue-strong);
    font-weight: 800;
    text-decoration: none;
  }

  .preview-actions a.secondary {
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, 0.1);
  }

  @media (max-width: 880px) {
    .content-builder-hero,
    .builder-layout {
      grid-template-columns: 1fr;
    }

    .slot-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
