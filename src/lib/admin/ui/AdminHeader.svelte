<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    eyebrow = 'Karyra administration',
    title,
    description,
    actions
  }: {
    eyebrow?: string;
    title: string;
    description: string;
    actions?: Snippet;
  } = $props();
</script>

<header class="admin-page-header">
  <div>
    <span class="admin-eyebrow">{eyebrow}</span>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
  {#if actions}<div class="admin-page-header__actions">{@render actions()}</div>{/if}
</header>
