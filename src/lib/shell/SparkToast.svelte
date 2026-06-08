<script lang="ts">
  import { fly, scale } from 'svelte/transition';
  import SparkIcon from '$ui/SparkIcon.svelte';
  import { appState } from '$state/app-state.svelte';

  const toastIcon = $derived(
    appState.toast?.tone === 'success'
      ? 'check'
      : appState.toast?.tone === 'warning'
        ? 'shield'
        : appState.toast?.tone === 'error'
          ? 'x'
          : 'sparkles'
  );
</script>

{#if appState.toast}
  <aside
    class={`spark-toast ${appState.toast.tone}`}
    role="status"
    aria-live="polite"
    transition:fly={{ y: 18, duration: 180 }}
  >
    <span class="spark-toast-icon" transition:scale={{ duration: 140 }}>
      <SparkIcon name={toastIcon} size={18} />
    </span>

    <div class="spark-toast-copy">
      <strong>{appState.toast.title}</strong>
      <p>{appState.toast.copy}</p>
    </div>

    <button type="button" aria-label="Tutup pesan" onclick={() => (appState.toast = null)}>
      <SparkIcon name="x" size={16} />
    </button>
  </aside>
{/if}
