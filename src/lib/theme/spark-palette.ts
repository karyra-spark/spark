export type SparkPaletteToken = {
  name: string;
  token: string;
  light: string;
  dark: string;
  usage: string;
};

export const sparkPalette: SparkPaletteToken[] = [
  {
    name: 'Deep Stark',
    token: '--spark-navy',
    light: '#160b3f',
    dark: '#f6f0ff',
    usage: 'Heading, brand text, high-emphasis foreground.'
  },
  {
    name: 'Stark Violet',
    token: '--spark-blue',
    light: '#6c4df6',
    dark: '#8f7cff',
    usage: 'Primary CTA, active navigation, orbit glow.'
  },
  {
    name: 'Electric Violet',
    token: '--spark-blue-strong',
    light: '#4b2fd6',
    dark: '#b19cff',
    usage: 'Strong action text, selected states, links.'
  },
  {
    name: 'Spark Coral',
    token: '--spark-orange',
    light: '#ff7a3d',
    dark: '#ff9d66',
    usage: 'Spark accent, warning bridge, highlight node.'
  },
  {
    name: 'Proof Green',
    token: '--spark-green',
    light: '#20c997',
    dark: '#4adeb8',
    usage: 'Completion, readiness, safe practice.'
  },
  {
    name: 'Explorer Pink',
    token: '--spark-pink',
    light: '#ff4ecd',
    dark: '#ff8ae6',
    usage: 'Community and exploratory accents.'
  }
];

export const sparkThemeDirection = {
  label: 'Starknet-inspired Spark Palette',
  copy:
    'Deep purple/indigo sebagai fondasi, violet sebagai primary action, coral/orange sebagai spark accent, dan green sebagai proof/readiness signal.'
};
