import type { SparkWorkshop } from '$content/spark-content';

export const communityImpactRows = [
  {
    label: 'Workshop lokal',
    value: '3',
    copy: 'Rencana aktivasi awal untuk komunitas kecil.',
    icon: 'calendar'
  },
  {
    label: 'Kapasitas belajar',
    value: '90',
    copy: 'Total kapasitas contoh dari workshop yang disiapkan.',
    icon: 'users'
  },
  {
    label: 'Cohort',
    value: '3',
    copy: 'Jalur batch untuk pemula, praktik, dan gateway.',
    icon: 'layers'
  },
  {
    label: 'Fasilitator',
    value: '4',
    copy: 'Peran mentor lokal dan technical guide.',
    icon: 'shield'
  }
];

export const communityCohorts = [
  {
    id: 'core-starter',
    title: 'Core Starter Cohort',
    status: 'Pendaftaran Dibuka',
    location: 'Hybrid lokal',
    facilitator: 'Community Mentor',
    members: 32,
    href: '/core',
    copy: 'Untuk pengguna baru yang butuh fondasi blockchain dan wallet safety.'
  },
  {
    id: 'practice-circle',
    title: 'Practice Circle',
    status: 'Berjalan',
    location: 'Online + meetup',
    facilitator: 'Spark Facilitator',
    members: 18,
    href: '/lab',
    copy: 'Untuk pengguna yang mulai masuk simulasi dan proof-of-practice.'
  },
  {
    id: 'gateway-group',
    title: 'Starknet Gateway Group',
    status: 'Menunggu Batch',
    location: 'Online',
    facilitator: 'Technical Guide',
    members: 11,
    href: '/hub',
    copy: 'Untuk learner yang sudah siap menjelajahi ekosistem Starknet.'
  }
];

export function workshopCapacityPercent(workshop: SparkWorkshop, registeredOverride?: boolean) {
  const base = workshop.capacity > 0 ? Math.round((workshop.registered / workshop.capacity) * 100) : 0;
  return Math.min(100, Math.max(4, registeredOverride ? base + 8 : base));
}

export function formatWorkshopFormat(format: SparkWorkshop['format']) {
  if (format === 'offline') return 'Offline';
  if (format === 'online') return 'Online';
  return 'Hybrid';
}
