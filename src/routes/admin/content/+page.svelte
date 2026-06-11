<script lang="ts">
  import AdminHeader from '$lib/admin/ui/AdminHeader.svelte';
  import AdminSectionCard from '$lib/admin/ui/AdminSectionCard.svelte';
  import AdminStatusBadge from '$lib/admin/ui/AdminStatusBadge.svelte';
  import AdminTable from '$lib/admin/ui/AdminTable.svelte';

  let { data } = $props();
</script>

<svelte:head><title>Content and docs - Karyra Spark Admin</title></svelte:head>

<AdminHeader title="Content and documentation" description="Availability map for public-facing ecosystem documentation without adding a public content editor." />

<AdminSectionCard eyebrow="Documentation" title="Required project references" description="Repository paths are checked server-side. Missing documents are reported honestly rather than linked to placeholders.">
  <AdminTable caption="Content and documentation links" columns={['Document', 'Repository path', 'Availability', 'Public route']}>
    {#each data.docs as document}
      <tr>
        <td><strong>{document.label}</strong></td>
        <td><span class="admin-code">{document.repositoryPath}</span></td>
        <td><AdminStatusBadge label={document.exists ? 'File exists' : 'Missing'} tone={document.exists ? 'success' : 'warning'} /></td>
        <td>
          {#if document.publicHref}
            <a href={document.publicHref} target="_blank" rel="noreferrer">Open docs</a>
          {:else}
            <span class="admin-muted">No public link</span>
          {/if}
        </td>
      </tr>
    {/each}
  </AdminTable>
</AdminSectionCard>

<AdminSectionCard eyebrow="Boundary" title="Source-controlled content" description="Admin v1 is intentionally not a browser-based publishing system.">
  <div class="admin-note">Lesson and documentation changes continue through source control and normal review. A public editing surface is not part of this dashboard.</div>
</AdminSectionCard>
