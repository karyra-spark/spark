import type { SocialPostKind } from './social-types';

const MAX_POST_LENGTH = 640;
const MIN_POST_LENGTH = 8;
const MAX_COMMENT_LENGTH = 320;

const secretLeakPatterns = [
  /(?:seed phrase|private key|recovery phrase|mnemonic)\s*[:=]/i,
  /(?:ini|my|punya saya|milik saya)\s+(?:seed phrase|private key|recovery phrase|mnemonic)/i,
  /(?:jangan|tolong)?\s*(?:cek|validasi|import)\s+(?:seed phrase|private key|recovery phrase|mnemonic)/i
];

const cautionPatterns = [/(seed phrase|private key|recovery phrase|mnemonic|kode pemulihan)/i];

export function normalizeSocialBody(body: string) {
  return body.replace(/\s+/g, ' ').trim();
}

export function extractSocialTags(body: string, kind: SocialPostKind): string[] {
  const hashTags = Array.from(body.matchAll(/#([a-z0-9_-]{2,24})/gi)).map((match) => match[1].toLowerCase());
  const base = kind === 'question' ? ['tanya'] : kind === 'lab' ? ['lab'] : kind === 'workshop' ? ['workshop'] : [];
  return Array.from(new Set([...base, ...hashTags])).slice(0, 6);
}

export function evaluateSocialDraft(body: string) {
  const normalized = normalizeSocialBody(body);
  const warnings: string[] = [];
  const errors: string[] = [];

  if (normalized.length < MIN_POST_LENGTH) errors.push('Tulis sedikit konteks agar orang lain paham.');
  if (normalized.length > MAX_POST_LENGTH) errors.push(`Maksimal ${MAX_POST_LENGTH} karakter agar feed tetap ringan.`);
  if (secretLeakPatterns.some((pattern) => pattern.test(normalized))) {
    errors.push('Jangan membagikan seed phrase, private key, recovery phrase, atau kode pemulihan.');
  } else if (cautionPatterns.some((pattern) => pattern.test(normalized))) {
    warnings.push('Pastikan konteksnya edukasi/safety. Jangan tulis data rahasia sungguhan.');
  }

  return { normalized, warnings, errors, canKirim: errors.length === 0 };
}

export function evaluateSocialComment(body: string) {
  const normalized = normalizeSocialBody(body);
  const errors: string[] = [];

  if (normalized.length < 3) errors.push('Komentar terlalu pendek.');
  if (normalized.length > MAX_COMMENT_LENGTH) errors.push(`Komentar maksimal ${MAX_COMMENT_LENGTH} karakter.`);
  if (secretLeakPatterns.some((pattern) => pattern.test(normalized))) {
    errors.push('Jangan membagikan data pemulihan atau private key di komentar.');
  }

  return { normalized, errors, canKirim: errors.length === 0 };
}
