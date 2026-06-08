<script lang="ts">
  import SparkIcon from '$ui/SparkIcon.svelte';
</script>

<aside class="social-safety-panel" aria-label="Panduan keamanan diskusi komunitas">
  <span><SparkIcon name="shield" size={18} /></span>
  <div>
    <strong>Ruang sosial aman</strong>
    <p>Bagikan progress, pertanyaan, resource, atau catatan workshop. Jangan pernah menulis seed phrase, private key, kode pemulihan, nomor pribadi, atau data sensitif.</p>
  </div>
</aside>

<style>
  .social-safety-panel {
    display: grid;
    grid-template-columns: 42px minmax(0, 1fr);
    gap: 12px;
    align-items: start;
    padding: 13px;
    border: 1px solid var(--spark-line);
    border-radius: 20px;
    background: rgba(34, 183, 122, 0.08);
  }

  .social-safety-panel > span {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 15px;
    color: var(--spark-green);
    background: rgba(34, 183, 122, 0.12);
  }

  .social-safety-panel strong {
    display: block;
    color: var(--spark-navy);
    font-size: 14px;
    line-height: 1.15;
  }

  :global([data-theme='dark']) .social-safety-panel strong { color: #fff; }

  .social-safety-panel p {
    margin: 5px 0 0;
    color: var(--spark-muted);
    font-size: 12.5px;
    line-height: 1.48;
  }


/* KARYRA PASS 37A SOCIAL CSS SCOPE WARNING FIX: parent theme selectors are global; local classes remain scoped. */
</style>
