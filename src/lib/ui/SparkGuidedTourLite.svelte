<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import SparkButton from './SparkButton.svelte';
  import SparkCard from './SparkCard.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import { guideSteps } from '$lib/advanced/advanced-model';
  import { pushToast } from '$state/app-state.svelte';

  let open = $state(false);
  let activeIndex = $state(0);

  const activeStep = $derived(guideSteps[activeIndex]);

  function startGuide() {
    activeIndex = 0;
    open = true;
    pushToast({
      title: 'Panduan cepat dibuka',
      copy: 'Tour ringan ini tidak memakai dependency tambahan.',
      tone: 'info'
    });
  }

  function closeGuide() {
    open = false;
  }

  function next() {
    if (activeIndex < guideSteps.length - 1) {
      activeIndex += 1;
    } else {
      closeGuide();
      pushToast({
        title: 'Panduan selesai',
        copy: 'Pengguna siap mulai dari Core atau melanjutkan Passport.',
        tone: 'success'
      });
    }
  }

  function previous() {
    activeIndex = Math.max(0, activeIndex - 1);
  }
</script>

<SparkCard class="spark-guided-tour-lite">
  <span><SparkIcon name="sparkles" size={21} /></span>
  <div>
    <span class="spark-eyebrow">Mode Pemandu</span>
    <h3>Panduan cepat untuk pengguna baru.</h3>
    <p>Tanpa dependency tambahan. Cukup untuk mengurangi kebingungan sebelum guided tour penuh dipasang nanti.</p>
  </div>
  <SparkButton onclick={startGuide} variant="secondary">Mulai Panduan</SparkButton>
</SparkCard>

{#if open}
  <button class="guide-lite-scrim" transition:fade type="button" aria-label="Tutup panduan" onclick={closeGuide}></button>

  <div class="guide-lite-panel" transition:fly={{ y: 18, duration: 180 }} role="dialog" aria-modal="true" aria-label="Panduan cepat Karyra Spark">
    <div class="guide-lite-head">
      <span class="spark-eyebrow">Langkah {activeIndex + 1}/{guideSteps.length}</span>
      <button type="button" aria-label="Tutup panduan" onclick={closeGuide}>
        <SparkIcon name="x" size={18} />
      </button>
    </div>

    <div class="guide-lite-body">
      <span class="guide-lite-icon"><SparkIcon name={activeStep.icon} size={26} /></span>
      <h2>{activeStep.title}</h2>
      <p>{activeStep.copy}</p>

      <div class="guide-lite-progress" aria-hidden="true">
        {#each guideSteps as step, index}
          <button
            type="button"
            aria-label={`Buka langkah ${index + 1}: ${step.title}`}
            class:active={index === activeIndex}
            class:done={index < activeIndex}
            onclick={() => (activeIndex = index)}
          ></button>
        {/each}
      </div>

      <div class="guide-lite-actions">
        {#if activeIndex > 0}
          <SparkButton variant="secondary" onclick={previous}>Kembali</SparkButton>
        {/if}
        <SparkButton onclick={next}>{activeIndex === guideSteps.length - 1 ? 'Selesai' : 'Lanjut'}</SparkButton>
        <SparkButton href={activeStep.href} variant="ghost">Buka Halaman</SparkButton>
      </div>
    </div>
  </div>
{/if}
