export type SparkNavKey = 'gateway' | 'dashboard' | 'core' | 'lab' | 'community' | 'passport' | 'profile' | 'hub' | 'settings';

export type SparkNavItem = {
  key: SparkNavKey;
  href: string;
  label: string;
  shortLabel: string;
  copy: string;
  icon: string;
  primary?: boolean;
};

export const sparkNavItems: SparkNavItem[] = [
  {
    key: 'gateway',
    href: '/',
    label: 'Beranda',
    shortLabel: 'Beranda',
    copy: 'Mulai dari jalur aman Spark',
    icon: 'home',
    primary: true
  },
  {
    key: 'dashboard',
    href: '/dashboard',
    label: 'Ringkasan',
    shortLabel: 'Saya',
    copy: 'Lanjutkan progres belajarmu',
    icon: 'dashboard',
    primary: true
  },
  {
    key: 'core',
    href: '/core',
    label: 'Belajar',
    shortLabel: 'Belajar',
    copy: 'Mulai Core Beginner dari dasar',
    icon: 'book-open',
    primary: true
  },
  {
    key: 'lab',
    href: '/lab',
    label: 'Praktik',
    shortLabel: 'Lab',
    copy: 'Mulai simulasi aman tanpa aset nyata',
    icon: 'flask-conical',
    primary: true
  },
  {
    key: 'community',
    href: '/community',
    label: 'Komunitas',
    shortLabel: 'Komunitas',
    copy: 'Ikuti workshop, cohort, dan diskusi',
    icon: 'users',
    primary: true
  },
  {
    key: 'passport',
    href: '/passport',
    label: 'Kesiapan',
    shortLabel: 'Passport',
    copy: 'Lihat Passport Saya dan bukti belajarmu',
    icon: 'passport',
    primary: true
  },
  {
    key: 'profile',
    href: '/profile',
    label: 'Profil',
    shortLabel: 'Profil',
    copy: 'Kelola identitas belajarmu',
    icon: 'user-round',
    primary: false
  },
  {
    key: 'hub',
    href: '/hub',
    label: 'Jelajahi',
    shortLabel: 'Hub',
    copy: 'Temukan resource saat kamu siap',
    icon: 'compass',
    primary: false
  },
  {
    key: 'settings',
    href: '/settings',
    label: 'Pengaturan',
    shortLabel: 'Atur',
    copy: 'Atur akun, tampilan, dan bantuan',
    icon: 'settings',
    primary: false
  }
];

export const primaryMobileNavItems = sparkNavItems.filter((item) =>
  ['dashboard', 'core', 'lab', 'community', 'passport'].includes(item.key)
);

export function getNavItem(key: SparkNavKey) {
  return sparkNavItems.find((item) => item.key === key);
}

export function isNavActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
