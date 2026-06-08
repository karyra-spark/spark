export type AppFlowStep = {
  href: string;
  title: string;
  copy: string;
  icon: string;
  signal: 'account' | 'core' | 'lesson' | 'lab' | 'passport' | 'community' | 'hub';
};

export const appFlowSteps: AppFlowStep[] = [
  {
    href: '/login',
    title: 'Masuk',
    copy: 'Gunakan akun contoh lokal agar flow terasa seperti aplikasi nyata.',
    icon: 'login',
    signal: 'account'
  },
  {
    href: '/core',
    title: 'Mulai Core',
    copy: 'Bangun fondasi blockchain, Web3, dan Starknet dari lesson utama.',
    icon: 'book-open',
    signal: 'core'
  },
  {
    href: '/lesson/why-blockchain',
    title: 'Selesaikan Lesson',
    copy: 'Baca lesson, jawab checkpoint, lalu tandai selesai.',
    icon: 'check',
    signal: 'lesson'
  },
  {
    href: '/lab',
    title: 'Practice Lab',
    copy: 'Masuk simulasi aman dan placeholder mode penjelajah.',
    icon: 'flask-conical',
    signal: 'lab'
  },
  {
    href: '/profile',
    title: 'Passport',
    copy: 'Lihat readiness, bukti perjalanan, dan status Hub.',
    icon: 'badge',
    signal: 'passport'
  },
  {
    href: '/community',
    title: 'Komunitas',
    copy: 'Lihat workshop, cohort, dan aktivasi komunitas lokal.',
    icon: 'users',
    signal: 'community'
  }
];

export const fallbackActions = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: 'dashboard'
  },
  {
    href: '/core',
    label: 'Core',
    icon: 'book-open'
  },
  {
    href: '/login',
    label: 'Masuk',
    icon: 'login'
  }
];
