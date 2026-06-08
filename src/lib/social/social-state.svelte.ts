import { socialSnapshotSchema } from './social-schema';
import { SOCIAL_VIEWER_ID, socialSeedComments, socialSeedPosts } from './social-model';
import type { SocialComment, SocialEvent, SocialFeedFilter, SocialPost } from './social-types';

const STORAGE_KEY = 'karyra-spark-social-state-v1';

export const socialState = $state({
  ready: false,
  activeFilter: 'all' as SocialFeedFilter,
  followedProfileIds: ['facilitator-ayu', 'mentor-bima'] as string[],
  mutedProfileIds: [] as string[],
  posts: structuredClone(socialSeedPosts) as SocialPost[],
  comments: structuredClone(socialSeedComments) as Record<string, SocialComment[]>,
  events: [] as SocialEvent[]
});


export function restoreSocialState() {
  if (typeof window === 'undefined' || socialState.ready) return;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = socialSnapshotSchema.safeParse(JSON.parse(raw));
      if (parsed.success) {
        socialState.activeFilter = parsed.data.activeFilter;
        socialState.followedProfileIds = parsed.data.followedProfileIds;
        socialState.mutedProfileIds = parsed.data.mutedProfileIds;
        socialState.posts = parsed.data.posts;
        socialState.comments = parsed.data.comments;
        socialState.events = parsed.data.events;
      }
    }
  } catch {
    // Keep seed state if local storage is unreadable.
  }

  socialState.ready = true;
}

export function saveSocialState() {
  if (typeof window === 'undefined' || !socialState.ready) return;

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      version: 1,
      activeFilter: socialState.activeFilter,
      followedProfileIds: socialState.followedProfileIds,
      mutedProfileIds: socialState.mutedProfileIds,
      posts: socialState.posts,
      comments: socialState.comments,
      events: socialState.events.slice(0, 80)
    })
  );
}

export function resetSocialState() {
  socialState.activeFilter = 'all';
  socialState.followedProfileIds = ['facilitator-ayu', 'mentor-bima'];
  socialState.mutedProfileIds = [];
  socialState.posts = structuredClone(socialSeedPosts) as SocialPost[];
  socialState.comments = structuredClone(socialSeedComments) as Record<string, SocialComment[]>;
  socialState.events = [];
  saveSocialState();
}

export function setSocialFilter(filter: SocialFeedFilter) {
  socialState.activeFilter = filter;
}

export function markSocialEventsRead() {
  socialState.events = socialState.events.map((event) => ({ ...event, read: true }));
}

export function isViewerPost(post: SocialPost) {
  return post.authorId === SOCIAL_VIEWER_ID;
}
