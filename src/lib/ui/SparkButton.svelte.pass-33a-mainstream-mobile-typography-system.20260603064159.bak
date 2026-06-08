<script lang="ts">
  import type { Snippet } from 'svelte';

  type Variant = 'primary' | 'secondary' | 'ghost';

  type Props = {
    href?: string;
    variant?: Variant;
    loading?: boolean;
    disabled?: boolean;
    onclick?: (event: MouseEvent) => void;
    children: Snippet;
    class?: string;
  };

  let {
    href = '',
    variant = 'primary',
    loading = false,
    disabled = false,
    onclick,
    children,
    class: className = ''
  }: Props = $props();

  const buttonClass = $derived(`spark-btn ${variant} ${className}`);
</script>

{#if href}
  <a class={buttonClass} href={disabled || loading ? undefined : href} aria-disabled={disabled || loading}>
    {#if loading}<span class="spark-spinner"></span>{/if}
    {@render children()}
  </a>
{:else}
  <button class={buttonClass} type="button" disabled={disabled || loading} {onclick}>
    {#if loading}<span class="spark-spinner"></span>{/if}
    {@render children()}
  </button>
{/if}
