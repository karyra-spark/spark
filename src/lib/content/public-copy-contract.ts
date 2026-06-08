export const publicCopyActionVerbs = [
  'Mulai',
  'Lanjutkan',
  'Ikuti',
  'Kirim',
  'Lihat',
  'Temukan',
  'Jelajahi',
  'Selesaikan',
  'Simpan',
  'Coba'
] as const;

export const publicCopyForbiddenTerms = [
  'sesi backend',
  'session backend',
  'evidence root',
  'proof event ledger',
  'recorded proof event',
  'local-state',
  'sync queue',
  'runtime',
  'endpoint',
  'payload',
  'HttpOnly'
] as const;

export const publicCopyReplacements: Record<string, string> = {
  'sesi backend': 'akun tersimpan aman',
  'session backend': 'akun tersimpan aman',
  'evidence root': 'bukti tersimpan aman',
  'proof event ledger': 'jejak belajar',
  'recorded proof event': 'bukti belajarmu tercatat',
  'local-state': 'data di perangkat ini',
  'sync queue': 'menunggu tersinkron',
  runtime: 'aplikasi',
  endpoint: 'halaman/layanan',
  payload: 'data',
  HttpOnly: 'aman untuk akunmu'
};

export const publicCopyToastExamples = {
  saved: {
    title: 'Progres tersimpan',
    copy: 'Kamu bisa lanjut dari langkah ini kapan saja.'
  },
  proofRecorded: {
    title: 'Bukti belajarmu tercatat',
    copy: 'Passport-mu akan memakai bukti ini saat kamu sudah memenuhi syarat.'
  },
  loadFailed: {
    title: 'Belum bisa memuat data',
    copy: 'Periksa koneksi, lalu coba lagi sebentar.'
  }
} as const;
