<script lang="ts">
  import { adminProofRecords } from '$lib/admin/admin-data';
  import AdminEmptyState from '$lib/admin/ui/AdminEmptyState.svelte';
  import AdminHeader from '$lib/admin/ui/AdminHeader.svelte';
  import AdminSectionCard from '$lib/admin/ui/AdminSectionCard.svelte';
  import AdminStatusBadge from '$lib/admin/ui/AdminStatusBadge.svelte';
  import AdminTable from '$lib/admin/ui/AdminTable.svelte';

  let sourceFilter = $state('all');
  let statusFilter = $state('all');
  const filteredRecords = $derived(adminProofRecords.filter((record) =>
    (sourceFilter === 'all' || record.source === sourceFilter) && (statusFilter === 'all' || record.status === statusFilter)
  ));
</script>

<svelte:head><title>Proof Ledger - Karyra Spark Admin</title></svelte:head>

<AdminHeader title="Proof Ledger and participation" description="Future-ready review surface for learning, Lab, workshop, cohort, system, and facilitator evidence." />

<AdminSectionCard eyebrow="Verification queue" title="Participation and evidence records" description="Facilitator verification controls remain disabled until server-side authorization and audit logging exist.">
  <div class="admin-filter-row">
    <label>Source<select bind:value={sourceFilter}><option value="all">All sources</option><option value="system">System</option><option value="lesson">Lesson</option><option value="lab">Lab</option><option value="workshop">Workshop</option><option value="cohort">Cohort</option><option value="facilitator">Facilitator</option></select></label>
    <label>Status<select bind:value={statusFilter}><option value="all">All statuses</option><option value="pending">Pending</option><option value="verified">Verified</option><option value="rejected">Rejected</option></select></label>
  </div>
  {#if filteredRecords.length}
    <AdminTable caption="Proof Ledger records" columns={['Record', 'Learner', 'Source', 'Subject', 'Status', 'Created', 'Verification']}>
      {#each filteredRecords as record}
        <tr><td>{record.id}</td><td>{record.learnerId}</td><td>{record.source}</td><td>{record.subject}</td><td><AdminStatusBadge label={record.status} tone={record.status === 'verified' ? 'success' : record.status === 'rejected' ? 'danger' : 'warning'} /></td><td>{record.createdAt}</td><td>{record.verifiedAt || 'Not verified'}</td></tr>
      {/each}
    </AdminTable>
  {:else}
    <AdminEmptyState title="No admin Proof Ledger endpoint is connected" detail="The typed contract supports pending, verified, and rejected records across system, lesson, Lab, workshop, cohort, and facilitator sources. Verification must be audited server-side before controls are enabled." />
  {/if}
</AdminSectionCard>
