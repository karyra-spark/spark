import { SOCIAL_VIEWER_ID } from './social-model';
import type { SocialEvent, SocialEventKind } from './social-types';

function createLocalId(prefix: string) {
  const value = globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${value}`;
}

export function createSocialEvent(input: {
  kind: SocialEventKind;
  actorId?: string;
  targetId: string;
  title: string;
  copy: string;
  href?: string;
}): SocialEvent {
  return {
    id: createLocalId('evt'),
    kind: input.kind,
    actorId: input.actorId ?? SOCIAL_VIEWER_ID,
    targetId: input.targetId,
    createdAt: new Date().toISOString(),
    title: input.title,
    copy: input.copy,
    href: input.href ?? '/community#social-layer',
    read: false
  };
}

export function createSocialId(prefix: string) {
  return createLocalId(prefix);
}
