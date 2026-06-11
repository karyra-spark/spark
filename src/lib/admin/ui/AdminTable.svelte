<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    columns,
    caption,
    children
  }: { columns: string[]; caption: string; children: Snippet } = $props();
</script>

<div class="admin-table-wrap">
  <table class="admin-table">
    <caption>{caption}</caption>
    <thead>
      <tr>
        {#each columns as column}
          <th scope="col">{column}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {@render children()}
    </tbody>
  </table>
</div>
