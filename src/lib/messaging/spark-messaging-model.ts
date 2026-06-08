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
  { key: 'prioritas', label: 'Penting' },
  { key: 'belajar', label: 'Belajar' },
  { key: 'workshop', label: 'Workshop' },
  { key: 'hub', label: 'Hub' },
  { key: 'mentor', label: 'Mentor' },
  { key: 'akun', label: 'Akun' },
  { key: 'support', label: 'Bantuan' }
];

export const sparkMessages: SparkMessage[] = [
  {
    id: 'priority-start-core',
    kind: 'prioritas',
    title: 'Mulai dari belajar dasar',
    preview: 'Bangun fondasi sebelum masuk Lab, Passport, dan Hub.',
    body:
      'Mulai dari dasar blockchain, lalu lanjut ke keamanan dompet, Starknet, latihan aman, dan Passport. Tidak perlu terburu-buru. Spark membantu kamu membaca langkah berikutnya tanpa harus menebak halaman mana yang harus dibuka.',
    time: 'Ringkasan hari ini',
    href: '/core',
    cta: 'Mulai Core Beginner',
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
    preview: 'Spark membantumu memilih langkah yang paling aman.',
    body:
      'Setiap pelajaran punya arahan lanjut. Selesaikan satu langkah kecil, catat hal yang belum jelas, lalu lanjutkan saat kamu siap. Progress ini juga membantu Passport membaca kesiapanmu secara bertahap.',
    time: 'Update',
    href: '/lesson/why-blockchain',
    cta: 'Lanjutkan Lesson',
    tone: 'purple',
    icon: 'check',
    priority: 'normal',
    sender: 'Panduan Belajar',
    tags: ['lesson', 'checkpoint', 'completion']
  },
  {
    id: 'workshop-local-activation',
    kind: 'workshop',
    title: 'Belajar bersama komunitas',
    preview: 'Workshop membantu pemula bertanya dan belajar dengan ritme yang tenang.',
    body:
      'Community menghubungkan belajar mandiri dengan cohort, fasilitator lokal, dan ruang tanya jawab yang aman. Silakan menyimpan workshop yang relevan, lalu kembali saat waktunya cocok.',
    time: 'Komunitas',
    href: '/community',
    cta: 'Temukan Workshop',
    tone: 'pink',
    icon: 'users',
    priority: 'normal',
    sender: 'Komunitas',
    tags: ['workshop', 'cohort', 'community']
  },
  {
    id: 'hub-gateway-warning',
    kind: 'hub',
    title: 'Hub untuk eksplorasi lanjutan',
    preview: 'Jelajahi Resource Saat Siap setelah dasar belajar dan keamanan mulai terbentuk.',
    body:
      'Hub berisi resource, aplikasi, tools, komunitas, dan jalur lanjutan. Untuk pemula, Hub paling aman dibuka setelah memahami Core dan mencoba Lab. Spark tetap memberi konteks agar eksplorasi tidak terasa lepas arah.',
    time: 'Hub',
    href: '/hub',
    cta: 'Jelajahi Resource Saat Siap',
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
      'Jalur pemula tetap paling aman untuk orang yang baru mengenal blockchain. Mode Penjelajah bisa dipakai setelah dasar dompet dan keamanan lebih dipahami. Kamu selalu bisa mengubah ritme belajar dari Settings.',
    time: 'Pesan',
    href: '/profile',
    cta: 'Lihat Profil Belajar',
    tone: 'orange',
    icon: 'messages',
    priority: 'normal',
    sender: 'Fasilitator',
    tags: ['mentor', 'mode belajar']
  },
  {
    id: 'account-safety-note',
    kind: 'akun',
    title: 'Jaga keamanan belajarmu',
    preview: 'Spark tidak meminta seed phrase, private key, atau kode pemulihan.',
    body:
      'Belajar blockchain harus dimulai dari keamanan. Jangan pernah membagikan seed phrase, private key, atau kode pemulihan kepada siapa pun. Spark dirancang untuk edukasi, bukan untuk meminta akses ke aset pribadi.',
    time: 'Akun',
    href: '/settings',
    cta: 'Buka Pengaturan Aman',
    tone: 'blue',
    icon: 'shield',
    priority: 'low',
    sender: 'Keamanan Spark',
    tags: ['akun', 'keamanan', 'wallet']
  },
  {
    id: 'support-safe-path',
    kind: 'support',
    title: 'Bingung mulai dari mana?',
    preview: 'Buka Dashboard, lalu lanjutkan dari fokus belajar hari ini.',
    body:
      'Dashboard adalah ruang belajar harian. Mulai dari satu fokus utama, lanjutkan belajar, coba Lab saat siap, lalu cek Passport untuk melihat perkembanganmu. Kamu juga bisa membuka Help untuk panduan singkat.',
    time: 'Bantuan',
    href: '/help',
    cta: 'Buka Panduan',
    tone: 'purple',
    icon: 'help',
    priority: 'normal',
    sender: 'Bantuan Spark',
    tags: ['help', 'dashboard', 'flow']
  }
];

export function kindLabel(kind: SparkMessageKind) {
  if (kind === 'prioritas') return 'Penting';
  if (kind === 'akun') return 'Akun';
  if (kind === 'mentor') return 'Mentor';
  if (kind === 'belajar') return 'Belajar';
  if (kind === 'workshop') return 'Workshop';
  if (kind === 'hub') return 'Hub';
  if (kind === 'support') return 'Bantuan';
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
      kind: 'Penting',
      title: hubUnlocked ? 'Hub mulai cocok untukmu' : 'Mulai Core Beginner',
      copy: hubUnlocked
        ? 'Fondasi belajarmu cukup untuk mulai melihat resource Starknet di Hub.'
        : `${input.completedLessons} pelajaran selesai. Ambil satu langkah kecil lagi hari ini.`,
      href: hubUnlocked ? '/hub' : '/dashboard',
      tone: hubUnlocked ? 'green' : 'blue',
      status: hubUnlocked ? 'Jelajahi Resource Saat Siap' : 'Lanjutkan',
      priority: 'high',
      icon: hubUnlocked ? 'compass' : 'sparkles'
    },
    {
      id: 'learning-progress-status',
      kind: 'Belajar',
      title: `${input.learningProgress}% perjalanan belajar`,
      copy: 'Progres ini membantu Spark menyarankan langkah berikutnya.',
      href: '/core',
      tone: 'purple',
      status: 'Mulai Belajar',
      priority: 'normal',
      icon: 'book-open'
    },
    {
      id: 'practice-lab-status',
      kind: 'Lab',
      title: input.completedLabs > 0 ? 'Latihan mulai berjalan' : 'Mulai Simulasi Aman saat siap',
      copy: input.completedLabs > 0
        ? `${input.completedLabs} lab selesai. Latihan aman membantu membentuk Passport.`
        : 'Setelah dasar belajar cukup, buka Lab untuk latihan dompet dan transaksi edukatif.',
      href: '/lab',
      tone: 'orange',
      status: 'Mulai Lab',
      priority: input.completedLabs > 0 ? 'low' : 'normal',
      icon: 'flask-conical'
    },
    {
      id: 'community-bridge-status',
      kind: 'Komunitas',
      title: input.registeredWorkshops > 0 ? 'Workshop tersimpan' : 'Belajar bersama nanti',
      copy: input.registeredWorkshops > 0
        ? `${input.registeredWorkshops} workshop masuk dalam perjalanan belajarmu.`
        : 'Workshop dan cohort membantu pengguna lokal belajar bersama.',
      href: '/community',
      tone: 'pink',
      status: 'Ikuti Komunitas',
      priority: 'normal',
      icon: 'users'
    },
    {
      id: 'account-learning-status',
      kind: 'Akun',
      title: input.userName ? `Halo, ${input.userName}` : 'Mulai dari jalur pemula',
      copy: input.userName
        ? 'Ruang Saya dan Passport membantumu melihat perjalanan belajar.'
        : 'Masuk agar perjalanan belajarmu mudah dilanjutkan.',
      href: input.userName ? '/profile' : '/login',
      tone: 'blue',
      status: input.userName ? 'Lihat Passport Saya' : 'Masuk untuk Lanjutkan',
      priority: 'low',
      icon: input.userName ? 'user-round' : 'login'
    }
  ];
}
