<script lang="ts">
  import { onMount } from 'svelte';
  import SparkButton from './SparkButton.svelte';
  import SparkIcon from './SparkIcon.svelte';
  import SparkPassportBadge from './SparkPassportBadge.svelte';
  import SparkPassportGauge from './SparkPassportGauge.svelte';
  import SparkTrustBadge from './SparkTrustBadge.svelte';
  import { betaSession } from '$state/beta-session-state.svelte';
  import { gatewayState } from '$state/gateway-state.svelte';
  import {
    getCompletedLessonCount,
    getLearningProgressPercent,
    getReadinessScore,
    getTotalLessonCount,
    learningState
  } from '$state/learning-state.svelte';
  import { profileState, restoreProfileState } from '$state/profile-state.svelte';
  import { LEVEL_ORDER } from '$lib/leveling/leveling-model';
  import {
    getReadinessLevelFromExams,
    hasPassedExam,
    levelingState,
    restoreLevelingSnapshot
  } from '$lib/leveling/leveling-state.svelte';
  import {
    createPassportEvidenceBundle,
    createPassportProofPreview,
    getNextPassportStep,
    getPassportEligibility,
    getPassportLevelLabel,
    getPassportLevelTitle,
    getVerificationTier
  } from '$lib/passport/passport-proof-model';
  import { getPassportProofSignals } from '$lib/proof/proof-signals-model';

  onMount(() => {
    restoreProfileState();
    restoreLevelingSnapshot();
  });

  const displayName = $derived(profileState.displayName || betaSession.user?.name || 'Pengguna Spark');
  const handle = $derived(profileState.handle || betaSession.user?.handle || '@spark-learner');
  const holderRef = $derived(betaSession.user?.id ?? 'local-holder');
  const readiness = $derived(getReadinessScore());
  const learningProgress = $derived(getLearningProgressPercent());
  const completedLessons = $derived(getCompletedLessonCount());
  const totalLessons = $derived(getTotalLessonCount());
  const completedLabs = $derived(learningState.completedLabIds.length);
  const registeredWorkshops = $derived(gatewayState.registeredWorkshopIds.length);
  const savedResources = $derived(gatewayState.savedHubResourceIds.length);

  const coreExamResults = $derived(Object.values(levelingState.results).filter((result) => result.track === 'core'));
  const labExamResults = $derived(Object.values(levelingState.results).filter((result) => result.track === 'lab'));
  const readinessLevel = $derived(getReadinessLevelFromExams());
  const verificationTier = $derived(getVerificationTier(registeredWorkshops));
  const eligibility = $derived(getPassportEligibility({ readinessLevel, verificationTier }));
  const nextStep = $derived(
    getNextPassportStep({
      coreBeginnerPassed: hasPassedExam('core', 'beginner'),
      labBeginnerPassed: hasPassedExam('lab', 'beginner'),
      readinessLevel
    })
  );

  const evidenceBundle = $derived(
    createPassportEvidenceBundle({
      holderRef,
      holderDisplay: displayName,
      handle,
      readinessLevel,
      verificationTier,
      issueStatus: eligibility.issueStatus,
      coreExamResults,
      labExamResults,
      completedLessons,
      totalLessons,
      registeredWorkshops,
      savedResources
    })
  );

  const proofPreview = $derived(createPassportProofPreview(evidenceBundle));

  const levelRows = $derived(
    LEVEL_ORDER.map((level) => ({
      level,
      label: getPassportLevelLabel(level),
      title: getPassportLevelTitle(level),
      corePassed: hasPassedExam('core', level),
      labPassed: hasPassedExam('lab', level),
      passed: hasPassedExam('core', level) && hasPassedExam('lab', level)
    }))
  );

  const evidenceCards = $derived([
    {
      label: 'Core',
      value: `${coreExamResults.filter((item) => item.passed).length}/3`,
      copy: 'Ujian pemahaman lulus',
      icon: 'book-check',
      href: '/core',
      progress: Math.round((coreExamResults.filter((item) => item.passed).length / 3) * 100)
    },
    {
      label: 'Lab',
      value: `${labExamResults.filter((item) => item.passed).length}/3`,
      copy: 'Ujian praktik lulus',
      icon: 'flask-conical',
      href: '/lab',
      progress: Math.round((labExamResults.filter((item) => item.passed).length / 3) * 100)
    },
    {
      label: 'Komunitas',
      value: `${registeredWorkshops}`,
      copy: 'Sinyal partisipasi',
      icon: 'users',
      href: '/community',
      progress: registeredWorkshops > 0 ? 100 : 0
    },
    {
      label: 'Hub',
      value: `${savedResources}`,
      copy: 'Rujukan tersimpan',
      icon: 'compass',
      href: '/hub',
      progress: savedResources > 0 ? 100 : readiness >= 75 ? 50 : 0
    }
  ]);

  const proofSignalCards = $derived(getPassportProofSignals(evidenceBundle));
  const explainabilitySteps = $derived([
    {
      title: 'Core Beginner',
      done: hasPassedExam('core', 'beginner'),
      copy: hasPassedExam('core', 'beginner')
        ? 'Pemahaman dasar sudah tercatat dari Core Beginner.'
        : 'Selesaikan lesson dan ujian Core Beginner agar Passport punya dasar pemahaman yang jelas.',
      href: '/core',
      cta: hasPassedExam('core', 'beginner') ? 'Lihat Core' : 'Selesaikan Core Beginner',
      icon: hasPassedExam('core', 'beginner') ? 'check' : 'book-open'
    },
    {
      title: 'Lab Beginner',
      done: hasPassedExam('lab', 'beginner'),
      copy: hasPassedExam('lab', 'beginner')
        ? 'Latihan aman sudah tercatat sebagai bukti praktik awal.'
        : 'Mulai Lab Beginner agar Passport bisa membaca kemampuan praktik aman.',
      href: '/lab',
      cta: hasPassedExam('lab', 'beginner') ? 'Lihat Lab' : 'Mulai Lab Beginner',
      icon: hasPassedExam('lab', 'beginner') ? 'check' : 'flask-conical'
    },
    {
      title: 'Partisipasi komunitas',
      done: registeredWorkshops > 0,
      optional: true,
      copy: registeredWorkshops > 0
        ? `${registeredWorkshops} workshop sudah masuk ke perjalanan belajarmu.`
        : 'Opsional, tapi membantu Passport menunjukkan bahwa kamu juga terhubung dengan komunitas belajar.',
      href: '/community',
      cta: registeredWorkshops > 0 ? 'Lihat Komunitas' : 'Temukan Workshop',
      icon: registeredWorkshops > 0 ? 'check' : 'users'
    }
  ]);
</script>

<section class="passport-shell" data-karyra-passport="proof-foundation">
  <section class="passport-hero-card">
    <div class="passport-copy">
      <div class="passport-badge-row">
        <SparkTrustBadge label="Passport Spark" tone="beta" />
        <SparkTrustBadge label={eligibility.levelLabel} tone={eligibility.eligible ? 'safe' : 'target'} />
        <SparkTrustBadge label={eligibility.verificationLabel} tone={verificationTier === 'community_verified' ? 'safe' : 'local'} />
      </div>

      <h1>Lihat kesiapanmu dengan jelas.</h1>
      <p>
        Passport Spark merangkum pelajaran, latihan aman, dan partisipasi komunitas menjadi gambaran kesiapan yang mudah dibaca. Kamu bisa melihat apa yang sudah tercatat dan langkah berikutnya tanpa bahasa teknis.
      </p>

      <div class="passport-actions">
        <SparkButton href={nextStep.href}>{nextStep.cta}</SparkButton>
        <SparkButton href="#passport-proof" variant="secondary">Lihat rincian bukti belajar</SparkButton>
      </div>
    </div>

    <aside class="passport-badge-card" aria-label="Badge Passport Spark">
      <SparkPassportBadge
        levelLabel={eligibility.levelLabel}
        statusLabel={eligibility.eligible ? 'Siap terbit' : 'Dalam perjalanan'}
        verificationLabel={eligibility.verificationLabel}
        proofCode={proofPreview.passportId}
        locked={!eligibility.eligible}
      />
    </aside>
  </section>

  <section class="passport-status-layout">
    <aside class="passport-score-card">
      <SparkPassportGauge value={readiness} label="Kesiapan" copy="Perjalanan" />
      <div>
        <span class="spark-eyebrow">Status saat ini</span>
        <strong>{eligibility.eligible ? `${eligibility.levelLabel} siap diterbitkan` : 'Masih dalam perjalanan'}</strong>
        <p>{nextStep.copy}</p>
      </div>
    </aside>

    <div class="passport-next-card">
      <div>
        <span class="spark-eyebrow">Langkah berikutnya</span>
        <h2>{nextStep.title}</h2>
        <p>{nextStep.copy}</p>
      </div>
      <SparkButton href={nextStep.href}>{nextStep.cta}</SparkButton>
    </div>
  </section>


  <section class="passport-explainability-card" aria-labelledby="passport-explainability-title">
    <div class="passport-section-head compact">
      <span class="spark-eyebrow">{eligibility.eligible ? 'Passport siap' : 'Kenapa belum terbit?'}</span>
      <h2 id="passport-explainability-title">{eligibility.eligible ? 'Bukti utama sudah cukup.' : 'Lengkapi bukti utama berikut dulu.'}</h2>
      <p>{eligibility.eligible ? 'Kamu sudah melewati syarat utama. Rincian di bawah membantu melihat bukti yang membentuk Passport.' : 'Passport tidak dibuat dari klaim manual. Ia menunggu bukti belajar dan praktik yang benar-benar kamu selesaikan.'}</p>
    </div>

    <div class="passport-explainability-list">
      {#each explainabilitySteps as step}
        <article class="passport-explainability-item" class:done={step.done} class:pending={!step.done} class:optional={step.optional}>
          <span><SparkIcon name={step.icon} size={18} /></span>
          <div>
            <small>{step.done ? 'Tercatat' : step.optional ? 'Opsional' : 'Belum lengkap'}</small>
            <strong>{step.title}</strong>
            <p>{step.copy}</p>
          </div>
          <footer>
            <SparkButton href={step.href} variant={step.done ? 'secondary' : 'primary'}>{step.cta}</SparkButton>
            {#if step.optional}<em>Memperkuat konteks Passport</em>{/if}
          </footer>
        </article>
      {/each}
    </div>
  </section>

  <section class="passport-evidence-grid" aria-label="Bukti kesiapan Passport">
    {#each evidenceCards as item}
      <a href={item.href}>
        <span><SparkIcon name={item.icon} size={18} /></span>
        <div>
          <div class="evidence-row">
            <strong>{item.label}</strong>
            <em>{item.value}</em>
          </div>
          <small>{item.copy}</small>
          <div class="evidence-progress" aria-hidden="true"><b style={`width: ${Math.max(4, item.progress)}%`}></b></div>
        </div>
      </a>
    {/each}
  </section>

  <section class="passport-proof-family-card" aria-labelledby="passport-proof-family-title">
    <div class="passport-section-head">
      <span class="spark-eyebrow">Kumpulan bukti Spark</span>
      <h2 id="passport-proof-family-title">Passport dirangkum dari beberapa bukti, bukan satu klaim.</h2>
      <p>
        Kesiapan adalah hasil akhir. Di bawahnya ada bukti belajar, praktik aman, partisipasi, eksplorasi, dan kontribusi yang dirangkum agar mudah dipahami.
      </p>
    </div>

    <div class="passport-proof-signal-grid">
      {#each proofSignalCards as proof}
        <a href={proof.href} class={`proof-signal-card ${proof.status}`}>
          <span><SparkIcon name={proof.icon} size={18} /></span>
          <div>
            <small>{proof.label}</small>
            <strong>{proof.title}</strong>
            <p>{proof.copy}</p>
            <div class="proof-signal-foot">
              <em>{proof.statusLabel}</em>
              <b>{proof.progress}%</b>
            </div>
            <div class="proof-signal-progress" aria-hidden="true"><i style={`width: ${Math.max(4, proof.progress)}%`}></i></div>
          </div>
        </a>
      {/each}
    </div>
  </section>

  <section class="passport-proof-card" id="passport-proof">
    <div class="passport-section-head">
      <span class="spark-eyebrow">Rincian bukti</span>
      <h2>Bukti belajar tersusun otomatis.</h2>
      <p>
        Spark menyusun bukti dari hasil Core, Lab, dan aktivitas pendukung. Kamu melihat ringkasannya saja; detail sensitif tetap dibatasi.
      </p>
    </div>

    <div class="proof-meta-grid">
      <div>
        <small>Penerbit</small>
        <strong>Karyra Spark</strong>
      </div>
      <div>
        <small>Rencana jaringan</small>
        <strong>{proofPreview.targetChain}</strong>
      </div>
      <div>
        <small>Bukti tersimpan</small>
        <strong>{proofPreview.evidenceRoot}</strong>
      </div>
      <div>
        <small>Badge digital</small>
        <strong>{proofPreview.badgeStatus === 'locked' ? 'Belum terbuka' : 'Masuk roadmap grant'}</strong>
      </div>
    </div>
  </section>

  <section class="passport-level-card">
    <div class="passport-section-head compact">
      <span class="spark-eyebrow">Level Passport</span>
      <h2>Level naik setelah Core dan Lab terkait lulus.</h2>
    </div>

    <div class="passport-level-list">
      {#each levelRows as row}
        <a href={row.corePassed ? '/lab' : '/core'} class:done={row.passed} class:active={readinessLevel === row.level}>
          <span>{row.passed ? '✓' : row.label.slice(0, 1)}</span>
          <div>
            <strong>{row.label}</strong>
            <small>{row.title}</small>
            <p>Core: {row.corePassed ? 'lulus' : 'belum'} · Lab: {row.labPassed ? 'lulus' : 'belum'}</p>
          </div>
        </a>
      {/each}
    </div>
  </section>

  <section class="passport-roadmap-grid">
    <article>
      <span><SparkIcon name="checklist" size={20} /></span>
      <strong>Jejak kesiapan belajar</strong>
      <p>Catatan ujian, latihan, dan partisipasi dibuat otomatis oleh Spark, jadi pengguna tidak perlu mengunggah bukti manual.</p>
    </article>
    <article>
      <span><SparkIcon name="network" size={20} /></span>
      <strong>Rencana Starknet</strong>
      <p>Ringkasan bukti disiapkan agar nanti bisa terhubung ke Starknet, dimulai dari tahap uji sebelum target akhir.</p>
    </article>
    <article>
      <span><SparkIcon name="badge" size={20} /></span>
      <strong>Badge digital</strong>
      <p>Badge visual Passport disiapkan menjadi kredensial digital saat grant dan infrastruktur siap.</p>
    </article>
  </section>

  <section class="passport-privacy-card">
    <span><SparkIcon name="shield" size={22} /></span>
    <div>
      <h2>Bukti kuat, data pribadi tetap dibatasi.</h2>
      <p>
        Passport membuktikan kesiapan belajar dan praktik. Jawaban mentah, catatan pribadi, dan identitas sensitif tidak dibagikan ke jaringan publik. Verifikasi identitas lanjutan tetap menjadi tahap masa depan.
      </p>
      <SparkButton href="/terms" variant="secondary">Baca ketentuan</SparkButton>
    </div>
  </section>
</section>

<style>
  .passport-shell,
  .passport-copy,
  .passport-score-card,
  .passport-next-card,
  .passport-level-card,
  .passport-proof-card,
  .passport-privacy-card,
  .passport-section-head {
    display: grid;
    gap: 14px;
  }

  .passport-hero-card,
  .passport-status-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(270px, .42fr);
    gap: 14px;
    align-items: stretch;
  }

  .passport-hero-card {
    padding: clamp(18px, 4vw, 34px);
    border: 1px solid var(--spark-line);
    border-radius: 30px;
    background:
      radial-gradient(circle at 8% 8%, rgba(31, 117, 255, .1), transparent 32%),
      radial-gradient(circle at 92% 18%, rgba(255, 128, 0, .1), transparent 30%),
      var(--spark-card);
    box-shadow: 0 16px 44px rgba(5, 9, 78, .08);
  }

  .passport-copy {
    align-content: center;
  }

  .passport-badge-row,
  .passport-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .passport-copy h1 {
    max-width: 760px;
    margin: 0;
    color: var(--spark-navy);
    font-size: clamp(30px, 5vw, 56px);
    line-height: 1.02;
    letter-spacing: -.055em;
  }

  .passport-copy p,
  .passport-next-card p,
  .passport-section-head p,
  .passport-level-list p,
  .passport-roadmap-grid p,
  .passport-privacy-card p,
  .passport-score-card p {
    margin: 0;
    color: var(--spark-muted);
    line-height: 1.58;
  }

  .passport-badge-card,
  .passport-score-card,
  .passport-next-card,
  .passport-level-card,
  .passport-proof-card,
  .passport-privacy-card,
  .passport-evidence-grid a,
  .passport-roadmap-grid article {
    border: 1px solid var(--spark-line);
    border-radius: 26px;
    background: var(--spark-card);
    box-shadow: 0 10px 26px rgba(5, 9, 78, .06);
  }

  .passport-badge-card {
    padding: 10px;
  }

  .passport-score-card,
  .passport-next-card,
  .passport-level-card,
  .passport-proof-card,
  .passport-privacy-card {
    padding: 18px;
  }

  .passport-score-card {
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
  }

  .passport-score-card strong,
  .passport-next-card h2,
  .passport-section-head h2,
  .passport-privacy-card h2 {
    margin: 0;
    color: var(--spark-navy);
    font-size: clamp(22px, 3vw, 34px);
    letter-spacing: -.035em;
  }

  .passport-next-card {
    align-content: space-between;
  }

  .passport-evidence-grid,
  .proof-meta-grid,
  .passport-roadmap-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
  }

  .passport-evidence-grid a,
  .passport-roadmap-grid article,
  .proof-meta-grid div {
    display: grid;
    gap: 10px;
    padding: 14px;
  }

  .passport-evidence-grid a,
  .passport-roadmap-grid article {
    color: inherit;
  }

  .passport-evidence-grid a > span,
  .passport-roadmap-grid article > span,
  .passport-privacy-card > span {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, .1);
  }

  .evidence-row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: center;
  }

  .evidence-row strong,
  .passport-level-list strong,
  .passport-roadmap-grid strong,
  .proof-meta-grid strong {
    color: var(--spark-navy);
  }

  .evidence-row em,
  .passport-evidence-grid small,
  .passport-level-list small,
  .proof-meta-grid small {
    color: var(--spark-muted);
    font-size: 11.5px;
    font-style: normal;
    font-weight: 800;
  }

  .evidence-progress {
    height: 7px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(31, 117, 255, .1);
  }

  .evidence-progress b {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--spark-blue), var(--spark-orange));
  }

  .proof-meta-grid div {
    border: 1px solid var(--spark-line);
    border-radius: 20px;
    background: rgba(255, 255, 255, .56);
  }

  .proof-meta-grid strong {
    overflow-wrap: anywhere;
    font-size: 13px;
  }

  .passport-level-list {
    display: grid;
    gap: 10px;
  }

  .passport-level-list a {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
    align-items: start;
    padding: 13px;
    border: 1px solid var(--spark-line);
    border-radius: 20px;
    color: inherit;
    background: rgba(255, 255, 255, .52);
  }

  .passport-level-list a > span {
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, .12);
    font-weight: 900;
  }

  .passport-level-list a.done > span {
    color: #0d7a4f;
    background: rgba(35, 184, 125, .15);
  }

  .passport-level-list a.active {
    border-color: rgba(31, 117, 255, .42);
    box-shadow: 0 8px 18px rgba(31, 117, 255, .08);
  }

  .passport-privacy-card {
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
  }


  .passport-proof-family-card {
    display: grid;
    gap: 14px;
    padding: 18px;
    border: 1px solid var(--spark-line);
    border-radius: 26px;
    background: var(--spark-card);
    box-shadow: 0 10px 26px rgba(5, 9, 78, .06);
  }

  .passport-proof-signal-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  .proof-signal-card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
    align-items: start;
    padding: 14px;
    border: 1px solid var(--spark-line);
    border-radius: 22px;
    color: inherit;
    background: rgba(255, 255, 255, .52);
  }

  .proof-signal-card.active {
    border-color: rgba(35, 184, 125, .34);
    background: rgba(35, 184, 125, .08);
  }

  .proof-signal-card.planned {
    border-style: dashed;
  }

  .proof-signal-card > span {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, .1);
  }

  .proof-signal-card small,
  .proof-signal-foot em,
  .proof-signal-foot b {
    color: var(--spark-muted);
    font-size: 11px;
    font-style: normal;
    font-weight: 850;
  }

  .proof-signal-card strong {
    display: block;
    margin-top: 3px;
    color: var(--spark-navy);
  }

  .proof-signal-card p {
    margin: 6px 0 0;
    color: var(--spark-muted);
    font-size: 13px;
    line-height: 1.5;
  }

  .proof-signal-foot {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: 10px;
  }

  .proof-signal-progress {
    height: 7px;
    margin-top: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(31, 117, 255, .1);
  }

  .proof-signal-progress i {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--spark-blue), var(--spark-orange));
  }

  @media (max-width: 880px) {
    .passport-proof-signal-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 560px) {
    .passport-proof-signal-grid,
    .proof-signal-card {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 880px) {
    .passport-hero-card,
    .passport-status-layout,
    .passport-score-card,
    .passport-privacy-card {
      grid-template-columns: 1fr;
    }

    .passport-evidence-grid,
    .proof-meta-grid,
    .passport-roadmap-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 560px) {
    .passport-hero-card {
      padding: 16px;
      border-radius: 24px;
    }

    .passport-copy h1 {
      font-size: 32px;
    }

    .passport-actions,
    .passport-actions :global([data-spark-button]) {
      width: 100%;
    }

    .passport-evidence-grid,
    .proof-meta-grid,
    .passport-roadmap-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
