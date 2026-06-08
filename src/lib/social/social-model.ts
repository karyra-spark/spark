import type { SocialComment, SocialPost, SocialProfile } from './social-types';

export const SOCIAL_VIEWER_ID = 'local-viewer';

export const socialPostKindLabels = {
  all: 'Semua',
  progress: 'Perkembangan',
  question: 'Pertanyaan',
  resource: 'Rujukan',
  workshop: 'Workshop',
  lab: 'Lab'
} as const;

export const socialPostKindHints = {
  progress: 'Bagikan perkembangan kecil dari proses belajar.',
  question: 'Tanyakan bagian yang masih membingungkan.',
  resource: 'Bagikan rujukan yang aman dan relevan.',
  workshop: 'Koordinasikan event, cohort, atau meetup lokal.',
  lab: 'Bagikan latihan aman dari Lab.'
} as const;

export const socialProfiles: SocialProfile[] = [
  {
    id: SOCIAL_VIEWER_ID,
    name: 'Learner Lokal',
    handle: '@learner-lokal',
    role: 'learner',
    location: 'Mode lokal',
    bio: 'Profil lokal untuk mencoba ruang diskusi sebelum backend aktif.',
    avatarLabel: 'L',
    trusted: false
  },
  {
    id: 'facilitator-ayu',
    name: 'Ayu Fasilitator',
    handle: '@ayu-workshop',
    role: 'facilitator',
    location: 'Workshop lokal',
    bio: 'Membantu pemula belajar blockchain dengan bahasa sederhana.',
    avatarLabel: 'A',
    trusted: true
  },
  {
    id: 'mentor-bima',
    name: 'Bima Mentor',
    handle: '@bima-lab',
    role: 'mentor',
    location: 'Lab praktik',
    bio: 'Fokus pada wallet safety dan readiness sebelum testnet.',
    avatarLabel: 'B',
    trusted: true
  },
  {
    id: 'spark-guide',
    name: 'Spark Guide',
    handle: '@spark-guide',
    role: 'spark',
    location: 'Karyra Spark',
    bio: 'Pengingat aman untuk belajar bertahap.',
    avatarLabel: 'S',
    trusted: true
  }
];

export const socialSeedPosts: SocialPost[] = [
  {
    id: 'seed-progress-core',
    authorId: 'facilitator-ayu',
    kind: 'progress',
    body: 'Hari ini cohort pemula menyelesaikan topik wallet safety. Fokusnya bukan membuat wallet dulu, tapi memahami risiko, istilah dasar, dan kebiasaan aman.',
    tags: ['wallet-safety', 'cohort', 'pemula'],
    visibility: 'community',
    createdAt: '2026-06-04T02:10:00.000Z',
    stats: { support: 8, helpful: 5, inspiring: 3, comments: 2, shares: 1 },
    viewer: { hidden: false, reported: false },
    status: 'local'
  },
  {
    id: 'seed-question-starknet',
    authorId: 'mentor-bima',
    kind: 'question',
    body: 'Pertanyaan untuk diskusi: bagian mana dari Starknet yang paling membingungkan untuk pemula, account abstraction, testnet, atau istilah L2?',
    tags: ['starknet', 'diskusi', 'pemula'],
    visibility: 'community',
    createdAt: '2026-06-03T14:20:00.000Z',
    stats: { support: 4, helpful: 9, inspiring: 2, comments: 3, shares: 0 },
    viewer: { hidden: false, reported: false },
    status: 'local'
  },
  {
    id: 'seed-resource-safe-path',
    authorId: 'spark-guide',
    kind: 'resource',
    body: 'Rujukan aman minggu ini: mulai dari Core, catat istilah yang belum jelas, lalu buka Lab hanya untuk simulasi. Jangan pernah membagikan seed phrase, private key, atau kode pemulihan.',
    tags: ['safety', 'core', 'lab'],
    visibility: 'community',
    createdAt: '2026-06-03T09:00:00.000Z',
    stats: { support: 12, helpful: 11, inspiring: 4, comments: 1, shares: 2 },
    viewer: { reaction: 'helpful', hidden: false, reported: false },
    status: 'local'
  }
];

export const socialSeedComments: Record<string, SocialComment[]> = {
  'seed-progress-core': [
    {
      id: 'seed-comment-1',
      postId: 'seed-progress-core',
      authorId: 'mentor-bima',
      body: 'Bagus. Aku suka karena ritmenya tidak memaksa pemula langsung transaksi.',
      createdAt: '2026-06-04T02:24:00.000Z',
      status: 'local'
    },
    {
      id: 'seed-comment-2',
      postId: 'seed-progress-core',
      authorId: SOCIAL_VIEWER_ID,
      body: 'Bagian checklist wallet safety paling membantu untuk menjelaskan ke teman baru.',
      createdAt: '2026-06-04T02:39:00.000Z',
      status: 'local'
    }
  ],
  'seed-question-starknet': [
    {
      id: 'seed-comment-3',
      postId: 'seed-question-starknet',
      authorId: 'facilitator-ayu',
      body: 'Untuk pemula, istilah L2 dan testnet biasanya perlu analogi yang paling sederhana dulu.',
      createdAt: '2026-06-03T15:10:00.000Z',
      status: 'local'
    }
  ],
  'seed-resource-safe-path': []
};

export function getSocialProfile(profileId: string) {
  return socialProfiles.find((profile) => profile.id === profileId) ?? socialProfiles[0];
}
