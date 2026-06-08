import type { SocialCommentInput, SocialDraftInput, SocialReactionKind, SocialReportReason } from './social-types';

export type SocialGateway = {
  createPost(input: SocialDraftInput): void;
  toggleReaction(postId: string, reaction: SocialReactionKind): void;
  addComment(input: SocialCommentInput): void;
  toggleFollow(profileId: string): void;
  hidePost(postId: string): void;
  reportPost(postId: string, reason: SocialReportReason): void;
  sharePost(postId: string): void;
};

export type SocialBackendContract = {
  mode: 'local' | 'rest' | 'realtime';
  gateway: SocialGateway;
};
