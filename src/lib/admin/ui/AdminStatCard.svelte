<script lang="ts">
  import AdminStatusBadge from './AdminStatusBadge.svelte';
  import type { AdminAvailability } from '$lib/admin/admin-types';

  let {
    label,
    value,
    detail,
    state = 'available'
  }: { label: string; value: number | string; detail: string; state?: AdminAvailability } = $props();

  const tone = $derived(state === 'available' ? 'success' : state === 'error' ? 'danger' : state === 'placeholder' ? 'info' : 'neutral');
  const stateLabel = $derived(state === 'available' ? 'Live' : state === 'error' ? 'Error' : state === 'placeholder' ? 'Planned' : 'Unavailable');
</script>

<article class="admin-stat-card">
  <div class="admin-stat-card__top">
    <span>{label}</span>
    <AdminStatusBadge label={stateLabel} {tone} />
  </div>
  <strong>{value}</strong>
  <p>{detail}</p>
</article>
