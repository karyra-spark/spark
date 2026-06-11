<script lang="ts">
  import { page } from '$app/state';
  import '$lib/admin/admin.css';
  import AdminLayout from '$lib/admin/ui/AdminLayout.svelte';

  let { children, data } = $props();
</script>

<svelte:head>
  <meta name="robots" content="noindex, nofollow, noarchive" />
</svelte:head>

{#if page.url.pathname === '/admin/login' || !data.adminAuthenticated}
  {@render children()}
{:else}
  <AdminLayout>
    {@render children()}
  </AdminLayout>
{/if}
