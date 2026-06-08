export type HubCategory = {
  id: string;
  title: string;
  copy: string;
  icon: string;
  href: string;
  gate: 'open' | 'recommended' | 'passport';
};

export type HubMission = {
  id: string;
  title: string;
  copy: string;
  level: 'Pemula' | 'Terarah' | 'Teknis';
  href: string;
};

export const hubCategories: HubCategory[] = [
  {
    id: 'reading',
    title: 'Reading Path',
    copy: 'Artikel, panduan, dan peta konsep untuk memahami ekosistem.',
    icon: 'book-open',
    href: '#directory',
    gate: 'open'
  },
  {
    id: 'apps',
    title: 'Apps',
    copy: 'Aplikasi ekosistem yang diberi label readiness dan risiko.',
    icon: 'compass',
    href: '#directory',
    gate: 'recommended'
  },
  {
    id: 'tools',
    title: 'Tools',
    copy: 'Tools teknis untuk pengguna yang mulai masuk mode penjelajah.',
    icon: 'settings',
    href: '#directory',
    gate: 'passport'
  },
  {
    id: 'community',
    title: 'Community',
    copy: 'Komunitas, event, dan resource lanjutan untuk bertumbuh.',
    icon: 'users',
    href: '/community',
    gate: 'open'
  }
];

export const hubMissions: HubMission[] = [
  {
    id: 'save-first-resource',
    title: 'Simpan resource pertama',
    copy: 'Pilih satu resource Hub yang relevan dengan perjalanan belajarmu.',
    level: 'Pemula',
    href: '#directory'
  },
  {
    id: 'finish-wallet-safety',
    title: 'Selesaikan wallet safety',
    copy: 'Pastikan kamu memahami risiko seed phrase, signature, dan connect wallet.',
    level: 'Terarah',
    href: '/core'
  },
  {
    id: 'open-technical-preview',
    title: 'Buka jalur teknis bertahap',
    copy: 'Gunakan mode penjelajah hanya setelah fondasi dan readiness cukup.',
    level: 'Teknis',
    href: '/lab'
  }
];
