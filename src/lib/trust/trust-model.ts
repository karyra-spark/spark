export type TrustLabelTone = 'neutral' | 'safe' | 'target' | 'local' | 'beta';

export type TrustLabel = {
  label: string;
  copy: string;
  tone: TrustLabelTone;
};

export const trustLabels = {
  beta: {
    label: 'Beta tertutup',
    copy: 'Frontend sedang dimatangkan sebelum rilis publik dan integrasi backend penuh.',
    tone: 'beta'
  },
  localData: {
    label: 'Data lokal',
    copy: 'Progress saat ini tersimpan di perangkat/browser sebagai simulasi aman.',
    tone: 'local'
  },
  targetMetric: {
    label: 'Target awal',
    copy: 'Angka ini adalah target/arah aktivasi, bukan klaim traction final.',
    tone: 'target'
  },
  placeholder: {
    label: 'Placeholder aman',
    copy: 'Fitur disiapkan sebagai ruang integrasi tanpa mengaktifkan sistem produksi terlalu cepat.',
    tone: 'safe'
  }
} satisfies Record<string, TrustLabel>;

export const productionLanguageRules = [
  'Tidak memakai istilah reviewer/review mode di UI publik.',
  'Akun demo nanti diposisikan sebagai akun contoh yang benar-benar bisa login.',
  'Data lokal dan angka target diberi label jujur agar tidak terlihat sebagai klaim traction palsu.',
  'Fitur teknis seperti wallet/editor tetap placeholder sampai grant/backend lebih pasti.'
];
