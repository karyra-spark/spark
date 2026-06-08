<script lang="ts">
  import SparkIcon from './SparkIcon.svelte';
  import { learningState, setExperience } from '$state/learning-state.svelte';

  const modes = [
    { key: 'beginner', icon: 'shield', title: 'Pemula', copy: 'Bahasa sederhana' },
    { key: 'guided', icon: 'layers', title: 'Terarah', copy: 'Lebih ringkas' },
    { key: 'explorer', icon: 'zap', title: 'Penjelajah', copy: 'Siap teknis' }
  ] as const;
</script>

<div class="spark-learning-mode-strip">
  <div>
    <span class="spark-eyebrow">Mode belajar</span>
    <strong>Rekomendasi adaptif</strong>
    <p>Mode membantu urutan dan jembatan penjelasan, bukan mengunci jalur.</p>
  </div>

  <div class="mode-strip-actions">
    {#each modes as mode}
      <button type="button" class:active={learningState.experience === mode.key} onclick={() => setExperience(mode.key)}>
        <SparkIcon name={mode.icon} size={17} />
        <span>
          <strong>{mode.title}</strong>
          <small>{mode.copy}</small>
        </span>
      </button>
    {/each}
  </div>
</div>
