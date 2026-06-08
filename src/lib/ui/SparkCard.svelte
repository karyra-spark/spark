<script lang="ts">
  import type { Snippet } from 'svelte';

  type Tone = 'neutral' | 'blue' | 'green' | 'purple' | 'orange' | 'pink';
  type Density = 'compact' | 'comfortable' | 'spacious';

  type Props = {
    tone?: Tone;
    density?: Density;
    children: Snippet;
    class?: string;
  };

  let { tone = 'neutral', density = 'comfortable', children, class: className = '' }: Props = $props();

  const cardClass = $derived(`spark-card ${tone} ${density} ${className}`.trim());
</script>

<div class={cardClass} data-spark-card data-tone={tone} data-density={density}>
  {@render children()}
</div>
