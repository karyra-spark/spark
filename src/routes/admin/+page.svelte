<script lang="ts">
  import { overviewMetrics } from '$lib/admin/admin-data';
  import AdminEmptyState from '$lib/admin/ui/AdminEmptyState.svelte';
  import AdminHeader from '$lib/admin/ui/AdminHeader.svelte';
  import AdminSectionCard from '$lib/admin/ui/AdminSectionCard.svelte';
  import AdminStatCard from '$lib/admin/ui/AdminStatCard.svelte';
  import AdminStatusBadge from '$lib/admin/ui/AdminStatusBadge.svelte';

  let { data } = $props();

  function statusTone(state: string) {
    if (state === 'available') return 'success' as const;
    if (state === 'error') return 'danger' as const;
    return 'neutral' as const;
  }
</script>

<svelte:head><title>Admin overview - Karyra Spark</title></svelte:head>

<AdminHeader
  title="Ecosystem overview"
  description="Operational visibility for Spark learning, practice, Passport, participation, and Starknet readiness surfaces."
>
  {#snippet actions()}
    <a class="admin-button--secondary" href="/" target="_blank" rel="noreferrer">Open public Spark</a>
  {/snippet}
</AdminHeader>

<div class="admin-stat-grid">
  {#each overviewMetrics as metric}
    <AdminStatCard {...metric} />
  {/each}
</div>

<div class="admin-card-grid">
  <AdminSectionCard eyebrow="Runtime" title="System health" description="Read-only checks only. No credentials or private endpoint values are returned to the browser.">
    <div class="admin-status-card">
      <div class="admin-status-card__top">
        <strong>Spark API</strong>
        <AdminStatusBadge label={data.apiStatus.label} tone={statusTone(data.apiStatus.state)} />
      </div>
      <p>{data.apiStatus.detail}</p>
    </div>
  </AdminSectionCard>

  <AdminSectionCard eyebrow="Starknet" title="Network status" description="Uses the server-configured RPC only for a read-only chain ID request.">
    <div class="admin-status-card">
      <div class="admin-status-card__top">
        <strong>Read-only RPC</strong>
        <AdminStatusBadge label={data.starknetStatus.label} tone={statusTone(data.starknetStatus.state)} />
      </div>
      <p>{data.starknetStatus.detail}</p>
    </div>
  </AdminSectionCard>
</div>

<AdminSectionCard eyebrow="Activity" title="Recent activity" description="This feed will use a protected, privacy-reviewed admin activity endpoint when one exists.">
  {#if data.recentActivity.length === 0}
    <AdminEmptyState
      title="No admin activity feed is connected"
      detail="The frontend has per-user progress APIs, but no aggregate admin activity endpoint. No synthetic events are shown."
    />
  {/if}
</AdminSectionCard>
