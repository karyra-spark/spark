export const dashboardCommandTiles = [
  {
    title: 'Mulai Core',
    copy: 'Lanjutkan kurikulum utama.',
    href: '/core',
    icon: 'book-open',
    tone: 'blue'
  },
  {
    title: 'Coba Lab',
    copy: 'Praktik aman dan proof-of-practice.',
    href: '/lab',
    icon: 'flask-conical',
    tone: 'purple'
  },
  {
    title: 'Cek Inbox',
    copy: 'Pesan, notifikasi, dan arahan sistem.',
    href: '/inbox',
    icon: 'messages',
    tone: 'orange'
  },
  {
    title: 'Buka Hub',
    copy: 'Resource ekosistem dan eksplorasi lanjutan.',
    href: '/hub',
    icon: 'compass',
    tone: 'green'
  }
] as const;

export const dailyFocusRules = [
  {
    id: 'start-core',
    title: 'Mulai dari fondasi',
    copy: 'Selesaikan lesson pertama agar dashboard bisa membaca progres awal.',
    href: '/core',
    icon: 'book-open'
  },
  {
    id: 'try-lab',
    title: 'Ubah pemahaman menjadi praktik',
    copy: 'Practice Lab menambah sinyal readiness ke Passport.',
    href: '/lab',
    icon: 'flask-conical'
  },
  {
    id: 'join-community',
    title: 'Sambungkan ke komunitas',
    copy: 'Workshop dan cohort membuat proses belajar tidak sendirian.',
    href: '/community',
    icon: 'users'
  },
  {
    id: 'hub-explore',
    title: 'Eksplorasi Hub',
    copy: 'Simpan resource yang relevan setelah readiness cukup.',
    href: '/hub',
    icon: 'compass'
  }
] as const;

export const dashboardHealthLabels = [
  {
    key: 'learning',
    label: 'Learning',
    icon: 'book-open'
  },
  {
    key: 'practice',
    label: 'Practice',
    icon: 'flask-conical'
  },
  {
    key: 'community',
    label: 'Community',
    icon: 'users'
  },
  {
    key: 'hub',
    label: 'Hub',
    icon: 'compass'
  }
] as const;
