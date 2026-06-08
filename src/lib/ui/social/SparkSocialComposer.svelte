<script lang="ts">
  import SparkIcon from '$ui/SparkIcon.svelte';
  import { createSocialPost } from '$lib/social/local-social-gateway';
  import { socialPostKindHints, socialPostKindLabels } from '$lib/social/social-model';
  import { evaluateSocialDraft } from '$lib/social/social-policy';
  import type { SocialPostKind } from '$lib/social/social-types';

  const kinds: SocialPostKind[] = ['progress', 'question', 'resource', 'workshop', 'lab'];

  let draft = $state('');
  let kind = $state<SocialPostKind>('progress');
  let composerOpen = $state(false);
  const policy = $derived(evaluateSocialDraft(draft));

  function openComposer(nextKind: SocialPostKind = kind) {
    kind = nextKind;
    composerOpen = true;
  }

  function submit() {
    if (!policy.canKirim) return;
    createSocialPost({ body: draft, kind });
    draft = '';
    kind = 'progress';
    composerOpen = false;
  }
</script>

<div class="social-composer" class:collapsed={!composerOpen && draft.trim().length === 0}>
  <div class="composer-head">
    <span><SparkIcon name="messages" size={18} /></span>
    <div>
      <strong>Tanya atau bagikan perkembangan</strong>
      <small>{composerOpen ? socialPostKindHints[kind] : 'Tulis pertanyaan, koordinasi workshop, atau progress belajar.'}</small>
    </div>
  </div>

  {#if !composerOpen && draft.trim().length === 0}
    <div class="composer-open-actions" aria-label="Mulai diskusi">
      <button type="button" onclick={() => openComposer('question')}>
        <SparkIcon name="help" size={15} /> Tanya
      </button>
      <button type="button" onclick={() => openComposer('progress')}>
        <SparkIcon name="check" size={15} /> Perkembangan
      </button>
      <button type="button" onclick={() => openComposer('workshop')}>
        <SparkIcon name="calendar" size={15} /> Workshop
      </button>
    </div>
  {:else}
    <div class="composer-kind-row" aria-label="Jenis diskusi">
      {#each kinds as item}
        <button class:active={kind === item} type="button" onclick={() => (kind = item)}>
          {socialPostKindLabels[item]}
        </button>
      {/each}
    </div>

    <textarea
      bind:value={draft}
      maxlength="720"
      placeholder="Tulis pertanyaan, ajakan hadir di workshop, catatan belajar, rujukan aman, atau perkembangan dari Lab."
      aria-label="Tulis diskusi komunitas"
    ></textarea>

    {#if policy.warnings.length > 0}
      <p class="composer-warning"><SparkIcon name="shield" size={14} /> {policy.warnings[0]}</p>
    {/if}

    {#if policy.errors.length > 0 && draft.trim().length > 0}
      <p class="composer-error"><SparkIcon name="shield-alert" size={14} /> {policy.errors[0]}</p>
    {/if}

    <div class="composer-actions">
      <small>{policy.normalized.length}/640 · siap dibagikan</small>
      <div>
        <button type="button" class="composer-cancel" onclick={() => { draft = ''; composerOpen = false; }}>Batal</button>
        <button type="button" class="spark-btn primary" disabled={!policy.canKirim} onclick={submit}>
          <SparkIcon name="send" size={15} /> Kirim
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .social-composer {
    display: grid;
    gap: 12px;
    padding: 14px;
    border: 1px solid var(--spark-line);
    border-radius: 24px;
    background: var(--spark-card);
    box-shadow: 0 12px 30px rgba(5, 9, 78, 0.07);
  }

  .social-composer.collapsed { gap: 10px; }

  .composer-head {
    display: grid;
    grid-template-columns: 42px minmax(0, 1fr);
    gap: 10px;
    align-items: center;
  }

  .composer-head > span {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 15px;
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, 0.1);
  }

  .composer-head strong,
  .composer-head small { display: block; }

  .composer-head strong {
    color: var(--spark-navy);
    font-size: 15px;
    line-height: 1.15;
  }

  :global([data-theme='dark']) .composer-head strong { color: #fff; }

  .composer-head small,
  .composer-actions small {
    color: var(--spark-muted);
    font-size: 11.5px;
    line-height: 1.3;
  }

  .composer-open-actions,
  .composer-kind-row {
    display: flex;
    gap: 7px;
    overflow-x: auto;
    padding-bottom: 1px;
  }

  .composer-open-actions button,
  .composer-kind-row button,
  .composer-cancel {
    flex: 0 0 auto;
    min-height: 32px;
    padding: 0 10px;
    border: 1px solid var(--spark-line);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.52);
    color: var(--spark-muted);
    font-size: 11.5px;
    font-weight: 680;
  }

  .composer-open-actions button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  :global([data-theme='dark']) .composer-open-actions button,
  :global([data-theme='dark']) .composer-kind-row button,
  :global([data-theme='dark']) .composer-cancel { background: rgba(255,255,255,.055); }

  .composer-kind-row button.active {
    border-color: rgba(31, 117, 255, 0.34);
    background: rgba(31, 117, 255, 0.1);
    color: var(--spark-blue-strong);
  }

  textarea {
    width: 100%;
    min-height: 112px;
    padding: 12px;
    border: 1px solid var(--spark-line);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.64);
    color: var(--spark-ink);
    outline: none;
    resize: vertical;
    font-size: 13px;
    line-height: 1.5;
  }

  :global([data-theme='dark']) textarea { background: rgba(255,255,255,.055); }

  textarea:focus {
    border-color: rgba(31, 117, 255, 0.44);
    box-shadow: 0 0 0 4px rgba(31, 117, 255, 0.1);
  }

  .composer-warning,
  .composer-error {
    display: flex;
    gap: 7px;
    align-items: center;
    margin: 0;
    font-size: 12px;
    line-height: 1.35;
  }

  .composer-warning { color: #a15a00; }
  .composer-error { color: #b42318; }
  :global([data-theme='dark']) .composer-warning { color: #ffd08a; }
  :global([data-theme='dark']) .composer-error { color: #ffb4a8; }

  .composer-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .composer-actions > div {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .composer-actions button { min-height: 38px; }

  @media (max-width: 520px) {
    .social-composer { padding: 12px; border-radius: 20px; }
    .composer-actions { align-items: stretch; }
    .composer-actions > div { justify-content: flex-end; }
  }
</style>
