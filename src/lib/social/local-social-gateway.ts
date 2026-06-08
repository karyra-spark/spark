import { createSocialEvent, createSocialId } from './social-events';
import { enqueueSyncEvent } from '$lib/sync/sync-event-queue.svelte';
import type { SyncEventName } from '$lib/sync/sync-types';
import { SOCIAL_VIEWER_ID } from './social-model';
import { evaluateSocialComment, evaluateSocialDraft, extractSocialTags } from './social-policy';
import { socialState } from './social-state.svelte';
import type { SocialComment, SocialCommentInput, SocialDraftInput, SocialPost, SocialReactionKind, SocialReportReason } from './social-types';

function pushEvent(event: ReturnType<typeof createSocialEvent>) {
  socialState.events = [event, ...socialState.events].slice(0, 80);
  enqueueSyncEvent({
    name: `social.${event.kind}` as SyncEventName,
    entity: 'social',
    action: event.kind,
    subjectId: event.targetId,
    payload: { eventId: event.id, title: event.title, href: event.href }
  });
}

export function createSocialPost(input: SocialDraftInput) {
  const policy = evaluateSocialDraft(input.body);
  if (!policy.canKirim) return;

  const post: SocialPost = {
    id: createSocialId('post'),
    authorId: SOCIAL_VIEWER_ID,
    kind: input.kind,
    body: policy.normalized,
    tags: input.tags?.length ? input.tags.slice(0, 6) : extractSocialTags(policy.normalized, input.kind),
    visibility: input.visibility ?? 'community',
    createdAt: new Date().toISOString(),
    stats: { support: 0, helpful: 0, inspiring: 0, comments: 0, shares: 0 },
    viewer: { hidden: false, reported: false },
    status: 'local'
  };

  socialState.posts = [post, ...socialState.posts];
  socialState.comments = { ...socialState.comments, [post.id]: [] };
  pushEvent(
    createSocialEvent({
      kind: 'post.created',
      targetId: post.id,
      title: 'Postingan terkirim',
      copy: 'Postingan sudah muncul di Ruang Diskusi.',
      href: `/community#${post.id}`
    })
  );
}

export function toggleSocialReaction(postId: string, reaction: SocialReactionKind) {
  socialState.posts = socialState.posts.map((post) => {
    if (post.id !== postId) return post;

    const previous = post.viewer.reaction;
    const stats = { ...post.stats };
    if (previous) stats[previous] = Math.max(0, stats[previous] - 1);
    const nextReaction = previous === reaction ? undefined : reaction;
    if (nextReaction) stats[nextReaction] += 1;

    return { ...post, stats, viewer: { ...post.viewer, reaction: nextReaction } };
  });

  pushEvent(
    createSocialEvent({
      kind: 'reaction.toggled',
      targetId: postId,
      title: 'Reaksi disimpan',
      copy: 'Terima kasih sudah memberi respons.',
      href: `/community#${postId}`
    })
  );
}

export function addSocialComment(input: SocialCommentInput) {
  const policy = evaluateSocialComment(input.body);
  if (!policy.canKirim) return;

  const comment: SocialComment = {
    id: createSocialId('comment'),
    postId: input.postId,
    authorId: SOCIAL_VIEWER_ID,
    body: policy.normalized,
    createdAt: new Date().toISOString(),
    status: 'local'
  };

  const existing = socialState.comments[input.postId] ?? [];
  socialState.comments = { ...socialState.comments, [input.postId]: [...existing, comment] };
  socialState.posts = socialState.posts.map((post) =>
    post.id === input.postId ? { ...post, stats: { ...post.stats, comments: post.stats.comments + 1 } } : post
  );

  pushEvent(
    createSocialEvent({
      kind: 'comment.created',
      targetId: input.postId,
      title: 'Komentar terkirim',
      copy: 'Komentar sudah muncul di percakapan ini.',
      href: `/community#${input.postId}`
    })
  );
}

export function toggleSocialFollow(profileId: string) {
  if (profileId === SOCIAL_VIEWER_ID) return;
  const followed = socialState.followedProfileIds.includes(profileId);
  socialState.followedProfileIds = followed
    ? socialState.followedProfileIds.filter((id) => id !== profileId)
    : [...socialState.followedProfileIds, profileId];

  pushEvent(
    createSocialEvent({
      kind: 'follow.toggled',
      targetId: profileId,
      title: followed ? 'Berhenti mengikuti' : 'Mulai mengikuti',
      copy: followed ? 'Profil ini tidak lagi diikuti.' : 'Profil ini sekarang diikuti.',
      href: '/community?tab=diskusi#diskusi'
    })
  );
}

export function hideSocialPost(postId: string) {
  socialState.posts = socialState.posts.map((post) =>
    post.id === postId ? { ...post, viewer: { ...post.viewer, hidden: true } } : post
  );
  pushEvent(
    createSocialEvent({
      kind: 'post.hidden',
      targetId: postId,
      title: 'Post disembunyikan',
      copy: 'Postingan tidak lagi muncul di Ruang Diskusi kamu.',
      href: '/community?tab=diskusi#diskusi'
    })
  );
}

export function reportSocialPost(postId: string, reason: SocialReportReason = 'other') {
  socialState.posts = socialState.posts.map((post) =>
    post.id === postId ? { ...post, viewer: { ...post.viewer, reported: true } } : post
  );
  pushEvent(
    createSocialEvent({
      kind: 'post.reported',
      targetId: postId,
      title: 'Laporan dikirim',
      copy: `Laporan diterima. Alasan: ${reason}.`,
      href: '/community?tab=diskusi#diskusi'
    })
  );
}

export function shareSocialPost(postId: string) {
  socialState.posts = socialState.posts.map((post) =>
    post.id === postId ? { ...post, stats: { ...post.stats, shares: post.stats.shares + 1 } } : post
  );
  pushEvent(
    createSocialEvent({
      kind: 'post.shared',
      targetId: postId,
      title: 'Link post disalin',
      copy: 'Link postingan siap dibagikan.',
      href: `/community#${postId}`
    })
  );
}
