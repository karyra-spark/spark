export type DashboardAction = {
  href: string;
  title: string;
  copy: string;
  icon: string;
  tone: 'blue' | 'green' | 'purple' | 'orange' | 'pink';
};

export const dashboardActions: DashboardAction[] = [
  {
    href: '/core',
    title: 'Lanjut Core',
    copy: 'Masuk ke jalur belajar utama dan lanjutkan lesson berikutnya.',
    icon: 'book-open',
    tone: 'blue'
  },
  {
    href: '/lab',
    title: 'Practice Lab',
    copy: 'Ubah pemahaman menjadi latihan aman dan proof-of-practice.',
    icon: 'flask-conical',
    tone: 'purple'
  },
  {
    href: '/community',
    title: 'Komunitas',
    copy: 'Ikut workshop, cohort, dan aktivitas komunitas lokal.',
    icon: 'users',
    tone: 'pink'
  },
  {
    href: '/hub',
    title: 'Spark Hub',
    copy: 'Jelajahi resource dan ekosistem setelah readiness cukup.',
    icon: 'compass',
    tone: 'green'
  }
];

export const dashboardModes = [
  {
    key: 'beginner',
    title: 'Pemula',
    copy: 'Bahasa sederhana dan konteks sehari-hari.',
    icon: 'shield'
  },
  {
    key: 'guided',
    title: 'Terarah',
    copy: 'Lebih ringkas dengan guardrail yang jelas.',
    icon: 'layers'
  },
  {
    key: 'explorer',
    title: 'Penjelajah',
    copy: 'Jalur teknis, Lab advanced, dan preview Starknet.',
    icon: 'zap'
  }
] as const;
