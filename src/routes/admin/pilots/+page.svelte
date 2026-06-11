<script lang="ts">
  import { adminPilotSessions } from '$lib/admin/admin-data';
  import AdminEmptyState from '$lib/admin/ui/AdminEmptyState.svelte';
  import AdminHeader from '$lib/admin/ui/AdminHeader.svelte';
  import AdminSectionCard from '$lib/admin/ui/AdminSectionCard.svelte';
  import AdminStatusBadge from '$lib/admin/ui/AdminStatusBadge.svelte';
  import AdminTable from '$lib/admin/ui/AdminTable.svelte';
</script>

<svelte:head><title>Community pilot - Karyra Spark Admin</title></svelte:head>

<AdminHeader title="Community pilot" description="Private operational tracking for Seed Grant and local pilot cohorts, not a public social feed." />

<div class="admin-card-grid">
  <AdminSectionCard eyebrow="Cohort overview" title="Pilot participation" description="Existing workshop definitions are shown as session templates. Participant aggregates are not treated as production data.">
    <div class="admin-status-card">
      <div class="admin-status-card__top"><strong>Participant count</strong><AdminStatusBadge label="Unavailable" tone="neutral" /></div>
      <p>A protected pilot participant endpoint is required before a count is displayed.</p>
    </div>
  </AdminSectionCard>
  <AdminSectionCard eyebrow="Evidence safety" title="Anonymized evidence reminder" description="Pilot notes should prove participation without publishing unnecessary personal details.">
    <div class="admin-note">Use participant references or aggregate outcomes. Do not store seed phrases, private keys, wallet secrets, government IDs, or raw sensitive feedback in evidence records.</div>
  </AdminSectionCard>
</div>

<AdminSectionCard eyebrow="Sessions" title="Pilot session templates" description="Schedules and capacity come from the current public workshop definitions; activity counts remain unavailable.">
  <AdminTable caption="Community pilot session templates" columns={['Session', 'Format', 'Schedule', 'Capacity', 'Participants', 'Status']}>
    {#each adminPilotSessions as session}
      <tr>
        <td><strong>{session.title}</strong><br /><span class="admin-code">{session.id}</span></td>
        <td>{session.format}</td>
        <td>{session.schedule}</td>
        <td>{session.capacity ?? 'Not set'}</td>
        <td>{session.participantCount ?? 'Unavailable'}</td>
        <td><AdminStatusBadge label={session.status} tone="info" /></td>
      </tr>
    {/each}
  </AdminTable>
</AdminSectionCard>

<AdminSectionCard eyebrow="Feedback" title="Facilitator notes and feedback" description="Future notes must have retention, consent, and access-control rules.">
  <AdminEmptyState title="No pilot notes contract is implemented" detail="Add protected cohort/session endpoints with anonymization guidance and audit logging before notes are stored here." />
</AdminSectionCard>
