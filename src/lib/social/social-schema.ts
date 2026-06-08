import { z } from 'zod';

export const socialPostKindSchema = z.enum(['progress', 'question', 'resource', 'workshop', 'lab']);
export const socialVisibilitySchema = z.enum(['community', 'followers', 'public']);
export const socialSyncStatusSchema = z.enum(['local', 'pending', 'synced', 'failed']);
export const socialReactionKindSchema = z.enum(['support', 'helpful', 'inspiring']);
export const socialEventKindSchema = z.enum([
  'post.created',
  'post.hidden',
  'post.reported',
  'post.shared',
  'reaction.toggled',
  'comment.created',
  'follow.toggled'
]);

export const socialProfileSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(80),
  handle: z.string().min(1).max(40),
  role: z.enum(['learner', 'facilitator', 'mentor', 'spark']),
  location: z.string().max(80).optional(),
  bio: z.string().max(180).optional(),
  avatarLabel: z.string().min(1).max(3),
  trusted: z.boolean().default(false)
});

export const socialPostSchema = z.object({
  id: z.string().min(1),
  authorId: z.string().min(1),
  kind: socialPostKindSchema,
  body: z.string().min(1).max(720),
  tags: z.array(z.string().min(1).max(32)).max(8),
  visibility: socialVisibilitySchema,
  createdAt: z.string().min(1),
  updatedAt: z.string().optional(),
  stats: z.object({
    support: z.number().int().nonnegative(),
    helpful: z.number().int().nonnegative(),
    inspiring: z.number().int().nonnegative(),
    comments: z.number().int().nonnegative(),
    shares: z.number().int().nonnegative()
  }),
  viewer: z.object({
    reaction: socialReactionKindSchema.optional(),
    hidden: z.boolean().default(false),
    reported: z.boolean().default(false)
  }),
  status: socialSyncStatusSchema
});

export const socialCommentSchema = z.object({
  id: z.string().min(1),
  postId: z.string().min(1),
  authorId: z.string().min(1),
  body: z.string().min(1).max(360),
  createdAt: z.string().min(1),
  status: socialSyncStatusSchema
});

export const socialEventSchema = z.object({
  id: z.string().min(1),
  kind: socialEventKindSchema,
  actorId: z.string().min(1),
  targetId: z.string().min(1),
  createdAt: z.string().min(1),
  title: z.string().min(1).max(100),
  copy: z.string().min(1).max(180),
  href: z.string().min(1),
  read: z.boolean().default(false)
});

export const socialSnapshotSchema = z.object({
  version: z.literal(1),
  activeFilter: z.union([socialPostKindSchema, z.literal('all')]),
  followedProfileIds: z.array(z.string()),
  mutedProfileIds: z.array(z.string()),
  posts: z.array(socialPostSchema),
  comments: z.record(z.string(), z.array(socialCommentSchema)),
  events: z.array(socialEventSchema)
});
