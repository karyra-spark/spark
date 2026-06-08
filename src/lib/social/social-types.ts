import type { z } from 'zod';
import type {
  socialCommentSchema,
  socialEventKindSchema,
  socialEventSchema,
  socialPostKindSchema,
  socialPostSchema,
  socialProfileSchema,
  socialReactionKindSchema,
  socialSnapshotSchema,
  socialSyncStatusSchema,
  socialVisibilitySchema
} from './social-schema';

export type SocialPostKind = z.infer<typeof socialPostKindSchema>;
export type SocialVisibility = z.infer<typeof socialVisibilitySchema>;
export type SocialSyncStatus = z.infer<typeof socialSyncStatusSchema>;
export type SocialReactionKind = z.infer<typeof socialReactionKindSchema>;
export type SocialEventKind = z.infer<typeof socialEventKindSchema>;
export type SocialProfile = z.infer<typeof socialProfileSchema>;
export type SocialPost = z.infer<typeof socialPostSchema>;
export type SocialComment = z.infer<typeof socialCommentSchema>;
export type SocialEvent = z.infer<typeof socialEventSchema>;
export type SocialSnapshot = z.infer<typeof socialSnapshotSchema>;

export type SocialFeedFilter = SocialPostKind | 'all';

export type SocialDraftInput = {
  body: string;
  kind: SocialPostKind;
  tags?: string[];
  visibility?: SocialVisibility;
};

export type SocialCommentInput = {
  postId: string;
  body: string;
};

export type SocialReportReason = 'secret-risk' | 'spam' | 'misleading' | 'unsafe' | 'other';
