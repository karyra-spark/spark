<script lang="ts">
  import { page } from '$app/state';
  import { isNavActive, sparkNavItems } from '$lib/content/spark-navigation';
  import { getLearningProgressPercent, getReadinessScore } from '$state/learning-state.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
</script>

<aside class="spark-sidebar">
  <div class="spark-sidebar-head">
    <span>Jalur Spark</span>
    <strong>Belajar dulu, praktik aman, lalu jelajahi Starknet.</strong>
    <p>Ikuti langkah kecil yang jelas sampai kamu siap masuk ekosistem.</p>
  </div>

  <nav class="spark-sidebar-nav" aria-label="Navigasi utama">
    {#each sparkNavItems.filter((item) => !['settings', 'profile'].includes(item.key)) as item}
      <a href={item.href} class:active={isNavActive(page.url.pathname, item.href)}>
        <span><SparkIcon name={item.icon} size={19} /></span>
        <div>
          <strong>{item.label}</strong>
          <small>{item.copy}</small>
        </div>
      </a>
    {/each}
  </nav>

  <a class="spark-sidebar-status" href="/passport">
    <div class="spark-ring" style={`--value: ${getReadinessScore()}`}>{getReadinessScore()}%</div>
    <div>
      <strong>Lihat Kesiapan Saya</strong>
      <p>{getLearningProgressPercent()}% belajar · cek langkah berikutnya.</p>
    </div>
  </a>

  <a class="spark-sidebar-hub" href="/hub">
    <span><SparkIcon name="compass" size={18} /></span>
    <span>
      <strong>Jelajahi Hub</strong>
      <small>Temukan resource Starknet sesuai kesiapanmu.</small>
    </span>
  </a>

  <a class="spark-sidebar-settings" href="/settings" class:active={isNavActive(page.url.pathname, '/settings')}>
    <SparkIcon name="settings" size={17} />
    <span>Pengaturan Akun</span>
  </a>
</aside>
