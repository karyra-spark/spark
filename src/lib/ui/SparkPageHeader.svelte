<script lang="ts">
  import SparkHeroVisual from './SparkHeroVisual.svelte';
  import type { Snippet } from 'svelte';

  type Props = {
    eyebrow: string;
    title: string;
    copy: string;
    mode?: 'gateway' | 'learn' | 'practice' | 'community' | 'hub' | 'profile';
    children?: Snippet;
    compact?: boolean;
  };

  let { eyebrow, title, copy, mode = 'gateway', children, compact = false }: Props = $props();
</script>

<section class={`spark-page-header ${mode} ${compact ? 'compact' : ''}`}>
  <div>
    <span class="spark-eyebrow">{eyebrow}</span>
    <h1>{title}</h1>
    <p>{copy}</p>
    {#if children}
      <div class="spark-hero-actions">
        {@render children()}
      </div>
    {/if}
  </div>
  <aside class="spark-page-header-visual">
    <SparkHeroVisual {mode} />
  </aside>
</section>
