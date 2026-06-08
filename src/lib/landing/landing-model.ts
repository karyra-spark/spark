export type Tone = 'blue' | 'green' | 'purple' | 'orange' | 'pink';

export const landingFlowSteps = [
  { id:'core', title:'Core', label:'Belajar', copy:'Belajar fondasi blockchain, crypto, Web3, wallet safety, dan pengantar Starknet.', href:'/core', icon:'book-open', tone:'blue' },
  { id:'lab', title:'Lab', label:'Praktik', copy:'Praktik simulasi aman sebelum testnet, wallet, atau eksplorasi teknis.', href:'/lab', icon:'flask-conical', tone:'purple' },
  { id:'passport', title:'Passport', label:'Terbukti', copy:'Buktikan kesiapan melalui sinyal belajar, praktik, dan komunitas.', href:'/profile', icon:'badge', tone:'green' },
  { id:'community', title:'Community', label:'Bersama', copy:'Belajar bersama lewat workshop, cohort, dan fasilitator lokal.', href:'/community', icon:'users', tone:'pink' },
  { id:'hub', title:'Hub', label:'Jelajah', copy:'Jelajahi resource dan ekosistem setelah punya arah dan kesiapan dasar.', href:'/hub', icon:'compass', tone:'orange' }
] as const;

export const landingAudienceCards = [
  { title:'Pemula lokal', copy:'Untuk orang yang baru mengenal blockchain dan takut salah langkah.', icon:'users', tone:'blue', href:'/core' },
  { title:'Komunitas & workshop', copy:'Untuk fasilitator yang membawa literasi blockchain ke ruang belajar lokal.', icon:'calendar', tone:'pink', href:'/community' },
  { title:'Pengguna yang ingin siap', copy:'Untuk learner yang ingin memahami wallet, Web3, dan Starknet bertahap.', icon:'target', tone:'green', href:'/profile' },
  { title:'Penjelajah teknis', copy:'Untuk pengguna yang sudah siap masuk Lab, testnet, dan resource lanjutan.', icon:'zap', tone:'purple', href:'/lab' }
] as const;

export const landingDifferenceCards = [
  { title:'Tidak langsung transaksi', copy:'Spark memulai dari pemahaman, keamanan, dan readiness sebelum wallet atau testnet.', icon:'shield', tone:'green' },
  { title:'Bukan kursus lepas', copy:'Core, Lab, Passport, Community, Inbox, dan Hub tersambung sebagai satu ekosistem.', icon:'layers', tone:'blue' },
  { title:'Ramah untuk pemula', copy:'Istilah teknis dijembatani dengan bahasa sederhana, lalu teknikal hadir setelah fondasi.', icon:'help', tone:'purple' },
  { title:'Punya jalur lanjut', copy:'Setelah siap, pengguna bisa bergerak ke Hub dan mengeksplorasi ekosistem Starknet.', icon:'compass', tone:'orange' }
] as const;

export const landingFeatureCards = [
  { title:'Kurikulum Core', copy:'Jalur belajar utama dari fondasi blockchain menuju Starknet.', icon:'book-open', tone:'blue', href:'/core' },
  { title:'Practice Lab', copy:'Simulasi wallet safety dan latihan bertahap tanpa aset sungguhan.', icon:'flask-conical', tone:'purple', href:'/lab' },
  { title:'Readiness Passport', copy:'Ringkasan sinyal kesiapan dari belajar, praktik, dan komunitas.', icon:'badge', tone:'green', href:'/profile' },
  { title:'Workshop & Cohort', copy:'Aktivasi komunitas lokal untuk belajar bersama.', icon:'users', tone:'pink', href:'/community' },
  { title:'Spark Hub', copy:'Gateway resource, tools, apps, dan misi ekosistem.', icon:'compass', tone:'orange', href:'/hub' },
  { title:'Inbox', copy:'Pesan, notifikasi, dan arahan belajar dalam satu ruang.', icon:'messages', tone:'blue', href:'/inbox' }
] as const;

export const landingFooterColumns = [
  { title:'Produk', links:[['Core','/core','Kurikulum utama'],['Practice Lab','/lab','Simulasi aman'],['Passport','/profile','Readiness pengguna'],['Community','/community','Workshop & cohort'],['Hub','/hub','Gateway resource']] },
  { title:'Mulai', links:[['Masuk Mode coba','/login','Coba alur aplikasi'],['Dashboard','/dashboard','Ruang kerja harian'],['Lesson pertama','/lesson/why-blockchain','Mulai dari fondasi'],['Inbox','/inbox','Pesan dan arahan']] },
  { title:'Tentang Spark', links:[['Alur Spark','/#alur','Core → Lab → Passport → Hub'],['Untuk siapa','/#untuk-siapa','Pemula, komunitas, penjelajah'],['Kenapa berbeda','/#kenapa-berbeda','Readiness-first'],['Fitur utama','/#fitur','Preview ekosistem']] },
  { title:'Keamanan', links:[['Settings','/settings','Tema, mode, data lokal'],['Wallet Safety','/lab','Simulasi risiko'],['Data lokal','/settings','Kontrol perangkat'],['Bukan saran finansial','/#footer','Fokus edukasi']] }
] as const;

export const landingTrustNotes = [
  'Tidak meminta seed phrase atau private key.',
  'Belajar dimulai dari pemahaman, bukan transaksi.',
  'Mode beta memakai progress lokal di perangkat.',
  'Dirancang mobile-first untuk komunitas lokal.'
] as const;
