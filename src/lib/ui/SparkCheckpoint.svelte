<script lang="ts">
  import type { SparkLesson } from '$content/spark-content';
  import SparkButton from './SparkButton.svelte';
  import { answerCheckpoint, learningState } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  type Props = {
    lesson: SparkLesson;
  };

  let { lesson }: Props = $props();

  const answer = $derived(learningState.checkpointAnswers[lesson.slug]);

  function choose(optionId: string, correct = false, feedback: string) {
    answerCheckpoint(lesson.slug, optionId, correct);
    pushToast({
      title: correct ? 'Checkpoint benar' : 'Coba pahami lagi',
      copy: feedback,
      tone: correct ? 'success' : 'warning'
    });
  }
</script>

<section class="spark-checkpoint">
  <span class="spark-eyebrow">Checkpoint</span>
  <h2>{lesson.checkpointQuestion ?? 'Apa hal utama yang kamu pahami?'}</h2>
  <p>{lesson.checkpoint}</p>

  {#if lesson.checkpointOptions?.length}
    <div class="checkpoint-options">
      {#each lesson.checkpointOptions as option}
        <button
          type="button"
          class:selected={answer?.optionId === option.id}
          class:correct={answer?.optionId === option.id && answer.correct}
          onclick={() => choose(option.id, Boolean(option.correct), option.feedback)}
        >
          <strong>{option.label}</strong>
          {#if answer?.optionId === option.id}
            <small>{option.feedback}</small>
          {/if}
        </button>
      {/each}
    </div>
  {:else}
    <SparkButton onclick={() => choose('manual-complete', true, 'Lesson ditandai selesai.')}>
      Tandai Paham
    </SparkButton>
  {/if}
</section>
