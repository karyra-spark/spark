import { cloneDefaultManagedContent, type ManagedPageCopy } from '$lib/content-managed/spark-managed-content';

export const PUBLIC_CONTENT_BUILDER_VERSION = 1;

export type PublicContentSlotKey =
  | 'eyebrow'
  | 'title'
  | 'copy'
  | 'primaryCta'
  | 'secondaryCta'
  | 'note';

export type PublicContentSlotKind = 'text' | 'textarea' | 'cta' | 'note';

export type PublicContentSlot = {
  enabled: boolean;
  text: string;
  href?: string;
};

export type PublicContentBlock = {
  id: string;
  page: string;
  section: string;
  status: 'draft' | 'published' | 'archived';
  slots: Record<PublicContentSlotKey, PublicContentSlot>;
};

export type PublicContentOverride = {
  version: number;
  updated_at: string;
  blocks: PublicContentBlock[];
};

export const PUBLIC_CONTENT_SLOT_DEFINITIONS: {
  key: PublicContentSlotKey;
  label: string;
  hint: string;
  kind: PublicContentSlotKind;
}[] = [
  {
    key: 'eyebrow',
    label: 'Label kecil',
    hint: 'Biasanya teks kecil di atas judul. Sering bisa dihapus jika halaman terlalu ramai.',
    kind: 'text'
  },
  {
    key: 'title',
    label: 'Judul',
    hint: 'Kalimat utama. Biasanya tetap aktif, tapi bisa diganti menjadi lebih pendek.',
    kind: 'text'
  },
  {
    key: 'copy',
    label: 'Copy',
    hint: 'Deskripsi pendukung. Matikan jika judul sudah cukup jelas.',
    kind: 'textarea'
  },
  {
    key: 'primaryCta',
    label: 'CTA utama',
    hint: 'Aksi utama. Bisa dimatikan jika blok tidak perlu tombol.',
    kind: 'cta'
  },
  {
    key: 'secondaryCta',
    label: 'CTA kedua',
    hint: 'Aksi sekunder. Matikan jika membuat pilihan terlalu banyak.',
    kind: 'cta'
  },
  {
    key: 'note',
    label: 'Catatan kecil',
    hint: 'Microcopy tambahan. Biasanya opsional dan sering bisa dihapus dari UI publik.',
    kind: 'note'
  }
];

export function createSlot(text: string | null | undefined, href?: string | null): PublicContentSlot {
  const cleanText = typeof text === 'string' ? text : '';
  const cleanHref = typeof href === 'string' ? href : '';
  return {
    enabled: cleanText.trim().length > 0,
    text: cleanText,
    ...(cleanHref ? { href: cleanHref } : {})
  };
}

export function copyToPublicContentBlock(copy: ManagedPageCopy): PublicContentBlock {
  return {
    id: copy.id,
    page: copy.page,
    section: copy.section,
    status: copy.status,
    slots: {
      eyebrow: createSlot(copy.eyebrow),
      title: createSlot(copy.title),
      copy: createSlot(copy.description),
      primaryCta: createSlot(copy.primaryCtaLabel, copy.primaryCtaHref),
      secondaryCta: createSlot(copy.secondaryCtaLabel, copy.secondaryCtaHref),
      note: createSlot(copy.note)
    }
  };
}

export function createDefaultPublicContentBlocks(): PublicContentBlock[] {
  return cloneDefaultManagedContent().appCopy.map(copyToPublicContentBlock);
}

function normalizeSlot(slot: unknown, fallback: PublicContentSlot): PublicContentSlot {
  if (!slot || typeof slot !== 'object') return fallback;
  const candidate = slot as Partial<PublicContentSlot>;
  const text = typeof candidate.text === 'string' ? candidate.text : fallback.text;
  const href = typeof candidate.href === 'string' ? candidate.href : fallback.href;
  return {
    enabled: typeof candidate.enabled === 'boolean' ? candidate.enabled : fallback.enabled,
    text,
    ...(href ? { href } : {})
  };
}

export function normalizePublicContentBlock(input: unknown, fallback: PublicContentBlock): PublicContentBlock {
  if (!input || typeof input !== 'object') return fallback;
  const candidate = input as Partial<PublicContentBlock>;
  const candidateSlots = candidate.slots && typeof candidate.slots === 'object' ? candidate.slots : {};

  return {
    id: typeof candidate.id === 'string' && candidate.id.trim() ? candidate.id : fallback.id,
    page: typeof candidate.page === 'string' && candidate.page.trim() ? candidate.page : fallback.page,
    section: typeof candidate.section === 'string' && candidate.section.trim() ? candidate.section : fallback.section,
    status:
      candidate.status === 'draft' || candidate.status === 'published' || candidate.status === 'archived'
        ? candidate.status
        : fallback.status,
    slots: {
      eyebrow: normalizeSlot((candidateSlots as Partial<Record<PublicContentSlotKey, unknown>>).eyebrow, fallback.slots.eyebrow),
      title: normalizeSlot((candidateSlots as Partial<Record<PublicContentSlotKey, unknown>>).title, fallback.slots.title),
      copy: normalizeSlot((candidateSlots as Partial<Record<PublicContentSlotKey, unknown>>).copy, fallback.slots.copy),
      primaryCta: normalizeSlot((candidateSlots as Partial<Record<PublicContentSlotKey, unknown>>).primaryCta, fallback.slots.primaryCta),
      secondaryCta: normalizeSlot((candidateSlots as Partial<Record<PublicContentSlotKey, unknown>>).secondaryCta, fallback.slots.secondaryCta),
      note: normalizeSlot((candidateSlots as Partial<Record<PublicContentSlotKey, unknown>>).note, fallback.slots.note)
    }
  };
}

export function normalizePublicContentOverride(input: unknown): PublicContentOverride {
  const defaults = createDefaultPublicContentBlocks();
  const fallback: PublicContentOverride = {
    version: PUBLIC_CONTENT_BUILDER_VERSION,
    updated_at: '',
    blocks: defaults
  };

  if (!input || typeof input !== 'object') return fallback;
  const candidate = input as Partial<PublicContentOverride>;
  const incomingBlocks = Array.isArray(candidate.blocks) ? candidate.blocks : [];
  const incomingById = new Map<string, unknown>();

  for (const block of incomingBlocks) {
    if (block && typeof block === 'object' && typeof (block as PublicContentBlock).id === 'string') {
      incomingById.set((block as PublicContentBlock).id, block);
    }
  }

  return {
    version: PUBLIC_CONTENT_BUILDER_VERSION,
    updated_at: typeof candidate.updated_at === 'string' ? candidate.updated_at : '',
    blocks: defaults.map((block) => normalizePublicContentBlock(incomingById.get(block.id), block))
  };
}

export function makePublicContentOverride(blocks: PublicContentBlock[]): PublicContentOverride {
  return {
    version: PUBLIC_CONTENT_BUILDER_VERSION,
    updated_at: new Date().toISOString(),
    blocks
  };
}

export function isSlotVisible(block: PublicContentBlock | null | undefined, key: PublicContentSlotKey) {
  const slot = block?.slots[key];
  if (!slot || !slot.enabled) return false;
  if (key === 'primaryCta' || key === 'secondaryCta') return slot.text.trim().length > 0 && Boolean(slot.href?.trim());
  return slot.text.trim().length > 0;
}

export function slotText(block: PublicContentBlock, key: PublicContentSlotKey) {
  return block.slots[key]?.text ?? '';
}

export function slotHref(block: PublicContentBlock, key: PublicContentSlotKey) {
  return block.slots[key]?.href ?? '';
}
