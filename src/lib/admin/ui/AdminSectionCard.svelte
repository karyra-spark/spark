<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    title,
    eyebrow,
    description,
    actions,
    children
  }: {
    title: string;
    eyebrow?: string;
    description?: string;
    actions?: Snippet;
    children: Snippet;
  } = $props();
</script>

<section class="admin-section-card">
  <header class="admin-section-card__header">
    <div>
      {#if eyebrow}<span class="admin-eyebrow">{eyebrow}</span>{/if}
      <h2>{title}</h2>
      {#if description}<p>{description}</p>{/if}
    </div>
    {#if actions}<div class="admin-section-card__actions">{@render actions()}</div>{/if}
  </header>
  <div class="admin-section-card__body">{@render children()}</div>
</section>
