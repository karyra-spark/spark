import type { SparkModule } from '$content/spark-content';
export type CoreCardTone = 'blue' | 'green' | 'purple' | 'orange' | 'pink';
export const coreDestinations = [
  { href:'/lab', title:'Practice Lab', copy:'Ubah pemahaman menjadi simulasi aman dan proof-of-practice.', icon:'flask-conical', tone:'purple' as CoreCardTone },
  { href:'/profile', title:'Passport', copy:'Lihat readiness, sinyal belajar, praktik, dan komunitas.', icon:'badge', tone:'green' as CoreCardTone },
  { href:'/community', title:'Community', copy:'Ikut workshop, cohort, dan dukungan fasilitator lokal.', icon:'users', tone:'pink' as CoreCardTone },
  { href:'/hub', title:'Hub', copy:'Jelajahi resource ekosistem setelah readiness cukup.', icon:'compass', tone:'blue' as CoreCardTone }
];
export const coreSupportCards = [
  { title:'Untuk pemula', copy:'Mulai dari Level 1. Jangan masuk wallet atau teknis sebelum paham alasan blockchain dibutuhkan.', icon:'shield', href:'/lesson/why-blockchain', tone:'blue' as CoreCardTone },
  { title:'Sudah punya dasar', copy:'Gunakan jalur terarah. Tetap cek Wallet & Keamanan sebelum Lab dan Hub.', icon:'layers', href:'/core#curriculum', tone:'green' as CoreCardTone },
  { title:'Mode Penjelajah', copy:'Masuk ke Starknet dan Lab advanced setelah fondasi dan readiness cukup.', icon:'zap', href:'/lab', tone:'purple' as CoreCardTone }
];
export function getCoreLevelMeta(module: SparkModule, completedLessonSlugs: string[], recommendedModuleId: string) {
  const completed = module.lessons.filter((lesson) => completedLessonSlugs.includes(lesson.slug)).length;
  const total = module.lessons.length;
  const progress = total ? Math.round((completed / total) * 100) : 0;
  const recommended = module.id === recommendedModuleId;
  const done = total > 0 && completed === total;
  const locked = module.level > 1 && completed === 0 && !recommended;
  return { completed, total, progress, recommended, done, locked, status: done ? 'Selesai' : recommended ? 'Direkomendasikan' : locked ? 'Bertahap' : 'Terbuka' };
}
