<script lang="ts">
  import { fly } from 'svelte/transition';
  import { appState } from '$state/app-state.svelte';
</script>

{#if appState.toast}
  <aside class={`spark-toast ${appState.toast.tone}`} transition:fly={{ y: 20, duration: 180 }}>
    <strong>{appState.toast.title}</strong>
    <p>{appState.toast.copy}</p>
    <button type="button" onclick={() => (appState.toast = null)}>×</button>
  </aside>
{/if}
