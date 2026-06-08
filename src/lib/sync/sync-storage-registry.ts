import type { SparkStorageEntry } from './sync-types';

export const SYNC_QUEUE_STORAGE_KEY = 'karyra-spark-sync-queue-v1';

export const sparkStorageRegistry: SparkStorageEntry[] = [
  {
    key: 'karyra-spark-learning-state-v3',
    owner: 'learning',
    label: 'Progress belajar',
    description: 'Pelajaran selesai, catatan, bookmark, checkpoint, dan status belajar lokal.',
    authority: 'server-source',
    resetOnProgressReset: true,
    resetOnAllLocalReset: true,
    futureBackendRole: 'Server menjadi sumber utama. Local state menjadi cache dan draft offline.'
  },
  {
    key: 'karyra-spark-leveling-state-v1',
    owner: 'learning',
    label: 'Level dan ujian',
    description: 'Hasil ujian Core/Lab, level yang lulus, dan jawaban sementara.',
    authority: 'server-source',
    resetOnProgressReset: true,
    resetOnAllLocalReset: true,
    futureBackendRole: 'Server menyimpan hasil ujian, kelulusan level, dan eligibility Passport.'
  },
  {
    key: 'karyra-spark-gateway-state-v1',
    owner: 'community',
    label: 'Community dan Hub',
    description: 'Workshop tersimpan, resource Hub tersimpan, dan bridge yang sudah ditutup.',
    authority: 'server-source',
    resetOnProgressReset: true,
    resetOnAllLocalReset: true,
    futureBackendRole: 'Server menyimpan relasi user dengan workshop, cohort, dan resource.'
  },
  {
    key: 'karyra-spark-message-state-v1',
    owner: 'message',
    label: 'Notifikasi dan inbox',
    description: 'Status baca, filter pesan, dan pesan yang disimpan di perangkat.',
    authority: 'server-source',
    resetOnProgressReset: true,
    resetOnAllLocalReset: true,
    futureBackendRole: 'Server menyimpan status baca. Local state hanya cache UI.'
  },
  {
    key: 'karyra-spark-social-state-v1',
    owner: 'social',
    label: 'Diskusi komunitas',
    description: 'Post lokal, komentar, reaction, follow, report, dan event diskusi.',
    authority: 'server-source',
    resetOnProgressReset: true,
    resetOnAllLocalReset: true,
    futureBackendRole: 'Server menyimpan diskusi. Local state menjadi cache, draft, dan optimistic update.'
  },
  {
    key: SYNC_QUEUE_STORAGE_KEY,
    owner: 'system',
    label: 'Antrean sync',
    description: 'Event lokal yang nanti dikirim ke backend saat sync aktif.',
    authority: 'local-cache',
    resetOnProgressReset: true,
    resetOnAllLocalReset: true,
    futureBackendRole: 'Diganti atau diperkuat dengan IndexedDB queue dan retry policy.'
  },
  {
    key: 'karyra-spark-session-v2',
    owner: 'auth',
    label: 'Sesi lokal',
    description: 'Identitas sesi lokal sebelum auth backend aktif.',
    authority: 'server-source',
    resetOnProgressReset: false,
    resetOnAllLocalReset: true,
    futureBackendRole: 'Diganti cookie httpOnly/session backend. Tidak menjadi sumber data akun.'
  },
  {
    key: 'karyra-spark-theme-v2',
    owner: 'theme',
    label: 'Tema tampilan',
    description: 'Preferensi terang, gelap, atau mengikuti perangkat.',
    authority: 'local-preference',
    resetOnProgressReset: false,
    resetOnAllLocalReset: true,
    futureBackendRole: 'Boleh tetap local preference atau disalin ke profile settings.'
  },
  {
    key: 'karyra-spark-managed-content-v1',
    owner: 'content',
    label: 'Konten terkelola lokal',
    description: 'Draft copy/resource legal/community yang diedit dari content studio lokal.',
    authority: 'local-source',
    resetOnProgressReset: false,
    resetOnAllLocalReset: true,
    futureBackendRole: 'Naik ke CMS/backend admin saat tersedia.'
  },
  {
    key: 'karyra-spark-cookie-choice-v1',
    owner: 'cookie',
    label: 'Pilihan cookie',
    description: 'Pilihan penyimpanan lokal/cookie penting.',
    authority: 'local-preference',
    resetOnProgressReset: false,
    resetOnAllLocalReset: true,
    futureBackendRole: 'Tetap preference lokal kecuali consent backend dibutuhkan.'
  }
];

export function getProgressResetKeys() {
  return sparkStorageRegistry.filter((entry) => entry.resetOnProgressReset).map((entry) => entry.key);
}

export function getAllLocalResetKeys() {
  return sparkStorageRegistry.filter((entry) => entry.resetOnAllLocalReset).map((entry) => entry.key);
}

export function getServerSourceEntries() {
  return sparkStorageRegistry.filter((entry) => entry.authority === 'server-source');
}
