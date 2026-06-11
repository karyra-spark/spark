<script lang="ts">
  import { adminPassportRecords } from '$lib/admin/admin-data';
  import AdminEmptyState from '$lib/admin/ui/AdminEmptyState.svelte';
  import AdminHeader from '$lib/admin/ui/AdminHeader.svelte';
  import AdminSectionCard from '$lib/admin/ui/AdminSectionCard.svelte';
  import AdminStatusBadge from '$lib/admin/ui/AdminStatusBadge.svelte';
  import AdminTable from '$lib/admin/ui/AdminTable.svelte';

  let query = $state('');
  let statusFilter = $state('all');
  const filteredRecords = $derived(adminPassportRecords.filter((record) => {
    const needle = query.trim().toLowerCase();
    return (!needle || record.learnerId.toLowerCase().includes(needle)) && (statusFilter === 'all' || record.issueStatus === statusFilter);
  }));
</script>

<svelte:head><title>Passport - Karyra Spark Admin</title></svelte:head>

<AdminHeader title="Readiness Passport" description="Review offchain Passport eligibility and evidence without claiming an onchain credential or badge.">
  {#snippet actions()}<a class="admin-button--secondary" href="/passport" target="_blank" rel="noreferrer">Preview Passport</a>{/snippet}
</AdminHeader>

<div class="admin-card-grid">
  <AdminSectionCard eyebrow="Derivation" title="How Passport status is derived" description="The current model combines readiness evidence; it is not an onchain issuance claim.">
    <ol class="admin-derivation">
      <li>Core lesson and exam evidence establishes proof of learning.</li>
      <li>Lab checkpoints and safe simulations establish proof of practice and safety.</li>
      <li>Workshop or cohort signals may add community verification.</li>
      <li>Evidence is summarized into readiness eligibility and an offchain evidence root.</li>
    </ol>
  </AdminSectionCard>
  <AdminSectionCard eyebrow="Chain boundary" title="Credential status" description="Starknet anchoring and non-transferable badge issuance remain roadmap work.">
    <div class="admin-note">No admin action on this page connects a wallet, requests a signature, submits a transaction, or performs an onchain write.</div>
  </AdminSectionCard>
</div>

<AdminSectionCard eyebrow="Protected records" title="Passport records and Evidence Trail" description="Filters are ready for the future admin collection contract.">
  <div class="admin-filter-row">
    <label>Learner ID<input bind:value={query} type="search" placeholder="Filter learner records" /></label>
    <label>Issue status<select bind:value={statusFilter}><option value="all">All statuses</option><option value="draft">Draft</option><option value="eligible">Eligible</option><option value="issued_offchain">Issued offchain</option><option value="revoked">Revoked</option></select></label>
  </div>
  {#if filteredRecords.length}
    <AdminTable caption="Passport records" columns={['Passport', 'Learner', 'Level', 'Status', 'Evidence', 'Updated']}>
      {#each filteredRecords as record}
        <tr><td>{record.id}</td><td>{record.learnerId}</td><td>{record.readinessLevel || 'Pending'}</td><td><AdminStatusBadge label={record.issueStatus} tone="info" /></td><td>{record.evidenceCount}</td><td>{record.updatedAt || 'Not tracked'}</td></tr>
      {/each}
    </AdminTable>
  {:else}
    <AdminEmptyState title="No protected Passport collection is available" detail="Connect GET /v1/admin/passports and a privacy-reviewed evidence event endpoint before cross-user Passport records appear." />
  {/if}
</AdminSectionCard>
