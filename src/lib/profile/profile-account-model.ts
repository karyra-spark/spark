import type { SparkProfileAvatarPreset } from '$state/profile-state.svelte';

export type SparkProfileTab = 'passport' | 'activity' | 'friends' | 'badges' | 'account';

export type ProfileConnectionSuggestion = {
  id: string;
  name: string;
  handle: string;
  role: string;
  copy: string;
  icon: string;
};

export const profileTabs: { key: SparkProfileTab; label: string; icon: string }[] = [
  { key: 'passport', label: 'Passport', icon: 'badge' },
  { key: 'activity', label: 'Perjalanan', icon: 'clock' },
  { key: 'badges', label: 'Tanda', icon: 'trophy' },
  { key: 'friends', label: 'Komunitas', icon: 'users' },
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
  { id: 'trophy', label: 'Tanda', icon: 'trophy', gradientA: '#ffb703', gradientB: '#6c4df6' },
  { id: 'coffee', label: 'Fokus', icon: 'flask-conical', gradientA: '#8ecae6', gradientB: '#6c4df6' },
  { id: 'explorer', label: 'Jelajah', icon: 'compass', gradientA: '#21c997', gradientB: '#4c6fff' },
  { id: 'mentor', label: 'Teman', icon: 'users', gradientA: '#ff4d8d', gradientB: '#ff7a3d' }
];

export const profileFriendSuggestions: ProfileConnectionSuggestion[] = [];

export function createProfileActivities(input: { completedLessons: number; completedLabs: number; workshops: number; resources: number; bookmarks: number }) {
  const activities = [
    { id: 'profile-ready', title: 'Ruang Saya aktif', copy: 'Profil dan Passport siap mengikuti perjalanan belajarmu.', icon: 'user-round', tone: 'blue', href: '/profile' }
  ];

  if (input.completedLessons > 0) activities.push({ id: 'lessons', title: `${input.completedLessons} pelajaran selesai`, copy: 'Fondasi blockchain mulai terbentuk dari Learn.', icon: 'book-open', tone: 'purple', href: '/core' });
  else activities.push({ id: 'start-core', title: 'Mulai dari pelajaran pertama', copy: 'Ambil satu materi dasar untuk membangun fondasi awal.', icon: 'book-open', tone: 'purple', href: '/core' });

  if (input.completedLabs > 0) activities.push({ id: 'labs', title: `${input.completedLabs} latihan Lab selesai`, copy: 'Latihan aman mulai masuk ke Passport.', icon: 'flask-conical', tone: 'orange', href: '/lab' });
  else activities.push({ id: 'try-lab', title: 'Lab belum dicoba', copy: 'Coba latihan dompet atau transaksi saat fondasi sudah cukup.', icon: 'flask-conical', tone: 'orange', href: '/lab' });

  if (input.workshops > 0) activities.push({ id: 'workshop', title: `${input.workshops} workshop tersimpan`, copy: 'Belajar bersama komunitas mulai tercatat.', icon: 'users', tone: 'pink', href: '/community' });
  if (input.resources > 0) activities.push({ id: 'hub-resource', title: `${input.resources} resource Hub disimpan`, copy: 'Eksplorasi ekosistem Starknet mulai terarah.', icon: 'compass', tone: 'green', href: '/hub' });
  if (input.bookmarks > 0) activities.push({ id: 'bookmarks', title: `${input.bookmarks} pelajaran disimpan`, copy: 'Kamu punya materi yang bisa dibuka kembali.', icon: 'bookmark', tone: 'blue', href: '/core' });

  return activities;
}

export function createBadgeRows(input: { completedLessons: number; completedLabs: number; workshops: number; resources: number; readiness: number }) {
  return [
    { id: 'starter', title: 'Mulai Belajar', copy: 'Ruang Saya sudah aktif sebagai awal perjalanan.', icon: 'sparkles', unlocked: true },
    { id: 'core-learner', title: 'Fondasi Awal', copy: 'Selesaikan minimal satu pelajaran Learn.', icon: 'book-open', unlocked: input.completedLessons > 0 },
    { id: 'safe-practice', title: 'Latihan Aman', copy: 'Selesaikan minimal satu latihan Lab.', icon: 'flask-conical', unlocked: input.completedLabs > 0 },
    { id: 'community-ready', title: 'Belajar Bersama', copy: 'Simpan workshop atau cohort komunitas.', icon: 'users', unlocked: input.workshops > 0 },
    { id: 'hub-ready', title: 'Siap Jelajah', copy: 'Capai kesiapan 75% atau simpan resource Hub.', icon: 'compass', unlocked: input.readiness >= 75 || input.resources > 0 }
  ];
}

export function visibilityLabel(value: string) {
  if (value === 'private') return 'Privat';
  if (value === 'public') return 'Publik';
  return 'Komunitas';
}
