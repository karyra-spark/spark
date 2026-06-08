import type { SparkProfileAvatarPreset } from '$state/profile-state.svelte';

export type SparkProfileTab = 'passport' | 'activity' | 'friends' | 'badges' | 'account';

export const profileTabs: { key: SparkProfileTab; label: string; icon: string }[] = [
  { key: 'passport', label: 'Passport', icon: 'badge' },
  { key: 'activity', label: 'Aktivitas', icon: 'clock' },
  { key: 'friends', label: 'Teman', icon: 'users' },
  { key: 'badges', label: 'Badge', icon: 'trophy' },
  { key: 'account', label: 'Akun', icon: 'settings' }
];

export const profileAvatarPresets: {
  id: SparkProfileAvatarPreset;
  label: string;
  icon: string;
  gradientA: string;
  gradientB: string;
}[] = [
  { id: 'spark', label: 'Spark', icon: 'sparkles', gradientA: '#6c4df6', gradientB: '#ff7a3d' },
  { id: 'trophy', label: 'Trophy', icon: 'trophy', gradientA: '#ffb703', gradientB: '#6c4df6' },
  { id: 'coffee', label: 'Focus', icon: 'flask-conical', gradientA: '#8ecae6', gradientB: '#6c4df6' },
  { id: 'explorer', label: 'Explorer', icon: 'compass', gradientA: '#21c997', gradientB: '#4c6fff' },
  { id: 'mentor', label: 'Mentor', icon: 'users', gradientA: '#ff4d8d', gradientB: '#ff7a3d' }
];

export const profileFriendSuggestions = [
  { id: 'mentor-spark', name: 'Spark Mentor', handle: '@spark-mentor', role: 'Learning guide', copy: 'Membantu pengguna memilih jalur belajar yang aman.', icon: 'shield' },
  { id: 'facilitator-ayu', name: 'Ayu Facilitator', handle: '@facilitator-ayu', role: 'Community facilitator', copy: 'Menghubungkan learner dengan workshop dan cohort lokal.', icon: 'users' },
  { id: 'starknet-guide', name: 'Starknet Guide', handle: '@starknet-guide', role: 'Explorer guide', copy: 'Membantu pengguna lanjut ke Hub dan resource teknis.', icon: 'compass' }
];

export function createProfileActivities(input: { completedLessons: number; completedLabs: number; workshops: number; resources: number; bookmarks: number }) {
  const activities = [
    { id: 'profile-ready', title: 'Profile & Passport aktif', copy: 'Identitas belajar dan readiness digabung dalam satu pusat akun.', icon: 'user-round', tone: 'blue', href: '/profile' }
  ];

  if (input.completedLessons > 0) activities.push({ id: 'lessons', title: `${input.completedLessons} lesson selesai`, copy: 'Learning signal sudah mulai terbentuk dari Core.', icon: 'book-open', tone: 'purple', href: '/core' });
  else activities.push({ id: 'start-core', title: 'Belum ada lesson selesai', copy: 'Mulai dari Core untuk membangun learning signal pertama.', icon: 'book-open', tone: 'purple', href: '/core' });

  if (input.completedLabs > 0) activities.push({ id: 'labs', title: `${input.completedLabs} Lab selesai`, copy: 'Practice signal masuk ke Passport.', icon: 'flask-conical', tone: 'orange', href: '/lab' });
  else activities.push({ id: 'try-lab', title: 'Practice Lab belum dicoba', copy: 'Coba simulasi wallet safety setelah fondasi Core cukup.', icon: 'flask-conical', tone: 'orange', href: '/lab' });

  if (input.workshops > 0) activities.push({ id: 'workshop', title: `${input.workshops} workshop tersimpan`, copy: 'Community signal mulai terbentuk.', icon: 'users', tone: 'pink', href: '/community' });
  if (input.resources > 0) activities.push({ id: 'hub-resource', title: `${input.resources} resource Hub tersimpan`, copy: 'Pengguna mulai menjelajahi ekosistem dengan arah.', icon: 'compass', tone: 'green', href: '/hub' });
  if (input.bookmarks > 0) activities.push({ id: 'bookmarks', title: `${input.bookmarks} lesson disimpan`, copy: 'Bookmark membantu pengguna kembali ke materi penting.', icon: 'bookmark', tone: 'blue', href: '/core' });

  return activities;
}

export function createBadgeRows(input: { completedLessons: number; completedLabs: number; workshops: number; resources: number; readiness: number }) {
  return [
    { id: 'starter', title: 'Spark Starter', copy: 'Mulai membangun identitas belajar.', icon: 'sparkles', unlocked: true },
    { id: 'core-learner', title: 'Core Learner', copy: 'Selesaikan minimal satu lesson Core.', icon: 'book-open', unlocked: input.completedLessons > 0 },
    { id: 'safe-practice', title: 'Safe Practice', copy: 'Selesaikan minimal satu simulasi Lab.', icon: 'flask-conical', unlocked: input.completedLabs > 0 },
    { id: 'community-ready', title: 'Community Ready', copy: 'Simpan workshop atau cohort.', icon: 'users', unlocked: input.workshops > 0 },
    { id: 'hub-ready', title: 'Hub Ready', copy: 'Capai readiness 75% atau simpan resource Hub.', icon: 'compass', unlocked: input.readiness >= 75 || input.resources > 0 }
  ];
}

export function visibilityLabel(value: string) {
  if (value === 'private') return 'Privat';
  if (value === 'public') return 'Publik';
  return 'Komunitas';
}
