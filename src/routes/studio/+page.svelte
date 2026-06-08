<script lang="ts">
  import SparkContentStudio from '$ui/SparkContentStudio.svelte';
  import SparkButton from '$ui/SparkButton.svelte';
</script>

<svelte:head>
  <title>Spark Studio — Karyra Spark</title>
  <meta name="description" content="Editor konten minimalis untuk teks, pesan, resource, event, dan halaman trust Karyra Spark." />
</svelte:head>

<section class="studio-content-builder-entry">
  <div>
    <span class="spark-eyebrow">Studio baru</span>
    <h1>Public Content Builder</h1>
    <p>Edit, hapus, atau sembunyikan slot teks publik seperti label kecil, judul, copy, CTA, dan catatan tanpa membuka source code.</p>
  </div>
  <SparkButton href="/studio/content">Buka Content Builder</SparkButton>
</section>

<SparkContentStudio />

<style>
  .studio-content-builder-entry {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 14px;
    align-items: center;
    margin-bottom: 16px;
    padding: 16px;
    border: 1px solid var(--spark-line);
    border-radius: 24px;
    background: var(--spark-card);
    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
  }

  .studio-content-builder-entry h1,
  .studio-content-builder-entry p {
    margin: 0;
  }

  .studio-content-builder-entry h1 {
    color: var(--spark-navy);
    font-size: clamp(24px, 4vw, 36px);
    letter-spacing: -0.045em;
  }

  .studio-content-builder-entry p {
    max-width: 68ch;
    color: var(--spark-muted);
    line-height: 1.55;
  }

  :global([data-theme='dark']) .studio-content-builder-entry h1 {
    color: #fff;
  }

  @media (max-width: 720px) {
    .studio-content-builder-entry {
      grid-template-columns: 1fr;
    }
  }
</style>
