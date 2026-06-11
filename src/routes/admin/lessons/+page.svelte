<script lang="ts">
  import { adminLessons } from '$lib/admin/admin-data';
  import AdminHeader from '$lib/admin/ui/AdminHeader.svelte';
  import AdminSectionCard from '$lib/admin/ui/AdminSectionCard.svelte';
  import AdminStatusBadge from '$lib/admin/ui/AdminStatusBadge.svelte';
  import AdminTable from '$lib/admin/ui/AdminTable.svelte';

  let query = $state('');
  let statusFilter = $state('all');
  const filteredLessons = $derived(adminLessons.filter((lesson) => {
    const needle = query.trim().toLowerCase();
    const matchesQuery = !needle || [lesson.title, lesson.slug, lesson.moduleTitle].some((value) => value.toLowerCase().includes(needle));
    return matchesQuery && (statusFilter === 'all' || lesson.status === statusFilter);
  }));
</script>

<svelte:head><title>Core lessons - Karyra Spark Admin</title></svelte:head>

<AdminHeader title="Core lessons" description="Read-only management view over the lesson definitions that currently power public lesson routes.">
  {#snippet actions()}<a class="admin-button--secondary" href="/core" target="_blank" rel="noreferrer">Preview Core</a>{/snippet}
</AdminHeader>

<AdminSectionCard eyebrow="Published content" title="Lesson inventory" description="Metadata editing is disabled in v1 because lesson content is source-controlled and no audited content write model exists.">
  <div class="admin-filter-row">
    <label>Search title, slug, or module<input bind:value={query} type="search" placeholder="Search lessons" /></label>
    <label>Publication status<select bind:value={statusFilter}><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Draft</option></select></label>
  </div>
  <AdminTable caption="Core lesson inventory" columns={['Lesson', 'Module', 'Status', 'Duration', 'Updated', 'Preview']}>
    {#each filteredLessons as lesson}
      <tr>
        <td><strong>{lesson.title}</strong><br /><span class="admin-code">{lesson.slug}</span></td>
        <td>{lesson.moduleTitle}</td>
        <td><AdminStatusBadge label={lesson.status} tone={lesson.status === 'published' ? 'success' : 'warning'} /></td>
        <td>{lesson.estimatedMinutes} min</td>
        <td>{lesson.updatedAt || 'Not tracked'}</td>
        <td><a href={lesson.previewHref} target="_blank" rel="noreferrer">Open lesson</a></td>
      </tr>
    {/each}
  </AdminTable>
</AdminSectionCard>
