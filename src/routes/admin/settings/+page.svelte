<script lang="ts">
  import { adminSafetyChecklist } from '$lib/admin/admin-data';
  import AdminEmptyState from '$lib/admin/ui/AdminEmptyState.svelte';
  import AdminHeader from '$lib/admin/ui/AdminHeader.svelte';
  import AdminSectionCard from '$lib/admin/ui/AdminSectionCard.svelte';
  import AdminStatusBadge from '$lib/admin/ui/AdminStatusBadge.svelte';

  let { data } = $props();
</script>

<svelte:head><title>System settings - Karyra Spark Admin</title></svelte:head>

<AdminHeader title="Settings and system" description="Safe runtime summary. Private environment values, tokens, database URLs, and RPC URLs are never displayed." />

<div class="admin-card-grid">
  <AdminSectionCard eyebrow="Environment" title="Deployment summary" description="Only public configuration and private-feature presence booleans are shown.">
    <ul class="admin-list">
      <li><strong>Deployment mode:</strong> {data.deploymentMode}</li>
      <li><strong>Public API base:</strong> <span class="admin-code">{data.publicApiBaseUrl}</span></li>
      <li><strong>Build version:</strong> {data.appVersion}</li>
      <li><strong>Admin gate:</strong> <AdminStatusBadge label={data.adminConfigured ? 'Configured' : 'Disabled'} tone={data.adminConfigured ? 'success' : 'warning'} /></li>
      <li><strong>Read-only Starknet RPC:</strong> <AdminStatusBadge label={data.starknetRpcConfigured ? 'Configured' : 'Not configured'} tone={data.starknetRpcConfigured ? 'success' : 'neutral'} /></li>
    </ul>
  </AdminSectionCard>

  <AdminSectionCard eyebrow="Safety" title="Admin safety checklist" description="These constraints apply to the beginner and admin flows.">
    <ul class="admin-checklist">
      {#each adminSafetyChecklist as item}<li>{item}</li>{/each}
    </ul>
  </AdminSectionCard>
</div>

<AdminSectionCard eyebrow="Feature flags" title="Runtime feature flags" description="No browser-visible feature flag registry exists in the current frontend.">
  {#if data.featureFlags.length === 0}
    <AdminEmptyState title="No feature flags are registered" detail="Future flags should expose names and safe states only, never secret values or private service configuration." />
  {/if}
</AdminSectionCard>
