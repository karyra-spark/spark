export type ManagedCopyPage =
  | 'home'
  | 'dashboard'
  | 'core'
  | 'lab'
  | 'community'
  | 'hub'
  | 'profile'
  | 'settings'
  | 'inbox'
  | 'menu';

export type ManagedContentStatus = 'draft' | 'published' | 'archived';
export type ManagedLevel = 'pemula' | 'terarah' | 'penjelajah' | 'builder';

export type ManagedPageCopy = {
  id: string;
  page: ManagedCopyPage;
  section: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  note: string;
  status: ManagedContentStatus;
};

export type ManagedStudioMessage = {
  id: string;
  category: 'belajar' | 'keamanan' | 'workshop' | 'passport' | 'hub' | 'akun';
  title: string;
  preview: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  status: ManagedContentStatus;
};

export type ManagedHubResource = {
  id: string;
  category: 'mulai' | 'wallet' | 'cairo' | 'tool' | 'dapp' | 'komunitas' | 'keamanan';
  title: string;
  description: string;
  url: string;
  level: ManagedLevel;
  safetyNote: string;
  featured: boolean;
  status: ManagedContentStatus;
};

export type ManagedCommunityEvent = {
  id: string;
  title: string;
  location: string;
  dateLabel: string;
  description: string;
  capacityLabel: string;
  ctaLabel: string;
  ctaHref: string;
  status: ManagedContentStatus;
};

export type ManagedLegalPage = {
  id: string;
  slug: 'faq' | 'terms' | 'privacy' | 'risk-disclaimer' | 'community-guidelines' | 'safety-center';
  title: string;
  summary: string;
  body: string;
  status: ManagedContentStatus;
};

export type SparkManagedContent = {
  appCopy: ManagedPageCopy[];
  messages: ManagedStudioMessage[];
  hubResources: ManagedHubResource[];
  communityEvents: ManagedCommunityEvent[];
  legalPages: ManagedLegalPage[];
};

export const defaultManagedContent: SparkManagedContent = {
  appCopy: [
    {
      id: 'settings-hero',
      page: 'settings',
      section: 'Header',
      eyebrow: 'Pengaturan',
      title: 'Atur Spark agar nyaman untuk cara belajarmu.',
      description:
        'Pilih tampilan, cara belajar, arahan, dan pengingat yang membuat perjalanan menuju Starknet terasa lebih tenang.',
      primaryCtaLabel: 'Mulai belajar',
      primaryCtaHref: '/core',
      secondaryCtaLabel: 'Buka Ruang Saya',
      secondaryCtaHref: '/profile',
      note: 'Pengaturan menjaga pengalaman belajar tetap sederhana.',
      status: 'published'
    },
    {
      id: 'profile-hero',
      page: 'profile',
      section: 'Ruang saya',
      eyebrow: 'Ruang saya',
      title: 'Simpan identitas dan perjalanan belajarmu.',
      description:
        'Profile membantu kamu melihat perjalanan dari belajar dasar, praktik aman, hingga kesiapan mengeksplor Starknet.',
      primaryCtaLabel: 'Lanjut belajar',
      primaryCtaHref: '/core',
      secondaryCtaLabel: 'Buka Passport',
      secondaryCtaHref: '/profile',
      note: 'Gunakan bahasa yang ramah. Hindari kesan seperti sistem sedang menilai user.',
      status: 'draft'
    },
    {
      id: 'inbox-hero',
      page: 'inbox',
      section: 'Pesan dari Spark',
      eyebrow: 'Pesan',
      title: 'Arahan kecil agar kamu tidak kehilangan langkah berikutnya.',
      description:
        'Spark mengirim pesan belajar, keamanan, workshop, Passport, dan Hub dengan bahasa yang singkat dan mudah dipahami.',
      primaryCtaLabel: 'Lihat pesan',
      primaryCtaHref: '/inbox',
      secondaryCtaLabel: 'Lanjut belajar',
      secondaryCtaHref: '/core',
      note: 'Pesan harus terasa seperti bantuan, bukan log sistem.',
      status: 'draft'
    },
    {
      id: 'menu-drawer',
      page: 'menu',
      section: 'Mobile drawer',
      eyebrow: 'Menu',
      title: 'Pindah halaman tanpa kehilangan arah.',
      description:
        'Menu Spark menghubungkan belajar, praktik, komunitas, Hub, Profile, pesan, dan pengaturan dalam struktur yang mudah dipahami.',
      primaryCtaLabel: 'Buka Dashboard',
      primaryCtaHref: '/dashboard',
      secondaryCtaLabel: 'Buka Bantuan',
      secondaryCtaHref: '/help',
      note: 'Menu membantu pengguna berpindah halaman dengan jelas.',
      status: 'published'
    },
    {
      id: 'dashboard-first-run',
      page: 'dashboard',
      section: 'Belajar hari ini',
      eyebrow: 'Hari ini',
      title: 'Lanjutkan perjalanan Starknet dari langkah yang paling aman.',
      description:
        'Dashboard sebaiknya memberi satu fokus utama, bukan terlalu banyak kartu atau istilah teknis.',
      primaryCtaLabel: 'Lanjut dari sini',
      primaryCtaHref: '/core',
      secondaryCtaLabel: 'Coba Lab',
      secondaryCtaHref: '/lab',
      note: 'Nanti bagian ini bisa dipoles saat Dashboard direbuild.',
      status: 'draft'
    }
  ],
  messages: [
    {
      id: 'message-start-learning',
      category: 'belajar',
      title: 'Mulai dari fondasi blockchain',
      preview: 'Bangun pemahaman dasar sebelum masuk wallet, Starknet, dan Lab.',
      body:
        'Tidak perlu terburu-buru masuk ke istilah teknis. Mulai dari fondasi blockchain, lalu pelan-pelan naik ke wallet safety, Starknet, dan praktik aman.',
      ctaLabel: 'Mulai belajar',
      ctaHref: '/core',
      status: 'published'
    },
    {
      id: 'message-wallet-safety',
      category: 'keamanan',
      title: 'Wallet safety selalu lebih dulu',
      preview: 'Sebelum mencoba aplikasi onchain, pahami tanda bahaya dan cara menjaga akses wallet.',
      body:
        'Spark menempatkan keamanan di awal perjalanan. Pelajari seed phrase, private key, tanda scam, dan kebiasaan aman sebelum mencoba transaksi nyata.',
      ctaLabel: 'Buka Lab',
      ctaHref: '/lab',
      status: 'published'
    },
    {
      id: 'message-passport-growth',
      category: 'passport',
      title: 'Passport kamu mulai terbentuk',
      preview: 'Setiap lesson dan lab membantu Spark membaca kesiapanmu secara bertahap.',
      body:
        'Passport bukan nilai ujian. Ia hanya membantu kamu melihat bagian mana yang sudah kuat dan bagian mana yang perlu dipahami lagi sebelum masuk lebih jauh.',
      ctaLabel: 'Lihat Passport',
      ctaHref: '/profile',
      status: 'draft'
    }
  ],
  hubResources: [
    {
      id: 'starknet-start-here',
      category: 'mulai',
      title: 'Starknet Start Here',
      description: 'Pintu awal untuk memahami Starknet, account abstraction, dan ekosistem aplikasinya.',
      url: 'https://www.starknet.io/',
      level: 'pemula',
      safetyNote: 'Baca dulu konsep dasarnya sebelum mencoba aplikasi yang meminta wallet.',
      featured: true,
      status: 'draft'
    },
    {
      id: 'cairo-docs-beginner',
      category: 'cairo',
      title: 'Cairo untuk pemula teknis',
      description: 'Resource awal untuk memahami bahasa Cairo secara bertahap.',
      url: 'https://book.cairo-lang.org/',
      level: 'builder',
      safetyNote: 'Cocok setelah pengguna paham konsep dasar Starknet dan smart contract.',
      featured: true,
      status: 'draft'
    }
  ],
  communityEvents: [
    {
      id: 'local-starknet-intro',
      title: 'Pengenalan Starknet untuk pemula lokal',
      location: 'Komunitas lokal',
      dateLabel: 'Jadwal segera diumumkan',
      description:
        'Sesi santai untuk memahami blockchain, wallet safety, dan kenapa Starknet perlu dipelajari tanpa FOMO atau janji keuntungan.',
      capacityLabel: 'Cohort kecil',
      ctaLabel: 'Simpan minat',
      ctaHref: '/community',
      status: 'draft'
    }
  ],
  legalPages: [
    {
      id: 'faq-page',
      slug: 'faq',
      title: 'FAQ',
      summary: 'Jawaban singkat untuk pertanyaan awal tentang Spark, Starknet, wallet, dan keamanan belajar.',
      body:
        'Karyra Spark adalah platform literasi dan aktivasi teknologi. Spark tidak memberi nasihat finansial, tidak menjanjikan keuntungan, dan menempatkan keamanan sebagai langkah pertama.',
      status: 'draft'
    },
    {
      id: 'risk-disclaimer-page',
      slug: 'risk-disclaimer',
      title: 'Risk Disclaimer',
      summary: 'Batasan penting agar pengguna memahami risiko aset digital dan aplikasi onchain.',
      body:
        'Konten Spark bersifat edukatif. Pengguna harus memahami risiko sebelum menggunakan wallet, aset digital, dApp, atau layanan onchain apa pun.',
      status: 'draft'
    }
  ]
};

export function cloneDefaultManagedContent() {
  return JSON.parse(JSON.stringify(defaultManagedContent)) as SparkManagedContent;
}

export function normalizeManagedContent(input: Partial<SparkManagedContent> | null | undefined): SparkManagedContent {
  const defaults = cloneDefaultManagedContent();

  if (!input || typeof input !== 'object') return defaults;

  return {
    appCopy: Array.isArray(input.appCopy) ? input.appCopy : defaults.appCopy,
    messages: Array.isArray(input.messages) ? input.messages : defaults.messages,
    hubResources: Array.isArray(input.hubResources) ? input.hubResources : defaults.hubResources,
    communityEvents: Array.isArray(input.communityEvents) ? input.communityEvents : defaults.communityEvents,
    legalPages: Array.isArray(input.legalPages) ? input.legalPages : defaults.legalPages
  };
}
