<script lang="ts">
  import { page } from '$app/stores';
  import SparkBrand from './SparkBrand.svelte';

  const publicPaths = ['/', '/help', '/faq', '/about', '/docs', '/terms', '/login', '/register'];
  const year = new Date().getFullYear();
  const pathname = $derived($page.url.pathname);
  const visible = $derived(publicPaths.includes(pathname));

  const learnLinks = [
    { href: '/core', label: 'Belajar' },
    { href: '/lab', label: 'Lab' },
    { href: '/community', label: 'Komunitas' },
    { href: '/passport', label: 'Passport' }
  ];

  const supportLinks = [
    { href: '/help', label: 'Bantuan' },
    { href: '/faq', label: 'FAQ' },
    { href: '/docs', label: 'Panduan' },
    { href: '/terms', label: 'Ketentuan' }
  ];

  const sparkLinks = [
    { href: '/about', label: 'Tentang Spark' },
    { href: '/login', label: 'Masuk' },
    { href: '/register', label: 'Daftar' }
  ];
</script>

{#if visible}
  <footer class="spark-simple-footer pass35b-simple-footer karyra-footer-stable pass40b-footer pass41a-public-footer" aria-label="Footer Karyra Spark">
    <div class="pass41a-footer-top">
      <div class="pass41a-footer-brandline">
        <SparkBrand compact />
        <p>Belajar blockchain dan Starknet dengan ritme aman: paham dulu, praktik pelan-pelan, lalu jelajahi ekosistem.</p>
      </div>

      <nav class="pass41a-footer-group" aria-label="Jalur Spark">
        <strong>Jalur Spark</strong>
        {#each learnLinks as link}
          <a href={link.href}>{link.label}</a>
        {/each}
      </nav>

      <nav class="pass41a-footer-group" aria-label="Bantuan">
        <strong>Bantuan</strong>
        {#each supportLinks as link}
          <a href={link.href}>{link.label}</a>
        {/each}
      </nav>

      <nav class="pass41a-footer-group" aria-label="Akses">
        <strong>Akses</strong>
        {#each sparkLinks as link}
          <a href={link.href}>{link.label}</a>
        {/each}
      </nav>
    </div>

    <div class="pass41a-footer-bottom">
      <small>© {year} Karyra Spark · Edukasi dan readiness, bukan saran finansial.</small>
    </div>
  </footer>
{/if}
