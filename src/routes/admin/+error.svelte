<script lang="ts">
  import AdminEmptyState from '$lib/admin/ui/AdminEmptyState.svelte';
  let { error, status } = $props();
</script>

<svelte:head><title>Admin error - Karyra Spark</title></svelte:head>

<div class="admin-standalone-state">
  <AdminEmptyState
    state="error"
    title={'Admin request failed (' + status + ')'}
    detail={error?.message || 'The protected admin request could not be completed.'}
  />
  <a class="admin-button admin-button--secondary" href="/admin">Return to overview</a>
</div>
