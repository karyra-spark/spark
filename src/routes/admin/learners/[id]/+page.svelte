<script lang="ts">
  import { page } from '$app/state';
  import AdminEmptyState from '$lib/admin/ui/AdminEmptyState.svelte';
  import AdminHeader from '$lib/admin/ui/AdminHeader.svelte';
  import AdminSectionCard from '$lib/admin/ui/AdminSectionCard.svelte';
</script>

<svelte:head><title>Learner detail - Karyra Spark Admin</title></svelte:head>

<AdminHeader title="Learner detail" description={'Protected detail request for learner ID ' + page.params.id + '.'}>
  {#snippet actions()}<a class="admin-button--secondary" href="/admin/learners">Back to learners</a>{/snippet}
</AdminHeader>

<AdminSectionCard eyebrow="API contract" title="Progress, Passport, and evidence" description="This page is intentionally fail-closed until a protected learner-detail endpoint exists.">
  <AdminEmptyState
    state="locked"
    title="Learner detail is not connected"
    detail="The future response may include lesson progress, Lab progress, Passport status, and a privacy-reviewed evidence trail. Authentication secrets and sensitive profile fields must never be included."
  />
</AdminSectionCard>
