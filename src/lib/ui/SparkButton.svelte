<script lang="ts">
  import type { Snippet } from 'svelte';

  type Variant = 'primary' | 'secondary' | 'ghost';
  type Size = 'sm' | 'md' | 'lg';

  type Props = {
    href?: string;
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    disabled?: boolean;
    onclick?: (event: MouseEvent) => void;
    children: Snippet;
    class?: string;
  };

  let {
    href = '',
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    onclick,
    children,
    class: className = ''
  }: Props = $props();

  const buttonClass = $derived(`spark-btn ${variant} ${size} ${className}`.trim());
</script>

{#if href}
  <a class={buttonClass} href={disabled || loading ? undefined : href} aria-disabled={disabled || loading} data-spark-button>
    {#if loading}<span class="spark-spinner"></span>{/if}
    {@render children()}
  </a>
{:else}
  <button class={buttonClass} type="button" disabled={disabled || loading} {onclick} data-spark-button>
    {#if loading}<span class="spark-spinner"></span>{/if}
    {@render children()}
  </button>
{/if}
