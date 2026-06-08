<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    tone?: 'neutral' | 'blue' | 'green' | 'purple' | 'orange' | 'pink';
    children: Snippet;
    class?: string;
  };

  let { tone = 'neutral', children, class: className = '' }: Props = $props();
</script>

<div class={`spark-card ${tone} ${className}`}>
  {@render children()}
</div>
