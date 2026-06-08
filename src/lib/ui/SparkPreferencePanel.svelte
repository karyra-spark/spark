<script lang="ts">
  import SparkPreviewToggle from '$shell/SparkPreviewToggle.svelte';
  import SparkButton from './SparkButton.svelte';
  import { learningState, resetOnboarding, setExperience } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  const modes = [
    { key: 'beginner', label: 'Baru mulai' },
    { key: 'guided', label: 'Sudah ada dasar' },
    { key: 'explorer', label: 'Siap teknis' }
  ] as const;

  function resetLocalData() {
    if (typeof window === 'undefined') return;

    const confirmed = window.confirm('Reset data belajar lokal di perangkat ini?');
    if (!confirmed) return;

    window.localStorage.removeItem('karyra-spark-learning-state-v3');
    window.localStorage.removeItem('karyra-spark-gateway-state-v1');

    pushToast({
      title: 'Catatan perangkat direset',
      copy: 'Halaman akan dimuat ulang agar state kembali bersih.',
      tone: 'warning'
    });

    window.setTimeout(() => window.location.reload(), 500);
  }
</script>

<div class="spark-preference-panel">
  <section class="preference-card main">
    <span class="spark-eyebrow">Tampilan</span>
    <h2>Mode tampilan dan tema.</h2>
    <p>Gunakan ini untuk mencoba Spark di desktop/mobile dan memilih tema light, dark, atau system.</p>
    <SparkPreviewToggle />
  </section>

  <section class="preference-card">
    <span class="spark-eyebrow">Mode belajar</span>
    <h2>Preferensi belajar.</h2>
    <p>Mode ini hanya membantu rekomendasi. Jalur utama Spark tetap sama.</p>

    <div class="preference-chip-row">
      {#each modes as mode}
        <button type="button" class:active={learningState.experience === mode.key} onclick={() => setExperience(mode.key)}>
          {mode.label}
        </button>
      {/each}
    </div>

    <SparkButton variant="ghost" onclick={resetOnboarding}>Tampilkan onboarding lagi</SparkButton>
  </section>

  <section class="preference-card danger">
    <span class="spark-eyebrow">Catatan perangkat</span>
    <h2>Reset perangkat ini.</h2>
    <p>Untuk preview ulang dari awal, silakan menghapus progress lokal di browser/perangkat ini.</p>
    <SparkButton variant="secondary" onclick={resetLocalData}>Reset data lokal</SparkButton>
  </section>
</div>
