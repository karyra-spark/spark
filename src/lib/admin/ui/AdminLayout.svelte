<script lang="ts">
  import type { Snippet } from 'svelte';
  import AdminSidebar from './AdminSidebar.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="admin-root">
  <a class="admin-skip-link" href="#admin-content">Skip to admin content</a>
  <AdminSidebar />
  <main id="admin-content" class="admin-main">
    {@render children()}
  </main>
</div>
