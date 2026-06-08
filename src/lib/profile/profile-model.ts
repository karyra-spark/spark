import type { SparkNavItem } from '$lib/content/spark-navigation';

export type LearnerStage = 'Starter' | 'Builder' | 'Explorer' | 'Hub Ready';

export type ProfileMenuItem = {
  href: string;
  label: string;
  copy: string;
  icon: string;
};

export const profileMenuItems: ProfileMenuItem[] = [
  {
    href: '/settings',
    label: 'Edit Profil',
    copy: 'Tema, mode belajar, dan data lokal',
    icon: 'settings'
  },
  {
    href: '/core',
    label: 'Riwayat Belajar',
    copy: 'Lanjutkan lesson dan checkpoint',
    icon: 'book-open'
  },
  {
    href: '/lab',
    label: 'Practice Lab',
    copy: 'Simulasi dan proof of practice',
    icon: 'flask-conical'
  },
  {
    href: '/community',
    label: 'Workshop & Komunitas',
    copy: 'Cohort, fasilitator, dan aktivitas lokal',
    icon: 'users'
  },
  {
    href: '/hub',
    label: 'Spark Hub',
    copy: 'Resource, apps, tools, dan ekosistem',
    icon: 'compass'
  }
];

export const profileQuickLinks: Pick<SparkNavItem, 'href' | 'label' | 'copy' | 'icon'>[] = [
  {
    href: '/core',
    label: 'Core',
    copy: 'Belajar',
    icon: 'book-open'
  },
  {
    href: '/lab',
    label: 'Lab',
    copy: 'Praktik',
    icon: 'flask-conical'
  },
  {
    href: '/community',
    label: 'Komunitas',
    copy: 'Workshop',
    icon: 'users'
  },
  {
    href: '/hub',
    label: 'Hub',
    copy: 'Eksplorasi',
    icon: 'compass'
  }
];

export function getLearnerStage(score: number): LearnerStage {
  if (score >= 75) return 'Hub Ready';
  if (score >= 45) return 'Explorer';
  if (score >= 18) return 'Builder';
  return 'Starter';
}

export function getHubAccessCopy(score: number) {
  if (score >= 75) {
    return {
      title: 'Spark Hub siap digunakan',
      copy: 'Readiness sudah cukup untuk mulai menjelajahi resource, apps, tools, komunitas, dan misi ekosistem.',
      href: '/hub',
      cta: 'Masuk Hub',
      unlocked: true
    };
  }

  return {
    title: 'Bangun Passport untuk membuka Hub penuh',
    copy: 'Selesaikan Core, checkpoint, praktik, dan workshop agar eksplorasi Hub terasa lebih aman dan terarah.',
    href: '/core',
    cta: 'Lanjutkan Belajar',
    unlocked: false
  };
}
