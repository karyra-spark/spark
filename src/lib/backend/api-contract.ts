export type SparkApiHealth = {
  service: 'spark-api';
  status: 'ok';
  version: string;
  backend: 'rust-axum';
  database: 'postgresql';
  storage: 's3-compatible';
};

export type SparkUploadPurpose =
  | 'avatar'
  | 'lesson_media'
  | 'community_media'
  | 'event_media'
  | 'passport_asset'
  | 'private_evidence';

export type SparkUploadIntentRequest = {
  purpose: SparkUploadPurpose;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  checksum?: string;
};

export type SparkUploadIntentResponse = {
  uploadId: string;
  assetId: string;
  method: 'PUT';
  uploadUrl: string;
  objectKey: string;
  maxSizeBytes: number;
  expiresInSeconds: number;
};
