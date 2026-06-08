export type SparkTone = 'blue' | 'green' | 'purple' | 'orange' | 'pink';
export type SparkPriority = 'high' | 'normal' | 'low';
export type SparkMessageKind = 'semua' | 'prioritas' | 'sistem' | 'direct' | 'belajar' | 'workshop' | 'hub' | 'support';

export type SparkNotification = {
  id: string; kind: string; title: string; copy: string; href: string;
  tone: SparkTone; status: string; priority: SparkPriority; icon: string;
};

export type SparkMessage = {
  id: string; kind: Exclude<SparkMessageKind, 'semua'>; title: string; preview: string; body: string;
  time: string; href: string; cta: string; tone: SparkTone; icon: string; priority: SparkPriority;
  sender: string; tags: string[];
};

export const sparkMessageFilters: { key: SparkMessageKind; label: string }[] = [
  { key: 'semua', label: 'Semua' },
  { key: 'prioritas', label: 'Prioritas' },
  { key: 'belajar', label: 'Belajar' },
  { key: 'workshop', label: 'Workshop' },
  { key: 'hub', label: 'Hub' },
  { key: 'direct', label: 'Direct' },
  { key: 'sistem', label: 'Sistem' },
  { key: 'support', label: 'Support' }
];

export const sparkMessages: SparkMessage[] = [
  { id:'priority-start-core', kind:'prioritas', title:'Mulai dari Spark Core', preview:'Bangun fondasi blockchain sebelum masuk Practice Lab dan Hub.', body:'Spark Core adalah pusat kurikulum. Pengguna pemula sebaiknya memulai dari fondasi blockchain, lalu naik ke cryptocurrency, wallet safety, Web3, Starknet, Practice Lab, dan Passport.', time:'Hari ini', href:'/core', cta:'Buka Core', tone:'blue', icon:'book-open', priority:'high', sender:'Spark System', tags:['core','belajar','pemula'] },
  { id:'learning-completion-flow', kind:'belajar', title:'Lesson punya completion flow', preview:'Tandai selesai, lanjut lesson berikutnya, lalu masuk Lab saat fondasi cukup.', body:'Lesson page memiliki completion panel dan sticky action bar. Ini membantu pengguna memahami kapan sebuah lesson selesai dan apa langkah berikutnya.', time:'Update', href:'/lesson/why-blockchain', cta:'Coba Lesson', tone:'purple', icon:'check', priority:'normal', sender:'Learning Engine', tags:['lesson','checkpoint','completion'] },
  { id:'workshop-local-activation', kind:'workshop', title:'Workshop menjadi jembatan komunitas', preview:'Spark menghubungkan belajar online dengan cohort dan fasilitator lokal.', body:'Community page menyiapkan workshop, cohort, dan aktivasi komunitas. Ini menjaga Spark dekat dengan pengguna nyata, proses nyata, dan komunitas nyata.', time:'Komunitas', href:'/community', cta:'Lihat Community', tone:'pink', icon:'users', priority:'normal', sender:'Community Bridge', tags:['workshop','cohort','community'] },
  { id:'hub-gateway-warning', kind:'hub', title:'Hub dibuka bertahap lewat Passport', preview:'Hub adalah gateway eksplorasi setelah pengguna punya readiness cukup.', body:'Spark Hub menampilkan resource, apps, tools, komunitas, dan misi lanjutan. Untuk pemula, Hub sebaiknya dibuka setelah memahami Core dan mencoba Lab.', time:'Gateway', href:'/hub', cta:'Buka Hub', tone:'green', icon:'compass', priority:'low', sender:'Hub Gateway', tags:['hub','resource','readiness'] },
  { id:'direct-facilitator-note', kind:'direct', title:'Catatan fasilitator', preview:'Gunakan mode belajar yang sesuai. Tidak perlu masuk teknis terlalu cepat.', body:'Untuk pengguna lokal yang baru mengenal blockchain, jalur pemula tetap paling aman. Mode Penjelajah boleh digunakan setelah fondasi wallet dan keamanan dipahami.', time:'Pesan', href:'/profile', cta:'Lihat Profile', tone:'orange', icon:'messages', priority:'normal', sender:'Facilitator', tags:['direct','mentor','mode belajar'] },
  { id:'system-local-data', kind:'sistem', title:'Progress masih tersimpan lokal', preview:'Akun contoh lokal membantu demo aplikasi sebelum backend penuh aktif.', body:'Session, progress, inbox, dan status read/saved disimpan di localStorage. Struktur ini disiapkan agar nanti bisa diganti dengan backend session dan database.', time:'Sistem', href:'/settings', cta:'Buka Settings', tone:'blue', icon:'settings', priority:'low', sender:'Spark Runtime', tags:['local','backend-ready','session'] },
  { id:'support-safe-path', kind:'support', title:'Bingung mulai dari mana?', preview:'Masuk Dashboard, lalu ikuti checklist alur aplikasi.', body:'Dashboard adalah ruang kerja harian. Mulai dari checklist alur aplikasi, lanjutkan Core, selesaikan lesson, buka Lab, lalu cek Passport.', time:'Support', href:'/dashboard', cta:'Buka Dashboard', tone:'purple', icon:'help', priority:'normal', sender:'Spark Support', tags:['help','dashboard','flow'] }
];

export function kindLabel(kind: SparkMessageKind) {
  if (kind === 'prioritas') return 'Prioritas';
  if (kind === 'sistem') return 'Sistem';
  if (kind === 'direct') return 'Direct';
  if (kind === 'belajar') return 'Belajar';
  if (kind === 'workshop') return 'Workshop';
  if (kind === 'hub') return 'Hub';
  if (kind === 'support') return 'Support';
  return 'Semua';
}

export function createSparkNotifications(input: { readiness:number; learningProgress:number; completedLessons:number; completedLabs:number; registeredWorkshops:number; userName?: string }): SparkNotification[] {
  const hubUnlocked = input.readiness >= 75;
  return [
    { id:hubUnlocked?'priority-hub-ready':'priority-next-learning', kind:'Prioritas', title:hubUnlocked?'Hub sudah siap dibuka':'Lanjutkan perjalanan belajar', copy:hubUnlocked?'Readiness cukup. Mulai jelajahi resource dan ekosistem di Hub.':`${input.completedLessons} lesson selesai. Lanjutkan Core atau Lab untuk menaikkan readiness.`, href:hubUnlocked?'/hub':'/dashboard', tone:hubUnlocked?'green':'blue', status:hubUnlocked?'Masuk Hub':'Lanjut', priority:'high', icon:hubUnlocked?'compass':'sparkles' },
    { id:'learning-progress-status', kind:'Belajar', title:`${input.learningProgress}% progress belajar`, copy:'Progress lokal membantu Dashboard dan Passport memberi rekomendasi langkah berikutnya.', href:'/core', tone:'purple', status:'Core', priority:'normal', icon:'book-open' },
    { id:'practice-lab-status', kind:'Practice', title:input.completedLabs>0?'Practice Lab mulai terbentuk':'Practice Lab belum dicoba', copy:input.completedLabs>0?`${input.completedLabs} lab selesai. Sinyal praktik masuk ke Passport.`:'Setelah fondasi Core cukup, buka Lab untuk simulasi aman dan proof-of-practice.', href:'/lab', tone:'orange', status:'Lab', priority:input.completedLabs>0?'low':'normal', icon:'flask-conical' },
    { id:'community-bridge-status', kind:'Komunitas', title:input.registeredWorkshops>0?'Aktivitas komunitas tersimpan':'Workshop masih tersedia', copy:input.registeredWorkshops>0?`${input.registeredWorkshops} workshop tersimpan dalam perjalanan belajar.`:'Workshop dan cohort membantu pengguna belajar bersama komunitas lokal.', href:'/community', tone:'pink', status:'Community', priority:'normal', icon:'users' },
    { id:'system-local-session', kind:'Sistem', title:input.userName?`Session ${input.userName} aktif`:'Akun contoh tersedia', copy:input.userName?'Session beta lokal aktif. Progress dan inbox tersimpan di perangkat ini.':'Gunakan akun contoh untuk mencoba flow aplikasi nyata dari Dashboard.', href:input.userName?'/profile':'/login', tone:'blue', status:input.userName?'Profile':'Masuk', priority:'low', icon:input.userName?'user-round':'login' }
  ];
}
