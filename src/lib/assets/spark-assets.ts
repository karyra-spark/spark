export type SparkAssetRole =
  | 'logo-main-light'
  | 'logo-main-dark'
  | 'logo-icon'
  | 'favicon'
  | 'social-avatar'
  | 'github-banner'
  | 'docs-header';

export type SparkAsset = {
  role: SparkAssetRole;
  src: string;
  alt: string;
  fallback: string;
};

export const sparkAssets: SparkAsset[] = [
  {
    role: 'logo-main-light',
    src: '/assets/brand/karyra-spark-logo-tight.png',
    alt: 'Karyra Spark logo',
    fallback: 'Karyra Spark'
  },
  {
    role: 'logo-main-dark',
    src: '/assets/brand/karyra-spark-logo-tight.png',
    alt: 'Karyra Spark logo',
    fallback: 'Karyra Spark'
  },
  {
    role: 'logo-icon',
    src: '/assets/brand/karyra-spark-logo-tight.png',
    alt: 'Karyra Spark logo',
    fallback: '✦'
  },
  {
    role: 'favicon',
    src: '/favicon.svg',
    alt: 'Karyra Spark favicon',
    fallback: '✦'
  },
  {
    role: 'social-avatar',
    src: '/assets/brand/social-avatar.png',
    alt: 'Karyra Spark social avatar',
    fallback: '✦'
  },
  {
    role: 'github-banner',
    src: '/assets/brand/github-banner.png',
    alt: 'Karyra Spark GitHub banner',
    fallback: 'Karyra Spark'
  },
  {
    role: 'docs-header',
    src: '/assets/brand/docs-header-logo.svg',
    alt: 'Karyra Spark docs header',
    fallback: 'Karyra Spark Docs'
  }
];

export function getSparkAsset(role: SparkAssetRole) {
  return sparkAssets.find((asset) => asset.role === role);
}
