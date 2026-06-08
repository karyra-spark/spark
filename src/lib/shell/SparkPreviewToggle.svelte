<script lang="ts">
  import { appState, setPreviewMode } from '$lib/state/app-state.svelte';
  import { setThemePreference, themeState } from '$lib/state/theme-state.svelte';

  const modes = [
    { key: 'auto', label: 'Auto' },
    { key: 'desktop', label: 'Desktop' },
    { key: 'mobile', label: 'Mobile' }
  ] as const;

  const themes = [
    { key: 'system', label: 'System' },
    { key: 'light', label: 'Light' },
    { key: 'dark', label: 'Dark' }
  ] as const;
</script>

<div class="spark-preview-toggle" aria-label="Mode tampilan">
  {#each modes as mode}
    <button type="button" class:active={appState.previewMode === mode.key} onclick={() => setPreviewMode(mode.key)}>
      <span>{mode.label}</span>
    </button>
  {/each}
</div>

<div class="spark-theme-toggle" aria-label="Tema tampilan">
  {#each themes as theme}
    <button type="button" class:active={themeState.preference === theme.key} onclick={() => setThemePreference(theme.key)}>
      <span>{theme.label}</span>
    </button>
  {/each}
</div>
