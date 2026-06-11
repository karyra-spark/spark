<script lang="ts">
  import { adminLabModules } from '$lib/admin/admin-data';
  import AdminEmptyState from '$lib/admin/ui/AdminEmptyState.svelte';
  import AdminHeader from '$lib/admin/ui/AdminHeader.svelte';
  import AdminSectionCard from '$lib/admin/ui/AdminSectionCard.svelte';
  import AdminStatusBadge from '$lib/admin/ui/AdminStatusBadge.svelte';
  import AdminTable from '$lib/admin/ui/AdminTable.svelte';
</script>

<svelte:head><title>Practice Lab - Karyra Spark Admin</title></svelte:head>

<AdminHeader title="Safe Practice Lab" description="Module inventory and guardrails for simulation-first practice. No live wallet, signature, transaction, or asset flow is present.">
  {#snippet actions()}<a class="admin-button--secondary" href="/lab" target="_blank" rel="noreferrer">Preview Lab</a>{/snippet}
</AdminHeader>

<AdminSectionCard eyebrow="Modules" title="Lab module inventory" description="Enable and disable controls are omitted because the current source model has no supported availability field.">
  <AdminTable caption="Safe Practice Lab modules" columns={['Module', 'Difficulty', 'Checkpoints', 'Duration', 'Availability', 'Guardrail']}>
    {#each adminLabModules as lab}
      <tr>
        <td><strong>{lab.title}</strong><br /><span class="admin-code">{lab.id}</span></td>
        <td><AdminStatusBadge label={lab.difficulty} tone={lab.difficulty === 'safe' ? 'success' : lab.difficulty === 'guided' ? 'info' : 'warning'} /></td>
        <td>{lab.checkpointCount}</td>
        <td>{lab.estimatedMinutes} min</td>
        <td><AdminStatusBadge label="Source-defined" tone="neutral" /></td>
        <td>{lab.guardrail}</td>
      </tr>
    {/each}
  </AdminTable>
</AdminSectionCard>

<AdminSectionCard eyebrow="Activity" title="Lab completion records" description="Aggregate learner activity requires a protected admin API.">
  <AdminEmptyState title="No aggregate Lab activity endpoint" detail="Per-user Lab attempts exist for signed-in learners, but v1 does not expose or infer a cross-user admin dataset." />
</AdminSectionCard>
