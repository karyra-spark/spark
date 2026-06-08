<script lang="ts">
  import { betaSession } from '$state/beta-session-state.svelte';

  type Props = {
    compact?: boolean;
  };

  let { compact = false }: Props = $props();

  const homeHref = $derived(betaSession.user ? '/dashboard' : '/');
  let imageFailed = $state(false);
  const logoSrc = '/assets/brand/karyra-spark-logo-tight.png?v=35b5';
</script>

<a class={`spark-brand karyra-brand ${compact ? 'compact' : ''}`.trim()} href={homeHref} aria-label="Karyra Spark">
  {#if !imageFailed}
    <img class="karyra-brand-logo" src={logoSrc} alt="Karyra Spark" onerror={() => (imageFailed = true)} />
  {:else}
    <span class="karyra-brand-fallback">Karyra Spark</span>
  {/if}
</a>
