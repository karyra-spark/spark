<script lang="ts">
  import type { GlossaryTerm } from '$content/spark-content';
  import SparkButton from './SparkButton.svelte';
  import { learningState, setLessonNote, toggleBookmark } from '$state/learning-state.svelte';
  import { pushToast } from '$state/app-state.svelte';

  type Props = {
    lessonSlug: string;
    lessonTitle: string;
    terms?: GlossaryTerm[];
  };

  let { lessonSlug, lessonTitle, terms = [] }: Props = $props();

  let note = $state('');

  const bookmarked = $derived(learningState.bookmarkSlugs.includes(lessonSlug));

  $effect(() => {
    note = learningState.notes[lessonSlug] ?? '';
  });

  function save() {
    setLessonNote(lessonSlug, note);
    pushToast({
      title: 'Catatan disimpan',
      copy: `Catatan untuk ${lessonTitle} tersimpan di perangkat ini.`,
      tone: 'success'
    });
  }
</script>

<aside class="spark-learning-toolkit">
  <div class="toolkit-head">
    <span class="spark-eyebrow">Learning Toolkit</span>
    <h3>Catatan, bookmark, dan glossary.</h3>
  </div>

  <button
    class:active={bookmarked}
    class="toolkit-bookmark"
    type="button"
    onclick={() => {
      toggleBookmark(lessonSlug);
      pushToast({
        title: bookmarked ? 'Bookmark dihapus' : 'Lesson disimpan',
        copy: bookmarked ? 'Lesson dihapus dari daftar simpanan.' : 'Lesson masuk bookmark lokal.',
        tone: 'info'
      });
    }}
  >
    {bookmarked ? '✓ Tersimpan' : '+ Simpan lesson'}
  </button>

  <label class="toolkit-note">
    <span>Catatan pribadi</span>
    <textarea bind:value={note} onblur={save} placeholder="Tulis catatan sederhana agar mudah diingat..."></textarea>
  </label>

  {#if terms.length > 0}
    <div class="toolkit-glossary">
      <strong>Glossary</strong>
      {#each terms as item}
        <details>
          <summary>{item.term}</summary>
          <p>{item.simple}</p>
          {#if item.technical}
            <small>{item.technical}</small>
          {/if}
        </details>
      {/each}
    </div>
  {/if}
</aside>
