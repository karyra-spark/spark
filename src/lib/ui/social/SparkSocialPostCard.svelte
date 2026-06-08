<script lang="ts">
  import SparkIcon from '$ui/SparkIcon.svelte';
  import {
    addSocialComment,
    hideSocialPost,
    reportSocialPost,
    shareSocialPost,
    toggleSocialFollow,
    toggleSocialReaction
  } from '$lib/social/local-social-gateway';
  import { getSocialProfile, SOCIAL_VIEWER_ID, socialPostKindLabels } from '$lib/social/social-model';
  import { evaluateSocialComment } from '$lib/social/social-policy';
  import { socialState } from '$lib/social/social-state.svelte';
  import type { SocialPost, SocialReactionKind } from '$lib/social/social-types';

  type Props = { post: SocialPost };
  let { post }: Props = $props();

  let commentDraft = $state('');
  let showComments = $state(false);

  const author = $derived(getSocialProfile(post.authorId));
  const comments = $derived(socialState.comments[post.id] ?? []);
  const followed = $derived(socialState.followedProfileIds.includes(post.authorId));
  const commentPolicy = $derived(evaluateSocialComment(commentDraft));

  const reactions: { key: SocialReactionKind; label: string; icon: string }[] = [
    { key: 'support', label: 'Dukung', icon: 'heart' },
    { key: 'helpful', label: 'Berguna', icon: 'check' },
    { key: 'inspiring', label: 'Inspirasi', icon: 'sparkles' }
  ];

  function addComment() {
    if (!commentPolicy.canKirim) return;
    addSocialComment({ postId: post.id, body: commentDraft });
    commentDraft = '';
    showComments = true;
  }

  async function copyShareLink() {
    const href = typeof window === 'undefined' ? `/community#${post.id}` : `${window.location.origin}/community#${post.id}`;
    try {
      await navigator.clipboard?.writeText(href);
    } catch {
      // Copy fallback is intentionally silent. Event count still records share intent.
    }
    shareSocialPost(post.id);
  }
</script>

<article class="social-post-card" id={post.id} data-kind={post.kind}>
  <header class="post-head">
    <span class="avatar" aria-hidden="true">{author.avatarLabel}</span>
    <div>
      <div class="author-row">
        <strong>{author.name}</strong>
        {#if author.trusted}<em>verified</em>{/if}
      </div>
      <small>{author.handle} · {socialPostKindLabels[post.kind]} · lokal</small>
    </div>
    {#if post.authorId !== SOCIAL_VIEWER_ID}
      <button type="button" class:active={followed} class="follow-btn" onclick={() => toggleSocialFollow(post.authorId)}>
        {followed ? 'Diikuti' : 'Ikuti'}
      </button>
    {/if}
  </header>

  <p class="post-body">{post.body}</p>

  {#if post.tags.length > 0}
    <div class="tag-row">
      {#each post.tags as tag}
        <span>#{tag}</span>
      {/each}
    </div>
  {/if}

  <div class="post-actions" aria-label="Aksi post">
    {#each reactions as reaction}
      <button
        type="button"
        class:active={post.viewer.reaction === reaction.key}
        onclick={() => toggleSocialReaction(post.id, reaction.key)}
      >
        <SparkIcon name={reaction.icon} size={14} /> {reaction.label} <span>{post.stats[reaction.key]}</span>
      </button>
    {/each}
    <button type="button" onclick={() => (showComments = !showComments)}>
      <SparkIcon name="messages" size={14} /> Komentar <span>{post.stats.comments}</span>
    </button>
    <button type="button" onclick={copyShareLink}>
      <SparkIcon name="share" size={14} /> Share <span>{post.stats.shares}</span>
    </button>
  </div>

  {#if showComments}
    <section class="comment-thread" aria-label="Komentar">
      {#if comments.length === 0}
        <p class="empty-comment">Belum ada komentar. Mulai dengan pertanyaan atau dukungan singkat.</p>
      {:else}
        {#each comments as comment (comment.id)}
          {@const commentAuthor = getSocialProfile(comment.authorId)}
          <div class="comment-row">
            <span>{commentAuthor.avatarLabel}</span>
            <p><strong>{commentAuthor.name}</strong> {comment.body}</p>
          </div>
        {/each}
      {/if}

      <div class="comment-compose">
        <input bind:value={commentDraft} placeholder="Tulis komentar aman..." aria-label="Tulis komentar" onkeydown={(event) => event.key === 'Enter' && addComment()} />
        <button type="button" disabled={!commentPolicy.canKirim} onclick={addComment}>Kirim</button>
      </div>
      {#if commentDraft.trim().length > 0 && commentPolicy.errors.length > 0}
        <small class="comment-error">{commentPolicy.errors[0]}</small>
      {/if}
    </section>
  {/if}

  <footer class="post-tools">
    <small>{post.status === 'local' ? 'Tersimpan aman · belum penyimpanan akun' : post.status}</small>
    <div>
      <button type="button" onclick={() => hideSocialPost(post.id)}>Sembunyikan</button>
      <button type="button" disabled={post.viewer.reported} onclick={() => reportSocialPost(post.id, 'unsafe')}>
        {post.viewer.reported ? 'Dilaporkan' : 'Report'}
      </button>
    </div>
  </footer>
</article>

<style>
  .social-post-card {
    display: grid;
    gap: 12px;
    padding: 14px;
    border: 1px solid var(--spark-line);
    border-radius: 24px;
    background: var(--spark-card);
    box-shadow: 0 10px 26px rgba(5, 9, 78, 0.06);
  }

  .post-head {
    display: grid;
    grid-template-columns: 42px minmax(0, 1fr) auto;
    gap: 10px;
    align-items: center;
  }

  .avatar,
  .comment-row > span {
    display: grid;
    place-items: center;
    border-radius: 15px;
    color: #fff;
    background: linear-gradient(135deg, var(--spark-blue), var(--spark-blue-strong));
    font-weight: 800;
  }

  .avatar {
    width: 40px;
    height: 40px;
  }

  .author-row {
    display: flex;
    gap: 7px;
    align-items: center;
    min-width: 0;
  }

  .author-row strong {
    color: var(--spark-navy);
    font-size: 14px;
    line-height: 1.1;
  }

  :global([data-theme='dark']) .author-row strong { color: #fff; }

  .author-row em {
    padding: 3px 6px;
    border-radius: 999px;
    background: rgba(34, 183, 122, 0.12);
    color: var(--spark-green);
    font-size: 10px;
    font-style: normal;
    font-weight: 760;
  }

  .post-head small,
  .post-tools small {
    color: var(--spark-muted);
    font-size: 11px;
    line-height: 1.25;
  }

  .follow-btn {
    min-height: 32px;
    padding: 0 10px;
    border: 1px solid var(--spark-line);
    border-radius: 999px;
    background: rgba(255,255,255,.58);
    color: var(--spark-blue-strong);
    font-size: 11.5px;
    font-weight: 700;
  }

  :global([data-theme='dark']) .follow-btn { background: rgba(255,255,255,.055); }

  .follow-btn.active {
    background: rgba(31, 117, 255, 0.1);
    border-color: rgba(31, 117, 255, 0.28);
  }

  .post-body {
    margin: 0;
    color: var(--spark-ink);
    font-size: 13.5px;
    line-height: 1.6;
  }

  :global([data-theme='dark']) .post-body { color: #e5edff; }

  .tag-row,
  .post-actions,
  .post-tools,
  .post-tools div {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    align-items: center;
  }

  .tag-row span {
    color: var(--spark-blue-strong);
    font-size: 11.5px;
    font-weight: 680;
  }

  .post-actions {
    padding-top: 2px;
  }

  .post-actions button,
  .post-tools button,
  .comment-compose button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-height: 33px;
    padding: 0 9px;
    border: 1px solid var(--spark-line);
    border-radius: 999px;
    background: rgba(255,255,255,.56);
    color: var(--spark-muted);
    font-size: 11.5px;
    font-weight: 680;
  }

  :global([data-theme='dark']) .post-actions button,
  :global([data-theme='dark']) .post-tools button,
  :global([data-theme='dark']) .comment-compose button { background: rgba(255,255,255,.055); }

  .post-actions button.active {
    color: var(--spark-blue-strong);
    background: rgba(31, 117, 255, 0.1);
    border-color: rgba(31, 117, 255, 0.28);
  }

  .post-actions span {
    color: currentColor;
    opacity: .72;
  }

  .comment-thread {
    display: grid;
    gap: 9px;
    padding: 11px;
    border: 1px solid var(--spark-line);
    border-radius: 18px;
    background: rgba(248, 251, 255, 0.66);
  }

  :global([data-theme='dark']) .comment-thread { background: rgba(255,255,255,.04); }

  .empty-comment {
    margin: 0;
    color: var(--spark-muted);
    font-size: 12px;
    line-height: 1.4;
  }

  .comment-row {
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr);
    gap: 8px;
    align-items: start;
  }

  .comment-row > span {
    width: 28px;
    height: 28px;
    border-radius: 11px;
    font-size: 11px;
  }

  .comment-row p {
    margin: 0;
    color: var(--spark-muted);
    font-size: 12px;
    line-height: 1.45;
  }

  .comment-row strong {
    color: var(--spark-navy);
    font-size: 12px;
  }

  :global([data-theme='dark']) .comment-row strong { color: #fff; }

  .comment-compose {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px;
  }

  .comment-compose input {
    width: 100%;
    min-height: 36px;
    padding: 0 11px;
    border: 1px solid var(--spark-line);
    border-radius: 999px;
    background: rgba(255,255,255,.7);
    color: var(--spark-ink);
    outline: none;
    font-size: 12.5px;
  }

  :global([data-theme='dark']) .comment-compose input { background: rgba(255,255,255,.06); }

  .comment-error {
    color: #b42318;
    font-size: 11.5px;
  }

  .post-tools {
    justify-content: space-between;
    padding-top: 2px;
  }

  @media (max-width: 520px) {
    .social-post-card { padding: 12px; border-radius: 20px; }
    .post-head { grid-template-columns: 38px minmax(0, 1fr); }
    .follow-btn { grid-column: 2; width: fit-content; }
    .avatar { width: 36px; height: 36px; border-radius: 14px; }
    .post-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .post-actions button { width: 100%; }
  }


/* KARYRA PASS 37A SOCIAL CSS SCOPE WARNING FIX: parent theme selectors are global; local classes remain scoped. */
</style>
