import type { PassportEvidenceBundle } from '$lib/passport/passport-types';

export type SparkProofKey =
  | 'learning'
  | 'practice'
  | 'safety'
  | 'participation'
  | 'exploration'
  | 'contribution';

export type SparkProofStatus = 'active' | 'in_progress' | 'planned';

export type SparkProofSignal = {
  key: SparkProofKey;
  label: string;
  title: string;
  copy: string;
  status: SparkProofStatus;
  statusLabel: string;
  icon: string;
  href: string;
  progress: number;
};

function clampProgress(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function passedCount(items: { passed: boolean }[]) {
  return items.filter((item) => item.passed).length;
}

export function getPassportProofSignals(bundle: PassportEvidenceBundle): SparkProofSignal[] {
  const passedCore = passedCount(bundle.evidence.core);
  const passedLab = passedCount(bundle.evidence.lab);
  const coreProgress = clampProgress((passedCore / 3) * 100);
  const labProgress = clampProgress((passedLab / 3) * 100);
  const hasCommunity = bundle.evidence.community.registeredWorkshops > 0;
  const hasExploration = bundle.evidence.hub.savedResources > 0;
  const hasReadinessLevel = Boolean(bundle.readinessLevel);
  const safetyProgress = clampProgress(Math.max(passedLab > 0 ? 100 : 0, passedCore > 0 ? 60 : 0));

  return [
    {
      key: 'learning',
      label: 'Proof-of-Learning',
      title: 'Pemahaman Core',
      copy: 'Dibentuk dari ujian Core Beginner, Intermediate, dan Advanced.',
      status: passedCore > 0 ? 'active' : 'in_progress',
      statusLabel: passedCore > 0 ? `${passedCore}/3 lulus` : 'Mulai dari Core',
      icon: 'book-check',
      href: '/core',
      progress: coreProgress
    },
    {
      key: 'practice',
      label: 'Proof-of-Practice',
      title: 'Latihan Lab',
      copy: 'Dibentuk dari ujian Lab dan simulasi praktik aman.',
      status: passedLab > 0 ? 'active' : 'in_progress',
      statusLabel: passedLab > 0 ? `${passedLab}/3 lulus` : 'Buka Lab',
      icon: 'flask-conical',
      href: '/lab',
      progress: labProgress
    },
    {
      key: 'safety',
      label: 'Proof-of-Safety',
      title: 'Guardrail keamanan',
      copy: 'Menguatkan pemahaman seed phrase, private key, signature, wallet, testnet, dan mainnet.',
      status: safetyProgress >= 100 ? 'active' : 'in_progress',
      statusLabel: safetyProgress >= 100 ? 'Terbangun' : 'Perlu latihan',
      icon: 'shield-check',
      href: '/lab',
      progress: safetyProgress
    },
    {
      key: 'participation',
      label: 'Proof-of-Participation',
      title: 'Partisipasi komunitas',
      copy: 'Diperkuat dari workshop, cohort, diskusi, dan verifikasi fasilitator di milestone grant.',
      status: hasCommunity ? 'active' : 'in_progress',
      statusLabel: hasCommunity ? 'Ada sinyal' : 'Opsional',
      icon: 'users',
      href: '/community',
      progress: hasCommunity ? 100 : 25
    },
    {
      key: 'exploration',
      label: 'Proof-of-Exploration',
      title: 'Eksplorasi Hub',
      copy: 'Membuktikan user mulai membuka rujukan Starknet setelah readiness dasar terbentuk.',
      status: hasExploration || hasReadinessLevel ? 'active' : 'in_progress',
      statusLabel: hasExploration ? 'Ada rujukan' : hasReadinessLevel ? 'Siap Hub' : 'Nanti setelah siap',
      icon: 'compass',
      href: '/hub',
      progress: hasExploration ? 100 : hasReadinessLevel ? 60 : 15
    },
    {
      key: 'contribution',
      label: 'Proof-of-Contribution',
      title: 'Kontribusi ekosistem',
      copy: 'Roadmap setelah grant: mentor lokal, resource komunitas, kontribusi diskusi, atau misi ekosistem.',
      status: 'planned',
      statusLabel: 'Roadmap grant',
      icon: 'trophy',
      href: '/community',
      progress: 10
    }
  ];
}

export const starknetGrantIntegrationScope = [
  'Cairo PassportRegistry untuk issue, upgrade, revoke, dan verify Passport.',
  'Scarb sebagai build/package workflow Cairo.',
  'Starknet Foundry untuk test, declare, deploy, dan verifikasi kontrak.',
  'StarknetKit untuk wallet readiness dan koneksi wallet bertahap.',
  'Starknet provider/RPC layer untuk membaca status Passport, event, dan explorer link.',
  'NFT atau non-transferable badge untuk visual proof-of-readiness.',
  'Public verifier untuk cek Passport tanpa membuka data pribadi.',
  'Dojo/provable sandbox sebagai roadmap Lab lanjutan setelah grant.'
] as const;
