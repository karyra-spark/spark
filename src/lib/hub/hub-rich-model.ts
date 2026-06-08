import type { HubResource } from '$content/spark-content';

export type HubRailItem = {
  href: string;
  title: string;
  copy: string;
  icon: string;
  tone: 'blue' | 'green' | 'purple' | 'orange' | 'pink';
  gate: string;
};

export const hubRailItems: HubRailItem[] = [
  {
    href: '#directory',
    title: 'Reading Path',
    copy: 'Mulai dari resource yang menjelaskan ekosistem dengan bahasa ringan.',
    icon: 'book-open',
    tone: 'blue',
    gate: 'Open'
  },
  {
    href: '#directory',
    title: 'Apps',
    copy: 'Aplikasi ekosistem dengan label risiko dan readiness.',
    icon: 'compass',
    tone: 'green',
    gate: 'Recommended'
  },
  {
    href: '#directory',
    title: 'Tools',
    copy: 'Tools teknis untuk mode penjelajah dan pengguna yang sudah siap.',
    icon: 'settings',
    tone: 'purple',
    gate: 'Passport'
  },
  {
    href: '/community',
    title: 'Community',
    copy: 'Komunitas, event, cohort, dan resource sosial lanjutan.',
    icon: 'users',
    tone: 'pink',
    gate: 'Open'
  }
];

export const hubMilestones = [
  {
    title: 'Pahami fondasi',
    copy: 'Selesaikan Core agar eksplorasi tidak terasa seperti loncat ke jargon.',
    icon: 'book-open',
    href: '/core'
  },
  {
    title: 'Coba praktik aman',
    copy: 'Practice Lab membantu pengguna memahami risiko sebelum masuk ekosistem.',
    icon: 'flask-conical',
    href: '/lab'
  },
  {
    title: 'Cek Passport',
    copy: 'Readiness memberi sinyal apakah Hub sebaiknya dibuka lebih jauh.',
    icon: 'badge',
    href: '/profile'
  },
  {
    title: 'Jelajahi Hub',
    copy: 'Simpan resource dan bangun jalur eksplorasi personal.',
    icon: 'compass',
    href: '#directory'
  }
];

export function categoryLabel(category: HubResource['category'] | 'all') {
  if (category === 'all') return 'Semua';
  if (category === 'reading') return 'Reading';
  if (category === 'apps') return 'Apps';
  if (category === 'tools') return 'Tools';
  if (category === 'community') return 'Community';
  if (category === 'games') return 'Games';
  return 'Missions';
}

export function readinessLabel(readiness: HubResource['readiness']) {
  if (readiness === 'open') return 'Terbuka';
  if (readiness === 'recommended') return 'Direkomendasikan';
  return 'Setelah Passport';
}

export function readinessCopy(readiness: HubResource['readiness']) {
  if (readiness === 'open') return 'Aman dilihat sebagai pengenalan.';
  if (readiness === 'recommended') return 'Disarankan setelah memahami fondasi.';
  return 'Lebih cocok setelah readiness cukup.';
}

export function riskTone(risk: HubResource['riskLabel']) {
  if (risk === 'low') return 'safe';
  if (risk === 'medium') return 'beta';
  return 'target';
}

export function riskCopy(risk: HubResource['riskLabel']) {
  if (risk === 'low') return 'Risiko rendah untuk eksplorasi awal.';
  if (risk === 'medium') return 'Butuh konteks sebelum mencoba.';
  return 'Teknis. Cocok untuk mode penjelajah.';
}
