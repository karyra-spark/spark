export type LearningMode = 'beginner' | 'guided' | 'explorer';
export type Tone = 'blue' | 'green' | 'purple' | 'orange' | 'pink';

export type CheckpointOption = {
  id: string;
  label: string;
  correct?: boolean;
  feedback: string;
};

export type GlossaryTerm = {
  term: string;
  simple: string;
  technical?: string;
};

export type SparkLesson = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  estimatedMinutes: number;
  modeHint: LearningMode[];
  checkpoint: string;
  body: string[];
  checkpointQuestion?: string;
  checkpointOptions?: CheckpointOption[];
  glossaryTerms?: GlossaryTerm[];
};

export type SparkModule = {
  id: string;
  level: number;
  title: string;
  subtitle: string;
  description: string;
  tone: Tone;
  unlockHint: string;
  bridgeWarning?: string;
  lessons: SparkLesson[];
};

export type SparkLab = {
  id: string;
  title: string;
  summary: string;
  difficulty: 'safe' | 'guided' | 'technical';
  action: string;
  estimatedMinutes: number;
  readinessHint: string;
  requiresBridge?: boolean;
  steps: string[];
};

export type SparkWorkshop = {
  id: string;
  title: string;
  location: string;
  date: string;
  summary: string;
  format: 'offline' | 'online' | 'hybrid';
  capacity: number;
  registered: number;
  facilitator: string;
  relatedModuleId: string;
};

export type HubResource = {
  id: string;
  title: string;
  category: 'apps' | 'tools' | 'community' | 'games' | 'missions' | 'reading';
  summary: string;
  readiness: 'open' | 'recommended' | 'after-passport';
  riskLabel: 'low' | 'medium' | 'technical';
  url: string;
};


export const sparkModules: SparkModule[] = [
  {
    id: 'blockchain-foundation',
    level: 1,
    title: 'Fondasi Blockchain',
    subtitle: 'Mulai dari kepercayaan digital',
    description: 'Memahami kenapa blockchain dibutuhkan, bagaimana catatan digital bersama bekerja, dan kenapa trust menjadi fondasi utama.',
    tone: 'blue',
    unlockHint: 'Terbuka untuk semua pengguna.',
    lessons: [
      {
        id: 'why-blockchain',
        slug: 'why-blockchain',
        title: 'Kenapa Kita Butuh Blockchain?',
        summary: 'Mulai dari masalah kepercayaan digital dengan contoh sehari-hari.',
        estimatedMinutes: 8,
        modeHint: ['beginner', 'guided'],
        checkpoint: 'Pengguna bisa menjelaskan masalah trust dengan bahasa sederhana.',
        body: [
          'Bayangkan ada catatan iuran komunitas yang hanya disimpan oleh satu orang. Jika catatan itu hilang, rusak, atau diubah sepihak, anggota lain sulit membuktikan versi mana yang benar.',
          'Blockchain lahir dari masalah kepercayaan digital seperti ini. Ia membuat catatan bersama yang dapat diperiksa banyak pihak, sehingga perubahan tidak hanya bergantung pada satu penjaga data.',
          'Untuk pemula, bagian terpenting bukan harga token atau janji cepat kaya. Bagian terpenting adalah memahami bahwa blockchain membantu orang mengecek asal-usul, urutan, dan keutuhan sebuah catatan.',
          'Di Spark, blockchain menjadi fondasi sebelum membahas cryptocurrency, wallet, Web3, dan Starknet. Urutannya sengaja dibuat pelan agar pengguna tidak langsung masuk ke risiko teknis tanpa memahami alasan dasarnya.'
        ],
        checkpointQuestion: 'Apa masalah utama yang ingin dijawab oleh blockchain?',
        checkpointOptions: [
          { id: 'trust', label: 'Membantu banyak pihak memverifikasi catatan bersama', correct: true, feedback: 'Benar. Fokus awal blockchain adalah trust dan verifikasi.' },
          { id: 'profit', label: 'Membuat semua orang cepat kaya', feedback: 'Belum tepat. Spark tidak memulai dari spekulasi, tetapi dari pemahaman trust.' },
          { id: 'password', label: 'Mengganti semua password internet', feedback: 'Belum tepat. Blockchain bisa terkait identitas, tetapi bukan sekadar pengganti password.' }
        ],
        glossaryTerms: [
          { term: 'Blockchain', simple: 'Catatan digital bersama yang sulit diubah sepihak.', technical: 'Distributed ledger dengan mekanisme konsensus.' },
          { term: 'Trust', simple: 'Rasa percaya bahwa catatan atau aksi bisa diperiksa kebenarannya.' }
        ]
      },
      {
        id: 'shared-ledger',
        slug: 'shared-ledger',
        title: 'Catatan Bersama yang Sulit Diubah',
        summary: 'Memahami ledger tanpa masuk ke istilah teknis berlebihan.',
        estimatedMinutes: 10,
        modeHint: ['beginner', 'guided'],
        checkpoint: 'Pengguna memahami kenapa data bersama perlu disepakati.',
        body: [
          'Ledger bisa dibayangkan sebagai buku catatan. Bedanya, dalam blockchain catatan itu tidak hanya disimpan di satu tempat, melainkan direplikasi dan diperiksa oleh banyak peserta jaringan.',
          'Ketika banyak pihak memegang salinan catatan yang sama, perubahan sepihak menjadi lebih mudah terdeteksi. Jaringan perlu menyepakati urutan data agar semua pihak punya gambaran yang konsisten.',
          'Transparan bukan berarti semua identitas pribadi terbuka. Yang penting bagi pemula adalah memahami bahwa aktivitas di jaringan biasanya meninggalkan jejak yang dapat diperiksa, sehingga kehati-hatian sangat penting.',
          'Sebelum masuk ke wallet atau aplikasi, pengguna perlu tahu bahwa setiap aksi onchain bukan sekadar klik biasa. Aksi itu masuk ke catatan bersama dan dapat berdampak pada akun, aset, atau reputasi digital.'
        ],
        checkpointQuestion: 'Kenapa catatan bersama lebih kuat daripada catatan satu pihak?',
        checkpointOptions: [
          { id: 'shared', label: 'Karena banyak pihak bisa ikut memeriksa dan menyepakati catatan', correct: true, feedback: 'Benar. Verifikasi bersama membuat manipulasi lebih sulit.' },
          { id: 'secret', label: 'Karena catatannya harus selalu rahasia', feedback: 'Tidak selalu. Banyak blockchain justru transparan, meskipun identitas bisa tetap terlindungi.' }
        ],
        glossaryTerms: [
          { term: 'Ledger', simple: 'Buku catatan transaksi atau perubahan data.' },
          { term: 'Verifikasi', simple: 'Proses memeriksa apakah sesuatu benar atau valid.' }
        ]
      }
    ]
  },
  {
    id: 'cryptocurrency-basics',
    level: 2,
    title: 'Cryptocurrency',
    subtitle: 'Aset digital tanpa spekulasi dulu',
    description: 'Mengenal token, transaksi, biaya jaringan, dan risiko dasar tanpa mendorong pengguna untuk trading.',
    tone: 'orange',
    unlockHint: 'Direkomendasikan setelah memahami Fondasi Blockchain.',
    lessons: [
      {
        id: 'what-is-token',
        slug: 'what-is-token',
        title: 'Apa Itu Token?',
        summary: 'Token sebagai representasi nilai/akses dalam jaringan blockchain.',
        estimatedMinutes: 9,
        modeHint: ['beginner', 'guided'],
        checkpoint: 'Pengguna bisa membedakan blockchain dan token.',
        body: [
          'Token adalah unit digital yang hidup di atas jaringan blockchain. Token bisa mewakili nilai, akses, hak, poin, biaya jaringan, atau fungsi tertentu di sebuah aplikasi.',
          'Spark tidak memperkenalkan token sebagai ajakan trading. Untuk pemula, token lebih aman dipahami sebagai bagian dari cara aplikasi blockchain mencatat kepemilikan, izin, atau aktivitas.',
          'Ada token yang dipakai untuk membayar biaya jaringan, ada token yang mewakili aset, dan ada token yang dipakai sebagai tanda partisipasi. Fungsi token selalu perlu dibaca dari konteksnya, bukan dari nama atau hype-nya saja.',
          'Sebelum menyentuh token sungguhan, pengguna perlu belajar membaca risiko: siapa penerbitnya, untuk apa token dipakai, apakah perlu signature, dan apakah aksi itu memakai testnet atau aset utama.'
        ],
        checkpointQuestion: 'Dalam Spark, token sebaiknya dipahami sebagai apa terlebih dahulu?',
        checkpointOptions: [
          { id: 'representation', label: 'Representasi nilai, akses, atau utilitas di jaringan', correct: true, feedback: 'Benar. Kita pahami token secara fungsional dulu.' },
          { id: 'gambling', label: 'Alat untuk spekulasi cepat', feedback: 'Tidak tepat. Spark menghindari framing spekulatif untuk pemula.' }
        ],
        glossaryTerms: [
          { term: 'Token', simple: 'Unit digital yang bisa mewakili nilai, akses, hak, atau utilitas.' },
          { term: 'Transaksi', simple: 'Aksi yang dicatat di jaringan blockchain.' }
        ]
      }
    ]
  },
  {
    id: 'wallet-security',
    level: 3,
    title: 'Wallet & Keamanan',
    subtitle: 'Wajib sebelum praktik',
    description: 'Seed phrase, private key, signature, scam awareness, dan kebiasaan aman sebelum menyentuh testnet.',
    tone: 'green',
    unlockHint: 'Wajib sebelum Praktik di Lab.',
    lessons: [
      {
        id: 'wallet-is-not-bank',
        slug: 'wallet-is-not-bank',
        title: 'Wallet Bukan Rekening Bank',
        summary: 'Mengenal perbedaan wallet, akun, address, dan tanggung jawab pengguna.',
        estimatedMinutes: 12,
        modeHint: ['beginner', 'guided'],
        checkpoint: 'Pengguna tahu kenapa seed phrase tidak boleh dibagikan.',
        body: [
          'Wallet bukan rekening bank biasa. Wallet adalah alat untuk mengelola akses ke akun blockchain, sedangkan kendali utamanya bergantung pada kunci rahasia seperti seed phrase atau private key.',
          'Jika seseorang mendapatkan seed phrase, ia dapat mengambil alih akses. Karena itu seed phrase tidak boleh dikirim lewat chat, disimpan sebagai screenshot, dimasukkan ke form sembarang, atau dibagikan kepada orang yang mengaku sebagai admin.',
          'Connect wallet, approve, dan sign adalah tiga pengalaman yang sering terlihat mirip oleh pemula, padahal risikonya berbeda. Connect biasanya mengenalkan alamat, sedangkan approve atau sign bisa memberi izin atau menyetujui aksi tertentu.',
          'Di Spark, pengguna dilatih mengenali bahasa risiko sebelum memakai wallet sungguhan. Tujuannya bukan menakut-nakuti, tetapi membangun kebiasaan aman: baca konteks, cek tujuan aksi, dan jangan tanda tangan jika belum paham.'
        ],
        checkpointQuestion: 'Apa prinsip keamanan paling penting saat memakai wallet?',
        checkpointOptions: [
          { id: 'seed', label: 'Jangan pernah membagikan seed phrase/private key', correct: true, feedback: 'Benar. Ini prinsip utama sebelum praktik apa pun.' },
          { id: 'screenshot', label: 'Simpan seed phrase di screenshot agar mudah dicari', feedback: 'Berbahaya. Screenshot bisa tersinkron atau bocor.' }
        ],
        glossaryTerms: [
          { term: 'Wallet', simple: 'Aplikasi untuk mengelola akses ke akun/aset blockchain.' },
          { term: 'Seed phrase', simple: 'Kumpulan kata rahasia untuk memulihkan wallet. Jangan dibagikan.' },
          { term: 'Signature', simple: 'Tanda persetujuan digital terhadap sebuah aksi.' }
        ]
      }
    ]
  },
  {
    id: 'web3-apps',
    level: 4,
    title: 'Web3 & Aplikasi',
    subtitle: 'Masuk ke aplikasi terbuka',
    description: 'Cara aplikasi Web3 bekerja, identitas, komunitas, dan hubungan pengguna dengan ekosistem.',
    tone: 'purple',
    unlockHint: 'Direkomendasikan setelah wallet & keamanan.',
    lessons: [
      {
        id: 'web3-interactions',
        slug: 'web3-interactions',
        title: 'Cara Berinteraksi dengan Aplikasi Web3',
        summary: 'Menghubungkan konsep wallet dengan pengalaman menggunakan aplikasi.',
        estimatedMinutes: 10,
        modeHint: ['guided', 'explorer'],
        checkpoint: 'Pengguna memahami connect wallet tidak sama dengan mengirim aset.',
        body: [
          'Aplikasi Web3 berbeda dari aplikasi biasa karena sebagian interaksinya dapat terhubung dengan wallet dan jaringan blockchain. Pengguna tidak hanya membuat akun, tetapi membawa alamat wallet sebagai identitas atau akses.',
          'Connect wallet bukan otomatis mengirim aset. Namun connect tetap perlu dipahami karena aplikasi bisa membaca alamat publik dan menampilkan fitur berdasarkan alamat itu.',
          'Interaksi yang lebih serius biasanya meminta signature atau transaksi. Di tahap ini pengguna harus membaca pesan, memahami tujuan aksi, dan memastikan berada di situs yang benar sebelum menyetujui apa pun.',
          'Spark menempatkan Web3 setelah wallet safety agar pengguna tidak hanya tahu tombol mana yang diklik, tetapi juga tahu kapan harus berhenti, bertanya, atau membatalkan aksi yang terasa tidak jelas.'
        ],
        checkpointQuestion: 'Apa arti connect wallet secara sederhana?',
        checkpointOptions: [
          { id: 'identity', label: 'Memberi aplikasi cara mengenali alamat wallet kita', correct: true, feedback: 'Benar. Connect wallet bukan otomatis mengirim aset.' },
          { id: 'transfer', label: 'Otomatis mengirim semua aset ke aplikasi', feedback: 'Tidak tepat. Transfer butuh aksi/signature tambahan.' }
        ],
        glossaryTerms: [
          { term: 'Web3', simple: 'Cara memakai aplikasi yang terhubung dengan wallet dan jaringan blockchain.' },
          { term: 'Connect wallet', simple: 'Menghubungkan alamat wallet ke aplikasi.' }
        ]
      }
    ]
  },
  {
    id: 'starknet-entry',
    level: 5,
    title: 'Starknet',
    subtitle: 'Fokus ekosistem Spark',
    description: 'Mengenal Starknet, account abstraction, testnet, dan cara eksplorasi ekosistem secara bertahap.',
    tone: 'blue',
    unlockHint: 'Masuk setelah fondasi Web3 cukup.',
    bridgeWarning: 'Bagian ini mulai mengenalkan istilah teknis seperti testnet, account abstraction, dan Cairo. Pemula disarankan menyelesaikan Wallet & Keamanan dulu.',
    lessons: [
      {
        id: 'starknet-first-look',
        slug: 'starknet-first-look',
        title: 'Pandangan Pertama ke Starknet',
        summary: 'Mengenal Starknet sebagai bagian dari perjalanan blockchain, bukan loncatan teknis mendadak.',
        estimatedMinutes: 12,
        modeHint: ['guided', 'explorer'],
        checkpoint: 'Pengguna memahami kenapa Spark membawa mereka ke Starknet secara bertahap.',
        body: [
          'Starknet adalah jaringan Layer 2 yang membantu aplikasi blockchain berjalan lebih scalable dengan tetap terhubung pada keamanan Ethereum melalui bukti kriptografi. Untuk pemula, cukup pahami dulu bahwa Starknet adalah jalur ekosistem yang membutuhkan kesiapan sebelum praktik.',
          'Di Starknet, akun pengguna berbentuk smart contract account. Ini membuka ruang untuk account abstraction, yaitu akun yang dapat punya logika lebih fleksibel dibanding model wallet sederhana.',
          'Fleksibilitas ini menarik, tetapi pemula tetap perlu disiplin membaca risiko. Wallet, signature, transaksi, biaya jaringan, testnet, dan explorer tetap harus dipahami secara bertahap.',
          'Spark mengenalkan Starknet setelah fondasi blockchain, token, wallet, dan Web3 karena tujuan utamanya adalah readiness. Pengguna diarahkan untuk memahami dulu, berlatih aman, lalu mengeksplorasi Hub dan ekosistem Starknet dengan lebih percaya diri.'
        ],
        checkpointQuestion: 'Kenapa Spark mengenalkan Starknet secara bertahap?',
        checkpointOptions: [
          { id: 'safe', label: 'Agar pengguna punya fondasi sebelum praktik teknis', correct: true, feedback: 'Benar. Spark mengutamakan readiness sebelum eksplorasi teknis.' },
          { id: 'random', label: 'Karena Starknet tidak berhubungan dengan blockchain', feedback: 'Tidak tepat. Starknet adalah bagian dari ekosistem blockchain.' }
        ],
        glossaryTerms: [
          { term: 'Starknet', simple: 'Ekosistem blockchain yang menjadi fokus eksplorasi Spark.' },
          { term: 'Testnet', simple: 'Jaringan latihan untuk belajar tanpa memakai aset utama.' },
          { term: 'Cairo', simple: 'Bahasa/teknologi yang digunakan dalam pengembangan Starknet.' }
        ]
      },
      {
        id: 'cairo-gentle-intro',
        slug: 'cairo-gentle-intro',
        title: 'Cairo: Kenalan, Bukan Langsung Coding',
        summary: 'Jembatan sebelum pengguna melihat kode atau metrik jaringan.',
        estimatedMinutes: 11,
        modeHint: ['explorer'],
        checkpoint: 'Pengguna tahu bahwa Cairo adalah bagian teknis yang bisa dipelajari setelah fondasi siap.',
        body: [
          'Cairo adalah bahasa dan ekosistem pengembangan yang digunakan dalam dunia Starknet. Pemula tidak harus langsung menulis kode, tetapi penting mengenal bahwa aplikasi Starknet dibangun dengan alat teknis yang bisa dipelajari bertahap.',
          'Cara paling aman untuk mengenalkan Cairo kepada non-teknikal learner adalah sebagai peta, bukan ujian. Mereka cukup tahu bahwa smart contract berisi aturan, fungsi, dan data yang menentukan bagaimana sebuah aplikasi berjalan.',
          'Setelah pengguna lebih siap, Cairo dapat menjadi pintu menuju jalur builder: membaca contoh kode, memahami contract, mencoba tool seperti Scarb atau Starknet Foundry, lalu masuk ke latihan teknis yang lebih serius.',
          'Di Spark, lesson Cairo ini berfungsi sebagai jembatan. Ia memberi konteks bahwa Starknet bukan hanya tempat memakai aplikasi, tetapi juga ruang untuk membangun, berkontribusi, dan memahami teknologi secara lebih dalam.'
        ],
        checkpointQuestion: 'Bagaimana pemula sebaiknya melihat Cairo?',
        checkpointOptions: [
          { id: 'bridge', label: 'Sebagai tahap teknis lanjutan setelah fondasi siap', correct: true, feedback: 'Benar. Cairo tidak harus muncul sebelum pengguna siap.' },
          { id: 'first', label: 'Sebagai hal pertama yang wajib dipelajari semua pemula', feedback: 'Belum tepat. Pemula perlu memahami fondasi dulu.' }
        ],
        glossaryTerms: [
          { term: 'Cairo', simple: 'Bagian teknis pengembangan Starknet yang bisa dipelajari bertahap.' },
          { term: 'Explorer mode', simple: 'Mode untuk pengguna yang siap melihat detail teknis.' }
        ]
      }
    ]
  }
];

export const sparkLabs: SparkLab[] = [
  {
    id: 'safe-wallet-check',
    title: 'Simulasi Cek Wallet Aman',
    summary: 'Latihan mengenali aksi aman tanpa memakai aset sungguhan.',
    difficulty: 'safe',
    action: 'Mulai Simulasi',
    estimatedMinutes: 8,
    readinessHint: 'Cocok untuk pemula sebelum connect wallet.',
    steps: ['Baca skenario', 'Kenali permintaan berbahaya', 'Pilih tindakan aman', 'Simpan hasil ke Passport']
  },
  {
    id: 'testnet-readiness',
    title: 'Testnet Readiness',
    summary: 'Checklist sebelum mencoba aksi testnet di ekosistem Starknet.',
    difficulty: 'guided',
    action: 'Cek Readiness',
    estimatedMinutes: 12,
    readinessHint: 'Direkomendasikan setelah Wallet & Keamanan.',
    steps: ['Cek pemahaman wallet', 'Cek risiko signature', 'Simulasi biaya jaringan', 'Tandai siap testnet']
  },
  {
    id: 'cairo-preview',
    title: 'Cairo Preview',
    summary: 'Melihat contoh kode dengan jembatan penjelasan untuk mode penjelajah.',
    difficulty: 'technical',
    action: 'Buka Preview',
    estimatedMinutes: 15,
    readinessHint: 'Untuk mode penjelajah. Pemula akan melihat bridge warning dulu.',
    requiresBridge: true,
    steps: ['Baca peringatan teknis', 'Lihat contoh kode sederhana', 'Pahami istilah Cairo', 'Simpan sebagai eksplorasi']
  }
];

export const sparkWorkshops: SparkWorkshop[] = [
  {
    id: 'local-intro',
    title: 'Pengenalan Blockchain untuk Komunitas Lokal',
    location: 'Workshop lokal / cohort kecil',
    date: 'Akan dijadwalkan',
    summary: 'Sesi offline/online untuk memulai bersama fasilitator.',
    format: 'hybrid',
    capacity: 30,
    registered: 8,
    facilitator: 'Karyra Facilitator',
    relatedModuleId: 'blockchain-foundation'
  },
  {
    id: 'wallet-safety',
    title: 'Klinik Wallet Aman',
    location: 'Komunitas lokal',
    date: 'Akan dijadwalkan',
    summary: 'Membantu pengguna memahami wallet tanpa risiko aset.',
    format: 'offline',
    capacity: 20,
    registered: 5,
    facilitator: 'Community Mentor',
    relatedModuleId: 'wallet-security'
  },
  {
    id: 'starknet-gateway',
    title: 'Starknet Gateway Session',
    location: 'Online cohort',
    date: 'Setelah readiness awal',
    summary: 'Sesi pengantar Starknet untuk learner yang sudah melewati modul fondasi.',
    format: 'online',
    capacity: 40,
    registered: 11,
    facilitator: 'Spark Technical Guide',
    relatedModuleId: 'starknet-entry'
  }
];

export const hubResources: HubResource[] = [
  {
    id: 'starknet-ecosystem-map',
    title: 'Peta Ekosistem Starknet',
    category: 'reading',
    summary: 'Resource kurasi untuk memahami aplikasi, tools, dan komunitas Starknet.',
    readiness: 'recommended',
    riskLabel: 'low',
    url: 'https://starknet.io'
  },
  {
    id: 'safe-apps-directory',
    title: 'Direktori Apps Aman untuk Eksplorasi',
    category: 'apps',
    summary: 'Daftar aplikasi yang diberi label edukatif dan tingkat risiko.',
    readiness: 'after-passport',
    riskLabel: 'medium',
    url: 'https://www.starknet-ecosystem.com'
  },
  {
    id: 'community-gateway',
    title: 'Gateway Komunitas',
    category: 'community',
    summary: 'Jembatan menuju komunitas, event, dan resource lanjutan.',
    readiness: 'open',
    riskLabel: 'low',
    url: 'https://community.starknet.io'
  },
  {
    id: 'developer-tools-preview',
    title: 'Preview Tools Developer',
    category: 'tools',
    summary: 'Pengenalan tools untuk pengguna yang mulai tertarik masuk jalur teknis.',
    readiness: 'after-passport',
    riskLabel: 'technical',
    url: 'https://book.starknet.io'
  }
];

export function getLesson(slug: string) {
  for (const module of sparkModules) {
    const lesson = module.lessons.find((item) => item.slug === slug);
    if (lesson) return { module, lesson };
  }

  return undefined;
}
