<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import { setExperience } from '$state/learning-state.svelte';

  type Props = {
    title?: string;
    copy: string;
  };

  let { title = 'Masuk mode teknis?', copy }: Props = $props();
  let dismissed = $state(false);
</script>

{#if !dismissed}
  <aside class="spark-bridge">
    <div>
      <strong>{title}</strong>
      <p>{copy}</p>
    </div>
    <div class="spark-bridge-actions">
      <SparkButton variant="secondary" onclick={() => (dismissed = true)}>Tetap di sini</SparkButton>
      <SparkButton onclick={() => { setExperience('explorer'); dismissed = true; }}>Lanjut Mode Penjelajah</SparkButton>
    </div>
  </aside>
{/if}
