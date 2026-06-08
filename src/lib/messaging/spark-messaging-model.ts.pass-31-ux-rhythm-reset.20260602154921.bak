export type SparkTone = 'blue' | 'green' | 'purple' | 'orange' | 'pink';
export type SparkPriority = 'high' | 'normal' | 'low';
export type SparkMessageKind = 'semua' | 'prioritas' | 'akun' | 'mentor' | 'belajar' | 'workshop' | 'hub' | 'support';

export type SparkNotification = {
  id: string;
  kind: string;
  title: string;
  copy: string;
  href: string;
  tone: SparkTone;
  status: string;
  priority: SparkPriority;
  icon: string;
};

export type SparkMessage = {
  id: string;
  kind: Exclude<SparkMessageKind, 'semua'>;
  title: string;
  preview: string;
  body: string;
  time: string;
  href: string;
  cta: string;
  tone: SparkTone;
  icon: string;
  priority: SparkPriority;
  sender: string;
  tags: string[];
};

export const sparkMessageFilters: { key: SparkMessageKind; label: string }[] = [
  { key: 'semua', label: 'Semua' },
  { key: 'prioritas', label: 'Prioritas' },
  { key: 'belajar', label: 'Belajar' },
  { key: 'workshop', label: 'Workshop' },
  { key: 'hub', label: 'Hub' },
  { key: 'mentor', label: 'Mentor' },
  { key: 'akun', label: 'Akun' },
  { key: 'support', label: 'Support' }
];

export const sparkMessages: SparkMessage[] = [
  {
    id: 'priority-start-core',
    kind: 'prioritas',
    title: 'Mulai dari Learn',
    preview: 'Bangun fondasi blockchain sebelum masuk Lab, Passport, dan Hub.',
    body:
      'Learn adalah jalur utama Spark. Mulai dari fondasi blockchain, lalu naik bertahap ke wallet safety, Starknet, praktik aman, dan Passport.',
    time: 'Hari ini',
    href: '/core',
    cta: 'Buka Learn',
    tone: 'blue',
    icon: 'book-open',
    priority: 'high',
    sender: 'Spark',
    tags: ['learn', 'belajar', 'pemula']
  },
  {
    id: 'learning-completion-flow',
    kind: 'belajar',
    title: 'Lanjutkan pelajaran berikutnya',
    preview: 'Setelah memahami satu lesson, Spark akan membantumu memilih langkah yang paling aman.',
    body:
      'Setiap lesson punya langkah selesai dan arahan lanjut. Ini membantu kamu belajar pelan-pelan tanpa harus menebak halaman berikutnya.',
    time: 'Update',
    href: '/lesson/why-blockchain',
    cta: 'Coba Lesson',
    tone: 'purple',
    icon: 'check',
    priority: 'normal',
    sender: 'Learning Guide',
    tags: ['lesson', 'checkpoint', 'completion']
  },
  {
    id: 'workshop-local-activation',
    kind: 'workshop',
    title: 'Workshop menjadi ruang belajar bersama',
    preview: 'Spark menghubungkan belajar mandiri dengan cohort dan fasilitator lokal.',
    body:
      'Community disiapkan agar pengguna lokal bisa belajar bersama, bertanya dengan aman, dan memahami Starknet tanpa tekanan untuk masuk terlalu cepat.',
    time: 'Komunitas',
    href: '/community',
    cta: 'Lihat Community',
    tone: 'pink',
    icon: 'users',
    priority: 'normal',
    sender: 'Community',
    tags: ['workshop', 'cohort', 'community']
  },
  {
    id: 'hub-gateway-warning',
    kind: 'hub',
    title: 'Hub dibuka sebagai jalur eksplorasi',
    preview: 'Gunakan Hub setelah fondasi belajar dan keamanan wallet mulai terbentuk.',
    body:
      'Hub berisi resource, aplikasi, tools, komunitas, dan jalur lanjutan. Untuk pemula, Hub paling aman dibuka setelah memahami Learn dan mencoba Lab.',
    time: 'Gateway',
    href: '/hub',
    cta: 'Buka Hub',
    tone: 'green',
    icon: 'compass',
    priority: 'low',
    sender: 'Hub',
    tags: ['hub', 'resource', 'readiness']
  },
  {
    id: 'direct-facilitator-note',
    kind: 'mentor',
    title: 'Catatan fasilitator',
    preview: 'Pilih cara belajar yang sesuai. Tidak perlu masuk teknis terlalu cepat.',
    body:
      'Untuk pengguna lokal yang baru mengenal blockchain, jalur pemula tetap paling aman. Mode Penjelajah bisa dipakai setelah dasar wallet dan keamanan lebih dipahami.',
    time: 'Pesan',
    href: '/profile',
    cta: 'Lihat Profile',
    tone: 'orange',
    icon: 'messages',
    priority: 'normal',
    sender: 'Fasilitator',
    tags: ['mentor', 'mode belajar']
  },
  {
    id: 'account-safety-note',
    kind: 'akun',
    title: 'Jaga pengalaman belajarmu tetap aman',
    preview: 'Spark tidak meminta seed phrase, private key, atau akses wallet untuk menyelesaikan materi awal.',
    body:
      'Belajar blockchain harus dimulai dari keamanan. Jangan pernah membagikan seed phrase, private key, atau kode pemulihan kepada siapa pun.',
    time: 'Akun',
    href: '/settings',
    cta: 'Buka Settings',
    tone: 'blue',
    icon: 'shield',
    priority: 'low',
    sender: 'Spark Safety',
    tags: ['akun', 'keamanan', 'wallet']
  },
  {
    id: 'support-safe-path',
    kind: 'support',
    title: 'Bingung mulai dari mana?',
    preview: 'Buka Dashboard, lalu lanjutkan dari fokus belajar hari ini.',
    body:
      'Dashboard adalah ruang belajar harian. Mulai dari satu fokus utama, lanjutkan Learn, coba Lab saat siap, lalu cek Passport untuk melihat perkembanganmu.',
    time: 'Support',
    href: '/dashboard',
    cta: 'Buka Dashboard',
    tone: 'purple',
    icon: 'help',
    priority: 'normal',
    sender: 'Spark Support',
    tags: ['help', 'dashboard', 'flow']
  }
];

export function kindLabel(kind: SparkMessageKind) {
  if (kind === 'prioritas') return 'Prioritas';
  if (kind === 'akun') return 'Akun';
  if (kind === 'mentor') return 'Mentor';
  if (kind === 'belajar') return 'Belajar';
  if (kind === 'workshop') return 'Workshop';
  if (kind === 'hub') return 'Hub';
  if (kind === 'support') return 'Support';
  return 'Semua';
}

export function createSparkNotifications(input: {
  readiness: number;
  learningProgress: number;
  completedLessons: number;
  completedLabs: number;
  registeredWorkshops: number;
  userName?: string;
}): SparkNotification[] {
  const hubUnlocked = input.readiness >= 75;

  return [
    {
      id: hubUnlocked ? 'priority-hub-ready' : 'priority-next-learning',
      kind: 'Prioritas',
      title: hubUnlocked ? 'Kamu mulai siap membuka Hub' : 'Lanjutkan perjalanan belajar',
      copy: hubUnlocked
        ? 'Fondasi belajarmu sudah cukup untuk mulai menjelajah resource Starknet di Hub.'
        : `${input.completedLessons} lesson selesai. Lanjutkan Learn atau Lab untuk memperkuat fondasi.`,
      href: hubUnlocked ? '/hub' : '/dashboard',
      tone: hubUnlocked ? 'green' : 'blue',
      status: hubUnlocked ? 'Buka Hub' : 'Lanjut',
      priority: 'high',
      icon: hubUnlocked ? 'compass' : 'sparkles'
    },
    {
      id: 'learning-progress-status',
      kind: 'Belajar',
      title: `${input.learningProgress}% progress belajar`,
      copy: 'Progress ini membantu Spark menyarankan langkah berikutnya dengan lebih rapi.',
      href: '/core',
      tone: 'purple',
      status: 'Learn',
      priority: 'normal',
      icon: 'book-open'
    },
    {
      id: 'practice-lab-status',
      kind: 'Practice',
      title: input.completedLabs > 0 ? 'Lab mulai terbentuk' : 'Lab belum dicoba',
      copy: input.completedLabs > 0
        ? `${input.completedLabs} lab selesai. Praktik aman membantu Passport membaca kesiapanmu.`
        : 'Setelah fondasi Learn cukup, buka Lab untuk latihan wallet safety dan transaksi edukatif.',
      href: '/lab',
      tone: 'orange',
      status: 'Lab',
      priority: input.completedLabs > 0 ? 'low' : 'normal',
      icon: 'flask-conical'
    },
    {
      id: 'community-bridge-status',
      kind: 'Komunitas',
      title: input.registeredWorkshops > 0 ? 'Aktivitas komunitas tersimpan' : 'Workshop bisa kamu ikuti nanti',
      copy: input.registeredWorkshops > 0
        ? `${input.registeredWorkshops} workshop masuk dalam perjalanan belajarmu.`
        : 'Workshop dan cohort membantu pengguna lokal belajar bersama dengan ritme yang lebih tenang.',
      href: '/community',
      tone: 'pink',
      status: 'Community',
      priority: 'normal',
      icon: 'users'
    },
    {
      id: 'account-learning-status',
      kind: 'Akun',
      title: input.userName ? `Halo, ${input.userName}` : 'Mulai dari jalur pemula',
      copy: input.userName
        ? 'Profile dan Passport membantumu melihat perjalanan belajar secara bertahap.'
        : 'Masuk agar perjalanan belajarmu lebih mudah dilanjutkan dari halaman Dashboard.',
      href: input.userName ? '/profile' : '/login',
      tone: 'blue',
      status: input.userName ? 'Profile' : 'Masuk',
      priority: 'low',
      icon: input.userName ? 'user-round' : 'login'
    }
  ];
}
