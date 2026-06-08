<script lang="ts">
  import SparkButton from '$ui/SparkButton.svelte';
  import SparkIcon from '$ui/SparkIcon.svelte';
  import SparkTrustBadge from '$ui/SparkTrustBadge.svelte';
  import {
    answerLevelExam,
    calculateExamScore,
    getDraftAnswers,
    getExamResult,
    resetLevelExam,
    submitLevelExam
  } from '$lib/leveling/leveling-state.svelte';
  import type { LevelExam } from '$lib/leveling/leveling-types';

  type Props = {
    exam: LevelExam;
    locked?: boolean;
  };

  let { exam, locked = false }: Props = $props();

  const answers = $derived(getDraftAnswers(exam.id));
  const result = $derived(getExamResult(exam.id));
  const answeredCount = $derived(Object.keys(answers).length);
  const draftScore = $derived(calculateExamScore(exam, answers));
  const canSubmit = $derived(!locked && answeredCount === exam.questions.length);

  function choose(questionId: string, optionId: string) {
    if (locked) return;
    answerLevelExam(exam.id, questionId, optionId);
  }

  function submit() {
    if (!canSubmit) return;
    submitLevelExam(exam);
  }

  function resetExam() {
    if (locked || result?.passed) return;
    resetLevelExam(exam.id);
  }
</script>

<article class="level-exam-card" class:locked class:passed={result?.passed} data-karyra-level-exam={exam.id}>
  <div class="level-exam-head">
    <div>
      <span class="spark-eyebrow">Ujian akhir</span>
      <h3>{exam.title}</h3>
      <p>{exam.summary}</p>
    </div>
    <SparkTrustBadge
      label={locked ? 'Terkunci' : result?.passed ? 'Lulus' : result ? 'Ulangi' : `${exam.passingScore}% untuk lulus`}
      tone={locked ? 'target' : result?.passed ? 'safe' : 'beta'}
    />
  </div>

  <div class="level-exam-progress">
    <span>{answeredCount}/{exam.questions.length} dijawab</span>
    <strong>{result ? `${result.score}%` : `${draftScore}%`}</strong>
  </div>
  <div class="level-exam-bar" aria-hidden="true"><b style={`width: ${Math.max(4, result?.score ?? draftScore)}%`}></b></div>

  <div class="level-question-list">
    {#each exam.questions as question, questionIndex}
      <section class="level-question-card">
        <div class="level-question-title">
          <span>{questionIndex + 1}</span>
          <strong>{question.prompt}</strong>
        </div>
        <div class="level-option-list">
          {#each question.options as option}
            {@const selected = answers[question.id] === option.id}
            {@const revealed = Boolean(result)}
            <button
              type="button"
              class:selected
              class:correct={revealed && option.correct}
              class:wrong={revealed && selected && !option.correct}
              disabled={locked || Boolean(result?.passed)}
              onclick={() => choose(question.id, option.id)}
            >
              <SparkIcon name={revealed && option.correct ? 'check' : selected ? 'target' : 'target'} size={14} />
              <span>{option.label}</span>
            </button>
            {#if revealed && selected}
              <small class="level-option-feedback">{option.feedback}</small>
            {/if}
          {/each}
        </div>
      </section>
    {/each}
  </div>

  <div class="level-exam-footer">
    <p>
      {locked
        ? 'Selesaikan level sebelumnya agar ujian ini terbuka.'
        : result?.passed
          ? 'Level ini sudah lulus dan siap menjadi bukti kesiapan.'
          : result
            ? 'Belum lulus. Review materi atau latihan dulu, lalu ulangi saat sudah siap.'
            : 'Pastikan semua soal terjawab, lalu kirim untuk melihat hasil.'}
    </p>
    {#if result && !result.passed}
      <SparkButton onclick={resetExam} variant="secondary" disabled={locked}>Ulangi Setelah Review</SparkButton>
    {:else}
      <SparkButton onclick={submit} disabled={!canSubmit || result?.passed || locked}>
        {result?.passed ? 'Sudah lulus' : 'Kirim & Lihat Hasil'}
      </SparkButton>
    {/if}
  </div>
</article>

<style>
  .level-exam-card,
  .level-question-list,
  .level-question-card,
  .level-option-list,
  .level-exam-footer {
    display: grid;
    gap: 12px;
  }

  .level-exam-card {
    padding: clamp(16px, 4vw, 24px);
    border: 1px solid var(--spark-line);
    border-radius: 26px;
    background: var(--spark-card);
    box-shadow: 0 12px 32px rgba(5, 9, 78, 0.07);
  }

  .level-exam-card.locked {
    opacity: 0.78;
  }

  .level-exam-head,
  .level-exam-progress,
  .level-question-title,
  .level-exam-footer {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    justify-content: space-between;
  }

  .level-exam-head h3,
  .level-exam-head p,
  .level-exam-footer p {
    margin: 0;
  }

  .level-exam-head h3 {
    color: var(--spark-navy);
    font-size: clamp(20px, 5vw, 28px);
    letter-spacing: -0.035em;
  }

  .level-exam-head p,
  .level-exam-footer p,
  .level-option-feedback {
    color: var(--spark-muted);
    line-height: 1.55;
  }

  .level-exam-progress {
    align-items: center;
    color: var(--spark-muted);
    font-size: 12px;
    font-weight: 760;
  }

  .level-exam-progress strong {
    color: var(--spark-blue-strong);
  }

  .level-exam-bar {
    height: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(31, 117, 255, 0.1);
  }

  .level-exam-bar b {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--spark-blue), var(--spark-orange));
  }

  .level-question-card {
    padding: 14px;
    border: 1px solid var(--spark-line);
    border-radius: 20px;
    background: color-mix(in srgb, var(--spark-card) 88%, var(--spark-blue-soft));
  }

  .level-question-title {
    justify-content: flex-start;
    align-items: center;
  }

  .level-question-title > span {
    width: 28px;
    height: 28px;
    display: inline-grid;
    place-items: center;
    flex: 0 0 auto;
    border-radius: 999px;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, 0.1);
    font-size: 12px;
    font-weight: 850;
  }

  .level-question-title strong {
    color: var(--spark-navy);
    line-height: 1.35;
  }

  .level-option-list button {
    width: 100%;
    min-height: 44px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 12px;
    border: 1px solid var(--spark-line);
    border-radius: 16px;
    color: var(--spark-navy);
    background: var(--spark-card);
    text-align: left;
    font-weight: 720;
  }

  .level-option-list button.selected {
    border-color: rgba(31, 117, 255, 0.45);
    background: rgba(31, 117, 255, 0.09);
  }

  .level-option-list button.correct {
    border-color: rgba(27, 164, 122, 0.4);
    background: rgba(27, 164, 122, 0.1);
  }

  .level-option-list button.wrong {
    border-color: rgba(255, 128, 0, 0.46);
    background: rgba(255, 128, 0, 0.1);
  }

  .level-option-feedback {
    display: block;
    margin-top: -4px;
    padding: 0 4px;
    font-size: 12px;
  }

  @media (max-width: 680px) {
    .level-exam-head,
    .level-exam-footer {
      display: grid;
    }
  }
</style>
