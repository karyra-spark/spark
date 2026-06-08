export type LabPrinciple = {
  title: string;
  copy: string;
};

export type ProofRoadmapItem = {
  phase: string;
  proof: string;
  status: string;
  icon: string;
};

export const labPrinciples: LabPrinciple[] = [
  {
    title: 'Lab adalah ruang praktik',
    copy: 'Pengguna masuk Lab setelah memahami konteks di Core. Lab bukan halaman teori utama.'
  },
  {
    title: 'Eksperimen harus terarah',
    copy: 'Setiap lab punya tujuan, guardrail, outcome, dan proof ringan agar pemula tidak merasa dilempar ke playground kosong.'
  },
  {
    title: 'Bukti praktik berkembang bertahap',
    copy: 'Setiap latihan memberi sinyal kesiapan. Sistem bukti dapat diperluas saat backend siap.'
  }
];

export const practiceProofRoadmap: ProofRoadmapItem[] = [
  {
    phase: 'Core',
    proof: 'Proof-of-Learning',
    status: 'Pemahaman konsep dan checkpoint belajar',
    icon: 'book-open'
  },
  {
    phase: 'Lab',
    proof: 'Proof-of-Practice',
    status: 'Simulasi aman dan latihan testnet-first',
    icon: 'flask-conical'
  },
  {
    phase: 'Workshop',
    proof: 'Proof-of-Participation',
    status: 'Kehadiran cohort dan kegiatan komunitas',
    icon: 'users'
  },
  {
    phase: 'Passport',
    proof: 'Proof-of-Readiness',
    status: 'Ringkasan kesiapan sebelum Hub',
    icon: 'badge'
  }
];

export const labPositionCopy = {
  title: 'Lab bukan tempat mulai belajar. Lab adalah tempat membuktikan pemahaman.',
  copy:
    'Core menyiapkan pemahaman. Lab mengubah pemahaman itu menjadi latihan terarah: mencoba, membaca, berhenti saat ragu, lalu memahami dampaknya.'
};
