export const cairoPlaceholderCode = `// Karyra Spark — Cairo Preview Placeholder
// Mode Penjelajah: konsep dulu, integrasi compiler nanti.

#[starknet::contract]
mod SparkReadinessProof {
    #[storage]
    struct Storage {
        learner_score: felt252,
    }

    #[external(v0)]
    fn update_readiness(ref self: ContractState, score: felt252) {
        self.learner_score.write(score);
    }

    #[external(v0)]
    fn get_readiness(self: @ContractState) -> felt252 {
        self.learner_score.read()
    }
}`;

export const explorerWorkspaceNotes = [
  {
    title: 'Belum mengaktifkan compiler',
    copy: 'CodeMirror dan compiler Cairo disiapkan untuk Pass 13B setelah grant/arah teknis lebih pasti.'
  },
  {
    title: 'Belum konek wallet asli',
    copy: 'StarknetKit disimpan untuk Pass 13C agar tidak overbuild sebelum frontend dan grant siap.'
  },
  {
    title: 'Tetap terasa advanced',
    copy: 'Pengguna advanced tetap melihat workspace, kode preview, dan jalur teknis yang jelas.'
  }
];

export const guideSteps = [
  {
    key: 'core',
    title: 'Mulai dari Core',
    copy: 'Core adalah pusat belajar. Pemula memulai dari blockchain foundation, lalu naik ke Web3 dan Starknet.',
    href: '/core',
    icon: 'book-open'
  },
  {
    key: 'lab',
    title: 'Masuk Practice Lab',
    copy: 'Lab digunakan setelah pengguna punya konteks. Di sini ada simulasi, readiness, dan mode penjelajah.',
    href: '/lab',
    icon: 'flask-conical'
  },
  {
    key: 'profile',
    title: 'Bangun Passport',
    copy: 'Profile menyimpan readiness, progress, praktik, workshop, dan resource Hub.',
    href: '/profile',
    icon: 'badge'
  },
  {
    key: 'hub',
    title: 'Jelajahi Hub',
    copy: 'Hub adalah gateway ke resource, apps, tools, komunitas, dan ekosistem setelah readiness cukup.',
    href: '/hub',
    icon: 'compass'
  }
];

export const walletBridgeStages = [
  {
    title: 'Wallet belum wajib',
    copy: 'Pemula tidak dipaksa connect wallet sebelum memahami keamanan dasar.'
  },
  {
    title: 'StarknetKit siap masuk',
    copy: 'Saat grant/backend siap, panel ini bisa diganti ke real wallet modal dengan StarknetKit.'
  },
  {
    title: 'Status tetap tercatat',
    copy: 'Saat ini status readiness wallet bisa dicatat lokal sebagai placeholder aman.'
  }
];
