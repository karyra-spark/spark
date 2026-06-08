export type HomeQuickCard = {
  href: string;
  title: string;
  copy: string;
  icon: string;
  tone: 'blue' | 'green' | 'purple' | 'orange' | 'pink';
};

export type HomePathCard = {
  href: string;
  key: 'beginner' | 'guided' | 'explorer';
  title: string;
  copy: string;
  icon: string;
  tone: 'blue' | 'green' | 'purple' | 'orange' | 'pink';
  meta: string;
};

export type ReadinessStep = {
  key: string;
  label: string;
  href: string;
  icon: string;
};

export const homeQuickCards: HomeQuickCard[] = [
  {
    href: '/core',
    title: 'Spark Core',
    copy: 'Mulai dari fondasi blockchain, cryptocurrency, Web3, dan Starknet.',
    icon: 'book-open',
    tone: 'blue'
  },
  {
    href: '/lab',
    title: 'Practice Lab',
    copy: 'Latihan simulasi dan testnet-first sebelum praktik lebih jauh.',
    icon: 'flask-conical',
    tone: 'purple'
  },
  {
    href: '/profile',
    title: 'Readiness Passport',
    copy: 'Pantau bukti belajar, praktik aman, komunitas, dan kesiapan Hub.',
    icon: 'badge',
    tone: 'green'
  },
  {
    href: '/community',
    title: 'Komunitas',
    copy: 'Hubungkan proses belajar dengan workshop, cohort, dan dukungan lokal.',
    icon: 'users',
    tone: 'pink'
  }
];

export const homePathCards: HomePathCard[] = [
  {
    href: '/core',
    key: 'beginner',
    title: 'Jalur Awal',
    copy: 'Untuk pengguna yang baru mengenal blockchain dan ingin belajar pelan.',
    icon: 'shield',
    tone: 'blue',
    meta: 'Pemula'
  },
  {
    href: '/core',
    key: 'guided',
    title: 'Jalur Terarah',
    copy: 'Untuk pengguna yang sudah punya dasar dan ingin bergerak lebih ringkas.',
    icon: 'layers',
    tone: 'green',
    meta: 'Terarah'
  },
  {
    href: '/core',
    key: 'explorer',
    title: 'Jalur Penjelajah',
    copy: 'Untuk pengguna yang siap melihat Starknet, testnet, dan bagian teknis.',
    icon: 'zap',
    tone: 'purple',
    meta: 'Teknis'
  }
];

export const readinessSteps: ReadinessStep[] = [
  {
    key: 'core',
    label: 'Core',
    href: '/core',
    icon: 'book-open'
  },
  {
    key: 'checkpoint',
    label: 'Checkpoint',
    href: '/lesson/why-blockchain',
    icon: 'check'
  },
  {
    key: 'lab',
    label: 'Practice Lab',
    href: '/lab',
    icon: 'flask-conical'
  },
  {
    key: 'community',
    label: 'Community',
    href: '/community',
    icon: 'users'
  },
  {
    key: 'passport',
    label: 'Passport',
    href: '/profile',
    icon: 'badge'
  },
  {
    key: 'hub',
    label: 'Hub',
    href: '/hub',
    icon: 'compass'
  }
];
