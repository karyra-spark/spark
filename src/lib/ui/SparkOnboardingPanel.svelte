<script lang="ts">
  import SparkButton from './SparkButton.svelte';
  import { completeOnboarding, learningState, resetOnboarding, setExperience } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  const modes = [
    {
      key: 'beginner',
      title: 'Baru mulai',
      copy: 'Bahasa sederhana, contoh lokal, glossary, dan jembatan sebelum praktik.'
    },
    {
      key: 'guided',
      title: 'Sudah ada dasar',
      copy: 'Jalur lebih ringkas, tetap dengan checklist keamanan.'
    },
    {
      key: 'explorer',
      title: 'Siap teknis',
      copy: 'Starknet, testnet, Cairo, dan bagian teknis dengan peringatan.'
    }
  ] as const;

  function choose(mode: (typeof modes)[number]) {
    setExperience(mode.key);
    completeOnboarding();
    pushToast({
      title: 'Mode belajar disimpan',
      copy: `${mode.title} dipakai sebagai estimasi awal. Kamu tetap bisa mengubahnya nanti.`,
      tone: 'success'
    });
  }

  const selectedLabel = $derived(
    learningState.experience === 'beginner'
      ? 'Baru mulai'
      : learningState.experience === 'guided'
        ? 'Sudah ada dasar'
        : learningState.experience === 'explorer'
          ? 'Siap teknis'
          : 'Belum dipilih'
  );
</script>

<section class:complete={learningState.onboardingComplete} class="spark-onboarding">
  {#if learningState.onboardingComplete}
    <div class="onboarding-complete-row">
      <div>
        <span class="spark-eyebrow">Mode belajar</span>
        <strong>{selectedLabel}</strong>
        <p>Mode ini membantu rekomendasi Spark, bukan mengunci jalur belajar.</p>
      </div>
      <SparkButton variant="ghost" onclick={resetOnboarding}>Ubah</SparkButton>
    </div>
  {:else}
    <div class="onboarding-intro">
      <div>
        <span class="spark-eyebrow">Mulai dari level yang nyaman</span>
        <h2>Seberapa familiar kamu dengan blockchain?</h2>
        <p>Pilih estimasi awal. Spark tetap memakai satu jalur utama dan menyesuaikan rekomendasi dari progress.</p>
      </div>
      <SparkButton variant="ghost" onclick={() => { completeOnboarding(); pushToast({ title: 'Onboarding dilewati', copy: 'Spark akan memulai dari Fondasi Blockchain.', tone: 'info' }); }}>
        Lewati
      </SparkButton>
    </div>

    <div class="spark-onboarding-grid">
      {#each modes as mode}
        <button type="button" onclick={() => choose(mode)}>
          <strong>{mode.title}</strong>
          <small>{mode.copy}</small>
        </button>
      {/each}
    </div>
  {/if}
</section>
