<script lang="ts">
  import { onMount } from 'svelte';
  import SparkButton from '$ui/SparkButton.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
  import SparkLevelExamCard from '$ui/SparkLevelExamCard.svelte';
  import SparkTrustBadge from '$ui/SparkTrustBadge.svelte';
  import { sparkLabs } from '$content/spark-content';
  import { completeLab, learningState } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';
  import { getExam, labLevelExams, sparkLevelDefinitions } from '$lib/leveling/leveling-model';
  import {
    getExamResult,
    getHighestPassedLevel,
    getTrackLevelStatus,
    levelingState,
    restoreLevelingSnapshot,
    setSelectedLevel
  } from '$lib/leveling/leveling-state.svelte';
  import type { SparkLevel } from '$lib/leveling/leveling-types';

  const selectedLevel = $derived(levelingState.selectedLabLevel);
  const selectedDefinition = $derived(sparkLevelDefinitions.find((level) => level.id === selectedLevel) ?? sparkLevelDefinitions[0]);
  const selectedExam = $derived(getExam('lab', selectedLevel) ?? labLevelExams[0]);
  const highestPassed = $derived(getHighestPassedLevel('lab'));
  const completedLabs = $derived(learningState.completedLabIds.length);

  function labsFor(level: SparkLevel) {
    const definition = sparkLevelDefinitions.find((item) => item.id === level) ?? sparkLevelDefinitions[0];
    return sparkLabs.filter((lab) => definition.labIds.includes(lab.id));
  }

  function completedForLevel(level: SparkLevel) {
    return labsFor(level).filter((lab) => learningState.completedLabIds.includes(lab.id)).length;
  }

  function progressForLevel(level: SparkLevel) {
    const labs = labsFor(level);
    if (!labs.length) return 0;
    return Math.round((completedForLevel(level) / labs.length) * 100);
  }

  function isLevelComplete(level: SparkLevel) {
    const labs = labsFor(level);
    return labs.length > 0 && completedForLevel(level) >= labs.length;
  }

  function remainingForLevel(level: SparkLevel) {
    return Math.max(0, labsFor(level).length - completedForLevel(level));
  }

  function firstLabActionFor(level: SparkLevel) {
    return labsFor(level)[0]?.action ?? 'Mulai Simulasi Aman';
  }

  function openLevel(level: SparkLevel) {
    if (getTrackLevelStatus('lab', level) === 'locked') return;
    setSelectedLevel('lab', level);
  }

  function markLabDone(id: string, title: string) {
    completeLab(id);
    pushToast({ title: 'Latihan selesai', copy: `${title} tercatat sebagai praktik amanmu.`, tone: 'success' });
  }

  onMount(() => {
    restoreLevelingSnapshot();
  });
</script>

<section class="lab-leveling-page spark-section" data-karyra-lab-leveling="pass42">
  <div class="lab-leveling-hero">
    <div class="lab-leveling-copy">
      <div class="leveling-kicker">
        <SparkTrustBadge label="Lab Praktik" tone="safe" />
        <span>{completedLabs}/{sparkLabs.length} latihan selesai</span>
      </div>
      <h1>Latihan aman dengan level yang jelas.</h1>
      <p>
        Mulai dari simulasi sederhana, kenali risiko, lalu buka ujian saat latihan level sudah selesai. Lab membantumu praktik tanpa aset nyata dan tanpa tekanan transaksi.
      </p>
      <div class="leveling-actions">
        <SparkButton href="#lab-selected-title">Mulai Simulasi Aman</SparkButton>
        <a href="/community?tab=diskusi">Tanya ke Komunitas</a>
      </div>
    </div>

    <aside class="lab-sandbox-card">
      <span><SparkIcon name="flask" size={22} /></span>
      <div>
        <small>Ruang latihanmu</small>
        <strong>{highestPassed ? `Lab ${highestPassed}` : 'Mulai Beginner'}</strong>
        <p>Hasil latihan dan ujian Lab nanti menjadi dasar Passport Spark.</p>
      </div>
    </aside>
  </div>

  <section class="lab-level-section" aria-labelledby="lab-level-map-title">
    <div class="level-section-head">
      <span class="spark-eyebrow">Level Lab</span>
      <h2 id="lab-level-map-title">Praktik dibuka sesuai kesiapan.</h2>
      <p>Setiap level punya latihan, checklist, dan ujian akhir sebelum lanjut ke tahap berikutnya.</p>
    </div>

    <div class="level-card-grid">
      {#each sparkLevelDefinitions as level}
        {@const status = getTrackLevelStatus('lab', level.id)}
        {@const progress = progressForLevel(level.id)}
        <button type="button" class={`level-map-card ${level.tone}`} class:active={selectedLevel === level.id} disabled={status === 'locked'} onclick={() => openLevel(level.id)}>
          <div class="level-map-top">
            <span><SparkIcon name={level.id === 'beginner' ? 'shield' : level.id === 'intermediate' ? 'wallet' : 'compass'} size={18} /></span>
            <SparkTrustBadge label={status === 'passed' ? 'Lulus' : status === 'locked' ? 'Terkunci' : 'Terbuka'} tone={status === 'passed' ? 'safe' : status === 'locked' ? 'target' : 'beta'} />
          </div>
          <strong>{level.label}</strong>
          <small>{level.id === 'beginner' ? 'Latihan red flag, seed phrase, dan keputusan aman.' : level.id === 'intermediate' ? 'Latihan signature, transaksi, dan explorer.' : 'Latihan testnet, Starknet, dan sandbox teknis bertahap.'}</small>
          <div class="level-mini-progress"><b style={`width: ${Math.max(4, progress)}%`}></b></div>
          <em>{completedForLevel(level.id)}/{labsFor(level.id).length} latihan</em>
        </button>
      {/each}
    </div>
  </section>

  <section class="lab-level-section selected-lab-section" aria-labelledby="lab-selected-title">
    <div class="selected-level-card">
      <div>
        <span class="spark-eyebrow">Level dipilih</span>
        <h2 id="lab-selected-title">Lab {selectedDefinition.label}: {selectedDefinition.title}</h2>
        <p>{selectedDefinition.copy}</p>
      </div>
      <SparkTrustBadge label={getTrackLevelStatus('lab', selectedLevel) === 'locked' ? 'Selesaikan level sebelumnya' : 'Siap dilatih'} tone={getTrackLevelStatus('lab', selectedLevel) === 'locked' ? 'target' : 'safe'} />
    </div>

    <div class="lab-practice-grid">
      {#each labsFor(selectedLevel) as lab}
        {@const done = learningState.completedLabIds.includes(lab.id)}
        {@const locked = getTrackLevelStatus('lab', selectedLevel) === 'locked'}
        <article class="lab-practice-card" class:done class:locked>
          <div class="lab-practice-top">
            <span><SparkIcon name={selectedLevel === 'advanced' ? 'code' : selectedLevel === 'intermediate' ? 'wallet' : 'shield'} size={18} /></span>
            <SparkTrustBadge label={done ? 'Selesai' : locked ? 'Terkunci' : 'Latihan'} tone={done ? 'safe' : locked ? 'target' : 'beta'} />
          </div>
          <h3>{lab.title}</h3>
          <p>{lab.summary}</p>
          <div class="lab-step-list">
            {#each lab.steps as step, stepIndex}
              <div><span>{stepIndex + 1}</span><small>{step}</small></div>
            {/each}
          </div>
          <SparkButton onclick={() => markLabDone(lab.id, lab.title)} disabled={done || locked}>
            {done ? 'Latihan selesai' : locked ? 'Terkunci' : lab.action.replace('Simulasi', 'latihan')}
          </SparkButton>
        </article>
      {/each}
    </div>
  </section>

  <section class="lab-level-section" id="lab-level-exam" aria-labelledby="lab-exam-title">
    <div class="level-section-head compact">
      <span class="spark-eyebrow">Ujian akhir Lab</span>
      <h2 id="lab-exam-title">Buktikan kemampuan praktik sebelum naik level.</h2>
      <p>Ujian terbuka setelah latihan level ini selesai. Kamu bisa mengulang latihan sebelum menjawab soal.</p>
    </div>
    {#if selectedExam}
      {#if getTrackLevelStatus('lab', selectedLevel) === 'locked'}
        <article class="level-exam-gate locked" aria-live="polite">
          <span><SparkIcon name="lock" size={20} /></span>
          <div>
            <h3>Ujian Lab ini belum terbuka.</h3>
            <p>Selesaikan dan luluskan level sebelumnya dulu, lalu kembali untuk membuka ujian ini.</p>
          </div>
          <SparkButton href="#lab-selected-title" variant="secondary">Lihat Latihan</SparkButton>
        </article>
      {:else if !isLevelComplete(selectedLevel) && !getExamResult(selectedExam.id)?.passed}
        <article class="level-exam-gate" aria-live="polite">
          <span><SparkIcon name="flask" size={20} /></span>
          <div>
            <h3>Selesaikan latihan dulu untuk membuka ujian.</h3>
            <p>Masih ada <strong>{remainingForLevel(selectedLevel)} latihan</strong> di level ini. Mulai dari: {firstLabActionFor(selectedLevel)}.</p>
          </div>
          <SparkButton href="#lab-selected-title" variant="secondary">Lanjutkan Latihan</SparkButton>
        </article>
      {:else}
        <SparkLevelExamCard exam={selectedExam} />
      {/if}
    {/if}
  </section>
</section>

<style>
  .lab-leveling-page,
  .lab-level-section,
  .lab-leveling-copy,
  .level-section-head,
  .selected-lab-section,
  .lab-practice-card {
    display: grid;
    gap: 14px;
  }

  .lab-leveling-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(240px, 0.34fr);
    gap: 14px;
    padding: clamp(18px, 4vw, 32px);
    border: 1px solid var(--spark-line);
    border-radius: 30px;
    background:
      radial-gradient(circle at 10% 8%, rgba(27, 164, 122, 0.11), transparent 34%),
      radial-gradient(circle at 94% 16%, rgba(31, 117, 255, 0.1), transparent 30%),
      var(--spark-card);
    box-shadow: 0 16px 44px rgba(5, 9, 78, 0.08);
  }

  .leveling-kicker,
  .leveling-actions,
  .level-map-top,
  .selected-level-card,
  .lab-practice-top {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }

  .leveling-kicker > span:not(.spark-trust-badge) {
    color: var(--spark-muted);
    font-size: 11.5px;
    font-weight: 760;
  }

  .lab-leveling-copy h1,
  .level-section-head h2,
  .selected-level-card h2,
  .lab-practice-card h3 {
    margin: 0;
    color: var(--spark-navy);
    letter-spacing: -0.045em;
  }

  .lab-leveling-copy h1 {
    max-width: 760px;
    font-size: clamp(30px, 5vw, 54px);
    line-height: 1.03;
  }

  .lab-leveling-copy p,
  .level-section-head p,
  .selected-level-card p,
  .lab-practice-card p,
  .lab-sandbox-card p {
    margin: 0;
    color: var(--spark-muted);
    line-height: 1.58;
  }

  .leveling-actions a {
    min-height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
    border: 1px solid var(--spark-line);
    border-radius: 999px;
    color: var(--spark-blue-strong);
    background: rgba(255, 255, 255, 0.56);
    font-size: 13px;
    font-weight: 780;
  }

  .lab-sandbox-card,
  .selected-level-card,
  .level-map-card,
  .lab-practice-card {
    border: 1px solid var(--spark-line);
    background: var(--spark-card);
    box-shadow: 0 10px 28px rgba(5, 9, 78, 0.06);
  }

  .lab-sandbox-card {
    display: grid;
    gap: 12px;
    align-content: start;
    padding: 18px;
    border-radius: 24px;
  }

  .lab-sandbox-card > span,
  .level-map-top > span,
  .lab-practice-top > span {
    display: inline-grid;
    place-items: center;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, 0.1);
  }

  .lab-sandbox-card > span {
    width: 42px;
    height: 42px;
    border-radius: 16px;
  }

  .lab-sandbox-card small,
  .level-map-card em {
    color: var(--spark-muted);
    font-size: 12px;
    font-weight: 760;
  }

  .lab-sandbox-card strong {
    display: block;
    color: var(--spark-navy);
    font-size: 24px;
    letter-spacing: -0.04em;
  }

  .level-card-grid,
  .lab-practice-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  .level-map-card,
  .lab-practice-card {
    min-height: 210px;
    align-content: start;
    padding: 16px;
    border-radius: 24px;
    text-align: left;
  }

  .level-map-card:disabled,
  .lab-practice-card.locked {
    cursor: not-allowed;
    opacity: 0.66;
  }

  .level-map-card.active {
    outline: 2px solid rgba(31, 117, 255, 0.34);
  }

  .level-map-top,
  .lab-practice-top {
    justify-content: space-between;
  }

  .level-map-top > span,
  .lab-practice-top > span {
    width: 38px;
    height: 38px;
    border-radius: 14px;
  }

  .level-map-card strong,
  .lab-practice-card h3 {
    color: var(--spark-navy);
    font-size: 18px;
  }

  .level-map-card small,
  .lab-practice-card p {
    color: var(--spark-muted);
    line-height: 1.5;
  }

  .level-mini-progress {
    height: 7px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(31, 117, 255, 0.1);
  }

  .level-mini-progress b {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--spark-blue), var(--spark-orange));
  }

  .selected-level-card {
    justify-content: space-between;
    padding: 18px;
    border-radius: 24px;
  }

  .lab-step-list {
    display: grid;
    gap: 8px;
  }

  .lab-step-list div {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .lab-step-list span {
    width: 24px;
    height: 24px;
    display: inline-grid;
    place-items: center;
    flex: 0 0 auto;
    border-radius: 999px;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, 0.09);
    font-size: 11px;
    font-weight: 850;
  }

  .lab-step-list small {
    color: var(--spark-muted);
    line-height: 1.4;
  }

  @media (max-width: 860px) {
    .lab-leveling-hero,
    .level-card-grid,
    .lab-practice-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 680px) {
    .selected-level-card {
      display: grid;
    }
  }
</style>
