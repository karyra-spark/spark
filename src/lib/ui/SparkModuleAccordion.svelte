<script lang="ts">
  import { slide } from 'svelte/transition';
  import SparkBridgeWarning from './SparkBridgeWarning.svelte';
  import SparkButton from './SparkButton.svelte';
  import { sparkModules } from '$content/spark-content';
  import { completeLesson, learningState, toggleModule } from '$state/learning-state.svelte';
  import { shouldShowBridge } from '$lib/learning/recommendation';

  function completed(slug: string) {
    return learningState.completedLessonSlugs.includes(slug);
  }
</script>

<div class="spark-accordion">
  {#each sparkModules as module}
    {@const expanded = learningState.expandedModuleIds.includes(module.id)}
    <section class={`spark-module ${module.tone} ${expanded ? 'open' : ''}`}>
      <button class="spark-module-head" type="button" onclick={() => toggleModule(module.id)}>
        <span class="spark-module-level">{module.level}</span>
        <span class="spark-module-copy">
          <small>{module.subtitle}</small>
          <strong>{module.title}</strong>
          <em>{module.description}</em>
        </span>
        <span class="spark-module-meta">{module.lessons.length} materi</span>
      </button>

      {#if expanded}
        <div class="spark-module-body" transition:slide={{ duration: 180 }}>
          {#if shouldShowBridge(module.id) && module.bridgeWarning}
            <SparkBridgeWarning copy={module.bridgeWarning} />
          {/if}

          <div class="spark-lesson-list">
            {#each module.lessons as lesson}
              <article class="spark-lesson-row">
                <span class="spark-lesson-icon">{completed(lesson.slug) ? '✓' : '↗'}</span>
                <div>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.summary}</p>
                  <small>{lesson.estimatedMinutes} menit · {lesson.checkpoint}</small>
                </div>
                <div class="spark-lesson-actions">
                  <SparkButton href={`/lesson/${lesson.slug}`} variant="secondary">Buka</SparkButton>
                  <button class="spark-icon-action" type="button" aria-label="Tandai selesai" onclick={() => completeLesson(lesson.slug)}>
                    {completed(lesson.slug) ? '✓' : '+'}
                  </button>
                </div>
              </article>
            {/each}
          </div>
        </div>
      {/if}
    </section>
  {/each}
</div>
