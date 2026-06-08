import type { SparkLab } from '$content/spark-content';

export type LabPrinciple = {
  title: string;
  copy: string;
  icon: string;
  tone: 'blue' | 'green' | 'purple' | 'orange' | 'pink';
};

export const labPrinciples: LabPrinciple[] = [
  {
    title: 'Simulasi dulu',
    copy: 'Pemula tidak perlu memakai aset sungguhan atau wallet produksi untuk belajar.',
    icon: 'shield',
    tone: 'blue'
  },
  {
    title: 'Guardrail jelas',
    copy: 'Setiap lab punya risiko, batasan, dan outcome agar pengguna tahu konteks.',
    icon: 'lock',
    tone: 'green'
  },
  {
    title: 'Proof-of-practice',
    copy: 'Latihan yang selesai menjadi sinyal readiness di Passport.',
    icon: 'badge',
    tone: 'purple'
  },
  {
    title: 'Teknis bertahap',
    copy: 'Cairo dan testnet masuk setelah fondasi wallet dan keamanan cukup.',
    icon: 'code',
    tone: 'orange'
  }
];

export function difficultyLabel(value: SparkLab['difficulty']) {
  if (value === 'safe') return 'Pemula aman';
  if (value === 'guided') return 'Terarah';
  return 'Teknis';
}

/**
 * Tone untuk SparkTrustBadge.
 * Jangan gunakan blue/green/orange di sini karena SparkTrustBadge menerima:
 * neutral | safe | target | local | beta
 */
export function difficultyTone(value: SparkLab['difficulty']) {
  if (value === 'safe') return 'safe';
  if (value === 'guided') return 'beta';
  return 'target';
}

export function labOutcome(lab: SparkLab) {
  if (lab.id === 'safe-wallet-check') return 'Mengenali permintaan wallet yang aman dan berbahaya.';
  if (lab.id === 'testnet-readiness') return 'Memahami kapan pengguna siap mencoba testnet.';
  if (lab.id === 'cairo-preview') return 'Melihat Cairo sebagai tahap eksplorasi, bukan syarat awal.';
  return 'Menyelesaikan latihan aman dan menambah sinyal readiness.';
}

export function labGuardrail(lab: SparkLab) {
  if (lab.requiresBridge) return 'Butuh bridge warning. Tidak cocok sebagai langkah pertama untuk pemula.';
  if (lab.difficulty === 'safe') return 'Tidak memakai wallet sungguhan dan tidak memakai aset.';
  if (lab.difficulty === 'guided') return 'Ikuti checklist sebelum mencoba tindakan teknis.';
  return 'Mode penjelajah. Pastikan pengguna sudah paham risiko dasar.';
}

export const labProofRoadmap = [
  {
    title: 'Simulasi',
    copy: 'Pengguna menyelesaikan latihan tanpa risiko aset.',
    icon: 'flask-conical'
  },
  {
    title: 'Readiness',
    copy: 'Hasil latihan masuk sebagai sinyal kesiapan.',
    icon: 'target'
  },
  {
    title: 'Passport',
    copy: 'Sinyal praktik digabung dengan lesson dan komunitas.',
    icon: 'badge'
  },
  {
    title: 'Hub',
    copy: 'Pengguna masuk eksplorasi saat readiness cukup.',
    icon: 'compass'
  }
];
