<script lang="ts">
  import { adminRoadmapModules } from '$lib/admin/admin-data';
  import AdminHeader from '$lib/admin/ui/AdminHeader.svelte';
  import AdminSectionCard from '$lib/admin/ui/AdminSectionCard.svelte';
  import AdminStatusBadge from '$lib/admin/ui/AdminStatusBadge.svelte';

  let { data } = $props();

  function serviceTone(state: string) {
    if (state === 'available') return 'success' as const;
    if (state === 'error') return 'danger' as const;
    return 'neutral' as const;
  }

  function roadmapTone(status: string) {
    if (status === 'available') return 'success' as const;
    if (status === 'planned') return 'info' as const;
    return 'neutral' as const;
  }
</script>

<svelte:head><title>Starknet and Hub - Karyra Spark Admin</title></svelte:head>

<AdminHeader title="Starknet and Hub" description="Read-only network visibility, Hub route configuration, and module roadmap status.">
  {#snippet actions()}<a class="admin-button--secondary" href={data.hubUrl} target="_blank" rel="noreferrer">Open Hub</a>{/snippet}
</AdminHeader>

<div class="admin-status-grid">
  <article class="admin-status-card">
    <div class="admin-status-card__top"><strong>Hub route</strong><AdminStatusBadge label="Configured" tone="success" /></div>
    <p>The safe public Hub route is <span class="admin-code">{data.hubUrl}</span>.</p>
  </article>
  <article class="admin-status-card">
    <div class="admin-status-card__top"><strong>Starknet RPC</strong><AdminStatusBadge label={data.starknetStatus.label} tone={serviceTone(data.starknetStatus.state)} /></div>
    <p>{data.starknetStatus.detail}</p>
  </article>
  <article class="admin-status-card">
    <div class="admin-status-card__top"><strong>Address / Account Reader</strong><AdminStatusBadge label="Not implemented" tone="neutral" /></div>
    <p>No admin account reader endpoint exists. No address lookup is simulated.</p>
  </article>
</div>

<AdminSectionCard eyebrow="Roadmap" title="Starknet readiness modules" description="Planned cards are status documentation only. They do not connect wallets or submit transactions.">
  <div class="admin-status-grid">
    {#each adminRoadmapModules as module}
      <article class="admin-roadmap-card">
        <div class="admin-roadmap-card__top"><strong>{module.title}</strong><AdminStatusBadge label={module.status} tone={roadmapTone(module.status)} /></div>
        <p>{module.detail}</p>
      </article>
    {/each}
  </div>
</AdminSectionCard>
