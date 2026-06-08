<script lang="ts">
  import SparkIcon from './SparkIcon.svelte';
  import { setThemePreference, themeState, type ThemePreference } from '$state/theme-state.svelte';

  type Props = {
    compact?: boolean;
  };

  let { compact = false }: Props = $props();

  const label = $derived(
    themeState.preference === 'system'
      ? 'Ikuti perangkat'
      : themeState.preference === 'dark'
        ? 'Mode gelap'
        : 'Mode terang'
  );
  const icon = $derived(themeState.resolved === 'dark' ? 'moon' : 'sun');

  function nextTheme() {
    const next: Record<ThemePreference, ThemePreference> = {
      system: 'light',
      light: 'dark',
      dark: 'system'
    };

    setThemePreference(next[themeState.preference]);
  }
</script>

<button
  class={`spark-theme-toggle ${compact ? 'compact' : ''}`}
  type="button"
  aria-label={`Ganti tema. Sekarang: ${label}`}
  title={`Tema: ${label}`}
  onclick={nextTheme}
>
  <SparkIcon name={icon} size={compact ? 16 : 17} />
  {#if !compact}<span>{label}</span>{/if}
</button>
