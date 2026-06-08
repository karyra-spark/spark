<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { fallbackActions } from '$lib/flow/flow-model';

  type Props = {
    status?: number;
    message?: string;
  };

  let { status = 404, message = 'Halaman tidak ditemukan.' }: Props = $props();

  const title = $derived(
    status === 404
      ? 'Halaman ini belum tersedia.'
      : status >= 500
        ? 'Ada masalah saat membuka halaman.'
        : 'Arahkan kembali perjalananmu.'
  );

  const copy = $derived(
    status === 404
      ? 'Spark masih beta. Beberapa route mungkin belum tersedia, tetapi alur utama tetap bisa digunakan.'
      : message || 'Silakan kembali ke Dashboard, Core, atau Login.'
  );
</script>

<section class="spark-app-fallback">
  <SparkCard class="fallback-main-card">
    <span class="fallback-icon"><SparkIcon name="sparkles" size={30} /></span>
    <div>
      <SparkTrustBadge label="Return path tersedia" tone="safe" />
      <h1>{title}</h1>
      <p>{copy}</p>

      <div class="fallback-action-row">
        {#each fallbackActions as action}
          <SparkButton href={action.href} variant={action.href === '/dashboard' ? 'primary' : 'secondary'}>
            <SparkIcon name={action.icon} size={15} />
            {action.label}
          </SparkButton>
        {/each}
      </div>
    </div>
  </SparkCard>
</section>
