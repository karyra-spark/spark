<script lang="ts">
  import SparkIcon from './SparkIcon.svelte';
  import { landingFooterColumns, landingTrustNotes } from '$lib/landing/landing-model';
  const year = new Date().getFullYear();
</script>

<footer class="spark-landing-footer" id="footer">
  <div class="footer-main">
    <section class="footer-brand">
      <a href="/" class="footer-logo" aria-label="Karyra Spark Home">
        <span><SparkIcon name="sparkles" size={22} /></span>
        <strong>Karyra Spark</strong>
      </a>

      <p>Local blockchain readiness gateway untuk belajar fondasi, praktik aman, membangun Passport, mengikuti komunitas, dan menjelajahi Starknet secara bertahap.</p>

      <div class="footer-trust-list">
        {#each landingTrustNotes as note}
          <span><SparkIcon name="check" size={14} /> {note}</span>
        {/each}
      </div>
    </section>

    <nav class="footer-link-grid" aria-label="Footer navigation">
      {#each landingFooterColumns as column}
        <section>
          <h2>{column.title}</h2>
          <div>
            {#each column.links as link}
              <a href={link[1]}>
                <strong>{link[0]}</strong>
                <small>{link[2]}</small>
              </a>
            {/each}
          </div>
        </section>
      {/each}
    </nav>
  </div>

  <div class="footer-bottom">
    <p>© {year} Karyra Spark. Dibangun sebagai produk edukasi dan readiness, bukan saran finansial.</p>
    <div>
      <a href="/settings">Settings</a>
      <a href="/login">Mode coba</a>
      <a href="/#alur">Alur Spark</a>
    </div>
  </div>
</footer>
