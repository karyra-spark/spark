<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { cairoPlaceholderCode, explorerWorkspaceNotes } from '$lib/advanced/advanced-model';
  import { completeLab, learningState } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  function markPreviewComplete() {
    completeLab('cairo-preview');
    pushToast({ title: 'Explorer preview tercatat', copy: 'Preview Cairo masuk sebagai sinyal praktik lokal.', tone: 'success' });
  }
</script>

<SparkCard class="spark-explorer-placeholder">
  <div class="explorer-head">
    <div>
      <span class="spark-eyebrow">Mode Penjelajah</span>
      <h2>Cairo Workspace Preview</h2>
      <p>Ini placeholder advanced workspace. CodeMirror disimpan untuk tahap berikutnya agar Spark tidak overbuild sebelum grant/backend lebih pasti.</p>
    </div>
    <div class="explorer-status">
      <SparkTrustBadge label="Placeholder aman" tone="safe" copy="Belum mengaktifkan compiler/editor produksi." />
      <span>{learningState.experience === 'explorer' ? 'Explorer aktif' : 'Opsional'}</span>
    </div>
  </div>

  <div class="explorer-grid">
    <pre class="explorer-code" aria-label="Preview kode Cairo"><code>{cairoPlaceholderCode}</code></pre>
    <aside class="explorer-side">
      <span><SparkIcon name="code" size={22} /></span>
      <h3>Advanced-ready, belum overbuild.</h3>
      <p>Pengguna bisa melihat arah teknis Spark tanpa kita mengaktifkan compiler, wallet, atau dependency berat terlalu cepat.</p>
      <div class="explorer-note-list">
        {#each explorerWorkspaceNotes as note}
          <article><strong>{note.title}</strong><small>{note.copy}</small></article>
        {/each}
      </div>
      <SparkButton onclick={markPreviewComplete}>Tandai Preview Selesai</SparkButton>
    </aside>
  </div>
</SparkCard>
