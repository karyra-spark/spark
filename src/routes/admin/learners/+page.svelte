<script lang="ts">
  import { adminLearners } from '$lib/admin/admin-data';
  import AdminEmptyState from '$lib/admin/ui/AdminEmptyState.svelte';
  import AdminHeader from '$lib/admin/ui/AdminHeader.svelte';
  import AdminSectionCard from '$lib/admin/ui/AdminSectionCard.svelte';
  import AdminStatusBadge from '$lib/admin/ui/AdminStatusBadge.svelte';
  import AdminTable from '$lib/admin/ui/AdminTable.svelte';

  let query = $state('');
  let statusFilter = $state('all');

  const filteredLearners = $derived(
    adminLearners.filter((learner) => {
      const needle = query.trim().toLowerCase();
      const matchesQuery = !needle || [learner.id, learner.name, learner.email]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(needle));
      const matchesStatus = statusFilter === 'all' || learner.status === statusFilter;
      return matchesQuery && matchesStatus;
    })
  );
</script>

<svelte:head><title>Learners - Karyra Spark Admin</title></svelte:head>

<AdminHeader
  title="Learners and users"
  description="Search learner identity and readiness records without exposing private profile data or authentication details."
/>

<AdminSectionCard eyebrow="Protected data" title="Learner directory" description="Requires a server-authorized admin collection endpoint. Browser-local learner sessions are not enumerated.">
  <div class="admin-filter-row">
    <label>
      Search name, email, or ID
      <input bind:value={query} type="search" placeholder="Search protected records" />
    </label>
    <label>
      Status
      <select bind:value={statusFilter}>
        <option value="all">All statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="unknown">Unknown</option>
      </select>
    </label>
  </div>

  {#if filteredLearners.length}
    <AdminTable caption="Learner directory" columns={['Learner', 'Status', 'Lessons', 'Labs', 'Passport', 'Evidence', 'Action']}>
      {#each filteredLearners as learner}
        <tr>
          <td><strong>{learner.name || 'Name withheld'}</strong><br /><span class="admin-muted">{learner.email || learner.id}</span></td>
          <td><AdminStatusBadge label={learner.status} tone={learner.status === 'active' ? 'success' : 'neutral'} /></td>
          <td>{learner.lessonCompletionCount}</td>
          <td>{learner.labCompletionCount}</td>
          <td>{learner.passportStatus || 'Not issued'}</td>
          <td>{learner.evidenceCount}</td>
          <td><a href={'/admin/learners/' + learner.id}>View</a></td>
        </tr>
      {/each}
    </AdminTable>
  {:else}
    <AdminEmptyState
      title="No learner collection is available"
      detail="Implement GET /v1/admin/learners with production RBAC, field-level privacy rules, pagination, and audit logging before records are displayed here."
    />
  {/if}
</AdminSectionCard>
