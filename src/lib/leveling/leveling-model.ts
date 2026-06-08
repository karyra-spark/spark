import type { LevelDefinition, LevelExam, SparkLevel, SparkTrack } from './leveling-types';

export const LEVEL_ORDER: SparkLevel[] = ['beginner', 'intermediate', 'advanced'];

export const sparkLevelDefinitions: LevelDefinition[] = [
  {
    id: 'beginner',
    label: 'Beginner',
    shortLabel: 'Dasar',
    title: 'Fondasi aman',
    copy: 'Memahami blockchain, token, dan keamanan dasar sebelum masuk ke praktik.',
    icon: 'shield',
    tone: 'blue',
    coreModuleIds: ['blockchain-foundation', 'cryptocurrency-basics'],
    labIds: ['safe-wallet-check']
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    shortLabel: 'Terarah',
    title: 'Wallet, transaksi, dan Web3',
    copy: 'Mengenali koneksi wallet, signature, transaksi simulasi, dan explorer dengan lebih teliti.',
    icon: 'layers',
    tone: 'green',
    coreModuleIds: ['wallet-security', 'web3-apps'],
    labIds: ['testnet-readiness']
  },
  {
    id: 'advanced',
    label: 'Advanced',
    shortLabel: 'Lanjutan',
    title: 'Starknet readiness',
    copy: 'Menyiapkan pemahaman Starknet, testnet, account abstraction, dan tooling secara bertahap.',
    icon: 'compass',
    tone: 'purple',
    coreModuleIds: ['starknet-entry'],
    labIds: ['cairo-preview']
  }
];

export const coreLevelExams: LevelExam[] = [
  {
    id: 'core-beginner-final',
    track: 'core',
    level: 'beginner',
    title: 'Ujian Core Beginner',
    summary: 'Cek pemahaman dasar tentang blockchain, token, dan keamanan awal.',
    passingScore: 70,
    questions: [
      {
        id: 'trust-purpose',
        prompt: 'Apa tujuan utama memahami blockchain di tahap awal Spark?',
        options: [
          { id: 'trust', label: 'Memahami kepercayaan digital dan cara catatan bisa diverifikasi', correct: true, feedback: 'Benar. Spark memulai dari trust, bukan spekulasi.' },
          { id: 'profit', label: 'Mencari cara cepat mendapat keuntungan', feedback: 'Belum tepat. Spark tidak memulai dari spekulasi.' },
          { id: 'wallet-first', label: 'Langsung membuat wallet dan mencoba transaksi', feedback: 'Belum tepat. Wallet masuk setelah fondasi dan keamanan cukup.' }
        ]
      },
      {
        id: 'token-basics',
        prompt: 'Token sebaiknya dipahami sebagai apa terlebih dahulu?',
        options: [
          { id: 'utility', label: 'Representasi nilai, akses, atau utilitas di jaringan', correct: true, feedback: 'Benar. Pahami fungsi token dulu.' },
          { id: 'lottery', label: 'Tiket spekulasi tanpa risiko', feedback: 'Tidak tepat. Token tetap punya risiko.' },
          { id: 'password', label: 'Pengganti semua password internet', feedback: 'Tidak tepat. Token bukan password.' }
        ]
      },
      {
        id: 'seed-safety',
        prompt: 'Apa prinsip keamanan paling penting sebelum belajar wallet?',
        options: [
          { id: 'never-share', label: 'Jangan pernah membagikan seed phrase atau private key', correct: true, feedback: 'Benar. Ini guardrail utama.' },
          { id: 'screenshot', label: 'Simpan seed phrase di screenshot agar mudah dicari', feedback: 'Berbahaya. Screenshot bisa bocor atau tersinkron.' },
          { id: 'send-to-friend', label: 'Kirim seed phrase ke teman agar ada cadangan', feedback: 'Berbahaya. Seed phrase tidak boleh dibagikan.' }
        ]
      }
    ]
  },
  {
    id: 'core-intermediate-final',
    track: 'core',
    level: 'intermediate',
    title: 'Ujian Core Intermediate',
    summary: 'Cek pemahaman wallet, aplikasi Web3, signature, dan transaksi simulasi.',
    passingScore: 75,
    questions: [
      {
        id: 'connect-wallet',
        prompt: 'Apa arti connect wallet secara sederhana?',
        options: [
          { id: 'identify-address', label: 'Aplikasi mengenali alamat wallet, belum otomatis memindahkan aset', correct: true, feedback: 'Benar. Tetap perlu memeriksa izin setelah connect.' },
          { id: 'auto-transfer', label: 'Aset otomatis dikirim ke aplikasi', feedback: 'Tidak tepat. Transfer butuh aksi dan persetujuan tambahan.' },
          { id: 'seed-share', label: 'User harus membagikan seed phrase', feedback: 'Sangat berbahaya dan tidak benar.' }
        ]
      },
      {
        id: 'signature-review',
        prompt: 'Kenapa signature perlu dibaca sebelum disetujui?',
        options: [
          { id: 'understand-action', label: 'Agar pengguna tahu aksi apa yang sedang disetujui', correct: true, feedback: 'Benar. Signature adalah persetujuan digital.' },
          { id: 'skip', label: 'Supaya proses lebih cepat tanpa perlu paham', feedback: 'Belum tepat. Spark mengutamakan pemahaman sebelum klik.' },
          { id: 'hide-risk', label: 'Agar risiko tidak terlihat', feedback: 'Tidak tepat. Risiko justru perlu terlihat.' }
        ]
      },
      {
        id: 'explorer-use',
        prompt: 'Apa fungsi explorer dalam konteks belajar?',
        options: [
          { id: 'verify', label: 'Membantu memeriksa status dan detail transaksi', correct: true, feedback: 'Benar. Explorer membantu verifikasi.' },
          { id: 'guarantee-profit', label: 'Menjamin transaksi menghasilkan profit', feedback: 'Tidak benar. Explorer bukan alat profit.' },
          { id: 'replace-wallet', label: 'Menggantikan wallet sepenuhnya', feedback: 'Tidak tepat. Explorer berbeda dari wallet.' }
        ]
      }
    ]
  },
  {
    id: 'core-advanced-final',
    track: 'core',
    level: 'advanced',
    title: 'Ujian Core Advanced',
    summary: 'Cek kesiapan konsep sebelum masuk eksplorasi Starknet yang lebih teknis.',
    passingScore: 80,
    questions: [
      {
        id: 'starknet-gradual',
        prompt: 'Kenapa Spark mengenalkan Starknet secara bertahap?',
        options: [
          { id: 'safe-readiness', label: 'Agar pengguna punya fondasi sebelum eksplorasi teknis', correct: true, feedback: 'Benar. Starknet readiness dibangun bertahap.' },
          { id: 'random-topic', label: 'Karena Starknet tidak berhubungan dengan blockchain', feedback: 'Tidak tepat. Starknet adalah bagian dari ekosistem blockchain.' },
          { id: 'avoid-learning', label: 'Agar pengguna tidak perlu belajar keamanan', feedback: 'Tidak benar. Keamanan tetap wajib.' }
        ]
      },
      {
        id: 'account-abstraction',
        prompt: 'Bagaimana cara aman mengenalkan account abstraction ke pemula?',
        options: [
          { id: 'simple-first', label: 'Mulai dari manfaat dan contoh sederhana sebelum istilah teknis', correct: true, feedback: 'Benar. Spark menjembatani konsep dulu.' },
          { id: 'code-first', label: 'Langsung memberi kode tanpa konteks', feedback: 'Belum cocok untuk readiness pemula.' },
          { id: 'ignore-risk', label: 'Abaikan risiko karena ini fitur lanjutan', feedback: 'Tidak tepat. Risiko tetap perlu dibahas.' }
        ]
      },
      {
        id: 'testnet-purpose',
        prompt: 'Apa fungsi testnet dalam perjalanan belajar?',
        options: [
          { id: 'practice', label: 'Ruang latihan sebelum memakai jaringan utama atau aset sungguhan', correct: true, feedback: 'Benar. Testnet dipakai untuk latihan aman.' },
          { id: 'main-money', label: 'Tempat menyimpan aset utama', feedback: 'Tidak tepat. Testnet bukan mainnet.' },
          { id: 'kyc', label: 'Pengganti verifikasi identitas', feedback: 'Tidak tepat. Testnet bukan KYC.' }
        ]
      }
    ]
  }
];

export const labLevelExams: LevelExam[] = [
  {
    id: 'lab-beginner-final',
    track: 'lab',
    level: 'beginner',
    title: 'Ujian Lab Beginner',
    summary: 'Latihan mengambil keputusan aman saat melihat permintaan wallet dasar.',
    passingScore: 70,
    questions: [
      {
        id: 'seed-request',
        prompt: 'Sebuah website meminta seed phrase. Apa tindakan yang benar?',
        options: [
          { id: 'leave', label: 'Tutup website dan jangan masukkan seed phrase', correct: true, feedback: 'Benar. Itu red flag besar.' },
          { id: 'type', label: 'Ketik seed phrase jika websitenya terlihat bagus', feedback: 'Berbahaya. Seed phrase tidak pernah dimasukkan ke website.' },
          { id: 'ask-chat', label: 'Kirim seed phrase ke komunitas untuk dicek', feedback: 'Berbahaya. Jangan bagikan seed phrase ke siapa pun.' }
        ]
      },
      {
        id: 'safe-checklist',
        prompt: 'Sebelum mencoba simulasi wallet, apa yang harus diperiksa?',
        options: [
          { id: 'url-request-network', label: 'Alamat website, isi permintaan, dan jaringan yang dipakai', correct: true, feedback: 'Benar. Ini bagian dasar checklist aman.' },
          { id: 'logo-only', label: 'Cukup lihat logo aplikasi', feedback: 'Belum cukup. Logo bisa dipalsukan.' },
          { id: 'speed', label: 'Klik cepat agar tidak tertinggal', feedback: 'Tidak tepat. Jangan terburu-buru.' }
        ]
      }
    ]
  },
  {
    id: 'lab-intermediate-final',
    track: 'lab',
    level: 'intermediate',
    title: 'Ujian Lab Intermediate',
    summary: 'Latihan membaca signature, transaksi simulasi, dan status explorer.',
    passingScore: 75,
    questions: [
      {
        id: 'signature-risk',
        prompt: 'Signature terlihat panjang dan tidak jelas. Apa tindakan paling aman?',
        options: [
          { id: 'pause', label: 'Berhenti dulu dan cari konteks sebelum menyetujui', correct: true, feedback: 'Benar. Jangan menyetujui hal yang belum dipahami.' },
          { id: 'approve', label: 'Setujui saja karena semua signature aman', feedback: 'Tidak tepat. Signature tetap perlu dibaca.' },
          { id: 'share-key', label: 'Bagikan private key agar fasilitator mengecek', feedback: 'Berbahaya. Private key tidak boleh dibagikan.' }
        ]
      },
      {
        id: 'tx-review',
        prompt: 'Apa yang perlu dicek saat membaca transaksi simulasi?',
        options: [
          { id: 'amount-address-network', label: 'Nominal, alamat tujuan, jaringan, dan izin', correct: true, feedback: 'Benar. Ini bagian inti review transaksi.' },
          { id: 'button-color', label: 'Warna tombol saja', feedback: 'Tidak cukup. Detail transaksi lebih penting.' },
          { id: 'ignore-network', label: 'Abaikan jaringan karena tidak penting', feedback: 'Tidak tepat. Jaringan harus dipahami.' }
        ]
      }
    ]
  },
  {
    id: 'lab-advanced-final',
    track: 'lab',
    level: 'advanced',
    title: 'Ujian Lab Advanced',
    summary: 'Latihan kesiapan testnet, explorer Starknet, dan sandbox teknis bertahap.',
    passingScore: 80,
    questions: [
      {
        id: 'testnet-safe',
        prompt: 'Apa sikap paling aman saat masuk testnet?',
        options: [
          { id: 'practice-only', label: 'Anggap testnet sebagai latihan, tetap cek instruksi dan risiko', correct: true, feedback: 'Benar. Testnet aman untuk belajar, bukan untuk ceroboh.' },
          { id: 'main-assets', label: 'Pakai aset utama agar hasilnya nyata', feedback: 'Tidak tepat. Testnet tidak memakai aset utama.' },
          { id: 'skip-safety', label: 'Lewati semua checklist karena hanya testnet', feedback: 'Belum tepat. Kebiasaan aman tetap dibangun.' }
        ]
      },
      {
        id: 'starknet-sandbox',
        prompt: 'Apa tujuan sandbox Starknet di Spark?',
        options: [
          { id: 'guided-readiness', label: 'Membantu eksplorasi teknis bertahap setelah fondasi cukup', correct: true, feedback: 'Benar. Sandbox mengikuti readiness.' },
          { id: 'random-code', label: 'Langsung memaksa semua user menulis kode', feedback: 'Tidak cocok untuk Spark.' },
          { id: 'wallet-seed', label: 'Mengumpulkan seed phrase untuk latihan', feedback: 'Sangat salah. Spark tidak meminta seed phrase.' }
        ]
      }
    ]
  }
];

export function getLevelDefinition(level: SparkLevel) {
  return sparkLevelDefinitions.find((item) => item.id === level) ?? sparkLevelDefinitions[0];
}

export function getLevelIndex(level: SparkLevel) {
  return LEVEL_ORDER.indexOf(level);
}

export function getExam(track: SparkTrack, level: SparkLevel) {
  return (track === 'core' ? coreLevelExams : labLevelExams).find((exam) => exam.level === level);
}

export function getLevelLabel(level: SparkLevel) {
  return getLevelDefinition(level).label;
}
