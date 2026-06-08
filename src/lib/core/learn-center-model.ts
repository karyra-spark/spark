export const learnTrackCards = [
  {
    title: 'Pemula',
    copy: 'Mulai pelan dari fondasi blockchain dan alasan kenapa kepercayaan digital dibutuhkan.',
    icon: 'shield',
    mode: 'beginner',
    tone: 'blue'
  },
  {
    title: 'Terarah',
    copy: 'Ikuti jalur ringkas: Core → Lesson → Lab → Passport tanpa loncat terlalu jauh.',
    icon: 'layers',
    mode: 'guided',
    tone: 'green'
  },
  {
    title: 'Penjelajah',
    copy: 'Masuk ke Starknet dan Lab advanced setelah paham wallet safety dan risiko dasar.',
    icon: 'zap',
    mode: 'explorer',
    tone: 'purple'
  }
] as const;

export const learnOutcomeCards = [
  {
    title: 'Paham fondasi',
    copy: 'Mengerti blockchain sebagai fondasi kepercayaan digital.',
    icon: 'book-open',
    href: '/core'
  },
  {
    title: 'Berani praktik aman',
    copy: 'Siap mencoba simulasi tanpa aset sungguhan.',
    icon: 'flask-conical',
    href: '/lab'
  },
  {
    title: 'Punya readiness',
    copy: 'Melihat bukti perjalanan lewat Passport.',
    icon: 'badge',
    href: '/profile'
  },
  {
    title: 'Siap menjelajah',
    copy: 'Masuk Hub dengan arah yang lebih jelas.',
    icon: 'compass',
    href: '/hub'
  }
] as const;

export const learnPrinciples = [
  'Mulai dari pemahaman sederhana.',
  'Teknikal hadir setelah fondasi.',
  'Praktik dilakukan lewat simulasi aman.',
  'Readiness dibangun dari belajar, praktik, dan komunitas.'
] as const;
